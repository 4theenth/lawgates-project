<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Admin panel mengautentikasi lewat tabel users, tetapi kolom author pada
 * peraturan masih mereferensikan tabel admins yang lama. Migration ini
 * mengarahkan created_by/updated_by ke users agar pembuat dan pengubah
 * terakhir tercatat dan tampil dengan benar.
 *
 * Ditulis ulang agar:
 * - Idempotent: aman dijalankan berulang tanpa error constraint ganda.
 * - Portabel: mendukung PostgreSQL (produksi) dan SQLite (test suite).
 * - Tidak menghapus data author yang sah: nilai yang kebetulan cocok dengan
 *   baris di tabel tujuan dipertahankan, hanya nilai yatim yang dikosongkan.
 */
return new class extends Migration
{
    private const COLUMNS = ['created_by', 'updated_by'];

    public function up(): void
    {
        foreach (self::COLUMNS as $column) {
            // Saat mengarahkan ke users, nilai yang hanya ada di admins memang
            // harus dikosongkan agar FK baru bisa dipasang.
            $this->repointColumn($column, 'users', nullOrphans: true);
        }
    }

    public function down(): void
    {
        foreach (self::COLUMNS as $column) {
            // Saat rollback, JANGAN menyentuh isi data sama sekali.
            //
            // Sebelumnya down() ikut mengosongkan nilai yang tidak ada di
            // admins. Karena data sudah sah menunjuk users sementara tabel
            // admins hanya berisi sebagian kecil baris, rollback justru
            // menghapus author yang valid dan tidak bisa dikembalikan.
            // Rollback hanya mengembalikan skema, bukan mengubah data.
            $this->repointColumn($column, 'admins', nullOrphans: false);
        }
    }

    private function repointColumn(string $column, string $targetTable, bool $nullOrphans): void
    {
        $this->dropForeignKeysOn($column);

        if ($nullOrphans) {
            $this->nullOrphanReferences($column, $targetTable);
        } else {
            // Tetap laporkan bila ada nilai yang tidak punya pasangan, supaya
            // masalah data terlihat tanpa dirusak diam-diam.
            $this->reportUnpairedReferences($column, $targetTable);
        }

        $this->addForeignKey($column, $targetTable);
    }

    /**
     * Hapus semua foreign key pada kolom ini, apa pun namanya.
     *
     * Pada PostgreSQL nama constraint dicari dari katalog, karena nama hasil
     * konvensi Laravel (peraturan_created_by_foreign) tidak selalu sama dengan
     * yang benar-benar ada. Pada SQLite (test) Laravel menanganinya sendiri.
     */
    private function dropForeignKeysOn(string $column): void
    {
        if (Schema::getConnection()->getDriverName() !== 'pgsql') {
            try {
                Schema::table('peraturan', function (Blueprint $table) use ($column) {
                    $table->dropForeign([$column]);
                });
            } catch (\Throwable $e) {
                // Tidak ada FK untuk dihapus; aman dilewati (idempotent).
            }

            return;
        }

        $constraints = DB::select(
            "SELECT conname
             FROM pg_constraint
             WHERE conrelid = 'peraturan'::regclass
               AND contype = 'f'
               AND pg_get_constraintdef(oid) LIKE ?",
            ['%(' . $column . ')%']
        );

        foreach ($constraints as $constraint) {
            DB::statement(
                'ALTER TABLE peraturan DROP CONSTRAINT IF EXISTS "'
                . str_replace('"', '""', $constraint->conname) . '"'
            );
        }
    }

    /**
     * Kosongkan nilai yang tidak punya pasangan di tabel tujuan.
     *
     * Nilai seperti ini biasanya berasal dari tabel lama (admins). ID yang
     * kebetulan juga ada di tabel tujuan tetap dipertahankan supaya author
     * yang sah tidak ikut terhapus.
     */
    private function nullOrphanReferences(string $column, string $targetTable): void
    {
        $affected = DB::table('peraturan')
            ->whereNotNull($column)
            ->whereNotExists(function ($query) use ($column, $targetTable) {
                $query->select(DB::raw(1))
                    ->from($targetTable)
                    ->whereColumn($targetTable . '.id', 'peraturan.' . $column);
            })
            ->update([$column => null]);

        if ($affected > 0) {
            \Log::warning('Migration repoint FK: nilai author dikosongkan karena menunjuk ID yang tidak ada', [
                'column' => $column,
                'target_table' => $targetTable,
                'affected_rows' => $affected,
            ]);
        }
    }

    /**
     * Laporkan nilai yang tidak punya pasangan di tabel tujuan TANPA mengubah
     * data. Dipakai saat rollback agar tetap terlihat di log namun isi tabel
     * tidak dirusak.
     */
    private function reportUnpairedReferences(string $column, string $targetTable): void
    {
        $count = DB::table('peraturan')
            ->whereNotNull($column)
            ->whereNotExists(function ($query) use ($column, $targetTable) {
                $query->select(DB::raw(1))
                    ->from($targetTable)
                    ->whereColumn($targetTable . '.id', 'peraturan.' . $column);
            })
            ->count();

        if ($count > 0) {
            \Log::warning('Migration repoint FK (rollback): nilai author dibiarkan, tidak diubah', [
                'column' => $column,
                'target_table' => $targetTable,
                'unpaired_rows' => $count,
            ]);
        }
    }

    private function addForeignKey(string $column, string $targetTable): void
    {
        if (Schema::getConnection()->getDriverName() !== 'pgsql') {
            // SQLite tidak mendukung ADD CONSTRAINT, dan tidak dipakai di produksi.
            return;
        }

        DB::statement(sprintf(
            'ALTER TABLE peraturan ADD CONSTRAINT "%s" FOREIGN KEY ("%s") REFERENCES "%s"(id) ON DELETE SET NULL',
            'peraturan_' . $column . '_foreign',
            $column,
            $targetTable
        ));
    }
};

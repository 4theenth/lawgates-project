<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Menyelaraskan `bookmark_collections` dengan aturan aplikasi:
     * nama folder unik per user tanpa membedakan huruf besar/kecil, dan
     * deskripsi memakai text agar konsisten dengan validasi 500 karakter.
     *
     * Migrasi pembuat tabel sudah mendefinisikan unique (user_id, name), tetapi
     * di beberapa database index tersebut belum ada. Pemeriksaan duplikat di
     * bawah sengaja menghentikan migrasi alih-alih menghapus/mengganti nama
     * folder milik user secara diam-diam.
     */
    public function up(): void
    {
        if (! Schema::hasTable('bookmark_collections')) {
            return;
        }

        $this->assertNoCaseInsensitiveDuplicates();
        $this->dropExistingNameUniqueIndexes();

        Schema::table('bookmark_collections', function (Blueprint $table) {
            $table->text('description')->nullable()->change();
        });

        DB::statement(
            'CREATE UNIQUE INDEX bookmark_collections_user_name_unique '
            .'ON bookmark_collections (user_id, LOWER(name))'
        );
    }

    public function down(): void
    {
        if (! Schema::hasTable('bookmark_collections')) {
            return;
        }

        DB::statement('DROP INDEX IF EXISTS bookmark_collections_user_name_unique');
    }

    private function assertNoCaseInsensitiveDuplicates(): void
    {
        $duplicates = DB::table('bookmark_collections')
            ->select('user_id', DB::raw('LOWER(name) as lower_name'), DB::raw('COUNT(*) as total'))
            ->groupBy('user_id', DB::raw('LOWER(name)'))
            ->havingRaw('COUNT(*) > 1')
            ->get();

        if ($duplicates->isEmpty()) {
            return;
        }

        $details = $duplicates
            ->map(fn ($row) => "user {$row->user_id}: \"{$row->lower_name}\" ({$row->total} folder)")
            ->implode(', ');

        throw new RuntimeException(
            "Ada nama folder bookmark yang duplikat tanpa membedakan huruf besar/kecil: {$details}. "
            .'Ganti nama folder tersebut terlebih dahulu sebelum menjalankan migrasi ini.'
        );
    }

    /**
     * Index unik lama bisa bernama sama atau berbeda tergantung database yang
     * sudah pernah menjalankan migrasi versi sebelumnya.
     */
    private function dropExistingNameUniqueIndexes(): void
    {
        foreach (Schema::getIndexes('bookmark_collections') as $index) {
            if (! $index['unique'] || $index['primary']) {
                continue;
            }

            $columns = array_map('strtolower', $index['columns']);

            if ($columns !== ['user_id', 'name']) {
                continue;
            }

            Schema::table('bookmark_collections', function (Blueprint $table) use ($index) {
                $table->dropUnique($index['name']);
            });
        }
    }
};

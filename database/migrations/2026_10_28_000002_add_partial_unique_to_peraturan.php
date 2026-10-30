<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Mengembalikan penjagaan tingkat database tanpa memblokir Perda lintas daerah.
 *
 * Unique penuh (jenis, nomor, tahun) sudah dilepas karena sah berulang antar
 * daerah. Indeks unik parsial ini hanya berlaku ketika instansi terisi, sehingga
 * dua Perda dengan nomor dan tahun sama tetap ditolak bila instansinya sama,
 * sementara peraturan nasional (yang instansinya juga terisi) tetap aman.
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::statement(<<<'SQL'
            CREATE UNIQUE INDEX IF NOT EXISTS peraturan_jenis_nomor_tahun_instansi_unique
            ON peraturan (jenis_peraturan_id, nomor, tahun, instansi)
            WHERE nomor IS NOT NULL AND instansi IS NOT NULL
        SQL);
    }

    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS peraturan_jenis_nomor_tahun_instansi_unique');
    }
};
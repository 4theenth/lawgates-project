<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Pembersihan & Normalisasi Komprehensif Seluruh Jenis Peraturan
     */
    public function up(): void
    {
        $mappings = [
            'PERDA' => [
                'raw' => ['P', 'perda', 'Perda', 'PERDA', 'Peraturan Daerah'],
                'nama' => 'Peraturan Daerah',
                'deskripsi' => 'Dikhususkan untuk peraturan daerah',
            ],
            'UU' => [
                'raw' => ['uu', 'UU', 'Undang-Undang', 'Undang Undang'],
                'nama' => 'Undang-Undang',
                'deskripsi' => 'Dikhususkan untuk undang-undang',
            ],
            'PP' => [
                'raw' => ['pp', 'PP', 'Peraturan Pemerintah'],
                'nama' => 'Peraturan Pemerintah',
                'deskripsi' => 'Dikhususkan untuk peraturan pemerintah',
            ],
            'PERPRES' => [
                'raw' => ['perpres', 'PERPRES', 'Peraturan Presiden'],
                'nama' => 'Peraturan Presiden',
                'deskripsi' => 'Dikhususkan untuk peraturan presiden',
            ],
            'PERMEN' => [
                'raw' => ['permen', 'PERMEN', 'Peraturan Menteri', 'Peraturan Mentri'],
                'nama' => 'Peraturan Menteri',
                'deskripsi' => 'Dikhususkan untuk peraturan menteri',
            ],
            'PERBAN' => [
                'raw' => ['perban', 'PERBAN', 'Peraturan Badan/Lembaga', 'Peraturan Badan / Lembaga'],
                'nama' => 'Peraturan Badan/Lembaga',
                'deskripsi' => 'Dikhususkan untuk peraturan badan / lembaga',
            ],
            'PERPPU' => [
                'raw' => ['perpu', 'perppu', 'PERPPU', 'PERPU', 'Peraturan Pemerintah Pengganti Undang-Undang'],
                'nama' => 'Peraturan Pemerintah Pengganti Undang-Undang',
                'deskripsi' => 'Dikhususkan untuk peraturan pemerintah pengganti undang-undang',
            ],
            'UUD' => [
                'raw' => ['uud', 'UUD', 'Undang-Undang Dasar 1945', 'Undang Undang Dasar 1945'],
                'nama' => 'Undang-Undang Dasar 1945',
                'deskripsi' => 'Dikhususkan untuk undang-undang dasar',
            ],
            'TAP_MPR' => [
                'raw' => ['tap mpr', 'TAP MPR', 'TAP_MPR', 'Ketetapan MPR'],
                'nama' => 'Ketetapan MPR',
                'deskripsi' => 'Dikhususkan untuk ketetapan mpr',
            ],
        ];

        foreach ($mappings as $canonicalKode => $info) {
            // Coba cari target yang SUDAH benar secara kode DAN nama
            $target = DB::table('jenis_peraturan')
                ->where('kode', $canonicalKode)
                ->where('nama', $info['nama'])
                ->first();

            // Jika tidak ada, cari yang namanya sesuai (karena nama itu unique)
            if (!$target) {
                $target = DB::table('jenis_peraturan')
                    ->where('nama', $info['nama'])
                    ->first();
            }

            // Jika masih tidak ada, ambil apa saja yang cocok dari array raw
            if (!$target) {
                $target = DB::table('jenis_peraturan')
                    ->whereIn('kode', $info['raw'])
                    ->orWhereIn('nama', $info['raw'])
                    ->first();
            }

            if ($target) {
                // Hapus duplikat TERLEBIH DAHULU agar tidak bentrok Unique Constraint saat update nama
                $duplicates = DB::table('jenis_peraturan')
                    ->where(function ($q) use ($info) {
                        $q->whereIn('kode', $info['raw'])
                          ->orWhereIn('nama', $info['raw']);
                    })
                    ->where('id', '!=', $target->id)
                    ->get();

                foreach ($duplicates as $dup) {
                    // Pindahkan relasi peraturan ke target yang dipertahankan
                    DB::table('peraturan')
                        ->where('jenis_peraturan_id', $dup->id)
                        ->update(['jenis_peraturan_id' => $target->id]);

                    // Hapus data duplikat dari jenis_peraturan
                    DB::table('jenis_peraturan')->where('id', $dup->id)->delete();
                }

                // Setelah duplikat bersih, baru kita update agar aman dari Unique Constraint
                DB::table('jenis_peraturan')
                    ->where('id', $target->id)
                    ->update([
                        'kode' => $canonicalKode,
                        'nama' => $info['nama'],
                        'deskripsi' => $info['deskripsi'],
                    ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No revert needed
    }
};

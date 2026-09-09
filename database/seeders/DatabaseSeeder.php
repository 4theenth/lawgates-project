<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat data jenis_peraturan (tambahkan 'kode')
        $jenisId = DB::table('jenis_peraturan')->insertGetId([
            'kode' => 'UU',
            'nama' => 'Undang-Undang'
        ]);

        // 2. Buat data status_peraturan (gunakan 'nama_status')
        $statusId = DB::table('status_peraturan')->insertGetId([
            'nama_status' => 'Berlaku'
        ]);

        // 3. Masukkan data contoh peraturan
        Peraturan::create([
            'unique_id' => Str::uuid(),
            'jenis_peraturan_id' => $jenisId,
            'nomor' => '7',
            'tahun' => 2021,
            'judul' => 'Harmonisasi Peraturan Perpajakan',
            'status_id' => $statusId,
        ]);

        Peraturan::create([
            'unique_id' => Str::uuid(),
            'jenis_peraturan_id' => $jenisId,
            'nomor' => '1',
            'tahun' => 2023,
            'judul' => 'Kitab Undang-Undang Hukum Pidana',
            'status_id' => $statusId,
        ]);
    }
}
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
        // 1. Dapatkan atau Buat Jenis Peraturan UU
        $jenisId = DB::table('jenis_peraturan')->where('kode', 'UU')->value('id');
        if (!$jenisId) {
            $jenisId = DB::table('jenis_peraturan')->insertGetId([
                'kode' => 'UU',
                'nama' => 'Undang-Undang'
            ]);
        }

        // 2. Dapatkan atau Buat Status Peraturan Berlaku
        $statusId = DB::table('status_peraturan')->where('nama_status', 'Berlaku')->value('id');
        if (!$statusId) {
            $statusId = DB::table('status_peraturan')->insertGetId([
                'nama_status' => 'Berlaku'
            ]);
        }

        // 3. Masukkan data contoh peraturan jika belum ada
        Peraturan::firstOrCreate(
            ['nomor' => '7', 'tahun' => 2021, 'jenis_peraturan_id' => $jenisId],
            [
                'unique_id' => Str::uuid(),
                'judul' => 'Harmonisasi Peraturan Perpajakan',
                'status_id' => $statusId,
            ]
        );

        Peraturan::firstOrCreate(
            ['nomor' => '1', 'tahun' => 2023, 'jenis_peraturan_id' => $jenisId],
            [
                'unique_id' => Str::uuid(),
                'judul' => 'Kitab Undang-Undang Hukum Pidana',
                'status_id' => $statusId,
            ]
        );

        // Panggil seeder untuk akun admin, user, dan seluruh peraturan OCR mandiri
        $this->call([
            AdminSeeder::class,
            UserSeeder::class,
            OcrUUD1945Seeder::class,
            OcrCiptaKerjaSeeder::class,
            OcrUU1Tahun1946Seeder::class,
            OcrUU5Tahun1960Seeder::class,
            OcrUU13Tahun2003Seeder::class,
            OcrUU40Tahun2007Seeder::class,
            OcrUU12Tahun2010Seeder::class,
            OcrUU23Tahun2014Seeder::class,
            OcrUU6Tahun2023Seeder::class,
            OcrUU24Tahun2024Seeder::class,
            OcrPerpres82Tahun2018Seeder::class,
            OcrPerpres16Tahun2023Seeder::class,
            OcrPerdaBali1Tahun2010Seeder::class,
            OcrBadung1Tahun2006Seeder::class,
            DashboardDemoSeeder::class,
        ]);
    }
}

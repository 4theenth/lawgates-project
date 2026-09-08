<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisPeraturanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jenis_peraturan')->insert([
            ['kode' => 'UUD', 'nama' => 'Undang-Undang Dasar 1945', 'urutan_hierarki' => 1],
            ['kode' => 'TAP MPR', 'nama' => 'Ketetapan MPR', 'urutan_hierarki' => 2],
            ['kode' => 'UU', 'nama' => 'Undang-Undang', 'urutan_hierarki' => 3],
            ['kode' => 'PERPU', 'nama' => 'Peraturan Pemerintah Pengganti Undang-Undang', 'urutan_hierarki' => 3],
            ['kode' => 'PP', 'nama' => 'Peraturan Pemerintah', 'urutan_hierarki' => 4],
            ['kode' => 'PERPRES', 'nama' => 'Peraturan Presiden', 'urutan_hierarki' => 5],
            ['kode' => 'PERDA PROV', 'nama' => 'Peraturan Daerah Provinsi', 'urutan_hierarki' => 6],
            ['kode' => 'PERDA KAB', 'nama' => 'Peraturan Daerah Kabupaten/Kota', 'urutan_hierarki' => 7],
            ['kode' => 'PERMEN', 'nama' => 'Peraturan Menteri', 'urutan_hierarki' => 8],
        ]);
    }
}
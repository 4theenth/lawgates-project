<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisPeraturanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jenis_peraturan')->insert([
            [
                'kode' => 'UUD',
                'nama' => 'Undang-Undang Dasar 1945',
            ],
            [
                'kode' => 'TAP MPR',
                'nama' => 'Ketetapan MPR',
            ],
            [
                'kode' => 'UU',
                'nama' => 'Undang-Undang',
            ],
            [
                'kode' => 'PERPU',
                'nama' => 'Peraturan Pemerintah Pengganti Undang-Undang',
            ],
            [
                'kode' => 'PP',
                'nama' => 'Peraturan Pemerintah',
            ],
            [
                'kode' => 'PERPRES',
                'nama' => 'Peraturan Presiden',
            ],
            [
                'kode' => 'PERDA PROV',
                'nama' => 'Peraturan Daerah Provinsi',
            ],
            [
                'kode' => 'PERDA KAB',
                'nama' => 'Peraturan Daerah Kabupaten/Kota',
            ],
            [
                'kode' => 'PERMEN',
                'nama' => 'Peraturan Menteri',
            ],
        ]);
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriHukumSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kategori_hukum')->insert([
            [
                'nama_kategori' => 'Hukum Pidana',
                'deskripsi' => 'Aturan mengenai perbuatan pidana dan sanksi.'
            ],
            [
                'nama_kategori' => 'Hukum Perdata',
                'deskripsi' => 'Hubungan antar individu/badan hukum.'
            ],
            [
                'nama_kategori' => 'Ketenagakerjaan',
                'deskripsi' => 'Aturan terkait hak dan kewajiban pekerja dan pengusaha.'
            ],
            [
                'nama_kategori' => 'Perpajakan',
                'deskripsi' => 'Aturan tentang pajak negara dan daerah.'
            ],
        ]);
    }
}
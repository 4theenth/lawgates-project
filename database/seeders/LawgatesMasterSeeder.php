<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LawgatesMasterSeeder extends Seeder
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

        DB::table('status_peraturan')->insert([
            ['nama_status' => 'Berlaku'],
            ['nama_status' => 'Diubah'],
            ['nama_status' => 'Dicabut'],
            ['nama_status' => 'Tidak Berlaku'],
        ]);

        DB::table('relation_types')->insert([
            ['nama_relasi' => 'Mengubah'],
            ['nama_relasi' => 'Mencabut'],
            ['nama_relasi' => 'Mencabut Sebagian'],
            ['nama_relasi' => 'Melaksanakan'],
            ['nama_relasi' => 'Menetapkan'],
        ]);

        DB::table('perubahan_types')->insert([
            ['nama_perubahan' => 'Diubah'],
            ['nama_perubahan' => 'Disisipkan'],
            ['nama_perubahan' => 'Dihapus'],
            ['nama_perubahan' => 'Diganti'],
        ]);

        DB::table('kategori_hukum')->insert([
            ['nama_kategori' => 'Hukum Pidana', 'deskripsi' => 'Aturan mengenai perbuatan pidana dan sanksi.'],
            ['nama_kategori' => 'Hukum Perdata', 'deskripsi' => 'Hubungan antar individu/badan hukum.'],
            ['nama_kategori' => 'Ketenagakerjaan', 'deskripsi' => 'Aturan terkait hak dan kewajiban pekerja dan pengusaha.'],
            ['nama_kategori' => 'Perpajakan', 'deskripsi' => 'Aturan tentang pajak negara dan daerah.'],
        ]);
    }
}
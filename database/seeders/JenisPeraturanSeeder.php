<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisPeraturanSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'kode' => 'PERPRES',
                'nama' => 'Peraturan Presiden',
                'deskripsi' => 'Dikhususkan untuk peraturan presiden',
            ],
            [
                'kode' => 'UU',
                'nama' => 'Undang Undang',
                'deskripsi' => 'Dikhususkan untuk undang undang',
            ],
            [
                'kode' => 'PP',
                'nama' => 'Peraturan Pemerintah',
                'deskripsi' => 'Dikhususkan untuk peraturan pemerintah',
            ],
            [
                'kode' => 'PERBAN',
                'nama' => 'Peraturan Badan/Lembaga',
                'deskripsi' => 'Dikhususkan untuk peraturan badan / lembaga',
            ],
            [
                'kode' => 'PERDA',
                'nama' => 'Peraturan Daerah',
                'deskripsi' => 'Dikhususkan untuk peraturan daerah',
            ],
            [
                'kode' => 'PERMEN',
                'nama' => 'Peraturan Mentri',
                'deskripsi' => 'Dikhususkan untuk peraturan mentri',
            ],
            [
                'kode' => 'UU_DRT',
                'nama' => 'Undang Undang Darurat',
                'deskripsi' => 'Dikhususkan untuk undang undang darurat',
            ],
            [
                'kode' => 'PENPRES',
                'nama' => 'Penetapan Presiden',
                'deskripsi' => 'Dikhususkan untuk penetapan presiden',
            ],
            [
                'kode' => 'KEPPRES',
                'nama' => 'Keputusan Presiden',
                'deskripsi' => 'Dikhususkan untuk keputusan presiden',
            ],
        ];

        foreach ($data as $item) {
            DB::table('jenis_peraturan')->updateOrInsert(
                ['kode' => $item['kode']],
                ['nama' => $item['nama'], 'deskripsi' => $item['deskripsi']]
            );
        }
    }
}
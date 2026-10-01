<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RelationTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('relation_types')->insert([
            ['nama_relasi' => 'Mengubah'],
            ['nama_relasi' => 'Mencabut'],
            ['nama_relasi' => 'Mencabut Sebagian'],
            ['nama_relasi' => 'Melaksanakan'],
            ['nama_relasi' => 'Menetapkan'],
        ]);
    }
}
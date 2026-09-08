<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PerubahanTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('perubahan_types')->insert([
            ['nama_perubahan' => 'Diubah'],
            ['nama_perubahan' => 'Disisipkan'],
            ['nama_perubahan' => 'Dihapus'],
            ['nama_perubahan' => 'Diganti'],
        ]);
    }
}
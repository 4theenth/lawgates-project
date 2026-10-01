<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusPeraturanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('status_peraturan')->insert([
            ['nama_status' => 'Berlaku'],
            ['nama_status' => 'Diubah'],
            ['nama_status' => 'Dicabut'],
            ['nama_status' => 'Tidak Berlaku'],
        ]);
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            JenisPeraturanSeeder::class,
            StatusPeraturanSeeder::class,
            RelationTypeSeeder::class,
            PerubahanTypeSeeder::class,
            KategoriHukumSeeder::class,
        ]);
    }
}
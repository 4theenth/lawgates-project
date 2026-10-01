<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('admins')->insert([
            'username' => 'admin',
            'email' => 'admin@lawgates.com',
            'password' => Hash::make('admin12345'),
            'role' => 'super_admin',
            'is_active' => true,
            'invited_by' => null,
            'deactivated_by' => null,
            'deactivated_at' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
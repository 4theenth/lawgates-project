<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'username' => 'superadmin',
            'email' => 'superadmin@lawgates.com',
            'password' => Hash::make('rahasia123'),
            'role' => 'superadmin',
            'auth_provider' => 'manual', // Sudah diubah ke manual
            'phone' => '08111111111'
        ]);

        User::create([
            'username' => 'admin_sistem',
            'email' => 'admin@lawgates.com',
            'password' => Hash::make('rahasia123'),
            'role' => 'admin',
            'auth_provider' => 'manual', // Sudah diubah ke manual
            'phone' => '08222222222'
        ]);

        User::create([
            'username' => 'pengguna_biasa',
            'email' => 'user@lawgates.com',
            'password' => Hash::make('rahasia123'),
            'role' => 'user',
            'auth_provider' => 'manual', // Sudah diubah ke manual
            'phone' => '08333333333'
        ]);
    }
}
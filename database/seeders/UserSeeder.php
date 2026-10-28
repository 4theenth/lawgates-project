<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'username' => 'superadmin',
                'email' => 'superadmin@lawgates.com',
                'password' => Hash::make('rahasia123'),
                'role' => 'superadmin',
                'auth_provider' => 'manual',
                'phone' => '08111111111',
            ],
            [
                'username' => 'admin_sistem',
                'email' => 'admin@lawgates.com',
                'password' => Hash::make('rahasia123'),
                'role' => 'admin',
                'auth_provider' => 'manual',
                'phone' => '08222222222',
            ],
            [
                'username' => 'pengguna_biasa',
                'email' => 'user@lawgates.com',
                'password' => Hash::make('rahasia123'),
                'role' => 'user',
                'auth_provider' => 'manual',
                'phone' => '08333333333',
            ],
        ];

        foreach ($users as $data) {
            $user = User::updateOrCreate(
                ['email' => $data['email']],
                $data
            );

            // Bypasses #[Fillable] dan memastikan status akun terverifikasi
            if (!$user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
            }
        }
    }
}

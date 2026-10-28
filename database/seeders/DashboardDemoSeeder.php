<?php

namespace Database\Seeders;

use App\Models\DraftDokumen;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Data contoh untuk mengisi kartu metrik dan tabel Dashboard Admin
 * saat database masih kosong. Aman dijalankan berulang.
 */
class DashboardDemoSeeder extends Seeder
{
    public function run(): void
    {
        $users = collect(range(1, 6))
            ->map(fn (int $index) => $this->demoUser($index));

        $offsets = [1, 3, 5, 7, 10, 14, 18, 24, 30, 36, 42, 50];

        foreach ($offsets as $index => $daysAgo) {
            $plan = $index % 2 === 0 ? 'bulanan' : 'tahunan';
            $status = match (true) {
                $index < 6 => 'active',
                $index === 6 => 'pending_payment',
                default => 'expired',
            };

            $createdAt = now()->subDays($daysAgo);

            $subscription = Subscription::updateOrCreate(
                ['payment_ref' => sprintf('DUMMY-%03d', $index + 1)],
                [
                    'user_id' => $users[$index % $users->count()]->id,
                    'plan' => $plan,
                    'status' => $status,
                    'amount' => $plan === 'bulanan' ? 50_000 : 500_000,
                    'payment_method' => $index % 3 === 0 ? 'transfer' : 'qris',
                    'start_date' => $createdAt,
                    'end_date' => $plan === 'bulanan'
                        ? $createdAt->copy()->addMonth()
                        : $createdAt->copy()->addYear(),
                ]
            );

            $subscription->forceFill([
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ])->save();
        }

        $drafts = [
            'Rancangan Peraturan Perlindungan Data Pribadi',
            'Rancangan Perubahan UU Ketenagakerjaan',
            'Rancangan Perda Retribusi Daerah',
        ];

        foreach ($drafts as $index => $nama) {
            DraftDokumen::updateOrCreate(
                ['nama_draft' => $nama],
                [
                    'user_id' => $users[$index % $users->count()]->id,
                    'autor' => 'Demo Admin',
                    'jumlah_file' => 2,
                    'files_data' => [],
                    'status' => 'draft',
                ]
            );
        }
    }

    private function demoUser(int $index): User
    {
        $email = "demo{$index}@lawgates.test";

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'username' => "Demo User {$index}",
                'password' => Hash::make('password'),
                'role' => 'user',
                'auth_provider' => 'manual',
            ]
        );

        if (is_null($user->email_verified_at)) {
            $user->forceFill(['email_verified_at' => now()])->save();
        }

        return $user;
    }
}

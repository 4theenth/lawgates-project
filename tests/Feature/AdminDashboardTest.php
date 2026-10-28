<?php

namespace Tests\Feature;

use App\Models\DraftDokumen;
use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_menampilkan_metrik_dan_dokumen_terbaru_dari_database(): void
    {
        $admin = User::factory()->create(['role' => 'superadmin']);

        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        $lama = $this->buatPeraturan($jenis->id, $status->id, 'Dokumen Lama');
        $lama->forceFill(['created_at' => now()->subDays(2)])->save();

        $baru = $this->buatPeraturan($jenis->id, $status->id, 'Dokumen Baru');
        $baru->forceFill(['created_at' => now()])->save();

        DraftDokumen::create([
            'nama_draft' => 'Draf Uji',
            'autor' => 'Admin',
            'jumlah_file' => 1,
            'status' => 'draft',
        ]);
        DraftDokumen::create([
            'nama_draft' => 'Draf Terbit',
            'autor' => 'Admin',
            'jumlah_file' => 1,
            'status' => 'published',
        ]);

        $premiumUser = User::factory()->create(['role' => 'user']);

        $active = Subscription::create([
            'user_id' => $premiumUser->id,
            'plan' => 'bulanan',
            'status' => 'active',
            'amount' => 50_000,
            'start_date' => now()->subDay(),
            'end_date' => now()->addMonth(),
        ]);
        $active->forceFill(['created_at' => now()])->save();

        $freeUser = User::factory()->create(['role' => 'user']);

        $expired = Subscription::create([
            'user_id' => $freeUser->id,
            'plan' => 'tahunan',
            'status' => 'expired',
            'start_date' => now()->subYear(),
            'end_date' => now()->subDay(),
        ]);
        $expired->forceFill(['created_at' => now()->subDay()])->save();

        $response = $this->actingAs($admin)->get('/admin/dashboard');

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard')
            ->where('stats.totalDokumen', 2)
            ->where('stats.totalDraft', 1)
            ->where('stats.totalPremiumUsers', 1)
            ->where('stats.totalPendapatan', 50_000)
            ->has('revenueTrend', now()->day)
            ->where('subscriptionData.premiumCount', 1)
            ->where('subscriptionData.freeCount', 1)
            ->where('subscriptionData.totalUsers', 2)
            ->has('recentDocuments', 2)
            ->where('recentDocuments.0.title', 'Dokumen Baru')
            ->where('recentDocuments.1.title', 'Dokumen Lama')
            ->where('recentDocuments.0.category', 'Undang-Undang')
            ->has('recentTransactions', 2)
            ->where('recentTransactions.0.status', 'Berhasil')
            ->where('recentTransactions.1.status', 'Kedaluwarsa')
        );
    }

    public function test_dashboard_membatasi_dokumen_terbaru_menjadi_lima(): void
    {
        $admin = User::factory()->create(['role' => 'superadmin']);

        $jenis = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        foreach (range(1, 7) as $i) {
            $this->buatPeraturan($jenis->id, $status->id, "Dokumen {$i}");
        }

        $response = $this->actingAs($admin)->get('/admin/dashboard');

        $response->assertOk()->assertInertia(fn (Assert $page) => $page
            ->where('stats.totalDokumen', 7)
            ->has('recentDocuments', 5)
        );
    }

    private function buatPeraturan(int $jenisId, int $statusId, string $judul): Peraturan
    {
        return Peraturan::create([
            'judul' => $judul,
            'nomor' => (string) random_int(100000, 999999),
            'tahun' => 2026,
            'jenis_peraturan_id' => $jenisId,
            'status_id' => $statusId,
            'unique_id' => 'uu-uji-'.uniqid(),
        ]);
    }
}

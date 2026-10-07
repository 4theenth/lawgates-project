<?php

namespace Tests\Feature;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategorizedRegulationApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Cache::forget('regulations_category_stats');
    }

    public function test_category_stats_api_returns_cached_aggregated_totals(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $uu = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $pp = JenisPeraturan::create(['kode' => 'PP', 'nama' => 'Peraturan Pemerintah']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        Peraturan::create([
            'judul' => 'UU Nomor 1 Tahun 2026',
            'nomor' => '1',
            'tahun' => 2026,
            'jenis_peraturan_id' => $uu->id,
            'status_id' => $status->id,
            'unique_id' => 'uu-1-2026',
        ]);

        Peraturan::create([
            'judul' => 'UU Nomor 2 Tahun 2026',
            'nomor' => '2',
            'tahun' => 2026,
            'jenis_peraturan_id' => $uu->id,
            'status_id' => $status->id,
            'unique_id' => 'uu-2-2026',
        ]);

        Peraturan::create([
            'judul' => 'PP Nomor 5 Tahun 2026',
            'nomor' => '5',
            'tahun' => 2026,
            'jenis_peraturan_id' => $pp->id,
            'status_id' => $status->id,
            'unique_id' => 'pp-5-2026',
        ]);

        $response = $this->getJson('/api/regulations/categories/stats');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                '*' => ['id', 'kode', 'nama', 'total_dokumen']
            ]
        ]);

        // Verify accurate category document aggregation
        $data = collect($response->json('data'));
        $uuStat = $data->firstWhere('kode', 'UU');
        $ppStat = $data->firstWhere('kode', 'PP');

        $this->assertEquals(2, $uuStat['total_dokumen']);
        $this->assertEquals(1, $ppStat['total_dokumen']);

        // Verify caching
        $this->assertTrue(Cache::has('regulations_category_stats'));
    }

    public function test_regulations_listing_api_filters_and_returns_paginated_structure(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $uu = JenisPeraturan::create(['kode' => 'UU', 'nama' => 'Undang-Undang']);
        $pp = JenisPeraturan::create(['kode' => 'PP', 'nama' => 'Peraturan Pemerintah']);
        $status = Status::create(['nama_status' => 'Berlaku']);

        for ($i = 1; $i <= 15; $i++) {
            Peraturan::create([
                'judul' => "Peraturan Cipta Kerja {$i}",
                'nomor' => (string) $i,
                'tahun' => 2020 + ($i % 5),
                'jenis_peraturan_id' => ($i % 2 === 0) ? $uu->id : $pp->id,
                'status_id' => $status->id,
                'instansi' => 'Kementerian Hukum',
                'unique_id' => "reg-{$i}-2026",
            ]);
        }

        // Test with category, search, limit, and page params
        $response = $this->getJson('/api/regulations?category=UU&search=Cipta&limit=5&page=1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                '*' => ['id', 'unique_id', 'judul', 'nomor', 'tahun', 'instansi', 'status', 'jenis']
            ],
            'meta' => ['current_page', 'last_page', 'per_page', 'total'],
            'total',
            'current_page',
            'last_page',
            'per_page'
        ]);

        $this->assertEquals(1, $response->json('current_page'));
        $this->assertEquals(5, $response->json('per_page'));
        $this->assertEquals(7, $response->json('total')); // 15 total, 7 are UU

        // Verify items array contains required UI fields
        $firstItem = $response->json('data.0');
        $this->assertNotNull($firstItem['status']);
        $this->assertNotNull($firstItem['nomor']);
        $this->assertNotNull($firstItem['judul']);
        $this->assertNotNull($firstItem['tahun']);
        $this->assertNotNull($firstItem['instansi']);
    }
}

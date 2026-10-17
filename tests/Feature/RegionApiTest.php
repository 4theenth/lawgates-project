<?php

namespace Tests\Feature;

use App\Http\Controllers\Api\RegionController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class RegionApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_region_statistics_endpoint_is_public_and_returns_correct_structure(): void
    {
        RegionController::clearCache();

        $startTime = microtime(true);
        $response = $this->getJson('/api/regions/statistics');
        $durationMs = (microtime(true) - $startTime) * 1000;

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'aceh' => [
                        'id',
                        'name',
                        'total',
                        'berlaku',
                        'tidakBerlaku',
                        'samplePerda',
                    ],
                    'dki-jakarta',
                    'jawa-barat',
                ],
            ]);

        $this->assertTrue($response->json('success'));
        $this->assertLessThan(500, $durationMs, "Response time should be under 500ms, took {$durationMs}ms");
    }

    public function test_region_statistics_uses_cache_for_high_performance(): void
    {
        RegionController::clearCache();

        // First call populates cache
        $this->getJson('/api/regions/statistics')->assertStatus(200);

        $this->assertTrue(Cache::has(RegionController::CACHE_KEY));

        // Second call reads directly from cache in under 50ms
        $startTime = microtime(true);
        $cachedResponse = $this->getJson('/api/regions/statistics');
        $durationMs = (microtime(true) - $startTime) * 1000;

        $cachedResponse->assertStatus(200);
        $this->assertLessThan(100, $durationMs, "Cached response should take less than 100ms, took {$durationMs}ms");
    }
}

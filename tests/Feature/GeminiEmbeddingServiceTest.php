<?php

namespace Tests\Feature;

use App\Services\GeminiEmbeddingService;
use Tests\TestCase;

class GeminiEmbeddingServiceTest extends TestCase
{
    public function test_format_to_pg_array(): void
    {
        $service = new GeminiEmbeddingService;
        $this->assertEquals('{1,2,-3.5}', $service->formatToPgArray([1, 2, -3.5]));
    }

    public function test_empty_text_returns_null(): void
    {
        $service = new GeminiEmbeddingService;
        $this->assertNull($service->generateEmbedding(''));
        $this->assertNull($service->generateEmbedding('   '));
    }

    public function test_gemini_api_returns_768_dimension_embedding(): void
    {
        $apiKey = config('services.gemini.api_key');
        if (empty($apiKey)) {
            $this->markTestSkipped('GEMINI_API_KEY is not set in .env');
        }

        $service = new GeminiEmbeddingService;

        // 1. Test single embedding
        $embedding = $service->generateEmbedding('Hukum Tata Negara Indonesia');
        $this->assertNotNull($embedding);
        $this->assertIsArray($embedding);
        $this->assertCount(768, $embedding);

        // 2. Test batch embeddings
        $batch = $service->batchGenerateEmbeddings([
            'Pasal 1: Indonesia adalah negara hukum',
            'Pasal 2: Kedaulatan berada di tangan rakyat',
        ]);
        $this->assertCount(2, $batch);
        $this->assertNotNull($batch[0]);
        $this->assertNotNull($batch[1]);
        $this->assertCount(768, $batch[0]);
        $this->assertCount(768, $batch[1]);
    }

    public function test_postgres_dot_product_function_exists(): void
    {
        if (\Illuminate\Support\Facades\DB::getDriverName() !== 'pgsql') {
            $this->markTestSkipped('This test requires a PostgreSQL connection.');
        }

        $res = \Illuminate\Support\Facades\DB::select("SELECT dot_product(ARRAY[1.0, 2.0]::float8[], ARRAY[3.0, 4.0]::float8[]) as result");
        $this->assertEquals(11.0, (float) $res[0]->result);
    }
}

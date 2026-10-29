<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class QwenEmbeddingService
{
    protected string $baseUrl;

    protected string $apiKey;

    protected string $model;

    protected ?int $dimensions;

    protected int $timeout;

    public function __construct()
    {
        $this->baseUrl = (string) config('services.qwen.base_url', 'https://api.mindrouter.ai/v1');
        $this->apiKey = (string) config('services.qwen.api_key', '');
        $this->model = (string) config('services.qwen.embedding_model', 'mindrouter/qwen3-embedding-8b');
        $this->dimensions = config('services.qwen.dimensions') ? (int) config('services.qwen.dimensions') : null;
        $this->timeout = (int) config('services.qwen.timeout', 20);
    }

    /**
     * Membangun URL endpoint embeddings yang valid berdasarkan base_url.
     */
    public function getEndpoint(): string
    {
        $base = rtrim($this->baseUrl, '/');

        if (str_ends_with($base, '/embeddings')) {
            return $base;
        }

        if (str_ends_with($base, '/v1')) {
            return "{$base}/embeddings";
        }

        return "{$base}/v1/embeddings";
    }

    /**
     * Menghasilkan array vektor (L2-normalized) untuk satu teks.
     *
     * @param  string  $text  Teks yang akan di-embed
     * @return array<float>|null Array float hasil embedding, atau null jika gagal
     */
    public function generateEmbedding(string $text): ?array
    {
        $trimmed = trim($text);
        if ($trimmed === '') {
            return null;
        }

        $cacheKey = 'qwen_embed_v1_' . md5(mb_strtolower($trimmed));

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($trimmed) {
            return $this->requestEmbeddingFromApi($trimmed);
        });
    }

    /**
     * Eksekusi langsung panggilan API HTTP embeddings ke server Qwen/MindRouter.
     */
    protected function requestEmbeddingFromApi(string $trimmed): ?array
    {
        if (empty($this->apiKey)) {
            Log::warning('QwenEmbeddingService: QWEN_API_KEY belum dikonfigurasi di file .env');

            return null;
        }

        try {
            $endpoint = $this->getEndpoint();

            $payload = [
                'model' => $this->model,
                'input' => $trimmed,
            ];

            if ($this->dimensions !== null && $this->dimensions > 0) {
                $payload['dimensions'] = $this->dimensions;
            }

            $response = Http::timeout($this->timeout)
                ->withHeaders([
                    'Authorization' => "Bearer {$this->apiKey}",
                    'Content-Type' => 'application/json',
                ])
                ->post($endpoint, $payload);

            if ($response->successful()) {
                $json = $response->json();
                $vector = $json['data'][0]['embedding']
                    ?? $json['embeddings'][0]
                    ?? $json['embedding']
                    ?? null;

                if (is_array($vector) && ! empty($vector)) {
                    return $this->normalizeVector($vector);
                }
            }

            Log::error('QwenEmbeddingService::generateEmbedding gagal', [
                'status' => $response->status(),
                'endpoint' => $endpoint,
                'error' => $response->json() ?? $response->body(),
            ]);

            return null;
        } catch (\Throwable $e) {
            Log::error('QwenEmbeddingService::generateEmbedding Exception: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }

    /**
     * Menghasilkan array vektor untuk batch teks.
     *
     * @param  array<string>  $texts  Kumpulan teks yang akan di-embed
     * @param  (callable(int $retryDelay, int $attempt): void)|null  $onRateLimit  Callback saat rate limit
     * @return array<int, array<float>|null> Array kumpulan vektor sesuai index kunci asli
     */
    public function batchGenerateEmbeddings(array $texts, ?callable $onRateLimit = null): array
    {
        if (empty($texts)) {
            return [];
        }

        if (empty($this->apiKey)) {
            Log::warning('QwenEmbeddingService: QWEN_API_KEY belum dikonfigurasi di file .env');

            return array_fill(0, count($texts), null);
        }

        $endpoint = $this->getEndpoint();
        // Chunk per 20 teks per batch request agar tidak melebihi batas payload API gateway
        $chunks = array_chunk($texts, 20, true);
        $allEmbeddings = [];

        foreach ($chunks as $chunk) {
            $chunkKeys = array_keys($chunk);
            $chunkTexts = array_values(array_map('trim', $chunk));

            $payload = [
                'model' => $this->model,
                'input' => $chunkTexts,
            ];

            if ($this->dimensions !== null && $this->dimensions > 0) {
                $payload['dimensions'] = $this->dimensions;
            }

            $maxAttempts = 3;
            $attempt = 0;
            $success = false;

            while ($attempt < $maxAttempts && ! $success) {
                $attempt++;

                try {
                    $response = Http::timeout($this->timeout)
                        ->withHeaders([
                            'Authorization' => "Bearer {$this->apiKey}",
                            'Content-Type' => 'application/json',
                        ])
                        ->post($endpoint, $payload);

                    if ($response->successful()) {
                        $json = $response->json();
                        $dataItems = $json['data'] ?? [];

                        foreach ($dataItems as $item) {
                            $idx = $item['index'] ?? null;
                            $vec = $item['embedding'] ?? null;

                            if ($idx !== null && isset($chunkKeys[$idx]) && is_array($vec)) {
                                $originalKey = $chunkKeys[$idx];
                                $allEmbeddings[$originalKey] = $this->normalizeVector($vec);
                            }
                        }

                        // Pastikan jika ada item yang tidak tercakup, set null
                        foreach ($chunkKeys as $k) {
                            if (! isset($allEmbeddings[$k])) {
                                $allEmbeddings[$k] = null;
                            }
                        }

                        $success = true;
                    } elseif ($response->status() === 429) {
                        $retryDelay = 15;
                        $retryHeader = $response->header('Retry-After');
                        if (! empty($retryHeader) && is_numeric($retryHeader)) {
                            $retryDelay = max(2, (int) $retryHeader);
                        }

                        Log::warning("QwenEmbeddingService: Rate limit 429 tercapai. Menunggu {$retryDelay} detik (percobaan #{$attempt})...");

                        if (is_callable($onRateLimit)) {
                            $onRateLimit($retryDelay, $attempt);
                        }

                        sleep($retryDelay);
                    } else {
                        Log::error('QwenEmbeddingService::batchGenerateEmbeddings gagal', [
                            'status' => $response->status(),
                            'error' => $response->json() ?? $response->body(),
                        ]);
                        break;
                    }
                } catch (\Throwable $e) {
                    Log::error('QwenEmbeddingService::batchGenerateEmbeddings Exception: '.$e->getMessage());
                    break;
                }
            }

            if (! $success) {
                foreach ($chunkKeys as $originalKey) {
                    $allEmbeddings[$originalKey] = null;
                }
            }
        }

        return $allEmbeddings;
    }

    /**
     * Melakukan normalisasi L2 (Unit Vector) agar perkalian dot_product(a, b)
     * tepat bernilai Cosine Similarity (-1.0 s.d. 1.0).
     *
     * @param  array<float>  $vector
     * @return array<float>
     */
    public function normalizeVector(array $vector): array
    {
        $sumSquares = 0.0;
        foreach ($vector as $val) {
            $f = (float) $val;
            $sumSquares += ($f * $f);
        }

        $norm = sqrt($sumSquares);
        if ($norm <= 0.0) {
            return $vector;
        }

        return array_map(fn ($val) => (float) $val / $norm, $vector);
    }

    /**
     * Mengubah array float PHP menjadi string literal array PostgreSQL: '{0.0123,-0.0456,...}'
     * Digunakan untuk parameter binding kueri SQL dot_product(?::float8[], ...).
     *
     * @param  array<float>  $embedding
     */
    public function formatToPgArray(array $embedding): string
    {
        return '{'.implode(',', array_map(fn ($v) => (string) (float) $v, $embedding)).'}';
    }

    /**
     * Menguji konektivitas API Qwen Embedding untuk memverifikasi endpoint & token.
     *
     * @return array{success: bool, dimension: ?int, message: string}
     */
    public function testConnection(string $sampleText = 'Uji konektivitas embedding hukum LawGates'): array
    {
        if (empty($this->apiKey)) {
            return [
                'success' => false,
                'dimension' => null,
                'message' => 'QWEN_API_KEY belum dikonfigurasi di file .env',
            ];
        }

        $endpoint = $this->getEndpoint();

        try {
            $vector = $this->generateEmbedding($sampleText);
            if ($vector && count($vector) > 0) {
                return [
                    'success' => true,
                    'dimension' => count($vector),
                    'message' => "Koneksi sukses! Model: {$this->model}, Dimensi vektor: ".count($vector).", Endpoint: {$endpoint}",
                ];
            }

            return [
                'success' => false,
                'dimension' => null,
                'message' => "Koneksi ke {$endpoint} gagal mendapatkan embedding. Periksa response error di laravel.log",
            ];
        } catch (\Throwable $e) {
            return [
                'success' => false,
                'dimension' => null,
                'message' => 'Error saat menguji koneksi: '.$e->getMessage(),
            ];
        }
    }
}

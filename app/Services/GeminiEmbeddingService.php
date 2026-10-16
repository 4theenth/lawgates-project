<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiEmbeddingService
{
    protected string $apiKey;

    protected string $model;

    protected int $outputDimensionality;

    protected bool $sslVerify;

    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

    public function __construct()
    {
        $this->apiKey = (string) config('services.gemini.api_key', '');
        $this->model = (string) config('services.gemini.embedding_model', 'gemini-embedding-001');
        $this->outputDimensionality = (int) config('services.gemini.output_dimensionality', 768);
        $this->sslVerify = (bool) config('services.gemini.ssl_verify', false);
    }

    /**
     * Menghasilkan array vektor (768 dimensi) untuk satu teks menggunakan Gemini Embedding.
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

        if (empty($this->apiKey)) {
            Log::warning('GeminiEmbeddingService: GEMINI_API_KEY belum dikonfigurasi di file .env');

            return null;
        }

        try {
            $endpoint = "{$this->baseUrl}/models/{$this->model}:embedContent?key={$this->apiKey}";

            $client = Http::timeout(30);
            if (! $this->sslVerify) {
                $client = $client->withoutVerifying();
            }

            $payload = [
                'content' => [
                    'parts' => [
                        ['text' => $trimmed],
                    ],
                ],
            ];

            if ($this->outputDimensionality > 0) {
                $payload['outputDimensionality'] = $this->outputDimensionality;
            }

            $response = $client->post($endpoint, $payload);

            if ($response->successful()) {
                $values = $response->json('embedding.values');
                if (is_array($values) && ! empty($values)) {
                    return $values;
                }
            }

            Log::error('GeminiEmbeddingService::generateEmbedding gagal', [
                'status' => $response->status(),
                'error' => $response->json(),
            ]);

            return null;
        } catch (\Throwable $e) {
            Log::error('GeminiEmbeddingService::generateEmbedding Exception: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }

    /**
     * Menghasilkan array vektor untuk beberapa teks sekaligus (batch) hingga maksimal 100 teks per request.
     * Dilengkapi mekanisme auto-retry jika terkena rate limit (HTTP 429).
     *
     * @param  array<string>  $texts  Kumpulan teks yang akan di-embed
     * @param  (callable(int $retryDelay, int $attempt): void)|null  $onRateLimit  Callback saat rate limit tercapai
     * @return array<int, array<float>|null> Array kumpulan vektor sesuai urutan teks
     */
    public function batchGenerateEmbeddings(array $texts, ?callable $onRateLimit = null): array
    {
        if (empty($texts)) {
            return [];
        }

        if (empty($this->apiKey)) {
            Log::warning('GeminiEmbeddingService: GEMINI_API_KEY belum dikonfigurasi di file .env');

            return array_fill(0, count($texts), null);
        }

        // Gemini batchEmbedContents mendukung maksimal 100 item per request
        $chunks = array_chunk($texts, 100, true);
        $allEmbeddings = [];

        foreach ($chunks as $chunk) {
            $requests = [];
            $chunkKeys = array_keys($chunk);

            foreach ($chunk as $text) {
                $reqItem = [
                    'model' => "models/{$this->model}",
                    'content' => [
                        'parts' => [
                            ['text' => trim($text)],
                        ],
                    ],
                ];

                if ($this->outputDimensionality > 0) {
                    $reqItem['outputDimensionality'] = $this->outputDimensionality;
                }

                $requests[] = $reqItem;
            }

            $endpoint = "{$this->baseUrl}/models/{$this->model}:batchEmbedContents?key={$this->apiKey}";
            $client = Http::timeout(60);
            if (! $this->sslVerify) {
                $client = $client->withoutVerifying();
            }

            $maxAttempts = 5;
            $attempt = 0;
            $success = false;

            while ($attempt < $maxAttempts && ! $success) {
                $attempt++;

                try {
                    $response = $client->post($endpoint, [
                        'requests' => $requests,
                    ]);

                    if ($response->successful()) {
                        $rawEmbeddings = $response->json('embeddings') ?? [];
                        foreach ($chunkKeys as $index => $originalKey) {
                            $values = $rawEmbeddings[$index]['values'] ?? null;
                            $allEmbeddings[$originalKey] = is_array($values) ? $values : null;
                        }
                        $success = true;
                    } elseif ($response->status() === 429) {
                        // Rate limit Google AI Studio tercapai (biasanya batas 100 per menit di free tier)
                        $retryDelay = 30;
                        $details = $response->json('error.details', []);
                        foreach ($details as $d) {
                            if (isset($d['retryDelay'])) {
                                $parsed = (int) filter_var($d['retryDelay'], FILTER_SANITIZE_NUMBER_INT);
                                if ($parsed > 0) {
                                    $retryDelay = $parsed + 2;
                                }
                            }
                        }

                        // Jika retryDelay > 60 detik, ini adalah Kuota Harian (Daily Limit / RPD), bukan sekadar limit per-menit.
                        if ($retryDelay > 60) {
                            Log::warning("GeminiEmbeddingService: Kuota harian (RPD) Google AI Studio tercapai ({$retryDelay} detik). Pemrosesan batch dihentikan.");

                            if (is_callable($onRateLimit)) {
                                $onRateLimit($retryDelay, $attempt);
                            }

                            break;
                        }

                        Log::warning("GeminiEmbeddingService: Rate limit per-menit 429 tercapai. Menunggu {$retryDelay} detik sebelum percobaan ulang #{$attempt}...");

                        if (is_callable($onRateLimit)) {
                            $onRateLimit($retryDelay, $attempt);
                        }

                        sleep($retryDelay);
                    } else {
                        Log::error('GeminiEmbeddingService::batchGenerateEmbeddings gagal', [
                            'status' => $response->status(),
                            'error' => $response->json(),
                        ]);
                        break;
                    }
                } catch (\Throwable $e) {
                    Log::error('GeminiEmbeddingService::batchGenerateEmbeddings Exception: '.$e->getMessage());
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
     * Mengubah array float PHP menjadi format PostgreSQL array literal string: '{0.0123, -0.0456, ...}'
     * Berguna untuk binding parameter kueri SQL mentah / function dot_product(?::float8[], ...).
     *
     * @param  array<float>  $embedding
     */
    public function formatToPgArray(array $embedding): string
    {
        return '{'.implode(',', array_map(fn ($v) => (string) (float) $v, $embedding)).'}';
    }
}

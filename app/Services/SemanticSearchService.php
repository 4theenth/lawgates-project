<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SemanticSearchService
{
    public function __construct(
        protected GeminiEmbeddingService $geminiService
    ) {}

    /**
     * Mencari pasal-pasal yang relevan secara semantik berdasarkan makna query pengguna.
     * Mengembalikan Collection yang dipetakan per peraturan_id dengan pasal yang paling relevan.
     *
     * @param  string  $keyword  Teks query pencarian pengguna
     * @param  float  $threshold  Batas minimum skor kemiripan kosinus (0.0 - 1.0)
     * @param  int  $limit  Batas maksimal pasal yang dianalisis
     * @return Collection<int, array{pasal_id: int, nomor_pasal: string, cuplikan: string, similarity: float}>
     */
    public function searchRelevantPasal(string $keyword, float $threshold = 0.25, int $limit = 50): Collection
    {
        $trimmed = trim($keyword);
        if ($trimmed === '') {
            return collect();
        }

        try {
            $queryVector = $this->geminiService->generateEmbedding($trimmed);
            if (! $queryVector) {
                return collect();
            }

            $pgArray = $this->geminiService->formatToPgArray($queryVector);

            $rawResults = DB::select('
                SELECT 
                    p.id as pasal_id,
                    p.peraturan_id,
                    p.nomor_pasal,
                    LEFT(p.isi_pasal, 180) as cuplikan,
                    dot_product(p.embedding, CAST(? AS float8[])) as similarity
                FROM pasal p
                WHERE p.embedding IS NOT NULL
                  AND dot_product(p.embedding, CAST(? AS float8[])) >= ?
                ORDER BY similarity DESC
                LIMIT ?
            ', [$pgArray, $pgArray, $threshold, $limit]);

            $grouped = collect();

            foreach ($rawResults as $row) {
                $peraturanId = (int) $row->peraturan_id;

                // Hanya simpan pasal dengan similarity tertinggi untuk tiap peraturan induk
                if (! $grouped->has($peraturanId)) {
                    $grouped->put($peraturanId, [
                        'pasal_id' => (int) $row->pasal_id,
                        'nomor_pasal' => (string) $row->nomor_pasal,
                        'cuplikan' => trim((string) $row->cuplikan),
                        'similarity' => round((float) $row->similarity, 4),
                    ]);
                }
            }

            return $grouped;
        } catch (\Throwable $e) {
            Log::error('SemanticSearchService::searchRelevantPasal Exception: '.$e->getMessage(), [
                'keyword' => $trimmed,
            ]);

            return collect();
        }
    }
}

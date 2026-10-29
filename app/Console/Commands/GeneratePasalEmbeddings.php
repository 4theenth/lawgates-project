<?php

namespace App\Console\Commands;

use App\Models\Pasal;
use App\Services\QwenEmbeddingService;
use App\Services\SemanticSearchService;
use Illuminate\Console\Command;

class GeneratePasalEmbeddings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'regulations:embed-pasal 
                            {--limit= : Batasi jumlah pasal yang akan diproses}
                            {--chunk=20 : Jumlah pasal per batch request Qwen}
                            {--delay=1 : Jeda detik antar batch untuk mematuhi rate limit API}
                            {--force : Paksa embed ulang pasal yang sudah memiliki embedding}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menghasilkan vektor embedding Qwen untuk data pasal di database LawGates';

    /**
     * Execute the console command.
     */
    public function handle(QwenEmbeddingService $embeddingService): int
    {
        $this->info('Memulai proses embedding data pasal menggunakan model Qwen...');

        // Cek konektivitas API terlebih dahulu
        $test = $embeddingService->testConnection('Uji coba awal embedding');
        if (! $test['success']) {
            $this->error('Koneksi ke API Qwen gagal: '.$test['message']);
            $this->warn('Pastikan QWEN_BASE_URL dan QWEN_API_KEY di file .env sudah sesuai.');

            return Command::FAILURE;
        }

        $this->info("Koneksi API valid! Dimensi vektor terdeteksi: {$test['dimension']}");

        $query = Pasal::with('peraturan');

        if (! $this->option('force')) {
            $query->whereNull('embedding');
        }

        if ($limit = (int) $this->option('limit')) {
            $query->limit($limit);
        }

        $total = $query->count();

        if ($total === 0) {
            $this->info('Semua pasal sudah memiliki embedding! Gunakan opsi --force jika ingin men-generate ulang.');

            return Command::SUCCESS;
        }

        $this->info("Ditemukan {$total} pasal yang akan diproses.");

        $chunkSize = max(1, min(100, (int) $this->option('chunk')));
        $delay = max(0, (int) $this->option('delay'));

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $processedCount = 0;
        $successCount = 0;
        $failedCount = 0;

        $pasals = $query->get();

        foreach ($pasals->chunk($chunkSize) as $chunk) {
            $textsToEmbed = [];
            $pasalMap = [];

            foreach ($chunk as $pasal) {
                $peraturanJudul = $pasal->peraturan?->judul ?? 'Peraturan';
                $nomorPasal = $pasal->nomor_pasal ?? 'Pasal';
                $isiPasal = trim((string) $pasal->isi_pasal);

                // Contextual chunking: sertakan judul peraturan agar model AI memahami konteks hukumnya
                $contextualText = "{$peraturanJudul} - {$nomorPasal}: {$isiPasal}";

                $textsToEmbed[$pasal->id] = $contextualText;
                $pasalMap[$pasal->id] = $pasal;
            }

            $onRateLimit = function (int $retryDelay, int $attempt) use ($bar) {
                $bar->clear();
                $this->warn("\n⚠️ Rate limit tercapai. Menunggu {$retryDelay} detik sebelum mencoba ulang (percobaan #{$attempt})...");
                $bar->display();
            };

            try {
                $embeddings = $embeddingService->batchGenerateEmbeddings($textsToEmbed, $onRateLimit);

                foreach ($embeddings as $pasalId => $vector) {
                    if (is_array($vector) && ! empty($vector)) {
                        $targetPasal = $pasalMap[$pasalId] ?? null;
                        if ($targetPasal) {
                            $targetPasal->embedding = $vector;
                            $targetPasal->saveQuietly();
                            $successCount++;
                        }
                    } else {
                        $failedCount++;
                    }
                    $processedCount++;
                    $bar->advance();
                }
            } catch (\Throwable $e) {
                $this->error("\nError pada batch: ".$e->getMessage());
                $failedCount += count($chunk);
                $bar->advance(count($chunk));
            }

            if ($delay > 0 && $processedCount < $total) {
                sleep($delay);
            }
        }

        $bar->finish();
        $this->newLine(2);

        $this->table(
            ['Metrik', 'Jumlah'],
            [
                ['Total Diproses', $processedCount],
                ['Berhasil', $successCount],
                ['Gagal / Lewat', $failedCount],
            ]
        );

        if ($successCount > 0) {
            SemanticSearchService::clearCache();
            $this->info('Semantic search cache berhasil di-refresh!');
        }

        $this->info('Proses embedding pasal selesai!');

        return Command::SUCCESS;
    }
}

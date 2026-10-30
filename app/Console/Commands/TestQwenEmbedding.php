<?php

namespace App\Console\Commands;

use App\Services\QwenEmbeddingService;
use Illuminate\Console\Command;

class TestQwenEmbedding extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'qwen:test {text=Halo LawGates, uji konektivitas Qwen embedding}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menguji konektivitas API Qwen Embedding dari konfigurasi .env';

    /**
     * Execute the console command.
     */
    public function handle(QwenEmbeddingService $embeddingService): int
    {
        $text = (string) $this->argument('text');

        $this->info('Menguji konektivitas API Qwen Embedding...');
        $this->line("Endpoint: {$embeddingService->getEndpoint()}");
        $this->line('Model: '.config('services.qwen.embedding_model'));
        $this->line('Teks input: "'.$text.'"');

        $result = $embeddingService->testConnection($text);

        if ($result['success']) {
            $this->info("\n✅ BERHASIL!");
            $this->info($result['message']);

            return Command::SUCCESS;
        }

        $this->error("\n❌ GAGAL!");
        $this->error($result['message']);
        $this->warn("\nLangkah perbaikan:");
        $this->line('1. Pastikan QWEN_BASE_URL di file .env sesuai (contoh: https://api.mindrouter.ai/v1)');
        $this->line('2. Pastikan QWEN_API_KEY di file .env sudah terisi token bearer Anda (sk_xxx)');
        $this->line('3. Pastikan QWEN_EMBEDDING_MODEL di file .env sesuai dengan model yang Anda beli');

        return Command::FAILURE;
    }
}

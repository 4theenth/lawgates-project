<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Peraturan;
use App\Services\DocumentStorageService;

class CacheMinioDocuments extends Command
{
    protected $signature = 'documents:cache {--force : Re-cache even if already cached}';
    protected $description = 'Pre-cache PDF documents from MinIO to local storage for instant loading';

    public function handle(): int
    {
        $this->info('Starting MinIO PDF pre-caching...');

        $peraturans = Peraturan::with('jenisPeraturan')->get();
        $total = $peraturans->count();

        $this->info("Found {$total} regulation records.");

        $cachedCount = 0;
        $failedCount = 0;
        $skippedCount = 0;

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        foreach ($peraturans as $peraturan) {
            $uniqueId = $peraturan->unique_id;

            if (!$this->option('force') && DocumentStorageService::hasLocalCache($uniqueId)) {
                $skippedCount++;
                $bar->advance();
                continue;
            }

            $localPath = DocumentStorageService::getCachedOrDownload($peraturan);
            if ($localPath) {
                $cachedCount++;
            } else {
                $failedCount++;
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->info("Pre-caching finished!");
        $this->table(
            ['Status', 'Count'],
            [
                ['Newly Cached', $cachedCount],
                ['Already Cached (Skipped)', $skippedCount],
                ['PDF Not Available / Failed', $failedCount],
                ['Total', $total],
            ]
        );

        return Command::SUCCESS;
    }
}

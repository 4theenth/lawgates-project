<?php

namespace App\Console\Commands;

use App\Models\Peraturan;
use App\Services\DocumentStorageService;
use Illuminate\Console\Command;

class SyncPdfAvailability extends Command
{
    protected $signature = 'documents:sync-pdf';

    protected $description = 'Sinkronkan ketersediaan berkas PDF MinIO ke kolom file_pdf_path';

    public function handle(): int
    {
        set_time_limit(0);

        $this->info('Memindai berkas PDF di MinIO...');
        $availablePaths = DocumentStorageService::listAvailablePdfPaths();

        // Jangan kosongkan seluruh path hanya karena bucket/MinIO tidak terbaca.
        if ($availablePaths === []) {
            $this->error('Tidak ada berkas PDF ditemukan. Sinkronisasi dibatalkan.');

            return self::FAILURE;
        }

        $this->info('Ditemukan ' . count($availablePaths) . ' berkas PDF.');

        $linked = 0;
        $cleared = 0;
        $unchanged = 0;

        Peraturan::with('jenisPeraturan')
            ->chunkById(500, function ($rows) use ($availablePaths, &$linked, &$cleared, &$unchanged) {
                foreach ($rows as $peraturan) {
                    $availablePath = DocumentStorageService::findAvailablePath($peraturan, $availablePaths);

                    if ($availablePath === $peraturan->file_pdf_path) {
                        $unchanged++;
                        continue;
                    }

                    DocumentStorageService::clearLocalCache($peraturan->unique_id);
                    $peraturan->update(['file_pdf_path' => $availablePath]);

                    if ($availablePath === null) {
                        $cleared++;
                    } else {
                        $linked++;
                    }
                }
            });

        $this->table(
            ['Ditautkan', 'Dikosongkan', 'Tetap'],
            [[$linked, $cleared, $unchanged]]
        );

        return self::SUCCESS;
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncPerdaMinio extends Command
{
    protected $signature = 'perda:sync-minio 
                            {--folder= : Batasi subfolder tertentu (misal: pemerintah_kabupaten_badung)}
                            {--limit=0 : Batasi jumlah dokumen yang diimport (0 = semua)}';

    protected $description = 'Sinkronisasi seluruh Perda dari penyimpanan MinIO ke database PostgreSQL';

    public function handle(): int
    {
        return $this->call('minio:import', [
            '--category' => ['perda'],
            '--folder' => $this->option('folder'),
            '--limit' => $this->option('limit'),
        ]);
    }
}

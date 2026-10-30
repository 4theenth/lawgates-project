<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncPerdaMinio extends Command
{
    protected $signature = 'perda:sync-minio 
                            {--folder= : Batasi subfolder tertentu (misal: pemerintah_kabupaten_badung)}
                            {--limit=0 : Batasi jumlah dokumen yang diimport (0 = semua)}
                            {--no-force : Jangan perbarui dokumen yang sudah ada}
                            {--cache : Hangatkan cache PDF setelah sinkronisasi}';

    protected $description = 'Sinkronisasi seluruh Perda dari penyimpanan MinIO ke database PostgreSQL';

    /**
     * Re-import adalah default perintah "sync": metadata OCR yang sudah dikoreksi
     * tidak akan pernah masuk bila baris lama dilewati. Pakai --no-force untuk
     * sekadar menambah dokumen baru.
     */
    public function handle(): int
    {
        return $this->call('minio:import', [
            '--category' => ['perda'],
            '--folder' => $this->option('folder'),
            '--limit' => $this->option('limit'),
            '--force' => ! $this->option('no-force'),
            '--cache' => (bool) $this->option('cache'),
        ]);
    }
}

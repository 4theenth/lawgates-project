<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Services\DocumentImportService;

class ImportOcrJson extends Command
{
    protected $signature = 'import:ocr {file}';
    protected $description = 'Import JSON OCR komprehensif ke PostgreSQL secara adaptif';

    public function handle(DocumentImportService $importService)
    {
        $rawPath = $this->argument('file');
        $filePath = storage_path('app/' . $rawPath);

        if (!File::exists($filePath)) {
            if (File::exists($rawPath)) {
                $filePath = $rawPath;
            } elseif (File::exists(base_path($rawPath))) {
                $filePath = base_path($rawPath);
            } else {
                $this->error("File tidak ditemukan: {$rawPath}");
                return 1;
            }
        }

        $json = File::get($filePath);
        $data = json_decode($json, true);

        if (!$data || !is_array($data)) {
            $this->error("Gagal membaca atau mem-parsing format JSON.");
            return 1;
        }

        $this->info("Memproses import dokumen hukum secara adaptif...");
        try {
            $peraturan = $importService->import($data);
            $this->info("✓ Berhasil mengimpor peraturan: {$peraturan->judul} (ID: {$peraturan->id}, Unique: {$peraturan->unique_id})");
            return 0;
        } catch (\Exception $e) {
            $this->error("Terjadi kesalahan: " . $e->getMessage());
            return 1;
        }
    }
}
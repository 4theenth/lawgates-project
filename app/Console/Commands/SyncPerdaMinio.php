<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Services\DocumentImportService;
use App\Services\RegulationLevelDetector;
use App\Http\Controllers\Api\RegionController;

class SyncPerdaMinio extends Command
{
    protected $signature = 'perda:sync-minio 
                            {--folder= : Batasi subfolder tertentu (misal: pemerintah_kabupaten_badung)}
                            {--limit=0 : Batasi jumlah dokumen yang diimport (0 = semua)}';
    
    protected $description = 'Sinkronisasi seluruh Perda dari penyimpanan MinIO ke database PostgreSQL';

    public function handle(DocumentImportService $importService): int
    {
        $this->info("Memulai pemindaian dokumen Perda di MinIO...");

        $disk = Storage::disk('minio');
        $baseFolder = 'documents/perda';

        if ($this->option('folder')) {
            $baseFolder .= '/' . trim($this->option('folder'), '/');
        }

        $allFiles = $disk->allFiles($baseFolder);
        $ocrFiles = array_values(array_filter($allFiles, function ($f) {
            return str_ends_with(strtolower($f), '/ocr.json') || str_ends_with(strtolower($f), 'ocr.json');
        }));

        $total = count($ocrFiles);
        $this->info("Ditemukan {$total} file OCR Perda di MinIO.");

        if ($total === 0) {
            $this->warn("Tidak ada file ocr.json yang ditemukan di {$baseFolder}.");
            return 0;
        }

        $limit = (int) $this->option('limit');
        if ($limit > 0 && $limit < $total) {
            $ocrFiles = array_slice($ocrFiles, 0, $limit);
            $total = $limit;
            $this->info("Dibatasi menjadi {$total} dokumen sesuai opsi --limit.");
        }

        $successCount = 0;
        $failedCount = 0;

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        foreach ($ocrFiles as $ocrPath) {
            try {
                $content = $disk->get($ocrPath);
                $data = json_decode($content, true);

                if (!$data || !is_array($data)) {
                    $failedCount++;
                    $bar->advance();
                    continue;
                }

                $dir = dirname($ocrPath);
                $parts = explode('/', $dir);
                $subfolderRaw = count($parts) >= 3 ? $parts[2] : null;

                // Jika pemrakarsa belum ada di metadata, manfaatkan nama subfolder (misal: pemerintah_kabupaten_badung)
                if (empty($data['metadata']['pemrakarsa']) && $subfolderRaw) {
                    $subfolderFormatted = ucwords(str_replace('_', ' ', $subfolderRaw));
                    $data['metadata']['pemrakarsa'] = $subfolderFormatted;
                }

                // Normalisasi nama pemrakarsa melalui detector
                if (!empty($data['metadata']['pemrakarsa'])) {
                    $levelInfo = RegulationLevelDetector::detect($data['metadata']['pemrakarsa']);
                    $data['metadata']['pemrakarsa'] = $levelInfo['pemrakarsa_clean'];
                    if (empty($data['metadata']['lokasi_daerah'])) {
                        $data['metadata']['lokasi_daerah'] = $levelInfo['pemrakarsa_clean'];
                    }
                }

                $peraturan = $importService->import($data);

                if ($peraturan) {
                    $expectedPdf = $dir . '/document.pdf';
                    $peraturan->update([
                        'file_pdf_path' => $expectedPdf,
                        'instansi' => $data['metadata']['pemrakarsa'] ?? $peraturan->instansi,
                        'lokasi_daerah' => $data['metadata']['lokasi_daerah'] ?? $peraturan->lokasi_daerah,
                    ]);
                    $successCount++;
                } else {
                    $failedCount++;
                }

            } catch (\Exception $e) {
                if (str_contains($e->getMessage(), 'sudah ada di database')) {
                    // Update metadata peraturan yang sudah ada
                    $cleanPemrakarsa = $data['metadata']['pemrakarsa'] ?? null;
                    if ($cleanPemrakarsa) {
                        $levelInfo = RegulationLevelDetector::detect($cleanPemrakarsa);
                        $cleanPemrakarsa = $levelInfo['pemrakarsa_clean'];
                    }
                    $idDok = $data['metadata']['standard_id'] ?? $data['metadata']['id_dokumen'] ?? null;
                    if ($idDok) {
                        \App\Models\Peraturan::where('unique_id', $idDok)->update([
                            'instansi' => $cleanPemrakarsa,
                            'lokasi_daerah' => $cleanPemrakarsa,
                            'file_pdf_path' => dirname($ocrPath) . '/document.pdf'
                        ]);
                    }
                    $successCount++;
                } else {
                    Log::error("Gagal import Perda dari MinIO ({$ocrPath}): " . $e->getMessage());
                    $failedCount++;
                }
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        // Hapus cache statistik wilayah agar segera terbarui
        RegionController::clearCache();

        $this->info("Sinkronisasi dokumen Perda dari MinIO selesai!");
        $this->table(
            ['Kategori Status', 'Jumlah Dokumen'],
            [
                ['Berhasil Diimport / Disinkronkan', $successCount],
                ['Gagal / File Rusak', $failedCount],
                ['Total Diproses', $total],
            ]
        );

        return 0;
    }
}

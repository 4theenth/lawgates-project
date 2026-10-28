<?php

namespace App\Console\Commands;

use App\Http\Controllers\Api\RegionController;
use App\Models\Peraturan;
use App\Services\DocumentImportService;
use App\Services\RegulationLevelDetector;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ImportMinioDocuments extends Command
{
    protected $signature = 'minio:import
                            {--category=* : Batasi kategori (boleh berulang)}
                            {--folder= : Subfolder spesifik di dalam kategori}
                            {--limit=0 : Batasi jumlah dokumen (0 = semua)}
                            {--force : Re-import walau unique_id sudah ada}
                            {--cache : Warm cache PDF setelah import}
                            {--no-seed : Jangan seed master data otomatis}';

    protected $description = 'Import seluruh dokumen OCR dari MinIO ke database';

    public function handle(DocumentImportService $importService): int
    {
        set_time_limit(0);

        if (! $this->option('no-seed')) {
            $this->seedMasterData();
        }

        $disk = Storage::disk('minio');
        $categories = $this->resolveCategories($disk);

        if (empty($categories)) {
            $this->error('Tidak ada kategori dokumen di MinIO.');

            return self::FAILURE;
        }

        $files = $this->collectOcrFiles($disk, $categories);

        $limit = (int) $this->option('limit');
        if ($limit > 0 && $limit < count($files)) {
            $files = array_slice($files, 0, $limit);
        }

        if (empty($files)) {
            $this->warn('Tidak ada ocr.json yang ditemukan.');

            return self::SUCCESS;
        }

        $this->info('Ditemukan '.count($files).' file OCR.');

        $bar = $this->output->createProgressBar(count($files));
        $bar->start();

        $stats = [];
        $seen = [];
        $failures = [];

        foreach ($files as $ocrPath) {
            $category = explode('/', $ocrPath)[1] ?? 'lainnya';
            $stats[$category] ??= ['ok' => 0, 'skip' => 0, 'fail' => 0];

            try {
                $data = json_decode($disk->get($ocrPath), true);

                if (! is_array($data)) {
                    throw new \RuntimeException('Format JSON tidak valid.');
                }

                $metadata = $data['metadata'] ?? [];
                $uniqueId = $metadata['id_dokumen']
                    ?? $metadata['standard_id']
                    ?? $metadata['unique_id']
                    ?? null;

                if (! $uniqueId) {
                    throw new \RuntimeException('unique_id tidak ditemukan pada metadata.');
                }

                if (isset($seen[$uniqueId])) {
                    $stats[$category]['skip']++;
                    $bar->advance();

                    continue;
                }
                $seen[$uniqueId] = true;

                if (! $this->option('force') && Peraturan::withTrashed()->where('unique_id', $uniqueId)->exists()) {
                    $stats[$category]['skip']++;
                    $bar->advance();

                    continue;
                }

                $data['metadata'] = $this->normalizeMetadata($metadata, $ocrPath, $category);

                $peraturan = $importService->import($data);

                $pdfPath = dirname($ocrPath).'/document.pdf';
                $updates = [
                    'instansi' => $data['metadata']['pemrakarsa'] ?? $peraturan->instansi,
                    'lokasi_daerah' => $data['metadata']['lokasi_daerah'] ?? $peraturan->lokasi_daerah,
                ];

                if ($disk->exists($pdfPath)) {
                    $updates['file_pdf_path'] = $pdfPath;
                }

                $peraturan->update($updates);

                $stats[$category]['ok']++;
            } catch (\Throwable $e) {
                $stats[$category]['fail']++;

                if (count($failures) < 20) {
                    $failures[$ocrPath] = $e->getMessage();
                }

                Log::error('MinIO import gagal ('.$ocrPath.'): '.$e->getMessage());
            }

            $bar->advance();
            unset($data, $metadata, $peraturan);
        }

        $bar->finish();
        $this->newLine(2);

        RegionController::clearCache();

        $this->table(
            ['Kategori', 'Berhasil', 'Dilewati', 'Gagal'],
            collect($stats)
                ->map(fn ($stat, $category) => [$category, $stat['ok'], $stat['skip'], $stat['fail']])
                ->values()
                ->all()
        );

        if (! empty($failures)) {
            $this->warn('Contoh kegagalan:');
            foreach ($failures as $path => $message) {
                $this->line(" - {$path}: {$message}");
            }
        }

        if ($this->option('cache')) {
            $this->call('documents:cache');
        }

        return self::SUCCESS;
    }

    private function seedMasterData(): void
    {
        $seeders = [];

        if ($this->isTableEmpty('jenis_peraturan')) {
            $seeders[] = 'JenisPeraturanSeeder';
        }
        if ($this->isTableEmpty('status_peraturan')) {
            $seeders[] = 'StatusPeraturanSeeder';
        }
        if ($this->isTableEmpty('admins')) {
            $seeders[] = 'AdminSeeder';
        }
        if ($this->isTableEmpty('users')) {
            $seeders[] = 'UserSeeder';
        }

        foreach ($seeders as $seeder) {
            $this->call('db:seed', [
                '--class' => 'Database\\Seeders\\'.$seeder,
                '--force' => true,
            ]);
        }
    }

    private function isTableEmpty(string $table): bool
    {
        return Schema::hasTable($table) && DB::table($table)->count() === 0;
    }

    private function resolveCategories($disk): array
    {
        $selected = array_values(array_filter((array) $this->option('category')));

        if (! empty($selected)) {
            return $selected;
        }

        return collect($disk->directories('documents'))
            ->map(fn ($path) => basename($path))
            ->values()
            ->all();
    }

    private function collectOcrFiles($disk, array $categories): array
    {
        $files = [];
        $folder = trim((string) $this->option('folder'), '/');

        foreach ($categories as $category) {
            $base = 'documents/'.$category.($folder !== '' ? '/'.$folder : '');

            foreach ($disk->allFiles($base) as $path) {
                if (str_ends_with(strtolower($path), 'ocr.json')) {
                    $files[] = $path;
                }
            }
        }

        sort($files);

        return $files;
    }

    private function normalizeMetadata(array $metadata, string $ocrPath, string $category): array
    {
        $parts = explode('/', dirname($ocrPath));
        $subfolder = $parts[2] ?? null;

        if (empty($metadata['pemrakarsa']) && $category === 'perda' && $subfolder) {
            $metadata['pemrakarsa'] = ucwords(str_replace('_', ' ', $subfolder));
        }

        if (! empty($metadata['pemrakarsa'])) {
            $level = RegulationLevelDetector::detect($metadata['pemrakarsa']);
            $metadata['pemrakarsa'] = $level['pemrakarsa_clean'] ?? $metadata['pemrakarsa'];

            if (empty($metadata['lokasi_daerah'])) {
                $metadata['lokasi_daerah'] = $level['pemrakarsa_clean'] ?? null;
            }
        }

        return $metadata;
    }
}

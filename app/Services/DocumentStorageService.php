<?php

namespace App\Services;

use App\Models\Peraturan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DocumentStorageService
{
    protected static string $cacheSubDir = 'pdf_cache';

    /**
     * Dapatkan path direktori cache lokal
     */
    public static function getCacheDir(): string
    {
        $dir = storage_path('app' . DIRECTORY_SEPARATOR . self::$cacheSubDir);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        return $dir;
    }

    /**
     * Dapatkan path file cache lokal untuk peraturan tertentu
     */
    public static function getLocalCachePath(string $uniqueId): string
    {
        return self::getCacheDir() . DIRECTORY_SEPARATOR . $uniqueId . '.pdf';
    }

    /**
     * Cek apakah cache lokal sudah tersedia dan valid
     */
    public static function hasLocalCache(string $uniqueId, ?string $minioPath = null): bool
    {
        $path = self::getLocalCachePath($uniqueId);
        if (self::isValidPdfFile($path)) {
            return true;
        }

        if ($minioPath) {
            $md5Path = self::getCacheDir() . DIRECTORY_SEPARATOR . md5($minioPath) . '.pdf';
            if (self::isValidPdfFile($md5Path)) {
                // Buat copy ke unique_id path agar lookup berikutnya instan
                @copy($md5Path, $path);
                return true;
            }
        }

        return false;
    }

    protected static function isValidPdfFile(string $path): bool
    {
        if (!file_exists($path) || filesize($path) < 1024) {
            return false;
        }

        $fh = fopen($path, 'rb');
        if (!$fh) return false;
        $header = fread($fh, 1024);
        fclose($fh);

        return str_starts_with(trim($header), '%PDF');
    }

    /**
     * Ambil path lokal (dari cache jika ada, atau unduh dari MinIO dan simpan ke cache)
     */
    /**
     * Clear local cache file for a specific uniqueId
     */
    public static function clearLocalCache(string $uniqueId): void
    {
        $path = self::getLocalCachePath($uniqueId);
        if (file_exists($path)) {
            @unlink($path);
        }
    }

    /**
     * Ambil path lokal (dari cache jika ada, atau unduh dari MinIO dan simpan ke cache)
     */
    public static function getCachedOrDownload(Peraturan $peraturan): ?string
    {
        $uniqueId = $peraturan->unique_id;

        // 1. Resolve path valid di MinIO secara cepat via HEAD check
        $validMinioPath = self::resolveValidMinioPath($peraturan);
        if (!$validMinioPath) {
            return null;
        }

        $cachePath = self::getLocalCachePath($uniqueId);
        $md5CachePath = self::getCacheDir() . DIRECTORY_SEPARATOR . md5($validMinioPath) . '.pdf';

        // 2. Cek apakah cache lokal spesifik untuk MinIO path ini sudah ada
        if (self::isValidPdfFile($md5CachePath)) {
            if (!file_exists($cachePath) || filesize($cachePath) !== filesize($md5CachePath)) {
                @copy($md5CachePath, $cachePath);
            }
            return $cachePath;
        }

        // 3. Unduh dari MinIO dan simpan ke cache lokal
        try {
            $disk = Storage::disk('minio');
            $readStream = $disk->readStream($validMinioPath);
            if (!$readStream) {
                return null;
            }

            $tempPath = $cachePath . '.tmp.' . uniqid();

            $writeStream = fopen($tempPath, 'wb');
            stream_copy_to_stream($readStream, $writeStream);
            fclose($readStream);
            fclose($writeStream);

            // Validasi file hasil unduhan
            $fh = fopen($tempPath, 'rb');
            $header = $fh ? fread($fh, 1024) : '';
            if ($fh) fclose($fh);

            if (str_starts_with(trim($header), '%PDF') && filesize($tempPath) > 1024) {
                @copy($tempPath, $md5CachePath);
                @rename($tempPath, $cachePath);
                return $cachePath;
            } else {
                @unlink($tempPath);
                Log::warning("Downloaded file from MinIO for {$uniqueId} ({$validMinioPath}) is not a valid PDF.");
                return null;
            }
        } catch (\Throwable $e) {
            Log::error("DocumentStorageService error for {$uniqueId}: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Cari path valid di MinIO
     */
    public static function resolveValidMinioPath(Peraturan $peraturan): ?string
    {
        $disk = Storage::disk('minio');

        $isPdfFile = function ($path) use ($disk) {
            try {
                return $disk->exists($path);
            } catch (\Throwable $e) {
                return false;
            }
        };

        $kodeJenis = $peraturan->jenisPeraturan ? trim($peraturan->jenisPeraturan->kode) : '';
        $namaJenis = $peraturan->jenisPeraturan ? trim($peraturan->jenisPeraturan->nama) : '';

        // Normalize category key
        $keyLower = strtolower($kodeJenis ?: $namaJenis ?: 'uu');

        // 1. Cek path yang tersimpan di DB
        if ($peraturan->file_pdf_path) {
            $pathLower = strtolower($peraturan->file_pdf_path);
            $isMismatch = false;

            if (!str_contains($keyLower, 'uu') && !str_contains(strtolower($namaJenis), 'undang-undang')) {
                if (str_contains($pathLower, '/uu/') || str_contains($pathLower, 'undang-undang')) {
                    $isMismatch = true;
                }
            }

            if (!$isMismatch && $isPdfFile($peraturan->file_pdf_path)) {
                return $peraturan->file_pdf_path;
            }
        }

        // Mapping kategori ke folder MinIO dan slug jenis lengkap
        $categoryMap = [
            'inpres'  => ['folders' => ['inpres', 'instruksi-presiden'], 'long_slugs' => ['instruksi-presiden', 'inpres']],
            'perda'   => ['folders' => ['perda', 'peraturan-daerah'], 'long_slugs' => ['peraturan-daerah', 'perda']],
            'p'       => ['folders' => ['perda', 'peraturan-daerah'], 'long_slugs' => ['peraturan-daerah', 'perda']],
            'perpres' => ['folders' => ['perpres', 'peraturan-presiden'], 'long_slugs' => ['peraturan-presiden', 'perpres']],
            'perpu'   => ['folders' => ['perpu', 'perppu'], 'long_slugs' => ['peraturan-pemerintah-pengganti-undang-undang', 'peraturan-pemerintah-pengganti', 'perpu']],
            'perppu'  => ['folders' => ['perpu', 'perppu'], 'long_slugs' => ['peraturan-pemerintah-pengganti-undang-undang', 'peraturan-pemerintah-pengganti', 'perpu']],
            'uudrt'   => ['folders' => ['uudrt', 'uu-darurat'], 'long_slugs' => ['undang-undang-darurat', 'uu-darurat', 'uudrt']],
            'uu darurat' => ['folders' => ['uudrt', 'uu-darurat'], 'long_slugs' => ['undang-undang-darurat', 'uu-darurat', 'uudrt']],
            'uud'     => ['folders' => ['uud', 'undang-undang-dasar'], 'long_slugs' => ['undang-undang-dasar', 'uud']],
            'uu'      => ['folders' => ['uu', 'undang-undang'], 'long_slugs' => ['undang-undang', 'uu']],
            'pp'      => ['folders' => ['pp', 'peraturan-pemerintah'], 'long_slugs' => ['peraturan-pemerintah', 'pp']],
            'permen'  => ['folders' => ['permen', 'peraturan-menteri'], 'long_slugs' => ['peraturan-menteri', 'permen']],
        ];

        // Cari konfigurasi yang sesuai
        $matched = null;
        foreach ($categoryMap as $catKey => $config) {
            if (str_contains($keyLower, $catKey) || str_contains(strtolower($namaJenis), $catKey)) {
                $matched = $config;
                break;
            }
        }
        if (!$matched) {
            $folderName = Str::slug($keyLower);
            $matched = ['folders' => [$folderName], 'long_slugs' => [$folderName]];
        }

        $folders = array_unique(array_filter($matched['folders']));
        $longSlugs = array_unique(array_filter($matched['long_slugs']));

        $nomorSlug = Str::slug($peraturan->nomor);
        $tahun = $peraturan->tahun;
        $uniqueId = $peraturan->unique_id;

        // Variasi instansi
        $instansiSlugs = [''];
        if (!empty($peraturan->instansi)) {
            $rawInstansi = trim($peraturan->instansi);
            $instansiSlugs[] = Str::slug($rawInstansi, '_');
            $instansiSlugs[] = Str::slug($rawInstansi, '-');

            $withoutPem = preg_replace('/^pemerintah[\-_\s]+/i', '', $rawInstansi);
            if ($withoutPem && $withoutPem !== $rawInstansi) {
                $instansiSlugs[] = Str::slug($withoutPem, '_');
                $instansiSlugs[] = Str::slug($withoutPem, '-');
            }
        }

        if ($uniqueId && preg_match('/(provinsi[_\-][a-z0-9_]+|kabupaten[_\-][a-z0-9_]+|kota[_\-][a-z0-9_]+)/i', $uniqueId, $m)) {
            $matchedInst = strtolower($m[1]);
            $instansiSlugs[] = $matchedInst;
            $instansiSlugs[] = 'pemerintah_' . $matchedInst;
            $instansiSlugs[] = 'pemerintah-' . str_replace('_', '-', $matchedInst);
        }
        $instansiSlugs = array_unique(array_filter($instansiSlugs, fn($s) => $s !== null));
        if (!in_array('', $instansiSlugs, true)) {
            array_unshift($instansiSlugs, '');
        }

        $candidatePaths = [];

        // 1. Pola standar per kategori
        foreach ($folders as $folder) {
            foreach ($longSlugs as $slug) {
                if ($nomorSlug && $tahun) {
                    $candidatePaths[] = "documents/{$folder}/{$slug}-{$nomorSlug}-{$tahun}/document.pdf";
                    $candidatePaths[] = "documents/{$folder}/{$slug}-nomor-{$nomorSlug}-tahun-{$tahun}/document.pdf";
                }

                // Dengan subfolder instansi (misal: documents/perda/pemerintah_provinsi_bali/peraturan-daerah-provinsi-bali-12-2025/document.pdf)
                foreach ($instansiSlugs as $inst) {
                    if ($inst === '') continue;
                    $instDash = str_replace('_', '-', $inst);
                    $instShortDash = preg_replace('/^pemerintah[\-_\s]*/i', '', $instDash);

                    if ($nomorSlug && $tahun) {
                        $candidatePaths[] = "documents/{$folder}/{$inst}/{$slug}-{$instDash}-{$nomorSlug}-{$tahun}/document.pdf";
                        if ($instShortDash !== '' && $instShortDash !== $instDash) {
                            $candidatePaths[] = "documents/{$folder}/{$inst}/{$slug}-{$instShortDash}-{$nomorSlug}-{$tahun}/document.pdf";
                        }
                        $candidatePaths[] = "documents/{$folder}/{$inst}/{$slug}-{$nomorSlug}-{$tahun}/document.pdf";
                    }
                    if ($uniqueId) {
                        $candidatePaths[] = "documents/{$folder}/{$inst}/{$uniqueId}/document.pdf";
                    }
                }

                // Berdasarkan unique_id di dalam folder kategori
                if ($uniqueId) {
                    $candidatePaths[] = "documents/{$folder}/{$uniqueId}/document.pdf";
                }
            }
        }

        // 2. Direct unique_id fallbacks
        if ($uniqueId) {
            $candidatePaths[] = "documents/{$uniqueId}/document.pdf";
            $candidatePaths[] = "documents/{$uniqueId}.pdf";
            $candidatePaths[] = "pdf_dokumen/{$uniqueId}.pdf";
        }

        // Filter dan deduplikasi
        $candidatePaths = array_values(array_unique(array_filter($candidatePaths)));

        // Cek secara efisien via HEAD request
        foreach ($candidatePaths as $candidate) {
            if ($isPdfFile($candidate)) {
                $peraturan->update(['file_pdf_path' => $candidate]);
                self::clearLocalCache($peraturan->unique_id);
                return $candidate;
            }
        }

        return null;
    }
}

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
        $cachePath = self::getLocalCachePath($uniqueId);

        // 1. Cek langsung jika cache lokal untuk uniqueId ini sudah valid & path di DB sudah tersimpan
        if (self::isValidPdfFile($cachePath) && !empty($peraturan->file_pdf_path)) {
            return $cachePath;
        }

        // 2. Resolve path valid di MinIO secara cepat via HEAD check
        $validMinioPath = self::resolveValidMinioPath($peraturan);
        if (!$validMinioPath) {
            // Jika pencarian MinIO gagal tetapi file cache lokal ada, kembalikan cache lokal
            if (self::isValidPdfFile($cachePath)) {
                return $cachePath;
            }
            return null;
        }

        $md5CachePath = self::getCacheDir() . DIRECTORY_SEPARATOR . md5($validMinioPath) . '.pdf';

        // 3. Cek apakah cache lokal spesifik untuk MinIO path ini sudah ada
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
     * Daftar path PDF yang benar-benar tersedia di MinIO.
     *
     * Sengaja tidak di-cache: dipakai oleh command sinkronisasi, bukan pada
     * request admin. Listing bucket bisa lambat sehingga tidak cocok dipanggil
     * per request.
     *
     * @return array<string, int> Map path => ukuran berkas (byte)
     */
    public static function listAvailablePdfPaths(): array
    {
        $paths = [];

        // ListObjectsV2 sudah membawa ukuran berkas, jadi tidak perlu
        // HEAD request tambahan per objek.
        foreach (Storage::disk('minio')->getDriver()->listContents('documents', true) as $object) {
            if (!$object->isFile()) {
                continue;
            }

            $path = ltrim($object->path(), '/');
            $size = (int) ($object->fileSize() ?? 0);

            if ($size <= 1024 || !str_ends_with(strtolower($path), '.pdf')) {
                continue;
            }

            $paths[$path] = $size;
        }

        return $paths;
    }

    /**
     * Cari path PDF yang tersedia untuk peraturan berdasarkan daftar objek
     * MinIO yang sudah dimuat sebelumnya.
     *
     * @param array<string, int> $availablePaths Hasil listAvailablePdfPaths()
     */
    public static function findAvailablePath(Peraturan $peraturan, array $availablePaths): ?string
    {
        if ($peraturan->file_pdf_path
            && !self::isMismatchedCategoryPath($peraturan, $peraturan->file_pdf_path)
            && isset($availablePaths[$peraturan->file_pdf_path])) {
            return $peraturan->file_pdf_path;
        }

        foreach (self::getCandidatePaths($peraturan) as $candidate) {
            if (isset($availablePaths[$candidate])) {
                return $candidate;
            }
        }

        return null;
    }

    /**
     * Cek apakah path tersimpan menunjuk folder kategori yang salah
     * (mis. perda yang tersimpan di folder /uu/).
     */
    protected static function isMismatchedCategoryPath(Peraturan $peraturan, string $path): bool
    {
        $kodeJenis = $peraturan->jenisPeraturan ? trim($peraturan->jenisPeraturan->kode) : '';
        $namaJenis = $peraturan->jenisPeraturan ? trim($peraturan->jenisPeraturan->nama) : '';
        $keyLower = strtolower($kodeJenis ?: $namaJenis ?: 'uu');
        $pathLower = strtolower($path);

        if (!str_contains($keyLower, 'uu') && !str_contains(strtolower($namaJenis), 'undang-undang')) {
            // Hanya segmen folder kategori yang diperiksa. Judul folder dokumen
            // lain bisa saja memuat frasa "undang-undang" secara sah.
            return str_contains($pathLower, '/uu/')
                || str_starts_with($pathLower, 'uu/')
                || str_contains($pathLower, '/undang-undang/')
                || str_starts_with($pathLower, 'undang-undang/');
        }

        return false;
    }

    /**
     * Cari path valid di MinIO
     */
    public static function resolveValidMinioPath(Peraturan $peraturan): ?string
    {
        $disk = Storage::disk('minio');

        $exists = function ($path) use ($disk) {
            try {
                return $disk->exists($path);
            } catch (\Throwable $e) {
                return false;
            }
        };

        // 1. Cek path yang tersimpan di DB, kecuali menunjuk folder kategori lain
        if ($peraturan->file_pdf_path
            && !self::isMismatchedCategoryPath($peraturan, $peraturan->file_pdf_path)
            && $exists($peraturan->file_pdf_path)) {
            return $peraturan->file_pdf_path;
        }

        // 2. Cek kandidat path berdasarkan kategori, nomor/tahun, dan unique_id
        foreach (self::getCandidatePaths($peraturan) as $candidate) {
            if ($exists($candidate)) {
                $peraturan->update(['file_pdf_path' => $candidate]);
                self::clearLocalCache($peraturan->unique_id);
                return $candidate;
            }
        }

        return null;
    }

    /**
     * Bangun daftar kandidat path PDF di MinIO untuk suatu peraturan.
     *
     * @return array<int, string>
     */
    protected static function getCandidatePaths(Peraturan $peraturan): array
    {
        $kodeJenis = $peraturan->jenisPeraturan ? trim($peraturan->jenisPeraturan->kode) : '';
        $namaJenis = $peraturan->jenisPeraturan ? trim($peraturan->jenisPeraturan->nama) : '';

        // Normalize category key
        $keyLower = strtolower($kodeJenis ?: $namaJenis ?: 'uu');

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

        // Cari konfigurasi yang sesuai. Cocokkan kode/nama secara persis lebih
        // dulu agar kode pendek seperti "P" (perda) tidak menyerobot "PP",
        // "PERPRES", atau "PERMEN".
        $namaLower = strtolower($namaJenis);
        $matched = $categoryMap[$keyLower] ?? $categoryMap[$namaLower] ?? null;

        if (!$matched) {
            foreach ($categoryMap as $catKey => $config) {
                if ($catKey === 'p') {
                    continue;
                }
                if (str_contains($keyLower, $catKey) || str_contains($namaLower, $catKey)) {
                    $matched = $config;
                    break;
                }
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

        // 3. Fallback berdasarkan url_pdf jika tersimpan
        if (!empty($peraturan->url_pdf)) {
            $candidatePaths[] = "documents/{$peraturan->url_pdf}";
            $candidatePaths[] = $peraturan->url_pdf;
            foreach ($folders as $folder) {
                $candidatePaths[] = "documents/{$folder}/{$peraturan->url_pdf}";
            }
        }

        // Filter dan deduplikasi
        return array_values(array_unique(array_filter($candidatePaths)));
    }
}

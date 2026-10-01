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
    public static function getCachedOrDownload(Peraturan $peraturan): ?string
    {
        $uniqueId = $peraturan->unique_id;

        // 1. Cek apakah sudah ada di cache lokal
        if (self::hasLocalCache($uniqueId, $peraturan->file_pdf_path)) {
            return self::getLocalCachePath($uniqueId);
        }

        // 2. Jika belum ada di cache, cari path valid di MinIO
        $validMinioPath = self::resolveValidMinioPath($peraturan);
        if (!$validMinioPath) {
            return null;
        }

        // 3. Unduh dari MinIO dan simpan ke cache lokal
        try {
            $disk = Storage::disk('minio');
            $readStream = $disk->readStream($validMinioPath);
            if (!$readStream) {
                return null;
            }

            $cachePath = self::getLocalCachePath($uniqueId);
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
                @rename($tempPath, $cachePath);
                return $cachePath;
            } else {
                @unlink($tempPath);
                Log::warning("Downloaded file from MinIO for {$uniqueId} is not a valid PDF.");
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
            if (!$disk->exists($path)) {
                return false;
            }
            try {
                $stream = $disk->readStream($path);
                if (!$stream) return false;
                $header = fread($stream, 1024);
                fclose($stream);
                return str_starts_with(trim($header), '%PDF');
            } catch (\Throwable $e) {
                return false;
            }
        };

        // 1. Cek path yang tersimpan di DB
        if ($peraturan->file_pdf_path && $isPdfFile($peraturan->file_pdf_path)) {
            return $peraturan->file_pdf_path;
        }

        // 2. Fallback pencarian beberapa format
        $tipe_peraturan = $peraturan->jenisPeraturan ? strtolower($peraturan->jenisPeraturan->kode) : 'uu';
        $nama_jenis = $peraturan->jenisPeraturan ? Str::slug($peraturan->jenisPeraturan->nama) : 'peraturan';
        $nomor_slug = Str::slug($peraturan->nomor);
        $tahun = $peraturan->tahun;

        $fallbackPaths = array_unique(array_filter([
            $nomor_slug && $tahun ? "documents/{$tipe_peraturan}/{$nama_jenis}-{$nomor_slug}-{$tahun}/document.pdf" : null,
            $nomor_slug && $tahun ? "documents/{$tipe_peraturan}/undang-undang-{$nomor_slug}-{$tahun}/document.pdf" : null,
            $nomor_slug && $tahun ? "documents/{$tipe_peraturan}/{$nomor_slug}-{$tahun}/document.pdf" : null,
            "documents/{$tipe_peraturan}/{$peraturan->unique_id}/document.pdf",
            $nomor_slug && $tahun ? "documents/uu/undang-undang-{$nomor_slug}-{$tahun}/document.pdf" : null,
            $nomor_slug && $tahun ? "documents/uu/{$nomor_slug}-{$tahun}/document.pdf" : null,
            "documents/uu/{$peraturan->unique_id}/document.pdf",
            "pdf_dokumen/{$peraturan->unique_id}.pdf",
        ]));

        foreach ($fallbackPaths as $fallback) {
            if ($isPdfFile($fallback)) {
                $peraturan->update(['file_pdf_path' => $fallback]);
                return $fallback;
            }
        }

        return null;
    }
}

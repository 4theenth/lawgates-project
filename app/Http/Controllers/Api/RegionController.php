<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class RegionController extends Controller
{
    /**
     * Cache key for region statistics.
     */
    public const CACHE_KEY = 'region_statistics_data';

    /**
     * Daftar 38 Provinsi Resmi Indonesia.
     */
    protected array $provinces = [
        'aceh' => 'ACEH',
        'sumatera-utara' => 'SUMATERA UTARA',
        'sumatera-barat' => 'SUMATERA BARAT',
        'riau' => 'RIAU',
        'kepulauan-riau' => 'KEPULAUAN RIAU',
        'jambi' => 'JAMBI',
        'bengkulu' => 'BENGKULU',
        'sumatera-selatan' => 'SUMATERA SELATAN',
        'kepulauan-bangka-belitung' => 'KEPULAUAN BANGKA BELITUNG',
        'lampung' => 'LAMPUNG',
        'dki-jakarta' => 'DKI JAKARTA',
        'banten' => 'BANTEN',
        'jawa-barat' => 'JAWA BARAT',
        'jawa-tengah' => 'JAWA TENGAH',
        'di-yogyakarta' => 'DI YOGYAKARTA',
        'jawa-timur' => 'JAWA TIMUR',
        'bali' => 'BALI',
        'nusa-tenggara-barat' => 'NUSA TENGGARA BARAT',
        'nusa-tenggara-timur' => 'NUSA TENGGARA TIMUR',
        'kalimantan-barat' => 'KALIMANTAN BARAT',
        'kalimantan-tengah' => 'KALIMANTAN TENGAH',
        'kalimantan-selatan' => 'KALIMANTAN SELATAN',
        'kalimantan-timur' => 'KALIMANTAN TIMUR',
        'kalimantan-utara' => 'KALIMANTAN UTARA',
        'sulawesi-utara' => 'SULAWESI UTARA',
        'gorontalo' => 'GORONTALO',
        'sulawesi-tengah' => 'SULAWESI TENGAH',
        'sulawesi-barat' => 'SULAWESI BARAT',
        'sulawesi-selatan' => 'SULAWESI SELATAN',
        'sulawesi-tenggara' => 'SULAWESI TENGGARA',
        'maluku' => 'MALUKU',
        'maluku-utara' => 'MALUKU UTARA',
        'papua-barat-daya' => 'PAPUA BARAT DAYA',
        'papua-barat' => 'PAPUA BARAT',
        'papua-tengah' => 'PAPUA TENGAH',
        'papua' => 'PAPUA',
        'papua-pegunungan' => 'PAPUA PEGUNUNGAN',
        'papua-selatan' => 'PAPUA SELATAN',
    ];

    /**
     * Mengembalikan agregasi statistik peraturan per provinsi untuk panel peta.
     * Menggunakan caching (Redis / DB / File) untuk performa tinggi < 500ms.
     */
    public function statistics(): JsonResponse
    {
        $data = Cache::remember(self::CACHE_KEY, now()->addHours(24), function () {
            return $this->computeStatistics();
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    /**
     * Hitung statistik dari database jika cache expired/di-clear.
     */
    public function computeStatistics(): array
    {
        $result = [];

        // Preload seluruh peraturan sah (bukan placeholder 'menunggu import') beserta relasi statusPeraturan
        $allPeraturan = Peraturan::available()
            ->with('statusPeraturan')
            ->select('id', 'unique_id', 'nomor', 'tahun', 'judul', 'status_id', 'tempat_penetapan', 'instansi', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($this->provinces as $slug => $provinceName) {
            $matched = $allPeraturan->filter(function ($p) use ($provinceName) {
                return Str::contains($p->judul ?? '', $provinceName, true) ||
                       Str::contains($p->tempat_penetapan ?? '', $provinceName, true) ||
                       Str::contains($p->instansi ?? '', $provinceName, true);
            });

            $total = $matched->count();
            $berlakuCount = 0;
            $tidakBerlakuCount = 0;

            foreach ($matched as $p) {
                $statusName = strtolower($p->statusPeraturan->nama_status ?? 'berlaku');
                if (Str::contains($statusName, 'tidak') || Str::contains($statusName, 'cabut') || Str::contains($statusName, 'ubah')) {
                    $tidakBerlakuCount++;
                } else {
                    $berlakuCount++;
                }
            }

            // Ambil cuplikan Perda terbaru
            $latestPerda = $matched->first();
            $samplePerda = null;

            if ($latestPerda) {
                $statusStr = 'Berlaku';
                $statusName = strtolower($latestPerda->statusPeraturan->nama_status ?? 'berlaku');
                if (Str::contains($statusName, 'tidak') || Str::contains($statusName, 'cabut')) {
                    $statusStr = 'Tidak Berlaku';
                }

                $nomorStr = 'Peraturan Daerah';
                if ($latestPerda->nomor && $latestPerda->tahun) {
                    $nomorStr = "Peraturan Daerah Nomor {$latestPerda->nomor} Tahun {$latestPerda->tahun}";
                } elseif ($latestPerda->nomor) {
                    $nomorStr = "Peraturan Daerah Nomor {$latestPerda->nomor}";
                }

                $samplePerda = [
                    'unique_id' => $latestPerda->unique_id,
                    'nomor' => $nomorStr,
                    'tentang' => $latestPerda->judul ?? '',
                    'status' => $statusStr,
                ];
            } else {
                // Jika belum ada data riil di DB untuk provinsi ini, cuplikan Perda di-set null
                $samplePerda = null;
            }

            $result[$slug] = [
                'id' => $slug,
                'name' => $provinceName,
                'total' => $total,
                'berlaku' => $berlakuCount,
                'tidakBerlaku' => $tidakBerlakuCount,
                'samplePerda' => $samplePerda,
            ];
        }

        return $result;
    }

    /**
     * Clear cache agregasi wilayah.
     */
    public static function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}

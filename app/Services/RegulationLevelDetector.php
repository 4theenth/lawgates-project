<?php

namespace App\Services;

use Illuminate\Support\Str;

class RegulationLevelDetector
{
    /**
     * Pemetaan nama kabupaten/kota ke nama provinsi resminya
     */
    protected static array $regencyToProvinceMap = [
        // Bali
        'badung' => 'Bali',
        'bangli' => 'Bali',
        'buleleng' => 'Bali',
        'gianyar' => 'Bali',
        'jembrana' => 'Bali',
        'karangasem' => 'Bali',
        'klungkung' => 'Bali',
        'tabanan' => 'Bali',
        'denpasar' => 'Bali',

        // Nusa Tenggara Timur
        'kupang' => 'Nusa Tenggara Timur',
        'timor tengah selatan' => 'Nusa Tenggara Timur',
        'timor tengah utara' => 'Nusa Tenggara Timur',
        'belu' => 'Nusa Tenggara Timur',
        'alor' => 'Nusa Tenggara Timur',
        'flores timur' => 'Nusa Tenggara Timur',
        'sikka' => 'Nusa Tenggara Timur',
        'ende' => 'Nusa Tenggara Timur',
        'ngada' => 'Nusa Tenggara Timur',
        'manggarai' => 'Nusa Tenggara Timur',
        'manggarai barat' => 'Nusa Tenggara Timur',
        'manggarai timur' => 'Nusa Tenggara Timur',
        'sumba barat' => 'Nusa Tenggara Timur',
        'sumba timur' => 'Nusa Tenggara Timur',
        'sumba tengah' => 'Nusa Tenggara Timur',
        'sumba barat daya' => 'Nusa Tenggara Timur',
        'lembata' => 'Nusa Tenggara Timur',
        'rote ndao' => 'Nusa Tenggara Timur',
        'nagekeo' => 'Nusa Tenggara Timur',
        'sabu raijua' => 'Nusa Tenggara Timur',
        'malaka' => 'Nusa Tenggara Timur',

        // DKI Jakarta
        'jakarta pusat' => 'DKI Jakarta',
        'jakarta selatan' => 'DKI Jakarta',
        'jakarta barat' => 'DKI Jakarta',
        'jakarta timur' => 'DKI Jakarta',
        'jakarta utara' => 'DKI Jakarta',
        'kepulauan seribu' => 'DKI Jakarta',

        // Jawa Barat
        'bandung' => 'Jawa Barat',
        'bandung barat' => 'Jawa Barat',
        'bekasi' => 'Jawa Barat',
        'bogor' => 'Jawa Barat',
        'ciamis' => 'Jawa Barat',
        'cianjur' => 'Jawa Barat',
        'cirebon' => 'Jawa Barat',
        'garut' => 'Jawa Barat',
        'indramayu' => 'Jawa Barat',
        'karawang' => 'Jawa Barat',
        'kuningan' => 'Jawa Barat',
        'majalengka' => 'Jawa Barat',
        'pangandaran' => 'Jawa Barat',
        'purwakarta' => 'Jawa Barat',
        'subang' => 'Jawa Barat',
        'sukabumi' => 'Jawa Barat',
        'sumedang' => 'Jawa Barat',
        'tasikmalaya' => 'Jawa Barat',
        'banjar' => 'Jawa Barat',
        'cimahi' => 'Jawa Barat',
        'depok' => 'Jawa Barat',

        // Jawa Tengah
        'semarang' => 'Jawa Tengah',
        'surakarta' => 'Jawa Tengah',
        'solo' => 'Jawa Tengah',
        'magelang' => 'Jawa Tengah',
        'pekalongan' => 'Jawa Tengah',
        'salatiga' => 'Jawa Tengah',
        'tegal' => 'Jawa Tengah',
        'banyumas' => 'Jawa Tengah',
        'batang' => 'Jawa Tengah',
        'blora' => 'Jawa Tengah',
        'boyolali' => 'Jawa Tengah',
        'brebes' => 'Jawa Tengah',
        'cilacap' => 'Jawa Tengah',
        'demak' => 'Jawa Tengah',
        'grobogan' => 'Jawa Tengah',
        'jepara' => 'Jawa Tengah',
        'karanganyar' => 'Jawa Tengah',
        'kebumen' => 'Jawa Tengah',
        'kendal' => 'Jawa Tengah',
        'klaten' => 'Jawa Tengah',
        'kudus' => 'Jawa Tengah',
        'pati' => 'Jawa Tengah',
        'pemalang' => 'Jawa Tengah',
        'purbalingga' => 'Jawa Tengah',
        'purworejo' => 'Jawa Tengah',
        'rembang' => 'Jawa Tengah',
        'sragen' => 'Jawa Tengah',
        'sukoharjo' => 'Jawa Tengah',
        'temanggung' => 'Jawa Tengah',
        'wonogiri' => 'Jawa Tengah',
        'wonosobo' => 'Jawa Tengah',

        // Jawa Timur
        'surabaya' => 'Jawa Timur',
        'malang' => 'Jawa Timur',
        'batu' => 'Jawa Timur',
        'blitar' => 'Jawa Timur',
        'kediri' => 'Jawa Timur',
        'madiun' => 'Jawa Timur',
        'mojokerto' => 'Jawa Timur',
        'pasuruan' => 'Jawa Timur',
        'probolinggo' => 'Jawa Timur',
        'banyuwangi' => 'Jawa Timur',
        'bangkalan' => 'Jawa Timur',
        'bojonegoro' => 'Jawa Timur',
        'bondowoso' => 'Jawa Timur',
        'gresik' => 'Jawa Timur',
        'jember' => 'Jawa Timur',
        'jombang' => 'Jawa Timur',
        'lamongan' => 'Jawa Timur',
        'lumajang' => 'Jawa Timur',
        'magetan' => 'Jawa Timur',
        'nganjuk' => 'Jawa Timur',
        'ngawi' => 'Jawa Timur',
        'pacitan' => 'Jawa Timur',
        'pamekasan' => 'Jawa Timur',
        'ponorogo' => 'Jawa Timur',
        'sampang' => 'Jawa Timur',
        'sidoarjo' => 'Jawa Timur',
        'situbondo' => 'Jawa Timur',
        'sumenep' => 'Jawa Timur',
        'trenggalek' => 'Jawa Timur',
        'tuban' => 'Jawa Timur',
        'tulungagung' => 'Jawa Timur',

        // DI Yogyakarta
        'sleman' => 'DI Yogyakarta',
        'bantul' => 'DI Yogyakarta',
        'yogyakarta' => 'DI Yogyakarta',
        'kulon progo' => 'DI Yogyakarta',
        'gunungkidul' => 'DI Yogyakarta',

        // Sumatera Utara
        'medan' => 'Sumatera Utara',
        'binjai' => 'Sumatera Utara',
        'pematangsiantar' => 'Sumatera Utara',
        'deli serdang' => 'Sumatera Utara',
        'karo' => 'Sumatera Utara',
        'simalungun' => 'Sumatera Utara',
        'asahan' => 'Sumatera Utara',
        'tapanuli' => 'Sumatera Utara',
    ];

    /**
     * Daftar 38 Provinsi Indonesia resmi
     */
    protected static array $provinces = [
        'aceh' => 'Aceh',
        'sumatera-utara' => 'Sumatera Utara',
        'sumatera-barat' => 'Sumatera Barat',
        'riau' => 'Riau',
        'kepulauan-riau' => 'Kepulauan Riau',
        'jambi' => 'Jambi',
        'bengkulu' => 'Bengkulu',
        'sumatera-selatan' => 'Sumatera Selatan',
        'kepulauan-bangka-belitung' => 'Kepulauan Bangka Belitung',
        'lampung' => 'Lampung',
        'dki-jakarta' => 'DKI Jakarta',
        'banten' => 'Banten',
        'jawa-barat' => 'Jawa Barat',
        'jawa-tengah' => 'Jawa Tengah',
        'di-yogyakarta' => 'DI Yogyakarta',
        'jawa-timur' => 'Jawa Timur',
        'bali' => 'Bali',
        'nusa-tenggara-barat' => 'Nusa Tenggara Barat',
        'nusa-tenggara-timur' => 'Nusa Tenggara Timur',
        'kalimantan-barat' => 'Kalimantan Barat',
        'kalimantan-tengah' => 'Kalimantan Tengah',
        'kalimantan-selatan' => 'Kalimantan Selatan',
        'kalimantan-timur' => 'Kalimantan Timur',
        'kalimantan-utara' => 'Kalimantan Utara',
        'sulawesi-utara' => 'Sulawesi Utara',
        'gorontalo' => 'Gorontalo',
        'sulawesi-tengah' => 'Sulawesi Tengah',
        'sulawesi-barat' => 'Sulawesi Barat',
        'sulawesi-selatan' => 'Sulawesi Selatan',
        'sulawesi-tenggara' => 'Sulawesi Tenggara',
        'maluku' => 'Maluku',
        'maluku-utara' => 'Maluku Utara',
        'papua-barat-daya' => 'Papua Barat Daya',
        'papua-barat' => 'Papua Barat',
        'papua-tengah' => 'Papua Tengah',
        'papua' => 'Papua',
        'papua-pegunungan' => 'Papua Pegunungan',
        'papua-selatan' => 'Papua Selatan',
    ];

    /**
     * Deteksi tingkatan peraturan (Provinsi, Kabupaten, Kota, atau Pusat)
     * berdasarkan string pemrakarsa (instansi), lokasi_daerah, atau judul.
     */
    public static function detect($pemrakarsa, ?string $lokasiDaerah = null, ?string $judul = null): array
    {
        if ($pemrakarsa instanceof \App\Models\Peraturan) {
            $model = $pemrakarsa;
            $pemrakarsa = $model->instansi;
            $lokasiDaerah = $model->lokasi_daerah;
            $judul = $model->judul;
        }

        $raw = trim((string) ($pemrakarsa ?: $lokasiDaerah ?: ''));
        
        // Normalisasi format snake_case (seperti folder MinIO: pemerintah_kabupaten_badung)
        $normalized = str_replace('_', ' ', strtolower($raw));
        $normalized = trim(preg_replace('/\s+/', ' ', $normalized));

        // 1. Cek Tingkat Kabupaten
        if (
            str_contains($normalized, 'kabupaten') ||
            str_contains($normalized, 'pemkab') ||
            preg_match('/\bkab\b/', $normalized)
        ) {
            $namaDaerah = preg_replace('/^(pemerintah\s+kabupaten|pemerintah\s+daerah\s+kabupaten|pemkab|kabupaten|kab\.)\s+/i', '', $normalized);
            $namaDaerah = ucwords(trim($namaDaerah));
            $cleanKey = strtolower($namaDaerah);

            $provinsi = self::$regencyToProvinceMap[$cleanKey] ?? self::findProvinceFromText($judul . ' ' . $raw);

            return [
                'tingkat' => 'Kabupaten',
                'tipe_wilayah' => 'Kabupaten',
                'nama_daerah' => $namaDaerah,
                'provinsi' => $provinsi,
                'provinsi_slug' => $provinsi ? Str::slug($provinsi) : null,
                'pemrakarsa_clean' => "Pemerintah Kabupaten {$namaDaerah}",
            ];
        }

        // 2. Cek Tingkat Kota
        if (
            str_contains($normalized, 'kota') ||
            str_contains($normalized, 'pemkot')
        ) {
            $namaDaerah = preg_replace('/^(pemerintah\s+kota|pemerintah\s+daerah\s+kota|pemkot|kota)\s+/i', '', $normalized);
            $namaDaerah = ucwords(trim($namaDaerah));
            $cleanKey = strtolower($namaDaerah);

            $provinsi = self::$regencyToProvinceMap[$cleanKey] ?? self::findProvinceFromText($judul . ' ' . $raw);

            return [
                'tingkat' => 'Kota',
                'tipe_wilayah' => 'Kota',
                'nama_daerah' => $namaDaerah,
                'provinsi' => $provinsi,
                'provinsi_slug' => $provinsi ? Str::slug($provinsi) : null,
                'pemrakarsa_clean' => "Pemerintah Kota {$namaDaerah}",
            ];
        }

        // 3. Cek Tingkat Provinsi
        if (
            str_contains($normalized, 'provinsi') ||
            str_contains($normalized, 'pemprov') ||
            preg_match('/\bprov\b/', $normalized)
        ) {
            $namaProvinsi = preg_replace('/^(pemerintah\s+provinsi|pemerintah\s+daerah\s+provinsi|pemprov|provinsi|prov\.)\s+/i', '', $normalized);
            $namaProvinsi = ucwords(trim($namaProvinsi));

            // Cocokkan ke daftar provinsi resmi jika ada kemiripan
            $matchedProv = self::matchProvinceName($namaProvinsi) ?? $namaProvinsi;

            return [
                'tingkat' => 'Provinsi',
                'tipe_wilayah' => 'Provinsi',
                'nama_daerah' => $matchedProv,
                'provinsi' => $matchedProv,
                'provinsi_slug' => Str::slug($matchedProv),
                'pemrakarsa_clean' => "Pemerintah Provinsi {$matchedProv}",
            ];
        }

        // 4. Cek apakah menyebutkan nama salah satu dari 38 provinsi secara langsung
        $provDirect = self::matchProvinceName($normalized);
        if ($provDirect) {
            return [
                'tingkat' => 'Provinsi',
                'tipe_wilayah' => 'Provinsi',
                'nama_daerah' => $provDirect,
                'provinsi' => $provDirect,
                'provinsi_slug' => Str::slug($provDirect),
                'pemrakarsa_clean' => "Pemerintah Provinsi {$provDirect}",
            ];
        }

        // 5. Cek apakah menyebutkan nama kabupaten/kota terdaftar secara langsung
        if (isset(self::$regencyToProvinceMap[$normalized])) {
            $prov = self::$regencyToProvinceMap[$normalized];
            return [
                'tingkat' => 'Kabupaten',
                'tipe_wilayah' => 'Kabupaten',
                'nama_daerah' => ucwords($normalized),
                'provinsi' => $prov,
                'provinsi_slug' => Str::slug($prov),
                'pemrakarsa_clean' => "Pemerintah Kabupaten " . ucwords($normalized),
            ];
        }

        // 6. Cek Tingkat Pusat (Nasional)
        if (
            str_contains($normalized, 'pemerintah pusat') ||
            str_contains($normalized, 'kementerian') ||
            str_contains($normalized, 'presiden') ||
            str_contains($normalized, 'republik indonesia') ||
            str_contains($normalized, 'dpr') ||
            str_contains($normalized, 'mpr') ||
            str_contains($normalized, 'mahkamah')
        ) {
            return [
                'tingkat' => 'Pusat',
                'tipe_wilayah' => 'Pusat',
                'nama_daerah' => 'Pusat',
                'provinsi' => null,
                'provinsi_slug' => null,
                'pemrakarsa_clean' => $raw ?: 'Pemerintah Pusat',
            ];
        }

        // 7. Fallback untuk data yang belum teridentifikasi
        return [
            'tingkat' => 'Lainnya',
            'tipe_wilayah' => 'Lainnya',
            'nama_daerah' => $raw ?: 'Nasional',
            'provinsi' => null,
            'provinsi_slug' => null,
            'pemrakarsa_clean' => $raw ?: 'Pemerintah Pusat',
        ];
    }

    /**
     * Cari nama provinsi resmi yang cocok dari sebuah string
     */
    protected static function matchProvinceName(string $text): ?string
    {
        $clean = strtolower(trim($text));
        foreach (self::$provinces as $slug => $name) {
            if (strtolower($name) === $clean || $slug === $clean) {
                return $name;
            }
        }

        foreach (self::$provinces as $slug => $name) {
            if (str_contains($clean, strtolower($name))) {
                return $name;
            }
        }

        return null;
    }

    /**
     * Cari nama provinsi dari teks gabungan judul/tempat_penetapan
     */
    protected static function findProvinceFromText(?string $text): ?string
    {
        if (empty($text)) {
            return null;
        }

        $lower = strtolower($text);
        foreach (self::$provinces as $name) {
            if (str_contains($lower, strtolower($name))) {
                return $name;
            }
        }

        return null;
    }

    /**
     * Ambil daftar seluruh nama kabupaten/kota yang dipetakan ke suatu provinsi
     */
    public static function getRegenciesForProvinceName(string $provinceName): array
    {
        $result = [];
        $pNameLower = strtolower(trim($provinceName));

        foreach (self::$regencyToProvinceMap as $regency => $prov) {
            if (strtolower($prov) === $pNameLower) {
                $result[] = ucwords($regency);
            }
        }

        return $result;
    }
}
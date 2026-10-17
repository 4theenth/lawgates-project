<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisPeraturan extends Model
{
    protected $table = 'jenis_peraturan'; 
    protected $guarded = [];
    public $timestamps = false;

    public function peraturan()
    {
        return $this->hasMany(Peraturan::class, 'jenis_peraturan_id');
    }

    /**
     * Resoluisi universal dan normalisasi tipe peraturan dari string mentah apapun.
     * Mencegah timbulnya singkatan 1 huruf (seperti 'P') atau duplikasi kategori.
     */
    public static function resolveByRawString(?string $rawType): ?self
    {
        if (empty($rawType)) {
            return null;
        }

        $rawTrimmed = trim($rawType);
        $rawLower = strtolower($rawTrimmed);

        // 1. Pencocokan langsung dengan data yang ada di DB
        $found = self::whereRaw('LOWER(kode) = ?', [$rawLower])
            ->orWhereRaw('LOWER(nama) = ?', [$rawLower])
            ->first();

        if ($found) {
            return $found;
        }

        // 2. Pemetaan aturan kanonikal baku untuk seluruh jenis peraturan di Indonesia
        $canonicalMap = [
            'PERDA' => [
                'kode' => 'PERDA',
                'nama' => 'Peraturan Daerah',
                'deskripsi' => 'Dikhususkan untuk peraturan daerah',
                'keywords' => ['daerah', 'perda'],
            ],
            'PERMEN' => [
                'kode' => 'PERMEN',
                'nama' => 'Peraturan Menteri',
                'deskripsi' => 'Dikhususkan untuk peraturan menteri',
                'keywords' => ['menteri', 'permen'],
            ],
            'PERBAN' => [
                'kode' => 'PERBAN',
                'nama' => 'Peraturan Badan/Lembaga',
                'deskripsi' => 'Dikhususkan untuk peraturan badan / lembaga',
                'keywords' => ['badan', 'lembaga', 'perban'],
            ],
            'PERPRES' => [
                'kode' => 'PERPRES',
                'nama' => 'Peraturan Presiden',
                'deskripsi' => 'Dikhususkan untuk peraturan presiden',
                'keywords' => ['presiden', 'perpres'],
            ],
            'PERPPU' => [
                'kode' => 'PERPPU',
                'nama' => 'Peraturan Pemerintah Pengganti Undang-Undang',
                'deskripsi' => 'Dikhususkan untuk peraturan pemerintah pengganti undang-undang',
                'keywords' => ['perpu', 'perppu', 'pengganti undang'],
            ],
            'PP' => [
                'kode' => 'PP',
                'nama' => 'Peraturan Pemerintah',
                'deskripsi' => 'Dikhususkan untuk peraturan pemerintah',
                'keywords' => ['peraturan pemerintah'],
            ],
            'UU' => [
                'kode' => 'UU',
                'nama' => 'Undang-Undang',
                'deskripsi' => 'Dikhususkan untuk undang-undang',
                'keywords' => ['undang-undang', 'undang undang'],
            ],
            'UU_DRT' => [
                'kode' => 'UU_DRT',
                'nama' => 'Undang-Undang Darurat',
                'deskripsi' => 'Dikhususkan untuk undang-undang darurat',
                'keywords' => ['darurat', 'uudrt'],
            ],
            'UUD' => [
                'kode' => 'UUD',
                'nama' => 'Undang-Undang Dasar 1945',
                'deskripsi' => 'Dikhususkan untuk undang-undang dasar',
                'keywords' => ['dasar', 'uud'],
            ],
            'TAP_MPR' => [
                'kode' => 'TAP MPR',
                'nama' => 'Ketetapan MPR',
                'deskripsi' => 'Dikhususkan untuk ketetapan mpr',
                'keywords' => ['mpr', 'tap mpr', 'tap_mpr'],
            ],
            'INPRES' => [
                'kode' => 'INPRES',
                'nama' => 'Instruksi Presiden',
                'deskripsi' => 'Dikhususkan untuk instruksi presiden',
                'keywords' => ['instruksi presiden', 'inpres'],
            ],
            'KEPPRES' => [
                'kode' => 'KEPPRES',
                'nama' => 'Keputusan Presiden',
                'deskripsi' => 'Dikhususkan untuk keputusan presiden',
                'keywords' => ['keputusan presiden', 'keppres'],
            ],
        ];

        // 3. Evaluasi kata kunci spesifik
        foreach ($canonicalMap as $item) {
            foreach ($item['keywords'] as $kw) {
                if ($rawLower === $kw || str_contains($rawLower, $kw)) {
                    $match = self::where('kode', $item['kode'])
                        ->orWhereRaw('LOWER(nama) = ?', [strtolower($item['nama'])])
                        ->first();

                    if ($match) {
                        return $match;
                    }

                    return self::create([
                        'kode' => $item['kode'],
                        'nama' => $item['nama'],
                        'deskripsi' => $item['deskripsi'],
                    ]);
                }
            }
        }

        // Fallback untuk 'p' atau singkatan 1 huruf agar tidak disimpan sebagai kode 1 huruf
        if ($rawLower === 'p') {
            return self::where('kode', 'PERDA')->first() ?: self::create([
                'kode' => 'PERDA',
                'nama' => 'Peraturan Daerah',
                'deskripsi' => 'Dikhususkan untuk peraturan daerah',
            ]);
        }

        // 4. Fallback otomatis untuk tipe kustom baru lainnya (pastikan kode minimal memadai)
        $words = preg_split('/[\s\-]+/', $rawTrimmed);
        $initials = '';
        foreach ($words as $w) {
            if (!empty($w)) {
                $initials .= strtoupper(substr($w, 0, 1));
            }
        }
        
        $kode = (strlen($initials) >= 2) ? substr($initials, 0, 10) : strtoupper(substr($rawTrimmed, 0, 10));

        return self::firstOrCreate(
            ['kode' => $kode],
            ['nama' => $rawTrimmed]
        );
    }
}
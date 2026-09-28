<?php

namespace App\Http\Controllers;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KategoriController extends Controller
{
    /**
     * Predefined metadata for common Indonesian regulation hierarchy types
     */
    protected array $predefinedCategories = [
        'uud' => [
            'nama' => 'Undang-Undang Dasar 1945',
            'display_name' => 'Undang-Undang Dasar 1945',
            'singkatan' => 'UUD 1945',
            'badge' => 'Tingkat Tertinggi',
            'deskripsi' => 'Undang-Undang Dasar 1945',
            'aliases' => ['uud', 'uud-1945', 'undang-undang-dasar', 'undang-undang-dasar-1945'],
        ],
        'tap-mpr' => [
            'nama' => 'Ketetapan MPR',
            'display_name' => 'Ketetapan MPR',
            'singkatan' => 'TAP MPR',
            'badge' => 'Konstitusional',
            'deskripsi' => 'Ketetapan Majelis Permusyawaratan Rakyat',
            'aliases' => ['tap-mpr', 'tap_mpr', 'mpr', 'ketetapan-mpr'],
        ],
        'undang-undang' => [
            'nama' => 'Undang Undang',
            'display_name' => 'Undang Undang',
            'singkatan' => 'UU / PERPU',
            'badge' => 'Primer',
            'deskripsi' => 'Peraturan Pemerintah Pengganti Undang-Undang',
            'aliases' => ['undang-undang', 'uu', 'perpu', 'uu-perpu', 'undang-undang-perpu'],
        ],
        'peraturan-pemerintah' => [
            'nama' => 'Peraturan Pemerintah',
            'display_name' => 'Peraturan Pemerintah',
            'singkatan' => 'PP',
            'badge' => 'Pelaksana',
            'deskripsi' => 'Peraturan Pemerintah Republik Indonesia',
            'aliases' => ['peraturan-pemerintah', 'pp'],
        ],
        'peraturan-presiden' => [
            'nama' => 'Peraturan Presiden',
            'display_name' => 'Peraturan Presiden',
            'singkatan' => 'PERPRES',
            'badge' => 'Eksekutif',
            'deskripsi' => 'Peraturan Presiden Republik Indonesia',
            'aliases' => ['peraturan-presiden', 'perpres'],
        ],
        'peraturan-daerah' => [
            'nama' => 'Peraturan Daerah',
            'display_name' => 'Peraturan Daerah',
            'singkatan' => 'PERDA',
            'badge' => 'Otonomi Daerah',
            'deskripsi' => 'Peraturan Daerah Provinsi dan Kabupaten / Kota',
            'aliases' => ['peraturan-daerah', 'perda'],
        ],
        'permen-perban' => [
            'nama' => 'Peraturan Menteri & Peraturan Lembaga',
            'display_name' => 'Peraturan Menteri & Peraturan Lembaga',
            'singkatan' => 'PERMEN & PERBAN',
            'badge' => 'Sektoral',
            'deskripsi' => 'Peraturan Menteri & Peraturan Badan / Lembaga',
            'aliases' => ['permen-perban', 'permen', 'perban', 'peraturan-menteri', 'peraturan-badan'],
        ],
        'putusan-mk-ma' => [
            'nama' => 'Putusan Mahkamah Konstitusi & Mahkamah Agung',
            'display_name' => 'Putusan MK & MA',
            'singkatan' => 'PUTUSAN MK & MA',
            'badge' => 'Yurisprudensi',
            'deskripsi' => 'Putusan Mahkamah Konstitusi & Putusan Mahkamah Agung',
            'aliases' => ['putusan-mk-ma', 'putusan-mk', 'putusan-ma', 'mk-ma'],
        ],
    ];

    /**
     * Show regulation list for a specific category slug
     */
    public function show(Request $request, string $slug)
    {
        $normalizedSlug = Str::slug($slug);

        // 1. Cari di predefined config berdasarkan key atau alias
        $matchedPredefined = null;
        $canonicalKey = null;

        foreach ($this->predefinedCategories as $key => $meta) {
            if ($key === $normalizedSlug || in_array($normalizedSlug, $meta['aliases'] ?? [])) {
                $matchedPredefined = $meta;
                $canonicalKey = $key;
                break;
            }
        }

        // 2. Cari di database `jenis_peraturan`
        $matchedJenis = JenisPeraturan::where(function ($q) use ($normalizedSlug, $slug, $matchedPredefined) {
            $q->whereRaw('LOWER(kode) = ?', [strtolower($slug)])
              ->orWhereRaw('LOWER(REPLACE(nama, \'-\', \' \')) = ?', [str_replace('-', ' ', strtolower($slug))])
              ->orWhereRaw('LOWER(nama) = ?', [strtolower($slug)]);

            if ($matchedPredefined) {
                $q->orWhere('nama', 'ilike', '%' . $matchedPredefined['nama'] . '%')
                  ->orWhere('kode', 'ilike', '%' . ($matchedPredefined['singkatan'] ?? '') . '%');

                foreach ($matchedPredefined['aliases'] as $alias) {
                    $q->orWhereRaw('LOWER(kode) = ?', [strtolower($alias)])
                      ->orWhereRaw('LOWER(nama) = ?', [str_replace('-', ' ', strtolower($alias))]);
                }
            }
        })->first();

        // Tentukan nama dan info kategori
        $categoryName = $matchedJenis?->nama
            ?? $matchedPredefined['display_name']
            ?? ucwords(str_replace('-', ' ', $slug));

        // Format khusus untuk kesesuaian dengan tampilan ("Undang Undang")
        if ($canonicalKey === 'undang-undang') {
            $categoryName = 'Undang Undang';
        }

        $categoryBadge = $matchedPredefined['badge'] ?? ($matchedJenis?->kode ?? 'Regulasi');
        $categoryDescription = $matchedJenis?->deskripsi ?? ($matchedPredefined['deskripsi'] ?? '');

        // 3. Query Peraturan
        $peraturanQuery = Peraturan::with(['jenisPeraturan', 'statusPeraturan']);

        if ($matchedJenis) {
            $peraturanQuery->where('jenis_peraturan_id', $matchedJenis->id);
        } else {
            // Jika kategori belum terdaftar di tabel jenis_peraturan (seperti data baru/kosong)
            $peraturanQuery->whereRaw('1 = 0');
        }

        // Filter keyword pencarian
        if ($request->filled('keyword')) {
            $keyword = trim($request->keyword);
            $peraturanQuery->where(function ($q) use ($keyword) {
                $q->where('judul', 'ilike', '%' . $keyword . '%')
                  ->orWhere('nomor', 'ilike', '%' . $keyword . '%');
            });
        }

        // Filter status
        if ($request->filled('status_id')) {
            $statusIds = array_filter(explode(',', (string) $request->status_id));
            if (!empty($statusIds)) {
                $peraturanQuery->whereIn('status_id', $statusIds);
            }
        }

        // Filter tahun
        if ($request->filled('tahun')) {
            $tahun = trim((string) $request->tahun);
            if (str_contains($tahun, '-')) {
                $parts = array_map('trim', explode('-', $tahun));
                $start = (int) ($parts[0] ?? 0);
                $end = (int) ($parts[1] ?? 0);
                if ($start > 0 && $end > 0) {
                    $peraturanQuery->whereBetween('tahun', [min($start, $end), max($start, $end)]);
                }
            } else {
                $peraturanQuery->where('tahun', $tahun);
            }
        }

        // Sorting
        $sort = $request->get('sort', 'relevansi');
        if ($sort === 'terbaru') {
            $peraturanQuery->orderBy('tahun', 'desc')->orderBy('created_at', 'desc');
        } elseif ($sort === 'terlama') {
            $peraturanQuery->orderBy('tahun', 'asc')->orderBy('created_at', 'asc');
        } else {
            $peraturanQuery->orderBy('created_at', 'desc');
        }

        $perPage = (int) $request->get('per_page', 10);
        $paginatedResults = $peraturanQuery->paginate($perPage)->withQueryString();

        // Data referensi status & tahun untuk dropdown filter
        $statuses = Status::select('id', 'nama_status')->get();
        $years = Peraturan::select('tahun')
            ->whereNotNull('tahun')
            ->distinct()
            ->orderBy('tahun', 'desc')
            ->pluck('tahun');

        $totalCategoryCount = $matchedJenis ? Peraturan::where('jenis_peraturan_id', $matchedJenis->id)->count() : 0;

        return Inertia::render('DetailKategori', [
            'kategori' => [
                'id' => $matchedJenis?->id,
                'slug' => $slug,
                'canonical_key' => $canonicalKey,
                'nama' => $categoryName,
                'badge' => $categoryBadge,
                'deskripsi' => $categoryDescription,
                'total_dokumen' => $totalCategoryCount,
            ],
            'peraturan' => $paginatedResults,
            'filters' => [
                'keyword' => $request->get('keyword', ''),
                'status_id' => $request->get('status_id', ''),
                'tahun' => $request->get('tahun', ''),
                'sort' => $sort,
                'per_page' => $perPage,
            ],
            'referensi' => [
                'status' => $statuses,
                'tahun' => $years,
            ],
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use App\Models\JenisPeraturan;
use App\Models\Status;
use App\Services\DocumentStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class PeraturanController extends Controller
{
    /**
     * GET /api/regulations/categories/stats
     * Return cached document count statistics for each legal category.
     */
    public function categoryStats()
    {
        $stats = Cache::remember('regulations_category_stats', 600, function () {
            return JenisPeraturan::withCount(['peraturan' => function ($q) {
                $q->available();
            }])
                ->get()
                ->map(function ($jenis) {
                    return [
                        'id' => $jenis->id,
                        'kode' => $jenis->kode,
                        'nama' => $jenis->nama,
                        'deskripsi' => $jenis->deskripsi,
                        'total_dokumen' => (int) $jenis->peraturan_count,
                    ];
                });
        });

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * GET /api/regulations
     * Listing API supporting category, search, year, status query params with pagination.
     */
    public function index(Request $request)
    {
        $query = Peraturan::available()->with(['jenisPeraturan', 'statusPeraturan']);

        // 1. Filter Category (Mendukung ID, slug/kode, atau nama)
        $query->when($request->filled('category'), function ($q) use ($request) {
            $cat = trim((string) $request->query('category'));
            if (is_numeric($cat)) {
                $q->where('jenis_peraturan_id', (int) $cat);
            } else {
                $q->whereHas('jenisPeraturan', function ($sub) use ($cat) {
                    $sub->where('kode', 'LIKE', $cat)
                        ->orWhere('nama', 'LIKE', "%{$cat}%");
                });
            }
        });

        // 2. Filter Search (Judul atau Nomor)
        $query->when($request->filled('search'), function ($q) use ($request) {
            $search = trim((string) $request->query('search'));
            $q->where(function ($sub) use ($search) {
                $sub->where('judul', 'LIKE', "%{$search}%")
                    ->orWhere('nomor', 'LIKE', "%{$search}%");
            });
        });

        // 3. Filter Tahun (year atau tahun)
        $query->when($request->filled('year') || $request->filled('tahun'), function ($q) use ($request) {
            $year = $request->query('year') ?? $request->query('tahun');
            $q->where('tahun', (int) $year);
        });

        // 4. Filter Status
        $query->when($request->filled('status'), function ($q) use ($request) {
            $status = $request->query('status');
            if (is_numeric($status)) {
                $q->where('status_id', (int) $status);
            } else {
                $q->whereHas('statusPeraturan', function ($sub) use ($status) {
                    $sub->where('nama_status', 'LIKE', "%{$status}%");
                });
            }
        });

        // 5. Filter Lokasi Daerah / Entitas
        $query->when($request->filled('lokasi_daerah') || $request->filled('entitas'), function ($q) use ($request) {
            $lokasi = $request->query('lokasi_daerah') ?? $request->query('entitas');
            $q->where('lokasi_daerah', 'LIKE', "%{$lokasi}%");
        });

        // 5.5. Filter Subjek
        $query->when($request->filled('subjek'), function ($q) use ($request) {
            $subjekList = is_array($request->query('subjek')) 
                ? $request->query('subjek') 
                : explode(',', $request->query('subjek'));
            
            $q->where(function ($subQ) use ($subjekList) {
                foreach ($subjekList as $subjekItem) {
                    $subQ->orWhere('subjek', 'ilike', '%' . trim($subjekItem) . '%');
                }
            });
        });

        // 6. Sorting
        $sort = $request->query('sort', 'terbaru');
        if ($sort === 'terlama') {
            $query->orderBy('tahun', 'asc')->orderBy('id', 'asc');
        } else {
            $query->orderBy('tahun', 'desc')->orderBy('id', 'desc');
        }

        // Paginasi: limit (default 10, max 100) dan page (default 1)
        $limit = max(1, min(100, (int) $request->query('limit', $request->query('per_page', 10))));
        $paginated = $query->paginate($limit);

        // Transformasi data item memuat field wajib UI (status, nomor, judul, tahun, instansi)
        $transformedData = collect($paginated->items())->map(function ($p) {
            return [
                'id' => $p->id,
                'unique_id' => $p->unique_id,
                'judul' => $p->judul,
                'nomor' => $p->nomor,
                'tahun' => (int) $p->tahun,
                'instansi' => $p->instansi ?? 'Pemerintah Republik Indonesia',
                'lokasi_daerah' => $p->lokasi_daerah,
                'status' => $p->statusPeraturan ? $p->statusPeraturan->nama_status : 'Unknown',
                'status_keberlakuan' => $p->statusPeraturan ? $p->statusPeraturan->nama_status : 'Unknown',
                'jenis' => $p->jenisPeraturan ? $p->jenisPeraturan->nama : 'Unknown',
                'jenis_peraturan' => $p->jenisPeraturan ? [
                    'id' => $p->jenisPeraturan->id,
                    'kode' => $p->jenisPeraturan->kode,
                    'nama' => $p->jenisPeraturan->nama,
                ] : null,
                'status_peraturan' => $p->statusPeraturan ? [
                    'id' => $p->statusPeraturan->id,
                    'nama_status' => $p->statusPeraturan->nama_status,
                ] : null,
                'tanggal_penetapan' => $p->tanggal_penetapan ? $p->tanggal_penetapan->format('Y-m-d') : null,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $transformedData,
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'from' => $paginated->firstItem(),
                'to' => $paginated->lastItem(),
            ],
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
            'per_page' => $paginated->perPage(),
            'total' => $paginated->total(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'              => 'required|string',
            'nomor'              => 'required|string',
            'tahun'              => 'required|integer',
            'jenis_peraturan_id' => 'required|integer',
            'status_id'          => 'required|integer',
            'instansi'           => 'nullable|string',
        ]);

        $validated['unique_id'] = (string) Str::uuid();
        $peraturan = Peraturan::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data peraturan berhasil ditambahkan',
            'data'    => $peraturan
        ], 201);
    }

    public function show($unique_id)
    {
        $peraturan = Peraturan::with([
            'jenisPeraturan', 
            'statusPeraturan',
            'strukturDokumen' => function($q) { 
                $q->orderBy('id', 'asc'); 
            },
            'pasal' => function($q) { 
                $q->with(['penjelasan', 'children.penjelasan'])->orderBy('urutan', 'asc'); 
            },
            'lawRelations.toPeraturan' => function($q) {
                $q->withCount([
                    'pasal',
                    'strukturDokumen as pembukaan_count' => function($sq) {
                        $sq->where('tipe_struktur', 'PEMBUKAAN');
                    }
                ]);
            },
            'lawRelations.relationType'
        ])
        ->where('unique_id', $unique_id)
        ->first();

        if (!$peraturan) {
            return response()->json([
                'success' => false,
                'message' => 'Data peraturan tidak ditemukan.'
            ], 404);
        }

        // Jika request datang dari Inertia (Frontend React), render halaman DetailPeraturan
        if (request()->wantsJson() == false || request()->inertia()) {
            return inertia('DetailPeraturan', [
                'peraturan' => $peraturan
            ]);
        }

        return response()->json([
            'success' => true,
            'data'    => $peraturan
        ], 200);
    }

    public function download($unique_id)
    {
        $peraturan = Peraturan::with('jenisPeraturan')->where('unique_id', $unique_id)->firstOrFail();

        $cleanTitle = Str::limit(Str::slug($peraturan->judul), 80, '');
        $filename = ($cleanTitle ?: 'dokumen-peraturan') . '.pdf';

        // 1. Ambil dari local cache (atau unduh sekali dari MinIO lalu simpan ke disk lokal)
        $localPath = DocumentStorageService::getCachedOrDownload($peraturan);

        if ($localPath && file_exists($localPath) && filesize($localPath) > 1024) {
            $headers = [
                'Content-Type' => 'application/pdf',
                'Cache-Control' => 'public, max-age=604800, immutable',
                'ETag' => '"' . md5_file($localPath) . '"',
            ];

            // Jika diminta inline (misalnya untuk iframe viewer)
            if (request()->has('inline') && request('inline') == '1') {
                return response()->file($localPath, array_merge($headers, [
                    'Content-Disposition' => 'inline; filename="' . $filename . '"',
                ]));
            }

            // Default: unduh langsung (attachment)
            return response()->download($localPath, $filename, array_merge($headers, [
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ]));
        }

        // Jika diminta inline oleh iframe dan file tidak ada, JANGAN redirect()->back()
        // karena redirect di dalam iframe akan me-load parent page di dalam iframe (nested / double loop)!
        if (request()->has('inline') && request('inline') == '1') {
            return response('Dokumen PDF tidak tersedia di server penyimpanan MinIO.', 404);
        }

        return redirect()->back()->with('error', 'Dokumen PDF tidak tersedia di server penyimpanan MinIO.');
    }

    public function viewer($unique_id)
    {
        $peraturan = Peraturan::with([
            'jenisPeraturan',
            'statusPeraturan',
            'lawRelations.toPeraturan' => function($q) {
                $q->withCount([
                    'pasal',
                    'strukturDokumen as pembukaan_count' => function($sq) {
                        $sq->where('tipe_struktur', 'PEMBUKAAN');
                    }
                ]);
            },
            'lawRelations.relationType'
        ])
        ->where('unique_id', $unique_id)
        ->firstOrFail();

        // Cek ketersediaan dokumen: apakah sudah di cache atau ada di MinIO
        $localPath = DocumentStorageService::getCachedOrDownload($peraturan);
        $hasPdf = ($localPath && file_exists($localPath) && filesize($localPath) > 1024);

        $pdfUrl = $hasPdf ? url("/peraturan/{$unique_id}/download?inline=1") : null;

        return inertia('Viewer/DokumenViewer', [
            'peraturan' => $peraturan,
            'pdfUrl'    => $pdfUrl,
            'hasPdf'    => $hasPdf,
        ]);
    }

    // Fungsi baru untuk mengambil data filter secara dinamis
    public function referensiFilter()
    {
        // 1. Ambil Jenis Peraturan (Kategori) yang ID-nya benar-benar ada di tabel peraturan sah
        $kategori = JenisPeraturan::whereIn('id', Peraturan::available()->select('jenis_peraturan_id')->distinct())
            ->get()
            ->groupBy('nama')
            ->map(function ($items, $nama) {
                return [
                    'id' => $items->pluck('id')->join(','),
                    'nama' => $nama
                ];
            })->values();

        // 2. Ambil Status yang ID-nya benar-benar ada di tabel peraturan sah
        $status = Status::whereIn('id', Peraturan::available()->select('status_id')->distinct())
            ->get()
            ->groupBy('nama_status')
            ->map(function ($items, $nama) {
                return [
                    'id' => $items->pluck('id')->join(','),
                    'nama' => $nama
                ];
            })->values();

        // 3. Ambil Tahun yang tersedia secara unik dan urutkan dari yang terbaru
        $tahun = Peraturan::available()
            ->select('tahun')
            ->whereNotNull('tahun')
            ->distinct()
            ->orderBy('tahun', 'desc')
            ->pluck('tahun');

        // 4. Ambil Entitas/Lokasi Daerah yang unik, abaikan 'Pemerintah Pusat'
        $lokasiDaerah = Peraturan::select('lokasi_daerah')
            ->whereNotNull('lokasi_daerah')
            ->where('lokasi_daerah', '!=', '')
            ->where('lokasi_daerah', '!=', 'Pemerintah Pusat')
            ->distinct()
            ->orderBy('lokasi_daerah', 'asc')
            ->pluck('lokasi_daerah');

        // 5. Ambil Subjek yang unik
        $rawSubjek = Peraturan::select('subjek')
            ->whereNotNull('subjek')
            ->where('subjek', '!=', '')
            ->distinct()
            ->pluck('subjek');

        // Do not split the subject string, keep it exactly as provided in the data
        $subjekList = collect();
        foreach ($rawSubjek as $subjekStr) {
            $trimmed = trim($subjekStr);
            if (!empty($trimmed)) {
                $subjekList->push($trimmed);
            }
        }
        $subjekList = $subjekList->unique()->sort()->values();

        return response()->json([
            'kategori' => $kategori,
            'status'   => $status,
            'tahun'    => $tahun,
            'lokasi_daerah' => $lokasiDaerah,
            'subjek' => $subjekList
        ], 200);
    }
}
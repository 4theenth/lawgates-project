<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use App\Models\JenisPeraturan;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\DocumentImportService;
use App\Models\StrukturDokumen;
use App\Models\Pasal;
use App\Models\PenjelasanPasal;
use App\Models\LawRelation;
use App\Models\DraftDokumen;
use Illuminate\Support\Facades\DB;

class DokumenHukumController extends Controller
{
    public function index(Request $request)
    {
        $query = Peraturan::with(['jenisPeraturan', 'statusPeraturan', 'creator', 'updater']);

        // Filter: Status (Berlaku / Tidak Berlaku / Draft)
        if ($request->filled('status') && $request->status !== 'all') {
            $query->whereHas('statusPeraturan', function ($q) use ($request) {
                if ($request->status === 'berlaku') {
                    $q->where('nama_status', 'ilike', '%berlaku%')
                      ->where('nama_status', 'not ilike', '%tidak berlaku%')
                      ->where('nama_status', 'not ilike', '%belum berlaku%');
                } else if ($request->status === 'tidak_berlaku') {
                    $q->where('nama_status', 'ilike', '%tidak berlaku%');
                } else if ($request->status === 'draft') {
                    $q->where('nama_status', 'ilike', '%draft%');
                }
            });
        }

        // Search: Judul
        if ($request->filled('search')) {
            $query->where('judul', 'ilike', '%' . $request->search . '%');
        }

        // Filter: Kategori (Jenis Peraturan)
        if ($request->filled('kategori')) {
            $kategoriFilters = is_array($request->kategori) ? $request->kategori : explode(',', $request->kategori);
            $query->whereHas('jenisPeraturan', function ($q) use ($kategoriFilters) {
                $q->whereIn('nama', $kategoriFilters);
            });
        }

        // Filter: Lokasi Daerah
        if ($request->filled('lokasi_daerah')) {
            $lokasiFilters = is_array($request->lokasi_daerah) ? $request->lokasi_daerah : explode(',', $request->lokasi_daerah);
            $query->whereIn('lokasi_daerah', $lokasiFilters);
        }

        // Filter: Subjek
        if ($request->filled('subjek')) {
            $subjekFilters = is_array($request->subjek) ? $request->subjek : explode(',', $request->subjek);
            $query->where(function ($subQ) use ($subjekFilters) {
                foreach ($subjekFilters as $subjekItem) {
                    $subQ->orWhere('subjek', 'ilike', '%' . trim($subjekItem) . '%');
                }
            });
        }

        // Sort (3-Logic Sort)
        if ($request->filled('sortColumn') && $request->filled('sortDirection')) {
            $direction = strtolower($request->sortDirection) === 'desc' ? 'desc' : 'asc';
            
            if ($request->sortColumn === 'kategori') {
                $query->leftJoin('jenis_peraturan', 'peraturan.jenis_peraturan_id', '=', 'jenis_peraturan.id')
                      ->orderBy('jenis_peraturan.nama', $direction)
                      ->orderBy('peraturan.updated_at', 'desc')
                      ->select('peraturan.*');
            } else if ($request->sortColumn === 'status') {
                $query->leftJoin('status_peraturan', 'peraturan.status_id', '=', 'status_peraturan.id');
                if ($direction === 'asc') {
                    // Klik sekali: dari yg berlaku -> tidak berlaku
                    $query->orderByRaw("CASE 
                        WHEN LOWER(status_peraturan.nama_status) LIKE '%tidak%' THEN 2
                        WHEN LOWER(status_peraturan.nama_status) LIKE '%berlaku%' THEN 1
                        ELSE 3
                    END ASC");
                } else {
                    // Klik 2 kali: dari yg tidak berlaku -> berlaku
                    $query->orderByRaw("CASE 
                        WHEN LOWER(status_peraturan.nama_status) LIKE '%tidak%' THEN 1
                        WHEN LOWER(status_peraturan.nama_status) LIKE '%berlaku%' THEN 2
                        ELSE 3
                    END ASC");
                }
                $query->orderBy('peraturan.updated_at', 'desc')
                      ->select('peraturan.*');
            } else if ($request->sortColumn === 'tgl_ditetapkan') {
                $query->orderByRaw("tanggal_penetapan {$direction} NULLS LAST")
                      ->orderBy('peraturan.updated_at', 'desc');
            } else if ($request->sortColumn === 'judul') {
                $query->orderByRaw("judul {$direction} NULLS LAST")
                      ->orderBy('peraturan.updated_at', 'desc');
            } else if ($request->sortColumn === 'author') {
                $query->leftJoin('users as creator', 'peraturan.created_by', '=', 'creator.id')
                      ->leftJoin('users as updater', 'peraturan.updated_by', '=', 'updater.id')
                      ->orderByRaw("COALESCE(updater.username, creator.username, 'Sistem') {$direction}")
                      ->orderBy('peraturan.updated_at', 'desc')
                      ->select('peraturan.*');
            } else {
                $query->orderBy($request->sortColumn, $direction);
            }
        } else {
            // Default sort: sesuai terakhir pembaruan
            $query->orderBy('peraturan.updated_at', 'desc')->orderBy('peraturan.id', 'desc');
        }

        $pageSize = $request->input('pageSize', 10);
        $paginator = $query->paginate($pageSize)->withQueryString();

        // Format data to match React component expectations
        $formattedData = $paginator->getCollection()->map(function ($item) {
            $namaStatus = strtolower($item->statusPeraturan ? $item->statusPeraturan->nama_status : '');
            $status = 'berlaku';
            if (str_contains($namaStatus, 'draft')) {
                $status = 'draft';
            } else if (str_contains($namaStatus, 'tidak berlaku')) {
                $status = 'tidak_berlaku';
            }

            return [
                'id' => (string) $item->unique_id, // unique_id used for URL and deletion
                'kategori' => $item->jenisPeraturan ? $item->jenisPeraturan->nama : '-',
                'lokasi_daerah' => $item->lokasi_daerah,
                'subjek' => $item->subjek,
                'judul' => $item->judul,
                'status' => $status,
                'tgl_ditetapkan' => $item->tanggal_penetapan ? $item->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
                'author' => $item->updater ? $item->updater->username : ($item->creator ? $item->creator->username : 'Sistem'),
                'real_status' => $item->statusPeraturan ? $item->statusPeraturan->nama_status : '-',
            ];
        });

        $paginator->setCollection($formattedData);

        // Fetch References for filters (Categories)
        $categories = JenisPeraturan::whereIn('id', Peraturan::select('jenis_peraturan_id')->distinct())
            ->pluck('nama')
            ->unique()
            ->values();

        $lokasiDaerah = Peraturan::select('lokasi_daerah')
            ->whereNotNull('lokasi_daerah')
            ->where('lokasi_daerah', '!=', '')
            ->distinct()
            ->pluck('lokasi_daerah')
            ->values();

        $rawSubjek = Peraturan::select('subjek')
            ->whereNotNull('subjek')
            ->where('subjek', '!=', '')
            ->distinct()
            ->pluck('subjek');

        $subjekList = collect();
        foreach ($rawSubjek as $subjekStr) {
            $trimmed = trim($subjekStr);
            if (!empty($trimmed)) {
                $subjekList->push($trimmed);
            }
        }
        $subjekList = $subjekList->unique()->sort()->values();

        // Khusus Tab Draft: Ambil data dari tabel draft_dokumen
        $draftsPaginator = null;
        if ($request->status === 'draft') {
            $draftQuery = DraftDokumen::query()->where('status', 'draft');
            if ($request->filled('search')) {
                $search = $request->search;
                $draftQuery->where(function($q) use ($search) {
                    $q->where('nama_draft', 'ilike', "%{$search}%")
                      ->orWhere('autor', 'ilike', "%{$search}%");
                });
            }

            if ($request->filled('sortColumn') && $request->filled('sortDirection')) {
                $dir = strtolower($request->sortDirection) === 'desc' ? 'desc' : 'asc';
                if ($request->sortColumn === 'nama_draft') {
                    $draftQuery->orderBy('nama_draft', $dir);
                } else if ($request->sortColumn === 'autor') {
                    $draftQuery->orderBy('autor', $dir);
                } else if ($request->sortColumn === 'jumlah_file') {
                    $draftQuery->orderBy('jumlah_file', $dir);
                } else {
                    $draftQuery->orderBy('created_at', $dir);
                }
            } else {
                $draftQuery->orderBy('created_at', 'desc')->orderBy('id', 'desc');
            }

            $draftsPaginator = $draftQuery->paginate($pageSize)->withQueryString();
            $formattedDrafts = $draftsPaginator->getCollection()->map(function ($item) {
                return [
                    'id' => (string) $item->id,
                    'nama_draft' => $item->nama_draft,
                    'autor' => $item->autor ?: 'Admin',
                    'jumlah_file' => (int) $item->jumlah_file,
                    'created_at' => $item->created_at ? $item->created_at->isoFormat('D MMMM YYYY') : '-',
                ];
            });
            $draftsPaginator->setCollection($formattedDrafts);
        }

        // Statistik ringkasan dokumen hukum untuk StatCards
        $stats = [
            'total_dokumen' => Peraturan::count(),
            'total_berlaku' => Peraturan::whereHas('statusPeraturan', function ($q) {
                $q->where('nama_status', 'not ilike', '%tidak berlaku%')
                  ->where('nama_status', 'not ilike', '%belum berlaku%');
            })->count(),
            'total_tidak_berlaku' => Peraturan::whereHas('statusPeraturan', function ($q) {
                $q->where('nama_status', 'ilike', '%tidak berlaku%');
            })->count(),
            'total_draft' => DraftDokumen::where('status', 'draft')->count(),
            'penambahan_baru' => 12,
        ];

        return Inertia::render('Admin/DokumenHukum/Index', [
            'peraturans' => $paginator,
            'drafts' => $draftsPaginator,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'kategori', 'lokasi_daerah', 'sortColumn', 'sortDirection', 'pageSize']),
            'referensi' => [
                'kategori' => $categories,
                'lokasi_daerah' => $lokasiDaerah,
                'subjek' => $subjekList
            ]
        ]);
    }

    public function storeDraft(Request $request)
    {
        $request->validate([
            'nama_draft' => 'required|string|max:255',
            'files' => 'required|array',
            'id' => 'nullable|integer',
        ]);

        $user = auth()->user();
        $autor = $user ? ($user->name ?? 'Admin') : 'Admin';
        $files = $request->input('files');

        // Pengecekan duplikasi terhadap peraturan aktif di sistem (AC 2)
        foreach ($files as $f) {
            $fileTitle = $f['title'] ?? ($f['correctionData']['judul'] ?? null);
            $fileNomor = $f['nomor'] ?? ($f['correctionData']['nomorPeraturan'] ?? ($f['parsedData']['metadata']['nomor'] ?? null));
            $fileTahun = $f['tahun'] ?? ($f['correctionData']['tahun'] ?? ($f['parsedData']['metadata']['tahun'] ?? null));

            if ($fileNomor && $fileTahun) {
                $duplicateByNomorTahun = Peraturan::where('nomor', $fileNomor)
                    ->where('tahun', $fileTahun)
                    ->whereHas('statusPeraturan', function($q) {
                        $q->whereRaw('LOWER(nama_status) NOT LIKE ?', ['%draft%']);
                    })
                    ->first();

                if ($duplicateByNomorTahun && !str_contains(strtolower($duplicateByNomorTahun->judul), 'menunggu import')) {
                    return response()->json([
                        'success' => false,
                        'conflict' => true,
                        'message' => "Peraturan Nomor {$fileNomor} Tahun {$fileTahun} sudah ada di database sistem (Duplikasi terdeteksi).",
                        'existing_id' => $duplicateByNomorTahun->unique_id,
                        'existing_title' => $duplicateByNomorTahun->judul
                    ], 409);
                }
            }

            if ($fileTitle) {
                $duplicatePeraturan = Peraturan::whereRaw('LOWER(judul) = ?', [strtolower($fileTitle)])
                    ->whereHas('statusPeraturan', function($q) {
                        $q->whereRaw('LOWER(nama_status) NOT LIKE ?', ['%draft%']);
                    })
                    ->first();
                if ($duplicatePeraturan && !str_contains(strtolower($duplicatePeraturan->judul), 'menunggu import')) {
                    return response()->json([
                        'success' => false,
                        'conflict' => true,
                        'message' => "Peraturan dengan judul \"{$fileTitle}\" sudah ada di database sistem (Duplikasi terdeteksi).",
                        'existing_id' => $duplicatePeraturan->unique_id,
                        'existing_title' => $duplicatePeraturan->judul
                    ], 409);
                }
            }

            // MinIO Write-Back Sync (AC 3): Simpan data/teks terbaru ke MinIO dengan sufiks _edited.json
            $fileName = $f['name'] ?? ($f['title'] ?? 'draft_dokumen');
            $contentToSave = $f['correctionData'] ?? ($f['parsedData'] ?? $f);
            $this->writeBackToMinio($fileName, $contentToSave);
        }

        if ($request->filled('id')) {
            $draft = DraftDokumen::find($request->id);
            if ($draft) {
                $draft->update([
                    'nama_draft' => $request->nama_draft,
                    'jumlah_file' => count($files),
                    'files_data' => $files,
                    'status' => 'draft',
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Draft berhasil diperbarui',
                    'data' => $draft,
                ]);
            }
        }

        $draft = DraftDokumen::create([
            'nama_draft' => $request->nama_draft,
            'user_id' => $user?->id,
            'autor' => $autor,
            'jumlah_file' => count($files),
            'files_data' => $files,
            'status' => 'draft',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Draft berhasil disimpan',
            'data' => $draft,
        ]);
    }

    public function showDraft($id)
    {
        $draft = DraftDokumen::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $draft,
        ]);
    }

    public function checkDraftDuplicate(Request $request)
    {
        $filename = $request->query('filename');
        if (!$filename) {
            return response()->json(['exists' => false]);
        }

        // Cari draft yang mungkin mengandung file ini
        $draft = DraftDokumen::where('files_data', 'like', '%' . $filename . '%')->first();

        if ($draft) {
            $filesData = is_string($draft->files_data) ? json_decode($draft->files_data, true) : $draft->files_data;
            if (is_array($filesData)) {
                foreach ($filesData as $f) {
                    if (($f['name'] ?? '') === $filename) {
                        return response()->json([
                            'exists' => true,
                            'conflict' => true,
                            'draft_name' => $draft->nama_draft,
                            'message' => "File sudah terdaftar di draft '{$draft->nama_draft}'."
                        ], 409);
                    }
                }
            }
        }

        return response()->json(['exists' => false]);
    }

    public function checkDuplicate(Request $request)
    {
        $filename = $request->query('filename');
        $judul = $request->query('judul');
        $standardId = $request->query('standard_id') ?? $request->query('id_dokumen');
        $nomor = $request->query('nomor');
        $tahun = $request->query('tahun');
        $kategori = $request->query('kategori');

        if (!$filename && !$judul && !$standardId && !($nomor && $tahun)) {
            return response()->json(['exists' => false]);
        }

        // 1. Cek di tabel peraturan (Database Dokumen Hukum - AC 2)
        $query = Peraturan::query();
        if ($standardId) {
            $query->where('unique_id', $standardId);
        } elseif ($nomor && $tahun) {
            $query->where('nomor', $nomor)->where('tahun', $tahun);
            if ($kategori) {
                $query->whereHas('jenisPeraturan', function($q) use ($kategori) {
                    $q->whereRaw('LOWER(nama) LIKE ?', ['%' . strtolower($kategori) . '%'])
                      ->orWhereRaw('LOWER(kode) LIKE ?', ['%' . strtolower($kategori) . '%']);
                });
            }
        } elseif ($judul) {
            $query->whereRaw('LOWER(judul) LIKE ?', ['%' . strtolower($judul) . '%']);
        } elseif ($filename) {
            $cleanName = pathinfo($filename, PATHINFO_FILENAME);
            $cleanNameWithSpaces = str_replace('_', ' ', $cleanName);
            $query->where(function($q) use ($cleanName, $cleanNameWithSpaces) {
                $q->where('unique_id', $cleanName)
                  ->orWhereRaw('LOWER(judul) LIKE ?', ['%' . strtolower($cleanNameWithSpaces) . '%']);
            });
        }

        $existing = $query->first();
        if ($existing && !str_contains(strtolower($existing->judul), 'menunggu import')) {
            return response()->json([
                'exists' => true,
                'conflict' => true,
                'source' => 'database',
                'title' => $existing->judul,
                'existing_id' => $existing->unique_id,
                'message' => "Dokumen '{$existing->judul}' sudah terdaftar di database."
            ], 409);
        }

        // 2. Cek di tabel draft
        if ($filename || ($nomor && $tahun)) {
            $draftQuery = DraftDokumen::query();
            if ($filename) {
                $draftQuery->where('files_data', 'like', '%' . $filename . '%');
            } elseif ($nomor && $tahun) {
                $draftQuery->where('files_data', 'like', '%' . $nomor . '%')
                           ->where('files_data', 'like', '%' . $tahun . '%');
            }
            $draft = $draftQuery->first();
            if ($draft) {
                return response()->json([
                    'exists' => true,
                    'conflict' => true,
                    'source' => 'draft',
                    'draft_name' => $draft->nama_draft,
                    'message' => "Dokumen sudah terdaftar di draft '{$draft->nama_draft}'."
                ], 409);
            }
        }

        return response()->json(['exists' => false]);
    }

    public function publishDraft(Request $request, DocumentImportService $importService)
    {
        $request->validate([
            'ids' => 'required|array',
        ]);

        $drafts = DraftDokumen::whereIn('id', $request->ids)->get();
        $totalPublished = 0;

        foreach ($drafts as $draft) {
            $filesData = $draft->files_data ?: [];
            foreach ($filesData as $fileData) {
                try {
                    if (isset($fileData['parsedData'])) {
                        $parsed = is_string($fileData['parsedData']) ? json_decode($fileData['parsedData'], true) : $fileData['parsedData'];
                        $peraturan = $importService->import($parsed);
                        
                        if (isset($fileData['correctionData'])) {
                            $correctionData = is_string($fileData['correctionData']) ? json_decode($fileData['correctionData'], true) : $fileData['correctionData'];
                            $this->performUpdate($peraturan, $correctionData, true);
                        }

                        // Pastikan status adalah Berlaku
                        $statusBerlaku = Status::where('nama_status', 'ilike', 'berlaku')->first();
                        if ($statusBerlaku) {
                            $peraturan->status_id = $statusBerlaku->id;
                            $peraturan->save();
                        }

                        $totalPublished++;
                    }
                } catch (\Exception $e) {
                    \Log::error("Error publishing draft item: " . $e->getMessage());
                }
            }

            $draft->status = 'published';
            $draft->save();
        }

        return response()->json([
            'success' => true,
            'message' => "Berhasil mempublikasikan dokumen hukum",
        ]);
    }

    public function bulkDeleteDraft(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
        ]);

        DraftDokumen::whereIn('id', $request->ids)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Draft berhasil dihapus',
        ]);
    }

    public function destroy($unique_id)
    {
        $peraturan = Peraturan::where('unique_id', $unique_id)->firstOrFail();
        
        // Force delete will permanently remove the record.
        // It relies on DB cascade delete or we have to manually delete relations.
        // Since we are cleaning up thoroughly:
        Pasal::where('peraturan_id', $peraturan->id)->forceDelete();
        StrukturDokumen::where('peraturan_id', $peraturan->id)->forceDelete();
        \App\Models\PenjelasanPasal::where('peraturan_id', $peraturan->id)->forceDelete();
        
        $peraturan->forceDelete();

        return redirect()->back();
    }

    public function importOcr(Request $request, DocumentImportService $importService)
    {
        $request->validate([
            'files' => 'required|array',
        ]);

        $successCount = 0;
        $errors = [];

        $duplicateFound = false;
        $duplicateMessage = '';

        foreach ($request->input('files') as $index => $fileData) {
            try {
                if (isset($fileData['parsedData'])) {
                    $parsed = is_string($fileData['parsedData']) ? json_decode($fileData['parsedData'], true) : $fileData['parsedData'];
                    $peraturan = $importService->import($parsed);
                    
                    if (isset($fileData['correctionData'])) {
                        $correctionData = is_string($fileData['correctionData']) ? json_decode($fileData['correctionData'], true) : $fileData['correctionData'];
                        $this->performUpdate($peraturan, $correctionData, true);

                        // AC 3: MinIO Write-Back Sync
                        $fileName = $fileData['name'] ?? ($peraturan->unique_id . '.json');
                        $this->writeBackToMinio($fileName, $correctionData);
                    } elseif ($parsed) {
                        // AC 3: MinIO Write-Back Sync
                        $fileName = $fileData['name'] ?? ($peraturan->unique_id . '.json');
                        $this->writeBackToMinio($fileName, $parsed);
                    }

                    // Cek jika ada file PDF yang disertakan
                    if ($request->hasFile("files.{$index}.rawFile")) {
                        $pdfFile = $request->file("files.{$index}.rawFile");
                        // Pastikan file yang diunggah benar-benar PDF sebelum disimpan
                        $mime = $pdfFile->getMimeType();
                        $ext = strtolower($pdfFile->getClientOriginalExtension());
                        if (str_contains($mime, 'pdf') || $ext === 'pdf') {
                            // Simpan ke disk minio di dalam folder pdf_dokumen
                            $path = $pdfFile->storeAs('pdf_dokumen', $peraturan->unique_id . '.pdf', 'minio');
                            $peraturan->file_pdf_path = $path;
                            $peraturan->save();
                        }
                    }

                    $successCount++;
                }
            } catch (\Exception $e) {
                \Log::error("Import OCR Error: " . $e->getMessage() . "\n" . $e->getTraceAsString());
                if (str_contains(strtolower($e->getMessage()), 'sudah ada')) {
                    $duplicateFound = true;
                    $duplicateMessage = $e->getMessage();
                    $errors[] = $e->getMessage();
                } else {
                    $errors[] = 'Gagal memproses file pada baris ' . ($index + 1) . '. Format data tidak sesuai.';
                }
            }
        }

        if (count($errors) > 0) {
            $status = $duplicateFound ? 409 : 400;
            return response()->json([
                'success' => false,
                'conflict' => $duplicateFound,
                'message' => $duplicateFound 
                    ? ($duplicateMessage ?: 'Dokumen sudah ada di database (Duplikasi terdeteksi).')
                    : ("Berhasil mengimpor {$successCount} dokumen. Gagal: " . count($errors)),
                'errors' => $errors
            ], $status);
        }

        return response()->json([
            'success' => true,
            'message' => "Berhasil mengimpor {$successCount} dokumen."
        ]);
    }

    public function getDetailForEdit($unique_id)
    {
        $peraturan = Peraturan::where('unique_id', $unique_id)
            ->with(['jenisPeraturan'])
            ->firstOrFail();

        // Ambil pembukaan (Struktur: PEMBUKAAN)
        $pembukaan = StrukturDokumen::where('peraturan_id', $peraturan->id)
            ->where('tipe_struktur', 'PEMBUKAAN')
            ->first();

        // Ambil KONSIDERANS, DASAR_HUKUM, DIKTUM
        $konsiderans = StrukturDokumen::where('peraturan_id', $peraturan->id)
            ->where('tipe_struktur', 'KONSIDERANS')
            ->first();

        $dasarHukum = StrukturDokumen::where('peraturan_id', $peraturan->id)
            ->where('tipe_struktur', 'DASAR_HUKUM')
            ->first();
            
        $diktumMemutuskan = StrukturDokumen::where('peraturan_id', $peraturan->id)
            ->where('tipe_struktur', 'DIKTUM')
            ->where('label', 'ilike', 'memutuskan')
            ->first();

        $menimbang = $konsiderans ? $konsiderans->judul_struktur : '';
        $mengingat = $dasarHukum ? $dasarHukum->judul_struktur : '';
        $memutuskan = $diktumMemutuskan ? $diktumMemutuskan->judul_struktur : '';

        if ($pembukaan && (!$menimbang && !$mengingat && !$memutuskan)) {
            $pembukaanTeks = $pembukaan->judul_struktur ?? '';
            // Ekstrak dari teks pembukaan jika digabung (fallback)
            if (preg_match('/Menimbang\s*:(.*?)(?:Mengingat\s*:|Memutuskan\s*:|$)/is', $pembukaanTeks, $m)) {
                $menimbang = trim($m[1]);
            }
            if (preg_match('/Mengingat\s*:(.*?)(?:Memutuskan\s*:|$)/is', $pembukaanTeks, $m)) {
                $mengingat = trim($m[1]);
            }
            if (preg_match('/Memutuskan\s*:(.*?)$/is', $pembukaanTeks, $m)) {
                $memutuskan = trim($m[1]);
            }
        }

        // Ambil Seluruh Struktur (BAB, BAGIAN, PARAGRAF) dan Pasal dengan Hierarki Penuh
        $rawStrukturList = StrukturDokumen::where('peraturan_id', $peraturan->id)
            ->whereNotIn('tipe_struktur', ['PEMBUKAAN', 'KONSIDERANS', 'DASAR_HUKUM', 'DIKTUM'])
            ->orderBy('id', 'asc')
            ->get();

        $rawPasalList = Pasal::where('peraturan_id', $peraturan->id)
            ->with('penjelasan')
            ->orderBy('urutan', 'asc')
            ->get();

        // Pass 1: Build ArticleItem map
        $pasalMap = [];
        foreach ($rawPasalList as $p) {
            $rawNomor = trim((string)($p->nomor_pasal ?? ''));
            if ($rawNomor === '0' || $rawNomor === '') {
                $nomorFormatted = 'Pasal';
            } else if (preg_match('/^(pasal|angka)/i', $rawNomor)) {
                $nomorFormatted = $rawNomor;
            } else {
                $nomorFormatted = 'Pasal ' . $rawNomor;
            }

            $targetInfo = $this->detectTargetIndukPhp($p->isi_pasal ?? '');
            $isAmendingContainer = !empty($targetInfo) || (bool)preg_match('/diubah\s+sebagai\s+berikut/i', $p->isi_pasal ?? '');

            $pasalMap[(string)$p->id] = [
                'id' => (string)$p->id,
                'nomor' => $nomorFormatted,
                'isi' => $p->isi_pasal ?? '',
                'penjelasan' => $p->penjelasan ? $p->penjelasan->isi_penjelasan : '',
                'tipe' => $p->parent_pasal_id ? 'PASAL_PERUBAHAN' : ($isAmendingContainer ? 'PASAL_PERUBAHAN_CONTAINER' : 'PASAL'),
                'targetInduk' => $targetInfo,
                'isExpanded' => false,
                'pasalList' => [],
                'parent_pasal_id' => $p->parent_pasal_id ? (string)$p->parent_pasal_id : null,
                'struktur_id' => $p->struktur_id ? (string)$p->struktur_id : null,
            ];
        }

        // Pass 2: Nest child pasals into parent pasals
        $rootPasalList = [];
        foreach ($pasalMap as $id => &$art) {
            if (!empty($art['parent_pasal_id']) && isset($pasalMap[$art['parent_pasal_id']])) {
                $pasalMap[$art['parent_pasal_id']]['pasalList'][] = &$art;
            } else {
                $rootPasalList[] = &$art;
            }
        }
        unset($art);

        // Pass 3: Instantiate ChapterItems for rawStrukturList
        $chapterMap = [];
        $assignedPasalIds = [];

        foreach ($rawStrukturList as $str) {
            $pasalsInStruktur = [];
            foreach ($rootPasalList as &$rp) {
                if (!empty($rp['struktur_id']) && (string)$rp['struktur_id'] === (string)$str->id) {
                    $pasalsInStruktur[] = &$rp;
                    $assignedPasalIds[(string)$rp['id']] = true;
                }
            }
            unset($rp);

            $judulStruktur = trim($str->judul_struktur ?? '');
            $label = trim($str->label ?? '');
            if ($judulStruktur && $label) {
                if (stripos($judulStruktur, $label) === 0) {
                    $judulFormatted = $judulStruktur;
                } else {
                    $judulFormatted = $label . ' ' . $judulStruktur;
                }
            } else {
                $judulFormatted = $judulStruktur ?: ($label ?: 'STRUKTUR');
            }

            $chapterMap[(string)$str->id] = [
                'id' => (string)$str->id,
                'judul' => $judulFormatted,
                'deskripsi' => '',
                'tipe' => $str->tipe_struktur ?? 'BAB',
                'isExpanded' => false,
                'children' => [],
                'pasalList' => $pasalsInStruktur,
                'parent_id' => $str->parent_id ? (string)$str->parent_id : null,
            ];
        }

        // Pass 4: Attach structural children (BAGIAN, PARAGRAF) to parent (BAB, BAGIAN)
        $rootChapterList = [];
        foreach ($chapterMap as $id => &$ch) {
            if (!empty($ch['parent_id']) && isset($chapterMap[$ch['parent_id']])) {
                $chapterMap[$ch['parent_id']]['children'][] = &$ch;
            } else {
                $rootChapterList[] = &$ch;
            }
        }
        unset($ch);

        // Pass 5: Recovery of unassigned/orphan pasals
        $unassignedPasals = [];
        foreach ($rootPasalList as &$rp) {
            if (!isset($assignedPasalIds[(string)$rp['id']])) {
                $unassignedPasals[] = &$rp;
            }
        }
        unset($rp);

        if (!empty($unassignedPasals)) {
            if (!empty($rootChapterList)) {
                foreach ($unassignedPasals as &$up) {
                    $rootChapterList[0]['pasalList'][] = &$up;
                }
                unset($up);
            } else {
                $rootChapterList[] = [
                    'id' => 'bab_default',
                    'judul' => 'Batang Tubuh',
                    'deskripsi' => '',
                    'tipe' => 'BAB',
                    'isExpanded' => true,
                    'children' => [],
                    'pasalList' => $unassignedPasals,
                ];
            }
        }

        $babList = $rootChapterList;

        // Ambil Riwayat Perubahan (Law Relations)
        $riwayatPerubahan = [];
        
        // Add current document as first item
        $riwayatPerubahan[] = [
            'id' => 'current',
            'kode' => $peraturan->unique_id,
            'isCurrent' => true,
            'currentStatusLabel' => 'Sedang dikoreksi'
        ];

        $lawRelations = \App\Models\LawRelation::with(['toPeraturan', 'relationType'])
            ->where('from_peraturan_id', $peraturan->id)
            ->get();

        foreach ($lawRelations as $relation) {
            $target = $relation->toPeraturan;
            $type = $relation->relationType;
            
            $statusLabel = 'tersedia';
            $statusVariant = 'tersedia';
            if ($target && str_contains(strtolower($target->judul), 'menunggu import')) {
                $statusLabel = 'belum tersedia';
                $statusVariant = 'belum_tersedia';
            }

            $keteranganLabel = $type ? $type->nama_relasi : 'terkait';
            $keteranganVariant = 'warning';
            if (in_array($keteranganLabel, ['diubah_oleh', 'dicabut_oleh', 'mencabut_sebagian'])) {
                $keteranganVariant = 'danger';
            }

            $riwayatPerubahan[] = [
                'id' => (string)$relation->id,
                'kode' => $target ? $target->unique_id : '',
                'statusBadge' => [
                    'label' => $statusLabel,
                    'variant' => $statusVariant
                ],
                'keteranganBadge' => [
                    'label' => $keteranganLabel,
                    'variant' => $keteranganVariant
                ],
                'isCurrent' => false
            ];
        }

        return response()->json([
            'standarId' => $peraturan->unique_id,
            'judul' => $peraturan->judul,
            'pembukaan' => [
                'judul' => 'Pembukaan',
                'menimbang' => $menimbang,
                'mengingat' => $mengingat,
                'memutuskan' => $memutuskan,
            ],
            'babList' => $babList,
            'riwayatPerubahan' => $riwayatPerubahan,
            'metadata' => [
                'pemrakarsa' => $peraturan->instansi ?? '',
                'tanggalDitetapkan' => $peraturan->tanggal_penetapan ? $peraturan->tanggal_penetapan->format('Y-m-d') : '',
                'tempatPenetapan' => $peraturan->tempat_penetapan ?? '',
            ]
        ]);
    }

    public function update(Request $request, $unique_id)
    {
        try {
            DB::beginTransaction();

            $peraturan = Peraturan::where('unique_id', $unique_id)->firstOrFail();

            // Pengecekan duplikasi judul terhadap peraturan lain (AC 3)
            $newJudul = $request->input('judul');
            if ($newJudul) {
                $duplicate = Peraturan::where('judul', $newJudul)
                    ->where('id', '!=', $peraturan->id)
                    ->first();
                if ($duplicate && !str_contains(strtolower($duplicate->judul), 'menunggu import')) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'conflict' => true,
                        'message' => "Dokumen dengan judul \"{$newJudul}\" sudah ada di sistem (Duplikasi terdeteksi).",
                        'existing_id' => $duplicate->unique_id,
                    ], 409);
                }
            }

            $this->performUpdate($peraturan, $request->all());

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Data hukum berhasil diperbarui'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Update Dokumen Hukum Error: ' . $e->getMessage() . "\n" . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data hukum. Silakan periksa kembali data yang dimasukkan atau hubungi administrator.'
            ], 500);
        }
    }

    private function performUpdate(Peraturan $peraturan, array $data, bool $isImport = false)
    {
        // 1. Update Peraturan Utama
        $userId = \Illuminate\Support\Facades\Auth::id();
        if (!$peraturan->created_by && $userId) {
            $peraturan->created_by = $userId;
        }
        if ($userId) {
            $peraturan->updated_by = $userId;
        }

        if (isset($data['judul'])) {
            $peraturan->judul = $data['judul'];
        }
        if (isset($data['nomorPeraturan'])) {
            $peraturan->nomor = $data['nomorPeraturan'];
        }
        if (isset($data['tempatPenetapan'])) {
            $peraturan->tempat_penetapan = $data['tempatPenetapan'];
        }
        if (isset($data['tanggalPenetapan'])) {
            // assume format Y-m-d
            $peraturan->tanggal_penetapan = $data['tanggalPenetapan'];
        }
        if (isset($data['metadata']['pemrakarsa'])) {
            $peraturan->instansi = $data['metadata']['pemrakarsa'];
            // Fill lokasi_daerah default using pemrakarsa if not set
            if (empty($peraturan->lokasi_daerah)) {
                $peraturan->lokasi_daerah = $data['metadata']['pemrakarsa'];
            }
        }
        if (isset($data['metadata']['lokasiDaerah'])) {
            $peraturan->lokasi_daerah = $data['metadata']['lokasiDaerah'];
        }
        if (isset($data['metadata']['subjek'])) {
            $peraturan->subjek = $data['metadata']['subjek'];
        }
        if (isset($data['status'])) {
            $statusInput = strtolower($data['status']);
            if ($statusInput === 'draft') {
                $statusObj = \App\Models\Status::firstOrCreate(['nama_status' => 'Draft']);
            } else if ($statusInput === 'tidak_berlaku') {
                $statusObj = \App\Models\Status::where('nama_status', 'ilike', 'tidak berlaku')->first();
            } else {
                $statusObj = \App\Models\Status::where('nama_status', 'ilike', 'berlaku')->first();
            }
            if ($statusObj) {
                $peraturan->status_id = $statusObj->id;
            }
        }
        $peraturan->save();

        // 2. Update Pembukaan
        $pembukaanData = $data['pembukaan'] ?? [];
        $menimbang = $pembukaanData['menimbang'] ?? '';
        $mengingat = $pembukaanData['mengingat'] ?? '';
        $memutuskan = $pembukaanData['memutuskan'] ?? '';

        if ($isImport) {
            // Hapus yang lama dari proses import sebelumnya
            Pasal::where('peraturan_id', $peraturan->id)->delete();
            StrukturDokumen::where('peraturan_id', $peraturan->id)->delete();
            PenjelasanPasal::where('peraturan_id', $peraturan->id)->delete();

            $urutanStruktur = 1;
            $urutanPasal = 1;
            
            if ($menimbang) {
                StrukturDokumen::create([
                    'peraturan_id' => $peraturan->id,
                    'tipe_struktur' => 'KONSIDERANS',
                    'label' => 'Menimbang',
                    'judul_struktur' => $menimbang,
                    'urutan' => $urutanStruktur++
                ]);
            }
            if ($mengingat) {
                StrukturDokumen::create([
                    'peraturan_id' => $peraturan->id,
                    'tipe_struktur' => 'DASAR_HUKUM',
                    'label' => 'Mengingat',
                    'judul_struktur' => $mengingat,
                    'urutan' => $urutanStruktur++
                ]);
            }
            if ($memutuskan) {
                StrukturDokumen::create([
                    'peraturan_id' => $peraturan->id,
                    'tipe_struktur' => 'DIKTUM',
                    'label' => 'Memutuskan',
                    'judul_struktur' => $memutuskan,
                    'urutan' => $urutanStruktur++
                ]);
            }

            $babList = $data['babList'] ?? [];
            $this->saveStrukturAndPasal($peraturan->id, $babList, null, $urutanStruktur, $urutanPasal);
        } else {
            // Normal update for existing documents
            // Update Menimbang
            $konsiderans = StrukturDokumen::where('peraturan_id', $peraturan->id)->where('tipe_struktur', 'KONSIDERANS')->first();
            if ($konsiderans) {
                if ($menimbang) { $konsiderans->judul_struktur = $menimbang; $konsiderans->save(); } else { $konsiderans->delete(); }
            } else if ($menimbang) {
                StrukturDokumen::create(['peraturan_id' => $peraturan->id, 'tipe_struktur' => 'KONSIDERANS', 'label' => 'Menimbang', 'judul_struktur' => $menimbang]);
            }
            
            // Update Mengingat
            $dasarHukum = StrukturDokumen::where('peraturan_id', $peraturan->id)->where('tipe_struktur', 'DASAR_HUKUM')->first();
            if ($dasarHukum) {
                if ($mengingat) { $dasarHukum->judul_struktur = $mengingat; $dasarHukum->save(); } else { $dasarHukum->delete(); }
            } else if ($mengingat) {
                StrukturDokumen::create(['peraturan_id' => $peraturan->id, 'tipe_struktur' => 'DASAR_HUKUM', 'label' => 'Mengingat', 'judul_struktur' => $mengingat]);
            }
            
            // Update Memutuskan
            $diktum = StrukturDokumen::where('peraturan_id', $peraturan->id)->where('tipe_struktur', 'DIKTUM')->where('label', 'ilike', 'memutuskan')->first();
            if ($diktum) {
                if ($memutuskan) { $diktum->judul_struktur = $memutuskan; $diktum->save(); } else { $diktum->delete(); }
            } else if ($memutuskan) {
                StrukturDokumen::create(['peraturan_id' => $peraturan->id, 'tipe_struktur' => 'DIKTUM', 'label' => 'Memutuskan', 'judul_struktur' => $memutuskan]);
            }
            
            // Hapus concatenated string di PEMBUKAAN jika sebelumnya tersimpan secara tidak sengaja
            $pembukaan = StrukturDokumen::where('peraturan_id', $peraturan->id)->where('tipe_struktur', 'PEMBUKAAN')->first();
            if ($pembukaan) {
                $pembukaanTeks = $pembukaan->judul_struktur;
                if ($pembukaanTeks) {
                    $cleanP = preg_replace('/Menimbang\s*:.*?(?:Mengingat\s*:|Memutuskan\s*:|$)/is', '', $pembukaanTeks);
                    $cleanP = preg_replace('/Mengingat\s*:.*?(?:Memutuskan\s*:|$)/is', '', $cleanP);
                    $cleanP = preg_replace('/Memutuskan\s*:.*?$/is', '', $cleanP);
                    $cleanP = trim($cleanP);
                    
                    if ($cleanP !== $pembukaanTeks) {
                        $pembukaan->judul_struktur = $cleanP;
                        $pembukaan->save();
                    }
                }
            }

            $babList = $data['babList'] ?? [];
            foreach ($babList as $babData) {
                if ($babData['id'] !== 'bab_default') {
                    $bab = StrukturDokumen::find($babData['id']);
                    if ($bab) {
                        if (isset($babData['judul'])) {
                            $judulStruktur = $babData['judul'] ?? '';
                            $label = '';
                            if (preg_match('/^(BAB\s+[IVXLCDM]+)\s+(.*)$/i', $judulStruktur, $m)) {
                                $label = $m[1];
                                $judulStruktur = $m[2];
                            } else {
                                $label = $judulStruktur;
                                $judulStruktur = '';
                            }
                            $bab->label = $label;
                            $bab->judul_struktur = $judulStruktur;
                        }
                        $bab->save();
                    }
                }

                foreach ($babData['pasalList'] as $pasalData) {
                    $pasal = Pasal::find($pasalData['id']);
                    if ($pasal) {
                        $pasal->isi_pasal = $pasalData['isi'] ?? '';
                        $pasal->save();

                        // Update or Create Penjelasan
                        $penjelasanText = trim($pasalData['penjelasan'] ?? '');
                        $penjelasan = PenjelasanPasal::where('pasal_id', $pasal->id)->first();
                        
                        if ($penjelasan) {
                            if ($penjelasanText) {
                                $penjelasan->isi_penjelasan = $penjelasanText;
                                $penjelasan->save();
                            } else {
                                $penjelasan->delete();
                            }
                        } else if ($penjelasanText) {
                            PenjelasanPasal::create([
                                'pasal_id' => $pasal->id,
                                'peraturan_id' => $peraturan->id,
                                'isi_penjelasan' => $penjelasanText,
                            ]);
                        }
                    }
                }
            }
        }

        // 4. Update Riwayat Perubahan (LawRelation)
            $riwayatPerubahan = $data['riwayatPerubahan'] ?? [];
            foreach ($riwayatPerubahan as $riwayatData) {
                if (isset($riwayatData['id']) && is_numeric($riwayatData['id'])) {
                    $relation = LawRelation::find($riwayatData['id']);
                    if ($relation) {
                        $kode = $riwayatData['kode'] ?? '';
                        $targetPeraturan = Peraturan::where('unique_id', $kode)->first();
                        if ($targetPeraturan) {
                            $relation->to_peraturan_id = $targetPeraturan->id;
                            $relation->save();
                        }
                    }
                }
            }
    }
    public function scanMinio()
    {
        set_time_limit(60);

        try {
            $disk = \Illuminate\Support\Facades\Storage::disk('minio');
            $allFiles = $disk->allFiles('documents');
            
            $pendingImports = [];
            $categoriesMap = [];
            $subfoldersMap = [];
            $minioFileItems = [];
            
            $existingPaths = Peraturan::whereNotNull('file_pdf_path')->pluck('file_pdf_path')->toArray();
            
            foreach ($allFiles as $file) {
                $file = ltrim($file, '/');
                
                if (str_ends_with(strtolower($file), '/ocr.json') || str_ends_with(strtolower($file), '.json')) {
                    $dir = dirname($file);
                    $expectedPdfPath = $dir . '/document.pdf';
                    
                    $parts = explode('/', $dir);
                    $kategoriRaw = strtolower($parts[1] ?? 'lainnya');
                    
                    $kategoriMap = [
                        'uu' => 'Undang Undang',
                        'uud' => 'Undang Undang Dasar',
                        'uudrt' => 'Undang Undang Darurat',
                        'perpres' => 'Peraturan Presiden',
                        'pp' => 'Peraturan Pemerintah',
                        'perda' => 'PERDA',
                        'permen' => 'Peraturan Menteri',
                        'perpu' => 'PERPU',
                        'perppu' => 'PERPU',
                        'kepres' => 'Keputusan Presiden',
                        'keppres' => 'Keputusan Presiden',
                        'inpres' => 'Instruksi Presiden',
                        'tapmpr' => 'TAP MPR',
                    ];

                    $kategori = $kategoriMap[$kategoriRaw] ?? ucwords(str_replace(['_', '-'], ' ', $kategoriRaw));

                    $subfolderRaw = count($parts) >= 4 ? $parts[2] : null;
                    $subfolderLabel = $subfolderRaw ? str_replace(['_', '-'], ' ', $subfolderRaw) : null;

                    if (!isset($categoriesMap[$kategori])) {
                        $categoriesMap[$kategori] = 0;
                    }
                    $categoriesMap[$kategori]++;

                    if ($subfolderRaw) {
                        if (!isset($subfoldersMap[$kategori])) {
                            $subfoldersMap[$kategori] = [];
                        }
                        if (!isset($subfoldersMap[$kategori][$subfolderRaw])) {
                            $subfoldersMap[$kategori][$subfolderRaw] = [
                                'id' => md5($kategori . '_' . $subfolderRaw),
                                'name' => $subfolderRaw,
                                'label' => $subfolderLabel,
                                'count' => 0,
                            ];
                        }
                        $subfoldersMap[$kategori][$subfolderRaw]['count']++;
                    }

                    $fileName = basename($file);
                    $folderName = basename($dir);
                    $titleFormatted = str_replace(['_', '-'], ' ', $folderName);
                    $titleFormatted = ucwords($titleFormatted);

                    $minioFileItems[] = [
                        'id' => md5($file),
                        'name' => $fileName,
                        'title' => $titleFormatted,
                        'sizeKb' => 1500,
                        'category' => $kategori,
                        'subfolder' => $subfolderRaw,
                        'subfolder_label' => $subfolderLabel,
                        'folder_path' => $dir,
                        'file_path' => $file,
                    ];

                    if (!in_array($expectedPdfPath, $existingPaths)) {
                        $pendingImports[] = [
                            'folder_path' => $dir,
                            'nama_file' => $folderName,
                            'kategori' => $kategori
                        ];
                    }
                }
            }
            
            $formattedCategories = [];
            $cIdx = 1;
            foreach ($categoriesMap as $catName => $count) {
                $formattedCategories[] = [
                    'id' => (string) $cIdx++,
                    'name' => $catName,
                    'count' => $count
                ];
            }

            $formattedSubfolders = [];
            foreach ($subfoldersMap as $catName => $subs) {
                $formattedSubfolders[$catName] = array_values($subs);
            }

            return response()->json([
                'success' => true,
                'categories' => $formattedCategories,
                'subfolders' => $formattedSubfolders,
                'files' => $minioFileItems,
                'data' => array_values($pendingImports)
            ]);
        } catch (\Exception $e) {
            \Log::error("MinIO Scan Error: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memindai penyimpanan dokumen hukum.'
            ], 500);
        }
    }
    public function previewPdfMinio(Request $request)
    {
        $filename = $request->query('filename');
        $judul = $request->query('judul');

        if (!$filename && !$judul) {
            return response('Nama file atau judul tidak valid.', 400);
        }

        $baseName = str_replace('.json', '', $filename ?? '');
        $textToSearch = $judul ?? $filename ?? '';
        
        // Extract numbers (like nomor 6, tahun 2011)
        preg_match_all('/\d+/', $textToSearch, $matches);
        $numbers = $matches[0] ?? [];

        try {
            $allFiles = \Illuminate\Support\Facades\Storage::disk('minio')->allFiles('documents');
            
            $pdfPath = collect($allFiles)->first(function($file) use ($baseName, $numbers, $textToSearch) {
                if (!str_ends_with(strtolower($file), '.pdf')) return false;
                
                // 1. Exact or partial match with filename
                if ($baseName && str_contains(strtolower($file), strtolower($baseName))) {
                    return true;
                }
                
                // 2. Fuzzy match based on extracted numbers from judul/filename
                if (count($numbers) >= 2) {
                    $hasAllNumbers = true;
                    foreach ($numbers as $num) {
                        if (!preg_match("/\b{$num}\b/", $file)) {
                            $hasAllNumbers = false;
                            break;
                        }
                    }
                    if ($hasAllNumbers) {
                        // Check if it shares some prefix context to avoid false positives (e.g. "uu", "undang")
                        $typeStr = strtolower(substr($textToSearch, 0, 4)); 
                        if ($typeStr && str_contains(strtolower($file), $typeStr)) {
                            return true;
                        }
                    }
                }
                
                return false;
            });

            if (!$pdfPath) {
                return response('Dokumen PDF sementara tidak ditemukan di server penyimpanan MinIO.', 404);
            }

            $fileContent = \Illuminate\Support\Facades\Storage::disk('minio')->get($pdfPath);

            return response($fileContent, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="document.pdf"'
            ]);
        } catch (\Exception $e) {
            return response('Gagal mengambil dokumen dari MinIO: ' . $e->getMessage(), 500);
        }
    }

    public function importFromMinio(Request $request, DocumentImportService $importService)
    {
        $request->validate([
            'folder_path' => 'required|string',
        ]);

        $folderPath = $request->folder_path;
        $jsonPath = $folderPath . '/ocr.json';

        try {
            if (!\Illuminate\Support\Facades\Storage::disk('minio')->exists($jsonPath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File ocr.json tidak ditemukan di folder tersebut.'
                ], 404);
            }

            // Get JSON content from MinIO
            $jsonContent = \Illuminate\Support\Facades\Storage::disk('minio')->get($jsonPath);
            $parsedData = json_decode($jsonContent, true);

            if (!$parsedData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal membaca format JSON.'
                ], 400);
            }

            // Import using existing service
            $peraturan = $importService->import($parsedData);

            // Karena DocumentImportService melakukan hardcode path 'documents/...',
            // kita override berdasarkan lokasi folder sebenarnya di MinIO
            if ($peraturan) {
                $peraturan->update([
                    'file_pdf_path' => $folderPath . '/document.pdf'
                ]);
                // AC 3: MinIO Write-Back Sync
                $this->writeBackToMinio($folderPath . '/ocr.json', $parsedData);
            }

            return response()->json([
                'success' => true,
                'message' => 'Berhasil import peraturan dari MinIO',
                'data' => $peraturan
            ]);

        } catch (\Exception $e) {
            \Log::error("MinIO Import Error: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem saat mengimpor dokumen hukum dari penyimpanan.'
            ], 500);
        }
    }

    /**
     * Endpoint GET /api/admin/minio/files/{filename} (AC 1)
     * Membaca isi teks/JSON dokumen dari bucket MinIO
     */
    public function getMinioFileContent(Request $request, $filename = null)
    {
        $targetFile = $filename ?: $request->query('path') ?: $request->query('filename');

        if (!$targetFile) {
            return response()->json([
                'success' => false,
                'message' => 'Filename or path is required.'
            ], 400);
        }

        try {
            $disk = \Illuminate\Support\Facades\Storage::disk('minio');
            $cleanPath = ltrim($targetFile, '/');

            if ($disk->exists($cleanPath)) {
                $content = $disk->get($cleanPath);
                return response($content, 200, [
                    'Content-Type' => str_ends_with(strtolower($cleanPath), '.json') ? 'application/json' : 'text/plain; charset=utf-8',
                ]);
            }

            $candidatePaths = [
                "documents/{$cleanPath}",
                "documents/{$cleanPath}/ocr.json",
                "documents/{$cleanPath}.json",
                "{$cleanPath}.json",
            ];

            foreach ($candidatePaths as $candidate) {
                if ($disk->exists($candidate)) {
                    $content = $disk->get($candidate);
                    return response($content, 200, [
                        'Content-Type' => str_ends_with(strtolower($candidate), '.json') ? 'application/json' : 'text/plain; charset=utf-8',
                    ]);
                }
            }

            return response()->json([
                'success' => false,
                'message' => "File '{$targetFile}' tidak ditemukan di penyimpanan MinIO."
            ], 404);
        } catch (\Exception $e) {
            \Log::error("MinIO Get File Content Error: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal membaca file dari penyimpanan MinIO.'
            ], 500);
        }
    }

    /**
     * Endpoint POST /api/admin/import/manual (AC 1)
     * Unggahan lokal manual
     */
    public function importManual(Request $request, DocumentImportService $importService)
    {
        return $this->importOcr($request, $importService);
    }

    /**
     * MinIO Write-Back Sync (AC 3)
     * Menyimpan data/teks terbaru dari Editor ke MinIO sebagai file baru dengan sufiks '_edited.json'
     */
    private function writeBackToMinio(?string $originalNameOrPath, $content): bool
    {
        if (empty($originalNameOrPath)) {
            return false;
        }

        try {
            $disk = \Illuminate\Support\Facades\Storage::disk('minio');
            $cleanPath = ltrim($originalNameOrPath, '/');

            // Susun nama file baru dengan sufiks _edited (agar file asli tidak tertimpa)
            if (str_ends_with(strtolower($cleanPath), '.json')) {
                $writeBackPath = preg_replace('/\.json$/i', '_edited.json', $cleanPath);
            } elseif (str_ends_with(strtolower($cleanPath), '.txt')) {
                $writeBackPath = preg_replace('/\.txt$/i', '_edited.txt', $cleanPath);
            } else {
                $writeBackPath = $cleanPath . '_edited.json';
            }

            $formattedContent = is_string($content) ? $content : json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

            $disk->put($writeBackPath, $formattedContent);
            \Log::info("MinIO Write-Back Sync berhasil disimpan ke: {$writeBackPath}");
            return true;
        } catch (\Exception $e) {
            \Log::error("MinIO Write-Back Sync gagal untuk {$originalNameOrPath}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Simpan struktur dokumen (BAB, BAGIAN, PARAGRAF) dan pasal-pasal secara rekursif
     */
    private function saveStrukturAndPasal(
        int $peraturanId,
        array $nodes,
        ?int $parentId = null,
        &$urutanStruktur = 1,
        &$urutanPasal = 1
    ) {
        foreach ($nodes as $node) {
            $tipe = strtoupper($node['tipe'] ?? 'BAB');
            $judul = $node['judul'] ?? '';
            $label = $node['label'] ?? '';
            $judulStruktur = $node['deskripsi'] ?? '';

            if (!$label && $judul) {
                if (preg_match('/^(BAB\s+[IVXLCDM\d]+|Bagian\s+[A-Za-z\d]+|Paragraf\s+\d+)\s*(?:-\s*)?(.*)$/i', $judul, $m)) {
                    $label = trim($m[1]);
                    $judulStruktur = trim($m[2]) ?: $judulStruktur;
                } else {
                    $label = $judul;
                }
            }

            $struktur = null;
            if ($node['id'] !== 'bab_default') {
                $struktur = StrukturDokumen::create([
                    'peraturan_id' => $peraturanId,
                    'tipe_struktur' => $tipe,
                    'label' => $label ?: 'Struktur',
                    'judul_struktur' => $judulStruktur,
                    'parent_id' => $parentId,
                    'urutan' => $urutanStruktur++
                ]);
            }

            $strukturId = $struktur ? $struktur->id : $parentId;

            // 1. Simpan Pasal-pasal langsung di bawah struktur ini
            if (!empty($node['pasalList']) && is_array($node['pasalList'])) {
                foreach ($node['pasalList'] as $pasalData) {
                    $this->savePasalNode($peraturanId, $strukturId, $pasalData, null, $urutanPasal);
                }
            }

            // 2. Simpan Sub-struktur (Children: Bagian / Paragraf) secara rekursif
            if (!empty($node['children']) && is_array($node['children'])) {
                $this->saveStrukturAndPasal($peraturanId, $node['children'], $strukturId, $urutanStruktur, $urutanPasal);
            }
        }
    }

    /**
     * Simpan node Pasal dan Sub-pasal (Pasal Ubahan) secara rekursif
     */
    private function savePasalNode(
        int $peraturanId,
        ?int $strukturId,
        array $pasalData,
        ?int $parentPasalId = null,
        &$urutanPasal = 1
    ) {
        $nomorPasal = trim($pasalData['nomor'] ?? $pasalData['label'] ?? 'Pasal');

        $pasal = Pasal::create([
            'peraturan_id' => $peraturanId,
            'struktur_id' => $strukturId,
            'parent_pasal_id' => $parentPasalId,
            'nomor_pasal' => $nomorPasal,
            'isi_pasal' => $pasalData['isi'] ?? '',
            'urutan' => $urutanPasal++
        ]);

        $penjelasanText = trim($pasalData['penjelasan'] ?? '');
        if ($penjelasanText) {
            PenjelasanPasal::create([
                'peraturan_id' => $peraturanId,
                'pasal_id' => $pasal->id,
                'isi_penjelasan' => $penjelasanText
            ]);
        }

        // Simpan Sub-Pasal yang diubah di dalam pasal container ini
        if (!empty($pasalData['pasalList']) && is_array($pasalData['pasalList'])) {
            foreach ($pasalData['pasalList'] as $subPasalData) {
                $this->savePasalNode($peraturanId, $strukturId, $subPasalData, $pasal->id, $urutanPasal);
            }
        }
    }

    private function detectTargetIndukPhp(?string $teks): ?array
    {
        if (!$teks) return null;

        if (preg_match('/(?:ketentuan\s+dalam\s+|perubahan\s+atas\s+|mengubah\s+)?(Undang[-_\s]?Undang|Peraturan[-_\s]?Pemerintah\s+Pengganti\s+Undang[-_\s]?Undang|Peraturan[-_\s]?Pemerintah|Peraturan[-_\s]?Presiden|Peraturan[-_\s]?Menteri)\s+Nomor\s+(\d+)\s+Tahun\s+(\d{4})(?:\s+tentang\s+([^,.\n()]+))?/i', $teks, $m)) {
            $rawJenis = $m[1];
            $nomor = $m[2];
            $tahun = $m[3];
            $tentang = isset($m[4]) ? trim($m[4]) : '';

            $jenisClean = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '_', $rawJenis)));
            $prefix = 'UU';
            if (str_contains($jenisClean, 'pengganti')) {
                $prefix = 'PERPPU';
            } else if (str_contains($jenisClean, 'pemerintah')) {
                $prefix = 'PP';
            } else if (str_contains($jenisClean, 'presiden')) {
                $prefix = 'PERPRES';
            } else if (str_contains($jenisClean, 'menteri')) {
                $prefix = 'PERMEN';
            }

            $stdId = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '_', trim($rawJenis))) . "_no_{$nomor}_{$tahun}";
            $labelSingkat = "{$prefix} {$nomor}/{$tahun}";
            $namaLengkap = "{$rawJenis} Nomor {$nomor} Tahun {$tahun}" . ($tentang ? " tentang {$tentang}" : '');

            return [
                'standardId' => $stdId,
                'labelSingkat' => $labelSingkat,
                'namaLengkap' => $namaLengkap,
            ];
        }

        return null;
    }
}

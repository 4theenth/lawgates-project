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
use Illuminate\Support\Facades\DB;

class DokumenHukumController extends Controller
{
    public function index(Request $request)
    {
        $query = Peraturan::with(['jenisPeraturan', 'statusPeraturan']);

        // Filter: Status (Berlaku / Tidak Berlaku)
        if ($request->filled('status') && $request->status !== 'all') {
            $query->whereHas('statusPeraturan', function ($q) use ($request) {
                if ($request->status === 'berlaku') {
                    $q->where('nama_status', 'ilike', '%berlaku%')
                      ->where('nama_status', 'not ilike', '%tidak berlaku%')
                      ->where('nama_status', 'not ilike', '%belum berlaku%');
                } else if ($request->status === 'tidak_berlaku') {
                    $q->where('nama_status', 'ilike', '%tidak berlaku%');
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

        // Sort
        if ($request->filled('sortColumn') && $request->filled('sortDirection')) {
            $direction = strtolower($request->sortDirection) === 'desc' ? 'desc' : 'asc';
            
            if ($request->sortColumn === 'kategori') {
                $query->join('jenis_peraturan', 'peraturan.jenis_peraturan_id', '=', 'jenis_peraturan.id')
                      ->orderBy('jenis_peraturan.nama', $direction)
                      ->select('peraturan.*');
            } else if ($request->sortColumn === 'status') {
                $query->join('status', 'peraturan.status_id', '=', 'status.id')
                      ->orderBy('status.nama_status', $direction)
                      ->select('peraturan.*');
            } else if ($request->sortColumn === 'tgl_ditetapkan') {
                $query->orderBy('tanggal_penetapan', $direction);
            } else {
                $query->orderBy($request->sortColumn, $direction);
            }
        } else {
            // Default sort
            $query->orderBy('tanggal_penetapan', 'desc');
        }

        $pageSize = $request->input('pageSize', 10);
        $paginator = $query->paginate($pageSize)->withQueryString();

        // Format data to match React component expectations
        $formattedData = $paginator->getCollection()->map(function ($item) {
            return [
                'id' => (string) $item->unique_id, // unique_id used for URL and deletion
                'kategori' => $item->jenisPeraturan ? $item->jenisPeraturan->nama : '-',
                'judul' => $item->judul,
                'status' => $item->statusPeraturan ? (
                    str_contains(strtolower($item->statusPeraturan->nama_status), 'tidak berlaku') ? 'tidak_berlaku' : 'berlaku'
                ) : 'berlaku', // Fallback status
                'tgl_ditetapkan' => $item->tanggal_penetapan ? $item->tanggal_penetapan->isoFormat('D MMMM YYYY') : '-',
                'real_status' => $item->statusPeraturan ? $item->statusPeraturan->nama_status : '-',
            ];
        });

        $paginator->setCollection($formattedData);

        // Fetch References for filters (Categories)
        $categories = JenisPeraturan::whereIn('id', Peraturan::select('jenis_peraturan_id')->distinct())
            ->pluck('nama')
            ->unique()
            ->values();

        return Inertia::render('Admin/DokumenHukum/Index', [
            'peraturans' => $paginator,
            'filters' => $request->only(['search', 'status', 'kategori', 'sortColumn', 'sortDirection', 'pageSize']),
            'referensi' => [
                'kategori' => $categories
            ]
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

        return redirect()->back()->with('success', 'Dokumen hukum berhasil dihapus.');
    }

    public function importOcr(Request $request, DocumentImportService $importService)
    {
        $request->validate([
            'files' => 'required|array',
        ]);

        $successCount = 0;
        $errors = [];

        foreach ($request->input('files') as $index => $fileData) {
            try {
                if (isset($fileData['parsedData'])) {
                    $parsed = is_string($fileData['parsedData']) ? json_decode($fileData['parsedData'], true) : $fileData['parsedData'];
                    $peraturan = $importService->import($parsed);
                    
                    if (isset($fileData['correctionData'])) {
                        $correctionData = is_string($fileData['correctionData']) ? json_decode($fileData['correctionData'], true) : $fileData['correctionData'];
                        $this->performUpdate($peraturan, $correctionData, true);
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
                $errors[] = $e->getMessage();
            }
        }

        if (count($errors) > 0) {
            return response()->json([
                'message' => "Berhasil mengimpor {$successCount} dokumen. Gagal: " . count($errors),
                'errors' => $errors
            ], 400);
        }

        return response()->json([
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

        // Ambil menimbang dan mengingat (dari teks struktur atau dari chunks jika ada)
        // Di sini asumsikan ada di database
        $menimbang = '';
        $mengingat = '';
        $memutuskan = '';
        if ($pembukaan) {
            $pembukaanTeks = $pembukaan->judul_struktur ?? '';
            // Ekstrak dari teks pembukaan jika digabung, atau mungkin sudah dipisah di DB
            // Untuk sementara kita masukkan teks lengkap jika ada
            if (preg_match('/Menimbang\s*:(.*?)(?:Mengingat\s*:|Memutuskan\s*:|$)/is', $pembukaanTeks, $m)) {
                $menimbang = trim($m[1]);
            }
            if (preg_match('/Mengingat\s*:(.*?)(?:Memutuskan\s*:|$)/is', $pembukaanTeks, $m)) {
                $mengingat = trim($m[1]);
            }
            if (preg_match('/Memutuskan\s*:(.*?)$/is', $pembukaanTeks, $m)) {
                $memutuskan = trim($m[1]);
            }
            if (!$menimbang && !$mengingat && !$memutuskan) {
                $menimbang = $pembukaanTeks;
            }
        }

        // Ambil Bab dan Pasal
        $babs = StrukturDokumen::where('peraturan_id', $peraturan->id)
            ->where('tipe_struktur', 'BAB')
            ->orderBy('id')
            ->get();

        $babList = [];
        if ($babs->count() > 0) {
            foreach ($babs as $bab) {
                $pasals = Pasal::where('peraturan_id', $peraturan->id)
                    ->where(function($q) use ($bab) {
                        $q->where('struktur_id', $bab->id)
                          ->orWhereIn('struktur_id', function($sub) use ($bab) {
                              $sub->select('id')->from('struktur_dokumen')->where('parent_id', $bab->id);
                          });
                    })
                    ->orderBy('urutan')
                    ->get();
                
                $pasalList = [];
                foreach ($pasals as $pasal) {
                    $penjelasan = \App\Models\PenjelasanPasal::where('pasal_id', $pasal->id)->first();
                    $pasalList[] = [
                        'id' => (string)$pasal->id,
                        'nomor' => $pasal->nomor_pasal,
                        'isi' => $pasal->isi_pasal ?? '',
                        'penjelasan' => $penjelasan ? $penjelasan->isi_penjelasan : ''
                    ];
                }

                $judulStruktur = trim($bab->judul_struktur);
                $label = trim($bab->label);
                if (stripos($judulStruktur, $label) === 0) {
                    $judulFormatted = $judulStruktur;
                } else {
                    $judulFormatted = $label . ' ' . $judulStruktur;
                }

                $babList[] = [
                    'id' => (string)$bab->id,
                    'judul' => trim($judulFormatted),
                    'deskripsi' => '',
                    'pasalList' => $pasalList,
                    'isExpanded' => false,
                ];
            }
        } else {
            // Jika tidak ada bab, ambil semua pasal langsung
            $pasals = Pasal::where('peraturan_id', $peraturan->id)->orderBy('urutan')->get();
            $pasalList = [];
            foreach ($pasals as $pasal) {
                $penjelasan = \App\Models\PenjelasanPasal::where('pasal_id', $pasal->id)->first();
                $pasalList[] = [
                    'id' => (string)$pasal->id,
                    'nomor' => $pasal->nomor_pasal,
                    'isi' => $pasal->isi_pasal ?? '',
                    'penjelasan' => $penjelasan ? $penjelasan->isi_penjelasan : ''
                ];
            }
            if (count($pasalList) > 0) {
                $babList[] = [
                    'id' => 'bab_default',
                    'judul' => 'Batang Tubuh',
                    'pasalList' => $pasalList,
                    'isExpanded' => true,
                ];
            }
        }

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
                'message' => 'Gagal memperbarui data hukum: ' . $e->getMessage()
            ], 500);
        }
    }

    private function performUpdate(Peraturan $peraturan, array $data, bool $isImport = false)
    {
        // 1. Update Peraturan Utama
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
        }
        
        $standarId = $data['standarId'] ?? null;
        if ($standarId && $standarId !== $peraturan->unique_id) {
            $exists = Peraturan::where('unique_id', $standarId)->where('id', '!=', $peraturan->id)->first();
            if (!$exists) {
                $peraturan->unique_id = $standarId;
            }
        }
        $peraturan->save();

        // 2. Update Pembukaan
        $pembukaanData = $data['pembukaan'] ?? [];
        $menimbang = $pembukaanData['menimbang'] ?? '';
        $mengingat = $pembukaanData['mengingat'] ?? '';
        $memutuskan = $pembukaanData['memutuskan'] ?? '';
        
        $pembukaanText = '';
        if ($menimbang) $pembukaanText .= "Menimbang :\n$menimbang\n";
        if ($mengingat) $pembukaanText .= "Mengingat :\n$mengingat\n";
        if ($memutuskan) $pembukaanText .= "Memutuskan :\n$memutuskan\n";
        $pembukaanText = trim($pembukaanText);

        if ($isImport) {
            // Hapus yang lama dari proses import sebelumnya
            Pasal::where('peraturan_id', $peraturan->id)->delete();
            StrukturDokumen::where('peraturan_id', $peraturan->id)->delete();
            PenjelasanPasal::where('peraturan_id', $peraturan->id)->delete();

            $urutanStruktur = 1;
            $urutanPasal = 1;
            
            if ($pembukaanText) {
                StrukturDokumen::create([
                    'peraturan_id' => $peraturan->id,
                    'tipe_struktur' => 'PEMBUKAAN',
                    'judul_struktur' => $pembukaanText,
                    'urutan' => $urutanStruktur++
                ]);
            }

            $babList = $data['babList'] ?? [];
            foreach ($babList as $babData) {
                $babId = null;
                if ($babData['id'] !== 'bab_default') {
                    $judulStruktur = $babData['judul'] ?? '';
                    $label = '';
                    if (preg_match('/^(BAB\s+[IVXLCDM]+)\s+(.*)$/i', $judulStruktur, $m)) {
                        $label = $m[1];
                        $judulStruktur = $m[2];
                    } else {
                        $label = $judulStruktur;
                        $judulStruktur = '';
                    }

                    $bab = StrukturDokumen::create([
                        'peraturan_id' => $peraturan->id,
                        'tipe_struktur' => 'BAB',
                        'label' => $label,
                        'judul_struktur' => $judulStruktur,
                        'urutan' => $urutanStruktur++
                    ]);
                    $babId = $bab->id;
                }

                foreach ($babData['pasalList'] as $pasalData) {
                    $nomor_pasal = str_replace('Pasal ', '', $pasalData['nomor'] ?? '');
                    if (is_numeric($nomor_pasal)) {
                        $nomor_pasal = (int) $nomor_pasal;
                    } else {
                        $nomor_pasal = 0; 
                    }

                    $pasal = Pasal::create([
                        'peraturan_id' => $peraturan->id,
                        'struktur_dokumen_id' => $babId,
                        'nomor_pasal' => $nomor_pasal,
                        'isi_pasal' => $pasalData['isi'] ?? '',
                        'urutan' => $urutanPasal++
                    ]);

                    $penjelasanText = trim($pasalData['penjelasan'] ?? '');
                    if ($penjelasanText) {
                        PenjelasanPasal::create([
                            'peraturan_id' => $peraturan->id,
                            'pasal_id' => $pasal->id,
                            'isi_penjelasan' => $penjelasanText
                        ]);
                    }
                }
            }
        } else {
            // Normal update for existing documents
            $pembukaan = StrukturDokumen::where('peraturan_id', $peraturan->id)
                ->where('tipe_struktur', 'PEMBUKAAN')
                ->first();
                
            if ($pembukaan) {
                if ($pembukaanText) {
                    $pembukaan->judul_struktur = $pembukaanText;
                    $pembukaan->save();
                } else {
                    $pembukaan->delete();
                }
            } else if ($pembukaanText) {
                StrukturDokumen::create([
                    'peraturan_id' => $peraturan->id,
                    'tipe_struktur' => 'PEMBUKAAN',
                    'judul_struktur' => $pembukaanText,
                ]);
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
        // Tingkatkan batas waktu eksekusi agar tidak timeout jika jumlah file MinIO sangat banyak
        set_time_limit(300); // 5 menit

        try {
            // Karena MinIO/S3 adalah Object Storage (bukan folder nyata), allDirectories() seringkali kosong.
            // Solusi terbaik: Ambil semua file, lalu saring file yang bernama 'ocr.json'
            $allFiles = \Illuminate\Support\Facades\Storage::disk('minio')->allFiles('documents');
            
            $pendingImports = [];
            
            // Collect existing PDF paths to check against (kalau sudah masuk ke DB)
            $existingPaths = Peraturan::whereNotNull('file_pdf_path')->pluck('file_pdf_path')->toArray();
            
            foreach ($allFiles as $file) {
                // Hapus slash di awal jika ada
                $file = ltrim($file, '/');
                
                // Jika file ini adalah ocr.json, berarti foldernya siap di-import
                if (str_ends_with(strtolower($file), '/ocr.json')) {
                    $dir = dirname($file); // misal: documents/uu/undang-undang-1-2024
                    $expectedPdfPath = $dir . '/document.pdf';
                    
                    // Jika PDF path ini belum ada di database
                    if (!in_array($expectedPdfPath, $existingPaths)) {
                        // Deteksi kategori dari path (misal: documents/uu/undang-undang-1-2024)
                        $parts = explode('/', $dir);
                        $kategoriRaw = $parts[1] ?? 'unknown'; // Ambil 'uu'
                        
                        $kategori = 'Lainnya';
                        if ($kategoriRaw === 'uu' || str_contains(strtolower($dir), 'undang-undang')) {
                            $kategori = 'Undang-Undang';
                        }
                        
                        $pendingImports[] = [
                            'folder_path' => $dir,
                            'nama_file' => basename($dir),
                            'kategori' => $kategori
                        ];
                    }
                }
            }
            
            return response()->json([
                'success' => true,
                'data' => array_values($pendingImports)
            ]);
        } catch (\Exception $e) {
            \Log::error("MinIO Scan Error: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal memindai MinIO: ' . $e->getMessage()
            ], 500);
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
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

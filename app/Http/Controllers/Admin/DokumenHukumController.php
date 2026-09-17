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
            ->pluck('nama');

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

        foreach ($request->input('files') as $fileData) {
            try {
                if (isset($fileData['parsedData'])) {
                    $importService->import($fileData['parsedData']);
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
                    $pasalList[] = [
                        'id' => (string)$pasal->id,
                        'nomor' => $pasal->nomor_pasal,
                        'isi' => $pasal->isi_pasal ?? '',
                        'penjelasan' => '' // Get from PenjelasanPasal if needed
                    ];
                }

                $babList[] = [
                    'id' => (string)$bab->id,
                    'judul' => $bab->label . ' ' . $bab->judul_struktur,
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
                $pasalList[] = [
                    'id' => (string)$pasal->id,
                    'nomor' => $pasal->nomor_pasal,
                    'isi' => $pasal->isi_pasal ?? '',
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

        $data = [
            'standarId' => $peraturan->unique_id,
            'judul' => $peraturan->judul,
            'pembukaan' => [
                'judul' => $peraturan->judul,
                'menimbang' => $menimbang,
                'mengingat' => $mengingat,
                'memutuskan' => $memutuskan,
            ],
            'babList' => $babList,
            'riwayatPerubahan' => [],
            'metadata' => [
                'pemrakarsa' => $peraturan->instansi ?? '',
                'tanggalDitetapkan' => $peraturan->tanggal_penetapan ? $peraturan->tanggal_penetapan->format('Y-m-d') : '',
                'tempatPenetapan' => $peraturan->tempat_penetapan ?? '',
            ]
        ];

        return response()->json($data);
    }
}

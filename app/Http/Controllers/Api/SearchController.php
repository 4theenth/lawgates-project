<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Peraturan;
use App\Services\SearchIntentService;
use App\Services\SemanticSearchService;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function __construct(
        protected SemanticSearchService $semanticService,
        protected SearchIntentService $intentService
    ) {}

    public function search(Request $request)
    {
        // Tarik relasi agar nama jenis & status bisa ditampilkan di hasil React (hanya peraturan sah)
        $query = Peraturan::available()->with(['jenisPeraturan', 'statusPeraturan']);

        $likeOp = DB::getDriverName() === 'pgsql' ? 'ilike' : 'like';

        $rawKeyword = $request->input('keyword') ?? $request->input('q') ?? $request->input('search');
        $keyword = trim((string) $rawKeyword);
        $sort = $request->get('sort', '');
        $semanticMatches = collect();
        $intent = $this->intentService->analyze($keyword);

        // Ambil parameter filter lebih awal agar pencarian semantik AI menyaring kandidat secara relevan
        $kategoriParam = $request->input('kategori_id') ?? $request->input('kategori');
        $tahunParam = $request->input('tahun') ?? $request->input('year');
        $statusParam = $request->input('status_id') ?? $request->input('status');

        $activeFilters = [];
        if (!empty($kategoriParam)) {
            $activeFilters['kategori_ids'] = is_array($kategoriParam) ? $kategoriParam : explode(',', (string) $kategoriParam);
        }
        if (!empty($tahunParam)) {
            $activeFilters['tahun'] = (string) $tahunParam;
        }
        if (!empty($statusParam)) {
            $activeFilters['status_ids'] = is_array($statusParam) ? $statusParam : explode(',', (string) $statusParam);
        }

        // 1. Filter Keyword Berdasarkan Intent (Metadata vs Semantic vs Hybrid)
        if ($keyword !== '') {
            $synonyms = $intent['synonyms'] ?? [];

            // Jika mode Semantic atau Hybrid, jalankan pencarian vektor AI dengan filter yang aktif.
            // Menggunakan Jalur B (Asymmetric Instruction + Grounded Term Verification):
            // Threshold diatur ke 0.45 dengan guard verifikasi istilah substantif pada teks pasal/judul peraturan,
            // sehingga pertanyaan percakapan/awam terjawab akurat dan anomali/false-positive tereliminasi.
            if (($intent['mode'] === 'semantic' || $intent['mode'] === 'hybrid') && ($sort === 'relevansi' || $sort === '')) {
                $semanticQueryText = $intent['semantic_query'] ?? $keyword;
                $semanticFilters = $activeFilters;
                if (!empty($intent['detected_category_id']) && empty($semanticFilters['kategori_ids'])) {
                    $semanticFilters['kategori_ids'] = [$intent['detected_category_id']];
                }
                $synonymsMap = $intent['synonyms_map'] ?? [];
                $semanticMatches = $this->semanticService->searchRelevantPasal($semanticQueryText, 0.58, 50, $semanticFilters, $synonyms, $synonymsMap);

                // Jika kueri menyebutkan pasal spesifik (misal: "pasal 156 uu cipta kerja"), cari pasal langsung dari database
                if (!empty($intent['detected_pasal']) && $intent['mode'] === 'hybrid') {
                    $targetPasalNum = preg_replace('/[^0-9a-zA-Z]/', '', $intent['detected_pasal']);
                    $directPasals = \App\Models\Pasal::where(function ($q) use ($targetPasalNum, $likeOp) {
                        $q->where('nomor_pasal', $targetPasalNum)
                          ->orWhere('nomor_pasal', $likeOp, 'Pasal ' . $targetPasalNum . '%')
                          ->orWhere('nomor_pasal', $likeOp, '%' . $targetPasalNum . '%');
                    })->limit(10)->get();

                    foreach ($directPasals as $dp) {
                        if (!$semanticMatches->has($dp->peraturan_id)) {
                            $semanticMatches->put($dp->peraturan_id, [
                                'pasal_id' => $dp->id,
                                'nomor_pasal' => (string) $dp->nomor_pasal,
                                'cuplikan' => mb_substr((string) $dp->isi_pasal, 0, 200),
                                'similarity' => 0.95,
                                'secondary_pasal' => [],
                            ]);
                        }
                    }
                }
            }

            $semanticIds = $semanticMatches->keys()->toArray();

            // Normalisasi singkatan umum
            $replacements = [
                '/\buud\b/i' => 'undang%undang%dasar',
                '/\buu\b/i' => 'undang%undang',
                '/\bno\.?\b/i' => 'nomor',
                '/\bperppu\b/i' => 'peraturan%pemerintah%pengganti%undang%undang',
                '/\bpp\b/i' => 'peraturan%pemerintah',
                '/\bperpres\b/i' => 'peraturan%presiden',
                '/\bpermen\b/i' => 'peraturan%menteri',
                '/\bpermendagri\b/i' => 'peraturan%menteri%dalam%negeri',
                '/[\s\-]+/' => '%' // ubah spasi atau strip menjadi wildcard %
            ];

            $smartKeyword = preg_replace(array_keys($replacements), array_values($replacements), $keyword);

            $query->where(function ($sub) use ($keyword, $smartKeyword, $likeOp, $semanticIds, $intent, $synonyms) {
                if ($intent['mode'] === 'semantic') {
                    // Mode Semantic murni (Tier 2): Hasil WAJIB berasal dari analisis makna vektor AI & pasal terverifikasi.
                    // Jika AI menemukan pasal relevan, filter eksklusif pada ID peraturan tersebut.
                    // Jika tidak ada hasil relevan (anomali / di luar korpus), kembalikan himpunan kosong dan DILARANG
                    // fallback ke pencarian judul acak agar tidak memunculkan kartu hantu (ghost card) tanpa pasal.
                    if (!empty($semanticIds)) {
                        $sub->whereIn('id', $semanticIds);
                    } else {
                        $sub->whereRaw('1 = 0');
                    }
                } elseif ($intent['mode'] === 'hybrid') {
                    // Mode Hybrid (Tier 3 - kombinasi jenis/nomor regulasi + topik atau "peraturan mengenai xx"):
                    // Gabungkan hasil semantic AI dan pencarian dokumen leksikal yang cocok
                    if (!empty($semanticIds)) {
                        $sub->whereIn('id', $semanticIds);
                    }

                    if (!empty($intent['detected_number'])) {
                        $sub->orWhere(function ($numSub) use ($intent, $likeOp) {
                            if (!empty($intent['detected_category_id'])) {
                                $numSub->where('jenis_peraturan_id', $intent['detected_category_id']);
                            }
                            $numSub->where(function ($inner) use ($intent, $likeOp) {
                                $inner->where('nomor', $intent['detected_number'])
                                       ->orWhere('nomor', $likeOp, '%' . $intent['detected_number'] . '%');
                            });

                            if (!empty($intent['detected_year'])) {
                                $numSub->where('tahun', $intent['detected_year']);
                            }
                        });
                    }

                    $sub->orWhere(function ($textSub) use ($keyword, $smartKeyword, $likeOp, $synonyms, $intent) {
                        $cleanTopic = $intent['semantic_query'] ?? $keyword;
                        $statuteTitle = $intent['statute_title'] ?? null;

                        if (!empty($intent['detected_category_id'])) {
                            $textSub->where('jenis_peraturan_id', $intent['detected_category_id']);
                        }

                        $textSub->where(function ($inner) use ($keyword, $cleanTopic, $statuteTitle, $smartKeyword, $likeOp, $synonyms) {
                            $inner->where('judul', $likeOp, '%' . $keyword . '%')
                                ->orWhere('judul', $likeOp, '%' . $cleanTopic . '%')
                                ->orWhere('nomor', $likeOp, '%' . $keyword . '%');

                            if (!empty($statuteTitle)) {
                                $titleKeywords = array_filter(preg_split('/\s+/', preg_replace('/[^\p{L}\p{N}]+/u', ' ', mb_strtolower($statuteTitle))));
                                if (!empty($titleKeywords)) {
                                    $inner->orWhere('judul', $likeOp, '%' . implode('%', $titleKeywords) . '%');
                                }
                            }

                            if ($smartKeyword !== $keyword && $smartKeyword !== '%') {
                                $inner->orWhere('judul', $likeOp, '%' . $smartKeyword . '%')
                                    ->orWhere('nomor', $likeOp, '%' . $smartKeyword . '%');
                            }

                            foreach (array_slice($synonyms, 0, 3) as $syn) {
                                $inner->orWhere('judul', $likeOp, '%' . $syn . '%');
                            }
                        });
                    });
                } else {
                    // Mode Metadata (Tier 1 - Pencarian Kategori, Nomor, Tahun, atau Judul Dokumen Populer):
                    if (!empty($intent['detected_category_id']) && empty($intent['detected_number']) && empty($intent['detected_year']) && empty($intent['statute_title'])) {
                        // Kueri kategori tunggal murni (misal user hanya mengetik "Perpres", "POJK", "Undang-Undang")
                        $sub->where('jenis_peraturan_id', $intent['detected_category_id']);
                    } elseif (!empty($intent['detected_number'])) {
                        $sub->where(function ($numSub) use ($intent, $likeOp) {
                            if (!empty($intent['detected_category_id'])) {
                                $numSub->where('jenis_peraturan_id', $intent['detected_category_id']);
                            }
                            $numSub->where(function ($inner) use ($intent, $likeOp) {
                                $inner->where('nomor', $intent['detected_number'])
                                       ->orWhere('nomor', $likeOp, '%' . $intent['detected_number'] . '%');
                            });

                            if (!empty($intent['detected_year'])) {
                                $numSub->where('tahun', $intent['detected_year']);
                            }
                        });
                    } else {
                        // Pencarian Judul Regulasi Populer / Kata Kunci Metadata
                        $targetTitle = !empty($intent['statute_title']) ? $intent['statute_title'] : (!empty($intent['clean_keyword']) ? $intent['clean_keyword'] : $keyword);
                        $titleKeywords = array_filter(preg_split('/\s+/', preg_replace('/[^\p{L}\p{N}]+/u', ' ', mb_strtolower($targetTitle))));
                        $titleWildcard = !empty($titleKeywords) ? '%' . implode('%', $titleKeywords) . '%' : '%' . $targetTitle . '%';

                        $sub->where(function ($textSub) use ($targetTitle, $titleWildcard, $smartKeyword, $likeOp, $synonyms, $intent) {
                            if (!empty($intent['detected_category_id'])) {
                                $textSub->where('jenis_peraturan_id', $intent['detected_category_id']);
                            }
                            $textSub->where(function ($tSub) use ($targetTitle, $titleWildcard, $smartKeyword, $likeOp, $synonyms) {
                                $tSub->where('judul', $likeOp, '%' . $targetTitle . '%')
                                    ->orWhere('judul', $likeOp, $titleWildcard)
                                    ->orWhere('nomor', $likeOp, '%' . $targetTitle . '%')
                                    ->orWhere('instansi', $likeOp, '%' . $targetTitle . '%')
                                    ->orWhere('lokasi_daerah', $likeOp, '%' . $targetTitle . '%')
                                    ->orWhere('tempat_penetapan', $likeOp, '%' . $targetTitle . '%');

                                if ($smartKeyword !== $targetTitle && $smartKeyword !== '%') {
                                    $tSub->orWhere('judul', $likeOp, '%' . $smartKeyword . '%')
                                        ->orWhere('nomor', $likeOp, '%' . $smartKeyword . '%')
                                        ->orWhere('instansi', $likeOp, '%' . $smartKeyword . '%')
                                        ->orWhere('lokasi_daerah', $likeOp, '%' . $smartKeyword . '%');
                                }

                                foreach (array_slice($synonyms, 0, 3) as $syn) {
                                    $tSub->orWhere('judul', $likeOp, '%' . $syn . '%');
                                }
                            });
                        });
                    }
                }
            });
        }

        // 2. Filter Kategori
        $kategoriParam = $request->input('kategori_id') ?? $request->input('kategori');
        $query->when(!empty($kategoriParam), function ($q) use ($kategoriParam) {
            $ids = is_array($kategoriParam) ? $kategoriParam : explode(',', (string) $kategoriParam);
            $q->whereIn('jenis_peraturan_id', $ids);
        });

        // 3. Filter Tahun (Mendukung tahun tunggal atau rentang seperti 2020-2026)
        $tahunParam = $request->input('tahun') ?? $request->input('year');
        $query->when(!empty($tahunParam), function ($q) use ($tahunParam) {
            $tahun = trim((string) $tahunParam);
            if (str_contains($tahun, '-')) {
                $parts = array_map('trim', explode('-', $tahun));
                $start = (int) ($parts[0] ?? 0);
                $end = (int) ($parts[1] ?? 0);
                if ($start > 0 && $end > 0) {
                    $q->whereBetween('tahun', [min($start, $end), max($start, $end)]);
                } elseif ($start > 0) {
                    $q->where('tahun', '>=', $start);
                } elseif ($end > 0) {
                    $q->where('tahun', '<=', $end);
                }
            } else {
                $q->where('tahun', $tahun);
            }
        });

        // 4. Filter Status
        $statusParam = $request->input('status_id') ?? $request->input('status');
        $query->when(!empty($statusParam), function ($q) use ($statusParam) {
            $ids = is_array($statusParam) ? $statusParam : explode(',', (string) $statusParam);
            $q->whereIn('status_id', $ids);
        });

        // 5. Filter Lokasi Daerah (Mendukung Provinsi & Kabupaten/Kota)
        $query->when($request->filled('lokasi_daerah'), function ($q) use ($request, $likeOp) {
            $lokasiList = is_array($request->lokasi_daerah)
                ? $request->lokasi_daerah
                : explode(',', $request->lokasi_daerah);

            $q->where(function ($subQ) use ($lokasiList, $likeOp) {
                foreach ($lokasiList as $item) {
                    $trimmed = trim($item);
                    if ($trimmed === '') continue;

                    // Hilangkan prefix umum (misal: "Pemerintah Provinsi", "Pemerintah Kabupaten", "Kabupaten", "Kota")
                    $clean = preg_replace('/^(pemerintah\s+provinsi|pemerintah\s+kabupaten|pemerintah\s+kota|pemerintah\s+daerah|kabupaten|kota)\s+/i', '', $trimmed);
                    $clean = trim($clean);

                    $snake = str_replace(' ', '_', strtolower($trimmed));
                    $cleanSnake = str_replace(' ', '_', strtolower($clean));

                    $subQ->orWhere('instansi', $likeOp, '%' . $trimmed . '%')
                         ->orWhere('instansi', $likeOp, '%' . $clean . '%')
                         ->orWhere('instansi', $likeOp, '%' . $snake . '%')
                         ->orWhere('instansi', $likeOp, '%' . $cleanSnake . '%')
                         ->orWhere('lokasi_daerah', $likeOp, '%' . $trimmed . '%')
                         ->orWhere('lokasi_daerah', $likeOp, '%' . $clean . '%')
                         ->orWhere('lokasi_daerah', $likeOp, '%' . $snake . '%')
                         ->orWhere('lokasi_daerah', $likeOp, '%' . $cleanSnake . '%')
                         ->orWhere('tempat_penetapan', $likeOp, '%' . $clean . '%')
                         ->orWhere('judul', $likeOp, '%' . $clean . '%');
                }
            });
        });

        // 5.5. Filter Subjek
        $query->when($request->filled('subjek'), function ($q) use ($request, $likeOp) {
            $subjekList = is_array($request->subjek) ? $request->subjek : explode(',', $request->subjek);
            $q->where(function ($subQ) use ($subjekList, $likeOp) {
                foreach ($subjekList as $subjekItem) {
                    $subQ->orWhere('subjek', $likeOp, '%' . trim($subjekItem) . '%');
                }
            });
        });

        // 6. Sorting
        $sort = $request->get('sort', '');
        if ($sort === 'terbaru') {
            $query->orderBy('tahun', 'desc')->orderBy('id', 'desc');
        } elseif ($sort === 'terlama') {
            $query->orderBy('tahun', 'asc')->orderBy('id', 'asc');
        } else {
            // Default / Relevansi: Prioritaskan hasil dengan skor semantik tertinggi
            if ($semanticMatches->isNotEmpty()) {
                $idOrder = implode(',', $semanticMatches->keys()->toArray());
                if (DB::getDriverName() === 'pgsql') {
                    $query->orderByRaw("CASE WHEN id IN ({$idOrder}) THEN 0 ELSE 1 END")
                        ->orderByRaw("array_position(ARRAY[{$idOrder}]::bigint[], id)");
                } else {
                    $query->orderByRaw("CASE WHEN id IN ({$idOrder}) THEN 0 ELSE 1 END");
                }
            } elseif ($keyword !== '') {
                if ($intent['mode'] === 'metadata' && !empty($intent['detected_number'])) {
                    $exactNum = preg_replace('/[^0-9a-zA-Z]/', '', $intent['detected_number']);
                    $query->orderByRaw("CASE WHEN nomor = '{$exactNum}' THEN 0 WHEN nomor {$likeOp} '{$exactNum}' THEN 1 ELSE 2 END ASC");
                } else {
                    $escapedKeyword = str_replace("'", "''", $keyword);
                    $query->orderByRaw("
                        CASE 
                            WHEN instansi {$likeOp} '%{$escapedKeyword}%' OR lokasi_daerah {$likeOp} '%{$escapedKeyword}%' THEN 0
                            WHEN judul {$likeOp} '%{$escapedKeyword}%' THEN 1
                            ELSE 2
                        END ASC
                    ");
                }
            }
            $query->orderBy('updated_at', 'desc')->orderBy('created_at', 'desc');
        }

        // Batasi per_page seperti PeraturanController: nilai <=0 atau tak terbatas
        // akan menghasilkan metadata pagination cacat (per_page negatif) atau dump seluruh tabel.
        $perPage = max(1, min(100, (int) $request->get('per_page', 10)));
        $paginator = $query->paginate($perPage);

        // Tempelkan metadata pasal paling relevan (nomor_pasal, cuplikan, similarity) ke setiap card peraturan
        if ($semanticMatches->isNotEmpty()) {
            $paginator->getCollection()->transform(function ($item) use ($semanticMatches) {
                if ($semanticMatches->has($item->id)) {
                    $item->relevant_pasal = $semanticMatches->get($item->id);
                }

                return $item;
            });
        }

        $responseData = $paginator->toArray();
        $responseData['search_mode'] = $intent['mode'];
        $responseData['search_mode_label'] = $intent['label'];
        $responseData['synonyms'] = $intent['synonyms'] ?? [];
        $responseData['glosarium_hint'] = $intent['glosarium_hint'] ?? null;

        return response()->json($responseData);
    }
}
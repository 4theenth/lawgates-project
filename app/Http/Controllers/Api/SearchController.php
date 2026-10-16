<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use App\Services\SemanticSearchService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function __construct(
        protected SemanticSearchService $semanticService
    ) {}

    public function search(Request $request)
    {
        // Tarik relasi agar nama jenis & status bisa ditampilkan di hasil React (hanya peraturan sah)
        $query = Peraturan::available()->with(['jenisPeraturan', 'statusPeraturan']);

        $semanticMatches = collect();
        $lexicalPasalMatches = collect();
        $isRelevanceSort = $request->get('sort', 'relevansi') === 'relevansi';
        $likeOp = DB::getDriverName() === 'pgsql' ? 'ilike' : 'like';

        $rawKeyword = $request->input('keyword') ?? $request->input('q') ?? $request->input('search');
        $keyword = trim((string) $rawKeyword);

        // 1. Filter Keyword & Semantic Search
        if ($keyword !== '') {

            // Jika sort adalah relevansi (default), jalankan Semantic Search via Gemini
            if ($isRelevanceSort) {
                $semanticMatches = $this->semanticService->searchRelevantPasal($keyword);
            }

            $semanticIds = $semanticMatches->keys()->toArray();

            // Ekstrak token kata penting (membuang stopword umum bahasa Indonesia & regulasi)
            $stopwords = [
                'dan', 'atau', 'yang', 'di', 'ke', 'dari', 'tentang', 'pada', 'untuk', 'oleh',
                'atas', 'dengan', 'aturan', 'pedoman', 'terkait', 'mengenai', 'soal', 'hal',
                'adalah', 'yaitu', 'sebagai', 'dalam', 'ini', 'itu', 'apakah', 'bagaimana',
            ];
            $rawTokens = preg_split('/[\s\-_,\.]+/', strtolower($keyword));
            $tokens = array_values(array_filter($rawTokens, function ($t) use ($stopwords) {
                return mb_strlen($t) >= 3 && ! in_array($t, $stopwords);
            }));

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
                '/[\s\-]+/' => '%',
            ];
            $smartKeyword = preg_replace(array_keys($replacements), array_values($replacements), $keyword);

            // Jika semantic search offline atau kuota habis, cari pasal-pasal yang relevan secara leksikal
            if (empty($semanticIds) && ! empty($tokens)) {
                // Perluas token dengan bentuk kata kunci hukum umum (misal: wewenang -> wenang untuk mencakup berwenang & kewenangan)
                $searchTokens = array_map(function ($t) {
                    if ($t === 'wewenang') {
                        return 'wenang';
                    }
                    if ($t === 'kepolisian') {
                        return 'polisi';
                    }

                    return $t;
                }, $tokens);

                $pasalCandidates = \App\Models\Pasal::where(function ($pq) use ($searchTokens, $likeOp) {
                    foreach ($searchTokens as $token) {
                        $pq->orWhere('isi_pasal', $likeOp, '%'.$token.'%');
                    }
                })->get();

                $grouped = [];
                foreach ($pasalCandidates as $p) {
                    $score = 0;
                    $isi = strtolower($p->isi_pasal);
                    foreach ($searchTokens as $t) {
                        if (str_contains($isi, $t)) {
                            // Beri bobot lebih tinggi untuk istilah entitas/subjek spesifik (misal: polisi, aparat)
                            $weight = in_array($t, ['polisi', 'aparat']) ? 3 : 1;
                            $score += $weight;
                        }
                    }
                    if ($score > 0) {
                        $pid = $p->peraturan_id;
                        if (! isset($grouped[$pid]) || $score > $grouped[$pid]['score']) {
                            $grouped[$pid] = [
                                'pasal_id' => $p->id,
                                'nomor_pasal' => $p->nomor_pasal,
                                'cuplikan' => trim(mb_substr(preg_replace('/\s+/', ' ', $p->isi_pasal), 0, 180)),
                                'similarity' => 0.0,
                                'score' => $score,
                            ];
                        }
                    }
                }

                uasort($grouped, fn ($a, $b) => $b['score'] <=> $a['score']);
                $lexicalPasalMatches = collect($grouped);
            }

            $query->where(function ($sub) use ($keyword, $smartKeyword, $semanticIds, $lexicalPasalMatches, $tokens, $likeOp) {
                // 1. Hasil Semantic AI (jika tersedia)
                if (! empty($semanticIds)) {
                    $sub->whereIn('id', $semanticIds);
                }

                // 2. Fallback pencocokan pasal berbasis token kata kunci (jika semantic tidak ada)
                if (empty($semanticIds) && $lexicalPasalMatches->isNotEmpty()) {
                    $sub->orWhereIn('id', $lexicalPasalMatches->keys()->toArray());
                }

                // 3. Pencarian eksak & token pada judul, nomor, instansi, atau lokasi
                $sub->orWhere(function ($keywordSub) use ($keyword, $smartKeyword, $tokens, $likeOp) {
                    $keywordSub->where('judul', $likeOp, '%'.$keyword.'%')
                        ->orWhere('nomor', $likeOp, '%'.$keyword.'%')
                        ->orWhere('instansi', $likeOp, '%'.$keyword.'%')
                        ->orWhere('lokasi_daerah', $likeOp, '%'.$keyword.'%')
                        ->orWhere('tempat_penetapan', $likeOp, '%'.$keyword.'%');

                    if ($smartKeyword !== $keyword && $smartKeyword !== '%') {
                        $keywordSub->orWhere('judul', $likeOp, '%'.$smartKeyword.'%')
                            ->orWhere('nomor', $likeOp, '%'.$smartKeyword.'%')
                            ->orWhere('instansi', $likeOp, '%'.$smartKeyword.'%')
                            ->orWhere('lokasi_daerah', $likeOp, '%'.$smartKeyword.'%');
                    }

                    if (! empty($tokens)) {
                        $keywordSub->orWhere(function ($tq) use ($tokens, $likeOp) {
                            foreach ($tokens as $token) {
                                $tq->orWhere('judul', $likeOp, '%'.$token.'%')
                                    ->orWhere('subjek', $likeOp, '%'.$token.'%')
                                    ->orWhere('instansi', $likeOp, '%'.$token.'%')
                                    ->orWhere('lokasi_daerah', $likeOp, '%'.$token.'%');
                            }
                        });
                    }
                });
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

        // 5. Filter Lokasi Daerah (Mendukung Provinsi & Kabupaten)
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
                    $subQ->orWhere('subjek', $likeOp, '%'.trim($subjekItem).'%');
                }
            });
        });

        // 6. Sorting
        $sort = $request->get('sort', 'relevansi');
        if ($sort === 'terbaru') {
            $query->orderBy('tahun', 'desc');
        } elseif ($sort === 'terlama') {
            $query->orderBy('tahun', 'asc');
        } else {
            // Urutan Relevansi:
            // 1. Jika ada pencarian kata kunci, prioritaskan yang instansi / lokasi / judulnya langsung cocok
            if ($keyword !== '') {
                $escapedKeyword = str_replace("'", "''", $keyword);
                $query->orderByRaw("
                    CASE 
                        WHEN instansi {$likeOp} '%{$escapedKeyword}%' OR lokasi_daerah {$likeOp} '%{$escapedKeyword}%' THEN 0
                        WHEN judul {$likeOp} '%{$escapedKeyword}%' THEN 1
                        ELSE 2
                    END ASC
                ");
            }

            // 2. Prioritaskan peraturan yang memiliki skor semantik atau leksikal tertinggi
            $activeMatches = $semanticMatches->isNotEmpty() ? $semanticMatches : $lexicalPasalMatches;

            if ($activeMatches->isNotEmpty()) {
                $idOrder = implode(',', $activeMatches->keys()->toArray());
                if (DB::getDriverName() === 'pgsql') {
                    $query->orderByRaw("CASE WHEN id IN ({$idOrder}) THEN 0 ELSE 1 END")
                        ->orderByRaw("array_position(ARRAY[{$idOrder}]::bigint[], id)");
                } else {
                    $query->orderByRaw("CASE WHEN id IN ({$idOrder}) THEN 0 ELSE 1 END");
                }
            }

            $query->orderBy('created_at', 'desc');
        }

        // Kembalikan hasil dengan pagination dinamis
        $perPage = (int) $request->get('per_page', 10);
        $paginator = $query->paginate($perPage);

        // Tempelkan data pasal paling relevan (baik dari AI semantic maupun fallback pencocokan pasal)
        $activeMatches = $semanticMatches->isNotEmpty() ? $semanticMatches : $lexicalPasalMatches;
        if ($activeMatches->isNotEmpty()) {
            $paginator->getCollection()->transform(function ($item) use ($activeMatches) {
                if ($activeMatches->has($item->id)) {
                    $item->relevant_pasal = $activeMatches->get($item->id);
                }

                return $item;
            });
        }

        return response()->json($paginator);
    }
}

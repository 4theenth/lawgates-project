<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Peraturan;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Tarik relasi agar nama jenis & status bisa ditampilkan di hasil React (hanya peraturan sah)
        $query = Peraturan::available()->with(['jenisPeraturan', 'statusPeraturan']);

        $likeOp = DB::getDriverName() === 'pgsql' ? 'ilike' : 'like';

        $rawKeyword = $request->input('keyword') ?? $request->input('q') ?? $request->input('search');
        $keyword = trim((string) $rawKeyword);

        // 1. Filter Keyword (Judul, Nomor, Instansi, atau Lokasi Daerah)
        if ($keyword !== '') {
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

            $query->where(function ($sub) use ($keyword, $smartKeyword, $likeOp) {
                $sub->where('judul', $likeOp, '%' . $keyword . '%')
                    ->orWhere('nomor', $likeOp, '%' . $keyword . '%')
                    ->orWhere('instansi', $likeOp, '%' . $keyword . '%')
                    ->orWhere('lokasi_daerah', $likeOp, '%' . $keyword . '%')
                    ->orWhere('tempat_penetapan', $likeOp, '%' . $keyword . '%');

                if ($smartKeyword !== $keyword && $smartKeyword !== '%') {
                    $sub->orWhere('judul', $likeOp, '%' . $smartKeyword . '%')
                        ->orWhere('nomor', $likeOp, '%' . $smartKeyword . '%')
                        ->orWhere('instansi', $likeOp, '%' . $smartKeyword . '%')
                        ->orWhere('lokasi_daerah', $likeOp, '%' . $smartKeyword . '%');
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
        $sort = $request->get('sort', 'relevansi');
        if ($sort === 'terbaru') {
            $query->orderBy('tahun', 'desc');
        } elseif ($sort === 'terlama') {
            $query->orderBy('tahun', 'asc');
        } else {
            // Urutan Relevansi:
            // Jika ada pencarian kata kunci, prioritaskan yang instansi / lokasi / judulnya langsung cocok
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
            $query->orderBy('created_at', 'desc');
        }

        // Kembalikan hasil dengan pagination dinamis
        $perPage = (int) $request->get('per_page', 10);
        return response()->json($query->paginate($perPage));
    }
}
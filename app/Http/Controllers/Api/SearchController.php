<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Peraturan;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Tarik relasi agar nama jenis & status bisa ditampilkan di hasil React
        $query = Peraturan::with(['jenisPeraturan', 'statusPeraturan']);

        // 1. Filter Keyword (Judul atau Nomor)
        $query->when($request->filled('keyword'), function ($q) use ($request) {
            $keyword = trim($request->keyword);
            
            // Buat keyword "pintar" yang menormalkan singkatan umum
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

            $q->where(function($sub) use ($keyword, $smartKeyword) {
                // Gunakan 'ilike' jika pakai PostgreSQL agar case-insensitive
                $sub->where('judul', 'ilike', '%' . $keyword . '%')
                    ->orWhere('nomor', 'ilike', '%' . $keyword . '%');
                
                // Tambahkan pencarian menggunakan smartKeyword jika berbeda
                if ($smartKeyword !== $keyword && $smartKeyword !== '%') {
                    $sub->orWhere('judul', 'ilike', '%' . $smartKeyword . '%')
                        ->orWhere('nomor', 'ilike', '%' . $smartKeyword . '%');
                }
            });
        });

        // 2. Filter Kategori
        $query->when($request->filled('kategori_id'), function ($q) use ($request) {
            $ids = explode(',', $request->kategori_id);
            $q->whereIn('jenis_peraturan_id', $ids);
        });

        // 3. Filter Tahun (Mendukung tahun tunggal atau rentang seperti 2020-2026)
        $query->when($request->filled('tahun'), function ($q) use ($request) {
            $tahun = trim((string) $request->tahun);
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
        $query->when($request->filled('status_id'), function ($q) use ($request) {
            $ids = explode(',', $request->status_id);
            $q->whereIn('status_id', $ids);
        });

        // 5. Sorting
        $sort = $request->get('sort', 'relevansi');
        if ($sort === 'terbaru') {
            $query->orderBy('tahun', 'desc');
        } elseif ($sort === 'terlama') {
            $query->orderBy('tahun', 'asc');
        } else {
            // Default relevansi (bisa disesuaikan dengan logic relevansi sesungguhnya)
            $query->orderBy('created_at', 'desc');
        }

        // Kembalikan hasil dengan pagination dinamis
        $perPage = $request->get('per_page', 10);
        return response()->json($query->paginate($perPage));
    }
}
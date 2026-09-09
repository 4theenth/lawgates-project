<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $keyword = $request->query('q');
        
        // Tangkap parameter baru dari dropdown UI
        $kategori = $request->query('kategori'); // Menerima ID jenis_peraturan
        $status = $request->query('status');     // Menerima ID status_peraturan
        $tahun = $request->query('tahun');       // Menerima spesifik "2024" atau range "2020-2026"

        $query = Peraturan::with(['jenisPeraturan', 'statusPeraturan']);

        // 1. Pencarian Teks
        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('judul', 'ILIKE', '%' . $keyword . '%')
                  ->orWhere('nomor', 'ILIKE', '%' . $keyword . '%')
                  ->orWhere('instansi', 'ILIKE', '%' . $keyword . '%');
            });
        }

        // 2. Filter Kategori (Jenis Peraturan)
        if ($kategori) {
            $query->where('jenis_peraturan_id', $kategori);
        }

        // 3. Filter Status
        if ($status) {
            $query->where('status_id', $status);
        }

        // 4. Filter Tahun (Bisa Range atau Exact)
        if ($tahun) {
            if (str_contains($tahun, '-')) {
                // Jika frontend mengirim format range "2020-2026" atau "2020 - 2026"
                $years = explode('-', str_replace(' ', '', $tahun));
                if (count($years) == 2) {
                    $query->whereBetween('tahun', [$years[0], $years[1]]);
                }
            } else {
                // Jika frontend mengirim format 1 tahun spesifik "2024"
                $query->where('tahun', $tahun);
            }
        }

        $hasil = $query->orderBy('tahun', 'desc')
                       ->paginate(10)
                       ->withQueryString();

        return response()->json([
            'success' => true,
            'message' => 'Hasil pencarian peraturan',
            'pencarian' => [
                'keyword' => $keyword,
                'kategori' => $kategori,
                'status' => $status,
                'tahun' => $tahun
            ],
            'data' => $hasil 
        ]);
    }
}
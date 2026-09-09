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
        $tahun = $request->query('tahun'); // Parameter filter tambahan (opsional)

        // Memulai query builder
       $query = Peraturan::with(['jenisPeraturan', 'statusPeraturan']);

        // 1. Logika Pencarian (Multi-kolom)
        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('judul', 'ILIKE', '%' . $keyword . '%')
                  ->orWhere('nomor', 'ILIKE', '%' . $keyword . '%')
                  ->orWhere('instansi', 'ILIKE', '%' . $keyword . '%');
            });
        }

        // 2. Logika Filter (Opsional, jika user ingin memfilter tahun)
        if ($tahun) {
            $query->where('tahun', $tahun);
        }

        // 3. Eksekusi dengan Paginasi (10 data per halaman)
        // withQueryString() berguna agar URL parameter (q=pajak) tidak hilang saat pindah halaman
        $hasil = $query->orderBy('tahun', 'desc')
                       ->paginate(10)
                       ->withQueryString();

        // Kembalikan dalam bentuk JSON
        return response()->json([
            'success' => true,
            'message' => 'Hasil pencarian peraturan',
            'pencarian' => [
                'keyword' => $keyword,
                'tahun' => $tahun
            ],
            // Data hasil otomatis berisi detail paginasi dari Laravel
            'data' => $hasil 
        ]);
    }
}
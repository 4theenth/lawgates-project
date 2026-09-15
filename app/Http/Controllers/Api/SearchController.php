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
            $q->where(function($sub) use ($request) {
                // Gunakan 'ilike' jika pakai PostgreSQL agar case-insensitive
                $sub->where('judul', 'ilike', '%' . $request->keyword . '%')
                    ->orWhere('nomor', 'ilike', '%' . $request->keyword . '%');
            });
        });

        // 2. Filter Kategori
        $query->when($request->filled('kategori_id'), function ($q) use ($request) {
            $q->where('jenis_peraturan_id', $request->kategori_id);
        });

        // 3. Filter Tahun
        $query->when($request->filled('tahun'), function ($q) use ($request) {
            $q->where('tahun', $request->tahun);
        });

        // 4. Filter Status
        $query->when($request->filled('status_id'), function ($q) use ($request) {
            $q->where('status_id', $request->status_id);
        });

        // Kembalikan 10 hasil per halaman
        return response()->json($query->paginate(10));
    }
}
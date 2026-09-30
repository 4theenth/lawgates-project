<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisPeraturan;
use Illuminate\Http\Request;

class KategoriHukumController extends Controller
{
    public function getAllKategori()
    {
        $kategoris = JenisPeraturan::select('id', 'kode', 'nama', 'deskripsi')
            ->orderBy('nama', 'asc')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $kategoris
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PeraturanController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi data yang dikirim oleh Admin/Superadmin
        $validated = $request->validate([
            'judul'              => 'required|string',
            'nomor'              => 'required|string',
            'tahun'              => 'required|integer',
            'jenis_peraturan_id' => 'required|integer',
            'status_id'          => 'required|integer',
            'instansi'           => 'nullable|string',
        ]);

        // 2. Buat unique_id otomatis dan simpan ke database
        $validated['unique_id'] = (string) Str::uuid();
        
        $peraturan = Peraturan::create($validated);

        // 3. Kembalikan respons sukses
        return response()->json([
            'success' => true,
            'message' => 'Data peraturan berhasil ditambahkan',
            'data'    => $peraturan
        ], 201); // 201 adalah kode HTTP standar untuk "Created"
    }

    public function show($unique_id)
{
    // Ubah kata 'status' menjadi 'statusPeraturan'
    $peraturan = Peraturan::with(['jenisPeraturan', 'statusPeraturan'])
        ->where('unique_id', $unique_id)
        ->first();

        // Jika unique_id tidak ditemukan di database
        if (!$peraturan) {
            return response()->json([
                'success' => false,
                'message' => 'Data peraturan tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $peraturan
        ], 200);
    }
}
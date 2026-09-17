<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use App\Models\JenisPeraturan;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PeraturanController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'              => 'required|string',
            'nomor'              => 'required|string',
            'tahun'              => 'required|integer',
            'jenis_peraturan_id' => 'required|integer',
            'status_id'          => 'required|integer',
            'instansi'           => 'nullable|string',
        ]);

        $validated['unique_id'] = (string) Str::uuid();
        $peraturan = Peraturan::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data peraturan berhasil ditambahkan',
            'data'    => $peraturan
        ], 201);
    }

    public function show($unique_id)
    {
        // Memuat semua relasi lengkap untuk halaman detail
        $peraturan = Peraturan::with([
            'jenisPeraturan', 
            'statusPeraturan',
            'strukturDokumen' => function($q) { 
                $q->orderBy('id', 'asc'); 
            },
            'pasal' => function($q) { 
                $q->with(['penjelasan', 'children.penjelasan'])->orderBy('urutan', 'asc'); 
            },
            'lawRelations.toPeraturan',
            'lawRelations.relationType'
        ])
        ->where('unique_id', $unique_id)
        ->first();

        if (!$peraturan) {
            return response()->json([
                'success' => false,
                'message' => 'Data peraturan tidak ditemukan.'
            ], 404);
        }

        // Jika request datang dari Inertia (Frontend React), render halaman DetailPeraturan
        if (request()->wantsJson() == false || request()->inertia()) {
            return inertia('DetailPeraturan', [
                'peraturan' => $peraturan
            ]);
        }

        return response()->json([
            'success' => true,
            'data'    => $peraturan
        ], 200);
    }

    // Fungsi baru untuk mengambil data filter secara dinamis
    public function referensiFilter()
    {
        // 1. Ambil Jenis Peraturan (Kategori) yang ID-nya benar-benar ada di tabel peraturan
        $kategori = JenisPeraturan::whereIn('id', Peraturan::select('jenis_peraturan_id')->distinct())
            ->select('id', 'nama')
            ->get();

        // 2. Ambil Status yang ID-nya benar-benar ada di tabel peraturan
        $status = Status::whereIn('id', Peraturan::select('status_id')->distinct())
            ->select('id', 'nama_status as nama')
            ->get();

        // 3. Ambil Tahun yang tersedia secara unik dan urutkan dari yang terbaru
        $tahun = Peraturan::select('tahun')
            ->whereNotNull('tahun')
            ->distinct()
            ->orderBy('tahun', 'desc')
            ->pluck('tahun');

        return response()->json([
            'kategori' => $kategori,
            'status'   => $status,
            'tahun'    => $tahun
        ], 200);
    }
}
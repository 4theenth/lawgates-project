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

    public function download($unique_id)
    {
        $peraturan = Peraturan::with('jenisPeraturan')->where('unique_id', $unique_id)->firstOrFail();

        // Generate tipe_peraturan (e.g. 'uu', 'uudrt') dan standart_id (e.g. 'undang-undang-1-2022')
        $tipe_peraturan = $peraturan->jenisPeraturan ? strtolower($peraturan->jenisPeraturan->kode) : 'unknown';
        $nama_jenis = $peraturan->jenisPeraturan ? \Illuminate\Support\Str::slug($peraturan->jenisPeraturan->nama) : 'peraturan';
        
        // standart_id pattern: jenis-nomor-tahun
        $standart_id = $nama_jenis . '-' . \Illuminate\Support\Str::slug($peraturan->nomor) . '-' . $peraturan->tahun;

        // Path di dalam bucket minio: documents/{tipe_peraturan}/{standart_id}/document.pdf
        $path = 'documents/' . $tipe_peraturan . '/' . $standart_id . '/document.pdf';

        try {
            $disk = \Illuminate\Support\Facades\Storage::disk('minio');
            
            // Cek apakah file ada di MinIO
            if ($disk->exists($path)) {
                // Streaming file dari Laravel (inline / preview) alih-alih download otomatis
                return $disk->response($path, $standart_id . '.pdf');
            } else {
                return redirect('/peraturan/' . $unique_id)->with('error', 'Dokumen PDF tidak tersedia di server penyimpanan (Path: ' . $path . ').');
            }
        } catch (\Exception $e) {
            \Log::error('MinIO Download Error: ' . $e->getMessage());
            return redirect('/peraturan/' . $unique_id)->with('error', 'Gagal mengunduh dokumen dari server penyimpanan.');
        }
    }

    // Fungsi baru untuk mengambil data filter secara dinamis
    public function referensiFilter()
    {
        // 1. Ambil Jenis Peraturan (Kategori) yang ID-nya benar-benar ada di tabel peraturan
        $kategori = JenisPeraturan::whereIn('id', Peraturan::select('jenis_peraturan_id')->distinct())
            ->get()
            ->groupBy('nama')
            ->map(function ($items, $nama) {
                return [
                    'id' => $items->pluck('id')->join(','),
                    'nama' => $nama
                ];
            })->values();

        // 2. Ambil Status yang ID-nya benar-benar ada di tabel peraturan
        $status = Status::whereIn('id', Peraturan::select('status_id')->distinct())
            ->get()
            ->groupBy('nama_status')
            ->map(function ($items, $nama) {
                return [
                    'id' => $items->pluck('id')->join(','),
                    'nama' => $nama
                ];
            })->values();

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
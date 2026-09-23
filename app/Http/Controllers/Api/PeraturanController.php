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

        try {
            $disk = \Illuminate\Support\Facades\Storage::disk('minio');
            $cleanTitle = \Illuminate\Support\Str::limit(\Illuminate\Support\Str::slug($peraturan->judul), 80, '');
            $filename = ($cleanTitle ?: 'dokumen-peraturan') . '.pdf';

            // 1. Cek langsung jika file_pdf_path yang tersimpan di DB ada di MinIO
            if ($peraturan->file_pdf_path && $disk->exists($peraturan->file_pdf_path)) {
                return $disk->response($peraturan->file_pdf_path, $filename);
            }

            // 2. Fallback pencarian beberapa format penamaan folder di MinIO
            $tipe_peraturan = $peraturan->jenisPeraturan ? strtolower($peraturan->jenisPeraturan->kode) : 'unknown';
            $nama_jenis = $peraturan->jenisPeraturan ? \Illuminate\Support\Str::slug($peraturan->jenisPeraturan->nama) : 'peraturan';
            $nomor_slug = \Illuminate\Support\Str::slug($peraturan->nomor);
            $tahun = $peraturan->tahun;

            $fallbackPaths = [
                "documents/{$tipe_peraturan}/{$nama_jenis}-{$nomor_slug}-{$tahun}/document.pdf",
                "documents/{$tipe_peraturan}/undang-undang-{$nomor_slug}-{$tahun}/document.pdf",
                "documents/{$tipe_peraturan}/{$nomor_slug}-{$tahun}/document.pdf",
                "pdf_dokumen/{$peraturan->unique_id}.pdf",
            ];

            foreach ($fallbackPaths as $fallback) {
                if ($disk->exists($fallback)) {
                    // Simpan path yang valid ke database agar pencarian berikutnya instan
                    $peraturan->update(['file_pdf_path' => $fallback]);
                    return $disk->response($fallback, $filename);
                }
            }

            return redirect('/peraturan/' . $unique_id)->with('error', 'Dokumen PDF tidak tersedia di server penyimpanan MinIO.');
        } catch (\Exception $e) {
            \Log::error('MinIO Download Error: ' . $e->getMessage());
            return redirect('/peraturan/' . $unique_id)->with('error', 'Gagal mengakses server penyimpanan MinIO: ' . $e->getMessage());
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
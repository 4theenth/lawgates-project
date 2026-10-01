<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peraturan;
use App\Models\JenisPeraturan;
use App\Models\Status;
use App\Services\DocumentStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        $peraturan = Peraturan::with([
            'jenisPeraturan', 
            'statusPeraturan',
            'strukturDokumen' => function($q) { 
                $q->orderBy('id', 'asc'); 
            },
            'pasal' => function($q) { 
                $q->with(['penjelasan', 'children.penjelasan'])->orderBy('urutan', 'asc'); 
            },
            'lawRelations.toPeraturan' => function($q) {
                $q->withCount([
                    'pasal',
                    'strukturDokumen as pembukaan_count' => function($sq) {
                        $sq->where('tipe_struktur', 'PEMBUKAAN');
                    }
                ]);
            },
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

        $cleanTitle = Str::limit(Str::slug($peraturan->judul), 80, '');
        $filename = ($cleanTitle ?: 'dokumen-peraturan') . '.pdf';

        // 1. Ambil dari local cache (atau unduh sekali dari MinIO lalu simpan ke disk lokal)
        $localPath = DocumentStorageService::getCachedOrDownload($peraturan);

        if ($localPath && file_exists($localPath) && filesize($localPath) > 1024) {
            $headers = [
                'Content-Type' => 'application/pdf',
                'Cache-Control' => 'public, max-age=604800, immutable',
                'ETag' => '"' . md5_file($localPath) . '"',
            ];

            // Jika diminta inline (misalnya untuk iframe viewer)
            if (request()->has('inline') && request('inline') == '1') {
                return response()->file($localPath, array_merge($headers, [
                    'Content-Disposition' => 'inline; filename="' . $filename . '"',
                ]));
            }

            // Default: unduh langsung (attachment)
            return response()->download($localPath, $filename, array_merge($headers, [
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ]));
        }

        // Jika diminta inline oleh iframe dan file tidak ada, JANGAN redirect()->back()
        // karena redirect di dalam iframe akan me-load parent page di dalam iframe (nested / double loop)!
        if (request()->has('inline') && request('inline') == '1') {
            return response('Dokumen PDF tidak tersedia di server penyimpanan MinIO.', 404);
        }

        return redirect()->back()->with('error', 'Dokumen PDF tidak tersedia di server penyimpanan MinIO.');
    }

    public function viewer($unique_id)
    {
        $peraturan = Peraturan::with([
            'jenisPeraturan',
            'statusPeraturan',
            'lawRelations.toPeraturan' => function($q) {
                $q->withCount([
                    'pasal',
                    'strukturDokumen as pembukaan_count' => function($sq) {
                        $sq->where('tipe_struktur', 'PEMBUKAAN');
                    }
                ]);
            },
            'lawRelations.relationType'
        ])
        ->where('unique_id', $unique_id)
        ->firstOrFail();

        // Cek ketersediaan dokumen: apakah sudah di cache atau ada di MinIO
        $localPath = DocumentStorageService::getCachedOrDownload($peraturan);
        $hasPdf = ($localPath && file_exists($localPath) && filesize($localPath) > 1024);

        $pdfUrl = $hasPdf ? url("/peraturan/{$unique_id}/download?inline=1") : null;

        return inertia('Viewer/DokumenViewer', [
            'peraturan' => $peraturan,
            'pdfUrl'    => $pdfUrl,
            'hasPdf'    => $hasPdf,
        ]);
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
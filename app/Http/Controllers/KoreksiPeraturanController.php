<?php

namespace App\Http\Controllers;

use App\Models\Peraturan;
use App\Services\DocumentStorageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KoreksiPeraturanController extends Controller
{
    public function show(Request $request, string $unique_id)
    {
        // Admin / Superadmin mengelola koreksi melalui panel admin, bukan mengajukan usulan
        if (auth()->check() && in_array(auth()->user()->role, ['admin', 'superadmin'])) {
            return redirect()->route('admin.antrean-koreksi')
                ->with('info', 'Admin mengelola koreksi melalui Panel Antrean Koreksi.');
        }

        $peraturan = Peraturan::with([
            'jenisPeraturan',
            'statusPeraturan',
        ])->where('unique_id', $unique_id)->firstOrFail();

        // Resolusi ketersediaan PDF persis seperti DokumenViewer
        $localPath = DocumentStorageService::getCachedOrDownload($peraturan);
        $hasPdf = ($localPath && file_exists($localPath) && filesize($localPath) > 1024);
        $pdfUrl = $hasPdf ? url("/peraturan/{$unique_id}/download?inline=1") : null;

        $section = [
            'type'  => $request->query('type', 'bab'),   // 'pembukaan' | 'bab' | 'pasal'
            'label' => $request->query('label', ''),      // e.g. "BAB 2", "Pasal 1"
            'id'    => $request->query('id', ''),         // identifier (bab/pasal id)
            'isi'   => $request->query('isi', ''),        // teks asli section
        ];

        $userEmail = auth()->check() ? auth()->user()->email : null;

        return Inertia::render('KoreksiPeraturan', [
            'peraturan' => [
                'id'        => $peraturan->id,
                'unique_id' => $peraturan->unique_id,
                'judul'     => $peraturan->judul,
                'pdf_url'   => $pdfUrl,
                'has_pdf'   => $hasPdf,
                'jenis'     => $peraturan->jenisPeraturan?->nama ?? '',
            ],
            'section'   => $section,
            'userEmail' => $userEmail,
        ]);
    }

    public function store(Request $request, string $unique_id)
    {
        if (auth()->check() && in_array(auth()->user()->role, ['admin', 'superadmin'])) {
            return redirect()->route('admin.antrean-koreksi');
        }

        $request->validate([
            'suggested_text' => ['required', 'string', 'min:1'],
            'reason'         => ['nullable', 'string', 'max:1000'],
            'email'          => ['nullable', 'email', 'max:255'],
        ]);

        // Simpan / proses koreksi saat tabel dan moderasi diff backend siap
        // Mengembalikan pesan sukses ke frontend
        return redirect()->route('peraturan.show', ['unique_id' => $unique_id])
            ->with('success', 'Terima kasih! Saran pembenaran Anda telah dikirim dan sedang menunggu peninjauan admin.');
    }
}

<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class KontribusiController extends Controller
{
    /**
     * Menampilkan halaman riwayat usulan koreksi (Kontribusi Saya) untuk user.
     * Sesuai Figma node #3406:83994 & #3443:59451.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        // Jika akun admin / superadmin, arahkan ke dashboard admin
        if ($user && in_array($user->role, ['admin', 'superadmin'])) {
            return redirect()->route('admin.dashboard');
        }

        $totalBookmarks = $user ? $user->bookmarks()->count() : 345;
        $totalCollections = $user ? $user->bookmarkCollections()->count() : 10;

        // 6 Data dummy usulan koreksi sesuai instruksi dan desain Figma
        $dummyKontribusi = [
            [
                'id' => 1,
                'peraturan_unique_id' => 'perubahan-kedua-uud-1945',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Perubahan kedua undang undang dasar tahun 1945',
                'bab' => 'BAB II • Wilayah Negara',
                'pasal' => 'Pasal 2',
                'tanggal_diajukan' => 'Diajukan 12 Mei 2026',
                'status' => 'ditolak',
                'usulan_text' => 'Dalam menjalankan tugas sebagaimana dimaksud dalam pasal 2...',
                'admin_message' => 'yang kamu koreksi itu bukan bagian dari pasal dari pasal 2',
            ],
            [
                'id' => 2,
                'peraturan_unique_id' => 'perpres-kelapa-sawit',
                'jenis_peraturan' => 'PERATURAN PRESIDEN',
                'judul_peraturan' => 'Peraturan Presiden Terhadap Kelapa Sawit',
                'bab' => 'BAB I • Presiden',
                'pasal' => 'Pasal 1',
                'tanggal_diajukan' => 'Diajukan 30 Mei 2026',
                'status' => 'disetujui',
                'usulan_text' => 'Dalam menjalankan tugas sebagaimana dimaksud dalam pasal 1...',
                'admin_message' => 'Terima kasih atas koreksinya yudis',
            ],
            [
                'id' => 3,
                'peraturan_unique_id' => 'perubahan-kedua-uud-1945',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Perubahan kedua undang undang dasar tahun 1945',
                'bab' => 'BAB II • Wilayah Negara',
                'pasal' => 'Pasal 1',
                'tanggal_diajukan' => 'Diajukan 12 Mei 2026',
                'status' => 'menunggu',
                'usulan_text' => 'Dalam menjalankan tugas sebagaimana dimaksud dalam pasal 2...',
                'admin_message' => null,
            ],
            [
                'id' => 4,
                'peraturan_unique_id' => 'undang-undang-24-2024',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang-undang (UU) Nomor 24 Tahun 2024 tentang Kabupaten Tapanuli Selatan di Provinsi Sumatera Utara',
                'bab' => null,
                'pasal' => 'Pasal 3',
                'tanggal_diajukan' => 'Diajukan 2 Mei 2026',
                'status' => 'disetujui',
                'usulan_text' => 'Kabupaten Tapanuli Selatan terdiri atas 15 (lima belas) Kecamatan, yaitu: a. Kecamatan Angkola Barat; b. Kecamatan Batang Toru...',
                'admin_message' => 'Koreksi terverifikasi dan telah diperbarui pada naskah digital.',
            ],
            [
                'id' => 5,
                'peraturan_unique_id' => 'pp-35-2021',
                'jenis_peraturan' => 'PERATURAN PEMERINTAH',
                'judul_peraturan' => 'Peraturan Pemerintah Nomor 35 Tahun 2021 tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, dan Waktu Istirahat',
                'bab' => 'BAB IV • Waktu Kerja dan Istirahat',
                'pasal' => 'Pasal 21',
                'tanggal_diajukan' => 'Diajukan 28 April 2026',
                'status' => 'menunggu',
                'usulan_text' => 'Pengusaha yang mempekerjakan Pekerja/Buruh melebihi waktu kerja wajib membayar upah kerja lembur sesuai ketentuan peraturan perundang-undangan.',
                'admin_message' => null,
            ],
            [
                'id' => 6,
                'peraturan_unique_id' => 'uu-1-2024',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang-Undang Nomor 1 Tahun 2024 tentang Informasi dan Transaksi Elektronik',
                'bab' => 'BAB VII • Perbuatan yang Dilarang',
                'pasal' => 'Pasal 27',
                'tanggal_diajukan' => 'Diajukan 15 April 2026',
                'status' => 'ditolak',
                'usulan_text' => 'Setiap Orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan Informasi Elektronik...',
                'admin_message' => 'Teks asli yang tercantum pada salinan sah Lembaran Negara sudah sesuai.',
            ],
        ];

        $stats = [
            'total' => count($dummyKontribusi),
            'menunggu' => count(array_filter($dummyKontribusi, fn ($item) => $item['status'] === 'menunggu')),
            'disetujui' => count(array_filter($dummyKontribusi, fn ($item) => $item['status'] === 'disetujui')),
            'ditolak' => count(array_filter($dummyKontribusi, fn ($item) => $item['status'] === 'ditolak')),
        ];

        return Inertia::render('User/Kontribusi', [
            'stats' => $stats,
            'kontribusiList' => $dummyKontribusi,
            'totalBookmarks' => $totalBookmarks,
            'totalCollections' => $totalCollections,
        ]);
    }
}

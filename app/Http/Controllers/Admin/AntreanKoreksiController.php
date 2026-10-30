<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AntreanKoreksiController extends Controller
{
    /**
     * Tampilkan halaman antrean koreksi dokumen hukum sisi admin dengan dummy data realistis.
     */
    /**
     * Data dummy koreksi yang sinkron antara tabel antrean dan halaman detail.
     */
    private function getDummyKoreksiList(): array
    {
        return [
            [
                'id' => 1,
                'tanggal' => '12 Mei 2026, 14:31',
                'waktu_lalu' => '1 jam lalu',
                'created_at_timestamp' => 1778572260,
                'user_name' => 'Yudis',
                'user_email' => 'yudis@gmail.com',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang - Undang Perubahan Ke 2',
                'bagian' => 'BAB II Pasal 2',
                'status' => 'disetujui',
                'teks_asli' => 'Dalam menjalankan tugas sebagaimana dimaksud dalam pasal 1 ayat (1)...',
                'usulan_text' => 'Dalam menjalankan tugas sebagaimana dimaksud dalam pasal 2 ayat (1)...',
                'alasan' => 'Typo rujukan pasal pada bab 2',
                'admin_message' => 'Terima kasih atas koreksinya, data telah disesuaikan.',
            ],
            [
                'id' => 2,
                'tanggal' => '12 Mei 2026, 14:31',
                'waktu_lalu' => '1 jam lalu',
                'created_at_timestamp' => 1778572260,
                'user_name' => 'Yudis',
                'user_email' => 'yudis@gmail.com',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang - Undang Perubahan Ke 2',
                'bagian' => 'BAB II Pasal 2',
                'status' => 'belum_ditinjau',
                'teks_asli' => "Pasal 2\n(1) Yang termasuk dalam pengertian penyerahan Barang Kena Pajak adalah:\n  - penyerahan hak atas Barang Kena Pajak karena suatu perjanjiian;\n  - pengalihan Barang Kena Pajak oleh karena suatu perjanjian sewa beli dan/atau perjanjian sewa guna usaha;\n  - penyerahan hak atas Barang Kena Pajak karena suatu perjanjiian;\n  - pengalihan Barang Kena Pajak oleh karena suatu perjanjian sewa beli dan/atau perjanjian sewa guna usaha;\n  - penyerahan hak atas Barang Kena Pajak karena suatu perjanjiian;",
                'usulan_text' => "Pasal 2\n(1) Yang termasuk dalam pengertian penyerahan Barang Kena Pajak adalah:\n  - penyerahan hak atas Barang Kena Pajak karena suatu perjanjiian;\n  - pengalihan Barang Kena Pajak oleh karena suatu penjualan beli beli dan/atau perjanjian sewa guna usaha;\n  - penyerahan hak atas Barang Kena Pajak karena suatu perjanjiian;\n  - pengalihan Barang Kena Pajak oleh karena suatu perjanjian sewa beli dan/atau perjanjian sewa guna usaha;\n  - penyerahan hak atas Barang Kena Pajak karena suatu perjanjiian;",
                'alasan' => 'Seharusnya bukan perjanjian sewa, tetapi penjualan beli',
                'admin_message' => null,
            ],
            [
                'id' => 3,
                'tanggal' => '12 Mei 2026, 14:31',
                'waktu_lalu' => '1 jam lalu',
                'created_at_timestamp' => 1778572260,
                'user_name' => 'Yudis',
                'user_email' => 'yudis@gmail.com',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang - Undang Perubahan Ke 2',
                'bagian' => 'BAB II Pasal 2',
                'status' => 'ditolak',
                'teks_asli' => 'Ketentuan lebih lanjut mengenai tata cara perizinan diatur dalam Peraturan Menteri.',
                'usulan_text' => 'Ketentuan lebih lanjut mengenai tata cara perizinan diatur dalam Peraturan Presiden.',
                'alasan' => 'Koreksi hierarki peraturan perundang-undangan',
                'admin_message' => 'yang kamu koreksi itu bukan bagian dari pasal 2 dan delegasi aslinya memang ke Peraturan Menteri.',
            ],
            [
                'id' => 4,
                'tanggal' => '12 Mei 2026, 14:31',
                'waktu_lalu' => '1 jam lalu',
                'created_at_timestamp' => 1778572260,
                'user_name' => 'Yudis',
                'user_email' => 'yudis@gmail.com',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang - Undang Perubahan Ke 2',
                'bagian' => 'BAB II Pasal 2',
                'status' => 'disetujui',
                'teks_asli' => 'Setiap Orang yang melanggar ketentuan sebagaimana dimaksud dikenakan sanksi...',
                'usulan_text' => 'Setiap Orang yang melanggar ketentuan sebagaimana dimaksud dalam Pasal 14 dikenakan sanksi administratif...',
                'alasan' => 'Perbaikan redaksional frasa administratif',
                'admin_message' => 'Disetujui. Validasi tim legal selesai.',
            ],
            [
                'id' => 5,
                'tanggal' => '12 Mei 2026, 14:31',
                'waktu_lalu' => '1 jam lalu',
                'created_at_timestamp' => 1778572260,
                'user_name' => 'Yudis',
                'user_email' => 'yudis@gmail.com',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang - Undang Perubahan Ke 2',
                'bagian' => 'BAB II Pasal 2',
                'status' => 'disetujui',
                'teks_asli' => 'Lembaga yang berwenang melakukan pengawasan berkala...',
                'usulan_text' => 'Lembaga yang berwenang melakukan evaluasi dan pengawasan berkala...',
                'alasan' => 'Menyinkronkan dengan lampiran penjelasan resmi',
                'admin_message' => 'Koreksi diterima.',
            ],
            [
                'id' => 6,
                'tanggal' => '12 Mei 2026, 14:31',
                'waktu_lalu' => '1 jam lalu',
                'created_at_timestamp' => 1778572260,
                'user_name' => 'Yudis',
                'user_email' => 'yudis@gmail.com',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang - Undang Perubahan Ke 2',
                'bagian' => 'BAB II Pasal 2',
                'status' => 'disetujui',
                'teks_asli' => 'Jangka waktu penyelesaian permohonan paling lama 14 hari kerja.',
                'usulan_text' => 'Jangka waktu penyelesaian permohonan paling lama 14 (empat belas) hari kerja.',
                'alasan' => 'Standar penulisan angka dan huruf peraturan perundangan',
                'admin_message' => 'Sudah diverifikasi dan diperbarui.',
            ],
            [
                'id' => 7,
                'tanggal' => '11 Mei 2026, 09:15',
                'waktu_lalu' => '1 hari lalu',
                'created_at_timestamp' => 1778466900,
                'user_name' => 'Farhan Nugraha',
                'user_email' => 'farhan.n@lawfirm.co.id',
                'jenis_peraturan' => 'PERATURAN PEMERINTAH',
                'judul_peraturan' => 'Peraturan Pemerintah tentang Penyelenggaraan Pos',
                'bagian' => 'BAB IV Pasal 18',
                'status' => 'belum_ditinjau',
                'teks_asli' => 'Penyelenggara pos wajib menjamin kerahasiaan kiriman pos surat.',
                'usulan_text' => 'Penyelenggara pos wajib menjamin kerahasiaan dan keamanan kiriman pos surat.',
                'alasan' => 'Penyelarasan dengan Undang-Undang Perlindungan Data Pribadi',
                'admin_message' => null,
            ],
            [
                'id' => 8,
                'tanggal' => '10 Mei 2026, 16:20',
                'waktu_lalu' => '2 hari lalu',
                'created_at_timestamp' => 1778406000,
                'user_name' => 'Siti Rahmawati',
                'user_email' => 'siti.rahma@legalconsult.id',
                'jenis_peraturan' => 'PERATURAN PRESIDEN',
                'judul_peraturan' => 'Peraturan Presiden tentang Tata Kelola Kehutanan',
                'bagian' => 'BAB I Pasal 5',
                'status' => 'belum_ditinjau',
                'teks_asli' => 'Menteri Lingkungan Hidup mengoordinasikan pengawasan izin konsesi...',
                'usulan_text' => 'Menteri yang membidangi urusan kehutanan mengoordinasikan pengawasan izin konsesi...',
                'alasan' => 'Penyesuaian nomenklatur kementerian kabinet terbaru',
                'admin_message' => null,
            ],
            [
                'id' => 9,
                'tanggal' => '09 Mei 2026, 11:05',
                'waktu_lalu' => '3 hari lalu',
                'created_at_timestamp' => 1778300700,
                'user_name' => 'Budi Santoso',
                'user_email' => 'budisantoso@notaris.id',
                'jenis_peraturan' => 'UNDANG - UNDANG',
                'judul_peraturan' => 'Undang-Undang Harmonisasi Peraturan Perpajakan',
                'bagian' => 'BAB III Pasal 7',
                'status' => 'ditolak',
                'teks_asli' => 'Penghasilan Kena Pajak bagi Wajib Pajak orang pribadi...',
                'usulan_text' => 'Penghasilan Bersih bagi Wajib Pajak badan usaha...',
                'alasan' => 'Koreksi istilah PKP',
                'admin_message' => 'Istilah asli dalam UU memang Penghasilan Kena Pajak, bukan penghasilan bersih.',
            ],
        ];
    }

    /**
     * Tampilkan halaman antrean koreksi dokumen hukum sisi admin dengan dummy data realistis.
     */
    public function index(Request $request): Response
    {
        $dummyKoreksi = $this->getDummyKoreksiList();

        $stats = [
            'total' => 198453,
            'belum_ditinjau' => count(array_filter($dummyKoreksi, fn($i) => $i['status'] === 'belum_ditinjau')),
            'disetujui' => count(array_filter($dummyKoreksi, fn($i) => $i['status'] === 'disetujui')),
            'ditolak' => count(array_filter($dummyKoreksi, fn($i) => $i['status'] === 'ditolak')),
        ];

        return Inertia::render('Admin/AntreanKoreksi/Index', [
            'stats' => $stats,
            'koreksiList' => $dummyKoreksi,
        ]);
    }

    /**
     * Tampilkan halaman detail usulan koreksi teks (Figma #3506:60870 & #3543:61567).
     * Data dinamis menyesuaikan item yang dipilih dari halaman antrean.
     */
    public function show($id): Response
    {
        $list = $this->getDummyKoreksiList();
        $found = collect($list)->firstWhere('id', (int) $id);

        if (!$found) {
            $found = $list[0];
        }

        // Parse bagian (misal: "BAB II Pasal 2" -> chapter: "BAB II", article: "Pasal 2")
        $parts = explode(' ', $found['bagian']);
        $chapter = isset($parts[0]) && isset($parts[1]) ? $parts[0] . ' ' . $parts[1] : 'BAB II';
        $article = isset($parts[2]) && isset($parts[3]) ? $parts[2] . ' ' . $parts[3] : 'Pasal 2';

        // Susun riwayat jejak audit sesuai status item
        $auditTrail = [
            [
                'id' => 1,
                'title' => 'Koreksi dibuat Oleh ' . $found['user_name'],
                'timestamp' => $found['tanggal'],
                'status' => 'created',
            ],
        ];

        if ($found['status'] === 'disetujui') {
            $auditTrail[] = [
                'id' => 2,
                'title' => 'Disetujui oleh Admin Mangadi',
                'timestamp' => '13 Mei 2026, 06:31',
                'status' => 'approved',
            ];
            $auditTrail[] = [
                'id' => 3,
                'title' => 'Teks ' . $article . ' Diperbarui',
                'timestamp' => '13 Mei 2026, 06:32',
                'status' => 'updated',
            ];
        } elseif ($found['status'] === 'ditolak') {
            $auditTrail[] = [
                'id' => 2,
                'title' => 'Ditolak oleh Admin Mangadi',
                'timestamp' => '13 Mei 2026, 06:31',
                'status' => 'rejected',
            ];
        }

        // Format teks jika pendek agar tampil proporsional di layout side-by-side
        $currentText = $found['teks_asli'];
        $proposedText = $found['usulan_text'];
        if (!str_contains($currentText, "\n") && strlen($currentText) < 160) {
            $currentText = "{$article}\n(1) {$currentText}";
            $proposedText = "{$article}\n(1) {$proposedText}";
        }

        // Ambil slug unique_id peraturan riil jika ada, atau buat slug fallback yang valid
        $rawJudul = strtolower($found['judul_peraturan']);
        $uniqueSlug = 'undang-undang-11-2020';
        if (str_contains($rawJudul, 'harmonisasi')) {
            $uniqueSlug = 'undang-undang-7-2021';
        } elseif (str_contains($rawJudul, 'pos')) {
            $uniqueSlug = 'peraturan-pemerintah-46-2021';
        } elseif (str_contains($rawJudul, 'kehutanan')) {
            $uniqueSlug = 'peraturan-presiden-28-2023';
        }

        // Tautan langsung ke halaman Detail Peraturan dengan query parameter context admin
        // Gunakan relative path agar ditangani oleh Inertia Link (SPA tanpa reload browser)
        $detailUrl = "/peraturan/{$uniqueSlug}?from=admin_koreksi&koreksi_id={$found['id']}";
        $pdfUrl = "/peraturan/{$uniqueSlug}/download?inline=1";

        $detailData = [
            'id' => (int) $found['id'],
            'user' => [
                'name' => $found['user_name'],
                'email' => $found['user_email'],
                'avatar' => null,
            ],
            'reported_at' => [
                'date' => trim(explode(',', $found['tanggal'])[0] ?? $found['tanggal']),
                'time' => trim(explode(',', $found['tanggal'])[1] ?? ''),
                'relative' => $found['waktu_lalu'],
            ],
            'document' => [
                'id' => 1,
                'title' => $found['judul_peraturan'],
                'category' => $found['jenis_peraturan'],
                'chapter' => $chapter,
                'article' => $article,
                'unique_id' => $uniqueSlug,
                'url' => $detailUrl,
                'pdf_url' => $pdfUrl,
            ],
            'status' => $found['status'],
            'admin_message' => $found['admin_message'] ?? null,
            'diff' => [
                'word_change_count' => 2,
                'removed_words' => '',
                'added_words' => '',
                'current_text' => $currentText,
                'proposed_text' => $proposedText,
                'reason' => $found['alasan'],
            ],
            'audit_trail' => $auditTrail,
        ];

        return Inertia::render('Admin/AntreanKoreksi/Detail', [
            'koreksi' => $detailData,
        ]);
    }
}

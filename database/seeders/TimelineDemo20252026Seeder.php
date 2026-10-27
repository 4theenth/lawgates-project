<?php

namespace Database\Seeders;

use App\Models\Peraturan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

/**
 * Data demo timeline untuk tahun 2025 dan 2026.
 *
 * Tahun 2025-2026 sengaja kosong di data asli karena `tanggal_penetapan` pada
 * peraturan tahun tersebut belum terisi, sementara timeline hanya bisa
 * menggambar event yang punya tanggal. Seeder ini mengisi tanggal pada
 * peraturan 2025-2026 yang sudah ada, lalu menambah beberapa peraturan baru
 * supaya grafik dua tahun terakhir punya sebaran sama seperti tahun lain.
 *
 * Jalankan `php artisan db:seed --class=TimelineDemo20252026Seeder`. Seeder ini
 * menulis ke `peraturan` lalu membangun ulang `timeline_events` dan
 * membersihkan cache agregasi di akhirnya, jadi tidak ada perintah lanjutan.
 */
class TimelineDemo20252026Seeder extends Seeder
{
    /**
     * Jenis peraturan yang dipakai. Kode harus cocok dengan `jenis_peraturan.kode`
     * karena `timeline:build` menyalin kolom itu apa adanya ke timeline.
     */
    private const JENIS = [
        'UU' => 'Undang-Undang',
        'PP' => 'Peraturan Pemerintah',
        'PERPRES' => 'Peraturan Presiden',
        'PERDA' => 'Peraturan Daerah',
        'PERMEN' => 'Peraturan Menteri',
    ];

    /** Nama panjang jenis, dipakai merangkai judul peraturan demo. */
    private const JENIS_NAMA = [
        'UU' => 'Undang-undang (UU)',
        'PP' => 'Peraturan Pemerintah (PP)',
        'PERPRES' => 'Peraturan Presiden (PERPRES)',
        'PERDA' => 'Peraturan Daerah (PERDA)',
        'PERMEN' => 'Peraturan Menteri (PERMEN)',
    ];

    /**
     * Peraturan 2025-2026 yang sudah ada di database tapi tanggalnya kosong.
     * Diberi tanggal + subjek + lokasi supaya ikut teragregasi ke timeline.
     *
     * `status` ikut diperbaiki karena beberapa baris ini sudah berstatus
     * `Tidak Berlaku` padahal belum pernah terbit di timeline, sehingga
     * tampil sebagai event `dicabut` tanpa pasangan `terbit`.
     *
     * @var array<int, array<string, string|null>>
     */
    private const PERATURAN_LAMA = [
        [
            'unique_id' => 'undang-undang-2-2025',
            'tanggal_penetapan' => '2025-01-15',
            'subjek' => 'Ketenagakerjaan',
            'lokasi_daerah' => 'Pemerintah Pusat',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-1-2025',
            'tanggal_penetapan' => '2025-02-06',
            'subjek' => 'Hukum Pidana, Perdata, dan Dagang',
            'lokasi_daerah' => 'Pemerintah Pusat',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-14-2025',
            'tanggal_penetapan' => '2025-03-20',
            'subjek' => 'APBD',
            'lokasi_daerah' => 'Pemerintah Pusat',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-16-2025',
            'tanggal_penetapan' => '2025-06-11',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'lokasi_daerah' => 'Pemerintah Pusat',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-18-2025',
            'tanggal_penetapan' => '2025-08-27',
            'subjek' => 'Cipta Kerja',
            'lokasi_daerah' => 'Pemerintah Pusat',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-5-2026',
            'tanggal_penetapan' => '2026-02-18',
            'subjek' => 'Ketenagakerjaan',
            'lokasi_daerah' => 'Pemerintah Pusat',
            'status' => 'Berlaku',
        ],
    ];

    /**
     * Peraturan baru sebagai sebaran demo.
     *
     * Jumlah per bulan sengaja tidak rata supaya grafik punya naik turun
     * seperti data nyata, dengan puncak di Juni-Oktober. Framing-nya masuk
     * akal: pembahasan peraturan baru berjalan selepas pertengahan tahun
     * anggaran dan hasilnya diundangkan sebelum tutup tahun.
     *
     * @var array<int, array<string, string|null>>
     */
    private const PERATURAN_BARU = [
        // ── Januari 2025 ──
        [
            'unique_id' => 'peraturan-pemerintah-3-2025',
            'jenis' => 'PP',
            'nomor' => '3',
            'tahun' => '2025',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 3 Tahun 2025 tentang Penyelenggaraan Perizinan Berusaha Terintegrasi',
            'tanggal_penetapan' => '2025-01-22',
            'subjek' => 'Cipta Kerja',
            'status' => 'Berlaku',
        ],
        // ── Februari 2025 ──
        [
            'unique_id' => 'peraturan-presiden-4-2025',
            'jenis' => 'PERPRES',
            'nomor' => '4',
            'tahun' => '2025',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 4 Tahun 2025 tentang Percepatan Penurunan Stunting Terintegrasi',
            'tanggal_penetapan' => '2025-02-13',
            'subjek' => 'Kesehatan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-7-2025',
            'jenis' => 'PP',
            'nomor' => '7',
            'tahun' => '2025',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 7 Tahun 2025 tentang Tata Cara Pengenaan Sanksi Administratif Pajak Daerah',
            'tanggal_penetapan' => '2025-02-25',
            'subjek' => 'APBD',
            'status' => 'Berlaku',
        ],
        // ── Maret 2025 ──
        [
            'unique_id' => 'undang-undang-6-2025',
            'jenis' => 'UU',
            'nomor' => '6',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 6 Tahun 2025 tentang Pengelolaan Sumber Daya Air Berkelanjutan',
            'tanggal_penetapan' => '2025-03-11',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-8-2025',
            'jenis' => 'UU',
            'nomor' => '8',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 8 Tahun 2025 tentang Sistem Kesehatan Nasional',
            'tanggal_penetapan' => '2025-03-26',
            'subjek' => 'Kesehatan',
            'status' => 'Berlaku',
        ],
        // ── April 2025 ──
        [
            'unique_id' => 'undang-undang-9-2025',
            'jenis' => 'UU',
            'nomor' => '9',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 9 Tahun 2025 tentang Perlindungan Data Pribadi Sektor Publik',
            'tanggal_penetapan' => '2025-04-08',
            'subjek' => 'Hukum Pidana, Perdata, dan Dagang',
            'status' => 'Berlaku',
        ],
        // ── Mei 2025 ──
        [
            'unique_id' => 'peraturan-pemerintah-24-2025',
            'jenis' => 'PP',
            'nomor' => '24',
            'tahun' => '2025',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 24 Tahun 2025 tentang Tata Cara Pengadaan Barang dan Jasa Pemerintah',
            'tanggal_penetapan' => '2025-05-14',
            'subjek' => 'APBD',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-jatim-2-2025',
            'jenis' => 'PERDA',
            'nomor' => '2',
            'tahun' => '2025',
            'judul' => 'Peraturan Daerah (PERDA) Provinsi Jawa Timur Nomor 2 Tahun 2025 tentang Pengendalian Pencemaran Sungai',
            'tanggal_penetapan' => '2025-05-27',
            'subjek' => 'Lingkungan Hidup',
            'lokasi_daerah' => 'Pemerintah Provinsi Jawa Timur',
            'status' => 'Berlaku',
        ],
        // ── Juni 2025 ──
        [
            'unique_id' => 'undang-undang-17-2025',
            'jenis' => 'UU',
            'nomor' => '17',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 17 Tahun 2025 tentang Pengesahan Persetujuan Kerja Sama Perdagangan Internasional',
            'tanggal_penetapan' => '2025-06-05',
            'subjek' => 'Hukum Pidana, Perdata, dan Dagang',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-25-2025',
            'jenis' => 'PP',
            'nomor' => '25',
            'tahun' => '2025',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 25 Tahun 2025 tentang Jaminan Kehilangan Pekerjaan',
            'tanggal_penetapan' => '2025-06-18',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-presiden-19-2025',
            'jenis' => 'PERPRES',
            'nomor' => '19',
            'tahun' => '2025',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 19 Tahun 2025 tentang Rencana Aksi Nasional Pemberantasan Korupsi',
            'tanggal_penetapan' => '2025-06-30',
            'subjek' => 'Hukum Pidana, Perdata, dan Dagang',
            'status' => 'Berlaku',
        ],
        // ── Juli 2025 ──
        [
            'unique_id' => 'undang-undang-21-2025',
            'jenis' => 'UU',
            'nomor' => '21',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 21 Tahun 2025 tentang Perlindungan Pekerja Platform Digital',
            'tanggal_penetapan' => '2025-07-09',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-28-2025',
            'jenis' => 'PP',
            'nomor' => '28',
            'tahun' => '2025',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 28 Tahun 2025 tentang Penyelenggaraan Pendidikan Vokasi',
            'tanggal_penetapan' => '2025-07-23',
            'subjek' => 'Pendidikan',
            'status' => 'Berlaku',
        ],
        // ── Agustus 2025 ──
        [
            'unique_id' => 'undang-undang-23-2025',
            'jenis' => 'UU',
            'nomor' => '23',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 23 Tahun 2025 tentang Pengelolaan Ruang Udara Nasional',
            'tanggal_penetapan' => '2025-08-06',
            'subjek' => 'Pertahanan dan Keamanan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-30-2025',
            'jenis' => 'PP',
            'nomor' => '30',
            'tahun' => '2025',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 30 Tahun 2025 tentang Fasilitasi Investasi Sektor Prioritas',
            'tanggal_penetapan' => '2025-08-19',
            'subjek' => 'Penanaman Modal dan Investasi',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-menteri-perhubungan-13-2025',
            'jenis' => 'PERMEN',
            'nomor' => '13',
            'tahun' => '2025',
            'judul' => 'Peraturan Menteri Perhubungan (PERMEN) Nomor 13 Tahun 2025 tentang Standar Keselamatan Angkutan Jalan',
            'tanggal_penetapan' => '2025-08-28',
            'subjek' => 'Perhubungan',
            'status' => 'Berlaku',
        ],
        // ── September 2025 ──
        [
            'unique_id' => 'undang-undang-26-2025',
            'jenis' => 'UU',
            'nomor' => '26',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 26 Tahun 2025 tentang Perlindungan dan Pengelolaan Ekosistem Pesisir',
            'tanggal_penetapan' => '2025-09-04',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-bali-7-2025',
            'jenis' => 'PERDA',
            'nomor' => '7',
            'tahun' => '2025',
            'judul' => 'Peraturan Daerah (PERDA) Provinsi Bali Nomor 7 Tahun 2025 tentang Pengelolaan Sampah Berbasis Desa Adat',
            'tanggal_penetapan' => '2025-09-23',
            'subjek' => 'Lingkungan Hidup',
            'lokasi_daerah' => 'Pemerintah Provinsi Bali',
            'status' => 'Berlaku',
        ],
        // ── Oktober 2025 ──
        [
            'unique_id' => 'undang-undang-27-2025',
            'jenis' => 'UU',
            'nomor' => '27',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 27 Tahun 2025 tentang Perubahan atas Undang-Undang Nomor 14 Tahun 2025',
            'tanggal_penetapan' => '2025-10-16',
            'subjek' => 'APBD',
            'status' => 'Tidak Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-37-2025',
            'jenis' => 'PP',
            'nomor' => '37',
            'tahun' => '2025',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 37 Tahun 2025 tentang Penerimaan Negara Bukan Pajak Sektor Digital',
            'tanggal_penetapan' => '2025-10-28',
            'subjek' => 'APBD',
            'status' => 'Berlaku',
        ],
        // ── November 2025 ──
        [
            'unique_id' => 'undang-undang-31-2025',
            'jenis' => 'UU',
            'nomor' => '31',
            'tahun' => '2025',
            'judul' => 'Undang-undang (UU) Nomor 31 Tahun 2025 tentang Akuntabilitas Pengelolaan Keuangan Daerah',
            'tanggal_penetapan' => '2025-11-12',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        // ── Desember 2025 ──
        [
            'unique_id' => 'peraturan-presiden-31-2025',
            'jenis' => 'PERPRES',
            'nomor' => '31',
            'tahun' => '2025',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 31 Tahun 2025 tentang Percepatan Transformasi Digital Layanan Publik',
            'tanggal_penetapan' => '2025-12-03',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-jateng-11-2025',
            'jenis' => 'PERDA',
            'nomor' => '11',
            'tahun' => '2025',
            'judul' => 'Peraturan Daerah (PERDA) Provinsi Jawa Tengah Nomor 11 Tahun 2025 tentang Pengembangan Ekonomi Kreatif Daerah',
            'tanggal_penetapan' => '2025-12-18',
            'subjek' => 'Perekonomian dan Keuangan',
            'lokasi_daerah' => 'Pemerintah Provinsi Jawa Tengah',
            'status' => 'Berlaku',
        ],

        // ── Januari 2026 ──
        [
            'unique_id' => 'undang-undang-3-2026',
            'jenis' => 'UU',
            'nomor' => '3',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 3 Tahun 2026 tentang Penguatan Otonomi Daerah Khusus',
            'tanggal_penetapan' => '2026-01-21',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-2-2026',
            'jenis' => 'PP',
            'nomor' => '2',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 2 Tahun 2026 tentang Tata Cara Pemungutan Retribusi Daerah',
            'tanggal_penetapan' => '2026-01-27',
            'subjek' => 'APBD',
            'status' => 'Berlaku',
        ],
        // ── Februari 2026 ──
        [
            'unique_id' => 'undang-undang-5-2026-baru',
            'jenis' => 'UU',
            'nomor' => '5',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 5 Tahun 2026 tentang Perlindungan Konsumen Sektor Jasa Keuangan',
            'tanggal_penetapan' => '2026-02-10',
            'subjek' => 'Perekonomian dan Keuangan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-presiden-1-2026',
            'jenis' => 'PERPRES',
            'nomor' => '1',
            'tahun' => '2026',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 1 Tahun 2026 tentang Percepatan Layanan Kesehatan Rujukan',
            'tanggal_penetapan' => '2026-02-24',
            'subjek' => 'Kesehatan',
            'status' => 'Berlaku',
        ],
        // ── Maret 2026 ──
        [
            'unique_id' => 'peraturan-pemerintah-6-2026',
            'jenis' => 'PP',
            'nomor' => '6',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 6 Tahun 2026 tentang Standar Upah Minimum Sektoral',
            'tanggal_penetapan' => '2026-03-12',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-8-2026',
            'jenis' => 'UU',
            'nomor' => '8',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 8 Tahun 2026 tentang Pengelolaan Limbah Bahan Berbahaya dan Beracun',
            'tanggal_penetapan' => '2026-03-25',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        // ── April 2026 ──
        [
            'unique_id' => 'undang-undang-11-2026',
            'jenis' => 'UU',
            'nomor' => '11',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 11 Tahun 2026 tentang Revisi Kitab Undang-Undang Hukum Pidana',
            'tanggal_penetapan' => '2026-04-29',
            'subjek' => 'Hukum Pidana, Perdata, dan Dagang',
            'status' => 'Berlaku',
        ],
        // ── Mei 2026 ──
        [
            'unique_id' => 'peraturan-pemerintah-14-2026',
            'jenis' => 'PP',
            'nomor' => '14',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 14 Tahun 2026 tentang Penyelenggaraan Sistem Pemerintahan Berbasis Elektronik',
            'tanggal_penetapan' => '2026-05-19',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-jabar-5-2026',
            'jenis' => 'PERDA',
            'nomor' => '5',
            'tahun' => '2026',
            'judul' => 'Peraturan Daerah (PERDA) Provinsi Jawa Barat Nomor 5 Tahun 2026 tentang Penyelenggaraan Pendidikan Vokasi Daerah',
            'tanggal_penetapan' => '2026-05-26',
            'subjek' => 'Pendidikan',
            'lokasi_daerah' => 'Pemerintah Provinsi Jawa Barat',
            'status' => 'Berlaku',
        ],
        // ── Juni 2026 ──
        [
            'unique_id' => 'peraturan-daerah-badung-4-2026',
            'jenis' => 'PERDA',
            'nomor' => '4',
            'tahun' => '2026',
            'judul' => 'Peraturan Daerah (PERDA) Kabupaten Badung Nomor 4 Tahun 2026 tentang Retribusi Daerah dan Pajak Sarana Pariwisata',
            'tanggal_penetapan' => '2026-06-17',
            'subjek' => 'APBD',
            'lokasi_daerah' => 'Pemerintah Kabupaten Badung',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-21-2026',
            'jenis' => 'PP',
            'nomor' => '21',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 21 Tahun 2026 tentang Ketenagakerjaan Sektor Ekonomi Digital',
            'tanggal_penetapan' => '2026-06-29',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Berlaku',
        ],
        // ── Juli 2026 ──
        [
            'unique_id' => 'undang-undang-15-2026',
            'jenis' => 'UU',
            'nomor' => '15',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 15 Tahun 2026 tentang Kemandirian Industri Pertahanan Nasional',
            'tanggal_penetapan' => '2026-07-14',
            'subjek' => 'Pertahanan dan Keamanan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-presiden-9-2026',
            'jenis' => 'PERPRES',
            'nomor' => '9',
            'tahun' => '2026',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 9 Tahun 2026 tentang Percepatan Pengembangan Ekonomi Digital',
            'tanggal_penetapan' => '2026-07-28',
            'subjek' => 'Perekonomian dan Keuangan',
            'status' => 'Berlaku',
        ],
        // ── Agustus 2026 ──
        [
            'unique_id' => 'undang-undang-19-2026',
            'jenis' => 'UU',
            'nomor' => '19',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 19 Tahun 2026 tentang Penghapusan Sanksi Administratif Ketenagakerjaan',
            'tanggal_penetapan' => '2026-08-05',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Tidak Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-26-2026',
            'jenis' => 'PP',
            'nomor' => '26',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 26 Tahun 2026 tentang Pengelolaan Aset Daerah yang Tidak Produktif',
            'tanggal_penetapan' => '2026-08-18',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-presiden-16-2026',
            'jenis' => 'PERPRES',
            'nomor' => '16',
            'tahun' => '2026',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 16 Tahun 2026 tentang Percepatan Pembangunan Infrastruktur Konektivitas',
            'tanggal_penetapan' => '2026-08-27',
            'subjek' => 'Perhubungan',
            'status' => 'Berlaku',
        ],
        // ── September 2026 ──
        [
            'unique_id' => 'undang-undang-23-2026',
            'jenis' => 'UU',
            'nomor' => '23',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 23 Tahun 2026 tentang Perlindungan Hutan Adat dan Masyarakat Hukum Adat',
            'tanggal_penetapan' => '2026-09-08',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-29-2026',
            'jenis' => 'PP',
            'nomor' => '29',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 29 Tahun 2026 tentang Pendidikan Tinggi Vokasi dan Sertifikasi Kompetensi',
            'tanggal_penetapan' => '2026-09-22',
            'subjek' => 'Pendidikan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-bali-8-2026',
            'jenis' => 'PERDA',
            'nomor' => '8',
            'tahun' => '2026',
            'judul' => 'Peraturan Daerah (PERDA) Provinsi Bali Nomor 8 Tahun 2026 tentang Tata Ruang Wilayah Pesisir',
            'tanggal_penetapan' => '2026-09-30',
            'subjek' => 'Lingkungan Hidup',
            'lokasi_daerah' => 'Pemerintah Provinsi Bali',
            'status' => 'Berlaku',
        ],
        // ── Oktober 2026 ──
        [
            'unique_id' => 'peraturan-presiden-2-2026',
            'jenis' => 'PERPRES',
            'nomor' => '2',
            'tahun' => '2026',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 2 Tahun 2026 tentang Satu Data Indonesia untuk Daerah Otonom Baru',
            'tanggal_penetapan' => '2026-10-08',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-27-2026',
            'jenis' => 'UU',
            'nomor' => '27',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 27 Tahun 2026 tentang Penyelenggaraan Jaminan Kesehatan Nasional Lanjutan',
            'tanggal_penetapan' => '2026-10-21',
            'subjek' => 'Kesehatan',
            'status' => 'Berlaku',
        ],
        // ── November 2026 ──
        [
            'unique_id' => 'undang-undang-25-2026',
            'jenis' => 'UU',
            'nomor' => '25',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 25 Tahun 2026 tentang Jaminan Sosial Pekerja Sektor Informal',
            'tanggal_penetapan' => '2026-11-24',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Berlaku',
        ],
        // ── Desember 2026 ──
        [
            'unique_id' => 'peraturan-pemerintah-33-2026',
            'jenis' => 'PP',
            'nomor' => '33',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 33 Tahun 2026 tentang Tata Cara Evaluasi Rancangan Peraturan Daerah',
            'tanggal_penetapan' => '2026-12-09',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        // ── Sisipan 2026: menajamkan naik turun grafik ──
        // Ditulis sebagai blok terpisah supaya jelas mana yang sengaja
        // ditambahkan demi bentuk grafik, bukan demi cakupan jenis.
        [
            'unique_id' => 'undang-undang-4-2026',
            'jenis' => 'UU',
            'nomor' => '4',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 4 Tahun 2026 tentang Perlindungan Konsumen Digital',
            'tanggal_penetapan' => '2026-01-14',
            'subjek' => 'Perdagangan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-4-2026',
            'jenis' => 'PP',
            'nomor' => '4',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 4 Tahun 2026 tentang Penyelenggaraan Pendidikan Vokasi',
            'tanggal_penetapan' => '2026-01-27',
            'subjek' => 'Pendidikan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-7-2026',
            'jenis' => 'UU',
            'nomor' => '7',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 7 Tahun 2026 tentang Pengelolaan Sumber Daya Air',
            'tanggal_penetapan' => '2026-02-10',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-menteri-3-2026',
            'jenis' => 'PERMEN',
            'nomor' => '3',
            'tahun' => '2026',
            'judul' => 'Peraturan Menteri (PERMEN) Nomor 3 Tahun 2026 tentang Standar Pelayanan Publik Digital',
            'tanggal_penetapan' => '2026-02-25',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-9-2026',
            'jenis' => 'UU',
            'nomor' => '9',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 9 Tahun 2026 tentang Perubahan UU Nomor 23 Tahun 2023 tentang Cipta Kerja',
            'tanggal_penetapan' => '2026-03-11',
            'subjek' => 'Cipta Kerja',
            'status' => 'Tidak Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-12-2026',
            'jenis' => 'UU',
            'nomor' => '12',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 12 Tahun 2026 tentang Energi Terbarukan',
            'tanggal_penetapan' => '2026-04-08',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-13-2026',
            'jenis' => 'UU',
            'nomor' => '13',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 13 Tahun 2026 tentang Kesehatan Kerja Sektor Industri',
            'tanggal_penetapan' => '2026-04-15',
            'subjek' => 'Kesehatan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-11-2026',
            'jenis' => 'PP',
            'nomor' => '11',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 11 Tahun 2026 tentang Standar Akuntansi Pemerintah Daerah',
            'tanggal_penetapan' => '2026-04-22',
            'subjek' => 'APBD',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-presiden-5-2026',
            'jenis' => 'PERPRES',
            'nomor' => '5',
            'tahun' => '2026',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 5 Tahun 2026 tentang Percepatan Pembangunan Infrastruktur Daerah Tertinggal',
            'tanggal_penetapan' => '2026-04-29',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-17-2026',
            'jenis' => 'UU',
            'nomor' => '17',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 17 Tahun 2026 tentang Penguatan Sistem Jaminan Sosial Nasional',
            'tanggal_penetapan' => '2026-06-10',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-18-2026',
            'jenis' => 'UU',
            'nomor' => '18',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 18 Tahun 2026 tentang Penyesuaian Upah Mininum Sektoral',
            'tanggal_penetapan' => '2026-06-17',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-18-2026',
            'jenis' => 'PP',
            'nomor' => '18',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 18 Tahun 2026 tentang Tata Kelola Data Kependudukan',
            'tanggal_penetapan' => '2026-06-24',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-presiden-7-2026',
            'jenis' => 'PERPRES',
            'nomor' => '7',
            'tahun' => '2026',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 7 Tahun 2026 tentang Percepatan Sertifikasi Halal Produk UMKM',
            'tanggal_penetapan' => '2026-06-30',
            'subjek' => 'Perdagangan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-21-2026',
            'jenis' => 'UU',
            'nomor' => '21',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 21 Tahun 2026 tentang Perubahan UU Nomor 6 Tahun 2026 tentang Standar Upah Minimum Sektoral',
            'tanggal_penetapan' => '2026-07-15',
            'subjek' => 'Ketenagakerjaan',
            'status' => 'Tidak Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-jabar-9-2026',
            'jenis' => 'PERDA',
            'nomor' => '9',
            'tahun' => '2026',
            'judul' => 'Peraturan Daerah (PERDA) Provinsi Jawa Barat Nomor 9 Tahun 2026 tentang Pengendalian Pencemaran Udara',
            'tanggal_penetapan' => '2026-07-22',
            'subjek' => 'Lingkungan Hidup',
            'lokasi_daerah' => 'Pemerintah Provinsi Jawa Barat',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-22-2026',
            'jenis' => 'UU',
            'nomor' => '22',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 22 Tahun 2026 tentang Pemindahan Ibu Kota Kecamatan Tertentu',
            'tanggal_penetapan' => '2026-07-28',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-24-2026',
            'jenis' => 'PP',
            'nomor' => '24',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 24 Tahun 2026 tentang Penyelenggaraan Perumahan Rakyat',
            'tanggal_penetapan' => '2026-08-12',
            'subjek' => 'Perumahan dan Kawasan Permukiman',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-24-2026',
            'jenis' => 'UU',
            'nomor' => '24',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 24 Tahun 2026 tentang Perlindungan Data Keuangan Pribadi',
            'tanggal_penetapan' => '2026-08-19',
            'subjek' => 'Perdagangan',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-kota-surabaya-6-2026',
            'jenis' => 'PERDA',
            'nomor' => '6',
            'tahun' => '2026',
            'judul' => 'Peraturan Daerah (PERDA) Kota Surabaya Nomor 6 Tahun 2026 tentang Pengelolaan Air Limbah Domestik',
            'tanggal_penetapan' => '2026-08-26',
            'subjek' => 'Lingkungan Hidup',
            'lokasi_daerah' => 'Pemerintah Kota Surabaya',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-28-2026',
            'jenis' => 'UU',
            'nomor' => '28',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 28 Tahun 2026 tentang Perubahan UU Nomor 19 Tahun 2026 tentang Penghapusan Sanksi Administratif',
            'tanggal_penetapan' => '2026-09-16',
            'subjek' => 'Hukum Pidana, Perdata, dan Dagang',
            'status' => 'Tidak Berlaku',
        ],
        [
            'unique_id' => 'peraturan-presiden-13-2026',
            'jenis' => 'PERPRES',
            'nomor' => '13',
            'tahun' => '2026',
            'judul' => 'Peraturan Presiden (PERPRES) Nomor 13 Tahun 2026 tentang Penguatan Ekonomi Digital Daerah',
            'tanggal_penetapan' => '2026-09-22',
            'subjek' => 'Otonomi Daerah dan Pemerintah Daerah',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'undang-undang-30-2026',
            'jenis' => 'UU',
            'nomor' => '30',
            'tahun' => '2026',
            'judul' => 'Undang-undang (UU) Nomor 30 Tahun 2026 tentang Tata Kelola Pertambangan Berkelanjutan',
            'tanggal_penetapan' => '2026-11-11',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-bali-10-2026',
            'jenis' => 'PERDA',
            'nomor' => '10',
            'tahun' => '2026',
            'judul' => 'Peraturan Daerah (PERDA) Provinsi Bali Nomor 10 Tahun 2026 tentang Pelestarian Warisan Budaya',
            'tanggal_penetapan' => '2026-11-18',
            'subjek' => 'Kebudayaan',
            'lokasi_daerah' => 'Pemerintah Provinsi Bali',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-pemerintah-36-2026',
            'jenis' => 'PP',
            'nomor' => '36',
            'tahun' => '2026',
            'judul' => 'Peraturan Pemerintah (PP) Nomor 36 Tahun 2026 tentang Penyelenggaraan Perdagangan Karbon',
            'tanggal_penetapan' => '2026-12-16',
            'subjek' => 'Lingkungan Hidup',
            'status' => 'Berlaku',
        ],
        [
            'unique_id' => 'peraturan-daerah-badung-7-2026',
            'jenis' => 'PERDA',
            'nomor' => '7',
            'tahun' => '2026',
            'judul' => 'Peraturan Daerah (PERDA) Kabupaten Badung Nomor 7 Tahun 2026 tentang Pengelolaan Sampah Terpadu',
            'tanggal_penetapan' => '2026-12-22',
            'subjek' => 'Lingkungan Hidup',
            'lokasi_daerah' => 'Pemerintah Kabupaten Badung',
            'status' => 'Berlaku',
        ],
    ];

    public function run(): void
    {
        $this->isiTanggalPeraturanLama();
        $this->buatPeraturanBaru();
        $this->buatSebaranMassal();

        $this->bangunUlangTimeline();
    }

    /**
     * Sebaran massal 2025-2026 supaya grafik terisi >10 event per bulan.
     *
     * Ditulis sebagai template + korpus, bukan ratusan entri harfiah:
     * daftar literal sepanjang itu tidak bisa ditinjau manusia dan setiap
     * penambahan bulan berarti menyunting blok besar. Jumlah per bulan
     * ditentukan SEBARAN supaya tinggi grafik tidak rata, dan hari ke-nya
     * diturunkan dari indeks sehingga seeder tetap deterministik
     * (dijalankan dua kali menghasilkan baris yang sama).
     *
     * @var array<string, int> "YYYY-MM" => jumlah peraturan bulan itu
     */
    private const SEBARAN_MASSAL = [
        '2025-01' => 11, '2025-02' => 13, '2025-03' => 12, '2025-04' => 11,
        '2025-05' => 12, '2025-06' => 14, '2025-07' => 12, '2025-08' => 13,
        '2025-09' => 12, '2025-10' => 11, '2025-11' => 12, '2025-12' => 13,
        '2026-01' => 12, '2026-02' => 13, '2026-03' => 12, '2026-04' => 13,
        '2026-05' => 12, '2026-06' => 14, '2026-07' => 13, '2026-08' => 12,
        '2026-09' => 13, '2026-10' => 12, '2026-11' => 12, '2026-12' => 11,
    ];

    /** Jenis yang ikut sebaran massal, berpasangan dengan bobot kemunculannya. */
    private const JENIS_MASSAL = [
        'UU', 'UU', 'UU',
        'PP', 'PP', 'PP',
        'PERPRES', 'PERPRES',
        'PERDA', 'PERDA', 'PERDA',
        'PERMEN', 'PERMEN',
    ];

    /** Judul template; {s} diganti subjek yang bersesuaian. */
    private const TEMPLATE_JUDUL = [
        'Penyelenggaraan {s}',
        'Perubahan Atas Ketentuan {s}',
        'Tata Cara {s}',
        'Penguatan {s} di Daerah',
        'Standar Nasional {s}',
        'Penyesuaian Ketentuan {s}',
        'Percepatan {s}',
        'Pedoman Pelaksanaan {s}',
    ];

    /** Subjek yang dipakai sebaran massal; juga mengisi master subjek_peraturan. */
    private const SUBJEK_MASSAL = [
        'Lingkungan Hidup',
        'Kesehatan',
        'Pendidikan',
        'Ketenagakerjaan',
        'Perdagangan',
        'Perumahan dan Kawasan Permukiman',
        'Perhubungan',
        'Pertanian',
        'Pariwisata',
        'Kebudayaan',
        'Komunikasi dan Informatika',
        'Keuangan',
        'Energi dan Sumber Daya Mineral',
        'Kelautan dan Perikanan',
        'Industri',
        'Pekerjaan Umum',
    ];

    /** Lokasi yang tersedia di filter /regulasi. */
    private const LOKASI_MASSAL = [
        'Pemerintah Pusat',
        'Pemerintah Provinsi Bali',
        'Pemerintah Provinsi Jawa Barat',
        'Pemerintah Provinsi Jawa Timur',
        'Pemerintah Kota Surabaya',
        'Pemerintah Kota Denpasar',
        'Pemerintah Kabupaten Badung',
        'Pemerintah Kabupaten Sleman',
        'Pemerintah Kabupaten Sidoarjo',
        'Pemerintah Kota Bandung',
        'Pemerintah Kota Makassar',
        'Pemerintah Kota Medan',
    ];

    /**
     * Menyebar peraturan fiktif ke seluruh bulan 2025-2026 menurut SEBARAN_MASSAL.
     *
     * Satu `unique_id` diturunkan dari bulan, jenis, nomor, dan indeks judul,
     * jadi berjalan ulang hanya memperbarui baris yang sama. Sekitar 5 persen
     * baris dijadikan `Tidak Berlaku` agar batang dicabut tersebar merata,
     * bukan menumpuk di dua bulan seperti data contoh sebelumnya.
     */
    private function buatSebaranMassal(): void
    {
        $total = 0;

        foreach (self::SEBARAN_MASSAL as $bulan => $jumlah) {
            [$tahun, $bulanAngka] = explode('-', $bulan);

            for ($i = 1; $i <= $jumlah; $i++) {
                $jenis = self::JENIS_MASSAL[$this->putar($bulan, $i, count(self::JENIS_MASSAL))];
                $subjek = self::SUBJEK_MASSAL[$this->putar($bulan, $i * 5, count(self::SUBJEK_MASSAL))];
                $lokasi = self::LOKASI_MASSAL[$this->putar($bulan, $i * 3, count(self::LOKASI_MASSAL))];
                $template = self::TEMPLATE_JUDUL[$this->putar($bulan, $i * 7, count(self::TEMPLATE_JUDUL))];
                $judul = str_replace('{s}', $subjek, $template);

                // Hari disebar 1-27 dan tidak pernah melampaui panjang bulan.
                $hari = (($i * 7) % 27) + 1;
                $tanggal = sprintf('%s-%s-%02d', $tahun, $bulanAngka, $hari);

                $lokasiFinal = str_starts_with($jenis, 'PERDA') ? $lokasi : 'Pemerintah Pusat';

                $uniqueId = sprintf(
                    'demo-%s-%s-%s-%d-%d',
                    substr($jenis, 0, 7),
                    $tahun,
                    $bulanAngka,
                    $i,
                    $this->putar($bulan, $i, 999)
                );

                // Nomor harus unik per (jenis, tahun) karena tabel `peraturan`
                // punya unique index pada ketiganya. Offset bulan ikut dihitung
                // supaya dua bulan berbeda tidak menghasilkan nomor yang sama.
                $nomor = (int) $bulanAngka * 100 + $i;

                $berlaku = $this->putar($bulan, $i * 11, 20) !== 0;

                Peraturan::updateOrCreate(
                    ['unique_id' => $uniqueId],
                    [
                        'jenis_peraturan_id' => $this->jenisId($jenis),
                        'nomor' => (string) $nomor,
                        'tahun' => (int) $tahun,
                        'judul' => sprintf(
                            '%s Nomor %d Tahun %s tentang %s',
                            self::JENIS_NAMA[$jenis] ?? $jenis,
                            $nomor,
                            $tahun,
                            $judul
                        ),
                        'status_id' => $this->statusId($berlaku ? 'Berlaku' : 'Tidak Berlaku'),
                        'tempat_penetapan' => str_starts_with($jenis, 'PERDA') ? 'Denpasar' : 'Jakarta',
                        'tanggal_penetapan' => $tanggal,
                        'tanggal_pengundangan' => $tanggal,
                        'tanggal_berlaku' => $tanggal,
                        'instansi' => $lokasiFinal,
                        'lokasi_daerah' => $lokasiFinal,
                        'subjek' => $subjek,
                    ]
                );

                $this->catatSubjek($subjek);
                $total++;
            }
        }

        $this->command?->info("Sebaran massal: {$total} peraturan demo disebar ke 2025-2026.");
    }

    /**
     * Indeks deterministik. Dipakai menggantikan fungsi acak supaya seeder
     * menghasilkan baris yang sama setiap kali dijalankan.
     */
    private function putar(string $bulan, int $i, int $modulo): int
    {
        return (int) (crc32($bulan.'-'.$i) % $modulo);
    }

    /**
     * `timeline_events` adalah tabel turunan, jadi menulis ke `peraturan` saja
     * tidak cukup untuk membuat grafik terisi. Dua langkah ini dijalankan di
     * sini supaya seeder cukup dipanggil satu kali, tanpa perintah lanjutan
     * yang mudah terlupa.
     *
     * `cache:clear` wajib berada setelah build: service timeline menyimpan
     * hasil agregasi selama 25 jam, sehingga hasil kosong dari sebelum seeder
     * berjalan akan tetap disajikan sampai cache itu kedaluwarsa.
     */
    private function bangunUlangTimeline(): void
    {
        Artisan::call('timeline:build');
        $this->command?->info(trim(Artisan::output()));
        // Cache dibersihkan setelah tabel terisi, bukan sebelumnya.
        Artisan::call('cache:clear');
        $this->command?->info(trim(Artisan::output()));

        $this->command?->info('Seeder demo timeline selesai dan timeline_events sudah dibangun ulang.');
    }

    /**
     * Mengisi tanggal pada peraturan 2025-2026 yang sudah ada. Kolom tanggal,
     * filter, dan status diisi; judul dan jenis dibiarkan seperti semula
     * supaya tidak menimpa data orang lain.
     */
    private function isiTanggalPeraturanLama(): void
    {
        foreach (self::PERATURAN_LAMA as $data) {
            $affected = DB::table('peraturan')
                ->where('unique_id', $data['unique_id'])
                ->update([
                    'tanggal_penetapan' => $data['tanggal_penetapan'],
                    'tanggal_pengundangan' => $data['tanggal_penetapan'],
                    'tanggal_berlaku' => $data['tanggal_penetapan'],
                    'subjek' => $data['subjek'],
                    'lokasi_daerah' => $data['lokasi_daerah'],
                    'instansi' => $data['instansi'] ?? $data['lokasi_daerah'],
                    'status_id' => $this->statusId($data['status'] ?? 'Berlaku'),
                    'updated_at' => now(),
                ]);

            if ($affected === 0) {
                $this->command?->warn("Peraturan {$data['unique_id']} tidak ditemukan, dilewati.");

                continue;
            }

            $this->catatSubjek($data['subjek']);
        }
    }

    /**
     * Membuat peraturan baru untuk sebaran demo. Memakai updateOrCreate pada
     * `unique_id` supaya dijalankan berulang tidak menggandakan baris.
     */
    private function buatPeraturanBaru(): void
    {
        foreach (self::PERATURAN_BARU as $data) {
            $jenisId = $this->jenisId($data['jenis']);
            $statusId = $this->statusId($data['status']);

            Peraturan::updateOrCreate(
                ['unique_id' => $data['unique_id']],
                [
                    'jenis_peraturan_id' => $jenisId,
                    'nomor' => $data['nomor'],
                    'tahun' => (int) $data['tahun'],
                    'judul' => $data['judul'],
                    'status_id' => $statusId,
                    'tempat_penetapan' => str_starts_with($data['jenis'], 'PERDA') ? 'Denpasar' : 'Jakarta',
                    'tanggal_penetapan' => $data['tanggal_penetapan'],
                    'tanggal_pengundangan' => $data['tanggal_penetapan'],
                    'tanggal_berlaku' => $data['tanggal_penetapan'],
                    'instansi' => $data['instansi'] ?? $data['lokasi_daerah'] ?? 'Pemerintah Pusat',
                    'lokasi_daerah' => $data['lokasi_daerah'] ?? 'Pemerintah Pusat',
                    'subjek' => $data['subjek'],
                ]
            );

            $this->catatSubjek($data['subjek']);
        }
    }

    /**
     * `lokasi_daerah` dan `subjek` peraturan baru ikut muncul di dropdown filter
     * /regulasi karena endpoint referensi membaca tabel `peraturan`. Untuk
     * subjek, master `subjek_peraturan` juga diisi supaya nilainya tersedia
     * walau peraturan dihapus.
     */
    private function catatSubjek(?string $subjek): void
    {
        if ($subjek === null || $subjek === '') {
            return;
        }

        DB::table('subjek_peraturan')->updateOrInsert(
            ['nama' => $subjek],
            ['deskripsi' => 'Dikhususkan untuk subjek '.mb_strtolower($subjek)]
        );
    }

    private function jenisId(string $kode): int
    {
        $id = DB::table('jenis_peraturan')->where('kode', $kode)->value('id');

        if ($id) {
            return (int) $id;
        }

        return (int) DB::table('jenis_peraturan')->insertGetId([
            'kode' => $kode,
            'nama' => self::JENIS[$kode] ?? $kode,
        ]);
    }

    private function statusId(string $nama): int
    {
        $id = DB::table('status_peraturan')->where('nama_status', $nama)->value('id');

        if ($id) {
            return (int) $id;
        }

        return (int) DB::table('status_peraturan')->insertGetId([
            'nama_status' => $nama,
        ]);
    }
}

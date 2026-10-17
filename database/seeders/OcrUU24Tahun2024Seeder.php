<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUU24Tahun2024Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "undang-undang-24-2024",
    "tipe_peraturan": "UU",
    "judul": "Undang-undang (UU) Nomor 24 Tahun 2024 tentang Kabupaten Tapanuli Selatan di Provinsi Sumatera Utara",
    "tahun": "2024",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "02 Juli 2024",
    "tanggal_pengundangan": "02 Juli 2024",
    "tanggal_berlaku": "02 Juli 2024",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "UUDrt No. 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara; Ketentuan yang mengatur mengenai Kabupaten Tapanuli Selatan dalam Undang-Undang Darurat Nomor 7 Tahun 1956, dicabut dan dinyatakan tidak berlaku.",
    "diubah_dengan": "",
    "mengubah": "",
    "sumber_dokumen": "undang-undang_nomor_24_tahun_2024_tentang_kabupaten_tapanuli_selatan_di_provinsi_sumatera_utara.pdf",
    "id_dokumen": "undang-undang_nomor_24_tahun_2024_tentang_kabupaten_tapanuli_selatan_di_provinsi_sumatera_utara",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 8,
    "total_chunk": 27,
    "waktu_eksekusi_detik": 50.35,
    "waktu_proses": "2026-09-17 08:47:37",
    "subjek": "Otonomi Daerah dan Pemerintah Daerah"
  },
  "relasi": {
    "dicabut_oleh": [],
    "mencabut": [],
    "diubah_oleh": [],
    "mengubah": [],
    "mencabut_sebagian": [
      "undang-undang-darurat-7-1956"
    ],
    "mengingat": [
      {
        "standard_id": "uud-1945",
        "judul_referensi": "Undang-Undang Dasar 1945",
        "teks_asli": "Pasal 18, Pasal 18A, Pasal 18B ayat (2), Pasal 20, Pasal 21, dan Pasal 22D ayat (2) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
      }
    ],
    "detail_perubahan": []
  },
  "chunks": [
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "a. bahwa Kabupaten Tapanuli Selatan di Provinsi Sumatera Utara merupakan salah satu daerah di wilayah Negara Kesatuan Republik Indonesia yang dibentuk untuk meningkatkan penyelenggaraan pemerintahan dan pembangunan yang efektif sesuai amanat Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nb. bahwa pembangunan Kabupaten Tapanuli Selatan diselenggarakan secara berkelanjutan dalam satu kesatuan wilayah dengan memperhatikan karakteristik daerah untuk mencapai kesejahteraan masyarakat Kabupaten Tapanuli Selatan di Provinsi Sumatera Utara;\nc. bahwa Undang-Undang Darurat Nomor 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara sudah tidak sesuai lagi dengan perkembangan hukum sehingga perlu diganti;\nd. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, huruf b, dan huruf c, perlu membentuk Undang-Undang tentang Kabupaten Tapanuli Selatan di Provinsi Sumatera Utara;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Pasal 18, Pasal 18A, Pasal 18B ayat (2), Pasal 20, Pasal 21, dan Pasal 22D ayat (2) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
    },
    {
      "tipe": "DIKTUM",
      "label": "MEMUTUSKAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Menetapkan : UNDANG-UNDANG TENTANG KABUPATEN TAPANULI SELATAN DI PROVINSI SUMATERA UTARA."
    },
    {
      "tipe": "BAB",
      "label": "BAB I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "KETENTUAN UMUM"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Provinsi Sumatera Utara adalah bagian dari wilayah Negara Kesatuan Republik Indonesia yang dibentuk berdasarkan Undang-Undang Nomor 8 Tahun 2023 tentang Provinsi Sumatera Utara.\n2. Kabupaten Tapanuli Selatan adalah daerah kabupaten yang berada di wilayah Provinsi Sumatera Utara yang dibentuk berdasarkan Undang-Undang Darurat Nomor 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara.\n3. Kecamatan adalah kecamatan yang ada di wilayah Kabupaten Tapanuli Selatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Tanggal 24 November 1956 merupakan tanggal pembentukan Kabupaten Tapanuli Selatan berdasarkan Undang-Undang Darurat Nomor 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara (Lembaran Negara Nomor 58 Tahun 1956, Tambahan Lembaran Negara Nomor 1092)."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "CAKUPAN WILAYAH, BATAS DAERAH, IBU KOTA, DAN KARAKTERISTIK KABUPATEN TAPANULI SELATAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Kabupaten Tapanuli Selatan terdiri atas 15 (lima belas) Kecamatan, yaitu:\na. Kecamatan Angkola Barat;\nb. Kecamatan Batang Toru;\nc. Kecamatan Angkola Timur;\nd. Kecamatan Sipirok;\ne. Kecamatan Saipar Dolok Hole;\nf. Kecamatan Angkola Selatan;\ng. Kecamatan Batang Angkola;\nh. Kecamatan Arse;\ni. Kecamatan Marancar;\nj. Kecamatan Sayur Matinggi;\nk. Kecamatan Aek Bilah;\nl. Kecamatan Muara Batang Toru;\nm. Kecamatan Tano Tombangan Angkola;\nn. Kecamatan Angkola Sangkunur; dan\no. Kecamatan Angkola Muara Tais."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "(1) Kabupaten Tapanuli Selatan mempunyai batas daerah:\na. sebelah utara berbatasan dengan Kabupaten Tapanuli Tengah, Kabupaten Tapanuli Utara, dan Kabupaten Labuhanbatu Utara;\nb. sebelah timur berbatasan dengan Kabupaten Padang Lawas Utara dan Kabupaten Padang Lawas;\nc. sebelah selatan berbatasan dengan Kabupaten Mandailing Natal; dan\nd. sebelah barat berbatasan dengan Samudera Hindia.\n(2) Penegasan batas daerah Kabupaten Tapanuli Selatan secara pasti di lapangan sebagaimana dimaksud pada ayat (1) ditetapkan dengan Peraturan Menteri Dalam Negeri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Ibu kota Kabupaten Tapanuli Selatan berkedudukan di Kecamatan Sipirok."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Kabupaten Tapanuli Selatan memiliki karakteristik, yaitu:\na. kewilayahan dengan ciri geografis utama di dataran tinggi berupa pegunungan dan dataran rendah berupa pesisir, pantai, dan laut, serta memiliki sungai dan daerah aliran sungai;\nb. potensi sumber daya alam Kabupaten Tapanuli Selatan berupa pertanian, kehutanan, perikanan, pertambangan, serta potensi industri dan pariwisata; dan\nc. suku bangsa dan budaya terdiri dari mayoritas suku Batak Angkola yang memiliki karakter religius sekaligus menjunjung tinggi adat istiadat dan kelestarian lingkungan."
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "KETENTUAN PENUTUP"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Ketentuan mengenai susunan dan tata cara penyelenggaraan pemerintahan daerah diatur sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, semua peraturan perundang-undangan yang merupakan peraturan pelaksanaan dari Undang-Undang Darurat Nomor 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara (Lembaran Negara Nomor 58 Tahun 1956, Tambahan Lembaran Negara Nomor 1092), dinyatakan masih tetap berlaku sepanjang tidak bertentangan dengan ketentuan dalam Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, ketentuan yang mengatur mengenai Kabupaten Tapanuli Selatan dalam Undang-Undang Darurat Nomor 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara (Lembaran Negara Nomor 58 Tahun 1956, Tambahan Lembaran Negara Nomor 1092), dicabut dan dinyatakan tidak berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Undang-Undang ini mulai berlaku pada tanggal diundangkan.\nAgar setiap orang mengetahuinya, memerintahkan pengundangan Undang-Undang ini dengan penempatannya dalam Lembaran Negara Republik Indonesia."
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "PENJELASAN UMUM",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PENJELASAN_UMUM",
      "teks": "Pembentukan daerah otonom pada dasarnya merupakan upaya mempercepat terwujudnya tujuan bernegara dalam melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia, memajukan kesejahteraan umum, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia sebagaimana termaktub dalam Pembukaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945. Melalui daerah otonom, Pemerintah Pusat dapat menyerahkan sebagian urusan pemerintahannya untuk dikelola oleh daerah otonom sehingga membantu mempercepat terdistribusinya hak-hak publik bagi masyarakat di daerah.\nDalam rangka mencapai tujuan tersebut dan penyesuaian terhadap dinamika perubahan peraturan perundang-undangan yang mengatur tentang pemerintahan daerah serta peraturan perundang-undangan terkait lainnya, diperlukan upaya untuk menegaskan kembali kedudukan kabupaten, khususnya Kabupaten Tapanuli Selatan dalam kerangka Negara Kesatuan Republik Indonesia, sebagaimana dimaksud dalam ketentuan Pasal 1 ayat (1) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, yang menyatakan “Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik.\"\nKedudukan Kabupaten Tapanuli Selatan sebagai sebuah daerah otonom selama ini didasarkan pada Undang-Undang Darurat Nomor 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara (Lembaran Negara Nomor 58 Tahun 1956, Tambahan Lembaran Negara Nomor 1092). Desain pengaturan Kabupaten Tapanuli Selatan berdasarkan Undang-Undang tersebut masih menggunakan Undang-Undang Dasar Sementara 1950 dan Undang-Undang Nomor 22 Tahun 1948 tentang Penetapan Aturan-Aturan Pokok Mengenai Pemerintahan Sendiri di Daerah-Daerah yang Berhak Mengatur dan Mengurus Rumah Tangganya Sendiri sebagai acuan, yang pada dasarnya tidak relevan lagi dengan dinamika dan perubahan hukum di masyarakat.\nBerkaitan dengan itu, Undang-Undang ini dibentuk untuk mengganti Undang-Undang Darurat Nomor 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten-Kabupaten Dalam Lingkungan Daerah Propinsi Sumatera Utara (Lembaran Negara Nomor 58 Tahun 1956, Tambahan Lembaran Negara Nomor 1092) yang memuat penyempurnaan dasar hukum, penyesuaian cakupan wilayah, penegasan karakteristik, serta sinkronisasi peraturan perundang-undangan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    }
  ]
}
JSON;
        $data = json_decode($jsonContent, true);

        if (!$data || !isset($data['metadata']) || !isset($data['chunks'])) {
            $this->command->error("Format JSON tidak valid atau missing 'metadata'/'chunks'!");
            return;
        }

        DB::beginTransaction();

        try {
            $metadata = $data['metadata'];
            
            // 1. Dapatkan atau Buat Jenis Peraturan
            $rawJenis = strtoupper($metadata['tipe_peraturan'] ?? 'UU');
            $jenisMap = [
                'PERPRES' => 'PERPRES',
                'PERDA' => 'PERDA',
                'UU' => 'UU',
                'UUD' => 'UUD',
                'PP' => 'PP',
                'PERMEN' => 'PERMEN'
            ];
            $jenisLabel = $jenisMap[$rawJenis] ?? $rawJenis;

            $jenisId = DB::table('jenis_peraturan')->where('kode', $jenisLabel)->value('id');
            if (!$jenisId) {
                $namaMap = [
                    'PERPRES' => 'Peraturan Presiden',
                    'PERDA' => 'Peraturan Daerah',
                    'UU' => 'Undang-Undang',
                    'UUD' => 'UUD',
                    'PP' => 'Peraturan Pemerintah',
                    'PERMEN' => 'Peraturan Menteri'
                ];
                $jenisId = DB::table('jenis_peraturan')->insertGetId([
                    'kode' => $jenisLabel,
                    'nama' => $namaMap[$jenisLabel] ?? $jenisLabel
                ]);
            }

            // 2. Dapatkan atau Buat Status Peraturan
            $statusLabel = $metadata['status'] ?? 'Berlaku';
            $statusId = DB::table('status_peraturan')->where('nama_status', $statusLabel)->value('id');
            if (!$statusId) {
                $statusId = DB::table('status_peraturan')->insertGetId([
                    'nama_status' => $statusLabel
                ]);
            }

            // Parse tanggal
            $tglPenetapan = $this->parseDate($metadata['tanggal_penetapan'] ?? null);
            $tglPengundangan = $this->parseDate($metadata['tanggal_pengundangan'] ?? null);
            $tglBerlaku = $this->parseDate($metadata['tanggal_berlaku'] ?? null);

            $nomor = null;
            if (isset($metadata['judul']) && preg_match('/Nomor\s+(\d+)/i', $metadata['judul'], $matches)) {
                $nomor = $matches[1];
            }

            // 2.5 Pastikan master Subjek tersimpan jika ada field subjek
            $subjekNama = !empty($metadata['subjek']) ? trim($metadata['subjek']) : null;
            if ($subjekNama) {
                SubjekPeraturan::firstOrCreate(
                    ['nama' => $subjekNama],
                    ['deskripsi' => 'Dikhususkan untuk subjek ' . strtolower($subjekNama)]
                );
            }

            // Hapus jika sudah pernah ada, untuk mencegah duplikasi (opsional)
            $existingPeraturanId = DB::table('peraturan')->where('unique_id', $metadata['standard_id'])->value('id');
            if ($existingPeraturanId) {
                $this->command->info("Data UU No. 24 Tahun 2024 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
                Peraturan::find($existingPeraturanId)->forceDelete();
            }

            // 3. Masukkan ke tabel peraturan
            $peraturan = Peraturan::create([
                'unique_id' => $metadata['standard_id'] ?? Str::uuid()->toString(),
                'jenis_peraturan_id' => $jenisId,
                'nomor' => $nomor,
                'tahun' => $metadata['tahun'] ?? date('Y'),
                'judul' => $metadata['judul'] ?? 'Tanpa Judul',
                'status_id' => $statusId,
                'tempat_penetapan' => $metadata['tempat_penetapan'] ?? null,
                'tanggal_penetapan' => $tglPenetapan,
                'tanggal_pengundangan' => $tglPengundangan,
                'tanggal_berlaku' => $tglBerlaku,
                'instansi' => $metadata['pemrakarsa'] ?? null,
                'lokasi_daerah' => $metadata['pemrakarsa'] ?? null,
                'subjek' => $subjekNama,
            ]);

            $this->command->info("Peraturan '{$peraturan->judul}' berhasil dimasukkan (Subjek: " . ($subjekNama ?? '-') . ").");

            // 4. Proses chunks
            $chunks = $data['chunks'];
            $this->command->info("Memproses " . count($chunks) . " chunks...");
            
            // Tracking struktur
            $currentBabId = null;
            $currentBagianId = null;
            $activeStrukturId = null; // Menunjuk ke struktur terdalam saat ini
            
            $pasalUrutan = 1;

            foreach ($chunks as $chunk) {
                $tipe = $chunk['tipe'] ?? '';
                $label = $chunk['label'] ?? '';
                $teks = $chunk['teks'] ?? '';
                
                if (in_array($tipe, ['BAB', 'BAGIAN', 'PARAGRAF', 'ATURAN_PERALIHAN', 'ATURAN_TAMBAHAN'])) {
                    $parentId = null;
                    if ($tipe === 'BAGIAN') {
                        $parentId = $currentBabId;
                    } elseif ($tipe === 'PARAGRAF') {
                        $parentId = $currentBagianId;
                    }
                    
                    $strukturId = DB::table('struktur_dokumen')->insertGetId([
                        'peraturan_id' => $peraturan->id,
                        'tipe_struktur' => $tipe,
                        'label' => $label,
                        'judul_struktur' => $teks,
                        'parent_id' => $parentId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    
                    if (in_array($tipe, ['BAB', 'ATURAN_PERALIHAN', 'ATURAN_TAMBAHAN'])) {
                        $currentBabId = $strukturId;
                        $currentBagianId = null; // Reset child saat ada BAB baru
                    } elseif ($tipe === 'BAGIAN') {
                        $currentBagianId = $strukturId;
                    }
                    
                    $activeStrukturId = $strukturId;
                    
                } elseif ($tipe === 'PASAL') {
                    // Extract nomor pasal dari label, contoh: "Pasal 1" -> "1"
                    $nomorPasal = str_ireplace('Pasal ', '', $label);
                    $nomorPasal = trim($nomorPasal);
                    
                    DB::table('pasal')->insert([
                        'peraturan_id' => $peraturan->id,
                        'struktur_id' => $activeStrukturId,
                        'nomor_pasal' => $nomorPasal,
                        'isi_pasal' => $teks,
                        'urutan' => $pasalUrutan++,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            // 5. Proses Relasi (jika ada file yang belum ada, buat draft dummy document)
            if (isset($data['relasi'])) {
                $this->command->info("Memproses relasi dokumen...");
                $relasiMap = [
                    'dicabut_oleh' => 'Dicabut Oleh',
                    'mencabut' => 'Mencabut',
                    'diubah_oleh' => 'Diubah Oleh',
                    'mengubah' => 'Mengubah',
                ];

                foreach ($relasiMap as $jsonKey => $relationName) {
                    if (isset($data['relasi'][$jsonKey]) && is_array($data['relasi'][$jsonKey])) {
                        // Pastikan relasi tipe ini ada di database
                        $relationTypeId = DB::table('relation_types')->where('nama_relasi', $relationName)->value('id');
                        if (!$relationTypeId) {
                            $relationTypeId = DB::table('relation_types')->insertGetId([
                                'nama_relasi' => $relationName
                            ]);
                        }

                        foreach ($data['relasi'][$jsonKey] as $targetStandardId) {
                            if (empty(trim($targetStandardId))) continue;
                            
                            // Cek apakah target dokumen sudah ada
                            $targetPeraturanId = DB::table('peraturan')->where('unique_id', $targetStandardId)->value('id');
                            
                            // Jika belum ada, buat dokumen dummy
                            if (!$targetPeraturanId) {
                                // Ekstrak tahun dari standardId jika memungkinkan (misal: undang-undang-3-1982 -> 1982)
                                $tahunTarget = date('Y');
                                if (preg_match('/-(\d{4})$/', $targetStandardId, $matches)) {
                                    $tahunTarget = $matches[1];
                                }
                                
                                $targetPeraturanId = DB::table('peraturan')->insertGetId([
                                    'unique_id' => $targetStandardId,
                                    'jenis_peraturan_id' => $jenisId, // Default
                                    'nomor' => null,
                                    'tahun' => $tahunTarget,
                                    'judul' => str_replace('-', ' ', Str::title($targetStandardId)),
                                    'status_id' => $statusId,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ]);
                                $this->command->line("  Dibuat dokumen dummy untuk relasi: " . $targetStandardId);
                            }

                            // Insert law relation
                            DB::table('law_relations')->insert([
                                'from_peraturan_id' => $peraturan->id,
                                'relation_type_id' => $relationTypeId,
                                'to_peraturan_id' => $targetPeraturanId,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }

            DB::commit();
            $this->command->info("Seeding UU No. 24 Tahun 2024 selesai!");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error("Terjadi kesalahan: " . $e->getMessage());
        }
    }

    private function parseDate($dateStr)
    {
        if (!$dateStr) return null;
        
        // Misal: "02 November 2020"
        $bulanIndo = [
            'Januari' => '01', 'Februari' => '02', 'Maret' => '03',
            'April' => '04', 'Mei' => '05', 'Juni' => '06',
            'Juli' => '07', 'Agustus' => '08', 'September' => '09',
            'Oktober' => '10', 'November' => '11', 'Desember' => '12'
        ];
        
        $str = str_ireplace(array_keys($bulanIndo), array_values($bulanIndo), $dateStr);
        try {
            return Carbon::createFromFormat('d m Y', $str)->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }
}

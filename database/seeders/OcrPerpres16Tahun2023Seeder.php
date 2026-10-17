<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrPerpres16Tahun2023Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "peraturan-presiden-16-2023",
    "tipe_peraturan": "Perpres",
    "judul": "Peraturan Presiden (Perpres) Nomor 16 Tahun 2023 tentang Perubahan atas Peraturan Presiden Nomor 26 Tahun 2020 tentang Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia",
    "tahun": "2023",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "20 Februari 2023",
    "tanggal_pengundangan": "20 Februari 2023",
    "tanggal_berlaku": "20 Februari 2023",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "",
    "diubah_dengan": "",
    "mengubah": "PERPRES No. 26 Tahun 2020 tentang Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia",
    "sumber_dokumen": "peraturan_presiden_nomor_16_tahun_2023_tentang_perubahan_atas_peraturan_presiden_nomor_26_tahun_2020_tentang_sekretariat.pdf",
    "id_dokumen": "peraturan_presiden_nomor_16_tahun_2023_tentang_perubahan_atas_peraturan_presiden_nomor_26_tahun_2020_tentang_sekretariat",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 4,
    "total_chunk": 7,
    "waktu_eksekusi_detik": 17.59,
    "waktu_proses": "2026-10-02 10:49:34"
  },
  "relasi": {
    "dicabut_oleh": [],
    "mencabut": [],
    "diubah_oleh": [],
    "mengubah": [
      "peraturan-presiden-26-2020"
    ],
    "mencabut_sebagian": [],
    "mengingat": [
      {
        "standard_id": "uud-1945",
        "judul_referensi": "Undang-Undang Dasar 1945",
        "teks_asli": "1. Pasal 4 ayat (1) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
      },
      {
        "standard_id": "undang-undang-17-2014",
        "judul_referensi": "Undang-Undang Nomor 17 Tahun 2014 tentang Majelis Permusyawaratan Rakyat",
        "teks_asli": "2. Undang-Undang Nomor 17 Tahun 2014 tentang Majelis Permusyawaratan Rakyat, Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, dan Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2014 Nomor 182, Tambahan Lembaran Negara Republik Indonesia Nomor 5568) sebagaimana telah beberapa kali diubah, terakhir dengan Undang-Undang Nomor 13 Tahun 2019 tentang Perubahan Ketiga atas Undang-Undang Nomor 17 Tahun 2014 tentang Majelis Permusyawaratan Rakyat, Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, dan Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2019 Nomor 181, Tambahan Lembaran Negara Republik Indonesia Nomor 6396);"
      },
      {
        "standard_id": "peraturan-presiden-26-2020",
        "judul_referensi": "Peraturan Presiden Nomor 26 Tahun 2020 tentang Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia (Lembaran Negara Republik Indonesia Tahun 2020 Nomor 39)",
        "teks_asli": "3. Peraturan Presiden Nomor 26 Tahun 2020 tentang Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia (Lembaran Negara Republik Indonesia Tahun 2020 Nomor 39);"
      }
    ],
    "detail_perubahan": []
  },
  "chunks": [
    {
      "tipe": "PEMBUKAAN",
      "label": "PEMBUKAAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN",
      "teks": "L RESIEN RENN NDSIA ESA NOMOR 16 TAHUN 2023 TENTANG PERUBAHAN ATAS PERATURAN PRESIDEN NOMOR 26 TAHUN 2020 TENTANG SEKRETARIAT JENDERAL DEWAN PERWAKILAN RAKYAT DENGAN RAHMAT TUHAN YANG MAHA ESA PRESIDEN REPUBLIK INDONESIA,"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "Menimbang:\na. bahwa dalam rangka mendukung kelancaran pelaksanaan wewenang dan tugas Dewan Perwakilan Rakyat Republik Indonesia, perlu dilakukan penyempurnaan fungsi Badan Keahlian Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia;\nb. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, perlu menetapkan Peraturan Presiden tentang Perubahan atas Peraturan Presiden Nomor 26 Tahun 2020 tentang Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Mengingat :\n1. Pasal 4 ayat (1) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\n2. Undang-Undang Nomor 17 Tahun 2014 tentang Majelis Permusyawaratan Rakyat, Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, dan Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2014 Nomor 182, Tambahan Lembaran Negara Republik Indonesia Nomor 5568) sebagaimana telah beberapa kali diubah, terakhir dengan Undang-Undang Nomor 13 Tahun 2019 tentang Perubahan Ketiga atas Undang-Undang Nomor 17 Tahun 2014 tentang Majelis Permusyawaratan Rakyat, Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, dan Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2019 Nomor 181, Tambahan Lembaran Negara Republik Indonesia Nomor 6396);\n3. Peraturan Presiden Nomor 26 Tahun 2020 tentang Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia (Lembaran Negara Republik Indonesia Tahun 2020 Nomor 39);"
    },
    {
      "tipe": "DIKTUM",
      "label": "MEMUTUSKAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "MEMUTUSKAN:\nMenctapkan :\nPERATURAN PRESIDEN TENTANG PERUBAHAN ATAS PERATURAN PRESIDEN NOMOR 26 TAHUN 2O2O TENTANG SEKRETARIAT JENDERAL DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA."
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "Pasal I Ketentuan huruf f, huruf g, dan huruf i Pasal 18 diubah dan ketentuan Pasal 18 huruf h dihapus dalam Peraturan Presiden Nomor 26 Tahun 2020 tentang Sekretariat Jenderal Dewan Perwakilan Rakyat Republik Indonesia (Lembaran Negara Republik Indonesia Tahun 2020 Nomor 39) schingga Pasal 18 berbunyi sebagai berikut:"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_pasal_perubahan": "Pasal I",
      "teks": "Pasal 18 Dalam melaksanakan tugas sebagaimana dimaksud dalam Pasal 17, Badan Keahlian menyelenggarakan fungsi:\na. penyusunan rcncana, program, dan anggaran di lingkungan Badan Keahlian;\nb. koordinasi dan pcmbinaan terhadap pelaksanaan tugas unit organisasi di lingkungan Badan Keahlian;\nc. koordinasi dan pembinaan teknis tenaga ahli alat kelengkapan Dewan Perwakilan Rakyat Republik Indonesia;\nL6 5 492 A S6ONO 一\nd. penyiapan rumusan kebijakan dan pelaksanaan dukungan perancangan undang-undang kepada Dewan Perwakilan Rakyat Republik Indonesia;\ne. penyiapan rumusan kebijakan dan pelaksanaan dukungan pemantauan pelaksanaan undang-undang kepada Dewan Perwakilan Rakyat Republik Indonesia;\nf. penyiapan rumusan kebijakan dan pelaksanaan dukungan analisis anggaran kcpada Dcwan Perwakilan Rakyat Republik Indonesia;\ng. penyiapan rumusan kebijakan dan pelaksanaan dukungan analisis akuntabilitas keuangan negara kepada Dewan Perwakilan Rakyat Republik Indonesia;\nh. dihapus;\ni. penyiapan rumusan kebijakan dan pelaksanaan dukungan analisis keparlemenan kepada Dewan Perwakilan Rakyat Republik Indonesia;\nj. pclaksanaan administrasi Badan Kcahlian; dan\nk. pelaporan pelaksanaan tugas dan fungsi kepada pimpinan Dewan Perwakilan Rakyat Republik Indonesia dan Sekretaris Jenderal."
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "Pasal II Peraturan Presiden ini mulai berlaku pada tanggal diundangkan.\nov No 156493 A PRESIEN RESIA gakan pengundangan Peraturan ini dengan penempatannya dalam Lembaran Negara Republik Indonesia.\nDitetapkan di Jakarta pada tanggal 20 Februari 2023 PRESIDEN REPUBLIK INDONESIA, ttd.\nJOKO WIDODO Diundangkan di Jakarta pada tanggal 20 Februari 2023 MENTERI SEKRETARIS NEGARA REPUBLIK INDONESIA, ttd.\nPRATIKNO LEMBARAN NEGARA REPUBLIK INDONESIA TAHUN 2O23 NOMOR 30 Salinan sesuai dengan aslinya KEMENTERIAN SEKRETARIAT NEGARA Bidang Perundang-undangan dministrasi Hukum, Xia Silvanna Djaman 75A"
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
                $this->command->info("Data Perpres No. 16 Tahun 2023 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding Perpres No. 16 Tahun 2023 selesai!");

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

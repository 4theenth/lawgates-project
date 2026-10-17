<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrBadung1Tahun2006Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "peraturan-daerah-kabupaten-badung-1-2006",
    "tipe_peraturan": "Perda",
    "judul": "Peraturan Daerah (Perda) Kabupaten Badung Nomor 1 Tahun 2006 tentang Anggaran Pendapatan Dan Belanja Daerah Tahun Anggaran 2006",
    "tahun": "2006",
    "subjek": "APBD",
    "tempat_penetapan": "Mangupura",
    "tanggal_penetapan": "25 Januari 2006",
    "tanggal_pengundangan": "25 Januari 2006",
    "tanggal_berlaku": "02 Januari 2006",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Kabupaten Badung",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "",
    "diubah_dengan": "",
    "mengubah": "",
    "sumber_dokumen": "peraturan_daerah_kabupaten_badung_nomor_1_tahun_2006_tentang_anggaran_pendapatan_dan_belanja_daerah_tahun_anggaran_2006.pdf",
    "id_dokumen": "peraturan_daerah_kabupaten_badung_nomor_1_tahun_2006_tentang_anggaran_pendapatan_dan_belanja_daerah_tahun_anggaran_2006",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 5,
    "total_chunk": 10,
    "waktu_eksekusi_detik": 0.03,
    "waktu_proses": "2026-10-15 09:42:12"
  },
  "relasi": {
    "dicabut_oleh": [],
    "dicabut_sebagian_oleh": [],
    "mencabut_sebagian": [],
    "mencabut": [],
    "diubah_oleh": [],
    "mengubah": [],
    "mengingat": [
      {
        "standard_id": "undang-undang-69-1958",
        "judul_referensi": "Undang-Undang Nomor 69 Tahun 1958 tentang Pembentukan Daerah - daerah Tingkat II dalam Wilayah Daerah - daerah Tingkat I Bali",
        "teks_asli": "1. Undang-Undang Nomor 69 Tahun 1958 tentang Pembentukan Daerah - daerah Tingkat II dalam Wilayah Daerah - daerah Tingkat I Bali, Nusa Tenggara Barat, dan Nusa Tenggara Timur (Lembaran Negara Republik Indonesia Tahun 1958 Nomor 122, Tambahan Lembaran Negara Republik Indonesia Nomor 1655);"
      },
      {
        "standard_id": "undang-undang-12-1985",
        "judul_referensi": "Undang-Undang Nomor 12 Tahun 1985 tentang Pajak Bumi dan Bangunan (Lembaran Negara Republik Indonesia Tahun 1985 Nomor 68",
        "teks_asli": "2. Undang-Undang Nomor 12 Tahun 1985 tentang Pajak Bumi dan Bangunan (Lembaran Negara Republik Indonesia Tahun 1985 Nomor 68, Tambahan Lembaran Negara Republik Indonesia Nomor 3312), sebagaimana telah diubah dengan Undang-Undang Nomor 12 Tahun 1994 Nomor 62, Tambahan Lembaran Negara Republik Indonesia Nomor 3569);"
      },
      {
        "standard_id": "undang-undang-18-1997",
        "judul_referensi": "Undang-Undang Nomor 18 Tahun 1997 tentang Pajak Daerah dan Retribusi Daerah (Lembaran Negara Republik Indonesia tahun 1997 Nomor 41",
        "teks_asli": "3. Undang-Undang Nomor 18 Tahun 1997 tentang Pajak Daerah dan Retribusi Daerah (Lembaran Negara Republik Indonesia tahun 1997 Nomor 41, Tambahan Lembaran Negara Republik Indonesia Nomor 3695) sebagaimana telah diubah dengan Undang-undang Nomor 34 tahun 2000 (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 246, Tambahan Lembaran Negara Republik Indonesia Nomor 4048);"
      },
      {
        "standard_id": "undang-undang-17-2003",
        "judul_referensi": "Undang-Undang Nomor 17 Tahun 2003 tentang Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2003 Nomor 47",
        "teks_asli": "4. Undang-Undang Nomor 17 Tahun 2003 tentang Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2003 Nomor 47, Tambahan Lembaran Negara Republik Indonesia Nomor 4286);"
      },
      {
        "standard_id": "undang-undang-1-2004",
        "judul_referensi": "Undang-undang Nomor 1 Tahun 2004 tentang Pembendaharaan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 5",
        "teks_asli": "5. Undang-undang Nomor 1 Tahun 2004 tentang Pembendaharaan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 5, Tambahan Lembaran Negara republik Indonesia Nomor 4355);"
      },
      {
        "standard_id": "undang-undang-10-2004",
        "judul_referensi": "Undang-Undang Nomor 10 Tahun 2004 tentang Pembentukan Peraturan Perundang-undangan (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 53",
        "teks_asli": "6. Undang-Undang Nomor 10 Tahun 2004 tentang Pembentukan Peraturan Perundang-undangan (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 53, Tambahan Lembaran Negara Republik Indonesia Nomor 4389);"
      },
      {
        "standard_id": "undang-undang-15-2004",
        "judul_referensi": "Undang-Undang Nomor 15 Tahun 2004 tentang Pemeriksaan Pengelolaan dan Pertanggungjawaban Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 66",
        "teks_asli": "7. Undang-Undang Nomor 15 tahun 2004 tentang Pemeriksaan Pengelolaan dan Pertanggungjawaban Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 66, Tambahan Lembaran Negara republik Indonesia Nomor 4400);"
      },
      {
        "standard_id": "undang-undang-tahun-None",
        "judul_referensi": "Undang-Undang Nomor Tahun tentang Sistem Perencanaan Pembangunan Nasional ( Lembaran Negara republik Indonesia Tahun 2004 Nomor 104",
        "teks_asli": "8. Undang-Undang Nomor Tahun tentang Sistem Perencanaan Pembangunan Nasional ( Lembaran Negara republik Indonesia Tahun 2004 Nomor 104, Tambahan Lembaran Negara Republik Indonesia Nomor 4421);"
      },
      {
        "standard_id": "undang-undang-32-2004",
        "judul_referensi": "Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 125",
        "teks_asli": "9. Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 125, Tambahan Lembaran Negara Republik Indonesia Nomor 4437);"
      },
      {
        "standard_id": "undang-undang-33-2004",
        "judul_referensi": "Undang-Undang Nomor 33 Tahun 2004 tentang Perimbangan Keuangan antara Pemerintah Pusat dan Pemerintah Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 126",
        "teks_asli": "10. Undang-Undang Nomor 33 Tahun 2004 tentang Perimbangan Keuangan antara Pemerintah Pusat dan Pemerintah Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 126, Tambahan Lembaran Negara Republik Indonesia Nomor 4438);"
      },
      {
        "standard_id": "peraturan-pemerintah-104-2000",
        "judul_referensi": "Peraturan Pemerintah Nomor 104 Tahun 2000 tentang Dana Perimbangan (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 201",
        "teks_asli": "11. Peraturan Pemerintah Nomor 104 Tahun 2000 tentang Dana Perimbangan (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 201, Tambahan Lembaran Negara Republik Indonesia Nomor 4021);"
      },
      {
        "standard_id": "peraturan-pemerintah-105-2000",
        "judul_referensi": "Peraturan Pemerintah Nomor 105 Tahun 2000 tentang Pengelolaan dan Pertanggungjawaban Keuangan Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 202",
        "teks_asli": "12. Peraturan Pemerintah Nomor 105 Tahun 2000 tentang Pengelolaan dan Pertanggungjawaban Keuangan Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 202, Tambahan Lembaran Negara Republik Indonesia Nomor 4022);"
      },
      {
        "standard_id": "peraturan-pemerintah-108-2000",
        "judul_referensi": "Peraturan Pemerintah Nomor 108 Tahun 2000 tentang Tata Cara Pertanggungjawaban Kepala Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 209",
        "teks_asli": "13. Peraturan Pemerintah Nomor 108 Tahun 2000 tentang Tata Cara Pertanggungjawaban Kepala Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 209, Tambahan Lembaran Negara Republik Indonesia Nomor 4027);"
      },
      {
        "standard_id": "peraturan-pemerintah-109-2000",
        "judul_referensi": "Peraturan Pemerintah Nomor 109 Tahun 2000 tentang Kedudukan Keuangan Kepala Daerah dan Wakil Kepala Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 210 Tambahan Lembaran Negara Republik Indonesia Nomor 4028)",
        "teks_asli": "14. Peraturan Pemerintah Nomor 109 Tahun 2000 tentang Kedudukan Keuangan Kepala Daerah dan Wakil Kepala Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 210 Tambahan Lembaran Negara Republik Indonesia Nomor 4028);"
      },
      {
        "standard_id": "peraturan-pemerintah-65-2001",
        "judul_referensi": "Peraturan Pemerintah Nomor 65 Tahun 2001 tentang Pajak Daerah (Lembaran Negara Republik Indonesia Tahun 2001 Nomor 118",
        "teks_asli": "15. Peraturan Pemerintah Nomor 65 Tahun 2001 tentang Pajak Daerah (Lembaran Negara Republik Indonesia Tahun 2001 Nomor 118, Tambahan Lembaran Negara Republik Indonesia Nomor 4138);"
      },
      {
        "standard_id": "peraturan-pemerintah-66-2001",
        "judul_referensi": "Peraturan Pemerintah Nomor 66 Tahun 2001 tentang Retribusi Daerah (Lembaran Negara Republik Indonesia Tahun 2001 Nomor 119",
        "teks_asli": "16. Peraturan Pemerintah Nomor 66 Tahun 2001 tentang Retribusi Daerah (Lembaran Negara Republik Indonesia Tahun 2001 Nomor 119, Tambahan Lembaran NegaraRepublik Indonesia Nomor 4139);"
      },
      {
        "standard_id": "peraturan-pemerintah-24-2004",
        "judul_referensi": "Peraturan Pemerintah Nomor 24 Tahun 2004 tentang Kedudukan Protokoler dan Keuangan Pimpinan dan Anggota Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 90",
        "teks_asli": "17. Peraturan Pemerintah Nomor 24 Tahun 2004 tentang Kedudukan Protokoler dan Keuangan Pimpinan dan Anggota Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 90, Tambahan Lembaran Negara Republik Indonesia Nomor 4416) sebagaimana telah diubah dengan Peraturan Pemerintah Nomnor 37 Tahun 2005 (Lembaran Negara Republik Indonesia Tahun 2005 Nomor 94, Tambahan Negara Republik Indonesia Nomor 4540);"
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
      "teks": "PERATURAN DAERAH KABUPATEN BADUNG NOMOR   1 TAHUN 2006 TENTANG ANGGARAN PENDAPATAN DAN BELANJA DAERAH TAHUN ANGGARAN 2006 DENGAN RAHMAT TUHAN YANG MAHA ESA BUPATI BADUNG,"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "Menimbang :\na. bahwa berdasarkan Surat Edaran Menteri Dalam Negeri Nomor :\n903/2429/SJ, tanggal 21 September 2005, perihal Pedoman Penyusunan Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2006 dan Pertanggungjawaban Pelaksanaan Anggaran Pendapatan dan Belanja Daerah Tahun 2005 serta sesuai dengan arah dan kebijakan umum Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2006 yang telah disepakati bersama antara Pemerintah Kabupaten Badung dengan Dewan Perwakilan Rakyat Daerah, maka perlu menyusun Anggaran Pendapatan dan Belanja Daerah Kabupaten Badung Tahun Anggaran 2006;\nb. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, perlu membentuk Peraturan Daerah tentang Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2006;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Mengingat :\n1. Undang-Undang Nomor 69 Tahun 1958 tentang Pembentukan Daerah - daerah Tingkat II dalam Wilayah Daerah - daerah Tingkat I Bali, Nusa Tenggara Barat, dan Nusa Tenggara Timur (Lembaran Negara Republik Indonesia Tahun 1958 Nomor 122, Tambahan Lembaran Negara Republik Indonesia Nomor 1655);\n2. Undang-Undang Nomor 12 Tahun 1985 tentang Pajak Bumi dan Bangunan (Lembaran Negara Republik Indonesia Tahun 1985 Nomor 68, Tambahan Lembaran Negara Republik Indonesia Nomor 3312), sebagaimana telah diubah dengan Undang-Undang Nomor 12 Tahun 1994 Nomor 62, Tambahan Lembaran Negara Republik Indonesia Nomor 3569);\n3. Undang-Undang Nomor 18 Tahun 1997 tentang Pajak Daerah dan Retribusi Daerah (Lembaran Negara Republik Indonesia tahun 1997 Nomor 41, Tambahan Lembaran Negara Republik Indonesia Nomor 3695) sebagaimana telah diubah dengan Undang-undang Nomor 34 tahun 2000 (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 246, Tambahan Lembaran Negara Republik Indonesia Nomor 4048);\n4. Undang-Undang Nomor 17 Tahun 2003 tentang Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2003 Nomor 47, Tambahan Lembaran Negara Republik Indonesia Nomor 4286);\n5. Undang-undang Nomor 1 Tahun 2004 tentang Pembendaharaan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 5, Tambahan Lembaran Negara republik Indonesia Nomor 4355);\n6. Undang-Undang Nomor 10 Tahun 2004 tentang Pembentukan Peraturan Perundang-undangan (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 53, Tambahan Lembaran Negara Republik Indonesia Nomor 4389);\n7. Undang-Undang Nomor 15 tahun 2004 tentang Pemeriksaan Pengelolaan dan Pertanggungjawaban Keuangan Negara (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 66, Tambahan Lembaran Negara republik Indonesia Nomor 4400);\n8. Undang-Undang Nomor Tahun tentang Sistem Perencanaan Pembangunan Nasional ( Lembaran Negara republik Indonesia Tahun 2004 Nomor 104, Tambahan Lembaran Negara Republik Indonesia Nomor 4421);\n9. Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 125, Tambahan Lembaran Negara Republik Indonesia Nomor 4437);\n10. Undang-Undang Nomor 33 Tahun 2004 tentang Perimbangan Keuangan antara Pemerintah Pusat dan Pemerintah Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 126, Tambahan Lembaran Negara Republik Indonesia Nomor 4438);\n11. Peraturan Pemerintah Nomor 104 Tahun 2000 tentang Dana Perimbangan (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 201, Tambahan Lembaran Negara Republik Indonesia Nomor 4021);\n12. Peraturan Pemerintah Nomor 105 Tahun 2000 tentang Pengelolaan dan Pertanggungjawaban Keuangan Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 202, Tambahan Lembaran Negara Republik Indonesia Nomor 4022);\n13. Peraturan Pemerintah Nomor 108 Tahun 2000 tentang Tata Cara Pertanggungjawaban Kepala Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 209, Tambahan Lembaran Negara Republik Indonesia Nomor 4027);\n14. Peraturan Pemerintah Nomor 109 Tahun 2000 tentang Kedudukan Keuangan Kepala Daerah dan Wakil Kepala Daerah (Lembaran Negara Republik Indonesia Tahun 2000 Nomor 210 Tambahan Lembaran Negara Republik Indonesia Nomor 4028);\n15. Peraturan Pemerintah Nomor 65 Tahun 2001 tentang Pajak Daerah (Lembaran Negara Republik Indonesia Tahun 2001 Nomor 118, Tambahan Lembaran Negara Republik Indonesia Nomor 4138);\n16. Peraturan Pemerintah Nomor 66 Tahun 2001 tentang Retribusi Daerah (Lembaran Negara Republik Indonesia Tahun 2001 Nomor 119, Tambahan Lembaran NegaraRepublik Indonesia Nomor 4139);\n17. Peraturan Pemerintah Nomor 24 Tahun 2004 tentang Kedudukan Protokoler dan Keuangan Pimpinan dan Anggota Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 90, Tambahan Lembaran Negara Republik Indonesia Nomor 4416) sebagaimana telah diubah dengan Peraturan Pemerintah Nomnor 37 Tahun 2005 (Lembaran Negara Republik Indonesia Tahun 2005 Nomor 94, Tambahan Negara Republik Indonesia Nomor 4540);\n18. Keputusan Menteri Dalam Negeri Nomor 29 Tahun 2002 tentang Pedoman Pengurusan, Pertanggungjawaban dan Pengawasan Keuangan Daerah serta Tata Cara Penyusunan Anggaran Pendapatan dan Belanja Daerah, Pelaksanaan Tata Usaha Keuangan Daerah dan Penyusunan Perhitungan Anggaran Pendapatan dan Belanja Daerah Dengan Persetujuan Bersama DEWAN PERWAKILAN RAKYAT DAERAH KABUPATEN BADUNG Dan BUPATI BADUNG"
    },
    {
      "tipe": "DIKTUM",
      "label": "MEMUTUSKAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "MEMUTUSKAN :"
    },
    {
      "tipe": "DIKTUM",
      "label": "MENETAPKAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Menetapkan :\nPERATURAN DAERAH TENTANG PENETAPAN ANGGARAN PENDAPATAN DAN BELANJA DAERAH TAHUN ANGGARAN 2005"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 1 (1) Anggaran Pendapatan Daerah Kabupaten Badung Tahun Anggaran 2006 sebesar Rp 535.169.309.784,00 (2) Anggaran Belanja Daerah Kabupaten Badung Tahun Anggaran 2006 berjumlah Rp 615.640.278.363,00 dengan rincian sebagai berikut :\na. Belanja Aparatur sebesar Rp 124.129.867.996,00 Yang terdiri dari :\na.1. Belanja Administrasi Umum Rp   65.457.700.824,00 a.2. Belanja Operasional dan Pemeliharaan Rp   14.565.021.870,00 a.3. Belanja Modal Rp   44.107.145.302,00\nb. Belanja Pelayanan Publik sebesar Rp 491.510.410.367,00 Yang terdiri dari :\nb.1. Belanja Administrasi Umum Rp 272.385.665.978,00 b.2. Belanja Operasional dan Pemeliharaan Rp   51.938.236.507,00 b.3. Belanja Modal Rp   65.973.468.468,00 b.4. Belanja Bantuan Keuangan dan Bagi Hasil Rp   99.782.356.515,00 b.5. Belanja Tidak Tersangka Rp     1.430.682.899,00 Defisit Anggaran sebesar Rp   80.470.968.579,00 (3) Pembiayaan terdiri dari :\na. Penerimaan Daerah Tahun Anggaran 2005 sebesar  Rp   97.764.589.079,00\nb. Pengeluaran Daerah Tahun Anggaran 2005 sebesar Rp   17.293.620.500,00"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 2 (1)  Uraian lebih lanjut Anggaran Pendapatan dan Belanja daerah sebagimana dimaksud dalam Pasal 1, tercantum dalam lampiran-lampiran Peraturan Daerah  yang terdiri dari :\na. Lampiran I : Ringkasan Anggaran Pendapatan dan Belanja Daerah\nb. Lampiran II : Rincian Anggaran Pendapatan dan Belanja Daerah\nc. Lampiran III : Daftar Rekapitulasi APBD Menurut Bidang-bidang Pemerintahan dan Unit Organisasi Perangkat Daerah\nd. Lampiran IV : Daftar Piutang Daerah\ne. Lampiran V : Daftar Pinjaman Daerah\nf. Lampiran VI : Daftar Investasi (Penyertaan Modal) Daerah.\ng. Lampiaran VII : Daftar Ringkasan Nilai Aktiva Tetap daerah;\nh. Lampiran VIII : Daftar Dana Cadangan\ni. Lampiran IX : Daftar Jumlah Pegawai per golongan dan perjabatan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 3 Lampiran-lampiran sebagaimana tersebut pada Pasal 2 merupakan bagian yang tidak terpisahkan dari Peraturan Daerah ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 4 Sebagaimana Landasan Operasional pelaksanaan, Bupati menetapkan Peraturan Bupati tentang Penjabaran Anggaran Pendapatan dan Belanja Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 5 Peraturan Daerah ini mulai berlaku pada tanggal 2 Januari 2006.\nAgar setiap orang dapat mengetahuinya memerintahkan pengundangan Peraturan Daerah ini dengan penempatannya dalam Lembaran Daerah Kabupaten Badung.\nDitetapkan di  :\nBadung Pada tanggal  :\n25 Januari 2006 PENJABAT BUPATI BADUNG, ttd ANAK AGUNG GDE AGUNG Diundangkan : di Badung Pada tanggal  : 25 Januari 2005 SEKRETARIS DAERAH KABUPATEN BADUNG td \\ I WAYAN SUBAWA LEMBARAN DAERAH KABUPATEN BADUNG TAHUN 2006 NOMOR 1"
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
                $this->command->info("Data Perda Badung No. 1 Tahun 2006 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
                
                if (in_array($tipe, ['BAB', 'BAGIAN', 'PARAGRAF'])) {
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
                    
                    if ($tipe === 'BAB') {
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
            $this->command->info("Seeding Perda Badung No. 1 Tahun 2006 selesai!");

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

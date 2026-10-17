<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUU40Tahun2007Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "undang-undang-40-2007",
    "tipe_peraturan": "UU",
    "judul": "Undang-undang (UU) Nomor 40 Tahun 2007 tentang Perseroan Terbatas",
    "tahun": "2007",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "16 Agustus 2007",
    "tanggal_pengundangan": "16 Agustus 2007",
    "tanggal_berlaku": "16 Agustus 2007",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "UU No. 1 Tahun 1995 tentang Perseroan Terbatas",
    "mencabut_sebagian": "",
    "diubah_dengan": "UU No. 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang; PERPU No. 2 Tahun 2022 tentang Cipta Kerja; UU No. 11 Tahun 2020 tentang Cipta Kerja",
    "mengubah": "",
    "sumber_dokumen": "undang-undang_nomor_40_tahun_2007_tentang_perseroan_terbatas.pdf",
    "id_dokumen": "undang-undang_nomor_40_tahun_2007_tentang_perseroan_terbatas",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 140,
    "total_chunk": 382,
    "waktu_eksekusi_detik": 542.91,
    "waktu_proses": "2026-09-22 11:52:26",
    "subjek": "Hukum Pidana, Perdata, dan Dagang"
  },
  "relasi": {
    "dicabut_oleh": [],
    "mencabut": [
      "undang-undang-1-1995"
    ],
    "diubah_oleh": [
      "undang-undang-6-2023",
      "peraturan-pemerintah-pengganti-undang-undang-2-2022",
      "undang-undang-11-2020"
    ],
    "mengubah": [],
    "mencabut_sebagian": [],
    "mengingat": [
      {
        "standard_id": "uud-1945",
        "judul_referensi": "Undang-Undang Dasar 1945",
        "teks_asli": "Pasal 5 ayat (1), Pasal 20, dan Pasal 33 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
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
      "teks": "UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 40 TAHUN 2007 TENTANG PERSEROAN TERBATAS DENGAN RAHMAT TUHAN YANG MAHA ESA PRESIDEN REPUBLIK INDONESIA"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "a. bahwa perekonomian nasional yang diselenggarakan berdasar atas demokrasi ekonomi dengan prinsip kebersamaan, efisiensi berkeadilan, berkelanjutan, berwawasan lingkungan, kemandirian, serta dengan menjaga keseimbangan kemajuan dan kesatuan ekonomi nasional, perlu didukung oleh kelembagaan perekonomian yang kokoh dalam rangka mewujudkan kesejahteraan masyarakat;\nb. bahwa dalam rangka lebih meningkatkan pembangunan perekonomian nasional dan sekaligus memberikan landasan yang kokoh bagi dunia usaha dalam menghadapi perkembangan perekonomian dunia dan kemajuan ilmu pengetahuan dan teknologi di era globalisasi pada masa mendatang, perlu didukung oleh suatu undang-undang yang mengatur tentang perseroan terbatas yang dapat menjamin terselenggaranya iklim dunia usaha yang kondusif;\nc. bahwa perseroan terbatas sebagai salah satu pilar pembangunan perekonomian nasional perlu diberikan landasan hukum untuk lebih memacu pembangunan nasional yang disusun sebagai usaha bersama berdasar atas asas kekeluargaan;\nd. bahwa Undang-Undang Nomor 1 Tahun 1995 tentang Perseroan Terbatas dipandang sudah tidak sesuai lagi dengan perkembangan hukum dan kebutuhan masyarakat sehingga perlu diganti dengan undang-undang yang baru;\ne. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, huruf b, huruf c, dan huruf d perlu membentuk Undang-Undang tentang Perseroan Terbatas;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Pasal 5 ayat (1), Pasal 20, dan Pasal 33 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
    },
    {
      "tipe": "DIKTUM",
      "label": "MEMUTUSKAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Dengan Persetujuan Bersama DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA dan\n\nMEMUTUSKAN:\n\nMenetapkan : UNDANG-UNDANG TENTANG PERSEROAN TERBATAS."
    },
    {
      "tipe": "BAB",
      "label": "BAB I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB I KETENTUAN UMUM"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Pasal 1 Dalam Undang-Undang ini yang dimaksud dengan:\n1. Perseroan Terbatas, yang selanjutnya disebut Perseroan, adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham dan memenuhi persyaratan yang ditetapkan dalam Undang-Undang ini serta peraturan pelaksanaannya.\n2. Organ Perseroan adalah Rapat Umum Pemegang Saham, Direksi, dan Dewan Komisaris.\n3. Tanggung Jawab Sosial dan Lingkungan adalah komitmen Perseroan untuk berperan serta dalam pembangunan ekonomi berkelanjutan guna meningkatkan kualitas kehidupan dan lingkungan yang bermanfaat, baik bagi Perseroan sendiri, komunitas setempat, maupun masyarakat pada umumnya.\n4. Rapat Umum Pemegang Saham, yang selanjutnya disebut RUPS, adalah Organ Perseroan yang mempunyai wewenang yang tidak diberikan kepada Direksi atau Dewan Komisaris dalam batas yang ditentukan dalam Undang-Undang ini dan/atau anggaran dasar.\n5. Direksi adalah Organ Perseroan yang berwenang dan bertanggung jawab penuh atas pengurusan Perseroan untuk kepentingan Perseroan, sesuai dengan maksud dan tujuan Perseroan serta mewakili Perseroan, baik di dalam maupun di luar pengadilan sesuai dengan ketentuan anggaran dasar.\n6. Dewan Komisaris adalah Organ Perseroan yang bertugas melakukan pengawasan secara umum dan/atau khusus sesuai dengan anggaran dasar serta memberi nasihat kepada Direksi.\n7. Perseroan Terbuka adalah Perseroan Publik atau Perseroan yang melakukan penawaran umum saham, sesuai dengan ketentuan peraturan perundang-undangan di bidang pasar modal.\n8. Perseroan Publik adalah Perseroan yang memenuhi kriteria jumlah pemegang saham dan modal disetor sesuai dengan ketentuan peraturan perundang-undangan di bidang pasar modal.\n9. Penggabungan adalah perbuatan hukum yang dilakukan oleh satu Perseroan atau lebih untuk menggabungkan diri dengan Perseroan lain yang telah ada yang mengakibatkan aktiva dan pasiva dari Perseroan yang menggabungkan diri beralih karena hukum kepada Perseroan yang menerima penggabungan dan selanjutnya status badan hukum Perseroan yang menggabungkan diri berakhir karena hukum.\n10. Peleburan adalah perbuatan hukum yang dilakukan oleh dua Perseroan atau lebih untuk meleburkan diri dengan cara mendirikan satu Perseroan baru yang karena hukum memperoleh aktiva dan pasiva dari Perseroan yang meleburkan diri dan status badan hukum Perseroan yang meleburkan diri berakhir karena hukum.\n11. Pengambilalihan adalah perbuatan hukum yang dilakukan oleh badan hukum atau orang perseorangan untuk mengambil alih saham Perseroan yang mengakibatkan beralihnya pengendalian atas Perseroan tersebut.\n12. Pemisahan adalah perbuatan hukum yang dilakukan oleh Perseroan untuk memisahkan usaha yang mengakibatkan seluruh aktiva dan pasiva Perseroan beralih karena hukum kepada dua Perseroan atau lebih atau sebagian aktiva dan pasiva Perseroan beralih karena hukum kepada satu Perseroan atau lebih.\n13. Surat Tercatat adalah surat yang dialamatkan kepada penerima dan dapat dibuktikan dengan tanda terima dari penerima yang ditandatangani dengan menyebutkan tanggal penerimaan.\n14. Surat Kabar adalah surat kabar harian berbahasa Indonesia yang beredar secara nasional.\n15. Hari adalah hari kalender.\n16. Menteri adalah menteri yang tugas dan tanggung jawabnya di bidang hukum dan hak asasi manusia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Pasal 2 Perseroan harus mempunyai maksud dan tujuan serta kegiatan usaha yang tidak bertentangan dengan ketentuan peraturan perundang-undangan, ketertiban umum, dan/atau kesusilaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Pasal 3 (1) Pemegang saham Perseroan tidak bertanggung jawab secara pribadi atas perikatan yang dibuat atas nama Perseroan dan tidak bertanggung jawab atas kerugian Perseroan melebihi saham yang dimiliki.\n(2) Ketentuan sebagaimana dimaksud pada ayat (1) tidak berlaku apabila:\na. persyaratan Perseroan sebagai badan hukum belum atau tidak terpenuhi;\nb. pemegang saham yang bersangkutan baik langsung maupun tidak langsung dengan itikad buruk memanfaatkan Perseroan untuk kepentingan pribadi;\nc. pemegang saham yang bersangkutan terlibat dalam perbuatan melawan hukum yang dilakukan oleh Perseroan; atau\nd. pemegang saham yang bersangkutan baik langsung maupun tidak langsung secara melawan hukum menggunakan kekayaan Perseroan, yang mengakibatkan kekayaan Perseroan menjadi tidak cukup untuk melunasi utang Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Pasal 4 Terhadap Perseroan berlaku Undang-Undang ini, anggaran dasar Perseroan, dan ketentuan peraturan perundang-undangan lainnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Pasal 5 (1) Perseroan mempunyai nama dan tempat kedudukan dalam wilayah negara Republik Indonesia yang ditentukan dalam anggaran dasar.\n(2) Perseroan mempunyai alamat lengkap sesuai dengan tempat kedudukannya.\n(3) Dalam surat-menyurat, pengumuman yang diterbitkan oleh Perseroan, barang cetakan, dan akta dalam hal Perseroan menjadi pihak harus menyebutkan nama dan alamat lengkap Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Pasal 6 Perseroan didirikan untuk jangka waktu terbatas atau tidak terbatas sebagaimana ditentukan dalam anggaran dasar."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II PENDIRIAN, ANGGARAN DASAR DAN PERUBAHAN ANGGARAN DASAR, DAFTAR PERSEROAN DAN PENGUMUMAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB II",
      "teks": "Bagian Kesatu Pendirian"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 7 (1) Perseroan didirikan oleh 2 (dua) orang atau lebih dengan akta notaris yang dibuat dalam bahasa Indonesia.\n(2) Setiap pendiri Perseroan wajib mengambil bagian saham pada saat Perseroan didirikan.\n(3) Ketentuan sebagaimana dimaksud pada ayat (2) tidak berlaku dalam rangka Peleburan.\n(4) Perseroan memperoleh status badan hukum pada tanggal diterbitkannya Keputusan Menteri mengenai pengesahan badan hukum Perseroan.\n(5) Setelah Perseroan memperoleh status badan hukum dan pemegang saham menjadi kurang dari 2 (dua) orang, dalam jangka waktu paling lama 6 (enam) bulan terhitung sejak keadaan tersebut pemegang saham yang bersangkutan wajib mengalihkan sebagian sahamnya kepada orang lain atau Perseroan mengeluarkan saham baru kepada orang lain.\n(6) Dalam hal jangka waktu sebagaimana dimaksud pada ayat (5) telah dilampaui, pemegang saham tetap kurang dari 2 (dua) orang, pemegang saham bertanggung jawab secara pribadi atas segala perikatan dan kerugian Perseroan, dan atas permohonan pihak yang berkepentingan, pengadilan negeri dapat membubarkan Perseroan tersebut.\n(7) Ketentuan yang mewajibkan Perseroan didirikan oleh 2 (dua) orang atau lebih sebagaimana dimaksud pada ayat (1), dan ketentuan pada ayat (5), serta ayat (6) tidak berlaku bagi :\na. Persero yang seluruh sahamnya dimiliki oleh negara; atau\nb. Perseroan yang mengelola bursa efek, lembaga kliring dan penjaminan, lembaga penyimpanan dan penyelesaian, dan lembaga lain sebagaimana diatur dalam Undang-Undang tentang Pasar Modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 8 (1) Akta pendirian memuat anggaran dasar dan keterangan lain berkaitan dengan pendirian Perseroan.\n(2) Keterangan lain sebagaimana dimaksud pada ayat (1) memuat sekurang-kurangnya :\na. nama lengkap, tempat dan tanggal lahir, pekerjaan, tempat tinggal, dan kewarganegaraan pendiri perseorangan, atau nama, tempat kedudukan dan alamat lengkap serta nomor dan tanggal Keputusan Menteri mengenai pengesahan badan hukum dari pendiri Perseroan;\nb. nama lengkap, tempat dan tanggal lahir, pekerjaan, tempat tinggal, kewarganegaraan anggota Direksi dan Dewan Komisaris yang pertama kali diangkat;\nc. nama pemegang saham yang telah mengambil bagian saham, rincian jumlah saham, dan nilai nominal saham yang telah ditempatkan dan disetor.\n(3) Dalam pembuatan akta pendirian, pendiri dapat diwakili oleh orang lain berdasarkan surat kuasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 9 (1) Untuk memperoleh Keputusan Menteri mengenai pengesahan badan hukum Perseroan sebagaimana dimaksud dalam Pasal 7 ayat (4), pendiri bersama-sama mengajukan permohonan melalui jasa teknologi informasi sistem administrasi badan hukum secara elektronik kepada Menteri dengan mengisi format isian yang memuat sekurang-kurangnya:\na. nama dan tempat kedudukan Perseroan;\nb. jangka waktu berdirinya Perseroan;\nc. maksud dan tujuan serta kegiatan usaha Perseroan;\nd. jumlah modal dasar, modal ditempatkan, dan modal disetor;\ne. alamat lengkap Perseroan.\n(2) Pengisian format isian sebagaimana dimaksud pada ayat (1) harus didahului dengan pengajuan nama Perseroan.\n(3) Dalam hal pendiri tidak mengajukan sendiri permohonan sebagaimana dimaksud pada ayat (1) dan ayat (2), pendiri hanya dapat memberi kuasa kepada notaris.\n(4) Ketentuan lebih lanjut mengenai tata cara pengajuan dan pemakaian nama Perseroan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 10 (1) Permohonan untuk memperoleh Keputusan Menteri sebagaimana dimaksud dalam Pasal 9 ayat (1) harus diajukan kepada Menteri paling lambat 60 (enam puluh) hari terhitung sejak tanggal akta pendirian ditandatangani, dilengkapi keterangan mengenai dokumen pendukung.\n(2) Ketentuan mengenai dokumen pendukung sebagaimana dimaksud pada ayat (1) diatur dengan Peraturan Menteri.\n(3) Apabila format isian sebagaimana dimaksud dalam Pasal 9 ayat (1) dan keterangan mengenai dokumen pendukung sebagaimana dimaksud pada ayat (1) telah sesuai dengan ketentuan peraturan perundang-undangan, Menteri langsung menyatakan tidak berkeberatan atas permohonan yang bersangkutan secara elektronik.\n(4) Apabila format isian sebagaimana dimaksud dalam Pasal 9 ayat (1) dan keterangan mengenai dokumen pendukung sebagaimana dimaksud pada ayat (1) tidak sesuai dengan ketentuan peraturan perundang-undangan, Menteri langsung memberitahukan penolakan beserta alasannya kepada pemohon secara elektronik.\n(5) Dalam jangka waktu paling lambat 30 (tiga puluh) hari terhitung sejak tanggal pernyataan tidak berkeberatan sebagaimana dimaksud pada ayat (3), pemohon yang bersangkutan wajib menyampaikan secara fisik surat permohonan yang dilampiri dokumen pendukung.\n(6) Apabila semua persyaratan sebagaimana dimaksud pada ayat (5) telah dipenuhi secara lengkap, paling lambat 14 (empat belas) hari, Menteri menerbitkan keputusan tentang pengesahan badan hukum Perseroan yang ditandatangani secara elektronik.\n(7) Apabila persyaratan tentang jangka waktu dan kelengkapan dokumen pendukung sebagaimana dimaksud pada ayat (5) tidak dipenuhi, Menteri langsung memberitahukan hal tersebut kepada pemohon secara elektronik, dan pernyataan tidak berkeberatan sebagaimana dimaksud pada ayat (3) menjadi gugur.\n(8) Dalam hal pernyataan tidak berkeberatan gugur, pemohon sebagaimana dimaksud pada ayat (5) dapat mengajukan kembali permohonan untuk memperoleh Keputusan Menteri sebagaimana dimaksud dalam Pasal 9 ayat (1).\n(9) Dalam hal permohonan untuk memperoleh Keputusan Menteri tidak diajukan dalam jangka waktu sebagaimana dimaksud pada ayat (1), akta pendirian menjadi batal sejak lewatnya jangka waktu tersebut dan Perseroan yang belum memperoleh status badan hukum bubar karena hukum dan pemberesannya dilakukan oleh pendiri.\n(10) Ketentuan jangka waktu sebagaimana dimaksud pada ayat (1) berlaku juga bagi permohonan pengajuan kembali."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 11 Ketentuan lebih lanjut mengenai pengajuan permohonan untuk memperoleh Keputusan Menteri sebagaimana dimaksud dalam Pasal 7 ayat (4) bagi daerah tertentu yang belum mempunyai atau tidak dapat digunakan jaringan elektronik diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 12 (1) Perbuatan hukum yang berkaitan dengan kepemilikan saham dan penyetorannya yang dilakukan oleh calon pendiri sebelum Perseroan didirikan, harus dicantumkan dalam akta pendirian.\n(2) Dalam hal perbuatan hukum sebagaimana dimaksud pada ayat (1), dinyatakan dengan akta yang bukan akta otentik, akta tersebut dilekatkan pada akta pendirian.\n(3) Dalam hal perbuatan hukum sebagaimana dimaksud pada ayat (1), dinyatakan dengan akta otentik, nomor, tanggal dan nama serta tempat kedudukan notaris yang membuat akta otentik tersebut disebutkan dalam akta pendirian Perseroan.\n(4) Dalam hal ketentuan sebagaimana dimaksud pada ayat (1), ayat (2), dan ayat (3) tidak dipenuhi, perbuatan hukum tersebut tidak menimbulkan hak dan kewajiban serta tidak mengikat Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 13 (1) Perbuatan hukum yang dilakukan calon pendiri untuk kepentingan Perseroan yang belum didirikan, mengikat Perseroan setelah Perseroan menjadi badan hukum apabila RUPS pertama Perseroan secara tegas menyatakan menerima atau mengambil alih semua hak dan kewajiban yang timbul dari perbuatan hukum yang dilakukan oleh calon pendiri atau kuasanya.\n(2) RUPS pertama sebagaimana dimaksud pada ayat (1) harus diselenggarakan dalam jangka waktu paling lambat 60 (enam puluh) hari setelah Perseroan memperoleh status badan hukum.\n(3) Keputusan RUPS sebagaimana dimaksud pada ayat (2) sah apabila RUPS dihadiri oleh pemegang saham yang mewakili semua saham dengan hak suara dan keputusan disetujui dengan suara bulat.\n(4) Dalam hal RUPS tidak diselenggarakan dalam jangka waktu sebagaimana dimaksud pada ayat (2) atau RUPS tidak berhasil mengambil keputusan sebagaimana dimaksud pada ayat (3), setiap calon pendiri yang melakukan perbuatan hukum tersebut bertanggung jawab secara pribadi atas segala akibat yang timbul.\n(5) Persetujuan RUPS sebagaimana dimaksud pada ayat (2) tidak diperlukan apabila perbuatan hukum tersebut dilakukan atau disetujui secara tertulis oleh semua calon pendiri sebelum pendirian Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 14 (1) Perbuatan hukum atas nama Perseroan yang belum memperoleh status badan hukum, hanya boleh dilakukan oleh semua anggota Direksi bersama-sama semua pendiri serta semua anggota Dewan Komisaris Perseroan dan mereka semua bertanggung jawab secara tanggung renteng atas perbuatan hukum tersebut.\n(2) Dalam hal perbuatan hukum sebagaimana dimaksud pada ayat (1) dilakukan oleh pendiri atas nama Perseroan yang belum memperoleh status badan hukum, perbuatan hukum tersebut menjadi tanggung jawab pendiri yang bersangkutan dan tidak mengikat Perseroan.\n(3) Perbuatan hukum sebagaimana dimaksud pada ayat (1), karena hukum menjadi tanggung jawab Perseroan setelah Perseroan menjadi badan hukum.\n(4) Perbuatan hukum sebagaimana dimaksud pada ayat (2) hanya mengikat dan menjadi tanggung jawab Perseroan setelah perbuatan hukum tersebut disetujui oleh semua pemegang saham dalam RUPS yang dihadiri oleh semua pemegang saham Perseroan.\n(5) RUPS sebagaimana dimaksud pada ayat (4) adalah RUPS pertama yang harus diselenggarakan paling lambat 60 (enam puluh) hari setelah Perseroan memperoleh status badan hukum."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB II",
      "teks": "Bagian Kedua Anggaran Dasar dan Perubahan Anggaran Dasar"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "teks": "Paragraf 1 Anggaran Dasar"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 15 (1) Anggaran dasar sebagaimana dimaksud dalam Pasal 8 ayat (1) memuat sekurang-kurangnya:\na. nama dan tempat kedudukan Perseroan;\nb. maksud dan tujuan serta kegiatan usaha Perseroan;\nc. jangka waktu berdirinya Perseroan;\nd. besarnya jumlah modal dasar, modal ditempatkan, dan modal disetor;\ne. jumlah saham, klasifikasi saham apabila ada berikut jumlah saham untuk tiap klasifikasi, hak-hak yang melekat pada setiap saham, dan nilai nominal setiap saham;\nf. nama jabatan dan jumlah anggota Direksi dan Dewan Komisaris;\ng. penetapan tempat dan tata cara penyelenggaraan RUPS;\nh. tata cara pengangkatan, penggantian, pemberhentian anggota Direksi dan Dewan Komisaris;\ni. tata cara penggunaan laba dan pembagian dividen.\n(2) Selain ketentuan sebagaimana dimaksud pada ayat (1) anggaran dasar dapat juga memuat ketentuan lain yang tidak bertentangan dengan Undang-Undang ini.\n(3) Anggaran dasar tidak boleh memuat:\na. ketentuan tentang penerimaan bunga tetap atas saham; dan\nb. ketentuan tentang pemberian manfaat pribadi kepada pendiri atau pihak lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 16 (1) Perseroan tidak boleh memakai nama yang:\na. telah dipakai secara sah oleh Perseroan lain atau sama pada pokoknya dengan nama Perseroan lain;\nb. bertentangan dengan ketertiban umum dan/atau kesusilaan;\nc. sama atau mirip dengan nama lembaga negara, lembaga pemerintah, atau lembaga internasional, kecuali mendapat izin dari yang bersangkutan;\nd. tidak sesuai dengan maksud dan tujuan, serta kegiatan usaha, atau menunjukkan maksud dan tujuan Perseroan saja tanpa nama diri;\ne. terdiri atas angka atau rangkaian angka, huruf atau rangkaian huruf yang tidak membentuk kata; atau\nf. mempunyai arti sebagai Perseroan, badan hukum, atau persekutuan perdata.\n(2) Nama Perseroan harus didahului dengan frase “Perseroan Terbatas” atau disingkat “PT\".\n(3) Dalam hal Perseroan Terbuka selain berlaku ketentuan sebagaimana dimaksud pada ayat (2), pada akhir nama Perseroan ditambah kata singkatan “Tbk”.\n(4) Ketentuan lebih lanjut mengenai tata cara pemakaian nama Perseroan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 17 (1) Perseroan mempunyai tempat kedudukan di daerah kota atau kabupaten dalam wilayah negara Republik Indonesia yang ditentukan dalam anggaran dasar.\n(2) Tempat kedudukan sebagaimana dimaksud pada ayat (1) sekaligus merupakan kantor pusat Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 18 Perseroan harus mempunyai maksud dan tujuan serta kegiatan usaha yang dicantumkan dalam anggaran dasar Perseroan sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "teks": "Paragraf 2 Perubahan Anggaran Dasar"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 19",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Perubahan anggaran dasar ditetapkan oleh RUPS.\n(2) Acara mengenai perubahan anggaran dasar wajib dicantumkan dengan jelas dalam panggilan RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 20",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Perubahan anggaran dasar Perseroan yang telah dinyatakan pailit tidak dapat dilakukan, kecuali dengan pesetujuan kurator.\n(2) Persetujuan kurator sebagaimana dimaksud pada ayat (1) dilampirkan dalam permohonan persetujuan atau pemberitahuan perubahan anggaran dasar kepada Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 21",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Perubahan anggaran dasar tertentu harus mendapat persetujuan Menteri.\n(2) Perubahan anggaran dasar tertentu sebagaimana dimaksud pada ayat (1) meliputi:\na. nama Perseroan dan/atau tempat kedudukan Perseroan;\nb. maksud dan tujuan serta kegiatan usaha Perseroan;\nc. jangka waktu berdirinya Perseroan;\nd. besarnya modal dasar;\ne. pengurangan modal ditempatkan dan disetor;\ndan/atau\nf. status Perseroan yang tertutup menjadi Perseroan Terbuka atau sebaliknya.\n(3) Perubahan anggaran dasar selain sebagaimana dimaksud pada ayat (2) cukup diberitahukan kepada Menteri.\n(4) Perubahan anggaran dasar sebagaimana dimaksud pada ayat (2) dan ayat (3) dimuat atau dinyatakan dalam akta notaris dalam bahasa Indonesia.\n(5) Perubahan anggaran dasar yang tidak dimuat dalam akta berita acara rapat yang dibuat notaris harus dinyatakan dalam akta notaris paling lambat 30 (tiga puluh) hari terhitung sejak tanggal keputusan RUPS.\n(6) Perubahan anggaran dasar tidak boleh dinyatakan dalam akta notaris setelah lewat batas waktu 30 (tiga puluh) hari sebagaimana dimaksud pada ayat (5).\n(7) Permohonan persetujuan perubahan anggaran dasar sebagaimana dimaksud pada ayat (2) diajukan kepada Menteri, paling lambat 30 (tiga puluh) hari terhitung sejak tanggal akta notaris yang memuat perubahan anggaran dasar.\n(8) Ketentuan sebagaimana dimaksud pada ayat (7) mutatis mutandis berlaku bagi pemberitahuan perubahan anggaran dasar kepada Menteri.\n(9) Setelah lewat batas waktu 30 (tiga puluh) hari sebagaimana dimaksud pada ayat (7) permohonan persetujuan atau pemberitahuan perubahan anggaran dasar tidak dapat diajukan atau disampaikan kepada Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 22",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Permohonan persetujuan perubahan anggaran dasar mengenai perpanjangan jangka waktu berdirinya Perseroan sebagaimana ditetapkan dalam anggaran dasar harus diajukan kepada Menteri paling lambat 60 (enam puluh) hari sebelum jangka waktu berdirinya Perseroan berakhir.\n(2) Menteri memberikan persetujuan atas permohonan perpanjangan jangka waktu sebagaimana dimaksud pada ayat (1) paling lambat pada tanggal terakhir berdirinya Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 23",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Perubahan anggaran dasar sebagaimana dimaksud dalam Pasal 21 ayat (2) mulai berlaku sejak tanggal diterbitkannya Keputusan Menteri mengenai persetujuan perubahan anggaran dasar.\n(2) Perubahan anggaran dasar sebagaimana dimaksud dalam Pasal 21 ayat (3) mulai berlaku sejak tanggal diterbitkannya surat penerimaan pemberitahuan perubahan anggaran dasar oleh Menteri.\n(3) Ketentuan sebagaimana dimaksud pada ayat (1) dan ayat (2) tidak berlaku dalam hal Undang-Undang ini menentukan lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 24",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Perseroan yang modal dan jumlah pemegang sahamnya telah memenuhi kriteria sebagai Perseroan Publik sesuai dengan ketentuan peraturan perundang-undangan di bidang pasar modal, wajib mengubah anggaran dasarnya sebagaimana dimaksud dalam Pasal 21 ayat (2) huruf f dalam jangka waktu 30 (tiga puluh) hari terhitung sejak terpenuhi kriteria tersebut.\n(2) Direksi Perseroan sebagaimana dimaksud pada ayat (1) wajib mengajukan pernyataan pendaftaran sesuai dengan ketentuan peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 25",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Perubahan anggaran dasar mengenai status Perseroan yang tertutup menjadi Perseroan Terbuka mulai berlaku sejak tanggal:\na. efektif pernyataan pendaftaran yang diajukan kepada lembaga pengawas di bidang pasar modal bagi Perseroan Publik; atau\nb. dilaksanakan penawaran umum, bagi Perseroan yang mengajukan pernyataan pendaftaran kepada lembaga pengawas di bidang pasar modal untuk melakukan penawaran umum saham sesuai dengan ketentuan peraturan perundang-undangan di bidang pasar modal.\n(2) Dalam hal pernyataan pendaftaran Perseroan sebagaimana dimaksud pada ayat (1) huruf a tidak menjadi efektif atau Perseroan yang telah mengajukan pernyataan pendaftaran sebagaimana dimaksud pada ayat (1) huruf b tidak melaksanakan penawaran umum saham, Perseroan harus mengubah kembali anggaran dasarnya dalam jangka waktu 6 (enam) bulan setelah tanggal persetujuan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 26",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Perubahan anggaran dasar yang dilakukan dalam rangka Penggabungan atau Pengambilalihan berlaku sejak tanggal:\na. persetujuan Menteri;\nb. kemudian yang ditetapkan dalam persetujuan Menteri; atau\nc. pemberitahuan perubahan anggaran dasar diterima Menteri, atau tanggal kemudian yang ditetapkan dalam akta Penggabungan atau akta Pengambilalihan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 27",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Permohonan persetujuan atas perubahan anggaran dasar sebagaimana dimaksud dalam Pasal 21 ayat (2) ditolak apabila:\na. bertentangan dengan ketentuan mengenai tata cara perubahan anggaran dasar;\nb. isi perubahan bertentangan dengan ketentuan peraturan perundang-undangan, ketertiban umum, dan/atau kesusilaan; atau\nc. terdapat keberatan dari kreditor atas keputusan RUPS mengenai pengurangan modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Kedua > Paragraf 2 > Pasal 28",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Ketentuan mengenai tata cara pengajuan permohonan untuk memperoleh Keputusan Menteri mengenai pengesahan badan hukum Perseroan, dan keberatannya sebagaimana dimaksud dalam Pasal 9, Pasal 10, dan Pasal 11 mutatis mutandis berlaku bagi pengajuan permohonan persetujuan perubahan anggaran dasar dan keberatannya."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Ketiga",
      "parent_bab": "BAB II",
      "teks": "Bagian Ketiga Daftar Perseroan dan Pengumuman"
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Ketiga > Paragraf 1",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 1 Daftar Perseroan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Ketiga > Paragraf 1 > Pasal 29",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Daftar Perseroan diselenggarakan oleh Menteri.\n(2) Daftar Perseroan sebagaimana dimaksud pada ayat (1) memuat data tentang Perseroan yang meliputi:\na. nama dan tempat kedudukan, maksud dan tujuan serta kegiatan usaha, jangka waktu pendirian, dan permodalan;\nb. alamat lengkap Perseroan sebagaimana dimaksud dalam Pasal 5;\nc. nomor dan tanggal akta pendirian dan Keputusan Menteri mengenai pengesahan badan hukum Perseroan sebagaimana dimaksud dalam Pasal 7 ayat (4);\nd. nomor dan tanggal akta perubahan anggaran dasar dan persetujuan Menteri sebagaimana dimaksud dalam Pasal 23 ayat (1);\ne. nomor dan tanggal akta perubahan anggaran dasar dan tanggal penerimaan pemberitahuan oleh Menteri sebagaimana dimaksud dalam Pasal 23 ayat (2);\nf. nama dan tempat kedudukan notaris yang membuat akta pendirian dan akta perubahan anggaran dasar;\ng. nama lengkap dan alamat pemegang saham, anggota Direksi, dan anggota Dewan Komisaris Perseroan;\nh. nomor dan tanggal akta pembubaran atau nomor dan tanggal penetapan pengadilan tentang pembubaran Perseroan yang telah diberitahukan kepada Menteri;\ni. berakhirnya status badan hukum Perseroan;\nj. neraca dan laporan laba rugi dari tahun buku yang bersangkutan bagi Perseroan yang wajib diaudit.\n(3) Data Perseroan sebagaimana dimaksud pada ayat (2) dimasukkan dalam daftar Perseroan pada tanggal yang bersamaan dengan tanggal:\na. Keputusan Menteri mengenai pengesahan badan hukum Perseroan, persetujuan atas perubahan anggaran dasar yang memerlukan persetujuan;\nb. penerimaan pemberitahuan perubahan anggaran dasar yang tidak memerlukan persetujuan; atau\nc. penerimaan pemberitahuan perubahan data Perseroan yang bukan merupakan perubahan anggaran dasar.\n(4) Ketentuan sebagaimana dimaksud pada ayat (2) huruf g mengenai nama lengkap dan alamat pemegang saham Perseroan Terbuka sesuai dengan ketentuan peraturan perundang-undangan di bidang pasar modal.\n(5) Daftar Perseroan sebagaimana dimaksud pada ayat (1) terbuka untuk umum.\n(6) Ketentuan lebih lanjut mengenai daftar Perseroan diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Ketiga > Paragraf 2",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 2 Pengumuman"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB II > Bagian Ketiga > Paragraf 2 > Pasal 30",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Menteri mengumumkan dalam Tambahan Berita Negara Republik Indonesia:\na. akta pendirian Perseroan beserta Keputusan Menteri sebagaimana dimaksud dalam Pasal 7 ayat (4);\nb. akta perubahan anggaran dasar Perseroan beserta Keputusan Menteri sebagaimana dimaksud dalam Pasal 21 ayat (1);\nc. akta perubahan anggaran dasar yang telah diterima pemberitahuannya oleh Menteri.\n(2) Pengumuman sebagaimana dimaksud pada ayat (1) dilakukan oleh Menteri dalam waktu paling lambat 14 (empat belas) hari terhitung sejak tanggal diterbitkannya Keputusan Menteri sebagaimana dimaksud pada ayat (1) huruf a dan huruf b atau sejak diterimanya pemberitahuan sebagaimana dimaksud pada ayat (1) huruf c.\n(3) Ketentuan lebih lanjut mengenai tata cara pengumuman dilaksanakan sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III",
      "teks": "BAB III MODAL DAN SAHAM"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kesatu",
      "parent_bab": "BAB III",
      "teks": "Bagian Kesatu Modal"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kesatu > Pasal 31",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Modal dasar Perseroan terdiri atas seluruh nilai nominal saham.\n(2) Ketentuan sebagaimana dimaksud pada ayat (1) tidak menutup kemungkinan peraturan perundang-undangan di bidang pasar modal mengatur modal Perseroan terdiri atas saham tanpa nilai nominal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kesatu > Pasal 32",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Modal dasar Perseroan paling sedikit Rp 50.000.000,00 (lima puluh juta rupiah).\n(2) Undang-Undang yang mengatur kegiatan usaha tertentu dapat menentukan jumlah minimum modal Perseroan yang lebih besar daripada ketentuan modal dasar sebagaimana dimaksud pada ayat (1).\n(3) Perubahan besarnya modal dasar sebagaimana dimaksud pada ayat (1), ditetapkan dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kesatu > Pasal 33",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Paling sedikit 25% (dua puluh lima persen) dari modal dasar sebagaimana dimaksud dalam Pasal 32 harus ditempatkan dan disetor penuh.\n(2) Modal ditempatkan dan disetor penuh sebagaimana dimaksud pada ayat (1) dibuktikan dengan bukti penyetoran yang sah.\n(3) Pengeluaran saham lebih lanjut yang dilakukan setiap kali untuk menambah modal yang ditempatkan harus disetor penuh."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kesatu > Pasal 34",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Penyetoran atas modal saham dapat dilakukan dalam bentuk uang dan/atau dalam bentuk lainnya.\n(2) Dalam hal penyetoran modal saham dilakukan dalam bentuk lain sebagaimana dimaksud pada ayat (1), penilaian setoran modal saham ditentukan berdasarkan nilai wajar yang ditetapkan sesuai dengan harga pasar atau oleh ahli yang tidak terafiliasi dengan Perseroan.\n(3) Penyetoran saham dalam bentuk benda tidak bergerak harus diumumkan dalam 1 (satu) Surat Kabar atau lebih, dalam jangka waktu 14 (empat belas) hari setelah akta pendirian ditandatangani atau setelah RUPS memutuskan penyetoran saham tersebut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kesatu > Pasal 35",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Pemegang saham dan kreditor lainnya yang mempunyai tagihan terhadap Perseroan tidak dapat menggunakan hak tagihnya sebagai kompensasi kewajiban penyetoran atas harga saham yang telah diambilnya, kecuali disetujui oleh RUPS.\n(2) Hak tagih terhadap Perseroan sebagaimana dimaksud pada ayat (1) yang dapat dikompensasi dengan setoran saham adalah hak tagih atas tagihan terhadap Perseroan yang timbul karena:\na. Perseroan telah menerima uang atau penyerahan benda berwujud atau benda tidak berwujud yang dapat dinilai dengan uang;\nb. pihak yang menjadi penanggung atau penjamin utang Perseroan telah membayar lunas utang Perseroan sebesar yang ditanggung atau dijamin; atau\nc. Perseroan menjadi penanggung atau penjamin utang dari pihak ketiga dan Perseroan telah menerima manfaat berupa uang atau barang yang dapat dinilai dengan uang yang langsung atau tidak langsung secara nyata telah diterima Perseroan.\n(3) Keputusan RUPS sebagaimana dimaksud pada ayat (1) sah apabila dilakukan sesuai dengan ketentuan mengenai panggilan rapat, kuorum, dan jumlah suara untuk perubahan anggaran dasar sebagaimana diatur dalam Undang-Undang ini dan/atau anggaran dasar."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kesatu > Pasal 36",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Perseroan dilarang mengeluarkan saham baik untuk dimiliki sendiri maupun dimiliki oleh Perseroan lain, yang sahamnya secara langsung atau tidak langsung telah dimiliki oleh Perseroan.\n(2) Ketentuan larangan kepemilikan saham sebagaimana dimaksud pada ayat (1) tidak berlaku terhadap kepemilikan saham yang diperoleh berdasarkan peralihan karena hukum, hibah, atau hibah wasiat.\n(3) Saham yang diperoleh berdasarkan ketentuan sebagaimana dimaksud pada ayat (2), dalam jangka waktu 1 (satu) tahun setelah tanggal perolehan harus dialihkan kepada pihak lain yang tidak dilarang memiliki saham dalam Perseroan.\n(4) Dalam hal Perseroan lain sebagaimana dimaksud pada ayat (1) merupakan perusahaan efek, berlaku ketentuan peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kedua",
      "parent_bab": "BAB III",
      "teks": "Bagian Kedua Perlindungan Modal dan Kekayaan Perseroan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kedua > Pasal 37",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Perseroan dapat membeli kembali saham yang telah dikeluarkan dengan ketentuan:\na. pembelian kembali saham tersebut tidak menyebabkan kekayaan bersih Perseroan menjadi lebih kecil dari jumlah modal yang ditempatkan ditambah cadangan wajib yang telah disisihkan; dan\nb. jumlah nilai nominal seluruh saham yang dibeli kembali oleh Perseroan dan gadai saham atau jaminan fidusia atas saham yang dipegang oleh Perseroan sendiri dan/atau Perseroan lain yang sahamnya secara langsung atau tidak langsung dimiliki oleh Perseroan, tidak melebihi 10% (sepuluh persen) dari jumlah modal yang ditempatkan dalam Perseroan, kecuali diatur lain dalam peraturan perundang-undangan di bidang pasar modal.\n(2) Pembelian kembali saham, baik secara langsung maupun tidak langsung, yang bertentangan dengan ayat (1) batal karena hukum.\n(3) Direksi secara tanggung renteng bertanggung jawab atas kerugian yang diderita pemegang saham yang beritikad baik, yang timbul akibat pembelian kembali yang batal karena hukum sebagaimana dimaksud pada ayat (2).\n(4) Saham yang dibeli kembali Perseroan sebagaimana dimaksud pada ayat (1) hanya boleh dikuasai Perseroan paling lama 3 (tiga) tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kedua > Pasal 38",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pembelian kembali saham sebagaimana dimaksud dalam Pasal 37 ayat (1) atau pengalihannya lebih lanjut hanya boleh dilakukan berdasarkan persetujuan RUPS, kecuali ditentukan lain dalam peraturan perundang-undangan di bidang pasar modal.\n(2) Keputusan RUPS yang memuat persetujuan sebagaimana dimaksud pada ayat (1) sah apabila dilakukan sesuai dengan ketentuan mengenai panggilan rapat, kuorum, dan persetujuan jumlah suara untuk perubahan anggaran dasar sebagaimana diatur dalam Undang-Undang ini dan/atau anggaran dasar."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kedua > Pasal 39",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) RUPS dapat menyerahkan kewenangan kepada Dewan Komisaris guna menyetujui pelaksanaan keputusan RUPS sebagaimana dimaksud dalam Pasal 38 untuk jangka waktu paling lama 1 (satu) tahun.\n(2) Penyerahan kewenangan sebagaimana dimaksud pada ayat (1) setiap kali dapat diperpanjang untuk jangka waktu yang sama.\n(3) Penyerahan kewenangan sebagaimana dimaksud pada ayat (1) sewaktu-waktu dapat ditarik kembali oleh RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Kedua > Pasal 40",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Saham yang dikuasai Perseroan karena pembelian kembali, peralihan karena hukum, hibah atau hibah wasiat, tidak dapat digunakan untuk mengeluarkan suara dalam RUPS dan tidak diperhitungkan dalam menentukan jumlah kuorum yang harus dicapai sesuai dengan ketentuan Undang-Undang ini dan/atau anggaran dasar.\n(2) Saham sebagaimana dimaksud pada ayat (1) tidak berhak mendapat pembagian dividen."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Ketiga",
      "parent_bab": "BAB III",
      "teks": "Bagian Ketiga Penambahan Modal"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Ketiga > Pasal 41",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Penambahan modal Perseroan dilakukan berdasarkan persetujuan RUPS.\n(2) RUPS dapat menyerahkan kewenangan kepada Dewan Komisaris guna menyetujui pelaksanaan keputusan RUPS sebagaimana dimaksud pada ayat (1) untuk jangka waktu paling lama 1 (satu) tahun.\n(3) Penyerahan kewenangan sebagaimana dimaksud pada ayat (2) sewaktu-waktu dapat ditarik kembali oleh RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Ketiga > Pasal 42",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Keputusan RUPS untuk penambahan modal dasar adalah sah apabila dilakukan dengan memperhatikan persyaratan kuorum dan jumlah suara setuju untuk perubahan anggaran dasar sesuai dengan ketentuan dalam Undang-Undang ini dan/atau anggaran dasar.\n(2) Keputusan RUPS untuk penambahan modal ditempatkan dan disetor dalam batas modal dasar adalah sah apabila dilakukan dengan kuorum kehadiran lebih dari 1/2 (satu perdua) bagian dari seluruh jumlah saham dengan hak suara dan disetujui oleh lebih dari 1/2 (satu perdua) bagian dari jumlah seluruh suara yang dikeluarkan, kecuali ditentukan lebih besar dalam anggaran dasar.\n(3) Penambahan modal sebagaimana dimaksud pada ayat (2) wajib diberitahukan kepada Menteri untuk dicatat dalam daftar Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Ketiga > Pasal 43",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Seluruh saham yang dikeluarkan untuk penambahan modal harus terlebih dahulu ditawarkan kepada setiap pemegang saham seimbang dengan pemilikan saham untuk klasifikasi saham yang sama.\n(2) Dalam hal saham yang akan dikeluarkan untuk penambahan modal merupakan saham yang klasifikasinya belum pernah dikeluarkan, yang berhak membeli terlebih dahulu adalah seluruh pemegang saham sesuai dengan perimbangan jumlah saham yang dimilikinya.\n(3) Penawaran sebagaimana dimaksud pada ayat (1) tidak berlaku dalam hal pengeluaran saham:\na. ditujukan kepada karyawan Perseroan;\nb. ditujukan kepada pemegang obligasi atau efek lain yang dapat dikonversikan menjadi saham, yang telah dikeluarkan dengan persetujuan RUPS; atau\nc. dilakukan dalam rangka reorganisasi dan/atau restrukturisasi yang telah disetujui oleh RUPS.\n(4) Dalam hal pemegang saham sebagaimana dimaksud pada ayat (1) tidak menggunakan hak untuk membeli dan membayar lunas saham yang dibeli dalam jangka waktu 14 (empat belas) hari terhitung sejak tanggal penawaran, Perseroan dapat menawarkan sisa saham yang tidak diambil bagian tersebut kepada pihak ketiga."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Keempat",
      "parent_bab": "BAB III",
      "teks": "Bagian Keempat Pengurangan Modal"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Keempat > Pasal 44",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Keputusan RUPS untuk pengurangan modal Perseroan adalah sah apabila dilakukan dengan memperhatikan persyaratan ketentuan kuorum dan jumlah suara setuju untuk perubahan anggaran dasar sesuai ketentuan dalam Undang-Undang ini dan/atau anggaran dasar.\n(2) Direksi wajib memberitahukan keputusan sebagaimana dimaksud pada ayat (1) kepada semua kreditor dengan mengumumkan dalam 1 (satu) atau lebih Surat Kabar dalam jangka waktu paling lambat 7 (tujuh) hari terhitung sejak tanggal keputusan RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB III > Bagian Keempat > Pasal 45",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Dalam jangka waktu 60 (enam puluh) hari terhitung sejak tanggal pengumuman sebagaimana dimaksud dalam Pasal 44 ayat (2), kreditor dapat mengajukan keberatan secara tertulis disertai alasannya kepada Perseroan atas keputusan pengurangan modal dengan tembusan kepada Menteri.\n(2) Dalam jangka waktu 30 (tiga puluh) hari terhitung sejak keberatan sebagaimana dimaksud pada ayat (1) diterima, Perseroan wajib memberikan jawaban secara tertulis atas keberatan yang diajukan.\n(3) Dalam hal Perseroan:\na. menolak keberatan atau tidak memberikan penyelesaian yang disepakati kreditor dalam jangka waktu 30 (tiga puluh) hari terhitung sejak tanggal jawaban Perseroan diterima; atau\nb. tidak memberikan tanggapan dalam jangka waktu 60 (enam puluh) hari terhitung sejak tanggal keberatan diajukan kepada Perseroan,\nkreditor dapat mengajukan gugatan ke pengadilan negeri yang daerah hukumnya meliputi tempat kedudukan Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Keempat Pengurangan Modal",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pengurangan modal Perseroan merupakan perubahan anggaran dasar yang harus mendapat persetujuan Menteri.\n(2) Persetujuan Menteri sebagaimana dimaksud pada ayat (1) diberikan apabila:\na. tidak terdapat keberatan tertulis dari kreditor dalam jangka waktu sebagaimana dimaksud dalam Pasal 45 ayat (1);\nb. telah dicapai penyelesaian atas keberatan yang diajukan kreditor; atau\nc. gugatan kreditor ditolak oleh pengadilan berdasarkan putusan yang telah memperoleh kekuatan hukum tetap."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Keempat Pengurangan Modal",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Keputusan RUPS tentang pengurangan modal ditempatkan dan disetor dilakukan dengan cara penarikan kembali saham atau penurunan nilai nominal saham.\n(2) Penarikan kembali saham sebagaimana dimaksud pada ayat (1) dilakukan terhadap saham yang telah dibeli kembali oleh Perseroan atau terhadap saham dengan klasifikasi yang dapat ditarik kembali.\n(3) Penurunan nilai nominal saham tanpa pembayaran kembali harus dilakukan secara seimbang terhadap seluruh saham dari setiap klasifikasi saham.\n(4) Keseimbangan sebagaimana dimaksud pada ayat (3) dapat dikecualikan dengan persetujuan semua pemegang saham yang nilai nominal sahamnya dikurangi.\n(5) Dalam hal terdapat lebih dari 1 (satu) klasifikasi saham, keputusan RUPS tentang pengurangan modal hanya boleh diambil setelah mendapat persetujuan terlebih dahulu dari semua pemegang saham dari setiap klasifikasi saham yang haknya dirugikan oleh keputusan RUPS tentang pengurangan modal tersebut."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima Saham",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Kelima Saham"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Saham Perseroan dikeluarkan atas nama pemiliknya.\n(2) Persyaratan kepemilikan saham dapat ditetapkan dalam anggaran dasar dengan memperhatikan persyaratan yang ditetapkan oleh instansi yang berwenang sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Dalam hal persyaratan kepemilikan saham sebagaimana dimaksud pada ayat (2) telah ditetapkan dan tidak dipenuhi, pihak yang memperoleh kepemilikan saham tersebut tidak dapat menjalankan hak selaku pemegang saham dan saham tersebut tidak diperhitungkan dalam kuorum yang harus dicapai sesuai dengan ketentuan Undang-Undang ini dan/atau anggaran dasar."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Nilai saham harus dicantumkan dalam mata uang rupiah.\n(2) Saham tanpa nilai nominal tidak dapat dikeluarkan.\n(3) Ketentuan sebagaimana dimaksud pada ayat (2) tidak menutup kemungkinan diaturnya pengeluaran saham tanpa nilai nominal dalam peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Direksi Perseroan wajib mengadakan dan menyimpan daftar pemegang saham, yang memuat sekurang-kurangnya:\na. nama dan alamat pemegang saham;\nb. jumlah, nomor, tanggal perolehan saham yang dimiliki pemegang saham, dan klasifikasinya dalam hal dikeluarkan lebih dari satu klasifikasi saham;\nc. jumlah yang disetor atas setiap saham;\nd. nama dan alamat dari orang perseorangan atau badan hukum yang mempunyai hak gadai atas saham atau sebagai penerima jaminan fidusia saham dan tanggal perolehan hak gadai atau tanggal pendaftaran jaminan fidusia tersebut;\ne. keterangan penyetoran saham dalam bentuk lain sebagaimana dimaksud dalam Pasal 34 ayat (2).\n(2) Selain daftar pemegang saham sebagaimana dimaksud pada ayat (1), Direksi Perseroan wajib mengadakan dan menyimpan daftar khusus yang memuat keterangan mengenai saham anggota Direksi dan Dewan Komisaris beserta keluarganya dalam Perseroan dan/atau pada Perseroan lain serta tanggal saham itu diperoleh.\n(3) Dalam daftar pemegang saham dan daftar khusus sebagaimana dimaksud pada ayat (1) dan ayat (2) dicatat juga setiap perubahan kepemilikan saham.\n(4) Daftar pemegang saham dan daftar khusus sebagaimana dimaksud pada ayat (1) dan ayat (2) disediakan di tempat kedudukan Perseroan agar dapat dilihat oleh para pemegang saham.\n(5) Dalam hal peraturan perundang-undangan di bidang pasar modal tidak mengatur lain, ketentuan sebagaimana dimaksud pada ayat (1), ayat (3), dan ayat (4) berlaku juga bagi Perseroan Terbuka."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "Pemegang saham diberi bukti pemilikan saham untuk saham yang dimilikinya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Saham memberikan hak kepada pemiliknya untuk:\na. menghadiri dan mengeluarkan suara dalam RUPS;\nb. menerima pembayaran dividen dan sisa kekayaan hasil likuidasi;\nc. menjalankan hak lainnya berdasarkan Undang-Undang ini.\n(2) Ketentuan sebagaimana dimaksud pada ayat (1) berlaku setelah saham dicatat dalam daftar pemegang saham atas nama pemiliknya.\n(3) Ketentuan sebagaimana dimaksud pada ayat (1) huruf a dan huruf c tidak berlaku bagi klasifikasi saham tertentu sebagaimana ditetapkan dalam Undang-Undang ini.\n(4) Setiap saham memberikan kepada pemiliknya hak yang tidak dapat dibagi.\n(5) Dalam hal 1 (satu) saham dimiliki oleh lebih dari 1 (satu) orang, hak yang timbul dari saham tersebut digunakan dengan cara menunjuk 1 (satu) orang sebagai wakil bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Anggaran dasar menetapkan 1 (satu) klasifikasi saham atau lebih.\n(2) Setiap saham dalam klasifikasi yang sama memberikan kepada pemegangnya hak yang sama.\n(3) Dalam hal terdapat lebih dari 1 (satu) klasifikasi saham, anggaran dasar menetapkan salah satu di antaranya sebagai saham biasa.\n(4) Klasifikasi saham sebagaimana dimaksud pada ayat (3), antara lain:\na. saham dengan hak suara atau tanpa hak suara;\nb. saham dengan hak khusus untuk mencalonkan anggota Direksi dan/atau anggota Dewan Komisaris;\nc. saham yang setelah jangka waktu tertentu ditarik kembali atau ditukar dengan klasifikasi saham lain;\nd. saham yang memberikan hak kepada pemegangnya untuk menerima dividen lebih dahulu dari pemegang saham klasifikasi lain atas pembagian dividen secara kumulatif atau nonkumulatif;\ne. saham yang memberikan hak kepada pemegangnya untuk menerima lebih dahulu dari pemegang saham klasifikasi lain atas pembagian sisa kekayaan Perseroan dalam likuidasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Anggaran dasar dapat menentukan pecahan nilai nominal saham.\n(2) Pemegang pecahan nilai nominal saham tidak diberikan hak suara perseorangan, kecuali pemegang pecahan nilai nominal saham, baik sendiri atau bersama pemegang pecahan nilai nominal saham lainnya yang klasifikasi sahamnya sama memiliki nilai nominal sebesar 1 (satu) nominal saham dari klasifikasi tersebut.\n(3) Ketentuan sebagaimana dimaksud dalam Pasal 52 ayat (4) dan ayat (5) mutatis mutandis berlaku bagi pemegang pecahan nilai nominal saham."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "Dalam anggaran dasar Perseroan ditentukan cara pemindahan hak atas saham sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 56",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Pemindahan hak atas saham dilakukan dengan akta pemindahan hak.\n(2) Akta pemindahan hak sebagaimana dimaksud pada ayat (1) atau salinannya disampaikan secara tertulis kepada Perseroan.\n(3) Direksi wajib mencatat pemindahan hak atas saham, tanggal, dan hari pemindahan hak tersebut dalam daftar pemegang saham atau daftar khusus sebagaimana dimaksud dalam Pasal 50 ayat (1) dan ayat (2) dan memberitahukan perubahan susunan pemegang saham kepada Menteri untuk dicatat dalam daftar Perseroan paling lambat 30 (tiga puluh) hari terhitung sejak tanggal pencatatan pemindahan hak.\n(4) Dalam hal pemberitahuan sebagaimana dimaksud pada ayat (3) belum dilakukan, Menteri menolak permohonan persetujuan atau pemberitahuan yang dilaksanakan berdasarkan susunan dan nama pemegang saham yang belum diberitahukan tersebut.\n(5) Ketentuan mengenai tata cara pemindahan hak atas saham yang diperdagangkan di pasar modal diatur dalam peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 57",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Dalam anggaran dasar dapat diatur persyaratan mengenai pemindahan hak atas saham, yaitu:\na. keharusan menawarkan terlebih dahulu kepada pemegang saham dengan klasifikasi tertentu atau pemegang saham lainnya;\nb. keharusan mendapatkan persetujuan terlebih dahulu dari Organ Perseroan; dan/atau\nc. keharusan mendapatkan persetujuan terlebih dahulu dari instansi yang berwenang sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Persyaratan sebagaimana dimaksud pada ayat (1) tidak berlaku dalam hal pemindahan hak atas saham disebabkan peralihan hak karena hukum, kecuali keharusan sebagaimana dimaksud pada ayat (1) huruf c berkenaan dengan kewarisan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 58",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Dalam hal anggaran dasar mengharuskan pemegang saham penjual menawarkan terlebih dahulu sahamnya kepada pemegang saham klasifikasi tertentu atau pemegang saham lain, dan dalam jangka waktu 30 (tiga puluh) hari terhitung sejak tanggal penawaran dilakukan ternyata pemegang saham tersebut tidak membeli, pemegang saham penjual dapat menawarkan dan menjual sahamnya kepada pihak ketiga.\n(2) Setiap pemegang saham penjual yang diharuskan menawarkan sahamnya sebagaimana dimaksud pada ayat (1) berhak menarik kembali penawaran tersebut, setelah lewatnya jangka waktu 30 (tiga puluh) hari sebagaimana dimaksud pada ayat (1).\n(3) Kewajiban menawarkan kepada pemegang saham klasifikasi tertentu atau pemegang saham lain sebagaimana dimaksud pada ayat (1) hanya berlaku 1 (satu) kali."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 59",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Pemberian persetujuan pemindahan hak atas saham yang memerlukan persetujuan Organ Perseroan atau penolakannya harus diberikan secara tertulis dalam jangka waktu paling lama 90 (sembilan puluh) hari terhitung sejak tanggal Organ Perseroan menerima permintaan persetujuan pemindahan hak tersebut.\n(2) Dalam hal jangka waktu sebagaimana dimaksud pada ayat (1) telah lewat dan Organ Perseroan tidak memberikan pernyataan tertulis, Organ Perseroan dianggap menyetujui pemindahan hak atas saham tersebut.\n(3) Dalam hal pemindahan hak atas saham disetujui oleh Organ Perseroan, pemindahan hak harus dilakukan sesuai dengan ketentuan sebagaimana dimaksud dalam Pasal 56 dan dilakukan dalam jangka waktu paling lama 90 (sembilan puluh) hari terhitung sejak tanggal persetujuan diberikan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 60",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Saham merupakan benda bergerak dan memberikan hak sebagaimana dimaksud dalam Pasal 52 kepada pemiliknya.\n(2) Saham dapat diagunkan dengan gadai atau jaminan fidusia sepanjang tidak ditentukan lain dalam anggaran dasar.\n(3) Gadai saham atau jaminan fidusia atas saham yang telah didaftarkan sesuai dengan ketentuan peraturan perundang-undangan wajib dicatat dalam daftar pemegang saham dan daftar khusus sebagaimana dimaksud dalam Pasal 50.\n(4) Hak suara atas saham yang diagunkan dengan gadai atau jaminan fidusia tetap berada pada pemegang saham."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 61",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Setiap pemegang saham berhak mengajukan gugatan terhadap Perseroan ke pengadilan negeri apabila dirugikan karena tindakan Perseroan yang dianggap tidak adil dan tanpa alasan wajar sebagai akibat keputusan RUPS, Direksi, dan/atau Dewan Komisaris.\n(2) Gugatan sebagaimana dimaksud pada ayat (1) diajukan ke pengadilan negeri yang daerah hukumnya meliputi tempat kedudukan Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 62",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima Saham",
      "teks": "(1) Setiap pemegang saham berhak meminta kepada Perseroan agar sahamnya dibeli dengan harga yang wajar apabila yang bersangkutan tidak menyetujui tindakan Perseroan yang merugikan pemegang saham atau Perseroan, berupa:\na. perubahan anggaran dasar;\nb. pengalihan atau penjaminan kekayaan Perseroan yang mempunyai nilai lebih dari 50 % (lima puluh persen) kekayaan bersih Perseroan; atau\nc. Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan.\n(2) Dalam hal saham yang diminta untuk dibeli sebagaimana dimaksud pada ayat (1) melebihi batas ketentuan pembelian kembali saham oleh Perseroan sebagaimana dimaksud dalam Pasal 37 ayat (1) huruf b, Perseroan wajib mengusahakan agar sisa saham dibeli oleh pihak ketiga."
    },
    {
      "tipe": "BAB",
      "label": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu Rencana Kerja",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "teks": "Bagian Kesatu Rencana Kerja"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 63",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Kesatu Rencana Kerja",
      "teks": "(1) Direksi menyusun rencana kerja tahunan sebelum dimulainya tahun buku yang akan datang.\n(2) Rencana kerja sebagaimana dimaksud pada ayat (1) memuat juga anggaran tahunan Perseroan untuk tahun buku yang akan datang."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 64",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Kesatu Rencana Kerja",
      "teks": "(1) Rencana kerja sebagaimana dimaksud dalam Pasal 63 disampaikan kepada Dewan Komisaris atau RUPS sebagaimana ditentukan dalam anggaran dasar.\n(2) Anggaran dasar dapat menentukan rencana kerja yang disampaikan oleh Direksi sebagaimana dimaksud pada ayat (1) harus mendapat persetujuan Dewan Komisaris atau RUPS, kecuali ditentukan lain dalam peraturan perundang-undangan.\n(3) Dalam hal anggaran dasar menentukan rencana kerja harus mendapat persetujuan RUPS, rencana kerja tersebut terlebih dahulu harus ditelaah Dewan Komisaris."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 65",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Kesatu Rencana Kerja",
      "teks": "(1) Dalam hal Direksi tidak menyampaikan rencana kerja sebagaimana dimaksud dalam Pasal 64, rencana kerja tahun yang lampau diberlakukan.\n(2) Rencana kerja tahun yang lampau berlaku juga bagi Perseroan yang rencana kerjanya belum memperoleh persetujuan sebagaimana ditentukan dalam anggaran dasar atau peraturan perundang-undangan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua Laporan Tahunan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "teks": "Bagian Kedua Laporan Tahunan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 66",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Kedua Laporan Tahunan",
      "teks": "(1) Direksi menyampaikan laporan tahunan kepada RUPS setelah ditelaah oleh Dewan Komisaris dalam jangka waktu paling lambat 6 (enam) bulan setelah tahun buku Perseroan berakhir.\n(2) Laporan tahunan sebagaimana dimaksud pada ayat (1) harus memuat sekurang-kurangnya:\na. laporan keuangan yang terdiri atas sekurang-kurangnya neraca akhir tahun buku yang baru lampau dalam perbandingan dengan tahun buku sebelumnya, laporan laba rugi dari tahun buku yang bersangkutan, laporan arus kas, dan laporan perubahan ekuitas, serta catatan atas laporan keuangan tersebut;\nb. laporan mengenai kegiatan Perseroan;\nc. laporan pelaksanaan Tanggung Jawab Sosial dan Lingkungan;\nd. rincian masalah yang timbul selama tahun buku yang mempengaruhi kegiatan usaha Perseroan;\ne. laporan mengenai tugas pengawasan yang telah dilaksanakan oleh Dewan Komisaris selama tahun buku yang baru lampau;\nf. nama anggota Direksi dan anggota Dewan Komisaris;\ng. gaji dan tunjangan bagi anggota Direksi dan gaji atau honorarium dan tunjangan bagi anggota Dewan Komisaris Perseroan untuk tahun yang baru lampau.\n(3) Laporan keuangan sebagaimana dimaksud pada ayat (2) huruf a disusun berdasarkan standar akuntansi keuangan.\n(4) Neraca dan laporan laba rugi dari tahun buku yang bersangkutan sebagaimana dimaksud pada ayat (2) huruf a bagi Perseroan yang wajib diaudit, harus disampaikan kepada Menteri sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 67",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Kedua Laporan Tahunan",
      "teks": "(1) Laporan tahunan sebagaimana dimaksud dalam Pasal 66 ayat (1) ditandatangani oleh semua anggota Direksi dan semua anggota Dewan Komisaris yang menjabat pada tahun buku yang bersangkutan dan disediakan di kantor Perseroan sejak tanggal panggilan RUPS untuk dapat diperiksa oleh pemegang saham.\n(2) Dalam hal terdapat anggota Direksi atau anggota Dewan Komisaris yang tidak menandatangani laporan tahunan sebagaimana dimaksud pada ayat (1), yang bersangkutan harus menyebutkan alasannya secara tertulis, atau alasan tersebut dinyatakan oleh Direksi dalam surat tersendiri yang dilekatkan dalam laporan tahunan.\n(3) Dalam hal terdapat anggota Direksi atau anggota Dewan Komisaris yang tidak menandatangani laporan tahunan sebagaimana dimaksud pada ayat (1) dan tidak memberi alasan secara tertulis, yang bersangkutan dianggap telah menyetujui isi laporan tahunan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 68",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Kedua Laporan Tahunan",
      "teks": "(1) Direksi wajib menyerahkan laporan keuangan Perseroan kepada akuntan publik untuk diaudit apabila:\na. kegiatan usaha Perseroan adalah menghimpun dan/atau mengelola dana masyarakat;\nb. Perseroan menerbitkan surat pengakuan utang kepada masyarakat;\nc. Perseroan merupakan Perseroan Terbuka;\nd. Perseroan merupakan persero;\ne. Perseroan mempunyai aset dan/atau jumlah peredaran usaha dengan jumlah nilai paling sedikit Rp50.000.000.000,00 (lima puluh miliar rupiah); atau\nf. diwajibkan oleh peraturan perundang-undangan.\n(2) Dalam hal kewajiban sebagaimana dimaksud pada ayat (1) tidak dipenuhi, laporan keuangan tidak disahkan oleh RUPS.\n(3) Laporan atas hasil audit akuntan publik sebagaimana dimaksud pada ayat (1) disampaikan secara tertulis kepada RUPS melalui Direksi.\n(4) Neraca dan laporan laba rugi dari laporan keuangan sebagaimana dimaksud pada ayat (1) huruf a, huruf b, dan huruf c setelah mendapat pengesahan RUPS diumumkan dalam 1 (satu) Surat Kabar.\n(5) Pengumuman neraca dan laporan laba rugi sebagaimana dimaksud pada ayat (4) dilakukan paling lambat 7 (tujuh) hari setelah mendapat pengesahan RUPS.\n(6) Pengurangan besarnya jumlah nilai sebagaimana dimaksud pada ayat (1) huruf e ditetapkan dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 69",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Kedua Laporan Tahunan",
      "teks": "(1) Persetujuan laporan tahunan termasuk pengesahan laporan keuangan serta laporan tugas pengawasan Dewan Komisaris dilakukan oleh RUPS.\n(2) Keputusan atas pengesahan laporan keuangan dan persetujuan laporan tahunan sebagaimana dimaksud pada ayat (1) ditetapkan berdasarkan ketentuan dalam Undang-Undang ini dan/atau anggaran dasar.\n(3) Dalam hal laporan keuangan yang disediakan ternyata tidak benar dan/atau menyesatkan, anggota Direksi dan anggota Dewan Komisaris secara tanggung renteng bertanggung jawab terhadap pihak yang dirugikan.\n(4) Anggota Direksi dan anggota Dewan Komisaris dibebaskan dari tanggung jawab sebagaimana dimaksud pada ayat (3) apabila terbukti bahwa keadaan tersebut bukan karena kesalahannya."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga Penggunaan Laba",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "teks": "Bagian Ketiga Penggunaan Laba"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 70",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Ketiga Penggunaan Laba",
      "teks": "(1) Perseroan wajib menyisihkan jumlah tertentu dari laba bersih setiap tahun buku untuk cadangan.\n(2) Kewajiban penyisihan untuk cadangan sebagaimana dimaksud pada ayat (1) berlaku apabila Perseroan mempunyai saldo laba yang positif.\n(3) Penyisihan laba bersih sebagaimana dimaksud pada ayat (1) dilakukan sampai cadangan mencapai paling sedikit 20 % (dua puluh persen) dari jumlah modal yang ditempatkan dan disetor.\n(4) Cadangan sebagaimana dimaksud pada ayat (1) yang belum mencapai jumlah sebagaimana dimaksud pada ayat (3) hanya boleh dipergunakan untuk menutup kerugian yang tidak dapat dipenuhi oleh cadangan lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 71",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Ketiga Penggunaan Laba",
      "teks": "(1) Penggunaan laba bersih termasuk penentuan jumlah penyisihan untuk cadangan sebagaimana dimaksud dalam Pasal 70 ayat (1) diputuskan oleh RUPS.\n(2) Seluruh laba bersih setelah dikurangi penyisihan untuk cadangan sebagaimana dimaksud dalam Pasal 70 ayat (1) dibagikan kepada pemegang saham sebagai dividen, kecuali ditentukan lain dalam RUPS.\n(3) Dividen sebagaimana dimaksud pada ayat (2) hanya boleh dibagikan apabila Perseroan mempunyai saldo laba yang positif."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 72",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Ketiga Penggunaan Laba",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Perseroan dapat membagikan dividen interim sebelum tahun buku Perseroan berakhir sepanjang diatur dalam anggaran dasar Perseroan.\n(2) Pembagian dividen interim sebagaimana dimaksud pada ayat (1) dapat dilakukan apabila jumlah kekayaan bersih Perseroan tidak menjadi lebih kecil daripada jumlah modal ditempatkan dan disetor ditambah cadangan wajib.\n(3) Pembagian dividen interim sebagaimana dimaksud pada ayat (2) tidak boleh mengganggu atau menyebabkan Perseroan tidak dapat memenuhi kewajibannya pada kreditor atau mengganggu kegiatan Perseroan.\n(4) Pembagian dividen interim ditetapkan berdasarkan keputusan Direksi setelah memperoleh persetujuan Dewan Komisaris, dengan memperhatikan ketentuan pada ayat (2) dan ayat (3).\n(5) Dalam hal setelah tahun buku berakhir ternyata Perseroan menderita kerugian, dividen interim yang telah dibagikan harus dikembalikan oleh pemegang saham kepada Perseroan.\n(6) Direksi dan Dewan Komisaris bertanggung jawab secara tanggung renteng atas kerugian Perseroan, dalam hal pemegang saham tidak dapat mengembalikan dividen interim sebagaimana dimaksud pada ayat (5)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 73",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV RENCANA KERJA, LAPORAN TAHUNAN, DAN PENGGUNAAN LABA",
      "parent_bagian": "Bagian Ketiga Penggunaan Laba",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Dividen yang tidak diambil setelah 5 (lima) tahun terhitung sejak tanggal yang ditetapkan pembayaran dividen lampau, dimasukkan ke dalam cadangan khusus.\n(2) RUPS mengatur tata cara pengambilan dividen yang telah dimasukkan ke dalam cadangan khusus sebagaimana dimaksud pada ayat (1).\n(3) Dividen yang telah dimasukkan dalam cadangan khusus sebagaimana dimaksud pada ayat (1) dan tidak diambil dalam jangka waktu 10 (sepuluh) tahun akan menjadi hak Perseroan."
    },
    {
      "tipe": "BAB",
      "label": "BAB V TANGGUNG JAWAB SOSIAL DAN LINGKUNGAN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB V TANGGUNG JAWAB SOSIAL DAN LINGKUNGAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 74",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V TANGGUNG JAWAB SOSIAL DAN LINGKUNGAN",
      "teks": "(1) Perseroan yang menjalankan kegiatan usahanya di bidang dan/atau berkaitan dengan sumber daya alam wajib melaksanakan Tanggung Jawab Sosial dan Lingkungan.\n(2) Tanggung Jawab Sosial dan Lingkungan sebagaimana dimaksud pada ayat (1) merupakan kewajiban Perseroan yang dianggarkan dan diperhitungkan sebagai biaya Perseroan yang pelaksanaannya dilakukan dengan memperhatikan kepatutan dan kewajaran.\n(3) Perseroan yang tidak melaksanakan kewajiban sebagaimana dimaksud pada ayat (1) dikenai sanksi sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Ketentuan lebih lanjut mengenai Tanggung Jawab Sosial dan Lingkungan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VI RAPAT UMUM PEMEGANG SAHAM"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 75",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) RUPS mempunyai wewenang yang tidak diberikan kepada Direksi atau Dewan Komisaris, dalam batas yang ditentukan dalam Undang-Undang ini dan/atau anggaran dasar.\n(2) Dalam forum RUPS, pemegang saham berhak memperoleh keterangan yang berkaitan dengan Perseroan dari Direksi dan/atau Dewan Komisaris, sepanjang berhubungan dengan mata acara rapat dan tidak bertentangan dengan kepentingan Perseroan.\n(3) RUPS dalam mata acara lain-lain tidak berhak mengambil keputusan, kecuali semua pemegang saham hadir dan/atau diwakili dalam RUPS dan menyetujui penambahan mata acara rapat.\n(4) Keputusan atas mata acara rapat yang ditambahkan harus disetujui dengan suara bulat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 76",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) RUPS diadakan di tempat kedudukan Perseroan atau di tempat Perseroan melakukan kegiatan usahanya yang utama sebagaimana ditentukan dalam anggaran dasar.\n(2) RUPS Perseroan Terbuka dapat diadakan di tempat kedudukan bursa di mana saham Perseroan dicatatkan.\n(3) Tempat RUPS sebagaimana dimaksud pada ayat (1) dan ayat (2) harus terletak di wilayah negara Republik Indonesia.\n(4) Jika dalam RUPS hadir dan/atau diwakili semua pemegang saham dan semua pemegang saham menyetujui diadakannya RUPS dengan agenda tertentu, RUPS dapat diadakan di manapun dengan memperhatikan ketentuan sebagaimana dimaksud pada ayat (3).\n(5) RUPS sebagaimana dimaksud pada ayat (4) dapat mengambil keputusan jika keputusan tersebut disetujui dengan suara bulat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 77",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Selain penyelenggaraan RUPS sebagaimana dimaksud dalam Pasal 76, RUPS dapat juga dilakukan melalui media telekonferensi, video konferensi, atau sarana media elektronik lainnya yang memungkinkan semua peserta RUPS saling melihat dan mendengar secara langsung serta berpartisipasi dalam rapat.\n(2) Persyaratan kuorum dan persyaratan pengambilan keputusan adalah persyaratan sebagaimana diatur dalam Undang-Undang ini dan/atau sebagaimana diatur dalam anggaran dasar Perseroan.\n(3) Persyaratan sebagaimana dimaksud pada ayat (2) dihitung berdasarkan keikutsertaan peserta RUPS sebagaimana dimaksud pada ayat (1).\n(4) Setiap penyelenggaraan RUPS sebagaimana dimaksud pada ayat (1) harus dibuatkan risalah rapat yang disetujui dan ditandatangani oleh semua peserta RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 78",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) RUPS terdiri atas RUPS tahunan dan RUPS lainnya.\n(2) RUPS tahunan wajib diadakan dalam jangka waktu paling lambat 6 (enam) bulan setelah tahun buku berakhir.\n(3) Dalam RUPS tahunan, harus diajukan semua dokumen dari laporan tahunan Perseroan sebagaimana dimaksud dalam Pasal 66 ayat (2).\n(4) RUPS lainnya dapat diadakan setiap waktu berdasarkan kebutuhan untuk kepentingan Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 79",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Direksi menyelenggarakan RUPS tahunan sebagaimana dimaksud dalam Pasal 78 ayat (2) dan RUPS lainnya sebagaimana dimaksud dalam Pasal 78 ayat (4) dengan didahului pemanggilan RUPS.\n(2) Penyelenggaraan RUPS sebagaimana dimaksud pada ayat (1) dapat dilakukan atas permintaan:\na. 1 (satu) orang atau lebih pemegang saham yang bersama-sama mewakili 1/10 (satu persepuluh) atau lebih dari jumlah seluruh saham dengan hak suara, kecuali anggaran dasar menentukan suatu jumlah yang lebih kecil; atau\nb. Dewan Komisaris.\n(3) Permintaan sebagaimana dimaksud pada ayat (2) diajukan kepada Direksi dengan Surat Tercatat disertai alasannya.\n(4) Surat Tercatat sebagaimana dimaksud pada ayat (3) yang disampaikan oleh pemegang saham tembusannya disampaikan kepada Dewan Komisaris.\n(5) Direksi wajib melakukan pemanggilan RUPS dalam jangka waktu paling lambat 15 (lima belas) hari terhitung sejak tanggal permintaan penyelenggaraan RUPS diterima.\n(6) Dalam hal Direksi tidak melakukan pemanggilan RUPS sebagaimana dimaksud pada ayat (5),\na. permintaan penyelenggaraan RUPS sebagaimana dimaksud pada ayat (2) huruf a diajukan kembali kepada Dewan Komisaris; atau\nb. Dewan Komisaris melakukan pemanggilan sendiri RUPS, sebagaimana dimaksud pada ayat (2) huruf b.\n(7) Dewan Komisaris wajib melakukan pemanggilan RUPS sebagaimana dimaksud pada ayat (6) huruf a dalam jangka waktu paling lambat 15 (lima belas) hari terhitung sejak tanggal permintaan penyelenggaraan RUPS diterima.\n(8) RUPS yang diselenggarakan Direksi berdasarkan panggilan RUPS sebagaimana dimaksud pada ayat (5) membicarakan masalah yang berkaitan dengan alasan sebagaimana dimaksud pada ayat (3) dan mata acara rapat lainnya yang dipandang perlu oleh Direksi.\n(9) RUPS yang diselenggarakan Dewan Komisaris berdasarkan panggilan RUPS sebagaimana dimaksud pada ayat (6) huruf b dan ayat (7) hanya membicarakan masalah yang berkaitan dengan alasan sebagaimana dimaksud pada ayat (3).\n(10) Penyelenggaraan RUPS Perseroan Terbuka tunduk pada ketentuan Undang-Undang ini sepanjang ketentuan peraturan perundang-undangan di bidang pasar modal tidak menentukan lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 80",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Dalam hal Direksi atau Dewan Komisaris tidak melakukan pemanggilan RUPS dalam jangka waktu sebagaimana dimaksud dalam Pasal 79 ayat (5) dan ayat (7), pemegang saham yang meminta penyelenggaraan RUPS dapat mengajukan permohonan kepada ketua pengadilan negeri yang daerah hukumnya meliputi tempat kedudukan Perseroan untuk menetapkan pemberian izin kepada pemohon melakukan sendiri pemanggilan RUPS tersebut.\n(2) Ketua pengadilan negeri setelah memanggil dan mendengar pemohon, Direksi dan/atau Dewan Komisaris, menetapkan pemberian izin untuk menyelenggarakan RUPS apabila pemohon secara sumir telah membuktikan bahwa persyaratan telah dipenuhi dan pemohon mempunyai kepentingan yang wajar untuk diselenggarakannya RUPS.\n(3) Penetapan ketua pengadilan negeri sebagaimana dimaksud pada ayat (2) memuat juga ketentuan mengenai:\na. bentuk RUPS, mata acara RUPS sesuai dengan permohonan pemegang saham, jangka waktu pemanggilan RUPS, kuorum kehadiran, dan/atau ketentuan tentang persyaratan pengambilan keputusan RUPS, serta penunjukan ketua rapat, sesuai dengan atau tanpa terikat pada ketentuan Undang-Undang ini atau anggaran dasar; dan/atau\nb. perintah yang mewajibkan Direksi dan/atau Dewan Komisaris untuk hadir dalam RUPS.\n(4) Ketua pengadilan negeri menolak permohonan dalam hal pemohon tidak dapat membuktikan secara sumir bahwa persyaratan telah dipenuhi dan pemohon mempunyai kepentingan yang wajar untuk diselenggarakannya RUPS.\n(5) RUPS sebagaimana dimaksud pada ayat (1) hanya boleh membicarakan mata acara rapat sebagaimana ditetapkan oleh ketua pengadilan negeri.\n(6) Penetapan ketua pengadilan negeri mengenai pemberian izin sebagaimana dimaksud pada ayat (3) bersifat final dan mempunyai kekuatan hukum tetap.\n(7) Dalam hal penetapan ketua pengadilan negeri menolak permohonan sebagaimana dimaksud pada ayat (4), upaya hukum yang dapat diajukan hanya kasasi.\n(8) Ketentuan sebagaimana dimaksud pada ayat (1) berlaku juga bagi Perseroan Terbuka dengan memperhatikan persyaratan pengumuman akan diadakannya RUPS dan persyaratan lainnya untuk penyelenggaraan RUPS sebagaimana diatur dalam peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 81",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Direksi melakukan pemanggilan kepada pemegang saham sebelum menyelenggarakan RUPS.\n(2) Dalam hal tertentu, pemanggilan RUPS sebagaimana dimaksud pada ayat (1) dapat dilakukan oleh Dewan Komisaris atau pemegang saham berdasarkan penetapan ketua pengadilan negeri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 82",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Pemanggilan RUPS dilakukan dalam jangka waktu paling lambat 14 (empat belas) hari sebelum tanggal RUPS diadakan, dengan tidak memperhitungkan tanggal pemanggilan dan tanggal RUPS.\n(2) Pemanggilan RUPS dilakukan dengan Surat Tercatat dan/atau dengan iklan dalam Surat Kabar.\n(3) Dalam panggilan RUPS dicantumkan tanggal, waktu, tempat, dan mata acara rapat disertai pemberitahuan bahwa bahan yang akan dibicarakan dalam RUPS tersedia di kantor Perseroan sejak tanggal dilakukan pemanggilan RUPS sampai dengan tanggal RUPS diadakan.\n(4) Perseroan wajib memberikan salinan bahan sebagaimana dimaksud pada ayat (3) kepada pemegang saham secara cuma-cuma jika diminta.\n(5) Dalam hal pemanggilan tidak sesuai dengan ketentuan sebagaimana dimaksud pada ayat (1) dan ayat (2), dan panggilan tidak sesuai dengan ketentuan ayat (3), keputusan RUPS tetap sah jika semua pemegang saham dengan hak suara hadir atau diwakili dalam RUPS dan keputusan tersebut disetujui dengan suara bulat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 83",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Bagi Perseroan Terbuka, sebelum pemanggilan RUPS dilakukan wajib didahului dengan pengumuman mengenai akan diadakan pemanggilan RUPS dengan memperhatikan peraturan perundang-undangan di bidang pasar modal.\n(2) Pengumuman sebagaimana dimaksud pada ayat (1) dilakukan dalam jangka waktu paling lambat 14 (empat belas) hari sebelum pemanggilan RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 84",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Setiap saham yang dikeluarkan mempunyai satu hak suara, kecuali anggaran dasar menentukan lain.\n(2) Hak suara sebagaimana dimaksud pada ayat (1) tidak berlaku untuk:\na. saham Perseroan yang dikuasai sendiri oleh Perseroan;\nb. saham induk Perseroan yang dikuasai oleh anak perusahaannya secara langsung atau tidak langsung; atau\nc. saham Perseroan yang dikuasai oleh Perseroan lain yang sahamnya secara langsung atau tidak langsung telah dimiliki oleh Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 85",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Pemegang saham, baik sendiri maupun diwakili berdasarkan surat kuasa berhak menghadiri RUPS dan menggunakan hak suaranya sesuai dengan jumlah saham yang dimilikinya.\n(2) Ketentuan sebagaimana dimaksud pada ayat (1) tidak berlaku bagi pemegang saham dari saham tanpa hak suara.\n(3) Dalam pemungutan suara, suara yang dikeluarkan oleh pemegang saham berlaku untuk seluruh saham yang dimilikinya dan pemegang saham tidak berhak memberikan kuasa kepada lebih dari seorang kuasa untuk sebagian dari jumlah saham yang dimilikinya dengan suara yang berbeda.\n(4) Dalam pemungutan suara, anggota Direksi, anggota Dewan Komisaris, dan karyawan Perseroan yang bersangkutan dilarang bertindak sebagai kuasa dari pemegang saham sebagaimana dimaksud pada ayat (1).\n(5) Dalam hal pemegang saham hadir sendiri dalam RUPS, surat kuasa yang telah diberikan tidak berlaku untuk rapat tersebut.\n(6) Ketua rapat berhak menentukan siapa yang berhak hadir dalam RUPS dengan memperhatikan ketentuan Undang-Undang ini dan anggaran dasar Perseroan.\n(7) Terhadap Perseroan Terbuka selain berlaku ketentuan sebagaimana dimaksud pada ayat (3) dan ayat (6) berlaku juga ketentuan peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 86",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) RUPS dapat dilangsungkan jika dalam RUPS lebih dari 1/2 (satu perdua) bagian dari jumlah seluruh saham dengan hak suara hadir atau diwakili, kecuali Undang-Undang dan/atau anggaran dasar menentukan jumlah kuorum yang lebih besar.\n(2) Dalam hal kuorum sebagaimana dimaksud pada ayat (1) tidak tercapai, dapat diadakan pemanggilan RUPS kedua.\n(3) Dalam pemanggilan RUPS kedua harus disebutkan bahwa RUPS pertama telah dilangsungkan dan tidak mencapai kuorum.\n(4) RUPS kedua sebagaimana dimaksud pada ayat (2) sah dan berhak mengambil keputusan jika dalam RUPS paling sedikit 1/3 (satu pertiga) bagian dari jumlah seluruh saham dengan hak suara hadir atau diwakili, kecuali anggaran dasar menentukan jumlah kuorum yang lebih besar.\n(5) Dalam hal kuorum RUPS kedua sebagaimana dimaksud pada ayat (4) tidak tercapai, Perseroan dapat memohon kepada ketua pengadilan negeri yang daerah hukumnya meliputi tempat kedudukan Perseroan atas permohonan Perseroan agar ditetapkan kuorum untuk RUPS ketiga.\n(6) Pemanggilan RUPS ketiga harus menyebutkan bahwa RUPS kedua telah dilangsungkan dan tidak mencapai kuorum dan RUPS ketiga akan dilangsungkan dengan kuorum yang telah ditetapkan oleh ketua pengadilan negeri.\n(7) Penetapan ketua pengadilan negeri mengenai kuorum RUPS sebagaimana dimaksud pada ayat (5) bersifat final dan mempunyai kekuatan hukum tetap.\n(8) Pemanggilan RUPS kedua dan ketiga dilakukan dalam jangka waktu paling lambat 7 (tujuh) hari sebelum RUPS kedua atau ketiga dilangsungkan.\n(9) RUPS kedua dan ketiga dilangsungkan dalam jangka waktu paling cepat 10 (sepuluh) hari dan paling lambat 21 (dua puluh satu) hari setelah RUPS yang mendahuluinya dilangsungkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 87",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Keputusan RUPS diambil berdasarkan musyawarah untuk mufakat.\n(2) Dalam hal keputusan berdasarkan musyawarah untuk mufakat sebagaimana dimaksud pada ayat (1) tidak tercapai, keputusan adalah sah jika disetujui lebih dari 1/2 (satu perdua) bagian dari jumlah suara yang dikeluarkan kecuali Undang-Undang dan/atau anggaran dasar menentukan bahwa keputusan adalah sah jika disetujui oleh jumlah suara setuju yang lebih besar."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 88",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) RUPS untuk mengubah anggaran dasar dapat dilangsungkan jika dalam rapat paling sedikit 2/3 (dua pertiga) bagian dari jumlah seluruh saham dengan hak suara hadir atau diwakili dalam RUPS dan keputusan adalah sah jika disetujui paling sedikit 2/3 (dua pertiga) bagian dari jumlah suara yang dikeluarkan, kecuali anggaran dasar menentukan kuorum kehadiran dan/atau ketentuan tentang pengambilan keputusan RUPS yang lebih besar.\n(2) Dalam hal kuorum kehadiran sebagaimana dimaksud pada ayat (1) tidak tercapai, dapat diselenggarakan RUPS kedua.\n(3) RUPS kedua sebagaimana dimaksud pada ayat (2) sah dan berhak mengambil keputusan jika dalam rapat paling sedikit 3/5 (tiga perlima) bagian dari jumlah seluruh saham dengan hak suara hadir atau diwakili dalam RUPS dan keputusan adalah sah jika disetujui paling sedikit 2/3 (dua pertiga) bagian dari jumlah suara yang dikeluarkan, kecuali anggaran dasar menentukan kuorum kehadiran dan/atau ketentuan tentang pengambilan keputusan RUPS yang lebih besar.\n(4) Ketentuan sebagaimana dimaksud dalam Pasal 86 ayat (5), ayat (6), ayat (7), ayat (8), dan ayat (9) mutatis mutandis berlaku bagi RUPS sebagaimana dimaksud pada ayat (1).\n(5) Ketentuan sebagaimana dimaksud pada ayat (1), ayat (2), dan ayat (3) mengenai kuorum kehadiran dan ketentuan tentang persyaratan pengambilan keputusan RUPS berlaku juga bagi Perseroan Terbuka sepanjang tidak diatur lain dalam peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 89",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) RUPS untuk menyetujui Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan, pengajuan permohonan agar Perseroan dinyatakan pailit, perpanjangan jangka waktu berdirinya, dan pembubaran Perseroan dapat dilangsungkan jika dalam rapat paling sedikit 3/4 (tiga perempat) bagian dari jumlah seluruh saham dengan hak suara hadir atau diwakili dalam RUPS dan keputusan adalah sah jika disetujui paling sedikit 3/4 (tiga perempat) bagian dari jumlah suara yang dikeluarkan, kecuali anggaran dasar menentukan kuorum kehadiran dan/atau ketentuan tentang persyaratan pengambilan keputusan RUPS yang lebih besar.\n(2) Dalam hal kuorum kehadiran sebagaimana dimaksud pada ayat (1) tidak tercapai, dapat diadakan RUPS kedua.\n(3) RUPS kedua sebagaimana dimaksud pada ayat (2) sah dan berhak mengambil keputusan jika dalam rapat paling sedikit 2/3 (dua pertiga) bagian dari jumlah seluruh saham dengan hak suara hadir atau diwakili dalam RUPS dan keputusan adalah sah jika disetujui oleh paling sedikit 3/4 (tiga perempat) bagian dari jumlah suara yang dikeluarkan, kecuali anggaran dasar menentukan kuorum kehadiran dan/atau ketentuan tentang persyaratan pengambilan keputusan RUPS yang lebih besar.\n(4) Ketentuan sebagaimana dimaksud dalam Pasal 86 ayat (5), ayat (6), ayat (7), ayat (8), dan ayat (9) mutatis mutandis berlaku bagi RUPS sebagaimana dimaksud pada ayat (1).\n(5) Ketentuan sebagaimana dimaksud pada ayat (1), ayat (2), dan ayat (3) mengenai kuorum kehadiran dan/atau ketentuan tentang persyaratan pengambilan keputusan RUPS berlaku juga bagi Perseroan Terbuka sepanjang tidak diatur lain dalam peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 90",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "(1) Setiap penyelenggaraan RUPS, risalah RUPS wajib dibuat dan ditandatangani oleh ketua rapat dan paling sedikit 1 (satu) orang pemegang saham yang ditunjuk dari dan oleh peserta RUPS.\n(2) Tanda tangan sebagaimana dimaksud pada ayat (1) tidak disyaratkan apabila risalah RUPS tersebut dibuat dengan akta notaris."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 91",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI RAPAT UMUM PEMEGANG SAHAM",
      "teks": "Pemegang saham dapat juga mengambil keputusan yang mengikat di luar RUPS dengan syarat semua pemegang saham dengan hak suara menyetujui secara tertulis dengan menandatangani usul yang bersangkutan."
    },
    {
      "tipe": "BAB",
      "label": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VII DIREKSI DAN DEWAN KOMISARIS"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu Direksi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "teks": "Bagian Kesatu Direksi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 92",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Direksi menjalankan pengurusan Perseroan untuk kepentingan Perseroan dan sesuai dengan maksud dan tujuan Perseroan.\n(2) Direksi berwenang menjalankan pengurusan sebagaimana dimaksud pada ayat (1) sesuai dengan kebijakan yang dipandang tepat, dalam batas yang ditentukan dalam Undang-Undang ini dan/atau anggaran dasar.\n(3) Direksi Perseroan terdiri atas 1 (satu) orang anggota Direksi atau lebih.\n(4) Perseroan yang kegiatan usahanya berkaitan dengan menghimpun dan/atau mengelola dana masyarakat, Perseroan yang menerbitkan surat pengakuan utang kepada masyarakat, atau Perseroan Terbuka wajib mempunyai paling sedikit 2 (dua) orang anggota Direksi.\n(5) Dalam hal Direksi terdiri atas 2 (dua) anggota Direksi atau lebih, pembagian tugas dan wewenang pengurusan di antara anggota Direksi ditetapkan berdasarkan keputusan RUPS.\n(6) Dalam hal RUPS sebagaimana dimaksud pada ayat (5) tidak menetapkan, pembagian tugas dan wewenang anggota Direksi ditetapkan berdasarkan keputusan Direksi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 93",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Yang dapat diangkat menjadi anggota Direksi adalah orang perseorangan yang cakap melakukan perbuatan hukum, kecuali dalam waktu 5 (lima) tahun sebelum pengangkatannya pernah:\na. dinyatakan pailit;\nb. menjadi anggota Direksi atau anggota Dewan Komisaris yang dinyatakan bersalah menyebabkan suatu Perseroan dinyatakan pailit; atau\nc. dihukum karena melakukan tindak pidana yang merugikan keuangan negara dan/atau yang berkaitan dengan sektor keuangan.\n(2) Ketentuan persyaratan sebagaimana dimaksud pada ayat (1) tidak mengurangi kemungkinan instansi teknis yang berwenang menetapkan persyaratan tambahan berdasarkan peraturan perundang-undangan.\n(3) Pemenuhan persyaratan sebagaimana dimaksud pada ayat (1) dan ayat (2) dibuktikan dengan surat yang disimpan oleh Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 94",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Anggota Direksi diangkat oleh RUPS.\n(2) Untuk pertama kali pengangkatan anggota Direksi dilakukan oleh pendiri dalam akta pendirian sebagaimana dimaksud dalam Pasal 8 ayat (2) huruf b.\n(3) Anggota Direksi diangkat untuk jangka waktu tertentu dan dapat diangkat kembali.\n(4) Anggaran dasar mengatur tata cara pengangkatan, penggantian, dan pemberhentian anggota Direksi dan dapat juga mengatur tentang tata cara pencalonan anggota Direksi.\n(5) Keputusan RUPS mengenai pengangkatan, penggantian, dan pemberhentian anggota Direksi juga menetapkan saat mulai berlakunya pengangkatan, penggantian, dan pemberhentian tersebut.\n(6) Dalam hal RUPS tidak menetapkan saat mulai berlakunya pengangkatan, penggantian, dan pemberhentian anggota Direksi, pengangkatan, penggantian, dan pemberhentian anggota Direksi tersebut mulai berlaku sejak ditutupnya RUPS.\n(7) Dalam hal terjadi pengangkatan, penggantian, dan pemberhentian anggota Direksi, Direksi wajib memberitahukan perubahan anggota Direksi kepada Menteri untuk dicatat dalam daftar Perseroan dalam jangka waktu paling lambat 30 (tiga puluh) hari terhitung sejak tanggal keputusan RUPS tersebut.\n(8) Dalam hal pemberitahuan sebagaimana dimaksud pada ayat (7) belum dilakukan, Menteri menolak setiap permohonan yang diajukan atau pemberitahuan yang disampaikan kepada Menteri oleh Direksi yang belum tercatat dalam daftar Perseroan.\n(9) Pemberitahuan sebagaimana dimaksud pada ayat (8) tidak termasuk pemberitahuan yang disampaikan oleh Direksi baru atas pengangkatan dirinya sendiri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 95",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Pengangkatan anggota Direksi yang tidak memenuhi persyaratan sebagaimana dimaksud dalam Pasal 93 batal karena hukum sejak saat anggota Direksi lainnya atau Dewan Komisaris mengetahui tidak terpenuhinya persyaratan tersebut.\n(2) Dalam jangka waktu paling lambat 7 (tujuh) hari terhitung sejak diketahui, anggota Direksi lainnya atau Dewan Komisaris harus mengumumkan batalnya pengangkatan anggota Direksi yang bersangkutan dalam Surat Kabar dan memberitahukannya kepada Menteri untuk dicatat dalam daftar Perseroan.\n(3) Perbuatan hukum yang telah dilakukan untuk dan atas nama Perseroan oleh anggota Direksi sebagaimana dimaksud pada ayat (1) sebelum pengangkatannya batal, tetap mengikat dan menjadi tanggung jawab Perseroan.\n(4) Perbuatan hukum yang dilakukan untuk dan atas nama Perseroan oleh anggota Direksi sebagaimana dimaksud pada ayat (1) setelah pengangkatannya batal, adalah tidak sah dan menjadi tanggung jawab pribadi anggota Direksi yang bersangkutan.\n(5) Ketentuan sebagaimana dimaksud pada ayat (3) tidak mengurangi tanggung jawab anggota Direksi yang bersangkutan terhadap kerugian Perseroan sebagaimana dimaksud dalam Pasal 97 dan Pasal 104."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 96",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Ketentuan tentang besarnya gaji dan tunjangan anggota Direksi ditetapkan berdasarkan keputusan RUPS.\n(2) Kewenangan RUPS sebagaimana dimaksud pada ayat (1), dapat dilimpahkan kepada Dewan Komisaris.\n(3) Dalam hal kewenangan RUPS dilimpahkan kepada Dewan Komisaris sebagaimana dimaksud pada ayat (2), besarnya gaji dan tunjangan sebagaimana dimaksud pada ayat (1) ditetapkan berdasarkan keputusan rapat Dewan Komisaris."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 97",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Direksi bertanggung jawab atas pengurusan Perseroan sebagaimana dimaksud dalam Pasal 92 ayat (1).\n(2) Pengurusan sebagaimana dimaksud pada ayat (1), wajib dilaksanakan setiap anggota Direksi dengan itikad baik dan penuh tanggung jawab.\n(3) Setiap anggota Direksi bertanggung jawab penuh secara pribadi atas kerugian Perseroan apabila yang bersangkutan bersalah atau lalai menjalankan tugasnya sesuai dengan ketentuan sebagaimana dimaksud pada ayat (2).\n(4) Dalam hal Direksi terdiri atas 2 (dua) anggota Direksi atau lebih, tanggung jawab sebagaimana dimaksud pada ayat (3) berlaku secara tanggung renteng bagi setiap anggota Direksi.\n(5) Anggota Direksi tidak dapat dipertanggungjawabkan atas kerugian sebagaimana dimaksud pada ayat (3) apabila dapat membuktikan:\na. kerugian tersebut bukan karena kesalahan atau kelalaiannya;\nb. telah melakukan pengurusan dengan itikad baik dan kehati-hatian untuk kepentingan dan sesuai dengan maksud dan tujuan Perseroan;\nc. tidak mempunyai benturan kepentingan baik langsung maupun tidak langsung atas tindakan pengurusan yang mengakibatkan kerugian; dan\nd. telah mengambil tindakan untuk mencegah timbul atau berlanjutnya kerugian tersebut.\n(6) Atas nama Perseroan, pemegang saham yang mewakili paling sedikit 1/10 (satu persepuluh) bagian dari jumlah seluruh saham dengan hak suara dapat mengajukan gugatan melalui pengadilan negeri terhadap anggota Direksi yang karena kesalahan atau kelalaiannya menimbulkan kerugian pada Perseroan.\n(7) Ketentuan sebagaimana dimaksud pada ayat (5) tidak mengurangi hak anggota Direksi lain dan/atau anggota Dewan Komisaris untuk mengajukan gugatan atas nama Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 98",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Direksi mewakili Perseroan baik di dalam maupun di luar pengadilan.\n(2) Dalam hal anggota Direksi terdiri lebih dari 1 (satu) orang, yang berwenang mewakili Perseroan adalah setiap anggota Direksi, kecuali ditentukan lain dalam anggaran dasar.\n(3) Kewenangan Direksi untuk mewakili Perseroan sebagaimana dimaksud pada ayat (1) adalah tidak terbatas dan tidak bersyarat, kecuali ditentukan lain dalam Undang-Undang ini, anggaran dasar, atau keputusan RUPS.\n(4) Keputusan RUPS sebagaimana dimaksud pada ayat (3) tidak boleh bertentangan dengan ketentuan Undang-Undang ini dan/atau anggaran dasar Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 99",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Anggota Direksi tidak berwenang mewakili Perseroan apabila:\na. terjadi perkara di pengadilan antara Perseroan dengan anggota Direksi yang bersangkutan; atau\nb. anggota Direksi yang bersangkutan mempunyai benturan kepentingan dengan Perseroan.\n(2) Dalam hal terdapat keadaan sebagaimana dimaksud pada ayat (1), yang berhak mewakili Perseroan adalah:\na. anggota Direksi lainnya yang tidak mempunyai benturan kepentingan dengan Perseroan;\nb. Dewan Komisaris dalam hal seluruh anggota Direksi mempunyai benturan kepentingan dengan Perseroan; atau\nc. pihak lain yang ditunjuk oleh RUPS dalam hal seluruh anggota Direksi atau Dewan Komisaris mempunyai benturan kepentingan dengan Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 100",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Direksi Wajib:\na. membuat daftar pemegang saham, daftar khusus, risalah RUPS, dan risalah rapat Direksi;\nb. membuat laporan tahunan sebagaimana dimaksud dalam Pasal 66 dan dokumen keuangan Perseroan sebagaimana dimaksud dalam Undang-Undang tentang Dokumen Perusahaan; dan\nc. memelihara seluruh daftar, risalah, dan dokumen keuangan Perseroan sebagaimana dimaksud pada huruf a dan huruf b dan dokumen Perseroan lainnya.\n(2) Seluruh daftar, risalah, dokumen keuangan Perseroan, dan dokumen Perseroan lainnya sebagaimana dimaksud pada ayat (1) disimpan di tempat kedudukan Perseroan.\n(3) Atas permohonan tertulis dari pemegang saham, Direksi memberi izin kepada pemegang saham untuk memeriksa daftar pemegang saham, daftar khusus, risalah RUPS sebagaimana dimaksud pada ayat (1) dan laporan tahunan, serta mendapatkan salinan risalah RUPS dan salinan laporan tahunan.\n(4) Ketentuan sebagaimana dimaksud pada ayat (3) tidak menutup kemungkinan peraturan perundang-undangan di bidang pasar modal menentukan lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 101",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Anggota Direksi wajib melaporkan kepada Perseroan mengenai saham yang dimiliki anggota Direksi yang bersangkutan dan/atau keluarganya dalam Perseroan dan Perseroan lain untuk selanjutnya dicatat dalam daftar khusus.\n(2) Anggota Direksi yang tidak melaksanakan kewajiban sebagaimana dimaksud pada ayat (1) dan menimbulkan kerugian bagi Perseroan, bertanggung jawab secara pribadi atas kerugian Perseroan tersebut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 102",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Direksi wajib meminta persetujuan RUPS untuk:\na. mengalihkan kekayaan Perseroan; atau\nb. menjadikan jaminan utang kekayaan Perseroan;\nyang merupakan lebih dari 50% (lima puluh persen) jumlah kekayaan bersih Perseroan dalam 1 (satu) transaksi atau lebih, baik yang berkaitan satu sama lain maupun tidak.\n(2) Transaksi sebagaimana dimaksud pada ayat (1) huruf a adalah transaksi pengalihan kekayaan bersih Perseroan yang terjadi dalam jangka waktu 1 (satu) tahun buku atau jangka waktu yang lebih lama sebagaimana diatur dalam anggaran dasar Perseroan.\n(3) Ketentuan sebagaimana dimaksud pada ayat (1), tidak berlaku terhadap tindakan pengalihan atau penjaminan kekayaan Perseroan yang dilakukan oleh Direksi sebagai pelaksanaan kegiatan usaha Perseroan sesuai dengan anggaran dasarnya.\n(4) Perbuatan hukum sebagaimana dimaksud pada ayat (1) tanpa persetujuan RUPS, tetap mengikat Perseroan sepanjang pihak lain dalam perbuatan hukum tersebut beritikad baik.\n(5) Ketentuan kuorum kehadiran dan/atau ketentuan tentang pengambilan keputusan RUPS sebagaimana dimaksud dalam Pasal 89 mutatis mutandis berlaku bagi keputusan RUPS untuk menyetujui tindakan Direksi sebagaimana dimaksud pada ayat (1)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 103",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "Direksi dapat memberi kuasa tertulis kepada 1 (satu) orang karyawan Perseroan atau lebih atau kepada orang lain untuk dan atas nama Perseroan melakukan perbuatan hukum tertentu sebagaimana yang diuraikan dalam surat kuasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 104",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Direksi tidak berwenang mengajukan permohonan pailit atas Perseroan sendiri kepada pengadilan niaga sebelum memperoleh persetujuan RUPS, dengan tidak mengurangi ketentuan sebagaimana diatur dalam Undang-Undang tentang Kepailitan dan Penundaan Kewajiban Pembayaran Utang.\n(2) Dalam hal kepailitan sebagaimana dimaksud pada ayat (1) terjadi karena kesalahan atau kelalaian Direksi dan harta pailit tidak cukup untuk membayar seluruh kewajiban Perseroan dalam kepailitan tersebut, setiap anggota Direksi secara tanggung renteng bertanggung jawab atas seluruh kewajiban yang tidak terlunasi dari harta pailit tersebut.\n(3) Tanggung jawab sebagaimana dimaksud pada ayat (2) berlaku juga bagi anggota Direksi yang salah atau lalai yang pernah menjabat sebagai anggota Direksi dalam jangka waktu 5 (lima) tahun sebelum putusan pernyataan pailit diucapkan.\n(4) Anggota Direksi tidak bertanggung jawab atas kepailitan Perseroan sebagaimana dimaksud pada ayat (2) apabila dapat membuktikan:\na. kepailitan tersebut bukan karena kesalahan atau kelalaiannya;\nb. telah melakukan pengurusan dengan itikad baik, kehati-hatian, dan penuh tanggung jawab untuk kepentingan Perseroan dan sesuai dengan maksud dan tujuan Perseroan;\nc. tidak mempunyai benturan kepentingan baik langsung maupun tidak langsung atas tindakan pengurusan yang dilakukan; dan\nd. telah mengambil tindakan untuk mencegah terjadinya kepailitan.\n(5) Ketentuan sebagaimana dimaksud pada ayat (2), ayat (3), dan ayat (4) berlaku juga bagi Direksi dari Perseroan yang dinyatakan pailit berdasarkan gugatan pihak ketiga."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 105",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Anggota Direksi dapat diberhentikan sewaktu-waktu berdasarkan keputusan RUPS dengan menyebutkan alasannya.\n(2) Keputusan untuk memberhentikan anggota Direksi sebagaimana dimaksud pada ayat (1) diambil setelah yang bersangkutan diberi kesempatan untuk membela diri dalam RUPS.\n(3) Dalam hal keputusan untuk memberhentikan anggota Direksi sebagaimana dimaksud pada ayat (2) dilakukan dengan keputusan di luar RUPS sesuai dengan ketentuan sebagaimana dimaksud dalam Pasal 91, anggota Direksi yang bersangkutan diberi tahu terlebih dahulu tentang rencana pemberhentian dan diberikan kesempatan untuk membela diri sebelum diambil keputusan pemberhentian.\n(4) Pemberian kesempatan untuk membela diri sebagaimana dimaksud pada ayat (2) tidak diperlukan dalam hal yang bersangkutan tidak berkeberatan atas pemberhentian tersebut.\n(5) Pemberhentian anggota Direksi berlaku sejak:\na. ditutupnya RUPS sebagaimana dimaksud pada ayat (1);\nb. tanggal keputusan sebagaimana dimaksud pada ayat (3);\nc. tanggal lain yang ditetapkan dalam keputusan RUPS sebagaimana dimaksud pada ayat (1); atau\nd. tanggal lain yang ditetapkan dalam keputusan sebagaimana dimaksud pada ayat (3)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 106",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "(1) Anggota Direksi dapat diberhentikan untuk sementara oleh Dewan Komisaris dengan menyebutkan alasannya.\n(2) Pemberhentian sementara sebagaimana dimaksud pada ayat (1) diberitahukan secara tertulis kepada anggota Direksi yang bersangkutan.\n(3) Anggota Direksi yang diberhentikan sementara sebagaimana dimaksud pada ayat (1) tidak berwenang melakukan tugas sebagaimana dimaksud dalam Pasal 92 ayat (1) dan Pasal 98 ayat (1).\n(4) Dalam jangka waktu paling lambat 30 (tiga puluh) hari setelah tanggal pemberhentian sementara harus diselenggarakan RUPS.\n(5) Dalam RUPS sebagaimana dimaksud pada ayat (4) anggota Direksi yang bersangkutan diberi kesempatan untuk membela diri.\n(6) RUPS mencabut atau menguatkan keputusan pemberhentian sementara tersebut.\n(7) Dalam hal RUPS menguatkan keputusan pemberhentian sementara, anggota Direksi yang bersangkutan diberhentikan untuk seterusnya.\n(8) Dalam hal jangka waktu 30 (tiga puluh) hari telah lewat RUPS sebagaimana dimaksud pada ayat (4) tidak diselenggarakan, atau RUPS tidak dapat mengambil keputusan, pemberhentian sementara tersebut menjadi batal.\n(9) Bagi Perseroan Terbuka penyelenggaraan RUPS sebagaimana dimaksud pada ayat (4) dan ayat (8) berlaku ketentuan peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 107",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "teks": "Dalam anggaran dasar diatur ketentuan mengenai:\na. tata cara pengunduran diri anggota Direksi;\nb. tata cara pengisian jabatan anggota Direksi yang lowong; dan\nc. pihak yang berwenang menjalankan pengurusan dan mewakili Perseroan dalam hal seluruh anggota Direksi berhalangan atau diberhentikan untuk sementara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 108",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kedua Dewan Komisaris",
      "teks": "(1) Dewan Komisaris melakukan pengawasan atas kebijakan pengurusan, jalannya pengurusan pada umumnya, baik mengenai Perseroan maupun usaha Perseroan, dan memberi nasihat kepada Direksi.\n(2) Pengawasan dan pemberian nasihat sebagaimana dimaksud pada ayat (1) dilakukan untuk kepentingan Perseroan dan sesuai dengan maksud dan tujuan Perseroan.\n(3) Dewan Komisaris terdiri atas 1 (satu) orang anggota atau lebih.\n(4) Dewan Komisaris yang terdiri atas lebih dari 1 (satu) orang anggota merupakan majelis dan setiap anggota Dewan Komisaris tidak dapat bertindak sendiri-sendiri, melainkan berdasarkan keputusan Dewan Komisaris.\n(5) Perseroan yang kegiatan usahanya berkaitan dengan menghimpun dan/atau mengelola dana masyarakat, Perseroan yang menerbitkan surat pengakuan utang kepada masyarakat atau Perseroan Terbuka wajib mempunyai paling sedikit 2 (dua) orang anggota Dewan Komisaris."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 109",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kedua Dewan Komisaris",
      "teks": "(1) Perseroan yang menjalankan kegiatan usaha berdasarkan prinsip syariah selain mempunyai Dewan Komisaris wajib mempunyai Dewan Pengawas Syariah.\n(2) Dewan Pengawas Syariah sebagaimana dimaksud pada ayat (1) terdiri atas seorang ahli syariah atau lebih yang diangkat oleh RUPS atas rekomendasi Majelis Ulama Indonesia.\n(3) Dewan Pengawas Syariah sebagaimana dimaksud pada ayat (1) bertugas memberikan nasihat dan saran kepada Direksi serta mengawasi kegiatan Perseroan agar sesuai dengan prinsip syariah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 110",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kedua Dewan Komisaris",
      "teks": "(1) Yang dapat diangkat menjadi anggota Dewan Komisaris adalah orang perseorangan yang cakap melakukan perbuatan hukum, kecuali dalam waktu 5 (lima) tahun sebelum pengangkatannya pernah:\na. dinyatakan pailit;\nb. menjadi anggota Direksi atau anggota Dewan Komisaris yang dinyatakan bersalah menyebabkan suatu Perseroan dinyatakan pailit; atau\nc. dihukum karena melakukan tindak pidana yang merugikan keuangan negara dan/atau yang berkaitan dengan sektor keuangan.\n(2) Ketentuan persyaratan sebagaimana dimaksud pada ayat (1) tidak mengurangi kemungkinan instansi teknis yang berwenang menetapkan persyaratan tambahan berdasarkan peraturan perundang-undangan.\n(3) Pemenuhan persyaratan sebagaimana dimaksud pada ayat (1) dan ayat (2) dibuktikan dengan surat yang disimpan oleh Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 111",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Anggota Dewan Komisaris diangkat oleh RUPS.\n(2) Untuk pertama kali pengangkatan anggota Dewan Komisaris dilakukan oleh pendiri dalam akta pendirian sebagaimana dimaksud dalam Pasal 8 ayat (2) huruf b.\n(3) Anggota Dewan Komisaris diangkat untuk jangka waktu tertentu dan dapat diangkat kembali.\n(4) Anggaran dasar mengatur tata cara pengangkatan, penggantian, dan pemberhentian anggota Dewan Komisaris serta dapat juga mengatur tentang pencalonan anggota Dewan Komisaris.\n(5) Keputusan RUPS mengenai pengangkatan, penggantian, dan pemberhentian anggota Dewan Komisaris juga menetapkan saat mulai berlakunya pengangkatan, penggantian, dan pemberhentian tersebut.\n(6) Dalam hal RUPS tidak menentukan saat mulai berlakunya pengangkatan, penggantian, dan pemberhentian anggota Dewan Komisaris, pengangkatan, penggantian, dan pemberhentian mulai berlaku sejak ditutupnya RUPS.\n(7) Dalam hal terjadi pengangkatan, penggantian, dan pemberhentian anggota Dewan Komisaris, Direksi wajib memberitahukan perubahan tersebut kepada Menteri untuk dicatat dalam daftar Perseroan dalam jangka waktu paling lambat 30 (tiga puluh) hari terhitung sejak tanggal keputusan RUPS tersebut.\n(8) Dalam hal pemberitahuan sebagaimana dimaksud pada ayat (7) belum dilakukan, Menteri menolak setiap pemberitahuan tentang perubahan susunan Dewan Komisaris selanjutnya yang disampaikan kepada Menteri oleh Direksi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 112",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pengangkatan anggota Dewan Komisaris yang tidak memenuhi persyaratan sebagaimana dimaksud dalam Pasal 110 ayat (1) dan ayat (2) batal karena hukum sejak saat anggota Dewan Komisaris lainnya atau Direksi mengetahui tidak terpenuhinya persyaratan tersebut.\n(2) Dalam jangka waktu paling lambat 7 (tujuh) hari terhitung sejak diketahui, Direksi harus mengumumkan batalnya pengangkatan anggota Dewan Komisaris yang bersangkutan dalam Surat Kabar dan memberitahukannya kepada Menteri untuk dicatat dalam daftar Perseroan.\n(3) Perbuatan hukum yang telah dilakukan oleh anggota Dewan Komisaris sebagaimana dimaksud pada ayat (1) untuk dan atas nama Dewan Komisaris sebelum pengangkatannya batal, tetap mengikat dan menjadi tanggung jawab Perseroan.\n(4) Ketentuan sebagaimana dimaksud pada ayat (2) tidak mengurangi tanggung jawab anggota Dewan Komisaris yang bersangkutan terhadap kerugian Perseroan sebagaimana dimaksud dalam Pasal 114 dan Pasal 115."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 113",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ketentuan tentang besarnya gaji atau honorarium dan tunjangan bagi anggota Dewan Komisaris ditetapkan oleh RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 114",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Dewan Komisaris bertanggung jawab atas pengawasan Perseroan sebagaimana dimaksud dalam Pasal 108 ayat (1).\n(2) Setiap anggota Dewan Komisaris wajib dengan itikad baik, kehati-hatian, dan bertanggung jawab dalam menjalankan tugas pengawasan dan pemberian nasihat kepada Direksi sebagaimana dimaksud dalam Pasal 108 ayat (1) untuk kepentingan Perseroan dan sesuai dengan maksud dan tujuan Perseroan.\n(3) Setiap anggota Dewan Komisaris ikut bertanggung jawab secara pribadi atas kerugian Perseroan apabila yang bersangkutan bersalah atau lalai menjalankan tugasnya sebagaimana dimaksud pada ayat (2).\n(4) Dalam hal Dewan Komisaris terdiri atas 2 (dua) anggota Dewan Komisaris atau lebih, tanggung jawab sebagaimana dimaksud pada ayat (3) berlaku secara tanggung renteng bagi setiap anggota Dewan Komisaris.\n(5) Anggota Dewan Komisaris tidak dapat dipertanggungjawabkan atas kerugian sebagaimana dimaksud pada ayat (3) apabila dapat membuktikan:\na. telah melakukan pengawasan dengan itikad baik dan kehati-hatian untuk kepentingan Perseroan dan sesuai dengan maksud dan tujuan Perseroan;\nb. tidak mempunyai kepentingan pribadi baik langsung maupun tidak langsung atas tindakan pengurusan Direksi yang mengakibatkan kerugian; dan\nc. telah memberikan nasihat kepada Direksi untuk mencegah timbul atau berlanjutnya kerugian tersebut.\n(6) Atas nama Perseroan, pemegang saham yang mewakili paling sedikit 1/10 (satu persepuluh) bagian dari jumlah seluruh saham dengan hak suara dapat menggugat anggota Dewan Komisaris yang karena kesalahan atau kelalaiannya menimbulkan kerugian pada Perseroan ke pengadilan negeri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 115",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Dalam hal terjadi kepailitan karena kesalahan atau kelalaian Dewan Komisaris dalam melakukan pengawasan terhadap pengurusan yang dilaksanakan oleh Direksi dan kekayaan Perseroan tidak cukup untuk membayar seluruh kewajiban Perseroan akibat kepailitan tersebut, setiap anggota Dewan Komisaris secara tanggung renteng ikut bertanggung jawab dengan anggota Direksi atas kewajiban yang belum dilunasi.\n(2) Tanggung jawab sebagaimana dimaksud pada ayat (1) berlaku juga bagi anggota Dewan Komisaris yang sudah tidak menjabat 5 (lima) tahun sebelum putusan pernyataan pailit diucapkan.\n(3) Anggota Dewan Komisaris tidak dapat dimintai pertanggungjawaban atas kepailitan Perseroan sebagaimana dimaksud pada ayat (1) apabila dapat membuktikan:\na. kepailitan tersebut bukan karena kesalahan atau kelalaiannya;\nb. telah melakukan tugas pengawasan dengan itikad baik dan kehati-hatian untuk kepentingan Perseroan dan sesuai dengan maksud dan tujuan Perseroan;\nc. tidak mempunyai kepentingan pribadi, baik langsung maupun tidak langsung atas tindakan pengurusan oleh Direksi yang mengakibatkan kepailitan; dan\nd. telah memberikan nasihat kepada Direksi untuk mencegah terjadinya kepailitan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 116",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Dewan Komisaris wajib:\na. membuat risalah rapat Dewan Komisaris dan menyimpan salinannya;\nb. melaporkan kepada Perseroan mengenai kepemilikan sahamnya dan/atau keluarganya pada Perseroan tersebut dan Perseroan lain; dan\nc. memberikan laporan tentang tugas pengawasan yang telah dilakukan selama tahun buku yang baru lampau kepada RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 117",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Dalam anggaran dasar dapat ditetapkan pemberian wewenang kepada Dewan Komisaris untuk memberikan persetujuan atau bantuan kepada Direksi dalam melakukan perbuatan hukum tertentu.\n(2) Dalam hal anggaran dasar menetapkan persyaratan pemberian persetujuan atau bantuan sebagaimana dimaksud pada ayat (1), tanpa persetujuan atau bantuan Dewan Komisaris, perbuatan hukum tetap mengikat Perseroan sepanjang pihak lainnya dalam perbuatan hukum tersebut beritikad baik."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 118",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Berdasarkan anggaran dasar atau keputusan RUPS, Dewan Komisaris dapat melakukan tindakan pengurusan Perseroan dalam keadaan tertentu untuk jangka waktu tertentu.\n(2) Dewan Komisaris yang dalam keadaan tertentu untuk jangka waktu tertentu melakukan tindakan pengurusan sebagaimana dimaksud pada ayat (1) berlaku semua ketentuan mengenai hak, wewenang, dan kewajiban Direksi terhadap Perseroan dan pihak ketiga."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 119",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ketentuan mengenai pemberhentian anggota Direksi sebagaimana dimaksud dalam Pasal 105 mutatis mutandis berlaku bagi pemberhentian anggota Dewan Komisaris."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 120",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Anggaran dasar Perseroan dapat mengatur adanya 1 (satu) orang atau lebih komisaris independen dan 1 (satu) orang komisaris utusan.\n(2) Komisaris independen sebagaimana dimaksud pada ayat (1) diangkat berdasarkan keputusan RUPS dari pihak yang tidak terafiliasi dengan pemegang saham utama, anggota Direksi dan/atau anggota Dewan Komisaris lainnya.\n(3) Komisaris utusan sebagaimana dimaksud pada ayat (1) merupakan anggota Dewan Komisaris yang ditunjuk berdasarkan keputusan rapat Dewan Komisaris.\n(4) Tugas dan wewenang komisaris utusan ditetapkan dalam anggaran dasar Perseroan dengan ketentuan tidak bertentangan dengan tugas dan wewenang Dewan Komisaris dan tidak mengurangi tugas pengurusan yang dilakukan Direksi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 121",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII DIREKSI DAN DEWAN KOMISARIS",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Dalam menjalankan tugas pengawasan sebagaimana dimaksud dalam Pasal 108, Dewan Komisaris dapat membentuk komite, yang anggotanya seorang atau lebih adalah anggota Dewan Komisaris.\n(2) Komite sebagaimana dimaksud pada ayat (1) bertanggung jawab kepada Dewan Komisaris."
    },
    {
      "tipe": "BAB",
      "label": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 122",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Penggabungan dan Peleburan mengakibatkan Perseroan yang menggabungkan atau meleburkan diri berakhir karena hukum.\n(2) Berakhirnya Perseroan sebagaimana dimaksud pada ayat (1) terjadi tanpa dilakukan likuidasi terlebih dahulu.\n(3) Dalam hal berakhirnya Perseroan sebagaimana dimaksud pada ayat (2),\na. aktiva dan pasiva Perseroan yang menggabungkan atau meleburkan diri beralih karena hukum kepada Perseroan yang menerima Penggabungan atau Perseroan hasil Peleburan;\nb. pemegang saham Perseroan yang menggabungkan atau meleburkan diri karena hukum menjadi pemegang saham Perseroan yang menerima Penggabungan atau Perseroan hasil Peleburan; dan\nc. Perseroan yang menggabungkan atau meleburkan diri berakhir karena hukum terhitung sejak tanggal Penggabungan atau Peleburan mulai berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 123",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Direksi Perseroan yang akan menggabungkan diri dan menerima Penggabungan menyusun rancangan Penggabungan.\n(2) Rancangan Penggabungan sebagaimana dimaksud pada ayat (1) memuat sekurang-kurangnya:\na. nama dan tempat kedudukan dari setiap Perseroan yang akan melakukan Penggabungan;\nb. alasan serta penjelasan Direksi Perseroan yang akan melakukan Penggabungan dan persyaratan Penggabungan;\nc. tata cara penilaian dan konversi saham Perseroan yang menggabungkan diri terhadap saham Perseroan yang menerima Penggabungan;\nd. rancangan perubahan anggaran dasar Perseroan yang menerima Penggabungan apabila ada;\ne. laporan keuangan sebagaimana dimaksud dalam Pasal 66 ayat (2) huruf a yang meliputi 3 (tiga) tahun buku terakhir dari setiap Perseroan yang akan melakukan Penggabungan;\nf. rencana kelanjutan atau pengakhiran kegiatan usaha dari Perseroan yang akan melakukan Penggabungan;\ng. neraca proforma Perseroan yang menerima Penggabungan sesuai dengan prinsip akuntansi yang berlaku umum di Indonesia;\nh. cara penyelesaian status, hak dan kewajiban anggota Direksi, Dewan Komisaris, dan karyawan Perseroan yang akan melakukan Penggabungan diri;\ni. cara penyelesaian hak dan kewajiban Perseroan yang akan menggabungkan diri terhadap pihak ketiga;\nj. cara penyelesaian hak pemegang saham yang tidak setuju terhadap Penggabungan Perseroan;\nk. nama anggota Direksi dan Dewan Komisaris serta gaji, honorarium dan tunjangan bagi anggota Direksi dan Dewan Komisaris Perseroan yang menerima Penggabungan;\nl. perkiraan jangka waktu pelaksanaan Penggabungan;\nm. laporan mengenai keadaan, perkembangan, dan hasil yang dicapai dari setiap Perseroan yang akan melakukan Penggabungan;\nn. kegiatan utama setiap Perseroan yang melakukan Penggabungan dan perubahan yang terjadi selama tahun buku yang sedang berjalan; dan\no. rincian masalah yang timbul selama tahun buku yang sedang berjalan yang mempengaruhi kegiatan Perseroan yang akan melakukan Penggabungan.\n(3) Rancangan Penggabungan sebagaimana dimaksud pada ayat (2) setelah mendapat persetujuan Dewan Komisaris dari setiap Perseroan diajukan kepada RUPS masing-masing untuk mendapat persetujuan.\n(4) Bagi Perseroan tertentu yang akan melakukan Penggabungan selain berlaku ketentuan dalam Undang-Undang ini, perlu mendapat persetujuan terlebih dahulu dari instansi terkait sesuai dengan ketentuan peraturan perundang-undangan.\n(5) Ketentuan sebagaimana dimaksud pada ayat (1) sampai dengan ayat (4) berlaku juga bagi Perseroan Terbuka sepanjang tidak diatur lain dalam peraturan perundang-undangan di bidang pasar modal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 124",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "Ketentuan sebagaimana dimaksud dalam Pasal 123 mutatis mutandis berlaku bagi Perseroan yang akan meleburkan diri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 125",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Pengambilalihan dilakukan dengan cara pengambilalihan saham yang telah dikeluarkan dan/atau akan dikeluarkan oleh Perseroan melalui Direksi Perseroan atau langsung dari pemegang saham.\n(2) Pengambilalihan dapat dilakukan oleh badan hukum atau orang perseorangan.\n(3) Pengambilalihan sebagaimana dimaksud pada ayat (1) adalah pengambilalihan saham yang mengakibatkan beralihnya pengendalian terhadap Perseroan tersebut.\n(4) Dalam hal Pengambilalihan dilakukan oleh badan hukum berbentuk Perseroan, Direksi sebelum melakukan perbuatan hukum Pengambilalihan harus berdasarkan keputusan RUPS yang memenuhi kuorum kehadiran dan ketentuan tentang persyaratan pengambilan keputusan RUPS sebagaimana dimaksud dalam Pasal 89.\n(5) Dalam hal Pengambilalihan dilakukan melalui Direksi, pihak yang akan mengambil alih menyampaikan maksudnya untuk melakukan Pengambilalihan kepada Direksi Perseroan yang akan diambil alih.\n(6) Direksi Perseroan yang akan diambil alih dan Perseroan yang akan mengambil alih dengan persetujuan Dewan Komisaris masing-masing menyusun rancangan Pengambilalihan yang memuat sekurang-kurangnya:\na. nama dan tempat kedudukan dari Perseroan yang akan mengambil alih dan Perseroan yang akan diambil alih;\nb. alasan serta penjelasan Direksi Perseroan yang akan mengambil alih dan Direksi Perseroan yang akan diambil alih;\nc. laporan keuangan sebagaimana dimaksud dalam Pasal 66 ayat (2) huruf a untuk tahun buku terakhir dari Perseroan yang akan mengambil alih dan Perseroan yang akan diambil alih;\nd. tata cara penilaian dan konversi saham dari Perseroan yang akan diambil alih terhadap saham penukarnya apabila pembayaran Pengambilalihan dilakukan dengan saham;\ne. jumlah saham yang akan diambil alih;\nf. kesiapan pendanaan;\ng. neraca konsolidasi proforma Perseroan yang akan mengambil alih setelah Pengambilalihan yang disusun sesuai dengan prinsip akuntansi yang berlaku umum di Indonesia;\nh. cara penyelesaian hak pemegang saham yang tidak setuju terhadap Pengambilalihan;\ni. cara penyelesaian status, hak dan kewajiban anggota Direksi, Dewan Komisaris, dan karyawan dari Perseroan yang akan diambil alih;\nj. perkiraan jangka waktu pelaksanaan Pengambilalihan, termasuk jangka waktu pemberian kuasa pengalihan saham dari pemegang saham kepada Direksi Perseroan;\nk. rancangan perubahan anggaran dasar Perseroan hasil Pengambilalihan apabila ada.\n(7) Dalam hal Pengambilalihan saham dilakukan langsung dari pemegang saham, ketentuan sebagaimana dimaksud pada ayat (5) dan ayat (6) tidak berlaku.\n(8) Pengambilalihan saham sebagaimana dimaksud pada ayat (7) wajib memperhatikan ketentuan anggaran dasar Perseroan yang diambil alih tentang pemindahan hak atas saham dan perjanjian yang telah dibuat oleh Perseroan dengan pihak lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 126",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Perbuatan hukum Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan wajib memperhatikan kepentingan:\na. Perseroan, pemegang saham minoritas, karyawan Perseroan;\nb. kreditor dan mitra usaha lainnya dari Perseroan; dan\nc. masyarakat dan persaingan sehat dalam melakukan usaha.\n(2) Pemegang saham yang tidak setuju terhadap keputusan RUPS mengenai Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan sebagaimana dimaksud pada ayat (1) hanya boleh menggunakan haknya sebagaimana dimaksud dalam Pasal 62.\n(3) Pelaksanaan hak sebagaimana dimaksud pada ayat (2) tidak menghentikan proses pelaksanaan Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 127",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Keputusan RUPS mengenai Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan sah apabila diambil sesuai dengan ketentuan Pasal 87 ayat (1) dan Pasal 89.\n(2) Direksi Perseroan yang akan melakukan Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan wajib mengumumkan ringkasan rancangan paling sedikit dalam 1 (satu) Surat Kabar dan mengumumkan secara tertulis kepada karyawan dari Perseroan yang akan melakukan Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan dalam jangka waktu paling lambat 30 (tiga puluh) hari sebelum pemanggilan RUPS.\n(3) Pengumuman sebagaimana dimaksud pada ayat (2) memuat juga pemberitahuan bahwa pihak yang berkepentingan dapat memperoleh rancangan Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan di kantor Perseroan terhitung sejak tanggal pengumuman sampai tanggal RUPS diselenggarakan.\n(4) Kreditor dapat mengajukan keberatan kepada Perseroan dalam jangka waktu paling lambat 14 (empat belas) hari setelah pengumuman sebagaimana dimaksud pada ayat (2) mengenai Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan sesuai dengan rancangan tersebut.\n(5) Apabila dalam jangka waktu sebagaimana dimaksud pada ayat (4) kreditor tidak mengajukan keberatan, kreditor dianggap menyetujui Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan.\n(6) Dalam hal keberatan kreditor sebagaimana dimaksud pada ayat (4) sampai dengan tanggal diselenggarakan RUPS tidak dapat diselesaikan oleh Direksi, keberatan tersebut harus disampaikan dalam RUPS guna mendapat penyelesaian.\n(7) Selama penyelesaian sebagaimana dimaksud pada ayat (6) belum tercapai, Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan tidak dapat dilaksanakan.\n(8) Ketentuan sebagaimana dimaksud pada ayat (2), ayat (4), ayat (5), ayat (6), dan ayat (7) mutatis mutandis berlaku bagi pengumuman dalam rangka Pengambilalihan saham yang dilakukan langsung dari pemegang saham dalam Perseroan sebagaimana dimaksud dalam Pasal 125."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 128",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Rancangan Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan yang telah disetujui RUPS dituangkan ke dalam akta Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan yang dibuat di hadapan notaris dalam bahasa Indonesia.\n(2) Akta Pengambilalihan saham yang dilakukan langsung dari pemegang saham wajib dinyatakan dengan akta notaris dalam bahasa Indonesia.\n(3) Akta Peleburan sebagaimana dimaksud pada ayat (1) menjadi dasar pembuatan akta pendirian Perseroan hasil Peleburan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 129",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Salinan akta Penggabungan Perseroan dilampirkan pada:\na. pengajuan permohonan untuk mendapatkan persetujuan Menteri sebagaimana dimaksud dalam Pasal 21 ayat (1); atau\nb. penyampaian pemberitahuan kepada Menteri tentang perubahan anggaran dasar sebagaimana dimaksud dalam Pasal 21 ayat (3).\n(2) Dalam hal Penggabungan Perseroan tidak disertai perubahan anggaran dasar, salinan akta Penggabungan harus disampaikan kepada Menteri untuk dicatat dalam daftar Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 130",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "Salinan akta Peleburan dilampirkan pada pengajuan permohonan untuk mendapatkan Keputusan Menteri mengenai pengesahan badan hukum Perseroan hasil Peleburan sebagaimana dimaksud dalam Pasal 7 ayat (4)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 131",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "(1) Salinan akta Pengambilalihan Perseroan wajib dilampirkan pada penyampaian pemberitahuan kepada Menteri tentang perubahan anggaran dasar sebagaimana dimaksud dalam Pasal 21 ayat (3).\n(2) Dalam hal Pengambilalihan saham dilakukan secara langsung dari pemegang saham, salinan akta pemindahan hak atas saham wajib dilampirkan pada penyampaian pemberitahuan kepada Menteri tentang perubahan susunan pemegang saham."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 132",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "teks": "Ketentuan sebagaimana dimaksud dalam Pasal 29 dan Pasal 30 berlaku juga bagi Penggabungan, Peleburan, atau Pengambilalihan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 133",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Direksi Perseroan yang menerima Penggabungan atau Direksi Perseroan hasil Peleburan wajib mengumumkan hasil Penggabungan atau Peleburan dalam 1 (satu) Surat Kabar atau lebih dalam jangka waktu paling lambat 30 (tiga puluh) hari terhitung sejak tanggal berlakunya Penggabungan atau Peleburan.\n(2) Ketentuan sebagaimana dimaksud pada ayat (1) berlaku juga terhadap Direksi dari Perseroan yang sahamnya diambil alih."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 134",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ketentuan lebih lanjut mengenai Penggabungan, Peleburan, atau Pengambilalihan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 135",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemisahan dapat dilakukan dengan cara:\na. Pemisahan murni; atau\nb. Pemisahan tidak murni.\n(2) Pemisahan murni sebagaimana dimaksud pada ayat (1) huruf a mengakibatkan seluruh aktiva dan pasiva Perseroan beralih karena hukum kepada 2 (dua) Perseroan lain atau lebih yang menerima peralihan dan Perseroan yang melakukan Pemisahan tersebut berakhir karena hukum.\n(3) Pemisahan tidak murni sebagaimana dimaksud pada ayat (1) huruf b mengakibatkan sebagian aktiva dan pasiva Perseroan beralih karena hukum kepada 1 (satu) Perseroan lain atau lebih yang menerima peralihan, dan Perseroan yang melakukan Pemisahan tersebut tetap ada."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 136",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ketentuan lebih lanjut mengenai Pemisahan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 137",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PENGGABUNGAN, PELEBURAN, PENGAMBILALIHAN, DAN PEMISAHAN",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Dalam hal peraturan perundang-undangan di bidang pasar modal tidak mengatur lain, ketentuan sebagaimana dimaksud dalam Bab VIII berlaku juga bagi Perseroan Terbuka."
    },
    {
      "tipe": "BAB",
      "label": "BAB IX PEMERIKSAAN TERHADAP PERSEROAN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IX PEMERIKSAAN TERHADAP PERSEROAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 138",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX PEMERIKSAAN TERHADAP PERSEROAN",
      "teks": "(1) Pemeriksaan terhadap Perseroan dapat dilakukan dengan tujuan untuk mendapatkan data atau keterangan dalam hal terdapat dugaan bahwa:\na. Perseroan melakukan perbuatan melawan hukum yang merugikan pemegang saham atau pihak ketiga; atau\nb. anggota Direksi atau Dewan Komisaris melakukan perbuatan melawan hukum yang merugikan Perseroan atau pemegang saham atau pihak ketiga.\n(2) Pemeriksaan sebagaimana dimaksud pada ayat (1) dilakukan dengan mengajukan permohonan secara tertulis beserta alasannya ke pengadilan negeri yang daerah hukumnya meliputi tempat kedudukan Perseroan.\n(3) Permohonan sebagaimana dimaksud pada ayat (2) dapat diajukan oleh:\na. 1 (satu) pemegang saham atau lebih yang mewakili paling sedikit 1/10 (satu persepuluh) bagian dari jumlah seluruh saham dengan hak suara;\nb. pihak lain yang berdasarkan peraturan perundang-undangan, anggaran dasar Perseroan atau perjanjian dengan Perseroan diberi wewenang untuk mengajukan permohonan pemeriksaan; atau\nc. kejaksaan untuk kepentingan umum.\n(4) Permohonan sebagaimana dimaksud pada ayat (3) huruf a diajukan setelah pemohon terlebih dahulu meminta data atau keterangan kepada Perseroan dalam RUPS dan Perseroan tidak memberikan data atau keterangan tersebut.\n(5) Permohonan untuk mendapatkan data atau keterangan tentang Perseroan atau permohonan pemeriksaan untuk mendapatkan data atau keterangan tersebut harus didasarkan atas alasan yang wajar dan itikad baik.\n(6) Ketentuan sebagaimana dimaksud pada ayat (2), ayat (3) huruf a, dan ayat (4) tidak menutup kemungkinan peraturan perundang-undangan di bidang pasar modal menentukan lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 139",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX PEMERIKSAAN TERHADAP PERSEROAN",
      "teks": "(1) Ketua pengadilan negeri dapat menolak atau mengabulkan permohonan sebagaimana dimaksud dalam Pasal 138.\n(2) Ketua pengadilan negeri sebagaimana dimaksud pada ayat (1) menolak permohonan apabila permohonan tersebut tidak didasarkan atas alasan yang wajar dan/atau tidak dilakukan dengan itikad baik.\n(3) Dalam hal permohonan dikabulkan, ketua pengadilan negeri mengeluarkan penetapan pemeriksaan dan mengangkat paling banyak 3 (tiga) orang ahli untuk melakukan pemeriksaan dengan tujuan untuk mendapatkan data atau keterangan yang diperlukan.\n(4) Setiap anggota Direksi, anggota Dewan Komisaris, karyawan Perseroan, konsultan, dan akuntan publik yang telah ditunjuk oleh Perseroan tidak dapat diangkat sebagai ahli sebagaimana dimaksud pada ayat (3).\n(5) Ahli sebagaimana dimaksud pada ayat (3) berhak memeriksa semua dokumen dan kekayaan Perseroan yang dianggap perlu oleh ahli tersebut untuk diketahui.\n(6) Setiap anggota Direksi, anggota Dewan Komisaris, dan semua karyawan Perseroan wajib memberikan segala keterangan yang diperlukan untuk pelaksanaan pemeriksaan.\n(7) Ahli sebagaimana dimaksud pada ayat (3) wajib merahasiakan hasil pemeriksaan yang telah dilakukan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 140",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX PEMERIKSAAN TERHADAP PERSEROAN",
      "teks": "(1) Laporan hasil pemeriksaan disampaikan oleh ahli sebagaimana dimaksud dalam Pasal 139 kepada ketua pengadilan negeri dalam jangka waktu sebagaimana ditentukan dalam penetapan pengadilan untuk pemeriksaan paling lambat 90 (sembilan puluh) hari terhitung sejak tanggal pengangkatan ahli tersebut.\n(2) Ketua pengadilan negeri memberikan salinan laporan hasil pemeriksaan kepada pemohon dan Perseroan yang bersangkutan dalam jangka waktu paling lambat 14 (empat belas) hari terhitung sejak tanggal laporan hasil pemeriksaan diterima."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 141",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX PEMERIKSAAN TERHADAP PERSEROAN",
      "teks": "(1) Dalam hal permohonan untuk melakukan pemeriksaan dikabulkan, ketua pengadilan negeri menentukan jumlah maksimum biaya pemeriksaan.\n(2) Biaya pemeriksaan sebagaimana dimaksud pada ayat (1) dibayar oleh Perseroan.\n(3) Ketua pengadilan negeri atas permohonan Perseroan dapat membebankan penggantian seluruh atau sebagian biaya pemeriksaan sebagaimana dimaksud pada ayat (2) kepada pemohon, anggota Direksi, dan/atau anggota Dewan Komisaris."
    },
    {
      "tipe": "BAB",
      "label": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 142",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Pembubaran Perseroan terjadi:\na. berdasarkan keputusan RUPS;\nb. karena jangka waktu berdirinya yang ditetapkan dalam anggaran dasar telah berakhir;\nc. berdasarkan penetapan pengadilan;\nd. dengan dicabutnya kepailitan berdasarkan putusan pengadilan niaga yang telah mempunyai kekuatan hukum tetap, harta pailit Perseroan tidak cukup untuk membayar biaya kepailitan;\ne. karena harta pailit Perseroan yang telah dinyatakan pailit berada dalam keadaan insolvensi sebagaimana diatur dalam Undang-Undang tentang Kepailitan dan Penundaan Kewajiban Pembayaran Utang; atau\nf. karena dicabutnya izin usaha Perseroan sehingga mewajibkan Perseroan melakukan likuidasi sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Dalam hal terjadi pembubaran Perseroan sebagaimana dimaksud pada ayat (1):\na. wajib diikuti dengan likuidasi yang dilakukan oleh likuidator atau kurator; dan\nb. Perseroan tidak dapat melakukan perbuatan hukum, kecuali diperlukan untuk membereskan semua urusan Perseroan dalam rangka likuidasi.\n(3) Dalam hal pembubaran terjadi berdasarkan keputusan RUPS, jangka waktu berdirinya yang ditetapkan dalam anggaran dasar telah berakhir atau dengan dicabutnya kepailitan berdasarkan keputusan pengadilan niaga dan RUPS tidak menunjuk likuidator, Direksi bertindak selaku likuidator.\n(4) Dalam hal pembubaran Perseroan terjadi dengan dicabutnya kepailitan sebagaimana dimaksud pada ayat (1) huruf d, pengadilan niaga sekaligus memutuskan pemberhentian kurator dengan memperhatikan ketentuan dalam Undang-Undang tentang Kepailitan dan Penundaan Kewajiban Pembayaran Utang.\n(5) Dalam hal ketentuan sebagaimana dimaksud pada ayat (2) huruf b dilanggar, anggota Direksi, anggota Dewan Komisaris, dan Perseroan bertanggung jawab secara tanggung renteng.\n(6) Ketentuan mengenai pengangkatan, pemberhentian sementara, pemberhentian, wewenang, kewajiban, tanggung jawab, dan pengawasan terhadap Direksi mutatis mutandis berlaku bagi likuidator."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 143",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Pembubaran Perseroan tidak mengakibatkan Perseroan kehilangan status badan hukum sampai dengan selesainya likuidasi dan pertanggungjawaban likuidator diterima oleh RUPS atau pengadilan.\n(2) Sejak saat pembubaran pada setiap surat keluar Perseroan dicantumkan kata \"dalam likuidasi\" di belakang nama Perseroan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 144",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Direksi, Dewan Komisaris atau 1 (satu) pemegang saham atau lebih yang mewakili paling sedikit 1/10 (satu persepuluh) bagian dari jumlah seluruh saham dengan hak suara, dapat mengajukan usul pembubaran Perseroan kepada RUPS.\n(2) Keputusan RUPS tentang pembubaran Perseroan sah apabila diambil sesuai dengan ketentuan sebagaimana dimaksud dalam Pasal 87 ayat (1) dan Pasal 89.\n(3) Pembubaran Perseroan dimulai sejak saat yang ditetapkan dalam keputusan RUPS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 145",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Pembubaran Perseroan terjadi karena hukum apabila jangka waktu berdirinya Perseroan yang ditetapkan dalam anggaran dasar berakhir.\n(2) Dalam jangka waktu paling lambat 30 (tiga puluh) hari setelah jangka waktu berdirinya Perseroan berakhir RUPS menetapkan penunjukan likuidator.\n(3) Direksi tidak boleh melakukan perbuatan hukum baru atas nama Perseroan setelah jangka waktu berdirinya Perseroan yang ditetapkan dalam anggaran dasar berakhir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 146",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Pengadilan negeri dapat membubarkan Perseroan atas:\na. permohonan kejaksaan berdasarkan alasan Perseroan melanggar kepentingan umum atau Perseroan melakukan perbuatan yang melanggar peraturan perundang-undangan;\nb. permohonan pihak yang berkepentingan berdasarkan alasan adanya cacat hukum dalam akta pendirian;\nc. permohonan pemegang saham, Direksi atau Dewan Komisaris berdasarkan alasan Perseroan tidak mungkin untuk dilanjutkan.\n(2) Dalam penetapan pengadilan ditetapkan juga penunjukan likuidator."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 147",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Dalam jangka waktu paling lambat 30 (tiga puluh) hari terhitung sejak tanggal pembubaran Perseroan, likuidator wajib memberitahukan:\na. kepada semua kreditor mengenai pembubaran Perseroan dengan cara mengumumkan pembubaran Perseroan dalam Surat Kabar dan Berita Negara Republik Indonesia; dan\nb. pembubaran Perseroan kepada Menteri untuk dicatat dalam daftar Perseroan bahwa Perseroan dalam likuidasi.\n(2) Pemberitahuan kepada kreditor dalam Surat Kabar dan Berita Negara Republik Indonesia sebagaimana dimaksud pada ayat (1) huruf a memuat:\na. pembubaran Perseroan dan dasar hukumnya;\nb. nama dan alamat likuidator;\nc. tata cara pengajuan tagihan; dan\nd. jangka waktu pengajuan tagihan.\n(3) Jangka waktu pengajuan tagihan sebagaimana dimaksud pada ayat (2) huruf d adalah 60 (enam puluh) hari terhitung sejak tanggal pengumuman sebagaimana dimaksud pada ayat (1).\n(4) Pemberitahuan kepada Menteri sebagaimana dimaksud pada ayat (1) huruf b wajib dilengkapi dengan bukti:\na. dasar hukum pembubaran Perseroan; dan\nb. pemberitahuan kepada kreditor dalam Surat Kabar sebagaimana dimaksud pada ayat (1) huruf a."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 148",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Dalam hal pemberitahuan kepada kreditor dan Menteri sebagaimana dimaksud dalam Pasal 147 belum dilakukan, pembubaran Perseroan tidak berlaku bagi pihak ketiga.\n(2) Dalam hal likuidator lalai melakukan pemberitahuan sebagaimana dimaksud pada ayat (1), likuidator secara tanggung renteng dengan Perseroan bertanggung jawab atas kerugian yang diderita pihak ketiga."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 149",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Kewajiban likuidator dalam melakukan pemberesan harta kekayaan Perseroan dalam proses likuidasi meliputi pelaksanaan:\na. pencatatan dan pengumpulan kekayaan dan utang Perseroan;\nb. pengumuman dalam Surat Kabar dan Berita Negara Republik Indonesia mengenai rencana pembagian kekayaan hasil likuidasi;\nc. pembayaran kepada para kreditor;\nd. pembayaran sisa kekayaan hasil likuidasi kepada pemegang saham; dan\ne. tindakan lain yang perlu dilakukan dalam pelaksanaan pemberesan kekayaan.\n(2) Dalam hal likuidator memperkirakan bahwa utang Perseroan lebih besar daripada kekayaan Perseroan, likuidator wajib mengajukan permohonan pailit Perseroan, kecuali peraturan perundang-undangan menentukan lain, dan semua kreditor yang diketahui identitas dan alamatnya, menyetujui pemberesan dilakukan di luar kepailitan.\n(3) Kreditor dapat mengajukan keberatan atas rencana pembagian kekayaan hasil likuidasi dalam jangka waktu paling lambat 60 (enam puluh) hari terhitung sejak tanggal pengumuman sebagaimana dimaksud pada ayat (1) huruf b.\n(4) Dalam hal pengajuan keberatan sebagaimana dimaksud pada ayat (3) ditolak oleh likuidator, kreditor dapat mengajukan gugatan ke pengadilan negeri dalam jangka waktu paling lambat 60 (enam puluh) hari terhitung sejak tanggal penolakan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 150",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Kreditor yang mengajukan tagihan sesuai dengan jangka waktu sebagaimana dimaksud dalam Pasal 147 ayat (3), dan kemudian ditolak oleh likuidator dapat mengajukan gugatan ke pengadilan negeri dalam jangka waktu paling lambat 60 (enam puluh) hari terhitung sejak tanggal penolakan.\n(2) Kreditor yang belum mengajukan tagihannya dapat mengajukan melalui pengadilan negeri dalam jangka waktu 2 (dua) tahun terhitung sejak pembubaran Perseroan diumumkan sebagaimana dimaksud dalam Pasal 147 ayat (1).\n(3) Tagihan yang diajukan kreditor sebagaimana dimaksud pada ayat (2) dapat dilakukan dalam hal terdapat sisa kekayaan hasil likuidasi yang diperuntukkan bagi pemegang saham.\n(4) Dalam hal sisa kekayaan hasil likuidasi telah dibagikan kepada pemegang saham dan terdapat tagihan kreditor sebagaimana dimaksud pada ayat (2), pengadilan negeri memerintahkan likuidator untuk menarik kembali sisa kekayaan hasil likuidasi yang telah dibagikan kepada pemegang saham.\n(5) Pemegang saham wajib mengembalikan sisa kekayaan hasil likuidasi sebagaimana dimaksud pada ayat (4) secara proporsional dengan jumlah yang diterima terhadap jumlah tagihan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 151",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Dalam hal likuidator tidak dapat melaksanakan kewajibannya sebagaimana dimaksud dalam Pasal 149, atas permohonan pihak yang berkepentingan atau atas permohonan kejaksaan, ketua pengadilan negeri dapat mengangkat likuidator baru dan memberhentikan likuidator lama.\n(2) Pemberhentian likuidator sebagaimana dimaksud pada ayat (1), dilakukan setelah yang bersangkutan dipanggil untuk didengar keterangannya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 152",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X PEMBUBARAN, LIKUIDASI, DAN BERAKHIRNYA STATUS BADAN HUKUM PERSEROAN",
      "teks": "(1) Likuidator bertanggung jawab kepada RUPS atau pengadilan yang mengangkatnya atas likuidasi Perseroan yang dilakukan.\n(2) Kurator bertanggung jawab kepada hakim pengawas atas likuidasi Perseroan yang dilakukan.\n(3) Likuidator wajib memberitahukan kepada Menteri dan mengumumkan hasil akhir proses likuidasi dalam Surat Kabar setelah RUPS memberikan pelunasan dan pembebasan kepada likuidator atau setelah pengadilan menerima pertanggungjawaban likuidator yang ditunjuknya.\n(4) Ketentuan sebagaimana dimaksud pada ayat (3) berlaku juga bagi kurator yang pertanggungjawabannya telah diterima oleh hakim pengawas.\n(5) Menteri mencatat berakhirnya status badan hukum Perseroan dan menghapus nama Perseroan dari daftar Perseroan, setelah ketentuan sebagaimana dimaksud pada ayat (3) dan ayat (4) dipenuhi.\n(6) Ketentuan sebagaimana dimaksud pada ayat (5) berlaku juga bagi berakhirnya status badan hukum Perseroan karena Penggabungan, Peleburan, atau Pemisahan.\n(7) Pemberitahuan dan pengumuman sebagaimana dimaksud pada ayat (3) dan ayat (4) dilakukan dalam jangka waktu paling lambat 30 (tiga puluh) hari terhitung sejak tanggal pertanggungjawaban likuidator atau kurator diterima oleh RUPS, pengadilan atau hakim pengawas.\n(8) Menteri mengumumkan berakhirnya status badan hukum Perseroan dalam Berita Negara Republik Indonesia."
    },
    {
      "tipe": "BAB",
      "label": "BAB XI BIAYA",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XI BIAYA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 153",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI BIAYA",
      "teks": "Ketentuan mengenai biaya untuk:\na. memperoleh persetujuan pemakaian nama Perseroan;\nb. memperoleh keputusan pengesahan badan hukum Perseroan;\nc. memperoleh keputusan persetujuan perubahan anggaran dasar;\nd. memperoleh informasi tentang data Perseroan dalam daftar Perseroan;\ne. pengumuman yang diwajibkan dalam Undang-Undang ini dalam Berita Negara Republik Indonesia dan Tambahan Berita Negara Republik Indonesia; dan\nf. memperoleh salinan Keputusan Menteri mengenai pengesahan badan hukum Perseroan atau persetujuan perubahan anggaran dasar Perseroan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XII KETENTUAN LAIN-LAIN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XII KETENTUAN LAIN-LAIN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 154",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII KETENTUAN LAIN-LAIN",
      "teks": "(1) Bagi Perseroan Terbuka berlaku ketentuan Undang-Undang ini jika tidak diatur lain dalam peraturan perundang-undangan di bidang pasar modal.\n(2) Peraturan perundang-undangan di bidang pasar modal yang mengecualikan ketentuan Undang-Undang ini tidak boleh bertentangan dengan asas hukum Perseroan dalam Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 155",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII KETENTUAN LAIN-LAIN",
      "teks": "Ketentuan mengenai tanggung jawab Direksi dan/atau Dewan Komisaris atas kesalahan dan kelalaiannya yang diatur dalam Undang-Undang ini tidak mengurangi ketentuan yang diatur dalam Undang-Undang tentang Hukum Pidana."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 156",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII KETENTUAN LAIN-LAIN",
      "teks": "(1) Dalam rangka pelaksanaan dan perkembangan Undang-Undang ini dibentuk tim ahli pemantauan hukum Perseroan.\n(2) Keanggotaan tim sebagaimana dimaksud pada ayat (1) terdiri atas unsur:\na. pemerintah;\nb. pakar/akademisi;\nc. profesi; dan\nd. dunia usaha.\n(3) Tim ahli berwenang mengkaji akta pendirian dan perubahan anggaran dasar yang diperoleh atas inisiatif sendiri dari tim atau atas permintaan pihak yang berkepentingan, serta memberikan pendapat atas hasil kajian tersebut kepada Menteri.\n(4) Ketentuan lebih lanjut mengenai kewenangan, susunan organisasi dan tata kerja tim ahli diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIII KETENTUAN PERALIHAN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIII KETENTUAN PERALIHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 157",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII KETENTUAN PERALIHAN",
      "teks": "(1) Anggaran dasar dari Perseroan yang telah memperoleh status badan hukum dan perubahan anggaran dasar yang telah disetujui atau dilaporkan kepada Menteri dan didaftarkan dalam daftar perusahaan sebelum Undang-Undang ini berlaku tetap berlaku jika tidak bertentangan dengan Undang-Undang ini.\n(2) Anggaran dasar dari Perseroan yang belum memperoleh status badan hukum atau anggaran dasar yang perubahannya belum disetujui atau dilaporkan kepada Menteri pada saat Undang-Undang ini mulai berlaku, wajib disesuaikan dengan Undang-Undang ini.\n(3) Perseroan yang telah memperoleh status badan hukum berdasarkan peraturan perundang-undangan, dalam jangka waktu 1 (satu) tahun setelah berlakunya Undang-Undang ini wajib menyesuaikan anggaran dasarnya dengan ketentuan Undang-Undang ini.\n(4) Perseroan yang tidak menyesuaikan anggaran dasarnya dalam jangka waktu sebagaimana dimaksud pada ayat (3) dapat dibubarkan berdasarkan putusan pengadilan negeri atas permohonan kejaksaan atau pihak yang berkepentingan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 158",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII KETENTUAN PERALIHAN",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, Perseroan yang tidak memenuhi ketentuan sebagaimana dimaksud dalam Pasal 36, dalam jangka waktu 1 (satu) tahun harus menyesuaikan dengan ketentuan Undang-Undang ini."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIV KETENTUAN PENUTUP",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIV KETENTUAN PENUTUP"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 159",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "teks": "Peraturan pelaksanaan dari Undang-Undang Nomor 1 Tahun 1995 tentang Perseroan Terbatas dinyatakan tetap berlaku sepanjang tidak bertentangan atau belum diganti dengan yang baru berdasarkan Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 160",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, Undang-Undang Nomor 1 Tahun 1995 tentang Perseroan Terbatas (Lembaran Negara Republik Indonesia Tahun 1995 Nomor 13, Tambahan Lembaran Negara Republik Indonesia Nomor 3587), dicabut dan dinyatakan tidak berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 161",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "teks": "Undang-Undang ini mulai berlaku pada tanggal diundangkan."
    },
    {
      "tipe": "PEMBUKAAN",
      "label": "Pengesahan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > PEMBUKAAN",
      "teks": "Agar setiap orang mengetahuinya, memerintahkan pengundangan Undang-Undang ini dengan penempatannya dalam Lembaran Negara Republik Indonesia.\nDisahkan di Jakarta pada tanggal 16 Agustus 2007\nPRESIDEN REPUBLIK INDONESIA,\nttd\nDR. H. SUSILO BAMBANG YUDHOYONO\nDiundangkan di Jakarta pada tanggal 16 Agustus 2007\nMENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA,\nttd\nANDI MATTALATTA\nLEMBARAN NEGARA REPUBLIK INDONESIA TAHUN 2007 NOMOR 106\nSalinan sesuai dengan aslinya\nDEPUTI MENTERI SEKRETARIS NEGARA BIDANG PERUNDANG-UNDANGAN,\nMUHAMMAD SAPTA MURTI"
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "PENJELASAN UMUM",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PENJELASAN_UMUM",
      "teks": "PENJELASAN ATAS UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 40 TAHUN 2007 TENTANG PERSEROAN TERBATAS\nI. UMUM\nPembangunan perekonomian nasional yang diselenggarakan berdasarkan demokrasi ekonomi dengan prinsip kebersamaan, efisiensi yang berkeadilan, berkelanjutan, berwawasan lingkungan, kemandirian, serta menjaga keseimbangan kemajuan dan kesatuan ekonomi nasional bertujuan untuk mewujudkan kesejahteraan masyarakat. Peningkatan pembangunan perekonomian nasional perlu didukung oleh suatu undang-undang yang mengatur tentang perseroan terbatas yang dapat menjamin iklim dunia usaha yang kondusif. Selama ini perseroan terbatas telah diatur dengan Undang-Undang Nomor 1 Tahun 1995 tentang Perseroan Terbatas, yang menggantikan peraturan perundang-undangan yang berasal dari zaman kolonial. Namun, dalam perkembangannya ketentuan dalam Undang-Undang tersebut dipandang tidak lagi memenuhi perkembangan hukum dan kebutuhan masyarakat karena keadaan ekonomi serta kemajuan ilmu pengetahuan, teknologi, dan informasi sudah berkembang begitu pesat khususnya pada era globalisasi. Di samping itu, meningkatnya tuntutan masyarakat akan layanan yang cepat, kepastian hukum, serta tuntutan akan pengembangan dunia usaha yang sesuai dengan prinsip pengelolaan perusahaan yang baik (good corporate governance) menuntut penyempurnaan Undang-Undang Nomor 1 Tahun 1995 tentang Perseroan Terbatas.\nDalam Undang-Undang ini telah diakomodasi berbagai ketentuan mengenai Perseroan, baik berupa penambahan ketentuan baru, perbaikan penyempurnaan, maupun mempertahankan ketentuan lama yang dinilai masih relevan. Untuk lebih memperjelas hakikat Perseroan, di dalam Undang-Undang ini ditegaskan bahwa Perseroan adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham, dan memenuhi persyaratan yang ditetapkan dalam Undang-Undang ini serta peraturan pelaksanaannya.\nDalam rangka memenuhi tuntutan masyarakat untuk memperoleh layanan yang cepat, Undang-Undang ini mengatur tata cara:\n1. pengajuan permohonan dan pemberian pengesahan status badan hukum;\n2. pengajuan permohonan dan pemberian persetujuan perubahan anggaran dasar;\n3. penyampaian pemberitahuan dan penerimaan pemberitahuan perubahan anggaran dasar dan/atau pemberitahuan dan penerimaan pemberitahuan perubahan data lainnya, yang dilakukan melalui jasa teknologi informasi sistem administrasi badan hukum secara elektronik di samping tetap dimungkinkan menggunakan sistem manual dalam keadaan tertentu.\nBerkenaan dengan permohonan pengesahan badan hukum Perseroan, ditegaskan bahwa permohonan tersebut merupakan wewenang pendiri bersama-sama yang dapat dilaksanakan sendiri atau dikuasakan kepada notaris.\nAkta pendirian Perseroan yang telah disahkan dan akta perubahan anggaran dasar yang telah disetujui dan/atau diberitahukan kepada Menteri dicatat dalam daftar Perseroan dan diumumkan dalam Tambahan Berita Negara Republik Indonesia dilakukan oleh Menteri. Dalam hal pemberian status badan hukum, persetujuan dan/atau penerimaan pemberitahuan perubahan anggaran dasar, dan perubahan data lainnya, Undang-Undang ini tidak dikaitkan dengan Undang-Undang tentang Wajib Daftar Perusahaan.\nUntuk lebih memperjelas dan mempertegas ketentuan yang menyangkut Organ Perseroan, dalam Undang-Undang ini dilakukan perubahan atas ketentuan yang menyangkut penyelenggaraan Rapat Umum Pemegang Saham (RUPS) dengan memanfaatkan perkembangan teknologi. Dengan demikian, penyelenggaraan RUPS dapat dilakukan melalui media elektronik seperti telekonferensi, video konferensi, atau sarana media elektronik lainnya.\nUndang-Undang ini juga memperjelas dan mempertegas tugas dan tanggung jawab Direksi dan Dewan Komisaris. Undang-Undang ini mengatur mengenai komisaris independen dan komisaris utusan.\nSesuai dengan berkembangnya kegiatan usaha berdasarkan prinsip syariah, Undang-Undang ini mewajibkan Perseroan yang menjalankan kegiatan usaha berdasarkan prinsip syariah selain mempunyai Dewan Komisaris juga mempunyai Dewan Pengawas Syariah. Tugas Dewan Pengawas Syariah adalah memberikan nasihat dan saran kepada Direksi serta mengawasi kegiatan Perseroan agar sesuai dengan prinsip syariah.\nDalam Undang-Undang ini ketentuan mengenai struktur modal Perseroan tetap sama, yaitu terdiri atas modal dasar, modal ditempatkan, dan modal disetor. Namun, modal dasar Perseroan diubah menjadi paling sedikit Rp50.000.000,00 (lima puluh juta rupiah), sedangkan kewajiban penyetoran atas modal yang ditempatkan harus penuh. Mengenai pembelian kembali saham yang telah dikeluarkan oleh Perseroan pada prinsipnya tetap dapat dilakukan dengan syarat batas waktu Perseroan menguasai saham yang telah dibeli kembali paling lama 3 (tiga) tahun.\nKhusus tentang penggunaan laba, Undang-Undang ini menegaskan bahwa Perseroan dapat membagi laba dan menyisihkan cadangan wajib apabila Perseroan mempunyai saldo laba positif.\nDalam Undang-Undang ini diatur mengenai Tanggung Jawab Sosial dan Lingkungan yang bertujuan mewujudkan pembangunan ekonomi berkelanjutan guna meningkatkan kualitas kehidupan dan lingkungan yang bermanfaat bagi Perseroan itu sendiri, komunitas setempat, dan masyarakat pada umumnya. Ketentuan ini dimaksudkan untuk mendukung terjalinnya hubungan Perseroan yang serasi, seimbang, dan sesuai dengan lingkungan, nilai, norma, dan budaya masyarakat setempat, maka ditentukan bahwa Perseroan yang kegiatan usahanya di bidang dan/atau berkaitan dengan sumber daya alam wajib melaksanakan Tanggung Jawab Sosial dan Lingkungan. Untuk melaksanakan kewajiban Perseroan tersebut, kegiatan Tanggung Jawab Sosial dan Lingkungan harus dianggarkan dan diperhitungkan sebagai biaya Perseroan yang dilaksanakan dengan memperhatikan kepatutan dan kewajaran. Kegiatan tersebut dimuat dalam laporan tahunan Perseroan. Dalam hal Perseroan tidak melaksanakan Tanggung Jawab Sosial dan Lingkungan maka Perseroan yang bersangkutan dikenai sanksi sesuai dengan ketentuan peraturan perundang-undangan.\nUndang-Undang ini mempertegas ketentuan mengenai pembubaran, likuidasi, dan berakhirnya status badan hukum Perseroan dengan memperhatikan ketentuan dalam Undang-Undang tentang Kepailitan dan Penundaan Kewajiban Pembayaran Utang.\nDalam rangka pelaksanaan dan perkembangan Undang-Undang ini dibentuk tim ahli pemantauan hukum perseroan yang tugasnya memberikan masukan kepada Menteri berkenaan dengan Perseroan. Untuk menjamin kredibilitas tim ahli, keanggotaan tim ahli tersebut terdiri atas berbagai unsur baik dari pemerintah, pakar/akademisi, profesi, dan dunia usaha.\nDengan pengaturan yang komprehensif yang melingkupi berbagai aspek Perseroan, maka Undang-Undang ini diharapkan memenuhi kebutuhan hukum masyarakat serta lebih memberikan kepastian hukum, khususnya kepada dunia usaha."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 1\nCukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 2\nCukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 3\nAyat (1) Ketentuan dalam ayat ini mempertegas ciri Perseroan bahwa pemegang saham hanya bertanggung jawab sebesar setoran atas seluruh saham yang dimilikinya dan tidak meliputi harta kekayaan pribadinya.\nAyat (2) Dalam hal-hal tertentu tidak tertutup kemungkinan hapusnya tanggung jawab terbatas tersebut apabila terbukti terjadi hal-hal yang disebutkan dalam ayat ini.\nTanggung jawab pemegang saham sebesar setoran atas seluruh saham yang dimilikinya kemungkinan hapus apabila terbukti, antara lain terjadi pencampuran harta kekayaan pribadi pemegang saham dan harta kekayaan Perseroan sehingga Perseroan didirikan semata-mata sebagai alat yang dipergunakan pemegang saham untuk memenuhi tujuan pribadinya sebagaimana dimaksud dalam huruf b dan huruf d."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 4\nBerlakunya Undang-Undang ini, anggaran dasar Perseroan, dan ketentuan peraturan perundang-undangan lain, tidak mengurangi kewajiban setiap Perseroan untuk menaati asas itikad baik, asas kepantasan, asas kepatutan, dan prinsip tata kelola Perseroan yang baik (good corporate governance) dalam menjalankan Perseroan.\nYang dimaksud dengan “ketentuan peraturan perundang-undangan lainnya\" adalah semua peraturan perundang-undangan yang berkaitan dengan keberadaan dan jalannya Perseroan, termasuk peraturan pelaksanaannya, antara lain peraturan perbankan, peraturan perasuransian, peraturan lembaga keuangan.\nDalam hal terdapat pertentangan antara anggaran dasar dan Undang-Undang ini yang berlaku adalah Undang-Undang ini."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 5\nTempat kedudukan Perseroan sekaligus merupakan kantor pusat Perseroan.\nPerseroan wajib mempunyai alamat sesuai dengan tempat kedudukannya yang harus disebutkan, antara lain dalam surat-menyurat dan melalui alamat tersebut Perseroan dapat dihubungi."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 6\nApabila Perseroan didirikan untuk jangka waktu terbatas, lamanya jangka waktu tersebut harus disebutkan secara tegas, misalnya untuk waktu 10 (sepuluh) tahun, 20 (dua puluh) tahun, 35 (tiga puluh lima) tahun, dan seterusnya. Demikian juga apabila Perseroan didirikan untuk jangka waktu tidak terbatas harus disebutkan secara tegas dalam anggaran dasar."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 7\nAyat (1) Yang dimaksud dengan “orang\" adalah orang perseorangan, baik warga negara Indonesia maupun asing atau badan hukum Indonesia atau asing.\nKetentuan dalam ayat ini menegaskan prinsip yang berlaku berdasarkan Undang-Undang ini bahwa pada dasarnya sebagai badan hukum, Perseroan didirikan berdasarkan perjanjian, karena itu mempunyai lebih dari 1 (satu) orang pemegang saham.\nAyat (2) Cukup jelas.\nAyat (3) Dalam hal Peleburan seluruh aktiva dan pasiva Perseroan yang meleburkan diri masuk menjadi modal Perseroan hasil Peleburan dan pendiri tidak mengambil bagian saham sehingga pendiri dari Perseroan hasil Peleburan adalah Perseroan yang meleburkan diri dan nama pemegang saham dari Perseroan hasil Peleburan adalah nama pemegang saham dari Perseroan yang meleburkan diri.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Perikatan dan kerugian Perseroan yang menjadi tanggung jawab pribadi pemegang saham adalah perikatan dan kerugian yang terjadi setelah lewat waktu 6 (enam) bulan tersebut.\nYang dimaksud dengan \"pihak yang berkepentingan” adalah kejaksaan untuk kepentingan umum, pemegang saham, Direksi, Dewan Komisaris, karyawan Perseroan, kreditor, dan/atau pemangku kepentingan (stake holder) lainnya.\nAyat (7) Karena status dan karakteristik yang khusus, persyaratan jumlah pendiri bagi Perseroan sebagaimana dimaksud pada ayat ini diatur dalam peraturan perundang-undangan tersendiri.\nHuruf a Yang dimaksud dengan “persero” adalah badan usaha milik negara yang berbentuk Perseroan yang modalnya terbagi dalam saham yang diatur dalam Undang-Undang tentang Badan Usaha Milik Negara.\nHuruf b Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 8\nAyat (1) Cukup jelas.\nAyat (2) Huruf a Dalam mendirikan Perseroan diperlukan kejelasan mengenai kewarganegaraan pendiri. Pada dasarnya badan hukum Indonesia yang berbentuk Perseroan didirikan oleh warga negara Indonesia atau badan hukum Indonesia. Namun, kepada warga negara asing atau badan hukum asing diberikan kesempatan untuk mendirikan badan hukum Indonesia yang berbentuk Perseroan sepanjang undang-undang yang mengatur bidang usaha Perseroan tersebut memungkinkan, atau pendirian Perseroan tersebut diatur dengan undang-undang tersendiri.\nDalam hal pendiri adalah badan hukum asing, nomor dan tanggal pengesahan badan hukum pendiri adalah dokumen yang sejenis dengan itu, antara lain certificate of incorporation.\nDalam hal pendiri adalah badan hukum negara atau daerah, diperlukan Peraturan Pemerintah tentang penyertaan dalam Perseroan atau Peraturan Daerah tentang penyertaan daerah dalam Perseroan.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan “mengambil bagian saham” adalah jumlah saham yang diambil oleh pemegang saham pada saat pendirian Perseroan.\nApabila ada penyetoran yang melebihi nilai nominal sehingga menimbulkan selisih antara nilai yang sebenarnya dibayar dengan nilai nominal, selisih tersebut dicatat dalam laporan keuangan sebagai agio.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 9\nAyat (1) Yang dimaksud dengan “jasa teknologi informasi sistem administrasi badan hukum\" adalah jenis pelayanan yang diberikan kepada masyarakat dalam proses pengesahan badan hukum Perseroan.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 10\nAyat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “langsung” dalam ketentuan ini adalah pada saat yang bersamaan dengan saat pengajuan permohonan diterima.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Yang dimaksud dengan “tanda tangan secara elektronik” adalah tanda tangan yang dilekatkan atau disertakan pada data elektronik oleh pejabat yang berwenang yang membuktikan keotentikan data yang berupa gambar elektronik dari tanda tangan pejabat yang berwenang tersebut yang dibuat melalui media komputer.\nAyat (7) Lihat penjelasan ayat (3).\nAyat (8) Permohonan sebagaimana dimaksud pada ayat ini tidak dikenakan biaya tambahan.\nAyat (9) Cukup jelas.\nAyat (10) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 11\nCukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 12\nAyat (1) Dalam ketentuan ini “perbuatan hukum” yang dimaksud, antara lain perbuatan hukum yang dilakukan oleh calon pendiri dengan pihak lain yang akan diperhitungkan dengan kepemilikan dan penyetoran saham calon pendiri dalam Perseroan.\nAyat (2) Yang dimaksud dengan “dilekatkan” adalah penyatuan dokumen yang dilakukan dengan cara melekatkan atau menjahitkan dokumen tersebut sebagai satu kesatuan dengan akta pendirian.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 13\nAyat (1) Ketentuan ini mengatur tata cara yang harus ditempuh untuk mengalihkan kepada Perseroan hak dan/atau kewajiban yang timbul dari perbuatan calon pendiri yang dibuat sebelum Perseroan didirikan melalui penerimaan secara tegas atau pengambilalihan hak dan kewajiban yang timbul dari perbuatan hukum dimaksud.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 14\nAyat (1) Yang dimaksud dengan “perbuatan hukum atas nama Perseroan” adalah perbuatan hukum, baik yang menyebutkan Perseroan sebagai pihak dalam perbuatan hukum maupun menyebutkan Perseroan sebagai pihak yang berkepentingan dalam perbuatan hukum.\nKetentuan ini dimaksudkan untuk menegaskan bahwa anggota Direksi tidak dapat melakukan perbuatan hukum atas nama Perseroan yang belum memperoleh status badan hukum, tanpa persetujuan semua pendiri, anggota Direksi lainnya dan anggota Dewan Komisaris.\nAyat (2) Yang dimaksud dengan \"tanggung jawab pendiri yang bersangkutan dan tidak mengikat Perseroan\" adalah tanggung jawab pendiri yang melakukan perbuatan tersebut secara pribadi dan Perseroan tidak bertanggung jawab atas perbuatan hukum yang dilakukan pendiri tersebut.\nAyat (3) Cukup jelas.\nAyat (4) Yang dimaksud dengan “dihadiri” adalah dihadiri sendiri ataupun diwakilkan berdasarkan surat kuasa.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 15\nAyat (1) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Lihat penjelasan Pasal 6.\nHuruf d Cukup jelas.\nHuruf e Cukup jelas.\nHuruf f Cukup jelas.\nHuruf g Cukup jelas.\nHuruf h Yang dimaksud dengan \"tata cara pengangkatan” adalah termasuk prosedur pemilihan, antara lain pemilihan secara lisan atau dengan surat tertutup dan pemilihan calon secara perseorangan atau paket.\nHuruf i Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 16\nAyat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Dalam hal tidak ada tulisan singkatan \"Tbk\", berarti Perseroan itu berstatus tertutup.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 17\nAyat (1) Ketentuan pada ayat (1) tidak menutup kemungkinan Perseroan mempunyai tempat kedudukan di desa atau di kecamatan sepanjang anggaran dasar mencantumkan nama kota atau kabupaten dari desa dan kecamatan tersebut. Contoh: PT A bertempat kedudukan di desa Bojongsari, Kecamatan Pandaan, Kabupaten Pasuruan.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 18\nMaksud dan tujuan merupakan usaha pokok Perseroan.\nKegiatan usaha merupakan kegiatan yang dijalankan oleh Perseroan dalam rangka mencapai maksud dan tujuannya, yang harus dirinci secara jelas dalam anggaran dasar, dan rincian tersebut tidak boleh bertentangan dengan anggaran dasar."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 19\nCukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 20\nAyat (1) Persetujuan kurator dilaksanakan sebelum pengambilan keputusan perubahan anggaran dasar. Hal tersebut dimaksudkan untuk menghindari kemungkinan adanya penolakan oleh kurator sehingga berakibat keputusan perubahan anggaran dasar menjadi batal.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 21\nAyat (1) Cukup jelas.\nAyat (2) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Lihat penjelasan Pasal 6.\nHuruf d Cukup jelas.\nHuruf e Cukup jelas.\nHuruf f Perubahan anggaran dasar dari status Perseroan yang tertutup menjadi Perseroan Terbuka atau sebaliknya meliputi perubahan seluruh ketentuan anggaran dasar sehingga persetujuan Menteri diberikan atas perubahan seluruh anggaran dasar tersebut.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Yang dimaksud dengan “harus dinyatakan dengan akta notaris” adalah harus dalam bentuk akta pernyataan keputusan rapat atau akta perubahan anggaran dasar.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas.\nAyat (8) Cukup jelas.\nAyat (9) Dalam hal permohonan tetap diajukan, Menteri wajib menolak permohonan atau pemberitahuan tersebut."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Ketentuan pada ayat ini tidak mengurangi ketentuan sebagaimana dimaksud dalam Pasal 21 ayat (7).\nContoh:\nPerseroan didirikan untuk 50 (lima puluh) tahun dan akan berakhir pada tanggal 15 November 2007 sesuai ketentuan sebagaimana dimaksud dalam Pasal 22 ayat (1) apabila jangka waktu berdirinya Perseroan akan diperpanjang, permohonan persetujuan perubahan anggaran dasar mengenai perpanjangan jangka waktu tersebut harus sudah diajukan kepada Menteri paling lambat tanggal 15 September 2007.\nDalam hal RUPS telah mengambil keputusan untuk memperpanjang jangka waktu tersebut pada tanggal 1 Agustus 2007 dan telah dinyatakan dalam akta Notaris pada tanggal 7 Agustus 2007, pengajuan permohonan kepada Menteri harus diajukan paling lambat 7 September 2007.\nDalam hal RUPS untuk perpanjangan jangka waktu tersebut diadakan pada tanggal 20 Agustus 2007, perpanjangan jangka waktu tersebut harus dinyatakan dalam akta Notaris dan diajukan permohonannya kepada Menteri paling lambat pada tanggal 15 September 2007 sesuai dengan ketentuan sebagaimana dimaksud dalam Pasal 22 ayat (1).\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “Undang-Undang ini menentukan lain\" adalah, antara lain sebagaimana dimaksud dalam Pasal 25 dan Pasal 26 Undang-Undang ini yang mengatur adanya persyaratan yang harus dipenuhi sebelum berlakunya Keputusan Menteri atau adanya tanggal kemudian yang ditetapkan dalam Keputusan Menteri, yang memuat syarat tunda yang harus dipenuhi lebih dahulu atau tanggal kemudian."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Huruf a Cukup jelas.\nHuruf b Yang dimaksud dengan “tanggal kemudian yang ditetapkan\" adalah tanggal setelah tanggal persetujuan Menteri.\nHuruf c Yang dimaksud dengan \"tanggal kemudian yang ditetapkan dalam akta Penggabungan atau akta Pengambilalihan” adalah tanggal yang telah disepakati oleh para pihak dan merupakan tanggal setelah tanggal penerimaan pemberitahuan perubahan anggaran dasar oleh Menteri."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan “perubahan data Perseroan” adalah antara lain data tentang pemindahan hak atas saham, penggantian anggota Direksi dan Dewan Komisaris, pembubaran Perseroan.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) . . .\nAyat (6) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan “kegiatan usaha tertentu”, antara lain usaha perbankan, asuransi, atau freight forwarding.\nAyat (3) Ketentuan pada ayat ini diperlukan untuk mengantisipasi perubahan keadaan perekonomian."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan “bukti penyetoran yang sah”, antara lain bukti setoran pemegang saham ke dalam rekening bank atas nama Perseroan, data dari laporan keuangan yang telah diaudit oleh akuntan, atau neraca Perseroan yang ditandatangani oleh Direksi dan Dewan Komisaris.\nAyat (3) Ketentuan ini menegaskan bahwa tidak dimungkinkan penyetoran atas saham dengan cara mengangsur."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Pada umumnya penyetoran saham adalah dalam bentuk uang.\nNamun, tidak ditutup kemungkinan penyetoran saham dalam bentuk lain, baik berupa benda berwujud maupun benda tidak berwujud, yang dapat dinilai dengan uang dan yang secara nyata telah diterima oleh Perseroan.\nPenyetoran saham dalam bentuk lain selain uang harus disertai rincian yang menerangkan nilai atau harga, jenis atau macam, status, tempat kedudukan, dan lain-lain yang dianggap perlu demi kejelasan mengenai penyetoran tersebut.\nAyat (2) . . .\nAyat (2) Nilai wajar setoran modal saham ditentukan sesuai dengan nilai pasar. Jika nilai pasar tidak tersedia, nilai wajar ditentukan berdasarkan teknik penilaian yang paling sesuai dengan karakteristik setoran, berdasarkan informasi yang relevan dan terbaik.\nYang dimaksud dengan “ahli yang tidak terafiliasi” adalah ahli yang tidak mempunyai:\na. hubungan keluarga karena perkawinan atau keturunan sampai derajat kedua, baik secara horizontal maupun vertikal dengan pegawai, anggota Direksi, Dewan Komisaris, atau pemegang saham dari Perseroan;\nb. hubungan dengan Perseroan karena adanya kesamaan satu atau lebih anggota Direksi atau Dewan Komisaris;\nc. hubungan pengendalian dengan Perseroan baik langsung maupun tidak langsung; dan/atau\nd. saham dalam Perseroan sebesar 20% (dua puluh persen) atau lebih.\nAyat (3) Maksud diumumkannya penyetoran saham dalam bentuk benda tidak bergerak dalam Surat Kabar, adalah agar diketahui umum dan memberikan kesempatan kepada pihak yang berkepentingan untuk dapat mengajukan keberatan atas penyerahan benda tersebut sebagai setoran modal saham, misalnya ternyata diketahui benda tersebut bukan milik penyetor."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Diperlukannya persetujuan RUPS sebagaimana dimaksud pada ayat ini adalah untuk menegaskan bahwa hanya dengan persetujuan RUPS dapat dilakukan kompensasi karena dengan disetujuinya kompensasi, hak didahulukan pemegang saham lainnya untuk mengambil saham baru dengan sendirinya dilepaskan.\nAyat (2) Berdasarkan ketentuan pada ayat ini, bunga dan denda yang terutang sekalipun telah jatuh waktu dan harus dibayar karena secara nyata tidak diterima oleh Perseroan, tidak dapat dikompensasikan sebagai setoran saham.\nHuruf a Cukup jelas.\nHuruf b Yang dimaksud dalam ketentuan ini adalah pihak yang menjadi penanggung atau penjamin utang Perseroan telah membayar lunas utang Perseroan sehingga mempunyai hak tagih terhadap Perseroan.\nHuruf c Yang dimaksud dalam ketentuan ini adalah kewajiban pembayaran utang oleh Perseroan dalam kedudukannya sebagai penanggung atau penjamin menjadi hapus hak tagih kreditor dikompensasi dengan setoran saham yang dikeluarkan oleh Perseroan.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Pada prinsipnya, pengeluaran saham adalah suatu upaya pengumpulan modal, maka kewajiban penyetoran atas saham seharusnya dibebankan kepada pihak lain. Demi kepastian, Pasal ini menentukan bahwa Perseroan tidak boleh mengeluarkan saham untuk dimiliki sendiri.\nLarangan tersebut termasuk juga larangan kepemilikan silang (cross holding) yang terjadi apabila Perseroan memiliki saham yang dikeluarkan oleh Perseroan lain yang memiliki saham Perseroan tersebut, baik secara langsung maupun tidak langsung.\nPengertian kepemilikan silang secara langsung adalah apabila Perseroan pertama memiliki saham pada Perseroan kedua tanpa melalui kepemilikan pada satu “Perseroan antara” atau lebih dan sebaliknya Perseroan kedua memiliki saham pada Perseroan pertama.\nPengertian kepemilikan silang secara tidak langsung adalah kepemilikan Perseroan pertama atas saham pada Perseroan kedua melalui kepemilikan pada satu “Perseroan antara” atau lebih dan sebaliknya Perseroan kedua memiliki saham pada Perseroan pertama.\nAyat (2) Kepemilikan saham yang mengakibatkan pemilikan saham oleh Perseroan sendiri atau pemilikan saham secara kepemilikan silang tidak dilarang jika pemilikan saham tersebut diperoleh berdasarkan peralihan karena hukum, hibah, atau hibah wasiat oleh karena dalam hal ini tidak ada pengeluaran saham yang memerlukan setoran dana dari pihak lain sehingga tidak melanggar ketentuan larangan sebagaimana dimaksud pada ayat (1) Ayat (3) ...\nAyat (3) Cukup jelas.\nAyat (4) Yang dimaksud dengan “perusahaan efek” adalah sebagaimana dimaksud dalam Undang-Undang tentang Pasar Modal."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Pembelian kembali saham Perseroan tidak menyebabkan pengurangan modal, kecuali apabila saham tersebut ditarik kembali.\nHuruf a Yang dimaksud dengan “kekayaan bersih” adalah seluruh harta kekayaan Perseroan dikurangi seluruh kewajiban Perseroan sesuai dengan laporan keuangan terbaru yang disahkan oleh RUPS dalam waktu 6 (enam) bulan terakhir.\nHuruf b Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Ketentuan jangka waktu 3 (tiga) tahun pada ayat ini dimaksudkan agar Perseroan dapat menentukan apakah saham tersebut akan dijual atau ditarik kembali dengan cara pengurangan modal."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “pelaksanaan” adalah penentuan tentang saat, cara pembelian kembali saham, dan jumlah saham yang akan dibeli kembali, tetapi tidak termasuk hal-hal yang menjadi tugas Direksi dalam pembelian kembali saham, seperti melakukan pembayaran, menyimpan surat saham, dan mencatatkan dalam daftar pemegang saham.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “modal Perseroan“ adalah modal dasar, modal ditempatkan, dan modal disetor.\nAyat (2) Yang dimaksud dengan “pelaksanaan” pada ayat ini adalah penentuan saat, cara, dan jumlah penambahan modal yang tidak melebihi batas maksimum yang telah ditetapkan oleh RUPS, tetapi tidak termasuk hal-hal yang menjadi tugas Direksi dalam penambahan modal, seperti menerima setoran saham dan mencatatnya dalam daftar pemegang saham.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan \"jumlah saham dengan hak suara\" adalah jumlah seluruh saham dengan hak suara yang telah dikeluarkan oleh Perseroan.\nYang dimaksud dengan “kecuali ditentukan lebih besar dalam anggaran dasar” adalah kuorum yang ditetapkan dalam anggaran dasar lebih tinggi daripada kuorum yang ditentukan pada ayat ini.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Huruf a Yang dimaksud dengan “saham yang ditujukan kepada karyawan Perseroan\", antara lain saham yang dikeluarkan dalam rangka ESOP (employee stocks option program) Perseroan dengan segenap hak dan kewajiban yang melekat padanya.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan “reorganisasi dan/atau restrukturisasi\", antara lain Penggabungan, Peleburan, Pengambilalihan, kompensasi piutang, atau Pemisahan.\nAyat (4) Yang dimaksud dengan “jangka waktu 14 (empat belas) hari\" termasuk batas waktu bagi pemegang saham untuk mengambil bagian dari pemegang saham lain yang tidak menggunakan haknya."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “pengurangan modal” adalah pengurangan modal dasar, modal ditempatkan, dan modal disetor.\nPengurangan modal ditempatkan dan modal disetor dapat terjadi dengan cara menarik kembali saham yang telah dikeluarkan untuk dihapus atau dengan cara menurunkan nilai nominal saham.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) “Penarikan kembali saham” berarti saham tersebut ditarik dari peredaran dalam rangka pengurangan modal ditempatkan dan modal disetor.\nAyat (2) Yang dimaksud dengan “penarikan kembali saham” adalah penarikan kembali saham yang mengakibatkan penghapusan saham tersebut dari peredaran.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dalam ketentuan ini adalah Perseroan hanya diperkenankan mengeluarkan saham atas nama pemiliknya dan Perseroan tidak boleh mengeluarkan saham atas tunjuk.\nAyat (2) Yang dimaksud dengan “instansi yang berwenang\" adalah instansi yang berdasarkan undang-undang berwenang mengawasi Perseroan yang melakukan kegiatan usahanya di bidang tertentu, misalnya Bank Indonesia berwenang mengawasi Perseroan di bidang perbankan, Menteri Energi dan Sumber Daya Mineral berwenang mengawasi Perseroan di bidang energi dan pertambangan.\nAyat (3) Yang dimaksud dengan \"tidak dapat menjalankan hak selaku pemegang saham\", misalnya hak untuk dicatat dalam daftar pemegang saham, hak untuk menghadiri dan mengeluarkan suara dalam RUPS, atau hak untuk menerima dividen yang dibagikan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan “jumlah yang disetor” adalah paling sedikit sama dengan jumlah nilai nominal saham.\nHuruf d Cukup jelas.\nHuruf e Cukup jelas.\nAyat (2) . . .\nAyat (2) Yang dimaksud dengan “daftar khusus\" adalah salah satu sumber informasi mengenai besarnya kepemilikan dan kepentingan anggota Direksi dan Dewan Komisaris Perseroan pada Perseroan yang bersangkutan atau Perseroan lain sehingga pertentangan kepentingan yang mungkin timbul dapat ditekan sekecil mungkin.\nYang dimaksud dengan “keluarganya” adalah istri atau suami dan anak-anaknya.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Yang dimaksud dengan \"tidak mengatur lain“ adalah bukan berarti tidak diadakan kewajiban untuk menyusun daftar pemegang saham dan daftar khusus bagi Perseroan Terbuka, tetapi peraturan perundang-undangan di bidang pasar modal dapat menentukan kriteria data yang harus dimasukkan dalam daftar pemegang saham dan daftar khusus."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pengaturan bentuk bukti pemilikan saham ditetapkan dalam anggaran dasar sesuai dengan kebutuhan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Berdasarkan ketentuan ini, para pemegang saham tidak diperkenankan membagi-bagi hak atas 1 (satu) saham menurut kehendaknya sendiri.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “klasifikasi saham” adalah pengelompokan saham berdasarkan karakteristik yang sama.\nAyat (2) . . .\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan \"saham biasa“ adalah saham yang mempunyai hak suara untuk mengambil keputusan dalam RUPS mengenai segala hal yang berkaitan dengan pengurusan Perseroan, mempunyai hak untuk menerima dividen yang dibagikan, dan menerima sisa kekayaan hasil likuidasi.\nHak suara yang dimiliki oleh pemegang saham biasa dapat dimiliki juga oleh pemegang saham klasifikasi lain.\nAyat (4) Bermacam-macam klasifikasi saham tidak selalu menunjukkan bahwa klasifikasi tersebut masing-masing berdiri sendiri, terpisah satu sama lain, tetapi dapat merupakan gabungan dari 2 (dua) klasifikasi atau lebih."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Pecahan saham hanya dimungkinkan apabila diatur dalam anggaran dasar.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 56",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “akta”, baik berupa akta yang dibuat di hadapan notaris maupun akta bawah tangan.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “memberitahukan perubahan susunan pemegang saham kepada Menteri"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 57",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan \"peralihan hak karena hukum\", antara lain peralihan hak karena kewarisan atau peralihan hak sebagai akibat Penggabungan, Peleburan, atau Pemisahan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 58",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “hanya berlaku 1 (satu) kali"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 59",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 60",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Kepemilikan atas saham sebagai benda bergerak memberikan hak kebendaan kepada pemiliknya. Hak tersebut dapat dipertahankan terhadap setiap orang.\nAyat (2) Cukup jelas.\nAyat (3) Ketentuan ini dimaksudkan agar Perseroan atau pihak lain yang berkepentingan dapat mengetahui mengenai status saham tersebut.\nAyat (4) Ketentuan ini menegaskan kembali asas hukum yang tidak memungkinkan pengalihan hak suara terlepas dari kepemilikan atas saham. Sedangkan hak lain di luar hak suara dapat diperjanjikan sesuai dengan kesepakatan di antara pemegang saham dan pemegang agunan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 61",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Gugatan yang diajukan pada dasarnya memuat permohonan agar Perseroan menghentikan tindakan yang merugikan tersebut dan mengambil langkah tertentu baik untuk mengatasi akibat yang sudah timbul maupun untuk mencegah tindakan serupa di kemudian hari.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 62",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Huruf a Cukup jelas.\nHuruf b Yang dimaksud dengan “kekayaan bersih” adalah kekayaan bersih menurut neraca terbaru yang disahkan dalam waktu 6 (enam) bulan terakhir.\nHuruf c Cukup jelas.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 63",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 64",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan \"kecuali ditentukan lain dalam peraturan perundang-undangan” adalah peraturan perundang-undangan menentukan lain bahwa persetujuan atas rencana kerja diberikan oleh RUPS, maka anggaran dasar tidak dapat menentukan rencana kerja disetujui oleh Dewan Komisaris atau sebaliknya. Demikian juga, apabila peraturan perundang-undangan menentukan bahwa rencana kerja harus mendapat persetujuan dari Dewan Komisaris atau RUPS, maka anggaran dasar tidak dapat menentukan bahwa rencana kerja cukup disampaikan oleh Direksi kepada Dewan Komisaris atau RUPS.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 65",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 66",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Huruf a Cukup jelas.\nHuruf b Yang dimaksud dengan “laporan kegiatan Perseroan” adalah termasuk laporan tentang hasil atau kinerja Perseroan.\nHuruf c Cukup jelas.\nHuruf d Yang dimaksud dengan “rincian masalah” adalah termasuk sengketa atau perkara yang melibatkan Perseroan.\nHuruf e Cukup jelas.\nHuruf f Cukup jelas.\nHuruf g Cukup jelas.\nAyat (3) Yang dimaksud dengan “standar akuntansi keuangan“ adalah standar yang ditetapkan oleh Organisasi Profesi Akuntan Indonesia yang diakui Pemerintah Republik Indonesia.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 67",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “penandatanganan laporan tahunan"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 68",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 68 Ayat (1) Kewajiban untuk menyerahkan laporan keuangan kepada akuntan publik untuk diaudit timbul dari sifat Perseroan yang bersangkutan. Kewajiban untuk menyerahkan laporan keuangan kepada pengawasan ekstern dibenarkan dengan asumsi bahwa kepercayaan masyarakat tidak boleh dikecewakan. Demikian juga halnya dengan Perseroan yang untuk pembiayaannya mengharapkan dana dari pasar modal.\nHuruf a Yang dimaksud dengan \"kegiatan usaha Perseroan yang menghimpun dan/atau mengelola dana masyarakat\", antara lain bank, asuransi, reksa dana.\nHuruf b Yang dimaksud dengan “surat pengakuan utang“, antara lain obligasi.\nHuruf c Cukup jelas.\nHuruf d Lihat penjelasan Pasal 7 ayat (7) huruf a.\nHuruf e Cukup jelas.\nHuruf f Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Maksud pengumuman tersebut adalah dalam rangka akuntabilitas dan keterbukaan kepada masyarakat.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 69",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 69 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Laporan keuangan yang dihasilkan harus mencerminkan keadaan yang sebenarnya dari aktiva, kewajiban, modal, dan hasil usaha dari Perseroan. Direksi dan Dewan Komisaris mempunyai tanggung jawab penuh akan kebenaran isi laporan keuangan Perseroan.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 70",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 70 Ayat (1) Yang dimaksud dengan “laba bersih” adalah keuntungan tahun berjalan setelah dikurangi pajak.\nAyat (2) Yang dimaksud dengan “saldo laba yang positif adalah laba bersih Perseroan dalam tahun buku berjalan yang telah menutup akumulasi kerugian Perseroan dari tahun buku sebelumnya.\nAyat (3) Perseroan membentuk cadangan wajib dan cadangan lainnya.\nCadangan yang dimaksud pada ayat (1) adalah cadangan wajib.\nCadangan wajib adalah jumlah tertentu yang wajib disisihkan oleh Perseroan setiap tahun buku yang digunakan untuk menutup kemungkinan kerugian Perseroan pada masa yang akan datang. Cadangan wajib tidak harus selalu berbentuk uang tunai, tetapi dapat berbentuk aset lainnya yang mudah dicairkan dan tidak dapat dibagikan sebagai dividen. Sedangkan yang dimaksud dengan “cadangan lainnya” adalah cadangan di luar cadangan wajib yang dapat digunakan untuk berbagai keperluan Perseroan, misalnya untuk perluasan usaha, untuk pembagian dividen, untuk tujuan sosial, dan lain sebagainya.\nKetentuan paling sedikit 20 % (dua puluh persen) dari jumlah modal yang ditempatkan dan disetor dinilai sebagai jumlah yang layak untuk cadangan wajib.\nAyat (4) Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 71",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 71 Ayat (1) Keputusan RUPS pada ayat ini harus memperhatikan kepentingan Perseroan dan kewajaran.\nBerdasarkan keputusan RUPS tersebut dapat ditetapkan sebagian atau seluruh laba bersih digunakan untuk pembagian dividen kepada pemegang saham, cadangan, dan/atau pembagian lain seperti tansiem (tantieme) untuk anggota Direksi dan Dewan Komisaris, serta bonus untuk karyawan.\nPemberian tansiem dan bonus yang dikaitkan dengan kinerja Perseroan telah dianggarkan dan diperhitungkan sebagai biaya.\nAyat (2) Yang dimaksud dengan \"seluruh laba bersih\" adalah seluruh jumlah laba bersih dari tahun buku yang bersangkutan setelah dikurangi akumulasi kerugian Perseroan dari tahun buku sebelumnya.\nAyat (3) Dalam hal laba bersih Perseroan dalam tahun buku berjalan belum seluruhnya menutup akumulasi kerugian Perseroan dari tahun buku sebelumnya, Perseroan tidak dapat membagikan dividen karena Perseroan masih mempunyai saldo laba bersih negatif."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 72",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 72 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Contoh dividen interim yang harus dikembalikan adalah sebagai berikut.\nDividen interim yang telah dibagikan sebesar Rp1.000,00 (seribu rupiah) per saham. Perseroan menderita kerugian dan tidak mempunyai saldo laba positif sehingga tidak ada dividen yang dibagikan. Oleh karena itu, yang harus dikembalikan adalah Rp1.000,00 (seribu rupiah) per saham.\nSeandainya Perseroan menderita kerugian, tetapi Perseroan mempunyai laba ditahan (retained earning) dan saldo laba positif hingga, misalnya RUPS menetapkan dividen sebesar Rp200,00 (dua ratus rupiah) per saham. Oleh karena, itu saham yang harus dikembalikan adalah Rp1000,00 (seribu rupiah) dikurangi Rp200,00 (dua ratus rupiah) berarti Rp800,00 (delapan ratus rupiah).\nAyat (6) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 73",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 73 Ayat (1) Cukup jelas.\nAyat (2) Pengambilan dividen yang dimaksud adalah jumlah nominal dividen tidak termasuk bunga.\nAyat (3) Jumlah dividen yang tidak diambil dan menjadi hak Perseroan dibukukan dalam pos pendapatan lain-lain dari Perseroan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 74",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 74 Ayat (1) Ketentuan ini bertujuan untuk tetap menciptakan hubungan Perseroan yang serasi, seimbang, dan sesuai dengan lingkungan, nilai, norma, dan budaya masyarakat setempat.\nYang dimaksud dengan “Perseroan yang menjalankan kegiatan usahanya di bidang sumber daya alam\" adalah Perseroan yang kegiatan usahanya mengelola dan memanfaatkan sumber daya alam.\nYang dimaksud dengan \"Perseroan yang menjalankan kegiatan usahanya yang berkaitan dengan sumber daya alam\" adalah Perseroan yang tidak mengelola dan tidak memanfaatkan sumber daya alam, tetapi kegiatan usahanya berdampak pada fungsi kemampuan sumber daya alam.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “dikenai sanksi sesuai dengan ketentuan peraturan perundang-undangan” adalah dikenai segala bentuk sanksi yang diatur dalam peraturan perundang-undangan yang terkait.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 75",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 75 Ayat (1) Cukup jelas.\nAyat (2) Ketentuan pada ayat ini dimaksudkan berkenaan dengan hak pemegang saham untuk memperoleh keterangan berkaitan dengan mata acara rapat dengan tidak mengurangi hak pemegang saham untuk mendapatkan keterangan lainnya berkaitan dengan hak pemegang saham yang diatur dalam Undang-Undang ini, antara lain hak pemegang saham untuk melihat daftar pemegang saham dan daftar khusus sebagaimana dimaksud dalam Pasal 50 ayat (4), serta hak pemegang saham untuk mendapatkan bahan-bahan rapat segera setelah panggilan RUPS sebagaimana dimaksud dalam Pasal 82 ayat (3) dan ayat (4).\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 76",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 76 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Yang dimaksud dengan “ketentuan sebagaimana dimaksud pada ayat (3)"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 77",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 77 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Yang dimaksud dengan “disetujui dan ditandatangani” adalah disetujui dan ditandatangani secara fisik atau secara elektronik."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 78",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 78 Ayat (1) Yang dimaksud dengan \"RUPS lainnya\" dalam praktik sering dikenal sebagai RUPS luar biasa.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 79",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 79 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “alasan yang menjadi dasar permintaan diadakan RUPS\", antara lain karena Direksi tidak mengadakan atau masa jabatan anggota Direksi dan/atau anggota Dewan Komisaris akan berakhir.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas.\nAyat (8) Cukup jelas.\nAyat (9) Cukup jelas.\nAyat (10) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 80",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 80 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “penetapan pengadilan mengenai kuorum kehadiran dan ketentuan tentang persyaratan pengambilan keputusan RUPS"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 81",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 81 Ayat (1) Cukup jelas.\nAyat (2) Pemanggilan RUPS adalah kewajiban Direksi. Pemanggilan RUPS dapat dilakukan oleh Dewan Komisaris, antara lain dalam hal Direksi tidak menyelenggarakan RUPS sebagaimana ditentukan dalam Pasal 79 ayat (6), dalam hal Direksi berhalangan atau terdapat pertentangan kepentingan antara Direksi dan Perseroan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 82",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 82 Ayat (1) \"Jangka waktu 14 (empat belas) hari“ adalah jangka waktu minimal untuk memanggil rapat. Oleh karena itu, dalam anggaran dasar tidak dapat menentukan jangka waktu lebih singkat dari 14 (empat belas) hari kecuali untuk rapat kedua atau rapat ketiga sesuai dengan ketentuan Undang-Undang ini.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 83",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 83 Ayat (1) Pengumuman dimaksudkan untuk memberikan kesempatan kepada pemegang saham mengusulkan kepada Direksi untuk penambahan acara RUPS.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 84",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 84 Ayat (1) Yang dimaksud dengan “kecuali anggaran dasar menentukan lain” adalah apabila anggaran dasar mengeluarkan satu saham tanpa hak suara. Dalam hal anggaran dasar tidak menentukan hal tersebut, dapat dianggap bahwa setiap saham yang dikeluarkan mempunyai satu hak suara.\nAyat (2) Dengan ketentuan ini saham Perseroan yang dikuasai oleh Perseroan tersebut, baik langsung maupun tidak langsung, tidak mempunyai hak suara dan tidak dihitung dalam penentuan kuorum.\nHuruf a Yang dimaksud dengan “dikuasai sendiri” adalah dikuasai baik karena hubungan kepemilikan, pembelian kembali maupun karena gadai.\nHuruf b Cukup jelas.\nHuruf c Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 85",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 85 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Ketentuan pada ayat ini merupakan perwujudan asas musyawarah untuk mufakat yang diakui dalam Undang-Undang ini. Oleh karena itu, suara yang berbeda (split voting) tidak dibenarkan.\nBagi Perseroan Terbuka suara berbeda yang dikeluarkan oleh bank kustodian atau perusahaan efek yang mewakili pemegang saham dalam dana bersama (mutual fund) bukan merupakan suara yang berbeda sebagaimana dimaksud pada ayat ini.\nAyat (4) Dalam menetapkan kuorum RUPS, saham dari pemegang saham yang diwakili anggota Direksi, anggota Dewan Komisaris, dan karyawan Perseroan sebagai kuasa ikut dihitung, tetapi dalam pemungutan suara mereka sebagai kuasa pemegang saham tidak berhak mengeluarkan suara.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 86",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 86 Ayat (1) Penyimpangan atas ketentuan pada ayat ini hanya dimungkinkan dalam hal yang ditentukan Undang-Undang ini.\nAnggaran dasar tidak boleh menentukan kuorum yang lebih kecil daripada kuorum yang ditentukan oleh Undang-Undang ini.\nAyat (2) Dalam hal kuorum RUPS pertama tidak tercapai, rapat harus tetap dibuka dan kemudian ditutup dengan membuat notulen rapat yang menerangkan bahwa RUPS pertama tidak dapat dilanjutkan karena kuorum tidak tercapai dan selanjutnya dapat diadakan pemanggilan RUPS yang kedua.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Dalam hal kuorum RUPS kedua tidak tercapai, maka RUPS harus tetap dibuka dan kemudian ditutup dengan membuat notulen RUPS yang menerangkan bahwa RUPS kedua tidak dapat dilanjutkan karena kuorum tidak tercapai dan selanjutnya dapat diajukan permohonan kepada ketua pengadilan negeri untuk menetapkan kuorum RUPS ketiga.\nAyat (6) Dalam hal ketua pengadilan negeri berhalangan, penetapan dilakukan oleh pejabat lain yang mewakili ketua.\nAyat (7) Yang dimaksud dengan “bersifat final dan mempunyai kekuatan hukum tetap” adalah bahwa atas penetapan tersebut tidak dapat diajukan banding, kasasi, atau peninjauan kembali.\nAyat (8) Cukup jelas.\nAyat (9) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 87",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 87 Ayat (1) Yang dimaksud dengan “musyawarah untuk mufakat” adalah hasil kesepakatan yang disetujui oleh pemegang saham yang hadir atau diwakili dalam RUPS.\nAyat (2) Yang dimaksud dengan “disetujui lebih dari 1/2 (satu perdua) bagian"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 88",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 88 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 89",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 89 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “kuorum kehadiran dan/atau ketentuan tentang persyaratan pengambilan keputusan RUPS yang lebih besar“ adalah lebih besar daripada yang ditetapkan pada ayat ini, tetapi tidak lebih besar daripada yang ditetapkan pada ayat (1).\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 90",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 90 Ayat (1) Penandatanganan oleh ketua rapat dan paling sedikit 1 (satu) orang pemegang saham yang ditunjuk dari dan oleh peserta RUPS dimaksudkan untuk menjamin kepastian dan kebenaran isi risalah RUPS tersebut.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 91",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 91 Yang dimaksud dengan “pengambilan keputusan di luar RUPS” dalam praktik dikenal dengan usul keputusan yang diedarkan (circular resolution).\nPengambilan keputusan seperti ini dilakukan tanpa diadakan RUPS secara fisik, tetapi keputusan diambil dengan cara mengirimkan secara tertulis usul yang akan diputuskan kepada semua pemegang saham dan usul tersebut disetujui secara tertulis oleh seluruh pemegang saham.\nYang dimaksud dengan “keputusan yang mengikat” adalah keputusan yang mempunyai kekuatan hukum yang sama dengan keputusan RUPS."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 92",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 92 Ayat (1) Ketentuan ini menugaskan Direksi untuk mengurus Perseroan yang, antara lain meliputi pengurusan sehari-hari dari Perseroan.\nAyat (2) Yang dimaksud dengan “kebijakan yang dipandang tepat “ adalah kebijakan yang, antara lain didasarkan pada keahlian, peluang yang tersedia, dan kelaziman dalam dunia usaha yang sejenis.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Direksi sebagai organ Perseroan yang melakukan pengurusan Perseroan memahami dengan jelas kebutuhan pengurusan Perseroan. Oleh karena itu, apabila RUPS tidak menetapkan pembagian tugas dan wewenang anggota Direksi, sudah sewajarnya penetapan tersebut dilakukan oleh Direksi sendiri."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 93",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 93 Ayat (1) Jangka waktu 5 (lima) tahun terhitung sejak yang bersangkutan dinyatakan bersalah berdasarkan putusan pengadilan yang mempunyai kekuatan hukum tetap telah menyebabkan Perseroan pailit atau apabila dihukum terhitung sejak selesai menjalani hukuman.\nHuruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan \"sektor keuangan\", antara lain lembaga keuangan bank dan nonbank, pasar modal, dan sektor lain yang berkaitan dengan penghimpunan dan pengelolaan dana masyarakat.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “surat” adalah surat pernyataan yang dibuat oleh calon anggota Direksi yang bersangkutan berkenaan dengan persyaratan ayat (1) dan surat dari instansi yang berwenang berkenaan dengan persyaratan ayat (2)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 94",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 94 Ayat (1) Kewenangan RUPS tidak dapat dilimpahkan kepada organ Perseroan lainnya atau pihak lain.\nAyat (2) Cukup jelas.\nAyat (3) Persyaratan pengangkatan anggota Direksi untuk “jangka waktu tertentu\", dimaksudkan anggota Direksi yang telah berakhir masa jabatannya tidak dengan sendirinya meneruskan jabatannya semula, kecuali dengan pengangkatan kembali berdasarkan keputusan RUPS. Misalnya untuk jangka waktu 3 (tiga) tahun atau 5 (lima) tahun sejak tanggal pengangkatan, maka sejak berakhirnya jangka waktu tersebut mantan anggota Direksi yang bersangkutan tidak berhak lagi bertindak untuk dan atas nama Perseroan, kecuali setelah diangkat kembali oleh RUPS.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Yang dimaksud dengan “perubahan anggota Direksi” termasuk perubahan karena pengangkatan kembali anggota Direksi.\nAyat (8) Yang dimaksud dengan "
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 95",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 95 Ayat (1) Pengangkatan anggota Direksi batal karena hukum sejak diketahuinya pelanggaran terhadap ketentuan sebagaimana dimaksud dalam Pasal 93 oleh anggota Direksi lainnya atau Dewan Komisaris berdasarkan bukti yang sah dan kepada anggota Direksi yang bersangkutan diberitahukan secara tertulis pada saat diketahuinya hal tersebut.\nAyat (2) Yang dimaksud dengan “anggota Direksi lainnya” adalah anggota Direksi di luar anggota Direksi yang pengangkatannya batal dan mempunyai wewenang mewakili Direksi sesuai dengan anggaran dasar. Jika tidak terdapat anggota Direksi yang demikian itu, yang melaksanakan pengumuman adalah Dewan Komisaris.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 96",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 96 Ayat (1) Yang dimaksud dengan “besarnya gaji dan tunjangan anggota Direksi” adalah besarnya gaji dan tunjangan bagi setiap anggota Direksi.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 97",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 97 Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan "
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 98",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Undang-Undang ini pada dasarnya menganut sistem perwakilan kolegial, yang berarti tiap-tiap anggota Direksi berwenang mewakili Perseroan. Namun, untuk kepentingan Perseroan, anggaran dasar dapat menentukan bahwa Perseroan diwakili oleh anggota Direksi tertentu.\nAyat (3) Cukup jelas.\nAyat (4) Yang dimaksud \"tidak boleh bertentangan dengan Undang-Undang\", misalnya RUPS tidak berwenang memutuskan bahwa Direksi di dalam mengagunkan atau mengalihkan sebagian besar aset Perseroan cukup dengan persetujuan Dewan Komisaris atau persetujuan RUPS dengan kuorum kurang dari 3/4 (tiga perempat).\nYang dimaksud tidak boleh bertentangan dengan anggaran dasar\", misalnya anggaran dasar menentukan untuk peminjaman uang di atas Rp1.000.000.000,00 (satu miliar rupiah), Direksi harus mendapatkan persetujuan Dewan Komisaris.\nRUPS tidak berwenang mengambil keputusan bahwa untuk peminjaman uang di atas Rp500.000.000,00 (lima ratus juta rupiah), Direksi harus memperoleh persetujuan Dewan Komisaris tanpa terlebih dahulu mengubah ketentuan anggaran dasar tersebut."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 99",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 100",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Huruf a Daftar pemegang saham dan daftar khusus sesuai dengan ketentuan sebagaimana dimaksud dalam Pasal 50.\nRisalah RUPS dan risalah rapat Direksi memuat segala sesuatu yang dibicarakan dan diputuskan dalam setiap rapat.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan \"dokumen Perseroan lainnya\", antara lain risalah rapat Dewan Komisaris, perizinan Perseroan.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 101",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Setiap perolehan dan perubahan dalam kepemilikan saham tersebut wajib dilaporkan. Laporan Direksi mengenai hal ini dicatat dalam daftar khusus sebagaimana dimaksud dalam Pasal 50 ayat (2).\nYang dimaksud dengan “keluarganya“, lihat penjelasan Pasal 50 ayat (2)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 102",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Yang dimaksud dengan “kekayaan Perseroan” adalah semua barang baik bergerak maupun tidak bergerak, baik berwujud maupun tidak berwujud, milik Perseroan.\nYang dimaksud dengan “dalam 1 (satu) transaksi atau lebih, baik yang berkaitan satu sama lain maupun tidak\" adalah satu transaksi atau lebih yang secara kumulatif mengakibatkan dilampauinya ambang 50% (lima puluh persen).\nPenilaian lebih dari 50% (lima puluh persen) kekayaan bersih didasarkan pada nilai buku sesuai neraca yang terakhir disahkan RUPS.\nAyat (2) Berbeda dari transaksi pengalihan kekayaan, tindakan transaksi penjaminan utang kekayaan Perseroan sebagaimana dimaksud pada ayat (1) huruf b tidak dibatasi jangka waktunya, tetapi harus diperhatikan adalah jumlah kekayaan Perseroan yang masih dalam penjaminan dalam kurun waktu tertentu.\nAyat (3) Yang dimaksud dengan “tindakan pengalihan atau penjaminan kekayaan Perseroan, misalnya penjualan rumah oleh perusahaan real estate, penjualan surat berharga antarbank, dan penjualan barang dagangan (inventory) oleh perusahaan distribusi atau perusahaan dagang.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 103",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Yang dimaksud “kuasa\" adalah kuasa khusus untuk perbuatan tertentu sebagaimana disebutkan dalam surat kuasa."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 104",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Untuk membuktikan kesalahan atau kelalaian Direksi, gugatan diajukan ke pengadilan niaga sesuai dengan ketentuan dalam Undang-Undang tentang Kepailitan dan Penundaan Kewajiban Pembayaran Utang."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 105",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Keputusan RUPS untuk memberhentikan anggota Direksi dapat dilakukan dengan alasan yang bersangkutan tidak lagi memenuhi persyaratan sebagai anggota Direksi yang ditetapkan dalam Undang-Undang ini, antara lain melakukan tindakan yang merugikan Perseroan atau karena alasan lain yang dinilai tepat oleh RUPS.\nAyat (2) Cukup jelas.\nAyat (3) Pembelaan diri dalam ketentuan ini dilakukan secara tertulis.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 106",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Mengingat pemberhentian anggota Direksi oleh RUPS memerlukan waktu untuk pelaksanaannya, sedangkan kepentingan Perseroan tidak dapat ditunda, Dewan Komisaris sebagai organ pengawas wajar diberikan kewenangan untuk melakukan pemberhentian sementara.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) RUPS didahului dengan panggilan RUPS yang dilakukan oleh organ Perseroan yang memberhentikan sementara tersebut.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas.\nAyat (8) Cukup jelas.\nAyat (9) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 107",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Huruf a Tata cara pengunduran diri anggota Direksi yang diatur dalam anggaran dasar dengan pengajuan permohonan untuk mengundurkan diri yang harus diajukan dalam kurun waktu tertentu. Dengan lampaunya kurun waktu tersebut, anggota Direksi yang bersangkutan berhenti dari jabatannya tanpa memerlukan persetujuan RUPS.\nHuruf b Cukup jelas.\nHuruf c Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 108",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan “untuk kepentingan dan sesuai dengan maksud dan tujuan Perseroan\" adalah bahwa pengawasan dan pemberian nasihat yang dilakukan oleh Dewan Komisaris tidak untuk kepentingan pihak atau golongan tertentu, tetapi untuk kepentingan Perseroan secara menyeluruh dan sesuai dengan maksud dan tujuan Perseroan.\nAyat (3) Cukup jelas.\nAyat (4) Berbeda dari Direksi yang memungkinkan setiap anggota Direksi bertindak sendiri-sendiri dalam menjalankan tugas Direksi, setiap anggota Dewan Komisaris tidak dapat bertindak sendiri-sendiri dalam menjalankan tugas Dewan Komisaris, kecuali berdasarkan keputusan Dewan Komisaris.\nAyat (5) Perseroan yang kegiatan usahanya menghimpun dan/atau mengelola dana masyarakat, Perseroan yang menerbitkan surat pengakuan utang kepada masyarakat, atau Perseroan Terbuka memerlukan pengawasan dengan jumlah anggota Dewan Komisaris yang lebih besar karena menyangkut kepentingan masyarakat."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 109",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 110",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Lihat penjelasan Pasal 93 ayat (1) huruf c.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “surat” adalah surat pernyataan yang dibuat oleh calon anggota Dewan Komisaris yang bersangkutan berkenaan dengan persyaratan ayat (1) dan surat dari instansi yang berwenang berkenaan dengan persyaratan ayat (2)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 111",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 112",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Yang dimaksud dengan “anggota Dewan Komisaris lainnya"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 113",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 114",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Ketentuan pada ayat ini menegaskan bahwa apabila Dewan Komisaris bersalah atau lalai dalam menjalankan tugasnya sehingga mengakibatkan kerugian pada Perseroan karena pengurusan yang dilakukan oleh Direksi, anggota Dewan Komisaris tersebut ikut bertanggung jawab sebatas dengan kesalahan atau kelalaiannya.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 115",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 116",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Huruf a Risalah rapat Dewan Komisaris memuat segala sesuatu yang dibicarakan dan diputuskan dalam rapat tersebut.\nYang dimaksud dengan “salinannya” adalah salinan risalah rapat Dewan Komisaris karena asli risalah tersebut dipelihara Direksi sebagaimana dimaksud dalam Pasal 100.\nHuruf b Setiap perubahan dalam kepemilikan saham tersebut wajib juga dilaporkan.\nYang dimaksud dengan “keluarganya“, lihat penjelasan Pasal 50 ayat (2).\nHuruf c Laporan Dewan Komisaris mengenai hal ini dicatat dalam daftar khusus sebagaimana dimaksud dalam Pasal 50 ayat (2)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 117",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Yang dimaksud dengan “memberikan persetujuan"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 118",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Ketentuan ini dimaksudkan untuk memberikan wewenang kepada Dewan Komisaris untuk melakukan pengurusan Perseroan dalam hal Direksi tidak ada.\nYang dimaksud dengan “dalam keadaan tertentu”, antara lain keadaan sebagaimana dimaksud dalam Pasal 99 ayat (2) huruf b dan Pasal 107 huruf c.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 119",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 120",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Komisaris Independen yang ada di dalam pedoman tata kelola Perseroan yang baik (code of good corporate governance) adalah “Komisaris dari pihak luar”.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 121",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Yang dimaksud dengan “komite\", antara lain komite audit, komite remunerasi, dan komite nominasi.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 122",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 123",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Dalam tata cara konversi saham ditetapkan harga wajar saham dari Perseroan yang menggabungkan diri serta harga wajar saham dari Perseroan yang menerima Penggabungan untuk menentukan perbandingan penukaran saham dalam rangka konversi saham.\nHuruf d diwajibkan sebagai bagian dari usulan apabila Rancangan perubahan anggaran dasar dalam hal ini hanya Penggabungan tersebut menyebabkan adanya perubahan anggaran dasar.\nHuruf e Yang dimaksud dengan “3 (tiga) tahun buku terakhir dari Perseroan"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 124",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 125",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Pengambilalihan yang dimaksud dalam Pasal ini tidak mengurangi ketentuan sebagaimana dimaksud dalam Pasal 7.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Yang dimaksud dengan “pihak yang akan mengambil alih” adalah Perseroan, badan hukum lain yang bukan Perseroan, atau orang perseorangan.\nAyat (6) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Cukup jelas.\nHuruf d Dalam tata cara konversi saham ditetapkan harga wajar saham dari Perseroan yang diambil alih serta harga wajar saham penukarnya untuk menentukan perbandingan penukaran saham dalam rangka konversi saham.\nHuruf e Cukup jelas.\nHuruf f Cukup jelas.\nHuruf g Cukup jelas.\nHuruf h Cukup jelas.\nHuruf i Cukup jelas.\nHuruf j Cukup jelas.\nHuruf k Cukup jelas.\nAyat (7) Pengambilalihan saham Perseroan lain langsung dari pemegang saham tidak perlu didahului dengan membuat rancangan Pengambilalihan, tetapi dilakukan langsung melalui perundingan dan kesepakatan oleh pihak yang akan mengambil alih dengan pemegang saham dengan tetap memperhatikan anggaran dasar Perseroan yang diambil alih.\nAyat (8) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 126",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Ketentuan ini menegaskan bahwa Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan tidak dapat dilakukan apabila akan merugikan kepentingan pihak-pihak tertentu.\nSelanjutnya, dalam Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan harus juga dicegah kemungkinan terjadinya monopoli atau monopsoni dalam berbagai bentuk yang merugikan masyarakat.\nAyat (2) Pemegang saham yang tidak menyetujui Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan berhak meminta kepada Perseroan agar sahamnya dibeli sesuai dengan harga wajar saham dari Perseroan sebagaimana dimaksud dalam penjelasan Pasal 123 ayat (2) huruf c dan Pasal 125 ayat (6) huruf d.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 127",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Pengumuman dimaksudkan untuk memberikan kesempatan kepada pihak-pihak yang bersangkutan agar mengetahui adanya rencana tersebut dan mengajukan keberatan jika mereka merasa kepentingannya dirugikan.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas.\nAyat (8) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 128",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 129",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 130",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 131",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 132",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 133",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pengumuman dimaksudkan agar pihak ketiga yang berkepentingan mengetahui bahwa telah dilakukan Penggabungan, Peleburan, atau Pengambilalihan.\nDalam hal ini pengumuman wajib dilakukan dalam jangka waktu paling lambat 30 (tiga puluh) hari terhitung sejak tanggal:\na. persetujuan Menteri atas perubahan anggaran dasar dalam hal terjadi Penggabungan;\nb. pemberitahuan diterima Menteri baik dalam hal terjadi perubahan anggaran dasar sebagaimana dimaksud dalam Pasal 21 ayat (3) maupun yang tidak disertai perubahan anggaran dasar; dan\nc. pengesahan Menteri atas akta pendirian Perseroan dalam hal terjadi Peleburan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 134",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 135",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Huruf a Cukup jelas.\nHuruf b Yang dimaksud dengan “pemisahan tidak murni\" lazim disebut spin off.\nAyat (2) Yang dimaksud dengan “beralih karena hukum” adalah beralih berdasarkan titel umum sehingga tidak diperlukan akta peralihan.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 136",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 137",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 138",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Sebelum mengajukan permohonan pemeriksaan terhadap Perseroan, pemohon telah meminta secara langsung kepada Perseroan mengenai data atau keterangan yang dibutuhkannya.\nDalam hal Perseroan menolak atau tidak memperhatikan permintaan tersebut, ketentuan ini memberikan upaya yang dapat ditempuh oleh pemohon.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 139",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “ahli” adalah orang yang mempunyai keahlian dalam bidang yang akan diperiksa.\nAyat (4) Cukup jelas.\nAyat (5) Yang dimaksud dengan “semua dokumen” adalah semua buku, catatan, dan surat yang berkaitan dengan kegiatan Perseroan.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 140",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Berdasarkan laporan hasil pemeriksaan pada ayat ini, pemohon dapat menentukan sikap lebih lanjut terhadap Perseroan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 141",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Dalam menetapkan biaya pemeriksaan bagi pemeriksa, ketua pengadilan negeri mendasarkannya atas tingkat keahlian pemeriksa dan batas kemampuan Perseroan serta ruang lingkup Perseroan.\nAyat (2) Cukup jelas.\nAyat (3) Pembebanan penggantian biaya dimaksud ditetapkan oleh pengadilan dengan memperhatikan hasil pemeriksaan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 142",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Cukup jelas.\nHuruf d Cukup jelas.\nHuruf e Cukup jelas.\nHuruf f Yang dimaksud dengan “dicabutnya izin usaha Perseroan sehingga mewajibkan Perseroan melakukan likuidasi"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 143",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Karena Perseroan yang dibubarkan masih diakui sebagai badan hukum, Perseroan dapat dinyatakan pailit dan likuidator selanjutnya digantikan oleh kurator.\nPernyataan pailit tidak mengubah status Perseroan yang telah dibubarkan dan karena itu Perseroan harus dilikuidasi.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 144",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 145",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 146",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan “alasan Perseroan tidak mungkin untuk dilanjutkan\", antara lain:\na. Perseroan tidak melakukan kegiatan usaha (non-aktif) selama 3 (tiga) tahun atau lebih, yang dibuktikan dengan surat pemberitahuan yang disampaikan kepada instansi pajak;\nb. dalam hal sebagian besar pemegang saham sudah tidak diketahui alamatnya walaupun telah dipanggil melalui iklan dalam Surat Kabar sehingga tidak dapat diadakan RUPS;\nc. dalam hal perimbangan pemilikan saham dalam Perseroan demikian rupa sehingga RUPS tidak dapat mengambil keputusan yang sah, misalnya 2 (dua) kubu pemegang saham memiliki masing-masing 50% (lima puluh persen) saham; atau\nd. kekayaan Perseroan telah berkurang demikian rupa sehingga dengan kekayaan yang ada Perseroan tidak mungkin lagi melanjutkan kegiatan usahanya.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 147",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Penghitungan jangka waktu 30 (tiga puluh) hari dimulai sejak tanggal:\na. pembubaran oleh RUPS karena Perseroan dibubarkan oleh RUPS; atau\nb. penetapan pengadilan yang telah memperoleh kekuatan hukum tetap karena Perseroan dibubarkan berdasarkan penetapan pengadilan.\nAyat (2) Cukup jelas.\nAyat (3) Penghitungan jangka waktu 60 (enam puluh) hari dimulai sejak tanggal pengumuman pemberitahuan kepada kreditor yang paling akhir, misalnya pengumuman dalam Surat Kabar tanggal 1 Juli 2007, pengumuman dalam Berita Negara Republik Indonesia tanggal 3 Juli 2007, maka tanggal pengumuman yang paling akhir dimaksud adalah pada tanggal 3 Juli 2007.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 148",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 149",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ayat (1) Huruf a Cukup jelas.\nHuruf b Yang dimaksud dengan \"dalam rencana pembagian kekayaan hasil likuidasi\", termasuk rincian besarnya utang dan rencana pembayarannya.\nHuruf c Cukup jelas.\nHuruf d Cukup jelas.\nHuruf e Yang dimaksud dengan tindakan lain yang perlu dilakukan dalam pelaksanaan pemberesan kekayaan\", antara lain mengajukan permohonan pailit karena utang Perseroan lebih besar daripada kekayaan Perseroan.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 150",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 151",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "parent_bab": "BAB XIV KETENTUAN PENUTUP",
      "parent_bagian": "Bagian Kesatu Direksi",
      "parent_paragraf": "Paragraf 1",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 152",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan \"likuidator bertanggung jawab\" adalah likuidator harus memberikan laporan pertanggungjawaban atas likuidasi yang dilakukan.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas.\nAyat (8) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 153",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 154",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Pada dasarnya terhadap Perseroan yang melakukan kegiatan tertentu di bidang pasar modal, misalnya Perseroan Terbuka atau bursa efek berlaku ketentuan dalam Undang-Undang ini. Namun, mengingat kegiatan Perseroan tersebut mempunyai sifat tertentu yang berbeda dari Perseroan pada umumnya, perlu dibuka kemungkinan adanya pengaturan khusus terhadap Perseroan tersebut.\nPengaturan khusus dimaksud, antara lain mengenai sistem penyetoran modal, hal yang berkaitan dengan pembelian kembali saham Perseroan, dan hak suara serta penyelenggaraan RUPS.\nAyat (2) Yang dimaksud dengan \"asas hukum Perseroan\" adalah asas hukum yang berkaitan dengan hakikat Perseroan dan Organ Perseroan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 155",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 156",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 157",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan \"Perseroan yang telah memperoleh status badan hukum berdasarkan peraturan perundang-undangan\" adalah Perseroan yang berstatus badan hukum yang didirikan berdasarkan Kitab Undang-Undang Hukum Dagang dan Undang-Undang Nomor 1 Tahun 1995 tentang Perseroan Terbatas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 158",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Berdasarkan ketentuan ini, kepemilikan saham oleh Perseroan lain tersebut harus sudah dialihkan kepada pihak lain yang tidak terkena larangan sebagaimana dimaksud dalam Pasal 36 dalam jangka waktu 1 (satu) tahun sejak berlakunya Undang-Undang ini."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 159",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 160",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 161",
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
                $this->command->info("Data UU No. 40 Tahun 2007 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding UU No. 40 Tahun 2007 selesai!");

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

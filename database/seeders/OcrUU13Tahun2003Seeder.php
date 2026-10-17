<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUU13Tahun2003Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "undang-undang-13-2003",
    "tipe_peraturan": "UU",
    "judul": "Undang-undang (UU) Nomor 13 Tahun 2003 tentang Ketenagakerjaan",
    "tahun": "2003",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "25 Maret 2003",
    "tanggal_pengundangan": "25 Maret 2003",
    "tanggal_berlaku": "25 Maret 2003",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "UU No. 28 Tahun 2000 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 3 Tahun 2000 tentang Perubahan atas Undang-Undang Nomor 11 Tahun 1998 tentang Perubahan Berlakunya Undang-Undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan Menjadi Undang-Undang; UU No. 11 Tahun 1998 tentang Perubahan Berlakunya Undang-Undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan; UU No. 25 Tahun 1997 tentang Ketenagakerjaan; UU No. 14 Tahun 1969 tentang Ketentuan-Ketentuan Pokok Mengenai Tenaga Kerja; UU No. 8 Tahun 1961 tentang Wajib Kerja Sarjana; UU No. 3 Tahun 1958 tentang Penempatan Tenaga Asing; UU No. 21 Tahun 1954 tentang Perjanjian Perburuhan antara Serikat Buruh dan Majikan; UU No. 1 Tahun 1951 tentang Pernyataan Berlakunya Undang-Undang Kerja Tahun 1948 Nr. 12 dari Republik Indonesia untuk Seluruh Indonesia",
    "mencabut_sebagian": "",
    "diubah_dengan": "UU No. 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang; PERPU No. 2 Tahun 2022 tentang Cipta Kerja; UU No. 11 Tahun 2020 tentang Cipta Kerja",
    "mengubah": "",
    "sumber_dokumen": "undang-undang_nomor_13_tahun_2003_tentang_ketenagakerjaan.pdf",
    "id_dokumen": "undang-undang_nomor_13_tahun_2003_tentang_ketenagakerjaan",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 128,
    "total_chunk": 447,
    "waktu_eksekusi_detik": 493.21,
    "waktu_proses": "2026-09-23 10:19:18",
    "subjek": "Ketenagakerjaan"
  },
  "relasi": {
    "dicabut_oleh": [],
    "mencabut": [
      "undang-undang-28-2000",
      "undang-undang-11-1998",
      "undang-undang-25-1997",
      "undang-undang-14-1969",
      "undang-undang-8-1961",
      "undang-undang-3-1958",
      "undang-undang-21-1954",
      "undang-undang-1-1951"
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
        "teks_asli": "Pasal 5 ayat (1), Pasal 20 ayat (2), Pasal 27 ayat (2), Pasal 28, dan Pasal 33 ayat (1) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
      }
    ],
    "detail_perubahan": []
  },
  "chunks": [
    {
      "tipe": "PEMBUKAAN",
      "label": "Pembukaan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > PEMBUKAAN",
      "teks": "UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 13 TAHUN 2003 TENTANG KETENAGAKERJAAN DENGAN RAHMAT TUHAN YANG MAHA ESA PRESIDEN REPUBLIK INDONESIA,"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "a. bahwa pembangunan nasional dilaksanakan dalam rangka pembangunan manusia Indonesia seutuhnya dan pembangunan masyarakat Indonesia seluruhnya untuk mewujudkan masyarakat yang sejahtera, adil, makmur, yang merata, baik materiil maupun spiritual berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nb. bahwa dalam pelaksanaan pembangunan nasional, tenaga kerja mempunyai peranan dan kedudukan yang sangat penting sebagai pelaku dan tujuan pembangunan;\nc. bahwa sesuai dengan peranan dan kedudukan tenaga kerja, diperlukan pembangunan ketenagakerjaan untuk meningkatkan kualitas tenaga kerja dan peransertanya dalam pembangunan serta peningkatan perlindungan tenaga kerja dan keluarganya sesuai dengan harkat dan martabat kemanusiaan;\nd. bahwa perlindungan terhadap tenaga kerja dimaksudkan untuk menjamin hak-hak dasar pekerja/buruh dan menjamin kesamaan kesempatan serta perlakuan tanpa diskriminasi atas dasar apapun untuk mewujudkan kesejahteraan pekerja/buruh dan keluarganya dengan tetap memperhatikan perkembangan kemajuan dunia usaha;\ne. bahwa beberapa undang-undang di bidang ketenagakerjaan dipandang sudah tidak sesuai lagi dengan kebutuhan dan tuntutan pembangunan ketenagakerjaan, oleh karena itu perlu dicabut dan/atau ditarik kembali;\nf. bahwa berdasarkan pertimbangan sebagaimana tersebut pada huruf a, b, c, d, dan e perlu membentuk Undang-Undang tentang Ketenagakerjaan;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Pasal 5 ayat (1), Pasal 20 ayat (2), Pasal 27 ayat (2), Pasal 28, dan Pasal 33 ayat (1) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
    },
    {
      "tipe": "DIKTUM",
      "label": "Memutuskan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Dengan persetujuan bersama antara DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA DAN MEMUTUSKAN: Menetapkan : UNDANG-UNDANG TENTANG KETENAGAKERJAAN."
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
      "teks": "Dalam undang-undang ini yang dimaksud dengan :\n1. Ketenagakerjaan adalah segala hal yang berhubungan dengan tenaga kerja pada waktu sebelum, selama, dan sesudah masa kerja.\n2. Tenaga kerja adalah setiap orang yang mampu melakukan pekerjaan guna menghasilkan barang dan/atau jasa baik untuk memenuhi kebutuhan sendiri maupun untuk masyarakat.\n3. Pekerja/buruh adalah setiap orang yang bekerja dengan menerima upah atau imbalan dalam bentuk lain.\n4. Pemberi kerja adalah orang perseorangan, pengusaha, badan hukum, atau badan-badan lainnya yang mempekerjakan tenaga kerja dengan membayar upah atau imbalan dalam bentuk lain.\n5. Pengusaha adalah :\na. orang perseorangan, persekutuan, atau badan hukum yang menjalankan suatu perusahaan milik sendiri;\nb. orang perseorangan, persekutuan, atau badan hukum yang secara berdiri sendiri menjalankan perusahaan bukan miliknya;\nc. orang perseorangan, persekutuan, atau badan hukum yang berada di Indonesia mewakili perusahaan sebagaimana dimaksud dalam huruf a dan b yang berkedudukan di luar wilayah Indonesia.\n6. Perusahaan adalah :\na. setiap bentuk usaha yang berbadan hukum atau tidak, milik orang perseorangan, milik persekutuan, atau milik badan hukum, baik milik swasta maupun milik negara yang mempekerjakan pekerja/buruh dengan membayar upah atau imbalan dalam bentuk lain;\nb. usaha-usaha sosial dan usaha-usaha lain yang mempunyai pengurus dan mempekerjakan orang lain dengan membayar upah atau imbalan dalam bentuk lain.\n7. Perencanaan tenaga kerja adalah proses penyusunan rencana ketenagakerjaan secara sistematis yang dijadikan dasar dan acuan dalam penyusunan kebijakan, strategi, dan pelaksanaan program pembangunan ketenagakerjaan yang berkesinambungan.\n8. Informasi ketenagakerjaan adalah gabungan, rangkaian, dan analisis data yang berbentuk angka yang telah diolah, naskah dan dokumen yang mempunyai arti, nilai dan makna tertentu mengenai ketenagakerjaan.\n9. Pelatihan kerja adalah keseluruhan kegiatan untuk memberi, memperoleh, meningkatkan, serta mengembangkan kompetensi kerja, produktivitas, disiplin, sikap, dan etos kerja pada tingkat keterampilan dan keahlian tertentu sesuai dengan jenjang dan kualifikasi jabatan atau pekerjaan.\n10. Kompetensi kerja adalah kemampuan kerja setiap individu yang mencakup aspek pengetahuan, keterampilan, dan sikap kerja yang sesuai dengan standar yang ditetapkan.\n11. Pemagangan adalah bagian dari sistem pelatihan kerja yang diselenggarakan secara terpadu antara pelatihan di lembaga pelatihan dengan bekerja secara langsung di bawah bimbingan dan pengawasan instruktur atau pekerja/buruh yang lebih berpengalaman, dalam proses produksi barang dan/atau jasa di perusahaan, dalam rangka menguasai keterampilan atau keahlian tertentu.\n12. Pelayanan penempatan tenaga kerja adalah kegiatan untuk mempertemukan tenaga kerja dengan pemberi kerja, sehingga tenaga kerja dapat memperoleh pekerjaan yang sesuai dengan bakat, minat, dan kemampuannya, dan pemberi kerja dapat memperoleh tenaga kerja yang sesuai dengan kebutuhannya.\n13. Tenaga kerja asing adalah warga negara asing pemegang visa dengan maksud bekerja di wilayah Indonesia.\n14. Perjanjian kerja adalah perjanjian antara pekerja/buruh dengan pengusaha atau pemberi kerja yang memuat syarat-syarat kerja, hak, dan kewajiban para pihak.\n15. Hubungan kerja adalah hubungan antara pengusaha dengan pekerja/buruh berdasarkan perjanjian kerja, yang mempunyai unsur pekerjaan, upah, dan perintah.\n16. Hubungan industrial adalah suatu sistem hubungan yang terbentuk antara para pelaku dalam proses produksi barang dan/atau jasa yang terdiri dari unsur pengusaha, pekerja/buruh, dan pemerintah yang didasarkan pada nilai-nilai Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.\n17. Serikat pekerja/serikat buruh adalah organisasi yang dibentuk dari, oleh, dan untuk pekerja/buruh baik di perusahaan maupun di luar perusahaan, yang bersifat bebas, terbuka, mandiri, demokratis, dan bertanggung jawab guna memperjuangkan, membela serta melindungi hak dan kepentingan pekerja/buruh serta meningkatkan kesejahteraan pekerja/buruh dan keluarganya.\n18. Lembaga kerja sama bipartit adalah forum komunikasi dan konsultasi mengenai hal-hal yang berkaitan dengan hubungan industrial di satu perusahaan yang anggotanya terdiri dari pengusaha dan serikat pekerja/serikat buruh yang sudah tercatat instansi yang bertanggung jawab di bidang ketenagakerjaan atau unsur pekerja/buruh.\n19. Lembaga kerja sama tripartit adalah forum komunikasi, konsultasi dan musyawarah tentang masalah ketenagakerjaan yang anggotanya terdiri dari unsur organisasi pengusaha, serikat pekerja/serikat buruh, dan pemerintah.\n20. Peraturan perusahaan adalah peraturan yang dibuat secara tertulis oleh pengusaha yang memuat syarat-syarat kerja dan tata tertib perusahaan.\n21. Perjanjian kerja bersama adalah perjanjian yang merupakan hasil perundingan antara serikat pekerja/serikat buruh atau beberapa serikat pekerja/serikat buruh yang tercatat pada instansi yang bertanggung jawab di bidang ketenagakerjaan dengan pengusaha, atau beberapa pengusaha atau perkumpulan pengusaha yang memuat syarat-syarat kerja, hak dan kewajiban kedua belah pihak.\n22. Perselisihan hubungan industrial adalah perbedaan pendapat yang mengakibatkan pertentangan antara pengusaha atau gabungan pengusaha dengan pekerja/buruh atau serikat pekerja/serikat buruh karena adanya perselisihan mengenai hak, perselisihan kepentingan, dan perselisihan pemutusan hubungan kerja serta perselisihan antar serikat pekerja/serikat buruh hanya dalam satu perusahaan.\n23. Mogok kerja adalah tindakan pekerja/buruh yang direncanakan dan dilaksanakan secara bersama-sama dan/atau oleh serikat pekerja/serikat buruh untuk menghentikan atau memperlambat pekerjaan.\n24. Penutupan perusahaan (lock out) adalah tindakan pengusaha untuk menolak pekerja/buruh seluruhnya atau sebagian untuk menjalankan pekerjaan.\n25. Pemutusan hubungan kerja adalah pengakhiran hubungan kerja karena suatu hal tertentu yang mengakibatkan berakhirnya hak dan kewajiban antara pekerja/buruh dan pengusaha.\n26. Anak adalah setiap orang yang berumur di bawah 18 (delapan belas) tahun.\n27. Siang hari adalah waktu antara pukul 06.00 sampai dengan pukul 18.00.\n28. 1 (satu) hari adalah waktu selama 24 (dua puluh empat) jam.\n29. Seminggu adalah waktu selama 7 (tujuh) hari.\n30. Upah adalah hak pekerja/buruh yang diterima dan dinyatakan dalam bentuk uang sebagai imbalan dari pengusaha atau pemberi kerja kepada pekerja/buruh yang ditetapkan dan dibayarkan menurut suatu perjanjian kerja, kesepakatan, atau peraturan perundang-undangan, termasuk tunjangan bagi pekerja/buruh dan keluarganya atas suatu pekerjaan dan/atau jasa yang telah atau akan dilakukan.\n31. Kesejahteraan pekerja/buruh adalah suatu pemenuhan kebutuhan dan/atau keperluan yang bersifat jasmaniah dan rohaniah, baik di dalam maupun di luar hubungan kerja, yang secara langsung atau tidak langsung dapat mempertinggi produktivitas kerja dalam lingkungan kerja yang aman dan sehat.\n32. Pengawasan ketenagakerjaan adalah kegiatan mengawasi dan menegakkan pelaksanaan peraturan perundang-undangan di bidang ketenagakerjaan.\n33. Menteri adalah menteri yang bertanggung jawab di bidang ketenagakerjaan."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II LANDASAN, ASAS, DAN TUJUAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pembangunan ketenagakerjaan berlandaskan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pembangunan ketenagakerjaan diselenggarakan atas asas keterpaduan dengan melalui koordinasi fungsional lintas sektoral pusat dan daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pembangunan ketenagakerjaan bertujuan :\na. memberdayakan dan mendayagunakan tenaga kerja secara optimal dan manusiawi;\nb. mewujudkan pemerataan kesempatan kerja dan penyediaan tenaga kerja yang sesuai dengan kebutuhan pembangunan nasional dan daerah;\nc. memberikan perlindungan kepada tenaga kerja dalam mewujudkan kesejahteraan; dan\nd. meningkatkan kesejahteraan tenaga kerja dan keluarganya."
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB III KESEMPATAN DAN PERLAKUAN YANG SAMA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Setiap tenaga kerja memiliki kesempatan yang sama tanpa diskriminasi untuk memperoleh pekerjaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Setiap pekerja/buruh berhak memperoleh perlakuan yang sama tanpa diskriminasi dari pengusaha."
    },
    {
      "tipe": "BAB",
      "label": "BAB IV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IV PERENCANAAN TENAGA KERJA DAN INFORMASI KETENAGAKERJAAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "(1) Dalam rangka pembangunan ketenagakerjaan, pemerintah menetapkan kebijakan dan menyusun perencanaan tenaga kerja.\n(2) Perencanaan tenaga kerja meliputi :\na. perencanaan tenaga kerja makro; dan\nb. perencanaan tenaga kerja mikro.\n(3) Dalam penyusunan kebijakan, strategi, dan pelaksanaan program pembangunan ketenagakerjaan yang berkesinambungan, pemerintah harus berpedoman pada perencanaan tenaga kerja sebagaimana dimaksud dalam ayat (1)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "(1) Perencanaan tenaga kerja disusun atas dasar informasi ketenagakerjaan yang antara lain meliputi :\na. penduduk dan tenaga kerja;\nb. kesempatan kerja;\nc. pelatihan kerja termasuk kompetensi kerja;\nd. produktivitas tenaga kerja;\ne. hubungan industrial;\nf. kondisi lingkungan kerja;\ng. pengupahan dan kesejahteraan tenaga kerja; dan\nh. jaminan sosial tenaga kerja.\n(2) Informasi ketenagakerjaan sebagaimana dimaksud dalam ayat (1), diperoleh dari semua pihak yang terkait, baik instansi pemerintah maupun swasta.\n(3) Ketentuan mengenai tata cara memperoleh informasi ketenagakerjaan dan penyusunan serta pelaksanaan perencanaan tenaga kerja sebagaimana dimaksud dalam ayat (1) diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB V",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB V PELATIHAN KERJA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pelatihan kerja diselenggarakan dan diarahkan untuk membekali, meningkatkan, dan mengembangkan kompetensi kerja guna meningkatkan kemampuan, produktivitas, dan kesejahteraan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Pelatihan kerja dilaksanakan dengan memperhatikan kebutuhan pasar kerja dan dunia usaha, baik di dalam maupun di luar hubungan kerja.\n(2) Pelatihan kerja diselenggarakan berdasarkan program pelatihan yang mengacu pada standar kompetensi kerja.\n(3) Pelatihan kerja dapat dilakukan secara berjenjang.\n(4) Ketentuan mengenai tata cara penetapan standar kompetensi kerja sebagaimana dimaksud dalam ayat (2) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Setiap tenaga kerja berhak untuk memperoleh dan/atau meningkatkan dan/atau mengembangkan kompetensi kerja sesuai dengan bakat, minat, dan kemampuannya melalui pelatihan kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Pengusaha bertanggung jawab atas peningkatan dan/atau pengembangan kompetensi pekerjanya melalui pelatihan kerja.\n(2) Peningkatan dan/atau pengembangan kompetensi sebagaimana dimaksud dalam ayat (1) diwajibkan bagi pengusaha yang memenuhi persyaratan yang diatur dengan Keputusan Menteri.\n(3) Setiap pekerja/buruh memiliki kesempatan yang sama untuk mengikuti pelatihan kerja sesuai dengan bidang tugasnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Pelatihan kerja diselenggarakan oleh lembaga pelatihan kerja pemerintah dan/atau lembaga pelatihan kerja swasta.\n(2) Pelatihan kerja dapat diselenggarakan di tempat pelatihan atau tempat kerja.\n(3) Lembaga pelatihan kerja pemerintah sebagaimana dimaksud dalam ayat (1) dalam menyelenggarakan pelatihan kerja dapat bekerja sama dengan swasta."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Lembaga pelatihan kerja swasta dapat berbentuk badan hukum Indonesia atau perorangan.\n(2) Lembaga pelatihan kerja swasta sebagaimana dimaksud dalam ayat (1) wajib memperoleh izin atau mendaftar ke instansi yang bertanggung jawab di bidang ketenagakerjaan di kabupaten/kota.\n(3) Lembaga pelatihan kerja yang diselenggarakan oleh instansi pemerintah mendaftarkan kegiatannya kepada instansi yang bertanggung jawab di bidang ketenagakerjaan di kabupaten/kota.\n(4) Ketentuan mengenai tata cara perizinan dan pendaftaran lembaga pelatihan kerja sebagaimana dimaksud dalam ayat (2) dan ayat (3) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Penyelenggara pelatihan kerja wajib memenuhi persyaratan :\na. tersedianya tenaga kepelatihan;\nb. adanya kurikulum yang sesuai dengan tingkat pelatihan;\nc. tersedianya sarana dan prasarana pelatihan kerja; dan\nd. tersedianya dana bagi kelangsungan kegiatan penyelenggaraan pelatihan kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Lembaga pelatihan kerja swasta yang telah memperoleh izin dan lembaga pelatihan kerja pemerintah yang telah terdaftar dapat memperoleh akreditasi dari lembaga akreditasi.\n(2) Lembaga akreditasi sebagaimana dimaksud dalam ayat (1) bersifat independen terdiri atas unsur masyarakat dan pemerintah ditetapkan dengan Keputusan Menteri.\n(3) Organisasi dan tata kerja lembaga akreditasi sebagaimana dimaksud dalam ayat (2) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Instansi yang bertanggung jawab di bidang ketenagakerjaan di kabupaten/kota dapat menghentikan sementara pelaksanaan penyelenggaraan pelatihan kerja, apabila dalam pelaksanaannya ternyata :\na. tidak sesuai dengan arah pelatihan kerja sebagaimana dimaksud dalam Pasal 9; dan/atau\nb. tidak memenuhi persyaratan sebagaimana dimaksud dalam Pasal 15.\n(2) Penghentian sementara pelaksanaan penyelenggaraan pelatihan kerja sebagaimana dimaksud dalam ayat (1), disertai alasan dan saran perbaikan dan berlaku paling lama 6 (enam) bulan.\n(3) Penghentian sementara pelaksanaan penyelenggaraan pelatihan kerja hanya dikenakan terhadap program pelatihan yang tidak memenuhi syarat sebagaimana dimaksud dalam Pasal 9 dan Pasal 15.\n(4) Bagi penyelenggara pelatihan kerja dalam waktu 6 (enam) bulan tidak memenuhi dan melengkapi saran perbaikan sebagaimana dimaksud dalam ayat (2) dikenakan sanksi penghentian program pelatihan.\n(5) Penyelenggara pelatihan kerja yang tidak menaati dan tetap melaksanakan program pelatihan kerja yang telah dihentikan sebagaimana dimaksud dalam ayat (4) dikenakan sanksi pencabutan izin dan pembatalan pendaftaran penyelenggara pelatihan.\n(6) Ketentuan mengenai tata cara penghentian sementara, penghentian, pencabutan izin, dan pembatalan pendaftaran diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Tenaga kerja berhak memperoleh pengakuan kompetensi kerja setelah mengikuti pelatihan kerja yang diselenggarakan lembaga pelatihan kerja pemerintah, lembaga pelatihan kerja swasta, atau pelatihan di tempat kerja.\n(2) Pengakuan kompetensi kerja sebagaimana dimaksud dalam ayat (1) dilakukan melalui sertifikasi kompetensi kerja.\n(3) Sertifikasi kompetensi kerja sebagaimana dimaksud dalam ayat (2) dapat pula diikuti oleh tenaga kerja yang telah berpengalaman.\n(4) Untuk melaksanakan sertifikasi kompetensi kerja dibentuk badan nasional sertifikasi profesi yang independen.\n(5) Pembentukan badan nasional sertifikasi profesi yang independen sebagaimana dimaksud dalam ayat (4) diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pelatihan kerja bagi tenaga kerja penyandang cacat dilaksanakan dengan memperhatikan jenis, derajat kecacatan, dan kemampuan tenaga kerja penyandang cacat yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Untuk mendukung peningkatan pelatihan kerja dalam rangka pembangunan ketenagakerjaan, dikembangkan satu sistem pelatihan kerja nasional yang merupakan acuan pelaksanaan pelatihan kerja di semua bidang dan/atau sektor.\n(2) Ketentuan mengenai bentuk, mekanisme, dan kelembagaan sistem pelatihan kerja nasional sebagaimana dimaksud dalam ayat (1) diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pelatihan kerja dapat diselenggarakan dengan sistem pemagangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Pemagangan dilaksanakan atas dasar perjanjian pemagangan antara peserta dengan pengusaha yang dibuat secara tertulis.\n(2) Perjanjian pemagangan sebagaimana dimaksud dalam ayat (1), sekurang-kurangnya memuat ketentuan hak dan kewajiban peserta dan pengusaha serta jangka waktu pemagangan.\n(3) Pemagangan yang diselenggarakan tidak melalui perjanjian pemagangan sebagaimana dimaksud dalam ayat (1), dianggap tidak sah dan status peserta berubah menjadi pekerja/buruh perusahaan yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Tenaga kerja yang telah mengikuti program pemagangan berhak atas pengakuan kualifikasi kompetensi kerja dari perusahaan atau lembaga sertifikasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pemagangan dapat dilaksanakan di perusahaan sendiri atau di tempat penyelenggaraan pelatihan kerja, atau perusahaan lain, baik di dalam maupun di luar wilayah Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Pemagangan yang dilakukan di luar wilayah Indonesia wajib mendapat izin dari Menteri atau pejabat yang ditunjuk.\n(2) Untuk memperoleh izin sebagaimana dimaksud dalam ayat (1), penyelenggara pemagangan harus berbentuk badan hukum Indonesia sesuai dengan peraturan perundang-undangan yang berlaku.\n(3) Ketentuan mengenai tata cara perizinan pemagangan di luar wilayah Indonesia sebagaimana dimaksud dalam ayat (1) dan ayat (2), diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Penyelenggaraan pemagangan di luar wilayah Indonesia harus memperhatikan :\na. harkat dan martabat bangsa Indonesia;\nb. penguasaan kompetensi yang lebih tinggi; dan\nc. perlindungan dan kesejahteraan peserta pemagangan, termasuk melaksanakan ibadahnya.\n(2) Menteri atau pejabat yang ditunjuk dapat menghentikan pelaksanaan pemagangan di luar wilayah Indonesia apabila di dalam pelaksanaannya ternyata tidak sesuai dengan ketentuan sebagaimana dimaksud dalam ayat (1)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Menteri dapat mewajibkan kepada perusahaan yang memenuhi persyaratan untuk melaksanakan program pemagangan.\n(2) Dalam menetapkan persyaratan sebagaimana dimaksud dalam ayat (1), Menteri harus memperhatikan kepentingan perusahaan, masyarakat, dan negara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Untuk memberikan saran dan pertimbangan dalam penetapan kebijakan serta melakukan koordinasi pelatihan kerja dan pemagangan dibentuk lembaga koordinasi pelatihan kerja nasional.\n(2) Pembentukan, keanggotaan, dan tata kerja lembaga koordinasi pelatihan kerja sebagaimana dimaksud dalam ayat (1), diatur dengan Keputusan Presiden."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Pemerintah Pusat dan/atau Pemerintah Daerah melakukan pembinaan pelatihan kerja dan pemagangan.\n(2) Pembinaan pelatihan kerja dan pemagangan ditujukan ke arah peningkatan relevansi, kualitas, dan efisiensi penyelenggaraan pelatihan kerja dan produktivitas.\n(3) Peningkatan produktivitas sebagaimana dimaksud dalam ayat (2), dilakukan melalui pengembangan budaya produktif, etos kerja, teknologi, dan efisiensi kegiatan ekonomi, menuju terwujudnya produktivitas nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "(1) Untuk meningkatkan produktivitas sebagaimana dimaksud dalam Pasal 29 ayat (2) dibentuk lembaga produktivitas yang bersifat nasional.\n(2) Lembaga produktivitas sebagaimana dimaksud dalam ayat (1) berbentuk jejaring kelembagaan pelayanan peningkatan produktivitas, yang bersifat lintas sektor maupun daerah.\n(3) Pembentukan, keanggotaan, dan tata kerja lembaga produktivitas nasional sebagaimana dimaksud dalam ayat (1), diatur dengan Keputusan Presiden."
    },
    {
      "tipe": "BAB",
      "label": "BAB VI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VI PENEMPATAN TENAGA KERJA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Setiap tenaga kerja mempunyai hak dan kesempatan yang sama untuk memilih, mendapatkan, atau pindah pekerjaan dan memperoleh penghasilan yang layak di dalam atau di luar negeri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "(1) Penempatan tenaga kerja dilaksanakan berdasarkan asas terbuka, bebas, obyektif, serta adil, dan setara tanpa diskriminasi.\n(2) Penempatan tenaga kerja diarahkan untuk menempatkan tenaga kerja pada jabatan yang tepat sesuai dengan keahlian, keterampilan, bakat, minat, dan kemampuan dengan memperhatikan harkat, martabat, hak asasi, dan perlindungan hukum.\n(3) Penempatan tenaga kerja dilaksanakan dengan memperhatikan pemerataan kesempatan kerja dan penyediaan tenaga kerja sesuai dengan kebutuhan program nasional dan daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Penempatan tenaga kerja terdiri dari :\na. penempatan tenaga kerja di dalam negeri; dan\nb. penempatan tenaga kerja di luar negeri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Ketentuan mengenai penempatan tenaga kerja di luar negeri sebagaimana dimaksud dalam Pasal 33 huruf b diatur dengan undang-undang."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "(1) Pemberi kerja yang memerlukan tenaga kerja dapat merekrut sendiri tenaga kerja yang dibutuhkan atau melalui pelaksana penempatan tenaga kerja.\n(2) Pelaksana penempatan tenaga kerja sebagaimana dimaksud dalam ayat (1) wajib memberikan perlindungan sejak rekrutmen sampai penempatan tenaga kerja.\n(3) Pemberi kerja sebagaimana dimaksud dalam ayat (1) dalam mempekerjakan tenaga kerja wajib memberikan perlindungan yang mencakup kesejahteraan, keselamatan, dan kesehatan baik mental maupun fisik tenaga kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "(1) Penempatan tenaga kerja oleh pelaksana sebagaimana dimaksud dalam Pasal 35 ayat (1) dilakukan dengan memberikan pelayanan penempatan tenaga kerja.\n(2) Pelayanan penempatan tenaga kerja sebagaimana dimaksud dalam ayat (1) bersifat terpadu dalam satu sistem penempatan tenaga kerja yang meliputi unsur-unsur :\na. pencari kerja;\nb. lowongan pekerjaan;\nc. informasi pasar kerja;\nd. mekanisme antar kerja; dan\ne. kelembagaan penempatan tenaga kerja.\n(3) Unsur-unsur sistem penempatan tenaga kerja sebagaimana dimaksud dalam ayat (2) dapat dilaksanakan secara terpisah yang ditujukan untuk terwujudnya penempatan tenaga kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "(1) Pelaksana penempatan tenaga kerja sebagaimana dimaksud dalam Pasal 35 ayat (1) terdiri dari :\na. instansi pemerintah yang bertanggung jawab di bidang ketenagakerjaan; dan\nb. lembaga swasta berbadan hukum.\n(2) Lembaga penempatan tenaga kerja swasta sebagaimana dimaksud dalam ayat (1) huruf b dalam melaksanakan pelayanan penempatan tenaga kerja wajib memiliki izin tertulis dari Menteri atau pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "(1) Pelaksana penempatan tenaga kerja sebagaimana dimaksud dalam Pasal 37 ayat (1) huruf a, dilarang memungut biaya penempatan, baik langsung maupun tidak langsung, sebagian atau keseluruhan kepada tenaga kerja dan pengguna tenaga kerja.\n(2) Lembaga penempatan tenaga kerja swasta sebagaimana dimaksud dalam Pasal 37 ayat (1) huruf b, hanya dapat memungut biaya penempatan tenaga kerja dari pengguna tenaga kerja dan dari tenaga kerja golongan dan jabatan tertentu.\n(3) Golongan dan jabatan sebagaimana dimaksud dalam ayat (2) ditetapkan dengan Keputusan Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB VII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VII PERLUASAN KESEMPATAN KERJA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "(1) Pemerintah bertanggung jawab mengupayakan perluasan kesempatan kerja baik di dalam maupun di luar hubungan kerja.\n(2) Pemerintah dan masyarakat bersama-sama mengupayakan perluasan kesempatan kerja baik di dalam maupun di luar hubungan kerja.\n(3) Semua kebijakan pemerintah baik pusat maupun daerah di setiap sektor diarahkan untuk mewujudkan perluasan kesempatan kerja baik di dalam maupun di luar hubungan kerja.\n(4) Lembaga keuangan baik perbankan maupun non perbankan, dan dunia usaha perlu membantu dan memberikan kemudahan bagi setiap kegiatan masyarakat yang dapat menciptakan atau mengembangkan perluasan kesempatan kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "(1) Perluasan kesempatan kerja di luar hubungan kerja dilakukan melalui penciptaan kegiatan yang produktif dan berkelanjutan dengan mendayagunakan potensi sumber daya alam, sumber daya manusia dan teknologi tepat guna.\n(2) Penciptaan perluasan kesempatan kerja sebagaimana dimaksud dalam ayat (1) dilakukan dengan pola pembentukan dan pembinaan tenaga kerja mandiri, penerapan sistem padat karya, penerapan teknologi tepat guna, dan pendayagunaan tenaga kerja sukarela atau pola lain yang dapat mendorong terciptanya perluasan kesempatan kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "(1) Pemerintah menetapkan kebijakan ketenagakerjaan dan perluasan kesempatan kerja.\n(2) Pemerintah dan masyarakat bersama-sama mengawasi pelaksanaan kebijakan sebagaimana dimaksud dalam ayat (1).\n(3) Dalam melaksanakan tugas sebagaimana dimaksud dalam ayat (2) dapat dibentuk badan koordinasi yang beranggotakan unsur pemerintah dan unsur masyarakat.\n(4) Ketentuan mengenai perluasan kesempatan kerja, dan pembentukan badan koordinasi sebagaimana dimaksud dalam Pasal 39, Pasal 40, dan ayat (3) dalam pasal ini diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB VIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIII PENGGUNAAN TENAGA KERJA ASING"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "(1) Setiap pemberi kerja yang mempekerjakan tenaga kerja asing wajib memiliki izin tertulis dari Menteri atau pejabat yang ditunjuk.\n(2) Pemberi kerja orang perseorangan dilarang mempekerjakan tenaga kerja asing.\n(3) Kewajiban memiliki izin sebagaimana dimaksud dalam ayat (1), tidak berlaku bagi perwakilan negara asing yang mempergunakan tenaga kerja asing sebagai pegawai diplomatik dan konsuler.\n(4) Tenaga kerja asing dapat dipekerjakan di Indonesia hanya dalam hubungan kerja untuk jabatan tertentu dan waktu tertentu.\n(5) Ketentuan mengenai jabatan tertentu dan waktu tertentu sebagaimana dimaksud dalam ayat (4) ditetapkan dengan Keputusan Menteri.\n(6) Tenaga kerja asing sebagaimana dimaksud dalam ayat (4) yang masa kerjanya habis dan tidak dapat diperpanjang dapat digantikan oleh tenaga kerja asing lainnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "(1) Pemberi kerja yang menggunakan tenaga kerja asing harus memiliki rencana penggunaan tenaga kerja asing yang disahkan oleh Menteri atau pejabat yang ditunjuk.\n(2) Rencana penggunaan tenaga kerja asing sebagaimana dimaksud dalam ayat (1) sekurang-kurangnya memuat keterangan :\na. alasan penggunaan tenaga kerja asing;\nb. jabatan dan/atau kedudukan tenaga kerja asing dalam struktur organisasi perusahaan yang bersangkutan;\nc. jangka waktu penggunaan tenaga kerja asing; dan\nd. penunjukan tenaga kerja warga negara Indonesia sebagai pendamping tenaga kerja asing yang dipekerjakan.\n(3) Ketentuan sebagaimana dimaksud dalam ayat (1) tidak berlaku bagi instansi pemerintah, badan-badan internasional dan perwakilan negara asing.\n(4) Ketentuan mengenai tata cara pengesahan rencana penggunaan tenaga kerja asing diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "(1) Pemberi kerja tenaga kerja asing wajib menaati ketentuan mengenai jabatan dan standar kompetensi yang berlaku.\n(2) Ketentuan mengenai jabatan dan standar kompetensi sebagaimana dimaksud dalam ayat (1) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "(1) Pemberi kerja tenaga kerja asing wajib :\na. menunjuk tenaga kerja warga negara Indonesia sebagai tenaga pendamping tenaga kerja asing yang dipekerjakan untuk alih teknologi dan alih keahlian dari tenaga kerja asing; dan\nb. melaksanakan pendidikan dan pelatihan kerja bagi tenaga kerja Indonesia sebagaimana dimaksud pada huruf a yang sesuai dengan kualifikasi jabatan yang diduduki oleh tenaga kerja asing.\n(2) Ketentuan sebagaimana dimaksud dalam ayat (1) tidak berlaku bagi tenaga kerja asing yang menduduki jabatan direksi dan/atau komisaris."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "(1) Tenaga kerja asing dilarang menduduki jabatan yang mengurusi personalia dan/atau jabatan-jabatan tertentu.\n(2) Jabatan-jabatan tertentu sebagaimana dimaksud dalam ayat (1) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "(1) Pemberi kerja wajib membayar kompensasi atas setiap tenaga kerja asing yang dipekerjakannya.\n(2) Kewajiban membayar kompensasi sebagaimana dimaksud dalam ayat (1) tidak berlaku bagi instansi pemerintah, perwakilan negara asing, badan-badan internasional, lembaga sosial, lembaga keagamaan, dan jabatan-jabatan tertentu di lembaga pendidikan.\n(3) Ketentuan mengenai jabatan-jabatan tertentu di lembaga pendidikan sebagaimana dimaksud dalam ayat (2) diatur dengan Keputusan Menteri.\n(4) Ketentuan mengenai besarnya kompensasi dan penggunaannya diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pemberi kerja yang mempekerjakan tenaga kerja asing wajib memulangkan tenaga kerja asing ke negara asalnya setelah hubungan kerjanya berakhir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Ketentuan mengenai penggunaan tenaga kerja asing serta pelaksanaan pendidikan dan pelatihan tenaga kerja pendamping diatur dengan Keputusan Presiden."
    },
    {
      "tipe": "BAB",
      "label": "BAB IX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IX HUBUNGAN KERJA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Hubungan kerja terjadi karena adanya perjanjian kerja antara pengusaha dan pekerja/buruh."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja dibuat secara tertulis atau lisan.\n(2) Perjanjian kerja yang dipersyaratkan secara tertulis dilaksanakan sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja dibuat atas dasar :\na. kesepakatan kedua belah pihak;\nb. kemampuan atau kecakapan melakukan perbuatan hukum;\nc. adanya pekerjaan yang diperjanjikan; dan\nd. pekerjaan yang diperjanjikan tidak bertentangan dengan ketertiban umum, kesusilaan, dan peraturan perundang-undangan yang berlaku.\n(2) Perjanjian kerja yang dibuat oleh para pihak yang bertentangan dengan ketentuan sebagaimana dimaksud dalam ayat (1) huruf a dan b dapat dibatalkan.\n(3) Perjanjian kerja yang dibuat oleh para pihak yang bertentangan dengan ketentuan sebagaimana dimaksud dalam ayat (1) huruf c dan d batal demi hukum."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Segala hal dan/atau biaya yang diperlukan bagi pelaksanaan pembuatan perjanjian kerja dilaksanakan oleh dan menjadi tanggung jawab pengusaha."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja yang dibuat secara tertulis sekurang-kurangnya memuat :\na. nama, alamat perusahaan, dan jenis usaha;\nb. nama, jenis kelamin, umur, dan alamat pekerja/buruh;\nc. jabatan atau jenis pekerjaan;\nd. tempat pekerjaan;\ne. besarnya upah dan cara pembayarannya;\nf. syarat-syarat kerja yang memuat hak dan kewajiban pengusaha dan pekerja/buruh;\ng. mulai dan jangka waktu berlakunya perjanjian kerja;\nh. tempat dan tanggal perjanjian kerja dibuat; dan\ni. tanda tangan para pihak dalam perjanjian kerja.\n(2) Ketentuan dalam perjanjian kerja sebagaimana dimaksud dalam ayat (1) huruf e dan f, tidak boleh bertentangan dengan peraturan perusahaan, perjanjian kerja bersama, dan peraturan perundang-undangan yang berlaku.\n(3) Perjanjian kerja sebagaimana dimaksud dalam ayat (1) dibuat sekurang-kurangnya rangkap 2 (dua), yang mempunyai kekuatan hukum yang sama, serta pekerja/buruh dan pengusaha masing-masing mendapat 1 (satu) perjanjian kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Perjanjian kerja tidak dapat ditarik kembali dan/atau diubah, kecuali atas persetujuan para pihak."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 56",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja dibuat untuk waktu tertentu atau untuk waktu tidak tertentu.\n(2) Perjanjian kerja untuk waktu tertentu sebagaimana dimaksud dalam ayat (1) didasarkan atas :\na. jangka waktu; atau\nb. selesainya suatu pekerjaan tertentu."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 57",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja untuk waktu tertentu dibuat secara tertulis serta harus menggunakan bahasa Indonesia dan huruf latin.\n(2) Perjanjian kerja untuk waktu tertentu yang dibuat tidak tertulis bertentangan dengan ketentuan sebagaimana dimaksud dalam ayat (1) dinyatakan sebagai perjanjian kerja untuk waktu tidak tertentu.\n(3) Dalam hal perjanjian kerja dibuat dalam bahasa Indonesia dan bahasa asing, apabila kemudian terdapat perbedaan penafsiran antara keduanya, maka yang berlaku perjanjian kerja yang dibuat dalam bahasa Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 58",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja untuk waktu tertentu tidak dapat mensyaratkan adanya masa percobaan kerja.\n(2) Dalam hal disyaratkan masa percobaan kerja dalam perjanjian kerja sebagaimana dimaksud dalam ayat (1), masa percobaan kerja yang disyaratkan batal demi hukum."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 59",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja untuk waktu tertentu hanya dapat dibuat untuk pekerjaan tertentu yang menurut jenis dan sifat atau kegiatan pekerjaannya akan selesai dalam waktu tertentu, yaitu :\na. pekerjaan yang sekali selesai atau yang sementara sifatnya;\nb. pekerjaan yang diperkirakan penyelesaiannya dalam waktu yang tidak terlalu lama dan paling lama 3 (tiga) tahun;\nc. pekerjaan yang bersifat musiman; atau\nd. pekerjaan yang berhubungan dengan produk baru, kegiatan baru, atau produk tambahan yang masih dalam percobaan atau penjajakan.\n(2) Perjanjian kerja untuk waktu tertentu tidak dapat diadakan untuk pekerjaan yang bersifat tetap.\n(3) Perjanjian kerja untuk waktu tertentu dapat diperpanjang atau diperbaharui.\n(4) Perjanjian kerja waktu tertentu yang didasarkan atas jangka waktu tertentu dapat diadakan untuk paling lama 2 (dua) tahun dan hanya boleh diperpanjang 1 (satu) kali untuk jangka waktu paling lama 1 (satu) tahun.\n(5) Pengusaha yang bermaksud memperpanjang perjanjian kerja waktu tertentu tersebut, paling lama 7 (tujuh) hari sebelum perjanjian kerja waktu tertentu berakhir telah memberitahukan maksudnya secara tertulis kepada pekerja/buruh yang bersangkutan.\n(6) Pembaruan perjanjian kerja waktu tertentu hanya dapat diadakan setelah melebihi masa tenggang waktu 30 (tiga puluh) hari berakhirnya perjanjian kerja waktu tertentu yang lama, pembaruan perjanjian kerja waktu tertentu ini hanya boleh dilakukan 1 (satu) kali dan paling lama 2 (dua) tahun.\n(7) Perjanjian kerja untuk waktu tertentu yang tidak memenuhi ketentuan sebagaimana dimaksud dalam ayat (1), ayat (2), ayat (4), ayat (5), dan ayat (6) maka demi hukum menjadi perjanjian kerja waktu tidak tertentu.\n(8) Hal-hal lain yang belum diatur dalam Pasal ini akan diatur lebih lanjut dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 60",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja untuk waktu tidak tertentu dapat mensyaratkan masa percobaan kerja paling lama 3 (tiga) bulan.\n(2) Dalam masa percobaan kerja sebagaimana dimaksud dalam ayat (1), pengusaha dilarang membayar upah di bawah upah minimum yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 61",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Perjanjian kerja berakhir apabila :\na. pekerja meninggal dunia;\nb. berakhirnya jangka waktu perjanjian kerja;\nc. adanya putusan pengadilan dan/atau putusan atau penetapan lembaga penyelesaian perselisihan hubungan industrial yang telah mempunyai kekuatan hukum tetap; atau\nd. adanya keadaan atau kejadian tertentu yang dicantumkan dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama yang dapat menyebabkan berakhirnya hubungan kerja.\n(2) Perjanjian kerja tidak berakhir karena meninggalnya pengusaha atau beralihnya hak atas perusahaan yang disebabkan penjualan, pewarisan, atau hibah.\n(3) Dalam hal terjadi pengalihan perusahaan maka hak-hak pekerja/buruh menjadi tanggung jawab pengusaha baru, kecuali ditentukan lain dalam perjanjian pengalihan yang tidak mengurangi hak-hak pekerja/buruh.\n(4) Dalam hal pengusaha, orang perseorangan, meninggal dunia, ahli waris pengusaha dapat mengakhiri perjanjian kerja setelah merundingkan dengan pekerja/buruh.\n(5) Dalam hal pekerja/buruh meninggal dunia, ahli waris pekerja/buruh berhak mendapatkan hak-haknya sesuai dengan peraturan perundang-undangan yang berlaku atau hak-hak yang telah diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 62",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Apabila salah satu pihak mengakhiri hubungan kerja sebelum berakhirnya jangka waktu yang ditetapkan dalam perjanjian kerja waktu tertentu, atau berakhirnya hubungan kerja bukan karena ketentuan sebagaimana dimaksud dalam Pasal 61 ayat (1), pihak yang mengakhiri hubungan kerja diwajibkan membayar ganti rugi kepada pihak lainnya sebesar upah pekerja/buruh sampai batas waktu berakhirnya jangka waktu perjanjian kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 63",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Dalam hal perjanjian kerja waktu tidak tertentu dibuat secara lisan, maka pengusaha wajib membuat surat pengangkatan bagi pekerja/buruh yang bersangkutan.\n(2) Surat pengangkatan sebagaimana dimaksud dalam ayat (1), sekurang-kurangnya memuat keterangan :\na. nama dan alamat pekerja/buruh;\nb. tanggal mulai bekerja;\nc. jenis pekerjaan; dan\nd. besarnya upah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 64",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Perusahaan dapat menyerahkan sebagian pelaksanaan pekerjaan kepada perusahaan lainnya melalui perjanjian pemborongan pekerjaan atau penyediaan jasa pekerja/buruh yang dibuat secara tertulis."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 65",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Penyerahan sebagian pelaksanaan pekerjaan kepada perusahaan lain dilaksanakan melalui perjanjian pemborongan pekerjaan yang dibuat secara tertulis.\n(2) Pekerjaan yang dapat diserahkan kepada perusahaan lain sebagaimana dimaksud dalam ayat (1) harus memenuhi syarat-syarat sebagai berikut :\na. dilakukan secara terpisah dari kegiatan utama;\nb. dilakukan dengan perintah langsung atau tidak langsung dari pemberi pekerjaan;\nc. merupakan kegiatan penunjang perusahaan secara keseluruhan; dan\nd. tidak menghambat proses produksi secara langsung.\n(3) Perusahaan lain sebagaimana dimaksud dalam ayat (1) harus berbentuk badan hukum.\n(4) Perlindungan kerja dan syarat-syarat kerja bagi pekerja/buruh pada perusahaan lain sebagaimana dimaksud dalam ayat (2) sekurang-kurangnya sama dengan perlindungan kerja dan syarat-syarat kerja pada perusahaan pemberi pekerjaan atau sesuai dengan peraturan perundang-undangan yang berlaku.\n(5) Perubahan dan/atau penambahan syarat-syarat sebagaimana dimaksud dalam ayat (2) diatur lebih lanjut dengan Keputusan Menteri.\n(6) Hubungan kerja dalam pelaksanaan pekerjaan sebagaimana dimaksud dalam ayat (1) diatur dalam perjanjian kerja secara tertulis antara perusahaan lain dan pekerja/buruh yang dipekerjakannya.\n(7) Hubungan kerja sebagaimana dimaksud dalam ayat (6) dapat didasarkan atas perjanjian kerja waktu tidak tertentu atau perjanjian kerja waktu tertentu apabila memenuhi persyaratan sebagaimana dimaksud dalam Pasal 59.\n(8) Dalam hal ketentuan sebagaimana dimaksud dalam ayat (2) dan ayat (3) tidak terpenuhi, maka demi hukum status hubungan kerja pekerja/buruh dengan perusahaan penerima pemborongan beralih menjadi hubungan kerja pekerja/buruh dengan perusahaan pemberi pekerjaan.\n(9) Dalam hal hubungan kerja beralih ke perusahaan pemberi pekerjaan sebagaimana dimaksud dalam ayat (8), maka hubungan kerja pekerja/buruh dengan pemberi pekerjaan sesuai dengan hubungan kerja sebagaimana dimaksud dalam ayat (7)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 66",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "(1) Pekerja/buruh dari perusahaan penyedia jasa pekerja/buruh tidak boleh digunakan oleh pemberi kerja untuk melaksanakan kegiatan pokok atau kegiatan yang berhubungan langsung dengan proses produksi, kecuali untuk kegiatan jasa penunjang atau kegiatan yang tidak berhubungan langsung dengan proses produksi.\n(2) Penyedia jasa pekerja/buruh sebagaimana dimaksud dalam ayat (1) merupakan badan usaha yang berbadan hukum dan wajib memiliki izin dari instansi yang bertanggung jawab di bidang ketenagakerjaan.\n(3) Perlindungan upah dan kesejahteraan, syarat-syarat kerja, serta perselisihan yang timbul menjadi tanggung jawab perusahaan penyedia jasa pekerja/buruh.\n(4) Perjanjian antara perusahaan pengguna jasa pekerja/buruh dan perusahaan penyedia jasa pekerja/buruh dibuat secara tertulis dan wajib memuat ketentuan sebagaimana dimaksud dalam ayat (1), ayat (2), dan ayat (3)."
    },
    {
      "tipe": "BAB",
      "label": "BAB X",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB X PERLINDUNGAN, PENGUPAHAN, DAN KESEJAHTERAAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Bagian Kesatu Perlindungan"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Paragraf 1 Penyandang Cacat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 67",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pengusaha yang mempekerjakan tenaga kerja penyandang cacat wajib memberikan perlindungan sesuai dengan jenis dan derajat kecacatannya.\n(2) Pemberian perlindungan sebagaimana dimaksud dalam ayat (1) dilaksanakan sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Paragraf 2 Anak"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 68",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pengusaha dilarang mempekerjakan anak."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 69",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Ketentuan sebagaimana dimaksud dalam Pasal 68 dapat dikecualikan bagi anak yang berumur antara 13 (tiga belas) tahun sampai dengan 15 (lima belas) tahun untuk melakukan pekerjaan ringan sepanjang tidak mengganggu perkembangan dan kesehatan fisik, mental, dan sosial.\n(2) Pengusaha yang mempekerjakan anak pada pekerjaan ringan sebagaimana dimaksud dalam ayat (1) harus memenuhi persyaratan :\na. izin tertulis dari orang tua atau wali;\nb. perjanjian kerja antara pengusaha dengan orang tua atau wali;\nc. waktu kerja maksimum 3 (tiga) jam;\nd. dilakukan pada siang hari dan tidak mengganggu waktu sekolah;\ne. keselamatan dan kesehatan kerja;\nf. adanya hubungan kerja yang jelas; dan\ng. menerima upah sesuai dengan ketentuan yang berlaku.\n(3) Ketentuan sebagaimana dimaksud dalam ayat (2) huruf a, b, f, dan g dikecualikan bagi anak yang bekerja pada usaha keluarganya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 70",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Anak dapat melakukan pekerjaan di tempat kerja yang merupakan bagian dari kurikulum pendidikan atau pelatihan yang disahkan oleh pejabat yang berwenang.\n(2) Anak sebagaimana dimaksud dalam ayat (1) paling sedikit berumur 14 (empat belas) tahun.\n(3) Pekerjaan sebagaimana dimaksud dalam ayat (1) dapat dilakukan dengan syarat :\na. diberi petunjuk yang jelas tentang cara pelaksanaan pekerjaan serta bimbingan dan pengawasan dalam melaksanakan pekerjaan; dan\nb. diberi perlindungan keselamatan dan kesehatan kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 71",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Anak dapat melakukan pekerjaan untuk mengembangkan bakat dan minatnya.\n(2) Pengusaha yang mempekerjakan anak sebagaimana dimaksud dalam ayat (1) wajib memenuhi syarat :\na. di bawah pengawasan langsung dari orang tua atau wali;\nb. waktu kerja paling lama 3 (tiga) jam sehari; dan\nc. kondisi dan lingkungan kerja tidak mengganggu perkembangan fisik, mental, sosial, dan waktu sekolah.\n(3) Ketentuan mengenai anak yang bekerja untuk mengembangkan bakat dan minat sebagaimana dimaksud dalam ayat (1) dan ayat (2) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 72",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "Dalam hal anak dipekerjakan bersama-sama dengan pekerja/buruh dewasa, maka tempat kerja anak harus dipisahkan dari tempat kerja pekerja/buruh dewasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 73",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "Anak dianggap bekerja bilamana berada di tempat kerja, kecuali dapat dibuktikan sebaliknya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 74",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Siapapun dilarang mempekerjakan dan melibatkan anak pada pekerjaan-pekerjaan yang terburuk.\n(2) Pekerjaan-pekerjaan yang terburuk sebagaimana dimaksud dalam ayat (1) meliputi:\na. segala pekerjaan dalam bentuk perbudakan atau sejenisnya;\nb. segala pekerjaan yang memanfaatkan, menyediakan, atau menawarkan anak untuk pelacuran, produksi pornografi, pertunjukan porno, atau perjudian;\nc. segala pekerjaan yang memanfaatkan, menyediakan, atau melibatkan anak untuk produksi dan perdagangan minuman keras, narkotika, psikotropika, dan zat adiktif lainnya; dan/atau\nd. semua pekerjaan yang membahayakan kesehatan, keselamatan, atau moral anak.\n(3) Jenis-jenis pekerjaan yang membahayakan kesehatan, keselamatan, atau moral anak sebagaimana dimaksud dalam ayat (2) huruf d ditetapkan dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 75",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Pemerintah berkewajiban melakukan upaya penanggulangan anak yang bekerja di luar hubungan kerja.\n(2) Upaya penanggulangan sebagaimana dimaksud dalam ayat (1) diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Paragraf 3 Perempuan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 76",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Pekerja/buruh perempuan yang berumur kurang dari 18 (delapan belas) tahun dilarang dipekerjakan antara pukul 23.00 sampai dengan pukul 07.00.\n(2) Pengusaha dilarang mempekerjakan pekerja/buruh perempuan hamil yang menurut keterangan dokter berbahaya bagi kesehatan dan keselamatan kandungannya maupun dirinya apabila bekerja antara pukul 23.00 sampai dengan pukul 07.00.\n(3) Pengusaha yang mempekerjakan pekerja/buruh perempuan antara pukul 23.00 sampai dengan pukul 07.00 wajib :\na. memberikan makanan dan minuman bergizi; dan\nb. menjaga kesusilaan dan keamanan selama di tempat kerja.\n(4) Pengusaha wajib menyediakan angkutan antar jemput bagi pekerja/buruh perempuan yang berangkat dan pulang bekerja antara pukul 23.00 sampai dengan pukul 05.00.\n(5) Ketentuan sebagaimana dimaksud dalam ayat (3) dan ayat (4) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Paragraf 4 Waktu Kerja"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 77",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Setiap pengusaha wajib melaksanakan ketentuan waktu kerja.\n(2) Waktu kerja sebagaimana dimaksud dalam ayat (1) meliputi :\na. 7 (tujuh) jam 1 (satu) hari dan 40 (empat puluh) jam 1 (satu) minggu untuk 6 (enam) hari kerja dalam 1 (satu) minggu; atau\nb. 8 (delapan) jam 1 (satu) hari dan 40 (empat puluh) jam 1 (satu) minggu untuk 5 (lima) hari kerja dalam 1 (satu) minggu.\n(3) Ketentuan waktu kerja sebagaimana dimaksud dalam ayat (2) tidak berlaku bagi sektor usaha atau pekerjaan tertentu.\n(4) Ketentuan mengenai waktu kerja pada sektor usaha atau pekerjaan tertentu sebagaimana dimaksud dalam ayat (3) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 78",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Pengusaha yang mempekerjakan pekerja/buruh melebihi waktu kerja sebagaimana dimaksud dalam Pasal 77 ayat (2) harus memenuhi syarat :\na. ada persetujuan pekerja/buruh yang bersangkutan; dan\nb. waktu kerja lembur hanya dapat dilakukan paling banyak 3 (tiga) jam dalam 1 (satu) hari dan 14 (empat belas) jam dalam 1 (satu) minggu.\n(2) Pengusaha yang mempekerjakan pekerja/buruh melebihi waktu kerja sebagaimana dimaksud dalam ayat (1) wajib membayar upah kerja lembur.\n(3) Ketentuan waktu kerja lembur sebagaimana dimaksud dalam ayat (1) huruf b tidak berlaku bagi sektor usaha atau pekerjaan tertentu.\n(4) Ketentuan mengenai waktu kerja lembur dan upah kerja lembur sebagaimana dimaksud dalam ayat (2) dan ayat (3) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 79",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Pengusaha wajib memberi waktu istirahat dan cuti kepada pekerja/buruh.\n(2) Waktu istirahat dan cuti sebagaimana dimaksud dalam ayat (1), meliputi :\na. istirahat antara jam kerja, sekurang-kurangnya setengah jam setelah bekerja selama 4 (empat) jam terus-menerus dan waktu istirahat tersebut tidak termasuk jam kerja;\nb. istirahat mingguan 1 (satu) hari untuk 6 (enam) hari kerja dalam 1 (satu) minggu atau 2 (dua) hari untuk 5 (lima) hari kerja dalam 1 (satu) minggu;\nc. cuti tahunan, sekurang-kurangnya 12 (dua belas) hari kerja setelah pekerja/buruh yang bersangkutan bekerja selama 12 (dua belas) bulan secara terus-menerus; dan\nd. istirahat panjang sekurang-kurangnya 2 (dua) bulan dan dilaksanakan pada tahun ketujuh dan kedelapan masing-masing 1 (satu) bulan bagi pekerja/buruh yang telah bekerja selama 6 (enam) tahun secara terus-menerus pada perusahaan yang sama dengan ketentuan pekerja/buruh tersebut tidak berhak lagi atas istirahat tahunannya dalam 2 (dua) tahun berjalan dan selanjutnya berlaku untuk setiap kelipatan masa kerja 6 (enam) tahun.\n(3) Pelaksanaan waktu istirahat tahunan sebagaimana dimaksud dalam ayat (2) huruf c diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama.\n(4) Hak istirahat panjang sebagaimana dimaksud dalam ayat (2) huruf d hanya berlaku bagi pekerja/buruh yang bekerja pada perusahaan tertentu.\n(5) Perusahaan tertentu sebagaimana dimaksud dalam ayat (4) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 80",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "Pengusaha wajib memberikan kesempatan yang secukupnya kepada pekerja/buruh untuk melaksanakan ibadah yang diwajibkan oleh agamanya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 81",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Pekerja/buruh perempuan yang dalam masa haid merasakan sakit dan memberitahukan kepada pengusaha, tidak wajib bekerja pada hari pertama dan kedua pada waktu haid.\n(2) Pelaksanaan ketentuan sebagaimana dimaksud dalam ayat (1) diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 82",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Pekerja/buruh perempuan berhak memperoleh istirahat selama 1,5 (satu setengah) bulan sebelum saatnya melahirkan anak dan 1,5 (satu setengah) bulan sesudah melahirkan menurut perhitungan dokter kandungan atau bidan.\n(2) Pekerja/buruh perempuan yang mengalami keguguran kandungan berhak memperoleh istirahat 1,5 (satu setengah) bulan atau sesuai dengan surat keterangan dokter kandungan atau bidan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 83",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "Pekerja/buruh perempuan yang anaknya masih menyusu harus diberi kesempatan sepatutnya untuk menyusui anaknya jika hal itu harus dilakukan selama waktu kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 84",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "Setiap pekerja/buruh yang menggunakan hak waktu istirahat sebagaimana dimaksud dalam Pasal 79 ayat (2) huruf b, c, dan d, Pasal 80, dan Pasal 82 berhak mendapat upah penuh."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 85",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Pekerja/buruh tidak wajib bekerja pada hari-hari libur resmi.\n(2) Pengusaha dapat mempekerjakan pekerja/buruh untuk bekerja pada hari-hari libur resmi apabila jenis dan sifat pekerjaan tersebut harus dilaksanakan atau dijalankan secara terus-menerus atau pada keadaan lain berdasarkan kesepakatan antara pekerja/buruh dengan pengusaha.\n(3) Pengusaha yang mempekerjakan pekerja/buruh yang melakukan pekerjaan pada hari libur resmi sebagaimana dimaksud dalam ayat (2) wajib membayar upah kerja lembur.\n(4) Ketentuan mengenai jenis dan sifat pekerjaan sebagaimana dimaksud dalam ayat (2) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Paragraf 5 Keselamatan dan Kesehatan Kerja"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 86",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Setiap pekerja/buruh mempunyai hak untuk memperoleh perlindungan atas :\na. keselamatan dan kesehatan kerja;\nb. moral dan kesusilaan; dan\nc. perlakuan yang sesuai dengan harkat dan martabat manusia serta nilai-nilai agama.\n(2) Untuk melindungi keselamatan pekerja/buruh guna mewujudkan produktivitas kerja yang optimal diselenggarakan upaya keselamatan dan kesehatan kerja.\n(3) Perlindungan sebagaimana dimaksud dalam ayat (1) dan ayat (2) dilaksanakan sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 87",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Setiap perusahaan wajib menerapkan sistem manajemen keselamatan dan kesehatan kerja yang terintegrasi dengan sistem manajemen perusahaan.\n(2) Ketentuan mengenai penerapan sistem manajemen keselamatan dan kesehatan kerja sebagaimana dimaksud dalam ayat (1) diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Bagian Kedua Pengupahan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 88",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Setiap pekerja/buruh berhak memperoleh penghasilan yang memenuhi penghidupan yang layak bagi kemanusiaan.\n(2) Untuk mewujudkan penghasilan yang memenuhi penghidupan yang layak bagi kemanusiaan sebagaimana dimaksud dalam ayat (1), pemerintah menetapkan kebijakan pengupahan yang melindungi pekerja/buruh.\n(3) Kebijakan pengupahan yang melindungi pekerja/buruh sebagaimana dimaksud dalam ayat (2) meliputi :\na. upah minimum;\nb. upah kerja lembur;\nc. upah tidak masuk kerja karena berhalangan;\nd. upah tidak masuk kerja karena melakukan kegiatan lain di luar pekerjaannya;\ne. upah karena menjalankan hak waktu istirahat kerjanya;\nf. bentuk dan cara pembayaran upah;\ng. denda dan potongan upah;\nh. hal-hal yang dapat diperhitungkan dengan upah;\ni. struktur dan skala pengupahan yang proporsional;\nj. upah untuk pembayaran pesangon; dan\nk. upah untuk perhitungan pajak penghasilan.\n(4) Pemerintah menetapkan upah minimum sebagaimana dimaksud dalam ayat (3) huruf a berdasarkan kebutuhan hidup layak dan dengan memperhatikan produktivitas dan pertumbuhan ekonomi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 89",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Upah minimum sebagaimana dimaksud dalam Pasal 88 ayat (3) huruf a dapat terdiri atas :\na. upah minimum berdasarkan wilayah provinsi atau kabupaten/kota;\nb. upah minimum berdasarkan sektor pada wilayah provinsi atau kabupaten/kota.\n(2) Upah minimum sebagaimana dimaksud dalam ayat (1) diarahkan kepada pencapaian kebutuhan hidup layak.\n(3) Upah minimum sebagaimana dimaksud dalam ayat (1) ditetapkan oleh Gubernur dengan memperhatikan rekomendasi dari Dewan Pengupahan Provinsi dan/atau Bupati/Walikota.\n(4) Komponen serta pelaksanaan tahapan pencapaian kebutuhan hidup layak sebagaimana dimaksud dalam ayat (2) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 90",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pengusaha dilarang membayar upah lebih rendah dari upah minimum sebagaimana dimaksud dalam Pasal 89.\n(2) Bagi pengusaha yang tidak mampu membayar upah minimum sebagaimana dimaksud dalam Pasal 89 dapat dilakukan penangguhan.\n(3) Tata cara penangguhan sebagaimana dimaksud dalam ayat (2) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 91",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pengaturan pengupahan yang ditetapkan atas kesepakatan antara pengusaha dan pekerja/buruh atau serikat pekerja/serikat buruh tidak boleh lebih rendah dari ketentuan pengupahan yang ditetapkan peraturan perundang-undangan yang berlaku.\n(2) Dalam hal kesepakatan sebagaimana dimaksud dalam ayat (1) lebih rendah atau bertentangan dengan peraturan perundang-undangan, kesepakatan tersebut batal demi hukum, dan pengusaha wajib membayar upah pekerja/buruh menurut peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 92",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pengusaha menyusun struktur dan skala upah dengan memperhatikan golongan, jabatan, masa kerja, pendidikan, dan kompetensi.\n(2) Pengusaha melakukan peninjauan upah secara berkala dengan memperhatikan kemampuan perusahaan dan produktivitas.\n(3) Ketentuan mengenai struktur dan skala upah sebagaimana dimaksud dalam ayat (1) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 93",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Upah tidak dibayar apabila pekerja/buruh tidak melakukan pekerjaan.\n(2) Ketentuan sebagaimana dimaksud dalam ayat (1) tidak berlaku, dan pengusaha wajib membayar upah apabila :\na. pekerja/buruh sakit sehingga tidak dapat melakukan pekerjaan;\nb. pekerja/buruh perempuan yang sakit pada hari pertama dan kedua masa haidnya sehingga tidak dapat melakukan pekerjaan;\nc. pekerja/buruh tidak masuk bekerja karena pekerja/buruh menikah, menikahkan, mengkhitankan, membaptiskan anaknya, isteri melahirkan atau keguguran kandungan, suami atau isteri atau anak atau menantu atau orang tua atau mertua atau anggota keluarga dalam satu rumah meninggal dunia;\nd. pekerja/buruh tidak dapat melakukan pekerjaannya karena sedang menjalankan kewajiban terhadap negara;\ne. pekerja/buruh tidak dapat melakukan pekerjaannya karena menjalankan ibadah yang diperintahkan agamanya;\nf. pekerja/buruh bersedia melakukan pekerjaan yang telah dijanjikan tetapi pengusaha tidak mempekerjakannya, baik karena kesalahan sendiri maupun halangan yang seharusnya dapat dihindari pengusaha;\ng. pekerja/buruh melaksanakan hak istirahat;\nh. pekerja/buruh melaksanakan tugas serikat pekerja/serikat buruh atas persetujuan pengusaha; dan\ni. pekerja/buruh melaksanakan tugas pendidikan dari perusahaan.\n(3) Upah yang dibayarkan kepada pekerja/buruh yang sakit sebagaimana dimaksud dalam ayat (2) huruf a sebagai berikut :\na. untuk 4 (empat) bulan pertama, dibayar 100% (seratus perseratus) dari upah;\nb. untuk 4 (empat) bulan kedua, dibayar 75% (tujuh puluh lima perseratus) dari upah;\nc. untuk 4 (empat) bulan ketiga, dibayar 50% (lima puluh perseratus) dari upah; dan\nd. untuk bulan selanjutnya dibayar 25% (dua puluh lima perseratus) dari upah sebelum pemutusan hubungan kerja dilakukan oleh pengusaha.\n(4) Upah yang dibayarkan kepada pekerja/buruh yang tidak masuk bekerja sebagaimana dimaksud dalam ayat (2) huruf c sebagai berikut :\na. pekerja/buruh menikah, dibayar untuk selama 3 (tiga) hari;\nb. menikahkan anaknya, dibayar untuk selama 2 (dua) hari;\nc. mengkhitankan anaknya, dibayar untuk selama 2 (dua) hari;\nd. membaptiskan anaknya, dibayar untuk selama 2 (dua) hari;\ne. isteri melahirkan atau keguguran kandungan, dibayar untuk selama 2 (dua) hari;\nf. suami/isteri, orang tua/mertua atau anak atau menantu meninggal dunia, dibayar untuk selama 2 (dua) hari; dan\ng. anggota keluarga dalam satu rumah meninggal dunia, dibayar untuk selama 1 (satu) hari.\n(5) Pengaturan pelaksanaan ketentuan sebagaimana dimaksud dalam ayat (2) ditetapkan dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 94",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "Dalam hal komponen upah terdiri dari upah pokok dan tunjangan tetap maka besarnya upah pokok sedikit-dikitnya 75% (tujuh puluh lima perseratus) dari jumlah upah pokok dan tunjangan tetap."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 95",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pelanggaran yang dilakukan oleh pekerja/buruh karena kesengajaan atau kelalaiannya dapat dikenakan denda.\n(2) Pengusaha yang karena kesengajaan atau kelalaiannya mengakibatkan keterlambatan pembayaran upah, dikenakan denda sesuai dengan persentase tertentu dari upah pekerja/buruh.\n(3) Pemerintah mengatur pengenaan denda kepada pengusaha dan/atau pekerja/buruh, dalam pembayaran upah.\n(4) Dalam hal perusahaan dinyatakan pailit atau dilikuidasi berdasarkan peraturan perundang-undangan yang berlaku, maka upah dan hak-hak lainnya dari pekerja/buruh merupakan utang yang didahulukan pembayarannya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 96",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "Tuntutan pembayaran upah pekerja/buruh dan segala pembayaran yang timbul dari hubungan kerja menjadi kadaluwarsa setelah melampaui jangka waktu 2 (dua) tahun sejak timbulnya hak."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 97",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "Ketentuan mengenai penghasilan yang layak, kebijakan pengupahan, kebutuhan hidup layak, dan perlindungan pengupahan sebagaimana dimaksud dalam Pasal 88, penetapan upah minimum sebagaimana dimaksud dalam Pasal 89, dan pengenaan denda sebagaimana dimaksud dalam Pasal 95 ayat (1), ayat (2) dan ayat (3) diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 98",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Untuk memberikan saran, pertimbangan, dan merumuskan kebijakan pengupahan yang akan ditetapkan oleh pemerintah, serta untuk pengembangan sistem pengupahan nasional dibentuk Dewan Pengupahan Nasional, Provinsi, dan Kabupaten/Kota.\n(2) Keanggotaan Dewan Pengupahan sebagaimana dimaksud dalam ayat (1) terdiri dari unsur pemerintah, organisasi pengusaha, serikat pekerja/serikat buruh, perguruan tinggi, dan pakar.\n(3) Keanggotaan Dewan Pengupahan tingkat Nasional diangkat dan diberhentikan oleh Presiden, sedangkan keanggotaan Dewan Pengupahan Provinsi, Kabupaten/Kota diangkat dan diberhentikan oleh Gubernur/Bupati/Walikota.\n(4) Ketentuan mengenai tata cara pembentukan, komposisi keanggotaan, tata cara pengangkatan dan pemberhentian keanggotaan, serta tugas dan tata kerja Dewan Pengupahan sebagaimana dimaksud dalam ayat (1) dan ayat (2), diatur dengan Keputusan Presiden."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Bagian Ketiga Kesejahteraan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 99",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Setiap pekerja/buruh dan keluarganya berhak untuk memperoleh jaminan sosial tenaga kerja.\n(2) Jaminan sosial tenaga kerja sebagaimana dimaksud dalam ayat (1), dilaksanakan sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 100",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Untuk meningkatkan kesejahteraan bagi pekerja/buruh dan keluarganya, pengusaha wajib menyediakan fasilitas kesejahteraan.\n(2) Penyediaan fasilitas kesejahteraan sebagaimana dimaksud dalam ayat (1), dilaksanakan dengan memperhatikan kebutuhan pekerja/buruh dan ukuran kemampuan perusahaan.\n(3) Ketentuan mengenai jenis dan kriteria fasilitas kesejahteraan sesuai dengan kebutuhan pekerja/buruh dan ukuran kemampuan perusahaan sebagaimana dimaksud dalam ayat (1) dan ayat (2), diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 101",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Untuk meningkatkan kesejahteraan pekerja/buruh, dibentuk koperasi pekerja/buruh dan usaha-usaha produktif di perusahaan.\n(2) Pemerintah, pengusaha, dan pekerja/buruh atau serikat pekerja/serikat buruh berupaya menumbuhkembangkan koperasi pekerja/buruh, dan mengembangkan usaha produktif sebagaimana dimaksud dalam ayat (1).\n(3) Pembentukan koperasi sebagaimana dimaksud dalam ayat (1), dilaksanakan sesuai dengan peraturan perundang-undangan yang berlaku.\n(4) Upaya-upaya untuk menumbuhkembangkan koperasi pekerja/buruh sebagaimana dimaksud dalam ayat (2), diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XI HUBUNGAN INDUSTRIAL"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Kesatu Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 102",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Dalam melaksanakan hubungan industrial, pemerintah mempunyai fungsi menetapkan kebijakan, memberikan pelayanan, melaksanakan pengawasan, dan melakukan penindakan terhadap pelanggaran peraturan perundang-undangan ketenagakerjaan.\n(2) Dalam melaksanakan hubungan industrial, pekerja/buruh dan serikat pekerja/serikat buruhnya mempunyai fungsi menjalankan pekerjaan sesuai dengan kewajibannya, menjaga ketertiban demi kelangsungan produksi, menyalurkan aspirasi secara demokratis, mengembangkan keterampilan, dan keahliannya serta ikut memajukan perusahaan dan memperjuangkan kesejahteraan anggota beserta keluarganya.\n(3) Dalam melaksanakan hubungan industrial, pengusaha dan organisasi pengusahanya mempunyai fungsi menciptakan kemitraan, mengembangkan usaha, memperluas lapangan kerja, dan memberikan kesejahteraan pekerja/buruh secara terbuka, demokratis, dan berkeadilan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 103",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Hubungan Industrial dilaksanakan melalui sarana :\na. serikat pekerja/serikat buruh;\nb. organisasi pengusaha;\nc. lembaga kerja sama bipartit;\nd. lembaga kerja sama tripartit;\ne. peraturan perusahaan;\nf. perjanjian kerja bersama;\ng. peraturan perundang-undangan ketenagakerjaan; dan\nh. lembaga penyelesaian perselisihan hubungan industrial."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Kedua Serikat Pekerja/Serikat Buruh"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 104",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Setiap pekerja/buruh berhak membentuk dan menjadi anggota serikat pekerja/serikat buruh.\n(2) Dalam melaksanakan fungsi sebagaimana dimaksud dalam Pasal 102, serikat pekerja/serikat buruh berhak menghimpun dan mengelola keuangan serta mempertanggungjawabkan keuangan organisasi termasuk dana mogok.\n(3) Besarnya dan tata cara pemungutan dana mogok sebagaimana dimaksud dalam ayat (2) diatur dalam anggaran dasar dan/atau anggaran rumah tangga serikat pekerja/serikat buruh yang bersangkutan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Ketiga Organisasi Pengusaha"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 105",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Setiap pengusaha berhak membentuk dan menjadi anggota organisasi pengusaha.\n(2) Ketentuan mengenai organisasi pengusaha diatur sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Keempat Lembaga Kerja Sama Bipartit"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 106",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Setiap perusahaan yang mempekerjakan 50 (lima puluh) orang pekerja/buruh atau lebih wajib membentuk lembaga kerja sama bipartit.\n(2) Lembaga kerja sama bipartit sebagaimana dimaksud dalam ayat (1) berfungsi sebagai forum komunikasi, dan konsultasi mengenai hal ketenagakerjaan di perusahaan.\n(3) Susunan keanggotaan lembaga kerja sama bipartit sebagaimana dimaksud dalam ayat (2) terdiri dari unsur pengusaha dan unsur pekerja/buruh yang ditunjuk oleh pekerja/buruh secara demokratis untuk mewakili kepentingan pekerja/buruh di perusahaan yang bersangkutan.\n(4) Ketentuan mengenai tata cara pembentukan dan susunan keanggotaan lembaga kerja sama bipartit sebagaimana dimaksud dalam ayat (1) dan ayat (3) diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Kelima Lembaga Kerja Sama Tripartit"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 107",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "(1) Lembaga kerja sama tripartit memberikan pertimbangan, saran, dan pendapat kepada pemerintah dan pihak terkait dalam penyusunan kebijakan dan pemecahan masalah ketenagakerjaan.\n(2) Lembaga Kerja sama Tripartit sebagaimana dimaksud dalam ayat (1), terdiri dari :\na. Lembaga Kerja sama Tripartit Nasional, Provinsi, dan Kabupaten/Kota; dan\nb. Lembaga Kerja sama Tripartit Sektoral Nasional, Provinsi, dan Kabupaten/Kota.\n(3) Keanggotaan Lembaga Kerja sama Tripartit terdiri dari unsur pemerintah, organisasi pengusaha, dan serikat pekerja/serikat buruh.\n(4) Tata kerja dan susunan organisasi Lembaga Kerja sama Tripartit sebagaimana dimaksud dalam ayat (1) diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keenam",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Keenam Peraturan Perusahaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 108",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "(1) Pengusaha yang mempekerjakan pekerja/buruh sekurang-kurangnya 10 (sepuluh) orang wajib membuat peraturan perusahaan yang mulai berlaku setelah disahkan oleh Menteri atau pejabat yang ditunjuk.\n(2) Kewajiban membuat peraturan perusahaan sebagaimana dimaksud dalam ayat (1) tidak berlaku bagi perusahaan yang telah memiliki perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 109",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "Peraturan perusahaan disusun oleh dan menjadi tanggung jawab dari pengusaha yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 110",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "(1) Peraturan perusahaan disusun dengan memperhatikan saran dan pertimbangan dari wakil pekerja/buruh di perusahaan yang bersangkutan.\n(2) Dalam hal di perusahaan yang bersangkutan telah terbentuk serikat pekerja/serikat buruh maka wakil pekerja/buruh sebagaimana dimaksud dalam ayat (1) adalah pengurus serikat pekerja/serikat buruh.\n(3) Dalam hal di perusahaan yang bersangkutan belum terbentuk serikat pekerja/serikat buruh, wakil pekerja/buruh sebagaimana dimaksud dalam ayat (1) adalah pekerja/buruh yang dipilih secara demokratis untuk mewakili kepentingan para pekerja/buruh di perusahaan yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 111",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "(1) Peraturan perusahaan sekurang-kurangnya memuat :\na. hak dan kewajiban pengusaha;\nb. hak dan kewajiban pekerja/buruh;\nc. syarat kerja;\nd. tata tertib perusahaan; dan\ne. jangka waktu berlakunya peraturan perusahaan.\n(2) Ketentuan dalam peraturan perusahaan tidak boleh bertentangan dengan ketentuan peraturan perundang-undangan yang berlaku.\n(3) Masa berlaku peraturan perusahaan paling lama 2 (dua) tahun dan wajib diperbaharui setelah habis masa berlakunya.\n(4) Selama masa berlakunya peraturan perusahaan, apabila serikat pekerja/serikat buruh di perusahaan menghendaki perundingan pembuatan perjanjian kerja bersama, maka pengusaha wajib melayani.\n(5) Dalam hal perundingan pembuatan perjanjian kerja bersama sebagaimana dimaksud dalam ayat (4) tidak mencapai kesepakatan, maka peraturan perusahaan tetap berlaku sampai habis jangka waktu berlakunya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 112",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "(1) Pengesahan peraturan perusahaan oleh Menteri atau pejabat yang ditunjuk sebagaimana dimaksud dalam Pasal 108 ayat (1) harus sudah diberikan dalam waktu paling lama 30 (tiga puluh) hari kerja sejak naskah peraturan perusahaan diterima.\n(2) Apabila peraturan perusahaan telah sesuai sebagaimana ketentuan dalam Pasal 111 ayat (1) dan ayat (2), maka dalam waktu 30 (tiga puluh) hari kerja sebagaimana dimaksud pada ayat (1) sudah terlampaui dan peraturan perusahaan belum disahkan oleh Menteri atau pejabat yang ditunjuk, maka peraturan perusahaan dianggap telah mendapatkan pengesahan.\n(3) Dalam hal peraturan perusahaan belum memenuhi persyaratan sebagaimana dimaksud dalam Pasal 111 ayat (1) dan ayat (2) Menteri atau pejabat yang ditunjuk harus memberitahukan secara tertulis kepada pengusaha mengenai perbaikan peraturan perusahaan.\n(4) Dalam waktu paling lama 14 (empat belas) hari kerja sejak tanggal pemberitahuan diterima oleh pengusaha sebagaimana dimaksud dalam ayat (3), pengusaha wajib menyampaikan kembali peraturan perusahaan yang telah diperbaiki kepada Menteri atau pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 113",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "(1) Perubahan peraturan perusahaan sebelum berakhir jangka waktu berlakunya hanya dapat dilakukan atas dasar kesepakatan antara pengusaha dan wakil pekerja/buruh.\n(2) Peraturan perusahaan hasil perubahan sebagaimana dimaksud dalam ayat (1) harus mendapat pengesahan dari Menteri atau pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 114",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "Pengusaha wajib memberitahukan dan menjelaskan isi serta memberikan naskah peraturan perusahaan atau perubahannya kepada pekerja/buruh."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 115",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keenam",
      "teks": "Ketentuan mengenai tata cara pembuatan dan pengesahan peraturan perusahaan diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketujuh",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Ketujuh Perjanjian Kerja Bersama"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 116",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Perjanjian kerja bersama dibuat oleh serikat pekerja/serikat buruh atau beberapa serikat pekerja/serikat buruh yang telah tercatat pada instansi yang bertanggung jawab di bidang ketenagakerjaan dengan pengusaha atau beberapa pengusaha.\n(2) Penyusunan perjanjian kerja bersama sebagaimana dimaksud dalam ayat (1) dilaksanakan secara musyawarah.\n(3) Perjanjian kerja bersama sebagaimana dimaksud dalam ayat (1) harus dibuat secara tertulis dengan huruf latin dan menggunakan bahasa Indonesia.\n(4) Dalam hal terdapat perjanjian kerja bersama yang dibuat tidak menggunakan bahasa Indonesia, maka perjanjian kerja bersama tersebut harus diterjemahkan dalam bahasa Indonesia oleh penerjemah tersumpah dan terjemahan tersebut dianggap sudah memenuhi ketentuan sebagaimana dimaksud dalam ayat (3)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 117",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Dalam hal musyawarah sebagaimana dimaksud dalam Pasal 116 ayat (2) tidak mencapai kesepakatan, maka penyelesaiannya dilakukan melalui prosedur penyelesaian perselisihan hubungan industrial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 118",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Dalam 1 (satu) perusahaan hanya dapat dibuat 1 (satu) perjanjian kerja bersama yang berlaku bagi seluruh pekerja/buruh di perusahaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 119",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Dalam hal di satu perusahaan hanya terdapat satu serikat pekerja/serikat buruh, maka serikat pekerja/serikat buruh tersebut berhak mewakili pekerja/buruh dalam perundingan pembuatan perjanjian kerja bersama dengan pengusaha apabila memiliki jumlah anggota lebih dari 50% (lima puluh perseratus) dari jumlah seluruh pekerja/buruh di perusahaan yang bersangkutan.\n(2) Dalam hal di satu perusahaan hanya terdapat satu serikat pekerja/serikat buruh sebagaimana dimaksud pada ayat (1) tetapi tidak memiliki jumlah anggota lebih dari 50% (lima puluh perseratus) dari jumlah seluruh pekerja/buruh di perusahaan maka serikat pekerja/serikat buruh dapat mewakili pekerja/buruh dalam perundingan dengan pengusaha apabila serikat pekerja/serikat buruh yang bersangkutan telah mendapat dukungan lebih 50% (lima puluh perseratus) dari jumlah seluruh pekerja/buruh di perusahaan melalui pemungutan suara.\n(3) Dalam hal dukungan sebagaimana dimaksud dalam ayat (2) tidak tercapai maka serikat pekerja/serikat buruh yang bersangkutan dapat mengajukan kembali permintaan untuk merundingkan perjanjian kerja bersama dengan pengusaha setelah melampaui jangka waktu 6 (enam) bulan terhitung sejak dilakukannya pemungutan suara dengan mengikuti prosedur sebagaimana dimaksud dalam ayat (2)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 120",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Dalam hal di satu perusahaan terdapat lebih dari 1 (satu) serikat pekerja/serikat buruh maka yang berhak mewakili pekerja/buruh melakukan perundingan dengan pengusaha yang jumlah keanggotaannya lebih dari 50% (lima puluh perseratus) dari seluruh jumlah pekerja/buruh di perusahaan tersebut.\n(2) Dalam hal ketentuan sebagaimana dimaksud dalam ayat (1) tidak terpenuhi, maka serikat pekerja/serikat buruh dapat melakukan koalisi sehingga tercapai jumlah lebih dari 50% (lima puluh perseratus) dari seluruh jumlah pekerja/buruh di perusahaan tersebut untuk mewakili dalam perundingan dengan pengusaha.\n(3) Dalam hal ketentuan sebagaimana dimaksud dalam ayat (1) atau ayat (2) tidak terpenuhi, maka para serikat pekerja/serikat buruh membentuk tim perunding yang keanggotaannya ditentukan secara proporsional berdasarkan jumlah anggota masing-masing serikat pekerja/serikat buruh."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 121",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Keanggotaan serikat pekerja/serikat buruh sebagaimana dimaksud dalam Pasal 119 dan Pasal 120 dibuktikan dengan kartu tanda anggota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 122",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Pemungutan suara sebagaimana dimaksud dalam ayat (2) Pasal 119 diselenggarakan oleh panitia yang terdiri dari wakil-wakil pekerja/buruh dan pengurus serikat pekerja/serikat buruh yang disaksikan oleh pihak pejabat yang bertanggung jawab di bidang ketenagakerjaan dan pengusaha."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 123",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Masa berlakunya perjanjian kerja bersama paling lama 2 (dua) tahun.\n(2) Perjanjian kerja bersama sebagaimana dimaksud dalam ayat (1) dapat diperpanjang masa berlakunya paling lama 1 (satu) tahun berdasarkan kesepakatan tertulis antara pengusaha dengan serikat pekerja/serikat buruh.\n(3) Perundingan pembuatan perjanjian kerja bersama berikutnya dapat dimulai paling cepat 3 (tiga) bulan sebelum berakhirnya perjanjian kerja bersama yang sedang berlaku.\n(4) Dalam hal perundingan sebagaimana dimaksud dalam ayat (3) tidak mencapai kesepakatan maka perjanjian kerja bersama yang sedang berlaku, tetap berlaku untuk paling lama 1 (satu) tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 124",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Perjanjian kerja bersama paling sedikit memuat :\na. hak dan kewajiban pengusaha;\nb. hak dan kewajiban serikat pekerja/serikat buruh serta pekerja/buruh;\nc. jangka waktu dan tanggal mulai berlakunya perjanjian kerja bersama; dan\nd. tanda tangan para pihak pembuat perjanjian kerja bersama.\n(2) Ketentuan dalam perjanjian kerja bersama tidak boleh bertentangan dengan peraturan perundang-undangan yang berlaku.\n(3) Dalam hal isi perjanjian kerja bersama bertentangan dengan peraturan perundang-undangan yang berlaku sebagaimana dimaksud dalam ayat (2), maka ketentuan yang bertentangan tersebut batal demi hukum dan yang berlaku adalah ketentuan dalam peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 125",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Dalam hal kedua belah pihak sepakat mengadakan perubahan perjanjian kerja bersama, maka perubahan tersebut merupakan bagian yang tidak terpisahkan dari perjanjian kerja bersama yang sedang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 126",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Pengusaha, serikat pekerja/serikat buruh dan pekerja/buruh wajib melaksanakan ketentuan yang ada dalam perjanjian kerja bersama.\n(2) Pengusaha dan serikat pekerja/serikat buruh wajib memberitahukan isi perjanjian kerja bersama atau perubahannya kepada seluruh pekerja/buruh.\n(3) Pengusaha harus mencetak dan membagikan naskah perjanjian kerja bersama kepada setiap pekerja/buruh atas biaya perusahaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 127",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Perjanjian kerja yang dibuat oleh pengusaha dan pekerja/buruh tidak boleh bertentangan dengan perjanjian kerja bersama.\n(2) Dalam hal ketentuan dalam perjanjian kerja sebagaimana dimaksud dalam ayat (1) bertentangan dengan perjanjian kerja bersama, maka ketentuan dalam perjanjian kerja tersebut batal demi hukum dan yang berlaku adalah ketentuan dalam perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 128",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Dalam hal perjanjian kerja tidak memuat aturan-aturan yang diatur dalam perjanjian kerja bersama maka yang berlaku adalah aturan-aturan dalam perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 129",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Pengusaha dilarang mengganti perjanjian kerja bersama dengan peraturan perusahaan, selama di perusahaan yang bersangkutan masih ada serikat pekerja/serikat buruh.\n(2) Dalam hal di perusahaan tidak ada lagi serikat pekerja/serikat buruh dan perjanjian kerja bersama diganti dengan peraturan perusahaan, maka ketentuan yang ada dalam peraturan perusahaan tidak boleh lebih rendah dari ketentuan yang ada dalam perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 130",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Dalam hal perjanjian kerja bersama yang sudah berakhir masa berlakunya akan diperpanjang atau diperbaharui dan di perusahaan tersebut hanya terdapat 1 (satu) serikat pekerja/serikat buruh, maka perpanjangan atau pembuatan pembaharuan perjanjian kerja bersama tidak mensyaratkan ketentuan dalam Pasal 119.\n(2) Dalam hal perjanjian kerja bersama yang sudah berakhir masa berlakunya akan diperpanjang atau diperbaharui dan di perusahaan tersebut terdapat lebih dari 1 (satu) serikat pekerja/serikat buruh dan serikat pekerja/serikat buruh yang dulu berunding tidak lagi memenuhi ketentuan Pasal 120 ayat (1), maka perpanjangan atau pembuatan pembaharuan perjanjian kerja bersama dilakukan oleh serikat pekerja/serikat buruh yang anggotanya lebih 50% (lima puluh perseratus) dari jumlah seluruh pekerja/buruh di perusahaan bersama-sama dengan serikat pekerja/serikat buruh yang membuat perjanjian kerja bersama terdahulu dengan membentuk tim perunding secara proporsional.\n(3) Dalam hal perjanjian kerja bersama yang sudah berakhir masa berlakunya akan diperpanjang atau diperbaharui dan di perusahaan tersebut terdapat lebih dari 1 (satu) serikat pekerja/serikat buruh dan tidak satupun serikat pekerja/serikat buruh yang ada memenuhi ketentuan Pasal 120 ayat (1), maka perpanjangan atau pembuatan pembaharuan perjanjian kerja bersama dilakukan menurut ketentuan Pasal 120 ayat (2) dan ayat (3)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 131",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Dalam hal terjadi pembubaran serikat pekerja/serikat buruh atau pengalihan kepemilikan perusahaan maka perjanjian kerja bersama tetap berlaku sampai berakhirnya jangka waktu perjanjian kerja bersama.\n(2) Dalam hal terjadi penggabungan perusahaan (merger) dan masing-masing perusahaan mempunyai perjanjian kerja bersama maka perjanjian kerja bersama yang berlaku adalah perjanjian kerja bersama yang lebih menguntungkan pekerja/buruh.\n(3) Dalam hal terjadi penggabungan perusahaan (merger) antara perusahaan yang mempunyai perjanjian kerja bersama dengan perusahaan yang belum mempunyai perjanjian kerja bersama maka perjanjian kerja bersama tersebut berlaku bagi perusahaan yang bergabung (merger) sampai dengan berakhirnya jangka waktu perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 132",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "(1) Perjanjian kerja bersama mulai berlaku pada hari penandatanganan kecuali ditentukan lain dalam perjanjian kerja bersama tersebut.\n(2) Perjanjian kerja bersama yang ditandatangani oleh pihak yang membuat perjanjian kerja bersama selanjutnya didaftarkan oleh pengusaha pada instansi yang bertanggung jawab di bidang ketenagakerjaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 133",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Ketentuan mengenai persyaratan serta tata cara pembuatan, perpanjangan, perubahan, dan pendaftaran perjanjian kerja bersama diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 134",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Dalam mewujudkan pelaksanaan hak dan kewajiban pekerja/buruh dan pengusaha, pemerintah wajib melaksanakan pengawasan dan penegakan peraturan perundang-undangan ketenagakerjaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 135",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketujuh",
      "teks": "Pelaksanaan peraturan perundang-undangan ketenagakerjaan dalam mewujudkan hubungan industrial merupakan tanggung jawab pekerja/buruh, pengusaha, dan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedelapan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Bagian Kedelapan Lembaga Penyelesaian Perselisihan Hubungan Industrial"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "teks": "Paragraf 1 Perselisihan Hubungan Industrial"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 136",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Penyelesaian perselisihan hubungan industrial wajib dilaksanakan oleh pengusaha dan pekerja/buruh atau serikat pekerja/serikat buruh secara musyawarah untuk mufakat.\n(2) Dalam hal penyelesaian secara musyawarah untuk mufakat sebagaimana dimaksud dalam ayat (1) tidak tercapai, maka pengusaha dan pekerja/buruh atau serikat pekerja/serikat buruh menyelesaikan perselisihan hubungan industrial melalui prosedur penyelesaian perselisihan hubungan industrial yang diatur dengan undang-undang."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "teks": "Paragraf 2 Mogok Kerja"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 137",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "Mogok kerja sebagai hak dasar pekerja/buruh dan serikat pekerja/serikat buruh dilakukan secara sah, tertib, dan damai sebagai akibat gagalnya perundingan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 138",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Pekerja/buruh dan/atau serikat pekerja/serikat buruh yang bermaksud mengajak pekerja/buruh lain untuk mogok kerja pada saat mogok kerja berlangsung dilakukan dengan tidak melanggar hukum.\n(2) Pekerja/buruh yang diajak mogok kerja sebagaimana dimaksud dalam ayat (1), dapat memenuhi atau tidak memenuhi ajakan tersebut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 139",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pelaksanaan mogok kerja bagi pekerja/buruh yang bekerja pada perusahaan yang melayani kepentingan umum dan/atau perusahaan yang jenis kegiatannya membahayakan keselamatan jiwa manusia diatur sedemikian rupa sehingga tidak mengganggu kepentingan umum dan/atau membahayakan keselamatan orang lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 140",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Sekurang-kurangnya dalam waktu 7 (tujuh) hari kerja sebelum mogok kerja dilaksanakan, pekerja/buruh dan serikat pekerja/serikat buruh wajib memberitahukan secara tertulis kepada pengusaha dan instansi yang bertanggung jawab di bidang ketenagakerjaan setempat.\n(2) Pemberitahuan sebagaimana dimaksud dalam ayat (1) sekurang-kurangnya memuat :\na. waktu (hari, tanggal, dan jam) dimulai dan diakhiri mogok kerja;\nb. tempat mogok kerja;\nc. alasan dan sebab-sebab mengapa harus melakukan mogok kerja; dan\nd. tanda tangan ketua dan sekretaris dan/atau masing-masing ketua dan sekretaris serikat pekerja/serikat buruh sebagai penanggung jawab mogok kerja.\n(3) Dalam hal mogok kerja akan dilakukan oleh pekerja/buruh yang tidak menjadi anggota serikat pekerja/serikat buruh, maka pemberitahuan sebagaimana dimaksud dalam ayat (2) ditandatangani oleh perwakilan pekerja/buruh yang ditunjuk sebagai koordinator dan/atau penanggung jawab mogok kerja.\n(4) Dalam hal mogok kerja dilakukan tidak sebagaimana dimaksud dalam ayat (1), maka demi menyelamatkan alat produksi dan aset perusahaan, pengusaha dapat mengambil tindakan sementara dengan cara :\na. melarang para pekerja/buruh yang mogok kerja berada di lokasi kegiatan proses produksi; atau\nb. bila dianggap perlu melarang pekerja/buruh yang mogok kerja berada di lokasi perusahaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 141",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Instansi pemerintah dan pihak perusahaan yang menerima surat pemberitahuan mogok kerja sebagaimana dimaksud dalam Pasal 140 wajib memberikan tanda terima.\n(2) Sebelum dan selama mogok kerja berlangsung, instansi yang bertanggung jawab di bidang ketenagakerjaan wajib menyelesaikan masalah yang menyebabkan timbulnya pemogokan dengan mempertemukan dan merundingkannya dengan para pihak yang berselisih.\n(3) Dalam hal perundingan sebagaimana dimaksud dalam ayat (2) menghasilkan kesepakatan, maka harus dibuatkan perjanjian bersama yang ditandatangani oleh para pihak dan pegawai dari instansi yang bertanggung jawab di bidang ketenagakerjaan sebagai saksi.\n(4) Dalam hal perundingan sebagaimana dimaksud dalam ayat (2) tidak menghasilkan kesepakatan, maka pegawai dari instansi yang bertanggung jawab di bidang ketenagakerjaan segera menyerahkan masalah yang menyebabkan terjadinya mogok kerja kepada lembaga penyelesaian perselisihan hubungan industrial yang berwenang.\n(5) Dalam hal perundingan tidak menghasilkan kesepakatan sebagaimana dimaksud dalam ayat (4), maka atas dasar perundingan antara pengusaha dengan serikat pekerja/serikat buruh atau penanggung jawab mogok kerja, mogok kerja dapat diteruskan atau dihentikan untuk sementara atau dihentikan sama sekali."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 142",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Mogok kerja yang dilakukan tidak memenuhi ketentuan sebagaimana dimaksud dalam Pasal 139 dan Pasal 140 adalah mogok kerja tidak sah.\n(2) Akibat hukum dari mogok kerja yang tidak sah sebagaimana dimaksud dalam ayat (1) akan diatur dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 143",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Siapapun tidak dapat menghalang-halangi pekerja/buruh dan serikat pekerja/serikat buruh untuk menggunakan hak mogok kerja yang dilakukan secara sah, tertib, dan damai.\n(2) Siapapun dilarang melakukan penangkapan dan/atau penahanan terhadap pekerja/buruh dan pengurus serikat pekerja/serikat buruh yang melakukan mogok kerja secara sah, tertib, dan damai sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 144",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "Terhadap mogok kerja yang dilakukan sesuai dengan ketentuan sebagaimana dimaksud dalam Pasal 140, pengusaha dilarang :\na. mengganti pekerja/buruh yang mogok kerja dengan pekerja/buruh lain dari luar perusahaan; atau\nb. memberikan sanksi atau tindakan balasan dalam bentuk apapun kepada pekerja/buruh dan pengurus serikat pekerja/serikat buruh selama dan sesudah melakukan mogok kerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 145",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 2",
      "teks": "Dalam hal pekerja/buruh yang melakukan mogok kerja secara sah dalam melakukan tuntutan hak normatif yang sungguh-sungguh dilanggar oleh pengusaha, pekerja/buruh berhak mendapatkan upah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "teks": "Paragraf 3 Penutupan Perusahaan (lock-out)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 146",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Penutupan perusahaan (lock out) merupakan hak dasar pengusaha untuk menolak pekerja/buruh sebagian atau seluruhnya untuk menjalankan pekerjaan sebagai akibat gagalnya perundingan.\n(2) Pengusaha tidak dibenarkan melakukan penutupan perusahaan (lock out) sebagai tindakan balasan sehubungan adanya tuntutan normatif dari pekerja/buruh dan/atau serikat pekerja/serikat buruh.\n(3) Tindakan penutupan perusahaan (lock out) harus dilakukan sesuai dengan ketentuan hukum yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 147",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 3",
      "teks": "Penutupan perusahaan (lock out) dilarang dilakukan pada perusahaan-perusahaan yang melayani kepentingan umum dan/atau jenis kegiatan yang membahayakan keselamatan jiwa manusia, meliputi rumah sakit, pelayanan jaringan air bersih, pusat pengendali telekomunikasi, pusat penyedia tenaga listrik, pengolahan minyak dan gas bumi, serta kereta api."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 148",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Pengusaha wajib memberitahukan secara tertulis kepada pekerja/buruh dan/atau serikat pekerja/serikat buruh, serta instansi yang bertanggung jawab di bidang ketenagakerjaan setempat sekurang-kurangnya 7 (tujuh) hari kerja sebelum penutupan perusahaan (lock out) dilaksanakan.\n(2) Pemberitahuan sebagaimana dimaksud dalam ayat (1) sekurang-kurangnya memuat :\na. waktu (hari, tanggal, dan jam) dimulai dan diakhiri penutupan perusahaan (lock out); dan\nb. alasan dan sebab-sebab melakukan penutupan perusahaan (lock out).\n(3) Pemberitahuan sebagaimana dimaksud dalam ayat (1) ditandatangani oleh pengusaha dan/atau pimpinan perusahaan yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 149",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedelapan",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Pekerja/buruh atau serikat pekerja/serikat buruh dan instansi yang bertanggung jawab di bidang ketenagakerjaan yang menerima secara langsung surat pemberitahuan penutupan perusahaan (lock out) sebagaimana dimaksud dalam Pasal 148 harus memberikan tanda bukti penerimaan dengan mencantumkan hari, tanggal, dan jam penerimaan.\n(2) Sebelum dan selama penutupan perusahaan (lock out) berlangsung, instansi yang bertanggung jawab di bidang ketenagakerjaan berwenang langsung menyelesaikan masalah yang menyebabkan timbulnya penutupan perusahaan (lock out) dengan mempertemukan dan merundingkannya dengan para pihak yang berselisih.\n(3) Dalam hal perundingan sebagaimana dimaksud dalam ayat (2) menghasilkan kesepakatan, maka harus dibuat perjanjian bersama yang ditandatangani oleh para pihak dan pegawai dari instansi yang bertanggung jawab di bidang ketenagakerjaan sebagai saksi.\n(4) Dalam hal perundingan sebagaimana dimaksud dalam ayat (2) tidak menghasilkan kesepakatan, maka pegawai dari instansi yang bertanggung jawab di bidang ketenagakerjaan segera menyerahkan masalah yang menyebabkan terjadinya penutupan perusahaan (lock out) kepada lembaga penyelesaian perselisihan hubungan industrial.\n(5) Apabila perundingan tidak menghasilkan kesepakatan sebagaimana dimaksud dalam ayat (4), maka atas dasar perundingan antara pengusaha dan serikat pekerja/serikat buruh, penutupan perusahaan (lock out) dapat diteruskan atau dihentikan untuk sementara atau dihentikan sama sekali.\n(6) Pemberitahuan sebagaimana dimaksud dalam Pasal 148 ayat (1) dan ayat (2) tidak diperlukan apabila :\na. pekerja/buruh atau serikat pekerja/serikat buruh melanggar prosedur mogok kerja sebagaimana dimaksud dalam Pasal 140;\nb. pekerja/buruh atau serikat pekerja/serikat buruh melanggar ketentuan normatif yang ditentukan dalam perjanjian kerja, peraturan perusahaan, perjanjian kerja bersama, atau peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "BAB",
      "label": "BAB XII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XII PEMUTUSAN HUBUNGAN KERJA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 150",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Ketentuan mengenai pemutusan hubungan kerja dalam undang-undang ini meliputi pemutusan hubungan kerja yang terjadi di badan usaha yang berbadan hukum atau tidak, milik orang perseorangan, milik persekutuan atau milik badan hukum, baik milik swasta maupun milik negara, maupun usaha-usaha sosial dan usaha-usaha lain yang mempunyai pengurus dan mempekerjakan orang lain dengan membayar upah atau imbalan dalam bentuk lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 151",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Pengusaha, pekerja/buruh, serikat pekerja/serikat buruh, dan pemerintah, dengan segala upaya harus mengusahakan agar jangan terjadi pemutusan hubungan kerja.\n(2) Dalam hal segala upaya telah dilakukan, tetapi pemutusan hubungan kerja tidak dapat dihindari, maka maksud pemutusan hubungan kerja wajib dirundingkan oleh pengusaha dan serikat pekerja/serikat buruh atau dengan pekerja/buruh apabila pekerja/buruh yang bersangkutan tidak menjadi anggota serikat pekerja/serikat buruh.\n(3) Dalam hal perundingan sebagaimana dimaksud dalam ayat (2) benar-benar tidak menghasilkan persetujuan, pengusaha hanya dapat memutuskan hubungan kerja dengan pekerja/buruh setelah memperoleh penetapan dari lembaga penyelesaian perselisihan hubungan industrial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 152",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Permohonan penetapan pemutusan hubungan kerja diajukan secara tertulis kepada lembaga penyelesaian perselisihan hubungan industrial disertai alasan yang menjadi dasarnya.\n(2) Permohonan penetapan sebagaimana dimaksud dalam ayat (1) dapat diterima oleh lembaga penyelesaian perselisihan hubungan industrial apabila telah dirundingkan sebagaimana dimaksud dalam Pasal 151 ayat (2).\n(3) Penetapan atas permohonan pemutusan hubungan kerja hanya dapat diberikan oleh lembaga penyelesaian perselisihan hubungan industrial jika ternyata maksud untuk memutuskan hubungan kerja telah dirundingkan, tetapi perundingan tersebut tidak menghasilkan kesepakatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 153",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Pengusaha dilarang melakukan pemutusan hubungan kerja dengan alasan :\na. pekerja/buruh berhalangan masuk kerja karena sakit menurut keterangan dokter selama waktu tidak melampaui 12 (dua belas) bulan secara terus-menerus;\nb. pekerja/buruh berhalangan menjalankan pekerjaannya karena memenuhi kewajiban terhadap negara sesuai dengan ketentuan peraturan perundang-undangan yang berlaku;\nc. pekerja/buruh menjalankan ibadah yang diperintahkan agamanya;\nd. pekerja/buruh menikah;\ne. pekerja/buruh perempuan hamil, melahirkan, gugur kandungan, atau menyusui bayinya;\nf. pekerja/buruh mempunyai pertalian darah dan/atau ikatan perkawinan dengan pekerja/buruh lainnya di dalam satu perusahaan, kecuali telah diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama;\ng. pekerja/buruh mendirikan, menjadi anggota dan/atau pengurus serikat pekerja/serikat buruh, pekerja/buruh melakukan kegiatan serikat pekerja/serikat buruh di luar jam kerja, atau di dalam jam kerja atas kesepakatan pengusaha, atau berdasarkan ketentuan yang diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama;\nh. pekerja/buruh yang mengadukan pengusaha kepada yang berwajib mengenai perbuatan pengusaha yang melakukan tindak pidana kejahatan;\ni. karena perbedaan paham, agama, aliran politik, suku, warna kulit, golongan, jenis kelamin, kondisi fisik, atau status perkawinan;\nj. pekerja/buruh dalam keadaan cacat tetap, sakit akibat kecelakaan kerja, atau sakit karena hubungan kerja yang menurut surat keterangan dokter yang jangka waktu penyembuhannya belum dapat dipastikan.\n(2) Pemutusan hubungan kerja yang dilakukan dengan alasan sebagaimana dimaksud dalam ayat (1) batal demi hukum dan pengusaha wajib mempekerjakan kembali pekerja/buruh yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 154",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Penetapan sebagaimana dimaksud dalam Pasal 151 ayat (3) tidak diperlukan dalam hal :\na. pekerja/buruh masih dalam masa percobaan kerja, bilamana telah dipersyaratkan secara tertulis sebelumnya;\nb. pekerja/buruh mengajukan permintaan pengunduran diri, secara tertulis atas kemauan sendiri tanpa ada indikasi adanya tekanan/intimidasi dari pengusaha, berakhirnya hubungan kerja sesuai dengan perjanjian kerja waktu tertentu untuk pertama kali;\nc. pekerja/buruh mencapai usia pensiun sesuai dengan ketetapan dalam perjanjian kerja, peraturan perusahaan, perjanjian kerja bersama, atau peraturan perundang-undangan; atau\nd. pekerja/buruh meninggal dunia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 155",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Pemutusan hubungan kerja tanpa penetapan sebagaimana dimaksud dalam Pasal 151 ayat (3) batal demi hukum.\n(2) Selama putusan lembaga penyelesaian perselisihan hubungan industrial belum ditetapkan, baik pengusaha maupun pekerja/buruh harus tetap melaksanakan segala kewajibannya.\n(3) Pengusaha dapat melakukan penyimpangan terhadap ketentuan sebagaimana dimaksud dalam ayat (2) berupa tindakan skorsing kepada pekerja/buruh yang sedang dalam proses pemutusan hubungan kerja dengan tetap wajib membayar upah beserta hak-hak lainnya yang biasa diterima pekerja/buruh."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 156",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Dalam hal terjadi pemutusan hubungan kerja, pengusaha diwajibkan membayar uang pesangon dan atau uang penghargaan masa kerja dan uang penggantian hak yang seharusnya diterima.\n(2) Perhitungan uang pesangon sebagaimana dimaksud dalam ayat (1) paling sedikit sebagai berikut :\na. masa kerja kurang dari 1 (satu) tahun, 1 (satu) bulan upah;\nb. masa kerja 1 (satu) tahun atau lebih tetapi kurang dari 2 (dua) tahun, 2 (dua) bulan upah;\nc. masa kerja 2 (dua) tahun atau lebih tetapi kurang dari 3 (tiga) tahun, 3 (tiga) bulan upah;\nd. masa kerja 3 (tiga) tahun atau lebih tetapi kurang dari 4 (empat) tahun, 4 (empat) bulan upah;\ne. masa kerja 4 (empat) tahun atau lebih tetapi kurang dari 5 (lima) tahun, 5 (lima) bulan upah;\nf. masa kerja 5 (lima) tahun atau lebih, tetapi kurang dari 6 (enam) tahun, 6 (enam) bulan upah;\ng. masa kerja 6 (enam) tahun atau lebih tetapi kurang dari 7 (tujuh) tahun, 7 (tujuh) bulan upah;\nh. masa kerja 7 (tujuh) tahun atau lebih tetapi kurang dari 8 (delapan) tahun, 8 (delapan) bulan upah;\ni. masa kerja 8 (delapan) tahun atau lebih, 9 (sembilan) bulan upah.\n(3) Perhitungan uang penghargaan masa kerja sebagaimana dimaksud dalam ayat (1) ditetapkan sebagai berikut :\na. masa kerja 3 (tiga) tahun atau lebih tetapi kurang dari 6 (enam) tahun, 2 (dua) bulan upah;\nb. masa kerja 6 (enam) tahun atau lebih tetapi kurang dari 9 (sembilan) tahun, 3 (tiga) bulan upah;\nc. masa kerja 9 (sembilan) tahun atau lebih tetapi kurang dari 12 (dua belas) tahun, 4 (empat) bulan upah;\nd. masa kerja 12 (dua belas) tahun atau lebih tetapi kurang dari 15 (lima belas) tahun, 5 (lima) bulan upah;\ne. masa kerja 15 (lima belas) tahun atau lebih tetapi kurang dari 18 (delapan belas) tahun, 6 (enam) bulan upah;\nf. masa kerja 18 (delapan belas) tahun atau lebih tetapi kurang dari 21 (dua puluh satu) tahun, 7 (tujuh) bulan upah;\ng. masa kerja 21 (dua puluh satu) tahun atau lebih tetapi kurang dari 24 (dua puluh empat) tahun, 8 (delapan) bulan upah;\nh. masa kerja 24 (dua puluh empat) tahun atau lebih, 10 (sepuluh) bulan upah.\n(4) Uang penggantian hak yang seharusnya diterima sebagaimana dimaksud dalam ayat (1) meliputi :\na. cuti tahunan yang belum diambil dan belum gugur;\nb. biaya atau ongkos pulang untuk pekerja/buruh dan keluarganya ke tempat dimana pekerja/buruh diterima bekerja;\nc. penggantian perumahan serta pengobatan dan perawatan ditetapkan 15% (lima belas perseratus) dari uang pesangon dan/atau uang penghargaan masa kerja bagi yang memenuhi syarat;\nd. hal-hal lain yang ditetapkan dalam perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.\n(5) Perubahan perhitungan uang pesangon, perhitungan uang penghargaan masa kerja, dan uang penggantian hak sebagaimana dimaksud dalam ayat (2), ayat (3), dan ayat (4) ditetapkan dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 157",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Komponen upah yang digunakan sebagai dasar perhitungan uang pesangon, uang penghargaan masa kerja, dan uang pengganti hak yang seharusnya diterima yang tertunda, terdiri atas :\na. upah pokok;\nb. segala macam bentuk tunjangan yang bersifat tetap yang diberikan kepada pekerja/buruh dan keluarganya, termasuk harga pembelian dari catu yang diberikan kepada pekerja/buruh secara cuma-cuma, yang apabila catu harus dibayar pekerja/buruh dengan subsidi, maka sebagai upah dianggap selisih antara harga pembelian dengan harga yang harus dibayar oleh pekerja/buruh.\n(2) Dalam hal penghasilan pekerja/buruh dibayarkan atas dasar perhitungan harian, maka penghasilan sebulan adalah sama dengan 30 kali penghasilan sehari.\n(3) Dalam hal upah pekerja/buruh dibayarkan atas dasar perhitungan satuan hasil, potongan/borongan atau komisi, maka penghasilan sehari adalah sama dengan pendapatan rata-rata per hari selama 12 (dua belas) bulan terakhir, dengan ketentuan tidak boleh kurang dari ketentuan upah minimum provinsi atau kabupaten/kota.\n(4) Dalam hal pekerjaan tergantung pada keadaan cuaca dan upahnya didasarkan pada upah borongan, maka perhitungan upah sebulan dihitung dari upah rata-rata 12 (dua belas) bulan terakhir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 158",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Pengusaha dapat memutuskan hubungan kerja terhadap pekerja/buruh dengan alasan pekerja/buruh telah melakukan kesalahan berat sebagai berikut :\na. melakukan penipuan, pencurian, atau penggelapan barang dan/atau uang milik perusahaan;\nb. memberikan keterangan palsu atau yang dipalsukan sehingga merugikan perusahaan;\nc. mabuk, meminum minuman keras yang memabukkan, memakai dan/atau mengedarkan narkotika, psikotropika, dan zat adiktif lainnya di lingkungan kerja;\nd. melakukan perbuatan asusila atau perjudian di lingkungan kerja;\ne. menyerang, menganiaya, mengancam, atau mengintimidasi teman sekerja atau pengusaha di lingkungan kerja;\nf. membujuk teman sekerja atau pengusaha untuk melakukan perbuatan yang bertentangan dengan peraturan perundang-undangan;\ng. dengan ceroboh atau sengaja merusak atau membiarkan dalam keadaan bahaya barang milik perusahaan yang menimbulkan kerugian bagi perusahaan;\nh. dengan ceroboh atau sengaja membiarkan teman sekerja atau pengusaha dalam keadaan bahaya di tempat kerja;\ni. membongkar atau membocorkan rahasia perusahaan yang seharusnya dirahasiakan kecuali untuk kepentingan negara; atau\nj. melakukan perbuatan lainnya di lingkungan perusahaan yang diancam pidana penjara 5 (lima) tahun atau lebih.\n(2) Kesalahan berat sebagaimana dimaksud dalam ayat (1) harus didukung dengan bukti sebagai berikut :\na. pekerja/buruh tertangkap tangan;\nb. ada pengakuan dari pekerja/buruh yang bersangkutan; atau\nc. bukti lain berupa laporan kejadian yang dibuat oleh pihak yang berwenang di perusahaan yang bersangkutan dan didukung oleh sekurang-kurangnya 2 (dua) orang saksi.\n(3) Pekerja/buruh yang diputus hubungan kerjanya berdasarkan alasan sebagaimana dimaksud dalam ayat (1), dapat memperoleh uang penggantian hak sebagaimana dimaksud dalam Pasal 156 ayat (4).\n(4) Bagi pekerja/buruh sebagaimana dimaksud dalam ayat (1) yang tugas dan fungsinya tidak mewakili kepentingan pengusaha secara langsung, selain uang penggantian hak sesuai dengan ketentuan Pasal 156 ayat (4) diberikan uang pisah yang besarnya dan pelaksanaannya diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 159",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Apabila pekerja/buruh tidak menerima pemutusan hubungan kerja sebagaimana dimaksud dalam Pasal 158 ayat (1), pekerja/buruh yang bersangkutan dapat mengajukan gugatan ke lembaga penyelesaian perselisihan hubungan industrial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 160",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "(1) Dalam hal pekerja/buruh ditahan pihak yang berwajib karena diduga melakukan tindak pidana bukan atas pengaduan pengusaha, maka pengusaha tidak wajib membayar upah tetapi wajib memberikan bantuan kepada keluarga pekerja/buruh yang menjadi tanggungannya dengan ketentuan sebagai berikut :\na. untuk 1 (satu) orang tanggungan : 25% (dua puluh lima perseratus) dari upah;\nb. untuk 2 (dua) orang tanggungan : 35% (tiga puluh lima perseratus) dari upah;\nc. untuk 3 (tiga) orang tanggungan : 45% (empat puluh lima perseratus) dari upah;\nd. untuk 4 (empat) orang tanggungan atau lebih : 50% (lima puluh perseratus) dari upah.\n(2) Bantuan sebagaimana dimaksud dalam ayat (1) diberikan untuk paling lama 6 (enam) bulan takwin terhitung sejak hari pertama pekerja/buruh ditahan oleh pihak yang berwajib.\n(3) Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja/buruh yang setelah 6 (enam) bulan tidak dapat melakukan pekerjaan sebagaimana mestinya karena dalam proses perkara pidana sebagaimana dimaksud dalam ayat (1).\n(4) Dalam hal pengadilan memutuskan perkara pidana sebelum masa 6 (enam) bulan sebagaimana dimaksud dalam ayat (3) berakhir dan pekerja/buruh dinyatakan tidak bersalah, maka pengusaha wajib mempekerjakan pekerja/buruh kembali.\n(5) Dalam hal pengadilan memutuskan perkara pidana sebelum masa 6 (enam) bulan berakhir dan pekerja/buruh dinyatakan bersalah, maka pengusaha dapat melakukan pemutusan hubungan kerja kepada pekerja/buruh yang bersangkutan.\n(6) Pemutusan hubungan kerja sebagaimana dimaksud dalam ayat (3) dan ayat (5) dilakukan tanpa penetapan lembaga penyelesaian perselisihan hubungan industrial.\n(7) Pengusaha wajib membayar kepada pekerja/buruh yang mengalami pemutusan hubungan kerja sebagaimana dimaksud dalam ayat (3) dan ayat (5), uang penghargaan masa kerja 1 (satu) kali ketentuan Pasal 156 ayat (3) dan uang penggantian hak sesuai ketentuan dalam Pasal 156 ayat (4)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 161",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Dalam hal pekerja/buruh melakukan pelanggaran ketentuan yang diatur dalam perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama, pengusaha dapat melakukan pemutusan hubungan kerja, setelah kepada pekerja/buruh yang bersangkutan diberikan surat peringatan pertama, kedua, dan ketiga secara berturut-turut.\n(2) Surat peringatan sebagaimana dimaksud dalam ayat (1) masing-masing berlaku untuk jangka waktu paling lama 6 (enam) bulan, kecuali ditetapkan lain dalam perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.\n(3) Pekerja/buruh yang mengalami pemutusan hubungan kerja karena melakukan pelanggaran sebagaimana dimaksud dalam ayat (1) setelah diberikan surat peringatan ketiga berturut-turut berhak atas uang pesangon sebesar 1 (satu) kali ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 156 ayat (3) dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 162",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Pekerja/buruh yang mengundurkan diri atas kemauan sendiri, memperoleh uang penggantian hak sesuai ketentuan Pasal 156 ayat (4).\n(2) Bagi pekerja/buruh yang mengundurkan diri atas kemauan sendiri, yang tugas dan fungsinya tidak mewakili kepentingan pengusaha secara langsung, selain menerima uang penggantian hak sesuai ketentuan Pasal 156 ayat (4) diberikan uang pisah yang besarnya dan pelaksanaannya diatur dalam perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.\n(3) Pekerja/buruh yang mengundurkan diri sebagaimana dimaksud dalam ayat (1) harus memenuhi syarat:\na. mengajukan permohonan pengunduran diri secara tertulis selambat-lambatnya 30 (tiga puluh) hari sebelum tanggal mulai pengunduran diri;\nb. tidak terikat dalam ikatan dinas; dan\nc. tetap melaksanakan kewajibannya sampai tanggal mulai pengunduran diri.\n(4) Pemutusan hubungan kerja dengan alasan mengundurkan diri atas kemauan sendiri dilakukan tanpa penetapan lembaga penyelesaian perselisihan hubungan industrial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 163",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja/buruh dalam hal terjadi perubahan status, penggabungan, peleburan, atau perubahan kepemilikan perusahaan dan pekerja/buruh tidak bersedia melanjutkan hubungan kerja, maka pekerja/buruh berhak atas uang pesangon sebesar 1 (satu) kali sesuai ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja 1 (satu) kali ketentuan Pasal 156 ayat (3) dan uang penggantian hak sesuai ketentuan dalam Pasal 156 ayat (4).\n(2) Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja/buruh karena perubahan status, penggabungan, atau peleburan perusahaan, dan pengusaha tidak bersedia menerima pekerja/buruh di perusahaannya, maka pekerja/buruh berhak atas uang pesangon sebesar 2 (dua) kali ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja 1 (satu) kali ketentuan dalam Pasal 156 ayat (3), dan uang penggantian hak sesuai ketentuan dalam Pasal 156 ayat (4)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 164",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja/buruh karena perusahaan tutup yang disebabkan perusahaan mengalami kerugian secara terus menerus selama 2 (dua) tahun, atau keadaan memaksa (force majeur), dengan ketentuan pekerja/buruh berhak atas uang pesangon sebesar 1 (satu) kali ketentuan Pasal 156 ayat (2) uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 156 ayat (3) dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4).\n(2) Kerugian perusahaan sebagaimana dimaksud dalam ayat (1) harus dibuktikan dengan laporan keuangan 2 (dua) tahun terakhir yang telah diaudit oleh akuntan publik.\n(3) Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja/buruh karena perusahaan tutup bukan karena mengalami kerugian 2 (dua) tahun berturut-turut atau bukan karena keadaan memaksa (force majeur) tetapi perusahaan melakukan efisiensi, dengan ketentuan pekerja/buruh berhak atas uang pesangon sebesar 2 (dua) kali ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 156 ayat (3) dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 165",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja/buruh karena perusahaan pailit, dengan ketentuan pekerja/buruh berhak atas uang pesangon sebesar 1 (satu) kali ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 156 ayat (3) dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 166",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Dalam hal hubungan kerja berakhir karena pekerja/buruh meninggal dunia, kepada ahli warisnya diberikan sejumlah uang yang besar perhitungannya sama dengan perhitungan 2 (dua) kali uang pesangon sesuai ketentuan Pasal 156 ayat (2), 1 (satu) kali uang penghargaan masa kerja sesuai ketentuan Pasal 156 ayat (3), dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 167",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja/buruh karena memasuki usia pensiun dan apabila pengusaha telah mengikutkan pekerja/buruh pada program pensiun yang iurannya dibayar penuh oleh pengusaha, maka pekerja/buruh tidak berhak mendapatkan uang pesangon sesuai ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja sesuai ketentuan Pasal 156 ayat (3), tetapi tetap berhak atas uang penggantian hak sesuai ketentuan Pasal 156 ayat (4).\n(2) Dalam hal besarnya jaminan atau manfaat pensiun yang diterima sekaligus dalam program pensiun sebagaimana dimaksud dalam ayat (1) ternyata lebih kecil daripada jumlah uang pesangon 2 (dua) kali ketentuan Pasal 156 ayat (2) dan uang penghargaan masa kerja 1 (satu) kali ketentuan Pasal 156 ayat (3), dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4), maka selisihnya dibayar oleh pengusaha.\n(3) Dalam hal pengusaha telah mengikutsertakan pekerja/buruh dalam program pensiun yang iurannya/preminya dibayar oleh pengusaha dan pekerja/buruh, maka yang diperhitungkan dengan uang pesangon yaitu uang pensiun yang premi/iurannya dibayar oleh pengusaha.\n(4) Ketentuan sebagaimana dimaksud dalam ayat (1), ayat (2), dan ayat (3) dapat diatur lain dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama.\n(5) Dalam hal pengusaha tidak mengikutsertakan pekerja/buruh yang mengalami pemutusan hubungan kerja karena usia pensiun pada program pensiun maka pengusaha wajib memberikan kepada pekerja/buruh uang pesangon sebesar 2 (dua) kali ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja 1 (satu) kali ketentuan Pasal 156 ayat (3) dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4).\n(6) Hak atas manfaat pensiun sebagaimana yang dimaksud dalam ayat (1), ayat (2), ayat (3), dan ayat (4) tidak menghilangkan hak pekerja/buruh atas jaminan hari tua yang bersifat wajib sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 168",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Pekerja/buruh yang mangkir selama 5 (lima) hari kerja atau lebih berturut-turut tanpa keterangan secara tertulis yang dilengkapi dengan bukti yang sah dan telah dipanggil oleh pengusaha 2 (dua) kali secara patut dan tertulis dapat diputus hubungan kerjanya karena dikualifikasikan mengundurkan diri.\n(2) Keterangan tertulis dengan bukti yang sah sebagaimana dimaksud dalam ayat (1) harus diserahkan paling lambat pada hari pertama pekerja/buruh masuk bekerja.\n(3) Pemutusan hubungan kerja sebagaimana dimaksud dalam ayat (1) pekerja/buruh yang bersangkutan berhak menerima uang penggantian hak sesuai ketentuan Pasal 156 ayat (4) dan diberikan uang pisah yang besarnya dan pelaksanaannya diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 169",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Pekerja/buruh dapat mengajukan permohonan pemutusan hubungan kerja kepada lembaga penyelesaian perselisihan hubungan industrial dalam hal pengusaha melakukan perbuatan sebagai berikut:\na. menganiaya, menghina secara kasar atau mengancam pekerja/buruh;\nb. membujuk dan/atau menyuruh pekerja/buruh untuk melakukan perbuatan yang bertentangan dengan peraturan perundang-undangan;\nc. tidak membayar upah tepat pada waktu yang telah ditentukan selama 3 (tiga) bulan berturut-turut atau lebih;\nd. tidak melakukan kewajiban yang telah dijanjikan kepada pekerja/buruh;\ne. memerintahkan pekerja/buruh untuk melaksanakan pekerjaan di luar yang diperjanjikan; atau\nf. memberikan pekerjaan yang membahayakan jiwa, keselamatan, kesehatan, dan kesusilaan pekerja/buruh sedangkan pekerjaan tersebut tidak dicantumkan pada perjanjian kerja.\n(2) Pemutusan hubungan kerja dengan alasan sebagaimana dimaksud dalam ayat (1) pekerja/buruh berhak mendapat uang pesangon 2 (dua) kali ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja 1 (satu) kali ketentuan Pasal 156 ayat (3), dan uang penggantian hak sesuai ketentuan Pasal 156 ayat (4).\n(3) Dalam hal pengusaha dinyatakan tidak melakukan perbuatan sebagaimana dimaksud dalam ayat (1) oleh lembaga penyelesaian perselisihan hubungan industrial maka pengusaha dapat melakukan pemutusan hubungan kerja tanpa penetapan lembaga penyelesaian perselisihan hubungan industrial dan pekerja/buruh yang bersangkutan tidak berhak atas uang pesangon sesuai ketentuan Pasal 156 ayat (2), dan uang penghargaan masa kerja sesuai ketentuan Pasal 156 ayat (3)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 170",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pemutusan hubungan kerja yang dilakukan tidak memenuhi ketentuan Pasal 151 ayat (3) dan Pasal 168, kecuali Pasal 158 ayat (1), Pasal 160 ayat (3), Pasal 162, dan Pasal 169 batal demi hukum dan pengusaha wajib mempekerjakan pekerja/buruh yang bersangkutan serta membayar seluruh upah dan hak yang seharusnya diterima."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 171",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pekerja/buruh yang mengalami pemutusan hubungan kerja tanpa penetapan lembaga penyelesaian perselisihan hubungan industrial yang berwenang sebagaimana dimaksud dalam Pasal 158 ayat (1), Pasal 160 ayat (3), dan Pasal 162, dan pekerja/buruh yang bersangkutan tidak dapat menerima pemutusan hubungan kerja tersebut, maka pekerja/buruh dapat mengajukan gugatan ke lembaga penyelesaian perselisihan hubungan industrial dalam waktu paling lama 1 (satu) tahun sejak tanggal dilakukan pemutusan hubungan kerjanya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 172",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pekerja/buruh yang mengalami sakit berkepanjangan, mengalami cacat akibat kecelakaan kerja dan tidak dapat melakukan pekerjaannya setelah melampaui batas 12 (dua belas) bulan dapat mengajukan pemutusan hubungan kerja dan diberikan uang pesangon 2 (dua) kali ketentuan Pasal 156 ayat (2), uang penghargaan masa kerja 2 (dua) kali ketentuan Pasal 156 ayat (3), dan uang pengganti hak 1 (satu) kali ketentuan Pasal 156 ayat (4)."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIII\nPEMBINAAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 173",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "teks": "(1) Pemerintah melakukan pembinaan terhadap unsur-unsur dan kegiatan yang berhubungan dengan ketenagakerjaan.\n(2) Pembinaan sebagaimana dimaksud dalam ayat (1), dapat mengikutsertakan organisasi pengusaha, serikat pekerja/serikat buruh, dan organisasi profesi terkait.\n(3) Pembinaan sebagaimana dimaksud dalam ayat (1), dan ayat (2), dilaksanakan secara terpadu dan terkoordinasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 174",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "teks": "Dalam rangka pembinaan ketenagakerjaan, pemerintah, organisasi pengusaha, serikat pekerja/serikat buruh dan organisasi profesi terkait dapat melakukan kerja sama internasional di bidang ketenagakerjaan sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 175",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "teks": "(1) Pemerintah dapat memberikan penghargaan kepada orang atau lembaga yang telah berjasa dalam pembinaan ketenagakerjaan.\n(2) Penghargaan sebagaimana dimaksud dalam ayat (1) dapat diberikan dalam bentuk piagam, uang, dan/atau bentuk lainnya."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIV\nPENGAWASAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 176",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pengawasan ketenagakerjaan dilakukan oleh pegawai pengawas ketenagakerjaan yang mempunyai kompetensi dan independen guna menjamin pelaksanaan peraturan perundang-undangan ketenagakerjaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 177",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pegawai pengawas ketenagakerjaan sebagaimana dimaksud dalam Pasal 176 ditetapkan oleh Menteri atau pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 178",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "(1) Pengawasan ketenagakerjaan dilaksanakan oleh unit kerja tersendiri pada instansi yang lingkup tugas dan tanggung jawabnya di bidang ketenagakerjaan pada pemerintah pusat, pemerintah provinsi, dan pemerintah kabupaten/kota.\n(2) Pelaksanaan pengawasan ketenagakerjaan sebagaimana dimaksud dalam ayat (1) diatur dengan Keputusan Presiden."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 179",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "(1) Unit kerja pengawasan ketenagakerjaan sebagaimana dimaksud dalam Pasal 178 pada pemerintah provinsi dan pemerintah kabupaten/kota wajib menyampaikan laporan pelaksanaan pengawasan ketenagakerjaan kepada Menteri.\n(2) Tata cara penyampaian laporan sebagaimana dimaksud dalam ayat (1) ditetapkan dengan Keputusan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 180",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Ketentuan mengenai persyaratan penunjukan, hak dan kewajiban, serta wewenang pegawai pengawas ketenagakerjaan sebagaimana dimaksud dalam Pasal 176 sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 181",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pegawai pengawas ketenagakerjaan dalam melaksanakan tugasnya sebagaimana dimaksud dalam Pasal 176 wajib:\na. merahasiakan segala sesuatu yang menurut sifatnya patut dirahasiakan;\nb. tidak menyalahgunakan kewenangannya."
    },
    {
      "tipe": "BAB",
      "label": "BAB XV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XV\nPENYIDIKAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 182",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "teks": "(1) Selain penyidik pejabat Polisi Negara Republik Indonesia, juga kepada pegawai pengawas ketenagakerjaan dapat diberi wewenang khusus sebagai penyidik pegawai negeri sipil sesuai dengan peraturan perundang-undangan yang berlaku.\n(2) Penyidik Pegawai Negeri Sipil sebagaimana dimaksud dalam ayat (1) berwenang:\na. melakukan pemeriksaan atas kebenaran laporan serta keterangan tentang tindak pidana di bidang ketenagakerjaan;\nb. melakukan pemeriksaan terhadap orang yang diduga melakukan tindak pidana di bidang ketenagakerjaan;\nc. meminta keterangan dan bahan bukti dari orang atau badan hukum sehubungan dengan tindak pidana di bidang ketenagakerjaan;\nd. melakukan pemeriksaan atau penyitaan bahan atau barang bukti dalam perkara tindak pidana di bidang ketenagakerjaan;\ne. melakukan pemeriksaan atas surat dan/atau dokumen lain tentang tindak pidana di bidang ketenagakerjaan;\nf. meminta bantuan tenaga ahli dalam rangka pelaksanaan tugas penyidikan tindak pidana di bidang ketenagakerjaan; dan\ng. menghentikan penyidikan apabila tidak terdapat cukup bukti yang membuktikan tentang adanya tindak pidana di bidang ketenagakerjaan.\n(3) Kewenangan penyidik pegawai negeri sipil sebagaimana dimaksud dalam ayat (2) dilaksanakan sesuai dengan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "BAB",
      "label": "BAB XVI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XVI\nKETENTUAN PIDANA DAN SANKSI ADMINISTRATIF"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Pertama",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XVI",
      "teks": "Bagian Pertama\nKetentuan Pidana"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 183",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Pertama",
      "teks": "(1) Barang siapa melanggar ketentuan sebagaimana dimaksud dalam Pasal 74, dikenakan sanksi pidana penjara paling singkat 2 (dua) tahun dan paling lama 5 (lima) tahun dan/atau denda paling sedikit Rp 200.000.000,00 (dua ratus juta rupiah) dan paling banyak Rp 500.000.000,00 (lima ratus juta rupiah).\n(2) Tindak pidana sebagaimana dimaksud dalam ayat (1) merupakan tindak pidana kejahatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 184",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Pertama",
      "teks": "(1) Barang siapa melanggar ketentuan sebagaimana dimaksud dalam Pasal 167 ayat (5), dikenakan sanksi pidana penjara paling singkat 1 (satu) tahun dan paling lama 5 (lima) tahun dan/atau denda paling sedikit Rp 100.000.000,00 (seratus juta rupiah) dan paling banyak Rp 500.000.000,00 (lima ratus juta rupiah).\n(2) Tindak pidana sebagaimana dimaksud dalam ayat (1) merupakan tindak pidana kejahatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 185",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Pertama",
      "teks": "(1) Barang siapa melanggar ketentuan sebagaimana dimaksud dalam Pasal 42 ayat (1) dan ayat (2), Pasal 68, Pasal 69 ayat (2), Pasal 80, Pasal 82, Pasal 90 ayat (1), Pasal 143, dan Pasal 160 ayat (4) dan ayat (7), dikenakan sanksi pidana penjara paling singkat 1 (satu) tahun dan paling lama 4 (empat) tahun dan/atau denda paling sedikit Rp 100.000.000,00 (seratus juta rupiah) dan paling banyak Rp 400.000.000,00 (empat ratus juta rupiah).\n(2) Tindak pidana sebagaimana dimaksud dalam ayat (1) merupakan tindak pidana kejahatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 186",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Pertama",
      "teks": "(1) Barang siapa melanggar ketentuan sebagaimana dimaksud dalam Pasal 35 ayat (2) dan ayat (3), Pasal 93 ayat (2), Pasal 137, dan Pasal 138 ayat (1), dikenakan sanksi pidana penjara paling singkat 1 (satu) bulan dan paling lama 4 (empat) tahun dan/atau denda paling sedikit Rp 10.000.000,00 (sepuluh juta rupiah) dan paling banyak Rp 400.000.000,00 (empat ratus juta rupiah).\n(2) Tindak pidana sebagaimana dimaksud dalam ayat (1) merupakan tindak pidana pelanggaran."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 187",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Pertama",
      "teks": "(1) Barang siapa melanggar ketentuan sebagaimana dimaksud dalam Pasal 37 ayat (2), Pasal 44 ayat (1), Pasal 45 ayat (1), Pasal 67 ayat (1), Pasal 71 ayat (2), Pasal 76, Pasal 78 ayat (2), Pasal 79 ayat (1), dan ayat (2), Pasal 85 ayat (3), dan Pasal 144, dikenakan sanksi pidana kurungan paling singkat 1 (satu) bulan dan paling lama 12 (dua belas) bulan dan/atau denda paling sedikit Rp 10.000.000,00 (sepuluh juta rupiah) dan paling banyak Rp 100.000.000,00 (seratus juta rupiah).\n(2) Tindak pidana sebagaimana dimaksud dalam ayat (1) merupakan tindak pidana pelanggaran."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 188",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Pertama",
      "teks": "(1) Barang siapa melanggar ketentuan sebagaimana dimaksud dalam Pasal 14 ayat (2), Pasal 38 ayat (2), Pasal 63 ayat (1), Pasal 78 ayat (1), Pasal 108 ayat (1), Pasal 111 ayat (3), Pasal 114, dan Pasal 148, dikenakan sanksi pidana denda paling sedikit Rp 5.000.000,00 (lima juta rupiah) dan paling banyak Rp 50.000.000,00 (lima puluh juta rupiah).\n(2) Tindak pidana sebagaimana dimaksud dalam ayat (1) merupakan tindak pidana pelanggaran."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 189",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Pertama",
      "teks": "Sanksi pidana penjara, kurungan, dan/atau denda tidak menghilangkan kewajiban pengusaha membayar hak-hak dan/atau ganti kerugian kepada tenaga kerja atau pekerja/buruh."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XVI",
      "teks": "Bagian Kedua\nSanksi Administratif"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 190",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Menteri atau pejabat yang ditunjuk mengenakan sanksi administratif atas pelanggaran ketentuan-ketentuan sebagaimana diatur dalam Pasal 5, Pasal 6, Pasal 15, Pasal 25, Pasal 38 ayat (2), Pasal 45 ayat (1), Pasal 47 ayat (1), Pasal 48, Pasal 87, Pasal 106, Pasal 126 ayat (3), dan Pasal 160 ayat (1) dan ayat (2) Undang-undang ini serta peraturan pelaksanaannya.\n(2) Sanksi administratif sebagaimana dimaksud dalam ayat (1) berupa:\na. teguran;\nb. peringatan tertulis;\nc. pembatasan kegiatan usaha;\nd. pembekuan kegiatan usaha;\ne. pembatalan persetujuan;\nf. pembatalan pendaftaran;\ng. penghentian sementara sebagian atau seluruh alat produksi;\nh. pencabutan ijin.\n(3) Ketentuan mengenai sanksi administratif sebagaimana dimaksud dalam ayat (1) dan ayat (2) diatur lebih lanjut oleh Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB XVII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XVII\nKETENTUAN PERALIHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 191",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVII",
      "teks": "Semua peraturan pelaksanaan yang mengatur ketenagakerjaan tetap berlaku sepanjang tidak bertentangan dan/atau belum diganti dengan peraturan yang baru berdasarkan Undang-undang ini."
    },
    {
      "tipe": "BAB",
      "label": "BAB XVIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XVIII\nKETENTUAN PENUTUP"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 192",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVIII",
      "teks": "Pada saat mulai berlakunya Undang-undang ini, maka:\n1. Ordonansi tentang Pengerahan Orang Indonesia Untuk Melakukan Pekerjaan Di Luar Indonesia (Staatsblad Tahun 1887 Nomor 8);\n2. Ordonansi tanggal 17 Desember 1925 Peraturan tentang Pembatasan Kerja Anak Dan Kerja Malam Bagi Wanita (Staatsblad Tahun 1925 Nomor 647);\n3. Ordonansi Tahun 1926 Peraturan mengenai Kerja Anak-anak Dan Orang Muda Di Atas Kapal (Staatsblad Tahun 1926 Nomor 87);\n4. Ordonansi tanggal 4 Mei 1936 tentang Ordonansi untuk Mengatur Kegiatan-kegiatan Mencari Calon Pekerja (Staatsblad Tahun 1936 Nomor 208);\n5. Ordonansi tentang Pemulangan Buruh Yang Diterima Atau Dikerahkan Dari Luar Indonesia (Staatsblad Tahun 1939 Nomor 545);\n6. Ordonansi Nomor 9 Tahun 1949 tentang Pembatasan Kerja Anak-anak (Staatsblad Tahun 1949 Nomor 8);\n7. Undang-undang Nomor 1 Tahun 1951 tentang Pernyataan Berlakunya Undang-undang Kerja Tahun 1948 Nomor 12 Dari Republik Indonesia Untuk Seluruh Indonesia (Lembaran Negara Tahun 1951 Nomor 2);\n8. Undang-undang Nomor 21 Tahun 1954 tentang Perjanjian Perburuhan Antara Serikat Buruh Dan Majikan (Lembaran Negara Tahun 1954 Nomor 69, Tambahan Lembaran Negara Nomor 598a);\n9. Undang-undang Nomor 3 Tahun 1958 tentang Penempatan Tenaga Asing (Lembaran Negara Tahun 1958 Nomor 8);\n10. Undang-undang Nomor 8 Tahun 1961 tentang Wajib Kerja Sarjana (Lembaran Negara Tahun 1961 Nomor 207, Tambahan Lembaran Negara Nomor 2270);\n11. Undang-undang Nomor 7 Prp Tahun 1963 tentang Pencegahan Pemogokan dan/atau Penutupan (Lock Out) Di Perusahaan, Jawatan, dan Badan Yang Vital (Lembaran Negara Tahun 1963 Nomor 67);\n12. Undang-undang Nomor 14 Tahun 1969 tentang Ketentuan-ketentuan Pokok Mengenai Tenaga Kerja (Lembaran Negara Tahun 1969 Nomor 55, Tambahan Lembaran Negara Nomor 2912);\n13. Undang-undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan (Lembaran Negara Tahun 1997 Nomor 73, Tambahan Lembaran Negara Nomor 3702);\n14. Undang-undang Nomor 11 Tahun 1998 tentang Perubahan Berlakunya Undang-undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan (Lembaran Negara Tahun 1998 Nomor 184, Tambahan Lembaran Negara Nomor 3791);\n15. Undang-undang Nomor 28 Tahun 2000 tentang Penetapan Peraturan Pemerintah Pengganti Undang-undang Nomor 3 Tahun 2000 tentang Perubahan Atas Undang-undang Nomor 11 Tahun 1998 tentang Perubahan Berlakunya Undang-undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan Menjadi Undang-undang (Lembaran Negara Tahun 2000 Nomor 240, Tambahan Lembaran Negara Nomor 4042), dinyatakan tidak berlaku lagi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 193",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVIII",
      "teks": "Undang-undang ini mulai berlaku pada tanggal diundangkan.\nAgar setiap orang mengetahuinya, memerintahkan pengundangan undang-undang ini dengan penempatannya dalam Lembaran Negara Republik Indonesia.\nDisahkan di Jakarta pada tanggal 25 Maret 2003\nPRESIDEN REPUBLIK INDONESIA,\nttd\nMEGAWATI SOEKARNOPUTRI\nLEMBARAN NEGARA REPUBLIK INDONESIA TAHUN 2003 NOMOR 39"
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "Penjelasan Umum",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PENJELASAN_UMUM",
      "teks": "PENJELASAN ATAS UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 13 TAHUN 2003 TENTANG KETENAGAKERJAAN\nI. UMUM\nPembangunan ketenagakerjaan sebagai bagian integral dari pembangunan nasional berdasarkan Pancasila dan Undang-undang Dasar Negara Republik Indonesia Tahun 1945, dilaksanakan dalam rangka pembangunan manusia Indonesia seutuhnya dan pembangunan masyarakat Indonesia seluruhnya untuk meningkatkan harkat, martabat, dan harga diri tenaga kerja serta mewujudkan masyarakat sejahtera, adil, makmur, dan merata, baik materil maupun spiritual.\nPembangunan ketenagakerjaan harus diatur sedemikian rupa sehingga terpenuhi hak-hak dan perlindungan yang mendasar bagi tenaga kerja dan pekerja/buruh serta pada saat yang bersamaan dapat mewujudkan kondisi yang kondusif bagi pengembangan dunia usaha.\nPembangunan ketenagakerjaan mempunyai banyak dimensi dan keterkaitan. Keterkaitan itu tidak hanya dengan kepentingan tenaga kerja selama, sebelum dan sesudah masa kerja tetapi juga keterkaitan dengan kepentingan pengusaha, pemerintah, dan masyarakat. Untuk itu, diperlukan pengaturan yang menyeluruh dan komprehensif, antara lain mencakup pengembangan sumberdaya manusia, peningkatan produktivitas dan daya saing tenaga kerja Indonesia, upaya perluasan kesempatan kerja, pelayanan penempatan tenaga kerja, dan pembinaan hubungan industrial.\nPembinaan hubungan industrial sebagai bagian dari pembangunan ketenagakerjaan harus diarahkan untuk terus mewujudkan hubungan industrial yang harmonis, dinamis, dan berkeadilan. Untuk itu, pengakuan dan penghargaan terhadap hak asasi manusia sebagaimana yang dituangkan dalam TAP MPR Nomor XVII/MPR/1998 harus diwujudkan. Dalam bidang ketenagakerjaan, Ketetapan MPR ini merupakan tonggak utama dalam menegakkan demokrasi di tempat kerja.\nPenegakkan demokrasi di tempat kerja diharapkan dapat mendorong partisipasi yang optimal dari seluruh tenaga kerja dan pekerja/buruh Indonesia untuk membangun negara Indonesia yang dicita-citakan.\nBeberapa peraturan perundang-undangan tentang ketenagakerjaan yang berlaku selama ini, termasuk sebagian yang merupakan produk kolonial, menempatkan pekerja pada posisi yang kurang menguntungkan dalam pelayanan penempatan tenaga kerja dan sistem hubungan industrial yang menonjolkan perbedaan kedudukan dan kepentingan sehingga dipandang sudah tidak sesuai lagi dengan kebutuhan masa kini dan tuntutan masa yang akan datang.\nPeraturan perundang-undangan tersebut adalah:\n- Ordonansi tentang Pengerahan Orang Indonesia Untuk Melakukan Pekerjaan Di Luar Indonesia (Staatsblad tahun 1887 No. 8);\n- Ordonansi tanggal 17 Desember 1925 Peraturan tentang Pembatasan Kerja Anak Dan Kerja Malam bagi Wanita (Staatsblad Tahun 1925 Nomor 647);\n- Ordonansi Tahun 1926 Peraturan Mengenai Kerja Anak-anak dan Orang Muda Di Atas Kapal (Staatsblad Tahun 1926 Nomor 87);\n- Ordonansi tanggal 4 Mei 1936 tentang Ordonansi untuk Mengatur Kegiatan-kegiatan Mencari Calon Pekerja (Staatsblad Tahun 1936 Nomor 208);\n- Ordonansi tentang Pemulangan Buruh yang Diterima atau Dikerahkan Dari Luar Indonesia (Staatsblad Tahun 1939 Nomor 545);\n- Ordonansi Nomor 9 Tahun 1949 tentang Pembatasan Kerja Anak-anak (Staatsblad Tahun 1949 Nomor 8);\n- Undang-undang Nomor 1 Tahun 1951 tentang Pernyataan Berlakunya Undang-undang Kerja tahun 1948 Nomor 12 dari Republik Indonesia untuk Seluruh Indonesia (Lembaran Negara Tahun 1951 Nomor 2);\n- Undang-undang Nomor 21 tahun 1954 tentang Perjanjian Perburuhan antara Serikat Buruh dan Majikan (Lembaran Negara Tahun 1954 Nomor 69, Tambahan Lembaran Negara Nomor 598 a);\n- Undang-undang Nomor 3 Tahun 1958 tentang Penempatan Tenaga Asing (Lembaran Negara Tahun 1958 Nomor 8);\n- Undang-undang Nomor 8 Tahun 1961 tentang Wajib Kerja Sarjana (Lembaran Negara Tahun 1961 Nomor 207, Tambahan Lembaran Negara Nomor 2270);\n- Undang-undang Nomor 7 Prp Tahun 1963 tentang Pencegahan Pemogokan dan/atau Penutupan (Lock Out) Di Perusahaan, Jawatan dan Badan yang Vital (Lembaran Negara Tahun 1963 Nomor 67);\n- Undang-undang Nomor 14 Tahun 1969 tentang Ketentuan-ketentuan Pokok mengenai Tenaga Kerja (Lembaran Negara Tahun 1969 Nomor 55, Tambahan Lembaran Negara Nomor 2912);\n- Undang-undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan (Lembaran Negara Tahun 1997 Nomor 73, Tambahan Lembaran Negara Nomor 3702);\n- Undang-undang Nomor 11 Tahun 1998 tentang Perubahan Berlakunya Undang-undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan (Lembaran Negara Tahun 1998 Nomor 184, Tambahan Lembaran Negara Nomor 3791); dan\n- Undang-undang Nomor 28 Tahun 2000 tentang Penetapan Peraturan Pemerintah Pengganti Undang-undang Nomor 3 Tahun 2000 tentang Perubahan Atas Undang-undang Nomor 11 Tahun 1998 tentang Perubahan Berlakunya Undang-undang Nomor 25 Tahun 1997 tentang Ketenagakerjaan Menjadi Undang-undang (Lembaran Negara Tahun 2000 Nomor 240, Tambahan Lembaran Negara Nomor 4042).\nPeraturan perundang-undangan tersebut di atas dipandang perlu untuk dicabut dan diganti dengan Undang-undang yang baru. Ketentuan-ketentuan yang masih relevan dari peraturan perundang-undangan yang lama ditampung dalam Undang-undang ini.\nPeraturan pelaksanaan dari undang-undang yang telah dicabut masih tetap berlaku sebelum ditetapkannya peraturan baru sebagai pengganti.\nUndang-undang ini disamping untuk mencabut ketentuan yang tidak sesuai lagi dengan tuntutan dan perkembangan zaman, dimaksudkan juga untuk menampung perubahan yang sangat mendasar di segala aspek kehidupan bangsa Indonesia dengan dimulainya era reformasi tahun 1998.\nDi bidang ketenagakerjaan internasional, penghargaan terhadap hak asasi manusia di tempat kerja dikenal melalui 8 (delapan) konvensi dasar International Labour Organization (ILO). Konvensi dasar ini terdiri atas 4 (empat) kelompok yaitu:\n- Kebebasan Berserikat (Konvensi ILO Nomor 87 dan Nomor 98);\n- Diskriminasi (Konvensi ILO Nomor 100 dan Nomor 111);\n- Kerja Paksa (Konvensi ILO Nomor 29 dan Nomor 105); dan\n- Perlindungan Anak (Konvensi ILO Nomor 138 dan Nomor 182).\nKomitmen bangsa Indonesia terhadap penghargaan pada hak asasi manusia di tempat kerja antara lain diwujudkan dengan meratifikasi kedelapan konvensi dasar tersebut.\nSejalan dengan ratifikasi konvensi mengenai hak dasar tersebut, maka Undang-undang ketenagakerjaan yang disusun ini harus pula mencerminkan ketaatan dan penghargaan pada ketujuh prinsip dasar tersebut.\nUndang-undang ini antara lain memuat:\n- Landasan, asas, dan tujuan pembangunan ketenagakerjaan;\n- Perencanaan tenaga kerja dan informasi ketenagakerjaan;\n- Pemberian kesempatan dan perlakuan yang sama bagi tenaga kerja dan pekerja/buruh;\n- Pelatihan kerja yang diarahkan untuk meningkatkan dan mengembangkan keterampilan serta keahlian tenaga kerja guna meningkatkan produktivitas kerja dan produktivitas perusahaan;\n- Pelayanan penempatan tenaga kerja dalam rangka pendayagunaan tenaga kerja secara optimal dan penempatan tenaga kerja pada pekerjaan yang sesuai dengan harkat dan martabat kemanusiaan sebagai bentuk tanggung jawab pemerintah dan masyarakat dalam upaya perluasan kesempatan kerja;\n- Penggunaan tenaga kerja asing yang tepat sesuai dengan kompetensi yang diperlukan;\n- Pembinaan hubungan industrial yang sesuai dengan nilai-nilai Pancasila diarahkan untuk menumbuhkembangkan hubungan yang harmonis, dinamis, dan berkeadilan antar para pelaku proses produksi;\n- Pembinaan kelembagaan dan sarana hubungan industrial, termasuk perjanjian kerja bersama, lembaga kerja sama bipartit, lembaga kerja sama tripartit, pemasyarakatan hubungan industrial dan penyelesaian perselisihan hubungan industrial;\n- Perlindungan pekerja/buruh, termasuk perlindungan atas hak-hak dasar pekerja/buruh untuk berunding dengan pengusaha, perlindungan keselamatan, dan kesehatan kerja, perlindungan khusus bagi pekerja/buruh perempuan, anak, dan penyandang cacat, serta perlindungan tentang upah, kesejahteraan, dan jaminan sosial tenaga kerja;\n- Pengawasan ketenagakerjaan dengan maksud agar dalam peraturan perundang-undangan di bidang ketenagakerjaan ini benar-benar dilaksanakan sebagaimana mestinya.\n\nII. PASAL DEMI PASAL"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pembangunan ketenagakerjaan dilaksanakan dalam rangka pembangunan manusia Indonesia seutuhnya. Oleh sebab itu, pembangunan ketenagakerjaan dilaksanakan untuk mewujudkan manusia dan masyarakat Indonesia yang sejahtera, adil, makmur, dan merata baik materiil maupun spiritual."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Asas pembangunan ketenagakerjaan pada dasarnya sesuai dengan asas pembangunan nasional, khususnya asas demokrasi Pancasila serta asas adil dan merata. Pembangunan ketenagakerjaan mempunyai banyak dimensi dan keterkaitan dengan berbagai pihak yaitu antara pemerintah, pengusaha dan pekerja/buruh. Oleh sebab itu, pembangunan ketenagakerjaan dilaksanakan secara terpadu dalam bentuk kerja sama yang saling mendukung."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Huruf a\nPemberdayaan dan pendayagunaan tenaga kerja merupakan suatu kegiatan yang terpadu untuk dapat memberikan kesempatan kerja seluas-luasnya bagi tenaga kerja Indonesia. Melalui pemberdayaan dan pendayagunaan ini diharapkan tenaga kerja Indonesia dapat berpartisipasi secara optimal dalam Pembangunan Nasional, namun dengan tetap menjunjung nilai-nilai kemanusiaannya.\nHuruf b\nPemerataan kesempatan kerja harus diupayakan di seluruh wilayah Negara Kesatuan Republik Indonesia sebagai satu kesatuan pasar kerja dengan memberikan kesempatan yang sama untuk memperoleh pekerjaan bagi seluruh tenaga kerja Indonesia sesuai dengan bakat, minat, dan kemampuannya. Demikian pula pemerataan penempatan tenaga kerja perlu diupayakan agar dapat mengisi kebutuhan di seluruh sektor dan daerah.\nHuruf c\nCukup jelas\nHuruf d\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Setiap tenaga kerja mempunyai hak dan kesempatan yang sama untuk memperoleh pekerjaan dan penghidupan yang layak tanpa membedakan jenis kelamin, suku, ras, agama, dan aliran politik sesuai dengan minat dan kemampuan tenaga kerja yang bersangkutan, termasuk perlakuan yang sama terhadap para penyandang cacat."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pengusaha harus memberikan hak dan kewajiban pekerja/buruh tanpa membedakan jenis kelamin, suku, ras, agama, warna kulit, dan aliran politik."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPerencanaan tenaga kerja yang disusun dan ditetapkan oleh pemerintah dilakukan melalui pendekatan perencanaan tenaga kerja nasional, daerah, dan sektoral.\nAyat (2)\nHuruf a\nYang dimaksud dengan perencanaan tenaga kerja makro adalah proses penyusunan rencana ketenagakerjaan secara sistematis yang memuat pendayagunaan tenaga kerja secara optimal, dan produktif guna mendukung pertumbuhan ekonomi atau sosial, baik secara nasional, daerah, maupun sektoral sehingga dapat membuka kesempatan kerja seluas-luasnya, meningkatkan produktivitas kerja dan meningkatkan kesejahteraan pekerja/buruh.\nHuruf b\nYang dimaksud dengan perencanaan tenaga kerja mikro adalah proses penyusunan rencana ketenagakerjaan secara sistematis dalam suatu instansi, baik instansi pemerintah maupun swasta dalam rangka meningkatkan pendayagunaan tenaga kerja secara optimal dan produktif untuk mendukung pencapaian kinerja yang tinggi pada instansi atau perusahaan yang bersangkutan.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nInformasi ketenagakerjaan dikumpulkan dan diolah sesuai dengan maksud disusunnya perencanaan tenaga kerja nasional, perencanaan tenaga kerja daerah provinsi atau kabupaten/kota.\nAyat (2)\nDalam rangka pembangunan ketenagakerjaan, partisipasi swasta diharapkan dapat memberikan informasi mengenai ketenagakerjaan. Pengertian swasta mencakup perusahaan, perguruan tinggi, dan lembaga swadaya masyarakat di pusat, provinsi atau kabupaten/kota.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan peningkatan kesejahteraan dalam pasal ini adalah kesejahteraan bagi tenaga kerja yang diperoleh karena terpenuhinya kompetensi kerja melalui pelatihan kerja."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nPenetapan standar kompetensi kerja dilakukan oleh Menteri dengan mengikutsertakan sektor terkait.\nAyat (3)\nJenjang pelatihan kerja pada umumnya terdiri atas tingkat dasar, terampil, dan ahli.\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPengguna tenaga kerja terampil adalah pengusaha, oleh karena itu pengusaha bertanggung jawab mengadakan pelatihan kerja untuk meningkatkan kompetensi pekerjanya.\nAyat (2)\nPeningkatan dan/atau pengembangan kompetensi diwajibkan bagi pengusaha karena perusahaan yang akan memperoleh manfaat hasil kompetensi pekerja/buruh.\nAyat (3)\nPelaksanaan pelatihan kerja disesuaikan dengan kebutuhan serta kesempatan yang ada di perusahaan agar tidak mengganggu kelancaran kegiatan perusahaan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan pelatihan kerja swasta juga termasuk pelatihan kerja perusahaan.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nCukup jelas\nAyat (3)\nPendaftaran kegiatan pelatihan yang diselenggarakan oleh instansi pemerintah dimaksudkan untuk mendapatkan informasi sehingga hasil pelatihan, sarana dan prasarana pelatihan dapat berdayaguna dan berhasilguna secara optimal.\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nSertifikasi kompetensi adalah proses pemberian sertifikat kompetensi yang dilakukan secara sistematis dan obyektif melalui uji kompetensi yang mengacu kepada standar kompetensi nasional dan/atau internasional.\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nSistem pelatihan kerja nasional adalah keterkaitan dan keterpaduan berbagai unsur pelatihan kerja yang antara lain meliputi peserta, biaya, sarana, dan prasarana, tenaga kepelatihan, program dan metode, serta lulusan. Dengan adanya sistem pelatihan kerja nasional, semua unsur dan sumber daya pelatihan kerja nasional yang tersebar di instansi pemerintah, swasta, dan perusahaan dapat dimanfaatkan secara optimal.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nHak peserta pemagangan antara lain memperoleh uang saku dan/atau uang transpor, memperoleh jaminan sosial tenaga kerja, memperoleh sertifikat apabila lulus di akhir program. Hak pengusaha antara lain berhak atas hasil kerja/jasa peserta pemagangan, merekrut pemagang sebagai pekerja/buruh bila memenuhi persyaratan. Kewajiban peserta pemagangan antara lain menaati perjanjian pemagangan, mengikuti tata tertib program pemagangan, dan mengikuti tata tertib perusahaan. Adapun kewajiban pengusaha antara lain menyediakan uang saku dan/atau uang transpor bagi peserta pemagangan, menyediakan fasilitas pelatihan, menyediakan instruktur, dan perlengkapan keselamatan dan kesehatan kerja.\nJangka waktu pemagangan bervariasi sesuai dengan jangka waktu yang diperlukan untuk mencapai standar kompetensi yang ditetapkan dalam program pelatihan pemagangan.\nAyat (3)\nDengan status sebagai pekerja/buruh di perusahaan yang bersangkutan, maka berhak atas segala hal yang diatur dalam peraturan perusahaan atau perjanjian kerja bersama."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sertifikasi dapat dilakukan oleh lembaga sertifikasi yang dibentuk dan/atau diakreditasi oleh pemerintah bila programnya bersifat umum, atau dilakukan oleh perusahaan yang bersangkutan bila programnya bersifat khusus."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nYang dimaksud dengan kepentingan perusahaan dalam ayat ini adalah agar terjamin tersedianya tenaga terampil dan ahli pada tingkat kompetensi tertentu seperti juru las spesialis dalam air.\nYang dimaksud dengan kepentingan masyarakat misalnya untuk membuka kesempatan bagi masyarakat memanfaatkan industri yang bersifat spesifik seperti teknologi budidaya tanaman dengan kultur jaringan.\nYang dimaksud dengan kepentingan negara misalnya untuk menghemat devisa negara, maka perusahaan diharuskan melaksanakan program pemagangan seperti keahlian membuat alat-alat pertanian modern."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan terbuka adalah pemberian informasi kepada pencari kerja secara jelas antara lain jenis pekerjaan, besarnya upah, dan jam kerja. Hal ini diperlukan untuk melindungi pekerja/buruh serta untuk menghindari terjadinya perselisihan setelah tenaga kerja ditempatkan.\nYang dimaksud dengan bebas adalah pencari kerja bebas memilih jenis pekerjaan dan pemberi kerja bebas memilih tenaga kerja, sehingga tidak dibenarkan pencari kerja dipaksa untuk menerima suatu pekerjaan dan pemberi kerja tidak dibenarkan dipaksa untuk menerima tenaga kerja yang ditawarkan.\nYang dimaksud dengan obyektif adalah pemberi kerja agar menawarkan pekerjaan yang cocok kepada pencari kerja sesuai dengan kemampuannya dan persyaratan jabatan yang dibutuhkan, serta harus memperhatikan kepentingan umum dengan tidak memihak kepada kepentingan pihak tertentu.\nYang dimaksud dengan adil dan setara adalah penempatan tenaga kerja dilakukan berdasarkan kemampuan tenaga kerja dan tidak didasarkan atas ras, jenis kelamin, warna kulit, agama, dan aliran politik.\nAyat (2)\nCukup jelas\nAyat (3)\nPemerataan kesempatan kerja harus diupayakan di seluruh wilayah Negara Republik Indonesia sebagai satu kesatuan pasar kerja nasional dengan memberikan kesempatan yang sama untuk memperoleh pekerjaan bagi seluruh tenaga kerja sesuai dengan bakat, minat, dan kemampuannya. Demikian pula pemerataan kesempatan kerja perlu diupayakan agar dapat mengisi kebutuhan tenaga kerja di seluruh sektor dan daerah."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sebelum undang-undang mengenai penempatan tenaga kerja di luar negeri diundangkan maka segala peraturan perundangan yang mengatur penempatan tenaga kerja di luar negeri tetap berlaku."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud pemberi kerja adalah pemberi kerja di dalam negeri.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nHuruf a\nPenetapan instansi pemerintah yang bertanggung jawab di bidang ketenagakerjaan di tingkat pusat dan daerah ditentukan sesuai dengan peraturan perundang-undangan yang berlaku.\nHuruf b\nCukup jelas\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Karena upaya perluasan kesempatan kerja mencakup lintas sektoral, maka harus disusun kebijakan nasional di semua sektor yang dapat menyerap tenaga kerja secara optimal.\nAgar kebijakan nasional tersebut dapat dilaksanakan dengan baik, maka pemerintah dan masyarakat bersama-sama mengawasinya secara terkoordinasi."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPerlunya pemberian izin penggunaan tenaga kerja warga negara asing dimaksudkan agar penggunaan tenaga kerja warga negara asing dilaksanakan secara selektif dalam rangka pendayagunaan tenaga kerja Indonesia secara optimal.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas\nAyat (6)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nRencana penggunaan tenaga kerja warga negara asing merupakan persyaratan untuk mendapatkan izin kerja (IKTA).\nAyat (2)\nCukup jelas\nAyat (3)\nYang dimaksud dengan badan internasional dalam ayat ini adalah badan-badan internasional yang tidak mencari keuntungan seperti lembaga yang bernaung di bawah Perserikatan Bangsa-Bangsa (PBB) antara lain ILO, WHO, atau UNICEF.\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan standar kompetensi adalah kualifikasi yang harus dimiliki oleh tenaga kerja warga negara asing antara lain pengetahuan, keahlian, keterampilan di bidang tertentu, dan pemahaman budaya Indonesia.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nHuruf a\nTenaga kerja pendamping tenaga kerja asing tidak secara otomatis menggantikan atau menduduki jabatan tenaga kerja asing yang didampinginya. Pendampingan tersebut lebih dititikberatkan pada alih teknologi dan alih keahlian agar tenaga kerja pendamping tersebut dapat memiliki kemampuan sehingga pada waktunya diharapkan dapat mengganti tenaga kerja asing yang didampinginya.\nHuruf b\nPendidikan dan pelatihan kerja oleh pemberi kerja tersebut dapat dilaksanakan baik di dalam negeri maupun dengan mengirimkan tenaga kerja Indonesia untuk berlatih di luar negeri.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nKewajiban membayar kompensasi dimaksudkan dalam rangka menunjang upaya peningkatan kualitas sumber daya manusia Indonesia.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPada prinsipnya perjanjian kerja dibuat secara tertulis, namun melihat kondisi masyarakat yang beragam dimungkinkan perjanjian kerja secara lisan.\nAyat (2)\nPerjanjian kerja yang dipersyaratkan secara tertulis harus sesuai dengan peraturan perundang-undangan yang berlaku, antara lain perjanjian kerja waktu tertentu, antarkerja antardaerah, antarkerja antarnegara, dan perjanjian kerja laut."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nHuruf a\nCukup jelas\nHuruf b\nYang dimaksud dengan kemampuan atau kecakapan adalah para pihak yang mampu atau cakap menurut hukum untuk membuat perjanjian.\nHuruf c\nCukup jelas\nHuruf d\nCukup jelas\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nYang dimaksud dengan tidak boleh bertentangan dalam ayat ini adalah apabila di perusahaan telah ada peraturan perusahaan atau perjanjian kerja bersama, maka isi perjanjian kerja baik kualitas maupun kuantitas tidak boleh lebih rendah dari peraturan perusahaan atau perjanjian kerja bersama di perusahaan yang bersangkutan.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 56",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 57",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 58",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 59",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPerjanjian kerja dalam ayat ini dicatatkan ke instansi yang bertanggung jawab dibidang ketenagakerjaan.\nAyat (2)\nYang dimaksud dengan pekerjaan yang bersifat tetap dalam ayat ini adalah pekerjaan yang sifatnya terus menerus, tidak terputus-putus, tidak dibatasi waktu dan merupakan bagian dari suatu proses produksi dalam satu perusahaan atau pekerjaan yang bukan musiman.\nPekerjaan yang bukan musiman adalah pekerjaan yang tidak tergantung cuaca atau suatu kondisi tertentu.\nApabila pekerjaan itu merupakan pekerjaan yang terus menerus, tidak terputus-putus, tidak dibatasi waktu, dan merupakan bagian dari suatu proses produksi, tetapi tergantung cuaca atau pekerjaan itu dibutuhkan karena adanya suatu kondisi tertentu maka pekerjaan tersebut merupakan pekerjaan musiman yang tidak termasuk pekerjaan tetap sehingga dapat menjadi obyek perjanjian kerja waktu tertentu.\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas\nAyat (6)\nCukup jelas\nAyat (7)\nCukup jelas\nAyat (8)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 60",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nSyarat masa percobaan kerja harus dicantumkan dalam perjanjian kerja.\nApabila perjanjian kerja dilakukan secara lisan, maka syarat masa percobaan kerja harus diberitahukan kepada pekerja yang bersangkutan dan dicantumkan dalam surat pengangkatan. Dalam hal tidak dicantumkan dalam perjanjian kerja atau dalam surat pengangkatan, maka ketentuan masa percobaan kerja dianggap tidak ada.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 61",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nHuruf a\nCukup jelas\nHuruf b\nCukup jelas\nHuruf c\nCukup jelas\nHuruf d\nKeadaan atau kejadian tertentu seperti bencana alam, kerusuhan sosial, atau gangguan keamanan.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nYang dimaksud hak-hak yang sesuai dengan perundang-undangan yang berlaku atau hak-hak yang telah diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama adalah hak-hak yang harus diberikan yang lebih baik dan menguntungkan pekerja/buruh yang bersangkutan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 62",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 63",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 64",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 65",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 66",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPada pekerjaan yang berhubungan dengan kegiatan usaha pokok atau kegiatan yang berhubungan langsung dengan proses produksi, pengusaha hanya diperbolehkan mempekerjakan pekerja/buruh dengan perjanjian kerja waktu tertentu dan/atau perjanjian kerja waktu tidak tertentu.\nYang dimaksud kegiatan jasa penunjang atau kegiatan yang tidak berhubungan langsung dengan proses produksi adalah kegiatan yang berhubungan di luar usaha pokok (core business) suatu perusahaan.\nKegiatan tersebut antara lain: usaha pelayanan kebersihan (cleaning service), usaha penyediaan makanan bagi pekerja/buruh (catering), usaha tenaga pengaman (security/satuan pengamanan), usaha jasa penunjang di pertambangan dan perminyakan, serta usaha penyediaan angkutan pekerja/buruh.\nAyat (2)\nHuruf a\nCukup jelas\nHuruf b\nCukup jelas\nHuruf c\nPerlindungan upah dan kesejahteraan, syarat-syarat kerja maupun penyelesaian perselisihan antara penyedia jasa tenaga kerja dengan pekerja/buruh harus sesuai dengan peraturan perundang-undangan yang berlaku.\nPekerja/buruh yang bekerja pada perusahaan penyedia jasa pekerja/buruh memperoleh hak (yang sama) sesuai dengan perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama atas perlindungan upah dan kesejahteraan, syarat-syarat kerja, serta perselisihan yang timbul dengan pekerja/buruh lainnya di perusahaan pengguna jasa pekerja/buruh.\nHuruf d\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 67",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPerlindungan sebagaimana dimaksud dalam ayat ini misalnya penyediaan aksesibilitas, pemberian alat kerja, dan alat pelindung diri yang disesuaikan dengan jenis dan derajat kecacatannya.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 68",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 69",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 70",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 71",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nKetentuan dalam ayat ini dimaksudkan untuk melindungi anak agar pengembangan bakat dan minat anak yang pada umumnya muncul pada usia ini tidak terhambat.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 72",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 73",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 74",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 75",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPenanggulangan anak yang bekerja di luar hubungan kerja dimaksudkan untuk menghapuskan atau mengurangi anak yang bekerja di luar hubungan kerja.\nUpaya tersebut harus dilakukan secara terencana, terpadu, dan terkoordinasi dengan instansi terkait.\nAnak yang bekerja di luar hubungan kerja misalnya anak penyemir sepatu atau anak penjual koran.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 76",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang bertanggung jawab atas pelanggaran ayat ini adalah pengusaha. Apabila pekerja/buruh perempuan yang dimaksud dalam ayat ini dipekerjakan antara pukul 23.00 sampai dengan pukul 07.00 maka yang bertanggung jawab atas pelanggaran tersebut adalah pengusaha.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 77",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nCukup jelas\nAyat (3)\nYang dimaksud sektor usaha atau pekerjaan tertentu dalam ayat ini misalnya pekerjaan di pengeboran minyak lepas pantai, sopir angkutan jarak jauh, penerbangan jarak jauh, pekerjaan di kapal (laut), atau penebangan hutan.\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 78",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nMempekerjakan lebih dari waktu kerja sedapat mungkin harus dihindarkan karena pekerja/buruh harus mempunyai waktu yang cukup untuk istirahat dan memulihkan kebugarannya. Namun, dalam hal-hal tertentu terdapat kebutuhan yang mendesak yang harus diselesaikan segera dan tidak dapat dihindari sehingga pekerja/buruh harus bekerja melebihi waktu kerja.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 79",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nHuruf a\nCukup jelas\nHuruf b\nCukup jelas\nHuruf c\nCukup jelas\nHuruf d\nSelama menjalankan istirahat panjang, pekerja/buruh diberi uang kompensasi hak istirahat tahunan tahun kedelapan sebesar 1/2 (setengah) bulan gaji dan bagi perusahaan yang telah memberlakukan istirahat panjang yang lebih baik dari ketentuan undang-undang ini, maka tidak boleh mengurangi dari ketentuan yang sudah ada.\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 80",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud kesempatan secukupnya yaitu menyediakan tempat untuk melaksanakan ibadah yang memungkinkan pekerja/buruh dapat melaksanakan ibadahnya secara baik, sesuai dengan kondisi dan kemampuan perusahaan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 81",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 82",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nLamanya istirahat dapat diperpanjang berdasarkan surat keterangan dokter kandungan atau bidan, baik sebelum maupun setelah melahirkan.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 83",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan kesempatan sepatutnya dalam pasal ini adalah lamanya waktu yang diberikan kepada pekerja/buruh perempuan untuk menyusui bayinya dengan memperhatikan tersedianya tempat yang sesuai dengan kondisi dan kemampuan perusahaan, yang diatur dalam peraturan perusahaan atau perjanjian kerja bersama."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 84",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 85",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nKetentuan dalam ayat ini dimaksudkan untuk melayani kepentingan dan kesejahteraan umum. Di samping itu untuk pekerjaan yang karena sifat dan jenis pekerjaannya tidak memungkinkan pekerjaan itu dihentikan.\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 86",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nUpaya keselamatan dan kesehatan kerja dimaksudkan untuk memberikan keselamatan dan meningkatkan derajat kesehatan pekerja/buruh dengan cara pencegahan kecelakaan dan penyakit akibat kerja, pengendalian bahaya di tempat kerja, promosi kesehatan, pengobatan, dan rehabilitasi.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 87",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan sistem manajemen keselamatan dan kesehatan kerja adalah bagian dari sistem manajemen perusahaan secara keseluruhan yang meliputi struktur organisasi, perencanaan, pelaksanaan, tanggung jawab, prosedur, proses, dan sumber daya yang dibutuhkan bagi pengembangan penerapan, pencapaian, pengkajian, dan pemeliharaan kebijakan keselamatan dan kesehatan kerja dalam rangka pengendalian risiko yang berkaitan dengan kegiatan kerja guna terciptanya tempat kerja yang aman, efisien, dan produktif.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 88",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan penghasilan yang memenuhi penghidupan yang layak adalah jumlah penerimaan atau pendapatan pekerja/buruh dari hasil pekerjaannya sehingga mampu memenuhi kebutuhan hidup pekerja/buruh dan keluarganya secara wajar yang meliputi makanan dan minuman, sandang, perumahan, pendidikan, kesehatan, rekreasi, dan jaminan hari tua.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 89",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nHuruf a\nCukup jelas\nHuruf b\nUpah minimum sektoral dapat ditetapkan untuk kelompok lapangan usaha beserta pembagiannya menurut klasifikasi lapangan usaha Indonesia untuk kabupaten/kota, provinsi, beberapa provinsi atau nasional dan tidak boleh lebih rendah dari upah minimum regional daerah yang bersangkutan.\nAyat (2)\nYang dimaksud dengan diarahkan kepada pencapaian kebutuhan hidup layak dalam ayat ini ialah setiap penetapan upah minimum harus disesuaikan dengan tahapan pencapaian perbandingan upah minimum dengan kebutuhan hidup layak yang besarannya ditetapkan oleh Menteri.\nAyat (3)\nCukup jelas\nAyat (4)\nPencapaian kebutuhan hidup layak perlu dilakukan secara bertahap karena kebutuhan hidup layak tersebut merupakan peningkatan dari kebutuhan hidup minimum yang sangat ditentukan oleh tingkat kemampuan dunia usaha."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 90",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nPenangguhan pelaksanaan upah minimum bagi perusahaan yang tidak mampu dimaksudkan untuk membebaskan perusahaan yang bersangkutan melaksanakan upah minimum yang berlaku dalam kurun waktu tertentu.\nApabila penangguhan tersebut berakhir maka perusahaan yang bersangkutan wajib melaksanakan upah minimum yang berlaku pada saat itu tetapi tidak wajib membayar pemenuhan ketentuan upah minimum yang berlaku pada waktu diberikan penangguhan.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 91",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 92",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPenyusunan struktur dan skala upah dimaksudkan sebagai pedoman penetapan upah sehingga terdapat kepastian upah tiap pekerja/buruh serta untuk mengurangi kesenjangan antara upah terendah dan tertinggi di perusahaan yang bersangkutan.\nAyat (2)\nPeninjauan upah dilakukan untuk penyesuaian harga kebutuhan hidup, prestasi kerja, perkembangan, dan kemampuan perusahaan.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 93",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nKetentuan ini merupakan asas yang pada dasarnya berlaku untuk semua pekerja/buruh, kecuali apabila pekerja/buruh yang bersangkutan tidak dapat melakukan pekerjaan bukan karena kesalahannya.\nAyat (2)\nHuruf a\nYang dimaksud pekerja/buruh sakit ialah sakit menurut keterangan dokter.\nHuruf b\nCukup jelas\nHuruf c\nCukup jelas\nHuruf d\nYang dimaksud dengan menjalankan kewajiban terhadap negara adalah melaksanakan kewajiban negara yang telah diatur dengan peraturan perundang-undangan.\nPembayaran upah kepada pekerja/buruh yang menjalankan kewajiban terhadap negara dilaksanakan apabila:\na. negara tidak melakukan pembayaran; atau\nb. negara membayar kurang dari upah yang biasa diterima pekerja/buruh, dalam hal ini maka pengusaha wajib membayar kekurangannya.\nHuruf e\nYang dimaksud dengan menjalankan kewajiban ibadah menurut agamanya adalah melaksanakan kewajiban ibadah menurut agamanya yang telah diatur dengan peraturan perundang-undangan.\nHuruf f\nCukup jelas\nHuruf g\nCukup jelas\nHuruf h\nCukup jelas\nHuruf i\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 94",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan tunjangan tetap dalam pasal ini adalah pembayaran kepada pekerja/buruh yang dilakukan secara teratur dan tidak dikaitkan dengan kehadiran pekerja/buruh atau pencapaian prestasi kerja tertentu."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 95",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nYang dimaksud didahulukan pembayarannya adalah upah pekerja/buruh harus dibayar lebih dahulu dari pada utang lainnya."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 96",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 97",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 98",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 99",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 100",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan fasilitas kesejahteraan antara lain pelayanan keluarga berencana, tempat penitipan anak, perumahan pekerja/buruh, fasilitas beribadah, fasilitas olah raga, fasilitas kantin, fasilitas kesehatan, dan fasilitas rekreasi.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 101",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan usaha-usaha produktif di perusahaan adalah kegiatan yang bersifat ekonomis yang menghasilkan pendapatan di luar upah.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 102",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 103",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 104",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nKebebasan untuk membentuk, masuk atau tidak masuk menjadi anggota serikat pekerja/serikat buruh merupakan salah satu hak dasar pekerja/buruh.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 105",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 106",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nPada perusahaan dengan jumlah pekerja/buruh kurang dari 50 (lima puluh) orang, komunikasi dan konsultasi masih dapat dilakukan secara individual dengan baik dan efektif. Pada perusahaan dengan jumlah pekerja/buruh 50 (lima puluh) orang atau lebih, komunikasi dan konsultasi perlu dilakukan melalui sistem perwakilan.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 107",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 108",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 109",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 110",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 111",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nHuruf a\nCukup jelas\nHuruf b\nCukup jelas\nHuruf c\nYang dimaksud dengan syarat kerja adalah hak dan kewajiban pengusaha dan pekerja/buruh yang belum diatur dalam peraturan perundang-undangan.\nHuruf d\nCukup jelas\nHuruf e\nCukup jelas\nAyat (2)\nYang dimaksud dengan tidak boleh bertentangan dengan ketentuan peraturan perundang-undangan yang berlaku adalah peraturan perusahaan tidak boleh lebih rendah kualitas atau kuantitasnya dari peraturan perundang-undangan yang berlaku, dan apabila ternyata bertentangan, maka yang berlaku adalah ketentuan peraturan perundang-undangan.\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 112",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 113",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 114",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pemberitahuan dilakukan dengan cara membagikan salinan peraturan perusahaan kepada setiap pekerja/buruh, menempelkan di tempat yang mudah dibaca oleh para pekerja/buruh, atau memberikan penjelasan langsung kepada pekerja/buruh."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 115",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 116",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nPembuatan perjanjian kerja bersama harus dilandasi dengan itikad baik, yang berarti harus ada kejujuran dan keterbukaan para pihak serta kesukarelaan/kesadaran yang artinya tanpa ada tekanan dari satu pihak terhadap pihak lain.\nAyat (3)\nDalam hal perjanjian kerja bersama dibuat dalam bahasa Indonesia dan diterjemahkan dalam bahasa lain, apabila terjadi perbedaan penafsiran, maka yang berlaku perjanjian kerja bersama yang menggunakan bahasa Indonesia.\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 117",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Penyelesaian melalui prosedur penyelesaian perselisihan hubungan industrial dapat dilakukan melalui lembaga penyelesaian perselisihan hubungan industrial."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 118",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 119",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 120",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 121",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 122",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 123",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 124",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nYang dimaksud tidak boleh bertentangan dengan peraturan perundang-undangan yang berlaku adalah kualitas dan kuantitas isi perjanjian kerja bersama tidak boleh lebih rendah dari peraturan perundang-undangan.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 125",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 126",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 127",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 128",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 129",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 130",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 131",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 132",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 133",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 134",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 135",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 136",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 137",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan gagalnya perundingan dalam pasal ini adalah tidak tercapainya kesepakatan penyelesaian perselisihan hubungan industrial yang dapat disebabkan karena pengusaha tidak mau melakukan perundingan atau perundingan mengalami jalan buntu.\nYang dimaksud dengan tertib dan damai adalah tidak mengganggu keamanan dan ketertiban umum, dan/atau mengancam keselamatan jiwa dan harta benda milik perusahaan atau pengusaha atau orang lain atau milik masyarakat."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 138",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 139",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan perusahaan yang melayani kepentingan umum dan/atau perusahaan yang jenis kegiatannya membahayakan keselamatan jiwa manusia adalah rumah sakit, dinas pemadam kebakaran, penjaga pintu perlintasan kereta api, pengontrol pintu air, pengontrol arus lalu lintas udara, dan pengontrol arus lalu lintas laut.\nYang dimaksud dengan pemogokan yang diatur sedemikian rupa yaitu pemogokan yang dilakukan oleh para pekerja/buruh yang tidak sedang menjalankan tugas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 140",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nHuruf a\nCukup jelas\nHuruf b\nTempat mogok kerja adalah tempat-tempat yang ditentukan oleh penanggung jawab pemogokan yang tidak menghalangi pekerja/buruh lain untuk bekerja.\nHuruf c\nCukup jelas\nHuruf d\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 141",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 142",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 143",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan menghalang-halangi dalam ayat ini antara lain dengan cara:\na. menjatuhkan hukuman;\nb. mengintimidasi dalam bentuk apapun; atau\nc. melakukan mutasi yang merugikan.\nAyat (2)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 144",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 145",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan sungguh-sungguh melanggar hak normatif adalah pengusaha secara nyata tidak bersedia memenuhi kewajibannya sebagaimana dimaksud dan/atau ditetapkan dalam perjanjian kerja, peraturan perusahaan, perjanjian kerja bersama, atau peraturan perundang-undangan ketenagakerjaan, meskipun sudah ditetapkan dan diperintahkan oleh pejabat yang bertanggung jawab di bidang ketenagakerjaan.\nPembayaran upah pekerja/buruh yang mogok dalam pasal ini tidak menghilangkan ketentuan pengenaan sanksi terhadap pengusaha yang melakukan pelanggaran ketentuan normatif."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 146",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nCukup jelas\nAyat (3)\nDalam hal penutupan perusahaan (lock out) dilakukan secara tidak sah atau sebagai tindakan balasan terhadap mogok yang sah atas tuntutan normatif, maka pengusaha wajib membayar upah pekerja/buruh."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 147",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 148",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 149",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 150",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 151",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan segala upaya dalam ayat ini adalah kegiatan-kegiatan yang positif yang pada akhirnya dapat menghindari terjadinya pemutusan hubungan kerja antara lain pengaturan waktu kerja, penghematan, pembenahan metode kerja, dan memberikan pembinaan kepada pekerja/buruh.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 152",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 153",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 154",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 155",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 156",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 157",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 158",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 159",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 160",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nKeluarga pekerja/buruh yang menjadi tanggungan adalah isteri/suami, anak atau orang yang sah menjadi tanggungan pekerja/buruh berdasarkan perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas\nAyat (6)\nCukup jelas\nAyat (7)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 161",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nMasing-masing surat peringatan dapat diterbitkan secara berurutan atau tidak, sesuai dengan ketentuan yang diatur dalam perjanjian kerja atau peraturan perusahaan atau perjanjian kerja bersama. Dalam hal surat peringatan diterbitkan secara berurutan maka surat peringatan pertama berlaku untuk jangka 6 (enam) bulan. Apabila pekerja/buruh melakukan kembali pelanggaran ketentuan dalam perjanjian kerja atau peraturan perusahaan atau perjanjian kerja bersama masih dalam tenggang waktu 6 (enam) bulan maka pengusaha dapat menerbitkan surat peringatan kedua, yang juga mempunyai jangka waktu berlaku selama 6 (enam) bulan sejak diterbitkannya peringatan kedua. Apabila pekerja/buruh masih melakukan pelanggaran ketentuan dalam perjanjian kerja atau peraturan perusahaan atau perjanjian kerja bersama, pengusaha dapat menerbitkan peringatan ketiga (terakhir) yang berlaku selama 6 (enam) bulan sejak diterbitkannya peringatan ketiga. Apabila dalam kurun waktu peringatan ketiga pekerja/buruh kembali melakukan pelanggaran perjanjian kerja atau peraturan perusahaan atau perjanjian kerja bersama, maka pengusaha dapat melakukan pemutusan hubungan kerja.\nDalam hal jangka waktu 6 (enam) bulan sejak diterbitkannya surat peringatan pertama sudah terlampaui, maka apabila pekerja/buruh yang bersangkutan melakukan kembali pelanggaran perjanjian kerja atau peraturan perusahaan atau perjanjian kerja bersama, maka surat peringatan yang diterbitkan oleh pengusaha adalah kembali sebagai peringatan pertama, demikian pula berlaku juga bagi peringatan kedua dan ketiga.\nPerjanjian kerja atau peraturan perusahaan atau perjanjian kerja bersama dapat memuat pelanggaran tertentu yang dapat diberi peringatan pertama dan terakhir. Apabila pekerja/buruh melakukan pelanggaran perjanjian kerja atau peraturan perusahaan atau perjanjian kerja bersama dalam tenggang waktu masa berlakunya peringatan pertama dan terakhir dimaksud, pengusaha dapat melakukan pemutusan hubungan kerja.\nTenggang waktu 6 (enam) bulan dimaksudkan sebagai upaya mendidik pekerja/buruh agar dapat memperbaiki kesalahannya dan di sisi lain waktu 6 (enam) bulan ini merupakan waktu yang cukup bagi pengusaha untuk melakukan penilaian terhadap kinerja pekerja/buruh yang bersangkutan.\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 162",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 163",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 164",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 165",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 166",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 167",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nCukup jelas\nAyat (2)\nCukup jelas\nAyat (3)\nContoh dari ayat ini adalah:\nMisalnya uang pesangon yang seharusnya diterima pekerja/buruh adalah Rp 10.000.000,00 (sepuluh juta rupiah) dan besarnya jaminan pensiun menurut program pensiun adalah Rp 6.000.000,00 (enam juta rupiah) serta dalam pengaturan program pensiun tersebut telah ditetapkan premi yang ditanggung oleh pengusaha 60% (enam puluh perseratus) dan oleh pekerja/buruh 40% (empat puluh perseratus), maka:\nPerhitungan hasil dari premi yang sudah dibayar oleh pengusaha adalah: sebesar 60% x Rp 6.000.000,00 = Rp 3.600.000,00\nBesarnya santunan yang preminya dibayar oleh pekerja/buruh adalah sebesar 40% x Rp 6.000.000,00 = Rp 2.400.000,00\nJadi kekurangan yang masih harus dibayar oleh Pengusaha sebesar Rp 10.000.000,00 dikurangi Rp 3.600.000,00 = Rp 6.400.000,00\nSehingga uang yang diterima oleh pekerja/buruh pada saat PHK karena pensiun tersebut adalah:\n- Rp 3.600.000,00 (santunan dari penyelenggara program pensiun yang preminya 60% dibayar oleh pengusaha)\n- Rp 6.400.000,00 (berasal dari kekurangan pesangon yang harus dibayar oleh pengusaha)\n- Rp 2.400.000,00 (santunan dari penyelenggara program pensiun yang preminya 40% dibayar oleh pekerja/buruh)\nJumlah Rp 12.400.000,00 (dua belas juta empat ratus ribu rupiah)\nAyat (4)\nCukup jelas\nAyat (5)\nCukup jelas\nAyat (6)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 168",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan dipanggil secara patut dalam ayat ini adalah pekerja/buruh telah dipanggil secara tertulis yang ditujukan pada alamat pekerja/buruh sebagaimana tercatat di perusahaan berdasarkan laporan pekerja/buruh. Tenggang waktu antara pemanggilan pertama dan kedua paling sedikit 3 (tiga) hari kerja.\nAyat (2)\nCukup jelas\nAyat (3)\nCukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 169",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 170",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 171",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tenggang waktu 1 tahun dianggap merupakan waktu yang cukup layak untuk mengajukan gugatan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 172",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 173",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1)\nYang dimaksud dengan pembinaan dalam ayat ini adalah kegiatan yang dilakukan secara berdaya guna dan berhasil guna untuk memperoleh hasil yang lebih baik untuk meningkatkan dan mengembangkan semua kegiatan yang berhubungan dengan ketenagakerjaan.\nAyat (2)\nCukup jelas\nAyat (3)\nYang melakukan koordinasi dalam ayat ini adalah instansi yang bertanggung jawab di bidang ketenagakerjaan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 174",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 175",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 176",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksudkan dengan independen dalam pasal ini adalah pegawai pengawas dalam mengambil keputusan tidak terpengaruh oleh pihak lain."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 177",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 178",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 179",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 180",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 181",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 182",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 183",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 184",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 185",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 186",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 187",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 188",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 189",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 190",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 191",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud peraturan pelaksanaan yang mengatur ketenagakerjaan dalam undang-undang ini adalah peraturan pelaksanaan dari berbagai undang-undang di bidang ketenagakerjaan baik yang sudah dicabut maupun yang masih berlaku.\nDalam hal peraturan pelaksanaan belum dicabut atau diganti berdasarkan undang-undang ini, agar tidak terjadi kekosongan hukum, maka dalam Pasal ini tetap diberlakukan sepanjang tidak bertentangan dengan undang-undang ini. Demikian pula, apabila terjadi suatu peristiwa atau kasus ketenagakerjaan sebelum undang-undang ini berlaku dan masih dalam proses penyelesaian pada lembaga penyelesaian perselisihan hubungan industrial, maka sesuai dengan asas legalitas, terhadap peristiwa atau kasus ketenagakerjaan tersebut diselesaikan berdasarkan peraturan pelaksanaan yang ada sebelum ditetapkannya undang-undang ini."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 192",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 193",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas\nTAMBAHAN LEMBARAN NEGARA REPUBLIK INDONESIA NOMOR 4279."
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
                $this->command->info("Data UU No. 13 Tahun 2003 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding UU No. 13 Tahun 2003 selesai!");

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

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrPerpres82Tahun2018Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "peraturan-presiden-82-2018",
    "tipe_peraturan": "Perpres",
    "judul": "Peraturan Presiden (Perpres) Nomor 82 Tahun 2018 tentang Jaminan Kesehatan",
    "tahun": "2018",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "17 September 2018",
    "tanggal_pengundangan": "18 September 2018",
    "tanggal_berlaku": "18 September 2018",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "PERPRES No. 28 Tahun 2016 tentang Perubahan Ketiga Atas Peraturan Presiden Nomor 12 Tahun 2013 Tentang Jaminan Kesehatan; PERPRES No. 19 Tahun 2016 tentang Perubahan Kedua Atas Peraturan Presiden Nomor 12 Tahun 2013 Tentang Jaminan Kesehatan; PERPRES No. 12 Tahun 2013 tentang Jaminan Kesehatan; PERPRES No. 111 Tahun 2013 tentang Perubahan atas Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Kesehatan",
    "mencabut_sebagian": "",
    "diubah_dengan": "Perpres No. 59 Tahun 2024 tentang Perubahan Ketiga atas Peraturan Presiden Nomor 82 Tahun 2018 tentang Jaminan Kesehatan; PERPRES No. 64 Tahun 2020 tentang Perubahan Kedua atas Peraturan Presiden Nomor 82 Tahun 2018 tentang Jaminan Kesehatan; PERPRES No. 75 Tahun 2019 tentang Perubahan atas Peraturan Presiden Nomor 82 Tahun 2018 tentang Jaminan Kesehatan",
    "mengubah": "",
    "sumber_dokumen": "peraturan_presiden_nomor_82_tahun_2018_tentang_jaminan_kesehatan.pdf",
    "id_dokumen": "peraturan_presiden_nomor_82_tahun_2018_tentang_jaminan_kesehatan",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 74,
    "total_chunk": 147,
    "waktu_eksekusi_detik": 257.62,
    "waktu_proses": "2026-10-09 10:53:07"
  },
  "relasi": {
    "dicabut_oleh": [],
    "dicabut_sebagian_oleh": [],
    "mencabut_sebagian": [],
    "mencabut": [
      "peraturan-presiden-28-2016",
      "peraturan-presiden-19-2016",
      "peraturan-presiden-12-2013",
      "peraturan-presiden-111-2013"
    ],
    "diubah_oleh": [
      "peraturan-presiden-59-2024",
      "peraturan-presiden-64-2020",
      "peraturan-presiden-75-2019"
    ],
    "mengubah": [],
    "mengingat": [],
    "detail_perubahan": []
  },
  "chunks": [
    {
      "tipe": "PEMBUKAAN",
      "label": "PEMBUKAAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN",
      "teks": "DEPP P PRSEN ENIA ERISI NOM 18 TENTANG JAMINAN KESEHATAN DENGAN RAHMAT TUHAN YANG MAHA ESA PRESIDEN REPUBLIK INDONESIA,"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "Menimbang : a.\nbahwa untuk melaksanakan ketcntuan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 13 ayat (2), Pasal 21 ayat (4), Pasal 22 ayat (3),"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 23 ayat (5), Pasal 26, Pasal 27 ayat (5), dan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Pasal 28 ayat (2) Undang-Undang Nomor 40 Tahun 2004 tentang Sistem Jaminan Sosial Nasional dan ketentuan Pasal 15 ayat (3) dan Pasal 19 ayat (5) huruf a Undang-Undang Nomor 24 Tahun 2011 tentang Badan Penyelenggara Jaminan Sosial, telah ditetapkan Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Kesehatan sebagaimana telah beberapa kali diubah, terakhir dengan Peraturan Presiden Nomor 28 Tahun 2016 tentang Perubahan Ketiga Atas Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Kesehatan;\nb. bahwa Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Kesehatan sebagaimana telah beberapa kali diubah, terakhir dengan Peraturan Presiden Nomor 28 Tahun 2016 tentang Perubahan Ketiga Atas Peraturan Presiden Nomor 12 Tahun tentang Jaminan Kesehatanperlu disempurnakan untuk meningkatkan kualitas dan kesinambungan program Jaminan Kesehatan;\nc. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Peraturan Presiden tentang Jaminan Keschatan;\nMengingat : 1.\nPasal 4 ayat (1) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\n2. Undang-Undang Nomor 40 Tahun 2004 tentang Sistem Jaminan Sosial Nasional (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 150, Tambahan Lembaran Negara Republik Indonesia Nomor 4456);\n3. Undang-Undang Nomor 24 Tahun 2011 tentang Badan Penyelenggara Jaminan Sosial (Lembaran Negara Republik Indonesia Tahun 2011 Nomor 116, Tambahan Lembaran Negara Republik Indonesia Nomor 5256);\nMEMUTUSKAN:\nMenetapkan : PERATURAN TENTANG JAMINAN KESEHATAN."
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
      "teks": "Pasal 1 Dalam Peraturan Presiden ini yang dimaksud dengan:\n1. Jaminan Kesehatan adalah jaminan berupa perlindungan keschatan agar Pescrta memperoleh manfaat pemcliharaan kesehatan dan perlindungan dalam memenuhi kebutuhan dasar keschatan yang diberikan kepada setiap orang yang telah membayar Iuran Jaminan Kesehatan atau Iuran Jaminan Keschatannya dibayar oleh Pemerintah Pusat atau Pemerintah Daerah.\n2. Peserta adalah setiap orang, termasuk orang asing yang bekerja paling singkat 6 (cnam) bulan di Indonesia, yang telah membayar Iuran Jaminan Kesehatan.\n3. Iuran Jaminan Kesehatan yang selanjutnya discbut Iuran adalah sejumlah uang yang dibayarkan sccara teratur oleh Peserta, Pemberi Kerja, dan/atau Pemcrintah Pusat atau Pemerintah Daerah untuk program Jaminan Keschatan.\n4. Manfaat adalah faedah jaminan sosial yang menjadi hak Peserta dan/atau  anggota keluarganya.\n5. Penerima Bantuan Iuran Jaminan Kesehatan yang sclanjutnya discbut PBI Jaminan Kesehatan adalah fakir miskin dan orang tidak mampu sebagai Peserta program Jaminan Kesehatan.\n6. Pekerja adalah sctiap orang yang bekerja dengan menerima Gaji, Upah, atau imbalan dalam bentuk lain.\n7. Pckerja Penerima Upah yang sclanjutnya disingkat PPU adalah setiap orang yang bekerja pada Pemberi Kerja dengan menerima Gaji atau Upah.\n8. Pekerja Bukan Penerima Upah yang selanjutnya disingkat PBPU adalah setiap orang yang bekerja atau berusaha atas risiko sendiri.\n9. Bukan Pekcrja yang selanjutnya disingkat BP adalah setiap orang yang bukan termasuk kelompok PPU, PBPU, PBI Jaminan Keschatan, dan penduduk yang didaftarkan oleh Pemerintah Daerah.\n10. Pejabat Negara adalah pimpinan dan anggota lembaga ncgara sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 dan pejabat lainnya yang ditentukan oleh Undang-Undang.\n：\n11. Pegawai Negeri Sipil yang sclanjutnya disingkat PNS adalah warga negara Indonesia yang memenuhi syarat tertentu, diangkat scbagai Pegawai Aparatur Sipil Negara secara tetap oleh pejabat pembina kepcgawaian untuk menduduki jabatan pemerintahan.\n12. Prajurit adalah anggota Tentara Nasional Indonesia.\n13. Anggota Kepolisian Negara Republik Indonesia yang selanjutnya disebut Anggota Polri adalah Anggota Polri sebagaimana dimaksud dalam Undang-Undang yang mengatur mengenai Kepolisian Negara Republik Indonesia.\n14. Veteran adalah Veteran Republik Indonesia sebagaimana dimaksud dalam Undang-Undang yang mengatur mengenai Veteran Republik Indoncsia.\n15. Perintis Kemerdekaan adalah Perintis Kemerdckaan sebagaimana dimaksud dalam Undang-Undang yang mengatur mengenai Perintis Kemerdckaan atau pemberian penghargaan/tunjangan kepada Perintis Pergcrakan Kebangsaan/Kemerdekaan.\n16. Pemberi Kerja adalah orangperseorangan, pengusaha, badan hukum, atau badan lainnya yang mempekerjakan tcnaga kcrja, atau penyelenggara negara yang mempekerjakan Pegawai Aparatur Sipil Negara dengan membayar gaji, upah, atau imbalan dalam bentuk lainnya.\n17. Gaji atau Upah adalah hak Pekerja yang diterima dan dinyatakan dalam bentuk uang sebagai imbalan dari Pemberi Kerja kepada Pekerja yang ditetapkan dan dibayar menurut suatu perjanjian kerja, kesepakatan, atau peraturan perundang-undangan, termasuk tunjangan bagi Pekerja dan keluarganya atas suatu pekerjaan dan/atau  jasa yang telah atau akan dilakukan.\n18. Pemutusan Hubungan Kerja yang selanjutnya disingkat PHK adalah pengakhiran hubungan kerja karena suatu hal tertentu yang mengakibatkan bcrakhirnya hak dan kewajiban antara Pekerja/buruh dan Pemberi Kerja berdasarkan peraturan perundang-undangan.\n19. Fasilitas Kesehatan adalah fasilitas pelayanan kesehatan yang digunakan untuk menyelenggarakan upaya pelayanan kesehatan perorangan, baik promotif, preventif, kuratif, maupun rehabilitatif yang dilakukan oleh Pemerintah Pusat, Pemerintah Daerah, dan/atau  masyarakat.\n20. Fasilitas Kesehatan Tingkat Pertamayang selanjutnya disingkat FKTP à adalahFasilitas Keschatan yang mclakukan pelayanan keschatan perorangan yang bersifat nonspesialistik untuk keperluan obscrvasi, promotif, preventif, diagnosis, perawatan, pengobatan, dan/atau pelayanan kesehatan lainnya.\n21. Fasilitas Kesehatan Rujukan Tingkat Lanjutan yang selanjutnya disingkat FKRTL adalah Fasilitas Kesehatan yang melakukan pelayanan keschatan perorangan yang bersifat spesialistik atau sub spesialistik yang meliputi rawat jalan tingkat lanjutan, rawat inap tingkat lanjutan, dan rawat inap di ruang perawatan khusus.\n22. Cacat Total Tctap adalah cacat yang mengakibatkan kctidakmampuan seseorang untuk melakukan pckerjaan.\nSosp\n23. Kccclakaan Kerja adalah kecelakaaan yang terjadi dalam hubungan kerja, termasuk kecelakaan yang terjadi dalam perjalanan dari rumah menuju tcmpat kerja atau sebaliknya, dan penyakit yang discbabkan oleh lingkungan kerja.\n24. Kecurangan (fraud) adalah tindakan yang dilakukan dengan sengaja, untuk mendapatkan keuntungan finansial dari program Jaminan Kesehatan dalam Sistem Jaminan Sosial Nasional melalui perbuatan curang yang tidak sesuai dengan ketentuan peraturan pcrundang-undangan.\n25. Urun Biaya adalah tambahan biaya yang dibayar Pescrta pada saat memperoleh Manfaat pelayanan kesehatan yang dapat menimbulkan penyalahgunaan pelayanan.\n26. Pemerintah Pusat adalah Presiden Republik Indonesia yang mcmegang kekuasaan pemerintahan negara Republik Indonesia yang dibantu oleh Wakil Presiden dan menteri sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.\n27. Menteri adalah menteri yang menyclenggarakan urusan pemerintahan di bidang kesehatan.\n28. Badan Penyclcnggara Jaminan Sosial Kesehatan yang selanjutnya disingkat BPJS Kesehatan adalah badan hukum yang dibentuk untuk menyclenggarakan program Jaminan Keschatan.\n29. Pcmerintah Daerah adalah kepala daerah sebagai unsur penyelenggara Pemerintahan Daerah yang memimpin pelaksanaan urusan pcmerintahan yang menjadi kewenangan daerah otonom.\n局\n30. Daerah Otonom yang selanjutnya disebut Daerah adalah kesatuan masyarakat hukum yang mempunyai batas-batas wilayah yang berwenang mengatur dan mengurus Urusan Pemerintahan dan kepentinganmasyarakat setempat menurut prakarsa sendiri berdasarkan aspirasi masyarakat dalam sistem Negara Kesatuan Republik Indonesia."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II PESERTA DAN KEPESERTAAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB II",
      "teks": "Bagian Kesatu Peserta Jaminan Kesehatan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 2 Peserta Jaminan Kesehatan meliputi:\na. PBI Jaminan Kesehatan; dan\nb. Bukan PBI Jaminan Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 3 Peserta PBI Jaminan Kesehatan sebagaimana dimaksud dalam Pasal 2 huruf a ditetapkan oleh menteri yang menyelenggarakan urusan pemerintahan di bidang sosial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 4 (1) Peserta bukan PBI Jaminan Kesehatan sebagaimana dimaksud dalam Pasal 2 huruf b terdiri atas:\na. PPU dan anggota keluarganya;\nb. PBPU dan anggota keluarganya; dan\nc. BP dan anggota keluarganya.\n(2) PPU...\n一 “ M d REIEN REUI SIA )) pP a ( ( a erta\na. Pejabat Negara;\nb. pimpinan dan anggota Dewan Perwakilan Rakyat Daerah;\nc. PNS;\nd. Prajurit;\ne. Anggota Polri;\nf. kcpala desa dan perangkat desa;\ng. pegawai swasta; dan\nh. Pckerja/pegawai yang tidak termasuk huruf a sampai dengan huruf g yang menerima Gaji atau Upah.\n(3) PBPU scbagaimana dimaksud pada ayat (1) huruf b terdiri atas:\na. Pekerja di luar hubungan kcrja atau Pckerja mandiri; dan\nb. Pekerja yang tidak termasuk huruf a yang bukan penerima Gaji atau Upah.\n(4) BP sebagaimana dimaksud pada ayat (1) huruf c terdiri atas:\na. investor;\nb. Pemberi Kerja;\nc. penerima pensiun;\nd. Veteran;\ne. Perintis Kemerdekaan;\nf. janda, duda, atau anak yatim dan/atau  piatu dari Veteran atau Pcrintis Kemerdekaan; dan\ng. BP yang tidak tcrmasuk huruf a sampai dengan huruf f yang mampu membayar Iuran.\n(5) Penerima...\n(5) Penerima pensiun sebagaimana dimaksud pada ayat (4) huruf c terdiri atas:\na. Pejabat Negara yang berhenti dengan hak pensiun;\nb. PNS yang berhenti dengan hak pensiun;\nc. Prajurit dan Anggota Polri yang berhenti dengan hak pensiun;\nd. janda, duda, atau anak yatim dan/atau  piatu dari penerima pensiun sebagaimana dimaksud pada huruf a, huruf b, dan huruf c yang mendapat hak pensiun;\ne. penerima pensiun sclain huruf a, huruf b, dan huruf c; dan\nf. janda, duda, atau anak yatim dan/atau  piatu dari penerima pensiun sebagaimana dimaksud pada huruf e yang mendapat hak pensiun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 5 (1) Anggota keluarga dari Peserta PPU meliputi istri/suami yang sah, anak kandung, anak tiri dari perkawinan yang sah, dan anak angkat yang sah, paling banyak 4 (cmpat) orang.\n(2) Anak kandung, anak tiri dari perkawinan yang sah, dan anak angkat yang sah scbagaimana dimaksud pada ayat (1), dengan kriteria:\na. tidak atau belum pernah menikah atau tidak mcmpunyai penghasilan sendiri; dan\nb. belum berusia 21 (dua puluh satu) tahun atau belum berusia 25 (dua puluh lima) tahun bagi yang masih menempuh pendidikan formal.\n(3) Selain...\n(3) Sclain anggota keluarga sebagaimana dimaksud pada ayat (1) untuk Peserta PPU dapat mengikutsertakan anggota keluarga yang lain.\n(4) Anggota keluarga yang lain sebagaimana dimaksud pada ayat (3) meliputi anak kc-4 (empat) dan seterusnya, ayah, ibu, dan mertua."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB II",
      "teks": "Bagian Kedua Administrasi Kcpesertaan Jaminan Kesehatan"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "teks": "Paragraf 1 Pendaftaran Peserta"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 6 (1) Setiap penduduk Indonesia wajib ikut serta dalam program Jaminan Kesehatan.\n(2) Ikut serta dalam program Jaminan Keschatan sebagaimana dimaksud pada ayat (1) dilaksanakan dengan cara mendaftar atau didaftarkan pada BPJS Keschatan.\n(3) Pada saat mendaftar atau didaftarkan pada BPJS Keschatan sebagaimana dimaksud pada ayat (2), calon Peserta berhak menentukan FKTP yang diinginkannya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 7 (1) Peserta dapat mengganti FKTP tempat Peserta terdaftar setclah jangka waktu 3 (tiga) bulan.\n(2) Penggantian FKTP oleh Peserta scbagaimana dimaksud pada ayat (1) dapat dilakukan dalam jangka waktu kurang dari 3 (tiga) bulan dengan kondisi scbagai berikut:\n：\na. Peserta pindah domisili dalam jangka waktu kurang dari 3 (tiga) bulan setelah terdaftar di FKTP awal, yang dibuktikan dengan surat keterangan domisili; atau\nb. Peserta dalam penugasan dinas atau pelatihan dalam jangka waktu kurang dari 3 (tiga) bulan, yang dibuktikan dengan surat keterangan penugasan atau pelatihan.\n(3) Penggantian FKTP sebagaimana dimaksud pada ayat (1) dan ayat (2) mulai berlaku sejak tanggal 1 pada bulan berikutnya.\n(4) Dalam hal kondisi Peserta yang terdaftar di FKTP belum merata, BPJS Kesehatan dapat melakukan pemindahan Peserta ke FKTP lain.\n(5) Pemindahan Peserta ke FKTP lain sebagaimana dimaksud pada ayat (4) harus mempertimbangkan jumlah Peserta yang terdaftar, ketersediaan dokter, tenaga kesehatan selain dokter, dan sarana prasarana di FKTP.\n(6) Dalam hal Peserta yang dipindahkan sebagaimana dimaksud pada ayat (4) keberatan maka Peserta dapat meminta untuk dipindahkan ke FKTP yang diinginkan.\n(7) Pemindahan Peserta sebagaimana dimaksud pada ayat (4) dilakukan setelah berkoordinasi dengan:\na. dinas kesehatan kabupaten/kota untuk pemindahan antar FKTP milik pemerintah;\nb. asosiasi fasilitas kesehatan untuk pemindahan antar FKTP bukan milik pemerintah; atau\nc. dinas kesehatan kabupaten/kota dan asosiasi fasilitas kesehatan untuk pemindahan antara FKTP milik pemerintah dengan FKTP bukan milik pemerintah.\n(8) Dalam...\n(8) Dalam hal terjadi perpindahan Pescrta yang berasal dari Prajurit atau Anggota Polri, BPJS Kesehatan harus berkoordinasi dengan Tentara Nasional Indonesia dan Kepolisian Negara Republik Indonesia.\n(9) Ketentuan lebih lanjut mengenai pemindahan Pescrta diatur dengan Peraturan BPJS Kesehatan setelah berkoordinasi dengan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 8 (1) Setiap Peserta yang telah terdaftar pada BPJS Kesehatan berhak mendapatkan identitas Peserta.\n(2) Identitas Peserta sebagaimana dimaksud pada ayat (1) berupa Kartu Indonesia Schat yang paling sedikit memuat nama dan nomor identitas Pescrta yang terintegrasi dengan Nomor Identitas Kependudukan, kccuali untuk bayi baru lahir.\n(3) Kartu Indonesia Schat sebagaimana dimaksud pada ayat (2) diberikan kepada Peserta secara bertahap.\n(4) Nomor identitas Peserta sebagaimana dimaksud pada ayat (2) mcrupakan nomor identitas tunggal yang berlaku untuk semua program jaminan sosial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 9 PBI Jaminan Keschatan yang ditetapkan oleh menteri yang menyelenggarakan urusan pemerintahan di bidang sosial sebagaimana dimaksud dalam Pasal 3, didaftarkan oleh Menteri sebagai Peserta kepada BPJS Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 10 Bayi yang dilahirkan oleh ibu kandung yang terdaftar sebagai Peserta PBI Jaminan Kesehatan secara otomatis ditetapkan sebagai Peserta PBI Jaminan Kesehatan sesuai dengan ketentuan peraturan perundang- undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 11 (1) Peserta bukan PBI Jaminan Kesehatan yang mengalami Cacat Total Tetap dan tidak mampu, berhak menjadi Peserta PBI Jaminan Kesehatan.\n(2) Penetapan Cacat Total Tetap sebagaimana dimaksud pada ayat (1) dilakukan oleh dokter yang berwenang.\n(3) Penetapan orang dengan Cacat Total Tetap dan tidak mampu sebagai Peserta PBI Jaminan Kesehatan sebagaimana dimaksud pada ayat (1) dilakukan sesuai dengan ketentuan peraturan perundang- undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 12 Penduduk yang belum terdaftar sebagai Peserta Jaminan Kesehatan dapat didaftarkan pada BPJS Kesehatan oleh Pemerintah Daerah provinsi atau Pemerintah Daerah kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 13 (1) Pemberi Kerja wajib mendaftarkan dirinya dan Pekerjanya sebagai Peserta Jaminan Kesehatan kepada BPJS Kesehatan dengan membayar Iuran.\n(2) Dalam hal Pemberi Kerja secara nyata tidak mendaftarkan Pekerjanya kepada BPJS Kesehatan, Pekerja yang bersangkutan berhak mendaftarkan dirinya sebagai Peserta Jaminan Kesehatan.\n(3) Pendaftaran...\n(3) Pendaftaran oleh Pekerja sebagaimana dimaksud pada ayat (2) dilakukan dengan melampirkan dokumen yang membuktikan status ketenagakerjaannya.\n(4) Pekerja yang mendaftarkan dirinya sebagai Peserta Jaminan Kcsehatan sebagaimana dimaksud pada ayat (2), Iurannya dibayar sesuai dengan ketentuan Peraturan Presiden ini.\n(S) Dalam hal Pemberi Kerja belum mendaftarkan dan membayar Iuran bagi Pckerjanya kepada BPJS Kesehatan, Pembcri Kerja wajib bertanggung jawab pada saat Pckerjanya membutuhkan pelayanan kesehatan sesuai dengan Manfaat yang diberikan oleh BPJS Kesehatan.\n(6) Pemberi Kerja selain penyelenggara negara yang melanggar ketentuan sebagaimana dimaksud pada ayat (1) dikenai sanksi administratif berupa:\na. teguran tertulis;\nb. denda; dan/atau\nc. tidak mendapat pelayanan publik tertentu.\n(7) Tata A cara pengenaan sanksi administratif scbagaimana dimaksud pada ayat (6) dilaksanakan sesuai dengan ketentuan peraturan perundang- undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 14 (1) Dalam hal pasangan suami istri yang masing-masing merupakanPekerja a maka kcduanya a wajib didaftarkan sebagai Peserta PPU oleh masing-masing Pemberi Kerja dan membayar Iuran.\n(2) Suami...\n(2) Suami, istri, dan anak dari Peserta PPU scbagaimana dimaksud pada ayat (1) berhak memilih kelas perawatan tertinggi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 15 (1) Setiap PBPU dan BP wajib mendaftarkan dirinya dan anggota keluarganya sccara scndiri-sendiri atau kolektif sebagai Peserta Jaminan Kesehatan pada BPJS Kesehatan dengan membayar Iuran.\n(2) BPJS Kesehatan harus melakukan verifikasi pcndaftaran sebagaimana dimaksud pada ayat (1) dalam waktu 14 (empat belas) hari sejak pendaftaran.\n(3) Pendaftaran bagi Pescrta PBPU atau Peserta BP yang dilakukan secara sendiri-sendiri, pembayaran Iurannya dapat dilakukan setelah 14 (empat belas) hari scjak dinyatakan layak berdasarkan verifikasi pendaftaran."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 16 (1) Bayi baru lahir dari Pescrta Jaminan Kesehatan wajib didaftarkan kcpada BPJS Kesehatan paling lama 28 (dua puluh delapan) hari scjak dilahirkan.\n(2) Peserta yang tidak mendaftarkan bayi sebagaimana dimaksud pada ayat (1) dikenai sanksi sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Ketentuan lebih lanjut mengenai pendaftaran bayi baru lahir sebagaimana dimaksud pada ayat (1) diatur dalam Peraturan BPJS Keschatan setelah berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 17 (1) Kewajiban melakukan pendaftaran sebagai Peserta Jaminan Kesehatan yang telah ditentukan scsuai dengan batas waktunya namun belum dilakukan maka dikenai sanksi sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Kewajiban melakukan pendaftaran sebagai Peserta Jaminan Kesehatan bagi PBPU dan BP dilaksanakan paling lambat tanggal 1 Januari 2019."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 18 Dalam rangka pendaftaran Peserta, BPJS Keschatan wajib mengembangkan sistem untuk mempermudah akses pendaftaran."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Pasal 19 Ketentuan lebih lanjut mengenai prosedur pendaftaran dan administrasi kepesertaan diatur dengan Peraturan BPJS Kesehatan setelah berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "teks": "Paragraf 2 Perubahan Status Kepesertaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 20 (1) Status kepesertaan dapat berubah untuk menjamin keberlanjutan kepescrtaan.\n(2) Pcrubahan 1status kepesertaan sebagaimana dimaksud pada ayat (1) tidak menghapuskan kewajiban Peserta, Pemberi Kerja, atau Pemerintah Daerah untuk melunasi tunggakan Iuran.\n(3) Kewajiban...\n(3) Kewajiban Pescrta, Pemberi Kerja, atau Pemerintah Daerah untuk melunasi tunggakanIuran sebagaimana dimaksud pada ayat (2) dilakukan paling lama 6 (enam) bulan sejak status kepesertaan berubah.\n(4) Perubahan status kepesertaan sebagaimana im a nt a anggota kcluarganya ke jenis kepesertaan yang baru.\n(5) Kewajiban membayar tunggakan sebagaimana dimaksud pada ayat (2) tidak mengakibatkan terputusnya Manfaat Jaminan Keschatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 21 (1) Perubahan status kepcscrtaan dari Peserta PBI Jaminan Keschatan menjadi bukan Pescrta PBI Jaminan Kesehatan dilakukan melalui pendaftaran kc BPJS Keschatan dengan membayar Iuran pertama.\n(2) Perubahan status kepesertaan sebagaimana dimaksud pada ayat (1) tidak mengakibatkan terputusnya Manfaat Jaminan Kesehatan.\n(3) Perubahan status kepesertaan dari bukan Pcscrta PBI Jaminan Kesehatan menjadi Peserta PBI Jaminan Kesehatan dilakukan sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 22 (1) Peserta PPU wajib menyampaikan perubahan data kepesertaan kepada Pemberi Kerja termasuk perubahan D status F kepesertaandan seluruh u ran 2) ) P ..\n(2) Pemberi Kerja wajib melaporkan perubahan data kepesertaan sebagaimana dimaksud pada ayat (1) kepada BPJS Kesehatan paling lambat 7 (tujuh) hari sejak terjadinya perubahan data oleh Pekerja.\n(3) Dalam hal Pemberi Kerja secara nyata tidak melaporkan perubahan data kepesertaan kepada BPJS Kesehatan, Pekerja yang bersangkutan dapat melaporkan perubahan data kepesertaan secara langsung kepada BPJS Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 23 Peserta PBPU dan Peserta BP wajib menyampaikan perubahan data kepesertaan kepada BPJS Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 24 Peserta yang pindah kerja wajib melaporkan data kepesertaannya dan identitas Pemberi Kerja yang baru kepada BPJS Kesehatan dengan menunjukkan identitas Peserta."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 25 Pendaftaran dan perubahan data kepesertaan PPU untuk kepala desa dan perangkat desa dilakukan secara kolektif melalui Pemerintah Daerah Kabupaten/Kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 26 Ketentuan lebih lanjut mengenai tata cara perubahan status kepesertaan diatur dengan Peraturan BPJS Kesehatan setelah berkoordinasi dengan kementerian/lembaga terkait.\nQR PRESIOEN EPINSI ai iga Pm Pemutusan Hubungan Kerja"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Pasal 27 (1) Peserta PPU yang mengalami PHK tetap memperoleh hak Manfaat Jaminan Keschatan paling lama 6 (enam) bulan sejak di PHK, tanpa membayar Iuran.\n(2) PHK scbagaimana dimaksud pada ayat (1) harus memenuhi kriteria:\na. PHK yang sudah ada putusan pengadilan hubunganindustrial, dibuktikandengan putusan/akta pengadilan hubungan industrial;\nb. PHK karena penggabungan perusahaan, dibuktikan dengan akta notaris;\nc. PHK karena perusahaan pailit atau mengalami kcrugian, dibuktikan dengan putusan kepailitan dari pengadilan; atau\nd. PHK karena Pekerja mengalami sakit yang berkepanjangan dan tidak mampu bekerja, dibuktikan dengan surat dokter.\n(3) Dalam hal terjadi sengketa atas PHK yang diajukan melalui lembaga penyelesaianpersclisihan hubungan industrial, baik Pemberi Kerja maupun Pekerja harus tetap melaksanakan kewajiban mcmbayar Iuran sampai dengan adanya putusan yang berkekuatan hukum tetap.\n(4) Manfaat Jaminan Keschatan sebagaimana dimaksud pada ayat (1) diberikan berupa Manfaat pelayanan di ruang perawatan kelas III.\n(5) Pescrta scbagaimana dimaksud pada ayat (1) yang telah bekerja kembali wajib memperpanjang status kcpesertaannya dengan membayar Iuran.\n(6) Dalam...\n景RESIDEN EIEIA Da a a ayat J a mampu, didaftarkan menjadi Peserta PBI Jaminan Kesehatan."
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB III IURAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Kesatu Besaran Iuran"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 28 (1) Iuran bagi Peserta PBI Jaminan Kesehatan dibayar oleh Pemerintah Pusat.\n(2) Iuran bagi penduduk yang didaftarkan oleh Pemerintah Daerah dibayar oleh Pemerintah Daerah.\n(3) Iuran bagi Peserta PPU dibayar oleh Pemberi Kerja dan Pekerja.\n(4) Iuran bagi Peserta PBPU dan Peserta BP dibayar oleh Peserta atau pihak lain atas nama Peserta.\n(5) Ketentuan sebagaimana dimaksud pada ayat (3) tidak berlaku bagi:\na. penerima pensiun sebagaimana dimaksud dalam Pasal 4 ayat (5) huruf a, huruf b, huruf c, dan huruf d; dan\nb. Veteran dan Perintis Kemerdekaan.\n(6) Iuran bagi bayi baru lahir dibayarkan oleh Peserta atau pihak lain atas nama Peserta pada saat mendaftar paling lama 28 (dua puluh delapan) hari sejak dilahirkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 29 Iuran bagi Peserta PBI Jaminan Kesehatan dan penduduk yang didaftarkan oleh Pemerintah Daerah yaitu sebesar Rp23.000,00 (dua puluh tiga ribu rupiah) per orang per bulan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 30 (1) Iuran bagi Peserta PPU yang terdiri atas Pejabat Negara, pimpinan dan anggota Dewan Perwakilan Rakyat Daerah, PNS, Prajurit, Anggota Polri, kepala desa dan perangkat desa, dan Pekerja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h yaitu sebesar 5% (lima persen) dari Gaji atau Upah per bulan.\n(2) Iuran sebagaimana dimaksud pada ayat (1) dibayar dengan ketentuan sebagai berikut:\na. 3% (tiga persen) dibayar oleh Pemberi Kerja;\ndan\nb. 2% (dua persen) dibayar oleh Peserta.\n(3) Kewajiban Pemberi Kerja dalam membayar Iuran sebagaimana dimaksud pada ayat (2) huruf a, dilaksanakan oleh:\na. Pemerintah Pusat untuk Iuran bagi Pejabat Negara, PNS pusat, Prajurit, Anggota Polri, dan Pekerja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h instansi pusat; dan\nb. Pemerintah Daerah untuk Iuran bagi kepala daerah dan wakil kepala daerah, pimpinan dan anggota Dewan Perwakilan Rakyat Daerah, PNS daerah, kepala desa dan perangkat desa, dan Pekerja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h instansi daerah.\n(4) Iuran...\n(4) Iuran sebagaimana dimaksud pada ayat (3) dibayarkan secara langsung oleh Pemberi Kerja kepada BPJS Keschatan melalui kas negara kecuali bagi kepala desa dan perangkat desa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 31 (1) Iuran bagi Peserta PPU sclain Pescrta sebagaimana dimaksud dalam Pasal 30 ayat (1) yaitu sebesar 5% (lima persen) dari Gaji atau Upah per bulan dengan ketentuan:\na. 4% (empat persen) dibayar oleh Pemberi Kerja;\ndan\nb. 1% (satu perscn) dibayar oleh Peserta.\n(2) Iuran sebagaimana dimaksud pada ayat (1) dibayarkan secara langsung oleh Pemberi Kerja kepada BPJS Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 32 (1) Batas paling tinggi Gaji atau Upah per bulan yang digunakan sebagai dasar perhitungan besaran Iuran bagi Peserta PPU sebagaimana dimaksud dalam Pasal 31 ayat (1), kepala desa dan perangkat desa, dan Pekerja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h yaitu sebesar Rp8.000.000,00 (dclapan juta rupiah).\n(2) Batas paling rendah Gaji atau Upah per bulan yang digunakan sebagai dasar perhitungan besaran Iuran bagi Peserta PPU selain penyelenggara negara, kepala desa dan perangkat desa, dan Pekerja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h yaitu sebesar upah minimum kabupaten/kota.\n(3) Dalam...\n(3) Dalam hal Pemerintah Daerah tidak menetapkan upah minimum kabupaten/kota maka yang menjadi dasar perhitungan besaran Iuran scbagaimana dimaksud pada ayat (2) yaitu scbesar upah minimum provinsi.\n(4) Ketentuan batas paling rendah sebagaimana dimaksud pada ayat (2) tidak berlaku bagi Pemberi Kerja yang mendapatkan penangguhan dari kewajiban membayarkan Gaji atau Upah minimum provinsi/kabupaten/kota yang ditetapkan oleh Pemerintah Daerah setempat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 33 (1) Gaji atau Upah yang digunakan scbagai dasar perhitungan Iuran bagi Peserta PPU untuk Pejabat Negara, pimpinan dan anggota Dewan Perwakilan Rakyat Daerah, PNS, Prajurit, atau Anggota Polri sebagaimana dimaksud dalam Pasal 30 ayat (1) terdiri atas Gaji atau Upah pokok dan tunjangan keluarga.\n(2) Gaji atau Upah yang digunakan sebagai dasar perhitungan Iuran bagi Peserta PPU untuk kepala desa dan perangkat desa serta Pekerja/pegawai scbagaimana dimaksud dalam Pasal 4 ayat (2) huruf h dihitung berdasarkan penghasilan tetap.\n(3) Gaji atau Upah yang digunakan sebagai dasar perhitungan luran bagi Peserta PPU selain Peserta sebagaimana dimaksud pada ayat (1) dan ayat (2) terdiri atas Gaji atau Upah pokok dan tunjangan tetap.\n(4) Tunjangan...\n(4) Tunjangan tetap sebagaimana dimaksud pada ayat (3) merupakan tunjangan yang dibayarkan kepada Pekerja tanpa memperhitungkan kchadiran Pekerja."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 34 Iuran bagi Peserta PBPU dan Peserta BP yaitu sebesar:\na. Rp25.500,00 (dua puluh lima ribu lima ratus rupiah) per orang per bulan dengan Manfaat pelayanan di ruang perawatan Kelas III;\nb. Rp51.000,00 (lima puluh satu ribu rupiah) per orang per bulan dengan Manfaat pelayanan di ruang perawatan Kelas II; atau\nc. Rp80.000,00 (delapan puluh ribu rupiah) per orang per bulan dengan Manfaat pelayanan di ruang perawatan Kelas i."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 35 (1) Iuran bagi penerima pensiun sebagaimana dimaksud dalam Pasal 4 ayat (5) huruf a, huruf b, huruf c, dan huruf d yaitu sebcsar 5% (lima persen) dari besaran pensiun pokok dan tunjangan keluarga yang diterima per bulan.\n(2) Iuran scbagaimana dimaksud pada ayat (1) dibayar oleh Pemerintah Pusat dan penerima pensiun dengan ketentuan sebagai berikut:\na. 3% (tiga persen) dibayar oleh Pemerintah Pusat;\ndan\nb. 2% (dua persen) dibayar oleh penerima pensiun.\n(3) Iuran bagi penerima pensiun sebagaimana dimaksud dalam Pasal 4 ayat (5) huruf e dan huruf f mengikuti ketentuan scbagaimana dimaksud dalam"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 34.\n(4) Iuran...\n(4) Iuran bagi Veteran, Perintis Kemerdckaan, janda, duda, atau anak yatim dan/atau  piatu dari Veteran atau Perintis Kemerdekaan yaitu sebcsar 5% (lima persen) dari 45% (empat puluh lima persen) Gaji pokok PNS golongan ruang III/a dengan masa kerja 14 (empat belas) tahun pcr bulan, dibayar oleh Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 36 (1) Iuran bagi anggota keluarga yang lain dari Peserta PPU dibayar oleh Peserta.\n(2) Besaran luran bagi anggota keluarga yang lain scbagaimana dimaksud pada ayat (1) yaitu sebesar 1% (satu persen) dari Gaji atau Upah Peserta PPU per orang per bulan.\n(3) Besaran Iuran bagi anggota keluarga yang lain sebagaimana dimaksud pada ayat (1) bagi Peserta PBPU dan Peserta BP ditetapkan sesuai Manfaat ruang perawatan yang dipilih mengacu pada ketentuan sebagaimana dimaksud dalam"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 34.\n(4) Pembayaran Iuran bagi anggota keluarga yang lain scbagaimana dimaksud pada ayat (2) diawali dengan pcmberian surat kuasa dari Pekerja kepada Pemberi Kerja untuk melakukan pemotongan tambahan Iuran dan membayarkan kepada BPJS Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 37 (1) Peserta warga negara Indonesia yang tinggal di luar negeri sclama 6 (enam) bulan berturut-turut dapat menghentikan kepesertaannya scmentara.\n(2) Dalam...\ndeaddor (2) Dalam hal Peserta menghentikan kcpcsertaannya sementara sebagaimana dimaksud pada ayat (1), Peserta yang bersangkutan tidak mendapatkan Manfaat.\n(3) Ketentuan sebagaimana dimaksud pada ayat (1) dikccualikan bagi Peserta PPU yang masih mendapatkan Gaji atau Upah di Indonesia.\n(4) Peserta scbagaimana dimaksud pada ayat (1) yang kembali ke Indonesia wajib mclapor ke BPJS Keschatan dan membayar Iuran paling lambat 1 (satu) bulan setelah kembali serta berhak mendapat Manfaat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 38 (1) Besaran Iuran ditinjau paling lama 2 (dua) tahun sekali.\n(2) Ketentuan mengenai besaran Iuran scbagaimana dimaksud pada ayat (1) diatur dengan Peraturan Presiden."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Kedua Tata Cara Pembayaran Iuran"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 39 (1) Pemberi Kerja wajib memungut Iuran dari Pekerjanya, membayar Iuran yang menjadi tanggung jawabnya, dan menyctor luran tersebut kepada BPJS Kesehatan paling lambat tanggal 10 setiap bulan.\n(2) Jika...\n(2) Jika Pemberi Kerja merupakan Pemerintah Pusat atau Pemerintah Daerah, penyetoran Iuran kepada BPJS Kesehatan scbagaimana dimaksud pada ayat (1) dilakukan melalui rekening kas negara paling lambat tanggal 10 setiap bulan.\n(3) Iuran bagi Pcscrta PPU untuk kepala desa dan perangkat desa dipungut dan dibayarkan oleh Pemerintah Daerah kabupaten/kota sebagai Pemberi Kerja langsung kepada BPJS Keschatan paling lambat tanggal 10 setiap bulan.\n(4) Dalam hal tanggal 10 sebagaimana dimaksud pada ayat (1) jatuh pada hari libur maka Iuran dibayarkan pada hari kerja berikutnya.\n(5) Ketentuan mengenai penerusan Iuran Pemberi Kerja Pemerintah Daerah dari rekening kas negara kepada BPJS Kesehatan diatur dengan Peraturan Mentcri yang menyclenggarakan urusan pemerintahan di bidang keuangan.\n(6) Ketentuan lebih lanjut mengcnai tata cara pembayaran Iuran bagi Peserta PPU diatur dcngan Peraturan BPJS Kesehatan setelah berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 40 (1) Peserta PBPU dan Peserta BP wajib membayar Iuran kepada BPJS Kesehatan paling lambat tanggal 10 setiap bulan.\n(2) Iuran dapat dibayarkan untuk lebih dari 1 (satu) bulan yang dilakukan di awal.\n(3) BPJS...\n(3) BPJS Kesehatan wajib mengembangkan mekanisme penarikan luran yang efektif dan efisien bagi Pcscrta PBPU dan Peserta BP sebagaimana dimaksud pada ayat (1).\n(4) Ketentuan lebih lanjut mengenai tata cara pembayaran Iuran bagi Peserta PBPU dan Peserta BP diatur dengan Peraturan BPJS Kesehatan setelah berkoordinasi dengan kementcrian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 41 (1) Pembayaran Iuran bagi Peserta PBPU dan Peserta BP dilakukan secara kolcktif atas total tagihan untuk scluruh anggota keluarga sesuai data yang tercantum dalam kartu keluarga.\n(2) Ketentuan lebih lanjut mengenai tata cara pembayaran Iuran yang dilakukan sccara kolcktif sebagaimana dimaksud pada ayat (1) diatur dengan Peraturan BPJS Kesehatan setelah berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 42 (1) Dalam hal Pescrta dan/atau  Pemberi Kerja tidak mcmbayar Iuran sampai dengan akhir bulan berjalan maka penjaminan Peserta diberhentikan sementara sejak tanggal 1 bulan berikutnya.\n(2) Dalam hal pemberi kerja belum melunasi tunggakan Iuran scbagaimana dimaksud pada ayat (1) kepada BPJS Keschatan, Pemberi Kerja wajib bertanggung jawab pada saat Pekerjanya membutuhkan pelayanan kesehatan sesuai dengan Manfaat yang diberikan.\n(3) Pemberhentian...\n(3) Pemberhentian sementara penjaminan Peserta sebagaimana dimaksud pada ayat (1) berakhir dan status kepesertaan aktif kembali, apabila Peserta:\na. telah membayar Iuran bulan tertunggak, paling banyak untuk waktu 24 (dua puluh empat) bulan; dan\nb. membayar Iuran pada bulan saat Peserta ingin mengakhiri pemberhentian sementara jaminan.\n(4) Pembayaran luran tertunggak dapat dibayar oleh Peserta atau pihak lain atas nama Peserta.\n(5) Dalam waktu 45 (empat puluh lima) hari sejak status kepesertaan aktif kembali sebagaimana dimaksud pada ayat (3), Peserta sebagaimana dimaksud pada ayat (1) wajib membayar denda kepada BPJS Keschatan untuk setiap pelayanan kesehatan rawat inap tingkat lanjutan yang diperolehnya.\n(6) Denda sebagaimana dimaksud pada ayat (5) yaitu sebesar 2,5% (dua koma lima persen) dari perkiraan biaya paket Indonesian Case Based Groups berdasarkan diagnosa dan prosedur awal untuk setiap bulan tertunggak dengan ketentuan:\na. jumlah bulan tertunggak paling banyak 12 (dua belas) bulan; dan\nb. besar denda paling tinggi Rp30.000.000,00 (tiga puluh juta rupiah).\n(7) Bagi Peserta PPU, pembayaran Iuran sebagaimana dimaksud pada ayat (3) dan denda sebagaimana dimaksud pada ayat (6) ditanggung oleh Pemberi Kerja.\n(8} Ketentuan...\n(8) Ketentuan pembayaran Iuran sebagaimana dimaksud pada ayat (3) dan denda sebagaimana dimaksud pada ayat (6) dikecualikan untuk Peserta PBI Jaminan Kesehatan, Peserta yang didaftarkan oleh Pemerintah Daerah, dan Peserta yang tidak mampu yang dibuktikan dengan surat keterangan dari instansi yang berwenang.\n(9) Ketentuan lebih lanjut mengenai pembayaran Iuran sebagaimana dimaksud pada ayat (3) dan denda sebagaimana dimaksud pada ayat (6) diatur dengan Peraturan BPJS Kesehatan setelah berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 43 BPJS Kesehatan wajib mencatat dan menagih tunggakan Iuran sebagai piutang BPJS Kesehatan paling banyak untuk 24 (dua puluh empat) bulan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 44 (1) Ketentuan mengenai penyediaan, pencairan, dan pertanggungjawaban Iuran yang berasal dari Anggaran Pendapatan dan Belanja Negara diatur dengan Peraturan Menteri yang menyelenggarakan urusan pemerintahan di bidang keuangan.\n(2) Ketentuan mengenai penyetoran Iuran dari PNS, Pekerja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h, dan Pemerintah Daerah diatur dengan Peraturan Menteri yang menyelenggarakan urusan pemerintahan di bidang keuangan atau Peraturan Menteri yang menyelenggarakan urusan pemerintahan dalam negeri sesuai dengan kewenangannya.\n(3) Ketentuan...\n(3) Ketentuan lebih lanjut mengenai pemotongan, penyetoran, dan pembayaran Iuran bagi kepala desa dan perangkat desa diatur dengan Peraturan Menteri yang menyelenggarakan urusan pemerintahan dalam negeri."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Ketiga Kelebihan dan Kekurangan Iuran"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 45 (1) BPJS Keschatan harus menghitung setiap kelebihan atau kekurangan Iuran sesuai dengan Gaji atau Upah Pckerja.\n(2) Perhitungan setiap kelebihan atau kekurangan Iuran sebagaimana dimaksud pada ayat (1) didasarkan pada daftar Gaji atau Upah Pekerja dan perubahan status kepcsertaan atau data kepescrtaan.\n(3) Dalam hal terjadi kelcbihan atau kekurangan pembayaran Iuran yang discbabkan oleh perubahan data kepesertaan maka BPJS Kesehatan harus memberitahukan kepada Pemberi Kerja dan/atau Peserta paling lambat 14 (empat belas) hari kerja sejak diterimanya Iuran.\n(4) Kelebihan atau kekurangan pembayaran Iuran sebagaimana dimaksud pada ayat (1) diperhitungkan dengan pembayaran Iuran bulan berikutnya.\n理局 厂 ENESIA -32."
    },
    {
      "tipe": "BAB",
      "label": "BAB IV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IV MANFAAT JAMINAN KESEHATAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kesatu Manfaat yang Dijamin"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 46 (1) Setiap Peserta berhak memperoleh Manfaat Jaminan Kesehatan yang bersifat pclayanan keschatan perorangan,mencakup pclayanan promotif, preventif, kuratif, dan rehabilitatif, termasuk pelayanan obat, alat kesehatan, dan bahan medis habis pakai sesuai dengan kebutuhan medis yang dipcrlukan.\n(2) Manfaat Jaminan Kesehatan sebagaimana dimaksud pada ayat (1) terdiri atas Manfaat medis dan Manfaat nonmedis.\n(3) Manfaat medis sebagaimana dimaksud pada ayat (2) diberikan sesuai dengan indikasi medis dan standar pelayanan serta tidak dibedakan berdasarkan besaran Iuran Peserta.\n(4) Manfaat nonmedis sebagaimana dimaksud pada ayat (2) diberikan berdasarkan besaran Iuran Peserta.\n(5) Manfaat Jaminan Keschatan sebagaimana dimaksud pada ayat (1) juga berlaku bagi bayi baru lahir dari Peserta paling lama 28 (dua puluh delapan) hari scjak dilahirkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 47 (1) Pelayanan kesehatan yang dijamin terdiri atas:\na. pelayanan kesehatan tingkat pertama, mcliputi pelayanan kesehatan nonspesialistik yang mencakup:\n1. administrasi pclayanan;\n2. pelayanan promotif dan preventif;\n3. pemeriksaan, pengobatan, dan konsultasi medis;\n4. tindakan medis nonspesialistik, baik operatif maupun nonoperatif;\n5. pclayanan obat, alat kesehatan, dan bahan medis habis pakai;\n6. pcmcriksaan pcnunjang diagnostik laboratorium tingkat pratama; dan\n7. rawat inap tingkat pertama sesuai dengan indikasi medis;\nb. pelayanan kcsehatan rujukan tingkat lanjutan, meliputi pelayanan kesehatan yang mencakup:\n1. administrasi pclayanan;\n2. pemeriksaan, pengobatan, dan konsultasi medis dasar;\n3. pemeriksaan, pcngobatan, dan konsultasi spesialistik;\n4. tindakan mcdis spesialistik, baik bedah maupun nonbedah sesuai dengan indikasi medis;\n5. pelayanan obat, alat kesehatan, dan bahan medis habis pakai;\n6. pclayanan penunjang diagnostik lanjutan sesuai dengan indikasi medis;\n汽A局\n7. rehabilitasi medis;\n8. pelayanan darah;\n9. pemulasaranjenazah Peserta yang meninggal di Fasilitas Kesehatan;\n10. pelayanan keluarga berencana;\n11. perawatan inap nonintensif; dan\n12. perawatan inap di ruang intensif;\nc. pelayanan ambulans darat atau air.\n(2) Pelayanan kesehatan sebagaimana dimaksud pada ayat (1) huruf b angka 2 hanya berlaku untuk pelayanan kesehatan pada unit gawat darurat.\n(3) Alat kesehatan sebagaimana dimaksud pada ayat (1) huruf b angka 5 merupakan seluruh alat kesehatan yang digunakan dalam rangka penyembuhan, termasuk alat bantu kesehatan.\n(4) Pelayanan kesehatan sebagaimana dimaksud pada ayat (1) huruf b angka 10, tidak termasuk pelayanan keluarga berencana yang telah dibiayai Pemerintah Pusat.\n(5) Pelayanan ambulans darat atau air sebagaimana dimaksud pada ayat (1) huruf c merupakan pelayanan transportasi pasien rujukan dengan kondisi tertentu antar Fasilitas Kesehatan disertai dengan upaya menjaga kestabilan kondisi pasien untuk kepentingan keselamatan pasien."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 48 (1) Manfaat pelayanan promotif dan preventif meliputi pemberian pelayanan:\na. penyuluhan kesehatan perorangan;\nb. imunisasi rutin;\nà\n1. xa\nc. keluarga berencana;\nd. skrining riwayat kesehatan dan pelayanan penapisan atau skrining keschatan tertentu;\ndan\ne. peningkatan kesehatan bagi Peserta pendcrita penyakit kronis.\n(2) Penyuluhan kesehatan perorangan sebagaimana dimaksud pada ayat (1) huruf a meliputi paling scdikit penyuluhan mengenai pengelolaan faktor risiko penyakit dan perilaku hidup bersih dan sehat.\n(3) Pelayanan imunisasi rutin sebagaimana dimaksud pada ayat (1) huruf b meliputi pemberian jenis imunisasi rutin sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Pelayanankcluarga berencana sebagaimana dimaksud pada ayat (1) huruf c meliputi konscling dan pelayanan kontrasepsi, termasuk vasektomi dan tubcktomibekerja sama dengan Badan Kependudukan dan Keluarga Berencana Nasional.\n(5) Ketentuan mengenai pemenuhan kebutuhan alat dan obat kontrasepsi bagi Peserta Jaminan Keschatan di Fasilitas Kesehatan diatur dengan Peraturan Kepala Badan Kependudukan dan Keluarga Berencana Nasional.\n(6) Vaksin untuk imunisasi rutin serta alat dan obat kontrasepsi sebagaimana dimaksud pada ayat (3) dan ayat (4) disediakan oleh Pemerintah Pusat dan/atau  Pemerintah Daerah sesuai dengan ketentuan peraturan perundang-undangan.\n(7) Pelayanan skrining riwayat kesehatan sebagaimana dimaksud pada ayat (1) huruf d diberikan sccara selektif yang ditujukan untuk mendeteksi risiko penyakit dengan menggunakan metode tertentu.\n(8) Pelayanan...\nX (8) Pelayanan penapisan atau skrining kesehatan tertentu scbagaimana dimaksud pada ayat (1) huruf d diberikan secara sclcktif yang ditujukan untuk mendeteksi risiko penyakit dan mencegah dampak lanjutan risiko penyakit tertentu.\n(9) Jenis pelayanan penapisan atau skrining keschatan tertentu sebagaimana dimaksud pada ayat (8) ditetapkan oleh Menteri.\n(10) Peningkatan kesehatan bagi Peserta pendcrita penyakit kronis sebagaimana dimaksud pada ayat (1) huruf e ditujukan kepada Peserta penderita penyakit kronis tertentu untuk mengurangi risiko akibat komplikasi penyakit yang dideritanya.\n(11) Ketentuan lebih Ianjut mengenai pelaksanaan skrining riwayat keschatan dan pelayanan penapisan atau skrining kesehatan tertentu serta peningkatan kesehatan bagi Peserta penderita penyakit kronis sebagaimana dimaksud pada ayat (7), ayat (8), dan ayat (10) diatur dengan Peraturan BPJS Kesehatan sctelah berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 49 Menteri dapat menetapkan pelayanan keschatan lain yang dijamin berdasarkan penilaian teknologi kesehatan dengan memperhitungkan kecukupan Iuran sctclah berkoordinasi dengan menteri yang menyelenggarakan urusan pemerintahan di bidang keuangan.\nSOSP BOG"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 50 Manfaat nonmedis scbagaimana dimaksud dalam Pasal 46 ayat (4) berupa akomodasi layanan rawat inap sebagai berikut:\na. ruang perawatan kelas III bagi:\n1. Peserta PBI Jaminan Keschatan serta penduduk yang didaftarkan oleh Pemcrintah Daerah;\n2. Peserta PBPU dan Peserta BP yang membayar Iuran untuk Manfaat pelayanan di ruang perawatan kelas III; dan\n3. Pescrta PPU yang mengalami PHK beserta keluarganya.\nb. ruang Perawatan kclas II bagi:\ni. PNS dan penerima pensiun PNS golongan ruang I dan golongan ruang II beserta anggota keluarganya;\n2. Prajurit dan penerima pensiun Prajurit yang setara PNS golongan ruang I dan golongan ruang II beserta anggota kcluarganya;\n3. Anggota Polri dan penerima pensiun Anggota Polri yang setara PNS golongan ruang I dan golongan ruang II beserta anggota keluarganya;\n4. Peserta PPU sclain angka 1 sampai dengan angka 3, kepala desa dan perangkat desa, dan Pckcrja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h, dengan Gaji atau Upah sampai dengan Rp4.000.000,00 (empat juta rupiah); dan\n5. Peserta PBPU dan Pcscrta BP yang membayar luran untuk Manfaat pelayanan di ruang perawatan kelas II.\nc. ruang perawatan kelas I bagi:\n1. Pejabat Negara dan anggota keluarganya;\n2. Pimpinan dan anggota Dewan Perwakilan Rakyat Daerah beserta anggota keluarganya;\n3. PNS dan penerima pensiun PNS golongan ruang III dan golongan ruang IV beserta anggota keluarganya;\n4. Prajurit dan penerima pensiun Prajurit yang setara PNS golongan ruang III dan golongan ruang IV beserta anggota keluarganya;\n5. Anggota Polri dan penerima pensiun Anggota Polri yang setara PNS golongan ruang III dan golongan ruang IV beserta anggota keluarganya;\n6. Veteran dan Perintis Kemerdekaan beserta anggota keluarganya;\n7. janda, duda, atau anak yatim dan/atau  piatu dari Veteran atau Perintis Kemerdekaan;\n8. Peserta PPU selain angka 1 sampai dengan angka 5, kepala desa dan perangkat desa, dan Pekerja/pegawai sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h, dengan Gaji atau Upah lebih dari Rp4.000.000,00 (empat juta rupiah);\ndan\n9. Peserta PBPU dan Peserta BP yang membayar Iuran untuk Manfaat pelayanan di ruang perawatan kelas i."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 51 (1) Peserta dapat meningkatkan perawatan yang lebih tinggi dari haknya termasuk rawat jalan eksekutif dengan mengikuti asuransi kesehatan tambahan atau membayar selisih antara biaya yang dijamin oleh BPJS Kesehatan dengan biaya yang harus dibayar akibat peningkatan pelayanan.\n(2) Selisih...\n:\n(2) Selisih antara biaya yang dijamin oleh BPJS Kesehatan dengan biaya akibat peningkatan pelayanan dapat dibayar oleh:\na. Peserta yang bersangkutan;\nb. Pemberi Kerja; atau\nc. asuransi kesehatan tambahan.\n(3) Ketentuan sebagaimana dimaksud pada ayat (1) dikecualikan bagi:\na. PBI Jaminan Kesehatan;\nb. Pescrta yang didaftarkan oleh Pcmerintah Daerah sebagaimana dimaksud dalam Pasal 12;\ndan\nc. Peserta PPU yang mengalami PHK dan anggota keluarganya."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kedua Manfaat yang Tidak Dijamin"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 52 (1) Pelayanan kesehatan yang tidak dijamin meliputi:\na. pelayanan keschatan yang tidak sesuai dengan ketentuan peraturan perundang-undangan;\nb. pelayanan kesehatan yang dilakukan di Fasilitas Kesehatan yang tidak bekerja sama dengan BPJS Kesehatan, kecuali dalam keadaan darurat;\nc. pelayanan keschatan terhadap pcnyakit atau cedera akibat Kecelakaan Kerja atau hubungan kerja yang tclah dijamin oleh program jaminan Kecelakaan Kerja atau menjadi tanggungan Pemberi Kerja;\nH局\nd. pelayanan kesehatan yang dijamin oleh program jaminan kecelakaan lalu lintas yang bersifat wajib sampai nilai yang ditanggung oleh program jaminan kecelakaan lalu lintas sesuai hak kelas rawat Peserta;\ne. pelayanan kesehatan yang dilakukan di luar negeri;\nf. pelayanan kesehatan untuk tujuan estetik;\ng. pelayanan untuk mengatasi infertilitas;\nh. pelayanan meratakan gigi atau ortodonsi;\ni. gangguan kesehatan/penyakit akibat ketergantungan obat dan/atau  alkohol;\nj. gangguan keschatan akibat sengaja menyakiti diri sendiri atau akibat melakukan hobi yang membahayakan diri sendiri;\nk. pengobatan komplementer, alternatif, dan tradisional, yang belum dinyatakan efektif berdasarkan penilaian teknologi kesehatan;\nl. pengobatan dan tindakan medis yang dikategorikan s sebagaipercobaan atau eksperimen;\nm. alat dan obat kontrasepsi, kosmetik;\nn. perbekalan kesehatan rumah tangga;\no. pelayanan kesehatan akibat bencana pada masa tanggap darurat, kejadian luar biasa/wabah;\np. pelayanan kesehatan pada kejadian tak diharapkan yang dapat dicegah;\nq. pelayanan kesehatan yang diselenggarakan dalam rangka bakti sosial;\nr. pclayanan kesehatan akibat tindak pidana penganiayaan, kekerasan seksual, korban terorisme, dan tindak pidana perdagangan orang sesuai dengan ketentuan peraturan pcrundang-undangan;\ns. pelayanan keschatan tertentu yang berkaitan dengan Kementerian Pertahanan, Tentara Nasional Indonesia, dan Kepolisian Negara Republik Indonesia;\nt. pelayanan lainnya yang tidak ada hubungan dengan Manfaat Jaminan Kesehatan yang diberikan; atau\nu. pelayanan yang sudah ditanggung dalam program lain.\n(2) Pelayanan keschatan yang tidak sesuai dengan ketentuan peraturan perundang-undangan sebagaimana dimaksud pada ayat (1) huruf a meliputi rujukan atas permintaan sendiri dan pelayanan keschatan lain yang tidak sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Gangguan kesehatan akibat sengaja menyakiti diri sendiri atau akibat melakukan hobi yang membahayakan diri scndiri scbagaimana dimaksud pada ayat (1) huruf j, pengobatan dan tindakan medis yang dikategorikan sebagai percobaan atau eksperimen sebagaimana dimaksud pada ayat (1) huruf 1, dan kejadian tak diharapkan yang dapat dicegah sebagaimana dimaksud pada ayat (1) huruf p ditetapkan oleh Menteri."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Ketiga Koordinasi Antar Penyclenggara Jaminan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 53 (1) BPJS Kcsehatan dapat berkoordinasi dengan penyelenggara jaminan lainnya yang memberikan Manfaat pelayanan kesehatan.\n(2) Penyelenggara jaminan lainnya scbagaimana dimaksud pada ayat (1) meliputi:\na. Badan L Penyelenggara à Jaminan Sosial Ketenagakerjaan, PT. Dana Tabungan dan Asuransi Pegawai Negeri (Persero), dan PT.\nAsuransi Sosial Angkatan Bersenjata Republik Indonesia (Persero) untuk program jaminan Kecelakaan Kerja dan penyakit akibat kerja;\nb. PT. Jasa Raharja (Pcrsero) untuk program jaminan kecclakaan lalu lintas; atau\nc. penyelenggara jaminan lain yang membcrikan Manfaat pelayanan kesehatan.\n(3) Dalam hal BPJS Kesehatan membayarkan terlebih dahulu biaya pelayanan kesehatan yang seharusnya dijamin oleh penyclenggara jaminan lainnya sebagaimana dimaksud pada ayat (2) maka penyelenggara jaminan lainnya wajib membayar biaya pelayanan kesehatan kepada BPJS Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 54 Ketentuan lebih lanjut mengenai koordinasi antar penyclenggara jaminan diatur dcngan Peraturan Menteri yang menyelenggarakan urusan pemerintahan di bidang keuangan."
    },
    {
      "tipe": "BAB",
      "label": "BAB V",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB V PENYELENGGARAAN PELAYANAN KESEHATAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB V",
      "teks": "Bagian Kesatu Prosedur Pelayanan Keschatan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 55 (1) Pelayanan kesehatan bagi Peserta dilaksanakan secara berjenjang sesuai kebutuhan medis dan kompetensi Fasilitas Kesehatan dimulai dari FKTP Peserta a terdaftar,kccuali dalam keadaan kegawatdaruratan medis.\n(2) Pclayanan kesehatan tingkat pertama bagi Peserta dilaksanakan di FKTP tempat Peserta terdaftar, kecuali bagi Peserta yang:\na. berada di luar wilayah FKTP tempat Peserta terdaftar; atau\nb. dalam keadaan kegawatdaruratan medis.\n(3) Pescrta yang berada di luar wilayah FKTP tempat Pescrta terdaftar sebagaimana dimaksud pada ayat (2) huruf a dapat mengakses pelayanan rawat jalan tingkat pertama pada FKTP lain untuk paling banyak 3 (tiga) kali kunjungan dalam waktu paling lama 1 (satu) bulan di FKTP yang sama.\n(4) Dalam hal Peserta memerlukan pelayanan kesehatan tingkat lanjutan, FKTP wajib merujuk ke FKRTL scsuai dengan kasus dan kompetensi Fasilitas Kesehatan serta sistem rujukan.\n(5) Pelayanan yang diberikan kepada Peserta yang dirujuk kc FKRTL sebagaimana dimaksud pada ayat (4) dilakukan paling lama 3 (tiga) bulan.\n(6) FKRTL...\nar (6) FKRTL yang melakukan pelayanan sebagaimana dimaksud pada ayat (5) wajib melakukan rujuk balik ke FKTP dimana Peserta terdaftar.\n(7) Ketentuan sebagaimana dimaksud pada ayat (5) dikecualikan untuk kasus tertentu.\n(8) Ketentuan lebih lanjut mengenai pelayanan kesehatan tingkat pertama, pelayanan kesehatan rujukan tingkat lanjutan, dan pelayanan rujuk balik diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 56",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 56 (1) Fasilitas Keschatan wajib menjamin Peserta mendapatkan obat, alat kesehatan, dan bahan medis habis pakai yang dibutuhkan scsuai dengan indikasi medis.\n(2) Fasilitas Kesehatan yang tidak memiliki sarana penunjang, wajib membangun jejaring dengan Fasilitas Kesehatan penunjang untuk menjamin ketersediaan obat, bahan medis habis pakai, dan pemeriksaan penunjang yang dibutuhkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 57",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 57 (1) BPJS Kesehatan dapat mengcmbangkan sistem pelayanan kesehatan.\n(2) Pengembangan sistcmpclayanan kesehatan scbagaimana dimaksud pada ayat (1) disampaikan kepada Menteri.\n(3) Menteri menetapkan sistem pelayanan kesehatan sebagaimana dimaksud pada ayat (2)."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB V",
      "teks": "Bagian Kedua Pelayanan Obat, Alat Kesehatan, dan Bahan Mcdis Habis Pakai"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 58",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 58 (1) Pemerintah Pusat, Pemerintah Daerah, dan Fasilitas Kesehatan bertanggung jawab atas keterscdiaan obat, alat kesehatan, dan bahan medis habis pakai dalam penyelenggaraan program Jaminan Kesehatan sesuai dengan kewenangannya.\n(2) Obat, alat kesehatan, dan bahan medis habis pakai yang digunakan dalam program pemerintah selain program Jaminan Kesehatan disediakan oleh Pemerintah Pusat dan/atau  Pemerintah Daerah sesuai dengan ketentuan peraturan perundang- undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 59",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 59 (1) Pelayanan obat, alat kesehatan, dan bahan medis habis pakai untuk Peserta Jaminan Kesehatan pada Fasilitas Kesehatan berpcdoman pada daftar obat, alat keschatan, dan bahan medis habis pakai yang ditetapkan oleh Menteri.\n(2) Menteri dalam menetapkan daftar obat, alat kesehatan, dan bahan medis habis pakai sebagaimana dimaksud pada ayat (1) membcntuk komite nasional.\n(3) Komite nasional sebagaimana dimaksud pada ayat (2) terdiri atas unsur Kementerian Kesehatan, Badan Pcngawas Obat dan Makanan, Badan Kepcndudukan dan Keluarga Berencana Nasional, BPJS Kesehatan, organisasi profesi, perguruan tinggi, dan tenaga ahli.\n(4) Daftar...\nP X (4) Daftar obat, alat keschatan, dan bahan medis habis pakai scbagaimana dimaksud pada ayat (1) dituangkan dalam formularium nasional atau kompendium alat kesehatan.\n(5) Komite nasional dalam menyusun formularium nasional dan kompendium alat keschatan harus mengutamakan obat, alat keschatan, dan bahan medis habis pakai produksi dalam negeri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 60",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 60 (1) Pengadaan obat, alat kesehatan, dan/atau  bahan medis habis pakai oleh Fasilitas Kesehatan milik pemerintah maupun swasta untuk program Jaminan Kesehatan dilakukanmelalui e-purchasing berdasarkan katalog elektronik.\n(2) Dalam hal pengadaan obat, alat kesehatan, dan/atau  bahan medis habis pakai bclum dapat dilakukan melalui e-purchasing sebagaimana dimaksud pada ayat (1) maka pengadaan dapat dilakukan secara manual berdasarkan katalog elektronik.\n(3) Dalam hal obat, alat kesehatan, dan/atau  bahan medis habis pakai yang dibutuhkan oleh Fasilitas Kesehatan tidak terdapat dalam katalog elektronik maka Fasilitas Kesehatan dalam mengadakan obat, alat kesehatan, dan/atau  bahan medis habis pakai tetap mengacu pada formularium nasional atau kompendium alat kesehatan.\n(4) Dalam...\n(4) Dalam hal obat, alat kesehatan, dan/atau  bahan medis habis pakai yang dibutuhkan tidak terdapat dalam formularium nasional dan kompendium alat kesehatan maka Fasilitas Kesehatan dapat mengadakan obat, alat kesehatan, dan/atau  bahan medis habis pakai atas persctujuan kepala atau dircktur rumah sakit.\n(5) Dalam hal obat, alat kesehatan, dan/atau  bahan medis habis pakai diklaim terscndiri oleh Fasilitas Kesehatan kcpada BPJS Kesehatan maka harga berpedoman pada katalog elektronik atau harga yang ditetapkan oleh Menteri.\n(6) Dalam hal terjadi kegagalan pengadaan obat dengan katalog clektronik schingga terjadi kekosongan obat maka Fasilitas Kesehatan dapat mengadakan obat dengan zat aktif yang sama sesuai dengan ketentuan peraturan perundang-undangan.\n(7) Pcmbayaran obat sebagaimana dimaksud pada ayat (6) yang dapat diklaim tersendiri oleh Fasilitas Kesehatan kepada BPJS Kesehatan, berpedoman pada harga katalog elektronik atau harga yang ditetapkan oleh Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 61",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 61 Dalam hal terjadi permasalahan pengadaan obat, alat kesehatan, dan/atau  bahan medis habis pakai yang dapat berpotcnsi terjadinya kekosongan obat maka Pemerintah Pusat, Pemerintah Daerah, atau Fasilitas Keschatan mclakukan upaya penyelesaian sesuai dengan permasalahan dan kewenangannya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 62",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 62 Fasilitas Keschatan dalam membcrikan pelayanan keschatanuntuk program Jaminan Keschatan mengutamakan penggunaan alat kesehatan produksi dalam negeri."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB V",
      "teks": "Bagian Ketiga Pelayanan dalam Keadaan Gawat Darurat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 63",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 63 (1) Peserta yang memerlukan pclayanan gawat darurat dapat langsung memperoleh pelayanan di setiap Fasilitas Kesehatan baik yang bekcrja sama maupun yang tidak bckerja sama dengan BPJS Kesehatan.\n(2) Kritcria gawat darurat sebagaimana dimaksud pada ayat (1) yaitu:\na. mengancam nyawa, membahayakan diri dan orang lain/lingkungan;\nb. adanya gangguan pada jalan nafas, pernafasan, dan sirkulasi;\nc. adanya penurunan kesadaran;\nd. adanya gangguan hemodinamik; dan/atau\ne. memerlukan tindakan segera.\n(3) Menteri dapat menetapkan kriteria gawat darurat selain scbagaimana dimaksud pada ayat (2).\n(4) Dokter Penanggung Jawab Pasien berwenang menetapkan terpenuhinya kriteria gawat darurat sebagaimana dimaksud pada ayat (2).\n(5) Dalam...\n(5) Dalam hal Peserta memperoleh pclayanan gawat darurat di Fasilitas Kesehatan yang tidak bekerja sama dengan BPJS Keschatan maka pasien harus segera dirujuk ke Fasilitas Kesehatan yang bekerja sama dengan BPJS Kesehatan sctclah keadaan gawat daruratnya teratasi dan pasien dalam kondisi dapat dipindahkan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kecmpat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB V",
      "teks": "Bagian Kecmpat Pelayanan dalam Keadaan Tidak Ada Fasilitas Kesehatan yang Memenuhi Syarat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 64",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kecmpat",
      "teks": "Pasal 64 (1) Dalam hal di suatu Daerah belum tersedia Fasilitas Keschatan yang memenuhi syarat guna mcmcnuhi kebutuhan medis sejumlah Peserta, BPJS Kesehatan wajib memberikan kompensasi.\n(2) Kompensasi scbagaimana dimaksud pada ayat (1) dapat berupa penggantian uang tunai.\n(3) Sclain kompensasi scbagaimana dimaksud pada ayat (2), BPJS Kesehatan dapat bekerja sama dengan pihak lain untuk menyediakan Fasilitas Kesehatan.\n(4) Ketentuan lebih lanjut mengenai pemberian kompensasi sebagaimana dimaksud pada ayat (1) sampai dengan ayat (3) diatur dengan Peraturan Menteri.\n厂 i PRESDEN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 65",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kecmpat",
      "teks": "Pasal 65 (1) Dalam rangka pemberian kompensasi dan pemenuhan pelayanan pada Daerah belum tersedia Fasilitas Kesehatan yang memenuhi syarat, BPJS Kesehatan dapat mengembangkan pola pembiayaan pelayanan kesehatan.\n(2) Pengembangan pola pembiayaan pelayanan kesehatan sebagaimana dimaksud pada ayat (1) meliputi pola pembiayaan untuk pelayanan kesehatan bergerak, pelayanan kesehatan berbasis telemedicine, dan/atau  pengembangan pelayanan kesehatan lain yang ditetapkan oleh Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB VI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VI FASILITAS KESEHATAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VI",
      "teks": "Bagian Kesatu Penyelenggara Pelayanan Kesehatan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 66",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 66 (1) Pemerintah Pusat dan Pemerintah Daerah bertanggung jawab atas ketersediaan Fasilitas Kesehatan sebagaipenyelenggara à pelayanan kesehatan untuk pelaksanaan program Jaminan Kesehatan.\n(2) Pemerintah Pusat dan Pemerintah Daerah harus memberikan kesempatan kepada swasta untuk berperan serta memenuhi ketersediaan Fasilitas Kesehatan danpenyelenggaraan pelayanan kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 67",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 67 (1) Penyclenggara pelayanan kesehatan untuk pelaksanaan program Jaminan Kesehatan meliputi semua Fasilitas Kesehatan yang menjalin kerja sama dengan BPJS Kesehatan.\n(2) Fasilitas Kesehatan milik Pemerintah Pusat dan Pemerintah Daerah yang memenuhi persyaratan wajib bekerja sama dengan BPJS Kesehatan.\n(3) Fasilitas Kesehatan milik swasta yang memenuhi persyaratan dapat menjalin kcrja sama dengan BPJS Keschatan.\n(4) Kerja sama sebagaimana dimaksud pada ayat (2) dan ayat (3) dilaksanakan dengan membuat perjanjian tertulis.\n(5) Dalam rangka pelaksanaan kerja sama dengan Fasilitas Kesehatan, BPJS Keschatan berkoordinasi dengan dinas kesehatan kabupaten/kota.\n(6) Ketentuan mengenai persyaratan sebagaimana dimaksud pada ayat (2) dan ayat (3) diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 68",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 68 (1) Fasilitas Kesehatan yang bekerja sama dengan BPJS Kesehatan L dilarang menarik biaya pclayanan kesehatan kcpada Peserta selama Peserta mendapatkan Manfaat pelayanan kesehatan sesuai dengan haknya.\n(2) Dalam hal pembcrian pelayanan gawat darurat, Fasilitas Kesehatan baik yang bckerja sama maupun yang tidak bckerja sama dengan BPJS Kesehatan dilarang menarik biaya pelayanan kesehatan kepada Peserta.\n(3) Biaya...\n(3) Biaya pelayanan kesehatan sebagaimana dimaksud pada ayat (1) dan ayat (2) ditanggung oleh BPJS Kesehatan sesuai dengan ketcntuan peraturan perundang-undangan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VI",
      "teks": "Bagian Kedua Standar Tarif dan Mekanisme Pembayaran ke Fasilitas Kesehatan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 69",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 69 (1) Standar tarif pelayanan kesehatan di FKTP dan FKRTL ditetapkan oleh Menteri.\n(2) Menteri menctapkan standar tarif scbagaimana dimaksud pada ayat (1) setelah:\na. mendapatkan masukan dari BPJS Kesehatan bersama dengan asosiasi fasilitas keschatan;\ndan\nb. mempertimbangkanketerscdiaan Fasilitas Kesehatan, indeks harga konsumen, dan indcks kemahalan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 70",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 70 Standar tarif yang ditetapkan oleh Menteri sebagaimana dimaksud dalam Pasal 69 digunakan oleh BPJS Keschatan scbagai bcsaran pembayaran kc Fasilitas Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 71",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 71 (1) BPJS Kesehatan melakukan pembayaran kepada:\na. FKTP secara praupaya atau kapitasi berdasarkan jumlah Peserta yang terdaftar di FKTP; dan\nb. FKRTL secara Indonesian Case Based Groups.\n(2) Dalam...\nX (2) Dalam kondisi tertentu dan/atau  di suatu Daerah FKTP tidak memungkinkan pembayaran secara praupaya atau kapitasi, BPJS Kesehatan dapat mengembangkan sistem pembayaran lain.\n(3) BPJS Kesehatan dapat mengembangkan sistem pembayaran di FKRTL yang lebih berhasil guna dengan tetap mengacu pada Indonesian Case Based Groups.\n(4) Ketentuan lebih lanjut mengenai pengembangan sistem pembayaran sebagaimana dimaksud pada ayat (2) dan ayat (3) diatur dengan Peraturan BPJS Kesehatan setelah mendapat persetujuan dari Menteri.\n(5) Persctujuan sebagaimana dimaksud pada ayat (4) diberikan paling lambat 30 (tiga puluh) hari sejak tanggal penyampaian dari BPJS Kesehatan kepada Menteri.\n(6) Apabila dalam waktu 30 (tiga puluh) hari persetujuan sebagaimana dimaksud pada ayat (4) tidak diperoleh maka Peraturan BPJS Kesehatan mengenai pengembangan sistem pembayaran sebagaimana dimaksud pada ayat (2) dan ayat (3) berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 72",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 72 (1) Cara pembayaran dengan Indonesian Case Based Groups sebagaimana dimaksud dalam Pasal 71 ayat (1) huruf b untuk FKRTL ditetapkan sesuai kelas rumah sakit.\n(2) Dalam hal ditemukan ketidaksesuaian kelas rumah sakit berdasarkan ketentuan peraturan perundang- undangan pada saat kredensial atau re-kredensial maka BPJS Kesehatan harus melaporkan kepada Menteri untuk dilakukan reviu.\n(3) Reviu...\nGOOOGOY (3) Reviu kelas rumah sakit sebagaimana dimaksud pada ayat (2) dilaksanakan paling lambat 3 (tiga) bulan dengan melibatkan unsur Kementerian Kesehatan, BPJS Kesehatan, dan asosiasi rumah sakit.\n(4) Hasil reviu kelas rumah sakit sebagaimana dimaksud pada ayat (3) dijadikan dasar penyesuaian kontrak oleh BPJS Kesehatan dengan rumah sakit."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 73",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 73 (1) Standar tarif sebagaimana dimaksud dalam"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 69",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 69 ditinjau paling cepat setiap 2 (dua) tahun sekali oleh Menteri.\n(2) Menteri dalam meninjau standar tarif sebagaimana dimaksud pada ayat (1) dilakukan dengan memperhitungkan kecukupan Iuran dan kesinambungan program yang dilakukan bersama dengan BPJS Kesehatan, Dewan Jaminan Sosial Nasional, dan menteri yang menyelenggarakan urusan pemerintahan di bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 74",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 74 Asosiasi fasilitas kesehatan sebagaimana dimaksud dalam Pasal 69 ayat (2) huruf a ditetapkan oleh Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 75",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 75 (1) BPJS Kesehatan wajib membayar kapitasi kepada FKTP paling lambat tanggal 15 setiap bulan berjalan.\n(2) FKTP mengajukan klaim nonkapitasi kepada BPJS Kesehatan secara periodik dan lengkap.\n(3) BPJS...\n(3) BPJS Keschatan wajib membayar kepada FKTP berdasarkan klaim yang diajukan scbagaimana dimaksud pada ayat (2) dan telah divcrifikasi paling lambat 15 (lima belas) hari kerja scjak berkas klaim dinyatakan lengkap.\n(4) Dalam hal pembayaran sebagaimana dimaksud pada ayat (1) dan ayat (3) jatuh pada hari libur maka pembayaran pada FKTP dilakukan pada hari kerja berikutnya.\n(5) Dalam hal BPJS Kesehatan tidak melakukan pembayaran sebagaimana dimaksud pada ayat (3), BPJS Kesehatan wajib membayar denda kepada FKTP yaitu sebesar 1% (satu persen) dari jumlah yang harus dibayarkan untuk setiap 1 (satu) bulan ketcrlambatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 76",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 76 (1) FKRTL mengajukan klaim kolektif kcpada BPJS Keschatan secara periodik dan lengkap.\n(2) BPJS Kesehatan harus mengeluarkan berita acara kelengkapan berkas klaim paling lambat 10 (sepuluh) hari sejak klaim diajukan oleh FKRTL dan diterima oleh BPJS Keschatan.\n(3) Dalam hal BPJS Kesehatan tidak mengeluarkan berita acara kelengkapan berkas klaim dalam waktu 10 (sepuluh) hari sebagaimana dimaksud pada ayat (2) maka berkas klaim dinyatakan lengkap.\n(4) BPJS Kesehatan wajib melakukan pembayaran kcpada FKRTL berdasarkan klaim yang diajukan dan telah:\na. diverifikasi sebagaimana dimaksud pada ayat (2) paling lambat 15 (lima belas) hari sejak diterbitkannya berita acara kelengkapan berkas klaim; atau\nb. mcmenuhi ketentuan sebagaimana dimaksud pada ayat (3) paling lambat 15 (lima belas) hari sejak terpenuhinya ketcntuan scbagaimana dimaksud pada ayat (3).\n(5) Dalam hal pembayaran kepada FKRTL sebagaimana dimaksud pada ayat (4) jatuh pada hari libur maka pembayaran pada FKRTL dilakukan pada hari kerja berikutnya.\n(6) Dalam hal BPJS Kesehatan tidak melakukan pcmbayaran sebagaimana dimaksud pada ayat (4), BPJS Kesehatan wajib membayar denda kepada FKRTL yaitu sebesar 1% (satu persen) dari jumlah yang harus dibayarkan untuk setiap 1 (satu) bulan keterlambatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 77",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 77 (1) Pengajuan klaim pembiayaan pelayanan kesehatan oleh Fasilitas Kesehatan kepada BPJS Kesehatan diberikan jangka waktu paling lambat 6 (cnam) bulan sejak pelayanan keschatan selesai dibcrikan.\n(2) Ketentuan sebagaimana dimaksud pada ayat (1) dikccualikan bagi pelayanan keschatan yang diberikan oleh Fasilitas Kesehatan sebelum berlakunya Peraturan Presiden ini.\n(3) Dalam hal jangka waktu pengajuan klaim sebagaimana dimaksud pada ayat (1) terlampaui, klaim tidak dapat diajukan kembali.\n(4) Dalam hal terdapat pembayaran atas pelayanan kesehatan yang disebabkan karcna pcnyalahgunaan pelayanan keschatan yang dilakukan oleh Fasilitas Keschatan, Fasilitas Keschatan harus mengembalikan biaya yang sudah dibayarkan setclah dilakukan verifikasi pascaklaim kepada BPJS Kesehatan.\n(5) Dalam...\n人 (5) Dalam hal terjadi kekurangan pembayaran atas biaya pelayanan keschatan yang dibayarkan oleh BPJS Kesehatan, BPJS Kesehatanharus membayarkan kekurangan atas biaya pelayanan kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 78",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 78 (1) Untuk kepentingan pembayaran biaya pelayanan kesehatan, BPJS Kesehatan dapat meminta rekam medis Peserta berupa ringkasan rekam medis kepada Fasilitas Kesehatan sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Ringkasan rekam medis sebagaimana dimaksud pada ayat (1) paling sedikit memuat identitas pasien, diagnosis, dan riwayat pemeriksaan dan pengobatan yang ditagihkan biayanya.\n(3) Dalam hal dibutuhkan untuk kepentingan audit administrasi klaim, BPJS Kesehatan dapat melihat rekam medis Peserta dari Fasilitas Kesehatan dengan tetap menjaga kerahasiaan isi rekam medis sesuai dengan ketentuan peraturan perundang- undangan.\n(4) BPJS Kesehatan dalam melihat rekam medis Peserta sebagaimana dimaksud pada ayat (3) harus melalui tim yang ditunjuk oleh Fasilitas Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 79",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 79 (1) Pelayanan gawat darurat yang dilakukan oleh Fasilitas Kesehatan yang tidak menjalin kerja sama dengan BPJS Kesehatan dibayar dengan penggantian biaya.\n(2) Biaya...\n(2) Biaya sebagaimana dimaksud pada ayat (1) ditagihkan langsung oleh Fasilitas Kesehatan kepada BPJS Kesehatan.\n(3) BPJS Kesehatan memberikan pembayaran kepada Fasilitas Kesehatan sebagaimana dimaksud pada ayat (2) setara dengan tarif yang berlaku di wilayah tersebut.\n(4) Ketentuan lebih lanjut mengenai prosedur penggantian biaya pelayanan gawat darurat dan pelayanan ambulans diatur dengan Peraturan BPJS Kesehatan setelah berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 80",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 80 (1) Untuk jenis pelayanan tertentu yang dapat menimbulkan penyalahgunaan pelayanan, Peserta dikenai Urun Biaya.\n(2) Ketentuan sebagaimana dimaksud pada ayat (1) dikecualikan bagi Peserta PBI Jaminan Kesehatan dan penduduk yang didaftarkan oleh Pemerintah Daerah.\n(3) .\nPelayanan yang dapat menimbulkan penyalahgunaan pelayanan sebagaimana dimaksud pada ayat (1) merupakan pelayanan yang dipengaruhi selera dan perilaku Peserta.\n(4) Jenis pelayanan sebagaimana dimaksud pada ayat (1) dan ayat (3) ditetapkan oleh Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 81",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 81 (1) Urun Biaya terhadap jenis pelayanan yang dapat menimbulkan penyalahgunaan pelayanan sebagaimana dimaksud dalam Pasal 80 yaitu sebesar:\na. nilai nominal tertentu setiap kali melakukan kunjungan untuk rawat jalan atau nilai nominal maksimal atas biaya pclayanan kesehatan untuk kurun waktu tertentu; dan\nb. 10% (sepuluh persen) atau paling tinggi dengan nominal tertentu untuk rawat inap dari biaya pelayanan, yang dibayarkan kepada Fasilitas Kesehatan saat mendapatkan pelayanan.\n(2) BPJS Kesehataan membayarkan biaya pelayanan kesehatan kepada Fasilitas Kesehatan setelah dikurangi besaran Urun Biaya sebagaimana dimaksud pada ayat (1).\n(3) Fasilitas Kcsehatan harus menginformasikan pelayanan yang dikenai Urun Biaya kepada Peserta scbelum mclaksanakan pemberian pelayanan yang dapat menimbulkan penyalahgunaan pelayanan.\n(4) Ketentuan lebih lanjut mengenai penetapan pelayanan yang dapat menimbulkan penyalahgunaan pelayanan, besaran dan tata cara pengenaan Urun Biaya diatur dcngan Peraturan Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB VII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VII KENDALI MUTU DAN KENDALI BIAYA PENYELENGGARAAN JAMINAN KESEHATAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 82",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 82 Dalam rangka kendali mutu dan kendali biaya penyelenggaraan Program Jaminan Kesehatan, Menteri menetapkan kcbijakan penyelenggaraan:\na. penilaian teknologi kesehatan;\nb. pertimbangan klinis;\nc. penghitungan standar tarif; dan\nd. monitoring dan evaluasi penyelenggaraan pelayanan Jaminan Kesehatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 83",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 83 (1) Dalam menctapkan kebijakan sebagaimana dimaksud dalam Pasal 82, Menteri dan menteri terkait serta Dewan Jaminan Sosial Nasional berwenang mengakscs dan meminta data dan informasi dari BPJS Keschatan.\n(2) BPJS Kesehatan wajib memberikan akses dan menyediakan data dan informasi sebagaimana dimaksud pada ayat (1) kepada Menteri dan menteri terkait serta Dewan Jaminan Sosial Nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 84",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 84 (1) Dalam rangka pengambilan kebijakan di bidang kesehatan di Daerah, BPJS Kesehatan wajib membcrikan data dan informasi kepada Kepala Dinas Kesehatan kabupaten/kota dan Kepala Dinas Kesehatan provinsi setempat secara berkala setiap 3 (tiga) bulan.\n(2) Data dan informasi sebagaimana dimaksud pada ayat (1) meliputi:\na. jumlah Fasilitas Kesehatan yang bekerja sama dengan BPJS Keschatan;\nb. kepesertaan;\nc. jumlah kunjungan ke Fasilitas Kesehatan;\nd. jenis penyakit; dan\ne. jumlah pembayaran dan/atau  klaim."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 85",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 85 (1) Penilaian teknologi kesehatan sebagaimana dimaksud dalam Pasal 82 huruf a dilakukan untuk menilai efektifitas dan efisiensi penggunaan teknologi atau produk teknologi berupa metode, obat, atau alat kesehatan dalam pelayanan kesehatan program Jaminan Kesehatan.\n(2) Penggunaan hasil penilaian teknologi kesehatan sebagaimana dimaksud pada ayat (1) ditetapkan oleh Menteri setelah mendapat rekomendasi dari Komite Penilaian Teknologi Kesehatan.\n(3) Komite Penilaian Teknologi Kesehatan sebagaimana dimaksud pada ayat (2) dibentuk oleh Menteri.\n(4) Ketentuan lebih lanjut mengenai penilaian teknologi kesehatan sebagaimana dimaksud pada ayat (1) diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 86",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 86 (1) Dalam rangka kendali mutu dan kendali biaya penyelenggaraan program Jaminan Keschatan, BPJS Kesehatan mengembangkan teknis operasionalisasi sistem pelayanan kesehatan, sistem kendali mutu pelayanan, dan sistem pembayaran pelayanan kesehatan untuk meningkatkan efisiensi dan efektivitas dalam penyelenggaraan program Jaminan Kesehatan.\n(2) Pengembangan teknis operasionalisasi sebagaimana dimaksud pada ayat (1) dilakukan melalui:\na. kredensial Fasilitas Kesehatan;\nb. survei kepuasan Pescrta; dan\nc. pemantauan dan pengawasan pemanfaatan.\n(3) Dalam...\n(3) Dalam melaksanakan pengembangan scbagaimana dimaksud pada ayat (1), BPJS Kesehatan berkoordinasi dengan kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 87",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 87 (1) Fasilitas Kesehatan dalam memberikan pelayanan kesehatan kepada Peserta Jaminan Kesehatan harus menerapkan kendali mutu dan kendali biaya dengan tetap memperhatikan keselamatan dan keamanan pasicn serta mutu pclayanan.\n(2) Pencrapan kendali mutu dan kendali biaya sebagaimana dimaksud pada ayat (1) dilakukan secara menyeluruh meliputi pemenuhan standar mutu Fasilitas Kesehatan, memastikan proses pelayanan kesehatan berjalan sesuai standar yang ditetapkan, dan pemantauan terhadap luaran keschatan Peserta, serta cfisiensi biaya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 88",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 88 Ketentuan lebih lanjut mengenai kendali mutu dan kendali biaya pclayanan Jaminan Kesehatan diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB VIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIII PELAYANAN INFORMASI DAN PENANGANAN PENGADUAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 89",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 89 (1) Peserta berhak untuk mendapatkan informasi mengenai penyelenggaraan Jaminan Keschatan secara menyeluruh menyangkut hak dan kewajiban Pcserta/Fasilitas Keschatan/BPJS Keschatan, dan mekanisme pelayanan di Fasilitas Kesehatan dan BPJS Kesehatan.\n(2) Peserta...\n(2) Pescrta berhak untuk mengadukan ketidakpuasan terhadap pelayanan Jaminan Kesehatan yang diberikan oleh Fasilitas Kesehatan, dan terhadap pelayanan BPJS Kesehatan kepada unit pengaduan, baik yang terdapat di Fasilitas Keschatan, BPJS Kesehatan, dinas kesehatan, maupun Kementerian Kesehatan.\n(3) Fasilitas Kesehatan dan BPJS Keschatan wajib menyediakan unit pengaduan yang dikelola secara bersama-sama atau sendiri-sendiri oleh Fasilitas Kesehatan dan BPJS Keschatan.\n(4) Unit pengaduan sebagaimana dimaksud pada ayat (2) dapat berupa:\na. unit pengendali mutu pelayanan dan penanganan pengaduan untuk BPJS Keschatan;\nb. unit pengaduan masyarakat terpadu/tim monitoring dan evaluasi Jaminan Keschatan untuk dinas kesehatan dan Kementerian Keschatan; dan/atau\nc. unit pengaduan masyarakat untuk Fasilitas Kesehatan.\n(5) Pengaduan kctidakpuasan yang disampaikan Peserta harus memperolch penanganan dan penyelesaian secara memadai dan dalam waktu yang singkat scrta diberikan umpan balik ke pihak yang menyampaikan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 90",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 90 Fasilitas Kesehatan dalam menyelenggarakan pelayanan kesehatan wajib menginformasikan ketersediaan ruang rawat inap kepada masyarakat."
    },
    {
      "tipe": "BAB",
      "label": "BAB IX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IX PENYELESAIAN SENGKETA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 91",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 91 (1) Dalam hal terjadi sengketa terkait penyelenggaraan Jaminan Kesehatan antara:\na. Peserta dengan Fasilitas Kesehatan;\nb. Peserta dengan BPJS Kesehatan;\nc. BPJS Keschatan dengan Fasilitas Keschatan;\natau\nd. BPJS Kesehatan dengan asosiasi fasilitas kcsehatan, penyelesaiannya dilakukan secara musyawarah.\n(2) Scngkcta sebagaimana dimaksud pada ayat (1) termasuk pengaduan yang belum dapat disclcsaikan oleh unit pengaduan scbagaimana dimaksud dalam"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 89",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 89.\n(3) Penyelesaian sengketa secara musyawarah sebagaimana dimaksud pada ayat (1) melibatkan Kepala Dinas Keschatan provinsi, Kepala Dinas Kesehatan kabupaten/kota, dan/atau  Badan Pengawas Rumah Sakit.\n(4) Dalam hal sengketa tidak dapat diselesaikan secara musyawarah, sengketa diselesaikan melalui Dewan Pertimbangan Klinis, dengan cara mediasi, atau pengadilan.\n(5) Cara penyelesaian sengketa melalui mediasi atau melalui pengadilan sebagaimana dimaksud pada ayat (4) dilaksanakan sesuai dengan ketentuan peraturan perundang-undangan.\n(6) Ketentuan lebih lanjut mengenai cara penyelesaian sengketa melalui Dewan Pertimbangan Klinis diatur dengan Peraturan Menteri.\nrds"
    },
    {
      "tipe": "BAB",
      "label": "BAB X",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB X PENCEGAHAN DAN PENANGANAN KECURANGAN (FRAUD) DALAM PELAKSANAAN PROGRAM JAMINAN KESEHATAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 92",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 92 (1) Kecurangan (fraud) dapat dilakukan oleh:\nà.\nPeserta;\nb. BPJS Kesehatan;\nc. Fasilitas Kesehatan atau pemberi pelayanan kesehatan;\nd. penyedia obat dan alat kesehatan; dan\ne. pemangku kepentingan lainnya.\n(2) Kecurangan (fraud) sebagaimana dimaksud pada ayat (1) termasuk penyalahgunaan pclayanan kesehatan yang disebabkan karena perilaku pemberi pclayanan kesehatan.\n(3) BPJS Kesehatan, dinas kesehatan kabupaten/kota, dan FKRTL yang bekerja sama dengan BPJS Keschatan harus membangun sistem penccgahan Kecurangan (fraud) sebagaimana dimaksud pada ayat (1) melalui:\na. pcnyusunan kebijakan dan pedoman pencegahan Kccurangan (fraud);\nb. pengembangan budaya pencegahan Kecurangan (fraud);\nc. pengembangan pclayanan keschatan yang berorientasi kepada kendali mutu dan kendali biaya; dan\nd. pembentukan tim pencegahan Kecurangan (fraud).\n(4) Sistem...\n(4) Sistem pencegahan Kecurangan (fraud) sebagaimana dimaksud pada ayat (3) dilakukan secara sistematis, terstruktur, dan komprehensif dengan melibatkan seluruh sumber daya manusia di BPJS Kesehatan, Fasilitas Keschatan, dinas kesehatan kabupatcn/kota, dinas keschatan provinsi, Kementerian Kesehatan, dan pemangku kepentingan lainnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 93",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 93 (1) Menteri, Kepala Dinas Kesehatan provinsi, Kepala Dinas Kesehatan kabupaten/kota dapat memberikan sanksi administratif bagi setiap orang atau korporasi sebagaimana dimaksud dalam Pasal 92 ayat (1) yang melakukan Kecurangan (fraud).\n(2) Sanksi administratif sebagaimana dimaksud pada ayat (1) berupa:\na. teguran lisan;\nb. teguran tertulis; dan/atau\nc. perintahpengembalian kerugianakibat Kecurangan (fraud) pada pihak yang dirugikan.\n(3) Sclain sanksi administratif sebagaimana dimaksud pada ayat (2), terhadap petugas BPJS Kesehatan, pcmbcri pelayanan kesehatan, dan penyedia obat dan alat kesehatan dapat dikenai sanksi tambahan.\n(4) Sanksi administratif sebagaimana dimaksud pada ayat (2) tidak menghapus sanksi pidana sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 94",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 94 Untuk meningkatkan upaya pencegahan dan penanganan Kecurangan (fraud) dibentuk tim yang terdiri atas unsur Kementerian Kesehatan, kementerian/lembaga, BPJS Kesehatan, dan Komisi Pemberantasan Korupsi, serta kementerian/lembaga terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 95",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 95 Ketentuan lebih lanjut mengenai upaya pencegahan dan penanganan Kecurangan (fraud) dan pengenaan sanksi administrasi diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB XI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XI PENGAWASAN, MONITORING, DAN EVALUASI"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 96",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "teks": "Pasal 96 (1) Menteri, Kepala Dinas Kesehatan provinsi, dan Kepala Dinas Kesehatan kabupaten/kota melakukan pengawasan terhadap penyelenggaraan program Jaminan Kesehatan sesuai dengan kewenangan masing-masing.\n(2) Pelaksanaan pengawasan sebagaimana dimaksud pada ayat (1) dapat melibatkan Badan Pengawas Rumah Sakit, Dewan Pengawas Rumah Sakit, asosiasi fasilitas kesehatan, dan/atau  organisasi profesi sesuai dengan kebutuhan.\n(3) Pelaksanaan pengawasan sebagaimana dimaksud pada ayat (1) dilakukan secara terkoordinasi dengan instansi terkait sesuai dengan ketentuan peraturan perundang-undangan.\nX 一"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 97",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "teks": "Pasal 97 (1) Pengawas ketenagakerjaan pada instansi yang bertanggung jawab di bidang ketenagakerjaan melakukan pemeriksaan terhadap Pemberi Kerja yang melanggar ketentuan sebagaimana dimaksud dalam Pasal 13 yang pelaksanaannya dilakukan sesuai dengan ketentuan peraturan perundang- undangan.\n(2) BPJS Kesehatan melakukan pengawasan dan pemeriksaan atas kepatuhan Peserta dan Pemberi Kerja dalam memenuhi kewajibannya sesuai dengan ketentuan peraturan perundang-undangan.\n(3) BPJS Kesehatan dalam melakukan pengawasan dan pemeriksaan atas kepatuhan Peserta dan Pemberi Kerja dapat bekerja sama dengan pengawas ketenagakerjaan dan Jaksa Pengacara Negara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 98",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "teks": "Pasal 98 (1) Untuk kesinambungan penyelenggaraan program Jaminan Kesehatan dilakukan monitoring dan evaluasi.\n(2) Pelaksanaan monitoring dan evaluasi sebagaimana dimaksud pada ayat (1) dilaksanakan pada aspek:\na. kepesertaan;\nb. pelayanan kesehatan;\nc. Iuran;\nd. pembayaran ke Fasilitas Kesehatan;\ne. keuangan;\nf. organisasi dan kelembagaan; dan\ng. regulasi.\n(3) Monitoring..\nàás (3) Monitoring dan evaluasi sebagaimana dimaksud pada ayat (1) dilakukan oleh Kementerian Keschatan, Kementerian Kcuangan, Kementerian Sosial, Kementcrian Dalam Negeri, Kemcnterian Perencanaan Pembangunan Nasional/Badan Perencanaan Pembangunan Nasional, Badan Pcmeriksa Keuangan, Badan Pengawasan Keuangan dan Pembangunan, Dewan Jaminan Sosial Nasional, Otoritas Jasa Keuangan, dan Pemerintah Daerah sesuai kewenangan masing-masing.\n(4) Monitoring dan cvaluasi scbagaimana dimaksud pada ayat (1) dilaksanakan secara terpadu."
    },
    {
      "tipe": "BAB",
      "label": "BAB XII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XII DUKUNGAN PEMERINTAH DAERAH"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 99",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Pasal 99 (1) Pemerintah Daerah wajib mendukung penyelenggaraan program Jaminan Kesehatan.\n(2) Dukungan PemerintahDaerah sebagaimana dimaksud pada ayat (1) dilakukan melalui:\na. peningkatan pencapaiankepesertaan di wilayahnya;\nb. kepatuhan pembayaran Iuran;\nc. peningkatan pelayanan kesehatan; dan\nd. dukungan lainnya sesuai dengan ketentuan peraturan perundang-undangan dalam rangka menjamin kesinambungan program Jaminan Keschatan.\n(3) Dukungan...\n(3) Dukungan peningkatan pencapaian kepesertaan di wilayahnya sebagaimana dimaksud pada ayat (2) huruf a dilaksanakan melalui penerbitan regulasi yang mempersyaratkan kepersertaan program Jaminan Kesehatan dalam memperoleh pelayanan publik.\n(4) Dukungan kepatuhan pembayaran Juran sebagaimana dimaksud pada ayat (2) huruf b dilaksanakan melalui pelaksanaan pcmbayaran Iuran secara tepat jumlah dan tepat waktu.\n(5) Dukungan peningkatan pelayanan kesehatan scbagaimana dimaksud pada ayat (2) huruf c dilaksanakan melalui pcnyediaan Fasilitas Kesehatan, pemenuhan standar pelayanan minimal, dan peningkatan mutu layanan keschatan.\n(6) Dukungan lainnya sebagaimana dimaksud pada ayat (2) huruf d dilaksanakan melalui kontribusi dari pajak rokok bagian hak masing-masing Daerah provinsi/kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 100",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Pasal 100 (1) Besaran kontribusi sebagaimana dimaksud dalam Pasal 99 ayat (6) ditctapkan 75% (tujuh puluh lima perscn) dari 50% (lima puluh persen) realisasi penerimaan pajak rokok bagian hak masing-masing Daerah provinsi/kabupatcn/kota.\n(2) Kontribusi scbagaimana dimaksud pada ayat (1) langsung dipotong untuk dipindahbukukan ke dalam rckening BPJS Kesehatan.\n(3) Ketentuan...\n(3) Ketentuan lebih lanjut mengenai kontribusi dan mekanisme pemotongan sebagaimana dimaksud pada ayat (1) dan ayat (2) diatur dengan Peraturan Menteri yang menyelenggarakan urusan pemerintahan di bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 101",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Pasal 101 (1) Kontribusi Daerah untuk mendanai program Jaminan Kesehatan sebagaimana dimaksud dalam Pasal 99 ayat (6) dianggarkan sebagai belanja bantuan sosial fungsi kesehatan pada anggaran pendapatan dan belanja daerah provinsi/kabupaten/kota.\n(2) Perencanaan, penganggaran, dan pertanggungjawaban kontribusi Daerah sebagaimana dimaksud pada ayat (1) dilaksanakan sesuaidengan Peraturan Menteri yang menyelenggarakan urusan pemerintahan dalam negeri yang r mengatur mengenaipedoman penyusunan anggaran pendapatan dan belanja daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 102",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Pasal 102 Pemcrintah Daerah yang menyelenggarakan jaminan kesehatan Daerah wajib mengintegrasikannya ke dalam program Jaminan Kesehatan yang diselenggarakan oleh BPJS Kesehatan.\n宗RESIDEN"
    },
    {
      "tipe": "BAB",
      "label": "BAB XIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIII KETENTUAN PERALIHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 103",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "teks": "Pasal 103 Pada saat Peraturan Presiden ini mulai berlaku, ketentuan mengenai Pegawai Pemerintah Non Pegawai Negeri termasuk dalam PPU sebagaimana dimaksud dalam Pasal 4 ayat (2) huruf h sampai dengan ditetapkannya Peraturan Pemerintahmengenai Manajemen Pegawai Pemerintah dengan Perjanjian Kerja."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIV KETENTUAN PENUTUP"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 104",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 104 Ketentuan sebagaimana dimaksud dalam Pasal 16 ayat (1) dan ayat (2), Pasal 28 ayat (6), Pasal 42 ayat (1) sampai dengan ayat (6), dan Pasal 80 ayat (4) mulai berlaku setelah 3 (tiga) bulan terhitung sejak Peraturan Presiden ini diundangkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 105",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 105 Peraturan pelaksanaan dari Peraturan Presiden ini harus ditetapkan paling lama 6 (enam) bulan terhitung sejak Peraturan Presiden ini diundangkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 106",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 106 Pada saat Peraturan Presiden ini mulai berlaku, semua peraturan perundang-undangan yang merupakan peraturan pelaksanaan dari Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Kesehatan (Lembaran Negara Republik Indonesia Tahun 2013 Nomor 29) sebagaimana telah beberapa kali diubah, terakhir dengan Peraturan Presiden Nomor 28 Tahun 2016 tentang Perubahan Ketiga Atas Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Keschatan (Lembaran Negara Republik Indonesia Tahun 2016 Nomor 62), dinyatakan masih tetap berlaku scpanjang tidak bertentangan dengan ketentuan dalam Peraturan Presiden ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 107",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 107 Pada saat Peraturan Presidcn ini mulai berlaku, Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Kesehatan (Lembaran Negara Republik Indonesia Tahun 2013 Nomor 29) scbagaimana telah beberapa kali diubah, terakhir dengan Peraturan Presiden Nomor 28 Tahun 2016 tentang Pcrubahan Ketiga Atas Peraturan Presiden Nomor 12 Tahun 2013 tentang Jaminan Kesehatan (Lembaran Negara Republik Indonesia Tahun 2016 Nomor 62), dicabut dan dinyatakan tidak berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 108",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 108 Peraturan Presiden ini mulai berlaku pada tanggal diundangkan.\ndasa Agar setiap orang mengetahuinya, memerintahkan pengundangan Peraturan Presiden ini dengan penempatannya dalam Lembaran Negara Republik Indonesia.\nDitetapkan di Jakarta pada tanggal 17 September 2018 PRESIDEN REPUBLIK INDONESIA, ttd.\nJOKO WIDODO Diundangkan di Jakarta pada tanggal 18 September 2018 MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA, ttd.\nYASONNA h. LAOLY LEMBARAN NEGARA REPUBLIK INDONESIA TAHUN 2018 NOMOR 165 Salinan sesuai dengan aslinya SEKRETARIAT KABINET RI Deputi Bidang Pembangunan Manusia dan Kcbudayaan, KRETA ARI J KAB Indrijarso"
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
                $this->command->info("Data Perpres No. 82 Tahun 2018 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding Perpres No. 82 Tahun 2018 selesai!");

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

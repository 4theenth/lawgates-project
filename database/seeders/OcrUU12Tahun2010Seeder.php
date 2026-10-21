<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUU12Tahun2010Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "undang-undang-12-2010",
    "tipe_peraturan": "UU",
    "judul": "Undang-undang (UU) Nomor 12 Tahun 2010 tentang Gerakan Pramuka",
    "tahun": "2010",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "24 November 2010",
    "tanggal_pengundangan": "24 November 2010",
    "tanggal_berlaku": "24 November 2010",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "",
    "diubah_dengan": "",
    "mengubah": "",
    "sumber_dokumen": "undang-undang_nomor_12_tahun_2010_tentang_gerakan_pramuka.pdf",
    "id_dokumen": "undang-undang_nomor_12_tahun_2010_tentang_gerakan_pramuka",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 34,
    "total_chunk": 128,
    "waktu_eksekusi_detik": 62.73,
    "waktu_proses": "2026-09-21 17:46:55",
    "subjek": "Pemuda dan Olah Raga"
  },
  "relasi": {
    "dicabut_oleh": [],
    "mencabut": [],
    "diubah_oleh": [],
    "mengubah": [],
    "mencabut_sebagian": [],
    "mengingat": [
      {
        "standard_id": "uud-1945",
        "judul_referensi": "Undang-Undang Dasar 1945",
        "teks_asli": "Pasal 20, Pasal 20A ayat (1), Pasal 21, Pasal 28, Pasal 28C, dan Pasal 31 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
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
      "teks": "UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 12 TAHUN 2010 TENTANG GERAKAN PRAMUKA DENGAN RAHMAT TUHAN YANG MAHA ESA PRESIDEN REPUBLIK INDONESIA,"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "a. bahwa pembangunan kepribadian ditujukan untuk mengembangkan potensi diri serta memiliki akhlak mulia, pengendalian diri, dan kecakapan hidup bagi setiap warga negara demi tercapainya kesejahteraan masyarakat;\nb. bahwa pengembangan potensi diri sebagai hak asasi manusia harus diwujudkan dalam berbagai upaya penyelenggaraan pendidikan, antara lain melalui gerakan pramuka;\nc. bahwa gerakan pramuka selaku penyelenggara pendidikan kepramukaan mempunyai peran besar dalam pembentukan kepribadian generasi muda sehingga memiliki pengendalian diri dan kecakapan hidup untuk menghadapi tantangan sesuai dengan tuntutan perubahan kehidupan lokal, nasional, dan global;\nd. bahwa peraturan perundang-undangan yang berlaku saat ini belum secara komprehensif mengatur gerakan pramuka;\ne. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, huruf b, huruf c, dan huruf d, perlu membentuk Undang-Undang tentang Gerakan Pramuka;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Pasal 20, Pasal 20A ayat (1), Pasal 21, Pasal 28, Pasal 28C, dan Pasal 31 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
    },
    {
      "tipe": "DIKTUM",
      "label": "Memutuskan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Dengan Persetujuan Bersama DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA dan\n\nMEMUTUSKAN:\nMenetapkan : UNDANG-UNDANG TENTANG GERAKAN PRAMUKA."
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
      "teks": "Pasal 1 Dalam Undang-Undang ini yang dimaksud dengan:\n1. Gerakan Pramuka adalah organisasi yang dibentuk oleh pramuka untuk menyelenggarakan pendidikan kepramukaan.\n2. Pramuka adalah warga negara Indonesia yang aktif dalam pendidikan kepramukaan serta mengamalkan Satya Pramuka dan Darma Pramuka.\n3. Kepramukaan adalah segala aspek yang berkaitan dengan pramuka.\n4. Pendidikan Kepramukaan adalah proses pembentukan kepribadian, kecakapan hidup, dan akhlak mulia pramuka melalui penghayatan dan pengamalan nilai-nilai kepramukaan.\n5. Gugus Depan adalah satuan pendidikan dan satuan organisasi terdepan penyelenggara pendidikan kepramukaan.\n6. Pusat Pendidikan dan Pelatihan Kepramukaan adalah satuan pendidikan untuk mendidik, melatih, dan memberikan sertifikasi kompetensi bagi tenaga pendidik kepramukaan.\n7. Satuan Komunitas Pramuka adalah satuan organisasi penyelenggara pendidikan kepramukaan yang berbasis, antara lain profesi, aspirasi, dan agama.\n8. Satuan Karya Pramuka adalah satuan organisasi penyelenggara pendidikan kepramukaan bagi peserta didik sebagai anggota muda untuk meningkatkan pengetahuan, keterampilan, dan pembinaan di bidang tertentu.\n9. Gugus Darma Pramuka adalah satuan organisasi bagi anggota pramuka dewasa untuk memajukan gerakan pramuka.\n10. Kwartir adalah satuan organisasi pengelola gerakan pramuka yang dipimpin secara kolektif pada setiap tingkatan wilayah.\n11. Majelis Pembimbing adalah dewan yang memberikan bimbingan kepada satuan organisasi gerakan pramuka.\n12. Pemerintah Pusat, selanjutnya disebut Pemerintah, adalah Presiden Republik Indonesia yang memegang kekuasaan pemerintahan negara Republik Indonesia sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.\n13. Pemerintah Daerah adalah gubernur, bupati atau walikota, dan perangkat daerah sebagai unsur penyelenggara pemerintahan daerah.\n14. Menteri adalah menteri yang membidangi urusan pemuda."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II ASAS, FUNGSI, DAN TUJUAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pasal 2 Gerakan pramuka berasaskan Pancasila."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pasal 3 Gerakan pramuka berfungsi sebagai wadah untuk mencapai tujuan pramuka melalui:\na. pendidikan dan pelatihan pramuka;\nb. pengembangan pramuka;\nc. pengabdian masyarakat dan orang tua; dan\nd. permainan yang berorientasi pada pendidikan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pasal 4 Gerakan pramuka bertujuan untuk membentuk setiap pramuka agar memiliki kepribadian yang beriman, bertakwa, berakhlak mulia, berjiwa patriotik, taat hukum, disiplin, menjunjung tinggi nilai-nilai luhur bangsa, dan memiliki kecakapan hidup sebagai kader bangsa dalam menjaga dan membangun Negara Kesatuan Republik Indonesia, mengamalkan Pancasila, serta melestarikan lingkungan hidup."
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB III PENDIDIKAN KEPRAMUKAAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Kesatu Dasar, Kode Kehormatan, Kegiatan, Nilai-Nilai, dan Sistem Among"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 5 Pendidikan kepramukaan dilaksanakan berdasarkan pada nilai dan kecakapan dalam upaya membentuk kepribadian dan kecakapan hidup pramuka."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 6 (1) Kode kehormatan pramuka merupakan janji dan komitmen diri serta ketentuan moral pramuka dalam pendidikan kepramukaan.\n(2) Kode kehormatan pramuka terdiri atas Satya Pramuka dan Darma Pramuka.\n(3) Kode kehormatan pramuka sebagaimana dimaksud pada ayat (2) dilaksanakan, baik dalam kehidupan pribadi maupun bermasyarakat secara sukarela dan ditaati demi kehormatan diri.\n(4) Satya Pramuka sebagaimana dimaksud pada ayat (2) berbunyi:\n\"Demi kehormatanku, aku berjanji akan bersungguh-sungguh menjalankan kewajibanku terhadap Tuhan Yang Maha Esa dan Negara Kesatuan Republik Indonesia, mengamalkan Pancasila, menolong sesama hidup, ikut serta membangun masyarakat, serta menepati Darma Pramuka.\"\n(5) Darma Pramuka sebagaimana dimaksud pada ayat (2) berbunyi:\nPramuka itu:\na. takwa kepada Tuhan Yang Maha Esa;\nb. cinta alam dan kasih sayang sesama manusia;\nc. patriot yang sopan dan kesatria;\nd. patuh dan suka bermusyawarah;\ne. rela menolong dan tabah;\nf. rajin, terampil, dan gembira;\ng. hemat, cermat, dan bersahaja;\nh. disiplin, berani, dan setia;\ni. bertanggung jawab dan dapat dipercaya; dan\nj. suci dalam pikiran, perkataan, dan perbuatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 7 (1) Kegiatan pendidikan kepramukaan dilaksanakan dengan berlandaskan pada kode kehormatan pramuka sebagaimana dimaksud dalam Pasal 6 ayat (2).\n(2) Kegiatan pendidikan kepramukaan dimaksudkan untuk meningkatkan kemampuan spiritual dan intelektual, keterampilan, dan ketahanan diri yang dilaksanakan melalui metode belajar interaktif dan progresif.\n(3) Metode belajar interaktif dan progresif sebagaimana dimaksud pada ayat (2) diwujudkan melalui interaksi:\na. pengamalan kode kehormatan pramuka;\nb. kegiatan belajar sambil melakukan;\nc. kegiatan yang berkelompok, bekerja sama, dan berkompetisi;\nd. kegiatan yang menantang;\ne. kegiatan di alam terbuka;\nf. kehadiran orang dewasa yang memberikan dorongan dan dukungan;\ng. penghargaan berupa tanda kecakapan; dan\nh. satuan terpisah antara putra dan putri.\n(4) Penerapan metode belajar sebagaimana dimaksud pada ayat (2) disesuaikan dengan kemampuan fisik dan mental pramuka.\n(5) Penilaian atas hasil pendidikan kepramukaan sebagaimana dimaksud pada ayat (2) dilaksanakan dengan berdasarkan pada pencapaian persyaratan kecakapan umum dan kecakapan khusus serta pencapaian nilai-nilai kepramukaan.\n(6) Pencapaian hasil pendidikan kepramukaan sebagaimana dimaksud pada ayat (5) dinyatakan dalam sertifikat dan/atau tanda kecakapan umum dan kecakapan khusus."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 8 (1) Nilai kepramukaan sebagaimana dimaksud dalam Pasal 5 mencakup:\na. keimanan dan ketakwaan kepada Tuhan Yang Maha Esa;\nb. kecintaan pada alam dan sesama manusia;\nc. kecintaan pada tanah air dan bangsa;\nd. kedisiplinan, keberanian, dan kesetiaan;\ne. tolong-menolong;\nf. bertanggung jawab dan dapat dipercaya;\ng. jernih dalam berpikir, berkata, dan berbuat;\nh. hemat, cermat, dan bersahaja; dan\ni. rajin dan terampil.\n(2) Nilai kepramukaan sebagaimana dimaksud pada ayat (1) merupakan inti kurikulum pendidikan kepramukaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 9 Kecakapan sebagaimana dimaksud dalam Pasal 5 terdiri atas:\na. kecakapan umum; dan\nb. kecakapan khusus."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 10 (1) Kegiatan pendidikan kepramukaan dilaksanakan dengan menggunakan sistem among.\n(2) Sistem among merupakan proses pendidikan kepramukaan yang membentuk peserta didik agar berjiwa merdeka, disiplin, dan mandiri dalam hubungan timbal balik antarmanusia.\n(3) Sistem among sebagaimana dimaksud pada ayat (1) dan ayat (2) dilaksanakan dengan menerapkan prinsip kepemimpinan:\na. di depan menjadi teladan;\nb. di tengah membangun kemauan; dan\nc. di belakang mendorong dan memberikan motivasi kemandirian."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Kedua Jalur dan Jenjang"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 11 Pendidikan kepramukaan dalam Sistem Pendidikan Nasional termasuk dalam jalur pendidikan nonformal yang diperkaya dengan pendidikan nilai-nilai gerakan pramuka dalam pembentukan kepribadian yang berakhlak mulia, berjiwa patriotik, taat hukum, disiplin, menjunjung tinggi nilai-nilai luhur bangsa, dan memiliki kecakapan hidup."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 12 Jenjang pendidikan kepramukaan terdiri atas jenjang pendidikan:\na. siaga;\nb. penggalang;\nc. penegak; dan\nd. pandega."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Ketiga Peserta Didik, Tenaga Pendidik, dan Kurikulum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 13 (1) Setiap warga negara Indonesia yang berusia 7 sampai dengan 25 tahun berhak ikut serta sebagai peserta didik dalam pendidikan kepramukaan.\n(2) Peserta didik sebagaimana dimaksud pada ayat (1) terdiri atas:\na. pramuka siaga;\nb. pramuka penggalang;\nc. pramuka penegak; dan\nd. pramuka pandega.\n(3) Peserta didik sebagaimana dimaksud pada ayat (1) dalam pendidikan kepramukaan disebut sebagai anggota muda."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 14 (1) Tenaga pendidik dalam pendidikan kepramukaan terdiri atas:\na. pembina;\nb. pelatih;\nc. pamong; dan\nd. instruktur.\n(2) Tenaga pendidik sebagaimana dimaksud pada ayat (1) harus memenuhi persyaratan standar tenaga pendidik.\n(3) Tenaga pendidik sebagaimana dimaksud pada ayat (1) dalam pendidikan kepramukaan disebut sebagai anggota dewasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 15 Kurikulum pendidikan kepramukaan yang mencakup aspek nilai sebagaimana dimaksud dalam Pasal 8 ayat (1) dan kecakapan sebagaimana dimaksud dalam Pasal 9 disusun sesuai dengan jenjang pendidikan kepramukaan dan harus memenuhi persyaratan standar kurikulum yang ditetapkan oleh badan standardisasi sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Keempat Satuan Pendidikan Kepramukaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Keempat",
      "teks": "Pasal 16 Satuan pendidikan kepramukaan terdiri atas:\na. gugus depan; dan\nb. pusat pendidikan dan pelatihan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB III",
      "teks": "Bagian Kelima Evaluasi, Akreditasi, dan Sertifikasi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pasal 17 (1) Evaluasi dilakukan dalam rangka pengendalian mutu pendidikan kepramukaan sebagai bentuk akuntabilitas penyelenggaraan pendidikan kepramukaan kepada pihak yang berkepentingan.\n(2) Evaluasi dilakukan terhadap peserta didik, tenaga pendidik, dan kurikulum, pada setiap jenjang dan satuan pendidikan kepramukaan.\n(3) Evaluasi terhadap peserta didik dilakukan oleh pembina.\n(4) Evaluasi terhadap tenaga pendidik dilakukan oleh pusat pendidikan dan pelatihan nasional yang dibentuk oleh kwartir nasional.\n(5) Evaluasi terhadap kurikulum pendidikan kepramukaan dilakukan oleh pusat pendidikan dan pelatihan nasional yang dibentuk oleh kwartir nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pasal 18 (1) Akreditasi dilakukan untuk menentukan kelayakan kegiatan dan satuan pendidikan kepramukaan pada setiap jenjang pendidikan kepramukaan.\n(2) Akreditasi dilakukan atas dasar kriteria yang bersifat terbuka dan dilakukan oleh lembaga akreditasi sesuai dengan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pasal 19 (1) Sertifikat berbentuk tanda kecakapan dan sertifikat kompetensi.\n(2) Tanda kecakapan diberikan kepada peserta didik sebagai pengakuan terhadap kompetensi peserta didik melalui penilaian terhadap perilaku dalam pengamalan nilai serta uji kecakapan umum dan uji kecakapan khusus sesuai dengan jenjang pendidikan kepramukaan.\n(3) Sertifikat kompetensi bagi tenaga pendidik diberikan oleh pusat pendidikan dan pelatihan kepramukaan pada tingkat nasional."
    },
    {
      "tipe": "BAB",
      "label": "BAB IV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IV KELEMBAGAAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kesatu Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 20 (1) Gerakan pramuka bersifat mandiri, sukarela, dan nonpolitis.\n(2) Satuan organisasi gerakan pramuka terdiri atas:\na. gugus depan; dan\nb. kwartir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 21 Gugus depan sebagaimana dimaksud dalam Pasal 20 ayat (2) huruf a meliputi gugus depan berbasis satuan pendidikan dan gugus depan berbasis komunitas."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 22 (1) Gugus depan berbasis satuan pendidikan sebagaimana dimaksud dalam Pasal 21 meliputi gugus depan di lingkungan pendidikan formal.\n(2) Gugus depan berbasis komunitas sebagaimana dimaksud dalam Pasal 21 meliputi gugus depan komunitas kewilayahan, agama, profesi, organisasi kemasyarakatan, dan komunitas lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Pasal 23 Kwartir sebagaimana dimaksud dalam Pasal 20 ayat (2) huruf b terdiri atas:\na. kwartir ranting;\nb. kwartir cabang;\nc. kwartir daerah; dan\nd. kwartir nasional."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kedua Pembentukan dan Kepengurusan Organisasi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 24 Gugus depan sebagaimana dimaksud dalam Pasal 20 ayat (2) huruf a dibentuk melalui musyawarah anggota pramuka."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 25 (1) Gugus depan sebagaimana dimaksud dalam Pasal 24 dapat membentuk kwartir ranting.\n(2) Kwartir ranting sebagaimana pada ayat (1) dapat membentuk kwartir cabang."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 26 (1) Kwartir cabang sebagaimana dimaksud dalam Pasal 25 ayat (2) dapat membentuk kwartir daerah.\n(2) Kwartir daerah sebagaimana dimaksud pada ayat (1) dapat membentuk kwartir nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pasal 27 (1) Kepengurusan kwartir sebagaimana dimaksud dalam Pasal 23 dipilih oleh pengurus organisasi gerakan pramuka yang berada di bawahnya secara demokratis melalui musyawarah kwartir.\n(2) Kepengurusan sebagaimana dimaksud pada ayat (1) tidak terikat dengan jabatan publik."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Ketiga Kwartir Ranting, Kwartir Cabang, Kwartir Daerah, dan Kwartir Nasional"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 28 (1) Kwartir ranting sebagaimana dimaksud dalam Pasal 23 huruf a merupakan satuan organisasi gerakan pramuka di kecamatan.\n(2) Kwartir ranting mempunyai tugas memimpin dan mengendalikan gerakan pramuka dan kegiatan kepramukaan di kecamatan.\n(3) Kwartir ranting sebagaimana dimaksud pada ayat (1) dibentuk oleh paling sedikit 5 (lima) gugus depan melalui musyawarah ranting.\n(4) Kepengurusan kwartir ranting dibentuk melalui musyawarah ranting.\n(5) Kepemimpinan kwartir ranting bersifat kolektif.\n(6) Musyawarah ranting sebagaimana dimaksud pada ayat (3) merupakan forum untuk:\na. pertanggungjawaban organisasi;\nb. pemilihan dan penetapan kepengurusan organisasi kwartir ranting; dan\nc. penetapan rencana kerja organisasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 29 (1) Kwartir cabang sebagaimana dimaksud dalam Pasal 23 huruf b merupakan organisasi gerakan pramuka di kabupaten/kota.\n(2) Kwartir cabang mempunyai tugas memimpin dan mengendalikan gerakan pramuka dan kegiatan kepramukaan di kabupaten/kota.\n(3) Kwartir cabang sebagaimana dimaksud pada ayat (1) dibentuk melalui musyawarah cabang.\n(4) Kepengurusan kwartir cabang dibentuk melalui musyawarah cabang.\n(5) Kepemimpinan kwartir cabang bersifat kolektif.\n(6) Musyawarah cabang sebagaimana dimaksud pada ayat (3) merupakan forum untuk:\na. pertanggungjawaban organisasi;\nb. pemilihan dan penetapan kepengurusan organisasi kwartir cabang; dan\nc. penetapan rencana kerja organisasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 30 (1) Kwartir daerah sebagaimana dimaksud dalam Pasal 23 huruf c merupakan organisasi gerakan pramuka di provinsi.\n(2) Kwartir daerah mempunyai tugas memimpin dan mengendalikan gerakan pramuka dan kegiatan kepramukaan di provinsi.\n(3) Kwartir daerah sebagaimana dimaksud pada ayat (1) dibentuk melalui musyawarah daerah.\n(4) Kepengurusan kwartir daerah dibentuk melalui musyawarah daerah.\n(5) Kepemimpinan kwartir daerah bersifat kolektif.\n(6) Musyawarah daerah sebagaimana dimaksud pada ayat (3) merupakan forum untuk:\na. pertanggungjawaban organisasi;\nb. pemilihan dan penetapan kepengurusan organisasi kwartir daerah; dan\nc. penetapan rencana kerja organisasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Pasal 31 (1) Kwartir nasional sebagaimana dimaksud dalam Pasal 23 huruf d merupakan organisasi gerakan pramuka lingkup nasional.\n(2) Kwartir nasional mempunyai tugas memimpin dan mengendalikan gerakan pramuka serta kegiatan kepramukaan lingkup nasional.\n(3) Kwartir nasional sebagaimana dimaksud pada ayat (1) dibentuk melalui musyawarah nasional.\n(4) Kepengurusan kwartir nasional dibentuk melalui musyawarah nasional.\n(5) Kepemimpinan kwartir nasional bersifat kolektif.\n(6) Musyawarah nasional sebagaimana dimaksud pada ayat (3) merupakan forum musyawarah tertinggi untuk:\na. pertanggungjawaban organisasi;\nb. pemilihan dan penetapan kepengurusan organisasi kwartir nasional;\nc. perubahan dan penetapan anggaran dasar dan anggaran rumah tangga; dan\nd. penetapan rencana kerja strategis organisasi."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Keempat Organisasi Pendukung"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Keempat",
      "teks": "Pasal 32 (1) Satuan organisasi gerakan pramuka sebagaimana dimaksud dalam Pasal 23 huruf b, huruf c, dan huruf d sesuai dengan tingkatannya dapat membentuk:\na. satuan karya pramuka;\nb. gugus darma pramuka;\nc. satuan komunitas pramuka;\nd. pusat penelitian dan pengembangan;\ne. pusat informasi; dan/atau\nf. badan usaha.\n(2) Ketentuan mengenai organisasi pendukung gerakan pramuka sebagaimana dimaksud pada ayat (1) ditetapkan dalam anggaran dasar dan anggaran rumah tangga."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kelima Majelis Pembimbing"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pasal 33 (1) Pada setiap gugus depan dan kwartir sebagaimana dimaksud dalam Pasal 20 ayat (2) dapat dibentuk majelis pembimbing.\n(2) Majelis pembimbing sebagaimana dimaksud pada ayat (1) bertugas memberikan bimbingan moral dan keorganisatorisan serta memfasilitasi penyelenggaraan pendidikan kepramukaan.\n(3) Majelis pembimbing sebagaimana dimaksud pada ayat (1) terdiri atas unsur:\na. Pemerintah;\nb. pemerintah daerah; dan\nc. tokoh masyarakat.\n(4) Majelis pembimbing dari unsur tokoh masyarakat sebagaimana dimaksud pada ayat (3) huruf c harus memiliki komitmen yang tinggi terhadap gerakan pramuka."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pasal 34 (1) Ketentuan lebih lanjut mengenai tugas, fungsi, tanggung jawab, susunan organisasi, dan tata kerja gugus depan, kwartir, dan majelis pembimbing ditetapkan dalam anggaran dasar dan anggaran rumah tangga gerakan pramuka.\n(2) Anggaran dasar dan anggaran rumah tangga gerakan pramuka sebagaimana dimaksud pada ayat (1) ditetapkan oleh musyawarah nasional."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keenam",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Keenam Atribut"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Keenam",
      "teks": "Pasal 35 (1) Gerakan pramuka sebagaimana dimaksud dalam Pasal 20 ayat (2) memiliki atribut berupa:\na. lambang;\nb. bendera;\nc. panji;\nd. himne; dan\ne. pakaian seragam.\n(2) Atribut gerakan pramuka sebagaimana dimaksud pada ayat (1) didaftarkan hak ciptanya."
    },
    {
      "tipe": "BAB",
      "label": "BAB V",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB V TUGAS DAN WEWENANG"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pasal 36 Pemerintah dan pemerintah daerah bertugas:\na. menjamin kebebasan berpendapat dan berkarya dalam pendidikan kepramukaan;\nb. membimbing, mendukung, dan memfasilitasi penyelenggaraan pendidikan kepramukaan secara berkelanjutan dan berkesinambungan; dan\nc. membantu ketersediaan tenaga, dana, dan fasilitas yang diperlukan untuk pendidikan kepramukaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pasal 37 (1) Pemerintah dan pemerintah daerah berwenang untuk melakukan pengawasan terhadap penyelenggaraan pendidikan kepramukaan sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Pengawasan terhadap pelaksanaan penyelenggaraan pendidikan kepramukaan sebagaimana dimaksud pada ayat (1) dilaksanakan oleh Menteri, dan gubernur, serta bupati/walikota."
    },
    {
      "tipe": "BAB",
      "label": "BAB VI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VI HAK DAN KEWAJIBAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 38 Setiap peserta didik berhak:\na. mengikuti pendidikan kepramukaan;\nb. menggunakan atribut pramuka;\nc. mendapatkan sertifikat dan/atau tanda kecakapan kepramukaan; dan\nd. mendapatkan perlindungan selama mengikuti kegiatan kepramukaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 39 Setiap peserta didik berkewajiban:\na. melaksanakan kode kehormatan pramuka;\nb. menjunjung tinggi harkat dan martabat pramuka; dan\nc. mematuhi semua persyaratan dan ketentuan pendidikan kepramukaan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 40 Orang tua berhak mengawasi penyelenggaraan pendidikan kepramukaan dan memperoleh informasi tentang perkembangan anaknya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 41 Orang tua berkewajiban untuk:\na. membimbing, mendukung, dan membantu anak dalam mengikuti pendidikan kepramukaan; dan\nb. membimbing, mendukung, dan membantu satuan pendidikan kepramukaan sesuai dengan kemampuan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 42 Masyarakat berhak untuk berperan serta dan memberikan dukungan sumber daya dalam kegiatan pendidikan kepramukaan."
    },
    {
      "tipe": "BAB",
      "label": "BAB VII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VII KEUANGAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 43 (1) Keuangan gerakan pramuka diperoleh dari:\na. iuran anggota sesuai dengan kemampuan;\nb. sumbangan masyarakat yang tidak mengikat; dan\nc. sumber lain yang tidak bertentangan dengan peraturan perundang-undangan.\n(2) Selain sumber keuangan sebagaimana dimaksud pada ayat (1), Pemerintah dan pemerintah daerah dapat memberikan dukungan dana dari anggaran pendapatan dan belanja negara dan/atau anggaran pendapatan dan belanja daerah.\n(3) Sumbangan sebagaimana dimaksud pada ayat (1) huruf b, selain berupa uang dapat juga berupa barang atau jasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 44 Pengelolaan keuangan gerakan pramuka dilaksanakan secara transparan, tertib, dan akuntabel serta diatur sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 45 Satuan organisasi gerakan pramuka dilarang:\na. menerima bantuan dari pihak asing tanpa persetujuan Pemerintah; atau\nb. memberi bantuan kepada pihak asing yang merugikan kepentingan bangsa dan negara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 46 (1) Satuan organisasi gerakan pramuka yang melanggar ketentuan sebagaimana dimaksud dalam Pasal 45 dapat dibekukan oleh Pemerintah atau pemerintah daerah.\n(2) Satuan organisasi gerakan pramuka yang telah dibekukan sebagaimana dimaksud pada ayat (1) yang tetap melakukan kegiatan sebagaimana dimaksud dalam Pasal 45 dapat dibubarkan berdasarkan putusan pengadilan."
    },
    {
      "tipe": "BAB",
      "label": "BAB VIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIII KETENTUAN PERALIHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 47 Pada saat Undang-Undang ini mulai berlaku:\na. organisasi gerakan pramuka dan organisasi lain yang menyelenggarakan pendidikan kepramukaan yang ada sebelum Undang-Undang ini diundangkan tetap diakui keberadaannya;\nb. satuan atau badan kelengkapan dari organisasi sebagaimana dimaksud dalam huruf a tetap menjalankan tugas, fungsi, dan tanggung jawab organisasi yang bersangkutan;\nc. aset yang dimiliki oleh organisasi sebagaimana dimaksud dalam huruf a tetap menjadi aset organisasi yang bersangkutan; dan\nd. anggaran dasar dan anggaran rumah tangga organisasi sebagaimana dimaksud dalam huruf a wajib disesuaikan dengan ketentuan Undang-Undang ini dalam waktu paling lama 2 (dua) tahun sejak Undang-Undang ini diundangkan."
    },
    {
      "tipe": "BAB",
      "label": "BAB IX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IX KETENTUAN PENUTUP"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 48 Peraturan perundang-undangan yang berkaitan dengan gerakan pramuka yang bertentangan dengan ketentuan Undang-Undang ini dinyatakan tidak berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 49 Undang-Undang ini mulai berlaku pada tanggal diundangkan.\nAgar setiap orang mengetahuinya, memerintahkan pengundangan Undang-Undang ini dengan penempatannya dalam Lembaran Negara Republik Indonesia.\nDisahkan di Jakarta pada tanggal 24 November 2010 PRESIDEN REPUBLIK INDONESIA, ttd. DR. H. SUSILO BAMBANG YUDHOYONO Diundangkan di Jakarta pada tanggal 24 November 2010 MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA, ttd. PATRIALIS AKBAR LEMBARAN NEGARA REPUBLIK INDONESIA TAHUN 2010 NOMOR 131 Salinan sesuai dengan aslinya SEKRETARIAT NEGARA RI Kepala Biro Peraturan Perundang-undangan Bidang Politik dan Kesejahteraan Rakyat, Wisnu Setiawan"
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "Penjelasan Umum",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PENJELASAN_UMUM",
      "teks": "PENJELASAN ATAS UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 12 TAHUN 2010 TENTANG GERAKAN PRAMUKA\nI. UMUM Salah satu tujuan bernegara yang tercantum dalam Pembukaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 adalah mencerdaskan kehidupan bangsa. Upaya untuk mencerdaskan kehidupan bangsa tersebut dapat dilakukan melalui pendidikan.\nPendidikan kepramukaan merupakan salah satu pendidikan nonformal yang menjadi wadah pengembangan potensi diri serta memiliki akhlak mulia, pengendalian diri, dan kecakapan hidup untuk melahirkan kader penerus perjuangan bangsa dan negara. Di samping itu, pendidikan kepramukaan yang diselenggarakan oleh organisasi gerakan pramuka merupakan wadah pemenuhan hak warga negara untuk berserikat dan mendapatkan pendidikan sebagaimana tercantum dalam Pasal 28, Pasal 28C, dan Pasal 31 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.\nGerakan pramuka yang pada masa pemerintahan Hindia Belanda tahun 1912 disebut kepanduan terus berkembang dalam dinamika politik didasari oleh politik yang memecah belah bangsa. Namun kegiatan kepanduan di tanah air tetap memiliki komitmen yang sama yaitu menentang kebijakan pemerintahan kolonial Hindia Belanda dan berjuang menuju Indonesia merdeka. Sejarah mencatat bahwa gerakan kepanduan melahirkan sikap patriotisme kaum muda yang pada muaranya mematangkan momentum sumpah pemuda 28 Oktober 1928 dan proklamasi kemerdekaan Republik Indonesia pada tanggal 17 Agustus 1945.\nSetelah kemerdekaan Presiden Republik Indonesia Soekarno mengumpulkan 60 (enam puluh) organisasi kepanduan untuk dikonsolidasikan menjadi kekuatan pembangunan nasional. Untuk itu, Presiden mengeluarkan Keputusan Presiden Nomor 238 Tahun 1961 tentang Gerakan Pramuka yang intinya membentuk dan menetapkan gerakan pramuka sebagai satu-satunya perkumpulan yang memiliki kewenangan menyelenggarakan pendidikan kepanduan di Indonesia.\nPerkembangan gerakan pramuka mengalami pasang surut dan pada kurun waktu tertentu kurang dirasakan penting oleh kaum muda.\nAkibatnya, pewarisan nilai-nilai yang terkandung dalam falsafah Pancasila dalam pembentukan kepribadian kaum muda yang merupakan inti dari pendidikan kepramukaan tidak optimal. Pada waktu yang bersamaan dalam tatanan dunia global bangsa dan negara membutuhkan kaum muda yang memiliki rasa cinta tanah air, kepribadian yang kuat dan tangguh, rasa kesetiakawanan sosial, kejujuran, sikap toleransi, kemampuan bekerja sama, rasa tanggung jawab, serta kedisiplinan untuk membela dan membangun bangsa.\nDengan menyadari permasalahan yang digambarkan di atas, pada peringatan ulang tahun gerakan pramuka 14 Agustus 2006 dicanangkan revitalisasi gerakan pramuka. Momentum revitalisasi gerakan pramuka tersebut dirasakan sangat penting dalam upaya pembangunan kepribadian bangsa yang sangat diperlukan dalam menghadapi tantangan sesuai dengan tuntutan perubahan zaman.\nUndang-undang tentang Gerakan Pramuka disusun dengan maksud untuk menghidupkan dan menggerakkan kembali semangat perjuangan yang dijiwai nilai-nilai Pancasila dalam kehidupan masyarakat yang beraneka ragam dan demokratis. Undang-undang ini menjadi dasar hukum bagi semua komponen bangsa dalam penyelenggaraan pendidikan kepramukaan yang bersifat mandiri, sukarela, dan nonpolitis dengan semangat Bhinneka Tunggal Ika untuk mempertahankan kesatuan dan persatuan bangsa dalam wadah Negara Kesatuan Republik Indonesia.\nUndang-Undang ini menegaskan Pancasila merupakan asas gerakan pramuka dan gerakan pramuka berfungsi sebagai wadah untuk mencapai tujuan pramuka melalui kegiatan kepramukaan yaitu pendidikan dan pelatihan, pengembangan, pengabdian masyarakat dan orang tua, serta permainan yang berorientasi pada pendidikan.\nSelanjutnya, tujuan gerakan pramuka adalah membentuk setiap pramuka agar memiliki kepribadian yang beriman, bertakwa, berakhlak mulia, berjiwa patriotik, taat hukum, disiplin, menjunjung tinggi nilai-nilai luhur bangsa, dan memiliki kecakapan hidup sebagai kader bangsa dalam menjaga dan membangun Negara Kesatuan Republik Indonesia, mengamalkan Pancasila, serta melestarikan lingkungan hidup.\nDengan mengacu fungsi dan tujuannya, Undang-Undang ini mengatur aspek pendidikan kepramukaan, kelembagaan, tugas dan wewenang Pemerintah dan pemerintah daerah, hak dan kewajiban para pemangku kepentingan, serta aspek keuangan gerakan pramuka."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "II. PASAL DEMI PASAL\nPasal 1 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 2 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 3 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 4 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 5 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 6 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 7 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Huruf a Cukup jelas.\nHuruf b Yang dimaksud “belajar sambil melakukan” adalah berusaha mengetahui sesuatu dan memperoleh ilmu pengetahuan yang dikerjakan dalam waktu bersamaan dengan mempraktikkan hasil yang diperoleh.\nHuruf c Cukup jelas.\nHuruf d Yang dimaksud “kegiatan yang menantang” adalah aktivitas yang menggugah tekad untuk mengatasi masalah.\nHuruf e Cukup jelas.\nHuruf f Cukup jelas.\nHuruf g Cukup jelas.\nHuruf h Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 8 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 9 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 10 Ayat (1) Sistem Among yang diterapkan dalam pendidikan gerakan pramuka diangkat dari prinsip kepemimpinan yang berakar dari nilai luhur budaya bangsa.\nAyat (2) Cukup jelas.\nAyat (3) Huruf a Prinsip kepemimpinan “di depan menjadi teladan” dikenal juga dengan istilah ing ngarsa sung tuladha.\nHuruf b Prinsip kepemimpinan “di tengah membangun kemauan” dikenal juga dengan istilah ing madya mangun karsa.\nHuruf c Prinsip kepemimpinan “di belakang mendorong dan memberikan motivasi kemandirian” dikenal juga dengan istilah tut wuri handayani."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 11 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 12 Huruf a Jenjang pendidikan siaga menekankan pada terbentuknya kepribadian, dan keterampilan di lingkungan keluarga melalui kegiatan bermain sambil belajar.\nHuruf b Jenjang pendidikan penggalang menekankan pada terbentuknya kepribadian dan keterampilan dalam rangka mempersiapkan diri untuk terjun dalam kegiatan masyarakat melalui kegiatan belajar sambil melakukan.\nHuruf c Jenjang pendidikan penegak menekankan pada terbentuknya kepribadian dan keterampilan agar dapat ikut serta membangun masyarakat melalui kegiatan belajar, melakukan, bekerja kelompok, dan berkompetisi.\nHuruf d Jenjang pendidikan pandega menekankan pada terbentuknya kepribadian dan keterampilan agar dapat ikut serta membangun masyarakat melalui kegiatan kepada masyarakat."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 13 Ayat (1) Cukup jelas.\nAyat (2) Huruf a Pramuka siaga berusia 7 sampai dengan 10 tahun.\nHuruf b Pramuka penggalang berusia 11 sampai dengan 15 tahun.\nHuruf c Pramuka penegak berusia 16 sampai dengan 20 tahun.\nHuruf d Pramuka pandega berusia 21 sampai dengan 25 tahun.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 14 Ayat (1) Huruf a Yang dimaksud dengan “pembina” adalah tenaga pendidik gerakan pramuka yang bertugas melatih peserta didik di gugus depan.\nHuruf b Yang dimaksud dengan “pelatih” adalah tenaga pendidik gerakan pramuka yang bertugas melatih pembina.\nHuruf c Yang dimaksud dengan “pamong” adalah tenaga pendidik gerakan pramuka yang bertugas mendidik peserta didik pada satuan karya pramuka (saka).\nHuruf d Yang dimaksud dengan “instruktur” adalah tenaga pendidik gerakan pramuka yang memiliki keahlian/keterampilan khusus kesakaan yang mendidik peserta didik dan pamong di satuan karya gerakan pramuka.\nAyat (2) Standar tenaga pendidik disusun dan ditetapkan oleh pusat pendidikan dan pelatihan nasional gerakan pramuka.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 15 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 16 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 17 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 18 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 19 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 20 Ayat (1) Yang dimaksud dengan “mandiri” adalah organisasi gerakan pramuka merupakan lembaga yang mengelola sendiri kelembagaannya.\nYang dimaksud dengan “sukarela” adalah organisasi yang keanggotaannya atas kemauan sendiri, tidak karena diwajibkan.\nYang dimaksud dengan “nonpolitis” adalah organisasi gerakan pramuka bukan merupakan bagian dari salah satu organisasi sosial politik manapun.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 21 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 22 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 23 Dalam setiap kwartir dibentuk dewan kerja sebagai badan kelengkapan kwartir."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 24 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 25 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 26 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 27 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 28 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 29 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 30 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 31 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 32 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 33 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 34 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 35 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 36 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 37 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 38 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 39 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 40 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 41 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 42 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 43 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 44 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 45 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 46 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 47 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 48 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 49 Cukup jelas.\nTAMBAHAN LEMBARAN NEGARA REPUBLIK INDONESIA NOMOR 5169"
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
                $this->command->info("Data UU No. 12 Tahun 2010 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding UU No. 12 Tahun 2010 selesai!");

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

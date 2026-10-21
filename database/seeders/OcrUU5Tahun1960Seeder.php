<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUU5Tahun1960Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "undang-undang-5-1960",
    "tipe_peraturan": "UU",
    "judul": "Undang-undang (UU) Nomor 5 Tahun 1960 tentang Peraturan Dasar Pokok-Pokok Agraria",
    "tahun": "1960",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "24 September 1960",
    "tanggal_pengundangan": "24 September 1960",
    "tanggal_berlaku": "24 September 1960",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "",
    "diubah_dengan": "",
    "mengubah": "",
    "sumber_dokumen": "undang-undang_nomor_5_tahun_1960_tentang_peraturan_dasar_pokok-pokok_agraria.pdf",
    "id_dokumen": "undang-undang_nomor_5_tahun_1960_tentang_peraturan_dasar_pokok-pokok_agraria",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 33,
    "total_chunk": 137,
    "waktu_eksekusi_detik": 298.68,
    "waktu_proses": "2026-09-27 20:00:07"
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
        "teks_asli": "b. Pasal 33 Undang-undang Dasar;"
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
      "teks": "REPUBLIK INDONESIA\nUNDANG-UNDANG REPUBLIK INDONESIA\nNOMOR 5 TAHUN 1960\nTENTANG\nPERATURAN DASAR POKOK-POKOK AGRARIA\nPRESIDEN REPUBLIK INDONESIA,"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "a. bahwa didalam Negara Republik Indonesia yang susunan kehidupan rakyatnya, termasuk perekonomiannya, terutama masih bercorak agraris, bumi, air dan ruang angkasa, sebagai karunia Tuhan Yang Maha Esa mempunyai fungsi yang amat penting untuk membangun masyarakat yang adil dan makmur;\nb. bahwa hukum agraria yang masih berlaku sekarang ini sebagian tersusun berdasarkan tujuan dan sendi-sendi dari pemerintahan jajahan dan sebagian dipengaruhi olehnya, hingga bertentangan dengan kepentingan rakyat dan Negara didalam menyelesaikan revolusi nasional sekarang ini serta pembangunan semesta;\nc. bahwa hukum agraria tersebut mempunyai sifat dualisme, dengan berlakunya hukum adat disamping hukum agraria yang didasarkan atas hukum barat;\nd. bahwa bagi rakyat asli hukum agraria penjajahan itu tidak menjamin kepastian hukum;\ne. bahwa berhubung dengan apa yang tersebut dalam pertimbangan-pertimbangan diatas perlu adanya hukum agraria nasional, yang berdasar atas hukum adat tentang tanah, yang sederhana dan menjamin kepastian hukum bagi seluruh rakyat Indonesia, dengan tidak mengabaikan unsur-unsur yang bersandar pada hukum agama;\nf. bahwa hukum agraria nasional harus memberi kemungkinan akan tercapainya fungsi bumi, air dan ruang angkasa, sebagai yang dimaksud diatas dan harus sesuai dengan kepentingan rakyat Indonesia serta memenuhi pula keperluannya menurut permintaan zaman dalam segala soal agraria;\ng. bahwa hukum agraria nasional itu harus mewujudkan penjelmaan dari pada Ketuhanan Yang Maha Esa, Perikemanusiaan, Kebangsaan, Kerakyatan dan Keadilan Sosial, sebagai azas kerokhanian Negara dan cita-cita bangsa, seperti yang tercantum didalam Pembukaan Undang-undang Dasar;\nh. bahwa hukum agraria tersebut harus pula merupakan pelaksanaan dari pada Dekrit Presiden tanggal 5 Juli 1959, ketentuan dalam pasal 33 Undang-undang Dasar dan Manifesto Politik Republik Indonesia, sebagai yang ditegaskan dalam pidato Presiden tanggal 17 Agustus 1960, yang mewajibkan Negara untuk mengatur pemilikan tanah dan memimpin penggunaannya, hingga semua tanah diseluruh wilayah kedaulatan bangsa dipergunakan untuk sebesar-besar kemakmuran rakyat, baik secara perseorangan maupun secara gotong-royong;\ni. bahwa berhubung dengan segala sesuatu itu perlu diletakkan sendi-sendi dan disusun ketentuan-ketentuan pokok baru dalam bentuk Undang-undang yang akan merupakan dasar bagi penyusunan hukum agraria nasional tersebut diatas;"
    },
    {
      "tipe": "MENDENGAR",
      "label": "Memperhatikan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > MENDENGAR",
      "teks": "Usul Dewan Pertimbangan Agung Sementara Republik Indonesia No. I/Kpts/Sd/Il/60 tentang Perombakan Hak Tanah dan Penggunaan Tanah;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "a. Dekrit Presiden tanggal 5 Juli 1959;\nb. Pasal 33 Undang-undang Dasar;\nc. Penetapan Presiden No. I tahun 1960 (Lembaran-Negara 1960 No. 10) tentang Penetapan Manifesto Politik Republik Indonesia tanggal 17 Agustus 1959 sebagai Garis-garis besar dari pada haluan Negara dan Amanat Presiden tanggal 17 Agustus 1960;\nd. Pasal 5 jo. 20 Undang-undang Dasar;"
    },
    {
      "tipe": "DIKTUM",
      "label": "Memutuskan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Dengan persetujuan Dewan Perwakilan Rakyat Gotong-Royong.\n\nMemutuskan:\nDengan mencabut:\n1. \"Agrarische Wet\" (Staatsblad 1870 No. 55), sebagai yang termuat dalam pasal 51 \"Wet op de Staatsinrichting van Nederlands Indie\" (Staatsblad 1925 No. 447) dan ketentuan dalam ayat-ayat lainnya dari pasal itu;\n2. a. \"Domeinverklaring\" tersebut dalam pasal 1 \"Agrarisch Besluit\" (Staatsblad 1870 No. 118);\nb. \"Algemene Domeinverklaring\" tersebut dalam Staatsblad 1875 No. 119A;\nc. \"Domeinverklaring untuk Sumatera\" tersebut dalam pasal 1 dari Staatsblad 1874 No. 94f;\nd. \"Domeinverklaring untuk keresidenan Menado\" tersebut dalam pasal 1 dari Staatsblad 1877 No. 55;\ne. \"Domeinverklaring untuk residentie Zuider en Oosterafdeling van Borneo\" tersebut dalam pasal 1 dari Staatsblad 1888 No. 58;\n3. Koninklijk Besluit tanggal 16 April 1872 No. 29 (Staatsblad 1872 No. 117) dan peraturan pelaksanaannya;\n4. Buku ke-II Kitab Undang-undang Hukum Perdata Indonesia sepanjang yang mengenai bumi, air serta kekayaan alam yang terkandung didalamnya, kecuali ketentuan-ketentuan mengenai hypotheek yang masih berlaku pada mulai berlakunya Undang-undang ini;\n\nMenetapkan:\nUNDANG-UNDANG TENTANG PERATURAN DASAR POKOK-POKOK AGRARIA.\n\nPETA\nPERTAMA"
    },
    {
      "tipe": "BAB",
      "label": "BAB I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB I DASAR-DASAR DAN KETENTUAN-KETENTUAN POKOK."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Seluruh wilayah Indonesia adalah kesatuan tanah-air dari seluruh rakyat Indonesia yang bersatu sebagai bangsa Indonesia.\n(2) Seluruh bumi, air dan ruang angkasa, termasuk kekayaan alam yang terkandung didalamnya dalam wilayah Republik Indonesia, sebagai karunia Tuhan Yang Maha Esa adalah bumi, air dan ruang angkasa bangsa Indonesia dan merupakan kekayaan nasional.\n(3) Hubungan antara bangsa Indonesia dan bumi, air serta ruang angkasa termaksud dalam ayat (2) pasal ini adalah hubungan yang bersifat abadi.\n(4) Dalam pengertian bumi selain permukaan bumi, termasuk pula tubuh bumi dibawahnya serta yang berada dibawah air.\n(5) Dalam pengertian air termasuk baik perairan pedalaman maupun laut wilayah Indonesia.\n(6) Yang dimaksud dengan ruang angkasa ialah ruang diatas bumi dan air tersebut pada ayat (4) dan (5) pasal ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Atas dasar ketentuan dalam pasal 33 ayat (3) Undang-undang Dasar dan hal-hal sebagai yang dimaksud dalam pasal 1, bumi, air dan ruang angkasa, termasuk kekayaan alam yang terkandung didalamnya itu pada tingkatan tertinggi dikuasai oleh Negara, sebagai organisasi kekuasaan seluruh rakyat.\n(2) Hak menguasai dari Negara termaksud dalam ayat (1) pasal ini memberi wewenang untuk :\na. mengatur dan menyelenggarakan peruntukan, penggunaan, persediaan dan pemeliharaan bumi, air dan ruang angkasa tersebut;\nb. menentukan dan mengatur hubungan-hubungan hukum antara orang-orang dengan bumi, air dan ruang angkasa;\nc. menentukan dan mengatur hubungan-hubungan hukum antara orang-orang dan perbuatan-perbuatan hukum yang mengenai bumi, air dan ruang angkasa.\n(3) Wewenang yang bersumber pada hak menguasai dari Negara tersebut pada ayat (2) pasal ini digunakan untuk mencapai sebesar-besar kemakmuran rakyat, dalam arti kebahagiaan, kesejahteraan dan kemerdekaan dalam masyarakat dan Negara hukum Indonesia yang merdeka berdaulat, adil dan makmur.\n(4) Hak menguasai dari Negara tersebut diatas pelaksanaannya dapat dikuasakan kepada daerah-daerah Swatantra dan masyarakat-masyarakat hukum adat, sekedar diperlukan dan tidak bertentangan dengan kepentingan nasional, menurut ketentuan-ketentuan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Dengan mengingat ketentuan-ketentuan dalam pasal 1 dan 2 pelaksanaan hak ulayat dan hak-hak yang serupa itu dari masyarakat-masyarakat hukum adat, sepanjang menurut kenyataannya masih ada, harus sedemikian rupa sehingga sesuai dengan kepentingan nasional dan Negara, yang berdasarkan atas persatuan bangsa serta tidak boleh bertentangan dengan Undang-undang dan peraturan-peraturan lain yang lebih tinggi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Atas dasar hak menguasai dari Negara sebagai yang dimaksud dalam pasal 2 ditentukan adanya macam-macam hak atas permukaan bumi, yang disebut tanah, yang dapat diberikan kepada dan dipunyai oleh orang-orang, baik sendiri maupun bersama-sama dengan orang-orang lain serta badan-badan hukum.\n(2) Hak-hak atas tanah yang dimaksud dalam ayat (1) pasal ini memberi wewenang untuk mempergunakan tanah yang bersangkutan, demikian pula tubuh bumi dan air serta ruang yang ada diatasnya, sekedar diperlukan untuk kepentingan yang langsung berhubungan dengan penggunaan tanah itu dalam batas-batas menurut Undang-undang ini dan peraturan-peraturan hukum lain yang lebih tinggi.\n(3) Selain hak-hak atas tanah sebagai yang dimaksud dalam ayat (1) pasal ini ditentukan pula hak-hak atas air dan ruang angkasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Hukum agraria yang berlaku atas bumi, air dan ruang angkasa ialah hukum adat, sepanjang tidak bertentangan dengan kepentingan nasional dan Negara, yang berdasarkan atas persatuan bangsa, dengan sosialisme Indonesia serta dengan peraturan-peraturan yang tercantum dalam Undang-undang ini dan dengan peraturan perundangan lainnya, segala sesuatu dengan mengindahkan unsur-unsur yang bersandar pada hukum agama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Semua hak atas tanah mempunyai fungsi sosial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Untuk tidak merugikan kepentingan umum maka pemilikan dan penguasaan tanah yang melampaui batas tidak diperkenankan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Atas dasar hak menguasai dari Negara sebagai yang dimaksud dalam pasal 2 diatur pengambilan kekayaan alam yang terkandung dalam bumi, air dan ruang angkasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Hanya warga-negara Indonesia dapat mempunyai hubungan yang sepenuhnya dengan bumi, air dan ruang angkasa, dalam batas-batas ketentuan pasal 1 dan 2.\n(2) Tiap-tiap warga-negara Indonesia, baik laki-laki maupun wanita mempunyai kesempatan yang sama untuk memperoleh sesuatu hak atas tanah serta untuk mendapat manfaat dari hasilnya, baik bagi diri sendiri maupun keluarganya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Setiap orang dan badan hukum yang mempunyai sesuatu hak atas tanah pertanian pada azasnya diwajibkan mengerjakan atau mengusahakannya sendiri secara aktif, dengan mencegah cara-cara pemerasan.\n(2) Pelaksanaan dari pada ketentuan dalam ayat (1) pasal ini akan diatur lebih lanjut dengan peraturan perundangan.\n(3) Pengecualian terhadap azas tersebut pada ayat (1) pasal ini diatur dalam peraturan perundangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Hubungan hukum antara orang, termasuk badan hukum, dengan bumi, air dan ruang angkasa serta wewenang-wewenang yang bersumber pada hubungan hukum itu akan diatur, agar tercapai tujuan yang disebut dalam pasal 2 ayat (3) dan dicegah penguasaan atas kehidupan dan pekerjaan orang lain yang melampaui batas.\n(2) Perbedaan dalam keadaan masyarakat dan keperluan hukum golongan rakyat dimana perlu dan tidak bertentangan dengan kepentingan nasional diperhatikan, dengan menjamin perlindungan terhadap kepentingan golongan yang ekonomis lemah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Segala usaha bersama dalam lapangan agraria didasarkan atas kepentingan bersama dalam rangka kepentingan nasional, dalam bentuk koperasi atau bentuk-bentuk gotong-royong lainnya.\n(2) Negara dapat bersama-sama dengan pihak lain menyelenggarakan usaha bersama dalam lapangan agraria."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Pemerintah berusaha agar supaya usaha-usaha dalam lapangan agraria diatur sedemikian rupa, sehingga meninggikan produksi dan kemakmuran rakyat sebagai yang dimaksud dalam pasal 2 ayat (3) serta menjamin bagi setiap warga-negara Indonesia derajat hidup yang sesuai dengan martabat manusia, baik bagi diri sendiri maupun keluarganya.\n(2) Pemerintah mencegah adanya usaha-usaha dalam lapangan agraria dari organisasi-organisasi dan perseorangan yang bersifat monopoli swasta.\n(3) Usaha-usaha Pemerintah dalam lapangan agraria yang bersifat monopoli hanya dapat diselenggarakan dengan Undang-undang.\n(4) Pemerintah berusaha untuk memajukan kepastian dan jaminan sosial, termasuk bidang perburuhan, dalam usaha-usaha dilapangan agraria."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "(1) Dengan mengingat ketentuan-ketentuan dalam pasal 2 ayat (2) dan (3), pasal 9 ayat (2) serta pasal 10 ayat (1) dan (2) Pemerintah dalam rangka sosialisme Indonesia, membuat suatu rencana umum mengenai persediaan, peruntukan dan penggunaan bumi, air dan ruang angkasa serta kekayaan alam yang terkandung didalamnya:\na. untuk keperluan Negara;\nb. untuk keperluan peribadatan dan keperluan suci lainnya, sesuai dengan dasar Ketuhanan Yang Maha Esa;\nc. untuk keperluan pusat-pusat kehidupan masyarakat, sosial, kebudayaan dan lain-lain kesejahteraan;\nd. untuk keperluan memperkembangkan produksi pertanian, peternakan dan perikanan serta sejalan dengan itu;\ne. untuk keperluan memperkembangkan industri, transmigrasi dan pertambangan.\n(2) Berdasarkan rencana umum tersebut pada ayat (1) pasal ini dan mengingat peraturan-peraturan yang bersangkutan, Pemerintah Daerah mengatur persediaan, peruntukan dan penggunaan bumi, air serta ruang angkasa untuk daerahnya, sesuai dengan keadaan daerah masing-masing.\n(3) Peraturan Pemerintah Daerah yang dimaksud dalam ayat (2) pasal ini berlaku setelah mendapat pengesahan, mengenai Daerah Tingkat I dari Presiden, Daerah Tingkat II dari Gubernur/Kepala Daerah yang bersangkutan dan Daerah Tingkat III dari Bupati/Walikota/Kepala Daerah yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Memelihara tanah, termasuk menambah kesuburannya serta mencegah kerusakannya adalah kewajiban tiap-tiap orang, badan hukum atau instansi yang mempunyai hubungan hukum dengan tanah itu, dengan memperhatikan pihak yang ekonomis lemah."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II HAK-HAK ATAS TANAH, AIR DAN RUANG ANGKASA SERTA PENDAFTARAN TANAH."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB II",
      "teks": "Bagian 1. Ketentuan-ketentuan umum."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian 1",
      "teks": "(1) Hak-hak atas tanah sebagai yang dimaksud dalam pasal 4 ayat (1) ialah:\na. hak milik;\nb. hak guna-usaha;\nc. hak guna-bangunan;\nd. hak pakai;\ne. hak sewa;\nf. hak membuka tanah;\ng. hak memungut-hasil hutan;\nh. hak-hak lain yang tidak termasuk dalam hak-hak tersebut diatas yang akan ditetapkan dengan Undang-undang serta hak-hak yang sifatnya sementara sebagai yang disebutkan dalam pasal 53.\n(2) Hak-hak atas air dan ruang angkasa sebagai yang dimaksud dalam pasal 4 ayat (3) ialah:\na. hak guna air;\nb. hak pemeliharaan dan penangkapan ikan;\nc. hak guna ruang angkasa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian 1",
      "teks": "(1) Dengan mengingat ketentuan dalam pasal 7 maka untuk mencapai tujuan yang dimaksud dalam pasal 2 ayat (3) diatur luas maksimum dan/atau minimum tanah yang boleh dipunyai dengan sesuatu hak tersebut dalam pasal 16 oleh satu keluarga atau badan hukum.\n(2) Penetapan batas maksimum termaksud dalam ayat (1) pasal ini dilakukan dengan peraturan perundangan didalam waktu yang singkat.\n(3) Tanah-tanah yang merupakan kelebihan dari batas maksimum termaksud dalam ayat (2) pasal ini diambil oleh Pemerintah dengan ganti kerugian, untuk selanjutnya dibagikan kepada rakyat yang membutuhkan menurut ketentuan-ketentuan dalam Peraturan Pemerintah.\n(4) Tercapainya batas minimum termaksud dalam ayat (1) pasal ini, yang akan ditetapkan dengan peraturan perundangan, dilaksanakan secara berangsur-angsur."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian 1",
      "teks": "Untuk kepentingan umum, termasuk kepentingan bangsa dan Negara serta kepentingan bersama dari rakyat, hak-hak atas tanah dapat dicabut, dengan memberi ganti kerugian yang layak dan menurut cara yang diatur dengan Undang-undang."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB II",
      "teks": "Bagian II Pendaftaran tanah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian II",
      "teks": "(1) Untuk menjamin kepastian hukum oleh Pemerintah diadakan pendaftaran tanah diseluruh wilayah Republik Indonesia menurut ketentuan-ketentuan yang diatur dengan Peraturan Pemerintah.\n(2) Pendaftaran tersebut dalam ayat (1) pasal ini meliputi:\na. pengukuran perpetaan dan pembukuan tanah;\nb. pendaftaran hak-hak atas tanah dan peralihan hak-hak tersebut;\nc. pemberian surat-surat tanda bukti hak, yang berlaku sebagai alat pembuktian yang kuat.\n(3) Pendaftaran tanah diselenggarakan dengan mengingat keadaan Negara dan masyarakat, keperluan lalu-lintas sosial ekonomi serta kemungkinan penyelenggaraannya, menurut pertimbangan Menteri Agraria.\n(4) Dalam Peraturan Pemerintah diatur biaya-biaya yang bersangkutan dengan pendaftaran termaksud dalam ayat (1) diatas, dengan ketentuan bahwa rakyat yang tidak mampu dibebaskan dari pembayaran biaya-biaya tersebut."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB II",
      "teks": "Bagian III Hak milik."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "(1) Hak milik adalah hak turun-menurun, terkuat dan terpenuh yang dapat dipunyai orang atas tanah, dengan mengingat ketentuan dalam pasal 6.\n(2) Hak milik dapat beralih dan dialihkan kepada pihak lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "(1) Hanya warga-negara Indonesia dapat mempunyai hak milik.\n(2) Oleh Pemerintah ditetapkan badan-badan hukum yang dapat mempunyai hak milik dan syarat-syaratnya.\n(3) Orang asing yang sesudah berlakunya Undang-undang ini memperoleh hak milik karena pewarisan tanpa wasiat atau percampuran harta karena perkawinan, demikian pula warga-negara Indonesia yang mempunyai hak milik dan setelah berlakunya Undang-undang ini kehilangan kewarga-negaraannya wajib melepaskan hak itu didalam jangka waktu satu tahun sejak diperolehnya hak tersebut atau hilangnya kewarga-negaraan itu. Jika sesudah jangka waktu tersebut lampau hak milik itu dilepaskan, maka hak tersebut hapus karena hukum dan tanahnya jatuh pada Negara, dengan ketentuan bahwa hak-hak pihak lain yang membebaninya tetap berlangsung.\n(4) Selama seseorang disamping kewarga-negaraan Indonesianya mempunyai kewarga-negaraan asing maka ia tidak dapat mempunyai tanah dengan hak milik dan baginya berlaku ketentuan dalam ayat (3) pasal ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "(1) Terjadinya hak milik menurut hukum adat diatur dengan Peraturan Pemerintah.\n(2) Selain menurut cara sebagai yang dimaksud dalam ayat (1) pasal ini hak milik terjadi karena :\na. penetapan Pemerintah, menurut cara dan syarat-syarat yang ditetapkan dengan Peraturan Pemerintah;\nb. ketentuan Undang-undang."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "(1) Hak milik, demikian pula setiap peralihan, hapusnya dan pembebanannya dengan hak-hak lain harus didaftarkan menurut ketentuan-ketentuan yang dimaksud dalam pasal 19.\n(2) Pendaftaran termaksud dalam ayat (1) merupakan alat pembuktian yang kuat mengenai hapusnya hak milik serta sahnya peralihan dan pembebanan hak tersebut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "Penggunaan tanah milik oleh bukan pemiliknya dibatasi dan diatur dengan peraturan perundangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "Hak milik dapat dijadikan jaminan utang dengan dibebani hak tanggungan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "(1) Jual-beli, penukaran, penghibahan, pemberian dengan wasiat, pemberian menurut adat dan perbuatan-perbuatan lain yang dimaksudkan untuk memindahkan hak milik serta pengawasannya diatur dengan Peraturan Pemerintah.\n(2) Setiap jual-beli, penukaran, penghibahan, pemberian dengan wasiat dan perbuatan-perbuatan lain yang dimaksudkan untuk langsung atau tidak langsung memindahkan hak milik kepada orang asing, kepada seorang warga-negara yang disamping kewarganegaraan Indonesianya mempunyai kewarga-negaraan asing atau kepada suatu badan hukum kecuali yang ditetapkan oleh Pemerintah termaksud dalam pasal 21 ayat (2), adalah batal karena hukum dan tanahnya jatuh kepada Negara, dengan ketentuan, bahwa hak-hak pihak lain yang membebaninya tetap berlangsung serta semua pembayaran yang telah diterima oleh pemilik tidak dapat dituntut kembali."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "teks": "Hak milik hapus bila:\na. tanahnya jatuh kepada negara:\n1. karena pencabutan hak berdasarkan pasal 18;\n2. karena penyerahan dengan sukarela oleh pemiliknya;\n3. karena diterlantarkan;\n4. karena ketentuan pasal 21 ayat (3) dan 26 ayat (2).\nb. tanahnya musnah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IV.",
      "teks": "(1) Hak guna-usaha adalah hak untuk mengusahakan tanah yang dikuasai langsung oleh Negara, dalam jangka waktu sebagaimana tersebut dalam pasal 29, guna perusahaan pertanian, perikanan atau peternakan.\n(2) Hak guna-usaha diberikan atas tanah yang luasnya paling sedikit 5 hektar, dengan ketentuan bahwa jika luasnya 25 hektar atau lebih harus memakai investasi modal yang layak dan tehnik perusahaan yang baik, sesuai dengan perkembangan zaman.\n(3) Hak guna-usaha dapat beralih dan dialihkan kepada pihak lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IV.",
      "teks": "(1) Hak guna-usaha diberikan untuk waktu paling lama 25 tahun.\n(2) Untuk perusahaan yang memerlukan waktu yang lebih lama dapat diberikan hak guna-usaha untuk waktu paling lama 35 tahun.\n(3) Atas permintaan pemegang hak dan mengingat keadaan perusahaannya jangka waktu yang dimaksud dalam ayat (1) dan (2) pasal ini dapat diperpanjang dengan waktu yang paling lama 25 tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IV.",
      "teks": "(1) Yang dapat mempunyai hak guna-usaha ialah:\na. warga-negara Indonesia;\nb. badan hukum yang didirikan menurut hukum Indonesia dan berkedudukan di Indonesia.\n(2) Orang atau badan hukum yang mempunyai hak guna-usaha dan tidak lagi memenuhi syarat-syarat sebagai yang tersebut dalam ayat (1) pasal ini dalam jangka waktu satu tahun wajib melepaskan atau mengalihkan hak itu kepada pihak lain yang memenuhi syarat. Ketentuan ini berlaku juga terhadap pihak yang memperoleh hak guna-usaha, jika ia tidak memenuhi syarat tersebut. Jika hak guna-usaha yang bersangkutan tidak dilepaskan atau dialihkan dalam jangka waktu tersebut maka hak itu hapus karena hukum, dengan ketentuan bahwa hak-hak pihak lain akan diindahkan, menurut ketentuan-ketentuan yang ditetapkan dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IV.",
      "teks": "Hak guna-usaha terjadi karena penetapan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IV.",
      "teks": "(1) Hak guna-usaha, termasuk syarat-syarat pemberiannya, demikian juga setiap peralihan dan penghapusan hak tersebut, harus didaftarkan menurut ketentuan-ketentuan yang dimaksud dalam pasal 19.\n(2) Pendaftaran termaksud dalam ayat (1) merupakan alat pembuktian yang kuat mengenai peralihan serta hapusnya hak guna usaha, kecuali dalam hal hak itu hapus karena jangka waktunya berakhir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IV.",
      "teks": "Hak guna-usaha dapat dijadikan jaminan utang dengan dibebani hak tanggungan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IV.",
      "teks": "Hak guna-usaha hapus karena:\na. jangka waktunya berakhir;\nb. dihentikan sebelum jangka waktunya berakhir karena sesuatu syarat tidak dipenuhi;\nc. dilepaskan oleh pemegang haknya sebelum jangka waktunya berakhir;\nd. dicabut untuk kepentingan umum;\ne. diterlantarkan;\nf. tanahnya musnah;\ng. ketentuan dalam pasal 30 ayat (2)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian v.",
      "teks": "(1) Hak guna-bangunan adalah hak untuk mendirikan dan mempunyai bangunan-bangunan atas tanah yang bukan miliknya sendiri, dengan jangka waktu paling lama 30 tahun.\n(2) Atas permintaan pemegang hak dan dengan mengingat keperluan serta keadaan bangunan-bangunannya, jangka waktu tersebut dalam ayat (1) dapat diperpanjang dengan waktu paling lama 20 tahun.\n(3) Hak guna-bangunan dapat beralih dan dialihkan kepada pihak lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian v.",
      "teks": "(1) Yang dapat mempunyai hak guna-bangunan ialah:\na. warga-negara Indonesia;\nb. badan hukum yang didirikan menurut hukum Indonesia dan berkedudukan di Indonesia.\n(2) Orang atau badan hukum yang mempunyai hak guna-bangunan dan tidak lagi memenuhi syarat-syarat yang tersebut dalam ayat (1) pasal ini dalam jangka waktu 1 tahun wajib melepaskan atau mengalihkan hak itu kepada pihak lain yang memenuhi syarat. Ketentuan ini berlaku juga terhadap pihak yang memperoleh hak guna-bangunan, jika ia tidak memenuhi syarat-syarat tersebut. Jika hak guna-bangunan yang bersangkutan tidak dilepaskan atau dialihkan dalam jangka waktu tersebut, maka hak itu hapus karena hukum, dengan ketentuan, bahwa hak-hak pihak lain akan diindahkan, menurut ketentuan-ketentuan yang ditetapkan dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian v.",
      "teks": "Hak guna-bangunan terjadi:\na. mengenai tanah yang dikuasai langsung oleh Negara; karena penetapan Pemerintah;\nb. mengenai tanah milik; karena perjanjian yang berbentuk otentik antara pemilik tanah yang bersangkutan dengan pihak yang akan memperoleh hak guna bangunan itu, yang bermaksud menimbulkan hak tersebut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian v.",
      "teks": "(1) Hak guna-bangunan, termasuk syarat-syarat pemberiannya, demikian juga setiap peralihan dan hapusnya hak tersebut harus didaftarkan menurut ketentuan-ketentuan yang dimaksud dalam pasal 19.\n(2) Pendaftaran termaksud dalam ayat (1) merupakan alat pembuktian yang kuat mengenai hapusnya hak guna-bangunan serta sahnya peralihan hak tersebut, kecuali dalam hal hak itu hapus karena jangka waktunya berakhir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian v.",
      "teks": "Hak guna-bangunan dapat dijadikan jaminan utang dengan dibebani hak tanggungan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian v.",
      "teks": "Hak guna-bangunan hapus karena:\na. jangka waktunya berakhir;\nb. dihentikan sebelum jangka waktunya berakhir karena sesuatu syarat tidak dipenuhi;\nc. dilepaskan oleh pemegang haknya sebelum jangka waktunya berakhir;\nd. dicabut untuk kepentingan umum;\ne. diterlantarkan;\nf. tanahnya musnah;\ng. ketentuan dalam pasal 36 ayat (2)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian VI.",
      "teks": "(1) Hak pakai adalah hak untuk menggunakan dan/atau memungut hasil dari tanah yang dikuasai langsung oleh Negara atau tanah milik orang lain, yang memberi wewenang dan kewajiban yang ditentukan dalam keputusan pemberiannya oleh pejabat yang berwenang memberikannya atau dalam perjanjian dengan pemilik tanahnya, yang bukan perjanjian sewa-menyewa atau perjanjian pengolahan tanah, segala sesuatu asal tidak bertentangan dengan jiwa dan ketentuan-ketentuan Undang-undang ini.\n(2) Hak pakai dapat diberikan:\na. selama jangka waktu yang tertentu atau selama tanahnya dipergunakan untuk keperluan yang tertentu;\nb. dengan cuma-cuma, dengan pembayaran atau pemberian jasa berupa apapun.\n(3) Pemberian hak pakai tidak boleh disertai syarat-syarat yang mengandung unsur-unsur pemerasan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian VI.",
      "teks": "Yang dapat mempunyai hak pakai ialah:\na. warga-negara Indonesia;\nb. orang asing yang berkedudukan di Indonesia;\nc. badan hukum yang didirikan menurut hukum Indonesia dan berkedudukan di Indonesia;\nd. badan hukum asing yang mempunyai perwakilan di Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian VI.",
      "teks": "(1) Sepanjang mengenai tanah yang dikuasai langsung oleh Negara maka hak pakai hanya dapat dialihkan kepada pihak lain dengan izin pejabat yang berwenang.\n(2) Hak pakai atas tanah-milik hanya dapat dialihkan kepada pihak lain, jika hal itu dimungkinkan dalam perjanjian yang bersangkutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian VII.",
      "teks": "(1) Seseorang atau suatu badan hukum mempunyai hak sewa atas tanah, apabila ia berhak mempergunakan tanah-milik orang lain untuk keperluan bangunan, dengan membayar kepada pemiliknya sejumlah uang sebagai sewa.\n(2) Pembayaran uang sewa dapat dilakukan:\na. satu kali atau pada tiap-tiap waktu tertentu;\nb. sebelum atau sesudah tanahnya dipergunakan.\n(3) Perjanjian sewa tanah yang dimaksudkan dalam pasal ini tidak boleh disertai syarat-syarat yang mengandung unsur-unsur pemerasan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian VII.",
      "teks": "Yang dapat menjadi pemegang hak sewa ialah:\na. warga-negara Indonesia;\nb. orang asing yang berkedudukan di Indonesia;\nc. badan hukum yang didirikan menurut hukum Indonesia dan berkedudukan di Indonesia;\nd. badan hukum asing yang mempunyai perwakilan di Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian VIII.",
      "teks": "(1) Hak membuka tanah dan memungut hasil hutan hanya dapat dipunyai oleh warga-negara Indonesia dan diatur dengan Peraturan Pemerintah.\n(2) Dengan mempergunakan hak memungut hasil hutan secara sah tidak dengan sendirinya diperoleh hak milik atas tanah itu."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian IX.",
      "teks": "(1) Hak guna air ialah hak memperoleh air untuk keperluan tertentu dan/atau mengalirkan air itu diatas tanah orang lain.\n(2) Hak guna-air serta pemeliharaan dan penangkapan ikan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian x.",
      "teks": "(1) Hak guna ruang angkasa memberi wewenang untuk mempergunakan tenaga dan unsur-unsur dalam ruang angkasa guna usaha-usaha memelihara dan memperkembangkan kesuburan bumi, air serta kekayaan alam yang terkandung didalamnya dan hal-hal lain yang bersangkutan dengan itu.\n(2) Hak guna ruang angkasa diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian XI",
      "teks": "(1) Hak milik tanah badan-badan keagamaan dan sosial sepanjang dipergunakan untuk usaha dalam bidang keagamaan dan sosial, diakui dan dilindungi. Badan-badan tersebut dijamin pula akan memperoleh tanah yang cukup untuk bangunan dan usahanya dalam bidang keagamaan dan sosial.\n(2) Untuk keperluan peribadatan dan keperluan suci lainnya sebagai dimaksud dalam pasal 14 dapat diberikan tanah yang dikuasai langsung oleh Negara dengan hak pakai.\n(3) Perwakafan tanah milik dilindungi dan diatur dengan Peraturan Pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian XII",
      "teks": "(1) Ketentuan-ketentuan lebih lanjut mengenai hak milik diatur dengan Undang-undang.\n(2) Ketentuan-ketentuan lebih lanjut mengenai hak guna-usaha, hak guna-bangunan, hak pakai dan hak sewa untuk bangunan diatur dengan peraturan perundangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian XII",
      "teks": "Hak tanggungan yang dapat dibebankan pada hak milik, hak guna-usaha dan hak guna-bangunan tersebut dalam pasal 25, 33 dan 39 diatur dengan Undang-undang."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "(1) Barangsiapa dengan sengaja melanggar ketentuan dalam pasal 15 dipidana dengan hukuman kurungan selama-lamanya 3 bulan dan/atau denda setinggi-tingginya Rp. 10.000,-\n(2) Peraturan Pemerintah dan peraturan perundangan yang dimaksud dalam pasal 19, 22, 24, 26, ayat (1), 46, 47, 48, 49, ayat (3) dan 50 ayat (2) dapat memberikan ancaman pidana atas pelanggaran peraturannya dengan hukuman kurungan selama-lamanya 3 bulan dan/atau denda setinggi-tingginya Rp. 10.000,-.\n(3) Tindak pidana dalam ayat (1) dan (2) pasal ini adalah pelanggaran.",
      "parent_bagian": "Bagian III"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "(1) Hak-hak yang sifatnya sementara sebagai yang dimaksud dalam pasal 16 ayat (1) huruf h, ialah hak gadai, hak usaha bagi hasil, hak menumpang dan hak sewa tanah pertanian diatur untuk membatasi sifat-sifatnya yang bertentangan dengan Undang-undang ini dan hak-hak tersebut diusahakan hapusnya didalam waktu yang singkat.\n(2) Ketentuan dalam pasal 52 ayat (2) dan (3) berlaku terhadap peraturan-peraturan yang dimaksud dalam ayat (1) pasal ini.",
      "parent_bagian": "Bagian III"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "Berhubung dengan ketentuan-ketentuan dalam pasal 21 dan 26, maka jika seseorang yang disamping kewarganegaraan Indonesianya mempunyai kewarganegaraan Republik Rakyat Tiongkok, telah menyatakan menolak kewarganegaraan Republik Rakyat Tiongkok itu yang disahkan menurut peraturan perundangan yang bersangkutan, ia dianggap hanya berkewarganegaraan Indonesia saja menurut pasal 21 ayat (1).",
      "parent_bagian": "Bagian III"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "(1) Hak-hak asing yang menurut ketentuan konversi pasal I, II, III, IV dan V dijadikan hak usaha-usaha dan hak guna-bangunan hanya berlaku untuk sementara selama sisa waktu hak-hak tersebut, dengan jangka waktu paling lama 20 tahun.\n(2) Hak guna-usaha dan hak guna-bangunan hanya terbuka kemungkinannya untuk diberikan kepada badan-badan hukum yang untuk sebagian atau seluruhnya bermodal asing, jika hal itu diperlukan oleh Undang-undang yang mengatur pembangunan nasional semesta berencana.",
      "parent_bagian": "Bagian III"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 56",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "Selama Undang-undang mengenai hak milik sebagai tersebut dalam pasal 50 ayat (1) belum terbentuk, maka yang berlaku adalah ketentuan-ketentuan hukum adat setempat dan peraturan-peraturan lainnya mengenai hak-hak atas tanah yang memberi wewenang sebagaimana atau mirip dengan yang dimaksud dalam pasal 20, sepanjang tidak bertentangan dengan jiwa dan ketentuan-ketentuan Undang-undang ini.",
      "parent_bagian": "Bagian III"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 57",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "Selama Undang-undang mengenai hak tanggungan tersebut dalam pasal 51 belum terbentuk, maka yang berlaku ialah ketentuan-ketentuan mengenai hypotheek tersebut dalam Kitab Undang-undang Hukum Perdata Indonesia dan Credietverband tersebut dalam Staatsblad 1908 No. 542 sebagai yang telah diubah dengan Staatsblad 1937 No. 190.",
      "parent_bagian": "Bagian III"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 58",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "Selama peraturan-peraturan pelaksanaan Undang-undang ini belum terbentuk, maka peraturan-peraturan baik yang tertulis maupun yang tidak tertulis mengenai bumi dan air serta kekayaan alam yang terkandung didalamnya dan hak-hak atas tanah, yang ada pada mulai berlakunya Undang-undang ini, tetap berlaku sepanjang tidak bertentangan dengan jiwa dari ketentuan-ketentuan dalam Undang-undang ini serta diberi tafsiran yang sesuai dengan itu.",
      "parent_bagian": "Bagian III"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal i",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "(1) Hak eigendom atas tanah yang ada pada mulai berlakunya Undang-undang ini sejak saat tersebut menjadi hak milik tersebut dalam pasal 20 ayat (1), jika yang mempunyainya memenuhi syarat sebagai yang tersebut dalam pasal 21.\n(2) Hak eigendom kepunyaan Pemerintah Negara Asing, yang dipergunakan untuk keperluan rumah kediaman Kepala Perwakilan dan gedung kedutaan, sejak mulai berlakunya Undang-undang ini menjadi hak pakai tersebut dalam pasal 41 ayat (1), yang akan berlangsung selama tanahnya dipergunakan untuk keperluan tersebut diatas.\n(3) Hak eigendom kepunyaan orang asing, seorang warga-negara yang disamping kewarganegaraan Indonesianya mempunyai kewarganegaraan asing dan badan-badan hukum, yang tidak ditunjuk oleh Pemerintah sebagai dimaksud dalam pasal 21 ayat (2) sejak mulai berlakunya Undang-undang ini menjadi hak guna-bangunan tersebut dalam pasal 35 ayat (1), dengan jangka waktu 20 tahun.\n(4) Jika hak eigendom tersebut dalam ayat (1) pasal ini dibebani dengan hak opstal atau hak erfpacht, maka hak opstal dan hak erfpacht itu sejak mulai berlakunya Undang-undang ini menjadi hak guna bangunan tersebut dalam pasal 35 ayat 1, yang membebani hak milik yang bersangkutan selama sisa waktu hak opstal atau hak erfpacht tersebut diatas, tetapi selama-lamanya 20 tahun.\n(5) Jika hak eigendom tersebut dalam ayat (3) pasal ini dibebani dengan hak opstal atau hak erfpacht, maka hubungan antara yang mempunyai hak eigendom tersebut dan pemegang hak-hak opstal atau hak erfpacht selanjutnya diselesaikan menurut pedoman yang ditetapkan oleh Menteri Agraria.\n(6) Hak-hak hypotheek, servituut, vruchtengebruik dan hak-hak lain yang membebani hak eigendom tetap membebani hak milik dan hak guna-bangunan tersebut dalam ayat (1) dan (3) pasal ini, sedang hak-hak tersebut menjadi suatu hak menurut Undang-undang ini.",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "(1) Hak-hak atas tanah yang memberi wewenang sebagaimana atau mirip dengan hak yang dimaksud dalam pasal 20 ayat (1) seperti yang disebut dengan nama sebagai dibawah, yang ada pada mulai berlakunya Undang-undang ini, yaitu : hak agrarisch eigendom, milik, yasan, andarbeni, hak atas druwe, hak atas druwe desa, pesini, grand Sultan, landerinjbezitrecht, altijddurende erfpacht, hak usaha atas bekas tanah partikelir dan hak-hak lain dengan nama apapun juga yang akan ditegaskan lebih lanjut oleh Menteri Agraria, sejak mulai berlakunya Undang-undang ini menjadi hak milik tersebut dalam pasal 20 ayat (1), kecuali jika yang mempunyainya tidak memenuhi syarat sebagai yang tersebut dalam pasal 21.\n(2) Hak-hak tersebut dalam ayat (1) kepunyaan orang asing, warga-negara yang disamping kewarganegaraan Indonesianya mempunyai kewarganegaraan asing dan badan hukum yang tidak ditunjuk oleh Pemerintah sebagai yang dimaksud dalam pasal 21 ayat (2) menjadi hak guna-usaha atau hak guna-bangunan sesuai dengan peruntukan tanahnya, sebagai yang akan ditegaskan lebih lanjut oleh Menteri Agraria.",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "(1) Hak erfpacht untuk perusahaan kebun besar, yang ada pada mulai berlakunya Undang-undang ini, sejak saat tersebut menjadi hak guna-usaha tersebut dalam pasal 28 ayat (1) yang akan berlangsung selama sisa waktu hak erfpacht tersebut, tetapi selama-lamanya 20 tahun.\n(2) Hak erfpacht untuk pertanian kecil yang ada pada mulai berlakunya Undang-undang ini, sejak saat tersebut hapus, dan selanjutnya diselesaikan menurut ketentuan-ketentuan yang diadakan oleh Menteri Agraria.",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal IV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "(1) Pemegang concessie dan sewa untuk perusahaan kebun besar dalam jangka waktu satu tahun sejak mulai berlakunya Undang-undang ini harus mengajukan permintaan kepada Menteri Agraria agar haknya diubah menjadi hak guna-usaha.\n(2) Jika sesudah jangka waktu tersebut lampau permintaan itu tidak diajukan, maka concessie dan sewa yang bersangkutan berlangsung terus selama sisa waktunya, tetapi paling lama lima tahun dan sesudah itu berakhir dengan sendirinya.\n(3) Jika pemegang concessie atau sewa mengajukan permintaan termaksud dalam ayat (1) pasal ini tetapi tidak bersedia menerima syarat-syarat yang ditentukan oleh Menteri Agraria, ataupun permintaannya itu ditolak oleh Menteri Agraria, maka concessie atau sewa itu berlangsung terus selama sisa waktunya, tetapi paling lama lima tahun dan sesudah itu berakhir dengan sendirinya.",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal V",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "Hak opstal dan hak erfpacht untuk perumahan, yang ada pada mulai berlakunya Undang-undang ini, sejak saat tersebut menjadi hak guna-bangunan tersebut dalam pasal 35 ayat (1) yang berlangsung selama sisa waktu hak opstal dan hak erfpacht tersebut, tetapi selama-lamanya 20 tahun.",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal VI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "Hak-hak atas tanah yang memberi wewenang sebagaimana atau mirip dengan hak yang dimaksud dalam pasal 41 ayat (1) seperti yang disebut dengan nama sebagai dibawah, yang ada pada mulai berlakunya Undang-undang ini, yaitu : hak vruchtgebruik, gebruik, grant controleur, bruikleen, ganggam bauntuik, anggaduh, bengkok, lungguh, pituwas, dan hak-hak lain dengan nama apapun juga, yang akan ditegaskan lebih lanjut oleh Menteri Agraria, sejak mulai berlakunya Undang-undang ini menjadi hak pakai tersebut dalam pasal 41 ayat (1) yang memberi wewenang dan kewajiban sebagaimana yang dipunyai oleh pemegang haknya pada mulai berlakunya Undang-undang ini, sepanjang tidak bertentangan dengan jiwa dan ketentuan-ketentuan Undang-undang ini.",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal VII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "(1) Hak gogolan, pekulen atau sanggan yang bersifat tetap yang ada pada mulai berlakunya Undang-undang ini menjadi hak milik tersebut pada pasal 20 ayat (1).\n(2) Hak gogolan, pekulen atau sanggan yang tidak bersifat tetap menjadi hak pakai tersebut pada pasal 41 ayat (1) yang memberi wewenang dan kewajiban sebagai yang dipunyai oleh pemegang haknya pada mulai berlakunya Undang-undang ini.\n(3) Jika ada keragu-raguan apakah sesuatu hak gogolan, pekulen atau sanggan bersifat tetap atau tidak tetap, maka Menteri Agrarialah yang memutuskan.",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal VIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "teks": "(1) Terhadap hak guna-bangunan tersebut pada pasal I ayat (3) dan (4), pasal II ayat (2) dan V berlaku ketentuan dalam Pasal 36 ayat (2).\n(2) Terhadap hak guna-usaha tersebut pada pasal II ayat (2), pasal III ayat (1) dan (2) pasal IV ayat (1) berlaku ketentuan dalam pasal 30 ayat (2).",
      "parent_bab": "BAB II"
    },
    {
      "tipe": "PASAL_PERUBAHAN",
      "label": "Pasal IX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL_PERUBAHAN",
      "parent_bab": "BAB II",
      "parent_bagian": "Bagian III",
      "parent_pasal_perubahan": "Pasal VIII",
      "teks": "Hal-hal yang perlu untuk menyelenggarakan ketentuan-ketentuan dalam pasal-pasal diatas diatur lebih lanjut oleh Menteri Agraria."
    },
    {
      "tipe": "DIKTUM",
      "label": "KETIGA",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Perubahan susunan pemerintahan desa untuk menyelenggarakan perombakan hukum agraria menurut Undang-undang ini akan diatur tersendiri."
    },
    {
      "tipe": "DIKTUM",
      "label": "KEEMPAT",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "a. Hak-hak dan wewenang-wewenang atas bumi dan air dari Swapraja atau bekas Swapraja yang masih ada pada. waktu mulai berlakunya Undang-undang ini hapus dan beralih kepada Negara.\nb. Hal-hal yang bersangkutan dengan ketentuan dalam huruf A diatas diatur lebih lanjut dengan Peraturan Pemerintah."
    },
    {
      "tipe": "DIKTUM",
      "label": "KELIMA",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Undang-undang ini dapat disebut Undang-undang Pokok Agraria dan mulai berlaku pada tanggal diundangkan.\nUndang-undang ini dengan penempatan dalam Lembaran-Negara Republik Indonesia.\nAgar supaya setiap orang dapat mengetahuinya, memerintahkan pengundangan Disahkan di Jakarta pada tanggal 24 September 1960.\nPresiden Republik Indonesia, SUKARNO.\nDiundangkan pada tanggal 24 September 1960.\nSekretaris Negara, TAMZIL."
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "PENJELASAN UMUM",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PENJELASAN_UMUM",
      "teks": "REPUBLIK INDONESIA MEMORI PENJELASAN ATAS RANCANGAN UNDANG-UNDANG POKOK AGRARIA.\na. PENJELASAN UMUM.\n1. Tujuan Undang-undang Pokok Agraria.\nDidalam Negara Republik Indonesia, yang susunan kehidupan rakyatnya, termasuk perekonomiannya, terutama masih bercorak agraria, bumi, air dan ruang angkasa, sebagai karunia Tuhan Yang Maha Esa mempunyai fungsi yang amat penting untuk membangun masyarakat yang adil dan makmur sebagai yang kita cita-citakan.\nDalam pada itu hukum Agraria yang berlaku sekarang ini, yang seharusnya merupakan salah satu alat yang penting untuk membangun masyarakat yang adil dan makmur tersebut, ternyata bahkan sebaliknya, dalam banyak hal justru merupakan penghambat dari pada tercapainya cita-cita diatas. Hal itu disebabkan terutama :\na. karena hukum agraria yang berlaku sekarang ini sebagian tersusun berdasarkan tujuan dan sendi-sendi dari pemerintah jajahan, dan sebagian lainnya lagi dipengaruhi olehnya, hingga bertentangan dengan kepentingan rakyat dan Negara didalam melaksanakan pembangunan semesta dalam rangka menyelesaikan revolusi nasional sekarang ini;\nb. karena sebagai akibat dari politik-hukum pemerintah jajahan itu hukum agraria tersebut mempunyai sifat dualisme, yaitu dengan berlakunya peraturan-peraturan dari hukum-adat disamping peraturan-peraturan dari dan yang didasarkan atas hukum barat, hal mana selain menimbulkan pelbagai masalah antar golongan yang serba sulit, juga tidak sesuai dengan cita-cita persatuan Bangsa;\nc. karena bagi rakyat asli hukum agraria penjajahan itu tidak menjamin kepastian hukum.\nBerhubung dengan itu maka perlu adanya hukum agraria baru yang nasional, yang akan mengganti hukum yang berlaku sekarang ini, yang tidak lagi bersifat dualisme, yang sederhana dan yang menjamin kepastian hukum bagi seluruh rakyat Indonesia.\nHukum agraria yang baru itu harus memberi kemungkinan akan tercapainya fungsi bumi, air dan ruang angkasa sebagai yang dimaksudkan diatas dan harus sesuai pula dengan kepentingan rakyat dan Negara serta memenuhi keperluannya menurut permintaan zaman dalam segala soal agraria. Lain dari itu hukum agraria nasional harus mewujudkan penjelmaan dari pada azas kerokhanian, Negara dan cita-cita Bangsa, yaitu Ketuhanan Yang Maha Esa, Perikemanusiaan, Kebangsaan, Kerakyatan dan Keadilan Sosial serta khususnya harus merupakan pelaksanaan dari pada ketentuan dalam pasal 33 Undang-undang Dasar dan Garis-garis besar dari pada haluan Negara yang tercantum didalam Manifesto Politik Republik Indonesia tanggal 17 Agustus 1959 dan ditegaskan didalam Pidato Presiden tanggal 17 Agustus 1960.\nBerhubung dengan segala sesuatu itu maka hukum yang baru tersebut sendi-sendi dan ketentuan-ketentuan pokoknya perlu disusun didalam bentuk undang-undang, yang akan merupakan dasar bagi penyusunan peraturan-peraturan lainnya.\nREPUBLIK INDONESIA lainnya - yaitu suatu peraturan yang dibuat oleh Pemerintah dengan persetujuan Sungguhpun undang-undang itu formil tiada bedanya dengan undang-undang Dewan Perwakilan Rakyat - tetapi mengingat akan sifatnya sebagai peraturan dasar bagi hukum agraria yang baru, maka yang dimuat didalamnya hanyalah azas-azas serta soal-soal dalam garis besarnya saja dan oleh karenanya disebut Undang-Undang Pokok Agraria. Adapun pelaksanaannya akan diatur didalam berbagai undang-undang, peraturan-peraturan Pemerintah dan peraturan-perundangan lainnya. Demikianlah maka pada pokoknya tujuan Undang-undang Pokok Agraria ialah:\na. meletakkan dasar-dasar bagi penyusunan hukum agraria nasional, yang akan merupakan alat untuk membawakan kemakmuran, kebahagiaan dan keadilan bagi Negara dan rakyat, terutama rakyat tani, dalam rangka masyarakat yang adil dan makmur.\nb. meletakkan dasar-dasar untuk mengadakan kesatuan dan kesederhanaan dalam hukum pertanahan.\nc. meletakkan dasar-dasar untuk memberikan kepastian hukum mengenai hak-hak atas tanah bagi rakyat seluruhnya.\nII. Dasar-dasar dari hukum agraria nasional.\n(1) Pertama-tama dasar kenasionalan itu diletakkan dalam pasal 1 ayat 1, yang menyatakan, bahwa : \"Seluruh wilayah Indonesia adalah kesatuan tanah-air dari seluruh rakyat Indonesia, yang bersatu sebagai bangsa Indonesia\" dan pasal 1 ayat 2 yang berbunyi bahwa : \"Seluruh bumi, air dan ruang angkasa, termasuk kekayaan alam yang terkandung didalamnya dalam wilayah Republik Indonesia sebagai karunia Tuhan Yang Maha Esa, adalah bumi, air dan ruang angkasa bangsa Indonesia dan merupakan kekayaan nasional\".\nIni berarti bahwa bumi, air dan ruang angkasa dalam wilayah Republik Indonesia yang kemerdekaannya diperjuangkan oleh bangsa sebagai keseluruhan, menjadi hak pula dari bangsa Indonesia, jadi tidak semata-mata menjadi hak dari para pemiliknya saja. Demikian pula tanah-tanah didaerah-daerah dan pulau-pulau tidaklah semata-mata menjadi hak rakyat asli dari daerah atau pulau yang bersangkutan saja. Dengan pengertian demikian maka hubungan bangsa Indonesia dengan bumi, air dan ruang angkasa Indonesia merupakan semacam hubungan hak ulayat yang diangkat pada tingkatan yang paling atas, yaitu pada tingkatan yang mengenai seluruh wilayah Negara.\nAdapun hubungan antara bangsa dan bumi, air serta ruang angkasa Indonesia itu adalah hubungan yang bersifat abadi (pasal 1 ayat 3). Ini berarti bahwa selama rakyat Indonesia yang bersatu sebagai bangsa Indonesia masih ada dan selama bumi, air serta ruang angkasa Indonesia itu masih ada pula, dalam keadaan yang bagaimanapun tidak ada sesuatu kekuasaan yang akan dapat memutuskan atau meniadakan hubungan tersebut. Dengan demikian maka biarpun sekarang ini daerah Irian Barat, yang merupakan bagian dari bumi, air dan ruang angkasa Indonesia berada di bawah kekuasaan penjajah, atas dasar ketentuan pasal ini bagian tersebut menurut hukum tetap merupakan bumi, air dan ruang angkasa bangsa Indonesia juga.\nAdapun hubungan antara bangsa dan bumi, air serta ruang angkasa tersebut tidak berarti, bahwa hak milik perseorangan atas (sebagian dari) bumi tidak dimungkinkan lagi. Didalam telah dikemukakan, bahwa hubungan itu adalah semacam hubungan hak ulayat, jadi bukan berarti hubungan milik. Dalam rangka hak ulayat dikenal adanya hak milik perseorangan.\nKiranya dapat ditegaskan bahwa dalam hukum agraria yang baru dikenal pula hak milik yang dapat dipunyai seseorang, baik sendiri maupun bersama-sama dengan orang-orang lain atas bagian dari bumi Indonesia (pasal 4 yo pasal 20).\nDalam pada itu hanya permukaan bumi saja, yaitu yang disebut tanah, yang dapat dihaki oleh seseorang. Selain hak milik sebagai hak turun-temurun, terkuat dan terpenuh yang dapat dipunyai orang atas tanah, diadakan pula hak guna-usaha, hak guna-bangunan, hak-pakai, hak sewa, dan hak-hak lainnya yang akan ditetapkan dengan Undang-undang lain (pasal 4 yo 16).\nBagaimana kedudukan hak-hak tersebut dalam hubungannya dengan hak bangsa (dan Negara) itu akan diuraikan dalam nomor 2 dibawah.\n(2) \"Azas domein\" yang dipergunakan sebagai dasar daripada perundang-undangan agraria yang berasal dari Pemerintah jajahan tidak dikenal dalam hukum agraria yang baru.\nAzas domein adalah bertentangan dengan kesadaran hukum rakyat Indonesia dan azas daripada Negara yang merdeka dan modern. Berhubung dengan ini maka azas tersebut, yang dipertegas dalam berbagai \"pernyataan domein\", yaitu misalnya dalam pasal 1 Agrarisch Besluit (S.1870-118), S.1875-119a, S.1874-94f, S.1888-58 ditinggalkan dan pernyataan-pernyataan domein itu dicabut kembali.\nUndang-Undang Pokok Agraria berpangkal pada pendirian, bahwa untuk mencapai apa yang ditentukan dalam pasal 33 ayat 3 Undang-Undang Dasar tidak perlu dan tidaklah pula pada tempatnya, bahwa bangsa Indonesia ataupun Negara bertindak sebagai pemilik tanah. Adalah lebih tepat jika Negara, sebagai organisasi kekuasaan dari seluruh rakyat (bangsa) bertindak selaku Badan Penguasa. Dari sudut inilah harus dilihat arti ketentuan dalam pasal 2 ayat 1 yang menyatakan, bahwa \"Bumi, air dan ruang angkasa, termasuk kekayaan alam yang terkandung didalamnya, pada tingkatan yang tertinggi dikuasai oleh Negara\". Sesuai dengan pangkal pendirian tersebut diatas perkataan \"dikuasai\" dalam pasal ini bukanlah berarti \"dimiliki\", akan tetapi adalah pengertian, yang memberi wewenang kepada Negara, sebagai organisasi kekuasaan dari Bangsa Indonesia itu, untuk pada tingkatan yang tertinggi :\na. mengatur dan menyelenggarakan peruntukan, penggunaan, persediaan dan pemeliharaannya.\nb. menentukan dan mengatur hak-hak yang dapat dipunyai atas (bagian dari) bumi, air dan ruang angkasa itu.\nc. menentukan dan mengatur hubungan-hubungan hukum antara orang-orang dan perbuatan-perbuatan hukum yang mengenai bumi, air dan ruang angkasa.\nSegala sesuatunya dengan tujuan : untuk mencapai sebesar-besar kemakmuran rakyat dalam rangka masyarakat yang adil dan makmur (pasal 2 ayat 2 dan 3).\nAdapun kekuasaan Negara yang dimaksudkan itu mengenai semua bumi, air dan ruang angkasa, jadi baik yang sudah dihaki oleh seseorang maupun yang tidak. Kekuasaan Negara mengenai tanah yang sudah dipunyai orang dengan sesuatu hak dibatasi oleh isi dari hak itu, artinya sampai seberapa Negara memberi kekuasaan kepada yang mempunyai untuk menggunakan haknya sampai disitulah batas kekuasaan Negara tersebut. Adapun isi hak-hak itu serta pembatasan-pembatasannya dinyatakan dalam pasal 4 dan pasal-pasal berikutnya serta pasal-pasal dalam BAB II.\nREPUBLIK INDONESIA Kekuasaan Negara atas tanah yang tidak dipunyai dengan sesuatu hak oleh seseorang atau pihak lainnya adalah lebih luas dan penuh. Dengan berpedoman pada tujuan yang disebutkan diatas Negara dapat memberikan tanah yang demikian itu kepada seseorang atau badan-hukum dengan sesuatu hak menurut peruntukan dan keperluannya, misalnya hak milik, hak-guna-usaha, hak guna-bangunan atau hak pakai atau memberikannya dalam pengelolaan kepada sesuatu Badan Penguasa (Departemen, Jawatan atau Daerah Swatantra) untuk dipergunakan bagi pelaksanaan tugasnya masing-masing (pasal 2 ayat 4). Dalam pada itu kekuasaan Negara atas tanah-tanah inipun sedikit atau banyak dibatasi pula oleh hak ulayat dari kesatuan-kesatuan masyarakat hukum, sepanjang menurut kenyataannya hak ulayat itu masih ada, hal mana akan diuraikan lebih lanjut dalam nomor 3 di bawah ini.\n(3) Bertalian dengan hubungan antara bangsa dan bumi serta air dan kekuasaan Negara sebagai yang disebut dalam pasal 1 dan 2 maka didalam pasal 3 diadakan ketentuan mengenai hak ulayat dari kesatuan-kesatuan masyarakat hukum, yang dimaksud akan mendudukkan hak itu pada tempat yang sewajarnya didalam alam bernegara dewasa ini.\nPasal 3 itu menentukan, bahwa : \"Pelaksanaan hak ulayat dan hak-hak yang serupa itu dari masyarakat-masyarakat hukum adat, sepanjang menurut kenyataannya masih ada, harus sedemikian rupa hingga sesuai dengan kepentingan nasional dan Negara, yang berdasarkan atas persatuan bangsa serta tidak boleh bertentangan dengan undang-undang dan peraturan-peraturan lain yang lebih tinggi\".\nKetentuan ini pertama-tama berpangkal pada pengakuan adanya hak ulayat itu dalam hukum-agraria yang baru. Sebagaimana diketahui biarpun menurut kenyataannya hak ulayat itu ada dan berlaku serta diperhatikan pula didalam keputusan-keputusan hakim, belum pernah hak tersebut diakui secara resmi didalam Undang-Undang, dengan akibat bahwa didalam melaksanakan peraturan-peraturan agraria hak ulayat itu pada zaman penjajahan dulu sering kali diabaikan. Berhubung dengan disebutnya hak ulayat didalam Undang-undang Pokok Agraria, yang pada hakekatnya berarti pula pengakuan hak itu, maka pada dasarnya hak ulayat itu akan diperhatikan, sepanjang hak tersebut menurut kenyataannya memang masih ada pada masyarakat hukum yang bersangkutan. Misalnya didalam pemberian sesuatu hak atas tanah (umpamanya hak guna-usaha) masyarakat hukum yang bersangkutan sebelumnya akan didengar pendapatnya dan akan diberi \"recognitie\", yang memang ia berhak menerimanya selaku pemegang hak ulayat itu.\nTetapi sebaliknya tidaklah dapat dibenarkan, jika berdasarkan hak ulayat itu masyarakat hukum tersebut menghalang-halangi pemberian hak guna-usaha itu, sedangkan pemberian hak tersebut didaerah itu sungguh perlu untuk kepentingan yang lebih luas. Demikian pula tidaklah dapat dibenarkan jika sesuatu masyarakat hukum berdasarkan hak ulayatnya, misalnya menolak begitu saja dibukanya hutan secara besar-besaran dan teratur untuk melaksanakan proyek-proyek yang besar dalam rangka pelaksanaan rencana menambah hasil bahan makanan dan pemindahan penduduk. Pengalaman menunjukkan pula, bahwa pembangunan daerah-daerah itu sendiri seringkali terhambat karena mendapat kesukaran mengenai hak ulayat. Inilah yang merupakan pangkal pikiran kedua daripada ketentuan dari pasal 3 tersebut diatas. Kepentingan sesuatu masyarakat hukum harus tunduk pada kepentingan nasional dan Negara yang lebih luas dan hak ulayatnya pun pelaksanaannya harus sesuai dengan kepentingan yang lebih luas itu.\nREPUBLIK INDONESIA Tidaklah dapat dibenarkan, jika didalam alam bernegara dewasa ini sesuatu masyarakat hukum masih mempertahankan isi dan pelaksanaan hak ulayatnya secara mutlak, seakan-akan ia terlepas daripada hubungannya dengan masyarakat-masyarakat hukum dan daerah-daerah lainnya didalam lingkungan Negara sebagai kesatuan. Sikap yang demikian terang bertentangan dengan azas pokok yang tercantum dalam pasal 2 dan dalam prakteknya pun akan membawa akibat terhambatnya usaha-usaha besar untuk mencapai kemakmuran Rakyat seluruhnya.\nTetapi sebagaimana telah jelas dari uraian diatas, ini tidak berarti, bahwa kepentingan masyarakat hukum yang bersangkutan tidak akan diperhatikan sama sekali.\n(4) Dasar yang keempat diletakkan dalam pasal 6, yaitu bahwa \"Semua hak atas tanah mempunyai fungsi sosial\".\nIni berarti, bahwa hak atas tanah apapun yang ada pada seseorang, tidaklah dapat dibenarkan, bahwa tanahnya itu akan dipergunakan (atau tidak dipergunakan) semata-mata untuk kepentingan pribadinya, apalagi kalau hal itu menimbulkan kerugian bagi masyarakat. Penggunaan tanah harus disesuaikan dengan keadaannya dan sifat daripada haknya, hingga bermanfaat baik bagi kesejahteraan dan kebahagiaan yang mempunyainya maupun bermanfaat bagi masyarakat dan Negara.\nTetapi dalam pada itu ketentuan tersebut tidak berarti, bahwa kepentingan perseorangan akan terdesak sama sekali oleh kepentingan umum (masyarakat).\nUndang-Undang Pokok Agraria memperhatikan pula kepentingan-kepentingan perseorangan.\nKepentingan masyarakat dan kepentingan perseorangan haruslah saling mengimbangi, hingga pada akhirnya akan tercapailah tujuan pokok : kemakmuran, keadilan dan kebahagiaan bagi rakyat seluruhnya (pasal 2 ayat 3).\nBerhubung dengan fungsi sosialnya, maka adalah suatu hal yang sewajarnya bahwa tanah itu harus dipelihara baik-baik, agar bertambah kesuburannya serta dicegah kerusakannya. Kewajiban memelihara tanah ini tidak saja dibebankan kepada pemiliknya atau pemegang haknya yang bersangkutan, melainkan menjadi beban pula dari setiap orang, badan-hukum atau instansi yang mempunyai suatu hubungan hukum dengan tanah itu (pasal 15). Dalam melaksanakan ketentuan ini akan diperhatikan kepentingan pihak yang ekonomis lemah.\n(5) Sesuai dengan azas kebangsaan tersebut dalam pasal 1 maka menurut pasal 9 yo pasal 21 ayat 1 hanya warganegara Indonesia saja yang dapat mempunyai hak milik atas tanah, Hak milik tidak dapat dipunyai oleh orang asing dan pemindahan hak milik kepada orang asing dilarang (pasal 26 ayat 2). Orang-orang asing dapat mempunyai tanah dengan hak pakai yang luasnya terbatas.\nDemikian juga pada dasarnya badan-badan hukum tidak dapat mempunyai hak milik (pasal 21 ayat 2). Adapun pertimbangan untuk (pada dasarnya) melarang badan-badan hukum mempunyai hak milik atas tanah, ialah karena badan-badan hukum tidak perlu mempunyai hak milik tetapi cukup hak-hak lainnya, asal saja ada jaminan-jaminan yang cukup bagi keperluan-keperluannya yang khusus (hak guna-usaha, hak guna-bangunan, hak pakai menurut pasal 28, 35 dan 41). Dengan demikian maka dapat dicegah usaha-usaha yang bermaksud menghindari ketentuan-ketentuan mengenai batas maksimum luas tanah yang dipunyai dengan hak milik (pasal 17).\nREPUBLIK INDONESIA Meskipun pada dasarnya badan-badan hukum tidak dapat mempunyai hak milik atas tanah, tetapi mengingat akan keperluan masyarakat yang sangat erat hubungannya dengan faham keagamaan, sosial dan hubungan perekonomian, maka diadakanlah suatu \"escape-clause\" yang memungkinkan badan-badan hukum tertentu mempunyai hak milik. Dengan adanya \"escape-clause\" ini maka cukuplah nanti bila ada keperluan akan hak milik bagi sesuatu atau macam badan hukum diberikan dispensasi oleh Pemerintah, dengan jalan menunjuk badan hukum tersebut sebagai badan-badan hukum yang dapat mempunyai hak milik atas tanah (pasal 21 ayat 2). Badan-badan hukum yang bergerak dalam lapangan sosial dan keagamaan ditunjuk dalam"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah dijelaskan dalam Penjelasan Umum (II angka 1). Dalam Undang-Undang Pokok Agraria diadakan perbedaan antara pengertian ..bumi\" dan \"tanah\", sebagai yang dirumuskan dalam pasal 1 ayat 3 dan pasal 4 ayat 1. Yang dimaksud dengan \"tanah\" ialah permukaan bumi.\nPerluasan pengertian \"bumi\" dan \"air\" dengan ruang angkasa adalah bersangkutan dengan kemajuan tehnik dewasa ini dan ke- mungkinan-kemungkinannya dalam waktu- waktu yang akan datang."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah diuraikan dalam Penjelasan Umum (Il angka 2).\nKetentuan dalam ayat 4 adalah bersangkutan dengan azas ekonomi dan medebewind dalam penyelenggaraan pemerintahan daerah. Soal agraria menurut sifatnya dan pada azasnya merupakan tugas Pemerintah Pusat ( pasal 33 ayat 3 Undang-Undang Dasar).\nDengan demikian maka pelimpahan wewenang untuk melaksanakan hak penguasaan dari Negara atas tanah itu adalah merupakan medebewind. Segala sesuatunya akan diselenggarakan menurut keperluannya dan sudah barang tentu tidak boleh bertentangan dengan kepentingan nasional. Wewenang dalam bidang agraria dapat merupakan sumber keuangan bagi daerah itu."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan \"hak ulayat dan hak-hak yang serupa itu\" ialah apa yang didalam perpustakaan hukum adat disebut \"beschikkingsrecht\". Selanjutnya lihat Penjelasan Umum (Il angka 3)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah dijelaskan dalam Penjelasan Umum (Il angka 1)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Penegasan, bahwa hukum adat dijadikan dasar dari hukum agraria yang baru.\nSelanjutnya lihat Penjelasan Umum (Ill angka 1)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak hanya hak milik tetapi semua hak atas tanah mempunyai fungsi sosial. Hal ini telah diuraikan dalam Penjelasan Umum (Il angka 4)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Azas yang menegaskan dilarangnya \"groot-grondbezit\" sebagai yang telah diuraikan dalam Penjelasan Umum (ll angka 7). Soal pembatasan itu diatur lebih lanjut dalam pasal 17. Terhadap azas ini tidak ada pengecualiannya."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Karena menurut ketentuan dalam pasal 4 ayat 2 hak-hak atas tanah itu hanya memberi hak atas permukaan bumi saja, maka wewenang-wewenang yang bersumber daripadanya tidaklah mengenai kekayaan-kekayaan alam yang terkandung didalam tubuh bumi, air dan ruang angkasa. Oleh karena itu maka pengambilan kekayaan yang dimaksudkan itu memerlukan pengaturan tersendiri. Ketentuan ini merupakan pangkal bagi perundang-undangan pertambangan dan lain-lainnya."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat 1 telah dijelaskan dalam Penjelasan Umum (ll angka 5).\nKetentuan dalam ayat 2 adalah akibat daripada ketentuan dalam pasal 1 ayat 1 dan 2."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah dijelaskan didalam Penjelasan Umum (ll angka 7). Kata- kata \"pada azasnya\" menunjuk pada kemungkinan diadakannya pengecualian-pengecualian sebagai yang disebutkan sebagai misal didalam Penjelasan Umum itu. Tetapi pengecualian- pengecualian itu perlu diatur didalam peraturan perundangan (Bandingkan penjelasan pasal Penggunaan tanah milik oleh bukan pemiliknya masih dimungkinkan oleh pasal 24, tetapi dibatasi dan akan diatur."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal ini memuat prinsip perlindungan kepada golongan yang ekonomis lemah terhadap yang kuat. Golongan yang ekonomis lemah itu bisa warganegara asli keturunan asing. Demikian pula sebaliknya. Lihat Penjelasan Umum (Ill angka 2)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ketentuan dalam ayat 1 bersangkutan dengan ketentuan-ketentuan dalam pasal 11 ayat 1. Bentuk usaha bersama yang sesuai dengan ketentuan ini adalah bentuk koperasi dan bentuk- bentuk gotong-royong lainnya. Ketentuan dalam ayat 2 memberi kemungkinan diadakannya suatu \"usaha bersama\" antara Negara dan Swasta dalam bidang agraria. Yang dimaksud dengan \"fihak lain\" itu ialah pemerintah daerah, pengusaha swasta yang bermodal nasional atau swasta dengan \"domestic capital\" yang progresip."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat 1, 2 dan 3.\nSudah dijelaskan dalam Penjelasan Umum (Il angka 6).\nKetentuan dalam ayat 4 adalah pelaksanaan daripada azas keadilan sosial yang berperikemanusiaan dalam bidang agraria."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal ini mengatur soal perencanaan persediaan, peruntukan dan penggunaan bumi, air dan ruang angkasa sebagai yang telah dikemukakan dalam penjelasan umum (li angka 8). Mengingat akan corak perekonomian Negara dikemudian hari dimana industri dan pertambangan akan mempunyai peranan yang penting, maka disamping perencanaan untuk pertanian perlu diperhatikan, pula keperluan untuk industri dan pertambangan (ayat 1 huruf d dan e). Perencanaan itu tidak saja bermaksud menyediakan tanah untuk pertanian, peternakan, perikanan, industri dan pertambangan, tetapi juga ditujukan untuk memajukannya. Pengesahan peraturan Pemerintah Daerah harus dilakukan dalam rangka rencana umum yang dibuat oleh Pemerintah Pusat dan sesuai dengan kebijaksanaan Pusat."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah dijelaskan dalam Penjelasan Umum ((Il angka 4). Tanah wajib dipelihara dengan baik, yaitu dipelihara menurut cara-cara yang lazim dikerjakan didaerah yang bersangkutan, sesuai dengan petunjuk-petunjuk dari Jawatan-Jawatan yang bersangkutan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal ini adalah pelaksanaan dari pada ketentuan dalam pasal 4. Sesuai dengan azas yang diletakkan dalam pasal 5, bahwa hukum pertanahan yang Nasional didasarkan atas hukum adat, maka penentuan hak-hak atas tanah dan air dalam pasal ini didasarkan pula atas sistematik dari hukum adat. Dalam pada itu hak guna- usaha dan hak-guna-bangunan diadakan untuk memenuhi keperluan masyarakat modern dewasa ini. Perlu kiranya ditegaskan, bahwa hak-guna usaha bukan hak erfpacht dari Kitab Undang-Undang Hukum Perdata. Hak guna-bangunan bukan hak opstal. Lembaga erfpacht dan opstal ditiadakan dengan dicabutnya ketentuan-ketentuan dalam Buku ke Il Kitab Undang-Undang Hukum Perdata.\nDalam pada itu hak-hak adat yang sifatnya bertentangan dengan ketentuan-ketentuan Undang-Undang ini ( pasal 7 dan 10), tetapi berhubung dengan keadaan masyarakat sekarang ini belum dapat dihapuskan diberi sifat sementara dan akan diatur (ayat 1 huruf h yo pasal 53)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ketentuan pasal ini merupakan pelaksanaan dari apa yang di- tentukan dalam pasal 7.\nPenetapan,batas luas maksimum akan dilakukan didalam waktu yang singkat dengan peraturan perundangan. Tanah-tanah yang merupakan kelebihan dari batas maksimum itu tidak akan disita, tetapi akan diambil oleh Pemerintah dengan ganti-kerugian.\nTanah-tanah tersebut selanjutnya akan dibagi-bagikan kepada rakyat yang membutuhkannya. Ganti kerugian kepada bekas pemilik tersebut diatas pada azasnya harus dibayar oleh mereka yang memperoleh bagian tanah itu. Tetapi oleh karena mereka itu umumnya tidak mampu untuk membayar harga tanahnya didalam waktu yang singkat, maka oleh Pemerintah akan disediakan kredit dan usaha-usaha lain supaya pra bekas pemilik tidak terlalu lama menunggu uang ganti-kerugian yang dimaksudkan itu.\nDitetapkannya batas minimum tidaklah berarti bahwa orang- orang yang mempunyai, tanah kurang dari itu akan dipaksa untuk melepaskan tanahnya. Penetapan batas minimum itu pertama-tama dimaksudkan untuk mencegah pemecah-belahan (\"versplintering\") tanah lebih lanjut. Disamping itu akan diadakan usaha-usaha misalnya: transmigrasi, pembukaan tanah besar-besaran diluar Jawa dan industrialisasi, supaya batas minimum tersebut dapat dicapai secara berangsur-angsur.\nYang dimaksud dengan \"keluarga\" ialah suami, isteri serta anak-anaknya yang belum kawin dan menjadi tanggungannya dan yang jumlahnya berkisar sekitar 7 orang. Baik laki-laki maupun wanita dapat menjadi kepala keluarga."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal ini merupakan jaminan bagi rakyat mengenai hak-haknya atas tanah. Pencabutan hak dimungkinkan, tetapi diikat dengan syarat-syarat, misalnya harus disertai pemberian ganti-kerugian yang layak."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pendaftaran tanah ini akan diselenggarakan dengan cara yang sederhana dan mudah dimengerti serta dijalankan oleh rakyat yang bersangkutan (Lihat Penjelasan Umum IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Dalam pasal ini disebutkan sifat-sifat daripada hak milik yang membedakannya dengan hak-hak lainnya. Hak milik adalah hak yang \"terkuat dan terpenuh\" yang dapat dipunyai orang atas tanah. Pemberian sifat ini tidak berarti, bahwa hak itu merupakan hak yang mutlak, tak terbatas dan tidak dapat diganggu-gugat\" sebagai hak eigendom menurut pengertiannya yang asli dulu. Sifat yang demikian akan terang bertentangan dengan sifat hukum-adat dan fungsi sosial dari tiap-tiap hak. Kata-kata \"terkuat dan terpenuh\" itu bermaksud untuk membedakannya dengan hak guna-usaha, hak guna-bangunan, hak pakai dan lain-lainnya, yaitu untuk menunjukkan, bahwa diantara hak-hak atas tanah yang dapat dipunyai orang hak miliklah yang \"ter (artinya : paling)-kuat dan terpenuh."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat 1 dan 2 sudah diuraikan dalam Penjelasan Umum (II angka 5).\nDalam ayat 3 hanya disebut 2 cara memperoleh hak milik karena lain-lain cara dilarang oleh pasal 26 ayat 2. Adapun cara-cara yang disebut dalam ayat ini adalah cara-cara memperoleh hak tanpa melakukan suatu tindakan positip yang sengaja ditujukan pada terjadinya peralihan hak itu.\nSudah selayaknyalah kiranya bahwa selama orang-orang warganegara membiarkan diri disamping kewarganegaraan Indonesianya mempunyai kewarganegaraan Negara lain, dalam hal pemilikan tanah ia dibedakan dari warganegara Indonesia lainnya."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sebagai misal dari cara terjadinya hak milik menurut hukum adat ialah pembukaan tanah. Cara-cara itu akan diatur supaya tidak terjadi hal-hal yang merugikan kepentingan umum dan Negara."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah dijelaskan dalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sebagai pengecualian dari azas yang dimuat dalam pasal 10. Bentuk-bentuk hubungan antara pemilik dan penggarap/pemakai itu ialah misalnya : sewa, bagi-hasil, pakai atau hak guna-bangunan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tanah milik yang dibebani hak tanggungan ini tetap ditangan pemiliknya. Pemilik tanah yang memerlukan uang dapat pula (untuk sementara) menggadaikan tanahnya menurut ketentuan-ketentuan dalam pasal 53. Didalam hal ini maka tanahnya beralih pada pemegang gadai."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ketentuan dalam ayat 1 sudah dijelaskan dalam Penjelasan Umum (II angka 6) dengan tujuan untuk melindungi pihak yang ekonomis lemah. Dalam Undang-Undang Pokok ini perbedaannya tidak lagi diadakan antara warganegara asli dan tidak asli, tetapi antara yang ekonomis kuat dan lemah. Pihak yang kuat itu bisa warganegara yang asli maupun tidak asli. Sedang apa yang disebut dalam ayat 2 adalah akibat daripada ketentuan dalam pasal 21 mengenai siapa yang tidak dapat memiliki tanah."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tanah diterlantarkan kalau dengan sengaja tidak dipergunakan sesuai dengan keadaannya atau sifat dan tujuan daripada haknya."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Hak ini adalah hak yang khusus untuk mengusahakan tanah yang bukan miliknya sendiri guna perusahaan pertanian, perikanan dan peternakan. Bedanya dengan hak pakai ialah bahwa hak guna usaha ini hanya dapat diberikan untuk keperluan diatas itu dan atas tanah yang luasnya paling sedikit 5 hektar. Berlainan dengan hak pakai maka hak guna-usaha dapat beralih dan dialihkan kepada pihak lain dan dapat dibebani dengan hak tanggungan. Hak guna-usaha pun tidak dapat diberikan kepada orang-orang asing, sedang kepada badan-badan hukum yang bermodal asing hanya mungkin dengan pembatasan yang disebutkan dalam pasal 55.\nUntuk mendorong supaya pemakaian dan pengusahaan tanahnya dilakukan secara yang tidak baik, karena didalam hal yang demikian hak guna-usahanya dapat dicabut (pasal 34)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Menurut sifat dan tujuannya hak guna-usaha adalah hak yang waktu berlakunya terbatas. Jangka waktu 25 atau 35 tahun dengan kemungkinan memperpanjang dengan 25 tahun dipandang sudah cukup lama untuk keperluan pengusahaan tanaman-tanaman yang berumur panjang. Penetapan jangka-waktu 35 tahun misalnya mengingat pada tanaman kelapa sawit."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Hak guna-usaha tidak dapat dipunyai oleh orang asing. Badan hukum yang dapat mempunyai hak itu, hanyalah badan-badan hukum yang bermodal nasional yang progresip, baik asli maupun tidak asli. Bagi badan-badan hukum yang bermodal asing hak guna-usaha hanya dibuka kemungkinannya untuk diberikan jika hal itu diperlukan oleh Undang-undang yang mengatur pembangunan nasional semesta berencana (pasal 55)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan.\nMengenai ketentuan dalam pasal 32 sudah dijelaskan dalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan.\nMengenai ketentuan dalam pasal 32 sudah dijelaskan dalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan.\nMengenai ketentuan dalam pasal 32 sudah dijelaskan dalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan.\nMengenai ketentuan dalam pasal 32 sudah dijelaskan dalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Berlainan dengan hak guna-usaha maka hak guna-bangunan tidak mengenai tanah pertanian. Oleh karena itu selain atas tanah yang dikuasai langsung oleh Negara dapat pula diberikan atas tanah milik seseorang."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Penjelasannya sama dengan pasal 30."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan. Mengenai apa yang ditentukan dalam pasal 38 sudah dijelaskan didalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan. Mengenai apa yang ditentukan dalam pasal 38 sudah dijelaskan didalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan. Mengenai apa yang ditentukan dalam pasal 38 sudah dijelaskan didalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan. Mengenai apa yang ditentukan dalam pasal 38 sudah dijelaskan didalam Penjelasan Umum (angka IV)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Hak pakai adalah suatu \"kumpulan pengertian\" daripada hak-hak yang dikenal dalam hukum pertanahan dengan berbagai nama, yang semuanya dengan sedikit perbedaan berhubung dengan keadaan daerah sedaerah, pada pokoknya memberi wewenang kepada yang mempunyai sebagai yang disebutkan dalam pasal ini. Dalam rangka usaha penyederhanaan sebagai yang dikemukakan dalam Penjelasan Umum, maka hak-hak tersebut dalam hukum agraria yang baru disebut dengan satu nama saja.\nUntuk gedung-gedung kedutaan Negara-negara Asing dapat diberikan pula hak pakai, oleh karena hak ini dapat berlaku selama tanahnya dipergunakan untuk itu. Orang-orang dan badan-badan hukum asing dapat diberi hak-pakai, karena hak ini hanya memberi wewenang yang terbatas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Hak pakai adalah suatu \"kumpulan pengertian\" daripada hak-hak yang dikenal dalam hukum pertanahan dengan berbagai nama, yang semuanya dengan sedikit perbedaan berhubung dengan keadaan daerah sedaerah, pada pokoknya memberi wewenang kepada yang mempunyai sebagai yang disebutkan dalam pasal ini. Dalam rangka usaha penyederhanaan sebagai yang dikemukakan dalam Penjelasan Umum, maka hak-hak tersebut dalam hukum agraria yang baru disebut dengan satu nama saja.\nUntuk gedung-gedung kedutaan Negara-negara Asing dapat diberikan pula hak pakai, oleh karena hak ini dapat berlaku selama tanahnya dipergunakan untuk itu. Orang-orang dan badan-badan hukum asing dapat diberi hak-pakai, karena hak ini hanya memberi wewenang yang terbatas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak memerlukan penjelasan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Oleh karena hak sewa merupakan hak pakai yang mempunyai sifat-sifat khusus maka disebut tersendiri. Hak sewa hanya disediakan untuk bangunan-bangunan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Oleh karena hak sewa merupakan hak pakai yang mempunyai sifat-sifat khusus maka disebut tersendiri. Hak sewa hanya disediakan untuk bangunan-bangunan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Untuk kepentingan umum yang lebih luas daripada kepentingan orang atau masyarakat hukum yang bersangkutan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Hak guna-air dan hak pemeliharaan dan penangkapan ikan adalah mengenai air yang tidak berada diatas tanah miliknya sendiri. Jika mengenai air yang berada diatas tanah miliknya sendiri maka hal-hal itu sudah termasuk dalam isi daripada hak milik atas tanah.\nHak guna-air ialah hak akan memperoleh air dari sungai, saluran atau mata air yang berada diluar tanah miliknya sendiri.\nHak guna-air ialah hak akan memperoleh air dari sungai, saluran atau mata air yang berada diluar tanah miliknya, misalnya untuk keperluan mengairi tanahnya, rumah tangga dan lain sebagainya. Untuk itu maka sering kali air yang diperlukan itu perlu dialirkan (didatangkan) melalui tanah orang lain dan air yang tidak diperlukan seringkali perlu dialirkan pula (dibuang) melalui tanah orang yang lain lagi. Orang-orang tersebut tidak boleh menghalang-halangi pemilik tanah itu untuk mendatangkan dan membuang air tadi melalui tanahnya masing-masing."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Hak guna-ruang-angkasa diadakan mengingat kemajuan teknik dewasa ini dan kemungkinan-kemungkinannya dikemudian hari."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Untuk menghilangkan keragu-raguan dan kesangsian maka pasal ini memberi ketegasan, bahwa soal-soal yang bersangkutan dengan peribadatan dan keperluan-keperluan suci lainnya dalam hukum agraria yang baru akan mendapat perhatian sebagaimana mestinya. Hubungan pula dengan ketentuan dalam pasal 5 dan pasal 14 ayat 1 huruf b."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sebagai konsekwensi, bahwa dalam undang-undang ini hanya dimuat pokok-pokoknya saja dari hukum agraria yang baru."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sebagai konsekwensi, bahwa dalam undang-undang ini hanya dimuat pokok-pokoknya saja dari hukum agraria yang baru."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Untuk menjamin pelaksanaan yang sebaik-baiknya daripada peraturan-peraturan serta tindakan-tindakan yang merupakan pelaksanaan dari Undang-undang Pokok Agraria maka diperlukan adanya sangsi pidana sebagai yang ditentukan dalam pasal ini."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah dijelaskan dalam penjelasan pasal 16."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal ini diadakan berhubung dengan ketentuan dalam pasal 21 dan 26. Seseorang yang telah menyatakan menolak kewarganegaraan R.R.C. tetapi pada tanggal mulai berlakunya undang-undang ini belum mendapat pengesahan akan terkena oleh ketentuan konversi pasal I ayat 3, pasal II ayat 2 dan pasal VIII. Tetapi setelah pengesahan penolakan itu diperolehnya maka baginya terbuka kemungkinan untuk memperoleh hak atas tanah sebagai seorang yang berkewarganegaraan Indonesia tunggal. Hal itu berlaku juga bagi orang-orang yang disebutkan didalam pasal 12 Peraturan Pemerintah No. 20 tahun 1959, yaitu sebelumnya diperoleh pengesahan dari instansi yang berwenang."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Sudah dijelaskan dalam penjelasan pasal 30.\nAyat 1 mengenai modal asing yang sekarang sudah ada, sedang ayat 2 menunjuk pada modal asing baru. Sebagaimana telah ditegaskan dalam penjelasan pasal 30 pemberian hak baru menurut ayat 2 ini hanya dimungkinkan kalau hal itu diperlukan oleh undang-undang pembangunan Nasional semesta berencana.\nKedua : Hak-hak yang ada sekarang ini menurut ketentuan konversi ini semuanya menjadi hak-hak baru menurut Undang-undang Pokok Agraria.\nHak guna-usaha dan hak guna-bangunan yang disebut dalam pasal I, II, III, IV.\nPerubahan susunan pemerintahan desa perlu diadakan untuk menjamin pelaksanaan yang sebaik-baiknya dari-pada perombakan hukum agraria menurut Undang-undang ini. Pemerintah desa akan merupakan pelaksana yang mempunyai peranan yang sangat penting.\nKeempat : Ketentuan ini bermaksud menghapuskan hak-hak yang masih bersifat feodal dan tidak sesuai dengan ketentuan undang-undang ini.\nTermasuk Lembaran-Negara No. 104 tahun 1960."
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
                $this->command->info("Data UU No. 5 Tahun 1960 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding UU No. 5 Tahun 1960 selesai!");

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

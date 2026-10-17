<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUU1Tahun1946Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "undang-undang-1-1946",
    "tipe_peraturan": "UU",
    "judul": "Undang-undang (UU) Nomor 1 Tahun 1946 tentang Peraturan tentang Hukum Pidana",
    "tahun": "1946",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "26 Februari 1946",
    "tanggal_pengundangan": "26 Februari 1946",
    "tanggal_berlaku": "",
    "status": "Tidak Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "UU No. 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana; UU No. 21 Tahun 2007 tentang Pemberantasan Tindak Pidana Perdagangan Orang",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "",
    "diubah_dengan": "UU No. 27 Tahun 1999 tentang Perubahan Kitab-Kitab Undang-Undang Hukum Pidana yang Berkaitan dengan Kejahatan Terhadap Keamanan Negara; UU No. 4 Tahun 1976 tentang Perubahan dan Penambahan Beberapa Pasal Dalam Kitab Undang-Undang Hukum Pidana Bertalian Dengan Perluasan Berlakunya Ketentuan Perundang-Undangan Pidana, Kejahatan Penerbangan, dan Kejahatan Terhadap Sarana/Prasarana Penerbangan; UU No. 73 Tahun 1958 tentang Menyatakan Berlakunya Undang-Undang No. 1 Tahun 1946 Republik Indonesia Tentang Peraturan Hukum Pidana Untuk Seluruh Wilayah Republik Indonesia Dan Mengubah Kitab Undang-Undang Hukum Pidana",
    "mengubah": "",
    "sumber_dokumen": "undang-undang_nomor_1_tahun_1946_tentang_peraturan_tentang_hukum_pidana.pdf",
    "id_dokumen": "undang-undang_nomor_1_tahun_1946_tentang_peraturan_tentang_hukum_pidana",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 10,
    "total_chunk": 30,
    "waktu_eksekusi_detik": 71.1,
    "waktu_proses": "2026-09-28 11:55:00",
    "subjek": "Hukum Pidana, Perdata, dan Dagang"
  },
  "relasi": {
    "dicabut_oleh": [
      "undang-undang-1-2023",
      "undang-undang-21-2007"
    ],
    "mencabut": [],
    "diubah_oleh": [
      "undang-undang-27-1999",
      "undang-undang-4-1976",
      "undang-undang-73-1958"
    ],
    "mengubah": [],
    "mencabut_sebagian": [],
    "mengingat": [
      {
        "standard_id": "uud-1945",
        "judul_referensi": "Undang-Undang Dasar 1945",
        "teks_asli": "Akan pasal 5, ayat 1 Undang-Undang Dasar, pasal IV Aturan Peralihan Undang-Undang Dasar serta Peraturan Presiden Republik Indonesia tertanggal 10 Oktober 1945 Nomor 2;"
      }
    ],
    "detail_perubahan": []
  },
  "chunks": [
    {
      "tipe": "PEMBUKAAN",
      "label": "Judul",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > PEMBUKAAN",
      "teks": "UNDANG-UNDANG NOMOR 1 TAHUN 1946 TENTANG PERATURAN HUKUM PIDANA"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "bahwa sebelum dapat melakukan pembentukan Undang-undang hukum pidana baru, perlu peraturan hukum pidana disesuaikan dengan keadaan sekarang;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Akan pasal 5, ayat 1 Undang-Undang Dasar, pasal IV Aturan Peralihan Undang-Undang Dasar serta Peraturan Presiden Republik Indonesia tertanggal 10 Oktober 1945 No. 2;"
    },
    {
      "tipe": "MEMPERHATIKAN",
      "label": "Memperhatikan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > MEMPERHATIKAN",
      "teks": "Dengan persetujuan Badan Pekerja Komite Nasional Pusat :"
    },
    {
      "tipe": "DIKTUM",
      "label": "Memutuskan",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Memutuskan :\n\nMenetapkan peraturan sebagai berikut :\nUNDANG-UNDANG TENTANG PERATURAN HUKUM PIDANA."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Dengan menyimpang seperlunya dari Peraturan Presiden Republik Indonesia tertanggal 10 Oktober 1945 No. 2, menetapkan, bahwa peraturan-peraturan hukum pidana yang sekarang berlaku, ialah peraturan-peraturan hukum pidana yang ada pada tanggal 8 Maret 1942."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Semua peraturan hukum pidana yang dikeluarkan oleh panglima tertinggi balatentara Hindia-Belanda dulu (Verordeningen van het Militair Gezag) dicabut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Jikalau di dalam sesuatu peraturan hukum pidana ditulis dengan perkataan \"Nederlandsch-Indie\" atau \"NederlandschIndisch(c) (en)*, maka perkataan-perkataan itu harus dibaca \"Indonesie\" atau \"Indonesishc(c) (en)\"."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Jikalau di dalam sesuatu peraturan hukum pidana suatu hak, kewajiban, kekuasaan atau perlindungan diberikan atau suatu larangan ditujukan kepada sesuatu pegawai, badan, jawatan dan sebagainya, yang sekarang tidak ada lagi, maka hak, kewajiban, kekuasaan atau perlindungan itu harus dianggap diberikan dan larangan tersebut ditujukan kepada pegawai, badan, jawatan dan sebagainya, yang harus dianggap menggantinya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Peraturan hukum pidana, yang seluruhnya atau sebagian sekarang tidak dapat dijalankan, atau bertentangan dengan kedudukan Republik Indonesia sebagai negara merdeka, atau tidak mempunyai arti lagi, harus dianggap seluruh atau sebagian sementara tidak berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Nama Undang-undang hukum pidana \"Wetboeck van Strafrecht voor Nederlandsh-Indie\" dirobah menjadi \"Wetboeck van Strafrecht\"."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Dengan tidak mengurangi apa yang ditetapkan dalam pasal 3, maka semua perkataan \"Nederlandsch-onderdaan\" dalam Kitab Undang-undang hukum pidana diganti dengan \"Warga Negara Indonesia\"."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Kitab Undang-undang hukum pidana dirobah sebagai berikut :\n1. Dalam pasal 4, ayat 1, ke 1e angka-angka \"104-108\" harus dibaca \"104, 106, 107 en 108\" dan angka-angka \"130-133\" dibaca \"131\"\n2. Perkataan \"Directeur van Justitie\" dalam pasal 15b diganti dengan \"Minister van Justitie\".\n3. Pasal 16 dirobah sebagai berikut :\na. perkataan \"Directeur van Justitie\" harus dibaca \"Minister van Justitie\"\nb. bagian kalimat : \"pembatasan atau penjelasan\" diganti dengan \"van den jaksa\" dan perkataan \"Gouverneur-Generaal\" diganti dengan \"Minister van Justitie\".\nc. bagian kalimat dalam ayat 3 diganti dengan \"op bevel van den Jaksa\"\n4. Dalam pasal 20 perkataan het hoofd van plaatselijk bestuur (den assistent-resident) diganti dengan \"den jaksa\".\n5. Dalam pasal 21, perkataan \"Directeur van Justitie\" diganti dengan \"Minister van Justitie\".\n6. Dalam Pasal 29, ayat (2) perkataan \"Directeur van Justitie\" diganti dengan Minister van Justitie\".\n7. Dalam pasal 33a, perkataan \"Gouverneur-Generaal\", diganti dengan \"President\".\n8. Dalam pasal 44, ayat 3, perkataan \"de Europeesche rechtbanken\", diganti dengan \"Mahkamah Agung, Pengadilan Tinggi\".\n9. Pasal 76 dirobah sebagai berikut :\na. bagian kalimat dihapuskan.\nb. perkataan \"inheemsche\" dan \"Inlandsche\" dihapuskan.\n10. Dalam pasal 92, bagian kalimat diganti dengan \"een door of namens de regering ingesteld wetgevend, besturend of volksvertegenwoordigend lichaam\".\n11. Pasal 94 dihapuskan.\n12. Dalam pasal 104 perkataan-perkataan \"den Koning, de regeerende koningin of den Regent\" diganti dengan \"den Presiden of den Vice-President\".\n13. Pasal 105 dihapuskan.\n14. Dalam pasal 110 ayat (1) dan ayat (2) angka-angka \"104-108\" harus dibaca \"104, 106, 107 en 108\".\n15. Dalam pasal 111 perkataan \"hetzij\" dan bagian kalimat dihapuskan.\n16. Dalam pasal 112 dan 121 bagian kalimat dihapuskan.\n17. Dalam pasal 117 no. 3 perkataan \"Gouverneur-Generaal van Nederlandsch-Indie\" harus dibaca \"President\".\n18. Dalam pasal 122 dan 123 perkataan \"Nederland\" harus dibaca \"Indonesie\".\n19. Dalam pasal 128 bagian kalimat diganti dengan \"het in artikel 104 omschreven misdrijf\".\n20. Kepala Bab II diganti sebagai berikut : \"Misdrijven tegen de waardigheid van den President en van den Vice-President\".\n21. Pasal 130 dihapuskan.\n22. Dalam pasal 131 perkataan \"des konings of der Koningin\" diganti dengan \"van den President of van den Vice President\".\n23. Pasal 135 dan 136 dihapuskan.\n24. Dalam pasal 134 perkataan \"den Koning, de regeerende Koningin, den gemaal der regeerende Koningin, den troonopvolger, een lid van het Koninklijke Huis of den Regent\" harus dibaca \"den President of den Vice-President\".\n25. Pasal-pasal 135 dan 136 dihapuskan.\n26. Dalam pasal 136 bis bagian kalimat harus dibaca \"artikel 134\".\n27. Dalam pasal 137 bagian kalimat harus dibaca \"den President of den Vice-President\".\n28. Pasal 138 dihapuskan.\n29. Pasal 239 dirobah sebagai berikut :\na. ayat (1) dihapuskan.\nb. dalam ayat (2) bagian kalimat harus dibaca \"het in artikel 131 omschreven misdrijf\".\nc. dalam ayat (3) bagian kalimat harus dibaca \"artikel 134 omschreven misdrijf\".\n30. Perkataan \"Nederlandsche\" dalam pasal 143 dan 144 harus dibaca \"Indonesische\".\n31. Dalam pasal 146 dan 147 bagian-bagian kalimat harus dibaca \"een door of namens de Regeering ingesteld wetgevend, besturend of volksvertegenwoordigend lichaam\".\n32. Pasal 153 bis dan pasal 153 ter dihapuskan.\n33. Dalam pasal 154 dan 155 bagian kalimat harus dibaca \"Indonesie\".\n34. Pasal 161 bis dihapuskan.\n35. Dalam pasal 164 angka-angka harus dibaca \"104, 106, 107 en 108\".\n36. Dalam pasal 165 angka-angka masing-masing harus dibaca \"104, 106, 107 en 108\" dan \"115-129 en 131\".\n37. Pasal 171 dihapuskan.\n38. Dalam pasal 207 dan 208 bagian kalimat harus dibaca \"Indonesie\".\n39. Dalam pasal 210 ayat (1) ke-2 bagian kalimat dihapuskan.\n40. Dalam pasal 228 bagian kalimat diganti dengan \"twee jaren\".\n41. Pasal 230 dihapuskan.\n42. Dalam pasal 234 dibelakang perkataan-perkataan \"in een postbus gestoken\" ditambah dengan perkataan \"dan wel aan een koerier toevertrouwd\".\n43. Dalam pasal 238 perkataan \"Gouverneur-Generaal\" harus dibaca \"President\".\n44. Pasal 239 dirobah sebagai berikut :\na. bagian kalimat dihapuskan.\nb. perkataan \"Inlander\" diganti dengan \"Warga Negara Indonesia\".\n45. Dalam pasal 240 ayat (1) No. 1 bagian kalimat harus dibaca \"30 der Undang-undang Dasar\".\n46. Dalam pasal-pasal 253 dan 260 perkataan-perkataan \"van rijkswege of\" dihapuskan.\n47. Dalam pasal 260 bis bagian-bagian kalimat dihapuskan.\n48. Dalam pasal 274 perkataan \"Inlandsch\" dihapuskan.\n49. Dalam pasal 420 ayat (1) No. 2 bagian kalimat dihapuskan.\n50. Dalam pasal 447, 448 dan 449 perkataan \"Nederlandsch of\" dihapuskan.\n51. Dalam pasal 450 dan 451 perkataan \"Nederlandsche Regeering\" diganti dengan \"Indonesische Regeering\".\n52. Dalam pasal-pasal 453, 454, 455 dan 458 ayat (1) perkataan \"Nederlandsch of\" dihapuskan.\n53. Dalam pasal 458 ayat (2) perkataan \"Nederlandschen\" diganti dengan \"Indonesischen\".\n54. Dalam pasal 459 ayat (1), 461, 464 ayat (1), 466, 467, 468, 469 ayat (1), 470 dan 471 perkataan \"Nederlandschen of\" dihapuskan.\n55. Dalam pasal 473 dan 474 perkataan-perkataan \"Nederlandsch(c)\" diganti dengan \"Indonesisch(c)\".\n56. Dalam pasal-pasal 475, 476 dan 477 perkataan-perkataan \"Nederlandsch of\" dihapuskan.\n57. Pasal 587 dirobah sebagai berikut :\na. angka-angka dan perkataan-perkataan dihapuskan.\nb. angka-angka harus dibaca \"131\".\n58. Dalam pasal 490 No. 4 bagian kalimat diganti dengan \"cen het Hoofd van de politie\".\n59. Dalam pasal 495, ayat (1) bagian kalimat diganti dengan \"het hoofd van de politie\".\n60. Dalam pasal 496 bagian kalimat diganti dengan \"het hoofd van de politie\".\n61. Dalam pasal 500 bagian kalimat diganti dengan \"het hoofd van de politie\".\n62. Dalam pasal 501 ayat (1) no. 2 bagian kalimat diganti dengan \"het hoofd van de politie\".\n63. Pasal 507 dirobah sebagai berikut :\na. bagian \"1e\" dibaca demikian : \"hij, die zonder daartoe gerechtigd te zijn, een Indonesischen adelijken titel voert, of een Indonesischen ordeteeken draagt\"\nb. perkataan-perkataan harus dibaca \"verlof van den President\".\n64. Dalam pasal 508 bis bagian kalimat harus dibaca \"van een bij de wet ingestelde of erkende zelfstandige gemeenschap\".\n65. Dalam pasal 510 bagian kalimat harus dibaca \"het hoofd van de politie\".\n66. Dalam pasal 516 bagian kalimat harus dibaca \"het hoofd van de politie of aan den door dezen aangewezen\".\n67. Dalam pasal 524 bagian kalimat harus dibaca \"den daartoe aangewezen ambtenaar\".\n68. Dalam pasal 544 ayat (1) bagian kalimat harus dibaca \"het hoofd van de politie\"."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Barang siapa membikin benda semacam mata uang atau uang kertas dengan maksud untuk menjalankannya atau menyuruh menjalankannya sebagai alat pembayaran yang sah, dihukum dengan hukuman penjara setinggi-tingginya lima belas tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Barang siapa dengan sengaja menjalankan sebagai alat pembayaran yang sah mata uang kertas, sedang ia sewaktu menerimanya mengetahui atau setidak-tidaknya patut dapat menduga bahwa benda-benda itu oleh pihak Pemerintah tidak diakui sebagai alat pembayaran yang sah, atau, dengan maksud untuk menjalankannya atau menyuruh menjalankannya sebagai alat pembayaran yang sah, menyediakannya atau memasukkannya ke dalam Indonesia, dihukum dengan hukuman penjara setinggi-tingginya lima belas tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Barang siapa dengan sengaja menjalankan sebagai alat pembayaran yang sah mata uang atau uang kertas yang dari pihak Pemerintah tidak diakui sebagai alat pembayaran yang sah, dalam hal di luar keadaan sebagai yang tersebut dalam pasal yang baru lalu, dihukum dengan hukuman penjara setinggi-tingginya lima belas tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Barang siapa menerima sebagai alat pembayaran atau penukaran atau sebagai hadiah atau penyimpan atau mengangkut mata uang atau uang kertas, sedangkan ia mengetahui, bahwa benda-benda itu oleh pihak Pemerintah tidak diakui sebagai alat pembayaran yang sah, dihukum dengan hukuman penjara setinggi-tingginya lima tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Kalau orang dihukum karena melakukan salah satu kejahatan seperti tersebut dalam pasal-pasal 9, 10, 11 dan 12 maka mata uang atau uang kertas serta benda lain yang dipergunakan untuk melakukan salah satu kejahatan itu dirampas, juga kalau benda-benda itu bukan kepunyaan terhukum."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Barang siapa, dengan menyiarkan berita atau pemberitahuan bohong, dengan sengaja menerbitkan keonaran dikalangan rakyat, dihukum dengan hukuman penjara setinggi-tingginya sepuluh tahun.\n(2) Barang siapa menyiarkan suatu berita atau mengeluarkan pemberitahuan, yang dapat menerbitkan keonaran dikalangan rakyat, sedangkan ia patut dapat menyangka bahwa berita atau pemberitahuan itu adalah bohong, dihukum dengan penjara setinggi-tingginya tiga tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Barang siapa menyiarkan kabar yang tidak pasti atau kabar yang berkelebihan atau yang tidak lengkap, sedangkan ia mengerti setidak-tidaknya patut dapat menduga, bahwa kabar demikian akan atau mudah dapat menerbitkan keonaran dikalangan rakyat, dihukum dengan hukuman penjara setinggi-tingginya dua tahun."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Barang siapa terhadap bendera kebangsaan Indonesia dengan sengaja menjalankan suatu perbuatan yang dapat menimbulkan perasaan penghinaan kebangsaan, dihukum dengan hukuman penjara setinggi-tingginya satu tahun enam bulan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "Undang-undang ini mulai berlaku buat pulau Jawa dan Madura pada hari diumumkannya dan buat daerah lain pada hari yang akan ditetapkan oleh Presiden.\nAgar Undang-undang ini diketahui oleh umum, maka diperintahkan supaya diumumkan sebagai biasa.\n\nDitetapkan di Yogyakarta\n pada tanggal 26 Pebruari 1946.\nSOEKARNO\n\nDiumumkan pada tanggal 26 Pebruari 1946\nSekretaris Negara\nA.G. PRINGGODIGDO\n\nMenteri Kehakiman\nSOEWANDI"
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "PENJELASAN UMUM",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PENJELASAN_UMUM",
      "teks": "PENJELASAN UNDANG-UNDANG NOMOR 1 TENTANG PERATURAN HUKUM PIDANA\n\nI. Berdasarkan pasal II Aturan Peralihan Undang-Undang Dasar berhubung dengan Peraturan Presiden Republik Indonesia tertanggal 10 Oktober 1945 No. 2, maka sekarang berlaku semua peraturan hukum pidana, yang ada pada tanggal 17 Agustus 1945, baik yang asalnya dari pemerintah Hindia-Belanda, maupun yang ditetapkan oleh Pemerintah balatentara Jepang. Hal ini sekarang ternyata menimbulkan kesukaran yang dengan singkat akan diuraikan dibawah ini :\nPeraturan-peraturan yang dikeluarkan oleh Pemerintah Hindia-Belanda pada umumnya berlaku buat seluruh Indonesia, sedangkan Peraturan-peraturan yang ditetapkan oleh Pemerintah balatentara Jepang hanya berlaku buat sebagian dari Indonesia saja, oleh karena Indonesia pada jaman Jepang dibagi menjadi beberapa daerah (Jawa, Sumatera, Borneo dll), yang masing-masing mempunyai Pemerintah dan Peraturan-peraturan sendiri. Dari sebab itu maka mungkin suatu Peraturan Hindia Belanda, yang dulu berlaku buat seluruh Indonesia, oleh Pemerintah Jepang di Jawa dan Madura diganti seluruhnya dengan peraturan baru, di Sumatera hanya sebagian diganti, dan di Borneo sama sekali tidak diganti. Mungkin pula buat tiap-tiap daerah tentang suatu hal oleh Pemerintah daerah Jepang diadakan suatu peraturan baru yang satu sama lain tidak sama isinya.\nSelain dari pada itu peraturan hukum-pidana Hindia Belanda dan Jepang tidak sama sisteem-nya. Sedangkan peraturan hukum pidana Hindia-Belanda berdasarkan azas : Nullum delictum, nulla poena sine praevia lege poenali (tidak ada pelanggaran dan tidak ada hukuman jikalau tidak lebih dulu ada suatu aturan hukum pidana), maka peraturan hukum pidana Jepang berazas luas.\nDisini tidak akan dirundingkan sisteem manakah sebagai sisteem terlebih baik, akan tetapi sudah barang tentu, bahwa tidak baik menggunakan dua sisteem itu dalam peraturan-peraturan hukum pidana, yang bersama-sama berlaku dalam sesuatu daerah.\nLagi pula peraturan tentang bagian umum dari hukum pidana Hindia-Belanda dan Jepang tidak sama.\nDirasa tak perlu memberi keterangan panjang lebar, bahwa menyempurnakan peraturan-peraturan hukum Pidana Hindia Belanda dan Jepang itu tidak memuaskan dan menimbulkan kesulitan bagi mereka yang harus menjalankan hukum pidana itu, lebih-lebih pegawai polisi yang bukan ahli hukum. Dari sebab itu tidak mengherankan, bahwa dari beberapa tempat dan pihak diusulkan supaya satu peraturan kriminil sajalah dipakai, lebih tegas diusulkan oleh mereka supaya peraturan-peraturan hukum pidana Jepang dihapuskan.\nMemang tidak dapat disangkal, bahwa peraturan-peraturan hukum pidana Jepang, yang berlaku ditanah kita, bersifat fascistisch, lagi pula tidak merupakan peraturan yang bulat, kerap kali tidak jelas dan mengandung banyak bukti, bahwa peraturan-peraturan itu disusun dengan tergesa-gesa pada masa yang tak tenang.\nSebaliknya boleh dikatakan, bahwa peraturan kriminil Hindia-Belanda walaupun tidak sempurna, cukup lengkap dan pada umumnya tidak mengandung cacat-cacat seperti dimaksud diatas, sehingga peraturan-peraturan ini, sebelum dapat diselesaikan peraturan-peraturan hukum pidana nasional, boleh dipakai buat sementara waktu, sesudah peraturan-peraturan itu dirobah dan ditambah seperlunya.\nBerdasarkan pertimbangan-pertimbangan tersebut diatas dirasa perlu melenyapkan peraturan-peraturan kriminil Jepang, sehingga buat sementara waktu berlaku lagi peraturan-peraturan hukum pidana Hindia-Belanda yang ada pada tanggal 8 Maret 1942.\nPerlu kiranya diterangkan disini, bahwa yang akan tidak berlaku lagi itu, ialah peraturan-peraturan hukum pidana sahaja.\n\nII. Oleh karena Negara Republik Indonesia sekarang tidak dalam keadaan perang dengan Negara manapun, dan keadaan bahaya tidak dinyatakan oleh Presiden, maka dianggap kurang tepat mengadakan peraturan-peraturan sebagai \"Verordeningen van het Militair Gezag\" yang dikeluarkan oleh panglima tertinggi balatentara Hindia-Belanda. Dari sebab itu sebaiknya dinyatakan, bahwa undang-undang itu dicabut.\n\nIII. Tidak perlu diterangkan, bahwa semua peraturan yang berlaku pada tanggal 8 Maret 1942, mestinya satu demi satu sedapat-dapat harus disesuaikan dengan keadaan sekarang. Hal ini sedapat-dapat dilaksanakan terhadap Kitab Undang-undang Hukum Pidana. Tetapi pekerjaan itu tidak mungkin sekaligus diselenggarakan terhadap semua Peraturan.\n\nIV. Tentang bahasa, yang dipakai dalam perobahan-perobahan dalam Kitab Undang-undang Hukum Pidana, baik kiranya diberi keterangan sekedarnya. Karena kitab tersebut ditulis dalam bahasa Belanda, maka agar supaya tidak menimbulkan kekacauan dalam membacanya perobahan-perobahan itu ditulis pula dalam bahasa Belanda.\n\nV. Selain dari pada perobahan kecil-kecil ini, dirasa perlu juga merobah pasal 171 Kitab undang-undang hukum pidana seanteronya serta mengadakan beberapa aturan-aturan baru antara lain guna melindungi masyarakat kita pada zaman pancaroba ini. Pasal-pasal ini ditulis dalam bahasa Indonesia (lihat pasal IX, X, XI, XII, XIII dan XV).\n\nVI. Hingga kini terjemahan nama : \"Wetboek van Strafrecht voor Nederlandsch-Indie\" dalam bahasa Indonesia tidak sama. Untuk mencapai persamaan dalam terjemahan nama tersebut, dipandang perlu menetapkan terjemahan resmi dengan undang-undang (lihat pasal 6)."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal I sampai VI",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Penjelasan telah diberikan dibagian penjelasan umum. Petunjuk-petunjuk dalam pasal I sampai V diatas dirasa perlu terhadap peraturan-peraturan hukum pidana yang belum dapat dirobah atau diganti sesuai dengan keadaan sekarang."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal VII",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Tidak perlu diterangkan lagi."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal VIII",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "No. 1 Pasal 105, 130, 132 dan 133 dihapuskan.\nNo. 2 dan 3a tidak membutuhkan penjelasan.\nNo. 3b, dan No. 4 berhubung dengan kedudukan jaksa sekarang, maka pegawai inilah yang harus diberi kekuasaan yang dimaksud dalam pasal ini, sedangkan kewajiban Gouverneur-Generaal dulu patut diserahkan kepada Menteri Kehakiman.\nNo. 5, No. 6, No. 7, No. 8, tidak membutuhkan penjelasan.\nNo. 9 Negeri Belanda, Suriname dan Curacao tidak masuk daerah Negara Indonesia.\nNo. 10 Namanya badan-badan politik yang dimaksud dalam pasal ini belum dapat disebut.\nNo. 11, No. 12, No. 13 tidak membutuhkan penjelasan.\nNo. 14 Pasal 105 dihapuskan.\nNo. 15, No. 16 tidak membutuhkan penjelasan.\nNo. 17 Pasal 105 dihapuskan.\nNo. 18 tidak membutuhkan penjelasan.\nNo. 19 Pasal ini tidak sesuai dengan bentuk Negara kita sebagai Republik.\nNo. 20 tidak membutuhkan penjelasan.\nNo. 21 lihat penjelasan No. 19.\nNo. 22 tidak membutuhkan penjelasan.\nNo. 23 lihat penjelasan No. 19 dan perobahan pasal 134.\nNo. 24 Pasal-pasal 135 dan 136 dihapuskan.\nNo. 25, No. 26 tidak membutuhkan penjelasan.\nNo. 27 a, b, c. dihapuskan.\nNo. 28 tidak membutuhkan penjelasan.\nNo. 29 lihat penjelasan No. 10.\nNo. 30 Pasal-pasal ini dianggap tidak sesuai dengan azas Negara kita sebagai negara yang democratis.\nNo. 31 tidak membutuhkan penjelasan.\nNo. 32 lihat penjelasan No. 30.\nNo. 33 Pasal 105 dihapuskan.\nNo. 34 Pasal-pasal 105, 130, 132 dan 133 dihapuskan.\nNo. 36 tidak membutuhkan penjelasan.\nNo. 37 berhubung dengan kedudukan jaksa sekarang.\nNo. 38 Pasal ini tidak sesuai dengan keadaan sekarang.\nNo. 39 Tambahan dalam pasal 234 dianggap perlu.\nNo. 40 tidak membutuhkan penjelasan.\nNo. 41 Sekarang belum terang kepada siapa kekuasaan Gubernur Jenderal akan diberikan.\nNo. 42, No. 43 tidak perlu diberikan penjelasan.\nNo. 44 Suriname, Curacao dan Nederland telah masuk perkataan \"buitenlandsche mogendheid\".\nNo. 45 Perkataan \"Inlandsch\" tidak ada artinya lagi.\nNo. 46 Penghapusan ini adalah sesuai dengan kedudukan Jaksa sekarang.\nNo. 47 sampai 53 tidak membutuhkan penjelasan.\nNo. 55 sampai 57 Dirasa tepat bahwa laporan yang dimaksud harus disampaikan Kepala Polisi.\nNo. 60 sampai 63 tidak perlu dijelaskan.\nNo. 64 Pegawai yang dimaksud dalam pasal ini harus ditunjuk.\nNo. 65 Kepala Polisi ditunjuk dalam pasal ini berhubung dengan kedudukannya sekarang."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal IX sampai XIII",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal-pasal ini dibutuhkan buat menindas usaha untuk mengacaukan peredaran uang di negeri kita dengan menyebarkan mata uang atau uang kertas yang oleh pihak Pemerintah kita tidak diakui sebagai alat pembayaran yang sah."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal IX",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Mengancam hukuman terhadap barang siapa membikin benda semacam mata uang atau uang kertas dengan maksud seperti diterangkan dalam pasal itu."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal X dan pasal XI",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Disusun hampir sama dengan susunan pasal 245 dan pasal 249 Kitab undang-undang hukum pidana. Bedanya disebabkan oleh hal yang pasal X dan XI mengenai mata uang atau uang kertas yang tidak sah."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal XIII",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Merupakan pasangannya pasal 250 bis Kitab Undang-undang Hukum Pidana."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal XIV dan pasal XV",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Menggantikan pasal 171 Kitab Undang-undang Hukum Pidana, yang pada masa pancaroba ini perlu diperluas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal XIV",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ialah sama dengan \"Verordening No. 18 van het Militair Gezag\". Keonaran adalah lebih hebat dari pada kegelisahan dan menggoncangkan hati penduduk yang tidak sedikit jumlahnya."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal XV",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Disusun tidak begitu luas sebagai \"verordening No. 19 van het Militair Gezag\". Pasal ini mengenai \"kabar angin\" (kabar yang tidak pasti) dan kabar yang disiarkan dengan tambahan atau dikurangi."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal terakhir",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Oleh karena berhubung dengan sukarnya perhubungan antara pulau Jawa dan daerah Negara Indonesia yang lain, sekarang belum dapat ditetapkan bilamana Undang-undang ini akan berlaku sepenuhnya di luar Jawa dan Madura, maka diserahkan kepada Presiden untuk menentukan saat itu."
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
                $this->command->info("Data UU No. 1 Tahun 1946 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding UU No. 1 Tahun 1946 selesai!");

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

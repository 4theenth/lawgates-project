<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUU23Tahun2014Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "undang-undang-23-2014",
    "tipe_peraturan": "UU",
    "judul": "Undang-undang (UU) Nomor 23 Tahun 2014 tentang Pemerintahan Daerah",
    "tahun": "2014",
    "tempat_penetapan": "Jakarta",
    "tanggal_penetapan": "30 September 2014",
    "tanggal_pengundangan": "02 Oktober 2014",
    "tanggal_berlaku": "02 Oktober 2014",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Pusat",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "UU No. 1 Tahun 2022 tentang Hubungan Keuangan antara Pemerintah Pusat dan Pemerintahan Daerah; Pasal 1 angka 30, Pasal 1 angka 38, Pasal L angka 47 sampai dengan angka 49, Pasal 245 sepanjang terkait dengan Pajak Daerah dan Retribusi Daerah, Pasal 279, Pasal 285 ayat (2) huruf a angka 1 sampai dengan angka 4, Pasal 288 sampai dengan Pasal 291, Pasal 296, Pasal 302, Pasal 324, dan Pasal 325 Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah (l,embaran Negara Republik Indonesia Tahun 2Ol4 Nomor 244, Tambahan Lembaran Negara Republik Indonesia Nomor 5587) sebagaimana telah beberapa kali diubah, terakhir dengan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja (Lembaran Negara Republik Indonesia Tahun 2O2O Nomor 245, Tambahan Lembaran Negara Republik Indonesia Nomor 6573); UU No. 17 Tahun 2019 tentang Sumber Daya Air; Ketentuan mengenai pembagian urusan pemerintahan konkuren antara Pemerintah Pusat dan pemerintah daerah provinsi dan pemerintah daerah kabupaten/kota, Angka I Matriks pembagian urusan pemerintahan konkuren antara pemerintah pusat dan pemerintah daerah provinsi dan pemerintah daerah kabupaten/kota: (a). huruf C Pembagian Urusan Pemerintahan Bidang Pekerjaan Umum dan Penataan Ruang Nomor 1 Suburusan Sumber Daya Air (SDA) kolom 3 huruf b, kolom 4 huruf b, dan kolom 5 huruf b; (b). huruf CC Pembagian Urusan Pemerintahan Bidang Energi dan Sumber Daya Mineral Nomor I Sub-Urusan Geologi kolom 3 huruf a, kolom 4 huruf b, dan kolom 5, yang tertuang dalam lampiran yang merupakan bagian tidak terpisahkan dari Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah sebagaimana telah beberapa kali diubah terakhir dengan Undang-Undang Nomor 9 Tahun 2015 tentang Perubahan Kedua atas Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah",
    "mencabut": "UU No. 12 Tahun 2008 tentang Perubahan Kedua atas Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah; UU No. 8 Tahun 2005 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 3 Tahun 2005 tentang Perubahan atas Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah Menjadi Undang-Undang; UU No. 32 Tahun 2004 tentang Pemerintahan Daerah; UU No. 5 Tahun 1962 tentang Perusahaan Daerah",
    "mencabut_sebagian": "",
    "diubah_dengan": "UU No. 1 Tahun 2026 tentang Penyesuaian Pidana; Ketentuan Pasal 238 dalam Undang-Undang Nomor 23 Tahun 2014, diubah; UU No. 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang; UU No. 11 Tahun 2020 tentang Cipta Kerja; PERPU No. 1 Tahun 2020 tentang Kebijakan Keuangan Negara dan Stabilitas Sistem Keuangan untuk Penanganan Pandemi Corona Virus Disease 2019 (COVID-19) dan/atau dalam Rangka Menghadapi Ancaman yang Membahayakan Perekonomian Nasional dan/atau Stabilitas Sistem Keuangan; UU No. 9 Tahun 2015 tentang Perubahan Kedua Atas Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah; UU No. 2 Tahun 2015 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2014 tentang Perubahan atas Undang-Undang Nomor 23 Tahun 2014 Tentang Pemerintahan Daerah Menjadi Undang-Undang; Perpu Nomor 2 Tahun 2022 tentang Cipta Kerja",
    "mengubah": "UU No. 17 Tahun 2014 tentang Majelis Permusyawaratan Rakyat, Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, dan Dewan Perwakilan Rakyat Daerah; UU No. 28 Tahun 2009 tentang Pajak Daerah dan Retribusi Daerah",
    "sumber_dokumen": "undang-undang_nomor_23_tahun_2014_tentang_pemerintahan_daerah.pdf",
    "id_dokumen": "undang-undang_nomor_23_tahun_2014_tentang_pemerintahan_daerah",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 460,
    "total_chunk": 1029,
    "waktu_eksekusi_detik": 2834.99,
    "waktu_proses": "2026-09-21 13:00:49",
    "subjek": "Otonomi Daerah dan Pemerintah Daerah"
  },
  "relasi": {
    "dicabut_oleh": [],
    "mencabut": [
      "undang-undang-12-2008",
      "undang-undang-8-2005",
      "undang-undang-32-2004",
      "undang-undang-5-1962"
    ],
    "diubah_oleh": [
      "undang-undang-1-2026",
      "undang-undang-23-2014",
      "undang-undang-6-2023",
      "undang-undang-11-2020",
      "peraturan-pemerintah-pengganti-undang-undang-1-2020",
      "undang-undang-9-2015",
      "undang-undang-2-2015",
      "peraturan-pemerintah-pengganti-undang-undang-2-2022"
    ],
    "mengubah": [
      "undang-undang-17-2014",
      "undang-undang-28-2009"
    ],
    "mencabut_sebagian": [],
    "mengingat": [
      {
        "standard_id": "uud-1945",
        "judul_referensi": "Undang-Undang Dasar 1945",
        "teks_asli": "Pasal 1, Pasal 4, Pasal 5 ayat (1), Pasal 17 ayat (1) dan ayat (3), Pasal 18, Pasal 18A, Pasal 18B, Pasal 20, Pasal 22D ayat (2), dan Pasal 23E ayat (2) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
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
      "teks": "a. bahwa sesuai dengan Pasal 18 ayat (7) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 susunan dan tata cara penyelenggaraan pemerintahan daerah diatur dalam Undang-Undang;\nb. bahwa penyelenggaraan pemerintahan daerah diarahkan untuk mempercepat terwujudnya kesejahteraan masyarakat melalui peningkatan pelayanan, pemberdayaan, dan peran serta masyarakat, serta peningkatan daya saing daerah dengan memperhatikan prinsip demokrasi, pemerataan, keadilan, dan kekhasan suatu daerah dalam sistem Negara Kesatuan Republik Indonesia;\nc. bahwa efisiensi dan efektivitas penyelenggaraan pemerintahan daerah perlu ditingkatkan dengan lebih memperhatikan aspek-aspek hubungan antara Pemerintah Pusat dengan daerah dan antardaerah, potensi dan keanekaragaman daerah, serta peluang dan tantangan persaingan global dalam kesatuan sistem penyelenggaraan pemerintahan negara;\nd. bahwa Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah tidak sesuai lagi dengan perkembangan keadaan, ketatanegaraan, dan tuntutan penyelenggaraan pemerintahan daerah sehingga perlu diganti;\ne. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, huruf b, huruf c, dan huruf d perlu membentuk Undang-Undang tentang Pemerintahan Daerah;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Pasal 1, Pasal 4, Pasal 5 ayat (1), Pasal 17 ayat (1) dan ayat (3), Pasal 18, Pasal 18A, Pasal 18B, Pasal 20, Pasal 22D ayat (2), dan Pasal 23E ayat (2) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;"
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
      "teks": "Dalam Undang-Undang ini yang dimaksud dengan:\n1. Pemerintah Pusat adalah Presiden Republik Indonesia yang memegang kekuasaan pemerintahan negara Republik Indonesia yang dibantu oleh Wakil Presiden dan menteri sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.\n2. Pemerintahan Daerah adalah penyelenggaraan urusan pemerintahan oleh pemerintah daerah dan dewan perwakilan rakyat daerah menurut asas otonomi dan tugas pembantuan dengan prinsip otonomi seluas-luasnya dalam sistem dan prinsip Negara Kesatuan Republik Indonesia sebagaimana dimaksud dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.\n3. Pemerintah Daerah adalah kepala daerah sebagai unsur penyelenggara Pemerintahan Daerah yang memimpin pelaksanaan urusan pemerintahan yang menjadi kewenangan daerah otonom.\n4. Dewan Perwakilan Rakyat Daerah yang selanjutnya disingkat DPRD adalah lembaga perwakilan rakyat daerah yang berkedudukan sebagai unsur penyelenggara Pemerintahan Daerah.\n5. Urusan Pemerintahan adalah kekuasaan pemerintahan yang menjadi kewenangan Presiden yang pelaksanaannya dilakukan oleh kementerian negara dan penyelenggara Pemerintahan Daerah untuk melindungi, melayani, memberdayakan, dan menyejahterakan masyarakat.\n6. Otonomi Daerah adalah hak, wewenang, dan kewajiban daerah otonom untuk mengatur dan mengurus sendiri Urusan Pemerintahan dan kepentingan masyarakat setempat dalam sistem Negara Kesatuan Republik Indonesia.\n7. Asas Otonomi adalah prinsip dasar penyelenggaraan Pemerintahan Daerah berdasarkan Otonomi Daerah.\n8. Desentralisasi adalah penyerahan Urusan Pemerintahan oleh Pemerintah Pusat kepada daerah otonom berdasarkan Asas Otonomi.\n9. Dekonsentrasi adalah pelimpahan sebagian Urusan Pemerintahan yang menjadi kewenangan Pemerintah Pusat kepada gubernur sebagai wakil Pemerintah Pusat, kepada instansi vertikal di wilayah tertentu, dan/atau kepada gubernur dan bupati/wali kota sebagai penanggung jawab urusan pemerintahan umum.\n10. Instansi Vertikal adalah perangkat kementerian dan/atau lembaga pemerintah nonkementerian yang mengurus Urusan Pemerintahan yang tidak diserahkan kepada daerah otonom dalam wilayah tertentu dalam rangka Dekonsentrasi.\n11. Tugas Pembantuan adalah penugasan dari Pemerintah Pusat kepada daerah otonom untuk melaksanakan sebagian Urusan Pemerintahan yang menjadi kewenangan Pemerintah Pusat atau dari Pemerintah Daerah provinsi kepada Daerah kabupaten/kota untuk melaksanakan sebagian Urusan Pemerintahan yang menjadi kewenangan Daerah provinsi.\n12. Daerah Otonom yang selanjutnya disebut Daerah adalah kesatuan masyarakat hukum yang mempunyai batas-batas wilayah yang berwenang mengatur dan mengurus Urusan Pemerintahan dan kepentingan masyarakat setempat menurut prakarsa sendiri berdasarkan aspirasi masyarakat dalam sistem Negara Kesatuan Republik Indonesia.\n13. Wilayah Administratif adalah wilayah kerja perangkat Pemerintah Pusat termasuk gubernur sebagai wakil Pemerintah Pusat untuk menyelenggarakan Urusan Pemerintahan yang menjadi kewenangan Pemerintah Pusat di Daerah dan wilayah kerja gubernur dan bupati/wali kota dalam melaksanakan urusan pemerintahan umum di Daerah.\n14. Urusan Pemerintahan Wajib adalah Urusan Pemerintahan yang wajib diselenggarakan oleh semua Daerah.\n15. Urusan Pemerintahan Pilihan adalah Urusan Pemerintahan yang wajib diselenggarakan oleh Daerah sesuai dengan potensi yang dimiliki Daerah.\n16. Pelayanan Dasar adalah pelayanan publik untuk memenuhi kebutuhan dasar warga negara.\n17. Standar Pelayanan Minimal adalah ketentuan mengenai jenis dan mutu Pelayanan Dasar yang merupakan Urusan Pemerintahan Wajib yang berhak diperoleh setiap warga negara secara minimal.\n18. Forum Koordinasi Pimpinan di Daerah yang selanjutnya disebut Forkopimda adalah forum yang digunakan untuk membahas penyelenggaraan urusan pemerintahan umum.\n19. Daerah Provinsi yang Berciri Kepulauan adalah Daerah provinsi yang memiliki karakteristik secara geografis dengan wilayah lautan lebih luas dari daratan yang di dalamnya terdapat pulau-pulau yang membentuk gugusan pulau sehingga menjadi satu kesatuan geografis dan sosial budaya.\n20. Pembentukan Daerah adalah penetapan status Daerah pada wilayah tertentu.\n21. Daerah Persiapan adalah bagian dari satu atau lebih Daerah yang bersanding yang dipersiapkan untuk dibentuk menjadi Daerah baru.\n22. Cakupan Wilayah adalah Daerah kabupaten/kota yang akan menjadi Cakupan Wilayah Daerah provinsi atau kecamatan yang akan menjadi Cakupan Wilayah Daerah kabupaten/kota.\n23. Perangkat Daerah adalah unsur pembantu kepala daerah dan DPRD dalam penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n24. Kecamatan atau yang disebut dengan nama lain adalah bagian wilayah dari Daerah kabupaten/kota yang dipimpin oleh camat.\n25. Peraturan Daerah yang selanjutnya disebut Perda atau yang disebut dengan nama lain adalah Perda Provinsi dan Perda Kabupaten/Kota.\n26. Peraturan Kepala Daerah yang selanjutnya disebut Perkada adalah peraturan gubernur dan peraturan bupati/wali kota.\n27. Rencana Pembangunan Jangka Panjang Daerah yang selanjutnya disingkat RPJPD adalah dokumen perencanaan Daerah untuk periode 20 (dua puluh) tahun.\n28. Rencana Pembangunan Jangka Menengah Daerah yang selanjutnya disingkat RPJMD adalah dokumen perencanaan Daerah untuk periode 5 (lima) tahun.\n29. Rencana Pembangunan Tahunan Daerah yang selanjutnya disebut Rencana Kerja Pemerintah Daerah yang selanjutnya disingkat RKPD adalah dokumen perencanaan Daerah untuk periode 1 (satu) tahun.\n30. Hubungan Keuangan antara Pemerintah Pusat dan Daerah adalah suatu sistem pembagian keuangan yang adil, proporsional, demokratis, transparan, dan bertanggung jawab.\n31. Anggaran Pendapatan dan Belanja Negara yang selanjutnya disingkat APBN adalah rencana keuangan tahunan Pemerintah Pusat yang ditetapkan dengan undang-undang.\n32. Anggaran Pendapatan dan Belanja Daerah yang selanjutnya disingkat APBD adalah rencana keuangan tahunan Daerah yang ditetapkan dengan Perda.\n33. Kebijakan Umum APBD yang selanjutnya disingkat KUA adalah dokumen yang memuat kebijakan bidang pendapatan, belanja, dan pembiayaan serta asumsi yang mendasarinya untuk periode 1 (satu) tahun.\n34. Prioritas dan Plafon Anggaran Sementara yang selanjutnya disingkat PPAS adalah program prioritas dan patokan batas maksimal anggaran yang diberikan kepada Perangkat Daerah untuk setiap program sebagai acuan dalam penyusunan rencana kerja dan anggaran satuan kerja Perangkat Daerah.\n35. Pendapatan Daerah adalah semua hak Daerah yang diakui sebagai penambah nilai kekayaan bersih dalam periode tahun anggaran yang bersangkutan.\n36. Belanja Daerah adalah semua kewajiban Daerah yang diakui sebagai pengurang nilai kekayaan bersih dalam periode tahun anggaran yang bersangkutan.\n37. Pembiayaan adalah setiap penerimaan yang perlu dibayar kembali dan/atau pengeluaran yang akan diterima kembali, baik pada tahun anggaran yang bersangkutan maupun pada tahun-tahun anggaran berikutnya.\n38. Pinjaman Daerah adalah semua transaksi yang mengakibatkan Daerah menerima sejumlah uang atau menerima manfaat yang bernilai uang dari pihak lain sehingga Daerah tersebut dibebani kewajiban untuk membayar kembali.\n39. Barang Milik Daerah adalah semua barang yang dibeli atau diperoleh atas beban APBD atau berasal dari perolehan lainnya yang sah.\n40. Badan Usaha Milik Daerah yang selanjutnya disingkat BUMD adalah badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh Daerah.\n41. Partisipasi Masyarakat adalah peran serta warga masyarakat untuk menyalurkan aspirasi, pemikiran, dan kepentingannya dalam penyelenggaraan Pemerintahan Daerah.\n42. Kawasan Khusus adalah bagian wilayah dalam Daerah provinsi dan/atau Daerah kabupaten/kota yang ditetapkan oleh Pemerintah Pusat untuk menyelenggarakan fungsi pemerintahan yang bersifat khusus bagi kepentingan nasional yang diatur dalam ketentuan peraturan perundang-undangan.\n43. Desa adalah desa dan desa adat atau yang disebut dengan nama lain, selanjutnya disebut Desa, adalah kesatuan masyarakat hukum yang memiliki batas wilayah yang berwenang untuk mengatur dan mengurus Urusan Pemerintahan, kepentingan masyarakat setempat berdasarkan prakarsa masyarakat, hak asal usul, dan/atau hak tradisional yang diakui dan dihormati dalam sistem pemerintahan Negara Kesatuan Republik Indonesia.\n44. Menteri adalah menteri yang menyelenggarakan urusan pemerintahan dalam negeri.\n45. Kementerian adalah kementerian yang menyelenggarakan urusan pemerintahan dalam negeri.\n46. Aparat Pengawas Internal Pemerintah adalah inspektorat jenderal kementerian, unit pengawasan lembaga pemerintah nonkementerian, inspektorat provinsi, dan inspektorat kabupaten/kota.\n47. Dana Alokasi Umum yang selanjutnya disingkat DAU adalah dana yang bersumber dari pendapatan APBN yang dialokasikan dengan tujuan pemerataan kemampuan keuangan antar-Daerah untuk mendanai kebutuhan Daerah dalam rangka pelaksanaan Desentralisasi.\n48. Dana Alokasi Khusus yang selanjutnya disingkat DAK adalah dana yang bersumber dari pendapatan APBN yang dialokasikan kepada Daerah tertentu dengan tujuan untuk membantu mendanai kegiatan khusus yang merupakan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n49. Dana Bagi Hasil yang selanjutnya disingkat DBH adalah dana yang bersumber dari pendapatan tertentu APBN yang dialokasikan kepada Daerah penghasil berdasarkan angka persentase tertentu dengan tujuan mengurangi ketimpangan kemampuan keuangan antara Pemerintah Pusat dan Daerah.\n50. Hari adalah hari kerja."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II PEMBAGIAN WILAYAH NEGARA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "(1) Negara Kesatuan Republik Indonesia dibagi atas Daerah provinsi dan Daerah provinsi itu dibagi atas Daerah kabupaten dan kota.\n(2) Daerah kabupaten/kota dibagi atas Kecamatan dan Kecamatan dibagi atas kelurahan dan/atau Desa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "(1) Daerah provinsi dan kabupaten/kota sebagaimana dimaksud dalam Pasal 2 ayat (1) merupakan Daerah dan masing-masing mempunyai Pemerintahan Daerah.\n(2) Daerah provinsi dan kabupaten/kota sebagaimana dimaksud pada ayat (1) dibentuk dengan undang-undang."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "(1) Daerah provinsi selain berstatus sebagai Daerah juga merupakan Wilayah Administratif yang menjadi wilayah kerja bagi gubernur sebagai wakil Pemerintah Pusat dan wilayah kerja bagi gubernur dalam menyelenggarakan urusan pemerintahan umum di wilayah Daerah provinsi.\n(2) Daerah kabupaten/kota selain berstatus sebagai Daerah juga merupakan Wilayah Administratif yang menjadi wilayah kerja bagi bupati/wali kota dalam menyelenggarakan urusan pemerintahan umum di wilayah Daerah kabupaten/kota."
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB III KEKUASAAN PEMERINTAHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "(1) Presiden Republik Indonesia memegang kekuasaan pemerintahan sesuai dengan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.\n(2) Kekuasaan Pemerintahan sebagaimana dimaksud pada ayat (1) diuraikan dalam berbagai Urusan Pemerintahan.\n(3) Dalam menyelenggarakan Urusan Pemerintahan sebagaimana dimaksud pada ayat (2), Presiden dibantu oleh menteri yang menyelenggarakan Urusan Pemerintahan tertentu.\n(4) Penyelenggaraan Urusan Pemerintahan sebagaimana dimaksud pada ayat (2) di Daerah dilaksanakan berdasarkan asas Desentralisasi, Dekonsentrasi, dan Tugas Pembantuan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pemerintah Pusat menetapkan kebijakan sebagai dasar dalam menyelenggarakan Urusan Pemerintahan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "(1) Pemerintah Pusat melakukan pembinaan dan pengawasan terhadap penyelenggaraan Urusan Pemerintahan oleh Daerah.\n(2) Pemerintah Pusat memegang tanggung jawab akhir atas penyelenggaraan Urusan Pemerintahan oleh Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "(1) Pembinaan dan pengawasan oleh Pemerintah Pusat sebagaimana dimaksud dalam Pasal 7 ayat (1) terhadap penyelenggaraan Urusan Pemerintahan oleh Daerah provinsi dilaksanakan oleh menteri/kepala lembaga pemerintah nonkementerian.\n(2) Pembinaan dan pengawasan oleh Pemerintah Pusat sebagaimana dimaksud dalam Pasal 7 ayat (1) terhadap penyelenggaraan Urusan Pemerintahan oleh Daerah kabupaten/kota dilaksanakan oleh gubernur sebagai wakil Pemerintah Pusat.\n(3) Pembinaan dan pengawasan sebagaimana dimaksud pada ayat (1) dan ayat (2) secara nasional dikoordinasikan oleh Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB IV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IV URUSAN PEMERINTAHAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kesatu Klasifikasi Urusan Pemerintahan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Urusan Pemerintahan terdiri atas urusan pemerintahan absolut, urusan pemerintahan konkuren, dan urusan pemerintahan umum.\n(2) Urusan pemerintahan absolut sebagaimana dimaksud pada ayat (1) adalah Urusan Pemerintahan yang sepenuhnya menjadi kewenangan Pemerintah Pusat.\n(3) Urusan pemerintahan konkuren sebagaimana dimaksud pada ayat (1) adalah Urusan Pemerintahan yang dibagi antara Pemerintah Pusat dan Daerah provinsi dan Daerah kabupaten/kota.\n(4) Urusan pemerintahan konkuren yang diserahkan ke Daerah menjadi dasar pelaksanaan Otonomi Daerah.\n(5) Urusan pemerintahan umum sebagaimana dimaksud pada ayat (1) adalah Urusan Pemerintahan yang menjadi kewenangan Presiden sebagai kepala pemerintahan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kedua Urusan Pemerintahan Absolut"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Urusan pemerintahan absolut sebagaimana dimaksud dalam Pasal 9 ayat (2) meliputi:\na. politik luar negeri;\nb. pertahanan;\nc. keamanan;\nd. yustisi;\ne. moneter dan fiskal nasional; dan\nf. agama.\n(2) Dalam menyelenggarakan urusan pemerintahan absolut sebagaimana dimaksud pada ayat (1), Pemerintah Pusat:\na. melaksanakan sendiri; atau\nb. melimpahkan wewenang kepada Instansi Vertikal yang ada di Daerah atau gubernur sebagai wakil Pemerintah Pusat berdasarkan asas Dekonsentrasi."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Ketiga Urusan Pemerintahan Konkuren"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Urusan pemerintahan konkuren sebagaimana dimaksud dalam Pasal 9 ayat (3) yang menjadi kewenangan Daerah terdiri atas Urusan Pemerintahan Wajib dan Urusan Pemerintahan Pilihan.\n(2) Urusan Pemerintahan Wajib sebagaimana dimaksud pada ayat (1) terdiri atas Urusan Pemerintahan yang berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan yang tidak berkaitan dengan Pelayanan Dasar.\n(3) Urusan Pemerintahan Wajib yang berkaitan dengan Pelayanan Dasar sebagaimana dimaksud pada ayat (2) adalah Urusan Pemerintahan Wajib yang sebagian substansinya merupakan Pelayanan Dasar."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Urusan Pemerintahan Wajib yang berkaitan dengan Pelayanan Dasar sebagaimana dimaksud dalam Pasal 11 ayat (2) meliputi:\na. pendidikan;\nb. kesehatan;\nc. pekerjaan umum dan penataan ruang;\nd. perumahan rakyat dan kawasan permukiman;\ne. ketenteraman, ketertiban umum, dan pelindungan masyarakat; dan\nf. sosial.\n(2) Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar sebagaimana dimaksud dalam Pasal 11 ayat (2) meliputi:\na. tenaga kerja;\nb. pemberdayaan perempuan dan pelindungan anak;\nc. pangan;\nd. pertanahan;\ne. lingkungan hidup;\nf. administrasi kependudukan dan pencatatan sipil;\ng. pemberdayaan masyarakat dan Desa;\nh. pengendalian penduduk dan keluarga berencana;\ni. perhubungan;\nj. komunikasi dan informatika;\nk. koperasi, usaha kecil, dan menengah;\n1. penanaman modal;\nm. kepemudaan dan olah raga;\nn. statistik;\no. persandian;\np. kebudayaan;\nq. perpustakaan; dan\nr. kearsipan.\n(3) Urusan Pemerintahan Pilihan sebagaimana dimaksud dalam Pasal 11 ayat (1) meliputi:\na. kelautan dan perikanan;\nb. pariwisata;\nc. pertanian;\nd. kehutanan;\ne. energi dan sumber daya mineral;\nf. perdagangan;\ng. perindustrian; dan\nh. transmigrasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Pembagian urusan pemerintahan konkuren antara Pemerintah Pusat dan Daerah provinsi serta Daerah kabupaten/kota sebagaimana dimaksud dalam Pasal 9 ayat (3) didasarkan pada prinsip akuntabilitas, efisiensi, dan eksternalitas, serta kepentingan strategis nasional.\n(2) Berdasarkan prinsip sebagaimana dimaksud pada ayat (1) kriteria Urusan Pemerintahan yang menjadi kewenangan Pemerintah Pusat adalah:\na. Urusan Pemerintahan yang lokasinya lintas Daerah provinsi atau lintas negara;\nb. Urusan Pemerintahan yang penggunanya lintas Daerah provinsi atau lintas negara;\nc. Urusan Pemerintahan yang manfaat atau dampak negatifnya lintas Daerah provinsi atau lintas negara;\nd. Urusan Pemerintahan yang penggunaan sumber dayanya lebih efisien apabila dilakukan oleh Pemerintah Pusat; dan/atau\ne. Urusan Pemerintahan yang peranannya strategis bagi kepentingan nasional.\n(3) Berdasarkan prinsip sebagaimana dimaksud pada ayat (1) kriteria Urusan Pemerintahan yang menjadi kewenangan Daerah provinsi adalah:\na. Urusan Pemerintahan yang lokasinya lintas Daerah kabupaten/kota;\nb. Urusan Pemerintahan yang penggunanya lintas Daerah kabupaten/kota;\nc. Urusan Pemerintahan yang manfaat atau dampak negatifnya lintas Daerah kabupaten/kota; dan/atau\nd. Urusan Pemerintahan yang penggunaan sumber dayanya lebih efisien apabila dilakukan oleh Daerah Provinsi.\n(4) Berdasarkan prinsip sebagaimana dimaksud pada ayat (1) kriteria Urusan Pemerintahan yang menjadi kewenangan Daerah kabupaten/kota adalah:\na. Urusan Pemerintahan yang lokasinya dalam Daerah kabupaten/kota;\nb. Urusan Pemerintahan yang penggunanya dalam Daerah kabupaten/kota;\nc. Urusan Pemerintahan yang manfaat atau dampak negatifnya hanya dalam Daerah kabupaten/kota; dan/atau\nd. Urusan Pemerintahan yang penggunaan sumber dayanya lebih efisien apabila dilakukan oleh Daerah kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Penyelenggaraan Urusan Pemerintahan bidang kehutanan, kelautan, serta energi dan sumber daya mineral dibagi antara Pemerintah Pusat dan Daerah provinsi.\n(2) Urusan Pemerintahan bidang kehutanan sebagaimana dimaksud pada ayat (1) yang berkaitan dengan pengelolaan taman hutan raya kabupaten/kota menjadi kewenangan Daerah kabupaten/kota.\n(3) Urusan Pemerintahan bidang energi dan sumber daya mineral sebagaimana dimaksud pada ayat (1) yang berkaitan dengan pengelolaan minyak dan gas bumi menjadi kewenangan Pemerintah Pusat.\n(4) Urusan Pemerintahan bidang energi dan sumber daya mineral sebagaimana dimaksud pada ayat (1) yang berkaitan dengan pemanfaatan langsung panas bumi dalam Daerah kabupaten/kota menjadi kewenangan Daerah kabupaten/kota.\n(5) Daerah kabupaten/kota penghasil dan bukan penghasil mendapatkan bagi hasil dari penyelenggaraan Urusan Pemerintahan sebagaimana dimaksud pada ayat (1).\n(6) Penentuan Daerah kabupaten/kota penghasil untuk penghitungan bagi hasil kelautan adalah hasil kelautan yang berada dalam batas wilayah 4 (empat) mil diukur dari garis pantai ke arah laut lepas dan/atau ke arah perairan kepulauan.\n(7) Dalam hal batas wilayah kabupaten/kota sebagaimana dimaksud pada ayat (6) kurang dari 4 (empat) mil, batas wilayahnya dibagi sama jarak atau diukur sesuai dengan prinsip garis tengah dari Daerah yang berbatasan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Pembagian urusan pemerintahan konkuren antara Pemerintah Pusat dan Daerah provinsi serta Daerah kabupaten/kota tercantum dalam Lampiran yang merupakan bagian yang tidak terpisahkan dari Undang-Undang ini.\n(2) Urusan pemerintahan konkuren yang tidak tercantum dalam Lampiran Undang-Undang ini menjadi kewenangan tiap tingkatan atau susunan pemerintahan yang penentuannya menggunakan prinsip dan kriteria pembagian urusan pemerintahan konkuren sebagaimana dimaksud dalam Pasal 13.\n(3) Urusan pemerintahan konkuren sebagaimana dimaksud pada ayat (2) ditetapkan dengan peraturan presiden.\n(4) Perubahan terhadap pembagian urusan pemerintahan konkuren antara Pemerintah Pusat dan Daerah provinsi dan Daerah kabupaten/kota sebagaimana dimaksud pada ayat (1) yang tidak berakibat terhadap pengalihan urusan pemerintahan konkuren pada tingkatan atau susunan pemerintahan yang lain ditetapkan dengan peraturan pemerintah.\n(5) Perubahan sebagaimana dimaksud pada ayat (4) dapat dilakukan sepanjang tidak bertentangan dengan prinsip dan kriteria pembagian urusan pemerintahan konkuren sebagaimana dimaksud dalam Pasal 13."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Pemerintah Pusat dalam menyelenggarakan urusan pemerintahan konkuren sebagaimana dimaksud dalam Pasal 9 ayat (3) berwenang untuk:\na. menetapkan norma, standar, prosedur, dan kriteria dalam rangka penyelenggaraan Urusan Pemerintahan; dan\nb. melaksanakan pembinaan dan pengawasan terhadap penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(2) Norma, standar, prosedur, dan kriteria sebagaimana dimaksud pada ayat (1) huruf a berupa ketentuan peraturan perundang-undangan yang ditetapkan oleh Pemerintah Pusat sebagai pedoman dalam penyelenggaraan urusan pemerintahan konkuren yang menjadi kewenangan Pemerintah Pusat dan yang menjadi kewenangan Daerah.\n(3) Kewenangan Pemerintah Pusat sebagaimana dimaksud pada ayat (1) dilaksanakan oleh kementerian dan lembaga pemerintah nonkementerian.\n(4) Pelaksanaan kewenangan yang dilakukan oleh lembaga pemerintah nonkementerian sebagaimana dimaksud pada ayat (3) harus dikoordinasikan dengan kementerian terkait.\n(5) Penetapan norma, standar, prosedur, dan kriteria sebagaimana dimaksud pada ayat (1) huruf a dilakukan paling lama 2 (dua) tahun terhitung sejak peraturan pemerintah mengenai pelaksanaan urusan pemerintahan konkuren diundangkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Daerah berhak menetapkan kebijakan Daerah untuk menyelenggarakan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(2) Daerah dalam menetapkan kebijakan Daerah sebagaimana dimaksud pada ayat (1), wajib berpedoman pada norma, standar, prosedur, dan kriteria yang telah ditetapkan oleh Pemerintah Pusat.\n(3) Dalam hal kebijakan Daerah yang dibuat dalam rangka penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah tidak mempedomani norma, standar, prosedur, dan kriteria sebagaimana dimaksud pada ayat (2), Pemerintah Pusat membatalkan kebijakan Daerah sebagaimana dimaksud pada ayat (1).\n(4) Apabila dalam jangka waktu 2 (dua) tahun sebagaimana dimaksud dalam Pasal 16 ayat (5) Pemerintah Pusat belum menetapkan norma, standar, prosedur, dan kriteria, penyelenggara Pemerintahan Daerah melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Penyelenggara Pemerintahan Daerah memprioritaskan pelaksanaan Urusan Pemerintahan Wajib yang berkaitan dengan Pelayanan Dasar sebagaimana dimaksud dalam Pasal 11 ayat (3).\n(2) Pelaksanaan Pelayanan Dasar pada Urusan Pemerintahan Wajib yang berkaitan dengan Pelayanan Dasar sebagaimana dimaksud pada ayat (1) berpedoman pada standar pelayanan minimal yang ditetapkan oleh Pemerintah Pusat.\n(3) Ketentuan lebih lanjut mengenai standar pelayanan minimal diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Urusan pemerintahan konkuren yang menjadi kewenangan Pemerintah Pusat diselenggarakan:\na. sendiri oleh Pemerintah Pusat;\nb. dengan cara melimpahkan kepada gubernur sebagai wakil Pemerintah Pusat atau kepada Instansi Vertikal yang ada di Daerah berdasarkan asas Dekonsentrasi; atau\nc. dengan cara menugasi Daerah berdasarkan asas Tugas Pembantuan.\n(2) Instansi Vertikal sebagaimana dimaksud pada ayat (1) huruf b dibentuk setelah mendapat persetujuan dari gubernur sebagai wakil Pemerintah Pusat.\n(3) Pembentukan Instansi Vertikal untuk melaksanakan urusan pemerintahan absolut dan pembentukan Instansi Vertikal oleh kementerian yang nomenklaturnya secara tegas disebutkan dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 tidak memerlukan persetujuan dari gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud pada ayat (2).\n(4) Penugasan oleh Pemerintah Pusat kepada Daerah berdasarkan asas Tugas Pembantuan sebagaimana dimaksud pada ayat (1) huruf c ditetapkan dengan peraturan menteri/kepala lembaga pemerintah nonkementerian.\n(5) Peraturan menteri/kepala lembaga pemerintah nonkementerian sebagaimana dimaksud pada ayat (4) ditetapkan setelah berkoordinasi dengan Menteri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Urusan pemerintahan konkuren yang menjadi kewenangan Daerah provinsi diselenggarakan:\na. sendiri oleh Daerah provinsi;\nb. dengan cara menugasi Daerah kabupaten/kota berdasarkan asas Tugas Pembantuan; atau\nc. dengan cara menugasi Desa.\n(2) Penugasan oleh Daerah provinsi kepada Daerah kabupaten/kota berdasarkan asas Tugas Pembantuan sebagaimana dimaksud pada ayat (1) huruf b dan kepada Desa sebagaimana dimaksud pada ayat (1) huruf c ditetapkan dengan peraturan gubernur sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Urusan pemerintahan konkuren yang menjadi kewenangan Daerah kabupaten/kota diselenggarakan sendiri oleh Daerah kabupaten/kota atau dapat ditugaskan sebagian pelaksanaannya kepada Desa.\n(4) Penugasan oleh Daerah kabupaten/kota kepada Desa sebagaimana dimaksud pada ayat (3) ditetapkan dengan peraturan bupati/wali kota sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Ketentuan lebih lanjut mengenai pelaksanaan urusan pemerintahan konkuren diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Daerah berhak menetapkan kebijakan Daerah dalam melaksanakan Tugas Pembantuan.\n(2) Kebijakan Daerah sebagaimana dimaksud pada ayat (1) hanya terkait dengan pengaturan mengenai pelaksanaan Tugas Pembantuan di Daerahnya.\n(3) Anggaran untuk melaksanakan Tugas Pembantuan disediakan oleh yang menugasi.\n(4) Dokumen anggaran untuk melaksanakan Tugas Pembantuan disampaikan oleh kepala daerah penerima Tugas Pembantuan kepada DPRD bersamaan dengan penyampaian rancangan APBD dalam dokumen yang terpisah.\n(5) Laporan pelaksanaan anggaran Tugas Pembantuan disampaikan oleh kepala daerah penerima Tugas Pembantuan kepada DPRD bersamaan dengan penyampaian laporan keuangan Pemerintah Daerah dalam dokumen yang terpisah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Ketentuan lebih lanjut mengenai Dekonsentrasi dan Tugas Pembantuan diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Kementerian atau lembaga pemerintah nonkementerian bersama Pemerintah Daerah melakukan pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan yang diprioritaskan oleh setiap Daerah provinsi dan Daerah kabupaten/kota.\n(2) Hasil pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan sebagaimana dimaksud pada ayat (1) ditetapkan dengan peraturan menteri setelah mendapatkan rekomendasi dari Menteri.\n(3) Pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar sebagaimana dimaksud pada ayat (1) dilakukan untuk menentukan intensitas Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar berdasarkan jumlah penduduk, besarnya APBD, dan luas wilayah.\n(4) Pemetaan Urusan Pemerintahan Pilihan sebagaimana dimaksud pada ayat (1) dilakukan untuk menentukan Daerah yang mempunyai Urusan Pemerintahan Pilihan berdasarkan potensi, proyeksi penyerapan tenaga kerja, dan pemanfaatan lahan.\n(5) Pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan sebagaimana dimaksud pada ayat (1) digunakan oleh Daerah dalam penetapan kelembagaan, perencanaan, dan penganggaran dalam penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(6) Pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan sebagaimana dimaksud pada ayat (1) digunakan oleh kementerian atau lembaga pemerintah nonkementerian sebagai dasar untuk pembinaan kepada Daerah dalam pelaksanaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan secara nasional.\n(7) Pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan serta pembinaan kepada Daerah sebagaimana dimaksud pada ayat (1) dan ayat (6) dikoordinasikan oleh Menteri."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Keempat Urusan Pemerintahan Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Urusan pemerintahan umum sebagaimana dimaksud dalam Pasal 9 ayat (5) meliputi:\na. pembinaan wawasan kebangsaan dan ketahanan nasional dalam rangka memantapkan pengamalan Pancasila, pelaksanaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, pelestarian Bhinneka Tunggal Ika serta pemertahanan dan pemeliharaan keutuhan Negara Kesatuan Republik Indonesia;\nb. pembinaan persatuan dan kesatuan bangsa;\nc. pembinaan kerukunan antarsuku dan intrasuku, umat beragama, ras, dan golongan lainnya guna mewujudkan stabilitas keamanan lokal, regional, dan nasional;\nd. penanganan konflik sosial sesuai ketentuan peraturan perundang-undangan;\ne. koordinasi pelaksanaan tugas antarinstansi pemerintahan yang ada di wilayah Daerah provinsi dan Daerah kabupaten/kota untuk menyelesaikan permasalahan yang timbul dengan memperhatikan prinsip demokrasi, hak asasi manusia, pemerataan, keadilan, keistimewaan dan kekhususan, potensi serta keanekaragaman Daerah sesuai dengan ketentuan peraturan perundang-undangan;\nf. pengembangan kehidupan demokrasi berdasarkan Pancasila; dan\ng. pelaksanaan semua Urusan Pemerintahan yang bukan merupakan kewenangan Daerah dan tidak dilaksanakan oleh Instansi Vertikal.\n(2) Urusan pemerintahan umum sebagaimana dimaksud pada ayat (1) dilaksanakan oleh gubernur dan bupati/wali kota di wilayah kerja masing-masing.\n(3) Untuk melaksanakan urusan pemerintahan umum sebagaimana dimaksud pada ayat (2), gubernur dan bupati/wali kota dibantu oleh Instansi Vertikal.\n(4) Dalam melaksanakan urusan pemerintahan umum, gubernur bertanggung jawab kepada Presiden melalui Menteri dan bupati/wali kota bertanggung jawab kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat.\n(5) Gubernur dan bupati/wali kota dalam melaksanakan urusan pemerintahan umum dibiayai dari APBN.\n(6) Bupati/wali kota dalam melaksanakan urusan pemerintahan umum sebagaimana dimaksud pada ayat (2) pada tingkat Kecamatan melimpahkan pelaksanaannya kepada camat.\n(7) Ketentuan lebih lanjut mengenai pelaksanaan urusan pemerintahan umum sebagaimana dimaksud pada ayat (2) sampai dengan ayat (6) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IV",
      "teks": "Bagian Kelima Forkopimda"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "parent_bagian": "Bagian Kelima",
      "teks": "(1) Untuk menunjang kelancaran pelaksanaan urusan pemerintahan umum, dibentuk Forkopimda provinsi, Forkopimda kabupaten/kota, dan forum koordinasi pimpinan di Kecamatan.\n(2) Forkopimda provinsi, Forkopimda kabupaten/kota, dan forum koordinasi pimpinan di Kecamatan sebagaimana dimaksud pada ayat (1) diketuai oleh gubernur untuk Daerah provinsi, oleh bupati/wali kota untuk Daerah kabupaten/kota, dan oleh camat untuk Kecamatan.\n(3) Anggota Forkopimda provinsi dan Forkopimda kabupaten/kota terdiri atas pimpinan DPRD, pimpinan kepolisian, pimpinan kejaksaan, dan pimpinan satuan teritorial Tentara Nasional Indonesia di Daerah.\n(4) Anggota forum koordinasi pimpinan di Kecamatan terdiri atas pimpinan kepolisian dan pimpinan kewilayahan Tentara Nasional Indonesia di Kecamatan.\n(5) Forkopimda provinsi, Forkopimda kabupaten/kota dan forum koordinasi pimpinan di Kecamatan sebagaimana dimaksud pada ayat (1) dapat mengundang pimpinan Instansi Vertikal sesuai dengan masalah yang dibahas.\n(6) Ketentuan lebih lanjut mengenai Forkopimda dan forum koordinasi pimpinan di Kecamatan sebagaimana dimaksud pada ayat (1) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB V",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB V KEWENANGAN DAERAH PROVINSI DI LAUT DAN DAERAH PROVINSI YANG BERCIRI KEPULAUAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB V",
      "teks": "Bagian Kesatu Kewenangan Daerah Provinsi di Laut"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Daerah provinsi diberi kewenangan untuk mengelola sumber daya alam di laut yang ada di wilayahnya.\n(2) Kewenangan Daerah provinsi untuk mengelola sumber daya alam di laut sebagaimana dimaksud pada ayat (1) meliputi:\na. eksplorasi, eksploitasi, konservasi, dan pengelolaan kekayaan laut di luar minyak dan gas bumi;\nb. pengaturan administratif;\nc. pengaturan tata ruang;\nd. ikut serta dalam memelihara keamanan di laut; dan\ne. ikut serta dalam mempertahankan kedaulatan negara.\n(3) Kewenangan Daerah provinsi untuk mengelola sumber daya alam di laut sebagaimana dimaksud pada ayat (1) paling jauh 12 (dua belas) mil laut diukur dari garis pantai ke arah laut lepas dan/atau ke arah perairan kepulauan.\n(4) Apabila wilayah laut antardua Daerah provinsi kurang dari 24 (dua puluh empat) mil, kewenangan untuk mengelola sumber daya alam di laut dibagi sama jarak atau diukur sesuai dengan prinsip garis tengah dari wilayah antardua Daerah provinsi tersebut.\n(5) Ketentuan sebagaimana dimaksud pada ayat (3) dan ayat (4) tidak berlaku terhadap penangkapan ikan oleh nelayan kecil."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB V",
      "teks": "Bagian Kedua Daerah Provinsi yang Berciri Kepulauan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Daerah Provinsi yang Berciri Kepulauan mempunyai kewenangan mengelola sumber daya alam di laut sebagaimana dimaksud dalam Pasal 27.\n(2) Selain mempunyai kewenangan sebagaimana dimaksud pada ayat (1), Daerah Provinsi yang Berciri Kepulauan mendapat penugasan dari Pemerintah Pusat untuk melaksanakan kewenangan Pemerintah Pusat di bidang kelautan berdasarkan asas Tugas Pembantuan.\n(3) Penugasan sebagaimana dimaksud pada ayat (2) dapat dilaksanakan setelah Pemerintah Daerah Provinsi yang Berciri Kepulauan memenuhi norma, standar, prosedur, dan kriteria yang ditetapkan oleh Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Untuk mendukung penyelenggaraan pemerintahan di Daerah Provinsi yang Berciri Kepulauan, Pemerintah Pusat dalam menyusun perencanaan pembangunan dan menetapkan kebijakan DAU dan DAK harus memperhatikan Daerah Provinsi yang Berciri Kepulauan.\n(2) Penetapan kebijakan DAU sebagaimana dimaksud pada ayat (1) dilakukan dengan cara menghitung luas lautan yang menjadi kewenangan Daerah Provinsi yang Berciri Kepulauan dalam pengelolaan sumber daya alam di wilayah laut.\n(3) Dalam menetapkan kebijakan DAK sebagaimana dimaksud pada ayat (1), Pemerintah Pusat harus memperhitungkan pengembangan Daerah Provinsi yang Berciri Kepulauan sebagai kegiatan dalam rangka pencapaian prioritas nasional berdasarkan kewilayahan.\n(4) Berdasarkan alokasi DAU dan DAK sebagaimana dimaksud pada ayat (2) dan ayat (3), Daerah Provinsi yang Berciri Kepulauan menyusun strategi percepatan pembangunan Daerah dengan berpedoman pada ketentuan peraturan perundang-undangan.\n(5) Strategi percepatan pembangunan Daerah sebagaimana dimaksud pada ayat (4) meliputi prioritas pembangunan dan pengelolaan sumber daya alam di laut, percepatan pembangunan ekonomi, pembangunan sosial budaya, pengembangan sumber daya manusia, pembangunan hukum adat terkait pengelolaan laut, dan partisipasi masyarakat dalam pembangunan Daerah Provinsi yang Berciri Kepulauan.\n(6) Dalam rangka mendukung percepatan pembangunan di Daerah Provinsi yang Berciri Kepulauan sebagaimana dimaksud pada ayat (5), Pemerintah Pusat dapat mengalokasikan dana percepatan di luar DAU dan DAK sebagaimana dimaksud pada ayat (2) dan ayat (3)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "parent_bagian": "Bagian Kedua",
      "teks": "Ketentuan lebih lanjut mengenai kewenangan Daerah provinsi di laut sebagaimana dimaksud dalam Pasal 27 dan Daerah Provinsi yang Berciri Kepulauan sebagaimana dimaksud dalam Pasal 28 dan Pasal 29 diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB VI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VI PENATAAN DAERAH"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VI",
      "teks": "Bagian Kesatu Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Dalam pelaksanaan Desentralisasi dilakukan penataan Daerah.\n(2) Penataan Daerah sebagaimana dimaksud pada ayat (1) ditujukan untuk:\na. mewujudkan efektivitas penyelenggaraan Pemerintahan Daerah;\nb. mempercepat peningkatan kesejahteraan masyarakat;\nc. mempercepat peningkatan kualitas pelayanan publik;\nd. meningkatkan kualitas tata kelola pemerintahan;\ne. meningkatkan daya saing nasional dan daya saing Daerah; dan\nf. memelihara keunikan adat istiadat, tradisi, dan budaya Daerah.\n(3) Penataan Daerah sebagaimana dimaksud pada ayat (1) terdiri atas Pembentukan Daerah dan penyesuaian Daerah.\n(4) Pembentukan Daerah dan penyesuaian Daerah sebagaimana dimaksud pada ayat (3) dapat dilakukan berdasarkan pertimbangan kepentingan strategis nasional."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VI",
      "teks": "Bagian Kedua Pembentukan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pembentukan Daerah sebagaimana dimaksud dalam Pasal 31 ayat (3) berupa:\na. pemekaran Daerah; dan\nb. penggabungan Daerah.\n(2) Pembentukan Daerah sebagaimana dimaksud pada ayat (1) mencakup pembentukan Daerah provinsi dan pembentukan Daerah kabupaten/kota."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Paragraf 1 Pemekaran Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemekaran Daerah sebagaimana dimaksud dalam Pasal 32 ayat (1) huruf a berupa:\na. pemecahan Daerah provinsi atau Daerah kabupaten/kota untuk menjadi dua atau lebih Daerah baru; atau\nb. penggabungan bagian Daerah dari Daerah yang bersanding dalam 1 (satu) Daerah provinsi menjadi satu Daerah baru.\n(2) Pemekaran Daerah sebagaimana dimaksud pada ayat (1) dilakukan melalui tahapan Daerah Persiapan provinsi atau Daerah Persiapan kabupaten/kota.\n(3) Pembentukan Daerah Persiapan sebagaimana dimaksud pada ayat (2) harus memenuhi persyaratan dasar dan persyaratan administratif."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Persyaratan dasar sebagaimana dimaksud dalam Pasal 33 ayat (3) meliputi:\na. persyaratan dasar kewilayahan; dan\nb. persyaratan dasar kapasitas Daerah.\n(2) Persyaratan dasar kewilayahan sebagaimana dimaksud pada ayat (1) huruf a meliputi:\na. luas wilayah minimal;\nb. jumlah penduduk minimal;\nc. batas wilayah;\nd. Cakupan Wilayah; dan\ne. batas usia minimal Daerah provinsi, Daerah kabupaten/kota, dan Kecamatan.\n(3) Persyaratan dasar kapasitas Daerah sebagaimana dimaksud pada ayat (1) huruf b adalah kemampuan Daerah untuk berkembang dalam mewujudkan kesejahteraan masyarakat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Luas wilayah minimal dan jumlah penduduk minimal sebagaimana dimaksud dalam Pasal 34 ayat (2) huruf a dan huruf b ditentukan berdasarkan pengelompokan pulau atau kepulauan.\n(2) Ketentuan mengenai pengelompokan pulau atau kepulauan sebagaimana dimaksud pada ayat (1) diatur dalam peraturan pemerintah.\n(3) Batas wilayah sebagaimana dimaksud dalam Pasal 34 ayat (2) huruf c dibuktikan dengan titik koordinat pada peta dasar.\n(4) Cakupan Wilayah sebagaimana dimaksud dalam Pasal 34 ayat (2) huruf d meliputi:\na. paling sedikit 5 (lima) Daerah kabupaten/kota untuk pembentukan Daerah provinsi;\nb. paling sedikit 5 (lima) Kecamatan untuk pembentukan Daerah kabupaten; dan\nc. paling sedikit 4 (empat) Kecamatan untuk pembentukan Daerah kota.\n(5) Cakupan Wilayah untuk Daerah Persiapan yang wilayahnya terdiri atas pulau-pulau memuat Cakupan Wilayah sebagaimana dimaksud pada ayat (4) dan rincian nama pulau yang berada dalam wilayahnya.\n(6) Batas usia minimal sebagaimana dimaksud dalam Pasal 34 ayat (2) huruf e meliputi:\na. batas usia minimal Daerah provinsi 10 (sepuluh) tahun dan Daerah kabupaten/kota 7 (tujuh) tahun terhitung sejak pembentukan; dan\nb. batas usia minimal Kecamatan yang menjadi Cakupan Wilayah Daerah kabupaten/kota 5 (lima) tahun terhitung sejak pembentukan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Persyaratan dasar kapasitas Daerah sebagaimana dimaksud dalam Pasal 34 ayat (3) didasarkan pada parameter:\na. geografi;\nb. demografi;\nc. keamanan;\nd. sosial politik, adat, dan tradisi;\ne. potensi ekonomi;\nf. keuangan Daerah; dan\ng. kemampuan penyelenggaraan pemerintahan.\n(2) Parameter geografi sebagaimana dimaksud pada ayat (1) huruf a meliputi:\na. lokasi ibu kota;\nb. hidrografi; dan\nc. kerawanan bencana.\n(3) Parameter demografi sebagaimana dimaksud pada ayat (1) huruf b meliputi:\na. kualitas sumber daya manusia; dan\nb. distribusi penduduk.\n(4) Parameter keamanan sebagaimana dimaksud pada ayat (1) huruf c meliputi:\na. tindakan kriminal umum; dan\nb. konflik sosial.\n(5) Parameter sosial politik, adat, dan tradisi sebagaimana dimaksud pada ayat (1) huruf d meliputi:\na. partisipasi masyarakat dalam pemilihan umum;\nb. kohesivitas sosial; dan\nc. organisasi kemasyarakatan.\n(6) Parameter potensi Ekonomi sebagaimana dimaksud pada ayat (1) huruf e meliputi:\na. pertumbuhan ekonomi; dan\nb. potensi unggulan Daerah.\n(7) Parameter keuangan Daerah sebagaimana dimaksud pada ayat (1) huruf f meliputi:\na. kapasitas pendapatan asli Daerah induk;\nb. potensi pendapatan asli calon Daerah Persiapan; dan\nc. pengelolaan keuangan dan aset Daerah.\n(8) Parameter kemampuan penyelenggaraan pemerintahan sebagaimana dimaksud pada ayat (1) huruf g meliputi:\na. aksesibilitas pelayanan dasar pendidikan;\nb. aksesibilitas pelayanan dasar kesehatan;\nc. aksesibilitas pelayanan dasar infrastruktur;\nd. jumlah pegawai aparatur sipil negara di Daerah induk; dan\ne. rancangan rencana tata ruang wilayah Daerah Persiapan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "Persyaratan administratif sebagaimana dimaksud dalam Pasal 33 ayat (3) disusun dengan tata urutan sebagai berikut:\na. untuk Daerah provinsi meliputi:\n1. persetujuan bersama DPRD kabupaten/kota dengan bupati/wali kota yang akan menjadi Cakupan Wilayah Daerah Persiapan provinsi; dan\n2. persetujuan bersama DPRD provinsi induk dengan gubernur Daerah provinsi induk.\nb. untuk Daerah kabupaten/kota meliputi:\n1. keputusan musyawarah Desa yang akan menjadi Cakupan Wilayah Daerah kabupaten/kota;\n2. persetujuan bersama DPRD kabupaten/kota induk dengan bupati/wali kota Daerah induk; dan\n3. persetujuan bersama DPRD provinsi dengan gubernur dari Daerah provinsi yang mencakupi Daerah Persiapan kabupaten/kota yang akan dibentuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 38",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pembentukan Daerah Persiapan sebagaimana dimaksud dalam Pasal 33 ayat (2) diusulkan oleh gubernur kepada Pemerintah Pusat, Dewan Perwakilan Rakyat Republik Indonesia, atau Dewan Perwakilan Daerah Republik Indonesia setelah memenuhi persyaratan dasar kewilayahan sebagaimana dimaksud dalam Pasal 34 ayat (2), dan persyaratan administratif sebagaimana dimaksud dalam Pasal 37.\n(2) Berdasarkan usulan sebagaimana dimaksud pada ayat (1), Pemerintah Pusat melakukan penilaian terhadap pemenuhan persyaratan dasar kewilayahan dan persyaratan administratif.\n(3) Hasil penilaian sebagaimana dimaksud pada ayat (2) disampaikan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(4) Dalam hal usulan pembentukan Daerah Persiapan dinyatakan memenuhi persyaratan dasar kewilayahan dan persyaratan administratif, dengan persetujuan Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia, Pemerintah Pusat membentuk tim kajian independen.\n(5) Tim kajian independen bertugas melakukan kajian terhadap persyaratan dasar kapasitas Daerah sebagaimana dimaksud dalam Pasal 36.\n(6) Hasil kajian sebagaimana dimaksud pada ayat (5) disampaikan oleh tim kajian independen kepada Pemerintah Pusat untuk selanjutnya dikonsultasikan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(7) Hasil konsultasi sebagaimana dimaksud pada ayat (6) menjadi pertimbangan Pemerintah Pusat dalam menetapkan kelayakan pembentukan Daerah Persiapan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 39",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Daerah Persiapan sebagaimana dimaksud dalam Pasal 33 ayat (2) ditetapkan dengan peraturan pemerintah.\n(2) Jangka waktu Daerah Persiapan sebagaimana dimaksud pada ayat (1) adalah selama 3 (tiga) tahun.\n(3) Daerah Persiapan sebagaimana dimaksud pada ayat (1) dipimpin oleh kepala daerah persiapan.\n(4) Kepala daerah persiapan provinsi diisi dari pegawai negeri sipil yang memenuhi persyaratan dan diangkat atau diberhentikan oleh Presiden atas usul Menteri.\n(5) Kepala daerah persiapan kabupaten/kota diisi dari pegawai negeri sipil yang memenuhi persyaratan dan diangkat atau diberhentikan oleh Menteri atas usul gubernur sebagai wakil Pemerintah Pusat.\n(6) Ketentuan mengenai persyaratan kepala daerah persiapan sebagaimana dimaksud pada ayat (4) dan ayat (5) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 40",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pendanaan penyelenggaraan pemerintahan pada Daerah Persiapan berasal dari:\na. bantuan pengembangan Daerah Persiapan yang bersumber dari APBN;\nb. bagian pendapatan dari pendapatan asli Daerah induk yang berasal dari Daerah Persiapan;\nc. penerimaan dari bagian dana perimbangan Daerah induk; dan\nd. sumber pendapatan lain yang sah sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Pendanaan penyelenggaraan pemerintahan pada Daerah Persiapan sebagaimana dimaksud pada ayat (1) ditetapkan dalam anggaran pendapatan dan belanja Daerah induk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 41",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Kewajiban Daerah induk terhadap Daerah Persiapan meliputi:\na. membantu penyiapan sarana dan prasarana pemerintahan;\nb. melakukan pendataan personel, pembiayaan, peralatan, dan dokumentasi;\nc. membuat pernyataan kesediaan untuk menyerahkan personel, pembiayaan, peralatan, dan dokumentasi apabila Daerah Persiapan ditetapkan menjadi Daerah baru; dan\nd. menyiapkan dukungan dana.\n(2) Kewajiban Daerah Persiapan meliputi:\na. menyiapkan sarana dan prasarana pemerintahan;\nb. mengelola personel, peralatan, dan dokumentasi;\nc. membentuk perangkat Daerah Persiapan;\nd. melaksanakan pengisian jabatan aparatur sipil negara pada perangkat Daerah Persiapan;\ne. mengelola anggaran belanja Daerah Persiapan; dan\nf. menangani pengaduan masyarakat.\n(3) Masyarakat di Daerah Persiapan melakukan partisipasi dan pengawasan terhadap penyelenggaraan pemerintahan, pembangunan, dan kemasyarakatan yang dilakukan oleh Daerah Persiapan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 42",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemerintah Pusat melakukan pembinaan, pengawasan, dan evaluasi terhadap Daerah Persiapan selama masa Daerah Persiapan.\n(2) Dewan Perwakilan Rakyat Republik Indonesia melakukan pengawasan terhadap Daerah Persiapan.\n(3) Dewan Perwakilan Daerah Republik Indonesia melakukan pengawasan terhadap Daerah Persiapan.\n(4) Pemerintah Pusat menyampaikan perkembangan pembinaan, pengawasan, dan evaluasi terhadap Daerah Persiapan sebagaimana dimaksud pada ayat (1) kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 43",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemerintah Pusat melakukan evaluasi akhir masa Daerah Persiapan.\n(2) Evaluasi akhir masa Daerah Persiapan sebagaimana dimaksud pada ayat (1) dimaksudkan untuk menilai kemampuan Daerah Persiapan dalam melaksanakan kewajiban sebagaimana dimaksud dalam Pasal 41 ayat (2).\n(3) Hasil evaluasi akhir masa Daerah Persiapan sebagaimana dimaksud pada ayat (2) dikonsultasikan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(4) Daerah Persiapan yang berdasarkan hasil evaluasi akhir dinyatakan layak ditingkatkan statusnya menjadi Daerah baru dan ditetapkan dengan undang-undang.\n(5) Daerah Persiapan yang berdasarkan hasil evaluasi akhir dinyatakan tidak layak dicabut statusnya sebagai Daerah Persiapan dengan peraturan pemerintah dan dikembalikan ke Daerah induk.\n(6) Undang-undang yang menetapkan Pembentukan Daerah sebagaimana dimaksud pada ayat (4) yang wilayahnya terdiri atas pulau-pulau, selain memuat Cakupan Wilayah sebagaimana dimaksud dalam Pasal 35 ayat (4), harus memuat perincian nama pulau yang berada dalam wilayahnya.\n(7) Daerah baru harus menyelenggarakan pemilihan kepala daerah sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "teks": "Paragraf 2 Penggabungan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 44",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Penggabungan Daerah sebagaimana dimaksud dalam Pasal 32 ayat (1) huruf b berupa:\na. penggabungan dua Daerah kabupaten/kota atau lebih yang bersanding dalam satu Daerah provinsi menjadi Daerah kabupaten/kota baru; dan\nb. penggabungan dua Daerah provinsi atau lebih yang bersanding menjadi Daerah provinsi baru.\n(2) Penggabungan Daerah sebagaimana dimaksud pada ayat (1) dilakukan berdasarkan:\na. kesepakatan Daerah yang bersangkutan; atau\nb. hasil evaluasi Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 45",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Penggabungan Daerah sebagaimana dimaksud dalam Pasal 44 ayat (1) yang dilakukan berdasarkan kesepakatan Daerah yang bersangkutan sebagaimana dimaksud dalam Pasal 44 ayat (2) huruf a harus memenuhi persyaratan administratif dan persyaratan dasar kapasitas Daerah.\n(2) Ketentuan mengenai persyaratan administratif sebagaimana dimaksud dalam Pasal 37 berlaku secara mutatis mutandis terhadap persyaratan administratif dalam rangka penggabungan Daerah sebagaimana dimaksud pada ayat (1).\n(3) Ketentuan mengenai persyaratan dasar kapasitas Daerah sebagaimana dimaksud dalam Pasal 36 berlaku secara mutatis mutandis terhadap persyaratan kapasitas Daerah dalam rangka penggabungan Daerah sebagaimana dimaksud pada ayat (1)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 46",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Penggabungan Daerah kabupaten/kota sebagaimana dimaksud dalam Pasal 44 ayat (1) huruf a yang dilakukan berdasarkan kesepakatan Daerah yang bersangkutan sebagaimana dimaksud dalam Pasal 44 ayat (2) huruf a diusulkan oleh gubernur kepada Pemerintah Pusat, Dewan Perwakilan Rakyat Republik Indonesia, atau Dewan Perwakilan Daerah Republik Indonesia setelah memenuhi persyaratan administratif sebagaimana dimaksud dalam Pasal 45 ayat (2).\n(2) Penggabungan Daerah provinsi sebagaimana dimaksud dalam Pasal 44 ayat (1) huruf b yang dilakukan berdasarkan kesepakatan Daerah yang bersangkutan sebagaimana dimaksud dalam Pasal 44 ayat (2) huruf a diusulkan secara bersama oleh gubernur yang Daerahnya akan digabungkan kepada Pemerintah Pusat, Dewan Perwakilan Rakyat Republik Indonesia, atau Dewan Perwakilan Daerah Republik Indonesia setelah memenuhi persyaratan administratif sebagaimana dimaksud dalam Pasal 45 ayat (2).\n(3) Berdasarkan usulan sebagaimana dimaksud pada ayat (1) dan ayat (2), Pemerintah Pusat melakukan penilaian terhadap pemenuhan persyaratan administratif.\n(4) Hasil penilaian sebagaimana dimaksud pada ayat (3) disampaikan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(5) Dalam hal usulan penggabungan Daerah dinyatakan memenuhi persyaratan administratif, Pemerintah Pusat dengan persetujuan Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia membentuk tim kajian independen.\n(6) Tim kajian independen bertugas melakukan kajian terhadap persyaratan kapasitas Daerah sebagaimana dimaksud dalam Pasal 45 ayat (3).\n(7) Hasil kajian sebagaimana dimaksud pada ayat (6) disampaikan oleh tim kajian independen kepada Pemerintah Pusat untuk selanjutnya dikonsultasikan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(8) Hasil konsultasi sebagaimana dimaksud pada ayat (7) menjadi pertimbangan bagi Pemerintah Pusat, Dewan Perwakilan Rakyat Republik Indonesia, atau Dewan Perwakilan Daerah Republik Indonesia dalam pembentukan undang-undang mengenai penggabungan Daerah.\n(9) Dalam hal penggabungan Daerah sebagaimana dimaksud pada ayat (8) dinyatakan tidak layak, Pemerintah Pusat, Dewan Perwakilan Rakyat Republik Indonesia, atau Dewan Perwakilan Daerah Republik Indonesia menyampaikan penolakan secara tertulis dengan disertai alasan penolakan kepada gubernur."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 47",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Penggabungan Daerah sebagaimana dimaksud dalam Pasal 44 ayat (2) huruf b dilakukan dalam hal Daerah atau beberapa Daerah tidak mampu menyelenggarakan Otonomi Daerah.\n(2) Penilaian terhadap kemampuan menyelenggarakan Otonomi Daerah sebagaimana dimaksud pada ayat (1) dilakukan oleh Pemerintah Pusat.\n(3) Pemerintah Pusat mengajukan rancangan undang-undang mengenai penggabungan Daerah kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(4) Dalam hal rancangan undang-undang mengenai penggabungan Daerah sebagaimana dimaksud pada ayat (3) disetujui, rancangan undang-undang dimaksud ditetapkan menjadi undang-undang."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VI",
      "teks": "Bagian Ketiga Penyesuaian Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 48",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Penyesuaian Daerah sebagaimana dimaksud dalam Pasal 31 ayat (3) berupa:\na. perubahan batas wilayah Daerah;\nb. perubahan nama Daerah;\nc. pemberian nama dan perubahan nama bagian rupa bumi;\nd. pemindahan ibu kota; dan/atau\ne. perubahan nama ibu kota.\n(2) Perubahan batas wilayah Daerah sebagaimana dimaksud pada ayat (1) huruf a ditetapkan dengan undang-undang.\n(3) Perubahan nama Daerah, pemberian nama dan perubahan nama bagian rupa bumi, pemindahan ibu kota, serta perubahan nama ibu kota sebagaimana dimaksud pada ayat (1) huruf b sampai dengan huruf e ditetapkan dengan peraturan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VI",
      "teks": "Bagian Keempat Kepentingan Strategis Nasional"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "teks": "Paragraf 1 Pembentukan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 49",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pembentukan Daerah berdasarkan pertimbangan kepentingan strategis nasional sebagaimana dimaksud dalam Pasal 31 ayat (4) berlaku untuk daerah perbatasan, pulau-pulau terluar, dan Daerah tertentu untuk menjaga kepentingan dan kedaulatan Negara Kesatuan Republik Indonesia.\n(2) Pembentukan Daerah sebagaimana dimaksud pada ayat (1) harus dilakukan melalui tahapan Daerah Persiapan provinsi atau Daerah Persiapan kabupaten/kota paling lama 5 (lima) tahun.\n(3) Pembentukan Daerah Persiapan sebagaimana dimaksud pada ayat (2) harus memiliki Cakupan Wilayah dengan batas-batas yang jelas dan mempertimbangkan parameter pertahanan dan keamanan, potensi Ekonomi, serta parameter lain yang memperkuat kedaulatan Negara Kesatuan Republik Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 50",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pembentukan Daerah Persiapan sebagaimana dimaksud dalam Pasal 49 ayat (2) dikonsultasikan oleh Pemerintah Pusat kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(2) Pembentukan Daerah Persiapan sebagaimana dimaksud dalam Pasal 49 ayat (2) ditetapkan dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 51",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemerintah Pusat menyiapkan sarana dan prasarana serta penataan personel untuk penyelenggaraan pemerintahan Daerah Persiapan sebagaimana dimaksud dalam Pasal 49 ayat (2).\n(2) Kewajiban Daerah Persiapan sebagaimana dimaksud dalam Pasal 49 ayat (2):\na. mengelola sarana dan prasarana pemerintahan;\nb. mengelola personel, peralatan, dan dokumentasi;\nc. membentuk perangkat Daerah Persiapan;\nd. melaksanakan pengisian jabatan aparatur sipil negara pada perangkat Daerah Persiapan;\ne. mengelola anggaran belanja Daerah Persiapan; dan\nf. menangani pengaduan masyarakat.\n(3) Pendanaan untuk penyelenggaraan pemerintahan Daerah Persiapan dan kewajiban Daerah Persiapan sebagaimana dimaksud pada ayat (1) dan ayat (2) dibebankan pada APBN, pajak daerah, dan retribusi daerah yang dipungut di Daerah Persiapan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 52",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemerintah Pusat melakukan pembinaan, pengawasan, dan evaluasi terhadap Daerah Persiapan sebagaimana dimaksud dalam Pasal 49 ayat (2) selama masa Daerah Persiapan.\n(2) Dewan Perwakilan Rakyat Republik Indonesia melakukan pengawasan terhadap Daerah Persiapan.\n(3) Dewan Perwakilan Daerah Republik Indonesia melakukan pengawasan terhadap Daerah Persiapan.\n(4) Pemerintah Pusat menyampaikan perkembangan pembinaan, pengawasan, dan evaluasi terhadap Daerah Persiapan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 53",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemerintah Pusat melakukan evaluasi akhir masa Daerah Persiapan.\n(2) Evaluasi akhir masa Daerah Persiapan sebagaimana dimaksud pada ayat (1) dimaksudkan untuk menilai kemampuan Daerah Persiapan dalam melaksanakan kewajiban sebagaimana dimaksud dalam Pasal 51 ayat (2).\n(3) Hasil evaluasi akhir masa Daerah Persiapan sebagaimana dimaksud pada ayat (2) dikonsultasikan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(4) Daerah Persiapan yang berdasarkan hasil evaluasi akhir dinyatakan layak ditingkatkan statusnya menjadi Daerah baru dan ditetapkan dengan undang-undang.\n(5) Daerah Persiapan yang berdasarkan hasil evaluasi dinyatakan tidak layak dicabut statusnya sebagai Daerah Persiapan dengan peraturan pemerintah dan dikembalikan ke Daerah induk."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "teks": "Paragraf 2 Penyesuaian Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 54",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Penyesuaian Daerah berdasarkan pertimbangan kepentingan strategis nasional sebagaimana dimaksud dalam Pasal 31 ayat (4) berupa perubahan batas wilayah Daerah dan pemindahan ibu kota.\n(2) Perubahan batas wilayah Daerah sebagaimana dimaksud pada ayat (1) ditetapkan dengan undang-undang.\n(3) Pemindahan ibu kota sebagaimana dimaksud pada ayat (1) ditetapkan dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 55",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 2",
      "teks": "Ketentuan lebih lanjut mengenai penataan Daerah diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VI",
      "teks": "Bagian Kelima Desain Besar Penataan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 56",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "parent_bagian": "Bagian Kelima",
      "teks": "(1) Pemerintah Pusat menyusun strategi penataan Daerah untuk melaksanakan penataan Daerah.\n(2) Pemerintah Pusat menyampaikan strategi penataan Daerah sebagaimana dimaksud pada ayat (1) kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(3) Strategi penataan Daerah sebagaimana dimaksud pada ayat (1) dituangkan dalam desain besar penataan Daerah.\n(4) Desain besar penataan Daerah sebagaimana dimaksud pada ayat (3) memuat perkiraan jumlah pemekaran Daerah pada periode tertentu.\n(5) Desain besar penataan Daerah dijadikan acuan dalam pemekaran Daerah baru.\n(6) Desain besar penataan Daerah sebagaimana dimaksud pada ayat (3) ditetapkan dengan peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB VII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VII PENYELENGGARA PEMERINTAHAN DAERAH"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VII",
      "teks": "Bagian Kesatu Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 57",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Penyelenggara Pemerintahan Daerah provinsi dan kabupaten/kota terdiri atas kepala daerah dan DPRD dibantu oleh Perangkat Daerah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VII",
      "teks": "Bagian Kedua Asas Penyelenggaraan Pemerintahan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 58",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Kedua",
      "teks": "Penyelenggara Pemerintahan Daerah, sebagaimana dimaksud dalam Pasal 57, dalam menyelenggarakan Pemerintahan Daerah berpedoman pada asas penyelenggaraan pemerintahan negara yang terdiri atas:\na. kepastian hukum;\nb. tertib penyelenggara negara;\nc. kepentingan umum;\nd. keterbukaan;\ne. proporsionalitas;\nf. profesionalitas;\ng. akuntabilitas;\nh. efisiensi;\ni. efektivitas; dan\nj. keadilan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VII",
      "teks": "Bagian Ketiga Kepala Daerah dan Wakil Kepala Daerah"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 1 Kepala Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 59",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Setiap Daerah dipimpin oleh kepala Pemerintahan Daerah yang disebut kepala daerah.\n(2) Kepala daerah sebagaimana dimaksud pada ayat (1) untuk Daerah provinsi disebut gubernur, untuk Daerah kabupaten disebut bupati, dan untuk Daerah kota disebut wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 60",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 1",
      "teks": "Masa jabatan kepala daerah sebagaimana dimaksud dalam Pasal 59 ayat (1) adalah selama 5 (lima) tahun terhitung sejak pelantikan dan sesudahnya dapat dipilih kembali dalam jabatan yang sama hanya untuk satu kali masa jabatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 61",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Kepala daerah sebelum memangku jabatannya dilantik dengan mengucapkan sumpah/janji yang dipandu oleh pejabat yang melantik.\n(2) Sumpah/janji kepala daerah sebagaimana dimaksud pada ayat (1) adalah sebagai berikut:\n\"Demi Allah/Tuhan, saya bersumpah/berjanji akan memenuhi kewajiban saya sebagai kepala daerah dengan sebaik-baiknya dan seadil-adilnya, memegang teguh Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, dan menjalankan segala undang-undang dan peraturannya dengan selurus-lurusnya serta berbakti kepada masyarakat, nusa, dan bangsa\"."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 62",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ketentuan mengenai pemilihan kepala daerah diatur dengan undang-undang."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 2 Wakil Kepala Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 63",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Kepala daerah sebagaimana dimaksud dalam Pasal 59 ayat (1) dapat dibantu oleh wakil kepala daerah.\n(2) Wakil kepala daerah sebagaimana dimaksud pada ayat (1) untuk Daerah provinsi disebut wakil gubernur, untuk Daerah kabupaten disebut wakil bupati, dan untuk Daerah kota disebut wakil wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 64",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Wakil kepala daerah sebelum memangku jabatannya dilantik dengan mengucapkan sumpah/janji yang dipandu oleh pejabat yang melantik.\n(2) Sumpah/janji wakil kepala daerah sebagaimana dimaksud pada ayat (1) adalah sebagai berikut:\n\"Demi Allah/Tuhan, saya bersumpah/berjanji akan memenuhi kewajiban saya sebagai wakil kepala daerah dengan sebaik-baiknya dan seadil-adilnya, memegang teguh Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 dan menjalankan segala undang-undang dan peraturannya dengan selurus-lurusnya serta berbakti kepada masyarakat, nusa dan bangsa\"."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 3 Tugas, Wewenang, Kewajiban, dan Hak Kepala Daerah dan Wakil Kepala Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 65",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Kepala daerah mempunyai tugas:\na. memimpin pelaksanaan Urusan Pemerintahan yang menjadi kewenangan Daerah berdasarkan ketentuan peraturan perundang-undangan dan kebijakan yang ditetapkan bersama DPRD;\nb. memelihara ketenteraman dan ketertiban masyarakat;\nc. menyusun dan mengajukan rancangan Perda tentang RPJPD dan rancangan Perda tentang RPJMD kepada DPRD untuk dibahas bersama DPRD, serta menyusun dan menetapkan RKPD;\nd. menyusun dan mengajukan rancangan Perda tentang APBD, rancangan Perda tentang perubahan APBD, dan rancangan Perda tentang pertanggungjawaban pelaksanaan APBD kepada DPRD untuk dibahas bersama;\ne. mewakili Daerahnya di dalam dan di luar pengadilan, dan dapat menunjuk kuasa hukum untuk mewakilinya sesuai dengan ketentuan peraturan perundang-undangan;\nf. mengusulkan pengangkatan wakil kepala daerah; dan\ng. melaksanakan tugas lain sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Dalam melaksanakan tugas sebagaimana dimaksud pada ayat (1) kepala daerah berwenang:\na. mengajukan rancangan Perda;\nb. menetapkan Perda yang telah mendapat persetujuan bersama DPRD;\nc. menetapkan Perkada dan keputusan kepala daerah;\nd. mengambil tindakan tertentu dalam keadaan mendesak yang sangat dibutuhkan oleh Daerah dan/atau masyarakat;\ne. melaksanakan wewenang lain sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Kepala daerah yang sedang menjalani masa tahanan dilarang melaksanakan tugas dan kewenangannya sebagaimana dimaksud pada ayat (1) dan ayat (2).\n(4) Dalam hal kepala daerah sedang menjalani masa tahanan sebagaimana dimaksud pada ayat (3) atau berhalangan sementara, wakil kepala daerah melaksanakan tugas dan wewenang kepala daerah.\n(5) Apabila kepala daerah sedang menjalani masa tahanan atau berhalangan sementara dan tidak ada wakil kepala daerah, sekretaris daerah melaksanakan tugas sehari-hari kepala daerah.\n(6) Apabila kepala daerah dan wakil kepala daerah sedang menjalani masa tahanan atau berhalangan sementara, sekretaris daerah melaksanakan tugas sehari-hari kepala daerah.\n(7) Ketentuan lebih lanjut mengenai pelaksanaan tugas dan wewenang kepala daerah oleh wakil kepala daerah dan pelaksanaan tugas sehari-hari kepala daerah oleh sekretaris daerah sebagaimana dimaksud pada ayat (4) sampai dengan ayat (6) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 66",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Wakil kepala daerah mempunyai tugas:\na. membantu kepala daerah dalam:\n1. memimpin pelaksanaan Urusan Pemerintahan yang menjadi kewenangan Daerah;\n2. mengoordinasikan kegiatan Perangkat Daerah dan menindaklanjuti laporan dan/atau temuan hasil pengawasan aparat pengawasan;\n3. memantau dan mengevaluasi penyelenggaraan Pemerintahan Daerah yang dilaksanakan oleh Perangkat Daerah provinsi bagi wakil gubernur; dan\n4. memantau dan mengevaluasi penyelenggaraan pemerintahan yang dilaksanakan oleh Perangkat Daerah kabupaten/kota, kelurahan, dan/atau Desa bagi wakil bupati/wali kota;\nb. memberikan saran dan pertimbangan kepada kepala daerah dalam pelaksanaan Pemerintahan Daerah;\nc. melaksanakan tugas dan wewenang kepala daerah apabila kepala daerah menjalani masa tahanan atau berhalangan sementara; dan\nd. melaksanakan tugas lain sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Selain melaksanakan tugas sebagaimana dimaksud pada ayat (1) wakil kepala daerah melaksanakan tugas dan kewajiban pemerintahan lainnya yang diberikan oleh kepala daerah yang ditetapkan dengan keputusan kepala daerah.\n(3) Dalam melaksanakan tugas sebagaimana dimaksud pada ayat (1) dan ayat (2), wakil kepala daerah bertanggung jawab kepada kepala daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 67",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "Kewajiban kepala daerah dan wakil kepala daerah meliputi:\na. memegang teguh dan mengamalkan Pancasila, melaksanakan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 serta mempertahankan dan memelihara keutuhan Negara Kesatuan Republik Indonesia;\nb. menaati seluruh ketentuan peraturan perundang-undangan;\nc. mengembangkan kehidupan demokrasi;\nd. menjaga etika dan norma dalam pelaksanaan Urusan Pemerintahan yang menjadi kewenangan Daerah;\ne. menerapkan prinsip tata pemerintahan yang bersih dan baik;\nf. melaksanakan program strategis nasional; dan\ng. menjalin hubungan kerja dengan seluruh Instansi Vertikal di Daerah dan semua Perangkat Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 68",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Kepala daerah dan/atau wakil kepala daerah yang tidak melaksanakan program strategis nasional sebagaimana dimaksud dalam Pasal 67 huruf f dikenai sanksi administratif berupa teguran tertulis oleh Menteri untuk gubernur dan/atau wakil gubernur serta oleh gubernur sebagai wakil Pemerintah Pusat untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota.\n(2) Dalam hal teguran tertulis sebagaimana dimaksud pada ayat (1) telah disampaikan 2 (dua) kali berturut-turut dan tetap tidak dilaksanakan, kepala daerah dan/atau wakil kepala daerah diberhentikan sementara selama 3 (tiga) bulan.\n(3) Dalam hal kepala daerah dan/atau wakil kepala daerah sementara telah selesai menjalani pemberhentian sebagaimana dimaksud pada ayat (2), tetap tidak melaksanakan program strategis nasional, yang bersangkutan diberhentikan sebagai kepala daerah dan/atau wakil kepala daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 69",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Selain mempunyai kewajiban sebagaimana dimaksud dalam Pasal 67 kepala daerah wajib menyampaikan laporan penyelenggaraan Pemerintahan Daerah, laporan keterangan pertanggungjawaban, dan ringkasan laporan penyelenggaraan Pemerintahan Daerah.\n(2) Laporan penyelenggaraan Pemerintahan Daerah sebagaimana dimaksud pada ayat (1) mencakup laporan kinerja instansi Pemerintah Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 70",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Laporan penyelenggaraan Pemerintahan Daerah memuat capaian kinerja penyelenggaraan Pemerintahan Daerah dan pelaksanaan Tugas Pembantuan.\n(2) Gubernur menyampaikan laporan penyelenggaraan Pemerintahan Daerah provinsi sebagaimana dimaksud dalam Pasal 69 ayat (1) kepada Presiden melalui Menteri yang dilakukan 1 (satu) kali dalam 1 (satu) tahun.\n(3) Bupati/wali kota menyampaikan laporan penyelenggaraan Pemerintahan Daerah kabupaten/kota sebagaimana dimaksud dalam Pasal 69 ayat (1) kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat yang dilakukan 1 (satu) kali dalam 1 (satu) tahun.\n(4) Laporan penyelenggaraan Pemerintahan Daerah sebagaimana dimaksud pada ayat (2) dan ayat (3) disampaikan paling lambat 3 (tiga) bulan setelah tahun anggaran berakhir.\n(5) Laporan penyelenggaraan Pemerintahan Daerah sebagaimana dimaksud pada ayat (2) dan ayat (3) digunakan sebagai bahan evaluasi dan pembinaan penyelenggaraan Pemerintahan Daerah oleh Pemerintah Pusat.\n(6) Berdasarkan hasil evaluasi sebagaimana dimaksud pada ayat (5), Menteri mengoordinasikan pengembangan kapasitas Pemerintahan Daerah.\n(7) Pembinaan sebagaimana dimaksud pada ayat (5) dapat berupa pemberian penghargaan dan sanksi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 71",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Laporan keterangan pertanggungjawaban memuat hasil penyelenggaraan Urusan Pemerintahan yang dilaksanakan oleh Pemerintah Daerah.\n(2) Kepala daerah menyampaikan laporan keterangan pertanggungjawaban sebagaimana dimaksud dalam Pasal 69 ayat (1) kepada DPRD yang dilakukan 1 (satu) kali dalam 1 (satu) tahun paling lambat 3 (tiga) bulan setelah tahun anggaran berakhir.\n(3) Laporan keterangan pertanggungjawaban kepada DPRD sebagaimana dimaksud pada ayat (2) dibahas oleh DPRD untuk rekomendasi perbaikan penyelenggaraan Pemerintahan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 72",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "Kepala daerah menyampaikan ringkasan laporan penyelenggaraan Pemerintahan Daerah kepada masyarakat bersamaan dengan penyampaian laporan penyelenggaraan Pemerintahan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 73",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Kepala daerah yang tidak menyampaikan laporan penyelenggaraan Pemerintahan Daerah sebagaimana dimaksud dalam Pasal 70 ayat (4) dan ringkasan laporan penyelenggaraan Pemerintahan Daerah sebagaimana dimaksud dalam Pasal 72 dikenai sanksi administratif berupa teguran tertulis oleh Menteri untuk gubernur dan oleh gubernur, sebagai wakil Pemerintah Pusat, untuk bupati/wali kota.\n(2) Dalam hal teguran tertulis sebagaimana dimaksud pada ayat (1) telah disampaikan 2 (dua) kali berturut-turut dan tetap tidak dilaksanakan, kepala daerah diwajibkan mengikuti program pembinaan khusus pendalaman bidang pemerintahan yang dilaksanakan oleh Kementerian serta tugas dan kewenangannya dilaksanakan oleh wakil kepala daerah atau oleh pejabat yang ditunjuk.\n(3) Dalam hal kepala daerah tidak melaksanakan kewajiban menyampaikan laporan keterangan pertanggungjawaban sebagaimana dimaksud dalam Pasal 71 ayat (2), DPRD provinsi dapat menggunakan hak interpelasi kepada gubernur dan DPRD kabupaten/kota dapat menggunakan hak interpelasi kepada bupati/wali kota.\n(4) Apabila penjelasan kepala daerah terhadap penggunaan hak interpelasi sebagaimana dimaksud pada ayat (3) tidak diterima, DPRD provinsi melaporkan gubernur kepada Menteri dan DPRD kabupaten/kota melaporkan bupati/wali kota kepada gubernur sebagai wakil Pemerintah Pusat.\n(5) Berdasarkan laporan dari DPRD sebagaimana dimaksud pada ayat (4), Menteri memberikan sanksi teguran tertulis kepada gubernur dan gubernur sebagai wakil Pemerintah Pusat, memberikan sanksi teguran tertulis kepada bupati/wali kota.\n(6) Apabila sanksi sebagaimana dimaksud pada ayat (5) telah disampaikan 2 (dua) kali berturut-turut dan tetap tidak dilaksanakan, kepala daerah diwajibkan mengikuti program pembinaan khusus pendalaman bidang pemerintahan yang dilaksanakan oleh Kementerian serta tugas dan kewenangannya dilaksanakan oleh wakil kepala daerah atau oleh pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 74",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "Ketentuan lebih lanjut mengenai laporan penyelenggaraan Pemerintahan Daerah, laporan keterangan pertanggungjawaban dan ringkasan laporan penyelenggaraan Pemerintahan Daerah, serta tata cara evaluasi penyelenggaraan Pemerintahan Daerah sebagaimana dimaksud dalam Pasal 69 ayat (1) dan Pasal 70 ayat (5) diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 75",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Dalam melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah, kepala daerah dan wakil kepala daerah mempunyai hak protokoler dan hak keuangan.\n(2) Hak keuangan sebagaimana dimaksud pada ayat (1) meliputi gaji pokok, tunjangan jabatan, dan tunjangan lain.\n(3) Kepala daerah dan/atau wakil kepala daerah yang dikenai sanksi pemberhentian sementara tidak mendapatkan hak protokoler serta hanya diberikan hak keuangan berupa gaji pokok, tunjangan anak, dan tunjangan istri/suami.\n(4) Ketentuan lebih lanjut mengenai hak protokoler dan hak keuangan kepala daerah dan wakil kepala daerah sebagaimana dimaksud pada ayat (1) diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 4 Larangan bagi Kepala Daerah dan Wakil Kepala Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 76",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Kepala daerah dan wakil kepala daerah dilarang:\na. membuat keputusan yang secara khusus memberikan keuntungan pribadi, keluarga, kroni, golongan tertentu, atau kelompok politiknya yang bertentangan dengan ketentuan peraturan perundang-undangan;\nb. membuat kebijakan yang merugikan kepentingan umum dan meresahkan sekelompok masyarakat atau mendiskriminasikan warga negara dan/atau golongan masyarakat lain yang bertentangan dengan ketentuan peraturan perundang-undangan;\nc. menjadi pengurus suatu perusahaan, baik milik swasta maupun milik negara/daerah atau pengurus yayasan bidang apa pun;\nd. menyalahgunakan wewenang yang menguntungkan diri sendiri dan/atau merugikan Daerah yang dipimpin;\ne. melakukan korupsi, kolusi, dan nepotisme serta menerima uang, barang, dan/atau jasa dari pihak lain yang mempengaruhi keputusan atau tindakan yang akan dilakukan;\nf. menjadi advokat atau kuasa hukum dalam suatu perkara di pengadilan selain sebagaimana dimaksud dalam Pasal 65 ayat (1) huruf c;\ng. menyalahgunakan wewenang dan melanggar sumpah/janji jabatannya;\nh. merangkap jabatan sebagai pejabat negara lainnya sebagaimana ditetapkan dalam ketentuan peraturan perundang-undangan;\ni. melakukan perjalanan ke luar negeri tanpa izin dari Menteri; dan\nj. meninggalkan tugas dan wilayah kerja lebih dari 7 (tujuh) Hari berturut-turut atau tidak berturut-turut dalam waktu 1 (satu) bulan tanpa izin Menteri untuk gubernur dan wakil gubernur serta tanpa izin gubernur untuk bupati dan wakil bupati atau wali kota dan wakil wali kota.\n(2) Kepala daerah dan/atau wakil kepala daerah dikecualikan dari ketentuan sebagaimana dimaksud pada ayat (1) huruf j jika dilakukan untuk kepentingan pengobatan yang bersifat mendesak."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 77",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Kepala daerah dan/atau wakil kepala daerah yang menjadi pengurus suatu perusahaan, baik milik swasta maupun milik negara/daerah atau pengurus yayasan bidang apa pun sebagaimana dimaksud dalam Pasal 76 ayat (1) huruf c dikenai sanksi pemberhentian sementara selama 3 (tiga) bulan oleh Presiden untuk gubernur dan/atau wakil gubernur serta oleh Menteri untuk bupati dan/wakil bupati atau wali kota dan/atau wakil wali kota.\n(2) Kepala daerah dan/atau wakil kepala daerah yang melakukan perjalanan ke luar negeri tanpa izin sebagaimana dimaksud dalam Pasal 76 ayat (1) huruf i dikenai sanksi pemberhentian sementara selama 3 (tiga) bulan oleh Presiden untuk gubernur dan/atau wakil gubernur serta oleh Menteri untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota.\n(3) Kepala daerah dan/atau wakil kepala daerah yang meninggalkan tugas dan wilayah kerja lebih dari 7 (tujuh) Hari berturut-turut atau tidak berturut-turut dalam waktu 1 (satu) bulan tanpa izin sebagaimana dimaksud dalam Pasal 76 ayat (1) huruf j dikenai sanksi teguran tertulis oleh Presiden untuk gubernur dan/atau wakil gubernur serta oleh Menteri untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota.\n(4) Dalam hal teguran tertulis sebagaimana dimaksud pada ayat (3) telah disampaikan 2 (dua) kali berturut-turut dan tetap tidak dilaksanakan, kepala daerah dan/atau wakil kepala daerah diwajibkan mengikuti program pembinaan khusus pendalaman bidang pemerintahan yang dilaksanakan oleh Kementerian.\n(5) Dalam hal kepala Daerah mengikuti program pembinaan khusus sebagaimana dimaksud pada ayat (4), tugas dan kewenangannya dilaksanakan oleh wakil kepala daerah atau oleh pejabat yang ditunjuk."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 5 Pemberhentian Kepala Daerah dan Wakil Kepala Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 78",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Kepala daerah dan/atau wakil kepala daerah berhenti karena:\na. meninggal dunia;\nb. permintaan sendiri; atau\nc. diberhentikan.\n(2) Kepala daerah dan/atau wakil kepala daerah diberhentikan sebagaimana dimaksud pada ayat (1) huruf c karena:\na. berakhir masa jabatannya;\nb. tidak dapat melaksanakan tugas secara berkelanjutan atau berhalangan tetap secara berturut-turut selama 6 (enam) bulan;\nc. dinyatakan melanggar sumpah/janji jabatan kepala daerah/wakil kepala daerah;\nd. tidak melaksanakan kewajiban kepala daerah dan wakil kepala daerah sebagaimana dimaksud dalam Pasal 67 huruf b;\ne. melanggar larangan bagi kepala daerah dan wakil kepala daerah sebagaimana dimaksud dalam Pasal 76 ayat (1), kecuali huruf c, huruf i, dan huruf j;\nf. melakukan perbuatan tercela;\ng. diberi tugas dalam jabatan tertentu oleh Presiden yang dilarang untuk dirangkap oleh ketentuan peraturan perundang-undangan;\nh. menggunakan dokumen dan/atau keterangan palsu sebagai persyaratan pada saat pencalonan kepala daerah/wakil kepala daerah berdasarkan pembuktian dari lembaga yang berwenang menerbitkan dokumen; dan/atau\ni. mendapatkan sanksi pemberhentian."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 79",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Pemberhentian kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud dalam Pasal 78 ayat (1) huruf a dan huruf b serta ayat (2) huruf a dan huruf b diumumkan oleh pimpinan DPRD dalam rapat paripurna dan diusulkan oleh pimpinan DPRD kepada Presiden melalui Menteri untuk gubernur dan/atau wakil gubernur serta kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota untuk mendapatkan penetapan pemberhentian.\n(2) Dalam hal pimpinan DPRD tidak mengusulkan pemberhentian kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud pada ayat (1), Presiden memberhentikan gubernur dan/atau wakil gubernur atas usul Menteri serta Menteri memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota atas usul gubernur sebagai wakil Pemerintah Pusat.\n(3) Dalam hal gubernur sebagai wakil Pemerintah Pusat tidak mengusulkan pemberhentian bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota sebagaimana dimaksud pada ayat (2), Menteri memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 80",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Pemberhentian kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud dalam Pasal 78 ayat (2) huruf c, huruf d, huruf e, dan/atau huruf f dilaksanakan dengan ketentuan:\na. pemberhentian kepala daerah dan/atau wakil kepala daerah diusulkan kepada Presiden untuk gubernur dan/atau wakil gubernur serta kepada Menteri untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota berdasarkan putusan Mahkamah Agung atas pendapat DPRD bahwa kepala daerah dan/atau wakil kepala daerah dinyatakan melanggar sumpah/janji jabatan, tidak melaksanakan kewajiban kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud dalam Pasal 67 huruf b, atau melanggar larangan bagi kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud dalam Pasal 76 ayat (1), kecuali huruf c, huruf i, huruf j, dan/atau melakukan perbuatan tercela;\nb. pendapat DPRD sebagaimana dimaksud pada huruf a diputuskan melalui Rapat Paripurna DPRD yang dihadiri oleh paling sedikit 3/4 (tiga perempat) dari jumlah anggota DPRD dan putusan diambil dengan persetujuan paling sedikit 2/3 (dua pertiga) dari jumlah anggota DPRD yang hadir;\nc. Mahkamah Agung memeriksa, mengadili, dan memutus pendapat DPRD tersebut paling lambat 30 (tiga puluh) Hari setelah permintaan DPRD diterima Mahkamah Agung dan putusannya bersifat final;\nd. Apabila Mahkamah Agung memutuskan bahwa kepala daerah dan/atau wakil kepala daerah terbukti melanggar sumpah/janji jabatan, tidak melaksanakan kewajiban kepala daerah dan wakil kepala daerah sebagaimana dimaksud dalam Pasal 67 huruf b, atau melanggar larangan bagi kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud dalam Pasal 76 ayat (1), kecuali huruf c, huruf i, huruf j, dan/atau melakukan perbuatan tercela, pimpinan DPRD menyampaikan usul kepada Presiden untuk pemberhentian gubernur dan/atau wakil gubernur dan kepada Menteri untuk pemberhentian bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota;\ne. Presiden wajib memberhentikan gubernur dan/atau wakil gubernur paling lambat 30 (tiga puluh) Hari sejak Presiden menerima usul pemberhentian tersebut dari pimpinan DPRD; dan\nf. Menteri wajib memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota paling lambat 30 (tiga puluh) Hari sejak Menteri menerima usul pemberhentian tersebut dari pimpinan DPRD.\n(2) Dalam hal pimpinan DPRD tidak menyampaikan usul pemberhentian kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud pada ayat (1) huruf d paling lambat 14 (empat belas) Hari sejak diterimanya pemberitahuan putusan Mahkamah Agung, Presiden memberhentikan gubernur dan/atau wakil gubernur atas usul Menteri dan Menteri memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota atas usul gubernur sebagai wakil Pemerintah Pusat.\n(3) Dalam hal gubernur sebagai wakil Pemerintah Pusat tidak menyampaikan usul kepada Menteri sebagaimana dimaksud pada ayat (2), Menteri memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota.\n(4) Ketentuan lebih lanjut mengenai pemberhentian kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud pada ayat (1) sampai dengan ayat (3) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 81",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Dalam hal DPRD tidak melaksanakan ketentuan sebagaimana dimaksud dalam Pasal 80 ayat (1), Pemerintah Pusat memberhentikan kepala daerah dan/atau wakil kepala daerah yang:\na. melanggar sumpah/janji jabatan kepala daerah/wakil kepala daerah;\nb. tidak melaksanakan kewajiban kepala daerah dan wakil kepala daerah sebagaimana dimaksud dalam Pasal 67 huruf b;\nc. melanggar larangan sebagaimana dimaksud dalam Pasal 76 kecuali huruf c, huruf i, dan huruf j; dan/atau\nd. melakukan perbuatan tercela.\n(2) Untuk melaksanakan pemberhentian sebagaimana dimaksud pada ayat (1), Pemerintah Pusat melakukan pemeriksaan terhadap kepala daerah dan/atau wakil kepala daerah untuk menemukan bukti-bukti terhadap pelanggaran yang dilakukan oleh kepala daerah dan/atau wakil kepala daerah.\n(3) Hasil pemeriksaan sebagaimana dimaksud pada ayat (1) disampaikan oleh Pemerintah Pusat kepada Mahkamah Agung untuk mendapat keputusan tentang pelanggaran yang dilakukan oleh kepala daerah dan/atau wakil kepala daerah.\n(4) Apabila Mahkamah Agung memutuskan bahwa kepala daerah dan/atau wakil kepala daerah terbukti melakukan pelanggaran, Pemerintah Pusat memberhentikan kepala daerah dan/atau wakil kepala daerah.\n(5) Ketentuan lebih lanjut mengenai pemberhentian kepala daerah dan/atau wakil kepala daerah oleh Pemerintah Pusat sebagaimana dimaksud pada ayat (1) sampai dengan ayat (4) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 82",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Dalam hal kepala daerah dan/atau wakil kepala daerah diduga menggunakan dokumen dan/atau keterangan palsu sebagai persyaratan pada saat pencalonan kepala daerah/wakil kepala daerah berdasarkan pembuktian dari lembaga yang berwenang menerbitkan dokumen sebagaimana dimaksud dalam Pasal 78 ayat (2) huruf h, DPRD menggunakan hak angket untuk melakukan penyelidikan.\n(2) Dalam hal hasil penyelidikan oleh DPRD sebagaimana dimaksud pada ayat (1) kepala daerah dan/atau wakil kepala daerah terbukti menggunakan dokumen dan/atau keterangan palsu sebagai persyaratan pada saat pencalonan kepala daerah/wakil kepala daerah berdasarkan pembuktian dari lembaga yang berwenang menerbitkan dokumen tersebut, DPRD provinsi mengusulkan pemberhentian gubernur dan/atau wakil gubernur kepada Presiden melalui Menteri serta DPRD kabupaten/kota mengusulkan pemberhentian bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat.\n(3) Berdasarkan usulan DPRD provinsi sebagaimana dimaksud pada ayat (2), Presiden memberhentikan gubernur dan/atau wakil gubernur paling lambat 30 (tiga puluh) Hari sejak diterimanya usulan dari DPRD provinsi.\n(4) Berdasarkan usulan DPRD kabupaten/kota sebagaimana dimaksud pada ayat (2), Menteri memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota paling lambat 30 (tiga puluh) Hari sejak diterimanya usulan dari DPRD kabupaten/kota.\n(5) Dalam hal DPRD tidak melakukan penyelidikan sebagaimana dimaksud pada ayat (1), Pemerintah Pusat melakukan klarifikasi kepada DPRD bersangkutan.\n(6) Apabila DPRD dalam waktu paling lama 2 (dua) bulan sejak dilakukan klarifikasi tetap tidak melakukan penyelidikan, Pemerintah Pusat melakukan pemeriksaan.\n(7) Dalam hal hasil pemeriksaan oleh Pemerintah Pusat sebagaimana dimaksud pada ayat (6), kepala daerah dan/atau wakil kepala daerah terbukti menggunakan dokumen dan/atau keterangan palsu sebagai persyaratan pada saat pencalonan kepala daerah/wakil kepala daerah berdasarkan pembuktian dari lembaga yang berwenang menerbitkan dokumen tersebut, Presiden memberhentikan gubernur dan/atau wakil gubernur serta Menteri memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota.\n(8) Ketentuan lebih lanjut mengenai pemberhentian kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud pada ayat (1) sampai dengan ayat (7) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 83",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Kepala daerah dan/atau wakil kepala daerah diberhentikan sementara tanpa melalui usulan DPRD karena didakwa melakukan tindak pidana kejahatan yang diancam dengan pidana penjara paling singkat 5 (lima) tahun, tindak pidana korupsi, tindak pidana terorisme, makar, tindak pidana terhadap keamanan negara, dan/atau perbuatan lain yang dapat memecah belah Negara Kesatuan Republik Indonesia.\n(2) Kepala daerah dan/atau wakil kepala daerah yang menjadi terdakwa sebagaimana dimaksud pada ayat (1) diberhentikan sementara berdasarkan register perkara di pengadilan.\n(3) Pemberhentian sementara kepala daerah dan/atau wakil kepala daerah sebagaimana dimaksud pada ayat (1) dan ayat (2) dilakukan oleh Presiden untuk gubernur dan/atau wakil gubernur serta oleh Menteri untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota.\n(4) Kepala daerah dan/atau wakil kepala daerah diberhentikan tanpa melalui usulan DPRD apabila terbukti melakukan tindak pidana sebagaimana dimaksud pada ayat (1) berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap.\n(5) Pemberhentian sebagaimana dimaksud pada ayat (4) dilakukan oleh Presiden untuk gubernur dan/atau wakil gubernur serta oleh Menteri untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 84",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Kepala daerah dan/atau wakil kepala daerah yang diberhentikan sementara sebagaimana dimaksud dalam Pasal 83 ayat (1), setelah melalui proses peradilan ternyata terbukti tidak bersalah berdasarkan putusan pengadilan, paling lambat 30 (tiga puluh) Hari terhitung sejak diterimanya pemberitahuan putusan pengadilan, Presiden mengaktifkan kembali gubernur dan/atau wakil gubernur yang bersangkutan, dan Menteri mengaktifkan kembali bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota yang bersangkutan.\n(2) Apabila setelah diaktifkan kembali sebagaimana dimaksud pada ayat (1) kepala daerah dan/atau wakil kepala daerah ternyata terbukti bersalah berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap, Presiden memberhentikan gubernur dan/atau wakil gubernur dan Menteri memberhentikan bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota.\n(3) Apabila setelah diaktifkan kembali sebagaimana dimaksud pada ayat (1) kepala daerah dan/atau wakil kepala daerah ternyata terbukti tidak bersalah berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap, Presiden merehabilitasi gubernur dan/atau wakil gubernur dan Menteri merehabilitasi bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 85",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Dalam hal kepala daerah dan/atau wakil kepala daerah menghadapi krisis kepercayaan publik yang meluas karena dugaan melakukan tindak pidana yang terkait dengan tugas, kewenangan, dan kewajibannya, DPRD dapat menggunakan hak interpelasi dan hak angket untuk menanggapinya.\n(2) Penggunaan hak interpelasi dan hak angket sebagaimana dimaksud pada ayat (1) dilaksanakan sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Dalam hal DPRD menyetujui penggunaan hak angket sebagaimana dimaksud pada ayat (2), DPRD membentuk panitia khusus untuk melakukan penyelidikan sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Dalam hal ditemukan bukti kepala daerah dan/atau wakil kepala daerah melakukan tindak pidana sebagaimana dimaksud pada ayat (1), DPRD menyerahkan proses penyelesaiannya kepada aparat penegak hukum sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 86",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Apabila kepala daerah diberhentikan sementara sebagaimana dimaksud dalam Pasal 83 ayat (1), wakil kepala daerah melaksanakan tugas dan kewenangan kepala daerah sampai dengan adanya putusan pengadilan yang telah memperoleh kekuatan hukum tetap.\n(2) Apabila gubernur diberhentikan sementara dan tidak ada wakil gubernur, Presiden menetapkan penjabat gubernur atas usul Menteri.\n(3) Apabila bupati/wali kota diberhentikan sementara dan tidak ada wakil bupati/wakil wali kota, Menteri menetapkan penjabat bupati/wali kota atas usul gubernur sebagai wakil Pemerintah Pusat.\n(4) Apabila wakil kepala daerah diberhentikan sementara sebagaimana dimaksud dalam Pasal 83 ayat (1), tugas wakil kepala daerah dilaksanakan oleh kepala daerah sampai dengan adanya putusan pengadilan yang telah memperoleh kekuatan hukum tetap.\n(5) Apabila kepala daerah dan/atau wakil kepala daerah diberhentikan sementara sebagaimana dimaksud dalam Pasal 83 ayat (1), Presiden menetapkan penjabat gubernur atas usul Menteri dan Menteri menetapkan penjabat bupati/wali kota atas usul gubernur sebagai wakil Pemerintah Pusat sampai dengan adanya putusan pengadilan yang telah memperoleh kekuatan hukum tetap.\n(6) Ketentuan lebih lanjut mengenai persyaratan dan masa jabatan penjabat gubernur dan bupati/wali kota sebagaimana dimaksud pada ayat (2), ayat (3), dan ayat (5) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 87",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Apabila gubernur berhenti sebagaimana dimaksud pada Pasal 78 atau diberhentikan berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap dilakukan pengisian jabatan gubernur sesuai dengan ketentuan peraturan perundang-undangan mengenai pemilihan kepala daerah.\n(2) Apabila bupati/wali kota berhenti sebagaimana dimaksud pada Pasal 78 atau diberhentikan berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap dilakukan pengisian jabatan bupati/wali kota sesuai dengan ketentuan peraturan perundang-undangan mengenai pemilihan kepala daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 88",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Dalam hal pengisian jabatan gubernur sebagaimana dimaksud dalam Pasal 87 ayat (1) belum dilakukan, wakil gubernur melaksanakan tugas sehari-hari gubernur sampai dilantiknya gubernur atau sampai dengan diangkatnya penjabat gubernur.\n(2) Dalam hal pengisian jabatan bupati/wali kota sebagaimana dimaksud dalam Pasal 87 ayat (2) belum dilakukan, wakil bupati/wakil wali kota melaksanakan tugas sehari-hari bupati/wali kota sampai dengan dilantiknya bupati/wali kota atau sampai diangkatnya penjabat bupati/wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 89",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 5",
      "teks": "Apabila wakil kepala daerah berhenti sebagaimana dimaksud dalam Pasal 78 atau diberhentikan berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap sebagaimana dimaksud dalam Pasal 83 ayat (4), pengisian jabatan wakil kepala daerah dilakukan sesuai dengan ketentuan peraturan perundang-undangan mengenai pemilihan kepala daerah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 6 Tindakan Penyidikan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 90",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 6",
      "teks": "(1) Tindakan penyidikan yang dilanjutkan dengan penahanan terhadap gubernur dan/atau wakil gubernur memerlukan persetujuan tertulis dari Presiden dan terhadap bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota memerlukan persetujuan tertulis dari Menteri.\n(2) Dalam hal persetujuan tertulis sebagaimana dimaksud pada ayat (1) tidak diberikan, dalam waktu paling lambat 30 (tiga puluh) Hari terhitung sejak diterimanya permohonan, dapat dilakukan proses penyidikan yang dilanjutkan dengan penahanan.\n(3) Hal-hal yang dikecualikan dari ketentuan sebagaimana dimaksud pada ayat (1) adalah:\na. tertangkap tangan melakukan tindak pidana kejahatan; atau\nb. disangka telah melakukan tindak pidana kejahatan yang diancam dengan pidana mati atau telah melakukan tindak pidana kejahatan terhadap keamanan negara.\n(4) Tindakan penyidikan yang dilanjutkan dengan penahanan sebagaimana dimaksud pada ayat (3) setelah dilakukan wajib dilaporkan kepada Presiden untuk gubernur dan/atau wakil gubernur dan kepada Menteri untuk bupati dan/atau wakil bupati atau wali kota dan/atau wakil wali kota paling lambat dalam waktu 2 (dua) kali 24 (dua puluh empat) jam sejak dilakukan penyidikan yang dilanjutkan dengan penahanan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Paragraf 7 Gubernur sebagai Wakil Pemerintah Pusat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 91",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 7",
      "teks": "(1) Dalam melaksanakan pembinaan dan pengawasan terhadap penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah kabupaten/kota dan Tugas Pembantuan oleh Daerah kabupaten/kota, Presiden dibantu oleh gubernur sebagai wakil Pemerintah Pusat.\n(2) Dalam melaksanakan pembinaan dan pengawasan sebagaimana dimaksud pada ayat (1) gubernur sebagai wakil Pemerintah Pusat mempunyai tugas:\na. mengoordinasikan pembinaan dan pengawasan penyelenggaraan Tugas Pembantuan di Daerah kabupaten/kota;\nb. melakukan monitoring, evaluasi, dan supervisi terhadap penyelenggaraan Pemerintahan Daerah kabupaten/kota yang ada di wilayahnya;\nc. memberdayakan dan memfasilitasi Daerah kabupaten/kota di wilayahnya;\nd. melakukan evaluasi terhadap rancangan Perda Kabupaten/Kota tentang RPJPD, RPJMD, APBD, perubahan APBD, pertanggungjawaban pelaksanaan APBD, tata ruang daerah, pajak daerah, dan retribusi daerah;\ne. melakukan pengawasan terhadap Perda Kabupaten/Kota; dan\nf. melaksanakan tugas lain sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Dalam melaksanakan tugas sebagaimana dimaksud ayat (2), gubernur sebagai wakil Pemerintah Pusat mempunyai wewenang:\na. membatalkan Perda Kabupaten/Kota dan peraturan bupati/wali kota;\nb. memberikan penghargaan atau sanksi kepada bupati/wali kota terkait dengan penyelenggaraan Pemerintahan Daerah;\nc. menyelesaikan perselisihan dalam penyelenggaraan fungsi pemerintahan antar-Daerah kabupaten/kota dalam 1 (satu) Daerah provinsi;\nd. memberikan persetujuan terhadap rancangan Perda Kabupaten/Kota tentang pembentukan dan susunan Perangkat Daerah kabupaten/kota; dan\ne. melaksanakan wewenang lain sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Selain melaksanakan pembinaan dan pengawasan sebagaimana dimaksud pada ayat (1) gubernur sebagai wakil Pemerintah Pusat mempunyai tugas dan wewenang:\na. menyelaraskan perencanaan pembangunan antar-Daerah kabupaten/kota dan antara Daerah provinsi dan Daerah kabupaten/kota di wilayahnya;\nb. mengoordinasikan kegiatan pemerintahan dan pembangunan antara Daerah provinsi dan Daerah kabupaten/kota dan antar-Daerah kabupaten/kota yang ada di wilayahnya;\nc. memberikan rekomendasi kepada Pemerintah Pusat atas usulan DAK pada Daerah kabupaten/kota di wilayahnya;\nd. melantik bupati/wali kota;\ne. memberikan persetujuan pembentukan Instansi Vertikal di wilayah provinsi kecuali pembentukan Instansi Vertikal untuk melaksanakan urusan pemerintahan absolut dan pembentukan Instansi Vertikal oleh kementerian yang nomenklaturnya secara tegas disebutkan dalam Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nf. melantik kepala Instansi Vertikal dari kementerian dan lembaga pemerintah nonkementerian yang ditugaskan di wilayah Daerah provinsi yang bersangkutan kecuali untuk kepala Instansi Vertikal yang melaksanakan urusan pemerintahan absolut dan kepala Instansi Vertikal yang dibentuk oleh kementerian yang nomenklaturnya secara tegas disebutkan dalam Undang-Undang Dasar Negara Tahun 1945; dan\ng. melaksanakan tugas lain sesuai dengan ketentuan peraturan perundang-undangan.\n(5) Pendanaan pelaksanaan tugas dan wewenang gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud pada ayat (1) dan ayat (4) dibebankan pada APBN.\n(6) Gubernur sebagai wakil Pemerintah Pusat dapat menjatuhkan sanksi sesuai dengan ketentuan peraturan perundang-undangan kepada penyelenggara Pemerintahan Daerah kabupaten/kota.\n(7) Tugas dan wewenang gubernur sebagai wakil Pemerintah Pusat dapat didelegasikan kepada wakil gubernur.\n(8) Ketentuan mengenai pelaksanaan tugas dan wewenang serta hak keuangan gubernur sebagai wakil Pemerintah Pusat diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 92",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 7",
      "teks": "Dalam hal gubernur sebagai wakil Pemerintah Pusat tidak melaksanakan tugas dan wewenang sebagaimana dimaksud dalam Pasal 91 ayat (2) sampai dengan ayat (4), Menteri mengambil alih pelaksanaan tugas dan wewenang gubernur sebagai wakil Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 93",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Ketiga",
      "parent_paragraf": "Paragraf 7",
      "teks": "(1) Gubernur dalam menyelenggarakan tugas sebagai wakil Pemerintah Pusat dibantu oleh perangkat gubernur.\n(2) Perangkat gubernur sebagaimana dimaksud pada ayat (1) terdiri atas sekretariat dan paling banyak 5 (lima) unit kerja.\n(3) Sekretariat sebagaimana dimaksud pada ayat (2) dipimpin oleh sekretaris gubernur.\n(4) Sekretaris daerah provinsi karena jabatannya ditetapkan sebagai sekretaris gubernur.\n(5) Ketentuan lebih lanjut mengenai susunan organisasi, tugas, dan fungsi perangkat gubernur diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VII",
      "teks": "Bagian Keempat DPRD Provinsi"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "teks": "Paragraf 1 Susunan dan Kedudukan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 94",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 1",
      "teks": "DPRD provinsi terdiri atas anggota partai politik peserta pemilihan umum yang dipilih melalui pemilihan umum."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 95",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) DPRD provinsi merupakan lembaga perwakilan rakyat Daerah provinsi yang berkedudukan sebagai unsur penyelenggara Pemerintahan Daerah provinsi.\n(2) Anggota DPRD provinsi adalah pejabat Daerah provinsi."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "teks": "Paragraf 2 Fungsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 96",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) DPRD provinsi mempunyai fungsi:\na. pembentukan Perda provinsi;\nb. anggaran; dan\nc. pengawasan.\n(2) Ketiga fungsi sebagaimana dimaksud pada ayat (1) dijalankan dalam kerangka representasi rakyat di Daerah provinsi.\n(3) Dalam rangka melaksanakan fungsi sebagaimana dimaksud pada ayat (1), DPRD provinsi menjaring aspirasi masyarakat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 97",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 2",
      "teks": "Fungsi pembentukan Perda Provinsi sebagaimana dimaksud dalam Pasal 96 ayat (1) huruf a dilaksanakan dengan cara:\na. membahas bersama gubernur dan menyetujui atau tidak menyetujui rancangan Perda Provinsi;\nb. mengajukan usul rancangan Perda Provinsi; dan\nc. menyusun program pembentukan Perda bersama gubernur."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 98",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Program pembentukan Perda provinsi sebagaimana dimaksud dalam Pasal 97 huruf c memuat daftar urutan dan prioritas rancangan Perda Provinsi yang akan dibuat dalam 1 (satu) tahun anggaran.\n(2) Dalam menetapkan program pembentukan Perda Provinsi sebagaimana dimaksud pada ayat (1), DPRD provinsi melakukan koordinasi dengan gubernur."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 99",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Fungsi anggaran sebagaimana dimaksud dalam Pasal 96 ayat (1) huruf b diwujudkan dalam bentuk pembahasan untuk persetujuan bersama terhadap rancangan Perda Provinsi tentang APBD provinsi yang diajukan oleh gubernur.\n(2) Fungsi anggaran sebagaimana dimaksud pada ayat (1) dilaksanakan dengan cara:\na. membahas KUA dan PPAS yang disusun oleh gubernur berdasarkan RKPD;\nb. membahas rancangan Perda Provinsi tentang APBD provinsi;\nc. membahas rancangan Perda Provinsi tentang perubahan APBD provinsi; dan\nd. membahas rancangan Perda Provinsi tentang Pertanggungjawaban APBD provinsi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 100",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "parent_bagian": "Bagian Keempat",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Fungsi pengawasan sebagaimana dimaksud dalam Pasal 96 ayat (1) huruf c diwujudkan dalam bentuk pengawasan terhadap:\na. pelaksanaan Perda provinsi dan peraturan gubernur;\nb. pelaksanaan peraturan perundang-undangan lain yang terkait dengan penyelenggaraan Pemerintahan Daerah provinsi; dan\nc. pelaksanaan tindak lanjut hasil pemeriksaan laporan keuangan oleh Badan Pemeriksa Keuangan.\n(2) Dalam melaksanakan pengawasan terhadap pelaksanaan tindak lanjut hasil pemeriksaan laporan keuangan oleh Badan Pemeriksa Keuangan sebagaimana dimaksud pada ayat (1) huruf c, DPRD provinsi berhak mendapatkan laporan hasil pemeriksaan keuangan yang dilakukan oleh Badan Pemeriksa Keuangan.\n(3) DPRD provinsi melakukan pembahasan terhadap laporan hasil pemeriksaan laporan keuangan sebagaimana dimaksud pada ayat (2).\n(4) DPRD provinsi dapat meminta klarifikasi atas temuan laporan hasil pemeriksaan laporan keuangan kepada Badan Pemeriksa Keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 101",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) DPRD provinsi mempunyai tugas dan wewenang:\na. membentuk Perda Provinsi bersama gubernur;\nb. membahas dan memberikan persetujuan Rancangan Perda Provinsi tentang APBD Provinsi yang diajukan oleh gubernur;\nc. melaksanakan pengawasan terhadap pelaksanaan Perda Provinsi dan APBD provinsi;\nd. memilih gubernur;\ne. mengusulkan pengangkatan dan pemberhentian gubernur kepada Presiden melalui Menteri untuk mendapatkan pengesahan pengangkatan dan pemberhentian;\nf. memberikan pendapat dan pertimbangan kepada Pemerintah Daerah provinsi terhadap rencana perjanjian internasional di Daerah provinsi;\ng. memberikan persetujuan terhadap rencana kerja sama internasional yang dilakukan oleh Pemerintah Daerah provinsi;\nh. meminta laporan keterangan pertanggungjawaban gubernur dalam penyelenggaraan Pemerintahan Daerah provinsi;\ni. memberikan persetujuan terhadap rencana kerja sama dengan Daerah lain atau dengan pihak ketiga yang membebani masyarakat dan Daerah provinsi; dan\nj. melaksanakan tugas dan wewenang lain yang diatur dalam ketentuan peraturan perundang-undangan.\n(2) Ketentuan lebih lanjut mengenai tata cara pelaksanaan tugas dan wewenang sebagaimana dimaksud pada ayat (1) diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4 Keanggotaan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Keanggotaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 102",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "(1) Anggota DPRD provinsi berjumlah paling sedikit 35 (tiga puluh lima) orang dan paling banyak 100 (seratus) orang.\n(2) Keanggotaan DPRD provinsi diresmikan dengan keputusan Menteri.\n(3) Anggota DPRD provinsi berdomisili di ibu kota provinsi yang bersangkutan.\n(4) Masa jabatan anggota DPRD provinsi adalah 5 (lima) tahun dan berakhir pada saat anggota DPRD provinsi yang baru mengucapkan sumpah/janji."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 103",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "(1) Anggota DPRD provinsi sebelum memangku jabatannya mengucapkan sumpah/janji secara bersama-sama yang dipandu oleh ketua pengadilan tinggi dalam rapat paripurna DPRD provinsi.\n(2) Anggota DPRD provinsi yang berhalangan mengucapkan sumpah/janji bersama-sama sebagaimana dimaksud pada ayat (1) mengucapkan sumpah/janji yang dipandu oleh pimpinan DPRD provinsi.\n(3) Ketentuan lebih lanjut mengenai tata cara pengucapan sumpah/janji sebagaimana dimaksud pada ayat (1) dan ayat (2) diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 104",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "Sumpah/janji sebagaimana dimaksud dalam Pasal 103 adalah sebagai berikut:\n“Demi Allah (Tuhan) saya bersumpah/berjanji:\nbahwa saya akan memenuhi kewajiban saya sebagai anggota/ketua/wakil ketua Dewan Perwakilan Rakyat Daerah provinsi dengan sebaik-baiknya dan seadil-adilnya sesuai dengan ketentuan peraturan perundang-undangan dengan berpedoman pada Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nbahwa saya dalam menjalankan kewajiban akan bekerja dengan sungguh-sungguh demi tegaknya kehidupan demokrasi serta mengutamakan kepentingan bangsa dan negara daripada kepentingan pribadi, seseorang, atau golongan;\nbahwa saya akan memperjuangkan aspirasi rakyat yang saya wakili untuk mewujudkan tujuan nasional demi kepentingan bangsa dan Negara Kesatuan Republik Indonesia.\""
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 105",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "(1) Dalam hal dilakukan pembentukan Daerah provinsi setelah pemilihan umum, pengisian anggota DPRD provinsi di Daerah provinsi induk dan Daerah provinsi yang dibentuk setelah pemilihan umum dilakukan dengan cara:\na. menetapkan jumlah kursi DPRD provinsi induk dan Daerah provinsi yang dibentuk setelah pemilihan umum berdasarkan jumlah penduduk sesuai dengan ketentuan dalam undang-undang mengenai pemilihan umum anggota DPR, DPD, dan DPRD;\nb. menetapkan perolehan suara partai politik dan calon anggota DPRD provinsi berdasarkan hasil pemilihan umum di daerah pemilihan Daerah provinsi induk dan Daerah provinsi yang dibentuk setelah pemilihan umum;\nc. menentukan bilangan pembagi pemilih berdasarkan hasil pemilihan umum di daerah pemilihan Daerah provinsi induk dan Daerah provinsi yang dibentuk setelah pemilihan umum;\nd. menentukan perolehan kursi partai politik peserta pemilihan umum berdasarkan hasil pemilihan umum di daerah pemilihan Daerah provinsi induk dan Daerah provinsi yang dibentuk setelah pemilihan umum; dan\ne. menetapkan calon terpilih dari daftar calon tetap untuk mengisi kursi sebagaimana dimaksud pada huruf d berdasarkan suara terbanyak.\n(2) Pengisian anggota DPRD provinsi sebagaimana dimaksud pada ayat (1) dilaksanakan oleh komisi pemilihan umum Daerah provinsi induk.\n(3) Pengisian anggota DPRD provinsi tidak dilakukan bagi Daerah provinsi yang dibentuk 12 (dua belas) bulan sebelum pelaksanaan pemilihan umum.\n(4) Masa jabatan anggota DPRD provinsi sebagaimana dimaksud pada ayat (1) berakhir pada saat anggota DPRD provinsi hasil pemilihan umum berikutnya mengucapkan sumpah/janji.\n(5) Ketentuan lebih lanjut mengenai penetapan jumlah dan tata cara pengisian keanggotaan DPRD provinsi induk dan Daerah provinsi yang dibentuk setelah pemilihan umum sebagaimana dimaksud pada ayat (1) diatur dengan peraturan Komisi Pemilihan Umum sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 5 Hak DPRD Provinsi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Hak DPRD Provinsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 106",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 5 Hak DPRD Provinsi",
      "teks": "(1) DPRD provinsi mempunyai hak:\na. interpelasi;\nb. angket; dan\nc. menyatakan pendapat.\n(2) Hak interpelasi sebagaimana dimaksud pada ayat (1) huruf a adalah hak DPRD provinsi untuk meminta keterangan kepada gubernur mengenai kebijakan Pemerintah Daerah provinsi yang penting dan strategis serta berdampak luas pada kehidupan bermasyarakat dan bernegara.\n(3) Hak angket sebagaimana dimaksud pada ayat (1) huruf b adalah hak DPRD provinsi untuk melakukan penyelidikan terhadap kebijakan Pemerintah Daerah provinsi yang penting dan strategis serta berdampak luas pada kehidupan masyarakat, Daerah, dan negara yang diduga bertentangan dengan ketentuan peraturan perundang-undangan.\n(4) Hak menyatakan pendapat sebagaimana dimaksud pada ayat (1) huruf c adalah hak DPRD provinsi untuk menyatakan pendapat terhadap kebijakan gubernur atau mengenai kejadian luar biasa yang terjadi di Daerah provinsi disertai dengan rekomendasi penyelesaiannya atau sebagai tindak lanjut pelaksanaan hak interpelasi dan hak angket."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 6 Hak dan Kewajiban Anggota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Hak dan Kewajiban Anggota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 107",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 6 Hak dan Kewajiban Anggota",
      "teks": "Anggota DPRD provinsi mempunyai hak:\na. mengajukan rancangan Perda Provinsi;\nb. mengajukan pertanyaan;\nc. menyampaikan usul dan pendapat;\nd. memilih dan dipilih;\ne. membela diri;\nf. imunitas;\ng. mengikuti orientasi dan pendalaman tugas;\nh. protokoler; dan\ni. keuangan dan administratif."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 108",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 6 Hak dan Kewajiban Anggota",
      "teks": "Anggota DPRD provinsi berkewajiban:\na. memegang teguh dan mengamalkan Pancasila;\nb. melaksanakan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 dan menaati ketentuan peraturan perundang-undangan;\nc. mempertahankan dan memelihara kerukunan nasional dan keutuhan Negara Kesatuan Republik Indonesia;\nd. mendahulukan kepentingan negara di atas kepentingan pribadi, kelompok, dan golongan;\ne. memperjuangkan peningkatan kesejahteraan rakyat;\nf. menaati prinsip demokrasi dalam penyelenggaraan Pemerintahan Daerah;\ng. menaati tata tertib dan kode etik;\nh. menjaga etika dan norma dalam hubungan kerja dengan lembaga lain dalam penyelenggaraan Pemerintahan Daerah provinsi;\ni. menyerap dan menghimpun aspirasi konstituen melalui kunjungan kerja secara berkala;\nj. menampung dan menindaklanjuti aspirasi dan pengaduan masyarakat; dan\nk. memberikan pertanggungjawaban secara moral dan politis kepada konstituen di daerah pemilihannya."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 7 Fraksi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Fraksi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 109",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 7 Fraksi",
      "teks": "(1) Untuk mengoptimalkan pelaksanaan fungsi, tugas dan wewenang DPRD provinsi serta hak dan kewajiban anggota DPRD provinsi, dibentuk fraksi sebagai wadah berhimpun anggota DPRD provinsi.\n(2) Setiap anggota DPRD provinsi harus menjadi anggota salah satu fraksi.\n(3) Setiap fraksi di DPRD provinsi beranggotakan paling sedikit sama dengan jumlah komisi di DPRD provinsi.\n(4) Partai politik yang jumlah anggotanya di DPRD provinsi mencapai ketentuan sebagaimana dimaksud pada ayat (3) atau lebih dapat membentuk 1 (satu) fraksi.\n(5) Dalam hal partai politik yang jumlah anggotanya di DPRD provinsi tidak memenuhi ketentuan sebagaimana dimaksud pada ayat (3), anggotanya dapat bergabung dengan fraksi yang ada atau membentuk fraksi gabungan.\n(6) Dalam hal tidak ada satu partai politik yang memenuhi persyaratan untuk membentuk fraksi sebagaimana dimaksud pada ayat (3) maka dibentuk fraksi gabungan.\n(7) Jumlah fraksi gabungan sebagaimana dimaksud pada ayat (5) dan ayat (6) paling banyak 2 (dua) fraksi.\n(8) Partai politik sebagaimana dimaksud pada ayat (4) dan ayat (5) harus mendudukkan anggotanya dalam 1 (satu) fraksi.\n(9) Fraksi mempunyai sekretariat.\n(10) Sekretariat DPRD provinsi menyediakan sarana, anggaran, dan tenaga ahli guna kelancaran pelaksanaan tugas fraksi sesuai dengan kebutuhan dan dengan memperhatikan kemampuan APBD."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 8 Alat Kelengkapan DPRD Provinsi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Alat Kelengkapan DPRD Provinsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 110",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Provinsi",
      "teks": "(1) Alat kelengkapan DPRD provinsi terdiri atas:\na. pimpinan;\nb. badan musyawarah;\nc. komisi;\nd. badan pembentukan Perda Provinsi;\ne. badan anggaran;\nf. badan kehormatan; dan\ng. alat kelengkapan lain yang diperlukan dan dibentuk oleh rapat paripurna.\n(2) Dalam menjalankan tugasnya, alat kelengkapan sebagaimana dimaksud pada ayat (1) dibantu oleh sekretariat dan dapat dibantu oleh kelompok pakar atau tim ahli.\n(3) Ketentuan mengenai tata cara pembentukan, susunan, serta tugas dan wewenang alat kelengkapan DPRD provinsi diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 111",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Provinsi",
      "teks": "(1) Pimpinan DPRD provinsi terdiri atas:\na. 1 (satu) orang ketua dan 4 (empat) orang wakil ketua untuk DPRD provinsi yang beranggotakan 85 (delapan puluh lima) sampai dengan 100 (seratus) orang;\nb. 1 (satu) orang ketua dan 3 (tiga) orang wakil ketua untuk DPRD provinsi yang beranggotakan 45 (empat puluh lima) sampai dengan 84 (delapan puluh empat) orang;\nc. 1 (satu) orang ketua dan 2 (dua) orang wakil ketua untuk DPRD provinsi yang beranggotakan 35 (tiga puluh lima) sampai dengan 44 (empat puluh empat) orang.\n(2) Pimpinan sebagaimana dimaksud pada ayat (1) berasal dari partai politik berdasarkan urutan perolehan kursi terbanyak di DPRD provinsi.\n(3) Ketua DPRD provinsi ialah anggota DPRD provinsi yang berasal dari partai politik yang memperoleh kursi terbanyak pertama di DPRD provinsi.\n(4) Dalam hal terdapat lebih dari 1 (satu) partai politik yang memperoleh kursi terbanyak pertama sebagaimana dimaksud pada ayat (3), ketua DPRD provinsi ialah anggota DPRD provinsi yang berasal dari partai politik yang memperoleh suara terbanyak.\n(5) Dalam hal terdapat lebih dari 1 (satu) partai politik yang memperoleh suara terbanyak sama sebagaimana dimaksud pada ayat (4), penentuan ketua DPRD provinsi dilakukan berdasarkan persebaran perolehan suara partai politik yang paling merata urutan pertama.\n(6) Dalam hal ketua DPRD provinsi ditetapkan dari anggota DPRD provinsi sebagaimana dimaksud pada ayat (3), wakil ketua DPRD Provinsi ditetapkan dari anggota DPRD provinsi yang berasal dari partai politik yang memperoleh kursi terbanyak kedua, ketiga, keempat dan/atau kelima sesuai dengan jumlah wakil ketua DPRD provinsi.\n(7) Dalam hal ketua DPRD provinsi ditetapkan dari anggota DPRD provinsi sebagaimana dimaksud pada ayat (4), wakil ketua DPRD Provinsi ditetapkan dari anggota DPRD provinsi yang berasal dari partai politik yang memperoleh urutan suara terbanyak kedua, ketiga, keempat dan/atau kelima sesuai dengan jumlah wakil ketua DPRD provinsi.\n(8) Dalam hal ketua DPRD provinsi ditetapkan dari anggota DPRD provinsi sebagaimana dimaksud pada ayat (5), wakil ketua DPRD Provinsi ditetapkan dari anggota DPRD provinsi yang berasal dari partai politik yang memperoleh persebaran suara paling merata urutan kedua, ketiga, keempat dan/atau kelima sesuai dengan jumlah wakil ketua DPRD provinsi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 112",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Provinsi",
      "teks": "(1) Dalam hal pimpinan DPRD provinsi sebagaimana dimaksud dalam Pasal 111 ayat (1) belum terbentuk, DPRD provinsi dipimpin oleh pimpinan sementara DPRD provinsi.\n(2) Pimpinan sementara DPRD provinsi sebagaimana dimaksud pada ayat (1) terdiri atas 1 (satu) orang ketua dan 1 (satu) orang wakil ketua yang berasal dari 2 (dua) partai politik yang memperoleh kursi terbanyak pertama dan kedua di DPRD provinsi.\n(3) Dalam hal terdapat lebih dari 1 (satu) partai politik yang memperoleh kursi terbanyak sama, ketua dan wakil ketua sementara DPRD provinsi ditentukan secara musyawarah oleh wakil partai politik bersangkutan yang ada di DPRD provinsi.\n(4) Ketua dan wakil ketua DPRD provinsi diresmikan dengan keputusan Menteri.\n(5) Pimpinan DPRD provinsi sebelum memangku jabatannya mengucapkan sumpah/janji yang teksnya sebagaimana dimaksud dalam Pasal 104 yang dipandu oleh ketua pengadilan tinggi.\n(6) Ketentuan lebih lanjut mengenai tata cara penetapan pimpinan DPRD provinsi diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 113",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Provinsi",
      "teks": "Komisi sebagaimana dimaksud dalam Pasal 110 ayat (1) huruf c dibentuk dengan ketentuan:\na. DPRD provinsi yang beranggotakan 35 (tiga puluh lima) sampai dengan 55 (lima puluh lima) orang membentuk 4 (empat) komisi;\nb. DPRD provinsi yang beranggotakan lebih dari 55 (lima puluh lima) orang membentuk 5 (lima) komisi."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Pelaksanaan Hak DPRD Provinsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 114",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "(1) Hak interpelasi sebagaimana dimaksud dalam Pasal 106 ayat (1) huruf a diusulkan oleh:\na. paling sedikit 10 (sepuluh) orang anggota DPRD provinsi dan lebih dari 1 (satu) fraksi untuk DPRD provinsi yang beranggotakan 35 (tiga puluh lima) orang sampai dengan 75 (tujuh puluh lima) orang;\nb. paling sedikit 15 (lima belas) orang anggota DPRD provinsi dan lebih dari 1 (satu) fraksi untuk DPRD provinsi yang beranggotakan di atas 75 (tujuh puluh lima) orang.\n(2) Usul sebagaimana dimaksud pada ayat (1) diajukan kepada pimpinan DPRD provinsi.\n(3) Usul sebagaimana dimaksud pada ayat (1) menjadi hak interpelasi DPRD provinsi apabila mendapat persetujuan dari rapat paripurna DPRD provinsi yang dihadiri lebih dari 1/2 (satu per dua) jumlah anggota DPRD provinsi dan putusan diambil dengan persetujuan lebih dari 1/2 (satu per dua) jumlah anggota DPRD provinsi yang hadir.\n(4) Ketentuan lebih lanjut mengenai tata cara pelaksanaan hak interpelasi diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 115",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "(1) Hak angket sebagaimana dimaksud dalam Pasal 106 ayat (1) huruf b diusulkan oleh:\na. paling sedikit 10 (sepuluh) orang anggota DPRD provinsi dan lebih dari 1 (satu) fraksi untuk DPRD provinsi yang beranggotakan 35 (tiga puluh lima) orang sampai dengan 75 (tujuh puluh lima) orang;\nb. paling sedikit 15 (lima belas) orang anggota DPRD provinsi dan lebih dari 1 (satu) fraksi untuk DPRD provinsi yang beranggotakan di atas 75 (tujuh puluh lima) orang.\n(2) Usul sebagaimana dimaksud pada ayat (1) diajukan kepada pimpinan DPRD provinsi.\n(3) Usul sebagaimana dimaksud pada ayat (1) menjadi hak angket DPRD provinsi apabila mendapat persetujuan dari rapat paripurna DPRD provinsi yang dihadiri paling sedikit 3/4 (tiga per empat) dari jumlah anggota DPRD provinsi dan putusan diambil dengan persetujuan paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD provinsi yang hadir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 116",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "(1) DPRD provinsi memutuskan menerima atau menolak usul hak angket sebagaimana dimaksud dalam Pasal 115 ayat (1).\n(2) Dalam hal DPRD provinsi menerima usul hak angket sebagaimana dimaksud pada ayat (1), DPRD provinsi membentuk panitia angket yang terdiri atas semua unsur fraksi DPRD provinsi dengan keputusan DPRD provinsi.\n(3) Dalam hal DPRD provinsi menolak usul hak angket sebagaimana dimaksud pada ayat (1), usul tersebut tidak dapat diajukan kembali."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 117",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "(1) Panitia angket sebagaimana dimaksud dalam Pasal 116 ayat (2), dalam melakukan penyelidikan sebagaimana dimaksud dalam Pasal 106 ayat (3), dapat memanggil pejabat Pemerintah Daerah provinsi, badan hukum, atau warga masyarakat di Daerah provinsi yang dianggap mengetahui atau patut mengetahui masalah yang diselidiki untuk memberikan keterangan serta untuk meminta menunjukkan surat atau dokumen yang berkaitan dengan hal yang sedang diselidiki.\n(2) Pejabat Pemerintah Daerah provinsi, badan hukum, atau warga masyarakat di Daerah provinsi yang dipanggil sebagaimana dimaksud pada ayat (1) wajib memenuhi panggilan DPRD provinsi, kecuali ada alasan yang sah menurut ketentuan peraturan perundang-undangan.\n(3) Dalam hal pejabat Pemerintah Daerah provinsi, badan hukum, atau warga masyarakat di Daerah provinsi telah dipanggil dengan patut secara berturut-turut tidak memenuhi panggilan sebagaimana dimaksud pada ayat (2), DPRD provinsi dapat memanggil secara paksa dengan bantuan Kepolisian Negara Republik Indonesia sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 118",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "Panitia angket melaporkan pelaksanaan tugasnya kepada rapat paripurna DPRD provinsi paling lama 60 (enam puluh) Hari sejak panitia angket dibentuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 119",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pelaksanaan hak angket diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 120",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "(1) Hak menyatakan pendapat sebagaimana dimaksud dalam Pasal 106 ayat (1) huruf c diusulkan oleh:\na. paling sedikit 15 (lima belas) orang anggota DPRD provinsi dan lebih dari 1 (satu) fraksi untuk DPRD provinsi yang beranggotakan 35 (tiga puluh lima) orang sampai dengan 75 (tujuh puluh lima) orang;\nb. paling sedikit 20 (dua puluh) orang anggota DPRD provinsi dan lebih dari 1 (satu) fraksi untuk DPRD provinsi yang beranggotakan di atas 75 (tujuh puluh lima) orang.\n(2) Usul sebagaimana dimaksud pada ayat (1) diajukan kepada pimpinan DPRD provinsi.\n(3) Usul sebagaimana dimaksud pada ayat (1) menjadi hak menyatakan pendapat DPRD provinsi apabila mendapat persetujuan dari rapat paripurna DPRD provinsi yang dihadiri paling sedikit 3/4 (tiga per empat) dari jumlah anggota DPRD provinsi dan putusan diambil dengan persetujuan paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD provinsi yang hadir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 121",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD Provinsi",
      "teks": "Ketentuan lebih lanjut tata cara pelaksanaan hak menyatakan pendapat diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 10 Pelaksanaan Hak Anggota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Pelaksanaan Hak Anggota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 122",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 10 Pelaksanaan Hak Anggota",
      "teks": "(1) Anggota DPRD provinsi mempunyai hak imunitas.\n(2) Anggota DPRD provinsi tidak dapat dituntut di depan pengadilan karena pernyataan, pertanyaan, dan/atau pendapat yang dikemukakannya, baik secara lisan maupun tertulis di dalam rapat DPRD provinsi ataupun di luar rapat DPRD provinsi yang berkaitan dengan fungsi serta tugas dan wewenang DPRD provinsi.\n(3) Anggota DPRD provinsi tidak dapat diganti antarwaktu karena pernyataan, pertanyaan, dan/atau pendapat yang dikemukakannya, baik di dalam rapat DPRD provinsi maupun di luar rapat DPRD provinsi yang berkaitan dengan fungsi serta tugas dan wewenang DPRD provinsi.\n(4) Ketentuan sebagaimana dimaksud pada ayat (1) tidak berlaku dalam hal anggota yang bersangkutan mengumumkan materi yang telah disepakati dalam rapat tertutup untuk dirahasiakan atau hal lain yang dimaksud dalam ketentuan mengenai rahasia negara sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 123",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 10 Pelaksanaan Hak Anggota",
      "teks": "(1) Pimpinan dan anggota DPRD provinsi mempunyai hak protokoler.\n(2) Hak protokoler sebagaimana dimaksud pada ayat (1) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 124",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 10 Pelaksanaan Hak Anggota",
      "teks": "(1) Pimpinan dan anggota DPRD provinsi mempunyai hak keuangan dan administratif.\n(2) Hak keuangan dan administratif sebagaimana dimaksud pada ayat (1) diatur dengan peraturan pemerintah.\n(3) Dalam menjalankan tugas dan wewenangnya, pimpinan dan anggota DPRD provinsi berhak memperoleh tunjangan yang besarannya disesuaikan dengan kemampuan Daerah.\n(4) Pengelolaan hak keuangan dan administratif sebagaimana dimaksud pada ayat (1), dan tunjangan sebagaimana dimaksud pada ayat (3) dilaksanakan oleh sekretariat DPRD provinsi sesuai dengan peraturan pemerintah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Persidangan dan Pengambilan Keputusan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 125",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "(1) Pada awal masa jabatan keanggotaan, tahun sidang DPRD provinsi dimulai pada saat pengucapan sumpah/janji anggota.\n(2) Tahun sidang dibagi dalam 3 (tiga) masa persidangan.\n(3) Masa persidangan meliputi masa sidang dan masa reses, kecuali pada persidangan terakhir dari satu periode keanggotaan DPRD provinsi, masa reses ditiadakan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 126",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Semua rapat di DPRD provinsi pada dasarnya bersifat terbuka, kecuali rapat tertentu yang dinyatakan tertutup."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 127",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Ketentuan lebih lanjut mengenai tata cara persidangan dan rapat DPRD provinsi diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 128",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "(1) Pengambilan keputusan dalam rapat DPRD provinsi pada dasarnya dilakukan dengan cara musyawarah untuk mufakat.\n(2) Dalam hal cara pengambilan keputusan sebagaimana dimaksud pada ayat (1) tidak tercapai, keputusan diambil berdasarkan suara terbanyak."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 129",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "(1) Setiap rapat DPRD provinsi dapat mengambil keputusan jika memenuhi kuorum.\n(2) Kuorum sebagaimana dimaksud pada ayat (1) terpenuhi jika:\na. rapat dihadiri oleh paling sedikit 3/4 (tiga per empat) dari jumlah anggota DPRD provinsi untuk mengambil persetujuan atas pelaksanaan hak angket dan hak menyatakan pendapat serta untuk mengambil keputusan mengenai usul pemberhentian gubernur dan/atau wakil gubernur;\nb. rapat dihadiri oleh paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD provinsi untuk memberhentikan pimpinan DPRD provinsi serta untuk menetapkan Perda dan APBD;\nc. rapat dihadiri oleh lebih dari 1/2 (satu per dua) jumlah anggota DPRD provinsi untuk rapat paripurna DPRD provinsi selain rapat sebagaimana dimaksud pada huruf a dan huruf b.\n(3) Keputusan rapat dinyatakan sah jika:\na. disetujui oleh paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD provinsi yang hadir, untuk rapat sebagaimana dimaksud pada ayat (2) huruf a;\nb. disetujui oleh lebih dari 1/2 (satu per dua) jumlah anggota DPRD provinsi yang hadir, untuk rapat sebagaimana dimaksud pada ayat (2) huruf b;\nc. disetujui dengan suara terbanyak, untuk rapat sebagaimana dimaksud pada ayat (2) huruf c.\n(4) Apabila kuorum sebagaimana dimaksud pada ayat (1) tidak terpenuhi, rapat ditunda paling banyak 2 (dua) kali dengan tenggang waktu masing-masing tidak lebih dari 1 (satu) jam.\n(5) Apabila pada akhir waktu penundaan rapat sebagaimana dimaksud pada ayat (4) kuorum belum juga terpenuhi, pimpinan dapat menunda rapat paling lama 3 (tiga) Hari atau sampai waktu yang ditetapkan oleh badan musyawarah.\n(6) Apabila setelah penundaan sebagaimana dimaksud pada ayat (5), kuorum sebagaimana dimaksud pada ayat (2) belum juga terpenuhi, terhadap ketentuan sebagaimana dimaksud pada ayat (2) huruf a dan huruf b, rapat tidak dapat mengambil keputusan.\n(7) Apabila setelah penundaan sebagaimana dimaksud pada ayat (5) kuorum sebagaimana dimaksud pada ayat (2) belum juga terpenuhi, terhadap ketentuan sebagaimana dimaksud pada ayat (2) huruf c, cara penyelesaiannya diserahkan kepada pimpinan DPRD provinsi dan pimpinan fraksi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 130",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Setiap keputusan rapat DPRD provinsi, baik berdasarkan musyawarah untuk mufakat maupun berdasarkan suara terbanyak merupakan kesepakatan untuk ditindaklanjuti oleh semua pihak yang terkait dalam pengambilan keputusan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 131",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pengambilan keputusan diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 12 Tata Tertib dan Kode Etik",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Tata Tertib dan Kode Etik"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 132",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 12 Tata Tertib dan Kode Etik",
      "teks": "(1) Tata tertib DPRD provinsi ditetapkan oleh DPRD provinsi dengan berpedoman pada ketentuan peraturan perundang-undangan.\n(2) Tata tertib sebagaimana dimaksud pada ayat (1) berlaku di lingkungan internal DPRD provinsi.\n(3) Tata tertib DPRD provinsi paling sedikit memuat ketentuan tentang:\na. pengucapan sumpah/janji;\nb. penetapan pimpinan;\nc. pemberhentian dan penggantian pimpinan;\nd. jenis dan penyelenggaraan rapat;\ne. pelaksanaan fungsi, tugas dan wewenang lembaga, serta hak dan kewajiban anggota;\nf. pembentukan, susunan, serta tugas dan wewenang alat kelengkapan;\ng. penggantian antarwaktu anggota;\nh. pembuatan pengambilan keputusan;\ni. pelaksanaan konsultasi antara DPRD provinsi dan Pemerintah Daerah provinsi;\nj. penerimaan pengaduan dan penyaluran aspirasi masyarakat;\nk. pengaturan protokoler; dan\nI. pelaksanaan tugas kelompok pakar/ahli."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 133",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 12 Tata Tertib dan Kode Etik",
      "teks": "DPRD provinsi menyusun kode etik yang berisi norma yang wajib dipatuhi oleh setiap anggota selama menjalankan tugasnya untuk menjaga martabat, kehormatan, citra, dan kredibilitas DPRD provinsi."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 13 Larangan dan Sanksi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Larangan dan Sanksi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 134",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "(1) Anggota DPRD provinsi dilarang merangkap jabatan sebagai:\na. pejabat negara atau pejabat daerah lainnya;\nb. hakim pada badan peradilan; atau\nc. pegawai negeri sipil, anggota Tentara Nasional Indonesia/Kepolisian Negara Republik Indonesia, pegawai pada badan usaha milik negara, BUMD, atau badan lain yang anggarannya bersumber dari APBN/APBD.\n(2) Anggota DPRD provinsi dilarang melakukan pekerjaan sebagai pejabat struktural pada lembaga pendidikan, akuntan publik, konsultan, advokat atau pengacara, notaris, dan pekerjaan lain yang ada hubungannya dengan tugas dan wewenang DPRD provinsi serta hak sebagai anggota DPRD provinsi.\n(3) Anggota DPRD provinsi dilarang melakukan korupsi, kolusi, dan nepotisme."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 135",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "(1) Anggota DPRD provinsi yang tidak melaksanakan kewajiban sebagaimana dimaksud dalam Pasal 108 dikenai sanksi berdasarkan keputusan badan kehormatan.\n(2) Anggota DPRD provinsi yang terbukti melanggar ketentuan sebagaimana dimaksud dalam Pasal 134 ayat (1) dan/atau ayat (2) dikenai sanksi pemberhentian sebagai anggota DPRD provinsi.\n(3) Anggota DPRD provinsi yang terbukti melanggar ketentuan sebagaimana dimaksud dalam Pasal 134 ayat (3) berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap dikenai sanksi pemberhentian sebagai anggota DPRD provinsi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 136",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "Jenis sanksi sebagaimana dimaksud dalam Pasal 135 ayat (1) berupa:\na. teguran lisan;\nb. teguran tertulis; dan/atau\nc. diberhentikan dari pimpinan pada alat kelengkapan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 137",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "Setiap orang, kelompok, atau organisasi dapat mengajukan pengaduan kepada badan kehormatan DPRD provinsi dalam hal memiliki bukti yang cukup bahwa terdapat anggota DPRD provinsi yang tidak melaksanakan salah satu kewajiban atau lebih sebagaimana dimaksud dalam Pasal 108 dan/atau melanggar ketentuan larangan sebagaimana dimaksud dalam Pasal 134."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 138",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pengaduan masyarakat dan penjatuhan sanksi diatur dengan peraturan DPRD provinsi tentang tata beracara badan kehormatan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 139",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Anggota DPRD provinsi berhenti antarwaktu karena:\na. meninggal dunia;\nb. mengundurkan diri; atau\nc. diberhentikan.\n(2) Anggota DPRD provinsi diberhentikan antarwaktu sebagaimana dimaksud pada ayat (1) huruf c jika:\na. tidak dapat melaksanakan tugas secara berkelanjutan atau berhalangan tetap sebagai anggota DPRD provinsi selama 3 (tiga) bulan berturut-turut tanpa keterangan apa pun;\nb. melanggar sumpah/janji jabatan dan kode etik DPRD provinsi;\nc. dinyatakan bersalah berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap karena melakukan tindak pidana yang diancam dengan pidana penjara 5 (lima) tahun atau lebih;\nd. tidak menghadiri rapat paripurna dan/atau rapat alat kelengkapan DPRD provinsi yang menjadi tugas dan kewajibannya sebanyak 6 (enam) kali berturut-turut tanpa alasan yang sah;\ne. diusulkan oleh partai politiknya sesuai dengan ketentuan peraturan perundang-undangan;\nf. tidak lagi memenuhi syarat sebagai calon anggota DPRD provinsi sesuai dengan ketentuan peraturan perundang-undangan mengenai pemilihan umum;\ng. melanggar ketentuan larangan sebagaimana diatur dalam Undang-Undang ini;\nh. diberhentikan sebagai anggota partai politik sesuai dengan ketentuan peraturan perundang-undangan; atau\ni. menjadi anggota partai politik lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 140",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Pemberhentian anggota DPRD provinsi sebagaimana dimaksud dalam Pasal 139 ayat (1) huruf a dan huruf b serta pada ayat (2) huruf c, huruf c, huruf h, dan huruf i diusulkan oleh pimpinan partai politik kepada pimpinan DPRD provinsi dengan tembusan kepada Menteri.\n(2) Paling lama 7 (tujuh) Hari sejak diterimanya usul pemberhentian sebagaimana dimaksud pada ayat (1), pimpinan DPRD provinsi menyampaikan usul pemberhentian anggota DPRD provinsi kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat untuk memperoleh peresmian pemberhentian.\n(3) Paling lama 7 (tujuh) Hari sejak usul pemberhentian sebagaimana dimaksud pada ayat (2) diterima, gubernur sebagai wakil Pemerintah Pusat menyampaikan usul tersebut kepada Menteri.\n(4) Menteri meresmikan pemberhentian sebagaimana dimaksud pada ayat (2) paling lama 14 (empat belas) Hari sejak usulan pemberhentian anggota DPRD provinsi dari gubernur sebagai wakil Pemerintah Pusat diterima."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 141",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Pemberhentian anggota DPRD provinsi sebagaimana dimaksud dalam Pasal 139 ayat (2) huruf a, huruf b, huruf d, huruf f, dan huruf g dilakukan setelah adanya hasil penyelidikan dan verifikasi yang dituangkan dalam keputusan badan kehormatan DPRD provinsi atas pengaduan dari pimpinan DPRD provinsi, masyarakat, dan/atau pemilih.\n(2) Keputusan badan kehormatan DPRD provinsi mengenai pemberhentian anggota DPRD provinsi sebagaimana dimaksud pada ayat (1) dilaporkan oleh badan kehormatan DPRD provinsi kepada rapat paripurna.\n(3) Paling lama 7 (tujuh) Hari sejak keputusan badan kehormatan DPRD provinsi yang telah dilaporkan dalam rapat paripurna sebagaimana dimaksud pada ayat (2), pimpinan DPRD provinsi menyampaikan keputusan badan kehormatan DPRD provinsi kepada pimpinan partai politik yang bersangkutan.\n(4) Pimpinan partai politik yang bersangkutan menyampaikan keputusan tentang pemberhentian anggotanya kepada pimpinan DPRD provinsi, paling lambat 30 (tiga puluh) Hari sejak keputusan badan kehormatan DPRD provinsi sebagaimana dimaksud pada ayat (2) diterima dari pimpinan DPRD provinsi.\n(5) Dalam hal pimpinan partai politik sebagaimana dimaksud pada ayat (3) tidak memberikan keputusan pemberhentian sebagaimana dimaksud pada ayat (4), pimpinan DPRD provinsi paling lama 7 (tujuh) Hari meneruskan keputusan badan kehormatan DPRD provinsi sebagaimana dimaksud pada ayat (2) kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat untuk memperoleh peresmian pemberhentian.\n(6) Paling lama 7 (tujuh) Hari sejak keputusan pemberhentian sebagaimana dimaksud pada ayat (5) diterima, gubernur sebagai wakil Pemerintah Pusat menyampaikan keputusan tersebut kepada Menteri.\n(7) Menteri meresmikan pemberhentian sebagaimana dimaksud pada ayat (5) paling lama 14 (empat belas) Hari sejak diterimanya keputusan badan kehormatan DPRD provinsi atau keputusan pimpinan partai politik tentang pemberhentian anggotanya dari gubernur sebagai wakil Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 142",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Dalam hal pelaksanaan penyelidikan dan verifikasi sebagaimana dimaksud dalam Pasal 141 ayat (1), badan kehormatan DPRD provinsi dapat meminta bantuan dari ahli independen.\n(2) Ketentuan lebih lanjut mengenai tata cara penyelidikan, verifikasi, dan pengambilan keputusan oleh badan kehormatan DPRD provinsi diatur dalam peraturan DPRD provinsi tentang tata beracara badan kehormatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 143",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Anggota DPRD provinsi yang berhenti antarwaktu sebagaimana dimaksud dalam Pasal 140 ayat (1) dan Pasal 141 ayat (1) digantikan oleh calon anggota DPRD provinsi yang memperoleh suara terbanyak urutan berikutnya dalam daftar peringkat perolehan suara dari partai politik yang sama pada daerah pemilihan yang sama.\n(2) Dalam hal calon anggota DPRD provinsi yang memperoleh suara terbanyak urutan berikutnya sebagaimana dimaksud pada ayat (1) mengundurkan diri, meninggal dunia, atau tidak lagi memenuhi syarat sebagai calon anggota DPRD provinsi, anggota DPRD provinsi sebagaimana dimaksud pada ayat (1) digantikan oleh calon anggota DPRD provinsi yang memperoleh suara terbanyak urutan berikutnya dari partai politik yang sama pada daerah pemilihan yang sama.\n(3) Masa jabatan anggota DPRD provinsi pengganti antarwaktu melanjutkan sisa masa jabatan anggota DPRD provinsi yang digantikan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 144",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Pimpinan DPRD provinsi menyampaikan nama anggota DPRD provinsi yang diberhentikan antarwaktu dan meminta nama calon pengganti antarwaktu kepada komisi pemilihan umum Daerah provinsi.\n(2) Komisi pemilihan umum Daerah provinsi menyampaikan nama calon pengganti antarwaktu berdasarkan ketentuan sebagaimana dimaksud dalam Pasal 143 ayat (1) dan ayat (2) kepada pimpinan DPRD provinsi paling lambat 5 (lima) Hari sejak surat pimpinan DPRD provinsi diterima.\n(3) Paling lambat 7 (tujuh) Hari sejak menerima nama calon pengganti antarwaktu dari komisi pemilihan umum Daerah provinsi sebagaimana dimaksud pada ayat (2), Pimpinan DPRD provinsi menyampaikan nama anggota DPRD provinsi yang diberhentikan dan nama calon pengganti antarwaktu kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat.\n(4) Paling lambat 7 (tujuh) Hari sejak menerima nama anggota DPRD provinsi yang diberhentikan dan nama calon pengganti antarwaktu sebagaimana dimaksud pada ayat (3), gubernur sebagai wakil Pemerintah Pusat menyampaikan nama anggota DPRD provinsi yang diberhentikan dan nama calon pengganti antarwaktu kepada Menteri.\n(5) Paling lambat 14 (empat belas) Hari sejak menerima nama anggota DPRD provinsi yang diberhentikan dan nama calon pengganti antarwaktu dari gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud pada ayat (4), Menteri meresmikan pemberhentian dan pengangkatannya dengan keputusan Menteri.\n(6) Sebelum memangku jabatannya, anggota DPRD provinsi pengganti antarwaktu sebagaimana dimaksud pada ayat (3) mengucapkan sumpah/janji yang pengucapannya dipandu oleh pimpinan DPRD provinsi, dengan tata cara dan teks sumpah/janji sebagaimana diatur dalam Pasal 103 dan Pasal 104.\n(7) Penggantian antarwaktu anggota DPRD provinsi tidak dilaksanakan apabila sisa masa jabatan anggota DPRD provinsi yang digantikan kurang dari 6 (enam) bulan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 145",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pengajuan penggantian antarwaktu, verifikasi terhadap persyaratan calon pengganti antarwaktu, dan peresmian calon pengganti antarwaktu anggota DPRD provinsi diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 146",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Anggota DPRD provinsi diberhentikan sementara karena:\na. menjadi terdakwa dalam perkara tindak pidana umum yang diancam dengan pidana penjara paling singkat 5 (lima) tahun; atau\nb. menjadi terdakwa dalam perkara tindak pidana khusus.\n(2) Dalam hal anggota DPRD provinsi dinyatakan terbukti bersalah karena melakukan tindak pidana sebagaimana dimaksud pada ayat (1) huruf a atau huruf b berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap, anggota DPRD provinsi yang bersangkutan diberhentikan sebagai anggota DPRD provinsi.\n(3) Dalam hal anggota DPRD provinsi dinyatakan tidak terbukti melakukan tindak pidana sebagaimana dimaksud pada ayat (1) huruf a atau huruf b berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap, anggota DPRD provinsi yang bersangkutan diaktifkan.\n(4) Anggota DPRD provinsi yang diberhentikan sementara tetap mendapatkan hak keuangan tertentu.\n(5) Ketentuan lebih lanjut mengenai tata cara pemberhentian sementara diatur dalam peraturan DPRD provinsi tentang tata tertib."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima DPRD Kabupaten/Kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "DPRD Kabupaten/Kota"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1 Susunan dan Kedudukan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Susunan dan Kedudukan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 147",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 1 Susunan dan Kedudukan",
      "teks": "DPRD kabupaten/kota terdiri atas anggota partai politik peserta pemilihan umum yang dipilih melalui pemilihan umum."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 148",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 1 Susunan dan Kedudukan",
      "teks": "(1) DPRD kabupaten/kota merupakan lembaga perwakilan rakyat Daerah kabupaten/kota yang berkedudukan sebagai unsur penyelenggara Pemerintahan Daerah kabupaten/kota.\n(2) Anggota DPRD kabupaten/kota adalah pejabat Daerah kabupaten/kota."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2 Fungsi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Fungsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 149",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Fungsi",
      "teks": "(1) DPRD kabupaten/kota mempunyai fungsi:\na. pembentukan Perda Kabupaten/Kota;\nb. anggaran; dan\nc. pengawasan.\n(2) Ketiga fungsi sebagaimana dimaksud pada ayat (1) dijalankan dalam kerangka representasi rakyat di Daerah kabupaten/kota.\n(3) Dalam rangka melaksanakan fungsi sebagaimana dimaksud pada ayat (1), DPRD kabupaten/kota menjaring aspirasi masyarakat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 150",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Fungsi",
      "teks": "Fungsi pembentukan Perda Kabupaten/Kota sebagaimana dimaksud dalam Pasal 149 ayat (1) huruf a dilaksanakan dengan cara:\na. membahas bersama bupati/wali kota dan menyetujui atau tidak menyetujui rancangan Perda Kabupaten/Kota;\nb. mengajukan usul rancangan Perda Kabupaten/Kota; dan\nc. menyusun program pembentukan Perda Kabupaten/Kota bersama bupati/wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 151",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Fungsi",
      "teks": "(1) Program pembentukan Perda Kabupaten/Kota sebagaimana dimaksud dalam Pasal 150 huruf c memuat daftar urutan dan prioritas rancangan Perda Kabupaten/Kota yang akan dibuat dalam 1 (satu) tahun anggaran.\n(2) Dalam menetapkan program pembentukan Perda Kabupaten/Kota sebagaimana dimaksud pada ayat (1), DPRD kabupaten/kota melakukan koordinasi dengan bupati/wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 152",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Fungsi",
      "teks": "(1) Fungsi anggaran sebagaimana dimaksud dalam Pasal 149 ayat (1) huruf b diwujudkan dalam bentuk pembahasan untuk persetujuan bersama terhadap Rancangan Perda Kabupaten/Kota tentang APBD Kabupaten/Kota yang diajukan oleh bupati/wali kota.\n(2) Fungsi anggaran sebagaimana dimaksud pada ayat (1) dilaksanakan dengan cara:\na. membahas KUA dan PPAS yang disusun oleh bupati/wali kota berdasarkan RKPD;\nb. membahas rancangan Perda Kabupaten/Kota tentang APBD kabupaten/kota;\nc. membahas rancangan Perda Kabupaten/Kota tentang perubahan APBD kabupaten/kota; dan\nd. membahas rancangan Perda Kabupaten/Kota tentang pertanggungjawaban pelaksanaan APBD kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 153",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Fungsi",
      "teks": "(1) Fungsi pengawasan sebagaimana dimaksud dalam Pasal 149 ayat (1) huruf c diwujudkan dalam bentuk pengawasan terhadap:\na. pelaksanaan Perda Kabupaten/Kota dan peraturan bupati/wali kota;\nb. pelaksanaan ketentuan peraturan perundang-undangan lain yang terkait dengan penyelenggaraan Pemerintahan Daerah kabupaten/kota; dan\nc. pelaksanaan tindak lanjut hasil pemeriksaan laporan keuangan oleh Badan Pemeriksa Keuangan.\n(2) Dalam melaksanakan pengawasan terhadap pelaksanaan tindak lanjut hasil pemeriksaan laporan keuangan oleh Badan Pemeriksa Keuangan sebagaimana dimaksud pada (1), DPRD kabupaten/kota berhak mendapatkan laporan hasil pemeriksaan keuangan yang dilakukan oleh Badan Pemeriksa Keuangan.\n(3) DPRD kabupaten/kota melakukan pembahasan terhadap laporan hasil pemeriksaan laporan keuangan sebagaimana dimaksud pada ayat (2).\n(4) DPRD kabupaten/kota dapat meminta klarifikasi atas temuan laporan hasil pemeriksaan laporan keuangan kepada Badan Pemeriksa Keuangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3 Tugas dan Wewenang",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Tugas dan Wewenang"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 154",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 3 Tugas dan Wewenang",
      "teks": "(1) DPRD kabupaten/kota mempunyai tugas dan wewenang:\na. membentuk Perda Kabupaten/Kota bersama bupati/wali kota;\nb. membahas dan memberikan persetujuan rancangan Perda mengenai APBD kabupaten/kota yang diajukan oleh bupati/wali kota;\nc. melaksanakan pengawasan terhadap pelaksanaan Perda dan APBD kabupaten/kota;\nd. memilih bupati/wali kota;\ne. mengusulkan pengangkatan dan pemberhentian bupati/wali kota kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat untuk mendapatkan pengesahan pengangkatan dan pemberhentian.\nf. memberikan pendapat dan pertimbangan kepada Pemerintah Daerah kabupaten/kota terhadap rencana perjanjian internasional di Daerah;\ng. memberikan persetujuan terhadap rencana kerja sama internasional yang dilakukan oleh Pemerintah Daerah kabupaten/kota;\nh. meminta laporan keterangan pertanggungjawaban bupati/wali kota dalam penyelenggaraan Pemerintahan Daerah kabupaten/kota;\ni. memberikan persetujuan terhadap rencana kerja sama dengan Daerah lain atau dengan pihak ketiga yang membebani masyarakat dan Daerah;\nj. melaksanakan tugas dan wewenang lain yang diatur dalam ketentuan peraturan perundang-undangan.\n(2) Ketentuan mengenai tata cara pelaksanaan tugas dan wewenang sebagaimana dimaksud pada ayat (1) diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4 Keanggotaan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Keanggotaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 155",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "(1) Anggota DPRD kabupaten/kota berjumlah paling sedikit 20 (dua puluh) orang dan paling banyak 50 (lima puluh) orang.\n(2) Keanggotaan DPRD kabupaten/kota diresmikan dengan keputusan gubernur sebagai wakil Pemerintah Pusat.\n(3) Anggota DPRD kabupaten/kota berdomisili di ibu kota kabupaten/kota yang bersangkutan.\n(4) Masa jabatan anggota DPRD kabupaten/kota adalah 5 (lima) tahun dan berakhir pada saat anggota DPRD kabupaten/kota yang baru mengucapkan sumpah/janji."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 156",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "(1) Anggota DPRD kabupaten/kota sebelum memangku jabatannya mengucapkan sumpah/janji secara bersama-sama yang dipandu oleh ketua pengadilan negeri dalam rapat paripurna DPRD kabupaten/kota.\n(2) Anggota DPRD kabupaten/kota yang berhalangan mengucapkan sumpah/janji bersama-sama sebagaimana dimaksud pada ayat (1) mengucapkan sumpah/janji yang dipandu oleh pimpinan DPRD kabupaten/kota.\n(3) Ketentuan lebih lanjut mengenai tata cara pengucapan sumpah/janji sebagaimana dimaksud pada ayat (1) dan ayat (2) diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 157",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "Sumpah/janji sebagaimana dimaksud dalam Pasal 156 sebagai berikut:\n“Demi Allah (Tuhan) saya bersumpah/berjanji:\nbahwa saya akan memenuhi kewajiban saya sebagai anggota/ketua/wakil ketua Dewan Perwakilan Rakyat Daerah kabupaten/kota dengan sebaik-baiknya dan seadil-adilnya sesuai dengan ketentuan peraturan perundang-undangan dengan berpedoman pada Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;\nbahwa saya dalam menjalankan kewajiban akan bekerja dengan sungguh-sungguh demi tegaknya kehidupan demokrasi serta mengutamakan kepentingan bangsa dan negara daripada kepentingan pribadi, seseorang, dan golongan;\nbahwa saya akan memperjuangkan aspirasi rakyat yang saya wakili untuk mewujudkan tujuan nasional demi kepentingan bangsa dan Negara Kesatuan Republik Indonesia.\""
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 158",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 4 Keanggotaan",
      "teks": "(1) Dalam hal dilakukan pembentukan Daerah kabupaten/kota setelah pemilihan umum, pengisian anggota DPRD kabupaten/kota di Daerah kabupaten/kota induk dan Daerah kabupaten/kota yang dibentuk setelah pemilihan umum dilakukan dengan cara:\na. menetapkan jumlah kursi DPRD kabupaten/kota induk dan Daerah kabupaten/kota yang dibentuk setelah pemilihan umum berdasarkan jumlah penduduk sesuai dengan ketentuan dalam undang-undang mengenai pemilihan umum anggota DPR, DPD, dan DPRD;\nb. menetapkan perolehan suara partai politik dan calon anggota DPRD kabupaten/kota berdasarkan hasil pemilihan umum di daerah pemilihan Daerah kabupaten/kota induk dan Daerah kabupaten/kota yang dibentuk setelah pemilihan umum;\nc. menentukan bilangan pembagi pemilih berdasarkan hasil pemilihan umum di daerah pemilihan Daerah kabupaten/kota induk dan Daerah kabupaten/kota yang dibentuk setelah pemilihan umum;\nd. menentukan perolehan kursi partai politik peserta pemilihan umum berdasarkan hasil pemilihan umum di daerah pemilihan Daerah kabupaten/kota induk dan Daerah kabupaten/kota yang dibentuk setelah pemilihan umum;\ne. menetapkan calon terpilih dari daftar calon tetap untuk mengisi kursi sebagaimana dimaksud pada huruf d berdasarkan suara terbanyak.\n(2) Pengisian anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (1) dilaksanakan oleh komisi pemilihan umum Daerah kabupaten/kota induk.\n(3) Pengisian anggota DPRD provinsi tidak dilakukan bagi Daerah kabupaten/kota yang dibentuk 12 (dua belas) bulan sebelum pelaksanaan pemilihan umum.\n(4) Masa jabatan anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (1) berakhir pada saat anggota DPRD kabupaten/kota hasil pemilihan umum berikutnya mengucapkan sumpah/janji.\n(5) Ketentuan lebih lanjut mengenai penetapan jumlah dan tata cara pengisian keanggotaan DPRD kabupaten/kota induk dan Daerah kabupaten/kota yang dibentuk setelah pemilihan umum sebagaimana dimaksud pada ayat (1) diatur dengan peraturan Komisi Pemilihan Umum sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 5 Hak DPRD Kabupaten/Kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Hak DPRD Kabupaten/Kota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 159",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 5 Hak DPRD Kabupaten/Kota",
      "teks": "(1) DPRD kabupaten/kota mempunyai hak:\na. interpelasi;\nb. angket; dan\nc. menyatakan pendapat.\n(2) Hak interpelasi sebagaimana dimaksud pada ayat (1) huruf a adalah hak DPRD kabupaten/kota untuk meminta keterangan kepada bupati/wali kota mengenai kebijakan Pemerintah Daerah kabupaten/kota yang penting dan strategis serta berdampak luas pada kehidupan bermasyarakat dan bernegara.\n(3) Hak angket sebagaimana dimaksud pada ayat (1) huruf b adalah hak DPRD kabupaten/kota untuk melakukan penyelidikan terhadap kebijakan Pemerintah Daerah kabupaten/kota yang penting dan strategis serta berdampak luas pada kehidupan masyarakat, Daerah, dan negara yang diduga bertentangan dengan ketentuan peraturan perundang-undangan.\n(4) Hak menyatakan pendapat sebagaimana dimaksud pada ayat (1) huruf c adalah hak DPRD kabupaten/kota untuk menyatakan pendapat terhadap kebijakan bupati/wali kota atau mengenai kejadian luar biasa yang terjadi di Daerah kabupaten/kota disertai dengan rekomendasi penyelesaiannya atau sebagai tindak lanjut pelaksanaan hak interpelasi dan hak angket."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 6 Hak dan Kewajiban Anggota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Hak dan Kewajiban Anggota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 160",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 6 Hak dan Kewajiban Anggota",
      "teks": "Anggota DPRD kabupaten/kota mempunyai hak:\na. mengajukan rancangan Perda Kabupaten/Kota;\nb. mengajukan pertanyaan;\nc. menyampaikan usul dan pendapat;\nd. memilih dan dipilih;\ne. membela diri;\nf. imunitas;\ng. mengikuti orientasi dan pendalaman tugas;\nh. protokoler; dan\ni. keuangan dan administratif."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 161",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 6 Hak dan Kewajiban Anggota",
      "teks": "Anggota DPRD kabupaten/kota berkewajiban:\na. memegang teguh dan mengamalkan Pancasila;\nb. melaksanakan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 dan menaati ketentuan peraturan perundang-undangan;\nc. mempertahankan dan memelihara kerukunan nasional dan keutuhan Negara Kesatuan Republik Indonesia;\nd. mendahulukan kepentingan negara di atas kepentingan pribadi, kelompok, atau golongan;\ne. memperjuangkan peningkatan kesejahteraan rakyat;\nf. menaati prinsip demokrasi dalam penyelenggaraan Pemerintahan Daerah kabupaten/kota;\ng. menaati tata tertib dan kode etik;\nh. menjaga etika dan norma dalam hubungan kerja dengan lembaga lain dalam penyelenggaraan Pemerintahan Daerah kabupaten/kota;\ni. menyerap dan menghimpun aspirasi konstituen melalui kunjungan kerja secara berkala;\nj. menampung dan menindaklanjuti aspirasi dan pengaduan masyarakat; dan\nk. memberikan pertanggungjawaban secara moral dan politis kepada konstituen di daerah pemilihannya."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 7 Fraksi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Fraksi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 162",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 7 Fraksi",
      "teks": "(1) Untuk mengoptimalkan pelaksanaan fungsi, tugas dan wewenang DPRD kabupaten/kota serta hak dan kewajiban anggota DPRD kabupaten/kota, dibentuk fraksi sebagai wadah berhimpun anggota DPRD kabupaten/kota.\n(2) Setiap anggota DPRD kabupaten/kota harus menjadi anggota salah satu fraksi.\n(3) Setiap fraksi di DPRD kabupaten/kota beranggotakan paling sedikit sama dengan jumlah komisi di DPRD kabupaten/kota.\n(4) Partai politik yang jumlah anggotanya di DPRD kabupaten/kota mencapai ketentuan sebagaimana dimaksud pada ayat (3) atau lebih dapat membentuk 1 (satu) fraksi.\n(5) Dalam hal partai politik yang jumlah anggotanya di DPRD kabupaten/kota tidak memenuhi ketentuan sebagaimana dimaksud pada ayat (3), anggotanya dapat bergabung dengan fraksi yang ada atau membentuk fraksi gabungan.\n(6) Dalam hal tidak ada satu partai politik yang memenuhi persyaratan untuk membentuk fraksi sebagaimana dimaksud pada ayat (3), dibentuk fraksi gabungan.\n(7) Jumlah fraksi gabungan sebagaimana dimaksud pada ayat (5) dan ayat (6) paling banyak 2 (dua) fraksi.\n(8) Partai politik sebagaimana dimaksud pada ayat (4) dan ayat (5) harus mendudukkan anggotanya dalam 1 (satu) fraksi.\n(9) Fraksi mempunyai sekretariat.\n(10) Sekretariat DPRD kabupaten/kota menyediakan sarana, anggaran, dan tenaga ahli guna kelancaran pelaksanaan tugas fraksi sesuai dengan kebutuhan dan dengan memperhatikan kemampuan APBD."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 8 Alat Kelengkapan DPRD Kabupaten/Kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Alat Kelengkapan DPRD Kabupaten/Kota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 163",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Kabupaten/Kota",
      "teks": "(1) Alat kelengkapan DPRD kabupaten/kota terdiri atas:\na. pimpinan;\nb. badan musyawarah;\nc. komisi;\nd. badan pembentukan Perda Kabupaten/Kota;\ne. badan anggaran;\nf. badan kehormatan; dan\ng. alat kelengkapan lain yang diperlukan dan dibentuk oleh rapat paripurna.\n(2) Dalam menjalankan tugasnya, alat kelengkapan dibantu oleh sekretariat dan dapat dibantu oleh tim pakar atau tim ahli.\n(3) Ketentuan mengenai tata cara pembentukan, susunan, serta tugas dan wewenang alat kelengkapan DPRD kabupaten/kota diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 164",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Kabupaten/Kota",
      "teks": "(1) Pimpinan DPRD kabupaten/kota terdiri atas:\na. 1 (satu) orang ketua dan 3 (tiga) orang wakil ketua untuk DPRD kabupaten/kota yang beranggotakan 45 (empat puluh lima) sampai dengan 50 (lima puluh) orang; dan\nb. 1 (satu) orang ketua dan 2 (dua) orang wakil ketua untuk DPRD kabupaten/kota yang beranggotakan 20 (dua puluh) sampai dengan 44 (empat puluh empat) orang.\n(2) Pimpinan sebagaimana dimaksud pada ayat (1) berasal dari partai politik berdasarkan urutan perolehan kursi terbanyak di DPRD kabupaten/kota.\n(3) Ketua DPRD kabupaten/kota ialah anggota DPRD kabupaten/kota yang berasal dari partai politik yang memperoleh kursi terbanyak pertama di DPRD kabupaten/kota.\n(4) Dalam hal terdapat lebih dari 1 (satu) partai politik yang memperoleh kursi terbanyak pertama sebagaimana dimaksud pada ayat (3), ketua DPRD kabupaten/kota ialah anggota DPRD kabupaten/kota yang berasal dari partai politik yang memperoleh suara terbanyak.\n(5) Dalam hal terdapat lebih dari 1 (satu) partai politik yang memperoleh suara terbanyak sama sebagaimana dimaksud pada ayat (4), penentuan ketua DPRD kabupaten/kota dilakukan berdasarkan persebaran perolehan suara partai politik yang paling merata urutan pertama.\n(6) Dalam hal ketua DPRD kabupaten/kota ditetapkan dari anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (3), wakil ketua DPRD kabupaten/kota ditetapkan dari anggota DPRD kabupaten/kota yang berasal dari partai politik yang memperoleh kursi terbanyak kedua, ketiga, dan/atau keempat sesuai dengan jumlah wakil ketua DPRD kabupaten/kota.\n(7) Dalam hal ketua DPRD kabupaten/kota ditetapkan dari anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (4), wakil ketua DPRD kabupaten/kota ditetapkan dari anggota DPRD kabupaten/kota yang berasal dari partai politik yang memperoleh urutan suara terbanyak kedua, ketiga, dan/atau keempat sesuai dengan jumlah wakil ketua DPRD kabupaten/kota.\n(8) Dalam hal ketua DPRD kabupaten/kota ditetapkan dari anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (5), wakil ketua DPRD kabupaten/kota ditetapkan dari anggota DPRD kabupaten/kota yang berasal dari partai politik yang memperoleh persebaran suara paling merata urutan kedua, ketiga, dan/atau keempat sesuai dengan jumlah wakil ketua DPRD kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 165",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Kabupaten/Kota",
      "teks": "(1) Dalam hal pimpinan DPRD kabupaten/kota sebagaimana dimaksud dalam Pasal 164 ayat (1) belum terbentuk, DPRD kabupaten/kota dipimpin oleh pimpinan sementara DPRD kabupaten/kota.\n(2) Pimpinan sementara DPRD kabupaten/kota sebagaimana dimaksud pada ayat (1) terdiri atas 1 (satu) orang ketua dan 1 (satu) orang wakil ketua yang berasal dari 2 (dua) partai politik yang memperoleh kursi terbanyak pertama dan kedua di DPRD kabupaten/kota.\n(3) Dalam hal terdapat lebih dari 1 (satu) partai politik yang memperoleh kursi terbanyak sama, ketua dan wakil ketua sementara DPRD kabupaten/kota ditentukan secara musyawarah oleh wakil partai politik bersangkutan yang ada di DPRD kabupaten/kota.\n(4) Ketua dan wakil ketua DPRD kabupaten/kota diresmikan dengan keputusan gubernur sebagai wakil Pemerintah Pusat.\n(5) Pimpinan DPRD kabupaten/kota sebelum memangku jabatannya mengucapkan sumpah/janji yang teksnya sebagaimana dimaksud dalam Pasal 157 dipandu oleh ketua pengadilan negeri.\n(6) Ketentuan lebih lanjut mengenai tata cara penetapan pimpinan DPRD kabupaten/kota diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 166",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 8 Alat Kelengkapan DPRD Kabupaten/Kota",
      "teks": "Komisi sebagaimana dimaksud dalam Pasal 163 ayat (1) huruf c dibentuk dengan ketentuan:\na. DPRD kabupaten/kota yang beranggotakan 20 (dua puluh) sampai dengan 35 (tiga puluh lima) orang membentuk 3 (tiga) komisi;\nb. DPRD kabupaten/kota yang beranggotakan lebih dari 35 (tiga puluh lima) orang membentuk 4 (empat) komisi."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Pelaksanaan Hak DPRD kabupaten/kota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 167",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "(1) Hak interpelasi sebagaimana dimaksud dalam Pasal 159 ayat (1) huruf a diusulkan oleh:\na. paling sedikit 5 (lima) orang anggota DPRD kabupaten/kota dan lebih dari 1 (satu) fraksi untuk DPRD kabupaten/kota yang beranggotakan 20 (dua puluh) sampai dengan 35 (tiga puluh lima); atau\nb. paling sedikit 7 (tujuh) orang anggota DPRD kabupaten/kota dan lebih dari 1 (satu) fraksi untuk DPRD kabupaten/kota yang beranggotakan di atas 35 (tiga puluh lima) orang.\n(2) Usul sebagaimana dimaksud pada ayat (1) diajukan kepada pimpinan DPRD kabupaten/kota.\n(3) Usul sebagaimana dimaksud pada ayat (1) menjadi hak interpelasi DPRD kabupaten/kota apabila mendapat persetujuan dari rapat paripurna DPRD kabupaten/kota yang dihadiri lebih dari 1/2 (satu per dua) dari jumlah anggota DPRD kabupaten/kota dan putusan diambil dengan persetujuan lebih dari 1/2 (satu per dua) dari jumlah anggota DPRD kabupaten/kota yang hadir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 168",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pelaksanaan hak interpelasi diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 169",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "(1) Hak angket sebagaimana dimaksud dalam Pasal 159 ayat (1) huruf b diusulkan oleh:\na. paling sedikit 5 (lima) orang anggota DPRD kabupaten/kota dan lebih dari 1 (satu) fraksi untuk DPRD kabupaten/kota yang beranggotakan 20 (dua puluh) sampai dengan 35 (tiga puluh lima) orang; atau\nb. paling sedikit 7 (tujuh) orang anggota DPRD kabupaten/kota dan lebih dari 1 (satu) fraksi untuk DPRD kabupaten/kota yang beranggotakan di atas 35 (tiga puluh lima) orang.\n(2) Usul sebagaimana dimaksud pada ayat (1) diajukan kepada pimpinan DPRD kabupaten/kota.\n(3) Usul sebagaimana dimaksud pada ayat (1) menjadi hak angket DPRD kabupaten/kota apabila mendapat persetujuan dari rapat paripurna DPRD kabupaten/kota yang dihadiri paling sedikit 3/4 (tiga per empat) dari jumlah anggota DPRD kabupaten/kota dan putusan diambil dengan persetujuan paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD kabupaten/kota yang hadir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 170",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "(1) DPRD kabupaten/kota memutuskan menerima atau menolak usul hak angket sebagaimana dimaksud dalam Pasal 169 ayat (1).\n(2) Dalam hal DPRD kabupaten/kota menerima usul hak angket sebagaimana dimaksud pada ayat (1), DPRD kabupaten/kota membentuk panitia angket yang terdiri atas semua unsur fraksi DPRD kabupaten/kota dengan keputusan DPRD kabupaten/kota.\n(3) Dalam hal DPRD kabupaten/kota menolak usul hak angket sebagaimana dimaksud pada ayat (1), usul tersebut tidak dapat diajukan kembali."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 171",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "(1) Panitia angket sebagaimana dimaksud dalam Pasal 170 ayat (2), dalam melakukan penyelidikan sebagaimana dimaksud dalam Pasal 159 ayat (3), dapat memanggil pejabat Pemerintah Daerah kabupaten/kota, badan hukum, atau warga masyarakat di Daerah kabupaten/kota yang dianggap mengetahui atau patut mengetahui masalah yang diselidiki untuk memberikan keterangan dan untuk meminta menunjukkan surat atau dokumen yang berkaitan dengan hal yang sedang diselidiki.\n(2) Pejabat Pemerintah Daerah kabupaten/kota, badan hukum, atau warga masyarakat di Daerah kabupaten/kota yang dipanggil sebagaimana dimaksud pada ayat (1) wajib memenuhi panggilan DPRD kabupaten/kota, kecuali ada alasan yang sah menurut ketentuan peraturan perundang-undangan.\n(3) Dalam hal pejabat Pemerintah Daerah kabupaten/kota, badan hukum, atau warga masyarakat di Daerah kabupaten/kota telah dipanggil dengan patut secara berturut-turut tidak memenuhi panggilan sebagaimana dimaksud pada ayat (2), DPRD kabupaten/kota dapat memanggil secara paksa dengan bantuan Kepolisian Negara Republik Indonesia sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 172",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "Panitia angket melaporkan pelaksanaan tugasnya kepada rapat paripurna DPRD kabupaten/kota paling lama 60 (enam puluh) Hari sejak dibentuknya panitia angket."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 173",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pelaksanaan hak angket diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 174",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "(1) Hak menyatakan pendapat sebagaimana dimaksud dalam Pasal 159 ayat (1) huruf c diusulkan oleh:\na. paling sedikit 8 (delapan) orang anggota DPRD kabupaten/kota dan lebih dari 1 (satu) fraksi untuk DPRD kabupaten/kota yang beranggotakan 20 (dua puluh) sampai dengan 35 (tiga puluh lima) orang; atau\nb. paling sedikit 10 (sepuluh) orang anggota DPRD kabupaten/kota dan lebih dari 1 (satu) fraksi untuk DPRD kabupaten/kota yang beranggotakan di atas 35 (tiga puluh lima) orang.\n(2) Usul sebagaimana dimaksud pada ayat (1) diajukan kepada pimpinan DPRD kabupaten/kota.\n(3) Usul sebagaimana dimaksud pada ayat (1) menjadi hak menyatakan pendapat DPRD kabupaten/kota apabila mendapat persetujuan dari rapat paripurna DPRD kabupaten/kota yang dihadiri paling sedikit 3/4 (tiga per empat) dari jumlah anggota DPRD kabupaten/kota dan putusan diambil dengan persetujuan paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD kabupaten/kota yang hadir."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 175",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 9 Pelaksanaan Hak DPRD kabupaten/kota",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pelaksanaan hak menyatakan pendapat diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 10 Pelaksanaan Hak Anggota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Pelaksanaan Hak Anggota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 176",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 10 Pelaksanaan Hak Anggota",
      "teks": "(1) Anggota DPRD kabupaten/kota mempunyai hak imunitas.\n(2) Anggota DPRD kabupaten/kota tidak dapat dituntut di depan pengadilan karena pernyataan, pertanyaan, dan/atau pendapat yang dikemukakan, baik secara lisan maupun tertulis di dalam rapat DPRD kabupaten/kota ataupun di luar rapat DPRD kabupaten/kota yang berkaitan dengan fungsi serta tugas dan wewenang DPRD kabupaten/kota.\n(3) Anggota DPRD kabupaten/kota tidak dapat diganti antarwaktu karena pernyataan, pertanyaan, dan/atau pendapat yang dikemukakan, baik di dalam rapat DPRD kabupaten/kota maupun di luar rapat DPRD kabupaten/kota yang berkaitan dengan fungsi serta tugas dan wewenang DPRD kabupaten/kota.\n(4) Ketentuan sebagaimana dimaksud pada ayat (1) tidak berlaku dalam hal anggota yang bersangkutan mengumumkan materi yang telah disepakati dalam rapat tertutup untuk dirahasiakan atau hal lain yang dimaksud dalam ketentuan mengenai rahasia negara sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 177",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 10 Pelaksanaan Hak Anggota",
      "teks": "(1) Pimpinan dan anggota DPRD kabupaten/kota mempunyai hak protokoler.\n(2) Hak protokoler sebagaimana dimaksud pada ayat (1) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 178",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 10 Pelaksanaan Hak Anggota",
      "teks": "(1) Pimpinan dan anggota DPRD kabupaten/kota mempunyai hak keuangan dan administratif.\n(2) Hak keuangan dan administratif pimpinan dan anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (1) diatur dengan peraturan pemerintah.\n(3) Dalam menjalankan tugas dan wewenangnya, pimpinan dan anggota DPRD kabupaten/kota berhak memperoleh tunjangan yang besarannya disesuaikan dengan kemampuan Daerah.\n(4) Pengelolaan hak keuangan dan administratif sebagaimana dimaksud pada ayat (1) dan tunjangan sebagaimana dimaksud pada ayat (3) dilaksanakan oleh sekretariat DPRD kabupaten/kota sesuai dengan peraturan pemerintah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Persidangan dan Pengambilan Keputusan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 179",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "(1) Pada awal masa jabatan keanggotaan, tahun sidang DPRD kabupaten/kota dimulai pada saat pengucapan sumpah/janji anggota.\n(2) Tahun sidang dibagi dalam 3 (tiga) masa persidangan.\n(3) Masa persidangan meliputi masa sidang dan masa reses, kecuali pada persidangan terakhir dari satu periode keanggotaan DPRD kabupaten/kota, masa reses ditiadakan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 180",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Semua rapat di DPRD kabupaten/kota pada dasarnya bersifat terbuka, kecuali rapat tertentu yang dinyatakan tertutup."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 181",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Ketentuan lebih lanjut mengenai tata cara persidangan dan rapat diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 182",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "(1) Pengambilan keputusan dalam rapat DPRD kabupaten/kota pada dasarnya dilakukan dengan cara musyawarah untuk mufakat.\n(2) Apabila cara pengambilan keputusan sebagaimana dimaksud pada ayat (1) tidak tercapai, keputusan diambil berdasarkan suara terbanyak."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 183",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "(1) Setiap rapat DPRD kabupaten/kota dapat mengambil keputusan apabila memenuhi kuorum.\n(2) Kuorum sebagaimana dimaksud pada ayat (1) terpenuhi jika:\na. rapat dihadiri oleh paling sedikit 3/4 (tiga per empat) dari jumlah anggota DPRD kabupaten/kota untuk mengambil persetujuan atas pelaksanaan hak angket dan hak menyatakan pendapat serta untuk mengambil keputusan mengenai usul pemberhentian bupati/wali kota dan/atau wakil bupati/wakil wali kota;\nb. rapat dihadiri oleh paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD kabupaten/kota untuk memberhentikan pimpinan DPRD kabupaten/kota serta untuk menetapkan Perda Kabupaten/Kota dan APBD kabupaten/kota; dan\nc. rapat dihadiri oleh lebih dari 1/2 (satu per dua) jumlah anggota DPRD kabupaten/kota untuk rapat paripurna DPRD kabupaten/kota selain rapat sebagaimana dimaksud pada huruf a dan huruf b.\n(3) Keputusan rapat dinyatakan sah apabila:\na. disetujui oleh paling sedikit 2/3 (dua per tiga) dari jumlah anggota DPRD kabupaten/kota yang hadir, untuk rapat sebagaimana dimaksud pada ayat (2) huruf a;\nb. disetujui oleh lebih dari 1/2 (satu per dua) jumlah anggota DPRD kabupaten/kota yang hadir, untuk rapat sebagaimana dimaksud pada ayat (2) huruf b; dan\nc. disetujui dengan suara terbanyak, untuk rapat sebagaimana dimaksud pada ayat (2) huruf c.\n(4) Apabila kuorum sebagaimana dimaksud pada ayat (1) tidak terpenuhi, rapat ditunda paling banyak 2 (dua) kali dengan tenggang waktu masing-masing tidak lebih dari 1 (satu) jam.\n(5) Apabila pada akhir waktu penundaan rapat sebagaimana dimaksud pada ayat (4) kuorum belum juga terpenuhi, pimpinan dapat menunda rapat paling lama 3 (tiga) Hari atau sampai waktu yang ditetapkan oleh badan musyawarah.\n(6) Apabila setelah penundaan sebagaimana dimaksud pada ayat (5), kuorum sebagaimana dimaksud pada ayat (2) belum juga terpenuhi, terhadap ketentuan sebagaimana dimaksud pada ayat (2) huruf a dan huruf b, rapat tidak dapat mengambil keputusan.\n(7) Apabila setelah penundaan sebagaimana dimaksud pada ayat (5), kuorum sebagaimana dimaksud pada ayat (2) belum juga terpenuhi, terhadap ketentuan sebagaimana dimaksud pada ayat (2) huruf c, cara penyelesaiannya diserahkan kepada pimpinan DPRD kabupaten/kota dan pimpinan fraksi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 184",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Setiap keputusan rapat DPRD kabupaten/kota, baik berdasarkan musyawarah untuk mufakat maupun berdasarkan suara terbanyak, merupakan kesepakatan untuk ditindaklanjuti oleh semua pihak yang terkait dalam pengambilan keputusan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 185",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 11 Persidangan dan Pengambilan Keputusan",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pengambilan keputusan diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 12 Tata Tertib dan Kode Etik",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Tata Tertib dan Kode Etik"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 186",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 12 Tata Tertib dan Kode Etik",
      "teks": "(1) Tata tertib DPRD kabupaten/kota ditetapkan oleh DPRD kabupaten/kota dengan berpedoman pada ketentuan peraturan perundang-undangan.\n(2) Tata tertib sebagaimana dimaksud pada ayat (1) berlaku di lingkungan internal DPRD kabupaten/kota.\n(3) Tata tertib DPRD kabupaten/kota paling sedikit memuat ketentuan tentang:\na. pengucapan sumpah/janji;\nb. penetapan pimpinan;\nc. pemberhentian dan penggantian pimpinan;\nd. jenis dan penyelenggaraan rapat;\ne. pelaksanaan fungsi, tugas dan wewenang lembaga, serta hak dan kewajiban anggota;\nf. pembentukan, susunan, serta tugas dan wewenang alat kelengkapan;\ng. penggantian antarwaktu anggota;\nh. pembuatan pengambilan keputusan;\ni. pelaksanaan konsultasi antara DPRD kabupaten/kota dan Pemerintah Daerah kabupaten/kota;\nj. penerimaan pengaduan dan penyaluran aspirasi masyarakat;\nk. pengaturan protokoler; dan\nI. pelaksanaan tugas kelompok pakar/ahli."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 187",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 12 Tata Tertib dan Kode Etik",
      "teks": "DPRD kabupaten/kota menyusun kode etik yang berisi norma yang wajib dipatuhi oleh setiap anggota selama menjalankan tugas untuk menjaga martabat, kehormatan, citra, dan kredibilitas DPRD kabupaten/kota."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 13 Larangan dan Sanksi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Larangan dan Sanksi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 188",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "(1) Anggota DPRD kabupaten/kota dilarang merangkap jabatan sebagai:\na. pejabat negara atau pejabat daerah lainnya;\nb. hakim pada badan peradilan; atau\nc. pegawai negeri sipil, anggota Tentara Nasional Indonesia/Kepolisian Negara Republik Indonesia, pegawai pada badan usaha milik negara, BUMD, atau badan lain yang anggarannya bersumber dari APBN/APBD.\n(2) Anggota DPRD kabupaten/kota dilarang melakukan pekerjaan sebagai pejabat struktural pada lembaga pendidikan, akuntan publik, konsultan, advokat atau pengacara, notaris, dan pekerjaan lain yang ada hubungannya dengan tugas dan wewenang DPRD kabupaten/kota serta hak sebagai anggota DPRD kabupaten/kota.\n(3) Anggota DPRD kabupaten/kota dilarang melakukan korupsi, kolusi, dan nepotisme."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 189",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "(1) Anggota DPRD kabupaten/kota yang tidak melaksanakan kewajiban sebagaimana dimaksud dalam Pasal 161 dikenai sanksi berdasarkan keputusan badan kehormatan.\n(2) Anggota DPRD kabupaten/kota yang dinyatakan terbukti melanggar ketentuan sebagaimana dimaksud dalam Pasal 188 ayat (1) dan/atau ayat (2) dikenai sanksi pemberhentian sebagai anggota DPRD kabupaten/kota.\n(3) Anggota DPRD kabupaten/kota yang dinyatakan terbukti melanggar ketentuan sebagaimana dimaksud dalam Pasal 188 ayat (3) berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap dikenai sanksi pemberhentian sebagai anggota DPRD kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 190",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "Jenis sanksi sebagaimana dimaksud dalam Pasal 189 ayat (1) berupa:\na. teguran lisan;\nb. teguran tertulis; dan/atau\nc. diberhentikan dari pimpinan pada alat kelengkapan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 191",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "Setiap orang, kelompok, atau organisasi dapat mengajukan pengaduan kepada badan kehormatan DPRD kabupaten/kota dalam hal memiliki bukti yang cukup bahwa terdapat anggota DPRD kabupaten/kota yang tidak melaksanakan salah satu kewajiban atau lebih sebagaimana dimaksud dalam Pasal 161 dan/atau melanggar ketentuan larangan sebagaimana dimaksud dalam Pasal 188."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 192",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 13 Larangan dan Sanksi",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pengaduan masyarakat dan penjatuhan sanksi diatur dengan peraturan DPRD kabupaten/kota tentang tata beracara badan kehormatan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "teks": "Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 193",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Anggota DPRD kabupaten/kota berhenti antarwaktu karena:\na. meninggal dunia;\nb. mengundurkan diri; atau\nc. diberhentikan.\n(2) Anggota DPRD kabupaten/kota diberhentikan antarwaktu sebagaimana dimaksud pada ayat (1) huruf c, apabila:\na. tidak dapat melaksanakan tugas secara berkelanjutan atau berhalangan tetap sebagai anggota DPRD kabupaten/kota selama 3 (tiga) bulan berturut-turut tanpa keterangan apa pun;\nb. melanggar sumpah/janji jabatan dan kode etik DPRD kabupaten/kota;\nc. dinyatakan bersalah berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap karena melakukan tindak pidana dengan ancaman pidana penjara paling singkat 5 (lima) tahun;\nd. tidak menghadiri rapat paripurna dan/atau rapat alat kelengkapan DPRD kabupaten/kota yang menjadi tugas dan kewajibannya sebanyak 6 (enam) kali berturut-turut tanpa alasan yang sah;\ne. diusulkan oleh partai politiknya sesuai dengan ketentuan peraturan perundang-undangan;\nf. tidak lagi memenuhi syarat sebagai calon anggota DPRD kabupaten/kota sesuai dengan ketentuan peraturan perundang-undangan mengenai pemilihan umum;\ng. melanggar ketentuan larangan sebagaimana diatur dalam Undang-Undang ini;\nh. diberhentikan sebagai anggota partai politik sesuai dengan ketentuan peraturan perundang-undangan; atau\ni. menjadi anggota partai politik lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 194",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Pemberhentian anggota DPRD kabupaten/kota sebagaimana dimaksud dalam Pasal 193 ayat (1) huruf a dan huruf b serta pada ayat (2) huruf c, huruf c, huruf h, dan huruf i diusulkan oleh pimpinan partai politik kepada pimpinan DPRD kabupaten/kota dengan tembusan kepada gubernur sebagai wakil Pemerintah Pusat.\n(2) Paling lama 7 (tujuh) Hari sejak usul pemberhentian sebagaimana dimaksud pada ayat (1) diterima, pimpinan DPRD kabupaten/kota menyampaikan usul pemberhentian anggota DPRD kabupaten/kota kepada gubernur sebagai wakil Pemerintah Pusat melalui bupati/wali kota untuk memperoleh peresmian pemberhentian.\n(3) Paling lama 7 (tujuh) Hari sejak usul pemberhentian sebagaimana dimaksud pada ayat (2) diterima, bupati/wali kota menyampaikan usul tersebut kepada gubernur sebagai wakil Pemerintah Pusat.\n(4) Gubernur sebagai wakil Pemerintah Pusat meresmikan pemberhentian sebagaimana dimaksud pada ayat (2) paling lama 14 (empat belas) Hari sejak usul pemberhentian anggota DPRD kabupaten/kota dari bupati/wali kota diterima."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 195",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Pemberhentian anggota DPRD kabupaten/kota sebagaimana dimaksud dalam Pasal 193 ayat (2) huruf a, huruf b, huruf d, huruf f, dan huruf g dilakukan setelah adanya hasil penyelidikan dan verifikasi yang dituangkan dalam keputusan badan kehormatan DPRD kabupaten/kota atas pengaduan dari pimpinan DPRD kabupaten/kota, masyarakat dan/atau pemilih.\n(2) Keputusan badan kehormatan DPRD kabupaten/kota mengenai pemberhentian anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (1) dilaporkan oleh badan kehormatan DPRD kabupaten/kota kepada rapat paripurna.\n(3) Paling lama 7 (tujuh) Hari sejak keputusan badan kehormatan DPRD kabupaten/kota yang telah dilaporkan dalam rapat paripurna sebagaimana dimaksud pada ayat (2), pimpinan DPRD kabupaten/kota menyampaikan keputusan badan kehormatan DPRD kabupaten/kota kepada pimpinan partai politik yang bersangkutan.\n(4) Pimpinan partai politik yang bersangkutan menyampaikan keputusan tentang pemberhentian anggotanya kepada pimpinan DPRD kabupaten/kota, paling lambat 30 (tiga puluh) Hari sejak diterimanya keputusan badan kehormatan DPRD kabupaten/kota sebagaimana dimaksud pada ayat (2) dari pimpinan DPRD kabupaten/kota.\n(5) Dalam hal pimpinan partai politik sebagaimana dimaksud pada ayat (3) tidak memberikan keputusan pemberhentian sebagaimana dimaksud pada ayat (4), pimpinan DPRD kabupaten/kota meneruskan keputusan badan kehormatan DPRD kabupaten/kota sebagaimana dimaksud pada ayat (2) kepada gubernur sebagai wakil Pemerintah Pusat melalui bupati/wali kota untuk memperoleh peresmian pemberhentian.\n(6) Paling lama 7 (tujuh) Hari sejak keputusan pemberhentian sebagaimana dimaksud pada ayat (5) diterima, bupati/wali kota menyampaikan keputusan tersebut kepada gubernur sebagai wakil Pemerintah Pusat.\n(7) Gubernur sebagai wakil Pemerintah Pusat meresmikan pemberhentian sebagaimana dimaksud pada ayat (5) paling lama 14 (empat belas) Hari sejak diterimanya keputusan badan kehormatan DPRD kabupaten/kota atau keputusan pimpinan partai politik tentang pemberhentian anggotanya dari bupati/wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 196",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Dalam hal pelaksanaan penyelidikan dan verifikasi sebagaimana dimaksud dalam Pasal 195 ayat (1), badan kehormatan DPRD kabupaten/kota dapat meminta bantuan dari ahli independen.\n(2) Ketentuan lebih lanjut mengenai tata cara penyelidikan, verifikasi, dan pengambilan keputusan oleh badan kehormatan DPRD kabupaten/kota diatur dalam peraturan DPRD kabupaten/kota tentang tata beracara badan kehormatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 197",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Anggota DPRD kabupaten/kota yang berhenti antarwaktu sebagaimana dimaksud dalam Pasal 194 ayat (1) dan Pasal 195 ayat (1) digantikan oleh calon anggota DPRD kabupaten/kota yang memperoleh suara terbanyak urutan berikutnya dalam daftar peringkat perolehan suara dari partai politik yang sama pada daerah pemilihan yang sama.\n(2) Dalam hal calon anggota DPRD kabupaten/kota yang memperoleh suara terbanyak urutan berikutnya sebagaimana dimaksud pada ayat (1) meninggal dunia, mengundurkan diri, atau tidak lagi memenuhi syarat sebagai calon anggota, anggota DPRD kabupaten/kota sebagaimana dimaksud pada ayat (1) digantikan oleh calon anggota DPRD kabupaten/kota yang memperoleh suara terbanyak urutan berikutnya dari partai politik yang sama pada daerah pemilihan yang sama.\n(3) Masa jabatan anggota DPRD kabupaten/kota pengganti antarwaktu melanjutkan sisa masa jabatan anggota DPRD kabupaten/kota yang digantikannya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 198",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Pimpinan DPRD kabupaten/kota menyampaikan nama anggota DPRD kabupaten/kota yang diberhentikan antarwaktu dan meminta nama calon pengganti antarwaktu kepada komisi pemilihan umum Daerah kabupaten/kota.\n(2) Komisi pemilihan umum Daerah kabupaten/kota menyampaikan nama calon pengganti antarwaktu berdasarkan ketentuan sebagaimana dimaksud dalam Pasal 197 ayat (1) dan ayat (2) kepada pimpinan DPRD kabupaten/kota paling lama 5 (lima) Hari sejak diterimanya surat pimpinan DPRD kabupaten/kota.\n(3) Paling lama 7 (tujuh) Hari sejak menerima nama calon pengganti antarwaktu dari komisi pemilihan umum Daerah kabupaten/kota sebagaimana dimaksud pada ayat (2), pimpinan DPRD kabupaten/kota menyampaikan nama anggota DPRD kabupaten/kota yang diberhentikan dan nama calon pengganti antarwaktu kepada gubernur sebagai wakil Pemerintah Pusat melalui bupati/wali kota.\n(4) Paling lama 7 (tujuh) Hari sejak menerima nama anggota DPRD kabupaten/kota yang diberhentikan dan nama calon pengganti antarwaktu sebagaimana dimaksud pada ayat (3), bupati/wali kota menyampaikan nama anggota DPRD kabupaten/kota yang diberhentikan dan nama calon pengganti antarwaktu kepada gubernur sebagai wakil Pemerintah Pusat.\n(5) Paling lama 14 (empat belas) Hari sejak menerima nama anggota DPRD kabupaten/kota yang diberhentikan dan nama calon pengganti antarwaktu dari bupati/wali kota sebagaimana dimaksud pada ayat (4), gubernur sebagai wakil Pemerintah Pusat meresmikan pemberhentian dan pengangkatannya dengan keputusan gubernur sebagai wakil Pemerintah Pusat.\n(6) Sebelum memangku jabatannya, anggota DPRD kabupaten/kota pengganti antarwaktu sebagaimana dimaksud pada ayat (3) mengucapkan sumpah/janji yang pengucapannya dipandu oleh pimpinan DPRD kabupaten/kota dengan tata cara dan teks sumpah/janji sebagaimana diatur dalam Pasal 156 dan Pasal 157.\n(7) Penggantian antarwaktu anggota DPRD kabupaten/kota tidak dilaksanakan apabila sisa masa jabatan anggota DPRD kabupaten/kota yang digantikan kurang dari 6 (enam) bulan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 199",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "Ketentuan lebih lanjut mengenai tata cara pengajuan penggantian antarwaktu, verifikasi terhadap persyaratan calon pengganti antarwaktu, dan peresmian calon pengganti antarwaktu anggota DPRD kabupaten/kota diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 200",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 14 Pemberhentian Antarwaktu, Penggantian Antarwaktu, dan Pemberhentian Sementara",
      "teks": "(1) Anggota DPRD kabupaten/kota diberhentikan sementara karena:\na. menjadi terdakwa dalam perkara tindak pidana umum yang diancam dengan pidana penjara paling singkat 5 (lima) tahun; atau\nb. menjadi terdakwa dalam perkara tindak pidana khusus.\n(2) Dalam hal anggota DPRD kabupaten/kota dinyatakan terbukti bersalah karena melakukan tindak pidana sebagaimana dimaksud ayat (1) huruf a atau huruf b berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap, anggota DPRD kabupaten/kota yang bersangkutan diberhentikan sebagai anggota DPRD kabupaten/kota.\n(3) Dalam hal anggota DPRD kabupaten/kota dinyatakan tidak terbukti melakukan tindak pidana sebagaimana dimaksud pada ayat (1) huruf a atau huruf b berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap, anggota DPRD kabupaten/kota yang bersangkutan diaktifkan kembali.\n(4) Anggota DPRD kabupaten/kota yang diberhentikan sementara tetap mendapatkan hak keuangan tertentu.\n(5) Ketentuan lebih lanjut mengenai tata cara pemberhentian sementara diatur dalam peraturan DPRD kabupaten/kota tentang tata tertib."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1 Sistem Pendukung DPRD Provinsi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "teks": "Sistem Pendukung DPRD Provinsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 201",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 1 Sistem Pendukung DPRD Provinsi",
      "teks": "(1) Untuk mendukung kelancaran pelaksanaan tugas dan wewenang DPRD provinsi, dibentuk sekretariat DPRD provinsi.\n(2) Dalam rangka melaksanakan tugas dan wewenang DPRD provinsi, dibentuk kelompok pakar atau tim ahli."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 202",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 1 Sistem Pendukung DPRD Provinsi",
      "teks": "(1) Susunan organisasi dan tata kerja sekretariat DPRD provinsi sebagaimana dimaksud dalam Pasal 201 ayat (1) ditetapkan dengan Perda Provinsi sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Sekretariat DPRD provinsi sebagaimana dimaksud dalam Pasal 201 ayat (1) dipimpin oleh seorang sekretaris DPRD provinsi yang diangkat dan diberhentikan dengan keputusan gubernur atas persetujuan pimpinan DPRD provinsi setelah berkonsultasi dengan pimpinan fraksi.\n(3) Sekretaris DPRD provinsi dan pegawai sekretariat DPRD provinsi berasal dari pegawai negeri sipil."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 203",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 1 Sistem Pendukung DPRD Provinsi",
      "teks": "(1) Kelompok pakar atau tim ahli sebagaimana dimaksud dalam Pasal 201 ayat (2) diangkat dan diberhentikan dengan keputusan sekretaris DPRD provinsi sesuai dengan kebutuhan atas usul anggota, pimpinan fraksi, dan pimpinan alat kelengkapan DPRD.\n(2) Kelompok pakar atau tim ahli sebagaimana dimaksud pada ayat (1) bekerja sesuai dengan pengelompokan tugas dan wewenang DPRD provinsi yang tercermin dalam alat kelengkapan DPRD provinsi."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2 Sistem Pendukung DPRD Kabupaten/Kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "teks": "Sistem Pendukung DPRD Kabupaten/Kota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 204",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Sistem Pendukung DPRD Kabupaten/Kota",
      "teks": "(1) Untuk mendukung kelancaran pelaksanaan tugas dan wewenang DPRD kabupaten/kota, dibentuk sekretariat DPRD kabupaten/kota.\n(2) Dalam rangka melaksanakan tugas dan wewenang DPRD kabupaten/kota, dibentuk kelompok pakar atau tim ahli."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 205",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Sistem Pendukung DPRD Kabupaten/Kota",
      "teks": "(1) Susunan organisasi dan tata kerja sekretariat DPRD kabupaten/kota ditetapkan dengan Perda Kabupaten/Kota sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Sekretariat DPRD kabupaten/kota sebagaimana dimaksud dalam Pasal 204 ayat (1) dipimpin oleh seorang sekretaris DPRD kabupaten/kota yang diangkat dan diberhentikan dengan keputusan bupati/wali kota atas persetujuan pimpinan DPRD kabupaten/kota.\n(3) Sekretaris DPRD kabupaten/kota dan pegawai sekretariat DPRD kabupaten/kota berasal dari pegawai negeri sipil."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 206",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keenam Sistem Pendukung DPRD Provinsi Dan DPRD Kabupaten/Kota",
      "parent_paragraf": "Paragraf 2 Sistem Pendukung DPRD Kabupaten/Kota",
      "teks": "(1) Kelompok pakar atau tim ahli sebagaimana dimaksud dalam Pasal 204 ayat (2) diangkat dan diberhentikan dengan keputusan sekretaris DPRD kabupaten/kota sesuai dengan kebutuhan atas usul anggota dan kemampuan Daerah kabupaten/kota.\n(2) Kelompok pakar atau tim ahli sebagaimana dimaksud pada ayat (1) bekerja sesuai dengan pengelompokan tugas dan wewenang DPRD kabupaten/kota yang tercermin dalam alat kelengkapan DPRD kabupaten/kota."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketujuh Hubungan Kerja Antara DPRD dan Kepala Daerah",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "Hubungan Kerja Antara DPRD dan Kepala Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 207",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Ketujuh Hubungan Kerja Antara DPRD dan Kepala Daerah",
      "teks": "(1) Hubungan kerja antara DPRD dan kepala daerah didasarkan atas kemitraan yang sejajar.\n(2) Hubungan kemitraan sebagaimana dimaksud pada ayat (1) diwujudkan dalam bentuk:\na. persetujuan bersama dalam pembentukan Perda;\nb. penyampaian laporan keterangan pertanggungjawaban kepada DPRD;\nc. persetujuan terhadap kerja sama yang akan dilakukan Pemerintah Daerah;\nd. rapat konsultasi DPRD dengan kepala daerah secara berkala; dan\ne. bentuk lainnya sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Penyampaian laporan keterangan pertanggungjawaban sebagaimana dimaksud pada ayat (2) huruf b tidak dapat dijadikan sarana pemberhentian kepala daerah."
    },
    {
      "tipe": "BAB",
      "label": "BAB VIII PERANGKAT DAERAH",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "PERANGKAT DAERAH"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu Umum",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "teks": "Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 208",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kesatu Umum",
      "teks": "(1) Kepala daerah dan DPRD dalam menyelenggarakan Urusan Pemerintahan dibantu oleh Perangkat Daerah.\n(2) Perangkat Daerah sebagaimana dimaksud pada ayat (1) diisi oleh pegawai aparatur sipil negara."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua Perangkat daerah",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "teks": "Perangkat daerah"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1 Umum",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 209",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 1 Umum",
      "teks": "(1) Perangkat Daerah provinsi terdiri atas:\na. sekretariat daerah;\nb. sekretariat DPRD;\nc. inspektorat;\nd. dinas; dan\ne. badan.\n(2) Perangkat Daerah kabupaten/kota terdiri atas:\na. sekretariat daerah;\nb. sekretariat DPRD;\nc. inspektorat;\nd. dinas;\ne. badan; dan\nf. Kecamatan.\n(3) Perangkat Daerah provinsi dan kabupaten/kota sebagaimana dimaksud pada ayat (1) dan ayat (2) selain melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah juga melaksanakan Tugas Pembantuan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 210",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 1 Umum",
      "teks": "Hubungan kerja Perangkat Daerah provinsi dengan Perangkat Daerah kabupaten/kota sebagaimana dimaksud dalam Pasal 209 ayat (1) dan ayat (2) bersifat koordinatif dan fungsional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 211",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 1 Umum",
      "teks": "(1) Pembinaan dan pengendalian penataan Perangkat Daerah dilakukan oleh Pemerintah Pusat untuk Daerah provinsi dan oleh gubernur sebagai wakil Pemerintah Pusat untuk Daerah kabupaten/kota.\n(2) Nomenklatur Perangkat Daerah dan unit kerja pada Perangkat Daerah yang melaksanakan Urusan Pemerintahan dibuat dengan memperhatikan pedoman dari kementerian/lembaga pemerintah nonkementerian yang membidangi Urusan Pemerintahan tersebut."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2 Pembentukan dan Susunan Perangkat Daerah",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Pembentukan dan Susunan Perangkat Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 212",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 2 Pembentukan dan Susunan Perangkat Daerah",
      "teks": "(1) Pembentukan dan susunan Perangkat Daerah sebagaimana dimaksud dalam Pasal 209 ayat (1) dan ayat (2) ditetapkan dengan Perda.\n(2) Perda sebagaimana dimaksud pada ayat (1) berlaku setelah mendapat persetujuan dari Menteri bagi Perangkat Daerah provinsi dan dari gubernur sebagai wakil Pemerintah Pusat bagi Perangkat Daerah kabupaten/kota.\n(3) Persetujuan Menteri atau gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud pada ayat (2) diberikan berdasarkan pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan sebagaimana dimaksud dalam Pasal 24.\n(4) Kedudukan, susunan organisasi, perincian tugas dan fungsi, serta tata kerja Perangkat Daerah sebagaimana dimaksud pada ayat (1) ditetapkan dengan Perkada."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3 Sekretariat Daerah",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Sekretariat Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 213",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 3 Sekretariat Daerah",
      "teks": "(1) Sekretariat Daerah sebagaimana dimaksud dalam Pasal 209 ayat (1) huruf a dan ayat (2) huruf a dipimpin oleh sekretaris Daerah.\n(2) Sekretaris Daerah sebagaimana dimaksud pada ayat (1) mempunyai tugas membantu kepala daerah dalam penyusunan kebijakan dan pengoordinasian administratif terhadap pelaksanaan tugas Perangkat Daerah serta pelayanan administratif.\n(3) Dalam pelaksanaan tugas sebagaimana dimaksud pada ayat (2), sekretaris Daerah bertanggung jawab kepada kepala daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 214",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 3 Sekretariat Daerah",
      "teks": "(1) Apabila sekretaris Daerah provinsi berhalangan melaksanakan tugasnya, tugas sekretaris Daerah provinsi dilaksanakan oleh penjabat yang ditunjuk oleh gubernur sebagai wakil Pemerintah Pusat atas persetujuan Menteri.\n(2) Apabila sekretaris Daerah kabupaten/kota berhalangan melaksanakan tugasnya, tugas sekretaris Daerah kabupaten/kota dilaksanakan oleh penjabat yang ditunjuk oleh bupati/wali kota atas persetujuan gubernur sebagai wakil Pemerintah Pusat.\n(3) Masa jabatan penjabat sekretaris Daerah sebagaimana dimaksud pada ayat (1) dan ayat (2) paling lama 6 (enam) bulan dalam hal sekretaris Daerah tidak bisa melaksanakan tugas atau paling lama 3 (tiga) bulan dalam hal terjadi kekosongan sekretaris Daerah.\n(4) Persetujuan Menteri dan gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud pada ayat (1) dan ayat (2) dilakukan sesuai dengan persyaratan kepegawaian berdasarkan ketentuan peraturan perundang-undangan.\n(5) Ketentuan lebih lanjut mengenai penjabat sekretaris Daerah diatur dalam Peraturan Presiden."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4 Sekretariat DPRD",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Sekretariat DPRD"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 215",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 4 Sekretariat DPRD",
      "teks": "(1) Sekretariat DPRD sebagaimana dimaksud dalam Pasal 209 ayat (1) huruf b dan ayat (2) huruf b dipimpin oleh sekretaris DPRD.\n(2) Sekretaris DPRD mempunyai tugas:\na. menyelenggarakan administrasi kesekretariatan;\nb. menyelenggarakan administrasi keuangan;\nc. mendukung pelaksanaan tugas dan fungsi DPRD; dan\nd. menyediakan dan mengoordinasikan tenaga ahli yang diperlukan oleh DPRD dalam melaksanakan fungsinya sesuai dengan kebutuhan.\n(3) Sekretaris DPRD dalam melaksanakan tugasnya secara teknis operasional bertanggung jawab kepada pimpinan DPRD dan secara administratif bertanggung jawab kepada kepala daerah melalui sekretaris Daerah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 5 Inspektorat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Inspektorat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 216",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 5 Inspektorat",
      "teks": "(1) Inspektorat Daerah sebagaimana dimaksud dalam Pasal 209 ayat (1) huruf c dan ayat (2) huruf c dipimpin oleh inspektur.\n(2) Inspektorat Daerah mempunyai tugas membantu kepala daerah membina dan mengawasi pelaksanaan Urusan Pemerintahan yang menjadi kewenangan Daerah dan Tugas Pembantuan oleh Perangkat Daerah.\n(3) Inspektorat Daerah dalam melaksanakan tugasnya bertanggung jawab kepada kepala daerah melalui sekretaris Daerah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 6 Dinas",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Dinas"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 217",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 6 Dinas",
      "teks": "(1) Dinas sebagaimana dimaksud dalam Pasal 209 ayat (1) huruf d dan ayat (2) huruf d dibentuk untuk melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(2) Dinas sebagaimana dimaksud pada ayat (1) diklasifikasikan atas:\na. dinas tipe A yang dibentuk untuk mewadahi Urusan Pemerintahan yang menjadi kewenangan Daerah dengan beban kerja yang besar;\nb. dinas tipe B yang dibentuk untuk mewadahi Urusan Pemerintahan yang menjadi kewenangan Daerah dengan beban kerja yang sedang; dan\nc. dinas tipe C yang dibentuk untuk mewadahi Urusan Pemerintahan yang menjadi kewenangan Daerah dengan beban kerja yang kecil.\n(3) Penentuan beban kerja sebagaimana dimaksud pada ayat (2) didasarkan pada jumlah penduduk, luas wilayah, besaran masing-masing Urusan Pemerintahan yang menjadi kewenangan Daerah, dan kemampuan keuangan Daerah untuk Urusan Pemerintahan Wajib dan berdasarkan potensi, proyeksi penyerapan tenaga kerja, dan pemanfaatan lahan untuk Urusan Pemerintahan Pilihan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 218",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 6 Dinas",
      "teks": "(1) Dinas sebagaimana dimaksud dalam Pasal 209 ayat (1) huruf d dan ayat (2) huruf d dipimpin oleh seorang kepala.\n(2) Kepala dinas mempunyai tugas membantu kepala daerah melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(3) Kepala dinas dalam melaksanakan tugasnya bertanggung jawab kepada kepala daerah melalui sekretaris Daerah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 7 Badan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Badan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 219",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 7 Badan",
      "teks": "(1) Badan sebagaimana dimaksud dalam Pasal 209 ayat (1) huruf e dan ayat (2) huruf e dibentuk untuk melaksanakan fungsi penunjang Urusan Pemerintahan yang menjadi kewenangan Daerah meliputi:\na. perencanaan;\nb. keuangan;\nc. kepegawaian serta pendidikan dan pelatihan;\nd. penelitian dan pengembangan; dan\ne. fungsi lain sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Badan sebagaimana dimaksud pada ayat (1) diklasifikasikan atas:\na. badan tipe A yang dibentuk untuk mewadahi pelaksanaan fungsi penunjang Urusan Pemerintahan dengan beban kerja yang besar;\nb. badan tipe B yang dibentuk untuk mewadahi pelaksanaan fungsi penunjang Urusan Pemerintahan dengan beban kerja yang sedang; dan\nc. badan tipe C yang dibentuk untuk mewadahi pelaksanaan fungsi penunjang Urusan Pemerintahan dengan beban kerja yang kecil.\n(3) Penentuan beban kerja badan sebagaimana dimaksud pada ayat (2) didasarkan pada jumlah penduduk, luas wilayah, kemampuan keuangan Daerah, dan cakupan tugas."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 220",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 7 Badan",
      "teks": "(1) Badan sebagaimana dimaksud dalam Pasal 209 ayat (1) huruf e dan ayat (2) huruf c dipimpin oleh seorang kepala.\n(2) Kepala badan mempunyai tugas membantu kepala daerah melaksanakan fungsi penunjang Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(3) Kepala badan dalam melaksanakan tugasnya bertanggung jawab kepada kepala daerah melalui sekretaris Daerah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 8 Kecamatan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "teks": "Kecamatan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 221",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Daerah kabupaten/kota membentuk Kecamatan dalam rangka meningkatkan koordinasi penyelenggaraan pemerintahan, pelayanan publik, dan pemberdayaan masyarakat Desa/kelurahan.\n(2) Kecamatan sebagaimana dimaksud pada ayat (1) dibentuk dengan Perda Kabupaten/Kota berpedoman pada peraturan pemerintah.\n(3) Rancangan Perda Kabupaten/Kota tentang pembentukan Kecamatan yang telah mendapatkan persetujuan bersama bupati/wali kota dan DPRD kabupaten/kota, sebelum ditetapkan oleh bupati/wali kota disampaikan kepada Menteri melalui gubernur sebagai wakil Pemerintah Pusat untuk mendapat persetujuan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 222",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Pembentukan Kecamatan sebagaimana dimaksud Pasal 221 ayat (1) harus memenuhi persyaratan dasar, persyaratan teknis, dan persyaratan administratif.\n(2) Persyaratan dasar sebagaimana dimaksud pada ayat (1) meliputi:\na. jumlah penduduk minimal;\nb. luas wilayah minimal;\nc. jumlah minimal Desa/kelurahan yang menjadi cakupan; dan\nd. usia minimal Kecamatan.\n(3) Persyaratan teknis sebagaimana dimaksud pada ayat (1) meliputi:\na. kemampuan keuangan Daerah;\nb. sarana dan prasarana pemerintahan; dan\nc. persyaratan teknis lainnya yang diatur dalam ketentuan peraturan perundang-undangan.\n(4) Persyaratan administratif sebagaimana dimaksud pada ayat (1) meliputi:\na. kesepakatan musyawarah Desa dan/atau keputusan forum komunikasi kelurahan atau nama lain di Kecamatan induk; dan\nb. kesepakatan musyawarah Desa dan/atau keputusan forum komunikasi kelurahan atau nama lain di wilayah Kecamatan yang akan dibentuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 223",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Kecamatan diklasifikasikan atas:\na. Kecamatan tipe A yang dibentuk untuk Kecamatan dengan beban kerja yang besar; dan\nb. Kecamatan tipe B yang dibentuk untuk Kecamatan dengan beban kerja yang kecil.\n(2) Penentuan beban kerja sebagaimana dimaksud pada ayat (1) didasarkan pada jumlah penduduk, luas wilayah, dan jumlah Desa/kelurahan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 224",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Kecamatan dipimpin oleh seorang kepala kecamatan yang disebut camat yang berada di bawah dan bertanggung jawab kepada bupati/wali kota melalui sekretaris Daerah.\n(2) Bupati/wali kota wajib mengangkat camat dari pegawai negeri sipil yang menguasai pengetahuan teknis pemerintahan dan memenuhi persyaratan kepegawaian sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Pengangkatan camat yang tidak sesuai dengan ketentuan sebagaimana dimaksud pada ayat (2) dibatalkan keputusan pengangkatannya oleh gubernur sebagai wakil Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 225",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Camat sebagaimana dimaksud dalam Pasal 224 ayat (1) mempunyai tugas:\na. menyelenggaraan urusan pemerintahan umum sebagaimana dimaksud dalam Pasal 25 ayat (6);\nb. mengoordinasikan kegiatan pemberdayaan masyarakat;\nc. mengoordinasikan upaya penyelenggaraan ketenteraman dan ketertiban umum;\nd. mengoordinasikan penerapan dan penegakan Perda dan Perkada;\ne. mengoordinasikan pemeliharaan prasarana dan sarana pelayanan umum;\nf. mengoordinasikan penyelenggaraan kegiatan pemerintahan yang dilakukan oleh Perangkat Daerah di Kecamatan;\ng. membina dan mengawasi penyelenggaraan kegiatan Desa dan/atau kelurahan;\nh. melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah kabupaten/kota yang tidak dilaksanakan oleh unit kerja Perangkat Daerah kabupaten/kota yang ada di Kecamatan; dan\ni. melaksanakan tugas lain sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Pendanaan penyelenggaraan urusan pemerintahan umum sebagaimana dimaksud pada ayat (1) huruf a dibebankan pada APBN dan pelaksanaan tugas lain sebagaimana dimaksud pada ayat (1) huruf i dibebankan kepada yang menugasi.\n(3) Camat dalam melaksanakan tugasnya sebagaimana dimaksud pada ayat (1) dibantu oleh perangkat Kecamatan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 226",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Selain melaksanakan tugas sebagaimana dimaksud dalam Pasal 225 ayat (1), camat mendapatkan pelimpahan sebagian kewenangan bupati/wali kota untuk melaksanakan sebagian Urusan Pemerintahan yang menjadi kewenangan Daerah kabupaten/kota.\n(2) Pelimpahan kewenangan bupati/wali kota sebagaimana dimaksud pada ayat (1) dilakukan berdasarkan pemetaan pelayanan publik yang sesuai dengan karakteristik Kecamatan dan/atau kebutuhan masyarakat pada Kecamatan yang bersangkutan.\n(3) Pelimpahan kewenangan bupati/wali kota sebagaimana dimaksud pada ayat (2) ditetapkan dengan keputusan bupati/wali kota berpedoman pada peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 227",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "Pendanaan dalam penyelenggaraan tugas pemerintahan yang dilakukan oleh camat sebagaimana dimaksud dalam Pasal 225 ayat (1) huruf b sampai dengan huruf h serta Pasal 226 ayat (1) dibebankan pada APBD kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 228",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "Ketentuan lebih lanjut mengenai Kecamatan diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 229",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Kelurahan dibentuk dengan Perda Kabupaten/Kota berpedoman pada peraturan pemerintah.\n(2) Kelurahan dipimpin oleh seorang kepala kelurahan yang disebut lurah selaku perangkat Kecamatan dan bertanggung jawab kepada camat.\n(3) Lurah diangkat oleh bupati/wali kota atas usul sekretaris daerah dari pegawai negeri sipil yang memenuhi persyaratan sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Lurah mempunyai tugas membantu camat dalam:\na. melaksanakan kegiatan pemerintahan kelurahan;\nb. melakukan pemberdayaan masyarakat;\nc. melaksanakan pelayanan masyarakat;\nd. memelihara ketenteraman dan ketertiban umum;\ne. memelihara prasarana dan fasilitas pelayanan umum;\nf. melaksanakan tugas lain yang diberikan oleh camat; dan lain-lain sesuai ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 230",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Pemerintah Daerah kabupaten/kota mengalokasikan anggaran dalam APBD kabupaten/kota untuk pembangunan sarana dan prasarana lokal kelurahan dan pemberdayaan masyarakat di kelurahan.\n(2) Alokasi anggaran sebagaimana dimaksud pada ayat (1) dimasukkan ke dalam anggaran Kecamatan pada bagian anggaran kelurahan untuk dimanfaatkan sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Penentuan kegiatan pembangunan sarana dan prasarana lokal kelurahan dan pemberdayaan masyarakat di kelurahan sebagaimana dimaksud pada ayat (1) dilakukan melalui musyawarah pembangunan kelurahan sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Untuk Daerah kota yang tidak memiliki Desa, alokasi anggaran sebagaimana dimaksud pada ayat (1) paling sedikit 5 (lima) persen dari APBD setelah dikurangi DAK.\n(5) Untuk Daerah kota yang memiliki Desa, alokasi anggaran sebagaimana dimaksud pada ayat (1) berpedoman pada ketentuan peraturan perundang-undangan.\n(6) Ketentuan mengenai tata cara pengalokasian, pemanfaatan, pengelolaan dan pertanggungjawaban dana pembangunan dan pemberdayaan masyarakat di kelurahan serta penyelenggaraan musyawarah pembangunan kelurahan diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 231",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "Dalam hal ketentuan peraturan perundang-undangan memerintahkan pembentukan lembaga tertentu di Daerah, lembaga tersebut dijadikan bagian dari Perangkat Daerah yang ada setelah dikonsultasikan kepada Menteri dan menteri yang menyelenggarakan Urusan Pemerintahan bidang pendayagunaan aparatur negara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 232",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Ketentuan lebih lanjut mengenai Perangkat Daerah diatur dengan peraturan pemerintah.\n(2) Peraturan pemerintah sebagaimana dimaksud pada ayat (1) paling sedikit mengatur tentang kedudukan, susunan organisasi, tugas dan fungsi, tata kerja, eselon, beban kerja, nomenklatur unit kerja, serta pembinaan dan pengendalian."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 233",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Pegawai aparatur sipil negara sebagaimana dimaksud dalam Pasal 208 ayat (2) yang menduduki jabatan kepala Perangkat Daerah, harus memenuhi persyaratan kompetensi:\na. teknis;\nb. manajerial; dan\nc. sosial kultural.\n(2) Selain memenuhi kompetensi sebagaimana dimaksud pada ayat (1), pegawai aparatur sipil negara yang menduduki jabatan kepala Perangkat Daerah harus memenuhi kompetensi pemerintahan.\n(3) Kompetensi teknis sebagaimana dimaksud pada ayat (1) huruf a ditetapkan oleh menteri/kepala lembaga pemerintah nonkementerian setelah dikoordinasikan dengan Menteri.\n(4) Kompetensi pemerintahan sebagaimana dimaksud pada ayat (2) ditetapkan oleh Menteri.\n(5) Ketentuan sebagaimana dimaksud pada ayat (1) dan ayat (2) berlaku secara mutatis mutandis terhadap pegawai aparatur sipil negara yang menduduki jabatan administrator di bawah kepala Perangkat Daerah dan jabatan pengawas."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 234",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Kepala Perangkat Daerah provinsi diisi dari pegawai negeri sipil yang memenuhi persyaratan sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Kepala Perangkat Daerah kabupaten/kota diisi dari pegawai negeri sipil yang memenuhi persyaratan sesuai dengan ketentuan peraturan perundang-undangan dan bertugas di wilayah Daerah provinsi yang bersangkutan.\n(3) Dalam hal di wilayah Daerah provinsi yang bersangkutan sebagaimana dimaksud pada ayat (2) tidak terdapat pegawai negeri sipil yang memenuhi persyaratan, kepala perangkat daerah kabupaten/kota dapat diisi dari pegawai negeri sipil yang memenuhi persyaratan sesuai dengan ketentuan peraturan perundang-undangan dan yang bertugas di wilayah Daerah provinsi lain.\n(4) Proses pengangkatan kepala Perangkat Daerah yang menduduki jabatan administrator dilakukan melalui seleksi sesuai dengan proses seleksi bagi jabatan pimpinan tinggi pratama di instansi Daerah sebagaimana diatur dalam undang-undang mengenai aparatur sipil negara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 235",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII PERANGKAT DAERAH",
      "parent_bagian": "Bagian Kedua Perangkat daerah",
      "parent_paragraf": "Paragraf 8 Kecamatan",
      "teks": "(1) Kepala daerah mengangkat dan/atau melantik kepala Perangkat Daerah hasil seleksi sebagaimana dimaksud dalam Pasal 234 ayat (4).\n(2) Dalam hal kepala Daerah menolak mengangkat dan/atau melantik kepala Perangkat Daerah sebagaimana dimaksud pada ayat (1), Menteri mengangkat dan/atau melantik kepala Perangkat Daerah provinsi dan gubernur sebagai wakil Pemerintah Pusat mengangkat dan/atau melantik kepala Perangkat Daerah kabupaten/kota."
    },
    {
      "tipe": "BAB",
      "label": "BAB IX PERDA DAN PERKADA",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "PERDA DAN PERKADA"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu Perda",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB IX PERDA DAN PERKADA",
      "teks": "Perda"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1 Umum",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB IX PERDA DAN PERKADA",
      "parent_bagian": "Bagian Kesatu Perda",
      "teks": "Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 236",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX PERDA DAN PERKADA",
      "parent_bagian": "Bagian Kesatu Perda",
      "parent_paragraf": "Paragraf 1 Umum",
      "teks": "(1) Untuk menyelenggarakan Otonomi Daerah dan Tugas Pembantuan, Daerah membentuk Perda.\n(2) Perda sebagaimana dimaksud pada ayat (1) dibentuk oleh DPRD dengan persetujuan bersama kepala Daerah.\n(3) Perda sebagaimana dimaksud pada ayat (1) memuat materi muatan:\na. penyelenggaraan Otonomi Daerah dan Tugas Pembantuan; dan\nb. penjabaran lebih lanjut ketentuan peraturan perundang-undangan yang lebih tinggi.\n(4) Selain materi muatan sebagaimana dimaksud pada ayat (3) Perda dapat memuat materi muatan lokal sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 237",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX PERDA DAN PERKADA",
      "parent_bagian": "Bagian Kesatu Perda",
      "parent_paragraf": "Paragraf 1 Umum",
      "teks": "(1) Asas pembentukan dan materi muatan Perda berpedoman pada ketentuan peraturan perundang-undangan dan asas hukum yang tumbuh dan berkembang dalam masyarakat sepanjang tidak bertentangan dengan prinsip Negara Kesatuan Republik Indonesia.\n(2) Pembentukan Perda mencakup tahapan perencanaan, penyusunan, pembahasan, penetapan, dan pengundangan yang berpedoman pada ketentuan peraturan perundang-undangan.\n(3) Masyarakat berhak memberikan masukan secara lisan dan/atau tertulis dalam pembentukan Perda.\n(4) Pembentukan Perda sebagaimana dimaksud pada ayat (2) dilakukan secara efektif dan efisien."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 238",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX PERDA DAN PERKADA",
      "parent_bagian": "Bagian Kesatu Perda",
      "parent_paragraf": "Paragraf 1 Umum",
      "teks": "(1) Perda dapat memuat ketentuan tentang pembebanan biaya paksaan penegakan/pelaksanaan Perda seluruhnya atau sebagian kepada pelanggar sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Perda dapat memuat ancaman pidana kurungan paling lama 6 (enam) bulan atau pidana denda paling banyak Rp50.000.000,00 (lima puluh juta rupiah).\n(3) Perda dapat memuat ancaman pidana kurungan atau pidana denda selain sebagaimana dimaksud pada ayat (2) sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Selain sanksi sebagaimana dimaksud pada ayat (1), Perda dapat memuat ancaman sanksi yang bersifat mengembalikan pada keadaan semula dan sanksi administratif.\n(5) Sanksi administratif sebagaimana dimaksud pada ayat (4) berupa:\na. teguran lisan;\nb. teguran tertulis;\nc. penghentian sementara kegiatan;\nd. penghentian tetap kegiatan;\ne. pencabutan sementara izin;\nf. pencabutan tetap izin;\ng. denda administratif; dan/atau\nh. sanksi administratif lain sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2 Perencanaan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB IX PERDA DAN PERKADA",
      "parent_bagian": "Bagian Kesatu Perda",
      "teks": "Perencanaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 239",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Perencanaan penyusunan Perda dilakukan dalam program pembentukan Perda.\n(2) Program pembentukan Perda sebagaimana dimaksud pada ayat (1) disusun oleh DPRD dan kepala daerah untuk jangka waktu 1 (satu) tahun berdasarkan skala prioritas pembentukan rancangan Perda.\n(3) Program pembentukan Perda sebagaimana dimaksud pada ayat (2) ditetapkan dengan keputusan DPRD.\n(4) Penyusunan dan penetapan program pembentukan Perda dilakukan setiap tahun sebelum penetapan rancangan Perda tentang APBD.\n(5) Dalam program pembentukan Perda dapat dimuat daftar kumulatif terbuka yang terdiri atas:\na. akibat putusan Mahkamah Agung; dan\nb. APBD.\n(6) Selain daftar kumulatif terbuka sebagaimana dimaksud pada ayat (5), dalam program pembentukan Perda Kabupaten/Kota dapat memuat daftar kumulatif terbuka mengenai:\na. penataan Kecamatan; dan\nb. penataan Desa.\n(7) Dalam keadaan tertentu, DPRD atau kepala daerah dapat mengajukan rancangan Perda di luar program pembentukan Perda karena alasan:\na. mengatasi keadaan luar biasa, keadaan konflik, atau bencana alam;\nb. menindaklanjuti kerja sama dengan pihak lain;\nc. mengatasi keadaan tertentu lainnya yang memastikan adanya urgensi atas suatu rancangan Perda yang dapat disetujui bersama oleh alat kelengkapan DPRD yang khusus menangani bidang pembentukan Perda dan unit yang menangani bidang hukum pada Pemerintah Daerah;\nd. akibat pembatalan oleh Menteri untuk Perda Provinsi dan oleh gubernur sebagai wakil Pemerintah Pusat untuk Perda Kabupaten/Kota; dan\ne. perintah dari ketentuan peraturan perundang-undangan yang lebih tinggi setelah program pembentukan Perda ditetapkan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Penyusunan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 240",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Penyusunan rancangan Perda dilakukan berdasarkan program pembentukan Perda.\n(2) Penyusunan rancangan Perda sebagaimana dimaksud pada ayat (1) dapat berasal dari DPRD atau kepala daerah.\n(3) Penyusunan rancangan Perda sebagaimana dimaksud pada ayat (1) dan ayat (2) berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Pembahasan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 241",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Pembahasan rancangan Perda dilakukan oleh DPRD bersama kepala Daerah untuk mendapat persetujuan bersama.\n(2) Pembahasan bersama sebagaimana dimaksud pada ayat (1) dilakukan melalui tingkat pembicaraan.\n(3) Pembahasan sebagaimana dimaksud pada ayat (1) dan ayat (2) berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Penetapan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 242",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Rancangan Perda yang telah disetujui bersama oleh DPRD dan kepala Daerah disampaikan oleh pimpinan DPRD kepada kepala daerah untuk ditetapkan menjadi Perda.\n(2) Penyampaian rancangan Perda sebagaimana dimaksud pada ayat (1) dilakukan dalam jangka waktu paling lama 3 (tiga) Hari terhitung sejak tanggal persetujuan bersama.\n(3) Gubernur wajib menyampaikan rancangan Perda Provinsi sebagaimana dimaksud pada ayat (2) kepada Menteri paling lama 3 (tiga) Hari terhitung sejak menerima rancangan Perda Provinsi dari pimpinan DPRD provinsi untuk mendapatkan nomor register Perda.\n(4) Bupati/wali kota wajib menyampaikan rancangan Perda Kabupaten/Kota sebagaimana dimaksud pada ayat (2) kepada gubernur sebagai wakil Pemerintah Pusat paling lama 3 (tiga) Hari terhitung sejak menerima rancangan Perda kabupaten/kota dari pimpinan DPRD kabupaten/kota untuk mendapatkan nomor register Perda.\n(5) Menteri memberikan nomor register rancangan Perda Provinsi dan gubernur sebagai wakil Pemerintah Pusat memberikan nomor register rancangan Perda Kabupaten/Kota paling lama 7 (tujuh) Hari sejak rancangan Perda diterima.\n(6) Rancangan Perda ditetapkan oleh kepala daerah dengan membubuhkan tanda tangan paling lama 30 (tiga puluh) Hari sejak rancangan Perda disetujui bersama oleh DPRD dan kepala Daerah.\n(7) Dalam hal kepala Daerah tidak menandatangani rancangan Perda yang telah mendapat nomor register sebagaimana dimaksud pada ayat (6), rancangan Perda tersebut sah menjadi Perda dan wajib diundangkan dalam lembaran daerah.\n(8) Rancangan Perda sebagaimana dimaksud pada ayat (7) dinyatakan sah dengan kalimat pengesahannya berbunyi, “Peraturan Daerah ini dinyatakan sah”.\n(9) Pengesahan yang berbunyi sebagaimana dimaksud pada ayat (8) harus dibubuhkan pada halaman terakhir Perda sebelum pengundangan naskah Perda ke dalam lembaran daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 243",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Rancangan Perda yang belum mendapatkan nomor register sebagaimana dimaksud dalam Pasal 242 ayat (5) belum dapat ditetapkan kepala Daerah dan belum dapat diundangkan dalam lembaran daerah.\n(2) Gubernur sebagai wakil Pemerintah Pusat secara berkala menyampaikan laporan Perda Kabupaten/Kota yang telah mendapatkan nomor register kepada Menteri.\n(3) Ketentuan lebih lanjut mengenai tata cara pemberian nomor register Perda diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Pengundangan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 244",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 6",
      "teks": "(1) Perda diundangkan dalam lembaran daerah.\n(2) Pengundangan Perda dalam lembaran daerah dilakukan oleh sekretaris Daerah.\n(3) Perda mulai berlaku dan mempunyai kekuatan mengikat pada tanggal diundangkan, kecuali ditentukan lain di dalam Perda yang bersangkutan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "teks": "Evaluasi Rancangan Perda"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 245",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 7",
      "teks": "(1) Rancangan Perda Provinsi yang mengatur tentang RPJPD, RPJMD, APBD, perubahan APBD, pertanggungjawaban pelaksanaan APBD, pajak daerah, retribusi daerah dan tata ruang daerah harus mendapat evaluasi Menteri sebelum ditetapkan oleh gubernur.\n(2) Menteri dalam melakukan evaluasi Rancangan Perda Provinsi tentang pajak daerah dan retribusi daerah sebagaimana dimaksud pada ayat (1) berkoordinasi dengan menteri yang menyelenggarakan urusan pemerintahan bidang keuangan dan untuk evaluasi Rancangan Perda Provinsi tentang tata ruang daerah berkoordinasi dengan menteri yang menyelenggarakan urusan pemerintahan bidang tata ruang.\n(3) Rancangan Perda kabupaten/kota yang mengatur tentang RPJPD, RPJMD, APBD, perubahan APBD, pertanggungjawaban pelaksanaan APBD, pajak daerah, retribusi daerah, dan tata ruang daerah harus mendapat evaluasi gubernur sebagai wakil Pemerintah Pusat sebelum ditetapkan oleh bupati/wali kota.\n(4) Gubernur sebagai wakil Pemerintah Pusat dalam melakukan evaluasi rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah berkonsultasi dengan Menteri dan selanjutnya Menteri berkoordinasi dengan menteri yang urusan menyelenggarakan pemerintahan bidang keuangan, dan untuk evaluasi rancangan Perda Kabupaten/Kota tentang tata ruang daerah berkonsultasi dengan Menteri dan selanjutnya Menteri berkoordinasi dengan menteri yang menyelenggarakan urusan pemerintahan bidang tata ruang.\n(5) Hasil evaluasi rancangan Perda Provinsi dan rancangan Perda Kabupaten/Kota sebagaimana dimaksud pada ayat (1) dan ayat (3) jika disetujui diikuti dengan pemberian nomor register."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "Perkada"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kedua",
      "teks": "Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 246",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Untuk melaksanakan Perda atau atas kuasa peraturan perundang-undangan, kepala daerah menetapkan Perkada.\n(2) Ketentuan mengenai asas pembentukan dan materi muatan, serta pembentukan Perda sebagaimana dimaksud dalam Pasal 237 berlaku secara mutatis mutandis terhadap asas pembentukan dan materi muatan, serta pembentukan Perkada."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kedua",
      "teks": "Perencanaan, Penyusunan, dan Penetapan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 247",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 2",
      "teks": "Perencanaan, penyusunan, dan penetapan Perkada berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kedua",
      "teks": "Pengundangan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 248",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kedua",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Perkada diundangkan dalam berita daerah.\n(2) Pengundangan Perkada sebagaimana dimaksud pada ayat (1) dilakukan oleh sekretaris daerah.\n(3) Perkada sebagaimana dimaksud pada ayat (1) mulai berlaku dan mempunyai kekuatan mengikat pada tanggal diundangkan, kecuali ditentukan lain di dalam Perkada yang bersangkutan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "Pembatalan Perda dan Perkada"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 249",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Gubernur wajib menyampaikan Perda Provinsi dan peraturan gubernur kepada Menteri paling lama 7 (tujuh) Hari setelah ditetapkan.\n(2) Gubernur yang tidak menyampaikan Perda Provinsi dan peraturan gubernur kepada Menteri sebagaimana dimaksud pada ayat (1) dikenai sanksi administratif berupa teguran tertulis dari Menteri.\n(3) Bupati/wali kota wajib menyampaikan Perda Kabupaten/Kota dan peraturan bupati/wali kota kepada gubernur sebagai wakil Pemerintah Pusat paling lama 7 (tujuh) Hari setelah ditetapkan.\n(4) Bupati/wali kota yang tidak menyampaikan Perda Kabupaten/Kota dan peraturan bupati/wali kota kepada gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud pada ayat (3) dikenai sanksi administratif berupa teguran tertulis dari gubernur sebagai wakil Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 250",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Perda dan Perkada sebagaimana dimaksud dalam Pasal 249 ayat (1) dan ayat (3) dilarang bertentangan dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, dan/atau kesusilaan.\n(2) Bertentangan dengan kepentingan umum sebagaimana dimaksud pada ayat (1) meliputi:\na. terganggunya kerukunan antarwarga masyarakat;\nb. terganggunya akses terhadap pelayanan publik;\nc. terganggunya ketenteraman dan ketertiban umum;\nd. terganggunya kegiatan ekonomi untuk meningkatkan kesejahteraan masyarakat; dan/atau\ne. diskriminasi terhadap suku, agama dan kepercayaan, ras, antar-golongan, dan gender."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 251",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Perda Provinsi dan peraturan gubernur yang bertentangan dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, dan/atau kesusilaan dibatalkan oleh Menteri.\n(2) Perda Kabupaten/Kota dan peraturan bupati/wali kota yang bertentangan dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, dan/atau kesusilaan dibatalkan oleh gubernur sebagai wakil Pemerintah Pusat.\n(3) Dalam hal gubernur sebagai wakil Pemerintah Pusat tidak membatalkan Perda Kabupaten/Kota dan/atau peraturan bupati/wali kota yang bertentangan dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, dan/atau kesusilaan sebagaimana dimaksud pada ayat (2), Menteri membatalkan Perda Kabupaten/Kota dan/atau peraturan bupati/wali kota.\n(4) Pembatalan Perda Provinsi dan peraturan gubernur sebagaimana dimaksud pada ayat (1) ditetapkan dengan keputusan Menteri dan pembatalan Perda Kabupaten/Kota dan peraturan bupati/wali kota sebagaimana dimaksud pada ayat (2) ditetapkan dengan keputusan gubernur sebagai wakil Pemerintah Pusat.\n(5) Paling lama 7 (tujuh) Hari setelah keputusan pembatalan sebagaimana dimaksud pada ayat (4), kepala daerah harus menghentikan pelaksanaan Perda dan selanjutnya DPRD bersama kepala daerah mencabut Perda dimaksud.\n(6) Paling lama 7 (tujuh) Hari setelah keputusan pembatalan sebagaimana dimaksud pada ayat (4), kepala daerah harus menghentikan pelaksanaan Perkada dan selanjutnya kepala daerah mencabut Perkada dimaksud.\n(7) Dalam hal penyelenggara Pemerintahan Daerah provinsi tidak dapat menerima keputusan pembatalan Perda Provinsi dan gubernur tidak dapat menerima keputusan pembatalan peraturan gubernur sebagaimana dimaksud pada ayat (4) dengan alasan yang dapat dibenarkan oleh ketentuan peraturan perundang-undangan, gubernur dapat mengajukan keberatan kepada Presiden paling lambat 14 (empat belas) Hari sejak keputusan pembatalan Perda atau peraturan gubernur diterima.\n(8) Dalam hal penyelenggara Pemerintahan Daerah kabupaten/kota tidak dapat menerima keputusan pembatalan Perda Kabupaten/Kota dan bupati/wali kota tidak dapat menerima keputusan pembatalan peraturan bupati/wali kota sebagaimana dimaksud pada ayat (4) dengan alasan yang dapat dibenarkan oleh ketentuan peraturan perundang-undangan, bupati/wali kota dapat mengajukan keberatan kepada Menteri paling lambat 14 (empat belas) Hari sejak keputusan pembatalan Perda Kabupaten/Kota atau peraturan bupati/wali kota diterima."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 252",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Penyelenggara Pemerintahan Daerah provinsi atau kabupaten/kota yang masih memberlakukan Perda yang dibatalkan oleh Menteri atau oleh gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud dalam Pasal 251 ayat (4), dikenai sanksi.\n(2) Sanksi sebagaimana dimaksud pada ayat (1) berupa:\na. sanksi administratif; dan/atau\nb. sanksi penundaan evaluasi rancangan Perda;\n(3) Sanksi administratif sebagaimana dimaksud pada ayat (2) huruf a dikenai kepada kepala Daerah dan anggota DPRD berupa tidak dibayarkan hak-hak keuangan yang diatur dalam ketentuan peraturan perundang-undangan selama 3 (tiga) bulan.\n(4) Sanksi sebagaimana dimaksud pada ayat (2) tidak diterapkan pada saat penyelenggara Pemerintahan Daerah masih mengajukan keberatan kepada Presiden untuk Perda Provinsi dan kepada Menteri untuk Perda Kabupaten/Kota.\n(5) Dalam hal penyelenggara Pemerintahan Daerah provinsi atau kabupaten/kota masih memberlakukan Perda mengenai pajak daerah dan/atau retribusi daerah yang dibatalkan oleh Menteri atau dibatalkan oleh gubernur sebagai wakil Pemerintah Pusat, dikenai sanksi penundaan atau pemotongan DAU dan/atau DBH bagi Daerah bersangkutan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "Penyebarluasan Program Pembentukan Perda dan Rancangan Perda"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 253",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) DPRD dan kepala Daerah wajib melakukan penyebarluasan sejak penyusunan program pembentukan Perda, penyusunan rancangan Perda, dan pembahasan rancangan Perda.\n(2) Penyebarluasan program pembentukan Perda sebagaimana dimaksud pada ayat (1) dilakukan bersama oleh DPRD dan kepala daerah yang dikoordinasikan oleh alat kelengkapan DPRD yang khusus menangani pembentukan Perda.\n(3) Penyebarluasan rancangan Perda yang berasal dari DPRD dilaksanakan oleh alat kelengkapan DPRD.\n(4) Penyebarluasan rancangan Perda yang berasal dari kepala daerah dilaksanakan oleh sekretaris daerah.\n(5) Penyebarluasan sebagaimana dimaksud pada ayat (1) dilakukan untuk dapat memberikan informasi dan/atau memperoleh masukan masyarakat dan para pemangku kepentingan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 254",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Kepala daerah wajib menyebarluaskan Perda yang telah diundangkan dalam lembaran daerah dan Perkada yang telah diundangkan dalam berita daerah.\n(2) Kepala daerah yang tidak menyebarluaskan Perda dan Perkada yang telah diundangkan sebagaimana dimaksud pada ayat (1) dikenai sanksi administratif berupa teguran tertulis oleh Menteri untuk gubernur dan oleh gubernur sebagai wakil Pemerintah Pusat untuk bupati/wali kota.\n(3) Dalam hal teguran tertulis sebagaimana dimaksud pada ayat (2) telah disampaikan 2 (dua) kali berturut-turut dan tetap tidak dilaksanakan, kepala daerah diwajibkan mengikuti program pembinaan khusus pendalaman bidang pemerintahan yang dilaksanakan oleh Kementerian serta tugas dan kewenangannya dilaksanakan oleh wakil kepala daerah atau oleh pejabat yang ditunjuk."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "Penegakan Perda dan Perkada"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima",
      "teks": "Satuan Polisi Pamong Praja"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 255",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Satuan polisi pamong praja dibentuk untuk menegakkan Perda dan Perkada, menyelenggarakan ketertiban umum dan ketenteraman, serta menyelenggarakan pelindungan masyarakat.\n(2) Satuan polisi pamong praja mempunyai kewenangan:\na. melakukan tindakan penertiban non-yustisial terhadap warga masyarakat, aparatur, atau badan hukum yang melakukan pelanggaran atas Perda dan/atau Perkada;\nb. menindak warga masyarakat, aparatur, atau badan hukum yang mengganggu ketertiban umum dan ketenteraman masyarakat;\nc. melakukan tindakan penyelidikan terhadap warga masyarakat, aparatur, atau badan hukum yang diduga melakukan pelanggaran atas Perda dan/atau Perkada; dan\nd. melakukan tindakan administratif terhadap warga masyarakat, aparatur, atau badan hukum yang melakukan pelanggaran atas Perda dan/atau Perkada."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 256",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Polisi pamong praja adalah jabatan fungsional pegawai negeri sipil yang penetapannya dilakukan sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Polisi pamong praja diangkat dari pegawai negeri sipil yang memenuhi persyaratan.\n(3) Polisi pamong praja harus mengikuti pendidikan dan pelatihan teknis dan fungsional.\n(4) Pendidikan dan pelatihan teknis dan fungsional sebagaimana dimaksud pada ayat (3) dilakukan oleh Kementerian.\n(5) Kementerian dalam melakukan pendidikan dan pelatihan teknis dan fungsional sebagaimana dimaksud pada ayat (4) dapat berkoordinasi dengan Kepolisian Republik Indonesia dan Kejaksaan Agung.\n(6) Polisi pamong praja yang memenuhi persyaratan dapat diangkat sebagai penyidik pegawai negeri sipil sesuai dengan ketentuan peraturan perundang-undangan.\n(7) Ketentuan lebih lanjut mengenai satuan polisi pamong praja diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pejabat Penyidik"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 257",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Penyidikan terhadap pelanggaran atas ketentuan Perda dilakukan oleh pejabat penyidik sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Selain pejabat penyidik sebagaimana dimaksud pada ayat (1) dapat ditunjuk penyidik pegawai negeri sipil yang diberi tugas untuk melakukan penyidikan terhadap pelanggaran atas ketentuan Perda sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Penyidik pegawai negeri sipil sebagaimana dimaksud pada ayat (2) menyampaikan hasil penyidikan kepada penuntut umum dan berkoordinasi dengan penyidik kepolisian setempat.\n(4) Penuntutan terhadap pelanggaran atas ketentuan Perda dilakukan oleh penuntut umum sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "BAB",
      "label": "BAB X",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "PEMBANGUNAN DAERAH"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 258",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Daerah melaksanakan pembangunan untuk peningkatan dan pemerataan pendapatan masyarakat, kesempatan kerja, lapangan berusaha, meningkatkan akses dan kualitas pelayanan publik dan daya saing Daerah.\n(2) Pembangunan Daerah sebagaimana dimaksud pada ayat (1) merupakan perwujudan dari pelaksanaan Urusan Pemerintahan yang telah diserahkan ke Daerah sebagai bagian integral dari pembangunan nasional.\n(3) Kementerian atau lembaga pemerintah nonkementerian berdasarkan pemetaan Urusan Pemerintahan Wajib yang tidak berkaitan dengan Pelayanan Dasar dan Urusan Pemerintahan Pilihan sebagaimana dimaksud dalam Pasal 24 melakukan sinkronisasi dan harmonisasi dengan Daerah untuk mencapai target pembangunan nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 259",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Untuk mencapai target pembangunan nasional sebagaimana dimaksud dalam Pasal 258 ayat (3) dilakukan koordinasi teknis pembangunan antara kementerian atau lembaga pemerintah nonkementerian dan Daerah.\n(2) Koordinasi teknis pembangunan antara kementerian atau lembaga pemerintah nonkementerian dan Daerah sebagaimana dimaksud pada ayat (1) dikoordinasikan oleh Menteri dengan menteri yang menyelenggarakan urusan pemerintahan bidang perencanaan pembangunan.\n(3) Koordinasi teknis pembangunan antara Daerah provinsi dan Daerah kabupaten/kota dan antar-Daerah kabupaten/kota lingkup Daerah provinsi dilaksanakan oleh gubernur sebagai wakil Pemerintah Pusat.\n(4) Koordinasi teknis pembangunan sebagaimana dimaksud pada ayat (1) dilakukan dalam tahap perencanaan, pelaksanaan, pengendalian, dan evaluasi pembangunan Daerah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Perencanaan Pembangunan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 260",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Daerah sesuai dengan kewenangannya menyusun rencana pembangunan Daerah sebagai satu kesatuan dalam sistem perencanaan pembangunan nasional.\n(2) Rencana pembangunan Daerah sebagaimana dimaksud pada ayat (1) dikoordinasikan, disinergikan, dan diharmonisasikan oleh Perangkat Daerah yang membidangi perencanaan pembangunan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 261",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Perencanaan pembangunan Daerah menggunakan pendekatan teknokratik, partisipatif, politis, serta atas-bawah dan bawah-atas.\n(2) Pendekatan teknokratis sebagaimana dimaksud pada ayat (1) menggunakan metode dan kerangka berpikir ilmiah untuk mencapai tujuan dan sasaran pembangunan Daerah.\n(3) Pendekatan partisipatif sebagaimana dimaksud pada ayat (1) dilaksanakan dengan melibatkan berbagai pemangku kepentingan.\n(4) Pendekatan politis sebagaimana dimaksud pada ayat (1) dilaksanakan dengan menerjemahkan visi dan misi kepala daerah terpilih ke dalam dokumen perencanaan pembangunan jangka menengah yang dibahas bersama dengan DPRD.\n(5) Pendekatan atas-bawah dan bawah-atas sebagaimana dimaksud pada ayat (1) merupakan hasil perencanaan yang diselaraskan dalam musyawarah pembangunan yang dilaksanakan mulai dari Desa, Kecamatan, Daerah kabupaten/kota, Daerah provinsi, hingga nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 262",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Rencana pembangunan Daerah sebagaimana dimaksud dalam Pasal 260 ayat (2) dirumuskan secara transparan, responsif, efisien, efektif, akuntabel, partisipatif, terukur, berkeadilan, dan berwawasan lingkungan.\n(2) Rencana pembangunan Daerah sebagaimana dimaksud dalam Pasal 260 ayat (2) memperhatikan percepatan pembangunan Daerah tertinggal."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 263",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Dokumen perencanaan pembangunan Daerah terdiri atas:\na. RPJPD;\nb. RPJMD; dan\nc. RKPD.\n(2) RPJPD sebagaimana dimaksud pada ayat (1) huruf a merupakan penjabaran dari visi, misi, arah kebijakan, dan sasaran pokok pembangunan Daerah jangka panjang untuk 20 (dua puluh) tahun yang disusun dengan berpedoman pada RPJPN dan rencana tata ruang wilayah.\n(3) RPJMD sebagaimana dimaksud pada ayat (1) huruf b merupakan penjabaran dari visi, misi, dan program kepala daerah yang memuat tujuan, sasaran, strategi, arah kebijakan, pembangunan Daerah dan keuangan Daerah, serta program Perangkat Daerah dan lintas Perangkat Daerah yang disertai dengan kerangka pendanaan bersifat indikatif untuk jangka waktu 5 (lima) tahun yang disusun dengan berpedoman pada RPJPD dan RPJMN.\n(4) RKPD sebagaimana dimaksud pada ayat (1) huruf c merupakan penjabaran dari RPJMD yang memuat rancangan kerangka ekonomi Daerah, prioritas pembangunan Daerah, serta rencana kerja dan pendanaan untuk jangka waktu 1 (satu) tahun yang disusun dengan berpedoman pada Rencana Kerja Pemerintah dan program strategis nasional yang ditetapkan oleh Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 264",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) RPJPD dan RPJMD sebagaimana dimaksud dalam Pasal 263 ayat (1) huruf a dan huruf b ditetapkan dengan Perda.\n(2) RKPD sebagaimana dimaksud dalam Pasal 263 ayat (1) huruf c ditetapkan dengan Perkada.\n(3) Perda tentang RPJPD ditetapkan paling lama 6 (enam) bulan setelah RPJPD periode sebelumnya berakhir.\n(4) Perda tentang RPJMD ditetapkan paling lama 6 (enam) bulan setelah kepala daerah terpilih dilantik.\n(5) RPJPD, RPJMD, dan RKPD sebagaimana dimaksud pada ayat (1) dan ayat (2) dapat diubah apabila berdasarkan hasil pengendalian dan evaluasi tidak sesuai dengan perkembangan keadaan atau penyesuaian terhadap kebijakan yang ditetapkan oleh Pemerintah Pusat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 265",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) RPJPD menjadi pedoman dalam perumusan visi, misi, dan program calon kepala daerah.\n(2) RPJMD dan RKPD digunakan sebagai instrumen evaluasi penyelenggaraan Pemerintahan Daerah.\n(3) RKPD menjadi pedoman kepala daerah dalam menyusun KUA serta PPAS."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 266",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Apabila penyelenggara Pemerintahan Daerah tidak menetapkan Perda tentang RPJPD dan RPJMD sebagaimana dimaksud dalam Pasal 264 ayat (3) dan ayat (4), anggota DPRD dan kepala daerah dikenai sanksi administratif berupa tidak dibayarkan hak-hak keuangan yang diatur dalam ketentuan peraturan perundang-undangan selama 3 (tiga) bulan.\n(2) Apabila kepala daerah tidak menetapkan Perkada tentang RKPD sebagaimana dimaksud dalam Pasal 264 ayat (2), kepala daerah dikenai sanksi administratif berupa tidak dibayarkan hak-hak keuangan yang diatur dalam peraturan perundang-undangan selama 3 (tiga) bulan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Evaluasi Rancangan Perda tentang RPJPD dan RPJMD"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 267",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Rancangan Perda Provinsi tentang RPJPD dan RPJMD yang telah disetujui bersama oleh gubernur dan DPRD provinsi sebelum ditetapkan oleh gubernur paling lama 3 (tiga) Hari terhitung sejak persetujuan bersama disampaikan kepada Menteri untuk dievaluasi.\n(2) Rancangan Perda Kabupaten/Kota tentang RPJPD dan RPJMD yang telah disetujui bersama oleh bupati/wali kota dan DPRD Kabupaten/Kota sebelum ditetapkan oleh bupati/wali kota paling lama 3 (tiga) Hari terhitung sejak persetujuan bersama disampaikan kepada gubernur sebagai wakil Pemerintah Pusat untuk dievaluasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 268",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Evaluasi terhadap rancangan Perda Provinsi tentang RPJPD yang dilakukan oleh Menteri sebagaimana dimaksud dalam Pasal 267 ayat (1) dilaksanakan untuk menguji kesesuaian dengan RPJPN dan rencana tata ruang wilayah provinsi, kepentingan umum dan/atau ketentuan peraturan perundang-undangan yang lebih tinggi.\n(2) Hasil evaluasi terhadap rancangan Perda Provinsi tentang RPJPD sebagaimana dimaksud pada ayat (1) disampaikan oleh Menteri kepada gubernur paling lama 15 (lima belas) Hari sejak Rancangan Perda diterima.\n(3) Apabila Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang RPJPD tidak sesuai dengan RPJPN dan rencana tata ruang wilayah provinsi, kepentingan umum, dan/atau peraturan perundang-undangan yang lebih tinggi, gubernur bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari sejak hasil evaluasi diterima.\n(4) Apabila hasil evaluasi tidak ditindaklanjuti oleh gubernur dan DPRD serta gubernur menetapkan rancangan Perda Provinsi tentang RPJPD menjadi Perda, Menteri membatalkan Perda dimaksud."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 269",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Evaluasi terhadap rancangan Perda Provinsi tentang RPJMD yang dilakukan oleh Menteri sebagaimana dimaksud dalam Pasal 267 ayat (1) dilaksanakan untuk menguji kesesuaian dengan RPJPD Provinsi dan RPJMN, kepentingan umum dan/atau ketentuan peraturan perundang-undangan yang lebih tinggi.\n(2) Hasil evaluasi terhadap rancangan Perda Provinsi tentang RPJMD sebagaimana dimaksud pada ayat (1) disampaikan oleh Menteri kepada Gubernur paling lama 15 (lima belas) Hari sejak rancangan Perda dimaksud diterima.\n(3) Apabila Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang RPJMD tidak sesuai dengan RPJPD provinsi dan RPJMN, kepentingan umum dan/atau ketentuan peraturan perundang-undangan yang lebih tinggi, gubernur bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari sejak hasil evaluasi diterima.\n(4) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh gubernur dan DPRD dan gubernur menetapkan rancangan Perda Provinsi tentang RPJMD menjadi Perda, Menteri membatalkan Perda dimaksud."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 270",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Evaluasi terhadap rancangan Perda Kabupaten/Kota tentang RPJPD yang dilakukan oleh gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud dalam Pasal 267 ayat (2) dilaksanakan untuk menguji kesesuaian dengan RPJPN, RPJPD provinsi dan rencana tata ruang wilayah kabupaten/kota, kepentingan umum dan/atau ketentuan peraturan perundang-undangan yang lebih tinggi.\n(2) Hasil evaluasi terhadap rancangan Perda Kabupaten/Kota tentang RPJPD sebagaimana dimaksud pada ayat (1) disampaikan oleh gubernur sebagai wakil Pemerintah Pusat kepada bupati/wali kota paling lama 15 (lima belas) Hari sejak rancangan Perda diterima.\n(3) Apabila gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi rancangan Perda Kabupaten/Kota tentang RPJPD tidak sesuai dengan RPJPN, RPJPD provinsi dan rencana tata ruang wilayah kabupaten/kota, kepentingan umum dan/atau ketentuan peraturan perundang-undangan yang lebih tinggi, bupati/wali kota bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari sejak hasil evaluasi diterima.\n(4) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh bupati/wali kota dan DPRD kabupaten/kota, dan bupati/wali kota menetapkan rancangan Perda Kabupaten/Kota tentang RPJPD menjadi Perda, gubernur sebagai wakil Pemerintah Pusat membatalkan Perda dimaksud."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 271",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Evaluasi terhadap rancangan Perda Kabupaten/Kota tentang RPJMD yang dilakukan oleh gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud dalam Pasal 267 ayat (2) dilaksanakan untuk menguji kesesuaian dengan RPJPD kabupaten/kota, RPJMD provinsi dan RPJMN, kepentingan umum dan/atau ketentuan peraturan perundang-undangan yang lebih tinggi.\n(2) Hasil evaluasi terhadap rancangan Perda Kabupaten/Kota tentang RPJMD sebagaimana dimaksud pada ayat (1) disampaikan gubernur sebagai wakil Pemerintah Pusat kepada bupati/wali kota paling lama 15 (lima belas) Hari sejak rancangan Perda diterima.\n(3) Apabila gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi rancangan Perda Kabupaten/Kota tentang RPJMD tidak sesuai dengan RPJPD kabupaten/kota, RPJMD provinsi dan RPJMN, kepentingan umum dan/atau ketentuan peraturan perundang-undangan yang lebih tinggi, bupati/wali kota bersama DPRD kabupaten/kota melakukan penyempurnaan paling lama 7 (tujuh) Hari sejak hasil evaluasi diterima.\n(4) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh bupati/wali kota dan DPRD kabupaten/kota dan bupati/wali kota menetapkan rancangan Perda Kabupaten/Kota tentang RPJMD kabupaten/kota menjadi Perda, gubernur sebagai wakil Pemerintah Pusat membatalkan Perda dimaksud."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 272",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Perangkat Daerah menyusun rencana strategis dengan berpedoman pada RPJMD.\n(2) Rencana strategis Perangkat Daerah sebagaimana dimaksud pada ayat (1) memuat tujuan, sasaran, program, dan kegiatan pembangunan dalam rangka pelaksanaan Urusan Pemerintahan Wajib dan/atau Urusan Pemerintahan Pilihan sesuai dengan tugas dan fungsi setiap Perangkat Daerah.\n(3) Pencapaian sasaran, program, dan kegiatan pembangunan dalam rencana strategis Perangkat Daerah sebagaimana dimaksud pada ayat (2) diselaraskan dengan pencapaian sasaran, program, dan kegiatan pembangunan yang ditetapkan dalam rencana strategis kementerian atau lembaga pemerintah nonkementerian untuk tercapainya sasaran pembangunan nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 273",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Rencana strategis Perangkat Daerah sebagaimana dimaksud dalam Pasal 272 ayat (1) ditetapkan dengan Perkada setelah RPJMD ditetapkan.\n(2) Rencana strategis Perangkat Daerah sebagaimana dimaksud pada ayat (1) dirumuskan ke dalam rancangan rencana kerja Perangkat Daerah dan digunakan sebagai bahan penyusunan rancangan RKPD.\n(3) Rencana kerja Perangkat Daerah sebagaimana dimaksud pada ayat (2) memuat program, kegiatan, lokasi, dan kelompok sasaran yang disertai indikator kinerja dan pendanaan sesuai dengan tugas dan fungsi setiap Perangkat Daerah.\n(4) Rencana kerja Perangkat Daerah sebagaimana dimaksud pada ayat (3) ditetapkan kepala daerah setelah RKPD ditetapkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 274",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Ketiga",
      "teks": "Perencanaan pembangunan Daerah didasarkan pada data dan informasi yang dikelola dalam sistem informasi pembangunan Daerah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Pengendalian dan Evaluasi Pembangunan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 275",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Keempat",
      "teks": "Pengendalian dan evaluasi pembangunan Daerah meliputi:\na. pengendalian terhadap perumusan kebijakan perencanaan pembangunan Daerah;\nb. pelaksanaan rencana pembangunan Daerah; dan\nc. evaluasi terhadap hasil rencana pembangunan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 276",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Menteri melakukan pengendalian dan evaluasi terhadap pembangunan Daerah provinsi.\n(2) Gubernur sebagai wakil Pemerintah Pusat melakukan pengendalian dan evaluasi terhadap pembangunan Daerah kabupaten/kota.\n(3) Gubernur melakukan pengendalian dan evaluasi pembangunan Daerah provinsi.\n(4) Bupati/wali kota melakukan pengendalian dan evaluasi terhadap pembangunan Daerah kabupaten/kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 277",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Keempat",
      "teks": "Ketentuan lebih lanjut mengenai tata cara perencanaan, pengendalian dan evaluasi pembangunan Daerah, tata cara evaluasi rancangan Perda tentang RPJPD dan RPJMD, serta tata cara perubahan RPJPD, RPJMD, dan RKPD diatur dengan peraturan Menteri."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB X",
      "teks": "Pemberian Insentif dan Kemudahan Investasi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 278",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "parent_bagian": "Bagian Kelima",
      "teks": "(1) Penyelenggara Pemerintahan Daerah melibatkan peran serta masyarakat dan sektor swasta dalam pembangunan Daerah.\n(2) Untuk mendorong peran serta masyarakat dan sektor swasta sebagaimana dimaksud pada ayat (1), penyelenggara Pemerintahan Daerah dapat memberikan insentif dan/atau kemudahan kepada masyarakat dan/atau investor yang diatur dalam Perda dengan berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "BAB",
      "label": "BAB XI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "KEUANGAN DAERAH"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Prinsip Umum Hubungan Keuangan Pemerintah Pusat dengan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 279",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Pemerintah Pusat memiliki hubungan keuangan dengan Daerah untuk membiayai penyelenggaraan Urusan Pemerintahan yang diserahkan dan/atau ditugaskan kepada Daerah.\n(2) Hubungan keuangan dalam penyelenggaraan Urusan Pemerintahan yang diserahkan kepada Daerah sebagaimana dimaksud pada ayat (1) meliputi:\na. pemberian sumber penerimaan Daerah berupa pajak daerah dan retribusi daerah;\nb. pemberian dana bersumber dari perimbangan keuangan antara Pemerintah Pusat dan Daerah;\nc. pemberian dana penyelenggaraan otonomi khusus untuk Pemerintahan Daerah tertentu yang ditetapkan dalam undang-undang; dan\nd. pemberian pinjaman dan/atau hibah, dana darurat, dan insentif (fiskal).\n(3) Hubungan keuangan dalam penyelenggaraan Urusan Pemerintahan yang ditugaskan kepada Daerah sebagaimana dimaksud pada ayat (1) disertai dengan pendanaan sesuai dengan Urusan Pemerintahan yang ditugaskan sebagai pelaksanaan dari Tugas Pembantuan.\n(4) Ketentuan lebih lanjut mengenai hubungan keuangan antara Pemerintah Pusat dan Daerah sebagaimana dimaksud pada ayat (2) dan ayat (3) diatur dengan undang-undang."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 280",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Dalam menyelenggarakan sebagian Urusan Pemerintahan yang diserahkan dan/atau ditugaskan, penyelenggara Pemerintahan Daerah mempunyai kewajiban dalam pengelolaan keuangan Daerah.\n(2) Kewajiban penyelenggara Pemerintahan Daerah dalam pengelolaan keuangan Daerah sebagaimana dimaksud pada ayat (1) meliputi:\na. mengelola dana secara efektif, efisien, transparan dan akuntabel;\nb. menyinkronkan pencapaian sasaran program Daerah dalam APBD dengan program Pemerintah Pusat; dan\nc. melaporkan realisasi pendanaan Urusan Pemerintahan yang ditugaskan sebagai pelaksanaan dari Tugas Pembantuan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Hubungan Keuangan Antar-Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 281",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Daerah dalam penyelenggaraan Urusan Pemerintahan yang diserahkan oleh Pemerintah Pusat memiliki hubungan keuangan dengan Daerah yang lain.\n(2) Hubungan keuangan sebagaimana dimaksud pada ayat (1) meliputi:\na. bagi hasil pajak dan nonpajak antar-Daerah;\nb. pendanaan Urusan Pemerintahan yang menjadi kewenangan Daerah yang menjadi tanggung jawab bersama sebagai konsekuensi dari kerja sama antar-Daerah;\nc. pinjaman dan/atau hibah antar-Daerah;\nd. bantuan keuangan antar-Daerah; dan\ne. pelaksanaan dana otonomi khusus yang ditetapkan dalam Undang-Undang."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Pendanaan Penyelenggaraan Urusan Pemerintahan di Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 282",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah didanai dari dan atas beban APBD.\n(2) Penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Pemerintah Pusat di Daerah didanai dari dan atas beban APBN.\n(3) Administrasi pendanaan penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah sebagaimana dimaksud pada ayat (1) dilakukan secara terpisah dari administrasi pendanaan penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Pemerintah Pusat sebagaimana dimaksud pada ayat (2)."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Pemegang Kekuasaan Pengelolaan Keuangan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 283",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Pengelolaan keuangan Daerah merupakan bagian yang tidak terpisahkan dari penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(2) Pengelolaan keuangan Daerah sebagaimana dimaksud pada ayat (1) dikelola secara tertib, taat pada ketentuan peraturan perundang-undangan, efisien, ekonomis, efektif, transparan, dan bertanggung jawab dengan memperhatikan rasa keadilan, kepatutan, dan manfaat untuk masyarakat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 284",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Kepala daerah adalah pemegang kekuasaan pengelolaan keuangan Daerah dan mewakili Pemerintah Daerah dalam kepemilikan kekayaan daerah yang dipisahkan.\n(2) Dalam melaksanakan kekuasaan sebagaimana dimaksud pada ayat (1), kepala daerah melimpahkan sebagian atau seluruh kekuasaannya yang berupa perencanaan, pelaksanaan, penatausahaan, pelaporan dan pertanggungjawaban, serta pengawasan keuangan Daerah kepada pejabat Perangkat Daerah.\n(3) Pelimpahan sebagian atau seluruh kekuasaan sebagaimana dimaksud pada ayat (2) didasarkan pada prinsip pemisahan kewenangan antara yang memerintahkan, menguji, dan yang menerima atau mengeluarkan uang."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kelima",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XI",
      "teks": "Pendapatan, Belanja, dan Pembiayaan"
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pendapatan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 285",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Sumber pendapatan Daerah terdiri atas:\na. pendapatan asli Daerah meliputi:\n1. pajak daerah;\n2. retribusi daerah;\n3. hasil pengelolaan kekayaan Daerah yang dipisahkan; dan\n4. lain-lain pendapatan asli Daerah yang sah;\nb. pendapatan transfer; dan\nc. lain-lain pendapatan Daerah yang sah.\n(2) Pendapatan transfer sebagaimana dimaksud pada ayat (1) huruf b meliputi:\na. transfer Pemerintah Pusat terdiri atas:\n1. dana perimbangan;\n2. dana otonomi khusus;\n3. dana keistimewaan; dan\n4. dana Desa.\nb. transfer antar-Daerah terdiri atas:\n1. pendapatan bagi hasil; dan\n2. bantuan keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 286",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pajak daerah dan retribusi daerah ditetapkan dengan undang-undang yang pelaksanaan di Daerah diatur lebih lanjut dengan Perda.\n(2) Pemerintah Daerah dilarang melakukan pungutan atau dengan sebutan lain di luar yang diatur dalam undang-undang.\n(3) Hasil pengelolaan kekayaan Daerah yang dipisahkan sebagaimana dimaksud dalam Pasal 285 ayat (1) huruf a angka 3 dan lain-lain pendapatan asli daerah yang sah sebagaimana dimaksud dalam Pasal 285 ayat (1) huruf a angka 4 ditetapkan dengan Perda dengan berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 287",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Kepala daerah yang melakukan pungutan atau dengan sebutan lain di luar yang diatur dalam undang-undang dikenai sanksi administratif berupa tidak dibayarkan hak-hak keuangannya yang diatur dalam ketentuan peraturan perundang-undangan selama 6 (enam) bulan.\n(2) Hasil pungutan atau dengan sebutan lain yang dipungut oleh kepala daerah di luar yang diatur dalam undang-undang sebagaimana dimaksud pada ayat (1) wajib disetorkan seluruhnya ke kas negara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 288",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "Dana perimbangan sebagaimana dimaksud dalam Pasal 285 ayat (2) huruf a angka 1) terdiri atas:\na. DBH;\nb. DAU; dan\nc. DAK."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 289",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) DBH sebagaimana dimaksud dalam Pasal 288 huruf a bersumber dari:\na. pajak;\nb. cukai; dan\nc. sumber daya alam.\n(2) DBH yang bersumber dari pajak sebagaimana dimaksud pada ayat (1) huruf a terdiri atas:\na. pajak bumi dan bangunan (PBB); dan\nb. PPh Pasal 25 dan Pasal 29 wajib pajak orang pribadi dalam negeri dan PPh Pasal 21.\n(3) DBH yang bersumber dari cukai sebagaimana dimaksud pada ayat (1) huruf b adalah cukai hasil tembakau sesuai dengan ketentuan peraturan perundang-undangan.\n(4) DBH yang bersumber dari sumber daya alam sebagaimana dimaksud pada ayat (1) huruf c berasal dari:\na. penerimaan kehutanan yang berasal dari iuran ijin usaha pemanfaatan hutan (IIUPH), provinsi sumber daya hutan (PSDH) dan dana reboisasi yang dihasilkan dari wilayah Daerah yang bersangkutan;\nb. penerimaan pertambangan mineral dan batubara yang berasal dari penerimaan iuran tetap (landrent) dan penerimaan iuran eksplorasi dan iuran eksploitasi (royalty) yang dihasilkan dari wilayah Daerah yang bersangkutan;\nc. penerimaan negara dari sumber daya alam pertambangan minyak bumi yang dihasilkan dari wilayah Daerah yang bersangkutan;\nd. penerimaan negara dari sumber daya alam pertambangan gas bumi yang dihasilkan dari wilayah Daerah yang bersangkutan; dan\ne. penerimaan dari panas bumi yang berasal dari penerimaan setoran bagian Pemerintah Pusat, iuran tetap, dan iuran produksi yang dihasilkan dari wilayah Daerah yang bersangkutan.\n(5) Menteri teknis menetapkan Daerah penghasil dan rencana penerimaan negara dari sumber daya alam per Daerah sebagai dasar alokasi dana bagi hasil sumber daya alam paling lambat 2 (dua) bulan sebelum tahun anggaran bersangkutan dilaksanakan.\n(6) Dalam hal sumber daya alam berada pada wilayah yang berbatasan atau berada pada lebih dari satu Daerah, menteri teknis menetapkan Daerah penghasil sumber daya alam berdasarkan pertimbangan Menteri paling lambat 60 (enam puluh) Hari setelah usulan pertimbangan dari Menteri diterima.\n(7) Daerah penghasil dan rencana penerimaan negara dari sumber daya alam per Daerah sebagaimana dimaksud pada ayat (5) disampaikan kepada Menteri yang menyelenggarakan urusan pemerintahan bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 290",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) DAU sebagaimana dimaksud dalam Pasal 288 huruf b dialokasikan dengan tujuan pemerataan kemampuan keuangan antar-Daerah untuk mendanai kebutuhan Daerah dalam rangka pelaksanaan Desentralisasi.\n(2) DAU suatu Daerah dialokasikan atas dasar celah fiskal.\n(3) Proporsi DAU antara Daerah provinsi dan kabupaten/kota ditetapkan berdasarkan pertimbangan Urusan Pemerintahan yang diserahkan kepada Daerah provinsi dan kabupaten/kota.\n(4) Celah fiskal sebagaimana dimaksud pada ayat (2) merupakan kebutuhan fiskal dikurangi dengan kapasitas fiskal Daerah.\n(5) Kebutuhan fiskal Daerah merupakan kebutuhan pendanaan Daerah untuk menyelenggarakan Urusan Pemerintahan yang menjadi kewenangan Daerah, baik Urusan Pemerintahan Wajib yang terkait Pelayanan Dasar dan tidak terkait Pelayanan Dasar maupun Urusan Pemerintahan Pilihan sebagaimana dimaksud dalam Pasal 11 ayat (1).\n(6) Kapasitas fiskal Daerah merupakan sumber pendanaan Daerah yang berasal dari pendapatan asli Daerah dan DBH.\n(7) Jumlah keseluruhan DAU ditetapkan berdasarkan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 291",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Pemerintah Pusat menetapkan kebijakan DAU dalam nota keuangan dan rancangan APBN tahun anggaran berikutnya, yang disampaikan kepada Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(2) Kebijakan DAU sebagaimana dimaksud pada ayat (1) dibahas terlebih dahulu dalam forum dewan pertimbangan otonomi daerah sebelum penyampaian nota keuangan dan rancangan APBN ke Dewan Perwakilan Rakyat Republik Indonesia dan Dewan Perwakilan Daerah Republik Indonesia.\n(3) Dalam menetapkan kebijakan DAU sebagaimana dimaksud pada ayat (1), Pemerintah Pusat mempertimbangkan Daerah yang berciri kepulauan.\n(4) Menteri yang menyelenggarakan urusan pemerintahan bidang keuangan menetapkan alokasi DAU untuk setiap Daerah provinsi dan kabupaten/kota setelah APBN ditetapkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 292",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) DAK sebagaimana dimaksud dalam Pasal 288 huruf c bersumber dari APBN dialokasikan pada Daerah untuk mendanai kegiatan khusus yang merupakan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(2) Kebijakan DAK dibahas dalam forum dewan pertimbangan otonomi daerah sebelum penetapan rencana kerja Pemerintah Pusat.\n(3) Menteri teknis/kepala lembaga pemerintah nonkementerian mengusulkan kegiatan khusus kepada kementerian yang menyelenggarakan perencanaan pembangunan nasional dan kementerian yang menyelenggarakan urusan pemerintahan bidang keuangan.\n(4) Menteri yang menyelenggarakan urusan pemerintahan bidang perencanaan pembangunan nasional mengoordinasikan usulan kegiatan khusus sebagaimana dimaksud pada ayat (3) dengan Menteri, kementerian yang menyelenggarakan urusan pemerintahan bidang keuangan, dan gubernur sebagai wakil Pemerintah Pusat untuk ditetapkan dalam rencana kerja Pemerintah Pusat sebagai kegiatan khusus yang akan didanai DAK.\n(5) Kegiatan khusus yang telah ditetapkan dalam rencana kerja Pemerintah Pusat sebagaimana dimaksud pada ayat (4) menjadi dasar pengalokasian DAK.\n(6) Alokasi DAK sebagaimana dimaksud pada ayat (5) per Daerah ditetapkan oleh kementerian yang menyelenggarakan urusan pemerintahan bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 293",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "Ketentuan lebih lanjut mengenai supervisi, pemonitoran dan pengevaluasian atas penggunaan DBH, DAU, dan DAK diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 294",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Dana otonomi khusus sebagaimana dimaksud dalam Pasal 285 ayat (2) huruf a angka 1 dialokasikan kepada Daerah yang memiliki otonomi khusus sesuai dengan ketentuan undang-undang mengenai otonomi khusus.\n(2) Dana keistimewaan sebagaimana dimaksud dalam Pasal 285 ayat (2) huruf a angka 3 dialokasikan kepada Daerah istimewa sesuai dengan ketentuan undang-undang mengenai keistimewaan.\n(3) Dana Desa sebagaimana dimaksud dalam Pasal 285 ayat (2) huruf a angka 4 dialokasikan oleh Pemerintah Pusat untuk mendanai penyelenggaraan pemerintahan, pelaksanaan pembangunan, dan pembinaan kemasyarakatan, serta pemberdayaan masyarakat Desa berdasarkan kewenangan dan kebutuhan Desa sesuai dengan ketentuan undang-undang mengenai Desa.\n(4) Pendapatan bagi hasil sebagaimana dimaksud dalam Pasal 285 ayat (2) huruf b angka 1 adalah dana yang bersumber dari pendapatan tertentu Daerah yang dialokasikan kepada Daerah lain berdasarkan angka persentase tertentu sesuai dengan ketentuan peraturan perundang-undangan.\n(5) Bantuan keuangan sebagaimana dimaksud dalam Pasal 285 ayat (2) huruf b angka 2 adalah dana yang diberikan oleh Daerah kepada Daerah lainnya baik dalam rangka kerja sama Daerah maupun untuk tujuan tertentu lainnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 295",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Lain-lain pendapatan Daerah yang sah sebagaimana dimaksud dalam Pasal 285 ayat (1) huruf c merupakan seluruh pendapatan Daerah selain pendapatan asli Daerah dan pendapatan transfer, yang meliputi hibah, dana darurat, dan lain-lain pendapatan sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Hibah sebagaimana dimaksud pada ayat (1) merupakan bantuan berupa uang, barang, dan/atau jasa yang berasal dari Pemerintah Pusat, Daerah yang lain, masyarakat, dan badan usaha dalam negeri atau luar negeri yang bertujuan untuk menunjang peningkatan penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 296",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Dana darurat dapat dialokasikan pada Daerah dalam APBN untuk mendanai keperluan mendesak yang diakibatkan oleh bencana yang tidak mampu ditanggulangi oleh Daerah dengan menggunakan sumber APBD.\n(2) Ketidakmampuan keuangan Daerah dalam menangani bencana sebagaimana dimaksud pada ayat (1) ditetapkan oleh Menteri.\n(3) Dana darurat sebagaimana dimaksud dalam pada ayat (1) diberikan pada tahap pascabencana.\n(4) Dana darurat sebagaimana dimaksud pada ayat (3) digunakan untuk mendanai perbaikan fasilitas umum untuk melayani masyarakat.\n(5) Dana darurat sebagaimana dimaksud pada ayat (1) diusulkan oleh Daerah yang mengalami bencana kepada Menteri.\n(6) Menteri mengoordinasikan usulan dana darurat kepada kementerian yang menyelenggarakan urusan pemerintahan bidang keuangan setelah berkoordinasi dengan kementerian/lembaga pemerintah nonkementerian terkait.\n(7) Alokasi dana darurat kepada Daerah sebagaimana dimaksud pada ayat (1) ditetapkan dengan peraturan menteri yang menyelenggarakan urusan pemerintahan bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 297",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 1",
      "teks": "(1) Komisi, rabat, potongan, atau penerimaan lain dengan nama dan dalam bentuk apa pun yang dapat dinilai dengan uang secara langsung sebagai akibat dari penjualan, tukar-menukar, hibah, asuransi, dan/atau pengadaan barang dan jasa termasuk penerimaan bunga, jasa giro, atau penerimaan lain sebagai akibat penyimpanan uang pada bank, penerimaan dari hasil pemanfaatan barang Daerah atau dari kegiatan lainnya merupakan pendapatan Daerah.\n(2) Semua pendapatan Daerah sebagaimana dimaksud pada ayat (1) apabila berbentuk uang harus segera disetor ke kas umum Daerah dan berbentuk barang menjadi milik Daerah yang dicatat sebagai inventaris Daerah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Belanja"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 298",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Belanja Daerah diprioritaskan untuk mendanai Urusan Pemerintahan Wajib yang terkait Pelayanan Dasar yang ditetapkan dengan standar pelayanan minimal.\n(2) Belanja Daerah sebagaimana dimaksud pada ayat (1) berpedoman pada standar teknis dan standar harga satuan regional sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Belanja Daerah untuk pendanaan Urusan Pemerintahan yang menjadi kewenangan Daerah selain sebagaimana dimaksud pada ayat (1) berpedoman pada analisis standar belanja dan standar harga satuan regional sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Belanja hibah dan bantuan sosial dianggarkan dalam APBD sesuai dengan kemampuan keuangan Daerah setelah memprioritaskan pemenuhan belanja Urusan Pemerintahan Wajib dan Urusan Pemerintahan Pilihan, kecuali ditentukan lain dalam ketentuan peraturan perundang-undangan.\n(5) Belanja hibah sebagaimana dimaksud pada ayat (4) dapat diberikan kepada:\na. Pemerintah Pusat;\nb. Pemerintah Daerah lain;\nc. badan usaha milik negara atau BUMD; dan/atau\nd. badan, lembaga, dan organisasi kemasyarakatan yang berbadan hukum Indonesia.\n(6) Belanja bagi hasil, bantuan keuangan, dan belanja untuk Desa dianggarkan dalam APBD sesuai dengan ketentuan peraturan perundang-undangan.\n(7) Belanja DAK diprioritaskan untuk mendanai kegiatan fisik dan dapat digunakan untuk kegiatan nonfisik."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 299",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 2",
      "teks": "(1) Ketentuan mengenai belanja kepala daerah dan wakil kepala daerah diatur dengan peraturan pemerintah.\n(2) Ketentuan mengenai belanja pimpinan dan anggota DPRD diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pembiayaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 300",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Daerah dapat melakukan pinjaman yang bersumber dari Pemerintah Pusat, Daerah lain, lembaga keuangan bank, lembaga keuangan bukan bank, dan masyarakat.\n(2) Kepala daerah dengan persetujuan DPRD dapat menerbitkan obligasi Daerah untuk membiayai infrastruktur dan/atau investasi yang menghasilkan penerimaan Daerah setelah memperoleh pertimbangan dari Menteri dan persetujuan dari menteri yang menyelenggarakan urusan pemerintahan bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 301",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Daerah dapat melakukan pinjaman yang berasal dari penerusan pinjaman utang luar negeri dari menteri yang menyelenggarakan urusan pemerintahan bidang keuangan setelah memperoleh pertimbangan dari Menteri.\n(2) Perjanjian penerusan pinjaman sebagaimana dimaksud pada ayat (1) dilakukan antara menteri yang menyelenggarakan urusan pemerintahan bidang keuangan dan kepala daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 302",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Ketentuan lebih lanjut mengenai pinjaman Daerah diatur dengan peraturan pemerintah.\n(2) Peraturan pemerintah sebagaimana dimaksud pada ayat (1) paling sedikit mengatur:\na. persyaratan bagi Daerah dalam melakukan pinjaman;\nb. penganggaran kewajiban pinjaman Daerah yang jatuh tempo dalam APBD;\nc. pengenaan sanksi dalam hal Daerah tidak memenuhi kewajiban membayar pinjaman;\nd. tata cara pelaporan posisi kumulatif pinjaman dan kewajiban pinjaman setiap semester dalam tahun anggaran berjalan;\ne. persyaratan penerbitan obligasi Daerah serta pembayaran bunga dan pokok obligasi; dan\nf. pengelolaan obligasi Daerah yang mencakup pengendalian risiko, penjualan dan pembelian obligasi serta pelunasan dan penganggaran dalam APBD.\n(3) Daerah tidak dapat memberikan jaminan atas pinjaman pihak lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 303",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Daerah dapat membentuk dana cadangan guna mendanai kebutuhan pembangunan prasarana dan sarana Daerah yang tidak dapat dibebankan dalam 1 (satu) tahun anggaran.\n(2) Pembentukan dana cadangan sebagaimana dimaksud pada ayat (1) ditetapkan dengan Perda.\n(3) Dana cadangan sebagaimana dimaksud pada ayat (1) bersumber dari penyisihan atas penerimaan Daerah kecuali dari DAK, pinjaman Daerah, dan penerimaan lain-lain yang penggunaannya dibatasi untuk pengeluaran tertentu.\n(4) Penggunaan dana cadangan dalam satu tahun anggaran menjadi penerimaan pembiayaan APBD dalam tahun anggaran yang bersangkutan.\n(5) Dana cadangan sebagaimana dimaksud pada ayat (1) dan ayat (2) ditempatkan dalam rekening tersendiri dalam rekening kas umum Daerah.\n(6) Dalam hal dana cadangan sebagaimana dimaksud pada ayat (1) belum digunakan sesuai dengan peruntukannya, dana tersebut dapat ditempatkan dalam portofolio yang memberikan hasil tetap dengan risiko rendah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 304",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Daerah dapat melakukan penyertaan modal pada badan usaha milik negara dan/atau BUMD.\n(2) Penyertaan modal Daerah sebagaimana dimaksud pada ayat (1) dapat ditambah, dikurangi, dijual kepada pihak lain, dan/atau dapat dialihkan kepada badan usaha milik negara dan/atau BUMD.\n(3) Penyertaan modal sebagaimana dimaksud pada ayat (1) dilaksanakan sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 305",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Dalam hal APBD diperkirakan surplus, APBD dapat digunakan untuk pengeluaran pembiayaan Daerah yang ditetapkan dalam Perda tentang APBD.\n(2) Pengeluaran pembiayaan sebagaimana dimaksud pada ayat (1) dapat digunakan untuk pembiayaan:\na. pembayaran cicilan pokok utang yang jatuh tempo;\nb. penyertaan modal Daerah;\nc. pembentukan dana cadangan; dan/atau\nd. pengeluaran pembiayaan lainnya sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Dalam hal APBD diperkirakan defisit, APBD dapat didanai dari penerimaan pembiayaan Daerah yang ditetapkan dalam Perda tentang APBD.\n(4) Penerimaan pembiayaan Daerah sebagaimana dimaksud pada ayat (3) bersumber dari:\na. sisa lebih perhitungan anggaran tahun sebelumnya;\nb. pencairan dana cadangan;\nc. hasil penjualan kekayaan Daerah yang dipisahkan;\nd. pinjaman Daerah; dan\ne. penerimaan pembiayaan lainnya sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 306",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 3",
      "teks": "(1) Menteri melakukan pengendalian atas defisit APBD provinsi dengan berdasarkan batas maksimal defisit APBD dan batas maksimal jumlah kumulatif pinjaman Daerah yang ditetapkan oleh menteri yang menyelenggarakan urusan pemerintahan bidang keuangan.\n(2) Gubernur sebagai wakil Pemerintah Pusat melakukan pengendalian atas defisit APBD kabupaten/kota dengan berdasarkan batas maksimal defisit APBD dan batas maksimal jumlah kumulatif pinjaman Daerah yang ditetapkan oleh menteri yang menyelenggarakan urusan pemerintahan bidang keuangan.\n(3) Pengendalian sebagaimana dimaksud pada ayat (1) dan ayat (2) dilakukan pada saat evaluasi terhadap rancangan Perda tentang APBD."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pengelolaan Barang Milik Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 307",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 4",
      "teks": "(1) Barang milik Daerah yang diperlukan untuk penyelenggaraan Urusan Pemerintahan tidak dapat dipindahtangankan.\n(2) Pelaksanaan pengadaan barang milik Daerah dilakukan sesuai dengan kemampuan keuangan dan kebutuhan Daerah berdasarkan prinsip efisiensi, efektivitas, dan transparansi dengan mengutamakan produk dalam negeri sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Barang milik Daerah yang tidak digunakan untuk penyelenggaraan Urusan Pemerintahan dapat dihapus dari daftar barang milik Daerah dengan cara dijual, dipertukarkan, dihibahkan, disertakan sebagai modal Daerah, dan/atau dimusnahkan sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Barang milik Daerah sebagaimana dimaksud pada ayat (1) dan ayat (3) tidak dapat dijadikan tanggungan atau digadaikan untuk mendapatkan pinjaman."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "APBD"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 308",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "Menteri menetapkan pedoman penyusunan APBD setiap tahun setelah berkoordinasi dengan menteri yang menyelenggarakan urusan pemerintahan bidang perencanaan pembangunan nasional dan menteri yang menyelenggarakan urusan pemerintahan bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 309",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "APBD merupakan dasar pengelolaan keuangan Daerah dalam masa 1 (satu) tahun anggaran sesuai dengan undang-undang mengenai keuangan negara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 310",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Kepala daerah menyusun KUA dan PPAS berdasarkan RKPD sebagaimana dimaksud dalam Pasal 265 ayat (3) dan diajukan kepada DPRD untuk dibahas bersama.\n(2) KUA serta PPAS yang telah disepakati kepala daerah bersama DPRD menjadi pedoman Perangkat Daerah dalam menyusun rencana kerja dan anggaran satuan kerja Perangkat Daerah.\n(3) Rencana kerja dan anggaran satuan kerja perangkat Daerah sebagaimana dimaksud pada ayat (2) disampaikan kepada pejabat pengelola keuangan Daerah sebagai bahan penyusunan rancangan Perda tentang APBD tahun berikutnya.\n(4) Ketentuan mengenai tata cara penyusunan rencana kerja dan anggaran, serta dokumen pelaksanaan anggaran satuan kerja Perangkat Daerah diatur dalam Perda yang berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 311",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Kepala daerah wajib mengajukan rancangan Perda tentang APBD disertai penjelasan dan dokumen-dokumen pendukungnya kepada DPRD sesuai dengan waktu yang ditentukan oleh ketentuan peraturan perundang-undangan untuk memperoleh persetujuan bersama.\n(2) Kepala daerah yang tidak mengajukan rancangan Perda tentang APBD sebagaimana dimaksud pada ayat (1) dikenai sanksi administratif berupa tidak dibayarkan hak-hak keuangannya yang diatur dalam ketentuan peraturan perundang-undangan selama 6 (enam) bulan.\n(3) Rancangan Perda sebagaimana dimaksud pada ayat (1) dibahas kepala daerah bersama DPRD dengan berpedoman pada RKPD, KUA, dan PPAS untuk mendapat persetujuan bersama.\n(4) Atas dasar persetujuan bersama DPRD dan kepala daerah sebagaimana dimaksud pada ayat (3), kepala daerah menyiapkan rancangan Perkada tentang penjabaran APBD dan rancangan dokumen pelaksanaan anggaran."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 312",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Kepala daerah dan DPRD wajib menyetujui bersama rancangan Perda tentang APBD paling lambat 1 (satu) bulan sebelum dimulainya tahun anggaran setiap tahun.\n(2) DPRD dan kepala daerah yang tidak menyetujui bersama rancangan Perda tentang APBD sebelum dimulainya tahun anggaran setiap tahun sebagaimana dimaksud ayat (1) dikenai sanksi administratif berupa tidak dibayarkan hak-hak keuangan yang diatur dalam ketentuan peraturan perundang-undangan selama 6 (enam) bulan.\n(3) Sanksi sebagaimana dimaksud pada ayat (2) tidak dapat dikenakan kepada anggota DPRD apabila keterlambatan penetapan APBD disebabkan oleh kepala daerah terlambat menyampaikan rancangan Perda tentang APBD kepada DPRD dari jadwal yang telah ditetapkan berdasarkan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 313",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Apabila kepala daerah dan DPRD tidak mengambil persetujuan bersama dalam waktu 60 (enam puluh) Hari sejak disampaikan rancangan Perda tentang APBD oleh kepala daerah kepada DPRD, kepala daerah menyusun dan menetapkan Perkada tentang APBD paling tinggi sebesar angka APBD tahun anggaran sebelumnya untuk membiayai keperluan setiap bulan.\n(2) Rancangan Perkada sebagaimana dimaksud pada ayat (1) dapat ditetapkan setelah memperoleh pengesahan dari Menteri bagi Daerah provinsi dan oleh gubernur sebagai wakil Pemerintah Pusat bagi Daerah kabupaten/kota.\n(3) Untuk memperoleh pengesahan sebagaimana dimaksud pada ayat (2), rancangan Perkada tentang APBD beserta lampirannya disampaikan paling lama 15 (lima belas) Hari terhitung sejak DPRD tidak mengambil keputusan bersama dengan kepala daerah terhadap rancangan Perda tentang APBD.\n(4) Apabila dalam batas waktu 30 (tiga puluh) Hari Menteri atau gubernur sebagai wakil Pemerintah Pusat tidak mengesahkan rancangan Perkada sebagaimana dimaksud pada ayat (3), kepala daerah menetapkan rancangan Perkada dimaksud menjadi Perkada."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 314",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Rancangan Perda Provinsi tentang APBD yang telah disetujui bersama dan rancangan peraturan gubernur tentang penjabaran APBD sebelum ditetapkan oleh gubernur, paling lama 3 (tiga) Hari, disampaikan kepada Menteri untuk dievaluasi, dilampiri RKPD, serta KUA dan PPAS yang disepakati antara kepala daerah dan DPRD.\n(2) Menteri melakukan evaluasi terhadap rancangan Perda Provinsi tentang APBD dan rancangan peraturan gubernur tentang penjabaran APBD sebagaimana dimaksud pada ayat (1).\n(3) Evaluasi sebagaimana dimaksud pada ayat (2) dilakukan untuk menguji kesesuaian rancangan Perda Provinsi tentang APBD dan rancangan peraturan gubernur tentang penjabaran APBD dengan:\na. ketentuan peraturan perundang-undangan yang lebih tinggi;\nb. kepentingan umum;\nc. RKPD serta KUA dan PPAS; dan\nd. RPJMD.\n(4) Hasil evaluasi sebagaimana dimaksud pada ayat (1) disampaikan oleh Menteri kepada gubernur paling lama 15 (lima belas) Hari terhitung sejak rancangan Perda Provinsi dan rancangan peraturan gubernur dimaksud diterima.\n(5) Dalam hal Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang APBD dan rancangan peraturan gubernur tentang penjabaran APBD sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, RKPD, KUA dan PPAS, serta RPJMD, gubernur menetapkan rancangan dimaksud menjadi Perda dan peraturan gubernur.\n(6) Dalam hal Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang APBD dan rancangan peraturan gubernur tentang penjabaran APBD tidak sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, RKPD, KUA dan PPAS, serta RPJMD, gubernur bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari terhitung sejak hasil evaluasi diterima.\n(7) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh gubernur dan DPRD dan gubernur menetapkan rancangan Perda Provinsi tentang APBD dan rancangan peraturan gubernur tentang penjabaran APBD menjadi Perda dan peraturan gubernur, Menteri membatalkan seluruh atau sebagian isi Perda dan peraturan gubernur dimaksud.\n(8) Dalam hal pembatalan dilakukan terhadap seluruh isi Perda Provinsi tentang APBD dan peraturan gubernur tentang penjabaran APBD sebagaimana dimaksud pada ayat (6), diberlakukan pagu APBD tahun sebelumnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 315",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 5",
      "teks": "(1) Rancangan Perda Kabupaten/Kota tentang APBD yang telah disetujui bersama dan rancangan peraturan bupati/wali kota tentang penjabaran APBD sebelum ditetapkan oleh bupati/wali kota, paling lama 3 (tiga) Hari disampaikan kepada gubernur sebagai wakil Pemerintah Pusat untuk dievaluasi, dilampiri RKPD, KUA dan PPAS yang disepakati antara kepala daerah dan DPRD.\n(2) Gubernur sebagai wakil Pemerintah Pusat melakukan evaluasi terhadap rancangan Perda Kabupaten/Kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD sebagaimana dimaksud pada ayat (1).\n(3) Evaluasi sebagaimana dimaksud pada ayat (2) dilakukan untuk menguji kesesuaian rancangan Perda Kabupaten/Kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD dengan:\na. ketentuan peraturan perundang-undangan yang lebih tinggi;\nb. kepentingan umum;\nc. RKPD serta KUA dan PPAS; dan\nd. RPJMD.\n(4) Hasil evaluasi disampaikan oleh gubernur sebagai wakil Pemerintah Pusat kepada bupati/wali kota paling lama 15 (lima belas) Hari terhitung sejak rancangan Perda Kabupaten/Kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD sebagaimana dimaksud pada ayat (1) diterima.\n(5) Dalam hal gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi rancangan Perda Kabupaten/Kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, RKPD, KUA dan PPAS, serta RPJMD, bupati/wali kota menetapkan rancangan dimaksud menjadi Perda dan peraturan bupati/wali kota.\n(6) Dalam hal gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi Rancangan Perda Kabupaten/Kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD tidak sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi, kepentingan umum, RKPD, KUA dan PPAS, serta RPJMD, bupati/wali kota bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari sejak hasil evaluasi diterima.\n(7) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh bupati/wali kota dan DPRD, dan bupati/wali kota menetapkan rancangan Perda Kabupaten/Kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD menjadi Perda dan peraturan bupati/wali kota, gubernur sebagai wakil Pemerintah Pusat membatalkan seluruh atau sebagian isi Perda Kabupaten/Kota dan peraturan bupati/wali kota dimaksud.\n(8) Dalam hal pembatalan dilakukan terhadap seluruh isi Perda Kabupaten/Kota tentang APBD dan peraturan bupati/wali kota tentang penjabaran APBD sebagaimana dimaksud pada ayat (6), diberlakukan pagu APBD tahun sebelumnya.\n(9) Gubernur sebagai wakil Pemerintah Pusat menyampaikan hasil evaluasi rancangan perda kabupaten/kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD kepada Menteri paling lama 3 (tiga) Hari sejak ditetapkannya keputusan gubernur tentang hasil evaluasi rancangan Perda Kabupaten/Kota tentang APBD dan rancangan peraturan bupati/wali kota tentang penjabaran APBD."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Perubahan APBD"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 316",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 6",
      "teks": "(1) Perubahan APBD dapat dilakukan jika terjadi:\na. perkembangan yang tidak sesuai dengan asumsi KUA;\nb. keadaan yang menyebabkan harus dilakukan pergeseran anggaran antarunit organisasi, antarkegiatan, dan antarjenis belanja;\nc. keadaan yang menyebabkan sisa lebih perhitungan anggaran tahun sebelumnya harus digunakan untuk pembiayaan dalam tahun anggaran berjalan;\nd. keadaan darurat; dan/atau\ne. keadaan luar biasa.\n(2) Perubahan APBD hanya dapat dilakukan 1 (satu) kali dalam 1 (satu) tahun anggaran, kecuali dalam keadaan luar biasa.\n(3) Keadaan luar biasa sebagaimana dimaksud pada ayat (2) merupakan keadaan yang menyebabkan estimasi penerimaan dan/atau pengeluaran dalam APBD mengalami kenaikan atau penurunan lebih besar dari 50% (lima puluh) persen."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 317",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 6",
      "teks": "(1) Kepala daerah mengajukan rancangan Perda tentang perubahan APBD sebagaimana dimaksud dalam Pasal 316 ayat (1) disertai penjelasan dan dokumen pendukung kepada DPRD untuk memperoleh persetujuan bersama.\n(2) Pengambilan keputusan mengenai rancangan Perda tentang perubahan APBD sebagaimana dimaksud pada ayat (1) dilakukan oleh DPRD bersama kepala daerah paling lambat 3 (tiga) bulan sebelum tahun anggaran yang bersangkutan berakhir.\n(3) Apabila DPRD sampai batas waktu sebagaimana dimaksud pada ayat (2) tidak mengambil keputusan bersama dengan kepala daerah terhadap rancangan Perda tentang perubahan APBD, kepala daerah melaksanakan pengeluaran yang dianggarkan dalam APBD tahun anggaran berjalan.\n(4) Penetapan rancangan Perda tentang perubahan APBD dilakukan setelah ditetapkannya Perda tentang pertanggungjawaban pelaksanaan APBD tahun sebelumnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 318",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 6",
      "teks": "Perkada tentang penjabaran APBD dan Perkada tentang penjabaran perubahan APBD dijadikan dasar penetapan dokumen pelaksanaan anggaran satuan kerja Perangkat Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 319",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 6",
      "teks": "Ketentuan mengenai evaluasi rancangan Perda tentang APBD dan rancangan Perkada tentang penjabaran APBD sebagaimana dimaksud dalam Pasal 314 dan Pasal 315 berlaku secara mutatis mutandis terhadap evaluasi rancangan Perda tentang perubahan APBD dan rancangan perkada tentang penjabaran perubahan APBD."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pertanggungjawaban Pelaksanaan APBD"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 320",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 7",
      "teks": "(1) Kepala daerah menyampaikan rancangan Perda tentang pertanggungjawaban pelaksanaan APBD kepada DPRD dengan dilampiri laporan keuangan yang telah diperiksa oleh Badan Pemeriksa Keuangan paling lambat 6 (enam) bulan setelah tahun anggaran berakhir.\n(2) Laporan keuangan sebagaimana dimaksud pada ayat (1) paling sedikit meliputi:\na. laporan realisasi anggaran;\nb. laporan perubahan saldo anggaran lebih;\nc. neraca;\nd. laporan operasional;\ne. laporan arus kas;\nf. laporan perubahan ekuitas; dan\ng. catatan atas laporan keuangan yang dilampiri dengan ikhtisar laporan keuangan BUMD.\n(3) Penyajian laporan keuangan sebagaimana dimaksud pada ayat (2) dilakukan sesuai dengan standar akuntansi pemerintahan.\n(4) Rancangan Perda tentang pertanggungjawaban pelaksanaan APBD sebagaimana dimaksud pada ayat (1) dibahas kepala daerah bersama DPRD untuk mendapat persetujuan bersama.\n(5) Persetujuan bersama rancangan Perda sebagaimana dimaksud pada ayat (4) dilakukan paling lambat 7 (tujuh) bulan setelah tahun anggaran berakhir.\n(6) Atas dasar persetujuan bersama sebagaimana dimaksud pada ayat (5), kepala daerah menyiapkan rancangan Perkada tentang penjabaran pertanggungjawaban pelaksanaan APBD."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 321",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 7",
      "teks": "(1) Rancangan Perda Provinsi tentang pertanggungjawaban pelaksanaan APBD yang telah disetujui bersama DPRD dan rancangan peraturan gubernur tentang penjabaran pertanggungjawaban pelaksanaan APBD sebelum ditetapkan oleh gubernur paling lama 3 (tiga) Hari disampaikan kepada Menteri untuk dievaluasi.\n(2) Menteri melakukan evaluasi terhadap rancangan Perda Provinsi tentang pertanggungjawaban pelaksanaan APBD dan rancangan peraturan gubernur tentang penjabaran pertanggungjawaban pelaksanaan APBD sebagaimana dimaksud pada ayat (1) untuk menguji kesesuaiannya dengan Perda Provinsi tentang APBD dan/atau Perda Provinsi tentang perubahan APBD, peraturan gubernur tentang penjabaran APBD dan/atau peraturan gubernur tentang penjabaran perubahan APBD serta temuan laporan hasil pemeriksaan Badan Pemeriksa Keuangan.\n(3) Hasil evaluasi sebagaimana dimaksud pada ayat (2) disampaikan oleh Menteri kepada gubernur paling lama 15 (lima belas) Hari terhitung sejak rancangan Perda Provinsi dimaksud diterima.\n(4) Dalam hal Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang pertanggungjawaban pelaksanaan APBD sudah sesuai dengan Perda Provinsi tentang APBD dan/atau Perda Provinsi tentang perubahan APBD dan telah menindaklanjuti temuan laporan hasil pemeriksaan Badan Pemeriksa Keuangan, gubernur menetapkan rancangan Perda Provinsi dimaksud menjadi Perda Provinsi.\n(5) Dalam hal Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang pertanggungjawaban pelaksanaan APBD bertentangan dengan Perda Provinsi tentang APBD dan/atau Perda Provinsi tentang perubahan APBD dan tidak menindaklanjuti temuan laporan hasil pemeriksaan Badan Pemeriksa Keuangan, gubernur bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari terhitung sejak hasil evaluasi diterima.\n(6) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh gubernur dan DPRD, dan gubernur menetapkan rancangan Perda Provinsi tentang pertanggungjawaban pelaksanaan APBD menjadi Perda, Menteri membatalkan seluruh atau sebagian isi Perda Provinsi dimaksud."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 322",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 7",
      "teks": "(1) Rancangan Perda Kabupaten/Kota tentang pertanggungjawaban pelaksanaan APBD yang telah disetujui bersama dan rancangan peraturan bupati/wali kota tentang penjabaran pertanggungjawaban pelaksanaan APBD sebelum ditetapkan oleh bupati/wali kota paling lama 3 (tiga) Hari disampaikan kepada gubernur sebagai wakil Pemerintah Pusat untuk dievaluasi.\n(2) Gubernur sebagai wakil Pemerintah Pusat melakukan evaluasi terhadap rancangan Perda Kabupaten/Kota tentang pertanggungjawaban pelaksanaan APBD dan rancangan peraturan bupati/wali kota tentang penjabaran pertanggungjawaban pelaksanaan APBD sebagaimana dimaksud pada ayat (1) untuk menguji kesesuaiannya dengan Perda Kabupaten/Kota tentang APBD dan/atau Perda Kabupaten/Kota tentang perubahan APBD, peraturan bupati/wali kota tentang penjabaran APBD dan/atau peraturan bupati/wali kota tentang penjabaran perubahan APBD serta temuan laporan hasil pemeriksaan Badan Pemeriksa Keuangan.\n(3) Hasil evaluasi disampaikan oleh gubernur sebagai wakil Pemerintah Pusat kepada bupati/wali kota paling lama 15 (lima belas) Hari terhitung sejak diterimanya rancangan Perda Kabupaten/Kota dan rancangan peraturan bupati/wali kota tentang penjabaran pertanggungjawaban pelaksanaan APBD sebagaimana dimaksud pada ayat (1).\n(4) Dalam hal gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi rancangan Perda Kabupaten/Kota tentang pertanggungjawaban pelaksanaan APBD sudah sesuai dengan Perda Kabupaten/Kota tentang APBD dan/atau Perda Kabupaten/Kota tentang perubahan APBD dan telah menindaklanjuti temuan laporan hasil pemeriksaan Badan Pemeriksa Keuangan, bupati/wali kota menetapkan rancangan Perda Kabupaten/Kota dimaksud menjadi Perda Kabupaten/Kota.\n(5) Dalam hal gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi rancangan Perda Kabupaten/Kota tentang pertanggungjawaban pelaksanaan APBD bertentangan dengan Perda tentang APBD dan/atau Perda Kabupaten/Kota tentang perubahan APBD serta tidak menindaklanjuti temuan laporan hasil pemeriksaan Badan Pemeriksa Keuangan, bupati/wali kota bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari terhitung sejak hasil evaluasi diterima.\n(6) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh bupati/wali kota dan DPRD, dan bupati/wali kota menetapkan rancangan Perda Kabupaten/Kota tentang pertanggungjawaban pelaksanaan APBD menjadi Perda Kabupaten/Kota, gubernur sebagai wakil Pemerintah Pusat membatalkan seluruh atau sebagian isi Perda Kabupaten/Kota dimaksud."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 323",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 7",
      "teks": "(1) Apabila dalam waktu 1 (satu) bulan sejak diterimanya rancangan Perda tentang pertanggungjawaban pelaksanaan APBD dari kepala daerah, DPRD tidak mengambil keputusan bersama dengan kepala daerah terhadap rancangan Perda tentang pertanggungjawaban pelaksanaan APBD, kepala daerah menyusun dan menetapkan Perkada tentang pertanggungjawaban pelaksanaan APBD.\n(2) Rancangan Perkada sebagaimana dimaksud pada ayat (1) ditetapkan setelah memperoleh pengesahan dari Menteri bagi Daerah provinsi dan gubernur sebagai wakil Pemerintah Pusat bagi Daerah kabupaten/kota.\n(3) Untuk memperoleh pengesahan sebagaimana dimaksud pada ayat (2), Rancangan Perkada tentang pertanggungjawaban pelaksanaan APBD beserta lampirannya disampaikan paling lama 7 (tujuh) Hari terhitung sejak DPRD tidak mengambil keputusan bersama dengan kepala daerah terhadap rancangan Perda tentang pertanggungjawaban pelaksanaan APBD.\n(4) Apabila dalam batas waktu 15 (lima belas) Hari Menteri atau gubernur sebagai wakil Pemerintah Pusat tidak mengesahkan rancangan Perkada sebagaimana dimaksud pada ayat (3), kepala daerah menetapkan rancangan Perkada dimaksud menjadi Perkada."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Evaluasi Rancangan Perda Tentang Pajak Daerah Dan Retribusi Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 324",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 8",
      "teks": "(1) Rancangan Perda Provinsi tentang pajak daerah dan retribusi daerah yang telah disetujui bersama sebelum ditetapkan oleh gubernur paling lama 3 (tiga) Hari disampaikan kepada Menteri untuk dievaluasi.\n(2) Menteri melakukan evaluasi terhadap rancangan Perda Provinsi tentang pajak daerah dan retribusi daerah sebagaimana dimaksud pada ayat (1) untuk menguji kesesuaiannya dengan ketentuan peraturan perundang-undangan yang lebih tinggi dan kepentingan umum.\n(3) Hasil evaluasi sebagaimana dimaksud pada ayat (1) disampaikan oleh Menteri kepada gubernur paling lama 15 (lima belas) Hari terhitung sejak rancangan Perda Provinsi dimaksud diterima.\n(4) Dalam hal Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang pajak daerah dan retribusi daerah sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi dan/atau kepentingan umum, gubernur menetapkan rancangan Perda Provinsi dimaksud menjadi Perda Provinsi.\n(5) Dalam hal Menteri menyatakan hasil evaluasi rancangan Perda Provinsi tentang pajak daerah dan retribusi daerah tidak sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi dan/atau kepentingan umum, gubernur bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari terhitung sejak hasil evaluasi diterima.\n(6) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh gubernur dan DPRD, dan gubernur menetapkan rancangan Perda Provinsi tentang pajak daerah dan retribusi daerah menjadi Perda, Menteri membatalkan seluruh atau sebagian isi Perda Provinsi dimaksud.\n(7) Menteri dalam melakukan evaluasi rancangan Perda Provinsi tentang pajak daerah dan retribusi daerah berkoordinasi dengan menteri yang menyelenggarakan urusan pemerintahan bidang keuangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 325",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 8",
      "teks": "(1) Rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah yang telah disetujui bersama sebelum ditetapkan oleh bupati/wali kota, paling lama 3 (tiga) Hari disampaikan kepada gubernur sebagai wakil Pemerintah Pusat untuk dievaluasi.\n(2) Gubernur sebagai wakil Pemerintah Pusat melakukan evaluasi terhadap rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah sebagaimana dimaksud pada ayat (1) untuk menguji kesesuaiannya dengan ketentuan peraturan perundang-undangan yang lebih tinggi dan kepentingan umum.\n(3) Dalam melakukan evaluasi rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah sebagaimana dimaksud pada ayat (2), gubernur sebagai wakil Pemerintah Pusat berkonsultasi dengan Menteri dan selanjutnya Menteri berkoordinasi dengan menteri yang menyelenggarakan urusan pemerintahan bidang keuangan.\n(4) Hasil evaluasi disampaikan oleh gubernur sebagai wakil Pemerintah Pusat kepada bupati/wali kota paling lama 15 (lima belas) Hari terhitung sejak rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah sebagaimana dimaksud pada ayat (1) diterima.\n(5) Dalam hal gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi dan kepentingan umum, bupati/wali kota menetapkan rancangan dimaksud menjadi Perda Kabupaten/Kota.\n(6) Dalam hal gubernur sebagai wakil Pemerintah Pusat menyatakan hasil evaluasi rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah tidak sesuai dengan ketentuan peraturan perundang-undangan yang lebih tinggi dan/atau kepentingan umum, bupati/wali kota bersama DPRD melakukan penyempurnaan paling lama 7 (tujuh) Hari sejak hasil evaluasi diterima.\n(7) Dalam hal hasil evaluasi tidak ditindaklanjuti oleh bupati/wali kota dan DPRD, dan bupati/wali kota menetapkan rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah menjadi Perda Kabupaten/Kota, gubernur sebagai wakil Pemerintah Pusat membatalkan seluruh atau sebagian isi Perda Kabupaten/Kota dimaksud.\n(8) Gubernur sebagai wakil Pemerintah Pusat menyampaikan hasil evaluasi rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah kepada Menteri dan menteri yang menyelenggarakan urusan pemerintahan bidang keuangan paling lama 3 (tiga) Hari sejak ditetapkannya keputusan gubernur tentang hasil evaluasi rancangan Perda Kabupaten/Kota tentang pajak daerah dan retribusi daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 326",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 8",
      "teks": "Ketentuan lebih lanjut mengenai tata cara evaluasi rancangan Perda tentang APBD, rancangan Perda tentang perubahan APBD, rancangan Perda tentang pertanggungjawaban pelaksanaan APBD, rancangan Perkada tentang penjabaran APBD, rancangan Perkada tentang penjabaran perubahan APBD, dan rancangan Perkada tentang penjabaran pertanggungjawaban pelaksanaan APBD, serta rancangan Perda tentang pajak daerah dan rancangan Perda tentang retribusi daerah diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAF",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "teks": "Pelaksanaan Tata Usaha Keuangan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 327",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 9",
      "teks": "(1) Semua penerimaan dan pengeluaran Daerah dianggarkan dalam APBD dan dilakukan melalui rekening kas umum Daerah yang dikelola oleh bendahara umum Daerah.\n(2) Dalam hal penerimaan dan pengeluaran Daerah sebagaimana dimaksud ayat (1) tidak dilakukan melalui rekening kas umum Daerah sesuai dengan ketentuan peraturan perundang-undangan, dilakukan pencatatan dan pengesahan oleh bendahara umum Daerah.\n(3) Setiap pengeluaran atas beban APBD diterbitkan dokumen pelaksanaan anggaran dan surat penyediaan dana atau dokumen lain yang dipersamakan dengan surat penyediaan dana oleh pejabat pengelola keuangan Daerah selaku bendahara umum Daerah.\n(4) Pengeluaran tidak dapat dibebankan pada anggaran belanja Daerah jika anggaran untuk pengeluaran tersebut tidak tersedia atau tidak cukup tersedia dalam APBD.\n(5) Kepala Daerah, dan Perangkat Daerah dilarang melakukan pengeluaran atas beban anggaran belanja Daerah untuk tujuan lain dari yang telah ditetapkan dalam APBD."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 328",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 9",
      "teks": "(1) Dalam rangka manajemen kas, Pemerintah Daerah dapat mendepositokan dan/atau melakukan investasi jangka pendek uang milik Daerah yang sementara belum digunakan sepanjang tidak mengganggu likuiditas keuangan Daerah, tugas Daerah, dan kualitas pelayanan publik.\n(2) Bunga deposito, bunga atas penempatan uang di bank, jasa giro, dan/atau bunga atas investasi jangka pendek merupakan pendapatan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 329",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 9",
      "teks": "Kepala daerah dan DPRD dapat menetapkan Perda tentang:\na. penghapusan tagihan Daerah sebagian atau seluruhnya; dan\nb. penyelesaian masalah perdata."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 330",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "parent_bagian": "Bagian Kelima",
      "parent_paragraf": "Paragraf 9",
      "teks": "Ketentuan lebih lanjut mengenai penyusunan, pelaksanaan, penatausahaan, pelaporan, pengawasan dan pertanggungjawaban keuangan Daerah diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BUMD"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XII",
      "teks": "Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 331",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Daerah dapat mendirikan BUMD\n(2) Pendirian BUMD sebagaimana dimaksud pada ayat (1) ditetapkan dengan Perda.\n(3) BUMD sebagaimana dimaksud pada ayat (1) terdiri atas perusahaan umum Daerah dan perusahaan perseroan Daerah.\n(4) Pendirian BUMD sebagaimana dimaksud pada ayat (1) bertujuan untuk:\na. memberikan manfaat bagi perkembangan perekonomian Daerah pada umumnya;\nb. menyelenggarakan kemanfaatan umum berupa penyediaan barang dan/atau jasa yang bermutu bagi pemenuhan hajat hidup masyarakat sesuai kondisi, karakteristik dan potensi Daerah yang bersangkutan berdasarkan tata kelola perusahaan yang baik; dan\nc. memperoleh laba dan/atau keuntungan.\n(5) Pendirian BUMD sebagaimana dimaksud pada ayat (1) didasarkan pada:\na. kebutuhan Daerah; dan\nb. kelayakan bidang usaha BUMD yang akan dibentuk.\n(6) Ketentuan lebih lanjut mengenai pendirian BUMD sebagaimana dimaksud pada ayat (1) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 332",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Sumber Modal BUMD terdiri atas:\na. penyertaan modal Daerah;\nb. pinjaman;\nc. hibah; dan\nd. sumber modal lainnya.\n(2) Sumber modal lainnya sebagaimana dimaksud pada ayat (1) huruf d adalah:\na. kapitalisasi cadangan;\nb. keuntungan revaluasi aset; dan\nc. agio saham."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 333",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Penyertaan modal Daerah sebagaimana dimaksud dalam Pasal 332 ayat (1) huruf a ditetapkan dengan Perda.\n(2) Penyertaan modal Daerah dapat dilakukan untuk pembentukan BUMD dan penambahan modal BUMD.\n(3) Penyertaan modal Daerah dapat berupa uang dan barang milik Daerah.\n(4) Barang milik Daerah sebagaimana dimaksud pada ayat (3) dinilai sesuai nilai riil pada saat barang milik Daerah akan dijadikan penyertaan modal.\n(5) Nilai riil sebagaimana dimaksud pada ayat (4) diperoleh dengan melakukan penafsiran harga barang milik Daerah sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XII",
      "teks": "Perusahaan Umum Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 334",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Perusahaan umum Daerah adalah BUMD yang seluruh modalnya dimiliki oleh satu Daerah dan tidak terbagi atas saham.\n(2) Dalam hal perusahaan umum Daerah akan dimiliki oleh lebih dari satu Daerah, perusahaan umum Daerah tersebut harus merubah bentuk hukum menjadi perusahaan perseroan Daerah.\n(3) Perusahaan umum Daerah dapat membentuk anak perusahaan dan/atau memiliki saham pada perusahaan lain."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 335",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Organ perusahaan umum Daerah terdiri atas kepala daerah selaku wakil Daerah sebagai pemilik modal, direksi dan dewan pengawas.\n(2) Ketentuan lebih lanjut mengenai organ perusahaan umum Daerah diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 336",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Laba perusahaan umum Daerah ditetapkan oleh kepala daerah selaku wakil daerah sebagai pemilik modal sesuai dengan ketentuan anggaran dasar dan ketentuan peraturan perundang-undangan.\n(2) Laba perusahaan umum Daerah yang menjadi hak Daerah disetor ke kas Daerah setelah disahkan oleh kepala daerah selaku wakil Daerah sebagai pemilik modal.\n(3) Laba perusahaan umum Daerah sebagaimana dimaksud pada ayat (2) dapat ditahan atas persetujuan kepala daerah selaku wakil Daerah sebagai pemilik modal.\n(4) Laba perusahaan umum Daerah sebagaimana dimaksud pada ayat (3) digunakan untuk keperluan investasi kembali (reinvestment) berupa penambahan, peningkatan dan perluasan prasarana dan sarana pelayanan fisik dan nonfisik serta untuk peningkatan kuantitas, kualitas dan kontinuitas pelayanan umum, pelayanan dasar dan usaha perintisan.\n(5) Ketentuan lebih lanjut pada mengenai laba perusahaan umum Daerah diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 337",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Perusahaan umum Daerah dapat melakukan restrukturisasi untuk menyehatkan perusahaan umum Daerah agar dapat beroperasi secara efisien, akuntabel, transparan, dan profesional.\n(2) Ketentuan lebih lanjut mengenai restrukturisasi perusahaan umum Daerah sebagaimana dimaksud pada ayat (1) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 338",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Perusahaan umum Daerah dapat dibubarkan.\n(2) Pembubaran perusahaan umum Daerah ditetapkan dengan Perda.\n(3) Kekayaan perusahaan umum Daerah yang telah dibubarkan dan menjadi hak Daerah dikembalikan kepada Daerah.\n(4) Ketentuan lebih lanjut mengenai pembubaran perusahaan umum Daerah diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XII",
      "teks": "Perusahaan Perseroan Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 339",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Perusahaan Perseroan Daerah adalah BUMD yang berbentuk perseroan terbatas yang modalnya terbagi dalam saham yang seluruhnya atau paling sedikit 51% (lima puluh satu persen) sahamnya dimiliki oleh satu Daerah.\n(2) Perusahaan perseroan Daerah setelah ditetapkan dengan Perda sebagaimana dimaksud dalam Pasal 331 ayat (2), pembentukan badan hukumnya dilakukan berdasarkan ketentuan peraturan perundang-undangan mengenai perseroan terbatas.\n(3) Dalam hal pemegang saham perusahaan perseroan Daerah terdiri atas beberapa Daerah dan bukan Daerah, salah satu Daerah merupakan pemegang saham mayoritas."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 340",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Organ perusahaan perseroan Daerah terdiri atas rapat umum pemegang saham, direksi, dan komisaris.\n(2) Ketentuan lebih lanjut mengenai organ perusahaan perseroan Daerah diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 341",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Perusahaan perseroan Daerah dapat membentuk anak perusahaan dan/atau memiliki saham pada perusahaan lain.\n(2) Pembentukan anak perusahaan sebagaimana dimaksud pada ayat (1), didasarkan atas analisa kelayakan investasi oleh analis investasi yang profesional dan independen."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 342",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Ketiga",
      "teks": "(1) Perusahaan perseroan Daerah dapat dibubarkan.\n(2) Kekayaan Daerah hasil pembubaran perusahaan perseroan Daerah yang menjadi hak Daerah dikembalikan kepada Daerah.\n(3) Ketentuan lebih lanjut mengenai pembubaran perusahaan perseroan Daerah diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Keempat",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XII",
      "teks": "Pengelolaan BUMD"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 343",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "parent_bagian": "Bagian Keempat",
      "teks": "(1) Pengelolaan BUMD paling sedikit harus memenuhi unsur:\na. tata cara penyertaan modal;\nb. organ dan kepegawaian;\nc. tata cara evaluasi;\nd. tata kelola perusahaan yang baik;\ne. perencanaan, pelaporan, pembinaan, pengawasan;\nf. kerjasama;\ng. penggunaan laba;\nh. penugasan Pemerintah Daerah;\ni. pinjaman;\nj. satuan pengawas intern, komite audit dan komite lainnya;\nk. penilaian tingkat kesehatan, restrukturisasi, privatisasi;\n1. perubahan bentuk hukum;\nm. kepailitan; dan\nn. penggabungan, peleburan, dan pengambilalihan.\n(2) Ketentuan lebih lanjut mengenai pengelolaan BUMD sebagaimana dimaksud pada ayat (1) diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "PELAYANAN PUBLIK"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XIII",
      "teks": "Asas Penyelenggaraan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 344",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Pemerintah Daerah wajib menjamin terselenggaranya pelayanan publik berdasarkan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(2) Pelayanan publik diselenggarakan berdasarkan pada asas:\na. kepentingan umum;\nb. kepastian hukum;\nc. kesamaan hak;\nd. keseimbangan hak dan kewajiban;\ne. keprofesionalan;\nf. partisipatif;\ng. persamaan perlakuan/tidak diskriminatif;\nh. keterbukaan;\ni. akuntabilitas;\nj. fasilitas dan perlakuan khusus bagi kelompok rentan;\nk. ketepatan waktu; dan\n1. kecepatan, kemudahan, dan keterjangkauan."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XIII",
      "teks": "Manajemen Pelayanan Publik"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 345",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pemerintah Daerah wajib membangun manajemen pelayanan publik dengan mengacu pada asas-asas pelayanan publik sebagaimana dimaksud dalam Pasal 344 ayat (2).\n(2) Manajemen pelayanan publik sebagaimana dimaksud pada ayat (1) meliputi:\na. pelaksanaan pelayanan;\nb. pengelolaan pengaduan masyarakat;\nc. pengelolaan informasi;\nd. pengawasan internal;\ne. penyuluhan kepada masyarakat;\nf. pelayanan konsultasi; dan\ng. pelayanan publik lainnya sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Dalam melaksanakan manajemen pelayanan publik sebagaimana dimaksud pada ayat (2), Pemerintah Daerah dapat membentuk forum komunikasi antara Pemerintah Daerah dengan masyarakat dan pemangku kepentingan terkait."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 346",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "Daerah dapat membentuk Badan Layanan Umum Daerah dalam rangka meningkatkan pelayanan kepada masyarakat dengan berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 347",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pemerintah Daerah wajib mengumumkan informasi pelayanan publik sebagaimana dimaksud dalam Pasal 345 ayat (2) huruf c kepada masyarakat melalui media dan tempat yang dapat diakses oleh masyarakat luas.\n(2) Informasi pelayanan publik sebagaimana dimaksud pada ayat (1) dituangkan dalam bentuk maklumat pelayanan publik Pemerintah Daerah kepada masyarakat.\n(3) Maklumat pelayanan publik sebagaimana dimaksud pada ayat (2) paling sedikit memuat:\na. jenis pelayanan yang disediakan;\nb. syarat, prosedur, biaya dan waktu;\nc. hak dan kewajiban Pemerintah Daerah dan warga masyarakat; dan\nd. satuan kerja atau unit kerja penanggungjawab penyelenggaraan pelayanan.\n(4) Maklumat pelayanan publik sebagaimana dimaksud pada ayat (2) ditandatangani oleh kepala daerah dan dipublikasikan secara luas kepada masyarakat.\n(5) Maklumat pelayanan publik sebagaimana dimaksud pada ayat (2) menjadi dasar Pemerintah Daerah dalam menyelenggarakan pelayanan publik."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 348",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Kepala daerah yang tidak mengumumkan informasi tentang pelayanan publik sebagaimana dimaksud dalam Pasal 347 ayat (1), dikenai sanksi administratif berupa teguran tertulis oleh Menteri untuk gubernur dan oleh gubernur sebagai wakil Pemerintah Pusat untuk bupati/wali kota.\n(2) Dalam hal teguran tertulis sebagaimana dimaksud pada ayat (1) telah disampaikan 2 (dua) kali berturut-turut dan tetap tidak dilaksanakan, kepala daerah diwajibkan mengikuti program pembinaan khusus pendalaman bidang pemerintahan yang dilaksanakan oleh Kementerian serta tugas dan kewenangannya dilaksanakan oleh wakil kepala daerah atau pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 349",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Daerah dapat melakukan penyederhanaan jenis dan prosedur pelayanan publik untuk meningkatkan mutu pelayanan dan daya saing Daerah.\n(2) Penyederhanaan sebagaimana dimaksud pada ayat (1) ditetapkan dengan Perda.\n(3) Pemerintah Daerah dapat memanfaatkan teknologi informasi dan komunikasi dalam penyelenggaraan pelayanan publik."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 350",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Kepala daerah wajib memberikan pelayanan perizinan sesuai dengan ketentuan peraturan perundang-undangan.\n(2) Dalam memberikan pelayanan perizinan sebagaimana dimaksud pada ayat (1) Daerah membentuk unit pelayanan terpadu satu pintu.\n(3) Pembentukan unit pelayanan terpadu satu pintu sebagaimana yang dimaksudkan pada ayat (2) berpedoman pada ketentuan peraturan perundang-undangan.\n(4) Kepala daerah yang tidak memberikan pelayanan perizinan sebagaimana dimaksud pada ayat (1) dikenai sanksi administratif.\n(5) Sanksi administratif sebagaimana dimaksud pada ayat (4) berupa teguran tertulis kepada gubernur oleh Menteri dan kepada bupati/wali kota oleh gubernur sebagai wakil Pemerintah Pusat untuk pelanggaran yang bersifat administrasi.\n(6) Dalam hal teguran tertulis sebagaimana dimaksud pada ayat (5) telah disampaikan 2 (dua) kali berturut-turut dan tetap tidak dilaksanakan oleh kepala daerah, Menteri mengambil alih pemberian izin yang menjadi kewenangan gubernur dan gubernur sebagai wakil Pemerintah Pusat mengambil alih pemberian izin yang menjadi kewenangan bupati/wali kota."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 351",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Masyarakat berhak mengadukan penyelenggaraan pelayanan publik kepada Pemerintah Daerah, Ombudsman, dan/atau DPRD.\n(2) Pengaduan sebagaimana dimaksud pada ayat (1) dilakukan terhadap:\na. penyelenggara yang tidak melaksanakan kewajiban dan/atau melanggar larangan sebagaimana dimaksud dalam ketentuan peraturan perundang-undangan mengenai pelayanan publik; dan\nb. pelaksana yang memberi pelayanan yang tidak sesuai dengan standar pelayanan sebagaimana dimaksud dalam ketentuan peraturan perundang-undangan mengenai pelayanan publik.\n(3) Mekanisme dan tata cara penyampaian pengaduan sebagaimana dimaksud pada ayat (1) sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Kepala daerah wajib melaksanakan rekomendasi Ombudsman sebagai tindak lanjut pengaduan masyarakat sebagaimana dimaksud pada ayat (1).\n(5) Kepala daerah yang tidak melaksanakan rekomendasi Ombudsman sebagai tindak lanjut pengaduan masyarakat sebagaimana dimaksud pada ayat (4) diberikan sanksi berupa pembinaan khusus pendalaman bidang pemerintahan yang dilaksanakan oleh Kementerian serta tugas dan kewenangannya dilaksanakan oleh wakil kepala daerah atau pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 352",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Menteri melakukan evaluasi kinerja pelayanan publik yang dilaksanakan oleh Pemerintah Daerah provinsi.\n(2) Gubernur sebagai wakil Pemerintah Pusat melakukan evaluasi kinerja pelayanan publik yang dilaksanakan oleh Pemerintah Daerah kabupaten/kota.\n(3) Evaluasi yang dilakukan oleh Menteri dan gubernur sebagai wakil Pemerintah Pusat sebagaimana dimaksud pada ayat (1) dan ayat (2) merupakan bagian dari evaluasi penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah.\n(4) Hasil evaluasi sebagaimana dimaksud pada ayat (3) digunakan oleh Pemerintah Pusat untuk memberikan insentif dan disinsentif fiskal dan/atau non-fiskal kepada Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 353",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "parent_bagian": "Bagian Kedua",
      "teks": "Ketentuan lebih lanjut mengenai tata cara penjatuhan sanksi administratif dan program pembinaan khusus bidang pemerintahan diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "PARTISIPASI MASYARAKAT"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 354",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "(1) Dalam penyelenggaraan Pemerintahan Daerah, Pemerintah Daerah mendorong partisipasi masyarakat.\n(2) Dalam mendorong partisipasi masyarakat sebagaimana dimaksud pada ayat (1), Pemerintah Daerah:\na. menyampaikan informasi tentang penyelenggaraan Pemerintahan Daerah kepada masyarakat;\nb. mendorong kelompok dan organisasi masyarakat untuk berperan aktif dalam penyelenggaraan Pemerintahan Daerah melalui dukungan pengembangan kapasitas masyarakat;\nc. mengembangkan pelembagaan dan mekanisme pengambilan keputusan yang memungkinkan kelompok dan organisasi kemasyarakatan dapat terlibat secara efektif; dan/atau\nd. kegiatan lainnya sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Partisipasi masyarakat sebagaimana dimaksud pada ayat (1) mencakup:\na. penyusunan Perda dan kebijakan Daerah yang mengatur dan membebani masyarakat;\nb. perencanaan, penganggaran, pelaksanaan, pemonitoran, dan pengevaluasian pembangunan Daerah;\nc. pengelolaan aset dan/atau sumber daya alam Daerah; dan\nd. penyelenggaraan pelayanan publik.\n(4) Partisipasi masyarakat sebagaimana dimaksud pada ayat (3) dilakukan dalam bentuk:\na. konsultasi publik;\nb. musyawarah;\nc. kemitraan;\nd. penyampaian aspirasi;\ne. pengawasan; dan/atau\nf. keterlibatan lain sesuai dengan ketentuan peraturan perundang-undangan.\n(5) Ketentuan lebih lanjut mengenai partisipasi masyarakat sebagaimana dimaksud pada ayat (1) sampai dengan ayat (4) diatur dengan peraturan pemerintah.\n(6) Peraturan pemerintah sebagaimana dimaksud pada ayat (5) paling sedikit mengatur:\na. tata cara akses masyarakat terhadap informasi penyelenggaraan Pemerintahan Daerah;\nb. kelembagaan dan mekanisme partisipasi masyarakat dalam penyelenggaraan Pemerintahan Daerah;\nc. bentuk-bentuk partisipasi masyarakat dalam penyelenggaraan Pemerintahan Daerah; dan\nd. dukungan penguatan kapasitas terhadap kelompok dan organisasi kemasyarakatan agar dapat berpartisipasi secara efektif dalam penyelenggaraan Pemerintahan Daerah.\n(7) Tata cara partisipasi masyarakat sebagaimana dimaksud pada ayat (3) dan ayat (4) diatur lebih lanjut dalam Perda dengan berpedoman pada peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "PERKOTAAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XV",
      "teks": "Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 355",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Perkotaan adalah wilayah dengan batas-batas tertentu yang masyarakatnya mempunyai kegiatan utama di bidang industri dan jasa.\n(2) Perkotaan dapat berbentuk:\na. kota sebagai Daerah; dan\nb. kawasan perkotaan.\n(3) Kawasan Perkotaan sebagaimana dimaksud pada ayat (2) huruf b berupa:\na. bagian Daerah kabupaten; dan\nb. bagian dari dua atau lebih Daerah yang berbatasan langsung.\n(4) Penyelenggaraan pemerintahan pada kawasan perkotaan sebagaimana dimaksud pada ayat (3) menjadi kewenangan Pemerintah Pusat atau Pemerintah Daerah sesuai dengan kewenangannya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 356",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Kawasan perkotaan dapat terbentuk secara alami atau dibentuk secara terencana.\n(2) Kawasan perkotaan yang dibentuk secara terencana sebagaimana dimaksud pada ayat (1) dapat dilakukan oleh Pemerintah Pusat, Pemerintah Daerah dan/atau badan hukum sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 357",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Fasilitas pelayanan perkotaan di kawasan perkotaan yang terbentuk secara alami sebagaimana dimaksud dalam Pasal 356 ayat (1) dan yang dibentuk secara terencana oleh Pemerintah Pusat dan/atau Pemerintah Daerah sebagaimana dimaksud dalam Pasal 356 ayat (2) disediakan oleh Pemerintah Pusat atau Pemerintah Daerah sesuai dengan kewenangannya.\n(2) Fasilitas pelayanan perkotaan di kawasan perkotaan yang dibentuk secara terencana oleh badan hukum sebagaimana dimaksud dalam Pasal 356 ayat (2) disediakan oleh badan hukum yang bersangkutan.\n(3) Dalam hal badan hukum menyerahkan fasilitas pelayanan perkotaan yang sudah dibangun sebagaimana dimaksud pada ayat (2) kepada Pemerintah Daerah, penyerahannya dilakukan dengan tidak merugikan kepentingan umum dan sesuai dengan ketentuan peraturan perundang-undangan.\n(4) Penyediaan fasilitas pelayanan perkotaan sebagaimana dimaksud pada ayat (1) dan ayat (2) dilakukan sesuai dengan pedoman dan standar pelayanan perkotaan.\n(5) Ketentuan mengenai pedoman dan standar pelayanan perkotaan diatur dalam peraturan pemerintah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 358",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Daerah kabupaten/kota menyusun rencana, melaksanakan dan mengendalikan penyelenggaraan pengelolaan perkotaan.\n(2) Rencana penyelenggaraan pengelolaan perkotaan sebagaimana dimaksud pada ayat (1) merupakan bagian dari rencana pembangunan Daerah dan terintegrasi dengan rencana tata ruang wilayah.\n(3) Perencanaan dan pengendalian penyelenggaraan pengelolaan perkotaan dilaksanakan dengan memperhatikan kepentingan strategis nasional."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 359",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "parent_bagian": "Bagian Kesatu",
      "teks": "Ketentuan lebih lanjut mengenai perkotaan diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XVI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "KAWASAN KHUSUS DAN KAWASAN PERBATASAN NEGARA"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XVI",
      "teks": "Kawasan Khusus"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 360",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Kesatu",
      "teks": "(1) Untuk menyelenggarakan fungsi pemerintahan tertentu yang bersifat strategis bagi kepentingan nasional, Pemerintah Pusat dapat menetapkan kawasan khusus dalam wilayah provinsi dan/atau kabupaten/kota.\n(2) Kawasan khusus sebagaimana dimaksud pada ayat (1) meliputi:\na. kawasan perdagangan bebas dan/atau pelabuhan bebas;\nb. kawasan hutan lindung;\nc. kawasan hutan konservasi;\nd. kawasan taman laut;\ne. kawasan buru;\nf. kawasan ekonomi khusus;\ng. kawasan berikat;\nh. kawasan angkatan perang;\ni. kawasan industri;\nj. kawasan purbakala;\nk. kawasan cagar alam;\n1. kawasan cagar budaya;\nm. kawasan otorita; dan\nn. kawasan untuk kepentingan nasional lainnya yang diatur dengan ketentuan peraturan perundang-undangan.\n(3) Untuk membentuk kawasan khusus sebagaimana dimaksud pada ayat (1) Pemerintah Pusat mengikutsertakan Daerah yang bersangkutan.\n(4) Dalam kawasan khusus sebagaimana dimaksud pada ayat (1), setiap Daerah mempunyai kewenangan Daerah yang diatur dengan peraturan pemerintah, kecuali kewenangan Daerah tersebut telah diatur dalam ketentuan peraturan perundang-undangan.\n(5) Daerah dapat mengusulkan pembentukan kawasan khusus sebagaimana dimaksud pada ayat (1) kepada Pemerintah Pusat."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XVI",
      "teks": "Kawasan Perbatasan Negara"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 361",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Kawasan perbatasan negara adalah Kecamatan-Kecamatan terluar yang berbatasan langsung dengan negara lain.\n(2) Kewenangan Pemerintah Pusat di kawasan perbatasan meliputi seluruh kewenangan tentang pengelolaan dan pemanfaatan kawasan perbatasan sesuai dengan ketentuan peraturan perundang-undangan mengenai wilayah negara.\n(3) Selain kewenangan sebagaimana dimaksud pada ayat (2), Pemerintah Pusat mempunyai kewenangan untuk:\na. penetapan rencana detail tata ruang;\nb. pengendalian dan izin pemanfaatan ruang; dan\nc. pembangunan sarana dan prasarana kawasan.\n(4) Gubernur sebagai wakil Pemerintah Pusat mengoordinasikan pelaksanaan pembangunan kawasan perbatasan berdasarkan pedoman yang ditetapkan oleh Pemerintah Pusat.\n(5) Dalam mengoordinasikan pelaksanaan pembangunan kawasan perbatasan sebagaimana dimaksud pada ayat (4), gubernur sebagai wakil Pemerintah Pusat dibantu oleh bupati/wali kota.\n(6) Dalam memberikan bantuan pelaksanaan pembangunan kawasan perbatasan sebagaimana dimaksud pada ayat (5), bupati/wali kota menugaskan camat di kawasan perbatasan.\n(7) Pemerintah Pusat wajib membangun kawasan perbatasan agar tidak tertinggal dengan kemajuan kawasan perbatasan di negara tetangga.\n(8) Kewenangan selain sebagaimana dimaksud pada ayat (2) dan ayat (3) menjadi kewenangan Daerah sesuai dengan ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 362",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "parent_bagian": "Bagian Kedua",
      "teks": "(1) Pembentukan Kecamatan di kawasan perbatasan ditetapkan dengan Perda Kabupaten/Kota setelah mendapatkan persetujuan dari Menteri.\n(2) Susunan organisasi dan tata kerja Kecamatan di kawasan perbatasan serta persyaratan dan tata cara pengangkatan camat ditetapkan dengan Peraturan Menteri setelah mendapat pertimbangan dari menteri yang menyelenggarakan urusan pemerintahan bidang pendayagunaan aparatur negara."
    },
    {
      "tipe": "BAB",
      "label": "BAB XVII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "KERJA SAMA DAERAH DAN PERSELISIHAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XVII",
      "teks": "Kerja Sama Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 363",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "teks": "(1) Dalam rangka meningkatkan kesejahteraan rakyat, Daerah dapat mengadakan kerja sama yang didasarkan pada pertimbangan efisiensi dan efektivitas pelayanan publik serta saling menguntungkan.\n(2) Kerja sama sebagaimana dimaksud pada ayat (1) dapat dilakukan oleh Daerah dengan:\na. Daerah lain;\nb. pihak ketiga; dan/atau\nc. lembaga atau pemerintah daerah di luar negeri sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Kerja sama dengan Daerah lain sebagaimana dimaksud pada ayat (2) huruf a dikategorikan menjadi kerja sama wajib dan kerja sama sukarela."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 1 Kerja Sama Wajib",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "teks": "Paragraf 1 Kerja Sama Wajib"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 364",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 1 Kerja Sama Wajib",
      "teks": "(1) Kerja sama wajib sebagaimana dimaksud dalam Pasal 363 ayat (3) merupakan kerja sama antar-Daerah yang berbatasan untuk penyelenggaraan Urusan Pemerintahan:\na. yang memiliki eksternalitas lintas Daerah; dan\nb. penyediaan layanan publik yang lebih efisien jika dikelola bersama.\n(2) Kerja sama wajib sebagaimana dimaksud pada ayat (1) mencakup:\na. kerja sama antar-Daerah provinsi;\nb. kerja sama antara Daerah provinsi dan Daerah kabupaten/kota dalam wilayahnya;\nc. kerja sama antara Daerah provinsi dan Daerah kabupaten/kota dari provinsi yang berbeda;\nd. kerja sama antar-Daerah kabupaten/kota dari Daerah provinsi yang berbeda; dan\ne. kerja sama antar-Daerah kabupaten/kota dalam satu Daerah provinsi.\n(3) Dalam hal kerja sama wajib sebagaimana dimaksud pada ayat (2) huruf a sampai dengan huruf d tidak dilaksanakan oleh Daerah, Pemerintah Pusat mengambil alih pelaksanaan Urusan Pemerintahan yang dikerjasamakan.\n(4) Dalam hal kerja sama wajib sebagaimana dimaksud pada ayat (2) huruf e tidak dilaksanakan oleh Daerah kabupaten/kota, gubernur sebagai wakil Pemerintah Pusat mengambil alih pelaksanaannya.\n(5) Biaya pelaksanaan kerja sama sebagaimana dimaksud pada ayat (3) dan ayat (4) diperhitungkan dari APBD masing-masing Daerah yang bersangkutan.\n(6) Dalam melaksanakan kerja sama wajib, Daerah yang berbatasan dapat membentuk sekretariat kerja sama.\n(7) Sekretariat kerja sama sebagaimana dimaksud pada ayat (6) bertugas memfasilitasi Perangkat Daerah dalam melaksanakan kegiatan kerja sama antar-Daerah.\n(8) Pendanaan sekretariat kerja sama sebagaimana dimaksud pada ayat (7) dibebankan pada APBD masing-masing.\n(9) Daerah dapat membentuk asosiasi untuk mendukung kerja sama antar-Daerah.\n(10) Pemerintah Pusat dapat memberikan bantuan dana untuk melaksanakan kerja sama wajib antar-Daerah melalui APBN."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 2 Kerja Sama Sukarela",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "teks": "Paragraf 2 Kerja Sama Sukarela"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 365",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 2 Kerja Sama Sukarela",
      "teks": "Kerja sama sukarela sebagaimana dimaksud dalam Pasal 363 ayat (3) dilaksanakan oleh Daerah yang berbatasan atau tidak berbatasan untuk penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah namun dipandang lebih efektif dan efisien jika dilaksanakan dengan bekerja sama."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 3 Pelaksanaan Kerja Sama",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "teks": "Paragraf 3 Pelaksanaan Kerja Sama"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 366",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 3 Pelaksanaan Kerja Sama",
      "teks": "(1) Kerja sama Daerah dengan pihak ketiga sebagaimana dimaksud dalam Pasal 363 ayat (2) huruf b meliputi:\na. kerja sama dalam penyediaan pelayanan publik;\nb. kerja sama dalam pengelolaan aset untuk meningkatkan nilai tambah;\nc. kerja sama dalam peningkatan pendapatan Daerah; dan\nd. kerja sama lainnya yang tidak bertentangan dengan ketentuan peraturan perundang-undangan.\n(2) Kerja sama Daerah dengan pihak ketiga dituangkan dalam kontrak kerja sama yang paling sedikit mengatur:\na. hak dan kewajiban para pihak;\nb. jangka waktu kerja sama;\nc. penyelesaian perselisihan; dan\nd. sanksi bagi pihak yang tidak memenuhi perjanjian.\n(3) Kerja sama Daerah dengan pihak ketiga sebagaimana dimaksud pada ayat (1) harus didahului dengan studi kelayakan yang dilakukan oleh para pihak yang melakukan kerja sama."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 367",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 3 Pelaksanaan Kerja Sama",
      "teks": "(1) Kerja sama Daerah dengan lembaga dan/atau pemerintah daerah di luar negeri sebagaimana dimaksud dalam Pasal 363 ayat (2) huruf c meliputi:\na. pengembangan ilmu pengetahuan dan teknologi;\nb. pertukaran budaya;\nc. peningkatan kemampuan teknis dan manajemen pemerintahan;\nd. promosi potensi Daerah; dan\ne. kerja sama lainnya yang tidak bertentangan dengan ketentuan peraturan perundang-undangan.\n(2) Kerja sama Daerah dengan lembaga dan/atau pemerintah daerah di luar negeri sebagaimana dimaksud pada ayat (1) dilaksanakan setelah mendapat persetujuan Pemerintah Pusat.\n(3) Kerja sama Daerah dengan lembaga dan/atau pemerintah daerah di luar negeri sebagaimana dimaksud pada ayat (1) berpedoman pada ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "PARAGRAF",
      "label": "Paragraf 4 Pemantauan dan Evaluasi Kerja Sama",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "teks": "Paragraf 4 Pemantauan dan Evaluasi Kerja Sama"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 368",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 4 Pemantauan dan Evaluasi Kerja Sama",
      "teks": "(1) Gubernur sebagai wakil Pemerintah Pusat melakukan pemantauan dan evaluasi terhadap kerja sama yang dilakukan Daerah Kabupaten/Kota dalam satu Daerah Provinsi.\n(2) Menteri melakukan pemantauan dan evaluasi terhadap kerja sama antar-Daerah provinsi, antara Daerah provinsi dan Daerah kabupaten/kota di wilayahnya, serta antara Daerah provinsi dan Daerah kabupaten/kota di luar wilayahnya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 369",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_paragraf": "Paragraf 4 Pemantauan dan Evaluasi Kerja Sama",
      "teks": "Ketentuan lebih lanjut mengenai kerja sama diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua Perselisihan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "teks": "Bagian Kedua Perselisihan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 370",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bagian": "Bagian Kedua Perselisihan",
      "teks": "(1) Dalam hal terjadi perselisihan dalam penyelenggaraan Urusan Pemerintahan antar-Daerah kabupaten/kota dalam satu Daerah provinsi, gubernur sebagai wakil Pemerintah Pusat menyelesaikan perselisihan dimaksud.\n(2) Dalam hal terjadi perselisihan dalam penyelenggaraan Urusan Pemerintahan antar-Daerah provinsi, antara Daerah provinsi dan Daerah kabupaten/kota di wilayahnya, serta antara Daerah provinsi dan Daerah kabupaten/kota di luar wilayahnya, Menteri menyelesaikan perselisihan dimaksud.\n(3) Dalam hal gubernur sebagai wakil Pemerintah Pusat tidak dapat menyelesaikan perselisihan sebagaimana dimaksud pada ayat (1), penanganannya dilakukan oleh Menteri.\n(4) Keputusan Menteri berkaitan dengan penyelesaian perselisihan sebagaimana dimaksud pada ayat (2) dan penanganan penyelesaian perselisihan sebagaimana dimaksud pada ayat (3) bersifat final.\n(5) Ketentuan lebih lanjut mengenai tata cara penyelesaian perselisihan antar-Daerah dalam penyelenggaraan Urusan Pemerintahan diatur dengan Peraturan Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB XVIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XVIII DESA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 371",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVIII",
      "teks": "(1) Dalam Daerah kabupaten/kota dapat dibentuk Desa.\n(2) Desa sebagaimana dimaksud pada ayat (1) mempunyai kewenangan sesuai dengan ketentuan peraturan perundang-undangan mengenai Desa."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 372",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVIII",
      "teks": "(1) Pemerintah Pusat, Pemerintah Daerah provinsi dan Pemerintah Daerah kabupaten/kota dapat menugaskan sebagian Urusan Pemerintahan yang menjadi kewenangannya kepada Desa.\n(2) Pendanaan untuk melaksanakan Urusan Pemerintahan yang ditugaskan kepada Desa oleh Pemerintah Pusat dibebankan kepada APBN.\n(3) Pendanaan untuk melaksanakan Urusan Pemerintahan yang ditugaskan kepada Desa oleh Pemerintah Daerah Provinsi dibebankan kepada APBD provinsi.\n(4) Pendanaan untuk melaksanakan Urusan Pemerintahan yang ditugaskan kepada Desa oleh Pemerintah Daerah Kabupaten/Kota dibebankan kepada APBD kabupaten/kota."
    },
    {
      "tipe": "BAB",
      "label": "BAB XIX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIX PEMBINAAN DAN PENGAWASAN"
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XIX",
      "teks": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah"
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 1 Umum",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "teks": "Paragraf 1 Umum"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 373",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "parent_paragraf": "Paragraf 1 Umum",
      "teks": "(1) Pemerintah Pusat melakukan pembinaan dan pengawasan terhadap penyelenggaraan Pemerintahan Daerah provinsi.\n(2) Gubernur sebagai wakil Pemerintah Pusat melakukan pembinaan dan pengawasan terhadap penyelenggaraan Pemerintahan Daerah kabupaten/kota.\n(3) Pembinaan dan pengawasan sebagaimana dimaksud pada ayat (1) secara nasional dikoordinasikan oleh Menteri."
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 2 Pembinaan terhadap Penyelenggaraan Pemerintahan Daerah Provinsi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "teks": "Paragraf 2 Pembinaan terhadap Penyelenggaraan Pemerintahan Daerah Provinsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 374",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "parent_paragraf": "Paragraf 2 Pembinaan terhadap Penyelenggaraan Pemerintahan Daerah Provinsi",
      "teks": "(1) Pembinaan terhadap penyelenggaraan Pemerintahan Daerah provinsi sebagaimana dimaksud dalam Pasal 373 ayat (1) dilaksanakan oleh Menteri, menteri teknis, dan kepala lembaga pemerintah nonkementerian.\n(2) Menteri melakukan pembinaan yang bersifat umum meliputi:\na. pembagian Urusan Pemerintahan;\nb. kelembagaan Daerah;\nc. kepegawaian pada Perangkat Daerah;\nd. keuangan Daerah;\ne. pembangunan Daerah;\nf. pelayanan publik di Daerah;\ng. kerja sama Daerah;\nh. kebijakan Daerah;\ni. kepala Daerah dan DPRD; dan\nj. bentuk pembinaan lain sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Menteri teknis dan kepala lembaga pemerintah nonkementerian melakukan pembinaan yang bersifat teknis terhadap teknis penyelenggaraan Urusan Pemerintahan yang diserahkan ke Daerah provinsi.\n(4) Pembinaan yang bersifat umum dan teknis sebagaimana dimaksud pada ayat (2) dan ayat (3) dilakukan dalam bentuk fasilitasi, konsultasi, pendidikan dan pelatihan serta penelitian dan pengembangan."
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 3 Pembinaan terhadap Penyelenggaraan Pemerintahan Daerah Kabupaten/Kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "teks": "Paragraf 3 Pembinaan terhadap Penyelenggaraan Pemerintahan Daerah Kabupaten/Kota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 375",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "parent_paragraf": "Paragraf 3 Pembinaan terhadap Penyelenggaraan Pemerintahan Daerah Kabupaten/Kota",
      "teks": "(1) Pembinaan terhadap penyelenggaraan Pemerintahan Daerah kabupaten/kota sebagaimana dimaksud dalam Pasal 373 ayat (2) dikoordinasikan oleh gubernur sebagai wakil Pemerintah Pusat.\n(2) Dalam melaksanakan pembinaan sebagaimana dimaksud pada ayat (1), gubernur sebagai wakil Pemerintah Pusat dibantu oleh perangkat gubernur sebagai wakil Pemerintah Pusat.\n(3) Gubernur sebagai wakil Pemerintah Pusat melakukan pembinaan yang bersifat umum dan bersifat teknis.\n(4) Gubernur sebagai wakil Pemerintah Pusat melakukan pembinaan yang bersifat umum meliputi:\na. pembagian Urusan Pemerintahan;\nb. kelembagaan Daerah;\nc. kepegawaian pada Perangkat Daerah;\nd. keuangan Daerah;\ne. pembangunan Daerah;\nf. pelayanan publik di Daerah;\ng. kerja sama Daerah;\nh. kebijakan Daerah;\ni. kepala daerah dan DPRD; dan\nj. bentuk pembinaan lain sesuai dengan ketentuan peraturan perundang-undangan.\n(5) Gubernur sebagai wakil Pemerintah Pusat melakukan pembinaan yang bersifat teknis terhadap teknis penyelenggaraan Urusan Pemerintahan yang diserahkan ke Daerah kabupaten/kota.\n(6) Pembinaan yang bersifat umum dan teknis sebagaimana dimaksud pada ayat (3), ayat (4), dan ayat (5) dilakukan dalam bentuk fasilitasi, konsultasi, pendidikan dan pelatihan serta penelitian dan pengembangan dalam kebijakan yang terkait dengan Otonomi Daerah.\n(7) Dalam hal gubernur sebagai wakil Pemerintah Pusat belum mampu melakukan pembinaan sebagaimana dimaksud pada ayat (3), Pemerintah Pusat melaksanakan pembinaan kepada Daerah kabupaten/kota dengan berkoordinasi kepada gubernur sebagai wakil Pemerintah Pusat."
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 4 Pendidikan dan Pelatihan Kepamongprajaan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "teks": "Paragraf 4 Pendidikan dan Pelatihan Kepamongprajaan"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 376",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "parent_paragraf": "Paragraf 4 Pendidikan dan Pelatihan Kepamongprajaan",
      "teks": "(1) Untuk pembinaan penyelenggaraan Pemerintahan Daerah, Kementerian menyelenggarakan pendidikan dan pelatihan kepamongprajaan.\n(2) Pendidikan dan pelatihan kepamongprajaan sebagaimana dimaksud pada ayat (1) ditujukan untuk menghasilkan lulusan sebagai abdi negara dengan karakteristik khusus:\na. memiliki keahlian dan keterampilan teknis penyelenggaraan pemerintahan;\nb. memiliki kepribadian dan keahlian kepemimpinan kepamongprajaan; dan\nc. berwawasan nusantara, berkode etik, dan berlandaskan pada Bhinneka Tunggal Ika.\n(3) Untuk menghasilkan lulusan sebagaimana dimaksud pada ayat (2) metode pendidikan dan latihan kepamongprajaan dilakukan dengan menerapkan kombinasi antara pengajaran, pengasuhan, dan pelatihan."
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 5 Pengawasan Penyelenggaraan Pemerintahan Daerah Provinsi",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "teks": "Paragraf 5 Pengawasan Penyelenggaraan Pemerintahan Daerah Provinsi"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 377",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "parent_paragraf": "Paragraf 5 Pengawasan Penyelenggaraan Pemerintahan Daerah Provinsi",
      "teks": "(1) Menteri melakukan pengawasan umum terhadap penyelenggaraan Pemerintahan Daerah provinsi.\n(2) Menteri teknis dan kepala lembaga pemerintah nonkementerian melaksanakan pengawasan teknis terhadap penyelenggaraan Pemerintahan Daerah provinsi sesuai dengan bidang tugas masing-masing dan berkoordinasi dengan Menteri.\n(3) Pengawasan sebagaimana dimaksud pada ayat (1) dan ayat (2) dilaksanakan oleh Aparat Pengawas Internal Pemerintah sesuai dengan fungsi dan kewenangannya."
    },
    {
      "tipe": "PARAGRAPH",
      "label": "Paragraf 6 Pengawasan Penyelenggaraan Pemerintahan Kabupaten/Kota",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PARAGRAPH",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "teks": "Paragraf 6 Pengawasan Penyelenggaraan Pemerintahan Kabupaten/Kota"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 378",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kesatu Pembinaan Dan Pengawasan Terhadap Penyelenggaraan Pemerintahan Daerah",
      "parent_paragraf": "Paragraf 6 Pengawasan Penyelenggaraan Pemerintahan Kabupaten/Kota",
      "teks": "(1) Gubernur sebagai wakil Pemerintah Pusat melakukan pengawasan umum dan pengawasan teknis terhadap penyelenggaraan Pemerintahan Daerah kabupaten/kota.\n(2) Dalam melaksanakan pengawasan sebagaimana dimaksud pada ayat (1), gubernur sebagai wakil Pemerintah Pusat dibantu oleh perangkat gubernur sebagai wakil Pemerintah Pusat.\n(3) Dalam hal gubernur sebagai wakil Pemerintah Pusat belum mampu melakukan pengawasan sebagaimana dimaksud pada ayat (1), gubernur sebagai wakil Pemerintah Pusat meminta bantuan untuk melaksanakan pengawasan kepada Pemerintah Pusat."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Kedua Pembinaan dan Pengawasan Kepala Daerah Terhadap Perangkat Daerah",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XIX",
      "teks": "Bagian Kedua Pembinaan dan Pengawasan Kepala Daerah Terhadap Perangkat Daerah"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 379",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kedua Pembinaan dan Pengawasan Kepala Daerah Terhadap Perangkat Daerah",
      "teks": "(1) Gubernur sebagai kepala daerah provinsi berkewajiban melaksanakan pembinaan dan pengawasan terhadap Perangkat Daerah provinsi.\n(2) Dalam melaksanakan pembinaan dan pengawasan sebagaimana dimaksud pada ayat (1), gubernur dibantu oleh inspektorat provinsi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 380",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Kedua Pembinaan dan Pengawasan Kepala Daerah Terhadap Perangkat Daerah",
      "teks": "(1) Bupati/wali kota sebagai kepala daerah kabupaten/kota berkewajiban melaksanakan pembinaan dan pengawasan terhadap Perangkat Daerah kabupaten/kota.\n(2) Dalam melaksanakan pembinaan dan pengawasan sebagaimana dimaksud pada ayat (1), bupati/wali kota dibantu oleh inspektorat kabupaten/kota."
    },
    {
      "tipe": "BAGIAN",
      "label": "Bagian Ketiga Penghargaan dan Fasilitasi Khusus",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAGIAN",
      "parent_bab": "BAB XIX",
      "teks": "Bagian Ketiga Penghargaan dan Fasilitasi Khusus"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 381",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Ketiga Penghargaan dan Fasilitasi Khusus",
      "teks": "(1) Pemerintah Pusat menyusun indeks dan peringkat kinerja penyelenggaraan Pemerintah Daerah setiap tahun untuk bahan evaluasi.\n(2) Presiden memberikan penghargaan kepada Pemerintah Daerah yang mencapai peringkat kinerja tertinggi secara nasional dalam penyelenggaraan Pemerintahan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 382",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Ketiga Penghargaan dan Fasilitasi Khusus",
      "teks": "(1) Dalam hal Daerah provinsi berdasarkan hasil evaluasi penyelenggaraan Pemerintahan Daerah berkinerja rendah, Menteri, menteri teknis, dan kepala lembaga pemerintah nonkementerian melakukan pembinaan terhadap penyelenggaraan Urusan Pemerintahan tertentu yang menjadi kewenangan Daerah.\n(2) Menteri melakukan fasilitasi khusus terhadap penyelenggaraan Pemerintahan Daerah provinsi yang telah dibina namun tidak menunjukkan perbaikan kinerja.\n(3) Fasilitasi khusus sebagaimana dimaksud pada ayat (2) dilakukan jika penyelenggaraan Urusan Pemerintahan tertentu yang menjadi kewenangan Daerah yang berkinerja rendah namun tidak berpotensi merugikan kepentingan umum secara meluas.\n(4) Fasilitasi khusus bagi Daerah provinsi sebagaimana dimaksud pada ayat (2) dilakukan oleh Menteri bersama menteri teknis dan kepala lembaga pemerintah nonkementerian.\n(5) Gubernur sebagai wakil Pemerintah Pusat melakukan fasilitasi khusus kepada penyelenggaraan Pemerintah Daerah kabupaten/kota yang telah dibina namun tidak menunjukkan perbaikan kinerja.\n(6) Dalam hal Daerah provinsi dan Daerah kabupaten/kota yang sudah dibina sebagaimana dimaksud pada ayat (1) dan ayat (2) tidak menunjukkan perbaikan kinerja dan berpotensi merugikan kepentingan umum secara meluas, Pemerintah Pusat melakukan pengambilalihan pelaksanaan Urusan Pemerintahan tertentu atas biaya yang diperhitungkan dari APBD yang bersangkutan.\n(7) Pemerintah Pusat dapat melimpahkan kepada gubernur sebagai wakil Pemerintah Pusat untuk melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah kabupaten/kota yang diambil alih oleh Pemerintah Pusat sebagaimana dimaksud pada ayat (6)."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 383",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIX",
      "parent_bagian": "Bagian Ketiga Penghargaan dan Fasilitasi Khusus",
      "teks": "Ketentuan lebih lanjut mengenai pembinaan dan pengawasan diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XX TINDAKAN HUKUM TERHADAP APARATUR SIPIL NEGARA DI INSTANSI DAERAH"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 384",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XX",
      "teks": "(1) Penyidik memberitahukan kepada kepala daerah sebelum melakukan penyidikan terhadap aparatur sipil negara di instansi Daerah yang disangka melakukan pelanggaran hukum dalam pelaksanaan tugas.\n(2) Ketentuan pemberitahuan penyidikan sebagaimana dimaksud pada ayat (1) tidak berlaku apabila:\na. tertangkap tangan melakukan suatu tindak pidana;\nb. disangka telah melakukan tindak pidana kejahatan yang diancam dengan pidana penjara 5 (lima) tahun atau lebih; dan/atau\nc. disangka telah melakukan tindak pidana kejahatan terhadap keamanan negara.\n(3) Penyidikan sebagaimana dimaksud pada ayat (2) diberitahukan kepada kepala daerah dalam jangka waktu paling lama 2 (dua) kali 24 (dua puluh empat) jam."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 385",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XX",
      "teks": "(1) Masyarakat dapat menyampaikan pengaduan atas dugaan penyimpangan yang dilakukan oleh aparatur sipil negara di instansi Daerah kepada Aparat Pengawas Internal Pemerintah dan/atau aparat penegak hukum.\n(2) Aparat Pengawasan Internal Pemerintah wajib melakukan pemeriksaan atas dugaan penyimpangan yang diadukan oleh masyarakat sebagaimana dimaksud pada ayat (1).\n(3) Aparat penegak hukum melakukan pemeriksaan atas pengaduan yang disampaikan oleh masyarakat sebagaimana dimaksud pada ayat (1), setelah terlebih dahulu berkoordinasi dengan Aparat Pengawas Internal Pemerintah atau lembaga pemerintah nonkementerian yang membidangi pengawasan.\n(4) Jika berdasarkan hasil pemeriksaan sebagaimana dimaksud pada ayat (3) ditemukan bukti adanya penyimpangan yang bersifat administratif, proses lebih lanjut diserahkan kepada Aparat Pengawas Internal Pemerintah.\n(5) Jika berdasarkan hasil pemeriksaan sebagaimana dimaksud pada ayat (3) ditemukan bukti adanya penyimpangan yang bersifat pidana, proses lebih lanjut diserahkan kepada aparat penegak hukum sesuai ketentuan peraturan perundang-undangan."
    },
    {
      "tipe": "BAB",
      "label": "BAB XXI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XXI INOVASI DAERAH"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 386",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXI",
      "teks": "(1) Dalam rangka peningkatan kinerja penyelenggaraan Pemerintahan Daerah, Pemerintah Daerah dapat melakukan inovasi.\n(2) Inovasi sebagaimana dimaksud pada ayat (1) adalah semua bentuk pembaharuan dalam penyelenggaraan Pemerintahan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 387",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXI",
      "teks": "Dalam merumuskan kebijakan inovasi, Pemerintahan Daerah mengacu pada prinsip:\na. peningkatan efisiensi;\nb. perbaikan efektivitas;\nc. perbaikan kualitas pelayanan;\nd. tidak ada konflik kepentingan;\ne. berorientasi kepada kepentingan umum;\nf. dilakukan secara terbuka;\ng. memenuhi nilai-nilai kepatutan; dan\nh. dapat dipertanggungjawabkan hasilnya tidak untuk kepentingan diri sendiri."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 388",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXI",
      "teks": "(1) Inisiatif inovasi dapat berasal dari kepala daerah, anggota DPRD, aparatur sipil negara, Perangkat Daerah, dan anggota masyarakat.\n(2) Usulan inovasi yang berasal dari anggota DPRD ditetapkan dalam rapat paripurna.\n(3) Usulan inovasi sebagaimana dimaksud pada ayat (2) disampaikan kepada kepala daerah untuk ditetapkan dalam Perkada sebagai inovasi Daerah.\n(4) Usulan inovasi yang berasal dari aparatur sipil negara sebagaimana dimaksud pada ayat (1), harus memperoleh izin tertulis dari pimpinan Perangkat Daerah dan menjadi inovasi Perangkat Daerah.\n(5) Usulan inovasi yang berasal dari anggota masyarakat sebagaimana dimaksud pada ayat (1) disampaikan kepada DPRD dan/atau kepada Pemerintah Daerah.\n(6) Jenis, prosedur dan metode penyelenggaraan Pemerintahan Daerah yang bersifat inovatif ditetapkan dengan Perkada.\n(7) Kepala daerah melaporkan inovasi Daerah yang akan dilaksanakan kepada Menteri.\n(8) Laporan sebagaimana dimaksud pada ayat (7) paling sedikit meliputi cara melakukan inovasi, dokumentasi bentuk inovasi, dan hasil inovasi yang akan dicapai.\n(9) Pemerintah Pusat melakukan penilaian terhadap inovasi yang dilaksanakan oleh Pemerintah Daerah.\n(10) Dalam melakukan penilaian terhadap inovasi Daerah sebagaimana dimaksud pada ayat (9) Pemerintah Pusat memanfaatkan lembaga yang berkaitan dengan penelitian dan pengembangan.\n(11) Pemerintah Pusat memberikan penghargaan dan/atau insentif kepada Pemerintah Daerah yang berhasil melaksanakan inovasi.\n(12) Pemerintah Daerah memberikan penghargaan dan/atau insentif kepada individu atau Perangkat Daerah yang melakukan inovasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 389",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXI",
      "teks": "Dalam hal pelaksanaan inovasi yang telah menjadi kebijakan Pemerintah Daerah dan inovasi tersebut tidak mencapai sasaran yang telah ditetapkan, aparatur sipil negara tidak dapat dipidana."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 390",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXI",
      "teks": "Ketentuan lebih lanjut mengenai inovasi Daerah diatur dengan peraturan pemerintah."
    },
    {
      "tipe": "BAB",
      "label": "BAB XXII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XXII INFORMASI PEMERINTAHAN DAERAH"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 391",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXII",
      "teks": "(1) Pemerintah Daerah wajib menyediakan informasi Pemerintahan Daerah yang terdiri atas:\na. informasi pembangunan Daerah; dan\nb. informasi keuangan Daerah.\n(2) Informasi Pemerintahan Daerah sebagaimana dimaksud pada ayat (1) dikelola dalam suatu sistem informasi Pemerintahan Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 392",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXII",
      "teks": "Informasi pembangunan Daerah sebagaimana dimaksud dalam Pasal 391 ayat (1) huruf a memuat informasi perencanaan pembangunan Daerah yang mencakup:\na. kondisi geografis Daerah;\nb. demografi;\nc. potensi sumber daya Daerah;\nd. ekonomi dan keuangan Daerah;\ne. aspek kesejahteraan masyarakat;\nf. aspek pelayanan umum; dan\ng. aspek daya saing Daerah."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 393",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXII",
      "teks": "(1) Informasi keuangan Daerah sebagaimana dimaksud dalam Pasal 391 ayat (1) huruf b paling sedikit memuat informasi anggaran, pelaksanaan anggaran, dan laporan keuangan.\n(2) Informasi keuangan Daerah sebagaimana dimaksud pada ayat (1) digunakan untuk:\na. membantu kepala daerah dalam menyusun anggaran Daerah dan laporan pengelolaan keuangan Daerah;\nb. membantu kepala daerah dalam merumuskan kebijakan keuangan Daerah;\nc. membantu kepala daerah dalam melakukan evaluasi kinerja keuangan Daerah;\nd. membantu menyediakan kebutuhan statistik keuangan Daerah;\ne. mendukung keterbukaan informasi kepada masyarakat;\nf. mendukung penyelenggaraan sistem informasi keuangan Daerah secara nasional; dan\ng. melakukan evaluasi pengelolaan keuangan Daerah.\n(3) Informasi keuangan Daerah sebagaimana dimaksud pada ayat (1) harus mudah diakses oleh masyarakat."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 394",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXII",
      "teks": "(1) Informasi pembangunan Daerah dan informasi keuangan Daerah sebagaimana dimaksud dalam Pasal 391 ayat (1) wajib diumumkan kepada masyarakat.\n(2) Selain diumumkan kepada masyarakat sebagaimana dimaksud pada ayat (1), informasi keuangan Daerah wajib disampaikan kepala daerah kepada Menteri dan menteri yang menyelenggarakan urusan pemerintahan bidang keuangan sesuai dengan ketentuan peraturan perundang-undangan.\n(3) Kepala daerah yang tidak mengumumkan informasi pembangunan Daerah dan informasi keuangan Daerah sebagaimana dimaksud pada ayat (1) dan tidak menyampaikan informasi keuangan Daerah sebagaimana dimaksud pada ayat (2) dikenai sanksi administratif berupa teguran tertulis oleh Menteri untuk gubernur dan oleh gubernur sebagai wakil Pemerintah Pusat untuk bupati/wali kota.\n(4) Dalam hal sanksi teguran tertulis 2 (dua) kali berturut-turut tetap tidak dilaksanakan, kepala daerah dikenai sanksi berupa mengikuti program pembinaan khusus pendalaman bidang pemerintahan yang dilaksanakan oleh Kementerian serta tugas dan kewenangannya dilaksanakan oleh wakil kepala daerah atau oleh pejabat yang ditunjuk."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 395",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXII",
      "teks": "Selain informasi pembangunan Daerah dan informasi keuangan Daerah sebagaimana dimaksud dalam Pasal 391 ayat (1), Pemerintah Daerah dapat menyediakan dan mengelola informasi Pemerintahan Daerah lainnya."
    },
    {
      "tipe": "BAB",
      "label": "BAB XXIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XXIII DEWAN PERTIMBANGAN OTONOMI DAERAH"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 396",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXIII",
      "teks": "(1) Dalam rangka mengoptimalkan penyelenggaraan Pemerintahan Daerah, dibentuk dewan pertimbangan otonomi daerah.\n(2) Dewan pertimbangan otonomi daerah sebagaimana dimaksud pada ayat (1) bertugas memberikan pertimbangan kepada Presiden mengenai rancangan kebijakan yang meliputi:\na. penataan Daerah;\nb. dana dalam rangka penyelenggaraan otonomi khusus;\nc. dana perimbangan keuangan antara Pemerintah Pusat dan Daerah; dan\nd. penyelesaian permasalahan dalam penyelenggaraan Pemerintahan Daerah dan/atau perselisihan antara Daerah dengan kementerian/lembaga pemerintah nonkementerian."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 397",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXIII",
      "teks": "(1) Susunan keanggotaan dewan pertimbangan otonomi daerah terdiri atas:\na. Wakil Presiden selaku ketua;\nb. Menteri selaku sekretaris;\nc. para menteri terkait sebagai anggota; dan\nd. perwakilan kepala daerah sebagai anggota.\n(2) Untuk mendukung kelancaran tugas dewan pertimbangan otonomi daerah dibentuk sekretariat.\n(3) Menteri selaku sekretaris memimpin sekretariat dewan pertimbangan otonomi daerah.\n(4) Sekretariat dewan pertimbangan otonomi daerah sebagaimana dimaksud pada ayat (2) dibantu oleh tenaga ahli.\n(5) Ketentuan lebih lanjut mengenai dewan pertimbangan otonomi daerah diatur dengan Peraturan Presiden."
    },
    {
      "tipe": "BAB",
      "label": "BAB XXIV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XXIV KETENTUAN PIDANA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 398",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXIV",
      "teks": "Kepala daerah yang tidak memberikan pelayanan perizinan sesuai dengan peraturan perundang-undangan sebagaimana dimaksud dalam Pasal 350 ayat (1) dikenai sanksi pidana sesuai dengan ketentuan peraturan perundang-undangan apabila pelanggarannya bersifat pidana."
    },
    {
      "tipe": "BAB",
      "label": "BAB XXV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XXV KETENTUAN LAIN-LAIN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 399",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXV",
      "teks": "Ketentuan dalam Undang-Undang ini berlaku juga bagi Provinsi Daerah Istimewa Yogyakarta, Provinsi Daerah Khusus Ibukota Jakarta, Provinsi Aceh, Provinsi Papua, dan Provinsi Papua Barat, sepanjang tidak diatur secara khusus dalam Undang-Undang yang mengatur keistimewaan dan kekhususan Daerah tersebut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 400",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXV",
      "teks": "(1) Ketentuan mengenai evaluasi rancangan Perda tentang pajak daerah dan retribusi daerah sebagaimana dimaksud dalam Pasal 324 dan Pasal 325 berlaku secara mutatis mutandis terhadap evaluasi rancangan Perda tentang tata ruang daerah.\n(2) Ketentuan lebih lanjut mengenai evaluasi rancangan Perda tentang tata ruang daerah diatur dalam Peraturan Menteri."
    },
    {
      "tipe": "BAB",
      "label": "BAB XXVI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XXVI KETENTUAN PERALIHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 401",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVI",
      "teks": "(1) Penegasan batas termasuk Cakupan Wilayah dan penentuan luas bagi Daerah yang dibentuk sebelum Undang-Undang ini berlaku ditetapkan dengan peraturan Menteri.\n(2) Penegasan batas termasuk Cakupan Wilayah dan penentuan luas sebagaimana dimaksud pada ayat (1) dilakukan berdasarkan pada perhitungan teknis yang dibuat oleh lembaga yang membidangi informasi geospasial."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 402",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVI",
      "teks": "(1) Izin yang telah dikeluarkan sebelum berlakunya Undang-Undang ini tetap berlaku sampai dengan habis berlakunya izin.\n(2) BUMD yang telah ada sebelum Undang-Undang ini berlaku, wajib menyesuaikan dengan ketentuan dalam Undang-Undang ini dalam jangka waktu paling lama 3 (tiga) tahun terhitung sejak Undang-Undang ini diundangkan."
    },
    {
      "tipe": "BAB",
      "label": "BAB XXVII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XXVII KETENTUAN PENUTUP"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 403",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Semua ketentuan mengenai program legislasi daerah dan badan legislasi daerah yang sudah ada sebelum Undang-Undang ini berlaku harus dibaca dan dimaknai sebagai program pembentukan Perda dan badan pembentukan Perda, sepanjang tidak bertentangan dengan Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 404",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Serah terima personel, pendanaan, sarana dan prasarana, serta dokumen sebagai akibat pembagian Urusan Pemerintahan antara Pemerintah Pusat, Daerah provinsi dan Daerah kabupaten/kota yang diatur berdasarkan Undang-Undang ini dilakukan paling lama 2 (dua) tahun terhitung sejak Undang-Undang ini diundangkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 405",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, semua ketentuan peraturan perundang-undangan yang merupakan peraturan pelaksanaan dari Undang-Undang Nomor 5 Tahun 1962 tentang Perusahaan Daerah (Lembaran Negara Republik Indonesia Tahun 1962 Nomor 10, Tambahan Lembaran Negara Republik Indonesia Nomor 2387), dinyatakan masih tetap berlaku sepanjang tidak bertentangan dengan ketentuan dalam Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 406",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, semua ketentuan peraturan perundang-undangan yang mengatur mengenai DPRD provinsi dan DPRD kabupaten/kota dinyatakan masih tetap berlaku sepanjang tidak bertentangan dengan ketentuan dalam Undang-Undang ini atau tidak diatur secara khusus dalam Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 407",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, semua peraturan perundang-undangan yang berkaitan secara langsung dengan Daerah wajib mendasarkan dan menyesuaikan pengaturannya pada Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 408",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Pada saat Undang-Undang ini mulai berlaku, semua peraturan perundang-undangan yang berkaitan dengan penyelenggaraan Pemerintahan Daerah dinyatakan masih tetap berlaku sepanjang belum diganti dan tidak bertentangan dengan ketentuan dalam Undang-Undang ini."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 409",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Pada saat Undang-Undang ini mulai berlaku:\na. Undang-Undang Nomor 5 Tahun 1962 tentang Perusahaan Daerah (Lembaran Negara Republik Indonesia Tahun 1962 Nomor 10, Tambahan Lembaran Negara Republik Indonesia Nomor 2387);\nb. Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 125, Tambahan Lembaran Negara Republik Indonesia Nomor 4437) sebagaimana telah diubah beberapa kali terakhir dengan Undang-Undang Nomor 12 Tahun 2008 tentang Perubahan Kedua Atas Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2008 Nomor 59, Tambahan Lembaran Negara Republik Indonesia Nomor 4844);\nc. Pasal 157, Pasal 158 ayat (2) sampai dengan ayat (9), dan Pasal 159 Undang-Undang Nomor 28 Tahun 2009 tentang Pajak Daerah dan Retribusi Daerah (Lembaran Negara Republik Indonesia Tahun 2009 Nomor 130, Tambahan Lembaran Negara Republik Indonesia Nomor 5049); dan\nd. Pasal 1 angka 4, Pasal 314 sampai dengan Pasal 412, Pasal 418 sampai dengan Pasal 421 Undang-Undang Nomor 17 Tahun 2014 tentang Majelis Permusyawaratan Rakyat, Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, dan Dewan Perwakilan Rakyat Daerah (Lembaran Negara Republik Indonesia Tahun 2014 Nomor 182, Tambahan Lembaran Negara Republik Indonesia Nomor 5568), dicabut dan dinyatakan tidak berlaku."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 410",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Peraturan pelaksanaan dari Undang-Undang ini harus ditetapkan paling lama 2 (dua) tahun terhitung sejak Undang-Undang ini diundangkan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 411",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XXVII",
      "teks": "Undang-Undang ini mulai berlaku pada tanggal diundangkan."
    },
    {
      "tipe": "DIKTUM",
      "label": "Pengesahan",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "DIKTUM",
      "teks": "Agar setiap orang mengetahuinya, memerintahkan pengundangan Undang-Undang ini dengan penempatannya dalam Lembaran Negara Republik Indonesia.\nDisahkan di Jakarta pada tanggal 30 September 2014 PRESIDEN REPUBLIK INDONESIA, ttd. DR. h. SUSILO BAMBANG YUDHOYONO\nDiundangkan di Jakarta pada tanggal 2 Oktober 2014 MENTERI HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA, ttd. AMIR SYAMSUDIN\nLEMBARAN NEGARA REPUBLIK INDONESIA TAHUN 2014 NOMOR 244"
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "Penjelasan Umum",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PENJELASAN_UMUM",
      "teks": "PENJELASAN ATAS UNDANG-UNDANG REPUBLIK INDONESIA NOMOR 23 TAHUN 2014 TENTANG PEMERINTAHAN DAERAH\nI. UMUM\n1. Hubungan Pemerintah Pusat dan Daerah\nHubungan Pemerintah Pusat dengan Daerah dapat dirunut dari alinea ketiga dan keempat Pembukaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945. Alinea ketiga memuat pernyataan kemerdekaan bangsa Indonesia. Sedangkan alinea keempat memuat pernyataan bahwa setelah menyatakan kemerdekaan, yang pertama kali dibentuk adalah Pemerintah Negara Indonesia yaitu Pemerintah Nasional yang bertanggung jawab mengatur dan mengurus bangsa Indonesia. Lebih lanjut dinyatakan bahwa tugas Pemerintah Negara Indonesia adalah melindungi seluruh bangsa dan tumpah darah Indonesia, memajukan kesejahteraan umum dan mencerdaskan kehidupan bangsa serta ikut memelihara ketertiban dunia berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial.\nSelanjutnya Pasal 1 Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 menyatakan bahwa Negara Indonesia adalah negara kesatuan yang berbentuk republik. Konsekuensi logis sebagai Negara kesatuan adalah dibentuknya pemerintah Negara Indonesia sebagai pemerintah nasional untuk pertama kalinya dan kemudian pemerintah nasional tersebutlah yang kemudian membentuk Daerah sesuai ketentuan peraturan perundang-undangan. Kemudian Pasal 18 ayat (2) dan ayat (5) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 menyatakan bahwa Pemerintahan Daerah berwenang untuk mengatur dan mengurus sendiri Urusan Pemerintahan menurut Asas Otonomi dan Tugas Pembantuan dan diberikan otonomi yang seluas-luasnya.\nPemberian otonomi yang seluas-luasnya kepada Daerah diarahkan untuk mempercepat terwujudnya kesejahteraan masyarakat melalui peningkatan pelayanan, pemberdayaan, dan peran serta masyarakat.\nDi samping itu melalui otonomi luas, dalam lingkungan strategis globalisasi, Daerah diharapkan mampu meningkatkan daya saing dengan memperhatikan prinsip demokrasi, pemerataan, keadilan, keistimewaan dan kekhususan serta potensi dan keanekaragaman Daerah dalam sistem Negara Kesatuan Republik Indonesia.\nPemberian otonomi yang seluas-seluasnya kepada Daerah dilaksanakan berdasarkan prinsip negara kesatuan. Dalam negara kesatuan kedaulatan hanya ada pada pemerintahan negara atau pemerintahan nasional dan tidak ada kedaulatan pada Daerah. Oleh karena itu, seluas apa pun otonomi yang diberikan kepada Daerah, tanggung jawab akhir penyelenggaraan Pemerintahan Daerah akan tetap ada ditangan Pemerintah Pusat. Untuk itu Pemerintahan Daerah pada negara kesatuan merupakan satu kesatuan dengan Pemerintahan Nasional.\nSejalan dengan itu, kebijakan yang dibuat dan dilaksanakan oleh Daerah merupakan bagian integral dari kebijakan nasional. Pembedanya adalah terletak pada bagaimana memanfaatkan kearifan, potensi, inovasi, daya saing, dan kreativitas Daerah untuk mencapai tujuan nasional tersebut di tingkat lokal yang pada gilirannya akan mendukung pencapaian tujuan nasional secara keseluruhan.\nDaerah sebagai satu kesatuan masyarakat hukum yang mempunyai otonomi berwenang mengatur dan mengurus Daerahnya sesuai aspirasi dan kepentingan masyarakatnya sepanjang tidak bertentangan dengan tatanan hukum nasional dan kepentingan umum. Dalam rangka memberikan ruang yang lebih luas kepada Daerah untuk mengatur dan mengurus kehidupan warganya maka Pemerintah Pusat dalam membentuk kebijakan harus memperhatikan kearifan lokal dan sebaliknya Daerah ketika membentuk kebijakan Daerah baik dalam bentuk Perda maupun kebijakan lainnya hendaknya juga memperhatikan kondisi, kekhasan, dan kearifan lokal dalam penyelenggaraan pemerintahan secara keseluruhan.\nPada hakikatnya Otonomi Daerah diberikan kepada rakyat sebagai satu kesatuan masyarakat hukum yang diberi kewenangan untuk mengatur dan mengurus sendiri Urusan Pemerintahan yang diberikan oleh Pemerintah Pusat kepada Daerah dan dalam pelaksanaannya dilakukan oleh kepala daerah dan DPRD dengan dibantu oleh Perangkat Daerah.\nUrusan Pemerintahan yang diserahkan ke Daerah berasal dari kekuasaan pemerintahan yang ada ditangan Presiden. Konsekuensi dari negara kesatuan adalah tanggung jawab akhir pemerintahan ada ditangan Presiden. Agar pelaksanaan Urusan Pemerintahan yang diserahkan ke Daerah berjalan sesuai dengan kebijakan nasional maka Presiden berkewajiban untuk melakukan pembinaan dan pengawasan terhadap penyelenggaraan Pemerintahan Daerah.\nPresiden sebagai pemegang kekuasaan pemerintahan dibantu oleh menteri negara dan setiap menteri bertanggung atas Urusan Pemerintahan tertentu dalam pemerintahan. Sebagian Urusan Pemerintahan yang menjadi tanggung jawab menteri tersebut yang sesungguhnya diotonomikan ke Daerah. Konsekuensi menteri sebagai pembantu Presiden adalah kewajiban menteri atas nama Presiden untuk melakukan pembinaan dan pengawasan agar penyelenggaraan Pemerintahan Daerah berjalan sesuai dengan ketentuan peraturan perundang-undangan. Agar tercipta sinergi antara Pemerintah Pusat dan Daerah, kementerian/lembaga pemerintah nonkementerian berkewajiban membuat norma, standar, prosedur, dan kriteria (NSPK) untuk dijadikan pedoman bagi Daerah dalam menyelenggarakan Urusan Pemerintahan yang diserahkan ke Daerah dan menjadi pedoman bagi kementerian/lembaga pemerintah nonkementerian untuk melakukan pembinaan dan pengawasan. Presiden melimpahkan kewenangan kepada Menteri sebagai koordinator pembinaan dan pengawasan yang dilakukan oleh kementerian/lembaga pemerintah nonkementerian terhadap penyelenggaraan Pemerintahan Daerah. Kementerian/lembaga pemerintah nonkementerian melakukan pembinaan dan pengawasan yang bersifat teknis, sedangkan Kementerian melaksanakan pembinaan dan pengawasan yang bersifat umum. Mekanisme tersebut diharapkan mampu menciptakan harmonisasi antarkementerian/lembaga pemerintah nonkementerian dalam melakukan pembinaan dan pengawasan penyelenggaraan Pemerintahan Daerah secara keseluruhan.\n\n2. Penyelenggaraan Pemerintahan Daerah\nBerbeda dengan penyelenggaraan pemerintahan di pusat yang terdiri atas lembaga eksekutif, legislatif, dan yudikatif, penyelenggaraan Pemerintahan Daerah dilaksanakan oleh DPRD dan kepala daerah.\nDPRD dan kepala daerah berkedudukan sebagai unsur penyelenggara pemerintahan daerah yang diberi mandat rakyat untuk melaksanakan Urusan Pemerintahan yang diserahkan kepada Daerah. Dengan demikian maka DPRD dan kepala daerah berkedudukan sebagai mitra sejajar yang mempunyai fungsi yang berbeda. DPRD mempunyai fungsi pembentukan Perda, anggaran dan pengawasan, sedangkan kepala daerah melaksanakan fungsi pelaksanaan atas Perda dan kebijakan Daerah. Dalam mengatur dan mengurus Urusan Pemerintahan yang menjadi kewenangan Daerah tersebut, DPRD dan kepala daerah dibantu oleh Perangkat Daerah.\nSebagai konsekuensi posisi DPRD sebagai unsur penyelenggara Pemerintahan Daerah maka susunan, kedudukan, peran, hak, kewajiban, tugas, wewenang, dan fungsi DPRD tidak diatur dalam beberapa undang-undang namun cukup diatur dalam Undang-Undang ini secara keseluruhan guna memudahkan pengaturannya secara terintegrasi.\n\n3. Urusan Pemerintahan\nSebagaimana diamanatkan oleh Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, terdapat Urusan Pemerintahan yang sepenuhnya menjadi kewenangan Pemerintah Pusat yang dikenal dengan istilah urusan pemerintahan absolut dan ada urusan pemerintahan konkuren.\nUrusan pemerintahan konkuren terdiri atas Urusan Pemerintahan Wajib dan Urusan Pemerintahan Pilihan yang dibagi antara Pemerintah Pusat, Daerah provinsi, dan Daerah kabupaten/kota. Urusan Pemerintahan Wajib dibagi dalam Urusan Pemerintahan Wajib yang terkait Pelayanan Dasar dan Urusan Pemerintahan Wajib yang tidak terkait Pelayanan Dasar. Untuk Urusan Pemerintahan Wajib yang terkait Pelayanan Dasar ditentukan Standar Pelayanan Minimal (SPM) untuk menjamin hak-hak konstitusional masyarakat.\nPembagian urusan pemerintahan konkuren antara Daerah provinsi dengan Daerah kabupaten/kota walaupun Urusan Pemerintahan sama, perbedaannya akan nampak dari skala atau ruang lingkup Urusan Pemerintahan tersebut. Walaupun Daerah provinsi dan Daerah kabupaten/kota mempunyai Urusan Pemerintahan masing-masing yang sifatnya tidak hierarki, namun tetap akan terdapat hubungan antara Pemerintah Pusat, Daerah provinsi dan Daerah kabupaten/kota dalam pelaksanaannya dengan mengacu pada NSPK yang dibuat oleh Pemerintah Pusat.\nDi samping urusan pemerintahan absolut dan urusan pemerintahan konkuren, dalam Undang-Undang ini dikenal adanya urusan pemerintahan umum. Urusan pemerintahan umum menjadi kewenangan Presiden sebagai kepala pemerintahan yang terkait pemeliharaan ideologi Pancasila, Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, Bhinneka Tunggal Ika, menjamin hubungan yang serasi berdasarkan suku, agama, ras dan antar golongan sebagai pilar kehidupan berbangsa dan bernegara serta memfasilitasi kehidupan demokratis. Presiden dalam pelaksanaan urusan pemerintahan umum di Daerah melimpahkan kepada gubernur sebagai kepala pemerintahan provinsi dan kepada bupati/wali kota sebagai kepala pemerintahan kabupaten/kota.\n\n4. Peran Gubernur sebagai Wakil Pemerintah Pusat di Daerah\nMengingat kondisi geografis yang sangat luas, maka untuk efektifitas dan efisiensi pembinaan dan pengawasan atas penyelenggaraan Urusan Pemerintahan yang menjadi kewenangan Daerah kabupaten/kota, Presiden sebagai penanggung jawab akhir pemerintahan secara keseluruhan melimpahkan kewenangannya kepada gubernur untuk bertindak atas nama Pemerintah Pusat untuk melakukan pembinaan dan pengawasan kepada Daerah kabupaten/kota agar melaksanakan otonominya dalam koridor NSPK yang ditetapkan oleh Pemerintah Pusat.\nUntuk efektifitas pelaksanaan tugasnya selaku wakil Pemerintah Pusat, gubernur dibantu oleh perangkat gubernur sebagai Wakil Pemerintah Pusat. Karena perannya sebagai Wakil Pemerintah Pusat maka hubungan gubernur dengan Pemerintah Daerah kabupaten/kota bersifat hierarkis.\n\n5. Penataan Daerah\nSalah satu aspek dalam Penataan Daerah adalah pembentukan Daerah baru. Pembentukan Daerah pada dasarnya dimaksudkan untuk meningkatkan pelayanan publik guna mempercepat terwujudnya kesejahteraan masyarakat disamping sebagai sarana pendidikan politik di tingkat lokal. Untuk itu maka Pembentukan Daerah harus mempertimbangkan berbagai faktor seperti kemampuan ekonomi, potensi Daerah, luas wilayah, kependudukan, dan pertimbangan dari aspek sosial politik, sosial budaya, pertahanan dan keamanan, serta pertimbangan dan syarat lain yang memungkinkan Daerah itu dapat menyelenggarakan dan mewujudkan tujuan dibentuknya Daerah.\nPembentukan Daerah didahului dengan masa persiapan selama 3 (tiga) tahun dengan tujuan untuk penyiapan Daerah tersebut menjadi Daerah. Apabila setelah tiga tahun hasil evaluasi menunjukkan Daerah Persiapan tersebut tidak memenuhi syarat untuk menjadi Daerah, statusnya dikembalikan ke Daerah induknya. Apabila Daerah Persiapan setelah melalui masa pembinaan selama tiga tahun memenuhi syarat untuk menjadi Daerah, maka Daerah Persiapan tersebut dibentuk melalui undang-undang menjadi Daerah.\n\n6. Perangkat Daerah\nSetiap Daerah sesuai karakter Daerahnya akan mempunyai prioritas yang berbeda antara satu Daerah dengan Daerah lainnya dalam upaya menyejahterakan masyarakat. Ini merupakan pendekatan yang bersifat asimetris artinya walaupun Daerah sama-sama diberikan otonomi yang seluas-luasnya, namun prioritas Urusan Pemerintahan yang dikerjakan akan berbeda satu Daerah dengan Daerah lainnya. Konsekuensi logis dari pendekatan asimetris tersebut maka Daerah akan mempunyai prioritas Urusan Pemerintahan dan kelembagaan yang berbeda satu dengan lainnya sesuai dengan karakter Daerah dan kebutuhan masyarakatnya.\nBesaran organisasi Perangkat Daerah baik untuk mengakomodasikan Urusan Pemerintahan Wajib dan Urusan Pemerintahan Pilihan paling sedikit mempertimbangkan faktor jumlah penduduk, luasan wilayah, beban kerja, dan kemampuan keuangan Daerah. Untuk mengakomodasi variasi beban kerja setiap Urusan Pemerintahan yang berbeda-beda pada setiap Daerah, maka besaran organisasi Perangkat Daerah juga tidak sama antara satu Daerah dengan Daerah lainnya. Dari argumen tersebut dibentuk tipelogi dinas atau badan Daerah sesuai dengan besarannya agar terbentuk Perangkat Daerah yang efektif dan efisien.\nUntuk menciptakan sinergi dalam pengembangan potensi unggulan antara organisasi Perangkat Daerah dengan kementerian dan lembaga pemerintah nonkementerian di pusat, diperlukan adanya pemetaan dari kementerian/lembaga pemerintah nonkementerian di pusat untuk mengetahui Daerah-Daerah yang mempunyai potensi unggulan atau prioritas sesuai dengan bidang tugas kementerian/lembaga pemerintah nonkementerian yang kewenangannya didesentralisasikan ke Daerah.\nDari hasil pemetaan tersebut kementerian/lembaga pemerintah nonkementerian akan mengetahui Daerah-Daerah mana saja yang mempunyai potensi unggulan yang sesuai dengan bidang tugas kementerian/lembaga pemerintah nonkementerian yang bersangkutan.\nDaerah tersebut yang kemudian akan menjadi stakeholder utama dari kementerian/lembaga pemerintah nonkementerian terkait.\n\n7. Keuangan Daerah\nPenyerahan sumber keuangan Daerah baik berupa pajak daerah dan retribusi daerah maupun berupa dana perimbangan merupakan konsekuensi dari adanya penyerahan Urusan Pemerintahan kepada Daerah yang diselenggarakan berdasarkan Asas Otonomi. Untuk menjalankan Urusan Pemerintahan yang menjadi kewenangannya, Daerah harus mempunyai sumber keuangan agar Daerah tersebut mampu memberikan pelayanan dan kesejahteraan kepada rakyat di Daerahnya. Pemberian sumber keuangan kepada Daerah harus seimbang dengan beban atau Urusan Pemerintahan yang diserahkan kepada Daerah. Keseimbangan sumber keuangan ini merupakan jaminan terselenggaranya Urusan Pemerintahan yang diserahkan kepada Daerah. Ketika Daerah mempunyai kemampuan keuangan yang kurang mencukupi untuk membiayai Urusan Pemerintahan dan khususnya Urusan Pemerintahan Wajib yang terkait Pelayanan Dasar, Pemerintah Pusat dapat menggunakan instrumen DAK untuk membantu Daerah sesuai dengan prioritas nasional yang ingin dicapai.\n\n8. Perda\nDalam melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah, kepala daerah dan DPRD selaku penyelenggara Pemerintahan Daerah membuat Perda sebagai dasar hukum bagi Daerah dalam menyelenggarakan Otonomi Daerah sesuai dengan kondisi dan aspirasi masyarakat serta kekhasan dari Daerah tersebut. Perda yang dibuat oleh Daerah hanya berlaku dalam batas-batas yurisdiksi Daerah yang bersangkutan. Walaupun demikian Perda yang ditetapkan oleh Daerah tidak boleh bertentangan dengan ketentuan peraturan perundang-undangan yang lebih tinggi tingkatannya sesuai dengan hierarki peraturan perundang-undangan. Disamping itu Perda sebagai bagian dari sistem peraturan perundang-undangan tidak boleh bertentangan dengan kepentingan umum sebagaimana diatur dalam kaidah penyusunan Perda.\nDaerah melaksanakan Otonomi Daerah yang berasal dari kewenangan Presiden yang memegang kekuasaan pemerintahan. Mengingat tanggung jawab akhir penyelenggaraan pemerintahan ada di tangan Presiden, maka konsekuensi logisnya kewenangan untuk membatalkan Perda ada ditangan Presiden. Adalah tidak efisien apabila Presiden yang langsung membatalkan Perda. Presiden melimpahkan kewenangan pembatalan Perda Provinsi kepada Menteri sebagai pembantu Presiden yang bertanggungjawab atas Otonomi Daerah. Sedangkan untuk pembatalan Perda Kabupaten/Kota, Presiden melimpahkan kewenangannya kepada gubernur selaku Wakil Pemerintah Pusat di Daerah.\nUntuk menghindar terjadinya kesewenang-wenangan dalam pembatalan Perda, maka Pemerintah Daerah provinsi dapat mengajukan keberatan pembatalan Perda Provinsi yang dilakukan oleh Menteri kepada Presiden. Sedangkan Pemerintah Daerah kabupaten/kota dapat mengajukan keberatan pembatalan Perda Kabupaten/Kota yang dilakukan gubernur sebagai wakil Pemerintah Pusat kepada Menteri.\nDari sisi penyelenggaraan Pemerintahan Daerah, keputusan yang diambil oleh Presiden dan Menteri bersifat final.\nDalam rangka menciptakan tertib administrasi pelaporan Perda, setiap Perda yang akan diundangkan harus mendapatkan nomor register terlebih dahulu. Perda Provinsi harus mendapatkan nomor register dari Kementerian, sedangkan Perda Kabupaten/Kota mendapatkan nomor register dari gubernur sebagai wakil Pemerintah Pusat. Dengan adanya pemberian nomor register tersebut akan terhimpun informasi mengenai keseluruhan Perda yang dibentuk oleh Daerah dan sekaligus juga informasi Perda secara nasional.\n\n9. Inovasi Daerah\nMajunya suatu bangsa sangat ditentukan oleh inovasi yang dilakukan bangsa tersebut. Untuk itu maka diperlukan adanya perlindungan terhadap kegiatan yang bersifat inovatif yang dilakukan oleh aparatur sipil negara di Daerah dalam memajukan Daerahnya. Perlu adanya upaya memacu kreativitas Daerah untuk meningkatkan daya saing Daerah. Untuk itu perlu adanya kriteria yang obyektif yang dapat dijadikan pegangan bagi pejabat Daerah untuk melakukan kegiatan yang bersifat inovatif. Dengan cara tersebut inovasi akan terpacu dan berkembang tanpa ada kekhawatiran menjadi obyek pelanggaran hukum.\nPada dasarnya perubahan Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah ditujukan untuk mendorong lebih terciptanya daya guna dan hasil guna penyelenggaraan Pemerintahan Daerah dalam menyejahterakan masyarakat, baik melalui peningkatan pelayanan publik maupun melalui peningkatan daya saing Daerah. Perubahan ini bertujuan untuk memacu sinergi dalam berbagai aspek dalam penyelenggaraan Pemerintahan Daerah dengan Pemerintah Pusat.\nMelalui Undang-Undang ini dilakukan pengaturan yang bersifat afirmatif yang dimulai dari pemetaan Urusan Pemerintahan yang akan menjadi prioritas Daerah dalam pelaksanaan otonomi yang seluas-luasnya. Melalui pemetaan tersebut akan tercipta sinergi kementerian/lembaga pemerintah nonkementerian yang Urusan Pemerintahannya didesentralisasikan ke Daerah. Sinergi Urusan Pemerintahan akan melahirkan sinergi kelembagaan antara Pemerintah Pusat dan Daerah karena setiap kementerian/lembaga pemerintah nonkementerian akan tahu siapa pemangku kepentingan (stakeholder) dari kementerian/lembaga pemerintah nonkementerian tersebut di tingkat provinsi dan kabupaten/kota secara nasional. Sinergi Urusan Pemerintahan dan kelembagaan tersebut akan menciptakan sinergi dalam perencanaan pembangunan antara kementerian/lembaga pemerintah nonkementerian dengan Daerah untuk mencapai target nasional. Manfaat lanjutannya adalah akan tercipta penyaluran bantuan yang terarah dari kementerian/lembaga pemerintah nonkementerian terhadap Daerah-Daerah yang menjadi stakeholder utamanya untuk akselerasi realisasi target nasional tersebut.\nSinergi Pemerintah Pusat dan Daerah akan sulit tercapai tanpa adanya dukungan personel yang memadai baik dalam jumlah maupun standar kompetensi yang diperlukan untuk melaksanakan Urusan Pemerintahan yang menjadi kewenangan Daerah. Dengan cara tersebut Pemerintah Daerah akan mempunyai birokrasi karir yang kuat dan memadai dalam aspek jumlah dan kompetensinya.\nLangkah berikutnya adalah adanya jaminan pelayanan publik yang disediakan Pemerintah Daerah kepada masyarakat. Untuk itu setiap Pemerintah Daerah wajib membuat maklumat pelayanan publik sehingga masyarakat di Daerah tersebut tahu jenis pelayanan publik yang disediakan, bagaimana mendapatkan aksesnya serta kejelasan dalam prosedur dan biaya untuk memperoleh pelayanan publik tersebut serta adanya saluran keluhan manakala pelayanan publik yang didapat tidak sesuai dengan standar yang telah ditentukan.\nLangkah akhir untuk memperkuat Otonomi Daerah adalah adanya mekanisme pembinaan, pengawasan, pemberdayaan, serta sanksi yang jelas dan tegas.\nAdanya pembinaan dan pengawasan serta sanksi yang tegas dan jelas tersebut memerlukan adanya kejelasan tugas pembinaan, pengawasan dari Kementerian yang melakukan pembinaan dan pengawasan umum serta kementerian/lembaga pemerintah nonkementerian yang melaksanakan pembinaan teknis. Sinergi antara pembinaan dan pengawasan umum dengan pembinaan dan pengawasan teknis akan memberdayakan Daerah dalam penyelenggaraan Pemerintahan Daerah.\nUntuk pembinaan dan pengawasan terhadap Daerah kabupaten/kota memerlukan peran dan kewenangan yang jelas dan tegas dari gubernur sebagai wakil Pemerintah Pusat untuk melaksanakan tugas dan fungsi pembinaan dan pengawasan terhadap Daerah kabupaten/kota."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 1 Cukup jelas."
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
      "teks": "Pasal 3 Ayat (1) Dikecualikan untuk kota administrasi dan kabupaten administrasi di Provinsi DKI Jakarta.\nAyat (2) Cukup jelas."
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
      "teks": "Pasal 6 Yang dimaksud dengan \"kebijakan sebagai dasar dalam menyelenggarakan Urusan Pemerintahan\" dalam ketentuan ini adalah kebijakan yang ditetapkan oleh Pemerintah Pusat sebagai pedoman dalam menyelenggarakan urusan pemerintahan konkuren baik yang menjadi kewenangan Pemerintah Pusat maupun yang menjadi kewenangan Daerah."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 7 Cukup jelas."
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
      "teks": "Pasal 10 Ayat (1) Huruf a Yang dimaksud dengan “urusan politik luar negeri” misalnya mengangkat pejabat diplomatik dan menunjuk warga negara untuk duduk dalam jabatan lembaga internasional, menetapkan kebijakan luar negeri, melakukan perjanjian dengan negara lain, menetapkan kebijakan perdagangan luar negeri, dan sebagainya.\nHuruf b Yang dimaksud dengan “urusan pertahanan” misalnya mendirikan dan membentuk angkatan bersenjata, menyatakan damai dan perang, menyatakan negara atau sebagian wilayah negara dalam keadaan bahaya, membangun dan mengembangkan sistem pertahanan negara dan persenjataan, menetapkan kebijakan untuk wajib militer, bela negara bagi setiap warga negara, dan sebagainya.\nHuruf c Yang dimaksud dengan “urusan keamanan” misalnya mendirikan dan membentuk kepolisian negara, menetapkan kebijakan keamanan nasional, menindak setiap orang, kelompok atau organisasi yang kegiatannya mengganggu keamanan negara, dan sebagainya.\nHuruf d Yang dimaksud dengan “urusan yustisi” misalnya mendirikan lembaga peradilan, mengangkat hakim dan jaksa, mendirikan lembaga pemasyarakatan, menetapkan kebijakan kehakiman dan keimigrasian, memberikan grasi, amnesti, abolisi, membentuk undang-undang, peraturan pemerintah pengganti undang-undang, peraturan pemerintah, dan peraturan lain yang berskala nasional.\nHuruf e Yang dimaksud dengan “urusan moneter dan fiskal nasional\" adalah kebijakan makro ekonomi, misalnya mencetak uang dan menentukan nilai mata uang, menetapkan kebijakan moneter, mengendalikan peredaran uang, dan sebagainya.\nHuruf f Yang dimaksud dengan “urusan agama” misalnya menetapkan hari libur keagamaan yang berlaku secara nasional, memberikan pengakuan terhadap keberadaan suatu agama, menetapkan kebijakan dalam penyelenggaraan kehidupan keagamaan, dan sebagainya.\nDaerah dapat memberikan hibah untuk penyelenggaraan kegiatan-kegiatan keagamaan sebagai upaya meningkatkan keikutsertaan Daerah dalam menumbuhkembangkan kehidupan beragama, misalnya penyelenggaraan Musabaqah Tilawatil Qur'an (MTQ), pengembangan bidang pendidikan keagamaan, dan sebagainya.\nAyat (2) Huruf a Yang dimaksud dengan “Pemerintah Pusat melaksanakan sendiri\" adalah apabila urusan pemerintahan absolut dilaksanakan langsung oleh kementerian atau lembaga pemerintah nonkementerian.\nHuruf b Cukup jelas."
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
      "teks": "Pasal 12 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 13 Ayat (1) Yang dimaksud dengan “prinsip akuntabilitas\" dalam ketentuan ini adalah penanggungjawab penyelenggaraan suatu Urusan Pemerintahan ditentukan berdasarkan kedekatannya dengan luas, besaran, dan jangkauan dampak yang ditimbulkan oleh penyelenggaraan suatu Urusan Pemerintahan.\nYang dimaksud dengan “prinsip efisiensi” dalam ketentuan ini adalah penyelenggara suatu Urusan Pemerintahan ditentukan berdasarkan perbandingan tingkat daya guna yang paling tinggi yang dapat diperoleh.\nYang dimaksud dengan \"prinsip eksternalitas\" dalam ketentuan ini adalah penyelenggara suatu Urusan Pemerintahan ditentukan berdasarkan luas, besaran, dan jangkauan dampak yang timbul akibat penyelenggaraan suatu Urusan Pemerintahan.\nYang dimaksud dengan “prinsip kepentingan strategis nasional\" dalam ketentuan ini adalah penyelenggara suatu Urusan Pemerintahan ditentukan berdasarkan pertimbangan dalam rangka menjaga keutuhan dan kesatuan bangsa, menjaga kedaulatan Negara, implementasi hubungan luar negeri, pencapaian program strategis nasional dan pertimbangan lain yang diatur dalam ketentuan peraturan perundang-undangan.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 14 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Yang dimaksud dengan “garis pantai” adalah batas pertemuan antara bagian laut dan daratan pada saat terjadi air laut pasang tertinggi.\nPenggunaan garis pantai dalam ketentuan ini diperuntukkan bagi penentuan wilayah administrasi dalam pengelolaan wilayah laut.\nBatas wilayah 4 (empat) mil dalam ketentuan ini hanya semata-mata untuk keperluan penghitungan bagi hasil kelautan, sedangkan kewenangan bidang kelautan sampai dengan 12 (dua belas) mil tetap berada pada Daerah provinsi.\nAyat (7) Batas wilayah dibagi sama jarak atau diukur sesuai prinsip garis tengah daerah yang berbatasan dalam ketentuan ini hanya semata-mata untuk keperluan penghitungan bagi hasil kelautan, sedangkan kewenangan bidang kelautan sampai dengan 12 (dua belas) mil tetap berada pada Daerah provinsi."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 15 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Yang dimaksud dengan “pengalihan urusan pemerintahan konkuren pada tingkatan atau susunan pemerintahan yang lain\" dalam ketentuan ini adalah urusan pemerintahan konkuren yang menjadi kewenangan Pemerintah Pusat dialihkan menjadi urusan pemerintahan konkuren yang menjadi kewenangan Daerah provinsi atau Daerah kabupaten/kota dan sebaliknya, atau urusan pemerintahan konkuren yang menjadi kewenangan Daerah provinsi dialihkan menjadi urusan pemerintahan konkuren yang menjadi kewenangan Daerah kabupaten/kota atau sebaliknya.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 16 Ayat (1) Cukup jelas.\nAyat (2) Pedoman dalam ketentuan ini dimaksudkan untuk standardisasi yang berlaku secara nasional, mempermudah penyelenggara Pemerintahan Daerah dan mencegah penyimpangan dalam penyelenggaraan Pemerintahan Daerah tanpa mengurangi Otonomi Daerah.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 17 Ayat (1) Yang dimaksud dengan “kebijakan Daerah” dalam ketentuan ini adalah Perda, Perkada, dan keputusan kepala daerah.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
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
      "teks": "Pasal 19 Ayat (1) Huruf a Yang dimaksud dengan “diselenggarakan sendiri oleh Pemerintah Pusat\" adalah apabila Urusan Pemerintahan Konkuren dilaksanakan langsung oleh kementerian atau lembaga pemerintah nonkementerian.\nHuruf b Cukup jelas.\nHuruf c Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 20 Ayat (1) Huruf a Cukup jelas.\nHuruf b Cukup jelas.\nHuruf c Yang dimaksud dengan “menugasi Desa\" dalam ketentuan ini adalah pemberian tugas dari gubernur kepada Desa yang bukan merupakan penerapan asas Tugas Pembantuan, sehingga tugas yang diserahkan kepada Desa tidak menjadi kewenangan yang dikelola sendiri oleh pemerintah desa.\nPemerintah desa bertanggung jawab kepada gubernur terhadap tugas yang diserahkan kepadanya.\nAyat (2) Cukup jelas.\nAyat (3) Yang dimaksud dengan “ditugaskan sebagian pelaksanaannya kepada Desa\" dalam ketentuan ini adalah pemberian tugas dari bupati/wali kota kepada Desa yang bukan merupakan penerapan asas Tugas Pembantuan, sehingga tugas yang diserahkan kepada Desa tidak menjadi kewenangan yang dikelola sendiri oleh pemerintah desa.\nPemerintah desa bertanggung jawab kepada bupati/wali kota melalui camat terhadap tugas yang diserahkan kepadanya.\nAyat (4) Cukup jelas."
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
      "teks": "Pasal 22 Ayat (1) Yang dimaksud dengan “kebijakan Daerah” dalam ketentuan ini adalah Perda, Perkada, dan Keputusan kepala daerah.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Penyampaian laporan pelaksanaan anggaran Tugas Pembantuan oleh kepala daerah penerima Tugas Pembantuan kepada DPRD bukan dimaksudkan untuk dilakukan pembahasan terhadap anggaran Tugas Pembantuan melainkan hanya digunakan sebagai dasar bagi DPRD dalam melakukan pengawasan pelaksanaan Tugas Pembantuan tersebut.\nAyat (5) Penyampaian laporan pelaksanaan anggaran Tugas Pembantuan oleh kepala daerah penerima Tugas Pembantuan kepada DPRD bukan dimaksudkan untuk dilakukan pembahasan terhadap laporan pelaksanaan anggaran Tugas Pembantuan melainkan hanya digunakan sebagai dasar bagi DPRD dalam melakukan pengawasan pelaksanaan anggaran Tugas Pembantuan tersebut."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 23 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 24 Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Yang dimaksud dengan “potensi” dalam ketentuan ini adalah ketersediaan sumber daya di Daerah yang telah dan yang akan dikelola yang memberikan dampak bagi peningkatan kesejahteraan masyarakat.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas."
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
      "teks": "Pasal 27 Ayat (1) Cukup jelas.\nAyat (2) Huruf a Cukup jelas.\nHuruf b Yang dimaksud dengan \"pengaturan administratif\" dalam ketentuan ini antara lain perizinan, kelaikan, dan keselamatan pelayaran.\nHuruf c Cukup jelas.\nHuruf d Cukup jelas.\nHuruf e Cukup jelas.\nAyat (3) Yang dimaksud dengan “garis pantai” adalah batas pertemuan antara bagian laut dan daratan pada saat terjadi air laut pasang tertinggi.\nGaris pantai diperuntukkan bagi penentuan wilayah administrasi dalam pengelolaan wilayah laut.\nAyat (4) Cukup jelas.\nAyat (5) Yang dimaksud dengan \"nelayan kecil\" adalah nelayan masyarakat tradisional Indonesia yang menggunakan bahan dan alat penangkapan ikan secara tradisional, dan terhadapnya tidak dikenakan surat izin usaha dan bebas dari pajak, serta bebas menangkap ikan di seluruh pengelolaan perikanan dalam wilayah Republik Indonesia."
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
      "teks": "Pasal 29 Ayat (1) Cukup jelas.\nAyat (2) DAU bagi Daerah Provinsi yang Berciri Kepulauan yang diperoleh dari penghitungan luas wilayah lautan termasuk untuk Daerah kabupaten/kota dalam Daerah Provinsi yang Berciri Kepulauan dengan proporsi 30 % (tiga puluh persen) untuk Daerah Provinsi yang Berciri Kepulauan dan 70 % (tujuh puluh persen) untuk Daerah kabupaten/kota dalam Daerah Provinsi yang Berciri Kepulauan tersebut.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas."
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
      "teks": "Pasal 31 Ayat (1) Cukup jelas.\nAyat (2) Huruf a Cukup jelas.\nHuruf b Yang dimaksud dengan \"mempercepat peningkatan kesejahteraan masyarakat\" adalah peningkatan indeks pembangunan manusia yang ditandai dengan peningkatan kesehatan, pendidikan, dan pendapatan masyarakat.\nHuruf c Cukup jelas.\nHuruf d Cukup jelas.\nHuruf e Cukup jelas.\nHuruf f Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas."
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
      "teks": "Pasal 33 Ayat (1) Huruf a Cukup jelas.\nHuruf b Dalam ketentuan ini yang dimaksud dengan “bagian Daerah"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 205",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Sekretaris DPRD kabupaten/kota adalah jabatan karier pegawai negeri sipil sehingga dalam pengusulan pengangkatan dan pemberhentiannya mengikuti ketentuan peraturan perundang-undangan bidang kepegawaian.\nDalam pengusulan pengangkatannya, bupati/wali kota mengajukan 3 (tiga) orang calon kepada pimpinan DPRD kabupaten/kota untuk mendapat persetujuan dengan memperhatikan jenjang kepangkatan, kemampuan, dan pengalaman.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 206",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 207",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 208",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 209",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Huruf a Yang dimaksud dengan “sekretariat daerah” adalah unsur staf pendukung kepala daerah yang melaksanakan fungsi perumusan kebijakan, koordinasi dan fungsi pelayanan administrasi serta fungsi pendukung lainnya.\nHuruf b Yang dimaksud dengan “sekretariat DPRD” adalah unsur staf pendukung DPRD.\nHuruf c Yang dimaksud dengan “inspektorat” adalah unsur yang menjalankan fungsi pengawasan.\nHuruf d Yang dimaksud dengan “dinas” adalah unsur pelaksana Urusan Pemerintahan yang menjadi kewenangan Daerah.\nHuruf e Yang dimaksud dengan “badan” adalah unsur penunjang yang melaksanakan fungsi-fungsi yang bersifat strategis yang diperlukan untuk mendukung pelaksanaan Urusan Pemerintahan yang menjadi kewenangan Daerah antara lain perencanaan, pengawasan, kepegawaian, keuangan, pendidikan dan latihan serta penelitian dan pengembangan.\nAyat (2) Huruf a Yang dimaksud dengan “sekretariat daerah” adalah unsur staf pendukung kepala daerah yang melaksanakan fungsi perumusan kebijakan, koordinasi pemerintahan, organisasi dan administrasi umum serta fungsi pendukung lainnya.\nHuruf b Yang dimaksud dengan “sekretariat DPRD” adalah unsur staf pendukung DPRD.\nHuruf c Yang dimaksud dengan “inspektorat” adalah unsur yang menjalankan fungsi pengawasan.\nHuruf d Yang dimaksud dengan “dinas” adalah unsur pelaksana Urusan Pemerintahan yang menjadi kewenangan Daerah.\nHuruf e Yang dimaksud dengan “badan” adalah unsur penunjang yang melaksanakan fungsi-fungsi yang bersifat strategis yang diperlukan untuk mendukung pelaksanaan Urusan Pemerintahan yang menjadi kewenangan Daerah antara lain perencanaan, pengawasan, kepegawaian, keuangan, pendidikan dan latihan serta penelitian dan pengembangan.\nHuruf f Cukup jelas.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 210",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Yang dimaksud dengan “bersifat koordinatif dan fungsional\" adalah hubungan kerja dalam rangka sinkronisasi pelaksanaan tugas pokok dan fungsi Perangkat Daerah provinsi dan Perangkat Daerah kabupaten/kota dalam melaksanakan Urusan Pemerintahan yang sama."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 211",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 212",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 213",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 214",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 215",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 216",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 217",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 218",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 219",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 220",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 221",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 222",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 223",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 224",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan “menguasai pengetahuan teknis pemerintahan” adalah dibuktikan dengan ijazah diploma/sarjana pemerintahan atau sertifikat profesi kepamongprajaan.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 225",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 226",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Kewenangan yang dilimpahkan bupati/wali kota kepada camat misalnya kebersihan di Kecamatan tertentu, pemadam kebakaran di Kecamatan tertentu dan pemberian izin mendirikan bangunan untuk luasan tertentu.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 227",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 228",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 229",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 230",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Pelaksanaan anggaran untuk pembangunan sarana dan prasarana lokal kelurahan dan pemberdayaan masyarakat di kelurahan diutamakan dengan cara swakelola oleh kelompok masyarakat dan/atau organisasi kemasyarakatan.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 231",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 232",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Nomenklatur unit kerja pada setiap Perangkat Daerah yang melaksanakan suatu Urusan Pemerintahan memperhatikan pertimbangan dari kementerian/lembaga pemerintah nonkementerian yang membidangi Urusan Pemerintahan tersebut."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 233",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Yang dimaksud dengan “kompetensi pemerintahan” antara lain mencakup pengetahuan, sikap dan keterampilan yang terkait dengan kebijakan Desentralisasi, hubungan Pemerintah Pusat dengan Daerah, pemerintahan umum, pengelolaan keuangan Daerah, Urusan Pemerintahan yang menjadi kewenangan Daerah, hubungan Pemerintah Daerah dengan DPRD dan etika pemerintahan.\nKompetensi pemerintahan dibuktikan dengan sertifikasi.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 234",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 235",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 236",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 237",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 238",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 239",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas.\nAyat (6) Huruf a Yang dimaksud dengan \"penataan Kecamatan\" dalam ketentuan ini adalah pembentukan, penghapusan dan penggabungan Kecamatan.\nHuruf b Cukup jelas.\nAyat (7) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 240",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 241",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 242",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 243",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 244",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Berlakunya Perda yang tidak sama dengan tanggal pengundangan dimungkinkan untuk persiapan sarana dan prasarana serta kesiapan aparatur pelaksana Perda tersebut."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 245",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Untuk evaluasi terhadap rancangan Perda Provinsi tentang perubahan APBD dengan dilampiri perubahan RKPD provinsi.\nAyat (2) Cukup jelas.\nAyat (3) Untuk evaluasi terhadap rancangan Perda kabupaten/kota tentang perubahan APBD dengan dilampiri perubahan RKPD kabupaten/kota.\nAyat (4) Cukup jelas.\nAyat (5) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 246",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 247",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 248",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Berlakunya Perkada yang tidak sama dengan tanggal pengundangan dimungkinkan untuk persiapan sarana dan prasarana serta kesiapan aparatur pelaksana Perkada tersebut."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 249",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 250",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “kesusilaan” dalam ketentuan ini adalah norma yang berkaitan dengan adab dan sopan santun, kelakuan yang baik, dan tata krama yang luhur.\nAyat (2) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 251",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 252",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Cukup jelas.\nAyat (5) Pemotongan DAU dan/atau DBH bagi Daerah bersangkutan sebesar uang yang sudah dipungut oleh Daerah."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 253",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 254",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 255",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Huruf a Yang dimaksud dengan “tindakan penertiban non-yustisial\" adalah tindakan yang dilakukan oleh polisi pamong praja dalam rangka menjaga dan/atau memulihkan ketertiban umum dan ketenteraman masyarakat terhadap pelanggaran Perda dan/atau Perkada dengan cara sesuai dengan ketentuan peraturan perundang-undangan dan tidak sampai proses peradilan.\nHuruf b Yang dimaksud dengan \"menindak\" adalah melakukan tindakan hukum terhadap pelanggaran Perda untuk diproses melalui peradilan sesuai dengan ketentuan peraturan perundang-undangan.\nHuruf c Yang dimaksud dengan \"tindakan penyelidikan\" adalah tindakan polisi pamong praja yang tidak menggunakan upaya paksa dalam rangka mencari data dan informasi tentang adanya dugaan pelanggaran Perda dan/atau Perkada, antara lain mencatat, mendokumentasi atau merekam kejadian/keadaan, serta meminta keterangan.\nHuruf d Yang dimaksud dengan “tindakan administratif adalah tindakan berupa pemberian surat pemberitahuan, surat teguran/surat peringatan terhadap pelanggaran Perda dan/atau Perkada."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 256",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Cukup jelas.\nAyat (2) Cukup jelas.\nAyat (3) Cukup jelas.\nAyat (4) Materi pendidikan dan pelatihan teknis dan fungsional antara lain kecakapan berkomunikasi, negosiasi, dan tindakan polisional.\nAyat (5) Cukup jelas.\nAyat (6) Cukup jelas.\nAyat (7) Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 257",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 258",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 259",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 260",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 261",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 262",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Ayat (1) Yang dimaksud dengan “transparan” adalah membuka diri terhadap hak masyarakat untuk memperoleh informasi yang benar, jujur, dan tidak diskriminatif tentang penyelenggaraan negara dengan tetap memperhatikan perlindungan atas hak asasi pribadi, golongan, dan rahasia negara.\nYang dimaksud dengan “responsif” adalah dapat mengantisipasi berbagai potensi, masalah, dan perubahan yang terjadi di Daerah.\nYang dimaksud dengan \"efisien\" adalah pencapaian keluaran tertentu dengan masukan terendah atau masukan terendah dengan keluaran maksimal.\nYang dimaksud dengan “efektif” adalah kemampuan mencapai target dengan sumber daya yang dimiliki dengan cara atau proses yang paling optimal.\nYang dimaksud dengan “akuntabel” adalah setiap kegiatan dan hasil akhir dari perencanaan pembangunan Daerah harus dapat dipertanggungjawabkan kepada rakyat sebagai pemegang kedaulatan tertinggi negara sesuai dengan ketentuan peraturan perundang-undangan.\nYang dimaksud dengan “partisipatif\" adalah hak masyarakat untuk terlibat dalam setiap proses tahapan perencanaan pembangunan Daerah dan bersifat inklusif terhadap kelompok yang termarginalkan melalui jalur khusus komunikasi untuk mengakomodasi aspirasi kelompok masyarakat yang tidak memiliki akses dalam pengambilan kebijakan.\nYang dimaksud dengan “terukur” adalah penetapan target kinerja yang akan dicapai dan cara-cara untuk mencapainya.\nYang dimaksud dengan “berkeadilan” adalah prinsip keseimbangan antarwilayah, sektor, pendapatan, gender, dan usia.\nYang dimaksud dengan \"berwawasan lingkungan\" adalah untuk mewujudkan kehidupan adil dan makmur tanpa harus menimbulkan kerusakan lingkungan yang berkelanjutan dalam mengoptimalkan manfaat sumber daya alam dengan cara menserasikan aktivitas manusia dengan kemampuan sumber daya alam yang menopangnya.\nAyat (2) Yang dimaksud dengan "
    },
    {
      "tipe": "LAMPIRAN",
      "label": "LAMPIRAN II",
      "bagian_dokumen": "LAMPIRAN",
      "hierarki": "LAMPIRAN",
      "teks": "Substansi urusan yang dibagi antara Pemerintah Pusat dan Daerah provinsi dan Daerah kabupaten/kota sebagaimana dimuat dalam matriks pembagian Urusan Pemerintahan konkuren antara Pemerintah Pusat dan Daerah provinsi dan Daerah kabupaten/kota tersebut di atas termasuk kewenangan dalam pengelolaan unsur manajemen (yang meliputi sarana dan prasarana, personil, bahan-bahan, metode kerja) dan kewenangan dalam penyelenggaraan fungsi manajemen (yang meliputi perencanaan, pengorganisasian, pelaksanaan, pengoordinasian, penganggaran, pengawasan, penelitian dan pengembangan, standardisasi, dan pengelolaan informasi) dalam substansi Urusan Pemerintahan tersebut melekat menjadi kewenangan masing-masing tingkatan atau susunan pemerintahan tersebut, kecuali apabila dalam matriks pembagian Urusan Pemerintahan konkuren antara Pemerintah Pusat dan Daerah provinsi dan Daerah kabupaten/kota tersebut terdapat unsur manajemen dan/atau fungsi manajemen yang secara khusus sudah dinyatakan menjadi kewenangan suatu tingkatan atau susunan pemerintahan yang lain, sehingga tidak lagi melekat pada substansi Urusan Pemerintahan pada tingkatan atau susunan pemerintahan tersebut.\n\nSalah satu contoh matriks pembagian Urusan Pemerintahan bidang Pendidikan. Dalam matrik Urusan Pemerintahan bidang Pendidikan terdiri atas 6 (enam) sub Urusan Pemerintahan yaitu manajemen pendidikan, kurikulum, akreditasi, pendidik dan tenaga kependidikan, perizinan pendidikan, dan bahasa dan sastra. Dari keenam sub Urusan Pemerintahan tersebut yang merupakan substansi Urusan Pemerintahan adalah sub urusan manajemen pendidikan; kurikulum; perizinan pendidikan; dan bahasa dan sastra, sedangkan yang merupakan unsur manajemen adalah sub urusan pendidik dan tenaga kependidikan dan yang merupakan fungsi manajemen adalah sub urusan akreditasi.\n\nPerincian pembagian Urusan Pemerintahan bidang pendidikan yang merupakan substansi Urusan Pemerintahan bidang pendidikan adalah sebagai berikut:\n1. Sub urusan manajemen pendidikan:\na. penetapan standar nasional pendidikan dan pengelolaan pendidikan tinggi menjadi kewenangan Pemerintah Pusat;\nb. pengelolaan pendidikan menengah dan pendidikan khusus menjadi kewenangan Daerah Provinsi; dan\nc. pengelolaan pendidikan dasar, pendidikan anak usia dini, dan pendidikan nonformal menjadi kewenangan Daerah kabupaten/kota.\n\n2. Sub urusan kurikulum:\na. Penetapan kurikulum nasional pendidikan menengah, pendidikan dasar, pendidikan anak usia dini, dan pendidikan nonformal menjadi kewenangan Pemerintah Pusat;\nb. Penetapan kurikulum muatan lokal pendidikan menengah dan muatan lokal pendidikan khusus menjadi kewenangan Daerah provinsi; dan\nc. Penetapan kurikulum muatan lokal pendidikan dasar, pendidikan anak usia dini, dan pendidikan nonformal menjadi kewenangan Daerah kabupaten/kota.\n\n3. Sub urusan perizinan pendidikan:\na. penerbitan izin perguruan tinggi swasta yang diselenggarakan masyarakat dan penerbitan izin penyelenggaraan satuan pendidikan asing menjadi kewenangan Pemerintah Pusat;\nb. penerbitan izin pendidikan menengah yang diselenggarakan masyarakat dan penerbitan izin pendidikan khusus yang diselenggarakan oleh masyarakat menjadi kewenangan Daerah provinsi; dan\nc. penerbitan izin pendidikan dasar yang diselenggarakan masyarakat dan penerbitan izin pendidikan anak usia dini dan pendidikan nonformal yang diselenggarakan oleh masyarakat menjadi kewenangan Daerah kabupaten/kota.\n\n4. Sub urusan bahasa dan sastra:\na. pembinaan bahasa dan sastra Indonesia menjadi kewenangan Pemerintah Pusat;\nb. pembinaan bahasa dan sastra yang penuturnya lintas Daerah kabupaten/kota dalam 1 (satu) Daerah provinsi menjadi kewenangan Daerah provinsi; dan\nc. pembinaan bahasa dan sastra yang penuturnya dalam Daerah kabupaten/kota menjadi kewenangan Daerah kabupaten/kota.\n\nSeharusnya seluruh fungsi dan unsur manajemen sub urusan manajemen pendidikan tersebut melekat pada pengelolaan masing-masing jenjang pendidikan yang sudah dibagi menjadi kewenangan tingkatan atau susunan pemerintahan. Namun karena dalam matriks pembagian Urusan Pemerintahan bidang pendidikan telah ditetapkan bahwa pendidik dan tenaga kependidikan secara nasional seluruh jenjang pendidikan dan akreditasi seluruh jenjang pendidikan ditetapkan menjadi kewenangan Pemerintah Pusat, maka pendidik dan tenaga kependidikan secara nasional dan akreditasi seluruh jenjang pendidikan tidak lagi menjadi kewenangan Daerah provinsi atau Daerah kabupaten/kota.\n\nBerdasarkan uraian di atas dapat disimpulkan bahwa seluruh pengelolaan sub urusan manajemen pendidikan termasuk unsur dan fungsi manajemen pengelolaan jenjang pendidikan menjadi kewenangan masing-masing tingkatan atau susunan pemerintahan, kecuali pendidik dan tenaga kependidikan serta akreditasi secara nasional karena dalam matriks pembagian Urusan Pemerintahan bidang pendidikan ditetapkan menjadi kewenangan Pemerintah Pusat.\n\nPRESIDEN REPUBLIK INDONESIA,\nSalinan sesuai dengan aslinya\nttd.\nKEMENTERIAN SEKRETARIAT NEGARA RI\nDR. H. SUSILO BAMBANG YUDHOYONO\nDeputi Perundang-undangan Kesejahteraan Rakyat,\nHari Setiawan"
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
                $this->command->info("Data UU No. 23 Tahun 2014 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding UU No. 23 Tahun 2014 selesai!");

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

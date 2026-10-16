<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrUUD1945Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "uud-1945",
    "tipe_peraturan": "uud",
    "judul": "Undang-undang Dasar Negara Republik Indonesia Tahun 1945 (English Version)",
    "tahun": "1945",
    "subjek": "UUD 1945 (ENGLISH VERSION)",
    "tempat_penetapan": "",
    "tanggal_penetapan": "24 Mei 2019",
    "tanggal_pengundangan": "",
    "tanggal_berlaku": "",
    "status": "Berlaku",
    "pemrakarsa": "Kementerian Hukum dan Hak Asasi Manusia",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "",
    "diubah_dengan": "",
    "mengubah": "",
    "sumber_dokumen": "undang-undang_dasar_negara_republik_indonesia_tahun_1945.pdf",
    "id_dokumen": "undang-undang_dasar_negara_republik_indonesia_tahun_1945",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 28,
    "total_chunk": 103,
    "waktu_eksekusi_detik": 0.2,
    "waktu_proses": "2026-10-16 12:07:21"
  },
  "relasi": {
    "dicabut_oleh": [],
    "dicabut_sebagian_oleh": [],
    "mencabut_sebagian": [],
    "mencabut": [],
    "diubah_oleh": [],
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
      "teks": "MAJELIS PERMUSYAWARATAN RAKYAT SEKRETARIAT JENDERAL\n- UNDANG-UNDANG DASAR NEGARA REPUBLIK INDONESIA TAHUN 1945 DALAM SATU NASKAH *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat MAJELIS PERMUSYAWARATAN RAKYAT SEKRETARIAT JENDERAL\n- UNDANG-UNDANG DASAR NEGARA REPUBLIK INDONESIA TAHUN 1945 DALAM SATU NASKAH UNDANG-UNDANG DASAR NEGARA REPUBLIK INDONESIA TAHUN 1945"
    },
    {
      "tipe": "PEMBUKAAN",
      "label": "PEMBUKAAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN",
      "teks": "PEMBUKAAN ( P r e a m b u l e ) Bahwa sesungguhnya kemerdekaan itu ialah hak segala bangsa dan oleh sebab itu, maka penjajahan di atas dunia harus dihapuskan, karena tidak sesuai dengan peri-kemanusiaan dan peri-keadilan.\nDan perjuangan pergerakan kemerdekaan Indonesia telah sampailah kepada saat yang berbahagia dengan selamat sentausa mengantarkan rakyat Indonesia ke depan pintu gerbang kemerdekaan Negara Indonesia, yang merdeka, bersatu, berdaulat, adil dan makmur.\nAtas berkat rakhmat Allah Yang Maha Kuasa dan dengan didorongkan oleh keinginan luhur, supaya berkehidupan kebangsaan yang bebas, maka rakyat Indonesia menyatakan dengan ini kemerdekaannya.\nKemudian dari pada itu untuk membentuk suatu Pemerintah Negara Indonesia yang melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia dan untuk memajukan kesejahteraan umum, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi dan keadilan sosial, maka disusunlah Kemerdekaan Kebangsaan Indonesia itu dalam suatu Undang-Undang Dasar Negara Indonesia, yang terbentuk dalam suatu susunan Negara Republik Indonesia yang berkedaulatan rakyat dengan berdasarkan kepada Ketuhanan Yang Maha Esa, Kemanusiaan Yang Adil dan Beradab, Persatuan Indonesia dan *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam Permusyawaratan/Perwakilan, serta dengan mewujudkan suatu Keadilan sosial bagi seluruh rakyat Indonesia.\nUNDANG-UNDANG DASAR"
    },
    {
      "tipe": "BAB",
      "label": "BAB I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB I BENTUK DAN KEDAULATAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB I",
      "teks": "Pasal 1 (1) Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik.\n(2) Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang- Undang Dasar. ***) (3) Negara Indonesia adalah negara hukum. ***)"
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II MAJELIS PERMUSYAWARATAN RAKYAT"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pasal 2 (1) Majelis Permusyawaratan Rakyat terdiri atas anggota Dewan Perwakilan Rakyat dan anggota Dewan Perwakilan Daerah yang dipilih melalui pemilihan umum dan diatur lebih lanjut dengan undang-undang. ****) (2) Majelis Permusyawaratan Rakyat bersidang sedikitnya sekali dalam lima tahun di ibu kota negara.\n(3) Segala putusan Majelis Permusyawaratan Rakyat ditetapkan dengan suara yang terbanyak."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pasal 3 (1) Majelis Permusyawaratan Rakyat berwenang mengubah dan menetapkan Undang-Undang Dasar. ***) (2) Majelis Permusyawaratan Rakyat melantik Presiden dan/atau  Wakil Presiden. ***/****) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (3) Majelis Permusyawaratan Rakyat hanya dapat memberhentikan Presiden dan/atau  Wakil Presiden dalam masa jabatannya menurut Undang-Undang Dasar. ***/****)"
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB III KEKUASAAN PEMERINTAHAN NEGARA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 4 (1) Presiden Republik Indonesia memegang kekuasaan pemerintahan menurut Undang-Undang Dasar.\n(2) Dalam melakukan kewajibannya Presiden dibantu oleh satu orang Wakil Presiden."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 5 (1) Presiden berhak mengajukan rancangan undang-undang kepada Dewan Perwakilan Rakyat *) (2) Presiden menetapkan peraturan pemerintah untuk menjalankan undang- undang sebagaimana mestinya."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 6 (1) Calon Presiden dan calon Wakil Presiden harus seorang warga negara Indonesia sejak kelahirannya dan tidak pernah menerima kewarganegaraan lain karena kehendaknya sendiri, tidak pernah mengkhianati negara, serta mampu secara rohani dan jasmani untuk melaksanakan tugas dan kewajiban sebagai Presiden dan Wakil Presiden. ***) (2) Syarat-syarat untuk menjadi Presiden dan Wakil Presiden diatur lebih lanjut dengan undang-undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 6A (1) Presiden dan Wakil Presiden dipilih dalam satu pasangan secara langsung oleh rakyat. ***) (2) Pasangan calon Presiden dan Wakil Presiden diusulkan oleh partai politik atau gabungan partai politik peserta pemilihan umum sebelum pelaksanaan pemilihan umum. ***) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (3) Pasangan calon Presiden dan Wakil Presiden yang mendapatkan suara lebih dari lima puluh persen dari jumlah suara dalam pemilihan umum dengan sedikitnya dua puluh persen suara di setiap provinsi yang tersebar di lebih dari setengah jumlah provinsi di Indonesia, dilantik menjadi Presiden dan Wakil Presiden. ***) (4) Dalam hal tidak ada pasangan calon Presiden dan Wakil Presiden terpilih dua pasangan calon yang memperoleh suara terbanyak pertama dan kedua dalam pemilihan umum dipilih oleh rakyat secara langsung dan pasangan yang memperoleh suara rakyat terbanyak dilantik sebagai Presiden dan Wakil Presiden. ****) (5) Tata cara pelaksanaan pemilihan Presiden dan Wakil Presiden lebih lanjut diatur dalam undang-undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 7 Presiden dan Wakil Presiden memegang jabatan selama lima tahun, dan sesudahnya dapat dipilih kembali dalam jabatan yang sama, hanya untuk satu kali masa jabatan. *)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 7A Presiden dan/atau  Wakil Presiden dapat diberhentikan dalam masa jabatannya oleh Majelis Permusyawaratan Rakyat atas usul Dewan Perwakilan Rakyat, baik apabila terbukti telah melakukan pelanggaran hukum berupa pengkhianatan terhadap negara, korupsi, penyuapan, tindak pidana berat lainnya, atau perbuatan tercela maupun apabila terbukti tidak lagi memenuhi syarat sebagai Presiden dan/atau  Wakil Presiden. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7B",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 7B (1) Usul pemberhentian Presiden dan/atau  Wakil Presiden dapat diajukan oleh Dewan Perwakilan Rakyat kepada Majelis Permusyawaratan Rakyat hanya dengan terlebih dahulu mengajukan permintaan kepada Mahkamah Konstitusi untuk memeriksa, mengadili, dan memutus pendapat Dewan Perwakilan Rakyat bahwa Presiden dan/atau  Wakil Presiden telah melakukan pelanggaran hukum berupa pengkhianatan terhadap negara, korupsi, penyuapan, tindak pidana berat lainnya, atau perbuatan tercela; dan/atau  pendapat bahwa Presiden dan/atau  Wakil Presiden tidak lagi memenuhi syarat sebagai Presiden dan/atau  Wakil Presiden. ***) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (2) Pendapat Dewan Perwakilan Rakyat bahwa Presiden dan/atau  Wakil Presiden telah melakukan pelanggaran hukum tersebut ataupun telah tidak lagi memenuhi syarat sebagai Presiden dan/atau  Wakil Presiden adalah dalam rangka pelaksanaan fungsi pengawasan Dewan Perwakilan Rakyat.\n***) (3) Pengajuan permintaan Dewan Perwakilan Rakyat kepada Mahkamah Konstitusi hanya dapat dilakukan dengan dukungan sekurang-kurangnya 2/3 dari jumlah anggota Dewan Perwakilan Rakyat yang hadir dalam sidang paripurna yang dihadiri oleh sekurang-kurangnya 2/3 dari jumlah anggota Dewan Perwakilan Rakyat. ***) (4) Mahkamah Konstitusi wajib memeriksa, mengadili, dan memutus dengan seadil-adilnya terhadap pendapat Dewan Perwakilan Rakyat tersebut paling lama sembilan puluh hari setelah permintaan Dewan Perwakilan Rakyat itu diterima oleh Mahkamah Konstitusi. ***) (5) Apabila Mahkamah Konstitusi memutuskan bahwa Presiden dan/atau  Wakil Presiden terbukti melakukan pelanggaran hukum berupa pengkhianatan terhadap negara, korupsi, penyuapan, tindak pidana berat lainnya, atau perbuatan tercela; dan/atau  terbukti bahwa Presiden dan/atau  Wakil Presiden tidak lagi memenuhi syarat sebagai Presiden dan/atau  Wakil Presiden, Dewan Perwakilan Rakyat menyelenggarakan sidang paripurna untuk meneruskan usul pemberhentian Presiden dan/atau  Wakil Presiden kepada Majelis Permusyawaratan Rakyat. ***) (6) Majelis Permusyawaratan Rakyat wajib menyelenggarakan sidang untuk memutuskan usul Dewan Perwakilan Rakyat tersebut paling lambat tiga puluh hari sejak Majelis Permusyawaratan Rakyat menerima usul tersebut. ***) (7) Keputusan Majelis Permusyawaratan Rakyat atas usul pemberhentian Presiden dan/atau  Wakil Presiden harus diambil dalam rapat paripurna Majelis Permusyawaratan Rakyat yang dihadiri oleh sekurang-kurangnya 3/4 dari jumlah anggota dan disetujui oleh sekurang-kurangnya 2/3 dari jumlah anggota yang hadir, setelah Presiden dan/atau  Wakil Presiden diberi kesempatan menyampaikan penjelasan dalam rapat paripurna Majelis Permusyawaratan Rakyat. ***) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7C",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 7C Presiden tidak dapat membekukan dan/atau  membubarkan Dewan Perwakilan Rakyat.***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 8 (1) Jika Presiden mangkat, berhenti, diberhentikan, atau tidak dapat melakukan kewajibannya dalam masa jabatannya, ia digantikan oleh Wakil Presiden sampai habis masa jabatannya. ***) (2) Dalam hal terjadi kekosongan Wakil Presiden, selambat-lambatnya dalam waktu enam puluh hari, Majelis Permusyawaratan Rakyat menyelenggarakan sidang untuk memilih Wakil Presiden dari dua calon yang diusulkan oleh Presiden. ***) (3) Jika Presiden dan Wakil Presiden mangkat, berhenti, diberhentikan atau tidak dapat melakukan kewajibannya dalam masa jabatannya secara bersamaan, pelaksana tugas kepresidenan adalah Menteri Luar Negeri, Menteri Dalam Negeri, dan Menteri Pertahanan secara bersama-sama.\nSelambat-lambatnya tigapuluh hari setelah itu, Majelis Permusyawaratan Rakyat menyelenggarakan sidang untuk memilih Presiden dan Wakil Presiden dari dua pasangan calon Presiden dan Wakil Presiden yang diusulkan oleh partai polotik yang psangan calon Presiden dan Wakil Presidennya meraih suara terbanyak pertama dan kedua dalam pemilihan umum sebelumnya, sampai akhir masa jabatannya. ****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 9 (1) Sebelum memangku jabatannya, Presiden dan Wakil Presiden bersumpah menurut agama, atau berjanji dengan sungguh-sungguh dihadapan Majelis Permusyawaratan Rakyat atau Dewan Perwakilan Rakyat sebagai berikut :\nSumpah Presiden (Wakil Presiden):\n“ Demi Allah, saya bersumpah akan memenuhi kewajiban Presiden Republik Indonesia (Wakil Presiden Republik Indonesia) dengan sebaik-baiknya dan seadil-adilnya, memegang teguh Undang-Undang Dasar dan menjalankan segala undang-undang dan peraturannya dengan selurus-lurusnya serta berbakti, kepada Nusa dan Bangsa”.\n*) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat Janji Presiden (Wakil Presiden) :\n“Saya berjanji dengan sungguh-sungguh akan memenuhi kewajiban Presiden Republik Indonesia (Wakil Presiden Republik Indonesia) dengan sebaik-baiknya dan seadil-adilnya, memegang teguh Undang-Undang Dasar dan menjalankan segala undang-undang dan peraturannya dengan selurus- lurusnya serta berbakti kepada Nusa dan Bangsa” . *) (2) Jika Majelis Permusyawaratan Rakyat atau Dewan Perwakilan Rakyat tidak dapat mengadakan sidang, Presiden dan Wakil Presiden bersumpah menurut agama, atau berjanji dengan sungguh-sungguh di hadapan pimpinan Majelis Permusyawaratan Rakyat dengan disaksikan oleh pimpinan Mahkamah Agung. *)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 10 Presiden memegang kekuasaan yang tertinggi atas Angkatan Darat, Angkatan Laut dan Angkatan Udara."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 11 (1) Presiden dengan persetujuan Dewan Perwakilan Rakyat menyatakan perang, membuat perdamaian dan perjanjian dengan negara lain. ****) (2) Presiden dalam membuat perjanjian internasional lainnya yang menimbulkan akibat yang luas dan mendasar bagi kehidupan rakyat yang terkait dengan beban keuangan negara, dan/atau  mengharuskan perubahan atau pembentukan undang-undang harus dengan persetujuan Dewan Perwakilan Rakyat. ***) (3) Ketentuan lebih lanjut tentang perjanjian internasional diatur dengan undang-undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 12 Presiden menyatakan keadaan bahaya. Syarat-syarat dan akibatnya keadaan bahaya ditetapkan dengan undang-undang.\n*) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 13 (1) Presiden mengangkat duta dan konsul.\n(2) Dalam hal mengangkat duta, Presiden memperhatikan pertimbangan Dewan Perwakilan Rakyat. *) (3) Presiden menerima penempatan duta negara lain dengan menperhatikan pertimbangan Dewan Perwakilan Rakyat. *)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 14 (1) Presiden memberi grasi dan rehabilitasi dengan memperhatikan pertimbangan Mahkamah Agung. *) (2) Presiden memberi amnesti dan abolisi dengan memperhatikan pertimbangan Dewan Perwakilan Rakyat. *)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 15 Presiden memberi gelar, tanda jasa, dan lain-lain tanda kehormatan yang diatur dengan undang-undang. *)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 16 membentuk suatu dewan pertimbangan yang bertugas memberikan nasihat dan pertimbangan kepada Presiden, yang selanjutanya diatur dalam undang-undang. ****) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "BAB",
      "label": "BAB IV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IV DEWAN PERTIMBANGAN AGUNG Dihapus. ****)"
    },
    {
      "tipe": "BAB",
      "label": "BAB V",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB V KEMENTERIAN NEGARA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pasal 17 (1) Presiden dibantu oleh menteri-menteri negara.\n(2) Menteri-menteri itu diangkat dan diberhentikan oleh Presiden. *) (3) Setiap menteri membidangi urusan tertentu dalam pemerintahan. *) (4) Pembentukan, pengubahan, dan pembubaran kementerian negara diatur dalam undang-undang. ***)"
    },
    {
      "tipe": "BAB",
      "label": "BAB VI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VI PEMERINTAH DAERAH"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 18 (1) Negara Kesatuan Republik Indonesia dibagi atas daerah-daerah provinsi dan daerah provinsi itu dibagi atas kabupaten dan kota, yang tiap-tiap provinsi, kabupaten, dan kota itu mempunyai pemerintahan daerah, yang diatur dengan undang-undang. **) (2) Pemerintahan daerah provinsi, daerah kabupaten, dan kota mengatur dan mengurus sendiri urusan pemerintahan menurut asas otonomi dan tugas pembantuan. **) (3) Pemerintahan daerah provinsi, daerah kabupaten, dan kota memiliki Dewan Perwakilan Rakyat Daerah yang anggota-anggotanya dipilih melalui pemilihan umum. **) (4) Gubernur, Bupati dan Walikota masing-masing sebagai Kepala Pemerintah Daerah Provinsi, Kabupaten dan Kota dipilih secara demokratis. **) (5) Pemerintah daerah menjalankan otonomi seluas-luasnya, kecuali urusan pemerintahan yang oleh undang-undang ditentukan sebagai urusan Pemerintah Pusat. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (6) Pemerintahan daerah berhak menetapkan peraturan daerah dan peraturan- peraturan lain untuk melaksanakan otonomi dan tugas pembantuan. **) (7) Susunan dan tata cara penyelenggaraan pemerintahan daerah diatur dalam undang-undang. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 18A (1) Hubungan wewenang antara pemerintah pusat dan pemerintah daerah provinsi, kabupaten, dan kota atau antara provinsi dan kabupaten dan kota, diatur dengan Undang-undang dengan memperhatikan kekhususan dan keragaman daerah. **) (2) Hubungan keuangan, pelayanan umum, pemanfatan sumber daya alam dan sumber daya lainnya antara pemerintah pusat dan pemerintahan daerah diatur dan dilaksanakan secara adil dan selaras berdasarkan undang- undang. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18B",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 18B (1) Negara mengakui dan menghormati satuan-satuan pemerintahan daerah yang bersifat khusus atau bersifat istimewa yang diatur dengan Undang- undang. **) (2) Negara mengakui dan menghormati kesatuan-kesatuan masyarakat hukum adat serta hak-hak tradisonalnya sepanjang masih hidup dan sesuai dengan perkembangan masyarakat dan prinsip Negara Kesatuan Republik Indonesia, yang diatur dalam undang-undang. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "BAB",
      "label": "BAB VII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VII DEWAN PERWAKILAN RAKYAT"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 19 (1) Anggota Dewan Perwakilan Rakyat dipilih melalui pemilihan umum. **) (2) Susunan Dewan Perwakilan rakyat diatur dengan undang-undang. **) (3) Dewan Perwakilan Rakyat bersidang sedikitnya sekali dalam setahun. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 20 (1) Dewan Perwakilan Rakyat memegang kekuasaan membentuk undang- undang. *) (2) Setiap rancangan undang-undang dibahas oleh Dewan Perwakilan Rakyat dan Presiden untuk mendapat persetujuan bersama. *) (3) Jika rancangan undang-undang itu tidak mendapat persetujuan bersama, rancangan undang-undang itu tidak boleh diajukan lagi dalam persidangan Dewan Perwakilan Rakyat masa itu. *) (4) Presiden mengesahkan rancangan undang-undang yang telah disetujui bersama untuk menjadi undang-undang. *) (5) Dalam hal rancangan undang-undang yang telah disetujui bersama tersebut tidak disahkan oleh Presiden dalam waktu tiga puluh hari semenjak rancangan undang-undang tersebut disetujui, rancangan undang-undang tersebut sah menjadi undang-undang dan wajib diundangkan. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 20A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 20A (1) Dewan Perwakilan Rakyat memiliki fungsi legislasi, fungsi anggaran dan fungsi pengawasan. **) (2) Dalam melaksanakan fungsinya, selain hak yang diatur dalam pasal-pasal lain Undang-Undang Dasar ini, Dewan Perwakilan Rakyat mempunyai hak interpelasi, hak angket, dan hak menyatakan pendapat. **) (3) Selain hak yang diatur dalam pasal-pasal lain Undang-Undang Dasar ini, Dewan Perwakilan Rakyat mempunyai hak mengajukan pertanyaan, menyampaikan usul dan pendapat, serta hak imunitas. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (4) Ketentuan lebih lanjut tentang hak Dewan Perwakilan Rakyat dan hak anggota Dewan Perwakilan Rakyat diatur dalam undang-undang. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 21 Anggota Dewan Perwakilan Rakyat berhak mengajukan usul rancangan undang-undang. *)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 22 (1) Dalam hal ihwal kegentingan yang memaksa, Presiden berhak menetapkan peraturan pemerintah sebagai pengganti undang-undang.\n(2) Peraturan pemerintah itu harus mendapat persetujuan Dewan Perwakilan Rakyat dalam persidangan yang berikut.\n(3) Jika tidak mendapat persetujuan, maka peraturan pemerintah itu harus dicabut."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 22A Ketentuan lebih lanjut tentang tata cara pembentukan undang-undang diatur dengan undang-undang. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22B",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 22B Anggota Dewan Perwakilan Rakyat dapat diberhentikan dari jabatannya, yang syarat-syarat dan tata caranya diatur dalam undang-undang. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "BAB",
      "label": "BAB VIIA",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIIA ***) DEWAN PERWAKILAN DAERAH"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22C",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIIA",
      "teks": "Pasal 22C (1) Anggota Dewan Perwakilan Daerah dipilih dari setiap provinsi melalui pemilihan umum. ***) (2) Anggota Dewan Perwakilan Daerah dari setiap provinsi jumlahnya sama dan jumlah seluruh anggota Dewan Perwakilan Daerah itu tidak lebih dari sepertiga jumlah anggota Dewan Perwakilan Rakyat. ***) (3) Dewan Perwakilan Daerah bersidang sedikitnya sekali dalam setahun.\n***) (4) Susunan dan kedudukan Dewan Perwakilan Daerah diatur dengan undang-undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22D",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIIA",
      "teks": "Pasal 22D (1) Dewan Perwakilan Daerah dapat mengajukan kepada Dewan Perwakilan Rakyat rancangan undang-undang yang berkaitan dengan otonomi daerah, hubungan pusat dan daerah, pembentukan dan pemekaran serta penggabungan daerah, pengelolaan sumber daya alam dan sumber daya ekonomi lainnya, serta yang berkaitan dengan perimbangan keuangan pusat dan daerah. ***) (2) Dewan Perwakilan Daerah ikut membahas rancangan undang-undang yang berkaitan dengan otonomi daerah; hubungan pusat dan daerah; pembentukan, pemekaran, dan penggabungan daerah; pengelolaan sumber daya alam dan sumber daya ekonomi lainnya, serta perimbangan keuangan pusat dan daerah; serta memberikan pertimbangan kepada Dewan Perwakilan Rakyat atas rancangan undang-undang anggaran pendapatan dan belanja negara dan rancangan undang-undang yang berkaitan dengan pajak, pendidikan, dan agama. ***) (3) Dewan Perwakilan Daerah dapat melakukan pengawasan atas pelaksanaan undang-undang mengenai : otonomi daerah, pembentukan, pemekaran dan penggabungan daerah, hubungan pusat dan daerah, pengelolaan sumber daya alam dan sumber daya ekonomi lainnya, pelaksanaan anggaran pendapatan dan belanja negara, pajak, pendidikan, dan agama serta menyampaikan hasil pengawasannya itu kepada Dewan Perwakilan Rakyat sebagai bahan pertimbangan untuk ditindaklanjuti. ***) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (4) Anggota Dewan Perwakilan Daerah dapat diberhentikan dari jabatannya, yang syarat-syarat dan tata caranya diatur dalam undang-undang. ***)"
    },
    {
      "tipe": "BAB",
      "label": "BAB VIIB",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIIB ***) PEMILIHAN UMUM"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 22E",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIIB",
      "teks": "Pasal 22E (1) Pemilihan umum dilaksanakan secara langsung, umum, bebas, rahasia, jujur, dan adil setiap lima tahun sekali. ***) (2) Pemilihan umum diselenggarakan untuk memilih anggota Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, Presiden dan Wakil Presiden dan Dewan Perwakilan Rakyat Daerah. ***) (3) Peserta pemilihan umum untuk memilih anggota Dewan Perwakilan Rakyat dan anggota Dewan Perwakilan Rakyat Daerah adalah partai politik. ***) (4) Peserta pemilihan umum untuk memilih anggota Dewan Perwakilan Daerah adalah perseorangan. ***) (5) Pemilihan umum diselenggarakan oleh suatu komisi pemilihan umum yang bersifat nasional, tetap, dan mandiri. ***) (6) Ketentuan lebih lanjut tentang pemilihan umum diatur dengan undang- undang. ***)"
    },
    {
      "tipe": "BAB",
      "label": "BAB VIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIII HAL KEUANGAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 23 (1) Anggaran pendapatan dan belanja negara sebagai wujud dari pengelolaan keuangan negara ditetapkan setiap tahun dengan undang-undang dan dilaksanakan secara terbuka dan bertanggung jawab untuk sebesar- besarnya kemakmuran rakyat. ***) (2) Rancangan undang-undang anggaran pendapatan dan belanja negara diajukan oleh Presiden untuk dibahas bersama Dewan Perwakilan Rakyat dengan memperhatikan pertimbangan Dewan Perwakilan Daerah. ***) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (3) Apabila Dewan Perwakilan Rakyat tidak menyetujui rancangan anggaran pendapatan dan belanja negara yang diusulkan oleh Presiden, Pemerintah menjalankan Anggaran Pendapatan dan Belanja Negara tahun yang lalu.\n***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 23A Pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan undang-undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23B",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 23B Macam dan harga mata uang ditetapkan dengan undang-undang. ****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23C",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 23C Hal-hal lain mengenai keuangan negara diatur dengan undang-undang.\n***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23D",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 23D Negara memiliki suatu bank sentral yang susunan, kedudukan, kewenangan, tanggung jawab, dan independensinya diatur dengan undang- undang. ****)"
    },
    {
      "tipe": "BAB",
      "label": "BAB VIIIA",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIIIA ***) BADAN PEMERIKSA KEUANGAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23E",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIIIA",
      "teks": "Pasal 23E (1) Untuk memeriksa pengelolaan dan tanggung jawab tentang keuangan negara diadakan satu Badan Pemeriksa Keuangan yang bebas dan mandiri.\n***) (2) Hasil pemeriksaan keuangan negara diserahkan kepada Dewan Perwakilan Rakyat, Dewan Perwakilan Daerah, dan Dewan Perwakilan Rakyat Daerah, sesuai dengan kewenangannya. ***) (3) Hasil pemeriksaan tersebut ditindaklanjuti oleh lembaga perwakilan dan/atau  badan sesuai dengan undang-undang. ***) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23F",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIIIA",
      "teks": "Pasal 23F (1) Anggota Badan Pemeriksa Keuangan dipilih oleh Dewan Perwakilan Rakyat dengan memperhatikan pertimbangan Dewan Perwakilan Daerah dan diresmikan oleh Presiden. ***) (2) Pimpinan Badan Pemeriksa Keuangan dipilih dari dan oleh anggota. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 23G",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIIIA",
      "teks": "Pasal 23G (1) Badan Pemeriksa Keuangan berkedudukan di ibu kota negara, dan memiliki perwakilan di setiap provinsi. ***) (2) Ketentuan lebih lanjut mengenai Badan Pemeriksa Keuangan diatur dengan undang-undang. ***)"
    },
    {
      "tipe": "BAB",
      "label": "BAB IX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IX KEKUASAAN KEHAKIMAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 24 (1) Kekuasaan kehakiman merupakan kekuasaan yang merdeka untuk menyelenggarakan peradilan guna menegakkan hukum dan keadilan. ***) (2) Kekuasaan kehakiman dilakukan oleh sebuah Mahkamah Agung dan badan peradilan yang berada di bawahnya dalam lingkungan peradilan umum, lingkungan peradilan agama, lingkungan peradilan militer, lingkungan peradilan tata usaha negara, dan oleh sebuah Mahkamah Konstitusi. ***) (3) Badan-badan lain yang fungsinya berkaitan dengan kekuasaan kehakiman diatur dalam undang-undang. ****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 24A (1) Mahkamah Agung berwenang mengadili pada tingkat kasasi, menguji peraturan perundang-undangan di bawah undang-undang terhadap undang-undang, dan mempunyai wewenang lainnya yang diberikan oleh undang-undang. ***) (2) Hakim agung harus memiliki integritas dan kepribadian yang tidak tercela, adil, profesional, dan berpengalaman di bidang hukum. ***) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (3) Calon hakim agung diusulkan Komisi Yudisial kepada Dewan Perwakilan Rakyat untuk mendapatkan persetujuan dan selanjutnya ditetapkan sebagai hakim agung oleh Presiden. ***) (4) Ketua dan wakil ketua Mahkamah Agung dipilih dari dan oleh hakim agung.\n***) (5) Susunan, kedudukan, keanggotaan, dan hukum acara Mahkamah Agung serta badan peradilan di bawahnya diatur dengan undang-undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24B",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 24B (1) Komisi Yudisial bersifat mandiri yang berwenang mengusulkan pengangkatan hakim agung dan mempunyai wewenang lain dalam rangka menjaga dan menegakkan kehormatan, keluhuran martabat, serta perilaku hakim. ***) (2) Anggota Komisi Yudisial harus mempunyai pengetahuan dan pengalaman di bidang hukum serta memiliki integritas dan kepribadian yang tidak tercela.\n***) (3) Anggota Komisi Yudisial diangkat dan diberhentikan oleh Presiden dengan persetujuan Dewan Perwakilan Rakyat. ***) (4) Susunan, kedudukan, dan keanggotaan Komisi Yudisial diatur dengan undang-undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 24C",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 24C (1) Mahkamah Konstitusi berwenang mengadili pada tingkat pertama dan terakhir yang putusannya bersifat final untuk menguji undang-undang terhadap Undang-Undang Dasar, memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh Undang-Undang Dasar, memutus pembubaran partai politik, dan memutus perselisihan tentang hasil pemilihan umum. ***) (2) Mahkamah Konstitusi wajib memberikan putusan atas pendapat Dewan Perwakilan Rakyat mengenai dugaan pelanggaran oleh Presiden dan/atau Wakil Presiden menurut Undang-Undang Dasar. ***) (3) Mahkamah Konstitusi mempunyai sembilan orang anggota hakim konstitusi yang ditetapkan oleh Presiden, yang diajukan masing-masing tiga orang *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat oleh Mahkamah Agung, tiga orang oleh Dewan Perwakilan Rakyat, dan tiga orang oleh Presiden. ***) (4) Ketua dan Wakil Ketua Mahkamah Konstitusi dipilih dari dan oleh hakim konstitusi. ***) (5) Hakim konstitusi harus memiliki integritas dan kepribadian yang tidak tercela, adil, negarawan yang menguasai konstitusi dan ketatanegaraan, serta tidak merangkap sebagai pejabat negara. ***) (6) Pengangkatan dan pemberhentian hakim konstitusi, hukum acara serta ketentuan lainnya tentang Mahkamah Konstitusi diatur dengan undang- undang. ***)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 25 Syarat-syarat untuk menjadi dan untuk diperhentikan sebagai hakim ditetapkan dengan undang-undang."
    },
    {
      "tipe": "BAB",
      "label": "BAB IXA",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IXA **) WILAYAH NEGARA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 25A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IXA",
      "teks": "Pasal 25A****) Negara Kesatuan Republik Indonesia adalah sebuah negara kepulauan yang berciri Nusantara dengan wilayah yang batas-batas dan hak-haknya ditetapkan dengan undang-undang. **)"
    },
    {
      "tipe": "BAB",
      "label": "BAB X",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB X WARGA NEGARA DAN PENDUDUK **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 26",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 26 (1) Yang menjadi warga negara ialah orang-orang bangsa Indonesia asli dan orang-orang bangsa lain yang disahkan dengan undang-undang sebagai warga negara.\n(2) Penduduk ialah warga negara Indonesia dan orang asing yang bertempat tinggal di Indonesia. **) (3) Hal-hal mengenai warga negara dan penduduk diatur dengan undang- undang. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 27",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 27 (1) Segala warga negara bersamaan kedudukannya di dalam hukum dan pemerintahan dan wajib menjunjung hukum dan pemerintahan itu dengan tidak ada kecualinya.\n(2) Tiap-tiap warga negara berhak atas pekerjaan dan penghidupan yang layak bagi kemanusiaan.\n(3) Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 28 Kemerdekaan berserikat dan berkumpul, mengeluarkan pikiran dengan lisan dan tulisan dan sebagainya ditetapkan dengan undang-undang."
    },
    {
      "tipe": "BAB",
      "label": "BAB XA",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XA **) HAK ASASI MANUSIA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28A Setiap orang berhak untuk hidup serta berhak mempertahankan hidup dan kehidupannya. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28B",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28B (1) Setiap orang berhak membentuk keluarga dan melanjutkan keturunan melalui perkawinan yang sah. **) (2) Setiap anak berhak atas kelangsungan hidup, tumbuh, dan berkembang serta berhak atas perlindungan dari kekerasan dan diskriminasi. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28C",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28C (1) Setiap orang berhak mengembangkan diri melalui pemenuhan kebutuhan dasarnya, berhak mendapat pendidikan dan memperoleh manfaat dari ilmu pengetahuan dan teknologi, seni dan budaya, demi meningkatkan kualitas hidupnya dan demi kesejahteraan umat manusia. **) (2) Setiap orang berhak untuk memajukan dirinya dalam memperjuangkan haknya secara kolektif untuk membangun masyarakat, bangsa dan negaranya. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28D",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28D (1) Setiap orang berhak atas pengakuan, jaminan, perlindungan, dan kepastian hukum yang adil serta perlakuan yang sama dihadapan hukum. **) (2) Setiap orang berhak untuk bekerja serta mendapat imbalan dan perlakuan yang adil dan layak dalam hubungan kerja. **) (3) Setiap warga negara berhak memperoleh kesempatan yang sama dalam pemerintahan. **) (4) Setiap orang berhak atas status kewarganegaraan. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28E",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28E (1) Setiap orang bebas memeluk agama dan beribadat menurut agamanya, memilih pendidikan dan pengajaran, memilih pekerjaan, memilih kewarganegaraan, memilih tempat tinggal diwilayah negara dan meninggalkannya, serta berhak kembali. **) (2) Setiap orang atas kebebasan meyakini kepercayaan, menyatakan pikiran dan sikap, sesuai dengan hati nuraninya. **) (3) Setiap orang berhak atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28F",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28F Setiap orang berhak untuk berkomunikasi dan memperoleh informasi untuk mengembangkan pribadi dan lingkungan sosialnya, serta berhak untuk mencari, memperoleh, memiliki, menyimpan, mengolah, dan menyampaikan informasi dengan menggunakan segala jenis saluran yang tersedia. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28G",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28G (1) Setiap orang berhak atas perlindungan diri pribadi, keluarga, kehormatan, martabat, dan harta benda yang dibawah kekuasaannya, serta berhak atas rasa aman dan perlindungan dari ancaman ketakutan untuk berbuat atau tidak berbuat sesuatu yang merupakan hak asasi. **) (2) Setiap orang berhak untuk bebas dari penyiksaan dan perlakuan yang merendahkan derajat martabat manusia dan berhak memperoleh suaka politik dari negara lain. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28H",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28H (1) Setiap orang berhak hidup sejahtera lahir dan batin, bertempat tinggal, dan medapatkan lingkungan hidup baik dan sehat serta berhak memperoleh pelayanan kesehatan. **) (2) Setiap orang mendapat kemudahan dan perlakuan khusus untuk memperoleh kesempatan dan manfaat yang sama guna mencapai persamaan dan keadilan. **) (3) Setiap orang berhak atas jaminan sosial yang memungkinkan pengembangan dirinya secara utuh sebagai manusia yang bermartabat. **) (4) Setiap orang berhak mempunyai hak milik pribadi dan hak milik tersebut tidak boleh diambil alih secara sewenang-wenang oleh siapa pun. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28I (1) Hak untuk hidup, hak untuk tidak disiksa, hak kemerdekaan pikiran dan hati nurani, hak beragama, hak untuk tidak diperbudak, hak untuk diakui sebagai pribadi dihadapan hukum, dan hak untuk tidak dituntut atas dasar hukum yang berlaku surut adalah hak asasi manusia yang tidak dapat dikurangi dalam keadaan apa pun. **) (2) Setiap orang berhak bebas atas perlakuan yang bersifat diskriminatif atas dasar apa pun dan berhak mendapatkan perlindungan terhadap perlakuan yang bersifat diskriminatif itu. **) (3) Identitas budaya dan hak masyarakat tradisional dihormati selaras dengan perkembangan zaman dan peradaban. **) (4) Perlindungan, pemajuan, penegakan, dan pemenuhan hak asasi manusia adalah tanggung jawab negara, terutama pemerintah. **) (5) Untuk menegakan dan melindungi hak assi manusia sesuai dengan prinsip negara hukum yang demokratis, maka pelaksanaan hak asasi manusia dijamin, diatur, dan dituangkan dalam peraturan perundangan-undangan.\n**) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 28J",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XA",
      "teks": "Pasal 28J (1) Setiap orang wajib menghormati hak asasi manusia orang lain dalam tertib kehidupan bermasyarakat, berbangsa, dan bernegara. **) (2) Dalam menjalankan hak dan kebebasannya, setiap orang wajib tunduk kepada pembatasan yang ditetapkan dengan undang-undang dengan maksud semata-mata untuk menjamin pengakuan serta penghormatan atas hak kebebasan orang lain dan untuk memenuhi tuntutan yang adil sesuai dengan pertimbangan moral, nilai-nilai agama, keamanan, dan ketertiban umum dalam suatu masyarakat demokratis. **)"
    },
    {
      "tipe": "BAB",
      "label": "BAB XI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XI A G A M A"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 29",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "teks": "Pasal 29 (1) Negara berdasar atas Ketuhanan Yang Maha Esa.\n(2) Negara menjamin kemerdekaan tiap-tiap penduduk untuk memeluk agamanya masing-masing dan untuk beribadat menurut agamanya dan kepercayaannya itu."
    },
    {
      "tipe": "BAB",
      "label": "BAB XII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XII PERTAHANAN DAN KEAMANAN NEGARA **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 30",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Pasal 30 (1) Tiap-tiap warga negara berhak dan wajib ikut serta dalam usaha pertahanan dan keamanan negara. **) (2) Usaha pertahanan dan keamanan negara dilaksanakan melalui sistem pertahanan dan keamanan rakyat semesta oleh Tentara Nasional Indonesia dan Kepolisian Negara Indonesia Republik Indonesia, sebagai kekuatan utama, dan rakyat, sebagai kekuatan pendukung. **) (3) Tentara Nasional Indonesia terdiri atas Angkatan Darat, Angkatan Laut dan Angkatan Udara sebagai alat negara bertugas mempertahankan, melindungi, dan memelihara keutuhan dan kedaulatan negara. **) (4) Kepolisian Negara Republik Indonesia sebagai alat negara yang menjaga kemanan dan ketertiban masyarakat bertugas melindungi, mengayomi, melayani masyarakat, serta menegakkan hukum. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat (5) Susunan dan kedudukan Tentara Nasional Indonesia, Kepolisian Negara Republik Indonesia, hubungan kewenangan Tentara Nasional Indonesia dan Kepolisian Negara Republik Indonesia di dalam menjalankan tugasnya, syarat-syarat keikutsertaan warga negara dalam usaha pertahanan dan keamanan diatur dengan undang-undang. **)"
    },
    {
      "tipe": "BAB",
      "label": "BAB XIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIII PENDIDIKAN DAN KEBUDAYAAN****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 31",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "teks": "Pasal 31 (1) Setiap warga negara berhak mendapat pendidikan. ****) (2) Setiap warga negara wajib mengikuti pendidikan dasar dan pemerintah wajib membiayainya. ****) (3) Pemerintah mengusahakan dan menyelenggarakan satu sistem pendidikan nasional, yang meningkatkan keimanan dan ketakwaan serta akhlak mulia dalam rangka mencerdaskan kehidupan bangsa, yang diatur dengan undang-undang. ****) (4) Negara memprioritaskan anggaran pendidikan sekurang-kurangnya dua puluh persen dari anggaran pendapatan dan belanja negara serta dari aggaran pendapatan dan belanja daerah untuk memenuhi kebutuhan penyelenggaraan pendidikan nasional. ****) (5) Pemerintah memajukan ilmu pengetahuan dan tekhnologi dengan menjunjung tinggi nilai-nilai agama dan persatuan bangsa untuk kemajuan peradaban serta kesejahteraan umat manusia. ****) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 32",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "teks": "Pasal 32 (1) Negara memajukan kebudayaan nasional Indonesia di tengah peradaban dunia dengan menjamin kebebasan masyarakat dalam memelihara dalam mengembangkan nilai-nilai budayanya. ****) (2) Negara menghormati dan memelihara bahasa daerah sebagai kekayaan budaya nasional. ****)"
    },
    {
      "tipe": "BAB",
      "label": "BAB XIV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XIV PEREKONOMIAN NASIONAL DAN KESEJAHTERAAN SOSIAL****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 33",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 33 (1) Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan.\n(2) Cabang-cabang produksi yang penting bagi negara dan yang menguasai hajat hidup orang banyak dikuasai oleh negara.\n(3) Bumi dan air dan kekayaan alam yang terkandung di dalamnya dikuasai oleh negara dan dipergunakan untuk sebesar-besar kemakmuran rakyat.\n(4) Perekonomian nasional diselenggarakan berdasar atas demokrasi ekonomi dengan prinsip kebersamaan, efisiensi berkeadilan, berkelanjutan, berwawasan lingkungan, kemandirian, serta dengan menjaga keseimbangan kemajuan dan kesatuan ekonomi nasional. ****) (5) Ketentuan lebih lanjut mengenai pelaksanaan pasal ini diatur dalam undang-undang. ****) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 34",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 34 (1) Fakir miskin dan anak-anak terlantar dipelihara oleh negara. ****) (2) Negara mengembangkan sistim jaminan sosial bagi seluruah rakyat dan memberdayakan masyarakat yang lemah dan tidak mampu sesuai dengan martabat kemanusiaan. ****) (3) Negara bertanggungjawab atas penyediaan fasilitas pelayanan kesehatan dan fasilitas pelayanan umum yang layak. ****) (4) Ketentuan lebih lanjut mengenai pelaksanaan pasal ini diatur dalam undang-undang. ****)"
    },
    {
      "tipe": "BAB",
      "label": "BAB XV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XV BENDERA, BAHASA, DAN LAMBANG NEGARA , SERTA LAGU KEBANGSAAN **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 35",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "teks": "Pasal 35 Bendera Negara Indonesia ialah Sang Merah Putih."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "teks": "Pasal 36 Bahasa Negara ialah Bahasa Indonesia."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36A",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "teks": "Pasal 36A Lambang negara ialah Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36B",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "teks": "Pasal 36B Lagu Kebangsaan ialah Indonesia Raya. **)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 36C",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XV",
      "teks": "Pasal 36C Ketentuan lebih lanjut mengenai Bendera, Bahasa, dan Lambang Negara, serta Lagu Kebangsaan diatur dengan undang-undang. **) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "BAB",
      "label": "BAB XVI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XVI PERUBAHAN UNDANG-UNDANG DASAR"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 37",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XVI",
      "teks": "Pasal 37 (1) Usul perubahan pasal-pasal Undang-Undang Dasar dapat diagendakan dalam sidang Majelis Permusyawaratan Rakyat apabila diajukan oleh sekurang-kurangnya 1/3 dari jumlah anggota Majelis Permusyawaratan Rakyat. ****) (2) Setiap usul perubahan pasal-pasal Undang-Undang Dasar diajukan secara tertulis dan ditunjukkan dengan jelas bagian yang diusulkan untuk diubah beserta alasannya. ****) (3) Untuk mengubah pasal-pasal Undang-Undang Dasar, sidang Majelis Permusyawaratan Rakyat dihadiri sekurang-kurangnya 2/3 dari jumlah anggota Majelis Permusyawaratan Rakyat. ****) (4) Putusan untuk mengubah pasal-pasal Undang-Undang Dasar dilakukan dengan persetujuan sekurang-kurangnya limapuluh persen ditambah satu anggota dari seluruh anggota Majelis Permusyawaratan Rakyat. ****) (5) Khusus mengenai bentuk negara Kesatuan Republik Indonesia tidak dapat dilakukan perubahan. ****)"
    },
    {
      "tipe": "ATURAN_PERALIHAN",
      "label": "ATURAN PERALIHAN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "ATURAN_PERALIHAN",
      "teks": "ATURAN PERALIHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "ATURAN PERALIHAN",
      "teks": "Pasal I Segala peraturan perundang-undangan yang ada masih tetap berlaku selama belum diadakan yang baru menurut Undang-Undang Dasar ini. ****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "ATURAN PERALIHAN",
      "teks": "Pasal II Semua lembaga negara yang ada masih tetap berfungsi sepanjang untuk melaksanakan ketentuan Undang-Undang Dasar dan belum diadakan yang baru menurut Undang-Undang Dasar ini. ****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "ATURAN PERALIHAN",
      "teks": "Pasal III Mahkamah Konstitusi dibentuk selambat-lambatnya pada 17 Agustus 2003 dan sebelum dibentuk segala kewenangannya dilakukan oleh Mahkamah Agung.\n****) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
    },
    {
      "tipe": "ATURAN_TAMBAHAN",
      "label": "ATURAN TAMBAHAN",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "ATURAN_TAMBAHAN",
      "teks": "ATURAN TAMBAHAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal I",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "ATURAN TAMBAHAN",
      "teks": "Pasal I Majelis Permusyawaratan Rakyat ditugasi untuk melakukan peninjauan terhadap materi dan status hukum Ketetapan Majelis Permusyawaratan Rakyat Sementara dan Ketetapan Majelis Permusyawaratan Rakyat untuk diambil putusan pada sidang Majelis Permusyawaratan Rakyat tahun 2003. ****)"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "ATURAN TAMBAHAN",
      "teks": "Pasal II Dengan ditetapkannya perubahan Undang-Undang Dasar ini, Undang- Undang Dasar Negara Republik Indonesia Tahun 1945 terdiri atas Pembukaan dan pasal-pasal. ****) *) :\nPerubahan Pertama **) :\nPerubahan Kedua ***) :\nPerubahan Ketiga ****) :\nPerubahan Keempat"
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
                $this->command->info("Data UUD 1945 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding UUD 1945 selesai!");

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

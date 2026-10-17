<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Peraturan;
use App\Models\SubjekPeraturan;
use Carbon\Carbon;

class OcrPerdaBali1Tahun2010Seeder extends Seeder
{
    public function run(): void
    {
        $jsonContent = <<<'JSON'
{
  "metadata": {
    "standard_id": "peraturan-daerah-provinsi-bali-1-2010",
    "tipe_peraturan": "Perda",
    "judul": "Peraturan Daerah (Perda) Provinsi Bali Nomor 1 Tahun 2010 tentang USAHA JASA PERJALANAN WISATA",
    "tahun": "2010",
    "tempat_penetapan": "Bali",
    "tanggal_penetapan": "27 April 2010",
    "tanggal_pengundangan": "27 April 2010",
    "tanggal_berlaku": "",
    "status": "Berlaku",
    "pemrakarsa": "Pemerintah Provinsi Bali",
    "dicabut_dengan": "",
    "dicabut_sebagian_dengan": "",
    "mencabut": "",
    "mencabut_sebagian": "",
    "diubah_dengan": "",
    "mengubah": "",
    "sumber_dokumen": "peraturan_daerah_provinsi_bali_nomor_1_tahun_2010_tentang_usaha_jasa_perjalanan_wisata.pdf",
    "id_dokumen": "peraturan_daerah_provinsi_bali_nomor_1_tahun_2010_tentang_usaha_jasa_perjalanan_wisata",
    "metode_ekstraksi": "full_ocr_v3",
    "total_halaman": 14,
    "total_chunk": 62,
    "waktu_eksekusi_detik": 82.71,
    "waktu_proses": "2026-10-07 16:55:50"
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
        "standard_id": "undang-undang-r-None",
        "judul_referensi": "Undang-Undang Nomor r",
        "teks_asli": "1. Undang-Undang Nomor r 64 Tahun 1958 tentang Pembentukan Daerah-daerah Tingkat I Bali, Nusa Tenggara Barat dan Nusa Tenggara Timur (Lembaran Negara Republik Indonesia Tahun 1958 Nomor 115, Tambahan Lembaran Negara Republik Indonesia Nomor 1649 );"
      },
      {
        "standard_id": "undang-undang-8-1981",
        "judul_referensi": "Undang-Undang Nomor 8 Tahun 1981 tentang Kitab Undang- Undang Hukum Acara Pidana (Lembaran Negara Republik Indonesia Tahun 1981 Nomor 76",
        "teks_asli": "2. Undang-Undang Nomor 8 Tahun 1981 tentang Kitab Undang- Undang Hukum Acara Pidana (Lembaran Negara Republik Indonesia Tahun 1981 Nomor 76, Tambahan Lembaran Negara Republik Indonesia Nomor 3209);"
      },
      {
        "standard_id": "undang-undang-8-1999",
        "judul_referensi": "Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen(Lembaran Negara Tahun 1999 Nomor 42",
        "teks_asli": "3. Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen(Lembaran Negara Tahun 1999 Nomor 42, Tambahan Lembaran Negara Republik Indonesia Nomor 3821);"
      },
      {
        "standard_id": "undang-undang-10-2004",
        "judul_referensi": "Undang-Undang Nomor 10 Tahun 2004 tentang Pembentukan Peraturan Perundang-undangan (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 53",
        "teks_asli": "5. Undang-Undang Nomor 10 Tahun 2004 tentang Pembentukan Peraturan Perundang-undangan (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 53, Tambahan Lembaran Negara Republik Indonesia Nomor 4389);"
      },
      {
        "standard_id": "undang-undang-32-2004",
        "judul_referensi": "Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 125",
        "teks_asli": "6. Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 125, Tambahan Lembaran Negara Republik Indonesia Nomor 4437) sebagaimana telah diubah beberapa kali, terakhir dengan Undang-Undang Nomor 12 Tahun 2008 tentang Perubahan Kedua Atas Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2008 Nomor 59, Tambahan Lembaran Negara Republik Indonesia Nomor 4844);"
      },
      {
        "standard_id": "undang-undang-40-2007",
        "judul_referensi": "Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas (Lembaran Negara Republik Indonesia Tahun 2007 Nomor 106",
        "teks_asli": "7. Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas (Lembaran Negara Republik Indonesia Tahun 2007 Nomor 106, Tambahan Lembaran Negara Republik Indonesia Nomor 3821);"
      },
      {
        "standard_id": "undang-undang-11-2008",
        "judul_referensi": "Undang-Undang Nomor 11 Tahun 2008 tentang Informasi Transaksi Elektronik (Lembaran Negara Republik Indonesia Tahun 2008 Nomor 58",
        "teks_asli": "8. Undang-Undang Nomor 11 Tahun 2008 tentang Informasi Transaksi Elektronik (Lembaran Negara Republik Indonesia Tahun 2008 Nomor 58, Tambahan Lembaran Negara Republik Indonesia Nomor 4843);"
      },
      {
        "standard_id": "undang-undang-10-None",
        "judul_referensi": "Undang-Undang Nomor 10",
        "teks_asli": "9. Undang-Undang Nomor 10 Tahun tentang Kepariwisataan (Lembaran Negara Republik Indonesia Tahun 2009 Nomor 11, Tambahan Lembaran Negara Republik Indonesia Nomor 4966);"
      },
      {
        "standard_id": "peraturan-pemerintah-38-2007",
        "judul_referensi": "Peraturan Pemerintah Nomor 38 Tahun 2007 tentang Pembagian Urusan Pemerintahan Antara Pemerintah",
        "teks_asli": "10. Peraturan Pemerintah Nomor 38 Tahun 2007 tentang Pembagian Urusan Pemerintahan Antara Pemerintah, Pemerintahan Daerah Provinsi dan Pemerintahan Daerah Kabupaten/Kota (Lembaran Negara Republik Indonesia Tahun 2007 Nomor 82, Tambahan Lembaran Negara Republik Indonesia Nomor 4737);"
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
      "teks": "PERATURAN DAERAH PROVINSI BALI NOMOR 1 TAHUN 2010 TENTANG USAHA JASA PERJALANAN WISATA DENGAN RAHMAT TUHAN YANG MAHA ESA GUBERNUR BALI,"
    },
    {
      "tipe": "KONSIDERANS",
      "label": "Menimbang",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > KONSIDERANS",
      "teks": "Menimbang : a. bahwa Pembangunan Kepariwisataan di Provinsi Bali yang berlandaskan Budaya Bali sebagai sumber daya dan modal dasar perlu terus dikembangkan untuk meningkatkan pendapatan daerah, memperluas dan memeratakan kesempatan berusaha dan kesempatan kerja, mendorong pembangunan daerah, memperkokoh dan mendayagunakan destinasi dan daya tarik wisata di Bali;\nb. bahwa dalam menghadapi perubahan global dan penguatan hak pribadi masyarakat untuk berpartisipasi dalam usaha jasa perjalanan wisata perlu mengatur dan mengelola usaha jasa perjalanan wisata untuk pemenuhan perlindungan hukum, keamanan, dan keselamatan kepada wisatawan;\nc. bahwa usaha jasa perjalanan wisata adalah salah satu bagian dari usaha jasa di sektor Pariwisata yang perkembangannya sangat pesat dan diminati oleh masyarakat untuk meningkatkan kesejahteraannya;\nd. bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, huruf b, dan huruf c perlu membentuk Peraturan Daerah tentang Usaha Jasa Perjalanan Wisata;"
    },
    {
      "tipe": "DASAR_HUKUM",
      "label": "Mengingat",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DASAR_HUKUM",
      "teks": "Mengingat : 1. Undang-Undang Nomor r 64 Tahun 1958 tentang Pembentukan Daerah-daerah Tingkat I Bali, Nusa Tenggara Barat dan Nusa Tenggara Timur (Lembaran Negara Republik Indonesia Tahun 1958 Nomor 115, Tambahan Lembaran Negara Republik Indonesia Nomor 1649 );\n2. Undang-Undang Nomor 8 Tahun 1981 tentang Kitab Undang- Undang Hukum Acara Pidana (Lembaran Negara Republik Indonesia Tahun 1981 Nomor 76, Tambahan Lembaran Negara Republik Indonesia Nomor 3209);\n3. Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen(Lembaran Negara Tahun 1999 Nomor 42, Tambahan Lembaran Negara Republik Indonesia Nomor 3821);\n4. Undang-Undang N Nomor 13 Tahun 2003 tentang Ketenagakerjaan (Lembaran Negara Republik Indonesia Tahun 2003 Nomor 39, Tambahan Lembaran Negara Republik Indonesia Nomor 4279);\n5. Undang-Undang Nomor 10 Tahun 2004 tentang Pembentukan Peraturan Perundang-undangan (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 53, Tambahan Lembaran Negara Republik Indonesia Nomor 4389);\n6. Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 125, Tambahan Lembaran Negara Republik Indonesia Nomor 4437) sebagaimana telah diubah beberapa kali, terakhir dengan Undang-Undang Nomor 12 Tahun 2008 tentang Perubahan Kedua Atas Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2008 Nomor 59, Tambahan Lembaran Negara Republik Indonesia Nomor 4844);\n7. Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas (Lembaran Negara Republik Indonesia Tahun 2007 Nomor 106, Tambahan Lembaran Negara Republik Indonesia Nomor 3821);\n8. Undang-Undang Nomor 11 Tahun 2008 tentang Informasi Transaksi Elektronik (Lembaran Negara Republik Indonesia Tahun 2008 Nomor 58, Tambahan Lembaran Negara Republik Indonesia Nomor 4843);\n9. Undang-Undang Nomor 10 Tahun tentang Kepariwisataan (Lembaran Negara Republik Indonesia Tahun 2009 Nomor 11, Tambahan Lembaran Negara Republik Indonesia Nomor 4966);\n10. Peraturan Pemerintah Nomor 38 Tahun 2007 tentang Pembagian Urusan Pemerintahan Antara Pemerintah, Pemerintahan Daerah Provinsi dan Pemerintahan Daerah Kabupaten/Kota (Lembaran Negara Republik Indonesia Tahun 2007 Nomor 82, Tambahan Lembaran Negara Republik Indonesia Nomor 4737);\n11. Peraturan Daerah Provinsi Bali Nomor 7 Tahun 2007 tentang Usaha Penyediaan Sarana Wisata Tirta (Lembaran Daerah Provinsi Bali Tahun 2007 Nomor 7, Tambahan Lembaran Daerah Provinsi Bali Nomor 6);\n12. Peraturan Daerah Provinsi Bali Nomor 1 Tahun 2008 tentang Urusan Pemerintahan Daerah Provinsi Bali (Lembaran Daerah Provinsi Bali Tahun 2008 Nomor 1, Tambahan Lembaran Daerah Provinsi Bali Nomor 1);\n13. Peraturan Daerah Provinsi Bali Nomor 5 Tahun 2008 tentang Pramuwisata (Lembaran Daerah Provinsi Bali Tahun 2008 Nomor 5, Tambahan Lembaran Daerah Provinsi Bali Nomor 3);\nDengan Persetujuan Bersama DEWAN PERWAKILAN RAKYAT DAERAH PROVINSI BALI dan GUBERNUR BALI"
    },
    {
      "tipe": "DIKTUM",
      "label": "MEMUTUSKAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "MEMUTUSKAN:"
    },
    {
      "tipe": "DIKTUM",
      "label": "MENETAPKAN",
      "bagian_dokumen": "PEMBUKAAN",
      "hierarki": "PEMBUKAAN > DIKTUM",
      "teks": "Menetapkan PERATURAN DAERAH TENTANG USAHA JASA PERJALANAN WISATA."
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
      "teks": "Pasal 1 Dalam Peraturan Daerah ini yang dimaksud dengan:\n1. Gubernur adalah Gubernur Bali.\n2. Daerah adalah Daerah Provinsi Bali.\n3. Dewan Perwakilan Rakyat Daerah yang selanjutnya disebut DPRD adalah Dewan Perwakilan Rakyat Daerah Provinsi Bali.\n4. Dinas Pariwisata yang selanjutnya disebut Dinas adalah Dinas Pariwisata Provinsi Bali.\n5. Wisata adalah kegiatan perjalanan yang dilakukan oleh seseorang atau sekelompok orang dengan mengunjungi tempat tertentu untuk tujuan rekreasi, pengembangan pribadi, atau mempelajari keunikan daya tarik wisata yang dikunjungi dalam jangka waktu sementara.\n6. Wisatawan adalah orang yang melakukan wisata.\n7. Pariwisata adalah berbagai macam kegiatan wisata dan didukung berbagai fasilitas serta layanan yang disediakan oleh masyarakat, pengusaha, Pemerintah, dan Pemerintah Daerah.\n8. Kepariwisataan adalah keseluruhan kegiatan yang terkait dengan pariwisata dan bersifat multidimensi serta multidisiplin yang muncul sebagai wujud kebutuhan setiap orang dan negara serta interaksi antara wisatawan dan masyarakat setempat, sesama wisatawan, Pemerintah, Pemerintah Daerah, dan pengusaha.\n9. Usaha Pariwisata adalah usaha yang menyediakan barang dan/atau  jasa bagi pemenuhan kebutuhan wisatawan dan penyelenggaraan pariwisata.\n10. Pengusaha Pariwisata adalah orang atau sekelompok orang yang melakukan kegiatan usaha pariwisata.\n11. Industri Pariwisata adalah kumpulan usaha pariwisata yang saling terkait dalam rangka menghasilkan barang dan/atau jasa bagi pemenuhan kebutuhan wisatawan dalam penyelenggaraan pariwisata.\n12. Usaha Jasa Perjalanan Wisata yang selanjutnya disingkat UJPw adalah usaha biro perjalanan wisata dan usaha agen perjalanan wisata.\n13. Usaha biro perjalanan wisata meliputi usaha penyediaan jasa perencanaan perjalanan dan/atau  jasa pelayanan dan penyelenggaraan pariwisata, termasuk penyelenggaraan perjalanan ibadah.\n14. Usaha agen perjalanan wisata meliputi usaha jasa pemesanan sarana, seperti pemesanan tiket dan pemesanan akomodasi serta pengurusan dokumen perjalanan.\n15. Cabang Biro Perjalanan Wisata adalah unit usaha biro perjalanan wisata yang berkedudukan di wilayah administratif yang sama dengan kantor pusatnya atau diwilayah administratif lain yang melaksanakan kegiatan kantor pusat."
    },
    {
      "tipe": "BAB",
      "label": "BAB II",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB II AZAS DAN TUJUAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 2",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pasal 2 Pengaturan Penyelenggaraan UJPW dilaksanakan berdasarkan asas manfaat, kebersamaan, keterbukaan, berkeadilan dan berkelanjutan."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 3",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB II",
      "teks": "Pasal 3 Pengaturan Penyelenggaraan UJPW bertujuan untuk:\na. memperluas dan memeratakan kesempatan berusaha dan membuka lapangan kerja;\nb. mendorong pembangunan L daerah dalam rangka mewujudkan kesejahteraan masyarakat;\nc. mengendalikan kegiatan usaha untuk menunjang pembangunan berkelanjutan; dan\nd. melestarikan Budaya Bali."
    },
    {
      "tipe": "BAB",
      "label": "BAB III",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB III BENTUK, JENIS DAN KEGIATAN UJPW"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 4",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 4 (1). UJPW harus berbentuk badan usaha.\n(2). Badan Usaha sebagaimana dimaksud pada ayat (1) berupa:\na. Perseroan Terbatas (PT); dan\nb. Koperasi."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 5 Jenis UJPW mencakup:\na. Biro Perjalanan Wisata; dan\nb. Agen Perjalanan Wisata."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 6 (1) Kegiatan Biro perjalanan Wisata dan Cabang Biro Perjalanan Wisata mencakup:\na. perencanaan dan pengemasan perjalanan wisata dalam bentuk paket wisata;\nb. penyelenggaraan Paket Wisata Nasional dan Internasional;\nc. penyelenggaraan perjalanan ibadah agama dan tirta yatra;\nd. penyelenggaraan jasa perjalanan wisata dalam rangka mendukung kegiatan MICE (Meeting, Incentive, Convention, Exhibition);\ne. memberikan layanan angkutan/transportasi wisata;\nf. penjualan tiket angkutan darat, laut dan udara;\ng. penyediaan layanan pramuwisata/pemandu wisata yang berhubungan dengan paket wisata;\nh. pemesanan akomodasi, restoran dan tempat konvensi, atraksi wisata, kegiatan rekreasi;\ni. pengurusan dokumen perjalanan; dan\nj. pemesanan tiket pertunjukan seni dan budaya serta kunjungan ke daya tarik wisata.\n(2) Kegiatan Agen Perjalanan Wisata mencakup:\na. perantara penjualan paket wisata yang dikemas oleh Biro Perjalanan Wisata;\nb. penjualan tiket angkutan darat, laut dan udara;\nc. pemesanan akomodasi, restoran dan tempat konvensi, atraksi wisata dan kegiatan rekreasi;\nd. pengurusan dokumen perjalanan; dan\ne. pemesanan tiket pertunjukan seni dan budaya serta kunjungan ke daya tarik wisata."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB III",
      "teks": "Pasal 7 (1) Biro Perjalanan Wisata dapat membuka cabang dan gerai jual (sales counter);\n(2) Pembukaan cabang dan gerai jual sebagaimana dimaksud pada ayat (1) bertujuan untuk meningkatkan pelayanan."
    },
    {
      "tipe": "BAB",
      "label": "BAB IV",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IV PENDAFTARAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IV",
      "teks": "Pasal 8 (1) Usaha Biro Perjalanan Wisata, Cabang Biro Perjalanan Wisata dan Agen Perjalanan Wisata yang beroperasi secara konvensional maupun melalui internet harus mendaftarkan usahanya kepada Gubernur melalui Satuan Kerja Perangkat Daerah yang ditunjuk.\n(2) Gubernur mengeluarkan Tanda Daftar Usaha sebagaimana dimaksud pada ayat (1).\n(3) Tanda Daftar Usaha sebagaimana dimaksud pada ayat (2) didaftar ulang setiap 5 (lima) tahun."
    },
    {
      "tipe": "BAB",
      "label": "BAB V",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB V TATA CARA PENDAFTARAN USAHA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pasal 9 (1) Permohonan pendaftaran UJPW sebagaimana dimaksud dalam Pasal 8 ayat (1) ditujukan kepada Gubernur melalui Satuan Kerja Perangkat Daerah yang ditunjuk.\n(2) Persetujuan permohonan pendaftaran UJPW sebagaimana dimaksud pada ayat (1) dikeluarkan paling lama 14 (empat belas) hari sejak diterimanya permohonan.\n(3) Apabila dalam waktu 14 (empat belas) hari sebagaimana dimaksud pada ayat (2), persetujuan atau penolakan belum diterbitkan, maka permohonan dianggap disetujui."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB V",
      "teks": "Pasal 10 Ketentuan lebih lanjut mengenai tata cara dan syarat-syarat permohonan pendaftaran UJPW sebagaimana dimaksud dalam Pasal 9, diatur dengan Peraturan Gubernur."
    },
    {
      "tipe": "BAB",
      "label": "BAB VI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VI KEWAJIBAN DAN LARANGAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 11 (1) Pengusaha UJPW wajib:\na. memberikan perlindungan kepada wisatawan;\nb. menggunakan pramuwisata yang bersertifikasi dan memiliki Kartu Tanda Pengenal Pramuwisata;\nc. memberikan pelayanan secara optimal;\nd. mempergunakan alat transportasi/angkutan pariwisata yang memiliki tanda daftar usaha dan mempunyai kartu pengawasan;\ne. bekerjasama dengan komponen usaha jasa pariwisata yang memiliki tanda daftar usaha;\nf. mencegah dampak sosial yang merugikan masyarakat;\ng. memelihara kebersihan dan keindahan daya tarik wisata;\nh. memenuhi atas pungutan negara dan pungutan daerah sesuai dengan peraturan perundang-undangan yang berlaku;\ni. memberikan laporan kegiatan usaha kepada Gubernur melalui Dinas setiap 6 (enam) bulan sekali;\nj. mentaati nilai-nilai moral, etika dan nilai-nilai budaya yang hidup dalam masyarakat Bali;\nk. bergabung dengan salah satu wadah/asosiasi UJPW;\ndan\nl. memberikan perlindungan terhadap tenaga kerja yang bekerja pada UJPW baik tenaga tetap maupun tenaga lepas dan upah (guide fee) kepada pramuwisata.\n(2) Wadah/asosiasi UJPW sebagaimana dimaksud pada ayat (1) huruf k, wajib menegakkan kode etik.\n(3) Ketentuan lebih lanjut mengenai tata cara pelaporan sebagaimana dimaksud pada ayat (1) huruf i, diatur dengan Peraturan Gubernur."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 12 (1) UJPW dilarang:\na. menggunakan tenaga kerja warga negara asing tanpa ijin;\nb. menggunakan warga negara asing sebagai pramuwisata;\nc. menggunakan tenaga kerja dibawah umur;\nd. memindahtangankan Tanda Daftar Usaha kepada pihak lain tanpa ijin Gubernur; dan\ne. membebankan biaya perjalanan wisatawan kepada pramuwisata.\n(2) Perorangan dan Badan Usaha yang tidak terdaftar sebagai UJPW dilarang melakukan kegiatan UJPW."
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VI",
      "teks": "Pasal 13 (1) Biro Perjalanan Wisata agar melakukan kegiatan promosi dan pemasaran paket wisata baik didalam maupun diluar negeri.\n(2) Biro Perjalanan Wisata dari luar Daerah yang akan menyelenggarakan kegiatan di dalam Daerah wajib bekerjasama dengan Biro Perjalanan Wisata di Bali.\n(3) Biro Perjalanan Wisata luar negeri yang akan menyelenggarakan kegiatan di dalam Daerah wajib menunjuk dan bekerjasama dengan Biro Perjalanan Wisata yang ada di Daerah sebagai mitra kerja, dan dalam melaksanakan kegiatannya tunduk kepada ketentuan peraturan perundang-undangan yang berlaku."
    },
    {
      "tipe": "BAB",
      "label": "BAB VII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VII PEMBINAAN DAN PENGAWASAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VII",
      "teks": "Pasal 14 (1) Pembinaan, pengawasan dan pengendalian UJPW dilakukan oleh Gubernur melalui Dinas.\n(2) Gubernur dalam melaksanakan pembinaan, pengawasan dan pengendalian sebagaimana dimaksud pada ayat (1), membentuk Tim.\n(3) Tim sebagaimana dimaksud pada ayat (2) diatur dengan Peraturan Gubernur.\n(4) Dalam rangka pembinaan, pengawasan dan pengendalian usaha sebagaimana dimaksud pada ayat (2), Tim dapat melakukan pemeriksaan ditempat usaha."
    },
    {
      "tipe": "BAB",
      "label": "BAB VIII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB VIII PERAN SERTA MASYARAKAT"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB VIII",
      "teks": "Pasal 15 (1) Masyarakat dapat berperan serta dalam pengawasan dan pengendalian terhadap UJPW.\n(2) Peran serta sebagaimana dimaksud pada ayat (1) dapat berupa penyampaian laporan dan informasi kepada Dinas."
    },
    {
      "tipe": "BAB",
      "label": "BAB IX",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB IX SANKSI ADMINISTRATIF"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB IX",
      "teks": "Pasal 16 (1) Setiap penyelenggaraan UJPW yang beroperasi tanpa Tanda Daftar Usaha sebagaimana dimaksud dalam Pasal 8 ayat (1), dikenakan sanksi administratif berupa penutupan tempat usaha.\n(2) Setiap penyelenggara UJPW yang tidak memenuhi kewajiban sebagaimana dimaksud dalam Pasal 11 dan melanggar larangan sebagaimana dimaksud dalam Pasal 12, dikenakan sanksi administratif berupa penutupan tempat usaha.\n(3) Setiap pengusaha UJPW dari luar daerah yang melanggar ketentuan dalam Pasal 13 ayat (2) dan ayat (3), dikenakan sanksi administratif berupa peringatan dan menghentikan kegiatannya."
    },
    {
      "tipe": "BAB",
      "label": "BAB X",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB X PENCABUTAN TANDA DAFTAR USAHA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB X",
      "teks": "Pasal 17 Tanda Daftar usaha dicabut apabila:\na. pengusaha tidak meneruskan kegiatan usahanya;\nb. Tidak memenuhi kewajibannya untuk mendaftar ulang setiap 5(lima) tahun sekali;\nc. Tidak menjalankan usahanya selama 2 (dua) tahun berturut-turut atau tidak memberikan laporan empat kali berturut-turut;\nd. Terbukti melakukan pelanggaran tindak pidana kejahatan yang berkaitan dengan kegiatan usahanya;\ne. Terbukti melakukan pelanggaran sebagaimana dimaksud dalam Pasal 11 dan Pasal 12; dan\nf. Terbukti melakukan pelanggaran peraturan perundang- undangan lain yang berkaitan dengan kegiatan usahanya."
    },
    {
      "tipe": "BAB",
      "label": "BAB XI",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XI KETENTUAN PENYIDIKAN"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XI",
      "teks": "Pasal 18 (1) Selain Pejabat Penyidik Kepolisian Republik Indonesia yang bertugas menyidik tindak pidana, penyidikan atas tindak pidana sebagaimana dimaksud dalam Peraturan Daerah ini dapat juga dilakukan oleh Penyidik Pegawai Negeri Sipil dilingkungan Pemerintah Provinsi Bali.\n(2) Penyidik Pegawai Negeri Sipil sebagaimana dimaksud pada ayat (1) berwenang untuk:\na. menerima laporan pemeriksaan atau pengaduan berkenaan tindak pidana di bidang UJPW;\nb. melakukan pemeriksaan atas kebenaran laporan atau pengaduan berkenaan tindak pidana di bidang UJPW;\nc. melakukan pemanggilan terhadap perseorangan atau badan usaha untuk didengar dan diperiksa sebagai tersangka atau sebagai saksi dalam tindak pidana di bidang UJPW;\nd. melakukan pemeriksaan terhadap perseorangan atau badan usaha yang diduga melakukan tindak pidana di bidang UJPW;\ne. memeriksa tanda pengenal seseorang yang berada di tempat terjadinya tindak pidana di bidang UJPW;\nf. melakukan penggeledahan dan penyitaan barang bukti tindak pidana di bidang UJPW;\ng. meminta keterangan atau bahan bukti dari perseorangan atau badan usaha sehubungan dengan tindak pidana di bidang UJPW;\nh. meminta bantuan ahli dalam rangka pelaksanaan tugas penyidikan;\ni. membuat dan menandatangani berita acara; dan\nj. menghentikan penyidikan apabila tidak terdapat cukup bukti tentang adanya tindak pidana di bidang UJPW.\n(3) Penyidik Pegawai Negeri Sipil sebagaimana dimaksud pada ayat (1), memberitahukan dimulainya penyidikan dan menyampaikan hasil penyidikan kepada penuntut umum melalui Penyidik Kepolisian Republik Indonesia."
    },
    {
      "tipe": "BAB",
      "label": "BAB XII",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "BAB",
      "teks": "BAB XII KETENTUAN PIDANA"
    },
    {
      "tipe": "PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XII",
      "teks": "Pasal 19 (1) Setiap orang atau badan hukum yang melanggar ketentuan dalam Pasal 11 dan Pasal 12 diancam pidana paling lama 6 (enam) bulan dan/atau  denda sekurang- kurangnya Rp 30.000.000,- (tiga puluh juta rupiah) dan sebanyak-banyaknya Rp 50.000.000,- (lima puluh juta rupiah).\n(2) Tindak pidana sebagaimana dimaksud pada ayat (1) adalah pelanggaran (3) Selain sanksi sebagaimana dimaksud pada ayat (1), dapat juga dikenakan sanksi pidana sesuai ketentuan peraturan perundang-undangan."
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
      "label": "Pasal 20",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIII",
      "teks": "Pasal 20 Dalam jangka waktu 1 (satu) tahun sejak diundangkannya Peraturan Daerah ini, penyelenggara UJPW yang telah memiliki ijin usaha sebelum diundangkannya Peraturan Daerah ini harus mendaftarkan ijin usahanya pada Satuan Kerja Perangkat Daerah yang ditunjuk untuk diadakan penyesuaian."
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
      "label": "Pasal 21",
      "bagian_dokumen": "BATANG_TUBUH",
      "hierarki": "PASAL",
      "parent_bab": "BAB XIV",
      "teks": "Pasal 21 Peraturan Daerah ini mulai berlaku pada tanggal diundangkan.\nAgar setiap orang mengetahuinya, memerintahkan pengundangan Peraturan Daerah ini, dengan penempatannya dalam Lembaran Daerah Provinsi Bali.\nDitetapkan di Denpasar pada tanggal 27 April 2010 GUBERNUR BALI, MADE MANGKU PASTIKA Diundangkan di Denpasar pada tanggal 27 April 2010 SEKRETARIS DAERAH PROVINSI BALI, I NYOMAN YASA LEMBARAN DAERAH PROVINSI BALI TAHUN 2010 NOMOR 1."
    },
    {
      "tipe": "PENJELASAN_UMUM",
      "label": "PENJELASAN",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN",
      "teks": "PENJELASAN ATAS PERATURAN DAERAH PROVINSI BALI NOMOR 1 TAHUN 2010 TENTANG USAHA JASA PERJALANAN WISATA\nI. UMUM.\nBudaya Daerah Bali yang unik dan mempunyai ciri khas merupakan modal dasar pembangunan kepariwisataa Daerah Bali guna memperkuat sektor pertanian yang sudah terbukti mampu membawa kesejahteraan bagi masyarakat Bali sebelum sektor Pariwisata berkembang pesat seperti sekarang ini.\nAdat istiadat yang bersumber dari ajaran Agama Hindu merupakan daya tarik utama bagi kunjungan wisatawan ke Bali dari tahun ketahun, disamping keindahan panorama alam dan keramah tamahan penduduk Bali.\nSejak ditetapkannya Peraturan Pemerintah Nomor 38 Tahun 2007 tentang Pembagian Urusan Pemerintahan, sektor Pariwisata menjadi urusan Pilihan yang menjadi kewenanangan Pemerintah Provinsi.\nSebagai urusan Pilihan, maka Pemerintah Provinsi berwenang melaksanakan pendaftaran, pencatatan dan pendataan pendaftaran uasaha pariwisata.\nSalah satu jenis usaha pariwisata yang telah diatur dalam Undang-Undang Nomor 10 Tahun 2009 tentang Kepariwisataan adalah Usaha Jasa Perjalanan Wisata.\nUsaha Jasa Perjalanan Wisata yang terdiri dari Biro Perjalanan Wisata dan Agen Perjalanan Wisata adalah usaha ekonomi yang dilakukan oleh suatu badan usaha atau perorangan untuk mendapatkan keuntungan dari kegiatannya dalam menangani para wisatawan yang datang berkunjung ke Bali.\nSebagai usaha ekonomi, keberadaan Usaha Jasa Perjalanan Wisata perlu diatur dalam suatu pertauran perundangan-undangan berupa Peraturan Daerah yang mengatur hak dan kewajiban serta sanksi bagi yang melakukan pelanggaran.\nHal ini disebabkan tidak semua usaha yang bergerak dibidang Jasa Perjalanan Wisata yang beroperasi di Bali, memahami potensi Bali yang dapat digali dan dikembangkan sebagai modal usaha di bidang jasa perjalanan wisata dan cara untuk melestarikan dan menjaga citranya.\nPara wisatawan yang datang ke Bali ingin mendapatkan pelayanan yang memadai dan informasi yang benar tentang Bali. Sebagian besar informasi dan pelayanan ini bisa didapatkan melalui Usaha Jasa Perjalanan Wisata ini.\nUntuk dapat melakukan kegiatan menangani wisatawan dengan baik, maka setiap Usaha Jasa Perjalanan Wisata wajib mendaftarkan usahanya kepada Pemerintah Provinsi Bali dengan memenuhi ketentuan yang ditetapkan dalam Peraturan Daerah ini.\nII. PASAL DEMI PASAL."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 1",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 1 Cukup jelas"
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
      "teks": "Pasal 4 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 5",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 5 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 6",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 6 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 7",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 7 ayat 1 Yang dimaksud dengan Gerai Jual atau Counter adalah unit usaha Biro Perjalanan Wisata yang hanya melakukan bagian tertentu untuk memperlancar pelayanan kepada para wisatawan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 8",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 8 ayat 2 Yang dimaksud dengan Tanda Daftar Usaha adalah Tanda Daftar yang dikeluarkan oleh Gubernus Bali atau pejabat yang ditunjuk untuk melakukan kegiatan usaha Biro perjalanan Wisata, Cabang Biro Perjalanan Wisata dan Agan Perjalanan Wisata.\nayat 3 Yang dimaksud Daftar Ulang Usaha adalah pendaftaran yang harus dilakukan oleh pemegang Tanda Daftar Usaha untuk memantau keberlangsungan usaha yang dilakukan setiap 5 (lima) tahun sekali."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 9",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 9 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 10",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 10 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 11",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 11 ayat 1 huruf a Yang dimaksud memberikan perlindungan kepada wisatawan adalah jaminan keselamatan dan keamanan selama wisatawan yang bersangkutan ada di Bali.\nayat 1 huruf e Yang dimaksud bekerjasama dengan komponen usaha jasa pariwisata adalah kerjasama dengan usaha jasa lainnya yang sudah terdaftar atau mempunyai ijin.\nayat 1 huruf j Yang dimaksud dengan mentaati nilai-nilai budaya adalah nilai-nilai yang dianut oleh masyarakat Bali dalam menjalankan kehidupan sehari-hari yang berlandaskan pandangan hidup Tri Hita Karana yang dijiwai oleh Agama Hindu.\nayat 1 huruf I Yang dimaksud memberikan perlindungan kepada Pramuwisata adalah jaminan keselamatan dan kesehatan kerja selama yang bersangkutan melaksanakan tugasnya sebagai pramuwisata berupa asuransi."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 12",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 12 ayat 1 huruf e.\nYang dimasud dengan biaya tour adalah biaya-biaya yang ditimbulkan selama tour dilaksanakan."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 13",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 13 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 14",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 14 Cukup jelas."
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 15",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 15 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 16",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 16 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 17",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 17 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 18",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 18 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 19",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 19 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 20",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 20 Cukup jelas"
    },
    {
      "tipe": "PENJELASAN_PASAL",
      "label": "Pasal 21",
      "bagian_dokumen": "PENJELASAN",
      "hierarki": "PENJELASAN > PASAL",
      "teks": "Pasal 21 Cukup jelas TAMBAHAN LEMBARAN DAERAH PROVINSI BALI NOMOR 1 TAHUN 2010"
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
                $this->command->info("Data Perda Provinsi Bali No. 1 Tahun 2010 sudah ada (ID: $existingPeraturanId). Menghapus data lama...");
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
            $this->command->info("Seeding Perda Provinsi Bali No. 1 Tahun 2010 selesai!");

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

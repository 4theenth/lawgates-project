export interface ScraperRegulationMetadata {
  standard_id: string;
  tipe_peraturan: string; // misal: UU, PP, PERPRES, PERDA
  nomor?: string;
  judul: string;
  tahun: string;
  tempat_penetapan?: string;
  tanggal_penetapan?: string;
  tanggal_pengundangan?: string;
  tanggal_berlaku?: string;
  status: 'Berlaku' | 'Tidak berlaku';
  pemrakarsa: string;
  sumber_dokumen?: string;
}

export interface ScraperRegulationItem {
  id: string;
  metadata: ScraperRegulationMetadata;
  relasi?: {
    mencabut?: string[];
    diubah_oleh?: string[];
  };
}

/**
 * Data dummy yang mereplikasi struktur JSON output mesin scraper Python klien
 * Berisi contoh regulasi perpajakan, cipta kerja, dan regulasi penting lainnya.
 */
export const DUMMY_SCRAPER_REGULATIONS: ScraperRegulationItem[] = [
  {
    id: 'uu-7-2021',
    metadata: {
      standard_id: 'undang-undang-7-2021',
      tipe_peraturan: 'UU',
      nomor: '7',
      judul: 'Undang-Undang Nomor 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan',
      tahun: '2021',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '29 Oktober 2021',
      tanggal_pengundangan: '29 Oktober 2021',
      tanggal_berlaku: '29 Oktober 2021',
      status: 'Berlaku',
      pemrakarsa: 'Pemerintah Pusat',
      sumber_dokumen: 'uu_7_2021_perpajakan.pdf',
    },
  },
  {
    id: 'pp-50-2022',
    metadata: {
      standard_id: 'peraturan-pemerintah-50-2022',
      tipe_peraturan: 'PP',
      nomor: '50',
      judul: 'Peraturan Pemerintah Nomor 50 Tahun 2022 tentang Tata Cara Pelaksanaan Hak dan Pemenuhan Kewajiban Perpajakan',
      tahun: '2022',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '12 Desember 2022',
      tanggal_pengundangan: '12 Desember 2022',
      tanggal_berlaku: '12 Desember 2022',
      status: 'Berlaku',
      pemrakarsa: 'Pemerintah Pusat',
      sumber_dokumen: 'pp_50_2022_tata_cara_perpajakan.pdf',
    },
  },
  {
    id: 'uu-6-2023',
    metadata: {
      standard_id: 'undang-undang-6-2023',
      tipe_peraturan: 'UU',
      nomor: '6',
      judul: 'Undang-Undang Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang',
      tahun: '2023',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '31 Maret 2023',
      tanggal_pengundangan: '31 Maret 2023',
      tanggal_berlaku: '31 Maret 2023',
      status: 'Berlaku',
      pemrakarsa: 'Pemerintah Pusat',
      sumber_dokumen: 'uu_6_2023_cipta_kerja.pdf',
    },
  },
  {
    id: 'uu-6-1983',
    metadata: {
      standard_id: 'undang-undang-6-1983',
      tipe_peraturan: 'UU',
      nomor: '6',
      judul: 'Undang-Undang Nomor 6 Tahun 1983 tentang Ketentuan Umum dan Tata Cara Perpajakan',
      tahun: '1983',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '31 Desember 1983',
      tanggal_pengundangan: '31 Desember 1983',
      tanggal_berlaku: '01 Januari 1984',
      status: 'Tidak berlaku',
      pemrakarsa: 'Pemerintah Pusat',
      sumber_dokumen: 'uu_6_1983_kup.pdf',
    },
  },
  {
    id: 'perpres-40-2018',
    metadata: {
      standard_id: 'peraturan-presiden-40-2018',
      tipe_peraturan: 'PERPRES',
      nomor: '40',
      judul: 'Peraturan Presiden Nomor 40 Tahun 2018 tentang Pembaruan Sistem Administrasi Perpajakan',
      tahun: '2018',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '18 Mei 2018',
      tanggal_pengundangan: '21 Mei 2018',
      tanggal_berlaku: '21 Mei 2018',
      status: 'Berlaku',
      pemrakarsa: 'Kementerian Keuangan',
      sumber_dokumen: 'perpres_40_2018_administrasi_perpajakan.pdf',
    },
  },
  {
    id: 'pp-44-2022',
    metadata: {
      standard_id: 'peraturan-pemerintah-44-2022',
      tipe_peraturan: 'PP',
      nomor: '44',
      judul: 'Peraturan Pemerintah Nomor 44 Tahun 2022 tentang Penerapan Pajak Pertambahan Nilai Barang dan Jasa serta Pajak Penjualan atas Barang Mewah',
      tahun: '2022',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '02 Desember 2022',
      tanggal_pengundangan: '02 Desember 2022',
      tanggal_berlaku: '02 Desember 2022',
      status: 'Berlaku',
      pemrakarsa: 'Pemerintah Pusat',
      sumber_dokumen: 'pp_44_2022_ppn_ppnbm.pdf',
    },
  },
  {
    id: 'uu-11-2016',
    metadata: {
      standard_id: 'undang-undang-11-2016',
      tipe_peraturan: 'UU',
      nomor: '11',
      judul: 'Undang-Undang Nomor 11 Tahun 2016 tentang Pengampunan Pajak (Tax Amnesty)',
      tahun: '2016',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '01 Juli 2016',
      tanggal_pengundangan: '01 Juli 2016',
      tanggal_berlaku: '01 Juli 2016',
      status: 'Tidak berlaku',
      pemrakarsa: 'Pemerintah Pusat',
      sumber_dokumen: 'uu_11_2016_tax_amnesty.pdf',
    },
  },
  {
    id: 'uu-28-2007',
    metadata: {
      standard_id: 'undang-undang-28-2007',
      tipe_peraturan: 'UU',
      nomor: '28',
      judul: 'Undang-Undang Nomor 28 Tahun 2007 tentang Perubahan Ketiga atas Undang-Undang Nomor 6 Tahun 1983 tentang Ketentuan Umum dan Tata Cara Perpajakan',
      tahun: '2007',
      tempat_penetapan: 'Jakarta',
      tanggal_penetapan: '17 Juli 2007',
      tanggal_pengundangan: '17 Juli 2007',
      tanggal_berlaku: '01 Januari 2008',
      status: 'Berlaku',
      pemrakarsa: 'Pemerintah Pusat',
      sumber_dokumen: 'uu_28_2007_kup.pdf',
    },
  },
];

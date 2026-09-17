export interface ComparisonDocumentMeta {
  id: string;
  standardId: string;
  category: string;
  title: string;
  status: 'Berlaku' | 'Diubah' | 'Tidak berlaku' | string;
  statusVariant?: 'default' | 'success' | 'warning' | 'danger';
  tanggalPenetapan: string;
  tempatPenetapan: string;
  tanggalBerlaku?: string;
  pemrakarsa?: string;
}

export interface ComparisonRow {
  parameter: string | React.ReactNode;
  parameterSub?: string;
  leftValue: string | string[] | React.ReactNode;
  leftDiffType?: 'normal' | 'deleted' | 'modified';
  rightValue: string | string[] | React.ReactNode;
  rightDiffType?: 'normal' | 'added' | 'modified';
}

export interface ComparisonSection {
  title: string;
  rows: ComparisonRow[];
}

export interface ComparisonDataset {
  standardIdGroup: string;
  standardIdVerified: boolean;
  acuanAwal: ComparisonDocumentMeta;
  yangDibandingkan: ComparisonDocumentMeta;
  sections: ComparisonSection[];
}

export const COMPARISON_OPTIONS = [
  {
    id: 'uud-1945-perubahan-1',
    standardId: 'UUD-1945-P1',
    title: 'Perubahan Pertama Undang Undang Dasar 1945',
    category: 'UUD',
    tahun: '1999',
    tanggalPenetapan: '19 Oktober 1999',
    tempatPenetapan: 'Jakarta',
    tanggalBerlaku: '19 Oktober 1999',
    status: 'Diubah',
  },
  {
    id: 'uud-1945-perubahan-2',
    standardId: 'UUD-1945-P2',
    title: 'Perubahan Kedua Undang Undang Dasar 1945',
    category: 'UUD',
    tahun: '2000',
    tanggalPenetapan: '8 Agustus 2000',
    tempatPenetapan: 'Jakarta',
    tanggalBerlaku: '9 Agustus 2000',
    status: 'Diubah',
  },
  {
    id: 'uud-1945-perubahan-3',
    standardId: 'UUD-1945-P3',
    title: 'Perubahan Ketiga Undang Undang Dasar 1945',
    category: 'UUD',
    tahun: '2001',
    tanggalPenetapan: '9 November 2001',
    tempatPenetapan: 'Jakarta',
    tanggalBerlaku: '9 November 2001',
    status: 'Diubah',
  },
  {
    id: 'uud-1945-perubahan-4',
    standardId: 'UUD-1945-P4',
    title: 'Perubahan Ke Empat Undang Undang Dasar 1945',
    category: 'UUD',
    tahun: '2002',
    tanggalPenetapan: '17 Agustus 2002',
    tempatPenetapan: 'Jakarta',
    tanggalBerlaku: '18 Agustus 2002',
    status: 'Berlaku',
  },
];

export const DEFAULT_COMPARISON_DATA: ComparisonDataset = {
  standardIdGroup: 'UUD-1945',
  standardIdVerified: true,
  acuanAwal: {
    id: 'uud-1945-perubahan-2',
    standardId: 'UUD-1945-P2',
    category: 'UUD',
    title: 'Perubahan Kedua Undang Undang Dasar 1945',
    status: 'Diubah',
    statusVariant: 'default',
    tanggalPenetapan: '8 Agustus 2000',
    tempatPenetapan: 'Jakarta',
    tanggalBerlaku: '9 Agustus 2000',
    pemrakarsa: 'Pemerintah Pusat',
  },
  yangDibandingkan: {
    id: 'uud-1945-perubahan-4',
    standardId: 'UUD-1945-P4',
    category: 'UUD',
    title: 'Perubahan Ke Empat Undang Undang Dasar 1945',
    status: 'Berlaku',
    statusVariant: 'success',
    tanggalPenetapan: '17 Agustus 2002',
    tempatPenetapan: 'Jakarta',
    tanggalBerlaku: '18 Agustus 2002',
    pemrakarsa: 'Pemerintah Pusat',
  },
  sections: [
    {
      title: 'INFORMASI UMUM',
      rows: [
        {
          parameter: 'Kategori',
          leftValue: 'Undang Undang Dasar',
          rightValue: 'Undang Undang Dasar',
        },
        {
          parameter: 'Tahun',
          leftValue: '2000',
          rightValue: '2002',
        },
        {
          parameter: 'Tanggal Penetapan',
          leftValue: '8 Agustus 2000',
          rightValue: '17 Agustus 2002',
        },
        {
          parameter: 'Tanggal Berlaku',
          leftValue: '9 Agustus 2000',
          rightValue: '18 Agustus 2002',
        },
        {
          parameter: 'Pemrakarsa',
          leftValue: 'Pemerintah Pusat',
          rightValue: 'Pemerintah Pusat',
        },
        {
          parameter: 'Status',
          leftValue: 'Diubah',
          rightValue: 'Berlaku',
        },
      ],
    },
    {
      title: 'PEMBUKAAN',
      rows: [
        {
          parameter: 'Menimbang',
          leftValue: [
            'a. bahwa negara Indonesia merupakan negara yang menjunjung tinggi hak asasi manusia berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
            'b. bahwa perkembangan dan dinamika sistem peradilan di Indonesia serta sistem perlindungan saksi dan korban saat ini belum sepenuhnya efektif, komprehensif',
          ],
          rightValue: [
            'a. bahwa negara Indonesia merupakan negara yang menjunjung tinggi hak asasi manusia berdasarkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
            'b. bahwa perkembangan dan dinamika sistem peradilan di Indonesia serta sistem perlindungan saksi dan korban saat ini belum sepenuhnya efektif, komprehensif',
          ],
        },
        {
          parameter: 'Mengingat',
          leftValue:
            'Pasal 20, Pasal 21, Pasal 28G, Pasal 28I, dan Pasal 28J Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;',
          rightValue:
            'Pasal 20, Pasal 21, Pasal 28G, Pasal 28I, dan Pasal 28J Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;',
        },
        {
          parameter: 'Memutuskan',
          leftValue: 'Undang Undang Dasar Tahun 1945',
          rightValue: 'Undang Undang Dasar Tahun 1945',
        },
      ],
    },
    {
      title: 'BAB I',
      rows: [
        {
          parameter: 'Pasal 1 | Pasal 2',
          leftValue:
            '(1) Dalam hal Undang-Undang di luar Undang-Undang Nomor 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana memuat ancaman pidana minimum khusus, ketentuan ancaman pidana minimum khusus dihapus.',
          leftDiffType: 'deleted',
          rightValue: [
            '(1) Hukum Pidana memuat ancaman pidana minimum khusus, ketentuan ancaman pidana minimum khusus dihapus.',
            '(2) dikecualikan bagi Undang-Undang yang mengatur mengenai tindak pidana berat terhadap hak asasi manusia, tindak pidana terorisme, tindak pidana korupsi, dan tindak pidana pencucian uang.',
          ],
          rightDiffType: 'added',
        },
      ],
    },
  ],
};

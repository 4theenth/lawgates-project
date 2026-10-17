import React from 'react';
import {
  DocumentTableOfContents,
  TocChapterItem,
  TocArticleItem,
  TocPembukaanData,
} from '@/Components/common/DocumentTableOfContents';

export type { TocChapterItem, TocArticleItem, TocPembukaanData };

export interface DetailDaftarIsiProps {
  pembukaanLabel?: string;
  chapters?: Array<{
    id: string;
    judul: string;
    isExpanded?: boolean;
    subItems?: { id: string; label: string }[];
  }>;
  babList?: TocChapterItem[];
  activeSection?: string;
  onPasalClick?: (babId: string, pasalId: string) => void;
  onPembukaanClick?: () => void;
  className?: string;
}

const DEFAULT_CHAPTERS: TocChapterItem[] = [
  {
    id: 'bab-1',
    judul: 'BAB I - Pemerintah Daerah',
    isExpanded: true,
    pasalList: [
      { id: 'pasal-1', nomor: 'Pasal 1' },
      { id: 'pasal-2', nomor: 'Pasal 2' },
    ],
  },
  {
    id: 'bab-2',
    judul: 'BAB II - Wilayah Negara',
    isExpanded: true,
    pasalList: [
      { id: 'pasal-3', nomor: 'Pasal 3' },
      { id: 'pasal-4', nomor: 'Pasal 4' },
      { id: 'pasal-5', nomor: 'Pasal 5' },
    ],
  },
  {
    id: 'bab-3',
    judul: 'BAB III - Hak Asasi',
    isExpanded: false,
    pasalList: [],
  },
  {
    id: 'bab-4',
    judul: 'BAB IV - Penduduk',
    isExpanded: false,
    pasalList: [],
  },
  {
    id: 'bab-5',
    judul: 'BAB X - Warga Negara',
    isExpanded: false,
    pasalList: [],
  },
];

export function DetailDaftarIsi({
  pembukaanLabel = 'Pembukaan UUD 1945',
  chapters,
  babList,
  activeSection,
  onPasalClick,
  onPembukaanClick,
  className = '',
}: DetailDaftarIsiProps) {
  // Adapt old `chapters` format if passed
  const formattedBabList: TocChapterItem[] = React.useMemo(() => {
    if (babList && babList.length > 0) return babList;

    if (chapters && chapters.length > 0) {
      return chapters.map((c) => ({
        id: c.id,
        judul: c.judul,
        isExpanded: c.isExpanded,
        pasalList: c.subItems?.map((s) => ({
          id: s.id,
          nomor: s.label,
        })) || [],
      }));
    }

    return DEFAULT_CHAPTERS;
  }, [babList, chapters]);

  return (
    <DocumentTableOfContents
      pembukaanJudul={pembukaanLabel}
      babList={formattedBabList}
      activeSection={activeSection}
      onPasalClick={onPasalClick}
      onPembukaanClick={onPembukaanClick}
      className={className}
    />
  );
}

export default DetailDaftarIsi;

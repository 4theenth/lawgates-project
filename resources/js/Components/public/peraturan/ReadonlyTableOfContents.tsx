import React from 'react';
import { ChapterItem } from '../../admin/import/correctionParser';
import { DocumentTableOfContents } from '@/Components/common/DocumentTableOfContents';

export interface ReadonlyTableOfContentsProps {
  pembukaanJudul?: string;
  pembukaanData?: {
    menimbang?: string;
    mengingat?: string;
    memutuskan?: string;
    menetapkan?: string;
  };
  babList: ChapterItem[];
  activeSectionId?: string;
  onNavigateToStruktur?: (id: string) => void;
  onNavigateToPasal?: (id: string) => void;
  onNavigateToPembukaan?: () => void;
  onNavigateToSection?: (id: string) => void;
  onSearchChange?: (query: string) => void;
  hideHeader?: boolean;
  className?: string;
  onHeaderClick?: () => void;
}

/**
 * Komponen Daftar Isi untuk Halaman Publik (Detail Peraturan / Detail Sistem Hukum).
 * Menggunakan spesifikasi desain Figma node #2258:48479 yang seragam dengan admin koreksi dan edit data.
 */
export function ReadonlyTableOfContents({
  pembukaanJudul = 'Pembukaan',
  pembukaanData,
  babList = [],
  onNavigateToStruktur,
  onNavigateToPasal,
  onNavigateToPembukaan,
  onNavigateToSection,
  onSearchChange,
  hideHeader = false,
  className = '',
  onHeaderClick,
}: ReadonlyTableOfContentsProps) {
  return (
    <DocumentTableOfContents
      pembukaanJudul={pembukaanJudul}
      pembukaanData={pembukaanData}
      babList={babList}
      onPembukaanClick={onNavigateToPembukaan}
      onSectionClick={onNavigateToSection}
      onBabClick={onNavigateToStruktur}
      onPasalClick={(_babId, pasalId) => {
        if (onNavigateToPasal) {
          onNavigateToPasal(pasalId);
        }
      }}
      hideHeader={hideHeader}
      className={`lg:h-[calc(100vh-160px)] ${className}`}
      onHeaderClick={onHeaderClick}
    />
  );
}

export default ReadonlyTableOfContents;

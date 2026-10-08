import React from 'react';
import { ChapterItem } from './correctionParser';
import { DocumentTableOfContents } from '@/Components/common/DocumentTableOfContents';

export interface CorrectionTableOfContentsProps {
  pembukaanJudul?: string;
  babList: ChapterItem[];
  activeSection?: string;
  onPasalClick?: (babId: string, pasalId: string) => void;
  onPembukaanClick?: () => void;
  className?: string;
}

/**
 * Komponen Daftar Isi untuk Form Koreksi Data (Admin OCR Step 3) & Aksi Edit Data Peraturan
 * Memakai komponen terpadu DocumentTableOfContents dengan spesifikasi desain Figma node #2258:48479.
 */
export function CorrectionTableOfContents({
  pembukaanJudul = 'Pembukaan',
  babList,
  activeSection = '',
  onPasalClick,
  onPembukaanClick,
  className = '',
}: CorrectionTableOfContentsProps) {
  return (
    <DocumentTableOfContents
      pembukaanJudul={pembukaanJudul}
      babList={babList}
      activeSection={activeSection}
      onPasalClick={onPasalClick}
      onPembukaanClick={onPembukaanClick}
      scrollContainerId="editor-scroll-container"
      className={`h-[calc(100vh-140px)] min-h-[500px] ${className}`}
    />
  );
}

export default CorrectionTableOfContents;

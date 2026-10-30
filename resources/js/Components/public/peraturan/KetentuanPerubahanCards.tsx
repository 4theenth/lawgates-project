import React, { useState, useRef, useEffect } from 'react';
import { Zap, ArrowUp, X } from 'lucide-react';
import { ArticleItem, detectActionType } from '../../admin/import/correctionParser';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';

// ─────────────────────────────────────────────────────────────────────────────
// KONFIGURASI TEMA WARNA & CLASS (CENTRALIZED SOURCE OF TRUTH: app.css)
// Definisi class `@layer components` ada di resources/css/app.css
// ─────────────────────────────────────────────────────────────────────────────
export const PERUBAHAN_THEME = {
  // 1. Banner Atas: Ketentuan Perubahan Peraturan
  banner: {
    wrapper: 'perubahan-banner',
    iconColor: 'perubahan-banner-icon',
    titleColor: 'perubahan-banner-title',
    targetLabelColor: 'perubahan-banner-target-label',
    targetHighlightColor: 'perubahan-banner-target-highlight',
  },

  // 2. Kotak Rincian Pasal Target yang Diintervensi (Grid Container)
  grid: {
    wrapper: 'perubahan-grid',
    header: 'perubahan-grid-header',
    iconColor: 'perubahan-grid-icon',
    badgeHint: 'perubahan-grid-hint',
  },

  // 3. Tombol-tombol Pasal di Dalam Grid
  button: {
    default: 'perubahan-btn',
    active: 'perubahan-btn-active',
    badgeActive: 'perubahan-btn-badge-active',
  },

  // 4. Panel Rincian Teks Sub-Pasal Aktif (Saat Tombol Pasal Diklik)
  detailPanel: {
    wrapper: 'perubahan-detail-panel',
    badgeTitle: 'perubahan-detail-badge-title',
    btnBackToGrid: 'perubahan-detail-btn-back',
    btnClose: 'perubahan-detail-btn-close',
    contentCard: 'perubahan-detail-content',
    penjelasanCard: 'perubahan-detail-penjelasan',
  },
};

export type PerubahanThemeConfig = typeof PERUBAHAN_THEME;

// Helper scroll
const scrollToElementRef = (el: HTMLElement | null, offset = 24) => {
  if (!el) return;
  const container = document.getElementById('scrollable-content');
  if (container && window.innerWidth >= 1024 && container.scrollHeight > container.clientHeight + 10) {
    const elementPosition = el.getBoundingClientRect().top;
    const containerPosition = container.getBoundingClientRect().top;
    const offsetPosition = elementPosition - containerPosition + container.scrollTop - offset;
    container.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
  } else {
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - (offset + 110);
    window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
  }
};

// Helper highlight
function highlightText(text: string, query?: string): React.ReactNode {
  const cleaned = cleanOcrText(text);
  if (!query || !query.trim()) return cleaned;
  const q = query.trim();
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = cleaned.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-suc-100 text-suc-900 font-semibold rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. KOMPONEN BANNER KETENTUAN PERUBAHAN PERATURAN
// ─────────────────────────────────────────────────────────────────────────────
export interface KetentuanPerubahanBannerProps {
  targetInduk: {
    standardId: string;
    labelSingkat?: string;
    namaLengkap?: string;
  };
  containerAction?: {
    label: string;
    badgeColor: string;
  };
  theme?: PerubahanThemeConfig;
}

export function KetentuanPerubahanBanner({
  targetInduk,
  containerAction,
  theme = PERUBAHAN_THEME,
}: KetentuanPerubahanBannerProps) {
  const defaultAction = containerAction || { label: 'Diubah', badgeColor: 'bg-sec-100 text-sec-900 border-sec-200' };

  return (
    <div className={theme.banner.wrapper}>
      <div className={theme.banner.titleColor}>
        <Zap className={theme.banner.iconColor} />
        <span>Ketentuan Perubahan Peraturan</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap text-[12px]">
        <span className={theme.banner.targetLabelColor}>
          Mengubah Peraturan Induk:{' '}
          <span className={theme.banner.targetHighlightColor}>
            {targetInduk.namaLengkap || targetInduk.labelSingkat}
          </span>
        </span>
        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border shadow-2xs ${defaultAction.badgeColor}`}>
          Sifat Intervensi: {defaultAction.label}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. KOMPONEN GRID RINCIAN PASAL TARGET & PANEL DETAIL TEKS
// ─────────────────────────────────────────────────────────────────────────────
export interface RincianPasalTargetGridProps {
  targetInduk: {
    standardId: string;
    labelSingkat?: string;
    namaLengkap?: string;
  };
  pasalList: ArticleItem[];
  searchQuery?: string;
  activeSectionId?: string;
  theme?: PerubahanThemeConfig;
}

export function RincianPasalTargetGrid({
  targetInduk,
  pasalList,
  searchQuery = '',
  activeSectionId,
  theme = PERUBAHAN_THEME,
}: RincianPasalTargetGridProps) {
  const [activeSubPasalId, setActiveSubPasalId] = useState<string | null>(null);

  useEffect(() => {
    if (activeSectionId && pasalList.length > 0) {
      const cleanActiveId = activeSectionId.replace(/^section-/, '');
      const matched = pasalList.find((p) => p.id === cleanActiveId);
      if (matched) {
        setActiveSubPasalId(matched.id);
      }
    }
  }, [activeSectionId, pasalList]);

  const rincianGridRef = useRef<HTMLDivElement>(null);
  const activeSubPasalRef = useRef<HTMLDivElement>(null);

  const activeSubPasal = pasalList.find((p) => p.id === activeSubPasalId);

  const handleSubPasalClick = (subPId: string) => {
    if (activeSubPasalId === subPId) {
      setActiveSubPasalId(null);
      setTimeout(() => scrollToElementRef(rincianGridRef.current), 50);
    } else {
      setActiveSubPasalId(subPId);
      setTimeout(() => scrollToElementRef(activeSubPasalRef.current), 100);
    }
  };

  const handleCloseSubPasal = () => {
    setActiveSubPasalId(null);
    setTimeout(() => scrollToElementRef(rincianGridRef.current), 50);
  };

  const handleScrollBackToGrid = () => {
    scrollToElementRef(rincianGridRef.current);
  };

  return (
    <>
      {/* Kotak Grid Tombol Pasal Target */}
      <div ref={rincianGridRef} className={theme.grid.wrapper}>
        <div className={theme.grid.header}>
          <div className="flex items-center gap-1.5">
            <Zap className={theme.grid.iconColor} />
            <span>Rincian Pasal Target yang Diintervensi:</span>
          </div>
          <span className={theme.grid.badgeHint}>
            Klik tombol pasal untuk membaca teks perubahan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {pasalList.map((subP) => {
            const subAction = detectActionType(subP.isi);
            const isActive = activeSubPasalId === subP.id;

            return (
              <button
                key={subP.id}
                id={`section-${subP.id}`}
                type="button"
                onClick={() => handleSubPasalClick(subP.id)}
                className={isActive ? theme.button.active : theme.button.default}
              >
                <span className="truncate pr-1">{subP.nomor}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 border ${
                    isActive ? theme.button.badgeActive : subAction.badgeColor
                  }`}
                >
                  {subAction.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel Rincian Teks Sub-Pasal Aktif */}
      {activeSubPasal && (
        <div ref={activeSubPasalRef} className={theme.detailPanel.wrapper}>
          <div className="flex items-center justify-between gap-2 border-b border-sec-200/80 pb-2 flex-wrap">
            <span className={theme.detailPanel.badgeTitle}>
              Rincian Teks: {activeSubPasal.nomor} ({targetInduk.labelSingkat || targetInduk.standardId})
            </span>
          </div>

          <div className={theme.detailPanel.contentCard}>
            {highlightText(activeSubPasal.isi, searchQuery)}
          </div>

          {activeSubPasal.penjelasan && (
            <div className={theme.detailPanel.penjelasanCard}>
              <span className="font-semibold block mb-1">Penjelasan {activeSubPasal.nomor}:</span>
              {highlightText(activeSubPasal.penjelasan, searchQuery)}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-sec-200 flex-wrap gap-2">
            <button
              type="button"
              onClick={handleScrollBackToGrid}
              title="Kembali ke atas daftar tombol pasal"
              className={theme.detailPanel.btnBackToGrid}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Ke Pusat Pasal</span>
            </button>

            <button
              type="button"
              onClick={handleCloseSubPasal}
              className={theme.detailPanel.btnClose}
            >
              <X className="w-3.5 h-3.5" />
              <span>Tutup Rincian</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default KetentuanPerubahanBanner;

import React, { useState, useRef, useEffect } from 'react';
import { Zap, ArrowUp, X } from 'lucide-react';
import { ArticleItem, detectActionType } from '../../admin/import/correctionParser';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';

// ─────────────────────────────────────────────────────────────────────────────
// KONFIGURASI TEMA WARNA (CENTRALIZED COLOR THEME)
// Ubah kelas warna Tailwind di sini jika ingin mengganti palet warna seluruh kartu.
// ─────────────────────────────────────────────────────────────────────────────
export const PERUBAHAN_THEME = {
  // 1. Banner Atas: Ketentuan Perubahan Peraturan
  banner: {
    wrapper: 'p-3.5 bg-gradient-to-r from-sec-50 to-sec-100/40 border-l-4 border-sec-900 rounded-xl shadow-2xs flex items-center justify-between flex-wrap gap-2.5 border border-sec-200',
    iconColor: 'text-sec-900',
    titleColor: 'text-neu-900',
    targetLabelColor: 'text-neu-900',
    targetHighlightColor: 'text-pr-900',
  },

  // 2. Kotak Rincian Pasal Target yang Diintervensi (Grid Container)
  grid: {
    wrapper: 'p-4 bg-gradient-to-r from-sec-50/90 to-sec-100/50 border-2 border-sec-200 rounded-xl shadow-2xs space-y-2.5 scroll-mt-28',
    iconColor: 'text-sec-900',
    titleColor: 'text-neu-900',
    badgeHint: 'text-[11px] font-normal text-neu-800 bg-sec-100 px-2 py-0.5 rounded-md',
  },

  // 3. Tombol-tombol Pasal di Dalam Grid
  button: {
    default: 'bg-white hover:bg-sec-50 text-neu-800 border-sec-200 hover:border-sec-300',
    active: 'bg-pr-900 text-white border-pr-900 shadow-sm ring-2 ring-pr-300',
    badgeActive: 'bg-pr-700 text-white border-pr-600',
  },

  // 4. Panel Rincian Teks Sub-Pasal Aktif (Saat Tombol Pasal Diklik)
  detailPanel: {
    wrapper: 'mt-3 pl-4 border-l-4 border-sec-900 bg-sec-50/40 p-4 rounded-xl space-y-3 border border-sec-200 animate-in fade-in duration-200 scroll-mt-28 shadow-sm',
    badgeTitle: 'font-bold text-[12.5px] text-neu-900 bg-sec-100 px-2.5 py-0.5 rounded-md',
    btnBackToGrid: 'flex items-center gap-1 text-[11px] bg-sec-100 hover:bg-sec-200 text-neu-900 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer',
    btnClose: 'flex items-center gap-1 text-[11px] bg-white hover:bg-sec-50 text-neu-900 border border-sec-300 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer shadow-2xs',
    contentCard: 'text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify bg-white/95 p-4 rounded-lg border border-sec-200 shadow-2xs',
    penjelasanCard: 'text-[12px] text-pr-900 leading-relaxed whitespace-pre-line text-justify bg-pr-50/60 p-3.5 rounded-lg border border-pr-200',
    footerBtnBack: 'flex items-center gap-1.5 text-neu-900 hover:text-pr-900 font-semibold cursor-pointer py-1 px-3 rounded-md bg-sec-100 hover:bg-sec-200 transition-colors',
    footerBtnClose: 'text-sec-900 hover:text-sec-800 font-semibold underline cursor-pointer',
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
      <mark key={index} className="bg-sec-100 text-neu-900 font-semibold rounded px-0.5">
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
      <div className={`flex items-center gap-2 font-bold text-[12px] ${theme.banner.titleColor}`}>
        <Zap className={`w-4 h-4 shrink-0 ${theme.banner.iconColor}`} />
        <span>Ketentuan Perubahan Peraturan</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap text-[12px]">
        <span className={`font-medium ${theme.banner.targetLabelColor}`}>
          Mengubah Peraturan Induk:{' '}
          <span className={`font-extrabold ${theme.banner.targetHighlightColor}`}>
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
        <div className={`flex items-center justify-between flex-wrap gap-2 font-bold text-[12px] ${theme.grid.titleColor}`}>
          <div className="flex items-center gap-1.5">
            <Zap className={`w-4 h-4 shrink-0 ${theme.grid.iconColor}`} />
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
                className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive ? theme.button.active : theme.button.default
                }`}
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

            <div className="flex items-center gap-2">
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

          <div className={theme.detailPanel.contentCard}>
            {highlightText(activeSubPasal.isi, searchQuery)}
          </div>

          {activeSubPasal.penjelasan && (
            <div className={theme.detailPanel.penjelasanCard}>
              <span className="font-semibold block mb-1">Penjelasan {activeSubPasal.nomor}:</span>
              {highlightText(activeSubPasal.penjelasan, searchQuery)}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-sec-200 text-[11px] flex-wrap gap-2">
            <button
              type="button"
              onClick={handleScrollBackToGrid}
              className={theme.detailPanel.footerBtnBack}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Kembali ke Pusat Daftar Pasal Target</span>
            </button>

            <button
              type="button"
              onClick={handleCloseSubPasal}
              className={theme.detailPanel.footerBtnClose}
            >
              Tutup Rincian & Kembali
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default KetentuanPerubahanBanner;

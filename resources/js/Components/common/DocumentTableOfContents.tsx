import React, { useState } from 'react';
import { AlignLeft, ChevronRight, ChevronDown } from 'lucide-react';

export interface TocArticleItem {
  id: string;
  nomor: string;
  isi?: string;
  penjelasan?: string;
  isExpanded?: boolean;
  pasalList?: TocArticleItem[];
}

export interface TocChapterItem {
  id: string;
  judul: string;
  deskripsi?: string;
  isExpanded?: boolean;
  pasalList?: TocArticleItem[];
  children?: TocChapterItem[];
}

export interface TocPembukaanData {
  judul?: string;
  menimbang?: string;
  mengingat?: string;
  memutuskan?: string;
  menetapkan?: string;
}

export interface DocumentTableOfContentsProps {
  /** Label untuk judul pembukaan (default: 'Pembukaan UUD 1945') */
  pembukaanJudul?: string;
  /** Data sub-bagian pembukaan jika ada (Menimbang, Mengingat, dsb.) */
  pembukaanData?: TocPembukaanData;
  /** Daftar struktur BAB dan Pasal */
  babList: TocChapterItem[];
  /** ID section yang sedang aktif (misal: 'section-pembukaan' atau 'section-pasal-1') */
  activeSection?: string;

  /** Callback saat tombol Pembukaan diklik */
  onPembukaanClick?: () => void;
  /** Callback saat sub-section Pembukaan (Menimbang, dll) diklik */
  onSectionClick?: (sectionId: string) => void;
  /** Callback saat header BAB diklik */
  onBabClick?: (babId: string) => void;
  /** Callback saat item Pasal diklik */
  onPasalClick?: (babId: string, pasalId: string) => void;

  /** ID elemen container scroll (misal: 'editor-scroll-container' pada form koreksi admin) */
  scrollContainerId?: string;

  /** Kustomisasi style wrapper */
  className?: string;
  /** Sembunyikan header 'DAFTAR ISI' jika diperlukan */
  hideHeader?: boolean;
  /** Judul header custom (default: 'DAFTAR ISI') */
  headerTitle?: string;
  /** Nilai default apakah semua bab terbuka (default: bab ke 1 & 2 terbuka sesuai Figma) */
  defaultExpandFirstCount?: number;
}

export function DocumentTableOfContents({
  pembukaanJudul = 'Pembukaan UUD 1945',
  pembukaanData,
  babList = [],
  activeSection = '',
  onPembukaanClick,
  onSectionClick,
  onBabClick,
  onPasalClick,
  scrollContainerId,
  className = '',
  hideHeader = false,
  headerTitle = 'DAFTAR ISI',
  defaultExpandFirstCount = 2,
}: DocumentTableOfContentsProps) {
  const [expandedBabs, setExpandedBabs] = useState<Record<string, boolean>>({});
  const [isPembukaanExpanded, setIsPembukaanExpanded] = useState<boolean>(false);

  const hasPembukaanSubItems = Boolean(
    pembukaanData &&
      (pembukaanData.menimbang ||
        pembukaanData.mengingat ||
        pembukaanData.memutuskan ||
        pembukaanData.menetapkan)
  );

  const isBabExpanded = (bab: TocChapterItem, index: number): boolean => {
    if (expandedBabs[bab.id] !== undefined) {
      return expandedBabs[bab.id];
    }
    if (bab.isExpanded !== undefined) {
      return bab.isExpanded;
    }
    return index < defaultExpandFirstCount;
  };

  const scrollToTarget = (targetId: string) => {
    const domId = targetId.startsWith('section-') ? targetId : `section-${targetId}`;

    setTimeout(() => {
      const el = document.getElementById(domId) || document.getElementById(targetId);
      if (!el) return;

      if (scrollContainerId) {
        const container = document.getElementById(scrollContainerId);
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const scrollTop = container.scrollTop + (elRect.top - containerRect.top) - 16;
          container.scrollTo({ top: scrollTop, behavior: 'smooth' });
          return;
        }
      }

      // Check if public #scrollable-content container exists (DetailPeraturan)
      const publicContainer = document.getElementById('scrollable-content');
      if (publicContainer && window.innerWidth >= 1024) {
        const headerOffset = 16;
        const elementPosition = el.getBoundingClientRect().top;
        const containerPosition = publicContainer.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition - containerPosition + publicContainer.scrollTop - headerOffset;
        publicContainer.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return;
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const isSectionActive = (id: string): boolean => {
    if (!activeSection) return false;
    const cleanActive = activeSection.replace(/^section-/, '');
    const cleanId = id.replace(/^section-/, '');
    return cleanActive === cleanId;
  };

  const handlePembukaanClick = () => {
    if (onPembukaanClick) {
      onPembukaanClick();
    }
    if (hasPembukaanSubItems) {
      setIsPembukaanExpanded((prev) => !prev);
    }
    scrollToTarget('section-pembukaan');
  };

  const handleSubSectionClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
    scrollToTarget(sectionId);
  };

  const handleHeaderBabClick = (bab: TocChapterItem, index: number) => {
    const currentState = isBabExpanded(bab, index);
    setExpandedBabs((prev) => ({
      ...prev,
      [bab.id]: !currentState,
    }));
    if (onBabClick) {
      onBabClick(bab.id);
    }
    scrollToTarget(`section-${bab.id}`);
  };

  const handleArticleClick = (babId: string, pasalId: string) => {
    if (onPasalClick) {
      onPasalClick(babId, pasalId);
    }
    scrollToTarget(`section-${pasalId}`);
  };

  // Filter out invalid/empty babs
  const filteredBabs = babList.filter(
    (bab) =>
      bab.judul &&
      bab.judul.trim() !== '' &&
      bab.judul.trim() !== '-' &&
      !bab.judul.toUpperCase().includes('PENJELASAN')
  );

  return (
    <aside
      aria-label="Daftar Isi Dokumen"
      className={`w-full lg:w-[258px] shrink-0 bg-white rounded-[20px] border border-neu-50 p-[14px_18px] shadow-2xs flex flex-col gap-4 font-sans ${className}`}
    >
      {/* ── HEADER DAFTAR ISI (Figma node #2258:48480) ───────────────── */}
      {!hideHeader && (
        <div className="flex items-center gap-1.5 shrink-0">
          <AlignLeft className="w-[18px] h-[18px] text-neu-800 shrink-0" />
          <h2 className="text-[12px] font-medium text-neu-800 tracking-wide uppercase leading-[18px]">
            {headerTitle}
          </h2>
        </div>
      )}

      {/* ── LIST STRUKTUR DOKUMEN (Figma node #2258:48483) ────────────── */}
      <nav className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar flex-1 pr-0.5">
        {/* Item Pembukaan (Figma node #2258:48484) */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={handlePembukaanClick}
            className={`w-full min-h-[34px] px-3 py-2 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer ${
              isSectionActive('pembukaan')
                ? 'bg-pr-50 text-pr-900 font-semibold'
                : 'text-pr-800 hover:bg-neu-50/80 hover:text-pr-900'
            }`}
          >
            <span className="truncate text-[12px] font-medium leading-[18px]">
              {pembukaanJudul}
            </span>
            {hasPembukaanSubItems ? (
              isPembukaanExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-neu-600 shrink-0 ml-2" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-neu-400 shrink-0 ml-2" />
              )
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-neu-400 shrink-0 ml-2" />
            )}
          </button>

          {/* Sub-items Pembukaan (Menimbang, Mengingat, Memutuskan, Menetapkan) */}
          {hasPembukaanSubItems && isPembukaanExpanded && (
            <div className="border-l-2 border-neu-100 pl-3 ml-3 py-1 flex flex-col gap-[2px]">
              {Boolean(pembukaanData?.menimbang) && (
                <button
                  type="button"
                  onClick={() => handleSubSectionClick('section-menimbang')}
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${
                    isSectionActive('menimbang')
                      ? 'bg-pr-50 text-pr-900 font-semibold'
                      : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
                  }`}
                >
                  Menimbang
                </button>
              )}
              {Boolean(pembukaanData?.mengingat) && (
                <button
                  type="button"
                  onClick={() => handleSubSectionClick('section-mengingat')}
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${
                    isSectionActive('mengingat')
                      ? 'bg-pr-50 text-pr-900 font-semibold'
                      : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
                  }`}
                >
                  Mengingat
                </button>
              )}
              {Boolean(pembukaanData?.memutuskan) && (
                <button
                  type="button"
                  onClick={() => handleSubSectionClick('section-memutuskan')}
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${
                    isSectionActive('memutuskan')
                      ? 'bg-pr-50 text-pr-900 font-semibold'
                      : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
                  }`}
                >
                  Memutuskan
                </button>
              )}
              {Boolean(pembukaanData?.menetapkan) && (
                <button
                  type="button"
                  onClick={() => handleSubSectionClick('section-menetapkan')}
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${
                    isSectionActive('menetapkan')
                      ? 'bg-pr-50 text-pr-900 font-semibold'
                      : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
                  }`}
                >
                  Menetapkan
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── DAFTAR BAB (Figma node #2258:48489, #2258:48501, dll) ───── */}
        {filteredBabs.map((bab, index) => {
          const isExpanded = isBabExpanded(bab, index);
          const validPasals = (bab.pasalList || []).filter(
            (p) => p.nomor && p.nomor.trim() !== '' && p.nomor.trim() !== '-'
          );
          const hasChildren = (bab.children && bab.children.length > 0) || validPasals.length > 0;
          const isBabActive = isSectionActive(bab.id);

          return (
            <div key={bab.id} className="flex flex-col gap-1 w-full">
              {/* BAB Header Button (Figma node #2258:48490 & #2258:48502) */}
              <button
                type="button"
                onClick={() => handleHeaderBabClick(bab, index)}
                className={`w-full px-3 py-2 rounded-lg border border-neu-50 flex items-center justify-between text-left transition-colors cursor-pointer ${
                  isBabActive
                    ? 'bg-pr-50 text-pr-900 font-semibold'
                    : 'bg-white hover:bg-neu-50/60'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 pr-1">
                  {hasChildren ? (
                    isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-neu-600 shrink-0 transition-transform" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-neu-600 shrink-0 transition-transform" />
                    )
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-neu-400 shrink-0" />
                  )}
                  <span
                    className={`truncate text-[12px] font-medium leading-[18px] ${
                      isBabActive ? 'text-pr-900 font-semibold' : 'text-neu-600'
                    }`}
                  >
                    {bab.judul}
                  </span>
                </div>
              </button>

              {/* Nested Articles / Pasal (Figma node #2258:48496 & #2258:48508) */}
              {isExpanded && hasChildren && (
                <div className="border-l-2 border-neu-100 pl-3 ml-3.5 py-0.5 flex flex-col gap-[2px]">
                  {/* Render Sub-bab jika ada */}
                  {bab.children?.map((childBab, cIdx) => (
                    <div key={childBab.id} className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleHeaderBabClick(childBab, cIdx)}
                        className="px-2 py-1 rounded-[6px] text-left text-[11px] font-medium text-neu-700 hover:text-pr-900 hover:bg-neu-50 transition-colors w-full cursor-pointer flex items-center gap-1"
                      >
                        <ChevronRight className="w-3 h-3 text-neu-500 shrink-0" />
                        <span className="truncate">{childBab.judul}</span>
                      </button>
                    </div>
                  ))}

                  {/* Render Pasal-pasal */}
                  {validPasals.map((pasal) => {
                    const isPasalActive = isSectionActive(pasal.id);

                    return (
                      <div key={pasal.id} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => handleArticleClick(bab.id, pasal.id)}
                          className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer flex items-center justify-between ${
                            isPasalActive
                              ? 'bg-pr-50 text-pr-900 font-semibold'
                              : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
                          }`}
                        >
                          <span className="truncate">{pasal.nomor}</span>
                        </button>

                        {/* Render Sub-Pasal / Ayat jika bertingkat */}
                        {pasal.pasalList &&
                          pasal.pasalList.length > 0 &&
                          isPasalActive && (
                            <div className="border-l border-neu-100 pl-2.5 ml-2 py-0.5 flex flex-col gap-[2px]">
                              {pasal.pasalList.map((childPasal) => (
                                <button
                                  key={childPasal.id}
                                  type="button"
                                  onClick={() =>
                                    handleArticleClick(bab.id, childPasal.id)
                                  }
                                  className="px-1.5 py-1 rounded text-left text-[11px] font-medium text-neu-500 hover:text-pr-900 hover:bg-neu-50 transition-colors w-full cursor-pointer"
                                >
                                  {childPasal.nomor}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default DocumentTableOfContents;

import React, { useState } from 'react';
import { AlignLeft, ChevronRight, ChevronDown, ArrowUpRight } from 'lucide-react';

export interface TocArticleItem {
  id: string;
  nomor: string;
  isi?: string;
  penjelasan?: string;
  isExpanded?: boolean;
  pasalList?: TocArticleItem[];
  targetInduk?: {
    standardId: string;
    labelSingkat?: string;
    namaLengkap?: string;
  };
  tipe?: string;
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
  /** Callback saat header BAB/Bagian diklik untuk navigasi ke dokumen */
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
  /** Callback saat header/ikon Daftar Isi diklik (berguna untuk toggle minimize) */
  onHeaderClick?: () => void;
  /** Varian tampilan: 'card' (kartu melayang) atau 'integrated' (panel menyatu tanpa border luar) */
  variant?: 'card' | 'integrated';
}

interface TocChapterNodeProps {
  bab: TocChapterItem;
  index: number;
  depth: number;
  isExpanded: boolean;
  onToggleExpand: (babId: string, currentState: boolean, e?: React.MouseEvent) => void;
  onBabClick?: (babId: string) => void;
  onPasalClick?: (babId: string, pasalId: string) => void;
  scrollToTarget: (targetId: string) => void;
  isSectionActive: (id: string) => boolean;
  isBabExpanded: (bab: TocChapterItem, index: number) => boolean;
  expandedContainers: Record<string, boolean>;
  setExpandedContainers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

function TocChapterNode({
  bab,
  index,
  depth,
  isExpanded,
  onToggleExpand,
  onBabClick,
  onPasalClick,
  scrollToTarget,
  isSectionActive,
  isBabExpanded,
  expandedContainers,
  setExpandedContainers,
}: TocChapterNodeProps) {
  const validPasals = (bab.pasalList || []).filter(
    (p) => p.nomor && p.nomor.trim() !== '' && p.nomor.trim() !== '-'
  );
  const hasSubChapters = Boolean(bab.children && bab.children.length > 0);
  const hasChildren = hasSubChapters || validPasals.length > 0;
  const isBabActive = isSectionActive(bab.id);

  // Klik baris kategori HANYA untuk expand / collapse di TOC
  const handleRowClick = (e: React.MouseEvent) => {
    onToggleExpand(bab.id, isExpanded, e);
  };

  // Navigasi eksplisit ke posisi bagian di dokumen utama
  const handleNavigateToDoc = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const renderPasalItem = (pasal: TocArticleItem, parentBabId: string) => {
    const isPasalActive = isSectionActive(pasal.id);
    const hasChildPasals = Boolean(pasal.pasalList && pasal.pasalList.length > 0);
    const hasChildActive = Boolean(
      hasChildPasals && pasal.pasalList?.some((child) => isSectionActive(child.id))
    );

    const isContainerOpen =
      expandedContainers[pasal.id] !== undefined
        ? expandedContainers[pasal.id]
        : isPasalActive || hasChildActive;

    return (
      <div key={pasal.id} className="flex flex-col">
        <button
          type="button"
          onClick={() => {
            if (hasChildPasals) {
              setExpandedContainers((prev) => ({
                ...prev,
                [pasal.id]: !isContainerOpen,
              }));
            }
            handleArticleClick(parentBabId, pasal.id);
          }}
          className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer flex items-center justify-between min-w-0 ${
            isPasalActive || hasChildActive
              ? 'bg-pr-50 text-pr-900 font-semibold'
              : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
          }`}
        >
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="truncate">{pasal.nomor}</span>
              {pasal.targetInduk && (
                <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-sec-100 text-sec-900 border border-sec-200 shrink-0">
                  {pasal.targetInduk.labelSingkat || 'Perubahan'}
                </span>
              )}
            </div>
            {pasal.targetInduk?.namaLengkap && (
              <span
                className="text-[10px] text-neu-500 truncate max-w-[190px]"
                title={pasal.targetInduk.namaLengkap}
              >
                {pasal.targetInduk.namaLengkap}
              </span>
            )}
          </div>

          {hasChildPasals && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setExpandedContainers((prev) => ({
                  ...prev,
                  [pasal.id]: !isContainerOpen,
                }));
              }}
              className="shrink-0 p-0.5 text-neu-400 hover:text-neu-700 cursor-pointer"
            >
              {isContainerOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </button>

        {/* Render Sub-Pasal amandemen */}
        {hasChildPasals && isContainerOpen && (
          <div className="border-l-2 border-sec-200 pl-2.5 ml-2.5 py-0.5 flex flex-col gap-[2px] mt-0.5">
            {pasal.pasalList!.map((childPasal) => {
              const isChildActive = isSectionActive(childPasal.id);

              return (
                <button
                  key={childPasal.id}
                  type="button"
                  onClick={() => handleArticleClick(parentBabId, childPasal.id)}
                  className={`px-2 py-1 rounded-[5px] text-left text-[11px] transition-colors w-full cursor-pointer flex items-center justify-between ${
                    isChildActive
                      ? 'bg-sec-100 text-sec-900 font-semibold'
                      : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
                  }`}
                >
                  <span className="truncate">{childPasal.nomor}</span>
                  <span className="text-[9px] px-1 rounded text-neu-400 font-medium shrink-0">
                    Diubah
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Depth 0: Tingkat BAB
  if (depth === 0) {
    return (
      <div className="flex flex-col gap-1 w-full">
        <div
          role="button"
          tabIndex={0}
          onClick={handleRowClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRowClick(e as any);
            }
          }}
          className={`group w-full px-3 py-2 rounded-lg border border-neu-50 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isBabActive
              ? 'bg-pr-50 text-pr-900 font-semibold'
              : 'bg-white hover:bg-neu-50/70'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0 pr-1 flex-1">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-neu-600 shrink-0 transition-transform" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-neu-600 shrink-0 transition-transform" />
              )
            ) : (
              <span className="w-3.5 shrink-0" />
            )}
            <span
              className={`truncate text-[12px] font-medium leading-[18px] ${
                isBabActive ? 'text-pr-900 font-semibold' : 'text-neu-700'
              }`}
            >
              {bab.judul}
            </span>
          </div>

          <button
            type="button"
            title="Loncat ke bab di dokumen"
            onClick={handleNavigateToDoc}
            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-neu-200/60 rounded text-neu-400 hover:text-neu-800 transition-opacity shrink-0 cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sub-Bab / Bagian / Paragraf dan Pasal */}
        {isExpanded && hasChildren && (
          <div className="border-l-2 border-neu-100 pl-2.5 ml-3.5 py-0.5 flex flex-col gap-[2px]">
            {/* Render Sub-bab (Bagian / Paragraf) rekursif */}
            {bab.children?.map((childBab, cIdx) => (
              <TocChapterNode
                key={childBab.id}
                bab={childBab}
                index={cIdx}
                depth={depth + 1}
                isExpanded={isBabExpanded(childBab, cIdx)}
                onToggleExpand={onToggleExpand}
                onBabClick={onBabClick}
                onPasalClick={onPasalClick}
                scrollToTarget={scrollToTarget}
                isSectionActive={isSectionActive}
                isBabExpanded={isBabExpanded}
                expandedContainers={expandedContainers}
                setExpandedContainers={setExpandedContainers}
              />
            ))}

            {/* Render Pasal-pasal langsung di bawah BAB */}
            {validPasals.map((pasal) => renderPasalItem(pasal, bab.id))}
          </div>
        )}
      </div>
    );
  }

  // Depth > 0: Tingkat Bagian, Paragraf, dll.
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={handleRowClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRowClick(e as any);
          }
        }}
        className={`group w-full px-2 py-1.5 rounded-[6px] flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
          isBabActive
            ? 'bg-pr-50 text-pr-900 font-semibold'
            : 'hover:bg-neu-50 text-neu-700'
        }`}
      >
        <div className="flex items-center gap-1 min-w-0 pr-1 flex-1">
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-3 h-3 text-neu-500 shrink-0 transition-transform" />
            ) : (
              <ChevronRight className="w-3 h-3 text-neu-500 shrink-0 transition-transform" />
            )
          ) : (
            <span className="w-3 shrink-0" />
          )}
          <span className="truncate text-[11.5px] font-medium leading-[16px]">
            {bab.judul}
          </span>
        </div>

        <button
          type="button"
          title="Loncat ke posisi ini di dokumen"
          onClick={handleNavigateToDoc}
          className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-neu-200/60 rounded text-neu-400 hover:text-neu-800 transition-opacity shrink-0 cursor-pointer"
        >
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Children di bawah Bagian / Paragraf */}
      {isExpanded && hasChildren && (
        <div className="border-l-2 border-neu-100 pl-2 ml-2 py-0.5 flex flex-col gap-[2px]">
          {/* Sub-children rekursif (misal Paragraf di bawah Bagian) */}
          {bab.children?.map((childBab, cIdx) => (
            <TocChapterNode
              key={childBab.id}
              bab={childBab}
              index={cIdx}
              depth={depth + 1}
              isExpanded={isBabExpanded(childBab, cIdx)}
              onToggleExpand={onToggleExpand}
              onBabClick={onBabClick}
              onPasalClick={onPasalClick}
              scrollToTarget={scrollToTarget}
              isSectionActive={isSectionActive}
              isBabExpanded={isBabExpanded}
              expandedContainers={expandedContainers}
              setExpandedContainers={setExpandedContainers}
            />
          ))}

          {/* Pasal-pasal di bawah Bagian / Paragraf */}
          {validPasals.map((pasal) => renderPasalItem(pasal, bab.id))}
        </div>
      )}
    </div>
  );
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
  defaultExpandFirstCount = 0,
  onHeaderClick,
  variant = 'card',
}: DocumentTableOfContentsProps) {
  const [expandedBabs, setExpandedBabs] = useState<Record<string, boolean>>({});
  const [expandedContainers, setExpandedContainers] = useState<Record<string, boolean>>({});
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
    if (defaultExpandFirstCount > 0) {
      return index < defaultExpandFirstCount;
    }
    return false;
  };

  const handleToggleExpand = (chapterId: string, currentState: boolean, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedBabs((prev) => ({
      ...prev,
      [chapterId]: !currentState,
    }));
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

      // Check if public #scrollable-content container exists AND has inner scroll
      const publicContainer = document.getElementById('scrollable-content');
      if (publicContainer && window.innerWidth >= 1024 && publicContainer.scrollHeight > publicContainer.clientHeight + 10) {
        const headerOffset = 16;
        const elementPosition = el.getBoundingClientRect().top;
        const containerPosition = publicContainer.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition - containerPosition + publicContainer.scrollTop - headerOffset;
        publicContainer.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return;
      }

      const headerOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
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
      className={
        variant === 'integrated'
          ? `w-full shrink-0 flex flex-col gap-3 font-sans overflow-y-auto custom-scrollbar ${className}`
          : `w-full lg:w-[258px] shrink-0 bg-white rounded-[20px] border border-neu-50 p-[14px_18px] shadow-2xs flex flex-col gap-4 font-sans ${className}`
      }
    >
      {/* ── HEADER DAFTAR ISI (Figma node #2258:48480) ───────────────── */}
      {!hideHeader && (
        <button 
          onClick={onHeaderClick}
          className={`flex items-center gap-1.5 shrink-0 ${onHeaderClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'cursor-default'}`}
          type="button"
        >
          <AlignLeft className="w-[18px] h-[18px] text-neu-800 shrink-0" />
          <h2 className="text-[12px] font-medium text-neu-800 tracking-wide uppercase leading-[18px]">
            {headerTitle}
          </h2>
        </button>
      )}

      {/* ── LIST STRUKTUR DOKUMEN (Figma node #2258:48483) ────────────── */}
      <nav className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar flex-1 pr-0.5">
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
        {filteredBabs.map((bab, index) => (
          <TocChapterNode
            key={bab.id}
            bab={bab}
            index={index}
            depth={0}
            isExpanded={isBabExpanded(bab, index)}
            onToggleExpand={handleToggleExpand}
            onBabClick={onBabClick}
            onPasalClick={onPasalClick}
            scrollToTarget={scrollToTarget}
            isSectionActive={isSectionActive}
            isBabExpanded={isBabExpanded}
            expandedContainers={expandedContainers}
            setExpandedContainers={setExpandedContainers}
          />
        ))}
      </nav>
    </aside>
  );
}

export default DocumentTableOfContents;

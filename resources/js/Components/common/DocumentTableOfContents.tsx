import React, { useMemo, useState } from 'react';
import { AlignLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { SearchInput } from '@/Components/common/SearchInput';

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
  /** Tampilkan input pencarian untuk menyaring Bab dan Pasal */
  showSearch?: boolean;
  /** Callback saat kata kunci pencarian berubah */
  onSearchChange?: (query: string) => void;
  /** Placeholder input pencarian (default: 'Cari bab atau pasal...') */
  searchPlaceholder?: string;
}

const normalizeSearchValue = (value?: string): string => (value || '').toLowerCase().trim();

const matchesSearchQuery = (query: string, ...values: (string | undefined)[]): boolean =>
  values.some((value) => normalizeSearchValue(value).includes(query));

const filterArticles = (articles: TocArticleItem[], query: string): TocArticleItem[] =>
  articles.reduce<TocArticleItem[]>((result, article) => {
    const matchingChildren = filterArticles(article.pasalList || [], query);
    const isMatch = matchesSearchQuery(query, article.nomor, article.isi, article.penjelasan);

    if (!isMatch && matchingChildren.length === 0) {
      return result;
    }

    result.push({
      ...article,
      pasalList: isMatch ? article.pasalList : matchingChildren,
    });
    return result;
  }, []);

const filterChapters = (chapters: TocChapterItem[], query: string): TocChapterItem[] =>
  chapters.reduce<TocChapterItem[]>((result, chapter) => {
    const isMatch = matchesSearchQuery(query, chapter.judul, chapter.deskripsi);
    const matchingPasals = filterArticles(chapter.pasalList || [], query);
    const matchingChildren = filterChapters(chapter.children || [], query);

    if (!isMatch && matchingPasals.length === 0 && matchingChildren.length === 0) {
      return result;
    }

    result.push({
      ...chapter,
      isExpanded: true,
      pasalList: isMatch ? chapter.pasalList : matchingPasals,
      children: isMatch ? chapter.children : matchingChildren,
    });
    return result;
  }, []);

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
  showSearch = false,
  onSearchChange,
  searchPlaceholder = 'Cari bab atau pasal...',
}: DocumentTableOfContentsProps) {
  const [expandedBabs, setExpandedBabs] = useState<Record<string, boolean>>({});
  const [expandedContainers, setExpandedContainers] = useState<Record<string, boolean>>({});
  const [isPembukaanExpanded, setIsPembukaanExpanded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const isSectionActive = (id: string, kind: 'section' | 'struktur' = 'section'): boolean => {
    if (!activeSection) return false;
    const cleanActive = activeSection.replace(/^(section|struktur)-/, '');
    const cleanId = id.replace(/^(section|struktur)-/, '');
    if (cleanActive !== cleanId) return false;

    // Jaga agar ID numerik Bab dan Pasal yang kebetulan sama tidak saling bertabrakan.
    if (activeSection.startsWith('struktur-')) return kind === 'struktur';
    if (activeSection.startsWith('section-')) return kind === 'section';
    return true;
  };

  const handlePembukaanClick = () => {
    if (hasPembukaanSubItems) {
      setIsPembukaanExpanded(true);
    }
    if (onPembukaanClick) {
      onPembukaanClick();
    }
    scrollToTarget('section-pembukaan');
  };

  const handleSubSectionClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
    scrollToTarget(sectionId);
  };

  const handleToggleBab = (bab: TocChapterItem, isCurrentlyExpanded: boolean) => {
    setExpandedBabs((prev) => ({
      ...prev,
      [bab.id]: !isCurrentlyExpanded,
    }));
  };

  const handleNavigateBab = (bab: TocChapterItem) => {
    setExpandedBabs((prev) => ({
      ...prev,
      [bab.id]: true,
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
  const baseBabs = useMemo(
    () =>
      babList.filter(
        (bab) =>
          bab.judul &&
          bab.judul.trim() !== '' &&
          bab.judul.trim() !== '-' &&
          !bab.judul.toUpperCase().includes('PENJELASAN')
      ),
    [babList]
  );

  const normalizedSearchQuery = normalizeSearchValue(searchQuery);

  const filteredBabs = useMemo(
    () =>
      normalizedSearchQuery
        ? filterChapters(baseBabs, normalizedSearchQuery)
        : baseBabs,
    [baseBabs, normalizedSearchQuery]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  const renderArticle = (
    pasal: TocArticleItem,
    parentChapterId: string,
    depth: number
  ): React.ReactNode => {
    const isPasalActive = isSectionActive(pasal.id);
    const showNestedPasals =
      Boolean(pasal.pasalList && pasal.pasalList.length > 0) &&
      (isPasalActive || Boolean(normalizedSearchQuery));

    return (
      <div key={pasal.id} className="flex flex-col">
        <button
          type="button"
          onClick={() => handleArticleClick(parentChapterId, pasal.id)}
          className={`px-2 py-1.5 rounded-[6px] text-left transition-colors w-full cursor-pointer flex items-center justify-between ${depth > 0 ? 'text-[11px]' : 'text-[12px]'
            } ${isPasalActive
              ? 'bg-pr-50 text-pr-900 font-semibold'
              : 'font-medium text-neu-600 hover:text-pr-900 hover:bg-neu-50'
            }`}
        >
          <span className="truncate">{pasal.nomor}</span>
        </button>

        {showNestedPasals && (
          <div className="border-l border-neu-100 pl-2.5 ml-2 py-0.5 flex flex-col gap-[2px]">
            {pasal.pasalList!.map((childPasal) => {
              const isChildActive = isSectionActive(childPasal.id);

              return (
                <button
                  key={childPasal.id}
                  type="button"
                  onClick={() => handleArticleClick(parentChapterId, childPasal.id)}
                  className={`px-1.5 py-1 rounded text-left text-[11px] transition-colors w-full cursor-pointer ${isChildActive
                      ? 'bg-pr-50 text-pr-900 font-semibold'
                      : 'font-medium text-neu-500 hover:text-pr-900 hover:bg-neu-50'
                    }`}
                >
                  {childPasal.nomor}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderChapter = (
    chapter: TocChapterItem,
    index: number,
    depth: number
  ): React.ReactNode => {
    const validPasals = (chapter.pasalList || []).filter(
      (p) => p.nomor && p.nomor.trim() !== '' && p.nomor.trim() !== '-'
    );
    const children = chapter.children || [];
    const hasChildren = children.length > 0 || validPasals.length > 0;
    const isExpanded = normalizedSearchQuery
      ? true
      : depth === 0
        ? isBabExpanded(chapter, index)
        : expandedBabs[chapter.id] !== undefined
          ? expandedBabs[chapter.id]
          : Boolean(chapter.isExpanded);
    const isChapterActive = isSectionActive(chapter.id, 'struktur');

    const content = hasChildren && (
      <div
        {...(isExpanded ? {} : { inert: '' })}
        aria-hidden={!isExpanded}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`border-l-2 border-neu-100 pl-3 ${depth === 0 ? 'ml-3.5' : 'ml-2'
              } py-0.5 flex flex-col gap-[2px]`}
          >
            {children.map((child, childIndex) => renderChapter(child, childIndex, depth + 1))}
            {validPasals.map((pasal) => renderArticle(pasal, chapter.id, depth))}
          </div>
        </div>
      </div>
    );

    if (depth === 0) {
      return (
        <div key={chapter.id} className="flex flex-col gap-1 w-full">
          <div
            className={`w-full px-2 py-1.5 rounded-lg border border-neu-50 flex items-center gap-1 text-left transition-colors ${isChapterActive
                ? 'bg-pr-50 text-pr-900 font-semibold'
                : 'bg-white hover:bg-neu-50/60'
              }`}
          >
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleBab(chapter, isExpanded);
                }}
                className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ${isChapterActive
                    ? 'text-pr-900 hover:bg-pr-100/50'
                    : 'text-neu-600 hover:bg-neu-50 hover:text-neu-800'
                  }`}
                title={isExpanded ? `Tutup ${chapter.judul}` : `Buka ${chapter.judul}`}
                aria-label={isExpanded ? `Tutup ${chapter.judul}` : `Buka ${chapter.judul}`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${isExpanded ? 'rotate-90' : ''
                    }`}
                />
              </button>
            ) : (
              <div className="p-1 shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-neu-400 shrink-0" />
              </div>
            )}

            <button
              type="button"
              onClick={() => handleNavigateBab(chapter)}
              className="flex-1 min-w-0 text-left py-0.5 pr-1 cursor-pointer flex items-center"
            >
              <span
                className={`truncate text-[12px] font-medium leading-[18px] ${isChapterActive ? 'text-pr-900 font-semibold' : 'text-neu-600 hover:text-pr-900'
                  }`}
              >
                {chapter.judul}
              </span>
            </button>
          </div>

          {content}
        </div>
      );
    }

    return (
      <div key={chapter.id} className="flex flex-col gap-1">
        <div
          className={`px-1.5 py-0.5 rounded-[6px] text-left text-[11px] transition-colors w-full flex items-center gap-0.5 ${isChapterActive
              ? 'bg-pr-50 text-pr-900 font-semibold'
              : 'hover:bg-neu-50'
            }`}
        >
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleBab(chapter, isExpanded);
              }}
              className={`p-1 rounded transition-colors cursor-pointer shrink-0 ${isChapterActive
                  ? 'text-pr-900 hover:bg-pr-100/50'
                  : 'text-neu-500 hover:bg-neu-50 hover:text-neu-800'
                }`}
              title={isExpanded ? `Tutup ${chapter.judul}` : `Buka ${chapter.judul}`}
              aria-label={isExpanded ? `Tutup ${chapter.judul}` : `Buka ${chapter.judul}`}
            >
              <ChevronRight
                className={`w-3 h-3 transition-transform duration-300 ease-out ${isExpanded ? 'rotate-90' : ''
                  }`}
              />
            </button>
          ) : (
            <div className="p-1 shrink-0">
              <ChevronRight className="w-3 h-3 text-neu-400 shrink-0" />
            </div>
          )}

          <button
            type="button"
            onClick={() => handleNavigateBab(chapter)}
            className="flex-1 min-w-0 text-left py-1 pr-1 cursor-pointer truncate flex items-center"
          >
            <span
              className={`truncate ${isChapterActive
                  ? 'font-semibold text-pr-900'
                  : 'font-medium text-neu-700 hover:text-pr-900'
                }`}
            >
              {chapter.judul}
            </span>
          </button>
        </div>

        {content}
      </div>
    );
  };

  return (
    <aside
      aria-label="Daftar Isi Dokumen"
      className={
        variant === 'integrated'
          ? `w-full shrink-0 flex flex-col gap-3 font-sans overflow-y-auto custom-scrollbar ${className}`
          : `w-full lg:w-[258px] shrink-0 bg-white rounded-[20px] border border-neu-50 p-[14px_18px] shadow-2xs flex flex-col gap-4 font-sans ${className}`
      }
    >
      {/* ── HEADER & PENCARIAN (sticky agar tetap terlihat saat daftar di-scroll) ── */}
      {(!hideHeader || showSearch) && (
        <div
          className={`sticky top-0 z-10 flex flex-col gap-4 shrink-0 bg-white pb-2 ${variant === 'card' ? 'rounded-t-[20px]' : ''
            }`}
        >
          {/* ── HEADER DAFTAR ISI (Figma node #2258:48480) ─────────────── */}
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

          {/* ── INPUT PENCARIAN DAFTAR ISI ─────────────────────────────── */}
          {showSearch && (
            <SearchInput
              size="compact"
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
              placeholder={searchPlaceholder}
              className="shrink-0"
            />
          )}
        </div>
      )}

      {/* ── LIST STRUKTUR DOKUMEN (Figma node #2258:48483) ────────────── */}
      <nav className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar flex-1 pr-0.5">
        {/* Item Pembukaan (Figma node #2258:48484) */}
        <div className="flex flex-col gap-1">
          <div
            className={`w-full min-h-[34px] px-2 py-1 rounded-lg border border-neu-50 flex items-center text-left transition-colors ${isSectionActive('pembukaan')
                ? 'bg-pr-50 text-pr-900 font-semibold'
                : 'bg-white text-pr-800 hover:bg-neu-50/60 hover:text-pr-900'
              }`}
          >
            <button
              type="button"
              onClick={handlePembukaanClick}
              className="flex-1 min-w-0 text-left py-1 px-1 cursor-pointer flex items-center"
            >
              <span className={`truncate text-[12px] leading-[18px] ${isSectionActive('pembukaan') ? 'font-semibold text-pr-900' : 'font-medium'}`}>
                {pembukaanJudul}
              </span>
            </button>

            {hasPembukaanSubItems && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPembukaanExpanded((prev) => !prev);
                }}
                className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ml-1 ${isSectionActive('pembukaan')
                    ? 'text-pr-900 hover:bg-pr-100/50'
                    : 'text-neu-600 hover:bg-neu-50 hover:text-neu-800'
                  }`}
                title={isPembukaanExpanded ? `Tutup sub-bagian ${pembukaanJudul}` : `Buka sub-bagian ${pembukaanJudul}`}
                aria-label={isPembukaanExpanded ? `Tutup sub-bagian ${pembukaanJudul}` : `Buka sub-bagian ${pembukaanJudul}`}
              >
                {isPembukaanExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neu-400" />
                )}
              </button>
            )}
          </div>

          {/* Sub-items Pembukaan (Menimbang, Mengingat, Memutuskan, Menetapkan) */}
          {hasPembukaanSubItems && isPembukaanExpanded && (
            <div className="border-l-2 border-neu-100 pl-3 ml-3 py-1 flex flex-col gap-[2px]">
              {Boolean(pembukaanData?.menimbang) && (
                <button
                  type="button"
                  onClick={() => handleSubSectionClick('section-menimbang')}
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${isSectionActive('menimbang')
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
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${isSectionActive('mengingat')
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
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${isSectionActive('memutuskan')
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
                  className={`px-2 py-1.5 rounded-[6px] text-left text-[12px] transition-colors w-full cursor-pointer ${isSectionActive('menetapkan')
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

        {normalizedSearchQuery && filteredBabs.length === 0 && (
          <p className="px-2 py-3 text-center text-[11px] text-neu-500">
            Tidak ada bab atau pasal yang cocok.
          </p>
        )}

        {/* ── DAFTAR BAB, BAGIAN, PARAGRAF & PASAL (rekursif) ───────────── */}
        {filteredBabs.map((bab, index) => renderChapter(bab, index, 0))}
      </nav>
    </aside>
  );
}

export default DocumentTableOfContents;

import React, { useState, useMemo } from 'react';
import { Menu, ChevronRight, Layers, Link2, ArrowUpRight, Zap, Search, X } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from '../../admin/import/correctionParser';

interface ReadonlyTableOfContentsProps {
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
}

// Recursive helper for searching chapter tree
function filterChapterTree(nodes: ChapterItem[], query: string): { filtered: ChapterItem[]; hasMatch: boolean } {
  const q = query.toLowerCase().trim();
  if (!q) return { filtered: nodes, hasMatch: false };

  const result: ChapterItem[] = [];
  let anyMatch = false;

  for (const node of nodes) {
    const titleMatch = node.judul.toLowerCase().includes(q) || Boolean(node.deskripsi && node.deskripsi.toLowerCase().includes(q));

    const childRes = node.children && node.children.length > 0
      ? filterChapterTree(node.children, q)
      : { filtered: [], hasMatch: false };

    const matchingPasals = node.pasalList
      ? node.pasalList.filter((p) => {
          const nomorMatch = Boolean(p.nomor && p.nomor.toLowerCase().includes(q));
          const isiMatch = Boolean(p.isi && p.isi.toLowerCase().includes(q));
          const penjelMatch = Boolean(p.penjelasan && p.penjelasan.toLowerCase().includes(q));
          return nomorMatch || isiMatch || penjelMatch;
        })
      : [];

    const pasalMatch = matchingPasals.length > 0;

    if (titleMatch || childRes.hasMatch || pasalMatch) {
      anyMatch = true;
      result.push({
        ...node,
        children: childRes.filtered,
        pasalList: titleMatch ? node.pasalList : matchingPasals,
      });
    }
  }

  return { filtered: result, hasMatch: anyMatch };
}

function TocPasalNode({ 
  pasal, 
  onNavigateToPasal,
  activeSectionId,
}: {
  pasal: ArticleItem;
  onNavigateToPasal?: (id: string) => void;
  activeSectionId?: string;
}) {
  const isActive = activeSectionId === pasal.id || activeSectionId === `section-${pasal.id}`;

  return (
    <div className={`flex items-center justify-between group rounded-lg p-0.5 transition-all ${
      isActive ? 'bg-pr-900 text-white shadow-2xs font-bold px-1.5' : 'hover:bg-neu-50/80'
    }`}>
      <button
        type="button"
        onClick={() => {
          if (onNavigateToPasal) onNavigateToPasal(pasal.id);
        }}
        className={`flex-1 min-w-0 text-left py-1 px-1 text-[12px] transition-colors flex items-center justify-between cursor-pointer gap-1.5 ${
          isActive ? 'text-white font-bold' : 'font-medium text-neu-700 hover:text-pr-900'
        }`}
      >
        <span className="truncate">{pasal.nomor}</span>
      </button>

      {onNavigateToPasal && (
        <button
          type="button"
          title={`Lompat ke ${pasal.nomor}`}
          onClick={(e) => {
            e.stopPropagation();
            onNavigateToPasal(pasal.id);
          }}
          className={`p-1 rounded cursor-pointer transition-all ml-1 shrink-0 ${
            isActive ? 'text-white hover:bg-pr-800' : 'text-neu-400 hover:text-pr-900 hover:bg-white'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

function TocNode({ item, expandedBabs, toggleLocalBab, onNavigateToStruktur, onNavigateToPasal, activeSectionId, searchQuery = '', depth = 0 }: {
  item: ChapterItem;
  expandedBabs: Record<string, boolean>;
  toggleLocalBab: (id: string) => void;
  onNavigateToStruktur?: (id: string) => void;
  onNavigateToPasal?: (id: string) => void;
  activeSectionId?: string;
  searchQuery?: string;
  depth?: number;
}) {
  const isSearching = Boolean(searchQuery.trim());
  const isExpanded = isSearching ? true : (expandedBabs[item.id] ?? false);
  const marginLeft = depth > 0 ? (depth * 0.4) + 'rem' : '0';
  const hasChildren = (item.children && item.children.length > 0) || (item.pasalList && item.pasalList.length > 0);

  const isBab = item.tipe === 'BAB' || depth === 0;
  const isActive = activeSectionId === item.id || activeSectionId === `struktur-${item.id}`;

  return (
    <div className="space-y-1.5" style={{ marginLeft }}>
      <div className="flex items-center justify-between gap-1 group">
        <button
          type="button"
          onClick={() => {
            if (hasChildren) toggleLocalBab(item.id);
          }}
          className={`flex-1 min-w-0 text-left p-2 rounded-[8px] transition-colors flex items-center justify-between cursor-pointer ${
            isActive
              ? 'bg-pr-900 text-white font-bold text-[12px] leading-tight shadow-2xs'
              : isBab
              ? 'bg-[#E8EEF5] text-pr-900 font-bold text-[12px] leading-tight'
              : depth === 1
              ? 'bg-neu-50/80 text-neu-800 font-semibold text-[11px]'
              : 'bg-white text-neu-700 font-medium text-[11px] border border-neu-100'
          }`}
        >
          <span className="line-clamp-2 truncate pr-1">{item.judul}</span>
          {hasChildren && (
            <ChevronRight
              className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                isActive ? 'text-white' : 'text-neu-500'
              } ${isExpanded ? 'rotate-90' : ''}`}
            />
          )}
        </button>

        {onNavigateToStruktur && (
          <button
            type="button"
            title={`Lompat ke ${item.judul}`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToStruktur(item.id);
            }}
            className="p-1.5 text-neu-400 hover:text-pr-900 hover:bg-neu-100 rounded cursor-pointer transition-colors shrink-0"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="pl-2.5 py-1 space-y-1 border-l-2 border-pr-900/30 ml-2">
          {item.children?.map(child => (
            <TocNode 
              key={child.id}
              item={child}
              expandedBabs={expandedBabs}
              toggleLocalBab={toggleLocalBab}
              onNavigateToStruktur={onNavigateToStruktur}
              onNavigateToPasal={onNavigateToPasal}
              activeSectionId={activeSectionId}
              searchQuery={searchQuery}
              depth={depth + 1}
            />
          ))}
          {item.pasalList
            ?.filter((p) => p.nomor && p.nomor.trim() !== '-' && p.nomor.trim() !== '')
            .map((pasal) => (
              <TocPasalNode
                key={pasal.id}
                pasal={pasal}
                onNavigateToPasal={onNavigateToPasal}
                activeSectionId={activeSectionId}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export function ReadonlyTableOfContents({
  pembukaanJudul = 'Pembukaan',
  pembukaanData,
  babList,
  activeSectionId,
  onNavigateToStruktur,
  onNavigateToPasal,
  onNavigateToPembukaan,
  onNavigateToSection,
  onSearchChange,
  hideHeader = false,
  className = '',
}: ReadonlyTableOfContentsProps) {
  const [viewMode, setViewMode] = useState<'struktur' | 'relasi'>('struktur');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBabs, setExpandedBabs] = useState<Record<string, boolean>>({ pembukaan: true });
  const [expandedRelasiGroups, setExpandedRelasiGroups] = useState<Record<string, boolean>>({});

  const toggleLocalBab = (id: string) => {
    setExpandedBabs(prev => ({ ...prev, [id]: !(prev[id] ?? false) }));
  };

  const toggleRelasiGroup = (stdId: string) => {
    setExpandedRelasiGroups(prev => ({ ...prev, [stdId]: !(prev[stdId] ?? false) }));
  };

  // Grouping Peraturan Target & Pemetaan Lokasi Pasal Pengubah
  const targetPeraturanGrouped = useMemo(() => {
    const groups = new Map<string, {
      standardId: string;
      labelSingkat: string;
      namaLengkap?: string;
      locations: Array<{
        containerPasalId: string;
        containerPasalNomor: string;
        subPasals: ArticleItem[];
      }>;
    }>();

    const collectFromPasals = (pasals: ArticleItem[]) => {
      pasals.forEach((p) => {
        if (p.targetInduk && p.targetInduk.standardId) {
          const stdId = p.targetInduk.standardId;
          if (!groups.has(stdId)) {
            groups.set(stdId, {
              standardId: stdId,
              labelSingkat: p.targetInduk.labelSingkat || stdId,
              namaLengkap: p.targetInduk.namaLengkap,
              locations: [],
            });
          }
          const group = groups.get(stdId)!;
          group.locations.push({
            containerPasalId: p.id,
            containerPasalNomor: p.nomor,
            subPasals: p.pasalList || [],
          });
        }

        if (p.pasalList && p.pasalList.length > 0) {
          collectFromPasals(p.pasalList);
        }
      });
    };

    const collectFromChapters = (chapters: ChapterItem[]) => {
      chapters.forEach((ch) => {
        collectFromPasals(ch.pasalList || []);
        if (ch.children && ch.children.length > 0) {
          collectFromChapters(ch.children);
        }
      });
    };

    collectFromChapters(babList);
    return Array.from(groups.values());
  }, [babList]);

  // Search filtering for Struktur
  const filteredBabList = useMemo(() => {
    const unpenjelasan = babList.filter((bab) => !bab.judul.toUpperCase().includes('PENJELASAN'));
    if (!searchQuery.trim()) return unpenjelasan;
    return filterChapterTree(unpenjelasan, searchQuery).filtered;
  }, [babList, searchQuery]);

  // Search filtering for Pembukaan
  const isPembukaanMatch = useMemo(() => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    if (pembukaanJudul.toLowerCase().includes(q)) return true;
    if (!pembukaanData) return false;
    return (
      Boolean(pembukaanData.menimbang && pembukaanData.menimbang.toLowerCase().includes(q)) ||
      Boolean(pembukaanData.mengingat && pembukaanData.mengingat.toLowerCase().includes(q)) ||
      Boolean(pembukaanData.memutuskan && pembukaanData.memutuskan.toLowerCase().includes(q)) ||
      Boolean(pembukaanData.menetapkan && pembukaanData.menetapkan.toLowerCase().includes(q))
    );
  }, [searchQuery, pembukaanJudul, pembukaanData]);

  // Search filtering for Relasi
  const filteredRelasiGroups = useMemo(() => {
    if (!searchQuery.trim()) return targetPeraturanGrouped;
    const q = searchQuery.toLowerCase().trim();

    return targetPeraturanGrouped.filter((group) => {
      const titleMatch =
        group.labelSingkat.toLowerCase().includes(q) ||
        Boolean(group.namaLengkap && group.namaLengkap.toLowerCase().includes(q)) ||
        group.standardId.toLowerCase().includes(q);

      const locationMatch = group.locations.some(
        (loc) =>
          loc.containerPasalNomor.toLowerCase().includes(q) ||
          loc.subPasals.some(
            (sub) => sub.nomor.toLowerCase().includes(q) || sub.isi.toLowerCase().includes(q)
          )
      );

      return titleMatch || locationMatch;
    });
  }, [targetPeraturanGrouped, searchQuery]);

  return (
    <div className={`w-full lg:w-[290px] xl:w-[320px] shrink-0 bg-white rounded-[20px] border border-neu-200 p-4 xl:p-5 lg:h-[calc(100vh-160px)] flex flex-col ${className}`}>
      {!hideHeader && (
        <div className="pb-3 mb-3 border-b border-neu-100 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Menu className="w-5 h-5 text-neu-700" />
              <h3 className="font-sans text-[14px] font-bold text-neu-900 tracking-wide">
                DAFTAR ISI
              </h3>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neu-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (onSearchChange) onSearchChange(val);
              }}
              placeholder="Cari pasal, bab, atau relasi..."
              className="w-full pl-8 pr-7 py-1.5 bg-neu-50 hover:bg-neu-100/70 focus:bg-white text-neu-900 border border-neu-200 focus:border-pr-900 rounded-lg text-[11px] placeholder:text-neu-400 transition-all outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  if (onSearchChange) onSearchChange('');
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neu-400 hover:text-neu-700 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filter Toggle Switch: Struktur vs Relasi & Perubahan */}
          {targetPeraturanGrouped.length > 0 && (
            <div className="flex p-0.5 bg-neu-100/70 rounded-lg text-[10px] font-medium">
              <button
                type="button"
                onClick={() => setViewMode('struktur')}
                className={`flex-1 py-1 px-1.5 rounded-md flex items-center justify-center gap-1 transition-all ${
                  viewMode === 'struktur'
                    ? 'bg-white text-neu-900 font-bold shadow-2xs'
                    : 'text-neu-600 hover:text-neu-900'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Struktur</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('relasi')}
                className={`flex-1 py-1 px-1.5 rounded-md flex items-center justify-center gap-1 transition-all ${
                  viewMode === 'relasi'
                    ? 'bg-pr-900 text-white font-bold shadow-2xs'
                    : 'text-neu-600 hover:text-pr-900'
                }`}
              >
                <Link2 className="w-3 h-3" />
                <span>Relasi ({targetPeraturanGrouped.length})</span>
              </button>
            </div>
          )}
        </div>
      )}

      <nav className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {/* Navigasi Pembukaan */}
        {viewMode === 'struktur' && isPembukaanMatch && (
          <div className="space-y-1">
            <div className="flex items-center justify-between group">
              <button
                type="button"
                onClick={() => {
                  if (pembukaanData) toggleLocalBab('pembukaan');
                }}
                className="flex-1 min-w-0 text-left p-2.5 rounded-[10px] bg-[#E8EEF5] text-pr-900 font-bold text-[14px] leading-tight flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="truncate">{pembukaanJudul}</span>
                {pembukaanData && (
                  <ChevronRight className={`w-4 h-4 text-pr-900 shrink-0 ml-2 transition-transform ${expandedBabs['pembukaan'] ? 'rotate-90' : ''}`} />
                )}
              </button>

              {onNavigateToPembukaan && (
                <button
                  type="button"
                  title="Lompat ke Pembukaan"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToPembukaan();
                  }}
                  className="p-1.5 text-neu-400 hover:text-pr-900 hover:bg-neu-100 rounded cursor-pointer transition-colors ml-1 shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {pembukaanData && expandedBabs['pembukaan'] && (
              <div className="pl-3 py-1 space-y-1.5 border-l-2 border-pr-900 ml-2">
                {!!pembukaanData.menimbang && (
                  <button
                    type="button"
                    onClick={() => { if (onNavigateToSection) onNavigateToSection('section-menimbang'); }}
                    className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                  >
                    Menimbang
                  </button>
                )}
                {!!pembukaanData.mengingat && (
                  <button
                    type="button"
                    onClick={() => { if (onNavigateToSection) onNavigateToSection('section-mengingat'); }}
                    className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                  >
                    Mengingat
                  </button>
                )}
                {!!pembukaanData.memutuskan && (
                  <button
                    type="button"
                    onClick={() => { if (onNavigateToSection) onNavigateToSection('section-memutuskan'); }}
                    className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                  >
                    Memutuskan
                  </button>
                )}
                {!!pembukaanData.menetapkan && (
                  <button
                    type="button"
                    onClick={() => { if (onNavigateToSection) onNavigateToSection('section-menetapkan'); }}
                    className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                  >
                    Menetapkan
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* View Mode 1: Tree Hirarki Dokumen */}
        {viewMode === 'struktur' && filteredBabList.length > 0 && (
          filteredBabList.map((bab) => (
            <TocNode 
              key={bab.id}
              item={bab}
              expandedBabs={expandedBabs}
              toggleLocalBab={toggleLocalBab}
              onNavigateToStruktur={onNavigateToStruktur}
              onNavigateToPasal={onNavigateToPasal}
              searchQuery={searchQuery}
              depth={0}
            />
          ))
        )}

        {/* Empty state for Struktur search */}
        {viewMode === 'struktur' && searchQuery.trim() !== '' && filteredBabList.length === 0 && !isPembukaanMatch && (
          <div className="py-6 text-center space-y-1">
            <p className="text-[12px] font-medium text-neu-500">Tidak ada hasil ditemukan</p>
            <p className="text-[10px] text-neu-400">Kata kunci: &quot;{searchQuery}&quot;</p>
          </div>
        )}

        {/* View Mode 2: Peta Relasi & Detail Letak Perubahan (Expandable Dropdown) */}
        {viewMode === 'relasi' && (
          <div className="space-y-3 pt-1">
            <p className="text-[11px] font-medium text-neu-500 px-1">
              Daftar Peraturan yang Diintervensi / Diubah:
            </p>
            {filteredRelasiGroups.map((group) => {
              const isRelasiExpanded = searchQuery.trim() !== '' ? true : (expandedRelasiGroups[group.standardId] ?? false);

              return (
                <div
                  key={group.standardId}
                  className="rounded-xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-2xs"
                >
                  {/* Dropdown Header Card UU Target */}
                  <button
                    type="button"
                    onClick={() => toggleRelasiGroup(group.standardId)}
                    className="w-full p-3 text-left flex items-start gap-2 hover:bg-slate-100/60 transition-colors cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-[11px] font-bold text-slate-900 leading-snug">
                          {group.namaLengkap || group.labelSingkat}
                        </h4>
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${
                            isRelasiExpanded ? 'rotate-90 text-slate-700' : ''
                          }`}
                        />
                      </div>
                      <span className="inline-block text-[9px] font-semibold text-slate-500 bg-slate-200/70 px-1.5 py-0.2 rounded">
                        {group.locations.length} Lokasi Perubahan
                      </span>
                    </div>
                  </button>

                  {/* List Lokasi Pasal Pengubah (Dropdown Body) */}
                  {isRelasiExpanded && (
                    <div className="px-3 pb-3 pt-1 space-y-2 border-t border-slate-200/60 bg-white/60">
                      {group.locations.map((loc) => (
                        <div
                          key={loc.containerPasalId}
                          className="p-2 rounded-lg bg-white border border-slate-200/80 space-y-1 hover:border-pr-300 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11px] font-bold text-pr-900 flex items-center gap-1">
                              <span>📍 Lokasi:</span>
                              <span className="underline decoration-pr-300">{loc.containerPasalNomor}</span>
                            </span>

                            {onNavigateToPasal && (
                              <button
                                type="button"
                                title={`Lompat ke ${loc.containerPasalNomor}`}
                                onClick={() => onNavigateToPasal(loc.containerPasalId)}
                                className="p-1 text-pr-700 hover:text-pr-950 hover:bg-slate-100 rounded cursor-pointer transition-colors flex items-center gap-0.5 text-[10px] font-medium"
                              >
                                <span>Lompat</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Sub-pasals affected */}
                          {loc.subPasals.length > 0 && (
                            <div className="pl-2 pt-1 space-y-1 border-l-2 border-amber-300/80">
                              {loc.subPasals.map((sub) => {
                                const actionInfo = detectActionType(sub.isi);
                                return (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => {
                                      if (onNavigateToPasal) onNavigateToPasal(sub.id);
                                    }}
                                    className="w-full text-left text-[10px] text-slate-700 font-medium hover:text-black flex items-center justify-between gap-1 truncate cursor-pointer"
                                  >
                                    <span className="truncate">• {sub.nomor}</span>
                                    <span className={`text-[8px] px-1 py-0.2 rounded font-semibold shrink-0 ${actionInfo.badgeColor}`}>
                                      {actionInfo.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {searchQuery.trim() !== '' && filteredRelasiGroups.length === 0 && (
              <div className="py-6 text-center space-y-1">
                <p className="text-[12px] font-medium text-neu-500">Tidak ada relasi ditemukan</p>
                <p className="text-[10px] text-neu-400">Kata kunci: &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}




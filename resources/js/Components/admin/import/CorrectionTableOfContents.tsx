import React, { useState, useMemo } from 'react';
import { Menu, ChevronRight, Layers, Link2, Zap, ArrowUpRight, Search, X } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from './correctionParser';

interface CorrectionTableOfContentsProps {
  pembukaanJudul?: string;
  babList: ChapterItem[];
  activeSection?: string;
  onPasalClick?: (babId: string, pasalId: string) => void;
  onPembukaanClick?: () => void;
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

export function CorrectionTableOfContents({
  pembukaanJudul = 'Pembukaan',
  babList,
  activeSection = '',
  onPasalClick,
  onPembukaanClick,
}: CorrectionTableOfContentsProps) {
  const [viewMode, setViewMode] = useState<'struktur' | 'relasi'>('struktur');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const handleToggle = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !(prev[nodeId] ?? false),
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    const container = document.getElementById('editor-scroll-container');
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scrollTop = container.scrollTop + (elRect.top - containerRect.top) - 20;

      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    const validBabs = babList.filter((bab) => bab.judul && bab.judul.trim() !== '' && bab.judul.trim() !== '-');
    if (!searchQuery.trim()) return validBabs;
    return filterChapterTree(validBabs, searchQuery).filtered;
  }, [babList, searchQuery]);

  // Search filtering for Pembukaan
  const isPembukaanMatch = useMemo(() => {
    if (!searchQuery.trim()) return true;
    return pembukaanJudul.toLowerCase().includes(searchQuery.toLowerCase().trim());
  }, [searchQuery, pembukaanJudul]);

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

  // Component untuk merender 1 node Pasal (hanya pasal utama)
  const renderPasalNode = (pasal: ArticleItem, babId: string, depth = 0) => {
    const isPasalActive = activeSection === `section-${pasal.id}`;

    return (
      <div key={pasal.id} className="flex items-center justify-between group rounded-lg hover:bg-neu-50/80 p-0.5 transition-colors">
        <button
          type="button"
          onClick={() => {
            if (onPasalClick) onPasalClick(babId, pasal.id);
            scrollToSection(`section-${pasal.id}`);
          }}
          className={`flex-1 min-w-0 text-left py-1 px-1 text-[12px] transition-colors cursor-pointer flex items-center justify-between gap-1.5 ${
            isPasalActive ? 'text-black font-bold' : 'font-medium text-neu-700 hover:text-pr-900'
          }`}
        >
          <span className="truncate flex items-center gap-1.5">
            {isPasalActive && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
            <span className="truncate font-semibold">{pasal.nomor}</span>
          </span>
        </button>

        {/* Tombol khusus untuk Lompat ke Pasal */}
        <button
          type="button"
          title={`Lompat ke ${pasal.nomor}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onPasalClick) onPasalClick(babId, pasal.id);
            scrollToSection(`section-${pasal.id}`);
          }}
          className="p-1 text-neu-400 hover:text-pr-900 hover:bg-white rounded cursor-pointer transition-all ml-1 shrink-0"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  // Component rekursif untuk merender node Bab, Bagian, atau Paragraf
  const renderChapterNode = (node: ChapterItem, depth = 0) => {
    const isSearching = Boolean(searchQuery.trim());
    const isExpanded = isSearching ? true : (expandedNodes[node.id] ?? false);
    const hasSubNodes =
      (node.children && node.children.length > 0) || (node.pasalList && node.pasalList.length > 0);

    let displayJudul = node.judul;
    if (depth === 0) {
      const match = displayJudul.match(/^(BAB\s+[IVXLCDM\d]+)/i);
      if (match) displayJudul = match[1];
    }

    const isBab = node.tipe === 'BAB' || depth === 0;

    return (
      <div key={node.id} className="space-y-1.5">
        <div className="flex items-center justify-between gap-1 group">
          {/* Klik area judul: HANYA toggle dropdown tanpa scroll jump */}
          <button
            type="button"
            onClick={() => handleToggle(node.id)}
            className={`flex-1 min-w-0 text-left p-2 rounded-[8px] transition-colors flex items-center justify-between cursor-pointer ${
              isBab
                ? 'bg-[#E8EEF5] text-pr-900 font-bold text-[12px] leading-tight'
                : depth === 1
                ? 'bg-neu-50/80 text-neu-800 font-semibold text-[11px]'
                : 'bg-white text-neu-700 font-medium text-[11px] border border-neu-100'
            }`}
          >
            <span className="line-clamp-2 truncate pr-1">{displayJudul}</span>
            {hasSubNodes && (
              <ChevronRight
                className={`w-3.5 h-3.5 text-neu-500 shrink-0 transition-transform ${
                  isExpanded ? 'rotate-90 text-pr-900' : ''
                }`}
              />
            )}
          </button>

          {/* Tombol khusus untuk Lompat ke Struktur ini */}
          <button
            type="button"
            title={`Lompat ke ${node.judul}`}
            onClick={(e) => {
              e.stopPropagation();
              scrollToSection(`section-${node.id}`);
            }}
            className="p-1.5 text-neu-400 hover:text-pr-900 hover:bg-neu-100 rounded cursor-pointer transition-colors shrink-0"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {hasSubNodes && isExpanded && (
          <div className="pl-2.5 py-1 space-y-1 border-l-2 border-pr-900/30 ml-2">
            {/* Child Structural Nodes (Bagian / Paragraf) */}
            {node.children &&
              node.children.map((child) => renderChapterNode(child, depth + 1))}

            {/* Pasal List (Hanya Pasal Utama) */}
            {node.pasalList &&
              node.pasalList
                .filter((p) => p.nomor && p.nomor.trim() !== '-' && p.nomor.trim() !== '')
                .map((pasal) => renderPasalNode(pasal, node.id, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full lg:w-[290px] xl:w-[320px] shrink-0 bg-white rounded-[20px] border border-neu-100 p-4 xl:p-5 shadow-2xs h-[calc(100vh-140px)] min-h-[500px] overflow-y-auto custom-scrollbar flex flex-col">
      {/* Header & Tab Mode */}
      <div className="pb-3 mb-3 border-b border-neu-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Menu className="w-4 h-4 text-neu-700" />
            <h3 className="font-sans text-[12px] font-bold text-neu-900 tracking-wide">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pasal, bab, atau relasi..."
            className="w-full pl-8 pr-7 py-1.5 bg-neu-50 hover:bg-neu-100/70 focus:bg-white text-neu-900 border border-neu-200 focus:border-pr-900 rounded-lg text-[11px] placeholder:text-neu-400 transition-all outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
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

      <nav className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-0.5">
        {/* Navigasi Pembukaan */}
        {viewMode === 'struktur' && isPembukaanMatch && (
          <div className="flex items-center justify-between group py-1">
            <button
              type="button"
              onClick={() => {
                if (onPembukaanClick) onPembukaanClick();
                scrollToSection('section-pembukaan');
              }}
              className={`flex-1 min-w-0 text-left text-[12px] font-medium transition-colors flex items-center justify-between cursor-pointer font-sans ${
                activeSection === 'section-pembukaan' ? 'text-black font-bold' : 'text-pr-900 hover:text-pr-800'
              }`}
            >
              <span className="truncate flex items-center gap-2">
                {activeSection === 'section-pembukaan' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                )}
                <span>{pembukaanJudul}</span>
              </span>
            </button>

            <button
              type="button"
              title="Lompat ke Pembukaan"
              onClick={() => {
                if (onPembukaanClick) onPembukaanClick();
                scrollToSection('section-pembukaan');
              }}
              className="p-1 text-neu-400 hover:text-pr-900 hover:bg-neu-100 rounded cursor-pointer transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* View Mode 1: Tree Hirarki Berperangkat */}
        {viewMode === 'struktur' && filteredBabList.length > 0 &&
          filteredBabList.map((bab) => renderChapterNode(bab, 0))}

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
              const isRelasiExpanded = searchQuery.trim() !== '' ? true : (expandedNodes[`relasi-${group.standardId}`] ?? false);

              return (
                <div
                  key={group.standardId}
                  className="rounded-xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-2xs"
                >
                  {/* Dropdown Header Card UU Target */}
                  <button
                    type="button"
                    onClick={() => handleToggle(`relasi-${group.standardId}`)}
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

                            <button
                              type="button"
                              title={`Lompat ke ${loc.containerPasalNomor}`}
                              onClick={() => {
                                if (onPasalClick) onPasalClick('', loc.containerPasalId);
                                scrollToSection(`section-${loc.containerPasalId}`);
                              }}
                              className="p-1 text-pr-700 hover:text-pr-950 hover:bg-slate-100 rounded cursor-pointer transition-colors flex items-center gap-0.5 text-[10px] font-medium"
                            >
                              <span>Lompat</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
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
                                      if (onPasalClick) onPasalClick('', sub.id);
                                      scrollToSection(`section-${sub.id}`);
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




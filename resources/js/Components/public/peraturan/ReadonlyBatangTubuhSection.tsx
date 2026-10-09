import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Info, Zap, ArrowUp, X } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from '../../admin/import/correctionParser';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';

interface ReadonlyBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  searchQuery?: string;
}

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

export function highlightText(text: string, query?: string): React.ReactNode {
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

function PasalNode({
  pasal,
  babId,
  onTogglePasal,
  searchQuery = '',
}: {
  pasal: ArticleItem;
  babId: string;
  onTogglePasal: (babId: string, pasalId: string) => void;
  searchQuery?: string;
}) {
  const [isPenjelasanExpanded, setIsPenjelasanExpanded] = useState(false);
  const [activeSubPasalId, setActiveSubPasalId] = useState<string | null>(null);

  const rincianGridRef = useRef<HTMLDivElement>(null);
  const activeSubPasalRef = useRef<HTMLDivElement>(null);

  const containerAction = detectActionType(pasal.isi);
  const activeSubPasal = pasal.pasalList?.find(p => p.id === activeSubPasalId);

  const handleSubPasalClick = (subPId: string) => {
    if (activeSubPasalId === subPId) {
      // Toggle off / close
      setActiveSubPasalId(null);
      setTimeout(() => scrollToElementRef(rincianGridRef.current), 50);
    } else {
      // Open new sub-pasal & scroll to detail
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
    <div
      id={`section-${pasal.id}`}
      className="space-y-3"
    >
      {/* 1. Header Nomor Pasal & Kontrol Penjelasan */}
      <div 
        onClick={() => onTogglePasal(babId, pasal.id)}
        className="flex items-center justify-between flex-wrap gap-2 cursor-pointer select-none p-1.5 -mx-1.5 rounded-lg hover:bg-neu-50/70 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="inline-flex items-center px-3 py-1 rounded-[6px] bg-pr-900 text-white text-[11px] font-semibold shrink-0">
            {pasal.nomor}
          </span>
          {!pasal.isExpanded && (
            <span className="text-[11.5px] text-neu-500 font-normal truncate max-w-[280px] sm:max-w-[500px]">
              {cleanOcrText(pasal.isi).substring(0, 90)}...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">

          {pasal.penjelasan && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPenjelasanExpanded(!isPenjelasanExpanded);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                isPenjelasanExpanded 
                  ? 'bg-pr-50 text-pr-900 border border-pr-200' 
                  : 'bg-white text-neu-500 border border-neu-200 hover:bg-neu-50'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              {isPenjelasanExpanded ? 'Tutup Penjelasan' : 'Lihat Penjelasan'}
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePasal(babId, pasal.id);
            }}
            className="p-1 text-neu-500 hover:text-pr-900 rounded cursor-pointer"
          >
            {pasal.isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {pasal.isExpanded && (
        <div className="space-y-3">
          {/* 2. Banner Atas: Ketentuan Perubahan Peraturan */}
          {pasal.targetInduk && (
            <div className="p-3.5 bg-gradient-to-r from-sec-50 to-sec-100/40 border-l-4 border-sec-900 rounded-xl shadow-2xs flex items-center justify-between flex-wrap gap-2.5 border border-sec-200">
              <div className="flex items-center gap-2 text-neu-900 font-bold text-[12px]">
                <Zap className="w-4 h-4 text-sec-900 shrink-0" />
                <span>Ketentuan Perubahan Peraturan</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-[12px]">
                <span className="text-neu-900 font-medium">
                  Mengubah Peraturan Induk: <span className="font-extrabold text-pr-900">{pasal.targetInduk.namaLengkap || pasal.targetInduk.labelSingkat}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border shadow-2xs ${containerAction.badgeColor}`}>
                  Sifat Intervensi: {containerAction.label}
                </span>
              </div>
            </div>
          )}

          {/* 3. Teks Utama Norma Pasal */}
          <div className="w-full p-3.5 rounded-[8px] bg-neu-50/30 border-l-4 border-l-sec-900 border border-neu-100 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify">
            {highlightText(pasal.isi, searchQuery)}
          </div>

          {/* 4. Penjelasan Pasal (Jika ada & di-expand) */}
          {isPenjelasanExpanded && pasal.penjelasan && (
            <div className="w-full mt-2 p-3.5 rounded-[8px] bg-pr-50/50 border-l-4 border-l-pr-900 border border-pr-100 text-[12px] text-pr-900 leading-relaxed whitespace-pre-line text-justify">
              <span className="font-semibold text-[14px] block mb-1">Penjelasan {pasal.nomor}:</span>
              {highlightText(pasal.penjelasan, searchQuery)}
            </div>
          )}

          {/* 5. Kotak Kuning Bawah: Rincian Pasal Target yang Diintervensi */}
          {pasal.targetInduk && pasal.pasalList && pasal.pasalList.length > 0 && (
            <div
              ref={rincianGridRef}
              className="p-4 bg-gradient-to-r from-sec-50/90 to-sec-100/50 border-2 border-sec-200 rounded-xl shadow-2xs space-y-2.5 scroll-mt-28"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 text-neu-900 font-bold text-[12px]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-sec-900 shrink-0" />
                  <span>Rincian Pasal Target yang Diintervensi:</span>
                </div>
                <span className="text-[11px] font-normal text-neu-800 bg-sec-100 px-2 py-0.5 rounded-md">
                  Klik tombol pasal untuk membaca teks perubahan
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {pasal.pasalList.map((subP) => {
                  const subAction = detectActionType(subP.isi);
                  const isActive = activeSubPasalId === subP.id;

                  return (
                    <button
                      key={subP.id}
                      type="button"
                      onClick={() => handleSubPasalClick(subP.id)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-pr-900 text-white border-pr-900 shadow-sm ring-2 ring-pr-300'
                          : 'bg-white hover:bg-sec-50 text-neu-800 border-sec-200 hover:border-sec-300'
                      }`}
                    >
                      <span className="truncate pr-1">{subP.nomor}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 border ${
                        isActive ? 'bg-pr-700 text-white border-pr-600' : subAction.badgeColor
                      }`}>
                        {subAction.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6. Area Sub-Pasal Aktif yang Dipilih (Default Kosong, Muncul Saat Tombol Klik) */}
          {activeSubPasal && (
            <div
              ref={activeSubPasalRef}
              className="mt-3 pl-4 border-l-4 border-sec-900 bg-sec-50/40 p-4 rounded-xl space-y-3 border border-sec-200 animate-in fade-in duration-200 scroll-mt-28 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 border-b border-sec-200/80 pb-2 flex-wrap">
                <span className="font-bold text-[12.5px] text-neu-900 bg-sec-100 px-2.5 py-0.5 rounded-md">
                  Rincian Teks: {activeSubPasal.nomor} {pasal.targetInduk ? `(${pasal.targetInduk.labelSingkat || pasal.targetInduk.standardId})` : ''}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleScrollBackToGrid}
                    title="Kembali ke atas daftar tombol pasal"
                    className="flex items-center gap-1 text-[11px] bg-sec-100 hover:bg-sec-200 text-neu-900 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Ke Pusat Pasal</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseSubPasal}
                    className="flex items-center gap-1 text-[11px] bg-white hover:bg-sec-50 text-neu-900 border border-sec-300 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer shadow-2xs"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Tutup Rincian</span>
                  </button>
                </div>
              </div>

              <div className="text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify bg-white/95 p-4 rounded-lg border border-sec-200 shadow-2xs">
                {highlightText(activeSubPasal.isi, searchQuery)}
              </div>

              {activeSubPasal.penjelasan && (
                <div className="text-[12px] text-pr-900 leading-relaxed whitespace-pre-line text-justify bg-pr-50/60 p-3.5 rounded-lg border border-pr-200">
                  <span className="font-semibold block mb-1">Penjelasan {activeSubPasal.nomor}:</span>
                  {highlightText(activeSubPasal.penjelasan, searchQuery)}
                </div>
              )}

              {/* Footer Control bar for long sub-pasals */}
              <div className="flex items-center justify-between pt-2 border-t border-sec-200 text-[11px] flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleScrollBackToGrid}
                  className="flex items-center gap-1.5 text-neu-900 hover:text-pr-900 font-semibold cursor-pointer py-1 px-3 rounded-md bg-sec-100 hover:bg-sec-200 transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Kembali ke Pusat Daftar Pasal Target</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseSubPasal}
                  className="text-sec-900 hover:text-sec-800 font-semibold underline cursor-pointer"
                >
                  Tutup Rincian & Kembali
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BatangTubuhNode({ 
  item, 
  onToggleBab, 
  onTogglePasal, 
  depth = 0,
  searchQuery = '',
}: { 
  item: ChapterItem; 
  onToggleBab: (id: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  depth?: number;
  searchQuery?: string;
}) {
  const isRoot = depth === 0;

  return (
    <div
      id={`struktur-${item.id}`}
      className={isRoot 
        ? "bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs space-y-4"
        : "bg-white rounded-[12px] border border-neu-100 p-4 shadow-sm space-y-3 mt-4 ml-4"
      }
    >
      <button
        type="button"
        onClick={() => onToggleBab(item.id)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {isRoot && <span className="w-2 h-2 rounded-full bg-pr-700 shrink-0" />}
          <span className={`font-bold tracking-wide uppercase ${isRoot ? 'text-[14px] text-pr-900' : 'text-[12px] text-neu-700'}`}>
            {item.judul}
          </span>
        </div>
        {item.isExpanded ? (
          <ChevronUp className="w-4 h-4 text-neu-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neu-400" />
        )}
      </button>

      {item.isExpanded && (
        <div className="space-y-4 pt-1">
          {item.deskripsi && (
            <div className="w-full p-3 rounded-[8px] bg-neu-50/40 border border-neu-100 text-[12px] text-neu-700 leading-relaxed whitespace-pre-line text-justify">
              {highlightText(item.deskripsi, searchQuery)}
            </div>
          )}

          {/* Render sub-struktur jika ada */}
          {item.children && item.children.length > 0 && (
            <div className="space-y-3">
              {item.children.map((child) => (
                <BatangTubuhNode
                  key={child.id}
                  item={child}
                  onToggleBab={onToggleBab}
                  onTogglePasal={onTogglePasal}
                  depth={depth + 1}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          )}

          {/* Pasal-Pasal di dalam struktur ini */}
          {item.pasalList && item.pasalList.length > 0 && (
            <div className="space-y-4 pt-2">
              {item.pasalList.map((pasal) => (
                <PasalNode 
                  key={pasal.id}
                  pasal={pasal}
                  babId={item.id}
                  onTogglePasal={onTogglePasal}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ReadonlyBatangTubuhSection({
  babList,
  onToggleBab,
  onTogglePasal,
  searchQuery = '',
}: ReadonlyBatangTubuhSectionProps) {
  if (babList.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {babList.map((bab) => (
        <BatangTubuhNode 
          key={bab.id} 
          item={bab} 
          onToggleBab={onToggleBab} 
          onTogglePasal={onTogglePasal}
          depth={0} 
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

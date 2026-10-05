import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Zap } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from '../../admin/import/correctionParser';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';

interface ReadonlyBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
}

function PasalNode({
  pasal,
  babId,
  onTogglePasal
}: {
  pasal: ArticleItem;
  babId: string;
  onTogglePasal: (babId: string, pasalId: string) => void;
}) {
  const [isPenjelasanExpanded, setIsPenjelasanExpanded] = useState(false);
  const [activeSubPasalId, setActiveSubPasalId] = useState<string | null>(null);

  const containerAction = detectActionType(pasal.isi);
  const activeSubPasal = pasal.pasalList?.find(p => p.id === activeSubPasalId);

  return (
    <div
      id={`section-${pasal.id}`}
      className="space-y-3"
    >
      {/* 1. Header Nomor Pasal & Kontrol Penjelasan */}
      <div 
        onClick={() => onTogglePasal(babId, pasal.id)}
        className="flex items-center justify-between flex-wrap gap-2 cursor-pointer select-none p-1.5 -mx-1.5 rounded-lg hover:bg-slate-100/70 transition-colors"
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
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
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
            className="p-1 text-neu-500 hover:text-black rounded cursor-pointer"
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
            <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100/40 border-l-4 border-amber-500 rounded-xl shadow-2xs flex items-center justify-between flex-wrap gap-2 border border-amber-200/60">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-[12px]">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Ketentuan Perubahan Peraturan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-amber-950 font-medium">
                  Mengubah: <span className="font-extrabold text-slate-900">{pasal.targetInduk.namaLengkap || pasal.targetInduk.labelSingkat}</span>
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${containerAction.badgeColor}`}>
                  {containerAction.label}
                </span>
              </div>
            </div>
          )}

          {/* 3. Teks Utama Norma Pasal */}
          <div className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify">
            {cleanOcrText(pasal.isi)}
          </div>

          {/* 4. Penjelasan Pasal (Jika ada & di-expand) */}
          {isPenjelasanExpanded && pasal.penjelasan && (
            <div className="w-full mt-2 p-3.5 rounded-[8px] bg-blue-50/50 border-l-4 border-l-blue-500 border border-blue-100 text-[12px] text-blue-900 leading-relaxed whitespace-pre-line text-justify">
              <span className="font-semibold text-[14px] block mb-1">Penjelasan {pasal.nomor}:</span>
              {cleanOcrText(pasal.penjelasan)}
            </div>
          )}

          {/* 5. Kotak Kuning Bawah: Rincian Pasal Target yang Diintervensi */}
          {pasal.targetInduk && pasal.pasalList && pasal.pasalList.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-amber-50/90 to-amber-100/50 border-2 border-amber-300 rounded-xl shadow-2xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-amber-950 font-bold text-[12px]">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Rincian Pasal Target yang Diintervensi:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {pasal.pasalList.map((subP) => {
                  const subAction = detectActionType(subP.isi);
                  const isActive = activeSubPasalId === subP.id;

                  return (
                    <button
                      key={subP.id}
                      type="button"
                      onClick={() => setActiveSubPasalId(isActive ? null : subP.id)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-400'
                          : 'bg-white hover:bg-amber-100/80 text-slate-800 border-amber-200/90 hover:border-amber-400'
                      }`}
                    >
                      <span className="truncate pr-1">{subP.nomor}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 border ${
                        isActive ? 'bg-amber-700 text-white border-amber-600' : subAction.badgeColor
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
            <div className="mt-3 pl-4 border-l-4 border-amber-500 bg-amber-50/30 p-4 rounded-xl space-y-2 border border-amber-200/80 animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-2 border-b border-amber-200/80 pb-2">
                <span className="font-bold text-[13px] text-amber-950 bg-amber-200/80 px-2.5 py-0.5 rounded-md">
                  Rincian Teks: {activeSubPasal.nomor}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSubPasalId(null)}
                  className="text-[11px] text-amber-800 hover:text-amber-950 font-semibold underline cursor-pointer"
                >
                  Tutup Rincian
                </button>
              </div>

              <div className="text-[12px] text-slate-800 leading-relaxed whitespace-pre-line text-justify bg-white/95 p-3.5 rounded-lg border border-amber-200/60 shadow-2xs">
                {cleanOcrText(activeSubPasal.isi)}
              </div>

              {activeSubPasal.penjelasan && (
                <div className="text-[12px] text-blue-900 leading-relaxed whitespace-pre-line text-justify bg-blue-50/60 p-3.5 rounded-lg border border-blue-200/60 mt-2">
                  <span className="font-semibold block mb-1">Penjelasan {activeSubPasal.nomor}:</span>
                  {cleanOcrText(activeSubPasal.penjelasan)}
                </div>
              )}
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
  depth = 0 
}: { 
  item: ChapterItem; 
  onToggleBab: (id: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  depth?: number;
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
        <span className={`font-bold tracking-wide uppercase ${isRoot ? 'text-[14px] text-pr-900' : 'text-[12px] text-neu-700'}`}>
          {item.judul}
        </span>
        {item.isExpanded ? (
          <ChevronUp className="w-4 h-4 text-neu-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neu-400" />
        )}
      </button>

      {item.isExpanded && (
        <div className="space-y-4 pt-1">
          {item.deskripsi && (
            <div className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-700 leading-relaxed whitespace-pre-line text-justify">
              {item.deskripsi}
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
        />
      ))}
    </div>
  );
}

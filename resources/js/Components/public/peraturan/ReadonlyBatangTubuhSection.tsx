import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, PencilLine } from 'lucide-react';
import { ChapterItem, ArticleItem, detectActionType } from '../../admin/import/correctionParser';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';
import { KetentuanPerubahanBanner, RincianPasalTargetGrid } from './KetentuanPerubahanCards';

interface ReadonlyBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  searchQuery?: string;
  activeSectionId?: string;
  onKoreksi?: (isi: string, label: string, id: string, type: 'bab' | 'pasal') => void;
}

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
  activeSectionId,
  onKoreksi,
}: {
  pasal: ArticleItem;
  babId: string;
  onTogglePasal: (babId: string, pasalId: string) => void;
  searchQuery?: string;
  activeSectionId?: string;
  onKoreksi?: (isi: string, label: string, id: string) => void;
}) {
  const [isPenjelasanExpanded, setIsPenjelasanExpanded] = useState(false);
  const containerAction = detectActionType(pasal.isi);

  return (
    <div
      id={`section-${pasal.id}`}
      className="space-y-3"
    >
      {/* 1. Header Nomor Pasal & Kontrol Penjelasan */}
      <div 
        onClick={() => onTogglePasal(babId, pasal.id)}
        className="flex items-center justify-between flex-wrap gap-2 cursor-pointer select-none p-1.5 -mx-1.5 rounded-lg transition-colors"
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

          {onKoreksi && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onKoreksi(pasal.isi, pasal.nomor, pasal.id);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neu-50 bg-white text-[12px] font-normal text-neu-900 transition-colors cursor-pointer"
              title="Koreksi teks pasal ini"
            >
              <PencilLine className="w-3.5 h-3.5 text-neu-900" />
              Koreksi
            </button>
          )}

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
            <KetentuanPerubahanBanner
              targetInduk={pasal.targetInduk}
              containerAction={containerAction}
            />
          )}

          {/* 3. Teks Utama Norma Pasal */}
          <div className="w-full p-3.5 rounded-[8px] bg-bg-900 border-l-4 border-l-sec-900 border border-neu-50  text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify">
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
            <RincianPasalTargetGrid
              targetInduk={pasal.targetInduk}
              pasalList={pasal.pasalList}
              searchQuery={searchQuery}
              activeSectionId={activeSectionId}
            />
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
  activeSectionId,
  onKoreksi,
}: { 
  item: ChapterItem; 
  onToggleBab: (id: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  depth?: number;
  searchQuery?: string;
  activeSectionId?: string;
  onKoreksi?: (isi: string, label: string, id: string, type: 'bab' | 'pasal') => void;
}) {
  const isRoot = depth === 0;

  return (
    <div
      id={`struktur-${item.id}`}
      className={isRoot 
        ? "bg-white rounded-[20px] border border-neu-50 p-5 space-y-4"
        : "bg-white rounded-[12px] border border-neu-50 p-4 space-y-3 mt-4 ml-4"
      }
    >
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={() => onToggleBab(item.id)}
          className="flex items-center gap-2 flex-1 cursor-pointer text-left"
        >
          <div className="flex items-center gap-2">
            {isRoot && <span className="w-2 h-2 rounded-full bg-pr-700 shrink-0" />}
            <span className={`font-bold tracking-wide uppercase ${isRoot ? 'text-[14px] text-pr-900' : 'text-[12px] text-neu-700'}`}>
              {item.judul}
            </span>
          </div>
        </button>
        <div className="flex items-center gap-2 shrink-0">
          {onKoreksi && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const babIsi = item.deskripsi || item.judul || '';
                onKoreksi(babIsi, item.judul, item.id, 'bab');
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neu-50 bg-white text-[12px] font-normal text-neu-900 transition-colors cursor-pointer"
              title="Koreksi teks BAB ini"
            >
              <PencilLine className="w-3.5 h-3.5 text-neu-900" />
              Koreksi
            </button>
          )}
          <button
            type="button"
            onClick={() => onToggleBab(item.id)}
            className="p-1 cursor-pointer"
          >
            {item.isExpanded ? (
              <ChevronUp className="w-4 h-4 text-neu-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neu-400" />
            )}
          </button>
        </div>
      </div>

      {item.isExpanded && (
        <div className="space-y-4 pt-1">
          {item.deskripsi && (
            <div className="w-full p-3 rounded-[8px] bg-bg-900 border border-neu-50 text-[12px] text-neu-700 leading-relaxed whitespace-pre-line text-justify">
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
                  activeSectionId={activeSectionId}
                  onKoreksi={onKoreksi}
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
                  activeSectionId={activeSectionId}
                  onKoreksi={onKoreksi ? (isi, label, id) => onKoreksi(isi, label, id, 'pasal') : undefined}
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
  activeSectionId,
  onKoreksi,
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
          activeSectionId={activeSectionId}
          onKoreksi={onKoreksi}
        />
      ))}
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { ChapterItem, ArticleItem } from '../../admin/import/correctionParser';

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

  return (
    <div
      id={`section-${pasal.id}`}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-[6px] bg-pr-900 text-white text-[11px] font-semibold">
          {pasal.nomor}
        </span>
        <div className="flex items-center gap-2">
          {pasal.penjelasan && (
            <button
              type="button"
              onClick={() => setIsPenjelasanExpanded(!isPenjelasanExpanded)}
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
            onClick={() => onTogglePasal(babId, pasal.id)}
            className="p-1 text-neu-400 hover:text-black cursor-pointer"
          >
            {pasal.isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {pasal.isExpanded && (
        <div className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line">
          {pasal.isi}
        </div>
      )}

      {isPenjelasanExpanded && pasal.penjelasan && (
        <div className="w-full mt-2 p-3.5 rounded-[8px] bg-blue-50/50 border-l-4 border-l-blue-500 border border-blue-100 text-[12px] text-blue-900 leading-relaxed whitespace-pre-line">
          <span className="font-semibold text-[14px] block mb-1">Penjelasan {pasal.nomor}:</span>
          {pasal.penjelasan}
        </div>
      )}

      {/* Render Sub-Pasal (misal: Pasal Omnibus Law) */}
      {pasal.isExpanded && pasal.pasalList && pasal.pasalList.length > 0 && (
        <div className="mt-4 ml-4 space-y-4 border-l-2 border-neu-200 pl-4">
          {pasal.pasalList.map((childPasal: ArticleItem) => (
            <PasalNode
              key={childPasal.id}
              pasal={childPasal}
              babId={babId}
              onTogglePasal={onTogglePasal}
            />
          ))}
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
            <div className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-700 leading-relaxed whitespace-pre-line">
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

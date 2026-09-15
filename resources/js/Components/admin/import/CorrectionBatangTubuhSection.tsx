import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ChapterItem } from './correctionParser';

interface CorrectionBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  onChangeBabDeskripsi: (babId: string, value: string) => void;
  onChangePasalIsi: (babId: string, pasalId: string, value: string) => void;
}

export function CorrectionBatangTubuhSection({
  babList,
  onToggleBab,
  onTogglePasal,
  onChangeBabDeskripsi,
  onChangePasalIsi,
}: CorrectionBatangTubuhSectionProps) {
  if (babList.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {babList.map((bab) => (
        <div
          key={bab.id}
          className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs space-y-4"
        >
          <button
            type="button"
            onClick={() => onToggleBab(bab.id)}
            className="w-full flex items-center justify-between cursor-pointer"
          >
            <span className="text-[12px] font-bold text-pr-900 tracking-wide uppercase">
              {bab.judul}
            </span>
            {bab.isExpanded ? (
              <ChevronUp className="w-4 h-4 text-neu-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neu-400" />
            )}
          </button>

          {bab.isExpanded && (
            <div className="space-y-4 pt-1">
              {bab.deskripsi && (
                <textarea
                  rows={2}
                  value={bab.deskripsi}
                  onChange={(e) => onChangeBabDeskripsi(bab.id, e.target.value)}
                  className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-700 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900"
                  placeholder="Deskripsi bab..."
                />
              )}

              {/* Pasal-Pasal di dalam BAB */}
              {bab.pasalList.map((pasal) => (
                <div
                  key={pasal.id}
                  id={`section-${pasal.id}`}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-[6px] bg-pr-900 text-white text-[11px] font-semibold">
                      {pasal.nomor}
                    </span>
                    <button
                      type="button"
                      onClick={() => onTogglePasal(bab.id, pasal.id)}
                      className="p-1 text-neu-400 hover:text-black cursor-pointer"
                    >
                      {pasal.isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {pasal.isExpanded && (
                    <textarea
                      rows={3}
                      value={pasal.isi}
                      onChange={(e) => onChangePasalIsi(bab.id, pasal.id, e.target.value)}
                      className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900"
                      placeholder="Isi pasal..."
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

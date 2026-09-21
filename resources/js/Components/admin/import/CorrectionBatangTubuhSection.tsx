import React from 'react';
import { ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { ChapterItem } from './correctionParser';
import { AutoResizeTextarea } from './AutoResizeTextarea';

interface CorrectionBatangTubuhSectionProps {
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
  onTogglePasal: (babId: string, pasalId: string) => void;
  onChangeBabDeskripsi: (babId: string, value: string) => void;
  onChangeBabJudul?: (babId: string, value: string) => void;
  onChangePasalIsi: (babId: string, pasalId: string, value: string) => void;
  onChangePasalPenjelasan?: (babId: string, pasalId: string, value: string) => void;
}

export function CorrectionBatangTubuhSection({
  babList,
  onToggleBab,
  onTogglePasal,
  onChangeBabDeskripsi,
  onChangeBabJudul,
  onChangePasalIsi,
  onChangePasalPenjelasan,
}: CorrectionBatangTubuhSectionProps) {
  if (babList.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {babList.filter(bab => 
        (bab.judul && bab.judul.trim() !== '' && bab.judul.trim() !== '-') || 
        (bab.deskripsi && bab.deskripsi.trim() !== '') || 
        (bab.pasalList && bab.pasalList.length > 0)
      ).map((bab) => (
        <div
          key={bab.id}
          className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs space-y-4"
        >
          {bab.judul && bab.judul.trim() !== '' && bab.judul.trim() !== '-' && (
            <div className="w-full flex items-center justify-between gap-3 group">
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <input
                  type="text"
                  value={bab.judul}
                  onChange={(e) => onChangeBabJudul?.(bab.id, e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-[12px] font-bold text-pr-900 tracking-wide uppercase focus:outline-none focus:bg-[#F8FAFC] focus:px-3 focus:py-2 focus:-mx-3 focus:-my-2 focus:rounded-[8px] transition-all"
                  placeholder="Judul BAB"
                />
                <Edit2 className="w-3.5 h-3.5 text-neu-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pointer-events-none" />
              </div>
              <button
                type="button"
                onClick={() => onToggleBab(bab.id)}
                className="p-1 cursor-pointer shrink-0"
              >
                {bab.isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-neu-400 hover:text-black" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neu-400 hover:text-black" />
                )}
              </button>
            </div>
          )}

          {(bab.isExpanded || !bab.judul || bab.judul.trim() === '' || bab.judul.trim() === '-') && (
            <div className="space-y-4 pt-1">
              {bab.deskripsi && (
                <AutoResizeTextarea
                  value={bab.deskripsi}
                  onChange={(e) => onChangeBabDeskripsi(bab.id, e.target.value)}
                  className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-700 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900 resize-none min-h-[100px]"
                  placeholder="Deskripsi bab..."
                />
              )}

              {/* Pasal-Pasal di dalam BAB */}
              {bab.pasalList.map((pasal) => (
                <div
                  key={pasal.id}
                  id={`section-${pasal.id}`}
                  className="space-y-3"
                >
                  {pasal.nomor && pasal.nomor.trim() !== '-' && pasal.nomor.trim() !== '' && (
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
                  )}

                  {(pasal.isExpanded || !pasal.nomor || pasal.nomor.trim() === '-' || pasal.nomor.trim() === '') && (
                    <div className="space-y-2">
                      <AutoResizeTextarea
                        value={pasal.isi}
                        onChange={(e) => onChangePasalIsi(bab.id, pasal.id, e.target.value)}
                        className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900 resize-none min-h-[150px]"
                        placeholder="Isi bagian..."
                      />
                      
                      <div className="relative">
                        <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
                          Penjelasan (Opsional)
                        </span>
                        <AutoResizeTextarea
                          value={pasal.penjelasan || ''}
                          onChange={(e) => onChangePasalPenjelasan?.(bab.id, pasal.id, e.target.value)}
                          className="w-full mt-1 p-3.5 rounded-[8px] bg-blue-50/50 border-l-4 border-l-blue-500 border border-blue-200 text-[12px] text-blue-900 leading-relaxed focus:outline-none focus:bg-white focus:border-blue-500 transition-all resize-none min-h-[100px]"
                          placeholder="Tambahkan penjelasan pasal di sini..."
                        />
                      </div>
                    </div>
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

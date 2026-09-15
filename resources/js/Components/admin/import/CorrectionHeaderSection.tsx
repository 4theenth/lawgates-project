import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CorrectionHeaderSectionProps {
  standarId: string;
  judul: string;
  isOpenStandarId: boolean;
  isOpenJudul: boolean;
  onToggleStandarId: () => void;
  onToggleJudul: () => void;
  onChangeStandarId: (value: string) => void;
  onChangeJudul: (value: string) => void;
}

export function CorrectionHeaderSection({
  standarId,
  judul,
  isOpenStandarId,
  isOpenJudul,
  onToggleStandarId,
  onToggleJudul,
  onChangeStandarId,
  onChangeJudul,
}: CorrectionHeaderSectionProps) {
  return (
    <div className="space-y-4">
      {/* 1. STANDAR ID */}
      <div className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs">
        <button
          type="button"
          onClick={onToggleStandarId}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-pr-900 tracking-wide uppercase">
              STANDAR ID
            </span>
          </div>
          {isOpenStandarId ? (
            <ChevronUp className="w-4 h-4 text-neu-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neu-400" />
          )}
        </button>

        {isOpenStandarId && (
          <div className="mt-3">
            <input
              type="text"
              value={standarId}
              onChange={(e) => onChangeStandarId(e.target.value)}
              className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] font-semibold text-neu-900 focus:outline-none focus:bg-white focus:border-pr-900 transition-all"
              placeholder="e.g. UU_No_6_2023"
            />
          </div>
        )}
      </div>

      {/* 2. JUDUL PERATURAN */}
      <div className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs">
        <button
          type="button"
          onClick={onToggleJudul}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-pr-900 tracking-wide uppercase">
              JUDUL PERATURAN
            </span>
          </div>
          {isOpenJudul ? (
            <ChevronUp className="w-4 h-4 text-neu-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neu-400" />
          )}
        </button>

        {isOpenJudul && (
          <div className="mt-3">
            <textarea
              rows={3}
              value={judul}
              onChange={(e) => onChangeJudul(e.target.value)}
              className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-900 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900 transition-all font-sans"
              placeholder="Masukkan judul peraturan..."
            />
          </div>
        )}
      </div>
    </div>
  );
}

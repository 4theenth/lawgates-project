import React from 'react';
import { Scale, ChevronDown, SlidersHorizontal, FileText } from 'lucide-react';
import { COMPARISON_OPTIONS } from '@/data/dummyComparison';

export interface ComparisonSelectorCardProps {
  options?: any[];
  selectedLeftId: string;
  selectedRightId: string;
  onChangeLeft: (id: string) => void;
  onChangeRight: (id: string) => void;
  onCompareClick?: () => void;
  disabledLeft?: boolean;
  isLoading?: boolean;
}

export function ComparisonSelectorCard({
  options = [],
  selectedLeftId,
  selectedRightId,
  onChangeLeft,
  onChangeRight,
  onCompareClick,
  disabledLeft = false,
  isLoading = false,
}: ComparisonSelectorCardProps) {
  const currentOptions = options.length > 0 ? options : COMPARISON_OPTIONS;
  const leftOpt = currentOptions.find((o) => o.id === selectedLeftId);
  const rightOpt = currentOptions.find((o) => o.id === selectedRightId);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Dua Selektor Regulasi (Acuan Awal & Yang Mau Dibandingkan) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Kolom 1: ACUAN AWAL */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            ACUAN AWAL
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 pointer-events-none">
              <Scale className="w-3.5 h-3.5 stroke-[1.75]" />
            </div>
            {disabledLeft ? (
              <div className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-900 shadow-2xs truncate select-none">
                {leftOpt ? leftOpt.title : 'Pilih Dokumen Acuan'}
              </div>
            ) : (
              <>
                <select
                  value={selectedLeftId}
                  onChange={(e) => onChangeLeft(e.target.value)}
                  className="w-full pl-12 pr-10 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-pr-900 focus:border-pr-900 shadow-2xs appearance-none cursor-pointer truncate"
                >
                  {currentOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title} ({opt.tahun || opt.category})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 w-4 h-4 text-gray-400 pointer-events-none stroke-[2]" />
              </>
            )}
          </div>
        </div>

        {/* Pemisah Icon Dokumen di Tengah */}
        <div className="flex md:col-span-2 justify-center pt-0 md:pt-5">
          <div className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-500 shadow-2xs">
            <FileText className="w-4 h-4 stroke-[1.75]" />
          </div>
        </div>

        {/* Kolom 2: YANG MAU DIBANDINGKAN */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            YANG MAU DIBANDINGKAN
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 pointer-events-none">
              <Scale className="w-3.5 h-3.5 stroke-[1.75]" />
            </div>
            <select
              value={selectedRightId}
              onChange={(e) => onChangeRight(e.target.value)}
              className="w-full pl-12 pr-10 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-pr-900 focus:border-pr-900 shadow-2xs appearance-none cursor-pointer truncate"
            >
              <option value="" disabled>-- Pilih Dokumen Pembanding --</option>
              {currentOptions
                .filter((opt) => opt.id !== selectedLeftId)
                .map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title} ({opt.tahun || opt.category})
                  </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3.5 w-4 h-4 text-gray-400 pointer-events-none stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Tombol Bandingkan di Sudut Kanan Bawah Sesuai Desain */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onCompareClick}
          disabled={!selectedLeftId || !selectedRightId || isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A1931] hover:bg-[#071326] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-white stroke-[2]" />
          <span>{isLoading ? 'MEMPROSES...' : 'BANDINGKAN'}</span>
        </button>
      </div>
    </div>
  );
}

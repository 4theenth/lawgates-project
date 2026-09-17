import React from 'react';
import { Scale, ChevronDown, SlidersHorizontal, FileText, CheckCircle2 } from 'lucide-react';
import { COMPARISON_OPTIONS } from '@/data/dummyComparison';

export interface ComparisonSelectorCardProps {
  selectedLeftId: string;
  selectedRightId: string;
  onChangeLeft: (id: string) => void;
  onChangeRight: (id: string) => void;
  onCompareClick?: () => void;
  isStandardIdVerified?: boolean;
}

export function ComparisonSelectorCard({
  selectedLeftId,
  selectedRightId,
  onChangeLeft,
  onChangeRight,
  onCompareClick,
  isStandardIdVerified = true,
}: ComparisonSelectorCardProps) {
  const leftOpt = COMPARISON_OPTIONS.find((o) => o.id === selectedLeftId);
  const rightOpt = COMPARISON_OPTIONS.find((o) => o.id === selectedRightId);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 shadow-2xs space-y-4 sm:space-y-5">
      {/* 1. Bar Notifikasi Pemeriksaan Standar ID UUD 1945 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-4 py-2.5 bg-[#F0FDF4] border border-emerald-200 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold text-[11px] sm:text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Pemeriksaan Standar ID: <strong className="font-bold">UUD-1945</strong> (Undang-Undang Dasar 1945)
          </span>
        </div>
        <span className="inline-flex self-start sm:self-auto items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-medium shrink-0">
          4 Perubahan Terverifikasi
        </span>
      </div>

      {/* 2. Dua Selektor Regulasi (Acuan Awal & Yang Mau Dibandingkan) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Kolom 1: Acuan Awal */}
        <div className="md:col-span-5 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              ACUAN AWAL
            </label>
            {leftOpt && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                {leftOpt.standardId}
              </span>
            )}
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-2.5 sm:left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 pointer-events-none">
              <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
            </div>
            <select
              value={selectedLeftId}
              onChange={(e) => onChangeLeft(e.target.value)}
              className="w-full pl-11 sm:pl-13 pr-8 sm:pr-10 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-pr-900 focus:border-pr-900 shadow-2xs appearance-none cursor-pointer truncate"
            >
              {COMPARISON_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  [{opt.standardId}] {opt.title} ({opt.tahun})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 sm:right-3.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 pointer-events-none stroke-[2]" />
          </div>
        </div>

        {/* Pemisah Mobile & Desktop Icon */}
        <div className="flex md:col-span-2 justify-center pt-0 md:pt-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full md:rounded-xl bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-500 shadow-2xs">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
          </div>
        </div>

        {/* Kolom 2: Yang Mau Dibandingkan */}
        <div className="md:col-span-5 space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              YANG MAU DIBANDINGKAN
            </label>
            {rightOpt && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                {rightOpt.standardId}
              </span>
            )}
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-2.5 sm:left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 pointer-events-none">
              <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
            </div>
            <select
              value={selectedRightId}
              onChange={(e) => onChangeRight(e.target.value)}
              className="w-full pl-11 sm:pl-13 pr-8 sm:pr-10 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-pr-900 focus:border-pr-900 shadow-2xs appearance-none cursor-pointer truncate"
            >
              {COMPARISON_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  [{opt.standardId}] {opt.title} ({opt.tahun})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 sm:right-3.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 pointer-events-none stroke-[2]" />
          </div>
        </div>
      </div>

      {/* Baris Bawah: Info & Tombol Bandingkan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] sm:text-[11px] text-gray-500 leading-normal">
          *Pemeriksaan Standar ID memastikan hanya 4 perubahan Undang-Undang Dasar 1945 yang dikomparasi secara tepat.
        </p>

        <button
          type="button"
          onClick={onCompareClick}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 sm:py-2.5 rounded-xl bg-[#0A1C3E] hover:bg-[#071530] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer w-full sm:w-auto shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 text-white stroke-[2]" />
          <span>BANDINGKAN</span>
        </button>
      </div>
    </div>
  );
}

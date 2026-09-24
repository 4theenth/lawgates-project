import React, { useState, useRef, useEffect } from 'react';
import { Scale, ChevronDown, FileText, Check } from 'lucide-react';
import { ComparisonOption } from '@/types/comparison';

export interface ComparisonSelectorCardProps {
  options?: ComparisonOption[];
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOptions = options;
  const leftOpt = currentOptions.find((o) => o.id === selectedLeftId);
  const rightOpt = currentOptions.find((o) => o.id === selectedRightId);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availableRightOptions = currentOptions.filter((opt) => opt.id !== selectedLeftId);

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
            {disabledLeft ? (
              <div className="w-full h-11 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-800 shadow-2xs select-none">
                <Scale className="w-4 h-4 text-gray-400 shrink-0 stroke-[1.75]" />
                <span className="truncate">{leftOpt ? leftOpt.title : 'Pilih Dokumen Acuan'}</span>
              </div>
            ) : (
              <div className="w-full relative flex items-center">
                <Scale className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none stroke-[1.75]" />
                <select
                  value={selectedLeftId}
                  onChange={(e) => onChangeLeft(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-2xs appearance-none cursor-pointer truncate"
                >
                  {currentOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title} ({opt.tahun || opt.category})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 w-4 h-4 text-gray-400 pointer-events-none stroke-[2]" />
              </div>
            )}
          </div>
        </div>

        {/* Pemisah Icon Dokumen di Tengah */}
        <div className="flex md:col-span-2 justify-center pt-0 md:pt-5">
          <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-400 shadow-2xs">
            <FileText className="w-4 h-4 stroke-[1.75]" />
          </div>
        </div>

        {/* Kolom 2: YANG MAU DIBANDINGKAN (Custom Dropdown Sesuai Desain) */}
        <div className="md:col-span-5 space-y-1.5" ref={dropdownRef}>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            YANG MAU DIBANDINGKAN
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-11 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white flex items-center gap-3 text-left transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-2xs cursor-pointer"
            >
              <Scale className="w-4 h-4 text-gray-400 shrink-0 stroke-[1.75]" />
              <span
                className={`text-xs sm:text-sm truncate flex-1 select-none ${
                  rightOpt ? 'font-semibold text-gray-900' : 'text-gray-400'
                }`}
              >
                {rightOpt
                  ? `${rightOpt.title} (${rightOpt.tahun || rightOpt.category})`
                  : 'Silakan pilih hukum untuk dibandingkan.'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 shrink-0 stroke-[2] transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Floating Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto py-1 animate-in fade-in-50 duration-150">
                {availableRightOptions.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-gray-400 text-center">
                    Tidak ada opsi peraturan pembanding yang terkait.
                  </div>
                ) : (
                  availableRightOptions.map((opt) => {
                    const isSelected = opt.id === selectedRightId;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          onChangeRight(opt.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between transition-colors border-b border-gray-50 last:border-b-0 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/60 text-blue-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                          <span className="truncate">{opt.title}</span>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                          {opt.tahun || opt.category}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Bandingkan di Sudut Kanan Bawah Sesuai Desain Mockup */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onCompareClick}
          disabled={!selectedLeftId || !selectedRightId || isLoading}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
            !selectedLeftId || !selectedRightId || isLoading
              ? 'bg-[#717A8A] cursor-not-allowed opacity-90'
              : 'bg-[#0A1931] hover:bg-[#071326] cursor-pointer'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-white stroke-[2]" />
          <span>{isLoading ? 'MEMPROSES...' : 'BANDINGKAN'}</span>
        </button>
      </div>
    </div>
  );
}

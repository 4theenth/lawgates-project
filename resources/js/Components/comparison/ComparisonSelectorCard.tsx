import React, { useState, useRef, useEffect } from 'react';
import { Scale, ChevronDown, FileText } from 'lucide-react';
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
    <div className="bg-white rounded-2xl border border-neu-200 p-5 sm:p-6 space-y-4">
      {/* Dua Selektor Regulasi (Acuan Awal & Yang Mau Dibandingkan) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Kolom 1: ACUAN AWAL */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="block text-xs font-medium text-neu-500 uppercase tracking-wider">
            ACUAN AWAL
          </label>
          <div className="relative flex items-center">
            {disabledLeft ? (
              <div className="w-full h-11 px-3.5 py-2.5 rounded-xl border border-neu-200 bg-white flex items-center gap-3 text-xs sm:text-sm font-medium text-neu-800 select-none">
                <Scale className="w-4 h-4 text-neu-400 shrink-0 stroke-[1.75]" />
                <span className="truncate">{leftOpt ? leftOpt.title : 'Pilih Dokumen Acuan'}</span>
              </div>
            ) : (
              <div className="w-full relative flex items-center">
                <Scale className="absolute left-3.5 w-4 h-4 text-neu-400 pointer-events-none stroke-[1.75]" />
                <select
                  value={selectedLeftId}
                  onChange={(e) => onChangeLeft(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 py-2.5 rounded-xl border border-neu-200 bg-white text-xs sm:text-sm font-medium text-neu-900 focus:outline-none focus:ring-2 focus:ring-neu-200 appearance-none cursor-pointer truncate"
                >
                  {currentOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 w-4 h-4 text-neu-400 pointer-events-none stroke-[2]" />
              </div>
            )}
          </div>
        </div>

        {/* Pemisah Icon Dokumen di Tengah */}
        <div className="flex md:col-span-2 justify-center pt-0 md:pt-5">
          <div className="w-9 h-9 rounded-lg bg-neu-100 border border-neu-200 flex items-center justify-center text-neu-500">
            <FileText className="w-4 h-4 stroke-[1.75]" />
          </div>
        </div>

        {/* Kolom 2: YANG MAU DIBANDINGKAN (Custom Dropdown Sesuai Desain) */}
        <div className="md:col-span-5 space-y-1.5" ref={dropdownRef}>
          <label className="block text-xs font-medium text-neu-500 uppercase tracking-wider">
            YANG MAU DIBANDINGKAN
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-11 px-3.5 py-2.5 rounded-xl border border-neu-200 bg-white flex items-center gap-3 text-left transition-all hover:border-neu-300 focus:outline-none focus:ring-2 focus:ring-neu-200 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-neu-400 shrink-0 stroke-[1.75]" />
              <span
                className={`text-xs sm:text-sm truncate flex-1 select-none ${
                  rightOpt ? 'font-medium text-neu-900' : 'text-neu-400'
                }`}
              >
                {rightOpt
                  ? rightOpt.title
                  : 'Silakan pilih hukum untuk dibandingkan.'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neu-400 shrink-0 stroke-[2] transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Floating Dropdown Menu (Sesuai Desain Figma: Bersih tanpa garis pemisah dan tanpa badge tahun) */}
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-neu-200 rounded-xl z-50 max-h-64 overflow-y-auto py-2">
                {availableRightOptions.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-neu-400 text-center">
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
                        className={`w-full px-4 py-2 text-left text-xs sm:text-sm transition-colors cursor-pointer select-none ${
                          isSelected
                            ? 'text-neu-900 font-medium bg-neu-50/80'
                            : 'text-neu-700 hover:text-neu-900 hover:bg-neu-50'
                        }`}
                      >
                        <span className="truncate block">{opt.title}</span>
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
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-medium uppercase tracking-wider transition-all ${
            !selectedLeftId || !selectedRightId || isLoading
              ? 'bg-neu-400 cursor-not-allowed opacity-90'
              : 'bg-pr-900 hover:bg-pr-800 cursor-pointer'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-white stroke-[2]" />
          <span>{isLoading ? 'MEMPROSES...' : 'BANDINGKAN'}</span>
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface YearGridPopoverProps {
  selectedYear: number;
  disabledYear?: number;
  onSelectYear: (year: number) => void;
  onClose: () => void;
  align?: 'left' | 'right';
  className?: string;
}

export function YearGridPopover({
  selectedYear,
  disabledYear,
  onSelectYear,
  onClose,
  align = 'left',
  className = '',
}: YearGridPopoverProps) {
  // Range tahun per page (20 tahun: 4 baris x 5 kolom, persis referensi screenshot 2020 - 2039)
  const YEARS_PER_PAGE = 20;
  const initialBase = Math.floor(selectedYear / YEARS_PER_PAGE) * YEARS_PER_PAGE || 2020;
  const [baseYear, setBaseYear] = useState<number>(initialBase);

  const maxYearInPage = baseYear + YEARS_PER_PAGE - 1;
  const yearsList = Array.from({ length: YEARS_PER_PAGE }, (_, i) => baseYear + i);

  const MAX_YEAR = 2026;
  const canGoNextPage = baseYear + YEARS_PER_PAGE <= MAX_YEAR + 10;

  const handlePrevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBaseYear((prev) => prev - YEARS_PER_PAGE);
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoNextPage) {
      setBaseYear((prev) => prev + YEARS_PER_PAGE);
    }
  };

  return (
    <div
      className={`absolute top-full mt-2 z-50 w-72 sm:w-80 bg-white rounded-2xl border border-neu-100 shadow-xl p-4 animate-in fade-in-50 zoom-in-95 duration-100 ${
        align === 'right' ? 'right-0' : 'left-0'
      } ${className}`}
    >
      {/* ── Header: < 2020 - 2039 > (Sesuai Persis Screenshot) ── */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          type="button"
          onClick={handlePrevPage}
          title="Rentang tahun sebelumnya"
          className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neu-600 hover:text-neu-900 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <span className="text-sm font-semibold text-neu-800 tracking-tight">
          {baseYear} - {maxYearInPage}
        </span>

        <button
          type="button"
          disabled={!canGoNextPage}
          onClick={canGoNextPage ? handleNextPage : undefined}
          title={canGoNextPage ? 'Rentang tahun berikutnya' : 'Tahun berikutnya belum tersedia'}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
            canGoNextPage
              ? 'hover:bg-neutral-100 text-neu-600 hover:text-neu-900 cursor-pointer'
              : 'text-neu-300 opacity-30 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* ── Grid 5 Kolom x 4 Baris (20 Tahun) ── */}
      <div className="grid grid-cols-5 gap-y-2 gap-x-1 sm:gap-x-1.5 text-center">
        {yearsList.map((year) => {
          const isSelected = year === selectedYear;
          const isFuture = year > MAX_YEAR;
          const isAlreadySelectedOther = disabledYear !== undefined && year === disabledYear;
          const isDisabled = isFuture || isAlreadySelectedOther;

          return (
            <button
              key={year}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (isDisabled) return;
                onSelectYear(year);
                onClose();
              }}
              title={
                isFuture
                  ? `Tahun ${year} belum tersedia (maksimal ${MAX_YEAR})`
                  : isAlreadySelectedOther
                  ? `Tahun ${year} sudah aktif di sisi lain`
                  : undefined
              }
              className={`h-9 sm:h-10 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center ${
                isDisabled
                  ? 'text-neu-300 opacity-25 cursor-not-allowed bg-transparent'
                  : isSelected
                  ? 'bg-neu-900 text-white font-semibold shadow-xs cursor-pointer'
                  : 'text-neu-700 hover:bg-neutral-100 hover:text-neu-900 font-normal cursor-pointer'
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { YearGridPopover } from './YearGridPopover';

interface TimelineYearComparePickerProps {
  startYear: number;
  endYear: number;
  onChange: (year1: number, year2: number) => void;
  className?: string;
}

export function TimelineYearComparePicker({
  startYear,
  endYear,
  onChange,
  className = '',
}: TimelineYearComparePickerProps) {
  // Tab mana yang sedang aktif membuka pilihan tahun ('left' = Tahun 1, 'right' = Tahun 2, null = tertutup)
  const [activeTab, setActiveTab] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside listener yang melingkupi seluruh container (tab trigger + popover)
  // Menjamin klik 2x pada tab yang sama akan toggle menutup popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectYear1 = (newYear1: number) => {
    onChange(newYear1, endYear);
    setActiveTab(null);
  };

  const handleSelectYear2 = (newYear2: number) => {
    onChange(startYear, newYear2);
    setActiveTab(null);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* ── Dual Tab Trigger: Kolom dengan 2 Tab Tahun Berdampingan Presisi ── */}
      <div
        className={`w-full h-11 sm:h-12 p-1 rounded-xl border bg-white shadow-2xs flex items-center transition-all ${
          activeTab !== null
            ? 'border-neu-200'
            : 'border-neu-100 hover:border-neu-300'
        }`}
      >
        {/* Tab Tahun Kiri (Tahun 1) */}
        <button
          type="button"
          onClick={() => setActiveTab((prev) => (prev === 'left' ? null : 'left'))}
          className={`flex-1 h-full px-3 sm:px-3.5 rounded-lg text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer outline-none ${
            activeTab === 'left'
              ? 'bg-neu-100 text-neu-900 font-semibold shadow-2xs'
              : 'text-neu-700 hover:bg-neu-50 font-medium'
          }`}
        >
          <span className="tabular-nums">{startYear}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-neu-400 transition-transform duration-200 ${
              activeTab === 'left' ? 'rotate-180 text-neu-900' : ''
            }`}
          />
        </button>

        {/* Divider Vertikal Halus di Antara Kedua Tahun */}
        <div className="w-[1px] h-5 bg-neu-200/80 shrink-0 mx-0.5" />

        {/* Tab Tahun Kanan (Tahun 2) */}
        <button
          type="button"
          onClick={() => setActiveTab((prev) => (prev === 'right' ? null : 'right'))}
          className={`flex-1 h-full px-3 sm:px-3.5 rounded-lg text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer outline-none ${
            activeTab === 'right'
              ? 'bg-neu-100 text-neu-900 font-semibold shadow-2xs'
              : 'text-neu-700 hover:bg-neu-50 font-medium'
          }`}
        >
          <span className="tabular-nums">{endYear}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-neu-400 transition-transform duration-200 ${
              activeTab === 'right' ? 'rotate-180 text-neu-900' : ''
            }`}
          />
        </button>
      </div>

      {/* ── Popover Pemilih Tahun Bersih Saat Tab Kiri Diklik (Tahun kanan di-disable) ── */}
      {activeTab === 'left' && (
        <YearGridPopover
          selectedYear={startYear}
          disabledYear={endYear}
          onSelectYear={handleSelectYear1}
          onClose={() => setActiveTab(null)}
        />
      )}

      {/* ── Popover Pemilih Tahun Bersih Saat Tab Kanan Diklik (Tahun kiri di-disable) ── */}
      {activeTab === 'right' && (
        <YearGridPopover
          selectedYear={endYear}
          disabledYear={startYear}
          onSelectYear={handleSelectYear2}
          onClose={() => setActiveTab(null)}
        />
      )}
    </div>
  );
}

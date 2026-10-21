import React from 'react';
import { Filter } from 'lucide-react';
import { StatusTabs, TabOption } from '@/Components/common/StatusTabs';

export interface SearchSortBarProps {
  totalResult: number;
  searchQuery?: string;
  sort: string;
  onSortChange: (newSort: string) => void;
  isFilterOpen?: boolean;
  onOpenFilter?: () => void;
  className?: string;
}

const SORT_OPTIONS: TabOption[] = [
  { id: 'terbaru', label: 'Tahun Terbaru' },
  { id: 'terlama', label: 'Tahun Terlama' },
];

export function SearchSortBar({
  totalResult,
  searchQuery = '',
  sort,
  onSortChange,
  isFilterOpen = true,
  onOpenFilter,
  className = '',
}: SearchSortBarProps) {
  // Logic toggle / klik 2 kali:
  // Jika tab yang aktif diklik lagi, unselect menjadi '' (kembali ke default: Terakhir Diperbaharui)
  const handleTabChange = (clickedTab: string) => {
    const nextSort = sort === clickedTab ? '' : clickedTab;
    onSortChange(nextSort);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-5 gap-3 sm:gap-4 ${className}`}
    >
      {/* 
        Di Mobile (< sm):
          - Baris 1: Tombol [Filter] di kiri & StatusTabs di kanan (berdampingan)
          - Baris 2: Teks "Ditemukan 14 hasil" dengan jarak simetris ke atas dan ke bawah
        Di Desktop (>= sm):
          - Kiri: Tombol [Filter] + Teks "Ditemukan 14 hasil"
          - Kanan: StatusTabs
      */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Kontainer Baris 1 di Mobile: [Filter] + StatusTabs berdampingan */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto">
          {!isFilterOpen && onOpenFilter && (
            <button
              type="button"
              onClick={onOpenFilter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neu-100 rounded-[10px] text-[12px] font-medium text-neu-700 hover:bg-neu-50 shadow-2xs transition-colors cursor-pointer shrink-0 select-none"
              title="Buka Filter"
            >
              <Filter className="w-3.5 h-3.5 text-neu-500" />
              <span>Filter</span>
            </button>
          )}

          {/* StatusTabs khusus tampilan Mobile (muncul di sebelah tombol Filter) */}
          <div className="sm:hidden ml-auto">
            <StatusTabs
              tabs={SORT_OPTIONS}
              activeTab={sort}
              onChange={handleTabChange}
              size="sm"
            />
          </div>
        </div>

        {/* Teks Hasil: Di Mobile berada di bawah, di Desktop sejajar di samping tombol Filter */}
        <p className="text-xs sm:text-sm text-neu-600 px-0.5">
          Ditemukan{' '}
          <span
            className={`font-bold ${
              totalResult === 0 ? 'text-dan-900' : 'text-sec-900'
            }`}
          >
            {totalResult}
          </span>{' '}
          hasil {searchQuery && <span>untuk "{searchQuery}"</span>}
        </p>
      </div>

      {/* StatusTabs khusus tampilan Desktop (sm ke atas): Di pojok kanan toolbar */}
      <div className="hidden sm:flex shrink-0">
        <StatusTabs
          tabs={SORT_OPTIONS}
          activeTab={sort}
          onChange={handleTabChange}
          size="sm"
        />
      </div>
    </div>
  );
}

export default SearchSortBar;

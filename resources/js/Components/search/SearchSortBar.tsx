import React, { useState, useRef, useEffect } from 'react';
import { Filter, ArrowUpDown, ChevronDown, Check } from 'lucide-react';

export interface SearchSortBarProps {
  totalResult: number;
  searchQuery?: string;
  sort: string;
  onSortChange: (newSort: string) => void;
  isFilterOpen?: boolean;
  onOpenFilter?: () => void;
  className?: string;
}

export function SearchSortBar({
  totalResult,
  searchQuery = '',
  sort,
  onSortChange,
  isFilterOpen = true,
  onOpenFilter,
  className = '',
}: SearchSortBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (sortValue: string) => {
    onSortChange(sortValue);
    setIsSortOpen(false);
  };

  const getSortLabel = (val: string) => {
    switch (val) {
      case 'terbaru':
        return 'Tahun Terbaru';
      case 'terlama':
        return 'Tahun Terlama';
      default:
        return 'Relevansi';
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3 ${className}`}
    >
      <div className="flex items-center gap-3">
        {/* Tombol Filter saat Filter Sidebar disembunyikan */}
        {!isFilterOpen && onOpenFilter && (
          <button
            type="button"
            onClick={onOpenFilter}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-neu-200 rounded-xl text-xs font-semibold text-neu-700 hover:bg-neu-50 shadow-2xs transition-colors cursor-pointer shrink-0"
            title="Buka Filter"
          >
            <Filter className="w-3.5 h-3.5 text-neu-500" />
            <span>Filter</span>
          </button>
        )}

        <p className="text-xs sm:text-sm text-neu-600">
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

      {/* Sort Dropdown Pill */}
      <div ref={sortRef} className="relative self-end sm:self-auto">
        <button
          type="button"
          onClick={() => setIsSortOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-neu-200 rounded-xl text-xs font-semibold text-neu-700 hover:bg-neu-50 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-neu-500" />
          <span>{getSortLabel(sort)}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-neu-400 transition-transform ${
              isSortOpen ? 'rotate-180 text-pr-900' : ''
            }`}
          />
        </button>

        {isSortOpen && (
          <div className="absolute right-0 mt-1.5 w-40 bg-white border border-neu-200 rounded-xl shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
            <button
              type="button"
              onClick={() => handleSelect('relevansi')}
              className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                sort === 'relevansi'
                  ? 'bg-pr-50 text-pr-900 font-semibold'
                  : 'text-neu-700 hover:bg-neu-50'
              }`}
            >
              <span>Relevansi</span>
              {sort === 'relevansi' && <Check className="w-3 h-3 text-pr-900" />}
            </button>
            <button
              type="button"
              onClick={() => handleSelect('terbaru')}
              className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                sort === 'terbaru'
                  ? 'bg-pr-50 text-pr-900 font-semibold'
                  : 'text-neu-700 hover:bg-neu-50'
              }`}
            >
              <span>Tahun Terbaru</span>
              {sort === 'terbaru' && <Check className="w-3 h-3 text-pr-900" />}
            </button>
            <button
              type="button"
              onClick={() => handleSelect('terlama')}
              className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                sort === 'terlama'
                  ? 'bg-pr-50 text-pr-900 font-semibold'
                  : 'text-neu-700 hover:bg-neu-50'
              }`}
            >
              <span>Tahun Terlama</span>
              {sort === 'terlama' && <Check className="w-3 h-3 text-pr-900" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchSortBar;

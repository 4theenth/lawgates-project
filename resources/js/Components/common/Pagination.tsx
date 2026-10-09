import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  perPage?: number;
  perPageOptions?: number[];
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  maxVisible?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  lastPage,
  perPage = 10,
  perPageOptions = [10, 15, 20, 50, 100],
  onPageChange,
  onPerPageChange,
  maxVisible = 5,
  className = '',
}: PaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target as Node)) {
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (lastPage <= maxVisible) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < lastPage - 2) pages.push('...');
      pages.push(lastPage);
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`w-full mt-10 pt-6 border-t border-gray-100 ${className}`}>
      {/* ── 1. TAMPILAN MOBILE (< sm: Sesuai Screenshot Admin Dashboard) ── */}
      <div className="flex sm:hidden flex-col items-center gap-3 w-full">
        {/* Dropdown Page Size di atas tengah jika ada onPerPageChange */}
        {onPerPageChange && (
          <div className="relative inline-flex items-center gap-1.5 text-xs text-neu-500" ref={mobileDropdownRef}>
            <span>Lihat</span>
            <button
              type="button"
              onClick={() => setIsMobileDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-neu-100 rounded-lg text-xs font-semibold text-neu-800 hover:border-neu-300 shadow-2xs transition-all cursor-pointer min-w-[54px] justify-between"
            >
              <span>{perPage}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neu-400 transition-transform ${
                  isMobileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isMobileDropdownOpen && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-20 bg-white border border-neu-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {perPageOptions.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      onPerPageChange(num);
                      setIsMobileDropdownOpen(false);
                    }}
                    className={`w-full py-1 text-center text-xs transition-colors cursor-pointer ${
                      perPage === num
                        ? 'bg-blue-50 text-pr-900 font-semibold'
                        : 'text-neu-700 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Baris Tombol Mobile: [ < ]  [1]  2  3  ...  [ > ] */}
        <div className="flex items-center gap-1.5 justify-center max-w-full overflow-x-auto py-1">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-500 hover:text-neu-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer shrink-0"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
          </button>

          {pageNumbers.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`m-ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-neu-400 font-medium text-xs select-none"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`m-${pageNum}`}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium text-xs transition-colors cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-[#0B1A3A] text-white font-bold shadow-2xs'
                    : 'text-neu-700 hover:bg-gray-100 bg-white border border-neu-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= lastPage || lastPage === 0}
            className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-500 hover:text-neu-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer shrink-0"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* ── 2. TAMPILAN DESKTOP (>= sm) ── */}
      <div className="hidden sm:flex items-center justify-between gap-4 w-full">
        {/* Left: Tombol Sebelumnya & Dropdown Lihat Per Page */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Dropdown Lihat Per Page */}
          {onPerPageChange && (
            <div ref={dropdownRef} className="relative flex items-center gap-1.5 text-xs text-gray-500">
              <span>Lihat</span>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors cursor-pointer"
              >
                <span>{perPage}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-10 bottom-[calc(100%+6px)] w-16 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                  {perPageOptions.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        onPerPageChange(num);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full py-1 text-center text-xs transition-colors cursor-pointer ${
                        perPage === num
                          ? 'bg-blue-50 text-pr-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Nomor Halaman & Tombol Selanjutnya */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => (
              <button
                key={index}
                type="button"
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  page === currentPage
                    ? 'bg-[#0B1A3A] text-white shadow-sm'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-600 hover:bg-gray-100 bg-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= lastPage || lastPage === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

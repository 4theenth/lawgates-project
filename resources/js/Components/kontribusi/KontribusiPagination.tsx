import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

interface KontribusiPaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  perPageOptions?: number[];
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  className?: string;
}

export function KontribusiPagination({
  currentPage,
  totalPages,
  perPage,
  perPageOptions = [5, 10, 15, 20],
  onPageChange,
  onPerPageChange,
  className = '',
}: KontribusiPaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate page numbers with ellipsis
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 select-none ${className}`}>
      {/* ── Left Side: Prev Button & Show / Per-Page Selector ── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-[36px] h-[36px] rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-600 hover:text-neu-900 hover:border-neu-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5"
          style={{ outline: 'none' }}
          title="Halaman Sebelumnya"
          aria-label="Halaman sebelumnya"
        >
          <ArrowLeft className="w-4 h-4 text-inherit" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-normal text-neu-700">Lihat</span>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-20 h-[36px] rounded-[10px] border border-neu-100 bg-white px-3 flex items-center justify-between text-[12px] font-medium text-neu-900 hover:border-neu-200 shadow-2xs transition-colors cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5"
              style={{ outline: 'none' }}
            >
              <span>{perPage}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-neu-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full mb-1.5 left-0 w-20 bg-white border border-neu-100 rounded-[10px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                {perPageOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onPerPageChange(opt);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-center px-2 py-1.5 text-[12px] hover:bg-neu-50 transition-colors cursor-pointer ${
                      opt === perPage ? 'font-semibold text-pr-900 bg-pr-50' : 'text-neu-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right Side: Page Numbers & Next Button ── */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {pageNumbers.map((p, idx) => {
          if (p === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-[34px] h-[36px] flex items-center justify-center text-neu-400 font-medium text-[12px]"
              >
                ...
              </span>
            );
          }

          const pageNum = p as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-[34px] h-[36px] rounded-[8px] flex items-center justify-center font-medium text-[12px] transition-colors cursor-pointer outline-none focus:outline-none focus-visible:outline-none ${
                isActive
                  ? 'bg-pr-900 text-white font-semibold shadow-2xs border border-neu-100'
                  : 'text-neu-500 hover:text-neu-900 hover:bg-neu-50 border border-transparent'
              }`}
              style={{ outline: 'none' }}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-[36px] h-[36px] rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-600 hover:text-neu-900 hover:border-neu-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer ml-1 outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5"
          style={{ outline: 'none' }}
          title="Halaman Berikutnya"
          aria-label="Halaman berikutnya"
        >
          <ArrowRight className="w-4 h-4 text-inherit" />
        </button>
      </div>
    </div>
  );
}

export default KontribusiPagination;


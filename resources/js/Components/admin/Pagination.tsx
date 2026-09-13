import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  className = '',
}: PaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[13px] text-neu-600 ${className}`}
    >
      {/* Tombol Sebelumnya */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-neu-500" />
        <span>Sebelumnya</span>
      </button>

      {/* Tengah: Dropdown 'Lihat X' & Tombol Nomor Halaman */}
      <div className="flex items-center gap-4">
        {/* Page Size Selector (Lihat 10) */}
        <div className="relative inline-flex items-center gap-2">
          <span className="text-neu-500">Lihat</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-800 hover:border-neu-200 transition-all shadow-2xs cursor-pointer min-w-[54px] justify-between"
            >
              <span>{pageSize}</span>
              <ChevronDown className="w-3 h-3 text-neu-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full mb-1 left-0 z-20 w-20 rounded-[10px] border border-neu-50 bg-white shadow-lg py-1">
                {pageSizeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      if (onPageSizeChange) onPageSizeChange(opt);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 ${
                      opt === pageSize ? 'font-semibold text-pr-900 bg-gray-50' : 'text-neu-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nomor Halaman */}
        <div className="flex items-center gap-1">
          {(() => {
            const pages: (number | string)[] = [];
            if (totalPages <= 7) {
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages - 1, totalPages);
              } else if (currentPage >= totalPages - 2) {
                pages.push(1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
              } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
              }
            }

            return pages.map((page, idx) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-neu-400 font-medium"
                  >
                    ...
                  </span>
                );
              }

              const pageNum = page as number;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange && onPageChange(pageNum)}
                  className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-pr-900 text-white shadow-2xs'
                      : 'text-neu-700 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  {pageNum}
                </button>
              );
            });
          })()}
        </div>
      </div>

      {/* Tombol Selanjutnya */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
      >
        <span>Selanjutnya</span>
        <ArrowRight className="w-3.5 h-3.5 text-neu-500" />
      </button>
    </div>
  );
}

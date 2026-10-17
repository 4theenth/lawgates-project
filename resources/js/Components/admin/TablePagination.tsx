import React from 'react';
import { ArrowLeft, ArrowRight, MoreHorizontal } from 'lucide-react';

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: TablePaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Helper untuk generate nomor halaman sesuai format Figma
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage, '...', totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={`flex items-center justify-between gap-2 pt-3.5 mt-2 border-t border-neu-50/60 select-none ${className}`}
    >
      {/* Tombol Sebelumnya (Previous) */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-neu-100 bg-white text-neu-600 hover:bg-neu-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-2xs cursor-pointer shrink-0"
        title="Sebelumnya"
      >
        <ArrowLeft className="w-4 h-4 stroke-[1.75]" />
      </button>

      {/* Daftar Nomor Halaman (Tengah) */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {pageNumbers.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-7 sm:w-[34px] h-7 sm:h-[34px] flex items-center justify-center text-neu-400 select-none shrink-0"
              >
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-7 sm:w-[34px] h-7 sm:h-[34px] rounded-lg text-[12px] font-medium transition-all flex items-center justify-center cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-pr-900 text-white font-semibold shadow-2xs border border-pr-900'
                  : 'text-neu-500 hover:text-neu-900 hover:bg-neu-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Tombol Selanjutnya (Next) */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-neu-100 bg-white text-neu-600 hover:bg-neu-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-2xs cursor-pointer shrink-0"
        title="Selanjutnya"
      >
        <ArrowRight className="w-4 h-4 stroke-[1.75]" />
      </button>
    </div>
  );
}

export default TablePagination;

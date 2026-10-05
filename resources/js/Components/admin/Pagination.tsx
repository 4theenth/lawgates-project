import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

  // Tutup dropdown mobile saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileDropdownOpen(false);
      }
    }
    if (isMobileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileDropdownOpen]);

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

  // Helper penyusun list nomor halaman
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`w-full pt-4 text-[12px] text-neu-600 ${className}`}>
      {/* ── 1. TAMPILAN MOBILE (Khusus Layar < sm Sesuai Referensi Gambar) ── */}
      <div className="flex sm:hidden flex-col items-center gap-3">
        {/* Dropdown Page Size (Di tengah atas) */}
        <div className="relative inline-flex items-center" ref={mobileDropdownRef}>
          <button
            type="button"
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] border border-neu-100 bg-white text-neu-800 hover:border-neu-300 transition-all shadow-2xs cursor-pointer min-w-[58px] justify-between text-[13px] font-medium"
          >
            <span>{pageSize}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neu-500 stroke-[2]" />
          </button>

          {isMobileDropdownOpen && (
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-30 w-24 rounded-[10px] border border-neu-100 bg-white shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100">
              {pageSizeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (onPageSizeChange) onPageSizeChange(opt);
                    setIsMobileDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-50 transition-colors cursor-pointer ${
                    opt === pageSize ? 'font-bold text-pr-900 bg-pr-50' : 'text-neu-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Baris Tombol: < 1 2 3 ... 8 > (Di tengah mengapit angka) */}
        <div className="flex items-center gap-1 justify-center max-w-full overflow-x-auto py-1">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-400 hover:text-neu-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer shrink-0"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
          </button>

          {pageNumbers.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`m-ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-neu-400 font-medium text-[13px] select-none"
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
                onClick={() => onPageChange && onPageChange(pageNum)}
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium text-[13px] transition-colors cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-pr-900 text-white font-bold shadow-2xs'
                    : 'text-neu-600 hover:text-neu-900 hover:bg-gray-100/70'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-400 hover:text-neu-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer shrink-0"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* ── 2. TAMPILAN DESKTOP (Persis 100% Seperti Semula: Kiri - Tengah - Kanan) ── */}
      <div className="hidden sm:grid grid-cols-3 items-center gap-4">
        {/* Sisi Kiri: Tombol Sebelumnya & Dropdown Lihat 10 */}
        <div className="flex items-center gap-3 justify-self-start">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer text-[12px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neu-500" />
            <span>Sebelumnya</span>
          </button>

          <div className="relative inline-flex items-center gap-2 text-[12px]">
            <span className="text-neu-500">Lihat</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-800 hover:border-neu-200 transition-all shadow-2xs cursor-pointer min-w-[54px] justify-between text-[12px]"
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
                      className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-50 ${
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
        </div>

        {/* Sisi Tengah: Nomor Halaman */}
        <div className="flex items-center gap-1 justify-self-center">
          {pageNumbers.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`d-ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-neu-400 font-medium text-[12px]"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={`d-${pageNum}`}
                type="button"
                onClick={() => onPageChange && onPageChange(pageNum)}
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium text-[12px] transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-pr-900 text-white shadow-2xs'
                    : 'text-neu-700 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Sisi Kanan: Tombol Selanjutnya */}
        <div className="justify-self-end">
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer text-[12px]"
          >
            <span>Selanjutnya</span>
            <ArrowRight className="w-3.5 h-3.5 text-neu-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

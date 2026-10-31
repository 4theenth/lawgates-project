import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export interface PaginationProps {
  currentPage?: number;
  /** Support both totalPages (admin) and lastPage (public) */
  totalPages?: number;
  lastPage?: number;
  /** Support both pageSize (admin) and perPage (public) */
  pageSize?: number;
  perPage?: number;
  /** Support both pageSizeOptions and perPageOptions */
  pageSizeOptions?: number[];
  perPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onPerPageChange?: (size: number) => void;
  maxVisible?: number;
  className?: string;
  iconOnlyArrows?: boolean;
  variant?: 'public' | 'admin';
}

export function Pagination({
  currentPage = 1,
  totalPages,
  lastPage,
  pageSize,
  perPage,
  pageSizeOptions,
  perPageOptions,
  onPageChange,
  onPageSizeChange,
  onPerPageChange,
  maxVisible = 5,
  className = '',
  iconOnlyArrows = false,
  variant,
}: PaginationProps) {
  // Normalize aliases
  const effectiveTotalPages = totalPages ?? lastPage ?? 1;
  const effectivePageSize = pageSize ?? perPage ?? 10;
  const effectivePageSizeOptions =
    pageSizeOptions ?? perPageOptions ?? (variant === 'admin' ? [10, 25, 50, 100] : [10, 15, 20, 50, 100]);
  const handlePageSizeChange = onPageSizeChange ?? onPerPageChange;

  const isExplicitAdmin = variant === 'admin' || (totalPages !== undefined && lastPage === undefined);
  const isActuallyAdmin = variant ? variant === 'admin' : isExplicitAdmin;

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

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < effectiveTotalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  // Helper penyusun list nomor halaman
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (isActuallyAdmin) {
      if (effectiveTotalPages <= 7) {
        for (let i = 1; i <= effectiveTotalPages; i++) pages.push(i);
      } else {
        if (currentPage <= 3) {
          if (iconOnlyArrows) {
            pages.push(1, 2, 3, 4, '...', effectiveTotalPages - 1, effectiveTotalPages);
          } else {
            pages.push(1, 2, 3, 4, 5, '...', effectiveTotalPages);
          }
        } else if (currentPage >= effectiveTotalPages - 3) {
          pages.push(1, '...', effectiveTotalPages - 4, effectiveTotalPages - 3, effectiveTotalPages - 2, effectiveTotalPages - 1, effectiveTotalPages);
        } else {
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', effectiveTotalPages);
        }
      }
      return pages;
    }

    // Public style page numbers
    if (effectiveTotalPages <= maxVisible) {
      for (let i = 1; i <= effectiveTotalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(effectiveTotalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < effectiveTotalPages - 2) pages.push('...');
      pages.push(effectiveTotalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // ─────────────────────────────────────────────────────────────
  // 1. ADMIN VARIANT RENDER (100% Identik dengan Components/admin/Pagination)
  // ─────────────────────────────────────────────────────────────
  if (isActuallyAdmin) {
    return (
      <div className={`w-full pt-4 text-[12px] text-neu-600 ${className}`}>
        {/* Mobile View */}
        <div className="flex sm:hidden flex-col items-center gap-3">
          <div className="relative inline-flex items-center" ref={mobileDropdownRef}>
            <button
              type="button"
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] border border-neu-100 bg-white text-neu-800 hover:border-neu-300 transition-all shadow-2xs cursor-pointer min-w-[58px] justify-between text-[13px] font-medium"
            >
              <span>{effectivePageSize}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neu-500 stroke-[2]" />
            </button>

            {isMobileDropdownOpen && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-30 w-24 rounded-[10px] border border-neu-100 bg-white shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100">
                {effectivePageSizeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      if (handlePageSizeChange) handlePageSizeChange(opt);
                      setIsMobileDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-50 transition-colors cursor-pointer ${
                      opt === effectivePageSize ? 'font-bold text-pr-900 bg-pr-50' : 'text-neu-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

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
              disabled={currentPage >= effectiveTotalPages}
              className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-400 hover:text-neu-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer shrink-0"
              title="Halaman Selanjutnya"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Desktop View (3-column grid) */}
        <div className="hidden sm:grid grid-cols-3 items-center gap-4">
          <div className="flex items-center gap-3 justify-self-start">
            {iconOnlyArrows ? (
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage <= 1}
                className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-400 hover:text-neu-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                title="Sebelumnya"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-neu-500" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage <= 1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer text-[12px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-neu-500" />
                <span>Sebelumnya</span>
              </button>
            )}

            <div className="relative inline-flex items-center gap-2 text-[12px]" ref={dropdownRef}>
              <span className="text-neu-500">Lihat</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-800 hover:border-neu-200 transition-all shadow-2xs cursor-pointer min-w-[54px] justify-between text-[12px]"
                >
                  <span>{effectivePageSize}</span>
                  <ChevronDown className="w-3 h-3 text-neu-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute bottom-full mb-1 left-0 z-20 w-20 rounded-[10px] border border-neu-50 bg-white shadow-lg py-1">
                    {effectivePageSizeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          if (handlePageSizeChange) handlePageSizeChange(opt);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-50 ${
                          opt === effectivePageSize ? 'font-semibold text-pr-900 bg-gray-50' : 'text-neu-700'
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

          <div className="justify-self-end">
            {iconOnlyArrows ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage >= effectiveTotalPages}
                className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-400 hover:text-neu-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                title="Selanjutnya"
              >
                <ArrowRight className="w-3.5 h-3.5 text-neu-500" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage >= effectiveTotalPages}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer text-[12px]"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-3.5 h-3.5 text-neu-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. PUBLIC VARIANT RENDER (100% Identik dengan semula di Pencarian & Bookmark)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className={`w-full mt-6 pt-5 border-t border-neu-100 ${className}`}>
      {/* Mobile View */}
      <div className="flex sm:hidden flex-col items-center gap-3 w-full">
        {handlePageSizeChange && (
          <div className="relative inline-flex items-center gap-1.5 text-xs text-neu-500" ref={mobileDropdownRef}>
            <span>Lihat</span>
            <button
              type="button"
              onClick={() => setIsMobileDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-neu-100 rounded-lg text-xs font-semibold text-neu-800 hover:border-neu-300 shadow-2xs transition-all cursor-pointer min-w-[54px] justify-between"
            >
              <span>{effectivePageSize}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neu-400 transition-transform ${
                  isMobileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isMobileDropdownOpen && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-20 bg-white border border-neu-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {effectivePageSizeOptions.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      handlePageSizeChange(num);
                      setIsMobileDropdownOpen(false);
                    }}
                    className={`w-full py-1 text-center text-xs transition-colors cursor-pointer ${
                      effectivePageSize === num
                        ? 'bg-pr-50 text-pr-900 font-semibold'
                        : 'text-neu-700 hover:bg-neu-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

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
                onClick={() => onPageChange && onPageChange(pageNum)}
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center font-medium text-xs transition-colors cursor-pointer select-none shrink-0 ${
                  isActive
                    ? 'bg-pr-900 text-white font-bold shadow-2xs'
                    : 'text-neu-700 hover:bg-neu-50 bg-white border border-neu-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= effectiveTotalPages || effectiveTotalPages === 0}
            className="w-8 h-8 rounded-[8px] border border-neu-100 bg-white flex items-center justify-center text-neu-500 hover:text-neu-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer shrink-0"
            title="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex flex-wrap items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-neu-200 rounded-xl text-xs font-semibold text-neu-700 bg-white hover:bg-neu-50 hover:text-neu-900 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-neu-600" />
            <span>Sebelumnya</span>
          </button>

          {handlePageSizeChange && (
            <div ref={dropdownRef} className="relative flex items-center gap-1.5 text-xs text-neu-500">
              <span>Lihat</span>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-neu-200 rounded-lg text-xs font-semibold text-neu-700 hover:bg-neu-50 shadow-2xs transition-colors cursor-pointer"
              >
                <span>{effectivePageSize}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neu-500 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-10 bottom-[calc(100%+6px)] w-16 bg-white border border-neu-200 rounded-xl shadow-lg py-1 z-50">
                  {effectivePageSizeOptions.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        handlePageSizeChange(num);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full py-1 text-center text-xs transition-colors cursor-pointer ${
                        effectivePageSize === num
                          ? 'bg-pr-50 text-pr-900 font-semibold'
                          : 'text-neu-700 hover:bg-neu-50'
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

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => (
              <button
                key={index}
                type="button"
                onClick={() => typeof page === 'number' && onPageChange && onPageChange(page)}
                disabled={page === '...'}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  page === currentPage
                    ? 'bg-pr-900 text-white shadow-2xs'
                    : page === '...'
                    ? 'text-neu-400 cursor-default'
                    : 'text-neu-700 hover:bg-neu-100 hover:text-neu-900 bg-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage >= effectiveTotalPages || effectiveTotalPages === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-neu-200 rounded-xl text-xs font-semibold text-neu-700 bg-white hover:bg-neu-50 hover:text-neu-900 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4 text-neu-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

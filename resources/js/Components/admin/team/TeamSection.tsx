import React, { ReactNode } from 'react';
import { Pagination } from '@/Components/admin/Pagination';
import { TEAM_PAGINATION_PAGE_SIZE_OPTIONS } from '@/constants/team';

interface TeamSectionProps {
  title: string;
  children: ReactNode;
  currentPage: number;
  totalPages?: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  className?: string;
}

export function TeamSection({
  title,
  children,
  currentPage,
  totalPages = 1,
  pageSize,
  pageSizeOptions = TEAM_PAGINATION_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  className = '',
}: TeamSectionProps) {
  return (
    <section className={`flex flex-col gap-3 ${className}`}>
      {/* Label Judul Section */}
      <h3 className="font-sans text-[13px] sm:text-[14px] font-semibold text-neu-800 leading-snug">
        {title}
      </h3>

      {/* Konten (Empty State Card atau Tabel Data) */}
      <div className="w-full">{children}</div>

      {/* Pagination Bawah Section */}
      <div className="pt-1">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </section>
  );
}

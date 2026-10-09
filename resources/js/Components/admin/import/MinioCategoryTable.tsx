import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/Components/ui/table';
import { Pagination } from '@/Components/admin/Pagination';

export interface MinioCategory {
  id: string;
  name: string;
  count: number;
}

interface MinioCategoryTableProps {
  categories?: MinioCategory[];
  isLoading?: boolean;
  onSelectCategory: (category: MinioCategory) => void;
  onBack?: () => void;
}

export function MinioCategoryTable({
  categories = [],
  isLoading = false,
  onSelectCategory,
  onBack: _onBack,
}: MinioCategoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 3-State Sorting: Klik 1 (A-Z/Terendah) -> Klik 2 (Z-A/Tertinggi) -> Klik 3 (Reset)
  const [sortField, setSortField] = useState<'name' | 'count' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const handleSort = (field: 'name' | 'count') => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field: 'name' | 'count') => {
    if (sortField === field) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 transition-colors shrink-0" />;
  };

  // Sort categories
  const sortedCategories = useMemo(() => {
    if (!sortField || !sortDirection) {
      return categories;
    }
    return [...categories].sort((a, b) => {
      if (sortField === 'name') {
        const cmp = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? cmp : -cmp;
      } else {
        const cmp = a.count - b.count;
        return sortDirection === 'asc' ? cmp : -cmp;
      }
    });
  }, [categories, sortField, sortDirection]);

  // Hitung total halaman sesuai jumlah data yang ada
  const totalPages = Math.max(1, Math.ceil(sortedCategories.length / pageSize));

  // Pagination slice untuk dummy data
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedCategories.slice(startIndex, startIndex + pageSize);
  }, [sortedCategories, currentPage, pageSize]);

  return (
    <div className="w-full space-y-4">
      {/* Tabel Kategori MinIO (Sesuai Desain Tangkapan Layar 3 & Lampiran 2) */}
      <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-hidden">
        <Table className="w-full min-w-[500px] text-left border-collapse">
          {/* Colgroup untuk menjaga rasio kolom */}
          <colgroup>
            <col className="w-[65%]" />
            <col className="w-[35%]" />
          </colgroup>

          <TableHeader className="bg-neu-50 border-b border-neu-200">
            <TableRow className="border-b border-neu-200">
              <TableHead className="py-3.5 px-6">
                <div
                  onClick={() => handleSort('name')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer select-none text-neu-700 font-semibold text-[12px] uppercase tracking-wider hover:text-neu-900"
                >
                  <span className={sortField === 'name' ? 'text-pr-900 font-bold' : ''}>KATEGORI</span>
                  {renderSortIcon('name')}
                </div>
              </TableHead>
              <TableHead className="py-3.5 px-6 text-left">
                <div
                  onClick={() => handleSort('count')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer select-none text-neu-700 font-semibold text-[12px] uppercase tracking-wider hover:text-neu-900"
                >
                  <span className={sortField === 'count' ? 'text-pr-900 font-bold' : ''}>JUMLAH FILE OCR</span>
                  {renderSortIcon('count')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="py-8 text-center text-neu-500 text-[12px]">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-pr-900 border-t-transparent rounded-full animate-spin" />
                    <span>Memindai folder dari penyimpanan MinIO...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedCategories.map((cat, idx) => (
              <TableRow
                key={`${cat.id}-${idx}`}
                onClick={() => onSelectCategory(cat)}
                className="cursor-pointer hover:bg-neu-50/80 transition-colors border-b border-neu-100 last:border-0"
              >
                <TableCell className="py-3.5 px-6 font-normal text-neu-900 text-[12px]">
                  {cat.name}
                </TableCell>
                <TableCell className="py-3.5 px-6 font-normal text-neu-800 text-[12px] text-left">
                  {cat.count.toLocaleString('id-ID')}
                </TableCell>
              </TableRow>
            ))}

            {!isLoading && paginatedCategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="py-8 text-center text-neu-500 text-[12px]">
                  Tidak ada folder / dokumen OCR ditemukan di penyimpanan MinIO.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Komponen Pagination Responsif sesuai jumlah data */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={[10, 25, 50]}
        onPageChange={setCurrentPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
        iconOnlyArrows={true}
      />
    </div>
  );
}

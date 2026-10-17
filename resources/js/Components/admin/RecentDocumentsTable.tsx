import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { TablePagination } from '@/Components/admin/TablePagination';

export type DocumentStatus = 'Publik' | 'Draf';

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  status: DocumentStatus;
  uploadedAt?: string;
}

const DEFAULT_DOCUMENTS: DocumentItem[] = [
  { id: '1', title: 'UU no 2 tahun 2025', category: 'Undang Undang', status: 'Publik' },
  { id: '2', title: 'UU no 1 tahun 2005', category: 'Undang Undang', status: 'Draf' },
  { id: '3', title: 'UU no 12 tahun 1998', category: 'Undang Undang', status: 'Publik' },
  { id: '4', title: 'Perubahan kedua uu no 3 tahun 2020', category: 'Undang Undang', status: 'Publik' },
  { id: '5', title: 'Perubahan ke empat uu no 7 tahun 2017', category: 'Undang Undang', status: 'Draf' },
  { id: '6', title: 'PP no 15 tahun 2024', category: 'Peraturan Pemerintah', status: 'Publik' },
  { id: '7', title: 'Perpres no 8 tahun 2023', category: 'Peraturan Presiden', status: 'Publik' },
  { id: '8', title: 'Permenkeu no 20 tahun 2024', category: 'Peraturan Menteri', status: 'Publik' },
  { id: '9', title: 'Perda DKI no 5 tahun 2023', category: 'Peraturan Daerah', status: 'Publik' },
  { id: '10', title: 'UU no 11 tahun 2020', category: 'Undang Undang', status: 'Draf' },
  { id: '11', title: 'PP no 22 tahun 2021', category: 'Peraturan Pemerintah', status: 'Publik' },
  { id: '12', title: 'Perpres no 44 tahun 2022', category: 'Peraturan Presiden', status: 'Draf' },
];

interface RecentDocumentsTableProps {
  initialData?: DocumentItem[];
  className?: string;
}

export function RecentDocumentsTable({
  initialData = DEFAULT_DOCUMENTS,
  className = '',
}: RecentDocumentsTableProps) {
  // State sorting
  const [sortColumn, setSortColumn] = useState<'title' | 'category' | 'status' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // State pagination (4 baris per halaman, menghasilkan 3 halaman untuk 12 dummy data)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handleSort = (column: 'title' | 'category' | 'status') => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Logic pengurutan
  const sortedData = useMemo(() => {
    if (!sortColumn) return initialData;

    return [...initialData].sort((a, b) => {
      let comparison = 0;
      if (sortColumn === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortColumn === 'category') {
        comparison = a.category.localeCompare(b.category);
      } else if (sortColumn === 'status') {
        comparison = a.status.localeCompare(b.status);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [initialData, sortColumn, sortDirection]);

  // Data paginated
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const renderSortIcon = (column: 'title' | 'category' | 'status') => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 shrink-0 transition-colors" />;
  };

  const renderStatusBadge = (status: DocumentStatus) => {
    if (status === 'Publik') {
      return (
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[12px] font-medium leading-[16px] bg-suc-50 border border-suc-50 text-suc-900">
          Publik
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-[12px] font-medium leading-[16px] bg-neu-50 border border-neu-50 text-neu-900">
        Draf
      </span>
    );
  };

  return (
    <div
      className={`bg-white rounded-xl border border-neu-50 p-4 sm:p-[17px_27px] flex flex-col justify-between shadow-2xs ${className}`}
    >
      <div>
        {/* Title */}
        <h3 className="text-[16px] font-medium leading-[24px] text-neu-900 mb-3 tracking-tight">
          Dokumen Terbaru Diunggah
        </h3>

        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed text-left border-collapse min-w-[380px]">
            {/* Colgroup untuk mengunci lebar kolom agar judul & kolom tetap diam saat diurutkan */}
            <colgroup>
              <col className="w-[45%]" />
              <col className="w-[33%]" />
              <col className="w-[22%]" />
            </colgroup>

            {/* Header */}
            <thead>
              <tr className="bg-pr-50/60 rounded-t-xl select-none">
                <th
                  onClick={() => handleSort('title')}
                  className="py-2.5 px-3 text-[12px] font-medium text-neu-900 cursor-pointer group rounded-tl-xl transition-colors hover:bg-pr-50"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="truncate">Judul</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                      {renderSortIcon('title')}
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('category')}
                  className="py-2.5 px-3 text-[12px] font-medium text-neu-900 cursor-pointer group transition-colors hover:bg-pr-50"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="truncate">Kategori</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                      {renderSortIcon('category')}
                    </span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-2.5 px-3 text-[12px] font-medium text-neu-900 cursor-pointer group rounded-tr-xl transition-colors hover:bg-pr-50"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="truncate">Status</span>
                    <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                      {renderSortIcon('status')}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-neu-50 hover:bg-gray-50/50 transition-colors text-[12px] leading-[18px]"
                >
                  <td className="py-2.5 px-3 font-normal text-neu-900 truncate" title={item.title}>
                    {item.title}
                  </td>
                  <td className="py-2.5 px-3 font-normal text-neu-900 truncate">
                    {item.category}
                  </td>
                  <td className="py-2.5 px-3">
                    {renderStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer Sesuai Figma node 2258-37991 */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default RecentDocumentsTable;

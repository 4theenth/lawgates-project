import React, { useState, useMemo } from 'react';
import { Search, Folder, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/Components/ui/table';
import { Pagination } from '@/Components/admin/Pagination';
import { MinioCategory } from './MinioCategoryTable';

export interface MinioSubfolder {
  id: string;
  name: string;
  label: string;
  count: number;
}

interface MinioSubfolderTableProps {
  category: MinioCategory;
  subfolders?: MinioSubfolder[];
  onSelectSubfolder: (subfolder: MinioSubfolder) => void;
  onBack?: () => void;
}

export function MinioSubfolderTable({
  category,
  subfolders = [],
  onSelectSubfolder,
  onBack: _onBack,
}: MinioSubfolderTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState<'label' | 'count' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const filteredSubfolders = useMemo(() => {
    const list = subfolders.filter((sf) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        sf.name.toLowerCase().includes(q) ||
        sf.label.toLowerCase().includes(q)
      );
    });

    if (!sortField || !sortDirection) {
      return list;
    }

    return [...list].sort((a, b) => {
      if (sortField === 'label') {
        const cmp = a.label.localeCompare(b.label);
        return sortDirection === 'asc' ? cmp : -cmp;
      } else {
        const cmp = a.count - b.count;
        return sortDirection === 'asc' ? cmp : -cmp;
      }
    });
  }, [subfolders, searchQuery, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredSubfolders.length / pageSize));

  const paginatedSubfolders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSubfolders.slice(startIndex, startIndex + pageSize);
  }, [filteredSubfolders, currentPage, pageSize]);

  const handleSort = (field: 'label' | 'count') => {
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

  const renderSortIcon = (field: 'label' | 'count') => {
    if (sortField === field) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 transition-colors shrink-0" />;
  };

  return (
    <div className="w-full space-y-4">
      {/* Header Info Folder & Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-sans text-[13px] font-medium text-neu-600">
            Kategori: <strong className="text-neu-900 font-semibold">{category.name}</strong>
          </span>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-neu-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari folder daerah..."
            className="w-full pl-9 pr-4 py-2 border border-neu-200 rounded-[10px] text-[12px] text-neu-900 placeholder:text-neu-400 bg-white focus:outline-none focus:border-neu-400 focus:ring-1 focus:ring-neu-400 transition-all"
          />
        </div>
      </div>

      {/* Tabel Folder Daerah */}
      <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-hidden">
        <Table className="w-full min-w-[500px] text-left border-collapse">
          <colgroup>
            <col className="w-[65%]" />
            <col className="w-[35%]" />
          </colgroup>

          <TableHeader className="bg-neu-50 border-b border-neu-200">
            <TableRow className="border-b border-neu-200">
              <TableHead className="py-3.5 px-6">
                <div
                  onClick={() => handleSort('label')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer select-none text-neu-700 font-semibold text-[12px] uppercase tracking-wider hover:text-neu-900"
                >
                  <span className={sortField === 'label' ? 'text-pr-900 font-bold' : ''}>FOLDER DAERAH</span>
                  {renderSortIcon('label')}
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
            {paginatedSubfolders.map((sf, idx) => (
              <TableRow
                key={`${sf.id}-${idx}`}
                onClick={() => onSelectSubfolder(sf)}
                className="cursor-pointer hover:bg-neu-50/80 transition-colors border-b border-neu-100 last:border-0"
              >
                <TableCell className="py-3.5 px-6 font-medium text-neu-900 text-[12px]">
                  <div className="flex items-center gap-2.5">
                    <Folder className="w-4 h-4 text-pr-900 shrink-0 fill-pr-100" />
                    <span>{sf.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 px-6 font-normal text-neu-800 text-[12px] text-left">
                  {sf.count.toLocaleString('id-ID')} file
                </TableCell>
              </TableRow>
            ))}

            {paginatedSubfolders.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="py-8 text-center text-neu-500 text-[12px]">
                  Tidak ada folder daerah ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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

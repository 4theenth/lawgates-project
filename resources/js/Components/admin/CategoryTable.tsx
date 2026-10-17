import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react';
import { IconButton } from '@/Components/common';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/Components/ui/table';

export interface CategoryItem {
  id: string;
  kode?: string;
  kategori?: string;
  nama?: string;
  subjek?: string;
  deskripsi: string;
}

export type CategorySortColumn = 'kategori' | 'deskripsi' | 'nama' | 'subjek';
export type SortDirection = 'asc' | 'desc';

interface CategoryTableProps {
  categories?: CategoryItem[];
  items?: CategoryItem[];
  type?: 'kategori' | 'subjek';
  nameColumnLabel?: string;
  onEdit?: (item: CategoryItem) => void;
  onDelete?: (item: CategoryItem) => void;
  sortColumn?: CategorySortColumn | null;
  sortDirection?: SortDirection;
  onSort?: (column: CategorySortColumn) => void;
}

export function CategoryTable({
  categories,
  items,
  type = 'kategori',
  nameColumnLabel,
  onEdit,
  onDelete,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
}: CategoryTableProps) {
  const dataList = items || categories || [];
  const label = nameColumnLabel || (type === 'subjek' ? 'Subjek' : 'Kategori');
  const isNameSorted =
    sortColumn === 'kategori' || sortColumn === 'nama' || sortColumn === 'subjek';
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const renderSortIcon = (column: CategorySortColumn) => {
    const isSorted =
      column === 'deskripsi'
        ? sortColumn === 'deskripsi'
        : isNameSorted;

    if (isSorted) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3 h-3 text-pr-900" />
      ) : (
        <ArrowDown className="w-3 h-3 text-pr-900" />
      );
    }
    return <ArrowUpDown className="w-3 h-3 text-neu-400 group-hover:text-neu-600 transition-colors" />;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActiveActionId(null);
      }
    }

    if (activeActionId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeActionId]);

  return (
    <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-hidden transition-all duration-200">
      <Table className="w-full min-w-[550px] text-left border-collapse">
        {/* Table Header */}
        <TableHeader className="bg-neu-50">
          <TableRow className="border-b border-neu-200">
            <TableHead className="py-3 px-5 whitespace-nowrap rounded-tl-xl">
              <div
                onClick={() => onSort?.(type === 'subjek' ? 'nama' : 'kategori')}
                className="group inline-flex items-center gap-1 cursor-pointer text-neu-700"
              >
                <span className={isNameSorted ? 'text-pr-900 font-bold' : ''}>
                  {label}
                </span>
                {renderSortIcon(type === 'subjek' ? 'nama' : 'kategori')}
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div
                onClick={() => onSort?.('deskripsi')}
                className="group inline-flex items-center gap-1 cursor-pointer text-neu-700"
              >
                <span className={sortColumn === 'deskripsi' ? 'text-pr-900 font-bold' : ''}>
                  Deskripsi
                </span>
                {renderSortIcon('deskripsi')}
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 text-right whitespace-nowrap rounded-tr-xl">
              <span>Aksi</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {dataList.map((item, index) => {
            const isActionOpen = activeActionId === item.id;
            const isNearBottom = index >= dataList.length - 2 && dataList.length >= 3;
            const itemName =
              item.nama ||
              (type === 'subjek' ? item.subjek : item.kategori) ||
              item.kategori ||
              '';

            return (
              <TableRow key={item.id}>
                {/* Nama Kategori / Subjek */}
                <TableCell className="py-3.5 px-5 font-normal text-neu-900 whitespace-nowrap">
                  {itemName}
                </TableCell>

                {/* Deskripsi */}
                <TableCell className="py-3.5 px-5 font-normal text-neu-600">
                  <span className="line-clamp-1" title={item.deskripsi}>
                    {item.deskripsi}
                  </span>
                </TableCell>

                {/* Aksi */}
                <TableCell className="py-3.5 px-5 text-right whitespace-nowrap relative">
                  <IconButton
                    icon={<MoreVertical className="w-4 h-4 text-neu-600" />}
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setActiveActionId(isActionOpen ? null : item.id)
                    }
                    title={`Aksi ${label.toLowerCase()}`}
                  />

                  {/* Popover Aksi */}
                  {isActionOpen && (
                    <div
                      ref={actionMenuRef}
                      className={`absolute right-5 ${
                        isNearBottom ? 'bottom-10' : 'top-11'
                      } z-30 w-36 bg-white rounded-xl shadow-xl border border-neu-100 py-1.5 text-left animate-in fade-in zoom-in-95 duration-150`}
                    >
                      <div className="px-3 py-1 text-[12px] font-semibold text-neu-400 uppercase tracking-wider">
                        Aksi
                      </div>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveActionId(null);
                          if (onEdit) onEdit(item);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-neu-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-neu-500" />
                        <span>Edit {label}</span>
                      </button>

                      {/* Hapus */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveActionId(null);
                          if (onDelete) onDelete(item);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-dan-800 hover:bg-dan-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-dan-800" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

// Alias untuk semantic consistency
export const ClassificationTable = CategoryTable;

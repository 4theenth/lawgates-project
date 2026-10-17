import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/Components/ui/table';

export interface DraftItem {
  id: string;
  nama_draft: string;
  autor: string;
  jumlah_file: number;
  created_at?: string;
}

export type DraftSortColumn = 'nama_draft' | 'autor' | 'jumlah_file';
export type SortDirection = 'asc' | 'desc';

interface DraftTableProps {
  drafts: DraftItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  sortColumn?: DraftSortColumn | null;
  sortDirection?: SortDirection;
  onSort?: (column: DraftSortColumn) => void;
  onEdit?: (draft: DraftItem) => void;
  onPublish?: (draft: DraftItem) => void;
  onDelete?: (draft: DraftItem) => void;
}

export function DraftTable({
  drafts,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
  onEdit,
  onPublish: _onPublish,
  onDelete,
}: DraftTableProps) {
  const [actionMenuState, setActionMenuState] = useState<{
    id: string;
    draft: DraftItem;
    top: number;
    right: number;
  } | null>(null);

  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const isAllSelected = drafts.length > 0 && drafts.every((d) => selectedIds.includes(d.id));
  const isMultipleSelected = selectedIds.length > 1;

  // Tutup menu aksi jika terjadi seleksi lebih dari 1
  useEffect(() => {
    if (selectedIds.length > 1 && actionMenuState) {
      setActionMenuState(null);
    }
  }, [selectedIds.length, actionMenuState]);

  const renderSortIcon = (column: DraftSortColumn) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 transition-colors shrink-0" />;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActionMenuState(null);
      }
    }

    function handleScrollOrResize() {
      setActionMenuState(null);
    }

    if (actionMenuState) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [actionMenuState]);

  return (
    <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-hidden transition-all duration-200">
      <Table className="w-full min-w-[800px] table-fixed text-left border-collapse">
        <colgroup>
          <col className="w-[5%]" />
          <col className="w-[45%]" />
          <col className="w-[23%]" />
          <col className="w-[20%]" />
          <col className="w-[7%]" />
        </colgroup>

        {/* Table Header (Sesuai spesifikasi admin: rounded-tl-xl, rounded-tr-xl, bg-neu-50) */}
        <TableHeader className="bg-neu-50">
          <TableRow className="border-b border-neu-200 select-none">
            <TableHead className="py-3 px-4 text-center rounded-tl-xl">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                className="w-4 h-4 rounded border-neu-300 text-pr-900 focus:ring-pr-900 cursor-pointer"
              />
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap overflow-hidden">
              <div
                onClick={() => onSort?.('nama_draft')}
                className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-neu-900 transition-colors"
              >
                <span className={sortColumn === 'nama_draft' ? 'text-pr-900 font-semibold' : ''}>
                  Nama Draft
                </span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('nama_draft')}
                </div>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap overflow-hidden">
              <div
                onClick={() => onSort?.('autor')}
                className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-neu-900 transition-colors"
              >
                <span className={sortColumn === 'autor' ? 'text-pr-900 font-semibold' : ''}>
                  Autor
                </span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('autor')}
                </div>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap overflow-hidden">
              <div
                onClick={() => onSort?.('jumlah_file')}
                className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-neu-900 transition-colors"
              >
                <span className={sortColumn === 'jumlah_file' ? 'text-pr-900 font-semibold' : ''}>
                  Jumlah File OCR
                </span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('jumlah_file')}
                </div>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 text-right whitespace-nowrap overflow-hidden rounded-tr-xl">
              <span>Aksi</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {drafts.map((draft) => {
            const isChecked = selectedIds.includes(draft.id);
            // Menu aksi individu hanya mati saat mode seleksi banyak (bulk) aktif
            const isActionDisabled = isMultipleSelected;

            return (
              <TableRow
                key={draft.id}
                className={isChecked ? 'bg-pr-50/20' : ''}
              >
                {/* Checkbox */}
                <TableCell className="py-3.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleSelect(draft.id)}
                    className="w-4 h-4 rounded border-neu-300 text-pr-900 focus:ring-pr-900 cursor-pointer"
                  />
                </TableCell>

                {/* Nama Draft */}
                <TableCell className="py-3.5 px-5 font-medium text-neu-900 truncate">
                  {draft.nama_draft}
                </TableCell>

                {/* Autor */}
                <TableCell className="py-3.5 px-5 text-neu-600 truncate">
                  {draft.autor}
                </TableCell>

                {/* Jumlah File OCR */}
                <TableCell className="py-3.5 px-5 text-neu-600">
                  {draft.jumlah_file}
                </TableCell>

                {/* Aksi Dropdown */}
                <TableCell className="py-3.5 px-5 text-right whitespace-nowrap">
                  <button
                    type="button"
                    disabled={isActionDisabled}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isActionDisabled) return;
                      if (actionMenuState?.id === draft.id) {
                        setActionMenuState(null);
                      } else {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setActionMenuState({
                          id: draft.id,
                          draft,
                          top: rect.bottom + 4,
                          right: Math.max(16, window.innerWidth - rect.right),
                        });
                      }
                    }}
                    className={`p-1 rounded-lg transition-colors inline-flex items-center justify-center ${
                      isActionDisabled
                        ? 'text-neu-400 cursor-not-allowed disabled:cursor-not-allowed'
                        : 'text-neu-600 hover:text-neu-900 hover:bg-neu-100 cursor-pointer'
                    }`}
                    title={isActionDisabled ? undefined : 'Menu Aksi'}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Render Dropdown Aksi Menggunakan Portal (Sesuai Desain Figma Node #2258:46049) */}
      {actionMenuState &&
        createPortal(
          <div
            ref={actionMenuRef}
            style={{
              position: 'fixed',
              top: `${actionMenuState.top}px`,
              right: `${actionMenuState.right}px`,
              zIndex: 9999,
            }}
            className="w-[138px] bg-white rounded-[10px] shadow-[0px_1px_6.4px_0px_rgba(0,0,0,0.11)] border border-[#E9E9E9] py-[5px] px-[12px] text-left animate-in fade-in zoom-in-95 duration-100 flex flex-col"
          >
            {/* Header: Aksi (Body Small/Medium, 12px, #000000) */}
            <div className="py-[3px] text-[12px] font-medium text-black leading-[18px]">
              Aksi
            </div>
            {/* Garis Pemisah (Neutral / 50: #E9E9E9) */}
            <div className="border-b border-[#E9E9E9] -mx-[12px] my-[4px]" />

            {/* Edit Data */}
            <button
              type="button"
              onClick={() => {
                const target = actionMenuState.draft;
                setActionMenuState(null);
                onEdit?.(target);
              }}
              className="w-full flex items-center gap-[8px] py-[3px] text-[12px] font-normal text-[#373737] hover:text-black transition-colors cursor-pointer text-left leading-[18px]"
            >
              <Pencil className="w-[14px] h-[14px] text-[#373737] shrink-0" />
              <span>Edit Data</span>
            </button>

            {/* Garis Pemisah (Neutral / 50: #E9E9E9) */}
            <div className="border-b border-[#E9E9E9] -mx-[12px] my-[4px]" />

            {/* Hapus */}
            <button
              type="button"
              onClick={() => {
                const target = actionMenuState.draft;
                setActionMenuState(null);
                onDelete?.(target);
              }}
              className="w-full flex items-center gap-[8px] py-[3px] text-[12px] font-normal text-[#B91C1C] hover:text-red-700 transition-colors cursor-pointer text-left leading-[18px]"
            >
              <Trash2 className="w-[14px] h-[14px] text-[#B91C1C] shrink-0" />
              <span>Hapus</span>
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

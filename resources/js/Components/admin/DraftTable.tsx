import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react';

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
  onPublish,
  onDelete,
}: DraftTableProps) {
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const isAllSelected = drafts.length > 0 && drafts.every((d) => selectedIds.includes(d.id));
  const isMultipleSelected = selectedIds.length > 1;
  const isOnlyOneSelected = selectedIds.length === 1;

  // Tutup menu aksi jika terjadi seleksi lebih dari 1
  useEffect(() => {
    if (selectedIds.length > 1 && activeActionId) {
      setActiveActionId(null);
    }
  }, [selectedIds.length, activeActionId]);

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
    <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-visible transition-all duration-200">
      <div className="overflow-x-auto sm:overflow-visible">
        <table className="w-full table-fixed text-left border-collapse">
          <colgroup>
            <col className="w-[5%]" />
            <col className="w-[45%]" />
            <col className="w-[23%]" />
            <col className="w-[20%]" />
            <col className="w-[7%]" />
          </colgroup>

          {/* Table Header (Sesuai spesifikasi admin: rounded-tl-xl, rounded-tr-xl, bg-neu-50) */}
          <thead>
            <tr className="bg-neu-50 border-b border-neu-200 text-[12px] font-semibold text-neu-600 uppercase tracking-wider select-none">
              {/* Table Header (Sesuai spesifikasi: checkbox hanya nyala jika memilih semua) */}
              <th className="py-3 px-4 text-center rounded-tl-xl">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-neu-300 text-pr-900 focus:ring-pr-900 cursor-pointer"
                />
              </th>
              <th className="py-3 px-5 whitespace-nowrap overflow-hidden">
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
              </th>
              <th className="py-3 px-5 whitespace-nowrap overflow-hidden">
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
              </th>
              <th className="py-3 px-5 whitespace-nowrap overflow-hidden">
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
              </th>
              <th className="py-3 px-5 text-right whitespace-nowrap overflow-hidden rounded-tr-xl">
                <span>Aksi</span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-neu-50 text-[13px] text-neu-800">
            {drafts.map((draft) => {
              const isChecked = selectedIds.includes(draft.id);
              // Menu aksi mati jika select lebih dari 1 ATAU jika ada 1 row lain yang di-select
              const isActionDisabled = isMultipleSelected || (isOnlyOneSelected && !isChecked);

              return (
                <tr
                  key={draft.id}
                  className={`hover:bg-neu-50/60 transition-colors ${
                    isChecked ? 'bg-pr-50/20' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleSelect(draft.id)}
                      className="w-4 h-4 rounded border-neu-300 text-pr-900 focus:ring-pr-900 cursor-pointer"
                    />
                  </td>

                  {/* Nama Draft */}
                  <td className="py-3.5 px-5 font-medium text-neu-900 truncate">
                    {draft.nama_draft}
                  </td>

                  {/* Autor */}
                  <td className="py-3.5 px-5 text-neu-600 truncate">
                    {draft.autor}
                  </td>

                  {/* Jumlah File OCR */}
                  <td className="py-3.5 px-5 text-neu-600">
                    {draft.jumlah_file}
                  </td>

                  {/* Aksi Dropdown (Sesuai Gambar Figma 3: Aksi, Edit Data, Hapus) */}
                  <td className="py-3.5 px-5 text-right relative overflow-visible">
                    <button
                      type="button"
                      disabled={isActionDisabled}
                      onClick={() => {
                        if (isActionDisabled) return;
                        if (selectedIds.length === 0) {
                          onToggleSelect(draft.id);
                        }
                        setActiveActionId(activeActionId === draft.id ? null : draft.id);
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

                    {activeActionId === draft.id && (
                      <div
                        ref={actionMenuRef}
                        className="absolute right-5 top-10 w-36 bg-white rounded-xl shadow-lg border border-neu-100 py-1.5 z-50 text-left animate-in fade-in zoom-in-95 duration-100"
                      >
                        <div className="px-3.5 py-1 text-[12px] font-semibold text-neu-900">
                          Aksi
                        </div>
                        <div className="border-b border-neu-100 my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            onEdit?.(draft);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-neu-700 hover:bg-neu-50 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5 text-neu-500" />
                          <span>Edit Data</span>
                        </button>

                        <div className="border-t border-neu-100 my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            onDelete?.(draft);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-dan-800 hover:bg-dan-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-dan-800" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

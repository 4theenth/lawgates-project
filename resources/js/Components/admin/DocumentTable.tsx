import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, Pencil, CircleChevronDown, Trash2 } from 'lucide-react';
import { StatusBadge, IconButton } from '@/Components/common';

export interface DokumenHukumItem {
  id: string;
  kategori: string;
  judul: string;
  status: 'berlaku' | 'tidak_berlaku' | 'draft';
  tgl_ditetapkan: string;
}

export type SortColumn = 'kategori' | 'judul' | 'status' | 'tgl_ditetapkan';
export type SortDirection = 'asc' | 'desc';

interface DocumentTableProps {
  documents: DokumenHukumItem[];
  onEdit?: (doc: DokumenHukumItem) => void;
  onToggleStatus?: (doc: DokumenHukumItem) => void;
  onDelete?: (doc: DokumenHukumItem) => void;
  sortColumn?: SortColumn | null;
  sortDirection?: SortDirection;
  onSort?: (column: SortColumn) => void;
  isDetailLoading?: boolean;
}

export function DocumentTable({
  documents,
  onEdit,
  onToggleStatus,
  onDelete,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
  isDetailLoading = false,
}: DocumentTableProps) {
  // State id dokumen yang menu aksinya sedang terbuka
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  // Helper render sort icon
  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 transition-colors shrink-0" />;
  };

  // Tutup popup aksi jika klik di luar
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
          {/* Colgroup untuk mengunci lebar kolom agar judul & tabel tidak bergeser saat diurutkan */}
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[42%]" />
            <col className="w-[16%]" />
            <col className="w-[16%]" />
            <col className="w-[8%]" />
          </colgroup>

          {/* Table Header (Sesuai spesifikasi admin: rounded-tl-xl, rounded-tr-xl, bg-neu-50) */}
          <thead>
            <tr className="bg-neu-50 border-b border-neu-200 text-[12px] font-semibold text-neu-600 uppercase tracking-wider select-none">
              <th className="py-3 px-5 whitespace-nowrap overflow-hidden rounded-tl-xl">
                <div
                  onClick={() => onSort?.('kategori')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'kategori' ? 'text-pr-900 font-semibold' : ''}>Kategori</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                    {renderSortIcon('kategori')}
                  </div>
                </div>
              </th>
              <th className="py-3 px-5 whitespace-nowrap overflow-hidden">
                <div
                  onClick={() => onSort?.('judul')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'judul' ? 'text-pr-900 font-semibold' : ''}>Judul</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                    {renderSortIcon('judul')}
                  </div>
                </div>
              </th>
              <th className="py-3 px-5 whitespace-nowrap overflow-hidden">
                <div
                  onClick={() => onSort?.('status')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'status' ? 'text-pr-900 font-semibold' : ''}>Status Hukum</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                    {renderSortIcon('status')}
                  </div>
                </div>
              </th>
              <th className="py-3 px-5 whitespace-nowrap overflow-hidden">
                <div
                  onClick={() => onSort?.('tgl_ditetapkan')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'tgl_ditetapkan' ? 'text-pr-900 font-semibold' : ''}>Tgl Ditetapkan</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                    {renderSortIcon('tgl_ditetapkan')}
                  </div>
                </div>
              </th>
              <th className="py-3 px-5 text-right whitespace-nowrap overflow-hidden rounded-tr-xl">
                <span>Aksi</span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-neu-50 text-[12px] text-neu-800">
            {documents.map((doc, index) => {
              const isActionOpen = activeActionId === doc.id;
              // Buka ke atas jika baris berada di bagian bawah tabel agar tidak terpotong
              const isNearBottom = index >= documents.length - 2 && documents.length >= 3;

              return (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Kategori */}
                  <td className="py-3.5 px-5 font-normal text-neu-700 truncate" title={doc.kategori}>
                    {doc.kategori}
                  </td>

                  {/* Judul */}
                  <td className="py-3.5 px-5 font-normal text-neu-900 truncate">
                    <span className="truncate block" title={doc.judul}>
                      {doc.judul}
                    </span>
                  </td>

                  {/* Status Hukum (Pill Badge Menggunakan Komponen Reusable Common) */}
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <StatusBadge status={doc.status} />
                  </td>

                  {/* Tgl Ditetapkan */}
                  <td className="py-3.5 px-5 text-neu-600 whitespace-nowrap">
                    {doc.tgl_ditetapkan}
                  </td>

                  {/* Aksi Button (Tiga Titik) & Overlay Menu */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap relative">
                    <IconButton
                      icon={<MoreVertical className="w-4 h-4 text-neu-600" />}
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setActiveActionId(isActionOpen ? null : doc.id)
                      }
                      title="Aksi dokumen"
                    />

                    {/* Popover Aksi (Sesuai Gambar 2: Garis dibawah Aksi dan diatas Hapus) */}
                    {isActionOpen && (
                      <div
                        ref={actionMenuRef}
                        className={`absolute right-5 ${
                          isNearBottom ? 'bottom-10' : 'top-11'
                        } z-30 w-40 bg-white rounded-xl shadow-xl border border-neu-100 py-1 text-left animate-in fade-in zoom-in-95 duration-150`}
                      >
                        {/* Header Aksi */}
                        <div className="px-4 pt-2.5 pb-2 text-[14px] font-semibold text-neu-900">
                          Aksi
                        </div>

                        {/* Garis dibawah Aksi */}
                        <div className="border-b border-neu-100 mb-1" />

                        {/* Edit Data */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onEdit) onEdit(doc);
                          }}
                          disabled={isDetailLoading}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-neu-800 hover:bg-neu-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Pencil className="w-4 h-4 text-neu-600 stroke-[1.75]" />
                          <span>{isDetailLoading && activeActionId === doc.id ? 'Memuat...' : 'Edit Data'}</span>
                        </button>

                        {/* Edit Status */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onToggleStatus) onToggleStatus(doc);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-neu-800 hover:bg-neu-50 transition-colors cursor-pointer"
                        >
                          <CircleChevronDown className="w-4 h-4 text-neu-600 stroke-[1.75]" />
                          <span>Edit Status</span>
                        </button>

                        {/* Garis diatas Hapus */}
                        <div className="border-t border-neu-100 my-1" />

                        {/* Hapus */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onDelete) onDelete(doc);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-dan-800 hover:bg-dan-50 transition-colors cursor-pointer font-medium"
                        >
                          <Trash2 className="w-4 h-4 text-dan-800 stroke-[1.75]" />
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

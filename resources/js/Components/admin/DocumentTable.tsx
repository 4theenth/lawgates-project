import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, Pencil, CircleChevronDown, Trash2, Sparkles } from 'lucide-react';
import { StatusBadge } from '@/Components/common';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/Components/ui/table';

export interface DokumenHukumItem {
  id: string;
  raw_id?: number;
  kategori: string;
  judul: string;
  subjek?: string | null;
  status: 'berlaku' | 'tidak_berlaku' | 'draft';
  tgl_ditetapkan: string;
  author?: string;
  real_status?: string;
  is_embedded?: boolean;
  total_pasal?: number;
  embedded_pasal?: number;
}

export type SortColumn = 'kategori' | 'judul' | 'status' | 'tgl_ditetapkan' | 'author';
export type SortDirection = 'asc' | 'desc';

interface DocumentTableProps {
  documents: DokumenHukumItem[];
  onEdit?: (doc: DokumenHukumItem) => void;
  onToggleStatus?: (doc: DokumenHukumItem) => void;
  onDelete?: (doc: DokumenHukumItem) => void;
  onEmbed?: (doc: DokumenHukumItem) => void;
  isEmbeddingLoading?: boolean;
  sortColumn?: SortColumn | null;
  sortDirection?: SortDirection;
  onSort?: (column: SortColumn) => void;
  isDetailLoading?: boolean;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
  onSelectAll?: () => void;
}

export function DocumentTable({
  documents,
  onEdit,
  onToggleStatus,
  onDelete,
  onEmbed,
  isEmbeddingLoading = false,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
  isDetailLoading = false,
  selectedIds = [],
  onToggleSelect,
  onSelectAll,
}: DocumentTableProps) {
  // State id dokumen yang menu aksinya sedang terbuka dengan koordinat trigger
  const [actionMenuState, setActionMenuState] = useState<{
    id: string;
    doc: DokumenHukumItem;
    top: number;
    right: number;
  } | null>(null);

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

  // Tutup popup aksi jika klik di luar atau saat window di-scroll/resize
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

  const isAllSelected = documents.length > 0 && selectedIds.length === documents.length;

  return (
    <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-hidden transition-all duration-200 relative">
      <div className="w-full overflow-x-auto custom-thin-scrollbar">
        <Table className="w-full min-w-[1150px] table-fixed text-left border-collapse">
          {/* Colgroup untuk mengunci proporsi kolom (Checkbox, Kategori, Judul, Subjek, Status, Tgl Ditetapkan, Author, Aksi) */}
          <colgroup>
            <col className="w-[4%] min-w-[42px]" />
            <col className="w-[14%] min-w-[130px]" />
            <col className="w-[24%] min-w-[250px]" />
            <col className="w-[15%] min-w-[160px]" />
            <col className="w-[12%] min-w-[120px]" />
            <col className="w-[12%] min-w-[110px]" />
            <col className="w-[11%] min-w-[110px]" />
            <col className="w-[8%] min-w-[70px]" />
          </colgroup>

        {/* Table Header (Sesuai spesifikasi admin Figma: bg-neu-50, border-b border-neu-200) */}
        <TableHeader className="bg-neu-50">
          <TableRow className="border-b border-neu-200">
            {/* Checkbox Pilih Semua */}
            <TableHead className="py-3 px-3 text-center whitespace-nowrap rounded-tl-xl w-[42px]">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={() => onSelectAll?.()}
                className="w-4 h-4 rounded border-neu-300 text-pr-900 focus:ring-pr-900/10 cursor-pointer accent-pr-900"
                title="Pilih semua di halaman ini"
              />
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div
                onClick={() => onSort?.('kategori')}
                className="group inline-flex items-center gap-1.5 cursor-pointer text-neu-700"
              >
                <span className={sortColumn === 'kategori' ? 'text-pr-900 font-semibold' : ''}>Kategori</span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('kategori')}
                </div>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div
                onClick={() => onSort?.('judul')}
                className="group inline-flex items-center gap-1.5 cursor-pointer text-neu-700"
              >
                <span className={sortColumn === 'judul' ? 'text-pr-900 font-semibold' : ''}>Judul</span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('judul')}
                </div>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div className="group inline-flex items-center gap-1.5 text-neu-700">
                <span>Subjek</span>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div
                onClick={() => onSort?.('status')}
                className="group inline-flex items-center gap-1.5 cursor-pointer text-neu-700"
              >
                <span className={sortColumn === 'status' ? 'text-pr-900 font-semibold' : ''}>Status Hukum</span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('status')}
                </div>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div
                onClick={() => onSort?.('tgl_ditetapkan')}
                className="group inline-flex items-center gap-1.5 cursor-pointer text-neu-700"
              >
                <span className={sortColumn === 'tgl_ditetapkan' ? 'text-pr-900 font-semibold' : ''}>Tgl Ditetapkan</span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('tgl_ditetapkan')}
                </div>
              </div>
            </TableHead>
            {/* Kolom Author Sesuai Kebutuhan PM */}
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div
                onClick={() => onSort?.('author')}
                className="group inline-flex items-center gap-1.5 cursor-pointer text-neu-700"
              >
                <span className={sortColumn === 'author' ? 'text-pr-900 font-semibold' : ''}>Author</span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('author')}
                </div>
              </div>
            </TableHead>
            <TableHead className="py-3 px-5 text-right whitespace-nowrap rounded-tr-xl sticky right-0 bg-neu-50 z-10 border-l border-neu-200 shadow-[-4px_0_12px_rgba(0,0,0,0.03)]">
              <span>Aksi</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body (Tinggi dinamis sesuai panjang data tanpa dipaksa min-h) */}
        <TableBody>
          {documents.map((doc, index) => {
            const authorName = doc.author || 'Sistem';

            return (
              <TableRow
                key={doc.id}
                className={`hover:bg-neu-50/50 transition-colors border-b border-neu-100 last:border-0 ${
                  selectedIds?.includes(doc.id) ? 'bg-pr-50/20' : ''
                }`}
              >
                {/* Checkbox Baris */}
                <TableCell className="py-3.5 px-3 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={Boolean(selectedIds?.includes(doc.id))}
                    onChange={() => onToggleSelect?.(doc.id)}
                    className="w-4 h-4 rounded border-neu-300 text-pr-900 focus:ring-pr-900/10 cursor-pointer accent-pr-900"
                    title={`Pilih ${doc.judul}`}
                  />
                </TableCell>

                {/* Kategori */}
                <TableCell className="py-3.5 px-5 font-normal text-neu-700 truncate" title={doc.kategori}>
                  {doc.kategori}
                </TableCell>

                {/* Judul & Status Embedding */}
                <TableCell className="py-3.5 px-5 font-normal text-neu-900 truncate">
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate block flex-1" title={doc.judul}>
                      {doc.judul}
                    </span>
                    {doc.is_embedded ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 shrink-0" title="Vektor AI Siap">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>AI Ready</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 shrink-0" title="Belum memiliki vektor AI">
                        <span>Belum Embed</span>
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Subjek */}
                <TableCell className="py-3.5 px-5 text-neu-600 truncate" title={doc.subjek || '-'}>
                  <span className="truncate block">
                    {doc.subjek || '-'}
                  </span>
                </TableCell>

                {/* Status Hukum (Pill Badge Menggunakan Komponen Reusable Common) */}
                <TableCell className="py-3.5 px-5 whitespace-nowrap">
                  <StatusBadge status={doc.status} />
                </TableCell>

                {/* Tgl Ditetapkan */}
                <TableCell className="py-3.5 px-5 text-neu-600 whitespace-nowrap">
                  {doc.tgl_ditetapkan}
                </TableCell>

                {/* Author (Kolom Tambahan PM) */}
                <TableCell className="py-3.5 px-5 text-neu-700 whitespace-nowrap" title={authorName}>
                  {authorName}
                </TableCell>

                {/* Aksi Button (Tiga Titik) */}
                <TableCell className="py-3.5 px-5 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-[#F8FAFC] z-10 border-l border-neu-100 shadow-[-4px_0_12px_rgba(0,0,0,0.03)] transition-colors">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (actionMenuState?.id === doc.id) {
                        setActionMenuState(null);
                      } else {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setActionMenuState({
                          id: doc.id,
                          doc,
                          top: rect.bottom + 4,
                          right: Math.max(16, window.innerWidth - rect.right),
                        });
                      }
                    }}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-neu-100 text-neu-600 transition-colors cursor-pointer"
                    title="Aksi dokumen"
                  >
                    <MoreVertical className="w-4 h-4 shrink-0" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>

      {/* Render Dropdown Aksi Menggunakan Portal ke document.body (Sesuai Desain Figma Node #2258:43749) */}
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
            className="w-[144px] bg-white rounded-[10px] shadow-[0px_1px_6.4px_0px_rgba(0,0,0,0.11)] border border-[#E9E9E9] py-[5px] px-[12px] text-left animate-in fade-in zoom-in-95 duration-100 flex flex-col"
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
                const target = actionMenuState.doc;
                setActionMenuState(null);
                onEdit?.(target);
              }}
              disabled={isDetailLoading}
              className="w-full flex items-center gap-[8px] py-[3px] text-[12px] font-normal text-[#373737] hover:text-black transition-colors cursor-pointer text-left leading-[18px] disabled:opacity-50"
            >
              <Pencil className="w-[14px] h-[14px] text-[#373737] shrink-0" />
              <span>{isDetailLoading ? 'Memuat...' : 'Edit Data'}</span>
            </button>

            {/* Edit Status */}
            <button
              type="button"
              onClick={() => {
                const target = actionMenuState.doc;
                setActionMenuState(null);
                onToggleStatus?.(target);
              }}
              className="w-full flex items-center gap-[8px] py-[3px] text-[12px] font-normal text-[#373737] hover:text-black transition-colors cursor-pointer text-left leading-[18px]"
            >
              <CircleChevronDown className="w-[14px] h-[14px] text-[#373737] shrink-0" />
              <span>Edit Status</span>
            </button>

            {/* Embed AI (Sesuai masukan admin: opsi embedding langsung di baris aksi) */}
            <button
              type="button"
              onClick={() => {
                const target = actionMenuState.doc;
                setActionMenuState(null);
                onEmbed?.(target);
              }}
              disabled={isEmbeddingLoading}
              className="w-full flex items-center gap-[8px] py-[3px] text-[12px] font-normal text-[#373737] hover:text-black transition-colors cursor-pointer text-left leading-[18px] disabled:opacity-50"
            >
              <Sparkles className="w-[14px] h-[14px] text-emerald-600 shrink-0" />
              <span>{actionMenuState.doc.is_embedded ? 'Embed Ulang AI' : 'Embed AI'}</span>
            </button>

            {/* Garis Pemisah (Neutral / 50: #E9E9E9) */}
            <div className="border-b border-[#E9E9E9] -mx-[12px] my-[4px]" />

            {/* Hapus */}
            <button
              type="button"
              onClick={() => {
                const target = actionMenuState.doc;
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

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical, ArrowUpDown, ArrowUp, ArrowDown, Pencil, CircleChevronDown, Trash2, Eye, FileText } from 'lucide-react';
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
  kategori: string;
  judul: string;
  nomor?: string | null;
  tahun?: number | null;
  instansi?: string | null;
  subjek?: string | null;
  status: 'berlaku' | 'tidak_berlaku' | 'draft';
  tgl_ditetapkan: string;
  author?: string;
  editor?: string;
  real_status?: string;
  has_pdf?: boolean;
  /** Full tanggal disertai jam pembaruan terakhir dalam WIB, mis. "29 Oktober 2026, 14:33 WIB". */
  updated_at_label?: string;
}

export type SortColumn =
  | 'kategori'
  | 'judul'
  | 'status'
  | 'tgl_ditetapkan'
  | 'author'
  | 'updated_at';
export type SortDirection = 'asc' | 'desc';

interface DocumentTableProps {
  documents: DokumenHukumItem[];
  onPreview?: (doc: DokumenHukumItem) => void;
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
  onPreview,
  onEdit,
  onToggleStatus,
  onDelete,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
  isDetailLoading = false,
}: DocumentTableProps) {
  // State id dokumen yang menu aksinya sedang terbuka dengan koordinat trigger
  const [actionMenuState, setActionMenuState] = useState<{
    id: string;
    doc: DokumenHukumItem;
    top: number;
    right: number;
  } | null>(null);

  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Indikator arah geser tabel: bayangan tepi kiri & kanan hanya muncul saat masih ada kolom tersembunyi
  const [scrollShadows, setScrollShadows] = useState({
    left: false,
    right: false,
  });

  const updateScrollShadows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setScrollShadows({
      left: el.scrollLeft > 2,
      right: maxScrollLeft - el.scrollLeft > 2,
    });
  }, []);

  useEffect(() => {
    updateScrollShadows();

    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollShadows, { passive: true });
    window.addEventListener('resize', updateScrollShadows);
    const observer = new ResizeObserver(updateScrollShadows);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScrollShadows);
      window.removeEventListener('resize', updateScrollShadows);
      observer.disconnect();
    };
  }, [updateScrollShadows, documents.length]);

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

  return (
    <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-hidden transition-all duration-200 relative">
        <Table
          containerRef={scrollContainerRef}
          containerClassName="custom-thin-scrollbar table-scroll-indicator"
          className="w-full min-w-[1280px] table-fixed text-left border-collapse"
        >
          {/* Colgroup untuk mengunci proporsi kolom (Kategori, Judul, Subjek, Status, Tgl Ditetapkan, Author [permintaan PM], Terakhir Diperbarui, Aksi) */}
          <colgroup>
            <col className="w-[12%] min-w-[130px]" />
            <col className="w-[18%] min-w-[220px]" />
            <col className="w-[12%] min-w-[150px]" />
            <col className="w-[11%] min-w-[110px]" />
            <col className="w-[11%] min-w-[110px]" />
            <col className="w-[11%] min-w-[110px]" />
            <col className="w-[17%] min-w-[210px]" />
            <col className="w-[8%] min-w-[70px]" />
          </colgroup>

        {/* Table Header (Sesuai spesifikasi admin Figma: bg-neu-50, border-b border-neu-200) */}
        <TableHeader className="bg-neu-50">
          <TableRow className="border-b border-neu-200">
            <TableHead className="py-3 px-5 whitespace-nowrap rounded-tl-xl">
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
                className="group inline-flex items-center gap-1.5 cursor-pointer select-none text-neu-700"
              >
                <span className={sortColumn === 'judul' ? 'text-pr-900 font-semibold' : ''}>Judul</span>
                {sortColumn === 'judul' && (
                  <span className="text-[10px] font-bold text-pr-900 leading-none tracking-tight">
                    {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
                  </span>
                )}
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
            <TableHead className="py-3 px-5 whitespace-nowrap">
              <div
                onClick={() => onSort?.('updated_at')}
                className="group inline-flex items-center gap-1.5 cursor-pointer text-neu-700"
              >
                <span className={sortColumn === 'updated_at' ? 'text-pr-900 font-semibold' : ''}>
                  Terakhir Diperbarui
                </span>
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {renderSortIcon('updated_at')}
                </div>
              </div>
            </TableHead>
            <TableHead className={`py-3 px-5 text-right whitespace-nowrap rounded-tr-xl sticky right-0 bg-neu-50 z-10 ${
              scrollShadows.right ? 'sticky-aksi-shadow' : ''
            }`}>
              <span>Aksi</span>
              {scrollShadows.right && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px bg-neu-300"
                />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body (Tinggi dinamis sesuai panjang data tanpa dipaksa min-h) */}
        <TableBody>
          {documents.map((doc) => {
            const authorName = doc.author || 'Sistem';

            return (
              <TableRow
                key={doc.id}
                className="hover:bg-neu-50/50 transition-colors border-b border-neu-100 last:border-0"
              >
                {/* Kategori */}
                <TableCell className="py-3.5 px-5 font-normal text-neu-700 truncate" title={doc.kategori}>
                  {doc.kategori}
                </TableCell>

                {/* Judul */}
                <TableCell className="py-3.5 px-5 font-normal text-neu-900 truncate">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-md shrink-0 ${
                        doc.has_pdf
                          ? 'bg-suc-50 text-suc-900'
                          : 'bg-neu-100 text-neu-400'
                      }`}
                      title={doc.has_pdf ? 'PDF Tersedia' : 'PDF Belum Diunggah'}
                      aria-label={doc.has_pdf ? 'PDF Tersedia' : 'PDF Belum Diunggah'}
                    >
                      <FileText className="w-3 h-3 shrink-0" />
                    </span>
                    <span className="truncate block" title={doc.judul}>
                      {doc.judul}
                    </span>
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

                {/* Author (Pembuat / Pengimpor Dokumen) */}
                <TableCell className="py-3.5 px-5 text-neu-700 whitespace-nowrap" title={authorName}>
                  {authorName}
                </TableCell>

                {/* Terakhir Diperbarui: Full tanggal + jam WIB dan editor pengubah terakhir */}
                <TableCell className="py-3.5 px-5 whitespace-nowrap" title={doc.updated_at_label}>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-neu-700 font-normal">
                      {doc.updated_at_label || '-'}
                    </span>
                    {doc.updated_at_label && doc.updated_at_label !== '-' && (
                      <span className="text-[11px] text-neu-500">
                        oleh {doc.editor || authorName}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Aksi: Tinjauan Ringkas + Menu Tiga Titik */}
                <TableCell className={`py-3.5 px-5 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-[#F8FAFC] z-10 transition-colors ${
                  scrollShadows.right ? 'sticky-aksi-shadow' : ''
                }`}>
                  {scrollShadows.right && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-px bg-neu-300"
                    />
                  )}
                  {onPreview && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionMenuState(null);
                        onPreview(doc);
                      }}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-neu-100 text-neu-600 transition-colors cursor-pointer"
                      title="Tinjauan ringkas dokumen"
                      aria-label={`Tinjauan ringkas dokumen ${doc.judul}`}
                    >
                      <Eye className="w-4 h-4 shrink-0" />
                    </button>
                  )}
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

      {/* Indikator tepi kiri: muncul saat tabel digeser ke kanan */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-6 z-20 bg-gradient-to-r from-pr-900/10 to-transparent transition-opacity duration-200 ${
          scrollShadows.left ? 'opacity-100' : 'opacity-0'
        }`}
      />

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

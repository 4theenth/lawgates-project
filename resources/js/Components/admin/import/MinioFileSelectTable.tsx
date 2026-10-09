import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/Components/ui/table';
import { Pagination } from '@/Components/admin/Pagination';
import { useToast } from '@/hooks/useToast';
import { MinioCategory } from './MinioCategoryTable';

export interface MinioFileItem {
  id: string;
  name: string;
  title: string;
  sizeKb: number;
}

// Data dummy berkas OCR sesuai permintaan: variasi berkas perubahan Undang-Undang Dasar
const DEFAULT_SAMPLE_FILES: MinioFileItem[] = [
  { id: 'f-1', name: 'Perubahan_Pertama_UUD_1945.json', title: 'Perubahan Pertama Undang Undang Dasar Tahun 1945', sizeKb: 1983 },
  { id: 'f-2', name: 'Perubahan_Kedua_UUD_1945.json', title: 'Perubahan Kedua Undang Undang Dasar Tahun 1945', sizeKb: 1540 },
  { id: 'f-3', name: 'Perubahan_Ketiga_UUD_1945.json', title: 'Perubahan Ketiga Undang Undang Dasar Tahun 1945', sizeKb: 2120 },
  { id: 'f-4', name: 'Perubahan_Keempat_UUD_1945.json', title: 'Perubahan Keempat Undang Undang Dasar Tahun 1945', sizeKb: 1845 },
  { id: 'f-5', name: 'Naskah_Asli_UUD_1945.json', title: 'Naskah Asli Undang-Undang Dasar Republik Indonesia 1945', sizeKb: 2450 },
  { id: 'f-6', name: 'Lampiran_Amandemen_UUD_1945.json', title: 'Lampiran Hasil Amandemen Undang-Undang Dasar Tahun 1945', sizeKb: 1230 },
  { id: 'f-7', name: 'Dekrit_Presiden_UUD_1945.json', title: 'Dekrit Presiden Pemberlakuan Kembali UUD 1945', sizeKb: 1670 },
  { id: 'f-8', name: 'Rancangan_Perubahan_UUD_1945.json', title: 'Rancangan Perubahan Undang-Undang Dasar 1945', sizeKb: 1910 },
  { id: 'f-9', name: 'Penjelasan_Resmi_UUD_1945.json', title: 'Penjelasan Resmi Undang-Undang Dasar Tahun 1945', sizeKb: 2050 },
  { id: 'f-10', name: 'Aturan_Peralihan_UUD_1945.json', title: 'Aturan Peralihan Undang-Undang Dasar Tahun 1945', sizeKb: 1480 },
];

interface MinioFileSelectTableProps {
  category?: MinioCategory;
  files?: MinioFileItem[];
  onBack?: () => void;
  onConfirmFiles: (files: MinioFileItem[]) => void;
  maxFilesAllowed?: number;
}

export function MinioFileSelectTable({
  category: _category,
  files = [],
  onBack: _onBack,
  onConfirmFiles,
  maxFilesAllowed = 10,
}: MinioFileSelectTableProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const sourceFiles = files;
  // Tidak ada yang langsung kepilih secara default (mulai dari kosong [])
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 3-State Sorting: Klik 1 (A-Z) -> Klik 2 (Z-A / Z-1) -> Klik 3 (Reset kembali ke awal)
  const [sortField, setSortField] = useState<'title' | 'sizeKb' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter & sort files
  const filteredFiles = useMemo(() => {
    const list = sourceFiles.filter((file) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        file.title.toLowerCase().includes(q) ||
        file.name.toLowerCase().includes(q)
      );
    });

    if (!sortField || !sortDirection) {
      // Kembali ke urutan default awal
      return list;
    }

    return [...list].sort((a, b) => {
      if (sortField === 'title') {
        const cmp = a.title.localeCompare(b.title);
        return sortDirection === 'asc' ? cmp : -cmp;
      } else {
        const cmp = a.sizeKb - b.sizeKb;
        return sortDirection === 'asc' ? cmp : -cmp;
      }
    });
  }, [searchQuery, sortField, sortDirection]);

  // Hitung total halaman dinamis sesuai data yang ada
  const totalPages = Math.max(1, Math.ceil(filteredFiles.length / pageSize));

  // Potong berkas per halaman (paginated)
  const paginatedFiles = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredFiles.slice(startIndex, startIndex + pageSize);
  }, [filteredFiles, currentPage, pageSize]);

  // Handle 3-Logic Sort
  const handleSort = (field: 'title' | 'sizeKb') => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        // Klik kedua: Z-A (atau Z-1)
        setSortDirection('desc');
      } else {
        // Klik ketiga: Reset ke daftar awal
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      // Klik pertama: A-Z
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (field: 'title' | 'sizeKb') => {
    if (sortField === field) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 transition-colors shrink-0" />;
  };

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= maxFilesAllowed) {
          toast.warning(`Maksimal hanya dapat memilih ${maxFilesAllowed} berkas.`);
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  // Toggle Select All pada halaman aktif
  const isAllSelected =
    paginatedFiles.length > 0 &&
    paginatedFiles.every((file) => selectedIds.includes(file.id));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      const pageIds = paginatedFiles.map((f) => f.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      const pageIds = paginatedFiles.map((f) => f.id);
      setSelectedIds((prev) => {
        const combined = Array.from(new Set([...prev, ...pageIds]));
        if (combined.length > maxFilesAllowed) {
          toast.info(`Hanya ${maxFilesAllowed} berkas pertama yang dipilih (batas maksimal).`);
          return combined.slice(0, maxFilesAllowed);
        }
        return combined;
      });
    }
  };

  const handleConfirm = () => {
    if (selectedIds.length === 0) {
      toast.warning('Pilih minimal 1 berkas terlebih dahulu.');
      return;
    }
    const selectedFiles = sourceFiles.filter((f) => selectedIds.includes(f.id));
    onConfirmFiles(selectedFiles);
  };

  return (
    <div className="w-full space-y-4">
      {/* Bar Atas: Search Input di Kiri Sejajar dengan Tombol "Pilih File" di Kanan */}
      <div className="flex items-center justify-between gap-4">
        {/* Input Pencarian Sesuai Gambar: "Cari file hasil OCR" */}
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-neu-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari file hasil OCR"
            className="w-full pl-9 pr-4 py-2 border border-neu-200 rounded-[10px] text-[12px] text-neu-900 placeholder:text-neu-400 bg-white focus:outline-none focus:border-neu-400 focus:ring-1 focus:ring-neu-400 transition-all"
          />
        </div>

        {/* Tombol Pilih File di Kanan Atas Sejajar dengan Search */}
        <button
          type="button"
          onClick={handleConfirm}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-[10px] bg-pr-900 text-white hover:bg-pr-800 text-[12px] font-medium transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          Pilih File
        </button>
      </div>

      {/* Tabel File OCR MinIO */}
      <div className="w-full bg-white rounded-xl border border-neu-200 shadow-2xs overflow-hidden">
        <Table className="w-full min-w-[600px] text-left border-collapse">
          <colgroup>
            <col className="w-[54px]" />
            <col className="w-auto" />
            <col className="w-[180px]" />
          </colgroup>

          <TableHeader className="bg-neu-50 border-b border-neu-200">
            <TableRow className="border-b border-neu-200">
              <TableHead className="py-3.5 px-4 text-center w-[54px]">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleToggleSelectAll}
                  aria-label="Pilih semua file"
                  className="w-4 h-4 rounded text-pr-900 border-neu-300 focus:ring-pr-900 cursor-pointer accent-pr-900 mx-auto block"
                />
              </TableHead>
              <TableHead className="py-3.5 px-5">
                <div
                  onClick={() => handleSort('title')}
                  className="group inline-flex items-center gap-1.5 cursor-pointer select-none text-neu-700 font-semibold text-[12px] uppercase tracking-wider hover:text-neu-900"
                >
                  <span className={sortField === 'title' ? 'text-pr-900 font-bold' : ''}>JUDUL</span>
                  {renderSortIcon('title')}
                </div>
              </TableHead>
              <TableHead className="py-3.5 px-6 text-left w-[180px]">
                <div
                  onClick={() => handleSort('sizeKb')}
                  className="group inline-flex items-center justify-start gap-1.5 cursor-pointer select-none text-neu-700 font-semibold text-[12px] uppercase tracking-wider hover:text-neu-900"
                >
                  <span className={sortField === 'sizeKb' ? 'text-pr-900 font-bold' : ''}>UKURAN FILE</span>
                  {renderSortIcon('sizeKb')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedFiles.map((file, idx) => {
              const isChecked = selectedIds.includes(file.id);
              return (
                <TableRow
                  key={`${file.id}-${idx}`}
                  className={`transition-colors border-b border-neu-100 last:border-0 ${
                    isChecked ? 'bg-neu-50/40' : 'hover:bg-neu-50/60'
                  }`}
                >
                  <TableCell className="py-3.5 px-4 text-center w-[54px]">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleSelect(file.id)}
                      aria-label={`Pilih berkas ${file.title}`}
                      className="w-4 h-4 rounded text-pr-900 border-neu-300 focus:ring-pr-900 cursor-pointer accent-pr-900 mx-auto block"
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => handleToggleSelect(file.id)}
                    className="py-3.5 px-5 font-normal text-neu-900 text-[12px] cursor-pointer"
                  >
                    {file.title}
                  </TableCell>
                  <TableCell
                    onClick={() => handleToggleSelect(file.id)}
                    className="py-3.5 px-6 font-normal text-neu-800 text-[12px] text-left cursor-pointer w-[180px]"
                  >
                    {file.sizeKb}KB
                  </TableCell>
                </TableRow>
              );
            })}

            {paginatedFiles.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-8 text-center text-neu-500 text-[12px]">
                  Tidak ada berkas yang sesuai dengan pencarian
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Info Jumlah Berkas Terpilih: Hanya tampil jika ada berkas yang dipilih */}
      {selectedIds.length > 0 && (
        <div className="text-[12px] font-medium text-pr-900 animate-in fade-in duration-150">
          {selectedIds.length} berkas dipilih (Maks. {maxFilesAllowed})
        </div>
      )}

      {/* Komponen Pagination Responsif (Dinamis sesuai data yang ada) */}
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

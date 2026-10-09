import { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import {
  Search,
  Filter,
  Scale,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';

interface PeraturanItem {
  id: number;
  unique_id: string;
  judul: string;
  nomor: string;
  tahun: number | string;
  instansi?: string;
  jenis_peraturan?: {
    id: number;
    nama: string;
    kode?: string;
  };
  status_peraturan?: {
    id: number;
    nama_status: string;
  };
}

interface FilterOption {
  value: string;
  label: string;
}

interface DetailKategoriProps {
  kategori: {
    id?: number | null;
    slug: string;
    canonical_key?: string | null;
    nama: string;
    badge: string;
    deskripsi?: string;
    total_dokumen?: number;
  };
  peraturan: {
    data: PeraturanItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
  filters: {
    keyword?: string;
    status_id?: string;
    tahun?: string;
    sort?: string;
    per_page?: number;
  };
  referensi: {
    status: Array<{ id: number; nama_status: string }>;
    tahun: string[];
  };
}

export default function DetailKategori({
  kategori,
  peraturan,
  filters,
  referensi,
}: DetailKategoriProps) {
  // State pencarian & filter
  const [searchQuery, setSearchQuery] = useState(filters.keyword || '');
  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    filters.status_id ? filters.status_id.split(',').filter(Boolean) : []
  );

  // Tahun rentang
  const initialYear = filters.tahun || '';
  const [tahunDari, setTahunDari] = useState(
    initialYear.includes('-') ? initialYear.split('-')[0].trim() : initialYear
  );
  const [tahunSampai, setTahunSampai] = useState(
    initialYear.includes('-') ? initialYear.split('-')[1].trim() : initialYear
  );

  const [sort] = useState(filters.sort || 'relevansi');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'tahun' | 'status' | null>(null);
  const [isResetSpinning, setIsResetSpinning] = useState(false);

  // Pagination state
  const [perPage, setPerPage] = useState(filters.per_page || 10);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

  // Sub-dropdown tahun (dari / sampai)
  const [openYearSub, setOpenYearSub] = useState<{ dari: boolean; sampai: boolean }>({
    dari: false,
    sampai: false,
  });

  const filterContainerRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  // Klik di luar untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
        setActiveDropdown(null);
      }
      if (perPageRef.current && !perPageRef.current.contains(e.target as Node)) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Opsi Status
  const statusOptions: FilterOption[] =
    referensi.status.length > 0
      ? referensi.status.map((s) => ({
          value: String(s.id),
          label: s.nama_status,
        }))
      : [
          { value: '1', label: 'Berlaku' },
          { value: '2', label: 'Tidak berlaku' },
        ];

  // Opsi Tahun
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    new Set([
      ...referensi.tahun.map(String),
      String(currentYear),
      String(currentYear - 1),
      String(currentYear - 2),
      String(currentYear - 3),
      String(currentYear - 4),
      String(currentYear - 5),
      String(currentYear - 6),
    ])
  ).sort((a, b) => Number(b) - Number(a));

  // Teks Label Tahun
  let tahunLabel = 'Semua tahun';
  if (tahunDari && tahunSampai) {
    if (tahunDari === tahunSampai) {
      tahunLabel = tahunDari;
    } else {
      tahunLabel = `${tahunDari} - ${tahunSampai}`;
    }
  } else if (tahunDari) {
    tahunLabel = `Dari ${tahunDari}`;
  } else if (tahunSampai) {
    tahunLabel = `Hingga ${tahunSampai}`;
  }

  // Teks Label Status
  let statusLabel = 'Semua status';
  if (
    selectedStatus.length === 0 ||
    (statusOptions.length > 0 && selectedStatus.length === statusOptions.length)
  ) {
    statusLabel = 'Semua status';
  } else if (selectedStatus.length === 1) {
    const found = statusOptions.find((s) => s.value === selectedStatus[0]);
    if (found) statusLabel = found.label;
  } else if (selectedStatus.length > 1) {
    statusLabel = `${selectedStatus.length} Status`;
  }

  const applyFilters = (newParams: Record<string, string | number>) => {
    const params: Record<string, string | number> = {
      ...filters,
      ...newParams,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === '' || params[key] === undefined || params[key] === null) {
        delete params[key];
      }
    });

    router.get(`/kategori/${kategori.slug}`, params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  useEffect(() => {
    setSearchQuery(filters.keyword || '');
  }, [filters.keyword]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    // Jika teks pencarian dikosongkan menggunakan keyboard (backspace/delete), otomatis kembalikan ke tampilan awal
    if (val.trim() === '' && (filters.keyword || '').trim() !== '') {
      applyFilters({ keyword: '', page: 1 });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if ((filters.keyword || '').trim() !== '') {
      applyFilters({ keyword: '', page: 1 });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ keyword: searchQuery, page: 1 });
  };

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
    setActiveDropdown(null);
    const params: Record<string, string | number> = {
      page: 1,
      keyword: searchQuery,
      sort,
    };

    if (selectedStatus.length > 0) {
      params.status_id = selectedStatus.join(',');
    } else {
      params.status_id = '';
    }

    if (tahunDari && tahunSampai) {
      params.tahun = `${tahunDari}-${tahunSampai}`;
    } else if (tahunDari) {
      params.tahun = tahunDari;
    } else if (tahunSampai) {
      params.tahun = tahunSampai;
    } else {
      params.tahun = '';
    }

    applyFilters(params);
  };

  const handleResetFilter = () => {
    setIsResetSpinning(true);
    setSearchQuery('');
    setSelectedStatus([]);
    setTahunDari('');
    setTahunSampai('');
    setActiveDropdown(null);

    router.get(
      `/kategori/${kategori.slug}`,
      {},
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= peraturan.last_page) {
      applyFilters({ page: newPage });
    }
  };

  const totalResult = peraturan.total;
  const currentPage = peraturan.current_page;
  const lastPage = peraturan.last_page;

  // Cek apakah ada pencarian atau filter aktif
  const hasActiveFilter = Boolean(
    (filters.keyword && filters.keyword.trim().length > 0) ||
    searchQuery.trim().length > 0 ||
    filters.status_id ||
    filters.tahun
  );

  const isSearchNotFound =
    hasActiveFilter ||
    (Boolean(kategori.total_dokumen && kategori.total_dokumen > 0) && totalResult === 0);

  // Pagination page numbers generator
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (lastPage <= maxVisible) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < lastPage - 2) pages.push('...');
      pages.push(lastPage);
    }
    return pages;
  };

  return (
    <PublicLayout>
      <Head title={`${kategori.nama} - LawGates`} />

      <div className="pt-24 pb-16 w-full max-w-[1240px] mx-auto px-4 sm:px-6 min-h-screen text-gray-900 font-sans min-w-0 overflow-x-hidden">
        {/* ── Breadcrumb ── */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Regulasi', href: '/regulasi' },
              { label: kategori.nama },
            ]}
            className="mb-4 sm:mb-6 text-xs text-neu-500"
          />
          <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900 tracking-tight">
            {kategori.nama}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5">
            Data {kategori.nama} ditemukan sebanyak{' '}
            <span
              className={`font-bold ${
                totalResult === 0 ? 'text-red-500' : 'text-gray-900'
              }`}
            >
              {totalResult}
            </span>{' '}
            data
          </p>
        </div>

        {/* ── Action Row: Filter Toggle Button + Elongated Search Bar ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
          {/* Filter Button (Border neutral biasa, tanpa garis/ring hitam saat diklik) */}
          <div className="relative" ref={filterContainerRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 rounded-full text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer shrink-0 shadow-2xs"
              title="Buka Filter"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span>Filter</span>
            </button>

            {/* Floating Filter Popover Card (Persis Gambar 1, 2, 3, 4) */}
            {isFilterOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-[320px] sm:w-[350px] bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Header Filter: Tombol Filter & Reset */}
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-700" />
                    <span>Filter</span>
                  </div>
                  <button
                    onClick={handleResetFilter}
                    className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
                    title="Reset Filter"
                    type="button"
                  >
                    <RotateCcw
                      className={`w-4 h-4 ${isResetSpinning ? 'animate-smooth-spin' : ''}`}
                      onAnimationEnd={() => setIsResetSpinning(false)}
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* 1. Filter Tahun */}
                  <div className={`relative ${activeDropdown === 'tahun' ? 'z-40' : 'z-20'}`}>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Tahun
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))
                      }
                      className="flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
                    >
                      <span className="truncate">{tahunLabel}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                          activeDropdown === 'tahun' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Floating Dropdown Tahun (Menimpa di atas tanpa menggeser tombol TERAPKAN) */}
                    {activeDropdown === 'tahun' && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 shadow-2xl z-50">
                        <div className="grid grid-cols-2 gap-2 mb-1">
                          {/* Sub-dropdown Dari */}
                          <div className="relative">
                            <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                              Dari
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenYearSub((prev) => ({
                                  ...prev,
                                  dari: !prev.dari,
                                  sampai: false,
                                }))
                              }
                              className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 cursor-pointer"
                            >
                              <span>{tahunDari || 'Pilih'}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                                  openYearSub.dari ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {openYearSub.dari && (
                              <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl py-1 max-h-36 overflow-y-auto custom-scrollbar z-50">
                                {availableYears.map((yr) => {
                                  const isSelected = tahunDari === yr;
                                  return (
                                    <button
                                      key={`dari-${yr}`}
                                      type="button"
                                      onClick={() => {
                                        setTahunDari(yr);
                                        setOpenYearSub((p) => ({ ...p, dari: false }));
                                      }}
                                      className={`w-full px-2.5 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                        isSelected
                                          ? 'bg-blue-50 text-pr-900 font-semibold'
                                          : 'text-gray-700 hover:bg-gray-50'
                                      }`}
                                    >
                                      <span>{yr}</span>
                                      {isSelected && <Check className="w-3 h-3 text-pr-900" />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Sub-dropdown Sampai */}
                          <div className="relative">
                            <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                              Sampai
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenYearSub((prev) => ({
                                  ...prev,
                                  sampai: !prev.sampai,
                                  dari: false,
                                }))
                              }
                              className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 cursor-pointer"
                            >
                              <span>{tahunSampai || 'Pilih'}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                                  openYearSub.sampai ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {openYearSub.sampai && (
                              <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl py-1 max-h-36 overflow-y-auto custom-scrollbar z-50">
                                {availableYears.map((yr) => {
                                  const isSelected = tahunSampai === yr;
                                  return (
                                    <button
                                      key={`sampai-${yr}`}
                                      type="button"
                                      onClick={() => {
                                        setTahunSampai(yr);
                                        setOpenYearSub((p) => ({ ...p, sampai: false }));
                                      }}
                                      className={`w-full px-2.5 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                        isSelected
                                          ? 'bg-blue-50 text-pr-900 font-semibold'
                                          : 'text-gray-700 hover:bg-gray-50'
                                      }`}
                                    >
                                      <span>{yr}</span>
                                      {isSelected && <Check className="w-3 h-3 text-pr-900" />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Filter Status */}
                  <div className={`relative ${activeDropdown === 'status' ? 'z-40' : 'z-10'}`}>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Status
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))
                      }
                      className="flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
                    >
                      <span className="truncate">{statusLabel}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                          activeDropdown === 'status' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Floating Dropdown Status */}
                    {activeDropdown === 'status' && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 space-y-2.5 shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                        {statusOptions.map((item) => {
                          const isChecked = selectedStatus.includes(item.value);
                          return (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => {
                                setSelectedStatus((prev) =>
                                  prev.includes(item.value)
                                    ? prev.filter((v) => v !== item.value)
                                    : [...prev, item.value]
                                );
                              }}
                              className="w-full text-left flex items-center gap-3 cursor-pointer group"
                            >
                              <div
                                className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                                  isChecked
                                    ? 'bg-[#0B1A3A] border-[#0B1A3A] text-white'
                                    : 'border-gray-300 bg-white group-hover:border-gray-400'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                              </div>
                              <span className="text-sm text-gray-700 select-none">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Tombol TERAPKAN */}
                  <button
                    onClick={handleApplyFilter}
                    type="button"
                    className="w-full h-[46px] sm:h-[48px] bg-[#0B1A3A] hover:bg-[#07132B] text-white font-bold text-sm tracking-wider uppercase rounded-full mt-4 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                  >
                    TERAPKAN
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input Pencarian Pill Panjang */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-4 sm:left-5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={`Cari ${kategori.nama.toLowerCase()} yang ada di Indonesia...`}
                className="w-full bg-white border border-gray-200 hover:border-gray-300 rounded-full py-3.5 pl-11 sm:pl-12 pr-10 sm:pr-12 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 sm:right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Content Area: Empty State Box vs 3-Column Cards Grid ── */}
        {totalResult === 0 ? (
          /* Empty State Box (Sesuai Mockup) */
          <div className="w-full border border-dashed border-gray-300 rounded-[20px] p-12 sm:p-24 text-center flex flex-col items-center justify-center bg-white shadow-2xs min-h-[380px] sm:min-h-[420px]">
            {/* Box Icon Timbangan */}
            <div className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center mb-4 text-gray-400 bg-white shadow-2xs">
              <Scale className="w-7 h-7 stroke-[1.5] text-gray-400" />
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
              {isSearchNotFound
                ? 'Hasil tidak ditemukan untuk kata kunci tersebut'
                : 'Mohon maaf, kategori yang kamu cari belum ada.'}
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm sm:max-w-md leading-relaxed">
              {isSearchNotFound
                ? 'Ups, kata kunci yang kamu cari tidak ada. Coba cek ejaan atau gunakan kata lain.'
                : 'Tim admin kami akan segera menambahkannya.'}
            </p>
          </div>
        ) : (
          /* ── 3-Column Regulation Cards Grid (Sesuai Gambar 2, 3, 4) ── */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peraturan.data.map((item) => {
                const statusName =
                  item.status_peraturan?.nama_status?.toLowerCase() ?? 'berlaku';
                const isBerlaku =
                  statusName.includes('berlaku') && !statusName.includes('tidak');

                return (
                  <Link
                    href={`/peraturan/${item.unique_id}`}
                    key={item.id}
                    className="
                      group
                      relative
                      bg-white
                      border
                      border-gray-200/80
                      border-l-[6px]
                      border-l-transparent
                      hover:border-l-[#0A1C3E]
                      hover:border-gray-300
                      rounded-2xl
                      p-5
                      sm:p-6
                      shadow-2xs
                      hover:shadow-md
                      transition-all
                      duration-200
                      flex
                      flex-col
                      justify-between
                      cursor-pointer
                    "
                  >
                    {/* Top Row: Badges */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3.5">
                        <span className="bg-[#0B1A3A] text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
                          {item.jenis_peraturan?.kode || 'UU'}
                        </span>

                        {isBerlaku ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#16A34A] text-[11px] font-semibold border border-[#DCFCE7]">
                            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Berlaku</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[11px] font-semibold border border-[#FECACA]">
                            <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Tidak Berlaku</span>
                          </span>
                        )}
                      </div>

                      {/* Judul Dokumen */}
                      <h3 className="text-[14px] font-bold text-gray-900 mb-4 line-clamp-3 leading-snug group-hover:text-pr-900 transition-colors">
                        {item.judul}
                      </h3>
                    </div>

                    {/* Bottom Row: Metadata & Lihat Detail */}
                    <div className="flex items-center justify-between gap-2 pt-3.5 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
                        <span>Tahun {item.tahun}</span>
                        <span className="w-px h-3.5 bg-gray-200"></span>
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">
                          {item.instansi || 'Pemerintah Pusat'}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8EDF5] text-[#0B1A3A] text-[12px] font-semibold rounded-full group-hover:bg-pr-900 group-hover:text-white transition-colors shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Detail</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ── Pagination Bar (Sesuai Gambar 2) ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
              {/* Left: Tombol Sebelumnya & Dropdown Lihat Per Page */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {/* Dropdown Lihat Per Page */}
                <div ref={perPageRef} className="relative flex items-center gap-1.5 text-xs text-gray-500">
                  <span>Lihat</span>
                  <button
                    type="button"
                    onClick={() => setIsPerPageOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors cursor-pointer"
                  >
                    <span>{perPage}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                        isPerPageOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isPerPageOpen && (
                    <div className="absolute left-10 bottom-[calc(100%+6px)] w-16 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                      {[10, 15, 20, 50, 100].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setPerPage(num);
                            setIsPerPageOpen(false);
                            applyFilters({ per_page: num, page: 1 });
                          }}
                          className={`w-full py-1 text-center text-xs transition-colors cursor-pointer ${
                            perPage === num
                              ? 'bg-blue-50 text-pr-900 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Nomor Halaman & Tombol Selanjutnya */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        page === currentPage
                          ? 'bg-[#0B1A3A] text-white shadow-sm'
                          : page === '...'
                          ? 'text-gray-400 cursor-default'
                          : 'text-gray-600 hover:bg-gray-100 bg-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === lastPage || lastPage === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

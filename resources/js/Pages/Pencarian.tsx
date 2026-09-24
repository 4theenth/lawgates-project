import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { Badge } from '@/Components/common/Badge';
import {
  Search,
  Filter,
  RotateCcw,
  CheckCircle,
  XCircle,
  RefreshCw,
  XOctagon,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Check,
  Scale,
} from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

export default function Pencarian() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const [totalResult, setTotalResult] = useState(0);

  // State pencarian & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string[]>([]);
  const [tahunDari, setTahunDari] = useState('');
  const [tahunSampai, setTahunSampai] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [sort, setSort] = useState('relevansi');

  // State tampilan
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<'kategori' | 'tahun' | 'status' | null>(null);
  const [isResetSpinning, setIsResetSpinning] = useState(false);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

  // Sub-dropdown tahun (dari / sampai)
  const [openYearSub, setOpenYearSub] = useState<{ dari: boolean; sampai: boolean }>({
    dari: true,
    sampai: true,
  });

  // State referensi dropdown
  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);

  // State pagination
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const filterSidebarRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);
  const yearSubRef = useRef<HTMLDivElement>(null);
  const lastFetchedQueryRef = useRef<string | null>(null);

  // 1. Ambil data referensi filter saat dimuat
  useEffect(() => {
    fetch('/api/referensi-filter')
      .then((res) => res.json())
      .then((data) => {
        setListKategori(data.kategori || []);
        setListStatus(data.status || []);
        setListTahun(data.tahun || []);
      })
      .catch((err) => console.error('Gagal memuat referensi:', err));
  }, []);

  // 2. Sinkronisasi dengan URL search params saat pertama kali dimuat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const initialKeyword = params.get('keyword') || params.get('q') || '';
    setSearchQuery(initialKeyword);

    const catParam = params.get('kategori_id') || params.get('kategori') || '';
    if (catParam) setSelectedKategori(catParam.split(',').filter(Boolean));

    const statusParam = params.get('status_id') || params.get('status') || '';
    if (statusParam) setSelectedStatus(statusParam.split(',').filter(Boolean));

    const yearParam = params.get('tahun') || '';
    if (yearParam.includes('-')) {
      const [start, end] = yearParam.split('-');
      setTahunDari(start.trim());
      setTahunSampai(end.trim());
    } else if (yearParam) {
      setTahunDari(yearParam);
      setTahunSampai(yearParam);
    }

    setSort(params.get('sort') || 'relevansi');

    const urlPage = parseInt(params.get('page') || '1');
    setCurrentPage(urlPage);
    const urlPerPage = parseInt(params.get('per_page') || '10');
    setPerPage(urlPerPage);

    fetchData(params.toString());
  }, []);

  // Tutup dropdown sort, pagination, dan filter saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
      if (perPageRef.current && !perPageRef.current.contains(e.target as Node)) {
        setIsPerPageOpen(false);
      }
      if (filterSidebarRef.current && !filterSidebarRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchData = (queryString: string) => {
    lastFetchedQueryRef.current = queryString;
    setIsSearching(true);
    fetch(`/api/search?${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.data || []);
        setTotalResult(data.total || 0);
        setCurrentPage(data.current_page || 1);
        setLastPage(data.last_page || 1);
        setIsSearching(false);
      })
      .catch((err) => {
        console.error('Gagal melakukan pencarian:', err);
        setIsSearching(false);
      });
  };

  // 3. Sinkronisasi status sub-dropdown tahun saat dropdown tahun dibuka
  useEffect(() => {
    if (activeDropdown === 'tahun') {
      setOpenYearSub({ dari: true, sampai: true });
    }
  }, [activeDropdown]);

  const applyFilters = (overrides: Record<string, any> = {}) => {
    const params = new URLSearchParams();

    const currentQuery = overrides.keyword !== undefined ? overrides.keyword : searchQuery;
    const currentKategori =
      overrides.kategori_id !== undefined
        ? overrides.kategori_id
        : selectedKategori.length > 0 &&
          (kategoriOptions.length === 0 || selectedKategori.length < kategoriOptions.length)
        ? selectedKategori.join(',')
        : '';

    let formattedTahun = '';
    if (overrides.tahun !== undefined) {
      formattedTahun = overrides.tahun;
    } else if (tahunDari && tahunSampai) {
      const y1 = Number(tahunDari);
      const y2 = Number(tahunSampai);
      if (!isNaN(y1) && !isNaN(y2)) {
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        formattedTahun = minY === maxY ? String(minY) : `${minY}-${maxY}`;
      } else {
        formattedTahun = `${tahunDari}-${tahunSampai}`;
      }
    } else if (tahunDari) {
      formattedTahun = tahunDari;
    } else if (tahunSampai) {
      formattedTahun = tahunSampai;
    }

    const currentStatus =
      overrides.status_id !== undefined
        ? overrides.status_id
        : selectedStatus.length > 0 &&
          (statusOptions.length === 0 || selectedStatus.length < statusOptions.length)
        ? selectedStatus.join(',')
        : '';
    const currentSort = overrides.sort !== undefined ? overrides.sort : sort;
    const currentPerPage = overrides.per_page !== undefined ? overrides.per_page : perPage;
    const page = overrides.page !== undefined ? overrides.page : 1;

    if (currentQuery) params.set('keyword', currentQuery);
    if (currentKategori) params.set('kategori_id', currentKategori);
    if (formattedTahun) params.set('tahun', formattedTahun);
    if (currentStatus) params.set('status_id', currentStatus);
    if (currentSort) params.set('sort', currentSort);
    if (currentPerPage) params.set('per_page', currentPerPage.toString());
    if (page > 1) params.set('page', page.toString());

    window.history.pushState(null, '', `?${params.toString()}`);
    fetchData(params.toString());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveDropdown(null);
    applyFilters({ page: 1 });
  };

  const handleApplyFilter = () => {
    setActiveDropdown(null);
    applyFilters({ page: 1 });
  };

  const isFormDirty =
    searchQuery.trim() !== '' ||
    selectedKategori.length > 0 ||
    selectedStatus.length > 0 ||
    tahunDari !== '2020' ||
    tahunSampai !== '2026' ||
    sort !== 'relevansi' ||
    perPage !== 10;

  const isDataFiltered =
    (lastFetchedQueryRef.current !== null && lastFetchedQueryRef.current !== '') ||
    (typeof window !== 'undefined' && Boolean(window.location.search && window.location.search !== '?')) ||
    currentPage > 1;

  const handleResetFilter = () => {
    // Jalankan animasi putar halus setiap kali tombol diklik
    setIsResetSpinning(false);
    requestAnimationFrame(() => {
      setIsResetSpinning(true);
    });

    if (isSearching) return;

    // Jika form sudah dalam keadaan default DAN data yang tampil sudah data default (tidak ada filter aktif)
    // Jangan lakukan fetch atau tampilkan loading kembali meskipun tombol di-klik berulang kali
    if (!isFormDirty && !isDataFiltered) {
      return;
    }

    setSearchQuery('');
    setSelectedKategori([]);
    setTahunDari('');
    setTahunSampai('');
    setSelectedStatus([]);
    setSort('relevansi');
    setPerPage(10);
    setCurrentPage(1);
    setOpenYearSub({ dari: true, sampai: true });
    setActiveDropdown(null);

    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname);
    }

    // Hanya ambil data default jika data saat ini memang terfilter/berbeda
    if (isDataFiltered) {
      fetchData('');
    }
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setIsSortOpen(false);
    applyFilters({ sort: newSort, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;
    setCurrentPage(newPage);
    applyFilters({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setIsPerPageOpen(false);
    applyFilters({ per_page: newPerPage, page: 1 });
  };

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

  const getStatusVariant = (statusName: string): 'success' | 'danger' | 'warning' | 'neutral' => {
    const name = statusName.toLowerCase();
    if (name.includes('tidak berlaku')) return 'danger';
    if (name.includes('dicabut')) return 'neutral';
    if (name.includes('diubah')) return 'warning';
    return 'success';
  };

  const getStatusIcon = (statusName: string) => {
    const variant = getStatusVariant(statusName);
    switch (variant) {
      case 'success':
        return <CheckCircle className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />;
      case 'danger':
        return <XCircle className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />;
      case 'warning':
        return <RefreshCw className="w-3.5 h-3.5 text-[#D97706] shrink-0" />;
      case 'neutral':
        return <XOctagon className="w-3.5 h-3.5 text-gray-500 shrink-0" />;
      default:
        return null;
    }
  };

  // Fallback opsi agar sesuai dengan screenshot referensi
  const fallbackKategori: FilterOption[] = [
    { value: '1', label: 'Undang undang' },
    { value: '2', label: 'Peraturan Presiden' },
    { value: '3', label: 'Peraturan Mentri' },
    { value: '4', label: 'Tap MPR' },
  ];

  const kategoriOptions: FilterOption[] =
    listKategori.length > 0
      ? listKategori.map((k) => ({
          value: String(k.id),
          label: k.nama,
        }))
      : fallbackKategori;

  const fallbackStatus: FilterOption[] = [
    { value: '1', label: 'Berlaku' },
    { value: '2', label: 'Tidak berlaku' },
  ];

  const statusOptions: FilterOption[] =
    listStatus.length > 0
      ? listStatus.map((s) => ({
          value: String(s.id),
          label: s.nama,
        }))
      : fallbackStatus;

  // Fallback tahun agar selalu tersedia opsi tahun lengkap
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    new Set([
      ...listTahun.map(String),
      String(currentYear),
      String(currentYear - 1),
      String(currentYear - 2),
      String(currentYear - 3),
      String(currentYear - 4),
      String(currentYear - 5),
      String(currentYear - 6),
    ])
  ).sort((a, b) => Number(b) - Number(a));

  // Teks label trigger Kategori
  let kategoriLabel = 'Semua kategori';
  if (
    selectedKategori.length === 0 ||
    (kategoriOptions.length > 0 && selectedKategori.length === kategoriOptions.length)
  ) {
    kategoriLabel = 'Semua kategori';
  } else if (selectedKategori.length === 1) {
    const found = kategoriOptions.find((k) => k.value === selectedKategori[0]);
    if (found) kategoriLabel = found.label;
  } else if (selectedKategori.length > 1) {
    kategoriLabel = `${selectedKategori.length} Kategori`;
  }

  // Teks label trigger Tahun
  let tahunLabel = 'Semua tahun';
  if (tahunDari && tahunSampai) {
    const y1 = Number(tahunDari);
    const y2 = Number(tahunSampai);
    if (!isNaN(y1) && !isNaN(y2)) {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      tahunLabel = minY === maxY ? String(minY) : `${minY} - ${maxY}`;
    } else {
      tahunLabel = `${tahunDari} - ${tahunSampai}`;
    }
  } else if (tahunDari) {
    tahunLabel = tahunDari;
  } else if (tahunSampai) {
    tahunLabel = tahunSampai;
  }

  // Teks label trigger Status
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

  return (
    <PublicLayout>
      <Head title="Pencarian Hukum - LawGates" />

      <div className="pt-24 pb-16 w-full max-w-[1240px] mx-auto px-3.5 sm:px-6 min-h-screen text-gray-900 font-sans min-w-0 overflow-x-hidden">
        {/* ── Header & Breadcrumb ── */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Pencarian Hukum' },
            ]}
            className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500"
          />
          <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900 tracking-tight">
            Pencarian Hukum
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
            Pencarian lengkap untuk berbagai jenis undang-undang dan peraturan
          </p>
        </div>

        {/* ── Search Bar Input ── */}
        <form onSubmit={handleSearchSubmit} className="relative mb-6 sm:mb-8">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari peraturan yang ada di Indonesia..."
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 sm:py-4 pl-11 sm:pl-12 pr-4 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr-900 shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-4 pointer-events-none" />
          </div>
        </form>

        {/* ── Grid Layout: Filter Sidebar & Search Results ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* ── Kolom Filter (Collapsible) ── */}
          {isFilterOpen && (
            <div ref={filterSidebarRef} className="lg:col-span-4 xl:col-span-3 w-full">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
                {/* Header Filter: Tombol Filter (toggle hide) & Reset */}
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="text-sm font-bold text-gray-800 flex items-center gap-2 hover:text-pr-900 transition-colors cursor-pointer group"
                    title="Klik untuk menyembunyikan filter"
                  >
                    <Filter className="w-4 h-4 text-gray-700 group-hover:text-pr-900 transition-colors" />
                    <span>Filter</span>
                  </button>
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
                  {/* 1. Filter Kategori (Floating Overlay Dropdown) */}
                  <div className={`relative ${activeDropdown === 'kategori' ? 'z-40' : 'z-20'}`}>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Kategori
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown((prev) => (prev === 'kategori' ? null : 'kategori'))
                      }
                      className="flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
                    >
                      <span className="truncate">{kategoriLabel}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                          activeDropdown === 'kategori' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Floating Dropdown Kategori (Menimpa di atas tanpa menggeser tombol TERAPKAN dan input lain) */}
                    {activeDropdown === 'kategori' && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 space-y-2.5 shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                        {kategoriOptions.map((item) => {
                          const isChecked = selectedKategori.includes(item.value);
                          return (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => {
                                setSelectedKategori((prev) =>
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

                  {/* 2. Filter Tahun (Floating Overlay Dropdown 3 Layer) */}
                  <div className={`relative ${activeDropdown === 'tahun' ? 'z-40' : 'z-10'}`}>
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
                        {/* Header popup & Reset */}
                        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-gray-100 text-xs">
                          <span className="text-gray-700 font-semibold">Rentang Tahun</span>
                          {(tahunDari || tahunSampai) && (
                            <button
                              type="button"
                              onClick={() => {
                                setTahunDari('');
                                setTahunSampai('');
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {/* Kolom Dari */}
                          <div className="min-w-0">
                            <div className="text-xs text-gray-700 font-medium mb-1">Dari</div>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenYearSub((prev) => ({ ...prev, dari: !prev.dari }))
                              }
                              className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 cursor-pointer"
                            >
                              <span className="truncate">{tahunDari || 'Pilih'}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                                  openYearSub.dari ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {openYearSub.dari && (
                              <div className="mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-36 overflow-y-auto custom-scrollbar">
                                {availableYears.map((yr) => {
                                  const isSelected = tahunDari === yr;
                                  return (
                                    <button
                                      key={`dari-${yr}`}
                                      type="button"
                                      onClick={() => setTahunDari(yr)}
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

                          {/* Kolom Sampai */}
                          <div className="min-w-0">
                            <div className="text-xs text-gray-700 font-medium mb-1">Sampai</div>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenYearSub((prev) => ({ ...prev, sampai: !prev.sampai }))
                              }
                              className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 cursor-pointer"
                            >
                              <span className="truncate">{tahunSampai || 'Pilih'}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                                  openYearSub.sampai ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {openYearSub.sampai && (
                              <div className="mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-36 overflow-y-auto custom-scrollbar">
                                {availableYears.map((yr) => {
                                  const isSelected = tahunSampai === yr;
                                  return (
                                    <button
                                      key={`sampai-${yr}`}
                                      type="button"
                                      onClick={() => setTahunSampai(yr)}
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

                  {/* 3. Filter Status (Floating Overlay Dropdown) */}
                  <div className={`relative ${activeDropdown === 'status' ? 'z-40' : 'z-0'}`}>
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

                    {/* Floating Dropdown Status (Menimpa di atas tombol TERAPKAN - tombol TERAPKAN tidak bergeser) */}
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

                  {/* Tombol TERAPKAN (Fixed Position di dalam card - Tidak Bergeser Turun Sama Sekali) */}
                  <button
                    onClick={handleApplyFilter}
                    type="button"
                    className="w-full h-[46px] sm:h-[48px] bg-[#0B1A3A] hover:bg-[#07132B] text-white font-bold text-sm tracking-wider uppercase rounded-full mt-4 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                  >
                    TERAPKAN
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Kolom Hasil Pencarian (Melebar saat Filter Ditutup) ── */}
          <div
            className={
              isFilterOpen
                ? 'lg:col-span-8 xl:col-span-9 w-full min-w-0 transition-all duration-200'
                : 'lg:col-span-12 w-full min-w-0 transition-all duration-200'
            }
          >
            {/* Header Hasil & Pengurutan */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
              <div className="flex items-center gap-3">
                {/* Tombol Filter saat Filter Sidebar disembunyikan (Melebar Full Width) */}
                {!isFilterOpen && (
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(true)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors cursor-pointer shrink-0"
                    title="Buka Filter"
                  >
                    <Filter className="w-3.5 h-3.5 text-gray-500" />
                    <span>Filter</span>
                  </button>
                )}

                <p className="text-xs sm:text-sm text-gray-600">
                  Ditemukan{' '}
                  <span className={`font-bold ${totalResult === 0 ? 'text-rose-500' : 'text-amber-500'}`}>
                    {totalResult}
                  </span>{' '}
                  hasil {searchQuery && <span>untuk "{searchQuery}"</span>}
                </p>
              </div>

              {/* Sort Dropdown Pill */}
              <div ref={sortRef} className="relative self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsSortOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors cursor-pointer"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                  <span>
                    {sort === 'terbaru'
                      ? 'Tahun Terbaru'
                      : sort === 'terlama'
                      ? 'Tahun Terlama'
                      : 'Relavansi'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                      isSortOpen ? 'rotate-180 text-pr-900' : ''
                    }`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 mt-1.5 w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40">
                    <button
                      type="button"
                      onClick={() => handleSortChange('relevansi')}
                      className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        sort === 'relevansi'
                          ? 'bg-blue-50 text-pr-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>Relavansi</span>
                      {sort === 'relevansi' && <Check className="w-3 h-3 text-pr-900" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortChange('terbaru')}
                      className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        sort === 'terbaru'
                          ? 'bg-blue-50 text-pr-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>Tahun Terbaru</span>
                      {sort === 'terbaru' && <Check className="w-3 h-3 text-pr-900" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortChange('terlama')}
                      className={`w-full px-3 py-1.5 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        sort === 'terlama'
                          ? 'bg-blue-50 text-pr-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>Tahun Terlama</span>
                      {sort === 'terlama' && <Check className="w-3 h-3 text-pr-900" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* State Loading / Hasil / Empty State */}
            {isSearching ? (
              <div className="py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-pr-900 mb-3"></div>
                <p className="text-xs sm:text-sm font-medium">Mencari peraturan...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((item) => {
                  const statusName = item.status_peraturan?.nama_status ?? 'Tidak diketahui';

                  return (
                    <Link
                      href={`/peraturan/${item.unique_id}`}
                      key={item.id}
                      className="block bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:shadow-md hover:border-pr-900 transition-all group cursor-pointer"
                    >
                      <div className="flex flex-wrap gap-2 items-center mb-3 sm:mb-4">
                        <Badge
                          variant={getStatusVariant(statusName)}
                          className="flex items-center gap-1.5 px-3 py-1 font-semibold rounded-full border border-transparent text-[11px] sm:text-xs"
                        >
                          {getStatusIcon(statusName)}
                          {statusName}
                        </Badge>
                        <span className="bg-[#0B132B] text-white text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full">
                          {item.jenis_peraturan?.nama ?? 'Peraturan'}
                        </span>
                      </div>

                      <h3 className="text-[14px] font-bold text-gray-900 mb-3 sm:mb-4 line-clamp-2 leading-snug group-hover:text-pr-900 transition-colors">
                        {item.judul}
                      </h3>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-50">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] text-gray-500 font-medium">
                          <span>Tahun {item.tahun}</span>
                          <span className="w-px h-3.5 bg-gray-200"></span>
                          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full group-hover:bg-gray-200 transition-colors text-[11px]">
                            {item.instansi || 'Pemerintah Pusat'}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 text-gray-700 text-[12px] font-semibold rounded-full group-hover:bg-pr-900 group-hover:text-white transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Detail</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {/* ── Pagination Controls ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                    {/* Per-Page Selector */}
                    <div ref={perPageRef} className="relative flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <span>Lihat</span>
                      <button
                        type="button"
                        onClick={() => setIsPerPageOpen((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-2 focus:outline-none focus:ring-2 focus:ring-pr-900 text-xs font-medium shadow-2xs cursor-pointer"
                      >
                        <span>{perPage}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                            isPerPageOpen ? 'rotate-180 text-pr-900' : ''
                          }`}
                        />
                      </button>

                      {isPerPageOpen && (
                        <div className="absolute bottom-[calc(100%+6px)] left-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-40 w-16 text-center">
                          {[10, 15, 20, 50, 100].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handlePerPageChange(num)}
                              className={`w-full py-1 text-xs transition-colors cursor-pointer ${
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

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => (typeof page === 'number' ? handlePageChange(page) : null)}
                          disabled={page === '...'}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            page === currentPage
                              ? 'bg-[#0B132B] text-white shadow-sm'
                              : page === '...'
                              ? 'text-gray-400 cursor-default'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage || lastPage === 0}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto justify-center cursor-pointer"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* ── Empty State Sesuai Screenshot 2 ── */
              <div className="border border-dashed border-gray-300 rounded-2xl p-12 sm:p-20 text-center flex flex-col items-center justify-center bg-white shadow-2xs">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-4 text-gray-400 bg-gray-50/50">
                  <Scale className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
                  Hasil tidak ditemukan untuk kata kunci tersebut
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md">
                  Ups, kata kunci yang kamu cari tidak ada. Coba cek ejaan atau gunakan kata lain.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

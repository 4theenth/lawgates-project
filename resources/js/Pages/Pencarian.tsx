import { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useAuthModal } from '@/hooks/useAuthModal';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { Pagination } from '@/Components/common/Pagination';
import { RegulationCard } from '@/Components/peraturan/RegulationCard';
import { RegulationEmptyState } from '@/Components/peraturan/RegulationEmptyState';
import { SearchInput } from '@/Components/common/SearchInput';
import { CategoryFilterPopover } from '@/Components/kategori/CategoryFilterPopover';
import { FilterOption } from '@/types/peraturan';
import { SearchSortBar } from '@/Components/search/SearchSortBar';
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
  X,
} from 'lucide-react';

export default function Pencarian() {
  const { requireAuth } = useAuthModal();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const [totalResult, setTotalResult] = useState(0);

  // State pencarian & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string[]>([]);
  const [tahunDari, setTahunDari] = useState('');
  const [tahunSampai, setTahunSampai] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedLokasi, setSelectedLokasi] = useState<string[]>([]);
  const [selectedSubjek, setSelectedSubjek] = useState<string[]>([]);
  const [sort, setSort] = useState('relevansi');

  // State tampilan
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<'kategori' | 'tahun' | 'status' | 'lokasi' | 'subjek' | null>(null);
  const [isResetSpinning, setIsResetSpinning] = useState(false);

  const [lokasiSearchQuery, setLokasiSearchQuery] = useState('');
  const [subjekSearchQuery, setSubjekSearchQuery] = useState('');

  // State referensi dropdown
  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);
  const [listLokasi, setListLokasi] = useState<string[]>([]);
  const [listSubjek, setListSubjek] = useState<string[]>([]);

  // State pagination
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const filterSidebarRef = useRef<HTMLDivElement>(null);
  const lastFetchedQueryRef = useRef<string | null>(null);

  // Sub-dropdown tahun (dari / sampai)
  const [openYearSub, setOpenYearSub] = useState<{ dari: boolean; sampai: boolean }>({
    dari: true,
    sampai: true,
  });

  // 1. Ambil data referensi filter saat dimuat
  useEffect(() => {
    axios
      .get('/api/referensi-filter')
      .then((res) => {
        const data = res.data;
        setListKategori(data.kategori || []);
        setListStatus(data.status || []);
        setListTahun(data.tahun || []);
        setListLokasi(data.lokasi_daerah || []);
        setListSubjek(data.subjek || []);
      })
      .catch((err) => console.error('Gagal memuat referensi:', err));
  }, []);

  const updateBrowserUrl = (queryString: string) => {
    if (typeof window === 'undefined') return;
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    const currentState = window.history.state;
    if (currentState && typeof currentState === 'object' && currentState.page) {
      window.history.replaceState(
        {
          ...currentState,
          page: {
            ...currentState.page,
            url: newUrl,
          },
        },
        '',
        newUrl
      );
    } else {
      window.history.replaceState(currentState, '', newUrl);
    }
  };

  const syncWithUrlParams = () => {
    const params = new URLSearchParams(window.location.search);

    const initialKeyword = params.get('keyword') || params.get('q') || '';
    setSearchQuery(initialKeyword);

    const catParam = params.get('kategori_id') || params.get('kategori') || '';
    if (catParam) {
      setSelectedKategori(catParam.split(',').filter(Boolean));
    } else {
      setSelectedKategori([]);
    }

    const statusParam = params.get('status_id') || params.get('status') || '';
    if (statusParam) {
      setSelectedStatus(statusParam.split(',').filter(Boolean));
    } else {
      setSelectedStatus([]);
    }

    const lokasiParam = params.get('lokasi_daerah') || '';
    if (lokasiParam) {
      setSelectedLokasi(lokasiParam.split(',').filter(Boolean));
    } else {
      setSelectedLokasi([]);
    }

    const subjekParam = params.get('subjek') || '';
    if (subjekParam) {
      setSelectedSubjek(subjekParam.split(',').filter(Boolean));
    } else {
      setSelectedSubjek([]);
    }

    const yearParam = params.get('tahun') || '';
    if (yearParam.includes('-')) {
      const [start, end] = yearParam.split('-');
      setTahunDari(start.trim());
      setTahunSampai(end.trim());
    } else if (yearParam) {
      setTahunDari(yearParam);
      setTahunSampai(yearParam);
    } else {
      setTahunDari('');
      setTahunSampai('');
    }

    setSort(params.get('sort') || 'relevansi');

    const urlPage = parseInt(params.get('page') || '1');
    setCurrentPage(urlPage);
    const urlPerPage = parseInt(params.get('per_page') || '10');
    setPerPage(urlPerPage);

    fetchData(params.toString());
  };

  // 2. Sinkronisasi dengan URL search params saat pertama kali dimuat dan navigasi browser (popstate)
  useEffect(() => {
    syncWithUrlParams();

    const handlePopState = () => {
      syncWithUrlParams();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const fetchData = (queryString: string) => {
    lastFetchedQueryRef.current = queryString;
    setIsSearching(true);
    axios
      .get(`/api/search?${queryString}`)
      .then((res) => {
        const data = res.data;
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

  // Fallback opsi
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

  const subjekOptions: FilterOption[] = listSubjek
    .filter(s => s.toLowerCase().includes(subjekSearchQuery.toLowerCase()))
    .map((s) => ({
      value: s,
      label: s,
    }))
    .sort((a, b) => {
      const aSelected = selectedSubjek.includes(a.value);
      const bSelected = selectedSubjek.includes(b.value);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

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

  const applyFilters = (overrides: Record<string, any> = {}) => {
    const params = new URLSearchParams();

    const currentQuery =
      overrides.keyword !== undefined ? overrides.keyword : searchQuery;
    const currentKategori =
      overrides.kategori_id !== undefined
        ? overrides.kategori_id
        : selectedKategori.length > 0 &&
          (kategoriOptions.length === 0 ||
            selectedKategori.length < kategoriOptions.length)
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

    const isPerdaSelected = (() => {
      const targetCats = overrides.kategori_id !== undefined
        ? (overrides.kategori_id ? String(overrides.kategori_id).split(',') : [])
        : selectedKategori;

      return targetCats.some((id) => {
        const k = listKategori.find((x) => String(x.id) === String(id));
        if (!k) return false;
        return k.nama.toLowerCase().includes('perda') || k.nama.toLowerCase().includes('peraturan daerah');
      });
    })();

    const currentLokasi =
      overrides.lokasi_daerah !== undefined
        ? overrides.lokasi_daerah
        : selectedLokasi.length > 0 && isPerdaSelected
          ? selectedLokasi.join(',')
          : '';

    const currentSubjek =
      overrides.subjek !== undefined
        ? overrides.subjek
        : selectedSubjek.length > 0
          ? selectedSubjek.join(',')
          : '';

    const currentSort = overrides.sort !== undefined ? overrides.sort : sort;
    const currentPerPage =
      overrides.per_page !== undefined ? overrides.per_page : perPage;
    const page = overrides.page !== undefined ? overrides.page : 1;

    if (currentQuery) params.set('keyword', currentQuery);
    if (currentKategori) params.set('kategori_id', currentKategori);
    if (formattedTahun) params.set('tahun', formattedTahun);
    if (currentStatus) params.set('status_id', currentStatus);
    if (currentLokasi) params.set('lokasi_daerah', currentLokasi);
    if (currentSubjek) params.set('subjek', currentSubjek);
    if (currentSort) params.set('sort', currentSort);
    if (currentPerPage) params.set('per_page', currentPerPage.toString());
    if (page > 1) params.set('page', page.toString());

    updateBrowserUrl(params.toString());
    fetchData(params.toString());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ page: 1 });
  };

  const handleApplyFilter = () => {
    applyFilters({ page: 1 });
  };

  const isFormDirty =
    searchQuery.trim() !== '' ||
    selectedKategori.length > 0 ||
    selectedStatus.length > 0 ||
    selectedLokasi.length > 0 ||
    selectedSubjek.length > 0 ||
    tahunDari !== '' ||
    tahunSampai !== '' ||
    sort !== 'relevansi' ||
    perPage !== 10;

  const isDataFiltered =
    (lastFetchedQueryRef.current !== null &&
      lastFetchedQueryRef.current !== '') ||
    (typeof window !== 'undefined' &&
      Boolean(
        window.location.search && window.location.search !== '?'
      )) ||
    currentPage > 1;

  const handleResetFilter = () => {
    // Jalankan animasi putar halus setiap kali tombol diklik
    setIsResetSpinning(false);
    requestAnimationFrame(() => {
      setIsResetSpinning(true);
    });

    if (isSearching) return;

    if (!isFormDirty && !isDataFiltered) {
      return;
    }

    setSearchQuery('');
    setSelectedKategori([]);
    setTahunDari('');
    setTahunSampai('');
    setSelectedStatus([]);
    setSelectedLokasi([]);
    setSelectedSubjek([]);
    setSort('relevansi');
    setPerPage(10);
    setCurrentPage(1);

    updateBrowserUrl('');

    if (isDataFiltered) {
      fetchData('');
    }
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
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
    applyFilters({ per_page: newPerPage, page: 1 });
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

  const isPerdaSelected = selectedKategori.some((id) => {
    const k = listKategori.find((x) => String(x.id) === String(id));
    if (!k) return false;
    return k.nama.toLowerCase().includes('perda') || k.nama.toLowerCase().includes('peraturan daerah');
  });

  // Watch for Perda unselect to clear lokasi
  useEffect(() => {
    if (!isPerdaSelected && selectedLokasi.length > 0) {
      setSelectedLokasi([]);
    }
  }, [isPerdaSelected]);

  // Teks label trigger Lokasi
  let lokasiLabel = 'Semua Daerah';
  if (selectedLokasi.length === 0) {
    lokasiLabel = 'Semua Daerah';
  } else if (selectedLokasi.length === 1) {
    lokasiLabel = selectedLokasi[0];
  } else if (selectedLokasi.length > 1) {
    lokasiLabel = `${selectedLokasi.length} Daerah`;
  }

  const filteredLokasi = listLokasi
    .filter(l => l.toLowerCase().includes(lokasiSearchQuery.toLowerCase()))
    .sort((a, b) => {
      const aSelected = selectedLokasi.includes(a);
      const bSelected = selectedLokasi.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

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
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={handleSearchSubmit}
          onClear={() => setSearchQuery('')}
          placeholder="Cari peraturan yang ada di Indonesia..."
          className="mb-6 sm:mb-8"
        />

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
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${activeDropdown === 'kategori' ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {/* Floating Dropdown Kategori (Menimpa di atas tanpa menggeser tombol TERAPKAN dan input lain) */}
                    {activeDropdown === 'kategori' && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 space-y-2.5 shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                        {kategoriOptions.map((item) => {
                          const isChecked = selectedKategori.includes(item.value);
                          const isPerdaItem = item.label.toLowerCase().includes('perda') || item.label.toLowerCase().includes('peraturan daerah');

                          return (
                            <div key={item.value} className="flex flex-col">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedKategori((prev) =>
                                    prev.includes(item.value)
                                      ? prev.filter((v) => v !== item.value)
                                      : [...prev, item.value]
                                  );
                                }}
                                className={`w-full text-left flex items-center gap-3 cursor-pointer group ${isPerdaItem && isChecked ? 'mb-2' : ''}`}
                              >
                                <div
                                  className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${isChecked
                                    ? 'bg-[#0B1A3A] border-[#0B1A3A] text-white'
                                    : 'border-gray-300 bg-white group-hover:border-gray-400'
                                    }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                                </div>
                                <span className="text-sm text-gray-700 select-none">{item.label}</span>
                              </button>

                              {isPerdaItem && isChecked && (
                                <div className="pl-[30px] pr-1 pb-1 flex flex-col gap-2">
                                  <div className="relative">
                                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                      type="text"
                                      value={lokasiSearchQuery}
                                      onChange={(e) => setLokasiSearchQuery(e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      placeholder="Cari daerah..."
                                      className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-pr-900 focus:bg-white transition-all"
                                    />
                                  </div>
                                  <div className="max-h-40 overflow-y-auto space-y-1 custom-scrollbar pr-1">
                                    {filteredLokasi.length === 0 ? (
                                      <div className="text-center py-2 text-xs text-gray-400">
                                        Daerah tidak ditemukan
                                      </div>
                                    ) : (
                                      filteredLokasi.map((lokasi) => {
                                        const isLokasiChecked = selectedLokasi.includes(lokasi);
                                        return (
                                          <label
                                            key={lokasi}
                                            className="flex items-start gap-2.5 cursor-pointer group py-1"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setSelectedLokasi((prev) =>
                                                prev.includes(lokasi)
                                                  ? prev.filter((v) => v !== lokasi)
                                                  : [...prev, lokasi]
                                              );
                                            }}
                                          >
                                            <div
                                              className={`w-[14px] h-[14px] mt-0.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${isLokasiChecked
                                                ? 'bg-[#0B1A3A] border-[#0B1A3A] text-white'
                                                : 'border-gray-300 bg-white group-hover:border-gray-400'
                                                }`}
                                            >
                                              {isLokasiChecked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                                            </div>
                                            <span className="text-xs text-gray-600 leading-[1.4] break-words flex-1 select-none">
                                              {lokasi}
                                            </span>
                                          </label>
                                        );
                                      })
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
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
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${activeDropdown === 'tahun' ? 'rotate-180' : ''
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
                                className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${openYearSub.dari ? 'rotate-180' : ''
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
                                      className={`w-full px-2.5 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${isSelected
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
                                className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${openYearSub.sampai ? 'rotate-180' : ''
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
                                      className={`w-full px-2.5 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${isSelected
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
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${activeDropdown === 'status' ? 'rotate-180' : ''
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
                                className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${isChecked
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

                  {/* 4. Filter Subjek (Floating Overlay Dropdown) */}
                  <div className={`relative ${activeDropdown === 'subjek' ? 'z-40' : 'z-0'}`}>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      Subjek
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveDropdown((prev) => (prev === 'subjek' ? null : 'subjek'))}
                      className="flex items-center w-full min-h-[46px] py-1.5 px-3.5 bg-white border border-gray-200 rounded-xl text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
                    >
                      <div className="flex-1 flex flex-wrap gap-1 items-center">
                        {selectedSubjek.map((subjek) => (
                          <span
                            key={subjek}
                            className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700 border border-gray-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSubjek((prev) => prev.filter((s) => s !== subjek));
                            }}
                          >
                            <X className="w-3 h-3 shrink-0 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                            {subjek}
                          </span>
                        ))}
                        {activeDropdown === 'subjek' ? (
                          <input
                            type="text"
                            value={subjekSearchQuery}
                            onChange={(e) => setSubjekSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Cari subjek..."
                            className="flex-1 min-w-[100px] bg-transparent border-none p-0 text-xs sm:text-sm text-gray-700 outline-none focus:ring-0 placeholder:text-gray-400"
                            autoFocus
                          />
                        ) : (
                          selectedSubjek.length === 0 && (
                            <span className="text-xs sm:text-sm text-gray-700">Semua Subjek</span>
                          )
                        )}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 shrink-0 ml-2 transition-transform ${
                          activeDropdown === 'subjek' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {activeDropdown === 'subjek' && (
                      <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 shadow-2xl z-50">
                        <div className="space-y-2.5 max-h-60 overflow-y-auto custom-thin-scrollbar pr-1">
                          {subjekOptions.length === 0 ? (
                            <div className="text-center py-2 text-xs text-gray-400">Tidak ada subjek</div>
                          ) : (
                            subjekOptions.map((item) => {
                              const isChecked = selectedSubjek.includes(item.value);
                              return (
                                <button
                                  key={item.value}
                                  type="button"
                                  onClick={() => {
                                    setSelectedSubjek((prev) =>
                                      prev.includes(item.value)
                                        ? prev.filter((v) => v !== item.value)
                                        : [...prev, item.value]
                                    );
                                  }}
                                  className="w-full text-left flex items-start gap-3 cursor-pointer group"
                                >
                                  <div
                                    className={`w-[18px] h-[18px] mt-0.5 rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                                      isChecked
                                        ? 'bg-[#0B1A3A] border-[#0B1A3A] text-white'
                                        : 'border-gray-300 bg-white group-hover:border-gray-400'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                                  </div>
                                  <span className="text-sm text-gray-700 leading-tight">{item.label}</span>
                                </button>
                              );
                            })
                          )}
                        </div>
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
            <SearchSortBar
              totalResult={totalResult}
              searchQuery={searchQuery}
              sort={sort}
              onSortChange={handleSortChange}
              isFilterOpen={isFilterOpen}
              onOpenFilter={() => setIsFilterOpen(true)}
            />

            {/* State Loading / Hasil / Empty State */}
            {isSearching ? (
              <div className="py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-pr-900 mb-3"></div>
                <p className="text-xs sm:text-sm font-medium">
                  Mencari peraturan...
                </p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((item) => (
                  <RegulationCard
                    key={item.id}
                    item={item}
                    variant="list"
                    onClick={() => {
                      requireAuth(() => {
                        router.visit(`/peraturan/${item.unique_id}`);
                      });
                    }}
                  />
                ))}

                {/* ── Pagination Controls ── */}
                <Pagination
                  currentPage={currentPage}
                  lastPage={lastPage}
                  perPage={perPage}
                  onPageChange={handlePageChange}
                  onPerPageChange={handlePerPageChange}
                />
              </div>
            ) : (
              /* ── Empty State ── */
              <RegulationEmptyState isSearchNotFound={true} />
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

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
  const [sort, setSort] = useState('relevansi');

  // State tampilan
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isResetSpinning, setIsResetSpinning] = useState(false);

  // State referensi dropdown
  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);

  // State pagination
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const lastFetchedQueryRef = useRef<string | null>(null);

  // 1. Ambil data referensi filter saat dimuat
  useEffect(() => {
    axios
      .get('/api/referensi-filter')
      .then((res) => {
        const data = res.data;
        setListKategori(data.kategori || []);
        setListStatus(data.status || []);
        setListTahun(data.tahun || []);
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
          (statusOptions.length === 0 ||
            selectedStatus.length < statusOptions.length)
        ? selectedStatus.join(',')
        : '';
    const currentSort = overrides.sort !== undefined ? overrides.sort : sort;
    const currentPerPage =
      overrides.per_page !== undefined ? overrides.per_page : perPage;
    const page = overrides.page !== undefined ? overrides.page : 1;

    if (currentQuery) params.set('keyword', currentQuery);
    if (currentKategori) params.set('kategori_id', currentKategori);
    if (formattedTahun) params.set('tahun', formattedTahun);
    if (currentStatus) params.set('status_id', currentStatus);
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
            <div className="lg:col-span-4 xl:col-span-3 w-full">
              <CategoryFilterPopover
                variant="sidebar"
                showKategori={true}
                kategoriOptions={kategoriOptions}
                selectedKategori={selectedKategori}
                setSelectedKategori={setSelectedKategori}
                statusOptions={statusOptions}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                availableYears={availableYears}
                tahunDari={tahunDari}
                setTahunDari={setTahunDari}
                tahunSampai={tahunSampai}
                setTahunSampai={setTahunSampai}
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
                onClose={() => setIsFilterOpen(false)}
              />
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

import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useFilterReferences } from '@/hooks/useFilterReferences';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { Pagination } from '@/Components/common/Pagination';
import { RegulationCard } from '@/Components/peraturan/RegulationCard';
import { RegulationEmptyState } from '@/Components/peraturan/RegulationEmptyState';
import { SearchInput } from '@/Components/common/SearchInput';
import { FilterOption } from '@/types/peraturan';
import { SearchSortBar } from '@/Components/search/SearchSortBar';
import { SearchFilterSidebar } from '@/Components/search/filters';

export default function Pencarian() {
  const { requireAuth } = useAuthModal();
  const {
    listKategori,
    kategoriOptions,
    statusOptions,
    listSubjek,
    allFlatLokasi,
    availableYears,
  } = useFilterReferences();

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
  const [sort, setSort] = useState('');

  // State tampilan: di mobile (< 1024px) default tertutup agar tidak menutupi hasil peraturan, di desktop (>= 1024px) default terbuka
  const [isFilterOpen, setIsFilterOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });
  const [activeDropdown, setActiveDropdown] = useState<'kategori' | 'tahun' | 'status' | 'lokasi' | 'subjek' | null>(null);
  const [isResetSpinning, setIsResetSpinning] = useState(false);
  const [subjekSearchQuery, setSubjekSearchQuery] = useState('');

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

  const handleToggleLokasi = (lokasi: string) => {
    setSelectedLokasi((prev) =>
      prev.includes(lokasi) ? prev.filter((v) => v !== lokasi) : [...prev, lokasi]
    );
  };

  const handleRemoveLokasi = (lokasi: string) => {
    setSelectedLokasi((prev) => prev.filter((v) => v !== lokasi));
  };

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

    setSort(params.get('sort') || '');

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

  const subjekOptions: FilterOption[] = listSubjek
    .filter((s) => s.toLowerCase().includes(subjekSearchQuery.toLowerCase()))
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
        : selectedLokasi.length > 0 && (isPerdaSelected || selectedKategori.length === 0)
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
    if (currentSort) {
      params.set('sort', currentSort);
    } else {
      params.delete('sort');
    }
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
    // Di layar mobile (< 1024px), otomatis tutup filter setelah klik 'Terapkan' agar pengguna langsung melihat hasil
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsFilterOpen(false);
    }
  };

  const isFormDirty =
    searchQuery.trim() !== '' ||
    selectedKategori.length > 0 ||
    selectedStatus.length > 0 ||
    selectedLokasi.length > 0 ||
    selectedSubjek.length > 0 ||
    tahunDari !== '' ||
    tahunSampai !== '' ||
    sort !== '' ||
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
    setSort('');
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
              { label: 'Pencarian Hukum', href: searchQuery || selectedKategori.length > 0 ? '/pencarian' : undefined },
              ...(searchQuery ? [{ label: `Hasil: "${searchQuery}"` }] : []),
            ]}
            className="mb-4 sm:mb-6 text-xs text-neu-500"
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
              <SearchFilterSidebar
                onClose={() => setIsFilterOpen(false)}
                onReset={handleResetFilter}
                isResetSpinning={isResetSpinning}
                onAnimationEnd={() => setIsResetSpinning(false)}
                onApply={handleApplyFilter}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                kategoriLabel={kategoriLabel}
                kategoriOptions={kategoriOptions}
                selectedKategori={selectedKategori}
                setSelectedKategori={setSelectedKategori}
                allFlatLokasi={allFlatLokasi}
                selectedLokasi={selectedLokasi}
                onToggleLokasi={handleToggleLokasi}
                onRemoveLokasi={handleRemoveLokasi}
                tahunLabel={tahunLabel}
                tahunDari={tahunDari}
                setTahunDari={setTahunDari}
                tahunSampai={tahunSampai}
                setTahunSampai={setTahunSampai}
                availableYears={availableYears}
                openYearSub={openYearSub}
                setOpenYearSub={setOpenYearSub}
                statusLabel={statusLabel}
                statusOptions={statusOptions}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedSubjek={selectedSubjek}
                setSelectedSubjek={setSelectedSubjek}
                subjekSearchQuery={subjekSearchQuery}
                setSubjekSearchQuery={setSubjekSearchQuery}
                subjekOptions={subjekOptions}
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

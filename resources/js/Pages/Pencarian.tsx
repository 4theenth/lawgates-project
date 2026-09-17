import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { EmptyState } from '@/Components/admin/EmptyState';
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
  SlidersHorizontal,
} from 'lucide-react';

export default function Pencarian() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const [totalResult, setTotalResult] = useState(0);

  // State untuk nilai filter & pencarian
  const [searchQuery, setSearchQuery] = useState('');
  const [kategori, setKategori] = useState('');
  const [tahun, setTahun] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('relevansi');

  // State tampilan filter (bisa disembunyikan/dikecilkan)
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // State untuk daftar referensi dropdown
  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);

  // State untuk pagination
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // 1. Ambil data referensi filter saat komponen dimuat
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

  // 2. Lakukan pencarian berdasarkan parameter URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Sinkronkan state dengan URL
    setSearchQuery(params.get('keyword') || params.get('q') || '');
    setKategori(params.get('kategori_id') || params.get('kategori') || '');
    setTahun(params.get('tahun') || '');
    setStatus(params.get('status_id') || params.get('status') || '');
    setSort(params.get('sort') || 'relevansi');

    const urlPage = parseInt(params.get('page') || '1');
    setCurrentPage(urlPage);
    const urlPerPage = parseInt(params.get('per_page') || '10');
    setPerPage(urlPerPage);

    fetchData(params.toString());
  }, []);

  const fetchData = (queryString: string) => {
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

  const applyFilters = (overrides: Record<string, any> = {}) => {
    const params = new URLSearchParams();

    const currentQuery = overrides.keyword !== undefined ? overrides.keyword : searchQuery;
    const currentKategori = overrides.kategori_id !== undefined ? overrides.kategori_id : kategori;
    const currentTahun = overrides.tahun !== undefined ? overrides.tahun : tahun;
    const currentStatus = overrides.status_id !== undefined ? overrides.status_id : status;
    const currentSort = overrides.sort !== undefined ? overrides.sort : sort;
    const currentPerPage = overrides.per_page !== undefined ? overrides.per_page : perPage;
    const page = overrides.page !== undefined ? overrides.page : 1;

    if (currentQuery) params.set('keyword', currentQuery);
    if (currentKategori) params.set('kategori_id', currentKategori);
    if (currentTahun) params.set('tahun', currentTahun);
    if (currentStatus) params.set('status_id', currentStatus);
    if (currentSort) params.set('sort', currentSort);
    if (currentPerPage) params.set('per_page', currentPerPage.toString());
    if (page > 1) params.set('page', page.toString());

    window.history.pushState(null, '', `?${params.toString()}`);
    fetchData(params.toString());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ page: 1 });
  };

  const handleApplyFilter = () => {
    applyFilters({ page: 1 });
  };

  const handleResetFilter = () => {
    setSearchQuery('');
    setKategori('');
    setTahun('');
    setStatus('');
    setSort('relevansi');
    setPerPage(10);

    window.history.pushState(null, '', window.location.pathname);
    fetchData('');
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
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'danger':
        return <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
      case 'warning':
        return <RefreshCw className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'neutral':
        return <XOctagon className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <PublicLayout>
      <Head title="Pencarian Hukum - LawGates" />

      <div className="pt-24 pb-16 w-full max-w-[1240px] mx-auto px-3.5 sm:px-6 min-h-screen text-gray-900 font-sans min-w-0 overflow-x-hidden">
          {/* Header & Breadcrumb */}
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
              Cari dan telusuri seluruh peraturan hukum di Indonesia secara mudah dan interaktif.
            </p>
          </div>

          {/* Search Bar Besar */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6 sm:mb-8">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari peraturan, undang-undang, nomor, atau kata kunci..."
                className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 sm:py-4 pl-11 sm:pl-12 pr-28 sm:pr-32 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr-900 shadow-2xs"
              />
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-4 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#0B132B] hover:bg-opacity-90 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Grid Layout: Filter Sidebar & Search Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Kolom Filter (Collapsible) */}
            {isFilterOpen && (
              <div className="lg:col-span-4 xl:col-span-3 w-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="text-sm font-bold text-gray-900 flex items-center gap-2 hover:text-pr-900 transition-colors cursor-pointer group"
                      title="Klik untuk menyembunyikan filter"
                    >
                      <Filter className="w-4 h-4 text-gray-500 group-hover:text-pr-900 transition-colors" />
                      <span>Filter Pencarian</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleResetFilter}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Reset Filter"
                        type="button"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Filter Kategori */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Kategori Peraturan
                      </label>
                      <div className="relative">
                        <select
                          value={kategori}
                          onChange={(e) => setKategori(e.target.value)}
                          className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-pr-900 py-2.5 pl-3 pr-8 bg-white cursor-pointer appearance-none truncate"
                        >
                          <option value="">Semua kategori</option>
                          {listKategori.map((k) => (
                            <option key={k.id} value={k.id}>
                              {k.nama}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Filter Tahun */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Tahun
                      </label>
                      <div className="relative">
                        <select
                          value={tahun}
                          onChange={(e) => setTahun(e.target.value)}
                          className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-pr-900 py-2.5 pl-3 pr-8 bg-white cursor-pointer appearance-none"
                        >
                          <option value="">Semua Tahun</option>
                          {listTahun.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Filter Status */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                        Status Peraturan
                      </label>
                      <div className="relative">
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-pr-900 py-2.5 pl-3 pr-8 bg-white cursor-pointer appearance-none"
                        >
                          <option value="">Semua Status</option>
                          {listStatus.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.nama}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <button
                      onClick={handleApplyFilter}
                      type="button"
                      className="w-full mt-2 bg-[#0B132B] hover:bg-[#07132B] text-white font-semibold text-xs sm:text-sm py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                      Terapkan Filter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Kolom Hasil Pencarian */}
            <div className={isFilterOpen ? 'lg:col-span-8 xl:col-span-9 w-full min-w-0' : 'lg:col-span-12 w-full min-w-0'}>
              {/* Header Hasil & Pengurutan */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
                <div className="flex items-center gap-2.5">
                  {!isFilterOpen && (
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                      <span>Buka Filter</span>
                    </button>
                  )}
                  <p className="text-xs sm:text-sm text-gray-600">
                    Ditemukan{' '}
                    <span className="font-bold text-yellow-600">{totalResult}</span> hasil{' '}
                    {searchQuery && <span>untuk "{searchQuery}"</span>}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs sm:text-sm text-gray-500">Urutkan:</span>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="text-xs sm:text-sm text-[#0B132B] border border-gray-200 rounded-xl py-1.5 pl-3 pr-8 focus:ring-pr-900 bg-white cursor-pointer font-medium appearance-none"
                    >
                      <option value="relevansi">Relevansi</option>
                      <option value="terbaru">Tahun Terbaru</option>
                      <option value="terlama">Tahun Terlama</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
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
                      /* Seluruh card dibungkus oleh Link (dapat diklik langsung) */
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

                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4 sm:mb-5 line-clamp-2 leading-snug group-hover:text-pr-900 transition-colors">
                          {item.judul}
                        </h3>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-50">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 font-medium">
                            <span>Tahun {item.tahun}</span>
                            <span className="w-px h-3.5 bg-gray-200"></span>
                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full group-hover:bg-gray-200 transition-colors text-[11px]">
                              {item.instansi || 'Pemerintah Pusat'}
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full group-hover:bg-pr-900 group-hover:text-white transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat Detail</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}

                  {/* Pagination Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelumnya</span>
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <span>Lihat</span>
                        <div className="relative">
                          <select
                            value={perPage}
                            onChange={(e) => handlePerPageChange(Number(e.target.value))}
                            className="appearance-none bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-7 focus:outline-none focus:ring-2 focus:ring-pr-900 text-xs font-medium shadow-2xs"
                          >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                          <button
                            key={index}
                            onClick={() => (typeof page === 'number' ? handlePageChange(page) : null)}
                            disabled={page === '...'}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <EmptyState
                  title="Peraturan tidak ditemukan"
                  description="Coba gunakan kata kunci yang berbeda atau ubah filter pencarian Anda."
                />
              )}
            </div>
          </div>
        </div>
    </PublicLayout>
  );
}

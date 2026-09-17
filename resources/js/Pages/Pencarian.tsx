import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout, Section } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { EmptyState } from '@/Components/admin/EmptyState';
import { Badge } from '@/Components/common/Badge';
import { Search, Filter, RotateCcw, CheckCircle, XCircle, RefreshCw, XOctagon, Eye, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
      .then(res => res.json())
      .then(data => {
        setListKategori(data.kategori || []);
        setListStatus(data.status || []);
        setListTahun(data.tahun || []);
      })
      .catch(err => console.error("Gagal memuat referensi:", err));
  }, []);

  // 2. Lakukan pencarian berdasarkan parameter URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Sinkronkan state dengan URL
    setSearchQuery(params.get('keyword') || '');
    setKategori(params.get('kategori_id') || '');
    setTahun(params.get('tahun') || '');
    setStatus(params.get('status_id') || '');
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
      .then(res => res.json())
      .then(data => {
        setSearchResults(data.data || []);
        setTotalResult(data.total || 0);
        setCurrentPage(data.current_page || 1);
        setLastPage(data.last_page || 1);
        setIsSearching(false);
      })
      .catch(err => {
        console.error("Gagal melakukan pencarian:", err);
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
    if (currentSort && currentSort !== 'relevansi') params.set('sort', currentSort);
    if (currentPerPage !== 10) params.set('per_page', currentPerPage.toString());
    if (page > 1) params.set('page', page.toString());

    const queryString = params.toString();
    window.history.pushState(null, '', `?${queryString}`);
    fetchData(queryString);
  };

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > lastPage) return;
    applyFilters({ page });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    applyFilters({ per_page: newPerPage, page: 1 });
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    applyFilters({ sort: newSort, page: 1 });
  };

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= lastPage; i++) {
      if (i === 1 || i === lastPage || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i = 0; i < range.length; i++) {
      if (l) {
        if (range[i] - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (range[i] - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(range[i]);
      l = range[i];
    }
    return rangeWithDots;
  };

  const getStatusVariant = (statusName: string) => {
    const name = statusName?.toLowerCase() || '';
    if (name.includes('tidak berlaku')) return 'danger';
    if (name.includes('dicabut')) return 'neutral';
    if (name.includes('diubah')) return 'warning';
    return 'success'; 
  };

  const getStatusIcon = (statusName: string) => {
    const name = statusName?.toLowerCase() || '';
    if (name.includes('tidak berlaku')) return <XCircle className="w-3.5 h-3.5" />;
    if (name.includes('dicabut')) return <XOctagon className="w-3.5 h-3.5" />;
    if (name.includes('diubah')) return <RefreshCw className="w-3.5 h-3.5" />;
    return <CheckCircle className="w-3.5 h-3.5" />;
  };

  return (
    <PublicLayout>
      <Head title="Pencarian Hukum - LawGates" />
      
      <Section>
        <div className="pt-24 pb-16 w-full max-w-[1280px] mx-auto px-4 min-h-screen text-gray-900 font-sans">
          
          <div className="mb-8">
            <Breadcrumb 
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Pencarian Hukum' }
              ]} 
              className="mb-6 text-sm text-gray-500"
            />
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">Pencarian Hukum</h1>
            <p className="text-[15px] text-gray-500 mt-2">Pencarian lengkap untuk berbagai jenis undang-undang dan peraturan</p>
          </div>

          <form onSubmit={handleApplyFilter} className="w-full relative mb-10">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-full focus:ring-2 focus:ring-pr-900 focus:border-pr-900 text-[15px] shadow-sm outline-none placeholder:text-gray-400"
              placeholder="Cari peraturan yang ada di Indonesia..."
            />
          </form>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6 pb-5 border-b border-gray-100">
                  <h3 className="font-bold text-[15px] text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    Filter
                  </h3>
                  <button 
                    onClick={handleResetFilter} 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Reset Filter"
                    type="button"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Kategori</label>
                    <div className="relative">
                      <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full text-sm text-gray-600 border border-gray-200 rounded-xl focus:ring-pr-900 focus:border-pr-900 py-3 pl-4 pr-10 appearance-none bg-white outline-none cursor-pointer">
                        <option value="">Semua kategori</option>
                        {listKategori.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tahun</label>
                    <div className="relative">
                      <select value={tahun} onChange={(e) => setTahun(e.target.value)} className="w-full text-sm text-gray-600 border border-gray-200 rounded-xl focus:ring-pr-900 focus:border-pr-900 py-3 pl-4 pr-10 appearance-none bg-white outline-none cursor-pointer">
                        <option value="">Semua tahun</option>
                        {listTahun.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Status</label>
                    <div className="relative">
                      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full text-sm text-gray-600 border border-gray-200 rounded-xl focus:ring-pr-900 focus:border-pr-900 py-3 pl-4 pr-10 appearance-none bg-white outline-none cursor-pointer">
                        <option value="">Semua status</option>
                        {listStatus.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <button 
                    onClick={handleApplyFilter}
                    type="button"
                    className="w-full mt-2 bg-[#0B132B] text-white font-semibold text-sm py-3.5 rounded-full hover:bg-opacity-90 transition-colors shadow-sm"
                  >
                    TERAPKAN
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-[15px] text-gray-500">
                  Ditemukan <span className="font-bold text-yellow-500">{totalResult}</span> hasil {searchQuery && <span>untuk "{searchQuery}"</span>}
                </p>
                <div className="relative inline-block">
                  <select 
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="text-sm text-[#0B132B] border-2 border-[#0B132B] rounded-full py-2 pl-5 pr-10 focus:ring-0 focus:outline-none appearance-none bg-transparent cursor-pointer font-semibold"
                  >
                    <option value="relevansi">Relavansi</option>
                    <option value="terbaru">Tahun Terbaru</option>
                    <option value="terlama">Tahun Terlama</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col justify-center text-[#0B132B]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                  </div>
                </div>
              </div>

              {isSearching ? (
                <div className="py-12 text-center text-gray-500">Mencari peraturan...</div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-5">
                  {searchResults.map((item) => {
                    const statusName = item.status_peraturan?.nama_status ?? 'Tidak diketahui';
                    
                    return (
                      <Link 
                        href={`/peraturan/${item.unique_id}`}
                        key={item.id} 
                        className="block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-pr-900 transition-all group cursor-pointer"
                      >
                        
                        <div className="flex gap-2.5 items-center mb-4">
                          <Badge variant={getStatusVariant(statusName)} className="flex items-center gap-1.5 px-3 py-1 font-semibold rounded-full border border-transparent">
                            {getStatusIcon(statusName)}
                            {statusName}
                          </Badge>
                          <span className="bg-[#0B132B] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                            {item.jenis_peraturan?.nama ?? 'Peraturan'}
                          </span>
                        </div>

                        <h3 className="text-[17px] font-bold text-gray-900 mb-6 line-clamp-2 leading-snug group-hover:text-pr-900 transition-colors">
                          {item.judul}
                        </h3>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3 text-[13px] text-gray-500 font-medium">
                            <span>Tahun {item.tahun}</span>
                            <span className="w-px h-4 bg-gray-300"></span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full group-hover:bg-gray-200 transition-colors">
                              {item.instansi || 'Pemerintah Pusat'}
                            </span>
                          </div>
                          
                          <div 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full group-hover:bg-pr-900 group-hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Lihat Detail
                          </div>
                        </div>
                      </Link>
                    )
                  })}

                  <div className="flex flex-col sm:flex-row items-center justify-between mt-10 pt-4">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Sebelumnya
                    </button>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-4 sm:my-0">
                      <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                        <span>Lihat</span>
                        <div className="relative">
                          <select 
                            value={perPage} 
                            onChange={(e) => handlePerPageChange(Number(e.target.value))}
                            className="appearance-none bg-white border border-gray-200 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-pr-900 font-medium shadow-sm"
                          >
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                          <button
                            key={index}
                            onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                            disabled={page === '...'}
                            className={`w-9 h-9 flex items-center justify-center rounded-2xl text-sm font-medium transition-colors ${
                              page === currentPage 
                                ? 'bg-[#0B132B] text-white shadow-sm' 
                                : page === '...' 
                                ? 'text-gray-400 cursor-default' 
                                : 'text-gray-500 hover:bg-gray-100'
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
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Selanjutnya
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
      </Section>
    </PublicLayout>
  );
}
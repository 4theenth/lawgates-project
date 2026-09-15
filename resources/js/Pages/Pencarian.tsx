import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout, Section } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { EmptyState } from '@/Components/admin/EmptyState';
import { Badge } from '@/Components/common/Badge';
export default function Pencarian() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const [totalResult, setTotalResult] = useState(0);

  // State untuk nilai filter & pencarian
  const [searchQuery, setSearchQuery] = useState('');
  const [kategori, setKategori] = useState('');
  const [tahun, setTahun] = useState('');
  const [status, setStatus] = useState('');

  // State untuk daftar referensi dropdown
  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);

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

    fetchData(params.toString());
  }, []);

  const fetchData = (queryString: string) => {
    setIsSearching(true);
    fetch(`/api/search?${queryString}`)
      .then(res => res.json())
      .then(data => {
        setSearchResults(data.data || []);
        setTotalResult(data.total || data.data?.length || 0);
        setIsSearching(false);
      })
      .catch(err => {
        console.error("Gagal melakukan pencarian:", err);
        setIsSearching(false);
      });
  };

  // 3. Tangani saat tombol Terapkan atau Enter ditekan
  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery) params.set('keyword', searchQuery);
    if (kategori) params.set('kategori_id', kategori);
    if (tahun) params.set('tahun', tahun);
    if (status) params.set('status_id', status);

    const queryString = params.toString();
    window.history.pushState(null, '', `?${queryString}`);
    fetchData(queryString);
  };

  // Fungsi helper untuk menentukan variant Badge status
  const getStatusVariant = (statusName: string) => {
    const name = statusName?.toLowerCase() || '';
    if (name.includes('tidak berlaku') || name.includes('dicabut')) return 'danger';
    if (name.includes('diubah')) return 'warning';
    return 'success'; // Default Berlaku
  };

  return (
    <PublicLayout>
      <Head title="Pencarian Hukum - LawGates" />
      
      <Section>
        <div className="pt-28 pb-16 w-full max-w-7xl mx-auto px-4 min-h-screen text-gray-900">
          
          {/* Breadcrumb & Judul Halaman */}
          <div className="mb-6">
            <Breadcrumb 
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Pencarian Hukum' }
              ]} 
              className="mb-4"
            />
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Pencarian Hukum</h1>
            <p className="text-sm text-gray-500 mt-1">Pencarian lengkap untuk berbagai jenis undang-undang dan peraturan</p>
          </div>

          {/* Bilah Pencarian Utama */}
          <form onSubmit={handleApplyFilter} className="w-full relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pr-900 focus:border-pr-900 text-sm shadow-sm"
              placeholder="Cari peraturan yang ada di Indonesia..."
            />
          </form>

          {/* Grid Layout: Filter (Kiri) & Hasil (Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Filter */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter
                  </h3>
                  <button 
                    onClick={() => { setKategori(''); setTahun(''); setStatus(''); }} 
                    className="text-xs text-gray-400 hover:text-pr-900"
                    title="Reset Filter"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Kategori</label>
                    <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full text-sm border-gray-200 rounded-lg focus:ring-pr-900 py-2.5">
                      <option value="">Semua kategori</option>
                      {listKategori.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tahun</label>
                    <select value={tahun} onChange={(e) => setTahun(e.target.value)} className="w-full text-sm border-gray-200 rounded-lg focus:ring-pr-900 py-2.5">
                      <option value="">Semua tahun</option>
                      {listTahun.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full text-sm border-gray-200 rounded-lg focus:ring-pr-900 py-2.5">
                      <option value="">Semua status</option>
                      {listStatus.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)}
                    </select>
                  </div>

                  <button 
                    onClick={handleApplyFilter}
                    className="w-full mt-4 bg-pr-900 text-white font-semibold text-sm py-3 rounded-lg hover:bg-pr-800 transition-colors"
                  >
                    TERAPKAN
                  </button>
                </div>
              </div>
            </div>

            {/* Kolom Hasil Pencarian */}
            <div className="lg:col-span-9">
              {/* Header Hasil */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-sm text-gray-600">
                  Ditemukan <span className="font-bold text-pr-900">{totalResult}</span> hasil {searchQuery && <span>untuk "{searchQuery}"</span>}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Urutkan:</span>
                  <select className="text-sm border-gray-200 rounded-lg py-1.5 pl-3 pr-8 focus:ring-pr-900">
                    <option value="relevansi">Relavansi</option>
                    <option value="terbaru">Tahun Terbaru</option>
                    <option value="terlama">Tahun Terlama</option>
                  </select>
                </div>
              </div>

              {/* Daftar Kartu Hasil */}
              {isSearching ? (
                <div className="py-12 text-center text-gray-500">Mencari peraturan...</div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      
                      {/* Top Badges */}
                      <div className="flex gap-2 items-center mb-4">
                        <Badge variant={getStatusVariant(item.status_peraturan?.nama_status)} className="flex items-center gap-1.5 border border-current">
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {item.status_peraturan?.nama_status ?? 'Tidak diketahui'}
                        </Badge>
                        <Badge variant="primary" className="font-bold">
                          {item.jenis_peraturan?.nama ?? 'Peraturan'}
                        </Badge>
                      </div>

                      {/* Judul */}
                      <h3 className="text-[17px] font-bold text-gray-900 mb-6 line-clamp-2 leading-snug">
                        {item.judul}
                      </h3>

                      {/* Bottom Info & Action */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 font-medium">Tahun {item.tahun}</span>
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            {item.instansi || 'Pemerintah Pusat'}
                          </span>
                        </div>
                        
                        <a 
                          href={`/peraturan/${item.unique_id}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Lihat Detail
                        </a>
                      </div>

                    </div>
                  ))}
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
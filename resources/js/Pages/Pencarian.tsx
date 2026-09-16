import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { EmptyState } from '@/Components/admin/EmptyState';
import { SearchResultCard } from '@/Components/search/SearchResultCard';
import {
  DUMMY_SCRAPER_REGULATIONS,
  ScraperRegulationItem,
} from '@/data/dummyRegulations';
import { ChevronLeft, ChevronRight, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function Pencarian() {
  const [searchQuery, setSearchQuery] = useState('');
  const [kategori, setKategori] = useState('');
  const [tahun, setTahun] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('relevansi');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const itemsPerPage = 5;

  // Sinkronisasi parameter dari URL saat halaman pertama kali dimuat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchQuery(params.get('keyword') || params.get('q') || '');
    setKategori(params.get('kategori') || params.get('kategori_id') || '');
    setTahun(params.get('tahun') || '');
    setStatus(params.get('status') || params.get('status_id') || '');
  }, []);

  // Filter Data Dummy Scraper Python (AC 2, AC 3, AC 4, AC 5)
  const filteredResults = useMemo(() => {
    return DUMMY_SCRAPER_REGULATIONS.filter((item) => {
      const meta = item.metadata;

      // Filter Pencarian Teks (Kata Kunci / Konsep, misal: 'perpajakan')
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = meta.judul.toLowerCase().includes(query);
        const matchType = meta.tipe_peraturan.toLowerCase().includes(query);
        const matchId = meta.standard_id.toLowerCase().includes(query);
        const matchNumber = meta.nomor ? meta.nomor.includes(query) : false;
        if (!matchTitle && !matchType && !matchId && !matchNumber) {
          return false;
        }
      }

      // Filter Kategori (UU, PP, PERPRES, dsb)
      if (kategori && kategori !== '') {
        if (meta.tipe_peraturan.toLowerCase() !== kategori.toLowerCase()) {
          return false;
        }
      }

      // Filter Tahun
      if (tahun && tahun !== '') {
        if (meta.tahun !== tahun) {
          return false;
        }
      }

      // Filter Status (Berlaku / Tidak berlaku)
      if (status && status !== '') {
        if (meta.status.toLowerCase() !== status.toLowerCase()) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'terbaru') {
        return parseInt(b.metadata.tahun) - parseInt(a.metadata.tahun);
      }
      if (sortBy === 'terlama') {
        return parseInt(a.metadata.tahun) - parseInt(b.metadata.tahun);
      }
      return 0; // default relevansi
    });
  }, [searchQuery, kategori, tahun, status, sortBy]);

  // Reset pagination ke halaman 1 saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, kategori, tahun, status, sortBy]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(start, start + itemsPerPage);
  }, [filteredResults, currentPage]);

  // Daftar opsi unik untuk dropdown
  const listKategori = useMemo(() => {
    const set = new Set(DUMMY_SCRAPER_REGULATIONS.map((i) => i.metadata.tipe_peraturan));
    return Array.from(set);
  }, []);

  const listTahun = useMemo(() => {
    const set = new Set(DUMMY_SCRAPER_REGULATIONS.map((i) => i.metadata.tahun));
    return Array.from(set).sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('keyword', searchQuery);
    if (kategori) params.set('kategori', kategori);
    if (tahun) params.set('tahun', tahun);
    if (status) params.set('status', status);

    const queryString = params.toString();
    window.history.pushState(null, '', queryString ? `?${queryString}` : window.location.pathname);
  };

  const handleResetFilter = () => {
    setSearchQuery('');
    setKategori('');
    setTahun('');
    setStatus('');
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <PublicLayout>
      <Head title="Pencarian Hukum - LawGates" />

      <div className="pt-24 pb-16 w-full max-w-[1202px] mx-auto px-4 sm:px-6 xl:px-0 min-h-screen text-gray-900">
        {/* Breadcrumb & Judul Halaman */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Pencarian Hukum' },
            ]}
            className="mb-4"
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Pencarian Hukum
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pencarian lengkap untuk berbagai jenis undang-undang dan peraturan
          </p>
        </div>

        {/* Bilah Pencarian Utama */}
        <form onSubmit={handleApplyFilter} className="w-full relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pr-900 focus:border-pr-900 text-sm shadow-sm"
            placeholder="Cari peraturan yang ada di Indonesia (misal: perpajakan)..."
          />
        </form>

        {/* Grid Layout: Filter (Kiri) & Hasil (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filter (Collapsible saat icon/header filter diklik) */}
          {isFilterOpen && (
            <div className="lg:col-span-3 transition-all duration-300">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="font-semibold text-gray-800 flex items-center gap-2 hover:text-pr-900 transition-colors cursor-pointer group"
                    title="Tutup Filter"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-gray-500 group-hover:text-pr-900" />
                    <span>Filter</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetFilter}
                    className="text-xs text-gray-400 hover:text-pr-900 flex items-center gap-1 cursor-pointer transition-colors"
                    title="Reset Filter"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Filter Kategori */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Kategori
                    </label>
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      className="w-full text-sm border-gray-200 rounded-lg focus:ring-pr-900 py-2.5 bg-white cursor-pointer"
                    >
                      <option value="">Semua kategori</option>
                      {listKategori.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter Tahun */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Tahun
                    </label>
                    <select
                      value={tahun}
                      onChange={(e) => setTahun(e.target.value)}
                      className="w-full text-sm border-gray-200 rounded-lg focus:ring-pr-900 py-2.5 bg-white cursor-pointer"
                    >
                      <option value="">Semua tahun</option>
                      {listTahun.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter Status (Berlaku / Tidak berlaku) */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full text-sm border-gray-200 rounded-lg focus:ring-pr-900 py-2.5 bg-white cursor-pointer"
                    >
                      <option value="">Semua status</option>
                      <option value="Berlaku">Berlaku</option>
                      <option value="Tidak berlaku">Tidak berlaku</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyFilter}
                    className="w-full mt-4 bg-pr-900 text-white font-semibold text-sm py-3 rounded-lg hover:bg-pr-800 transition-colors cursor-pointer shadow-2xs"
                  >
                    TERAPKAN
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Kolom Hasil Pencarian */}
          <div className={isFilterOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
            {/* Header Hasil & Pengurutan */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-3">
                {!isFilterOpen && (
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(true)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                    <span>Buka Filter</span>
                  </button>
                )}
                <p className="text-sm text-gray-600">
                  Ditemukan{' '}
                  <span className="font-bold text-[#D4AF37]">
                    {filteredResults.length}
                  </span>{' '}
                  hasil {searchQuery && <span>untuk "{searchQuery}"</span>}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-200 rounded-lg py-1.5 pl-3 pr-8 focus:ring-pr-900 bg-white cursor-pointer"
                >
                  <option value="relevansi">Relevansi</option>
                  <option value="terbaru">Tahun Terbaru</option>
                  <option value="terlama">Tahun Terlama</option>
                </select>
              </div>
            </div>

            {/* Daftar Kartu Hasil Menggunakan Komponen Modular (AC 2, AC 3) */}
            {paginatedResults.length > 0 ? (
              <div className="space-y-4">
                {paginatedResults.map((item) => (
                  <SearchResultCard key={item.id} item={item} />
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelumnya</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                        (page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                              currentPage === page
                                ? 'bg-pr-900 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Empty State Sesuai AC 5: "Regulasi tidak ditemukan" */
              <EmptyState
                title="Regulasi tidak ditemukan"
                description="Coba gunakan kata kunci yang berbeda atau sesuaikan filter pencarian Anda."
              />
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
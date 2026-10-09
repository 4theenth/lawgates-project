import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ChevronDown, RotateCcw, Check, FileText } from 'lucide-react';
import { SearchResultCard } from '@/Components/search/SearchResultCard';
import { Pagination } from '@/Components/admin/Pagination';
import { CountUp } from '@/Components/common/CountUp';

// Default dummy regulations mirroring the exact Figma mockups (node #2337:54385)
const FIGMA_DUMMY_REGULATIONS = [
  {
    id: 'uud-1945-p2',
    judul: 'Perubahan Kedua Undang - Undang Dasar Negara Republik Indonesia Tahun 1945',
    tahun: 2000,
    instansi: 'MPR RI',
    pemrakarsa: 'MPR RI',
    jenis_peraturan: { id: 1, nama: 'UUD' },
    status_peraturan: { id: 1, nama_status: 'Berlaku' },
  },
  {
    id: 'perpres-12-2026',
    judul: 'Peraturan Presiden Nomor 12 Tahun 2026 Tentang Pemberian Penghargaan Olahraga',
    tahun: 2005,
    instansi: 'Pemerintah Pusat',
    pemrakarsa: 'Pemerintah Pusat',
    jenis_peraturan: { id: 5, nama: 'Peraturan Presiden' },
    status_peraturan: { id: 2, nama_status: 'Tidak Berlaku' },
  },
  {
    id: 'uu-11-2008',
    judul: 'Undang-Undang Nomor 11 Tahun 2008 tentang INFORMASI DAN TRANSAKSI ELEKTRONIK',
    tahun: 2008,
    instansi: 'Pemerintah Pusat',
    pemrakarsa: 'Pemerintah Pusat',
    jenis_peraturan: { id: 3, nama: 'Undang-Undang' },
    status_peraturan: { id: 3, nama_status: 'Diubah' },
  },
  {
    id: 'permen-23-2025',
    judul: 'Peraturan Menteri Nomor 23 Tahun 2025 tentang Penilaian Kapabilitas Kelembagaan pada Instansi Pemerintah',
    tahun: 2025,
    instansi: 'Kementerian PAN-RB',
    pemrakarsa: 'Kementerian PAN-RB',
    jenis_peraturan: { id: 6, nama: 'Peraturan Menteri' },
    status_peraturan: { id: 4, nama_status: 'Dicabut' },
  },
];

const SUBJEK_OPTIONS = [
  { value: 'perpajakan', label: 'Perpajakan' },
  { value: 'ketenagakerjaan', label: 'Ketenagakerjaan' },
  { value: 'keuangan', label: 'Keuangan & Perbankan' },
  { value: 'kesehatan', label: 'Kesehatan' },
  { value: 'pendidikan', label: 'Pendidikan' },
  { value: 'lingkungan', label: 'Lingkungan Hidup' },
  { value: 'perdagangan', label: 'Perdagangan & Industri' },
  { value: 'hukum-peradilan', label: 'Hukum & Peradilan' },
];

interface DailyStats {
  total: number;
  berlaku: number;
  tidak_berlaku: number;
  diubah: number;
  dicabut: number;
}

interface FilterReferences {
  kategori: { id: string | number; nama: string }[];
  status: { id: string | number; nama: string }[];
  tahun: (string | number)[];
}

interface RegulasiRecentSectionProps {
  dailyStats?: DailyStats;
  filterReferences?: FilterReferences;
}

export function RegulasiRecentSection({
  dailyStats = {
    total: 1492,
    berlaku: 1292,
    tidak_berlaku: 200,
    diubah: 1344,
    dicabut: 87,
  },
  filterReferences,
}: RegulasiRecentSectionProps) {
  // Filter States
  const [keyword, setKeyword] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('');
  const [selectedSubjek, setSelectedSubjek] = useState<string>('');
  const [selectedTahun, setSelectedTahun] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const [openDropdown, setOpenDropdown] = useState<'kategori' | 'subjek' | 'tahun' | 'status' | null>(null);

  // Pagination & Data states
  const [regulations, setRegulations] = useState<any[]>(FIGMA_DUMMY_REGULATIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [kategoriList, setKategoriList] = useState(filterReferences?.kategori || []);
  const [statusList, setStatusList] = useState(filterReferences?.status || []);
  const [tahunList, setTahunList] = useState(filterReferences?.tahun || []);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterReferences?.kategori?.length) {
      fetch('/api/referensi-filter')
        .then((res) => res.json())
        .then((data) => {
          if (data.kategori) setKategoriList(data.kategori);
          if (data.status) setStatusList(data.status);
          if (data.tahun) setTahunList(data.tahun);
        })
        .catch(() => {});
    }
  }, [filterReferences]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchRegulations = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword.trim()) params.append('keyword', keyword.trim());
      if (selectedKategori) params.append('kategori_id', selectedKategori);
      if (selectedTahun) params.append('tahun', selectedTahun);
      if (selectedStatus) params.append('status_id', selectedStatus);
      if (selectedSubjek) params.append('subjek', selectedSubjek);
      params.append('page', currentPage.toString());
      params.append('per_page', perPage.toString());

      const res = await fetch(`/api/search?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setRegulations(json.data);
          setCurrentPage(json.current_page || 1);
          setLastPage(json.last_page || 1);
        } else if (!keyword && !selectedKategori && !selectedTahun && !selectedStatus && !selectedSubjek) {
          // Gunakan Figma dummy fallback jika belum ada data di database
          setRegulations(FIGMA_DUMMY_REGULATIONS);
          setLastPage(1);
        } else {
          setRegulations([]);
          setLastPage(1);
        }
      } else {
        setRegulations(FIGMA_DUMMY_REGULATIONS);
      }
    } catch {
      setRegulations(FIGMA_DUMMY_REGULATIONS);
    } finally {
      setIsLoading(false);
    }
  }, [keyword, selectedKategori, selectedSubjek, selectedTahun, selectedStatus, currentPage, perPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRegulations();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchRegulations]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedKategori('');
    setSelectedSubjek('');
    setSelectedTahun('');
    setSelectedStatus('');
    setCurrentPage(1);
  };

  const getKategoriLabel = () => {
    if (!selectedKategori) return 'Semua kategori';
    const found = kategoriList.find((k) => String(k.id) === String(selectedKategori));
    return found ? found.nama : 'Kategori';
  };

  const getSubjekLabel = () => {
    if (!selectedSubjek) return 'Semua subjek';
    const found = SUBJEK_OPTIONS.find((s) => s.value === selectedSubjek);
    return found ? found.label : 'Subjek';
  };

  const getTahunLabel = () => {
    if (!selectedTahun) return '2020 - 2026';
    return selectedTahun;
  };

  const getStatusLabel = () => {
    if (!selectedStatus) return 'Semua';
    const found = statusList.find((s) => String(s.id) === String(selectedStatus));
    return found ? found.nama : 'Status';
  };

  return (
    <div id="sistem-hukum-terbaru" className="w-full scroll-mt-24">
      {/* ── Section Header ── */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-[26px] font-bold text-neu-900 tracking-tight">
          Sistem Hukum Terbaru
        </h2>
        <p className="text-xs sm:text-sm text-neu-500 mt-1">
          Pembaruan hukum harian
        </p>
      </div>

      {/* ── Filter Bar Container ── */}
      <div
        ref={dropdownRef}
        className="bg-white border border-neu-100 rounded-[15px] p-4 sm:p-6 shadow-2xs mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          {/* Dropdown Filters (Kategori, Subjek, Tahun, Status) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-1">
            {/* 1. Dropdown Kategori */}
            <div className="relative min-w-[140px] sm:min-w-[150px] flex-1 sm:flex-initial">
              <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
                Kategori
              </label>
              <button
                type="button"
                onClick={() => setOpenDropdown((prev) => (prev === 'kategori' ? null : 'kategori'))}
                className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
              >
                <span className="truncate">{getKategoriLabel()}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                    openDropdown === 'kategori' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'kategori' && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-64 bg-white border border-neu-200 rounded-xl shadow-xl p-2 z-50 max-h-60 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedKategori('');
                      setOpenDropdown(null);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedKategori === '' ? 'bg-pr-50 text-pr-900 font-semibold' : 'text-neu-700 hover:bg-neu-50'
                    }`}
                  >
                    <span>Semua kategori</span>
                    {selectedKategori === '' && <Check className="w-3.5 h-3.5 text-pr-900" />}
                  </button>
                  {kategoriList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedKategori(String(item.id));
                        setOpenDropdown(null);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedKategori === String(item.id)
                          ? 'bg-pr-50 text-pr-900 font-semibold'
                          : 'text-neu-700 hover:bg-neu-50'
                      }`}
                    >
                      <span className="truncate">{item.nama}</span>
                      {selectedKategori === String(item.id) && (
                        <Check className="w-3.5 h-3.5 text-pr-900 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Dropdown Subjek (Konteks baru subjek hukum sesuai request) */}
            <div className="relative min-w-[140px] sm:min-w-[150px] flex-1 sm:flex-initial">
              <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
                Subjek
              </label>
              <button
                type="button"
                onClick={() => setOpenDropdown((prev) => (prev === 'subjek' ? null : 'subjek'))}
                className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
              >
                <span className="truncate">{getSubjekLabel()}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                    openDropdown === 'subjek' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'subjek' && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-56 bg-white border border-neu-200 rounded-xl shadow-xl p-2 z-50 max-h-60 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubjek('');
                      setOpenDropdown(null);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedSubjek === '' ? 'bg-pr-50 text-pr-900 font-semibold' : 'text-neu-700 hover:bg-neu-50'
                    }`}
                  >
                    <span>Semua subjek</span>
                    {selectedSubjek === '' && <Check className="w-3.5 h-3.5 text-pr-900" />}
                  </button>
                  {SUBJEK_OPTIONS.map((subj) => (
                    <button
                      key={subj.value}
                      type="button"
                      onClick={() => {
                        setSelectedSubjek(subj.value);
                        setOpenDropdown(null);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedSubjek === subj.value
                          ? 'bg-pr-50 text-pr-900 font-semibold'
                          : 'text-neu-700 hover:bg-neu-50'
                      }`}
                    >
                      <span className="truncate">{subj.label}</span>
                      {selectedSubjek === subj.value && (
                        <Check className="w-3.5 h-3.5 text-pr-900 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Dropdown Tahun */}
            <div className="relative min-w-[130px] sm:min-w-[140px] flex-1 sm:flex-initial">
              <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
                Tahun
              </label>
              <button
                type="button"
                onClick={() => setOpenDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))}
                className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
              >
                <span className="truncate">{getTahunLabel()}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                    openDropdown === 'tahun' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'tahun' && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-48 bg-white border border-neu-200 rounded-xl shadow-xl p-2 z-50 max-h-60 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTahun('');
                      setOpenDropdown(null);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedTahun === '' ? 'bg-pr-50 text-pr-900 font-semibold' : 'text-neu-700 hover:bg-neu-50'
                    }`}
                  >
                    <span>Semua tahun</span>
                    {selectedTahun === '' && <Check className="w-3.5 h-3.5 text-pr-900" />}
                  </button>
                  {['2020-2026', '2015-2019', '2010-2014'].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        setSelectedTahun(range);
                        setOpenDropdown(null);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedTahun === range ? 'bg-pr-50 text-pr-900 font-semibold' : 'text-neu-700 hover:bg-neu-50'
                      }`}
                    >
                      <span>{range.replace('-', ' - ')}</span>
                      {selectedTahun === range && <Check className="w-3.5 h-3.5 text-pr-900" />}
                    </button>
                  ))}
                  {tahunList.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        setSelectedTahun(String(yr));
                        setOpenDropdown(null);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedTahun === String(yr)
                          ? 'bg-pr-50 text-pr-900 font-semibold'
                          : 'text-neu-700 hover:bg-neu-50'
                      }`}
                    >
                      <span>Tahun {yr}</span>
                      {selectedTahun === String(yr) && <Check className="w-3.5 h-3.5 text-pr-900" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Dropdown Status */}
            <div className="relative min-w-[130px] sm:min-w-[140px] flex-1 sm:flex-initial">
              <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
                Status
              </label>
              <button
                type="button"
                onClick={() => setOpenDropdown((prev) => (prev === 'status' ? null : 'status'))}
                className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
              >
                <span className="truncate">{getStatusLabel()}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                    openDropdown === 'status' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'status' && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-48 bg-white border border-neu-200 rounded-xl shadow-xl p-2 z-50 max-h-60 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStatus('');
                      setOpenDropdown(null);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedStatus === '' ? 'bg-pr-50 text-pr-900 font-semibold' : 'text-neu-700 hover:bg-neu-50'
                    }`}
                  >
                    <span>Semua</span>
                    {selectedStatus === '' && <Check className="w-3.5 h-3.5 text-pr-900" />}
                  </button>
                  {statusList.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setSelectedStatus(String(st.id));
                        setOpenDropdown(null);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedStatus === String(st.id)
                          ? 'bg-pr-50 text-pr-900 font-semibold'
                          : 'text-neu-700 hover:bg-neu-50'
                      }`}
                    >
                      <span className="truncate">{st.nama}</span>
                      {selectedStatus === String(st.id) && (
                        <Check className="w-3.5 h-3.5 text-pr-900 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Filters */}
            {(selectedKategori || selectedSubjek || selectedTahun || selectedStatus || keyword) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 p-2.5 rounded-xl border border-neu-200 text-neu-500 hover:text-neu-900 hover:bg-neu-50 transition-colors shadow-2xs cursor-pointer"
                title="Reset semua filter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Input Box (Figma: width 301, height 48, radius 20) */}
          <div className="relative w-full lg:w-[301px] shrink-0">
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari peraturan..."
              className="w-full h-[48px] bg-white border border-neu-100 rounded-[20px] py-2 pl-11 pr-4 text-xs sm:text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none focus:ring-2 focus:ring-pr-900 shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 text-neu-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Main Layout: 2 Columns (Regulations List + Daily Stats) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Left Column: Regulations List using SearchResultCard ── */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {isLoading ? (
            <div className="bg-white border border-neu-100 rounded-2xl p-12 text-center text-neu-500 flex flex-col items-center justify-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neu-200 border-t-pr-900 mb-3" />
              <p className="text-xs sm:text-sm font-medium">Memuat data peraturan...</p>
            </div>
          ) : regulations.length > 0 ? (
            <>
              <div className="flex flex-col gap-3.5">
                {regulations.map((item) => (
                  <SearchResultCard key={item.id || item.unique_id} item={item} />
                ))}
              </div>

              {/* Call EXISTING Pagination Component */}
              <Pagination
                currentPage={currentPage}
                totalPages={lastPage}
                pageSize={perPage}
                pageSizeOptions={[10, 15, 20, 50]}
                onPageChange={(p) => setCurrentPage(p)}
                onPageSizeChange={(size) => {
                  setPerPage(size);
                  setCurrentPage(1);
                }}
              />
            </>
          ) : (
            <div className="bg-white border border-neu-100 rounded-2xl p-12 text-center text-neu-500 flex flex-col items-center justify-center">
              <FileText className="w-12 h-12 text-neu-300 mb-3 stroke-[1.5]" />
              <h3 className="text-sm sm:text-base font-bold text-neu-800 mb-1">
                Tidak ada peraturan ditemukan
              </h3>
              <p className="text-xs text-neu-500 max-w-sm mb-4">
                Coba sesuaikan kata kunci pencarian atau reset filter untuk melihat regulasi lainnya.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 bg-pr-900 text-white rounded-xl text-xs font-semibold hover:bg-pr-800 transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* ── Right Column: Statistik Harian Sidebar (Figma node #2358:57903) ── */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white border border-neu-100 rounded-[15px] p-4 sm:p-5 shadow-2xs flex flex-col gap-3.5">
            <h3 className="text-[14px] font-medium text-neu-900">
              Statistik Harian
            </h3>

            <div className="flex flex-col gap-2">
              {/* Row 1: Total hukum & Berlaku */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white border border-neu-50 rounded-[10px] flex flex-col justify-between">
                  <span className="text-[12px] font-medium text-neu-600">Total hukum</span>
                  <span className="text-[14px] font-semibold text-neu-900 mt-0.5">
                    <CountUp end={dailyStats.total} />
                  </span>
                </div>
                <div className="p-3 bg-white border border-neu-50 rounded-[10px] flex flex-col justify-between">
                  <span className="text-[12px] font-medium text-neu-600">Berlaku</span>
                  <span className="text-[14px] font-semibold text-suc-900 mt-0.5">
                    <CountUp end={dailyStats.berlaku} />
                  </span>
                </div>
              </div>

              {/* Row 2: Tidak Berlaku & Diubah */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white border border-neu-50 rounded-[10px] flex flex-col justify-between">
                  <span className="text-[12px] font-medium text-neu-600">Tidak Berlaku</span>
                  <span className="text-[14px] font-semibold text-dan-900 mt-0.5">
                    <CountUp end={dailyStats.tidak_berlaku} />
                  </span>
                </div>
                <div className="p-3 bg-white border border-neu-50 rounded-[10px] flex flex-col justify-between">
                  <span className="text-[12px] font-medium text-neu-600">Diubah</span>
                  <span className="text-[14px] font-semibold text-sec-900 mt-0.5">
                    <CountUp end={dailyStats.diubah} />
                  </span>
                </div>
              </div>

              {/* Row 3: Dicabut */}
              <div className="p-3 bg-white border border-neu-50 rounded-[10px] flex flex-col items-center justify-center text-center">
                <span className="text-[12px] font-medium text-neu-600">Dicabut</span>
                <span className="text-[14px] font-semibold text-neu-600 mt-0.5">
                  <CountUp end={dailyStats.dicabut} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegulasiRecentSection;

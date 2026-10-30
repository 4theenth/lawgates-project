import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import { Search, FileText } from 'lucide-react';
import { SearchResultCard } from '@/Components/search/SearchResultCard';
import { Pagination } from '@/Components/common/Pagination';
import { CountUp } from '@/Components/common/CountUp';
import { CategoryFilterPopover } from '@/Components/kategori/CategoryFilterPopover';
import { FilterOption } from '@/types/peraturan';
import { RecentSearchesDropdown } from '@/Components/common/RecentSearchesDropdown';
import { useRecentSearches } from '@/hooks/useRecentSearches';

import { useFilterReferences } from '@/hooks/useFilterReferences';

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
  subjek?: string[];
  lokasi_daerah?: string[];
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
  const [selectedKategori, setSelectedKategori] = useState<string[]>([]);
  const [selectedSubjek, setSelectedSubjek] = useState<string[]>([]);
  const [selectedLokasi, setSelectedLokasi] = useState<string[]>([]);
  const [tahunDari, setTahunDari] = useState<string>('');
  const [tahunSampai, setTahunSampai] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // Pagination & Data states
  const [regulations, setRegulations] = useState<any[]>(FIGMA_DUMMY_REGULATIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // Recent Searches state
  const { addSearch } = useRecentSearches();
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsRecentOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dynamic references loaded via centralized hook & optional props
  const filterRefs = useFilterReferences();

  const kategoriOptions: FilterOption[] = useMemo(() => {
    if (filterReferences?.kategori && filterReferences.kategori.length > 0) {
      return filterReferences.kategori.map((k) => ({
        value: String(k.id),
        label: k.nama,
      }));
    }
    return filterRefs.kategoriOptions;
  }, [filterReferences?.kategori, filterRefs.kategoriOptions]);

  const statusOptions: FilterOption[] = useMemo(() => {
    if (filterReferences?.status && filterReferences.status.length > 0) {
      return filterReferences.status.map((s) => ({
        value: String(s.id),
        label: s.nama,
      }));
    }
    return filterRefs.statusOptions;
  }, [filterReferences?.status, filterRefs.statusOptions]);

  const subjekOptions: FilterOption[] = useMemo(() => {
    const list = filterReferences?.subjek || filterRefs.listSubjek;
    if (list && list.length > 0) {
      return list.map((s) => ({
        value: s,
        label: s,
      }));
    }
    return [
      { value: 'perpajakan', label: 'Perpajakan' },
      { value: 'ketenagakerjaan', label: 'Ketenagakerjaan' },
      { value: 'keuangan', label: 'Keuangan & Perbankan' },
      { value: 'kesehatan', label: 'Kesehatan' },
      { value: 'pendidikan', label: 'Pendidikan' },
      { value: 'lingkungan', label: 'Lingkungan Hidup' },
      { value: 'perdagangan', label: 'Perdagangan & Industri' },
      { value: 'hukum-peradilan', label: 'Hukum & Peradilan' },
    ];
  }, [filterReferences?.subjek, filterRefs.listSubjek]);

  const allFlatLokasi = filterRefs.allFlatLokasi;

  const availableYears = useMemo(() => {
    if (filterReferences?.tahun && filterReferences.tahun.length > 0) {
      return [...filterReferences.tahun].map(String).sort((a, b) => Number(b) - Number(a));
    }
    return filterRefs.availableYears;
  }, [filterReferences?.tahun, filterRefs.availableYears]);

  const fetchRegulations = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword.trim()) params.append('keyword', keyword.trim());
      if (selectedKategori.length > 0) params.append('kategori_id', selectedKategori.join(','));
      if (selectedLokasi.length > 0) params.append('lokasi_daerah', selectedLokasi.join(','));

      let tahunParam = '';
      if (tahunDari && tahunSampai) {
        tahunParam = tahunDari === tahunSampai ? tahunDari : `${tahunDari}-${tahunSampai}`;
      } else if (tahunDari) {
        tahunParam = tahunDari;
      } else if (tahunSampai) {
        tahunParam = tahunSampai;
      }
      if (tahunParam) params.append('tahun', tahunParam);

      if (selectedStatus.length > 0) params.append('status_id', selectedStatus.join(','));
      if (selectedSubjek.length > 0) params.append('subjek', selectedSubjek.join(','));
      params.append('page', currentPage.toString());
      params.append('per_page', perPage.toString());

      const res = await axios.get('/api/search', { params });
      const json = res.data;
      if (json && json.data && json.data.length > 0) {
        setRegulations(json.data);
        setCurrentPage(json.current_page || 1);
        setLastPage(json.last_page || 1);
      } else if (!keyword && selectedKategori.length === 0 && !tahunParam && selectedStatus.length === 0 && selectedSubjek.length === 0) {
        setRegulations(FIGMA_DUMMY_REGULATIONS);
        setLastPage(1);
      } else {
        setRegulations([]);
        setLastPage(1);
      }
    } catch {
      setRegulations(FIGMA_DUMMY_REGULATIONS);
    } finally {
      setIsLoading(false);
    }
  }, [keyword, selectedKategori, selectedLokasi, selectedSubjek, tahunDari, tahunSampai, selectedStatus, currentPage, perPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRegulations();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchRegulations]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedKategori([]);
    setSelectedSubjek([]);
    setSelectedLokasi([]);
    setTahunDari('');
    setTahunSampai('');
    setSelectedStatus([]);
    setCurrentPage(1);
  };

  return (
    <div id="sistem-hukum-terbaru" className="w-full scroll-mt-24">
      {/* ── Section Header ── */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-[26px] font-bold text-neu-900 tracking-tight">
          Sistem Hukum Terbaru
        </h2>
        <p className="text-xs sm:text-md text-neu-500 mt-1">
          Pembaruan hukum harian
        </p>
      </div>

      {/* ── Filter Bar Container ── */}
      <div className="bg-white border border-neu-50 rounded-[15px] p-4 sm:p-6 shadow-2xs mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          {/* Dropdown Filters (Kategori, Subjek, Tahun, Status via CategoryFilterPopover) */}
          <CategoryFilterPopover
            variant="horizontal"
            showKategori={true}
            kategoriOptions={kategoriOptions}
            selectedKategori={selectedKategori}
            setSelectedKategori={(k: string[]) => {
              setSelectedKategori(k);
              setCurrentPage(1);
            }}
            selectedLokasi={selectedLokasi}
            setSelectedLokasi={(l: string[]) => {
              setSelectedLokasi(l);
              setCurrentPage(1);
            }}
            allFlatLokasi={allFlatLokasi}
            showSubjek={true}
            subjekOptions={subjekOptions}
            selectedSubjek={selectedSubjek}
            setSelectedSubjek={(s: string[]) => {
              setSelectedSubjek(s);
              setCurrentPage(1);
            }}
            availableYears={availableYears}
            tahunDari={tahunDari}
            setTahunDari={(y) => {
              setTahunDari(y);
              setCurrentPage(1);
            }}
            tahunSampai={tahunSampai}
            setTahunSampai={(y) => {
              setTahunSampai(y);
              setCurrentPage(1);
            }}
            statusOptions={statusOptions}
            selectedStatus={selectedStatus}
            setSelectedStatus={(st: string[]) => {
              setSelectedStatus(st);
              setCurrentPage(1);
            }}
            onApply={() => {}}
            onReset={handleResetFilters}
          />

          {/* Search Input Box (Melebar ke kiri mengisi ruang kosong) */}
          <div ref={searchBoxRef} className="relative w-full lg:flex-1 shrink-0 min-w-[260px]">
            <input
              type="text"
              value={keyword}
              onFocus={() => setIsRecentOpen(true)}
              onClick={() => setIsRecentOpen(true)}
              onChange={(e) => {
                const val = e.target.value;
                setKeyword(val);
                if (!val.trim()) {
                  setIsRecentOpen(true);
                }
                setCurrentPage(1);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = keyword.trim();
                  if (q) {
                    addSearch(q);
                  }
                  setIsRecentOpen(false);
                }
              }}
              placeholder="Cari peraturan..."
              className="w-full h-[48px] bg-white border border-neu-100 hover:border-neu-300 rounded-[20px] py-2 pl-11 pr-4 text-xs sm:text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-neu-300 focus:ring-2 focus:ring-neu-100 shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 text-neu-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />

            <RecentSearchesDropdown
              isOpen={isRecentOpen}
              onClose={() => setIsRecentOpen(false)}
              onSelect={(selectedQuery) => {
                setKeyword(selectedQuery);
                addSearch(selectedQuery);
                setCurrentPage(1);
                setIsRecentOpen(false);
              }}
              variant="light"
              searchQuery={keyword}
              className="top-[calc(100%+8px)]"
            />
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

              {/* Komponen Pagination Publik */}
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                perPage={perPage}
                perPageOptions={[5, 10, 15, 20]}
                onPageChange={(p) => setCurrentPage(p)}
                onPerPageChange={(size) => {
                  setPerPage(size);
                  setCurrentPage(1);
                }}
                variant="public"
                className="mt-6 pt-5"
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
        <div className="lg:col-span-4">
          <div className="bg-white border border-neu-50 rounded-[15px] p-4 sm:p-5 shadow-2xs flex flex-col gap-3.5">
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

import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { RegulationCard } from '@/Components/peraturan/RegulationCard';
import { RegulationEmptyState } from '@/Components/peraturan/RegulationEmptyState';
import { CategoryFilterPopover } from '@/Components/kategori/CategoryFilterPopover';
import { SearchInput } from '@/Components/common/SearchInput';
import { Pagination } from '@/Components/common/Pagination';
import { PeraturanItem, FilterOption, ReferensiData } from '@/types/peraturan';

interface DetailKategoriProps {
  kategori: {
    id?: number | null;
    slug: string;
    canonical_key?: string | null;
    nama: string;
    badge: string;
    deskripsi?: string;
    total_dokumen?: number;
  };
  peraturan: {
    data: PeraturanItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
  filters: {
    keyword?: string;
    status_id?: string;
    tahun?: string;
    sort?: string;
    per_page?: number;
  };
  referensi: ReferensiData;
}

export default function DetailKategori({
  kategori,
  peraturan,
  filters,
  referensi,
}: DetailKategoriProps) {
  // ── State pencarian & filter ──
  const [searchQuery, setSearchQuery] = useState(filters.keyword || '');
  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    filters.status_id ? filters.status_id.split(',').filter(Boolean) : []
  );

  // ── Tahun rentang ──
  const initialYear = filters.tahun || '';
  const [tahunDari, setTahunDari] = useState(
    initialYear.includes('-') ? initialYear.split('-')[0].trim() : initialYear
  );
  const [tahunSampai, setTahunSampai] = useState(
    initialYear.includes('-') ? initialYear.split('-')[1].trim() : initialYear
  );

  const [sort] = useState(filters.sort || 'relevansi');
  const [perPage, setPerPage] = useState(filters.per_page || 10);

  // ── Opsi Status ──
  const statusOptions: FilterOption[] =
    referensi.status.length > 0
      ? referensi.status.map((s) => ({
          value: String(s.id),
          label: s.nama_status,
        }))
      : [
          { value: '1', label: 'Berlaku' },
          { value: '2', label: 'Tidak berlaku' },
        ];

  // ── Opsi Tahun ──
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    new Set([
      ...referensi.tahun.map(String),
      String(currentYear),
      String(currentYear - 1),
      String(currentYear - 2),
      String(currentYear - 3),
      String(currentYear - 4),
      String(currentYear - 5),
      String(currentYear - 6),
    ])
  ).sort((a, b) => Number(b) - Number(a));

  const applyFilters = (newParams: Record<string, string | number>) => {
    const params: Record<string, string | number> = {
      ...filters,
      ...newParams,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === '' || params[key] === undefined || params[key] === null) {
        delete params[key];
      }
    });

    router.get(`/kategori/${kategori.slug}`, params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  useEffect(() => {
    setSearchQuery(filters.keyword || '');
  }, [filters.keyword]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    // Jika teks pencarian dikosongkan menggunakan keyboard, otomatis reset
    if (val.trim() === '' && (filters.keyword || '').trim() !== '') {
      applyFilters({ keyword: '', page: 1 });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if ((filters.keyword || '').trim() !== '') {
      applyFilters({ keyword: '', page: 1 });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ keyword: searchQuery, page: 1 });
  };

  const handleApplyFilter = () => {
    const params: Record<string, string | number> = {
      page: 1,
      keyword: searchQuery,
      sort,
    };

    if (selectedStatus.length > 0) {
      params.status_id = selectedStatus.join(',');
    } else {
      params.status_id = '';
    }

    if (tahunDari && tahunSampai) {
      params.tahun = `${tahunDari}-${tahunSampai}`;
    } else if (tahunDari) {
      params.tahun = tahunDari;
    } else if (tahunSampai) {
      params.tahun = tahunSampai;
    } else {
      params.tahun = '';
    }

    applyFilters(params);
  };

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedStatus([]);
    setTahunDari('');
    setTahunSampai('');

    router.get(
      `/kategori/${kategori.slug}`,
      {},
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= peraturan.last_page) {
      applyFilters({ page: newPage });
    }
  };

  const totalResult = peraturan.total;
  const currentPage = peraturan.current_page;
  const lastPage = peraturan.last_page;

  // Cek apakah ada pencarian atau filter aktif
  const hasActiveFilter = Boolean(
    (filters.keyword && filters.keyword.trim().length > 0) ||
      searchQuery.trim().length > 0 ||
      filters.status_id ||
      filters.tahun
  );

  const isSearchNotFound =
    hasActiveFilter ||
    (Boolean(kategori.total_dokumen && kategori.total_dokumen > 0) && totalResult === 0);

  return (
    <PublicLayout>
      <Head title={`${kategori.nama} - LawGates`} />

      <div className="pt-24 pb-16 w-full max-w-[1240px] mx-auto px-4 sm:px-6 min-h-screen text-gray-900 font-sans min-w-0 overflow-x-hidden">
        {/* ── Breadcrumb & Header ── */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Regulasi', href: '/regulasi' },
              { label: kategori.nama },
            ]}
            className="mb-4 sm:mb-6 text-xs text-neu-500"
          />
          <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900 tracking-tight">
            {kategori.nama}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5">
            Data {kategori.nama} ditemukan sebanyak{' '}
            <span
              className={`font-bold ${
                totalResult === 0 ? 'text-red-500' : 'text-gray-900'
              }`}
            >
              {totalResult}
            </span>{' '}
            data
          </p>
        </div>

        {/* ── Action Row: Filter Popover + Search Bar ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
          <CategoryFilterPopover
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            tahunDari={tahunDari}
            setTahunDari={setTahunDari}
            tahunSampai={tahunSampai}
            setTahunSampai={setTahunSampai}
            statusOptions={statusOptions}
            availableYears={availableYears}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
          />

          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onSubmit={handleSearchSubmit}
            placeholder={`Cari ${kategori.nama.toLowerCase()} yang ada di Indonesia...`}
          />
        </div>

        {/* ── Content Area: Empty State vs 3-Column Cards Grid ── */}
        {totalResult === 0 ? (
          <RegulationEmptyState isSearchNotFound={isSearchNotFound} />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peraturan.data.map((item) => (
                <RegulationCard key={item.id} item={item} variant="grid" />
              ))}
            </div>

            {/* ── Pagination Bar ── */}
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              perPage={perPage}
              onPageChange={handlePageChange}
              onPerPageChange={(num) => {
                setPerPage(num);
                applyFilters({ per_page: num, page: 1 });
              }}
            />
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

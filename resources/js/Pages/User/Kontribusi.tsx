import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { UserDashboardLayout } from '@/Layouts/UserDashboardLayout';
import { FilterSearchBar } from '@/Components/common/FilterSearchBar';
import {
  KontribusiItem,
  KontribusiStats,
  KontribusiStatCard,
  KontribusiCard,
  KontribusiPagination,
  StatusTabKey,
  SortOption,
} from '@/Components/kontribusi';
import { FileText, Trash, X } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface KontribusiPageProps {
  stats: KontribusiStats;
  kontribusiList: KontribusiItem[];
  totalBookmarks?: number;
  totalCollections?: number;
}

export default function Kontribusi({
  stats: initialStats,
  kontribusiList: initialItems = [],
  totalBookmarks = 345,
  totalCollections = 10,
}: KontribusiPageProps) {
  const { toast } = useToast();

  const [items, setItems] = useState<KontribusiItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<StatusTabKey>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // Modal State for Delete Confirmation
  const [deletingItem, setDeletingItem] = useState<KontribusiItem | null>(null);

  // Hitung ulang stats dinamis berdasarkan items terkini
  const currentStats: KontribusiStats = useMemo(() => {
    return {
      total: items.length,
      menunggu: items.filter((item) => item.status === 'menunggu').length,
      disetujui: items.filter((item) => item.status === 'disetujui').length,
      ditolak: items.filter((item) => item.status === 'ditolak').length,
    };
  }, [items]);

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    let result = [...items];

    // 1. Status Filter
    if (activeTab === 'menunggu') {
      result = result.filter((item) => item.status === 'menunggu');
    } else if (activeTab === 'disetujui') {
      result = result.filter((item) => item.status === 'disetujui');
    } else if (activeTab === 'ditolak') {
      result = result.filter((item) => item.status === 'ditolak');
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        return (
          item.judul_peraturan.toLowerCase().includes(q) ||
          item.usulan_text.toLowerCase().includes(q) ||
          (item.bab && item.bab.toLowerCase().includes(q)) ||
          (item.pasal && item.pasal.toLowerCase().includes(q)) ||
          item.jenis_peraturan.toLowerCase().includes(q)
        );
      });
    }

    // 3. Sort
    if (sortBy === 'terlama') {
      result.reverse();
    } else if (sortBy === 'judul_asc') {
      result.sort((a, b) => a.judul_peraturan.localeCompare(b.judul_peraturan, 'id'));
    } else if (sortBy === 'judul_desc') {
      result.sort((a, b) => b.judul_peraturan.localeCompare(a.judul_peraturan, 'id'));
    }

    return result;
  }, [items, activeTab, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * perPage;
    return filteredItems.slice(startIndex, startIndex + perPage);
  }, [filteredItems, safeCurrentPage, perPage]);

  // Tab change handler (resets page to 1)
  const handleTabChange = (tab: StatusTabKey) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Search change handler (resets page to 1)
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  // Delete Action Handler
  const handleDeleteConfirm = () => {
    if (!deletingItem) return;
    setItems((prev) => prev.filter((item) => item.id !== deletingItem.id));
    toast.success('Usulan koreksi berhasil dihapus.');
    setDeletingItem(null);
  };

  return (
    <UserDashboardLayout
      activeMenu="kontribusi"
      breadcrumbs={[
        { label: 'Beranda', href: '/' },
        { label: 'Ringkasan', href: route('dashboard') },
        { label: 'Kontribusi Saya' },
      ]}
      bookmarkCount={totalBookmarks}
      collectionCount={totalCollections}
      kontribusiCount={currentStats.total}
    >
      <Head title="Kontribusi Saya - LawGates" />

      <div className="w-full flex flex-col gap-6">
        {/* ── 1. Page Header (#3406:83999) ── */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] font-bold text-neu-900 leading-tight">
            Kontribusi Saya
          </h1>
          <p className="text-[14px] font-normal text-neu-500 leading-normal">
            Pantau status usulan koreksi yang kamu ajukan pada basis data hukum LawGates
          </p>
        </div>

        {/* ── 2. Stat Summary Cards Grid (#3436:59201) ── */}
        <KontribusiStatCard stats={currentStats} />

        {/* ── 3. Reusable Filter Search Bar dengan Slot Tab Status (#3436:59224) ── */}
        <FilterSearchBar
          leftElement={
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {[
                { key: 'semua' as const, label: 'Semua', count: currentStats.total },
                { key: 'menunggu' as const, label: 'Menunggu Review', count: currentStats.menunggu },
                { key: 'disetujui' as const, label: 'Disetujui', count: currentStats.disetujui },
                { key: 'ditolak' as const, label: 'Ditolak', count: currentStats.ditolak },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => handleTabChange(tab.key)}
                    className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[6px] text-[12px] transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-pr-900 text-white font-semibold shadow-2xs'
                        : 'text-neu-700 hover:text-neu-900 hover:bg-neu-50 font-normal'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                );
              })}
            </div>
          }
          search={searchQuery}
          onSearchChange={handleSearchChange}
          placeholder="Cari usulan..."
          selectedSort={sortBy}
          onSortChange={(val) => setSortBy(val as SortOption)}
        />

        {/* ── 4. Kontribusi Cards List (#3443:59486 & #3436:59249) ── */}
        {paginatedItems.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {paginatedItems.map((item) => (
              <KontribusiCard
                key={item.id}
                item={item}
                onDelete={(id) => {
                  const target = items.find((i) => i.id === id);
                  if (target) setDeletingItem(target);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="w-full bg-white border border-neu-50 rounded-[10px] p-12 flex flex-col items-center justify-center text-center gap-3 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-neu-50 flex items-center justify-center text-neu-400">
              <FileText className="w-6 h-6 opacity-60" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[15px] font-medium text-neu-900">
                Tidak ada usulan koreksi
              </h4>
              <p className="text-[13px] font-normal text-neu-500 max-w-sm">
                {searchQuery
                  ? `Tidak ditemukan hasil yang cocok dengan kata kunci "${searchQuery}".`
                  : 'Belum ada usulan koreksi dalam kategori status ini.'}
              </p>
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-1 px-3.5 py-1.5 rounded-[8px] bg-pr-900 text-white text-[12px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
              >
                Hapus Pencarian
              </button>
            )}
          </div>
        )}

        {/* ── 5. Pagination (#3443:59525) ── */}
        {filteredItems.length > 0 && (
          <KontribusiPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            perPage={perPage}
            onPageChange={(page) => setCurrentPage(page)}
            onPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setCurrentPage(1);
            }}
          />
        )}
      </div>

      {/* ── 6. Delete Confirmation Modal ── */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[420px] bg-white rounded-[15px] border border-neu-50 p-6 shadow-xl flex flex-col gap-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dan-50 flex items-center justify-center text-dan-900">
                  <Trash className="w-5 h-5 text-dan-900" />
                </div>
                <h3 className="text-[16px] font-semibold text-neu-900">
                  Hapus Usulan Koreksi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="text-neu-400 hover:text-neu-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[14px] font-normal text-neu-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus usulan koreksi untuk{' '}
              <span className="font-semibold text-neu-900">
                "{deletingItem.judul_peraturan}"
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-[8px] bg-[#F5F5F5] text-neu-700 text-[14px] font-normal hover:bg-neu-100 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-[8px] bg-dan-900 text-white text-[14px] font-medium hover:bg-dan-800 transition-colors cursor-pointer shadow-2xs"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </UserDashboardLayout>
  );
}


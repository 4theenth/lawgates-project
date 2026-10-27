import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { EmptyState } from '@/Components/admin/EmptyState';
import { Pagination } from '@/Components/admin/Pagination';
import {
  CategoryTable,
  CategoryItem,
  CategorySortColumn,
  SortDirection,
} from '@/Components/admin/CategoryTable';
import { CategoryModal } from '@/Components/admin/CategoryModal';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { PageHeader } from '@/Components/common/PageHeader';
import { StatusTabs } from '@/Components/common/StatusTabs';
import { Search, X, Gavel } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface ClassificationIndexProps {
  items?: {
    data: CategoryItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
  kategori?: {
    data: CategoryItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
  activeTab?: 'kategori' | 'subjek';
  filters: {
    tab?: 'kategori' | 'subjek';
    search?: string;
    sortColumn?: CategorySortColumn;
    sortDirection?: SortDirection;
    pageSize?: string | number;
  };
}

export default function KlasifikasiHukumIndex({
  items,
  kategori,
  activeTab = 'kategori',
  filters,
}: ClassificationIndexProps) {
  const { toast } = useToast();

  // Tab State: 'kategori' | 'subjek'
  const currentTab: 'kategori' | 'subjek' = filters?.tab || activeTab || 'kategori';
  const isSubjek = currentTab === 'subjek';
  const entityLabel = isSubjek ? 'Subjek' : 'Kategori';

  // Search state
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');

  // Sorting states
  const [sortColumn, setSortColumn] = useState<CategorySortColumn | null>(
    filters?.sortColumn || null
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    filters?.sortDirection || 'asc'
  );

  // Active dataset
  const activePaginator = items || kategori;
  const paginatedData = activePaginator?.data || [];
  const totalPages = Math.max(activePaginator?.last_page || 1, 1);
  const hasData = paginatedData.length > 0;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(activePaginator?.current_page || 1);
  const [pageSize, setPageSize] = useState(
    filters?.pageSize ? Number(filters.pageSize) : 10
  );

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<CategoryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Kategori Hukum' },
  ];

  // Tab switcher
  const handleTabChange = (newTabId: string) => {
    setSearchQuery('');
    setCurrentPage(1);
    setSortColumn(null);
    setSortDirection('asc');
    router.get(
      '/admin/kategori-hukum',
      { tab: newTabId },
      {
        preserveState: false,
        preserveScroll: true,
      }
    );
  };

  // Helper query ke backend
  const fetchData = (overrides: Record<string, any> = {}) => {
    const query: Record<string, any> = {
      tab: currentTab,
    };

    const finalSearch =
      overrides.search !== undefined ? overrides.search : searchQuery;
    if (finalSearch) query.search = finalSearch;

    const finalSortCol =
      overrides.sortColumn !== undefined ? overrides.sortColumn : sortColumn;
    if (finalSortCol) query.sortColumn = finalSortCol;

    const finalSortDir =
      overrides.sortDirection !== undefined
        ? overrides.sortDirection
        : sortDirection;
    if (finalSortDir) query.sortDirection = finalSortDir;

    const finalPageSize =
      overrides.pageSize !== undefined ? overrides.pageSize : pageSize;
    if (finalPageSize !== 10) query.pageSize = finalPageSize;

    const finalPage = overrides.page !== undefined ? overrides.page : currentPage;
    if (finalPage) query.page = finalPage;

    router.get('/admin/kategori-hukum', query, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  useEffect(() => {
    if (kategori?.current_page !== undefined) {
      setCurrentPage(kategori.current_page);
    }
  }, [kategori?.current_page]);

  // Debounced search
  const isInitialRender = useRef(true);
  const prevSearchRef = useRef(searchQuery);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (prevSearchRef.current === searchQuery) {
      return;
    }

    prevSearchRef.current = searchQuery;

    const debounce = setTimeout(() => {
      fetchData({ search: searchQuery, page: 1 });
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // 3-logic sorting: asc -> desc -> reset
  const handleSort = (column: CategorySortColumn) => {
    let newCol: CategorySortColumn | null = column;
    let newDir: SortDirection = 'asc';

    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        newDir = 'desc';
      } else {
        newCol = null;
        newDir = 'asc';
      }
    } else {
      newDir = 'asc';
    }

    setSortColumn(newCol);
    setSortDirection(newDir);
    setCurrentPage(1);
    fetchData({ sortColumn: newCol, sortDirection: newDir, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData({ page });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    fetchData({ pageSize: size, page: 1 });
  };

  // Simpan tambah atau edit item (Kategori / Subjek)
  const handleSave = (data: {
    id?: string;
    nama: string;
    deskripsi: string;
    kode?: string;
  }) => {
    setIsSubmitting(true);
    setServerError(null);

    const baseUrl = isSubjek ? '/admin/subjek-peraturan' : '/admin/kategori-hukum';
    const payload = isSubjek
      ? { nama: data.nama, deskripsi: data.deskripsi }
      : { nama: data.nama, deskripsi: data.deskripsi, kode: data.kode };

    if (data.id) {
      router.put(`${baseUrl}/${data.id}`, payload, {
        preserveScroll: true,
        onSuccess: () => {
          setIsSubmitting(false);
          setEditingItem(null);
          setServerError(null);
        },
        onError: (errors: Record<string, string>) => {
          setIsSubmitting(false);
          const errorMsg =
            errors.nama ||
            errors.deskripsi ||
            (errors as any).kode ||
            `Gagal memperbarui ${entityLabel.toLowerCase()} hukum.`;
          setServerError(errorMsg);
          toast.error(errorMsg);
        },
      });
    } else {
      router.post(baseUrl, payload, {
        preserveScroll: true,
        onSuccess: () => {
          setIsSubmitting(false);
          setIsAddModalOpen(false);
          setServerError(null);
        },
        onError: (errors: Record<string, string>) => {
          setIsSubmitting(false);
          const errorMsg =
            errors.nama ||
            errors.deskripsi ||
            (errors as any).kode ||
            `Gagal menambahkan ${entityLabel.toLowerCase()} hukum.`;
          setServerError(errorMsg);
          toast.error(errorMsg);
        },
      });
    }
  };

  // Konfirmasi hapus item (Kategori / Subjek)
  const handleConfirmDelete = () => {
    if (!deletingItem) return;

    setIsDeleting(true);
    const baseUrl = isSubjek ? '/admin/subjek-peraturan' : '/admin/kategori-hukum';
    router.delete(`${baseUrl}/${deletingItem.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleting(false);
        setDeletingItem(null);
      },
      onError: (errors: Record<string, string>) => {
        setIsDeleting(false);
        const errorMsg =
          (errors && Object.values(errors)[0]) ||
          `Gagal menghapus ${entityLabel.toLowerCase()} hukum.`;
        toast.error(errorMsg);
      },
    });
  };

  return (
    <AdminLayout>
      <Head title="Klasifikasi Hukum - Admin" />

      {/* 1. Breadcrumb Navigasi */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 2. Page Header & Action Button Sesuai Mockup */}
      <PageHeader
        title="Klasifikasi Hukum"
        description="Kelola kategori dan subjek hukum yang akan digunakan untuk menambahkan data hukum nantinya"
        action={{
          label: `Tambah ${entityLabel}`,
          onClick: () => {
            setServerError(null);
            setIsAddModalOpen(true);
          },
        }}
      />

      {/* 3. Toolbar: Segmented Tab Switcher (Kiri) & Search Bar (Kanan) Sesuai Mockup */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        {/* Tab Switcher: Kategori | Subjek (Sama dengan Dokumen Hukum) */}
        <StatusTabs
          tabs={[
            { id: 'kategori', label: 'Kategori' },
            { id: 'subjek', label: 'Subjek' },
          ]}
          activeTab={currentTab}
          onChange={handleTabChange}
        />

        {/* Search Bar Input */}
        <div className="relative w-full sm:w-64 md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neu-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Cari nama ${entityLabel.toLowerCase()}...`}
            className="w-full pl-8.5 pr-8 py-1.5 text-[12px] rounded-[10px] border border-neu-50 bg-white placeholder-neu-400 text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
                fetchData({ search: '', page: 1 });
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neu-400 hover:text-neu-700 p-0.5 cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Area Data: Tabel Reusable jika ada data, atau Empty State jika kosong */}
      <div className="mb-6">
        {hasData ? (
          <CategoryTable
            items={paginatedData}
            type={currentTab}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            onEdit={(item) => {
              setServerError(null);
              setEditingItem(item);
            }}
            onDelete={(item) => setDeletingItem(item)}
          />
        ) : (
          <EmptyState
            icon={<Gavel className="w-7 h-7 text-gray-400 stroke-[1.5]" />}
            title={`Belum ada ${entityLabel} hukum`}
            description={`Silakan tambahkan data ${entityLabel.toLowerCase()} melalui tombol "Tambah ${entityLabel}"`}
          />
        )}
      </div>

      {/* 5. Pagination Bawah */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={[10, 15, 20, 50]}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* ── MODALS REUSABLE ── */}
      {/* Modal Tambah / Edit (Kategori / Subjek) */}
      <CategoryModal
        show={isAddModalOpen || Boolean(editingItem)}
        type={currentTab}
        categoryData={editingItem}
        isLoading={isSubmitting}
        serverError={serverError}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingItem(null);
          setServerError(null);
        }}
        onSave={handleSave}
      />

      {/* Modal Konfirmasi Hapus (Kategori / Subjek) */}
      <DeleteConfirmModal
        show={Boolean(deletingItem)}
        title={`Hapus ${entityLabel} Hukum?`}
        itemName={
          deletingItem?.nama ||
          deletingItem?.subjek ||
          deletingItem?.kategori
        }
        isLoading={isDeleting}
        onClose={() => {
          if (!isDeleting) setDeletingItem(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}

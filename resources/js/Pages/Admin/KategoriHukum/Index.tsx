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
import { Plus, Search, X, Gavel } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface KategoriHukumIndexProps {
  kategori: {
    data: CategoryItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
  filters: {
    search?: string;
    sortColumn?: CategorySortColumn;
    sortDirection?: SortDirection;
    pageSize?: string | number;
  };
}

export default function KategoriHukumIndex({ kategori, filters }: KategoriHukumIndexProps) {
  const { toast } = useToast();

  // Search state
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');

  // Sorting states
  const [sortColumn, setSortColumn] = useState<CategorySortColumn | null>(
    filters?.sortColumn || null
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    filters?.sortDirection || 'asc'
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(kategori?.current_page || 1);
  const [pageSize, setPageSize] = useState(
    filters?.pageSize ? Number(filters.pageSize) : 10
  );

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [deletingCat, setDeletingCat] = useState<CategoryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Kategori Hukum' },
  ];

  // Helper untuk melakukan query ke backend
  const fetchData = (overrides: Record<string, any> = {}) => {
    const query: Record<string, any> = {};

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
    if (finalPage > 1) query.page = finalPage;

    router.get('/admin/kategori-hukum', query, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  // Debounced search
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

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

  // Simpan tambah atau edit kategori
  const handleSaveCategory = (data: {
    id?: string;
    nama: string;
    deskripsi: string;
    kode?: string;
  }) => {
    setIsSubmitting(true);
    if (data.id) {
      router.put(
        `/admin/kategori-hukum/${data.id}`,
        {
          nama: data.nama,
          deskripsi: data.deskripsi,
          kode: data.kode,
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            setIsSubmitting(false);
            setEditingCat(null);
            toast.success('Kategori hukum berhasil diperbarui!');
          },
          onError: () => {
            setIsSubmitting(false);
            toast.error('Gagal memperbarui kategori hukum.');
          },
        }
      );
    } else {
      router.post(
        '/admin/kategori-hukum',
        {
          nama: data.nama,
          deskripsi: data.deskripsi,
          kode: data.kode,
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            setIsSubmitting(false);
            setIsAddModalOpen(false);
            toast.success('Kategori hukum berhasil ditambahkan!');
          },
          onError: () => {
            setIsSubmitting(false);
            toast.error('Gagal menambahkan kategori hukum.');
          },
        }
      );
    }
  };

  // Konfirmasi hapus kategori
  const handleConfirmDelete = () => {
    if (!deletingCat) return;

    router.delete(`/admin/kategori-hukum/${deletingCat.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setDeletingCat(null);
        toast.delete('Kategori hukum berhasil dihapus!');
      },
      onError: () => {
        toast.error('Gagal menghapus kategori hukum.');
      },
    });
  };

  const paginatedCategories = kategori?.data || [];
  const totalPages = Math.max(kategori?.last_page || 1, 1);
  const hasData = paginatedCategories.length > 0;

  return (
    <AdminLayout>
      <Head title="Kategori Hukum - Admin" />

      {/* 1. Breadcrumb Navigasi */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 2. Page Header & Action Button Sesuai Spesifikasi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            Kategori Hukum
          </h1>
          <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            Kelola kategori hukum yang akan digunakan untuk menambahkan data hukum nantinya
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori</span>
          </button>
        </div>
      </div>

      {/* 3. Toolbar: Search Bar (Aligned Right) */}
      <div className="flex items-center justify-end mb-6">
        <div className="relative w-full sm:w-64 md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neu-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari nama kategori..."
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

      {/* 4. Area Data: Tabel Kategori jika ada data, atau Empty State jika kosong */}
      <div className="mb-6">
        {hasData ? (
          <CategoryTable
            categories={paginatedCategories}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            onEdit={(cat) => setEditingCat(cat)}
            onDelete={(cat) => setDeletingCat(cat)}
          />
        ) : (
          <EmptyState
            icon={<Gavel className="w-7 h-7 text-gray-400 stroke-[1.5]" />}
            title="Belum ada Kategori hukum"
            description='Silakan tambahkan data kategori melalui tombol "Tambah Kategori"'
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

      {/* ── MODALS ── */}
      {/* Modal Tambah / Edit Kategori */}
      <CategoryModal
        show={isAddModalOpen || Boolean(editingCat)}
        categoryData={editingCat}
        isLoading={isSubmitting}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCat(null);
        }}
        onSave={handleSaveCategory}
      />

      {/* Modal Konfirmasi Hapus Kategori */}
      <DeleteConfirmModal
        show={Boolean(deletingCat)}
        title="Hapus Kategori Hukum?"
        itemName={deletingCat?.kategori}
        onClose={() => setDeletingCat(null)}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}

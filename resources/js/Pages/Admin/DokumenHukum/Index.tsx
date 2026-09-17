import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { StatusTabs } from '@/Components/admin/StatusTabs';
import { EmptyState } from '@/Components/admin/EmptyState';
import { Pagination } from '@/Components/admin/Pagination';
import { DocumentTable, DokumenHukumItem, SortColumn, SortDirection } from '@/Components/admin/DocumentTable';
import { FilterPopover } from '@/Components/admin/FilterPopover';
import { DocumentModal } from '@/Components/admin/DocumentModal';
import { EditStatusModal } from '@/Components/admin/EditStatusModal';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import {
  CorrectionDetailView,
  LegalDocumentCorrectionData,
  formatStandardId,
} from '@/Components/admin/import/CorrectionDetailView';
import { Plus, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

export default function DokumenHukumIndex({ peraturans, filters, referensi }: any) {
  const { toast } = useToast();

  const ALL_CATEGORIES = referensi?.kategori || [];

  // Filter & Search states
  const [activeTab, setActiveTab] = useState<'all' | 'berlaku' | 'tidak_berlaku'>(filters?.status || 'all');
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');
  
  const initialCategories = filters?.kategori ? 
    (Array.isArray(filters.kategori) ? filters.kategori : filters.kategori.split(',')) : [];
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sorting states
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(filters?.sortColumn || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(filters?.sortDirection || 'asc');

  // Pagination states responsif
  const [currentPage, setCurrentPage] = useState(peraturans?.current_page || 1);
  const [pageSize, setPageSize] = useState(filters?.pageSize ? parseInt(filters.pageSize) : 10);

  // Helper untuk melakukan fetch data ke backend
  const fetchData = (overrides: any = {}) => {
    const query: any = {};
    const finalTab = overrides.status !== undefined ? overrides.status : activeTab;
    if (finalTab !== 'all') query.status = finalTab;
    
    const finalSearch = overrides.search !== undefined ? overrides.search : searchQuery;
    if (finalSearch) query.search = finalSearch;
    
    const finalCats = overrides.kategori !== undefined ? overrides.kategori : selectedCategories;
    if (finalCats.length > 0) query.kategori = finalCats.join(',');
    
    const finalSortCol = overrides.sortColumn !== undefined ? overrides.sortColumn : sortColumn;
    if (finalSortCol) query.sortColumn = finalSortCol;
    
    const finalSortDir = overrides.sortDirection !== undefined ? overrides.sortDirection : sortDirection;
    if (finalSortDir) query.sortDirection = finalSortDir;
    
    const finalPageSize = overrides.pageSize !== undefined ? overrides.pageSize : pageSize;
    if (finalPageSize !== 10) query.pageSize = finalPageSize;
    
    const finalPage = overrides.page !== undefined ? overrides.page : currentPage;
    if (finalPage > 1) query.page = finalPage;

    router.get('/admin/dokumen-hukum', query, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    });
  };

  // Mencegah trigger di initial render
  const isInitialRender = useRef(true);

  // Effect KHUSUS untuk search (debounced)
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


  // In-place Modal Overlay states (Nimpa bukan buka halaman baru)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DokumenHukumItem | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [editingStatusDoc, setEditingStatusDoc] = useState<DokumenHukumItem | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<DokumenHukumItem | null>(null);

  const statusOptions = [
    { id: 'berlaku' as const, label: 'Berlaku' },
    { id: 'tidak_berlaku' as const, label: 'Tidak Berlaku' },
  ];

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Dokumen Hukum' },
  ];

  // Handler toggle tab status (Klik tab aktif mematikan filter tab menjadi 'all')
  const handleTabChange = (tab: 'berlaku' | 'tidak_berlaku') => {
    const newTab = activeTab === tab ? 'all' : tab;
    setActiveTab(newTab);
    setCurrentPage(1);
    fetchData({ status: newTab, page: 1 });
  };

  // Handler toggle kategori checkbox pada popover filter
  const handleToggleCategory = (category: string) => {
    const newCats = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCats);
    setCurrentPage(1);
    fetchData({ kategori: newCats, page: 1 });
  };

  // Handler pencarian realtime (reset ke halaman 1 agar hasil selalu terlihat)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handler pengurutan tabel (3-Logic Sort: Klik 1 -> Klik 2 -> Klik 3 Reset Kembali ke Awal)
  const handleSort = (column: SortColumn) => {
    let newCol: SortColumn | null = column;
    let newDir: SortDirection = 'asc';

    if (sortColumn === column) {
      if (column === 'tgl_ditetapkan') {
        if (sortDirection === 'desc') {
          newDir = 'asc';
        } else {
          newCol = null;
          newDir = 'desc';
        }
      } else {
        if (sortDirection === 'asc') {
          newDir = 'desc';
        } else {
          newCol = null;
          newDir = 'asc';
        }
      }
    } else {
      newDir = column === 'tgl_ditetapkan' ? 'desc' : 'asc';
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

  // Helper konversi tanggal bahasa Indonesia ke timestamp
  const parseIndonesianDate = (dateStr: string): number => {
    if (!dateStr) return 0;
    const indoMonths: Record<string, number> = {
      januari: 0,
      februari: 1,
      maret: 2,
      april: 3,
      mei: 4,
      juni: 5,
      juli: 6,
      agustus: 7,
      september: 8,
      oktober: 9,
      november: 10,
      desember: 11,
    };
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10) || 1;
      const month = indoMonths[parts[1].toLowerCase()] ?? 0;
      const year = parseInt(parts[2], 10) || 1970;
      return new Date(year, month, day).getTime();
    }
    return new Date(dateStr).getTime() || 0;
  };

  const handleOpenEditStatus = (doc: DokumenHukumItem) => {
    setEditingStatusDoc(doc);
  };

  const handleEditClick = async (doc: DokumenHukumItem) => {
    setIsDetailLoading(true);
    try {
      const response = await fetch(`/admin/dokumen-hukum/${doc.id}/detail-edit`, {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Gagal memuat data peraturan');
      
      const resJson = await response.json();
      
      doc = { 
        ...doc, 
        correctionData: resJson
      } as any;
    } catch (error) {
      console.error(error);
      toast.error('Gagal mengambil detail peraturan');
    } finally {
      setIsDetailLoading(false);
    }
    setEditingDoc(doc);
  };

  // Handler simpan status dari EditStatusModal
  const handleSaveStatus = (docId: string, newStatus: 'berlaku' | 'tidak_berlaku') => {
    // TODO: implement real backend saving here via router.patch
    toast.success('Status dokumen (WIP Backend)');
  };

  // Handler simpan tambah / edit dokumen
  const handleSaveDocument = (data: Omit<DokumenHukumItem, 'id'> & { id?: string }) => {
    // TODO: implement real backend saving here
    toast.success('Dokumen hukum (WIP Backend)');
  };

  // Handler hapus dokumen
  const handleConfirmDelete = () => {
    if (!deletingDoc) return;
    router.delete(`/admin/dokumen-hukum/${deletingDoc.id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setDeletingDoc(null);
        toast.success('Dokumen hukum berhasil dihapus!');
      }
    });
  };

    // Gunakan data dari backend Inertia Props
  const paginatedDocuments = peraturans?.data || [];
  const totalItems = peraturans?.total || 0;
  const totalPages = peraturans?.last_page || 1;
  const hasData = paginatedDocuments.length > 0;

  // JIKA SEDANG EDIT DATA DOKUMEN: Tampilkan Layar Penuh Edit Data Hukum Sesuai Tangkapan Layar
  if (editingDoc) {
    return (
      <AdminLayout>
        <Head title={`Edit Data Hukum - ${editingDoc.judul}`} />

        {/* 1. Breadcrumb Navigasi Edit */}
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/admin/dashboard' },
              {
                label: 'Dokumen Hukum',
                onClick: () => setEditingDoc(null),
              },
              { label: 'Edit Data Hukum' },
            ]}
          />
        </div>

        <CorrectionDetailView
          mode="edit"
          file={{
            id: editingDoc.id,
            name: `${editingDoc.kategori}_${editingDoc.id}.json`,
            category: editingDoc.kategori,
            title: editingDoc.judul,
            correctionData: (editingDoc as any).correctionData,
            parsedData: (editingDoc as any).parsedData || {
              metadata: {
                standard_id: formatStandardId(`${editingDoc.kategori} ${editingDoc.judul}`),
                judul: editingDoc.judul,
                pemrakarsa: (editingDoc as any).pemrakarsa || 'Pemerintah Pusat',
                tanggal_penetapan: editingDoc.tgl_ditetapkan,
                tempat_penetapan: (editingDoc as any).tempat_penetapan || 'Jakarta',
              },
            },
          }}
          onSave={(updatedCorrection: LegalDocumentCorrectionData) => {
            // TODO: implement real backend saving here
            setEditingDoc(null);
            toast.success('Perubahan data hukum (WIP Backend)');
          }}
          onCancel={() => setEditingDoc(null)}
          onBack={() => setEditingDoc(null)}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head title="Dokumen Hukum - Admin" />

      {/* 1. Breadcrumb Navigasi */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 2. Page Header & Action Button Sesuai Spesifikasi Figma */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            Daftar Dokumen Hukum
          </h1>
          <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            Kelola daftar peraturan, putusan, dan impor dokumen hukum hasil OCR.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol Tambah Hukum (Membuka Alur Tambah Data / Impor JSON OCR) */}
          <Link
            href="/admin/dokumen-hukum/tambah"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Hukum</span>
          </Link>
        </div>
      </div>

      {/* 3. Toolbar: Status Filter Tabs & Search / Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tab Berlaku / Tidak Berlaku */}
        <StatusTabs
          tabs={statusOptions}
          activeTab={activeTab}
          onChange={handleTabChange}
        />

        {/* Search Input & Tombol Popover Filter */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-64 md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neu-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari kategori, judul..."
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

          {/* Popover Filter Kategori */}
          <FilterPopover
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
            onClose={() => setIsFilterOpen(false)}
            categories={ALL_CATEGORIES}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onClearAll={() => {
              setSelectedCategories([]);
              setCurrentPage(1);
              fetchData({ kategori: [], page: 1 });
            }}
            onSelectAll={() => {
              setSelectedCategories([...ALL_CATEGORIES]);
              setCurrentPage(1);
              fetchData({ kategori: [...ALL_CATEGORIES], page: 1 });
            }}
          />
        </div>
      </div>

      {/* 4. Area Data: Tabel Dokumen jika ada data, atau Empty State jika kosong */}
      <div className="mb-6">
        {hasData ? (
          <DocumentTable
            documents={paginatedDocuments}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            onEdit={handleEditClick}
            onToggleStatus={handleOpenEditStatus}
            onDelete={(doc) => setDeletingDoc(doc)}
            isDetailLoading={isDetailLoading}
          />
        ) : (
          <EmptyState
            title="Belum ada data hukum"
            description="Silakan tambahkan data hukum melalui tombol 'Tambah Hukum' atau sesuaikan filter pencarian Anda."
          />
        )}
      </div>

      {/* 5. Pagination Bawah (Responsif dan dinamis sesuai jumlah data hasil filter) */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* ── MODAL OVERLAYS (Nimpa In-Place tanpa reload / pindah halaman) ── */}
      {/* Modal Tambah Dokumen */}
      <DocumentModal
        show={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveDocument}
        categories={ALL_CATEGORIES}
      />


      {/* Modal Ubah Status Hukum (Sesuai Gambar dengan backdrop rgba(55,55,55,0.60)) */}
      <EditStatusModal
        show={Boolean(editingStatusDoc)}
        documentData={editingStatusDoc}
        onClose={() => setEditingStatusDoc(null)}
        onSave={handleSaveStatus}
      />

      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmModal
        show={Boolean(deletingDoc)}
        documentData={deletingDoc}
        onClose={() => setDeletingDoc(null)}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}

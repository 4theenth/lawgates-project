import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { StatusTabs } from '@/Components/admin/StatusTabs';
import { EmptyState } from '@/Components/admin/EmptyState';
import { Pagination } from '@/Components/admin/Pagination';
import { DocumentTable, DokumenHukumItem, SortColumn, SortDirection } from '@/Components/admin/DocumentTable';
import { DraftTable } from '@/Components/admin/DraftTable';
import { FilterPopover } from '@/Components/admin/FilterPopover';
import { DocumentModal } from '@/Components/admin/DocumentModal';
import { EditStatusModal } from '@/Components/admin/EditStatusModal';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { DuplicateConfirmModal } from '@/Components/admin/DuplicateConfirmModal';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
import { StatCardsGroup } from '@/Components/admin/StatCard';
import {
  CorrectionDetailView,
  LegalDocumentCorrectionData,
  formatStandardId,
} from '@/Components/admin/import/CorrectionDetailView';
import { Plus, Search, X, Files, CheckCircle2, XCircle, FilePenLine, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

export default function DokumenHukumIndex({ peraturans, drafts, stats, filters, referensi }: any) {
  const { toast } = useToast();

  const ALL_CATEGORIES = referensi?.kategori || [];

  // Filter & Search states
  const [activeTab, setActiveTab] = useState<'all' | 'berlaku' | 'tidak_berlaku' | 'draft'>(filters?.status || 'all');
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');
  
  const initialCategories = filters?.kategori ? 
    (Array.isArray(filters.kategori) ? filters.kategori : filters.kategori.split(',')) : [];
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDraftIds, setSelectedDraftIds] = useState<string[]>([]);

  // Sorting states
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(filters?.sortColumn || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(filters?.sortDirection || 'asc');

  // Pagination states responsif
  const [currentPage, setCurrentPage] = useState(peraturans?.current_page || 1);
  const [pageSize, setPageSize] = useState(filters?.pageSize ? parseInt(filters.pageSize) : 10);

  // Helper untuk melakukan fetch data ke backend
  const fetchData = useCallback((overrides: any = {}) => {
    const query: any = {};
    const finalTab = overrides.status !== undefined ? overrides.status : activeTab;
    if (finalTab !== 'all') query.status = finalTab;
    
    const finalSearch = overrides.search !== undefined ? overrides.search : searchQuery;
    if (finalSearch) query.search = finalSearch;
    
    const finalCats = overrides.kategori !== undefined ? overrides.kategori : selectedCategories;
    if (finalCats.length > 0) query.kategori = finalCats.join(',');
    
    const finalSortCol = overrides.sortColumn !== undefined ? overrides.sortColumn : sortColumn;
    if (finalSortCol) {
      query.sortColumn = finalSortCol;
      const finalSortDir = overrides.sortDirection !== undefined ? overrides.sortDirection : sortDirection;
      if (finalSortDir) query.sortDirection = finalSortDir;
    }
    
    const finalPageSize = overrides.pageSize !== undefined ? overrides.pageSize : pageSize;
    if (finalPageSize !== 10) query.pageSize = finalPageSize;
    
    const finalPage = overrides.page !== undefined ? overrides.page : currentPage;
    if (finalPage > 1) query.page = finalPage;

    router.get('/admin/dokumen-hukum', query, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    });
  }, [activeTab, searchQuery, selectedCategories, sortColumn, sortDirection, pageSize, currentPage]);

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
  }, [searchQuery, fetchData]);


  // In-place Modal Overlay states (Nimpa bukan buka halaman baru)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DokumenHukumItem | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [editingStatusDoc, setEditingStatusDoc] = useState<DokumenHukumItem | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<DokumenHukumItem | null>(null);

  // State untuk modal konfirmasi duplikasi (status 409 Conflict)
  const [duplicateModal, setDuplicateModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    documentTitle?: string;
    existingId?: string;
  }>({
    show: false,
    title: '',
    message: '',
  });

  const statusOptions = [
    { id: 'berlaku' as const, label: 'Berlaku' },
    { id: 'tidak_berlaku' as const, label: 'Tidak Berlaku' },
    { id: 'draft' as const, label: 'Draft' },
  ];

  // ── Penanganan Tombol Back Bawaan Browser (Chrome/Edge/Firefox) ──
  // Menjaga agar tombol back browser saat edit data kembali ke daftar /admin/dokumen-hukum
  // bukannya mundur ke /admin/dashboard
  const editStateRef = useRef({ editingDoc, isAddModalOpen, editingStatusDoc, deletingDoc });

  useEffect(() => {
    editStateRef.current = { editingDoc, isAddModalOpen, editingStatusDoc, deletingDoc };
  }, [editingDoc, isAddModalOpen, editingStatusDoc, deletingDoc]);

  useEffect(() => {
    const handlePopState = () => {
      const { editingDoc: curEditingDoc, isAddModalOpen: curAdd, editingStatusDoc: curStatus, deletingDoc: curDelete } = editStateRef.current;

      if (curEditingDoc !== null) {
        setEditingDoc(null);
        return;
      }
      if (curAdd) {
        setIsAddModalOpen(false);
        return;
      }
      if (curStatus !== null) {
        setEditingStatusDoc(null);
        return;
      }
      if (curDelete !== null) {
        setDeletingDoc(null);
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Sync state dengan history browser saat masuk mode edit atau membuka modal
  useEffect(() => {
    if (editingDoc !== null || isAddModalOpen || editingStatusDoc !== null || deletingDoc !== null) {
      window.history.pushState({ activeOverlay: true }, '');
    }
  }, [editingDoc, isAddModalOpen, editingStatusDoc, deletingDoc]);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Dokumen Hukum' },
  ];

  // Handler toggle tab status (Klik tab aktif mematikan filter tab menjadi 'all')
  const handleTabChange = (tab: 'all' | 'berlaku' | 'tidak_berlaku' | 'draft') => {
    const newTab = activeTab === tab && tab !== 'all' ? 'all' : tab;
    setActiveTab(newTab);
    setSelectedDraftIds([]);
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

  // Handler pengurutan tabel (3-Logic Sort: Klik 1 (A-Z) -> Klik 2 (Z-A) -> Klik 3 Reset Kembali ke Awal)
  const handleSort = (column: SortColumn) => {
    let newCol: SortColumn | null = column;
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
    fetchData({ sortColumn: newCol, sortDirection: newCol ? newDir : undefined, page: 1 });
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
  const _parseIndonesianDate = (dateStr: string): number => {
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
  const handleSaveStatus = async (docId: string, newStatus: 'berlaku' | 'tidak_berlaku') => {
    try {
      const csrfToken = (document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
      const response = await fetch(`/admin/dokumen-hukum/${docId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        toast.success('Status hukum berhasil diperbarui');
        setEditingStatusDoc(null);
        fetchData();
      } else {
        toast.error('Gagal memperbarui status hukum');
      }
    } catch (err) {
      toast.error('Gagal memperbarui status hukum');
    }
  };

  // Handler simpan tambah / edit dokumen
  const handleSaveDocument = (_data: Omit<DokumenHukumItem, 'id'> & { id?: string }) => {
    toast.success('Data hukum berhasil disimpan');
  };

  // Handler hapus dokumen
  const handleConfirmDelete = () => {
    if (!deletingDoc) return;
    router.delete(`/admin/dokumen-hukum/${deletingDoc.id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setDeletingDoc(null);
        toast.delete('Data berhasil dihapus');
      },
      onError: () => {
        toast.error('Data gagal dihapus');
      },
    });
  };

  // Handler publish draft (tunggal atau massal)
  const handlePublishDraft = async (ids: string[]) => {
    if (ids.length === 0) return;
    try {
      const csrfToken = (document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
      const response = await fetch('/admin/dokumen-hukum/draft/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error('Gagal mempublikasikan draft');
      }

      toast.success('Data hukum berhasil dipublikasikan!');
      setSelectedDraftIds([]);
      fetchData();
    } catch (error: any) {
      console.error(error);
      toast.error('Data gagal dipublikasikan');
    }
  };

  // Handler delete draft (tunggal atau massal)
  const handleDeleteDraft = async (ids: string[]) => {
    if (ids.length === 0) return;
    try {
      const csrfToken = (document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
      const response = await fetch('/admin/dokumen-hukum/draft/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus draft');
      }

      toast.delete('Data berhasil dihapus');
      setSelectedDraftIds([]);
      fetchData();
    } catch (error: any) {
      console.error(error);
      toast.error('Data gagal dihapus');
    }
  };

  // Gunakan data dari backend Inertia Props sesuai tab aktif
  const isDraftTab = activeTab === 'draft';
  const activePaginator = isDraftTab ? drafts : peraturans;
  const paginatedDocuments = peraturans?.data || [];
  const paginatedDrafts = drafts?.data || [];
  const _totalItems = activePaginator?.total || 0;
  const totalPages = activePaginator?.last_page || 1;
  const hasData = isDraftTab ? paginatedDrafts.length > 0 : paginatedDocuments.length > 0;

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
          onSave={async (updatedCorrection: LegalDocumentCorrectionData) => {
            try {
              const response = await fetch(`/admin/dokumen-hukum/${editingDoc.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'X-CSRF-TOKEN': (document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
                },
                body: JSON.stringify(updatedCorrection)
              });

              const json = await response.json();

              if (!response.ok || !json.success) {
                throw new Error(json.message || 'Gagal menyimpan data');
              }

              toast.success('Data hukum berhasil diperbarui');
              setEditingDoc(null);
              router.reload({ only: ['peraturans'] });
            } catch (error: any) {
              console.error(error);
              toast.error(error.message || 'Gagal menyimpan data hukum');
            }
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

      {/* 2. Page Header & Action Button Menggunakan Komponen Reusable */}
      <AdminPageHeader
        title="Daftar Dokumen Hukum"
        description="Kelola daftar peraturan, putusan, dan impor dokumen hukum hasil OCR."
        action={{
          label: 'Tambah Hukum',
          href: '/admin/dokumen-hukum/tambah',
        }}
      />

      {/* 2.5 Kotak-kotak Ringkasan Statistik Dokumen (StatCards Sesuai Desain Figma #2291:38182) */}
      <div className="mb-6">
        <StatCardsGroup
          items={[
            {
              id: 'all',
              title: 'Total Dokumen Hukum',
              value: stats?.total_dokumen !== undefined ? stats.total_dokumen.toLocaleString('id-ID') : '0',
              icon: <Files className="w-5 h-5" />,
              note: (stats?.total_dokumen ?? 0) === 0 ? 'Belum ada hukum yang ditambahkan' : undefined,
              trend: (stats?.total_dokumen ?? 0) > 0 ? {
                value: `↗ +${stats?.penambahan_baru ?? 12} penambahan baru`,
                isPositive: true,
              } : undefined,
              isActive: false, // Default biasa saja tanpa efek select langsung saat pertama buka
              onClick: () => handleTabChange('all'),
            },
            {
              id: 'berlaku',
              title: 'Total Hukum Berlaku',
              value: stats?.total_berlaku !== undefined ? stats.total_berlaku.toLocaleString('id-ID') : '0',
              icon: <CheckCircle2 className="w-5 h-5" />,
              note: (stats?.total_berlaku ?? 0) === 0 ? 'Belum ada hukum yang berlaku' : 'Regulasi aktif saat ini',
              isActive: activeTab === 'berlaku',
              onClick: () => handleTabChange('berlaku'),
            },
            {
              id: 'tidak_berlaku',
              title: 'Total Hukum Tidak Berlaku',
              value: stats?.total_tidak_berlaku !== undefined ? stats.total_tidak_berlaku.toLocaleString('id-ID') : '0',
              icon: <XCircle className="w-5 h-5" />,
              note: (stats?.total_tidak_berlaku ?? 0) === 0 ? 'Belum ada hukum yang tidak berlaku' : 'Telah dicabut atau digantikan',
              isActive: activeTab === 'tidak_berlaku',
              onClick: () => handleTabChange('tidak_berlaku'),
            },
            {
              id: 'draft',
              title: 'Total Draf',
              value: stats?.total_draft !== undefined ? stats.total_draft.toLocaleString('id-ID') : '0',
              icon: <FilePenLine className="w-5 h-5" />,
              note: (stats?.total_draft ?? 0) === 0 ? 'Tidak ada draft yang perlu ditinjau' : 'Perlu ditinjau',
              noteIcon: <AlertCircle className="w-3.5 h-3.5" />,
              isActive: activeTab === 'draft',
              onClick: () => handleTabChange('draft'),
            },
          ]}
        />
      </div>

      {/* 3. Toolbar: Status Filter Tabs & Search / Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tab Berlaku / Tidak Berlaku */}
        <StatusTabs
          tabs={statusOptions}
          activeTab={activeTab}
          onChange={handleTabChange}
        />

        {/* Search Input & Action Buttons */}
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

          {/* Di tab Draft: Tampilkan tombol Publish & Hapus sesuai logic selection */}
          {isDraftTab ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePublishDraft(selectedDraftIds)}
                disabled={selectedDraftIds.length === 0}
                className={`px-5 py-1.5 rounded-[8px] text-[13px] font-medium transition-all ${
                  selectedDraftIds.length >= 1
                    ? 'bg-pr-900 text-white hover:bg-pr-800 cursor-pointer shadow-2xs'
                    : 'bg-neu-200 text-neu-400 cursor-not-allowed opacity-60'
                }`}
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => handleDeleteDraft(selectedDraftIds)}
                disabled={selectedDraftIds.length <= 1}
                className={`px-5 py-1.5 rounded-[8px] text-[13px] font-medium transition-all ${
                  selectedDraftIds.length > 1
                    ? 'bg-[#C5221F] text-white hover:bg-[#A31816] cursor-pointer shadow-2xs'
                    : 'bg-neu-200 text-neu-400 cursor-not-allowed opacity-60'
                }`}
              >
                Hapus
              </button>
            </div>
          ) : (
            /* Popover Filter Kategori untuk Tab Non-Draft */
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
          )}
        </div>
      </div>

      {/* 4. Area Data: Tabel Dokumen / Tabel Draft atau Empty State jika kosong */}
      <div className="mb-6">
        {isDraftTab ? (
          paginatedDrafts.length > 0 ? (
            <DraftTable
              drafts={paginatedDrafts}
              selectedIds={selectedDraftIds}
              onToggleSelect={(id) => {
                setSelectedDraftIds((prev) =>
                  prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
                );
              }}
              onSelectAll={() => {
                if (selectedDraftIds.length === paginatedDrafts.length) {
                  setSelectedDraftIds([]);
                } else {
                  setSelectedDraftIds(paginatedDrafts.map((d: any) => d.id));
                }
              }}
              sortColumn={sortColumn as any}
              sortDirection={sortDirection}
              onSort={handleSort as any}
              onEdit={(draft) => router.visit(`/admin/dokumen-hukum/tambah?draft_id=${draft.id}`)}
              onPublish={(draft) => handlePublishDraft([draft.id])}
              onDelete={(draft) => handleDeleteDraft([draft.id])}
            />
          ) : (
            <EmptyState
              title="Belum ada draft hukum"
              description="Draft dokumen hukum hasil simpan OCR akan ditampilkan di sini."
            />
          )
        ) : hasData ? (
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

      {/* Modal Konfirmasi Duplikasi jika terdeteksi Status 409 Conflict (AC 3) */}
      <DuplicateConfirmModal
        show={duplicateModal.show}
        onClose={() => setDuplicateModal((prev) => ({ ...prev, show: false }))}
        title={duplicateModal.title}
        message={duplicateModal.message}
        documentTitle={duplicateModal.documentTitle}
        existingId={duplicateModal.existingId}
      />
    </AdminLayout>
  );
}

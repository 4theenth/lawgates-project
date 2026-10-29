import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { StatusTabs } from '@/Components/common/StatusTabs';
import { EmptyState } from '@/Components/admin/EmptyState';
import { Pagination } from '@/Components/admin/Pagination';
import { DocumentTable, DokumenHukumItem, SortColumn, SortDirection } from '@/Components/admin/DocumentTable';
import { DraftTable } from '@/Components/admin/DraftTable';
import { FilterPopover } from '@/Components/admin/FilterPopover';
import { DocumentModal } from '@/Components/admin/DocumentModal';
import { DocumentPreviewModal } from '@/Components/admin/DocumentPreviewModal';
import { EditStatusModal } from '@/Components/admin/EditStatusModal';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { DuplicateConfirmModal } from '@/Components/admin/DuplicateConfirmModal';
import { StatCardsGroup } from '@/Components/admin/StatCard';
import { EmbeddingProgressModal } from '@/Components/admin/EmbeddingProgressModal';
import { useEmbeddingProgress } from '@/hooks/useEmbeddingProgress';
import {
  CorrectionDetailView,
  LegalDocumentCorrectionData,
  formatStandardId,
} from '@/Components/admin/import/CorrectionDetailView';
import { Plus, Search, X, Files, CheckCircle2, XCircle, FilePenLine, AlertCircle, Sparkles } from 'lucide-react';
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
  const initialLokasi = filters?.lokasi_daerah ?
    (Array.isArray(filters.lokasi_daerah) ? filters.lokasi_daerah : filters.lokasi_daerah.split(',')) : [];
  const [selectedLokasi, setSelectedLokasi] = useState<string[]>(initialLokasi);

  const initialSubjek = filters?.subjek ?
    (Array.isArray(filters.subjek) ? filters.subjek : filters.subjek.split(',')) : [];
  const [selectedSubjek, setSelectedSubjek] = useState<string[]>(initialSubjek);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDraftIds, setSelectedDraftIds] = useState<string[]>([]);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // Hook embedding dengan live progress bar modal
  const {
    modalState: embeddingModal,
    startEmbedding,
    cancelEmbedding,
    closeModal: closeEmbeddingModal,
  } = useEmbeddingProgress(() => {
    setSelectedDocIds([]);
    fetchData();
  });
  const isEmbeddingLoading = embeddingModal.isProcessing;

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
    
    const finalLokasi = overrides.lokasi !== undefined ? overrides.lokasi : selectedLokasi;
    if (finalLokasi && finalLokasi.length > 0) query.lokasi_daerah = finalLokasi.join(',');
    
    const finalSubjek = overrides.subjek !== undefined ? overrides.subjek : selectedSubjek;
    if (finalSubjek && finalSubjek.length > 0) query.subjek = finalSubjek.join(',');
    
    const finalSortCol = overrides.sortColumn !== undefined ? overrides.sortColumn : sortColumn;
    if (finalSortCol) {
      query.sortColumn = finalSortCol;
      const finalSortDir = overrides.sortDirection !== undefined ? overrides.sortDirection : sortDirection;
      if (finalSortDir) query.sortDirection = finalSortDir;
    }
    
    const finalPageSize = overrides.pageSize !== undefined ? overrides.pageSize : pageSize;
    if (finalPageSize !== 10) query.pageSize = finalPageSize;
    
    const finalPage = overrides.page !== undefined ? overrides.page : currentPage;
    if (finalPage) query.page = finalPage;

    router.get('/admin/dokumen-hukum', query, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    });
  }, [activeTab, searchQuery, selectedCategories, selectedLokasi, selectedSubjek, sortColumn, sortDirection, pageSize, currentPage]);

  // Sync currentPage dengan paginator aktif dari backend
  const currentPaginator = activeTab === 'draft' ? drafts : peraturans;
  useEffect(() => {
    if (currentPaginator?.current_page !== undefined) {
      setCurrentPage(currentPaginator.current_page);
    }
  }, [currentPaginator?.current_page]);

  // Mencegah trigger di initial render & re-render tidak perlu
  const isInitialRender = useRef(true);
  const prevSearchRef = useRef(searchQuery);

  // Effect KHUSUS untuk search (debounced)
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


  // In-place Modal Overlay states (Nimpa bukan buka halaman baru)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DokumenHukumItem | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [editingStatusDoc, setEditingStatusDoc] = useState<DokumenHukumItem | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<DokumenHukumItem | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DokumenHukumItem | null>(null);
  // Draf yang menunggu konfirmasi hapus (kosong = modal tertutup)
  const [deletingDraftIds, setDeletingDraftIds] = useState<string[]>([]);
  const [isDeletingDraft, setIsDeletingDraft] = useState(false);

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
      
    // Auto-reset lokasi daerah jika Peraturan Daerah tidak dicentang lagi
    let newLokasi = selectedLokasi;
    let newSubjek = selectedSubjek;
    const isPerdaStillSelected = newCats.some(cat => 
      cat.toLowerCase().includes('perda') || cat.toLowerCase().includes('peraturan daerah')
    );
    if (!isPerdaStillSelected) {
      newLokasi = [];
      setSelectedLokasi([]);
    }
    
    const isOnlyPerdaSelected = newCats.length > 0 && newCats.every(cat => 
      cat.toLowerCase().includes('perda') || cat.toLowerCase().includes('peraturan daerah')
    );
    if (isOnlyPerdaSelected) {
      newSubjek = [];
      setSelectedSubjek([]);
    }

    setSelectedCategories(newCats);
    setCurrentPage(1);
    fetchData({ kategori: newCats, lokasi: newLokasi, subjek: newSubjek, page: 1 });
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

  // Handler delete draft (tunggal atau massal). Mengembalikan status berhasil
  // agar dialog konfirmasi tetap terbuka bila penghapusan gagal dan user bisa mengulang.
  const handleDeleteDraft = async (ids: string[]): Promise<boolean> => {
    if (ids.length === 0) return false;
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
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error('Data gagal dihapus');
      return false;
    }
  };

  // Handler multi-select dokumen hukum
  const handleToggleSelectDoc = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllDocs = () => {
    const currentItems: DokumenHukumItem[] = peraturans?.data || [];
    if (selectedDocIds.length === currentItems.length && currentItems.length > 0) {
      setSelectedDocIds([]);
    } else {
      setSelectedDocIds(currentItems.map((item) => item.id));
    }
  };

  // Handler embedding AI (Single dari tabel aksi, Batch checkbox, atau All Pending)
  const handleEmbed = ({
    ids,
    all_pending = false,
    force = false,
  }: {
    ids?: string[];
    all_pending?: boolean;
    force?: boolean;
  }) => {
    startEmbedding({
      ids,
      all_pending,
      force,
      customTitle: all_pending
        ? 'Embed Seluruh Regulasi Belum Ter-embed'
        : ids && ids.length > 1
        ? `Embed AI (${ids.length} Dokumen)`
        : 'Embed AI Dokumen Hukum',
    });
  };

  // Gunakan data dari backend Inertia Props sesuai tab aktif
  const isDraftTab = activeTab === 'draft';
  const activePaginator = isDraftTab ? drafts : peraturans;
  const paginatedDocuments = peraturans?.data || [];
  const paginatedDrafts = drafts?.data || [];
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans font-semibold tracking-tight text-neu-900 text-[20px] leading-[26px]">
            Daftar Dokumen Hukum
          </h1>
          <p className="font-sans text-[13px] sm:text-[14px] font-normal leading-[20px] text-neu-500 mt-1">
            Kelola daftar peraturan, putusan, dan impor dokumen hukum hasil OCR.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Tombol Opsi Embed Semua yang Belum (Data yang sudah akan dilewatkan) */}
          <button
            type="button"
            onClick={() => handleEmbed({ all_pending: true })}
            disabled={isEmbeddingLoading || (stats?.unembedded_count ?? 0) === 0}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-xs font-semibold transition-all shadow-2xs ${
              (stats?.unembedded_count ?? 0) > 0
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 cursor-pointer active:scale-[0.98]'
                : 'bg-neu-100 border border-neu-200 text-neu-500 cursor-not-allowed opacity-80'
            }`}
            title="Proses embedding AI untuk seluruh peraturan yang belum memiliki vektor embedding (data yang sudah akan dilewatkan)"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {(stats?.unembedded_count ?? 0) > 0
                ? `Embed Semua yang Belum (${stats.unembedded_count})`
                : 'Semua Dokumen Ter-embed'}
            </span>
          </button>

          <Link
            href="/admin/dokumen-hukum/tambah"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Hukum</span>
          </Link>
        </div>
      </div>

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
                value: `↗ +${stats?.penambahan_baru ?? 0} penambahan baru`,
                isPositive: true,
              } : undefined,
            },
            {
              id: 'berlaku',
              title: 'Total Hukum Berlaku',
              value: stats?.total_berlaku !== undefined ? stats.total_berlaku.toLocaleString('id-ID') : '0',
              icon: <CheckCircle2 className="w-5 h-5" />,
              note: (stats?.total_berlaku ?? 0) === 0 ? 'Belum ada hukum yang berlaku' : 'Regulasi aktif saat ini',
            },
            {
              id: 'tidak_berlaku',
              title: 'Total Hukum Tidak Berlaku',
              value: stats?.total_tidak_berlaku !== undefined ? stats.total_tidak_berlaku.toLocaleString('id-ID') : '0',
              icon: <XCircle className="w-5 h-5" />,
              note: (stats?.total_tidak_berlaku ?? 0) === 0 ? 'Belum ada hukum yang tidak berlaku' : 'Telah dicabut atau digantikan',
            },
            {
              id: 'draft',
              title: 'Total Draf',
              value: stats?.total_draft !== undefined ? stats.total_draft.toLocaleString('id-ID') : '0',
              icon: <FilePenLine className="w-5 h-5" />,
              note: (stats?.total_draft ?? 0) === 0 ? 'Tidak ada draft yang perlu ditinjau' : 'Perlu ditinjau',
              noteIcon: <AlertCircle className="w-3.5 h-3.5" />,
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
              className="w-full pl-8.5 pr-8 py-1.5 text-[12px] rounded-[10px] border border-neu-50 bg-white placeholder-neu-400 text-neu-900 focus:outline-none focus:border-neu-300 focus:ring-2 focus:ring-pr-900/5 transition-all shadow-2xs"
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
                onClick={() => setDeletingDraftIds(selectedDraftIds)}
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
              lokasiDaerahList={referensi?.lokasi_daerah || []}
              selectedLokasi={selectedLokasi}
              onChangeLokasi={(lokasi) => {
                const newLokasi = selectedLokasi.includes(lokasi)
                  ? selectedLokasi.filter(l => l !== lokasi)
                  : [...selectedLokasi, lokasi];
                setSelectedLokasi(newLokasi);
                setCurrentPage(1);
                fetchData({ lokasi: newLokasi, page: 1 });
              }}
              onClearLokasi={() => {
                setSelectedLokasi([]);
                setCurrentPage(1);
                fetchData({ lokasi: [], page: 1 });
              }}
              subjekList={referensi?.subjek || []}
              selectedSubjek={selectedSubjek}
              onChangeSubjek={(subjek) => {
                const newSubjek = selectedSubjek.includes(subjek)
                  ? selectedSubjek.filter(s => s !== subjek)
                  : [...selectedSubjek, subjek];
                setSelectedSubjek(newSubjek);
                setCurrentPage(1);
                fetchData({ subjek: newSubjek, page: 1 });
              }}
              onClearSubjek={() => {
                setSelectedSubjek([]);
                setCurrentPage(1);
                fetchData({ subjek: [], page: 1 });
              }}
              onClearAll={() => {
                setSelectedCategories([]);
                setSelectedLokasi([]);
                setSelectedSubjek([]);
                setCurrentPage(1);
                fetchData({ kategori: [], lokasi: [], subjek: [], page: 1 });
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
              onDelete={(draft) => setDeletingDraftIds([draft.id])}
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
            onPreview={(doc) => setPreviewDoc(doc)}
            onEdit={handleEditClick}
            onToggleStatus={handleOpenEditStatus}
            onDelete={(doc) => setDeletingDoc(doc)}
            onEmbed={(doc) => handleEmbed({ ids: [doc.id] })}
            isEmbeddingLoading={isEmbeddingLoading}
            selectedIds={selectedDocIds}
            onToggleSelect={handleToggleSelectDoc}
            onSelectAll={handleSelectAllDocs}
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
        currentPage={activePaginator?.current_page || currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Floating Batch Action Bar untuk Dokumen Terpilih */}
      {selectedDocIds.length > 0 && !isDraftTab && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-pr-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-4 border border-pr-700 animate-in slide-in-from-bottom duration-200">
          <span className="text-sm font-medium text-neu-100">
            {selectedDocIds.length} dokumen dipilih
          </span>
          <div className="h-4 w-px bg-pr-700" />
          <button
            type="button"
            onClick={() => handleEmbed({ ids: selectedDocIds })}
            disabled={isEmbeddingLoading}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEmbeddingLoading ? 'Memproses...' : `Embed AI Terpilih (${selectedDocIds.length})`}</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedDocIds([])}
            className="text-xs text-neu-300 hover:text-white transition-colors cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}

      {/* ── MODAL OVERLAYS (Nimpa In-Place tanpa reload / pindah halaman) ── */}
      {/* Modal Tambah Dokumen */}
      <DocumentModal
        show={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveDocument}
        categories={ALL_CATEGORIES}
      />

      {/* Modal Tinjauan Ringkas Dokumen (Read-only, tanpa reload) */}
      <DocumentPreviewModal
        show={Boolean(previewDoc)}
        documentData={previewDoc}
        onClose={() => setPreviewDoc(null)}
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

      {/* Modal Konfirmasi Hapus Draf (tunggal / massal) */}
      <DeleteConfirmModal
        show={deletingDraftIds.length > 0}
        title={`Hapus ${deletingDraftIds.length} Draf?`}
        description={`${deletingDraftIds.length} draf yang dipilih akan dihapus permanen dan tidak dapat dipulihkan.`}
        isLoading={isDeletingDraft}
        onClose={() => setDeletingDraftIds([])}
        onConfirm={async () => {
          setIsDeletingDraft(true);
          try {
            if (await handleDeleteDraft(deletingDraftIds)) {
              setDeletingDraftIds([]);
            }
          } finally {
            setIsDeletingDraft(false);
          }
        }}
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

      {/* Modal Live Progress Bar Embedding AI (Real-time Feedback) */}
      <EmbeddingProgressModal
        show={embeddingModal.show}
        onClose={closeEmbeddingModal}
        title={embeddingModal.title}
        totalPasal={embeddingModal.totalPasal}
        processedPasal={embeddingModal.processedPasal}
        statusMessage={embeddingModal.statusMessage}
        isProcessing={embeddingModal.isProcessing}
        isCompleted={embeddingModal.isCompleted}
        isError={embeddingModal.isError}
        errorMessage={embeddingModal.errorMessage}
        onCancel={cancelEmbedding}
      />
    </AdminLayout>
  );
}

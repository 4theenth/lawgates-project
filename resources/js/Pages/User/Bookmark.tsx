import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { UserDashboardLayout } from '@/Layouts/UserDashboardLayout';
import { PageHeader } from '@/Components/common/PageHeader';
import { FilterSearchBar } from '@/Components/common/FilterSearchBar';
import { Pagination } from '@/Components/common/Pagination';
import {
  BookmarkCollections,
  BookmarkCollectionItem,
  BookmarkCard,
  BookmarkCardItem,
  ManageBookmarkCollectionsModal,
} from '@/Components/bookmark';
import { Transition, TransitionChild } from '@headlessui/react';
import { useToast } from '@/hooks/useToast';
import { useFilterReferences } from '@/hooks/useFilterReferences';
import { Bookmark as BookmarkIcon, FileText, Plus, Trash2, Folder, Loader2, Pencil } from 'lucide-react';
import { PageProps } from '@/types';

interface PaginationData {
  data: BookmarkCardItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  links: any[];
}

interface BookmarkPageProps extends PageProps {
  bookmarks: PaginationData;
  collections: BookmarkCollectionItem[];
  totalAllBookmarks: number;
  kategoriOptions?: { value: string; label: string }[];
  filters: {
    q?: string;
    collection?: string;
    jenis?: string;
    lokasi_daerah?: string;
    sort?: string;
    per_page?: number;
  };
}

export default function UserBookmark({
  bookmarks,
  collections = [],
  totalAllBookmarks = 0,
  kategoriOptions = [],
  filters,
}: BookmarkPageProps) {
  const { toast } = useToast();

  // Search & Filter State
  const [search, setSearch] = useState(filters.q || '');
  const activeCollection = filters.collection || 'all';
  const selectedJenis = filters.jenis || 'all';
  const selectedSort = filters.sort || 'terbaru';
  const perPage = filters.per_page || 6;

  // Filter Lokasi Daerah (Perda)
  const { allFlatLokasi } = useFilterReferences();
  const selectedLokasi = React.useMemo(() => {
    if (!filters.lokasi_daerah) return [];
    if (Array.isArray(filters.lokasi_daerah)) return filters.lokasi_daerah;
    return String(filters.lokasi_daerah)
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);
  }, [filters.lokasi_daerah]);

  // Mode Kelola (Bulk Selection Mode - Figma #3198:77152)
  const [isManaging, setIsManaging] = useState(false);
  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<BookmarkCollectionItem | null>(null);
  const [deletingCollection, setDeletingCollection] = useState<BookmarkCollectionItem | null>(null);
  const [createFolderName, setCreateFolderName] = useState('');
  const [createFolderError, setCreateFolderError] = useState<string | null>(null);

  useEffect(() => {
    if (isCreateModalOpen) {
      setCreateFolderName(editingCollection?.name || '');
      setCreateFolderError(null);
    }
  }, [isCreateModalOpen, editingCollection]);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'bookmark' | 'bulk';
    id?: number | string;
    title: string;
    count?: number;
    names?: string[];
  } | null>(null);

  const [managingBookmark, setManagingBookmark] = useState<BookmarkCardItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper push router state
  const updateQuery = (newParams: Record<string, any>) => {
    router.get(
      route('user.bookmarks'),
      {
        q: search || undefined,
        collection: activeCollection !== 'all' ? activeCollection : undefined,
        jenis: selectedJenis !== 'all' ? selectedJenis : undefined,
        lokasi_daerah: selectedLokasi.length > 0 ? selectedLokasi.join(',') : undefined,
        sort: selectedSort !== 'terbaru' ? selectedSort : undefined,
        per_page: perPage !== 6 ? perPage : undefined,
        ...newParams,
      },
      { preserveState: true, replace: true }
    );
  };

  // 1. Search submit
  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateQuery({ q: search || undefined, page: 1 });
  };

  // 2. Collection selection
  const handleSelectCollection = (collectionId: number | string | 'all') => {
    setIsManaging(false);
    setSelectedIds([]);
    updateQuery({
      collection: collectionId !== 'all' ? collectionId : undefined,
      page: 1,
    });
  };

  // 3. Category (Jenis) filter change (Mendukung multi-select)
  const handleCategoryChange = (val: string | string[]) => {
    const valueStr = Array.isArray(val) ? val.join(',') : val;
    // Jika Perda tidak lagi dipilih, reset juga lokasi_daerah
    const isPerdaStillSelected = valueStr.includes('4') || valueStr.toLowerCase().includes('perda');
    updateQuery({
      jenis: valueStr !== 'all' && valueStr !== '' ? valueStr : undefined,
      lokasi_daerah: isPerdaStillSelected && selectedLokasi.length > 0 ? selectedLokasi.join(',') : undefined,
      page: 1,
    });
  };

  // 4. Lokasi Daerah (Perda) filter change
  const handleLokasiChange = (newLokasi: string[]) => {
    updateQuery({
      lokasi_daerah: newLokasi.length > 0 ? newLokasi.join(',') : undefined,
      page: 1,
    });
  };

  // 5. Sort change (default: terbaru)
  const handleSortChange = (val: string) => {
    const nextSort = val === selectedSort ? 'terbaru' : val;
    updateQuery({ sort: nextSort !== 'terbaru' ? nextSort : undefined, page: 1 });
  };

  // 6. Per page change
  const handlePerPageChange = (val: number) => {
    updateQuery({ per_page: val, page: 1 });
  };

  // 7. Buat / Ubah Folder Koleksi
  const handleCollectionSubmit = (name: string, id?: number | string) => {
    setIsSubmitting(true);
    if (id) {
      router.put(
        route('user.bookmarks.collections.update', id),
        { name },
        {
          preserveScroll: true,
          onSuccess: () => {
            setIsSubmitting(false);
            setEditingCollection(null);
            setIsCreateModalOpen(false);
          },
          onError: (errors: any) => {
            setIsSubmitting(false);
            const errMsg = errors?.name || 'Gagal memperbarui folder. Pastikan nama folder belum digunakan.';
            setCreateFolderError(errMsg);
            toast.error(errMsg, undefined, 6000);
          },
        }
      );
    } else {
      router.post(
        route('user.bookmarks.collections.store'),
        { name },
        {
          preserveScroll: true,
          onSuccess: () => {
            setIsSubmitting(false);
            setIsCreateModalOpen(false);
          },
          onError: (errors: any) => {
            setIsSubmitting(false);
            const errMsg = errors?.name || 'Gagal membuat folder. Pastikan nama folder belum digunakan.';
            setCreateFolderError(errMsg);
            toast.error(errMsg, undefined, 6000);
          },
        }
      );
    }
  };

  // 7. Inline Tambah Folder dari dalam Modal "Simpan ke Koleksi"
  const handleInlineCreateFolder = (name: string) => {
    const isDuplicate = collections.some(
      (c) => c.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      const errMsg = 'Nama folder sudah ada. Silakan gunakan nama lain.';
      toast.error(errMsg, undefined, 6000);
      return Promise.reject(new Error(errMsg));
    }

    return new Promise<void>((resolve, reject) => {
      router.post(
        route('user.bookmarks.collections.store'),
        { name },
        {
          preserveScroll: true,
          onSuccess: () => {
            resolve();
          },
          onError: (errors: any) => {
            const errMsg = errors?.name || 'Gagal membuat folder.';
            toast.error(errMsg, undefined, 6000);
            reject();
          },
        }
      );
    });
  };

  // 8. Konfirmasi Delete (Single Bookmark, Folder, atau Bulk)
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    setIsSubmitting(true);

    if (deleteTarget.type === 'bulk') {
      router.post(
        route('user.bookmarks.bulk_destroy'),
        { bookmark_ids: selectedIds },
        {
          preserveScroll: true,
          onSuccess: () => {
            setIsSubmitting(false);
            setIsManaging(false);
            setSelectedIds([]);
            setDeleteTarget(null);
          },
          onError: () => {
            setIsSubmitting(false);
            toast.error('Gagal menghapus peraturan terpilih.');
          },
        }
      );
    } else if (deleteTarget.type === 'bookmark') {
      router.delete(route('user.bookmarks.destroy', deleteTarget.id), {
        preserveScroll: true,
        onSuccess: () => {
          setIsSubmitting(false);
          setDeleteTarget(null);
        },
        onError: () => {
          setIsSubmitting(false);
          toast.error('Gagal menghapus bookmark.');
        },
      });
    }
  };

  // 8b. Hapus Folder Koleksi (Scoped ke panel Koleksi)
  const handleConfirmDeleteFolder = (col: BookmarkCollectionItem) => {
    setIsSubmitting(true);
    router.delete(route('user.bookmarks.collections.destroy', col.id), {
      preserveScroll: true,
      onSuccess: () => {
        setIsSubmitting(false);
        setDeletingCollection(null);
        if (String(activeCollection) === String(col.id)) {
          handleSelectCollection('all');
        }
      },
      onError: () => {
        setIsSubmitting(false);
        toast.error('Gagal menghapus folder.');
      },
    });
  };

  // 8c. Toggle Folder Koleksi langsung dari Titik Tiga Kartu (Figma node #3198:77105)
  const handleToggleCollectionForBookmark = (
    bookmarkId: number | string,
    collectionId: number | string
  ) => {
    const targetBookmark = bookmarks.data.find((b) => String(b.id) === String(bookmarkId));
    if (!targetBookmark) return;

    const currentCollectionIds = targetBookmark.collections?.map((c) => c.id) || [];
    const isAlreadyIn = currentCollectionIds.some((id) => String(id) === String(collectionId));

    const nextCollectionIds = isAlreadyIn
      ? currentCollectionIds.filter((id) => String(id) !== String(collectionId))
      : [...currentCollectionIds, collectionId];

    router.post(
      route('user.bookmarks.collections.sync', bookmarkId),
      { collection_ids: nextCollectionIds },
      {
        preserveScroll: true,
        onError: () => {
          toast.error('Gagal memperbarui folder bookmark.');
        },
      }
    );
  };

  // 9. Simpan assign folder koleksi (Bulk / Multiple)
  const handleSaveCollections = (
    bookmarkIds: (number | string)[],
    collectionIds: (number | string)[]
  ) => {
    setIsSubmitting(true);

    if (bookmarkIds.length === 1) {
      router.post(
        route('user.bookmarks.collections.sync', bookmarkIds[0]),
        { collection_ids: collectionIds },
        {
          preserveScroll: true,
          onSuccess: () => {
            setIsSubmitting(false);
            setManagingBookmark(null);
            const total = collectionIds.length;
            const msg =
              total > 0
                ? `1 peraturan dimasukkan ke ${total} koleksi`
                : 'Peraturan dikeluarkan dari semua koleksi';
            toast.success(msg);
          },
          onError: () => {
            setIsSubmitting(false);
            toast.error('Gagal memperbarui koleksi bookmark.');
          },
        }
      );
    } else {
      router.post(
        route('user.bookmarks.bulk_collections'),
        {
          bookmark_ids: bookmarkIds,
          collection_ids: collectionIds,
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            setIsSubmitting(false);
            setIsBulkModalOpen(false);
            setIsManaging(false);
            setSelectedIds([]);
            toast.success(
              `${bookmarkIds.length} peraturan dimasukkan ke ${collectionIds.length} koleksi.`
            );
          },
          onError: () => {
            setIsSubmitting(false);
            toast.error('Gagal memasukkan peraturan ke koleksi.');
          },
        }
      );
    }
  };

  // Toggle selection
  const handleToggleSelect = (id: number | string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Nama folder aktif saat ini untuk judul sub-panel
  const activeCollectionName =
    activeCollection === 'all'
      ? 'Semua Bookmark'
      : collections.find((c) => String(c.id) === String(activeCollection))?.name ||
      'Koleksi Bookmark';

  return (
    <UserDashboardLayout
      activeMenu="bookmark"
      breadcrumbs={[
        { label: 'Beranda', href: '/' },
        { label: 'Ringkasan', href: route('dashboard') },
        { label: 'Bookmark Saya' },
      ]}
      bookmarkCount={totalAllBookmarks}
      collectionCount={collections.length}
    >
      <Head title="Bookmark Saya - LawGates" />

      {/* ── 1. Page Header (Figma node #3142:56361) ── */}
      <PageHeader
        title="Bookmark Saya"
        description="Kelola peraturan, dokumen, dan pasal yang kamu simpan"
        size="lg"
      />

      {/* ── 2. Filter Search Bar (Figma node #3142:56403) ── */}
      <div className="mb-6">
        <FilterSearchBar
          search={search}
          onSearchChange={setSearch}
          placeholder="Cari di dalam bookmark..."
          selectedCategory={selectedJenis}
          onCategoryChange={handleCategoryChange}
          categoryOptions={kategoriOptions.length > 0 ? kategoriOptions : undefined}
          selectedLokasi={selectedLokasi}
          onLokasiChange={handleLokasiChange}
          allFlatLokasi={allFlatLokasi}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* ── 3. Container Card Utama 2 Kolom (Figma node #3142:56404) ── */}
      <div className="relative w-full bg-white border border-neu-50 rounded-[20px] shadow-2xs overflow-hidden flex flex-col lg:flex-row">
        {/* Sub-Panel Kiri: Daftar Koleksi / Folder (Figma node #3146:56405 & #3190:72877) */}
        <BookmarkCollections
          collections={collections}
          activeCollectionId={activeCollection}
          totalAllBookmarks={totalAllBookmarks}
          onSelectCollection={handleSelectCollection}
          onCreateFolder={() => {
            setEditingCollection(null);
            setIsCreateModalOpen(true);
          }}
          onRenameFolder={(col) => {
            setEditingCollection(col);
            setIsCreateModalOpen(true);
          }}
          onDeleteFolder={(col) => {
            setDeletingCollection(col);
          }}
        />

        {/* Sub-Panel Kanan: Daftar Bookmark & Pagination */}
        <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Header Konten Sub-Panel (Figma node #3198:78610 & #3198:77152 - tanpa garis pemisah) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 min-h-[44px]">
              <div className="min-w-0 flex-1">
                <h3
                  className="font-sans text-[16px] font-semibold text-neu-900 leading-snug truncate"
                  title={activeCollectionName}
                >
                  {activeCollectionName}
                </h3>
                <p className="font-sans text-[12px] text-neu-500 mt-0.5">
                  Kelola peraturan yang kamu simpan
                </p>
              </div>

              {/* Action Toolbar di Kanan Header (Figma node #3198:78610) */}
              <div className="flex items-center gap-2 min-h-[32px] shrink-0">
                {isManaging && (
                  <>
                    {/* Tombol Hapus Terpilih (Merah) */}
                    <button
                      type="button"
                      disabled={selectedIds.length === 0}
                      onClick={() => {
                        const selectedItems = bookmarks.data.filter((b) => selectedIds.includes(b.id));
                        const names = selectedItems.map((b) => b.judul);
                        setDeleteTarget({
                          type: 'bulk',
                          title: 'Hapus Peraturan Sekaligus?',
                          count: selectedIds.length,
                          names,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-dan-900 hover:bg-dan-800 text-white font-sans text-[12px] font-medium transition-colors cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed select-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>

                    {/* Tombol Tambah Ke Koleksi (Navy Primary) */}
                    <button
                      type="button"
                      disabled={selectedIds.length === 0}
                      onClick={() => setIsBulkModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white font-sans text-[12px] font-medium transition-colors cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed select-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Ke Koleksi</span>
                    </button>
                  </>
                )}

                {/* Tombol Kelola / Batal (Sesuai Figma node #3393:58127) */}
                {bookmarks.data.length > 0 && (
                  isManaging ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsManaging(false);
                        setSelectedIds([]);
                      }}
                      className="font-sans text-[12px] sm:text-[13px] font-medium text-neu-500 hover:text-neu-800 hover:underline cursor-pointer select-none ml-1 transition-colors"
                    >
                      Batal
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsManaging(true)}
                      className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white font-sans text-[12px] font-medium transition-colors cursor-pointer shadow-2xs select-none"
                    >
                      <Pencil className="w-3 h-3 text-white shrink-0" />
                      <span>Kelola</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Grid Kartu Bookmark */}
            {bookmarks.data.length === 0 ? (
              /* Clean Empty State */
              <div className="py-16 sm:py-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-14 h-14 rounded-full bg-neu-50 border border-neu-100 flex items-center justify-center text-neu-400 mb-3">
                  <BookmarkIcon className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h4 className="font-sans text-[15px] font-semibold text-neu-900 mb-1">
                  {filters.q
                    ? 'Peraturan Tidak Ditemukan'
                    : 'Belum Ada Bookmark di Sini'}
                </h4>
                <p className="font-sans text-[12px] text-neu-500 max-w-sm mb-5 leading-relaxed">
                  {filters.q
                    ? `Tidak ada peraturan yang cocok dengan pencarian "${filters.q}".`
                    : 'Simpan peraturan dari katalog hukum untuk mengelompokkannya di sini.'}
                </p>
                <Link
                  href="/regulasi"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white font-sans text-xs font-medium transition-colors shadow-2xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Jelajahi Regulasi</span>
                </Link>
              </div>
            ) : (
              /* Grid 2 Kolom Kartu Bookmark (Figma: 2 columns x 3 rows = 6 per page) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks.data.map((item) => (
                  <BookmarkCard
                    key={item.id}
                    item={item}
                    isManaging={isManaging}
                    isSelected={selectedIds.includes(item.id)}
                    onToggleSelect={handleToggleSelect}
                    onRemoveBookmark={(id, title) => {
                      setDeleteTarget({
                        type: 'bookmark',
                        id,
                        title,
                      });
                    }}
                    allCollections={collections}
                    onToggleCollection={handleToggleCollectionForBookmark}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── 4. Baris Pagination Reusable (Figma node #3160:56797 - tanpa border pemisah di atas) ── */}
          {bookmarks.total > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={bookmarks.current_page}
                lastPage={bookmarks.last_page}
                pageSize={perPage}
                pageSizeOptions={[6, 12, 24, 48]}
                onPageChange={(page) => updateQuery({ page })}
                onPageSizeChange={handlePerPageChange}
                variant="admin"
                iconOnlyArrows={true}
              />
            </div>
          )}
        </div>

        {/* ── Overlay Blok #212121 40% (#21212166) Menutupi Seluruh Card Container Utama (Koleksi + Tabel Bookmark di Sebelahnya) ── */}
        <Transition
          show={
            isCreateModalOpen ||
            Boolean(deletingCollection) ||
            Boolean(deleteTarget)
          }
          as="div"
          className="absolute inset-0 z-30 flex flex-col justify-center items-center overflow-y-auto p-4 sm:p-6"
        >
          {/* Backdrop #212121 40% (#21212166) dengan smooth fade transition */}
          <TransitionChild
            as="div"
            enter="ease-out duration-300 transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200 transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-0 cursor-pointer"
            style={{ backgroundColor: '#21212166' }}
            onClick={() => {
              if (isCreateModalOpen) {
                setIsCreateModalOpen(false);
                setEditingCollection(null);
              }
              if (deletingCollection) {
                setDeletingCollection(null);
              }
              if (deleteTarget) {
                setDeleteTarget(null);
              }
            }}
          />

          {/* 1. Modal Form "Nama Folder" (Figma node #3173:71454) - Aligned di atas panel Koleksi */}
          {isCreateModalOpen && (
            <TransitionChild
              as="div"
              enter="ease-out duration-300 transition-all transform"
              enterFrom="opacity-0 -translate-y-3 scale-[0.97]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200 transition-all transform"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 -translate-y-2 scale-[0.97]"
              className="relative z-10 self-start mt-[80px] sm:mt-[100px] ml-2 sm:ml-5 w-full max-w-[258px] rounded-[15px] p-[11px_17px] bg-white border border-neu-50 shadow-[0px_4px_24px_rgba(0,0,0,0.12)]"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const trimmed = createFolderName.trim();
                  if (!trimmed) {
                    setCreateFolderError('Nama folder tidak boleh kosong.');
                    return;
                  }
                  if (trimmed.length > 50) {
                    setCreateFolderError('Nama folder maksimal 50 karakter.');
                    return;
                  }
                  // Cek duplikasi nama folder di client-side
                  const isDuplicate = collections.some(
                    (c) =>
                      c.name.trim().toLowerCase() === trimmed.toLowerCase() &&
                      String(c.id) !== String(editingCollection?.id)
                  );
                  if (isDuplicate) {
                    const errMsg = 'Nama folder sudah ada. Silakan gunakan nama lain.';
                    setCreateFolderError(errMsg);
                    toast.error(errMsg, undefined, 6000);
                    return;
                  }
                  setCreateFolderError(null);
                  handleCollectionSubmit(trimmed, editingCollection?.id);
                }}
                className="w-full flex flex-col gap-[20px]"
              >
                <div className="flex flex-col gap-[5px]">
                  <label className="font-sans text-[12px] font-normal text-neu-900 select-none">
                    Nama Folder <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input
                    type="text"
                    value={createFolderName}
                    onChange={(e) => {
                      setCreateFolderName(e.target.value);
                      if (createFolderError) setCreateFolderError(null);
                    }}
                    placeholder="Masukan nama folder"
                    maxLength={50}
                    autoFocus
                    className="w-full h-[38px] px-3 rounded-[10px] bg-white border border-neu-100 hover:border-neu-200 font-sans text-[12px] text-neu-900 placeholder:text-neu-500 focus:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-all shadow-2xs"
                  />
                  {createFolderError && (
                    <p className="font-sans text-[11px] text-dan-900 mt-0.5">{createFolderError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !createFolderName.trim()}
                  className="w-full h-[38px] rounded-[8px] bg-pr-900 hover:bg-pr-800 text-[#FAFAFA] font-sans text-[14px] font-medium transition-colors shadow-2xs cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      {editingCollection ? (
                        <Pencil className="w-4 h-4" />
                      ) : (
                        <Folder className="w-4 h-4 fill-white/10 stroke-white" />
                      )}
                      <span>{editingCollection ? 'Simpan Perubahan' : 'Simpan'}</span>
                    </>
                  )}
                </button>
              </form>
            </TransitionChild>
          )}

          {/* 2. Modal "Hapus Folder?" (Figma node #3190:74314) */}
          {deletingCollection && (
            <TransitionChild
              as="div"
              enter="ease-out duration-300 transition-all transform"
              enterFrom="opacity-0 -translate-y-3 scale-[0.97]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200 transition-all transform"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 -translate-y-2 scale-[0.97]"
              className="relative z-10 self-start mt-[70px] sm:mt-[90px] ml-2 sm:ml-6 w-full max-w-[440px] sm:max-w-[454px] rounded-[20px] p-6 sm:p-[24px_28px] bg-white border border-neu-50 shadow-[0px_10px_30px_rgba(0,0,0,0.15)] text-left"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h4 className="font-sans text-[18px] sm:text-[20px] font-semibold text-neu-900 mb-2 leading-snug">
                Hapus Folder?
              </h4>
              <p className="font-sans text-[13px] sm:text-[14px] text-neu-600 mb-6 leading-relaxed break-words">
                Hapus folder “<span className="font-medium text-neu-900">{deletingCollection.name}</span>” beserta data peraturan yang ada di dalamnya
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingCollection(null)}
                  disabled={isSubmitting}
                  className="px-5 py-2 font-sans text-[14px] font-medium text-neu-900 bg-white border border-neu-100 hover:bg-neu-50 rounded-[8px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmDeleteFolder(deletingCollection)}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 font-sans text-[14px] font-medium bg-dan-900 hover:bg-dan-800 text-white rounded-[8px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <span>Hapus Permanen</span>
                  )}
                </button>
              </div>
            </TransitionChild>
          )}

          {/* 3. Modal "Hapus Peraturan Sekaligus?" (Screenshot 1) */}
          {deleteTarget && (
            <TransitionChild
              as="div"
              enter="ease-out duration-300 transition-all transform"
              enterFrom="opacity-0 -translate-y-3 scale-[0.97]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200 transition-all transform"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 -translate-y-2 scale-[0.97]"
              className="relative z-10 m-auto w-full max-w-[440px] sm:max-w-[454px] rounded-[20px] p-6 sm:p-[24px_28px] bg-white border border-neu-50 shadow-[0px_10px_30px_rgba(0,0,0,0.15)] text-left"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h4 className="font-sans text-[18px] sm:text-[20px] font-semibold text-neu-900 mb-2 leading-snug">
                {deleteTarget.type === 'bulk' ? 'Hapus Peraturan Sekaligus?' : 'Hapus dari Bookmark?'}
              </h4>
              <p className="font-sans text-[13px] sm:text-[14px] text-neu-600 mb-6 leading-relaxed break-words">
                {deleteTarget.type === 'bulk'
                  ? deleteTarget.names && deleteTarget.names.length > 0
                    ? `Hapus peraturan ${deleteTarget.names.slice(0, 2).map((n) => `“${n}”`).join(', ')}${deleteTarget.names.length > 2 ? ` dan ${deleteTarget.names.length - 2} peraturan lainnya` : ''} secara permanen?`
                    : `Hapus ${deleteTarget.count || selectedIds.length} peraturan terpilih secara permanen?`
                  : `Hapus peraturan “${deleteTarget.title}” secara permanen?`}
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isSubmitting}
                  className="px-5 py-2 font-sans text-[14px] font-medium text-neu-900 bg-white border border-neu-100 hover:bg-neu-50 rounded-[8px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 font-sans text-[14px] font-medium bg-dan-900 hover:bg-dan-800 text-white rounded-[8px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <span>Hapus Permanen</span>
                  )}
                </button>
              </div>
            </TransitionChild>
          )}
        </Transition>
      </div>

      {/* 4. Modal "Tambah Ke Koleksi" (Figma #3214:79985 / Mobile Bottom Sheet #3249:71845) */}
      <ManageBookmarkCollectionsModal
        show={isBulkModalOpen || Boolean(managingBookmark)}
        onClose={() => {
          setManagingBookmark(null);
          setIsBulkModalOpen(false);
        }}
        item={managingBookmark}
        selectedBookmarkIds={isBulkModalOpen ? selectedIds : []}
        selectedBookmarks={
          isBulkModalOpen
            ? bookmarks.data.filter((b) => selectedIds.includes(b.id))
            : managingBookmark
              ? [managingBookmark]
              : []
        }
        collections={collections}
        onSave={handleSaveCollections}
        onCreateFolder={handleInlineCreateFolder}
        isLoading={isSubmitting}
      />
    </UserDashboardLayout>
  );
}

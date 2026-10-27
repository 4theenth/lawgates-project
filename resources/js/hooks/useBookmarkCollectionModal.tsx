import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/hooks/useToast';
import { removeGlobalBookmark } from '@/hooks/useBookmark';
import { ManageBookmarkCollectionsModal } from '@/Components/bookmark/ManageBookmarkCollectionsModal';
import { BookmarkCollectionItem } from '@/Components/bookmark/BookmarkCollections';
import { BookmarkCardItem } from '@/Components/bookmark/BookmarkCard';

export interface OpenCollectionModalParams {
  bookmarkId?: number | string;
  peraturanId?: number | string;
  collections?: { id: number | string; name: string }[];
  bookmarkPromise?: Promise<number | string | null>;
}

export interface BookmarkCollectionModalContextValue {
  openCollectionModal: (params: OpenCollectionModalParams) => void;
  closeCollectionModal: () => void;
  isOpen: boolean;
}

const BookmarkCollectionModalContext = createContext<BookmarkCollectionModalContextValue | null>(null);

export function BookmarkCollectionModalProvider({ children }: { children: React.ReactNode }) {
  const { props, url } = usePage<any>();
  const user = props.auth?.user || null;
  const isAuthenticated = Boolean(user);
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState<(BookmarkCardItem & { peraturanId?: number | string }) | null>(null);
  const [collections, setCollections] = useState<BookmarkCollectionItem[]>([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const pendingPromiseRef = React.useRef<Promise<number | string | null> | null>(null);

  // Ambil daftar folder koleksi milik user (gunakan cache di state jika sudah ada)
  const fetchCollections = useCallback(async () => {
    if (!isAuthenticated) return;
    if (collections.length === 0) {
      setIsLoadingCollections(true);
    }
    try {
      const response = await axios.get('/api/bookmark-collections');
      if (response.data && response.data.success) {
        setCollections(
          (response.data.data || []).map((col: any) => ({
            id: col.id,
            name: col.name,
            total_bookmarks: col.bookmark_count ?? col.bookmarks_count ?? 0,
            bookmarks_count: col.bookmark_count ?? col.bookmarks_count ?? 0,
          }))
        );
      }
    } catch (err) {
      console.error('Gagal memuat daftar koleksi:', err);
    } finally {
      setIsLoadingCollections(false);
    }
  }, [isAuthenticated, collections.length]);

  // Muat koleksi saat user login agar siap digunakan seketika
  useEffect(() => {
    if (isAuthenticated) {
      fetchCollections();
    }
  }, [isAuthenticated, fetchCollections]);

  const openCollectionModal = useCallback(
    (params: OpenCollectionModalParams) => {
      pendingPromiseRef.current = params.bookmarkPromise || null;
      setModalItem({
        id: params.bookmarkId || 0,
        peraturanId: params.peraturanId,
        collections: params.collections || [],
      } as any);
      setIsOpen(true);
      fetchCollections();

      if (params.bookmarkPromise) {
        params.bookmarkPromise.then((resolvedId) => {
          if (resolvedId) {
            setModalItem((prev) => (prev ? { ...prev, id: resolvedId } : null));
          }
        });
      }
    },
    [fetchCollections]
  );

  const closeCollectionModal = useCallback(() => {
    setIsOpen(false);
    setModalItem(null);
    pendingPromiseRef.current = null;
  }, []);

  // Tutup modal jika berpindah URL
  useEffect(() => {
    setIsOpen(false);
    setModalItem(null);
  }, [url]);

  // Handler simpan koleksi ke backend
  const handleSaveCollections = async (
    _bookmarkIds: (number | string)[],
    selectedCollectionIds: (number | string)[]
  ) => {
    if (!modalItem) return;

    let targetBookmarkId = modalItem.id;
    if (!targetBookmarkId && pendingPromiseRef.current) {
      setIsSaving(true);
      targetBookmarkId = (await pendingPromiseRef.current) || 0;
    }

    if (!targetBookmarkId) {
      toast.error('Gagal memperbarui koleksi.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await axios.put('/api/bookmarks/assign-collections', {
        bookmark_id: targetBookmarkId,
        collection_ids: selectedCollectionIds,
      });

      if (response.data && response.data.success) {
        const total = selectedCollectionIds.length;
        const msg =
          total > 0
            ? `1 peraturan dimasukkan ke ${total} koleksi`
            : 'Peraturan dikeluarkan dari semua koleksi';
        toast.success(msg);
        closeCollectionModal();
        // Segarkan data koleksi untuk update hitungan bookmark
        fetchCollections();
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Gagal memperbarui koleksi.';
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  // Handler buat folder baru inline
  const handleCreateFolder = async (name: string) => {
    try {
      const response = await axios.post('/api/bookmark-collections', { name });
      if (response.data && response.data.success) {
        const newCol = response.data.data;
        const newItem: BookmarkCollectionItem = {
          id: newCol.id,
          name: newCol.name,
          total_bookmarks: 0,
          bookmarks_count: 0,
        };
        setCollections((prev) => [...prev, newItem]);
        toast.success(`Folder "${name}" berhasil dibuat.`);
        return newItem;
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Gagal membuat folder.';
      toast.error(message);
      throw err;
    }
  };

  // Handler batal simpan / hapus bookmark langsung dari modal
  const handleUnbookmark = async () => {
    if (!modalItem) return;

    const targetPeraturanId = modalItem.peraturanId;
    if (targetPeraturanId) {
      removeGlobalBookmark(targetPeraturanId);
    }

    try {
      if (targetPeraturanId) {
        await axios.post('/api/bookmarks/toggle', {
          type: 'peraturan',
          id: targetPeraturanId,
        });
      } else {
        await axios.delete(`/bookmarks/${modalItem.id}`);
      }

      toast.success('Peraturan dihapus dari bookmark');
      closeCollectionModal();
    } catch {
      toast.error('Gagal menghapus bookmark.');
    }
  };

  return (
    <BookmarkCollectionModalContext.Provider
      value={{
        openCollectionModal,
        closeCollectionModal,
        isOpen,
      }}
    >
      {children}
      {isAuthenticated && (
        <ManageBookmarkCollectionsModal
          show={isOpen}
          onClose={closeCollectionModal}
          item={modalItem}
          collections={collections}
          onSave={handleSaveCollections}
          onUnbookmark={handleUnbookmark}
          onCreateFolder={handleCreateFolder}
          isLoading={isSaving}
          isLoadingCollections={isLoadingCollections}
        />
      )}
    </BookmarkCollectionModalContext.Provider>
  );
}

export function useBookmarkCollectionModal() {
  const context = useContext(BookmarkCollectionModalContext);
  return context;
}

export default BookmarkCollectionModalProvider;

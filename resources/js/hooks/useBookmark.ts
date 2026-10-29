import { useState, useEffect, useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useToast } from '@/hooks/useToast';
import { useBookmarkCollectionModal } from '@/hooks/useBookmarkCollectionModal';

// Global reactive Set to synchronize bookmark status instantly across all components on screen
const globalBookmarkSet = new Set<string>();
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

let lastServerBookmarkKey = '';

function syncServerBookmarkIds(serverBookmarkIds: (string | number)[]) {
  const key = serverBookmarkIds.map(String).sort().join(',');
  if (key !== lastServerBookmarkKey) {
    lastServerBookmarkKey = key;
    globalBookmarkSet.clear();
    key.split(',').filter(Boolean).forEach((id) => globalBookmarkSet.add(id));
  }
}

export function removeGlobalBookmark(id: string | number) {
  globalBookmarkSet.delete(String(id).trim());
  notifyListeners();
}

export function addGlobalBookmark(id: string | number) {
  globalBookmarkSet.add(String(id).trim());
  notifyListeners();
}

/**
 * Reusable hook for managing bookmark status and toggling.
 * Uses shared Inertia auth.bookmarkIds as the single source of truth across the entire app.
 */
export function useBookmark(peraturanId?: string | number) {
  const { props } = usePage<any>();
  const { requireAuth } = useAuthModal();
  const { toast } = useToast();
  const collectionModal = useBookmarkCollectionModal();

  const idStr = peraturanId !== undefined && peraturanId !== null ? String(peraturanId).trim() : '';

  // Synchronize server-provided bookmark IDs from Inertia page props.
  // We sync synchronously so that initial render immediately has the correct isBookmarked value.
  const serverBookmarkIds: (string | number)[] = props.auth?.bookmarkIds || [];
  const serverBookmarkKey = serverBookmarkIds.map(String).sort().join(',');

  syncServerBookmarkIds(serverBookmarkIds);

  // Subscribe to changes in globalBookmarkSet
  const [, setTick] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleChange = () => setTick((t) => t + 1);
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  useEffect(() => {
    globalBookmarkSet.clear();
    serverBookmarkKey.split(',').filter(Boolean).forEach((id) => globalBookmarkSet.add(id));
    notifyListeners();
  }, [serverBookmarkKey]);

  const isBookmarked = Boolean(idStr && globalBookmarkSet.has(idStr));

  const toggle = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!idStr || isLoading) return;

      requireAuth(async () => {
        const nextState = !globalBookmarkSet.has(idStr);

        // Optimistic update
        if (nextState) {
          globalBookmarkSet.add(idStr);
        } else {
          globalBookmarkSet.delete(idStr);
        }
        notifyListeners();

        // JIKA MENYIMPAN (nextState = true): Buka modal koleksi SECARA INSTAN seketika saat diklik!
        if (nextState && collectionModal) {
          setIsLoading(true);

          const bookmarkPromise = axios
            .post('/api/bookmarks/toggle', { type: 'peraturan', id: idStr })
            .then((response) => {
              if (response.data && response.data.success && response.data.bookmarked) {
                globalBookmarkSet.add(idStr);
                notifyListeners();
                toast.success('Peraturan berhasil disimpan ke bookmark');
                return response.data.bookmark_id;
              }
              return null;
            })
            .catch(() => {
              // Rollback jika request backend gagal
              globalBookmarkSet.delete(idStr);
              notifyListeners();
              collectionModal.closeCollectionModal();
              toast.error('Gagal memperbarui bookmark.');
              return null;
            })
            .finally(() => {
              setIsLoading(false);
            });

          collectionModal.openCollectionModal({
            peraturanId: idStr,
            bookmarkPromise,
          });

          return;
        }

        // JIKA MENGHAPUS BOOKMARK (nextState = false):
        setIsLoading(true);
        try {
          const response = await axios.post('/api/bookmarks/toggle', { type: 'peraturan', id: idStr });
          if (response.data && response.data.success) {
            globalBookmarkSet.delete(idStr);
            toast.success('Peraturan dihapus dari bookmark');
            notifyListeners();
          }
        } catch {
          // Rollback on failure
          globalBookmarkSet.add(idStr);
          notifyListeners();
          toast.error('Gagal memperbarui bookmark.');
        } finally {
          setIsLoading(false);
        }
      });
    },
    [idStr, isLoading, requireAuth, toast, collectionModal]
  );

  return {
    isBookmarked,
    isLoading,
    toggle,
  };
}

export default useBookmark;

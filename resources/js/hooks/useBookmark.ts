import { useState, useEffect, useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useToast } from '@/hooks/useToast';

// Global reactive Set to synchronize bookmark status instantly across all components on screen
const globalBookmarkSet = new Set<string>();
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

/**
 * Reusable hook for managing bookmark status and toggling.
 * Uses shared Inertia auth.bookmarkIds as the single source of truth across the entire app.
 */
export function useBookmark(peraturanId?: string | number) {
  const { props } = usePage<any>();
  const { requireAuth } = useAuthModal();
  const { toast } = useToast();

  const idStr = peraturanId !== undefined && peraturanId !== null ? String(peraturanId).trim() : '';

  // Synchronize server-provided bookmark IDs from Inertia page props
  const serverBookmarkIds: (string | number)[] = props.auth?.bookmarkIds || [];

  useEffect(() => {
    if (serverBookmarkIds.length > 0) {
      serverBookmarkIds.forEach((id) => globalBookmarkSet.add(String(id)));
      notifyListeners();
    }
  }, [serverBookmarkIds]);

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

        setIsLoading(true);
        try {
          const response = await axios.post(`/api/bookmarks/${idStr}/toggle`);
          if (response.data && response.data.success) {
            const finalState = Boolean(response.data.bookmarked);
            const returnedId = response.data.peraturan_id ? String(response.data.peraturan_id) : idStr;
            const returnedUniqueId = response.data.unique_id ? String(response.data.unique_id) : idStr;

            if (finalState) {
              globalBookmarkSet.add(idStr);
              globalBookmarkSet.add(returnedId);
              globalBookmarkSet.add(returnedUniqueId);
              toast.success('Peraturan berhasil disimpan ke bookmark');
            } else {
              globalBookmarkSet.delete(idStr);
              globalBookmarkSet.delete(returnedId);
              globalBookmarkSet.delete(returnedUniqueId);
              toast.success('Peraturan dihapus dari bookmark');
            }
            notifyListeners();
          }
        } catch {
          // Rollback on failure
          if (nextState) {
            globalBookmarkSet.delete(idStr);
          } else {
            globalBookmarkSet.add(idStr);
          }
          notifyListeners();
          toast.error('Gagal memperbarui bookmark.');
        } finally {
          setIsLoading(false);
        }
      });
    },
    [idStr, isLoading, requireAuth, toast]
  );

  return {
    isBookmarked,
    isLoading,
    toggle,
  };
}

export default useBookmark;

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'lawgates_universal_recent_searches';
const MAX_SEARCHES = 5;
const UPDATE_EVENT = 'lawgates:recent-searches-updated';

function getStoredSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        .slice(0, MAX_SEARCHES);
    }
  } catch (err) {
    console.error('Failed to parse recent searches from localStorage:', err);
  }
  return [];
}

function saveSearches(searches: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches.slice(0, MAX_SEARCHES)));
    window.dispatchEvent(new Event(UPDATE_EVENT));
  } catch (err) {
    console.error('Failed to save recent searches to localStorage:', err);
  }
}

/**
 * Hook terpusat untuk mengelola riwayat pencarian universal LawGates.
 * Tersinkronisasi secara reaktif via localStorage antar komponen dan tab browser.
 * Dibatasi maksimal 5 pencarian terakhir.
 */
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>(getStoredSearches);

  useEffect(() => {
    const handleUpdate = () => {
      setRecentSearches(getStoredSearches());
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const addSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const next = [trimmed, ...filtered].slice(0, MAX_SEARCHES);
      saveSearches(next);
      return next;
    });
  }, []);

  const removeSearch = useCallback((queryToRemove: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((item) => item !== queryToRemove);
      saveSearches(next);
      return next;
    });
  }, []);

  const clearSearches = useCallback(() => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event(UPDATE_EVENT));
      } catch (err) {
        console.error('Failed to clear recent searches:', err);
      }
    }
  }, []);

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearSearches,
  };
}

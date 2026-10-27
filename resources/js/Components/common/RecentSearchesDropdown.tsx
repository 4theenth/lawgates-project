import React, { useEffect, useRef, useMemo } from 'react';
import { History, X } from 'lucide-react';
import { useRecentSearches } from '@/hooks/useRecentSearches';

export interface RecentSearchesDropdownProps {
  /** Menentukan apakah dropdown sedang aktif/terbuka */
  isOpen: boolean;
  /** Callback saat pengguna mengklik salah satu baris riwayat (instant search) */
  onSelect: (query: string) => void;
  /** Callback untuk menutup dropdown saat click-outside atau Escape */
  onClose: () => void;
  /** Tema tampilan: 'dark' untuk hero beranda, 'light' untuk halaman pencarian & regulasi */
  variant?: 'dark' | 'light';
  /** Kelas CSS tambahan untuk memposisikan atau menyesuaikan lebar dropdown */
  className?: string;
  /** Kata kunci yang sedang diketik user untuk menyaring riwayat (seperti Google / YouTube) */
  searchQuery?: string;
}

/**
 * Helper untuk memberikan highlight tebal pada karakter yang cocok dengan ketikan user
 */
function renderHighlightedText(text: string, query: string, isDark: boolean) {
  if (!query) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className={isDark ? 'font-bold text-white' : 'font-bold text-neu-900'}>
        {match}
      </span>
      {after}
    </>
  );
}

export function RecentSearchesDropdown({
  isOpen,
  onSelect,
  onClose,
  variant = 'dark',
  className = '',
  searchQuery = '',
}: RecentSearchesDropdownProps) {
  const { recentSearches, removeSearch, clearSearches } = useRecentSearches();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Menutup saat tombol Escape ditekan
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const normalizedQuery = (searchQuery || '').trim().toLowerCase();

  // Filter & Urutkan riwayat:
  // 1. Jika kolom kosong: tampilkan seluruh recent searches (max 5)
  // 2. Jika ada ketikan (misal 'bal'): hanya tampilkan yang cocok, dengan yang berawalan 'bal' (misal 'bali') di paling atas
  const displayedSearches = useMemo(() => {
    if (!normalizedQuery) {
      return recentSearches;
    }

    const matches = recentSearches.filter((item) =>
      item.toLowerCase().includes(normalizedQuery)
    );

    return matches.sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(normalizedQuery);
      const bStarts = b.toLowerCase().startsWith(normalizedQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }, [recentSearches, normalizedQuery]);

  // Jika sedang tertutup atau tidak ada riwayat yang cocok, tidak merender apapun
  if (!isOpen || displayedSearches.length === 0) {
    return null;
  }

  const isDark = variant === 'dark';

  return (
    <div
      ref={dropdownRef}
      // onMouseDown preventDefault agar input pencarian tidak kehilangan focus sebelum onClick baris tereksekusi
      onMouseDown={(e) => e.preventDefault()}
      className={`absolute left-0 w-full z-50 p-2.5 sm:px-3.5 sm:py-2.5 rounded-[20px] transition-all duration-200 animate-in fade-in slide-in-from-top-1 ${
        isDark
          ? 'bg-pr-900 border border-white/10 shadow-2xl backdrop-blur-xl'
          : 'bg-white border border-neu-100 shadow-xl'
      } ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-1.5 mb-1 px-1">
        <span
          className={`text-[11px] sm:text-[12px] font-medium tracking-wider uppercase select-none ${
            isDark ? 'text-neu-500' : 'text-neu-400'
          }`}
        >
          Pencarian Terakhir
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            clearSearches();
            onClose();
          }}
          className={`text-[11px] sm:text-[12px] font-medium transition-colors cursor-pointer select-none ${
            isDark
              ? 'text-white hover:text-sec-800'
              : 'text-neu-500 hover:text-danger-600'
          }`}
        >
          Hapus Semua
        </button>
      </div>

      {/* List Rows */}
      <div className="flex flex-col gap-1 w-full">
        {displayedSearches.map((query) => (
          <div
            key={query}
            onClick={() => {
              onSelect(query);
              onClose();
            }}
            className={`flex items-center justify-between w-full px-2.5 py-2 rounded-xl transition-colors cursor-pointer group select-none ${
              isDark
                ? 'hover:bg-white/10 text-neu-200 hover:text-white'
                : 'hover:bg-neu-50 text-neu-700 hover:text-neu-900'
            }`}
          >
            {/* Sisi Kiri: Ikon History + Kata Kunci (dengan highlight) */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 mr-2 text-left">
              <History
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isDark
                    ? 'text-neu-400 group-hover:text-white'
                    : 'text-neu-400 group-hover:text-neu-700'
                }`}
              />
              <span className="text-[12px] sm:text-[13px] font-normal truncate">
                {renderHighlightedText(query, normalizedQuery, isDark)}
              </span>
            </div>

            {/* Sisi Kanan: Tombol Hapus per Item (×) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSearch(query);
              }}
              title="Hapus dari riwayat"
              className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                isDark
                  ? 'text-neu-400 hover:text-danger-500 hover:bg-white/10'
                  : 'text-neu-400 hover:text-danger-600 hover:bg-neu-200/60'
              }`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSearchesDropdown;

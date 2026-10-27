import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { RecentSearchesDropdown } from './RecentSearchesDropdown';

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent, customValue?: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Ukuran input: 'default' untuk hero search, 'compact' untuk panel sempit seperti daftar isi */
  size?: 'default' | 'compact';
  /** Opsi untuk mengaktifkan dropdown recent searches (default: true jika size !== 'compact') */
  enableRecentSearches?: boolean;
  /** Callback saat memilih item riwayat langsung */
  onSelectRecent?: (query: string) => void;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Cari peraturan yang ada di Indonesia...',
  className = '',
  inputClassName = '',
  size = 'default',
  enableRecentSearches,
  onSelectRecent,
}: SearchInputProps) {
  const { addSearch } = useRecentSearches();
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);
  const isCompact = size === 'compact';
  const shouldEnableRecent = enableRecentSearches ?? !isCompact;

  useEffect(() => {
    if (!shouldEnableRecent) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsRecentOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shouldEnableRecent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      addSearch(value.trim());
    }
    setIsRecentOpen(false);
    if (onSubmit) {
      onSubmit(e, value);
    }
  };

  const handleSelectRecent = (query: string) => {
    setIsRecentOpen(false);
    addSearch(query);
    if (onSelectRecent) {
      onSelectRecent(query);
    } else {
      onChange({ target: { value: query } } as React.ChangeEvent<HTMLInputElement>);
      if (onSubmit) {
        onSubmit({ preventDefault: () => {} } as React.FormEvent, query);
      }
    }
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className={`relative w-full ${isCompact ? '' : 'flex-1'} ${className}`}
    >
      <div className="relative flex items-center">
        <Search
          className={`absolute text-gray-400 pointer-events-none ${
            isCompact ? 'w-3.5 h-3.5 left-2.5' : 'w-4 h-4 sm:w-5 sm:h-5 left-4 sm:left-5'
          }`}
        />
        <input
          type="text"
          value={value}
          onFocus={() => {
            if (shouldEnableRecent) {
              setIsRecentOpen(true);
            }
          }}
          onClick={() => {
            if (shouldEnableRecent) {
              setIsRecentOpen(true);
            }
          }}
          onChange={(e) => {
            onChange(e);
            if (shouldEnableRecent && !e.target.value.trim()) {
              setIsRecentOpen(true);
            }
          }}
          placeholder={placeholder}
          className={`w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-all ${
            isCompact
              ? 'rounded-lg py-1.5 pl-8 pr-8 text-[11px] focus:ring-1 focus:ring-gray-100'
              : 'rounded-full py-3.5 pl-11 sm:pl-12 pr-10 sm:pr-12 text-xs sm:text-sm focus:ring-2 focus:ring-gray-100 shadow-2xs'
          } ${inputClassName}`}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={() => {
              onClear();
              if (shouldEnableRecent) {
                setIsRecentOpen(true);
              }
            }}
            className={`absolute rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer ${
              isCompact ? 'right-2 p-0.5' : 'right-4 sm:right-5 p-1'
            }`}
            title="Hapus pencarian"
          >
            <X className={isCompact ? 'w-3 h-3' : 'w-4 h-4'} />
          </button>
        )}
      </div>

      {shouldEnableRecent && (
        <RecentSearchesDropdown
          isOpen={isRecentOpen}
          onClose={() => setIsRecentOpen(false)}
          onSelect={handleSelectRecent}
          variant="light"
          searchQuery={value}
          className="top-[calc(100%+8px)]"
        />
      )}
    </form>
  );
}

export default SearchInput;

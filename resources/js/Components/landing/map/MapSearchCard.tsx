import React, { useState } from 'react';
import { Earth, Search, Building2 } from 'lucide-react';
import { ProvinceDetail } from '../indonesiaMapData';

export interface WilayahSearchResult {
  key: string;
  category: 'provinsi' | 'kabupaten' | 'kota';
  name: string;
  label: string;
  provinceId: string;
  provinceName: string;
  total: number;
}

export interface MapSearchCardProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredProvinces?: ProvinceDetail[];
  searchResults?: WilayahSearchResult[];
  onSelectProvince: (provinceId: string) => void;
  onSelectRegency?: (regencyName: string, provinceId: string) => void;
  onSubmitSearch?: (query: string) => void;
  className?: string;
  inputOnly?: boolean;
}

export function MapSearchCard({
  searchQuery,
  onSearchChange,
  filteredProvinces = [],
  searchResults,
  onSelectProvince,
  onSelectRegency,
  onSubmitSearch,
  className = '',
  inputOnly = false,
}: MapSearchCardProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Jika searchResults disediakan gunakan itu, jika tidak fallback ke filteredProvinces
  const items: WilayahSearchResult[] = searchResults ?? filteredProvinces.map((prov) => ({
    key: `prov-${prov.id}`,
    category: 'provinsi',
    name: prov.name,
    label: 'Provinsi',
    provinceId: prov.id,
    provinceName: prov.name,
    total: prov.total ?? 0,
  }));

  const handleSelect = (item: WilayahSearchResult) => {
    setIsSearchFocused(false);
    if (item.category === 'provinsi') {
      onSelectProvince(item.provinceId);
    } else if (onSelectRegency) {
      onSelectRegency(item.name, item.provinceId);
    } else {
      onSelectProvince(item.provinceId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (items.length > 0) {
        handleSelect(items[0]);
      } else if (onSubmitSearch && searchQuery.trim()) {
        setIsSearchFocused(false);
        onSubmitSearch(searchQuery.trim());
      }
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
    }
  };

  const searchInput = (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-neu-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        onKeyDown={handleKeyDown}
        placeholder="Cari provinsi/kabupaten/kota"
        className={`w-full pl-10 sm:pl-11 pr-4 py-2 sm:py-2.5 bg-white border border-neu-100 ${
          inputOnly
            ? 'rounded-full shadow-2xs hover:border-neu-300 focus:ring-2 focus:ring-neu-100 focus:border-neu-400'
            : 'rounded-lg sm:rounded-xl focus:ring-1 focus:ring-pr-900 focus:border-pr-900'
        } text-xs sm:text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none transition-all`}
      />

      {/* Dropdown Pencarian Otomatis (Mendukung Provinsi & Kabupaten/Kota) */}
      {isSearchFocused && searchQuery.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neu-200 rounded-xl shadow-lg max-h-64 overflow-y-auto custom-scrollbar z-50 py-1">
          {items.length > 0 ? (
            items.map((item) => (
              <button
                key={item.key}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault(); // Mencegah onBlur sebelum click dieksekusi
                  handleSelect(item);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-neu-50 text-xs sm:text-sm text-neu-800 flex items-center justify-between transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded-md bg-neu-100/70 border border-neu-200/60 flex items-center justify-center shrink-0 text-neu-600 group-hover:text-pr-900 group-hover:bg-pr-50 transition-colors">
                    {item.category === 'provinsi' ? (
                      <Earth className="w-3.5 h-3.5" />
                    ) : (
                      <Building2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-neu-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neu-400 truncate">
                      {item.label}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-neu-500 bg-neu-100/80 px-2 py-0.5 rounded-full tabular-nums shrink-0">
                  {item.total.toLocaleString('id-ID')}
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-3 text-xs text-neu-500 text-center">
              Wilayah tidak ditemukan
              {onSubmitSearch && searchQuery.trim() && (
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsSearchFocused(false);
                    onSubmitSearch(searchQuery.trim());
                  }}
                  className="block mx-auto mt-1.5 text-pr-900 hover:underline font-medium cursor-pointer"
                >
                  Cari peraturan &quot;{searchQuery.trim()}&quot; &rarr;
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (inputOnly) {
    return <div className={`w-full ${className}`}>{searchInput}</div>;
  }

  return (
    <div
      className={`w-full bg-white rounded-[16px] sm:rounded-[20px] border border-neu-100 sm:border-neu-50 p-3.5 sm:p-4 shrink-0 shadow-sm sm:shadow-none ${className}`}
    >
      {/* Header: Pilih Provinsi & Kabupaten + Icon Earth */}
      <div className="flex items-center justify-between pb-2 sm:pb-2.5">
        <h3 className="font-medium text-neu-900 text-xs sm:text-[14px]">
          Pilih Provinsi & Kabupaten
        </h3>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-neu-700 bg-white">
          <Earth className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
        </div>
      </div>

      {searchInput}
    </div>
  );
}

export default MapSearchCard;

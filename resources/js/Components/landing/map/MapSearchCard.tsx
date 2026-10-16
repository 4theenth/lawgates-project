import React, { useState } from 'react';
import { Earth, Search } from 'lucide-react';
import { ProvinceDetail } from '../indonesiaMapData';

export interface MapSearchCardProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredProvinces: ProvinceDetail[];
  onSelectProvince: (provinceId: string) => void;
  className?: string;
  inputOnly?: boolean;
}

export function MapSearchCard({
  searchQuery,
  onSearchChange,
  filteredProvinces,
  onSelectProvince,
  className = '',
  inputOnly = false,
}: MapSearchCardProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
        placeholder="Cari provinsi/kabupaten/kota"
        className={`w-full pl-10 sm:pl-11 pr-4 py-2 sm:py-2.5 bg-white ${
          inputOnly ? 'rounded-full border border-neu-50 shadow-2xs hover:border-neu-100 focus:ring-2 focus:ring-neu-100 focus:border-neu-400' : 'rounded-lg sm:rounded-xl border border-neu-50 focus:ring-1 focus:ring-pr-900 focus:border-pr-900'
        } text-xs sm:text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none transition-all`}
      />

      {/* Dropdown Pencarian Otomatis */}
      {isSearchFocused && searchQuery.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neu-200 rounded-xl shadow-lg max-h-56 overflow-y-auto custom-thin-scrollbar z-30 py-1">
          {filteredProvinces.length > 0 ? (
            filteredProvinces.map((prov) => (
              <button
                key={prov.id}
                type="button"
                onMouseDown={() => {
                  onSelectProvince(prov.id);
                  setIsSearchFocused(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-neu-50 text-xs sm:text-sm text-neu-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="font-medium">{prov.name}</span>
                <span className="text-[11px] text-neu-500 font-semibold">
                  {prov.total.toLocaleString('id-ID')}
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-neu-500 text-center">
              Wilayah tidak ditemukan
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

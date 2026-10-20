import React, { useState, useMemo } from 'react';
import { Search, Check, X } from 'lucide-react';

export interface FlatLocationPickerProps {
  selectedLokasi: string[];
  onToggleLokasi: (lokasi: string) => void;
  onRemoveLokasi: (lokasi: string) => void;
  allFlatLokasi: string[];
  variant?: 'light' | 'dark';
}

export const FlatLocationPicker: React.FC<FlatLocationPickerProps> = ({
  selectedLokasi,
  onToggleLokasi,
  onRemoveLokasi,
  allFlatLokasi,
  variant = 'light',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlatLokasi = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allFlatLokasi;
    return allFlatLokasi.filter((item) => item.toLowerCase().includes(q));
  }, [allFlatLokasi, searchQuery]);

  const isLight = variant === 'light';

  return (
    <div
      className={`mt-1.5 mb-2 ${
        isLight
          ? 'ml-6 pr-1 pl-3 border-l-2 border-gray-100'
          : 'ml-7 pr-1 pl-2 border-l border-white/20'
      }`}
    >
      {/* Search Input */}
      <div className="relative mb-2">
        <Search
          className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${
            isLight ? 'text-gray-400' : 'text-neu-400'
          }`}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Cari provinsi / kabupaten..."
          className={`w-full pl-8 pr-2.5 py-1.5 rounded-lg text-xs outline-none transition-all ${
            isLight
              ? 'bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-pr-900 focus:border-pr-900'
              : 'bg-white/5 border border-white/10 text-white placeholder:text-neu-400 focus:border-white/20'
          }`}
        />
      </div>

      {/* Tag pills daerah yang dipilih */}
      {selectedLokasi.length > 0 && (
        <div
          className={`flex flex-wrap gap-1.5 mb-2 p-1.5 rounded-lg max-h-24 overflow-y-auto no-scrollbar ${
            isLight ? 'bg-gray-50 border border-gray-200' : 'bg-white/5 border border-white/10'
          }`}
        >
          {selectedLokasi.map((lokasi) => (
            <span
              key={lokasi}
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] rounded-md transition-colors ${
                isLight
                  ? 'bg-pr-100 text-pr-900 font-medium'
                  : 'bg-white/10 hover:bg-white/15 text-white'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveLokasi(lokasi);
                }}
                className={`cursor-pointer transition-colors ${
                  isLight ? 'text-pr-700 hover:text-pr-900' : 'text-neu-400 hover:text-white'
                }`}
                title="Hapus daerah"
              >
                <X className="w-3 h-3" />
              </button>
              <span>{lokasi}</span>
            </span>
          ))}
        </div>
      )}

      {/* Flat List Daerah */}
      <div className="max-h-52 overflow-y-auto no-scrollbar space-y-0.5">
        {filteredFlatLokasi.length === 0 ? (
          <div
            className={`text-center py-2.5 text-xs ${
              isLight ? 'text-gray-400' : 'text-neu-400 text-[10px]'
            }`}
          >
            Daerah tidak ditemukan
          </div>
        ) : (
          filteredFlatLokasi.map((item) => {
            const isChecked = selectedLokasi.includes(item);
            return (
              <div
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  onToggleLokasi(item);
                }}
                className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  isChecked
                    ? isLight
                      ? 'bg-pr-50 text-pr-900 font-semibold'
                      : 'bg-white/5 text-white font-medium'
                    : isLight
                    ? 'text-gray-700 hover:bg-gray-50'
                    : 'text-neu-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xs leading-[1.3] truncate select-none flex-1">
                  {item}
                </span>
                {isChecked && (
                  <Check
                    className={`w-3.5 h-3.5 stroke-[2.5] shrink-0 ${
                      isLight ? 'text-pr-900' : 'text-white'
                    }`}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

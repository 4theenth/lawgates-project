import React, { useState, useMemo } from 'react';
import { MoveLeft, Search, Building2, Eye } from 'lucide-react';
import { ProvinceRegencyData, RegencyItem } from './types';

export interface MapKabupatenFullListCardProps {
  provinceData: ProvinceRegencyData;
  onBack: () => void;
  onSelectRegency: (regency: RegencyItem) => void;
}

export function MapKabupatenFullListCard({
  provinceData,
  onBack,
  onSelectRegency,
}: MapKabupatenFullListCardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter kabupaten/kota berdasarkan input pencarian lokal
  const filteredRegencies = useMemo(() => {
    if (!searchQuery.trim()) {
      return provinceData.regencies;
    }
    const q = searchQuery.toLowerCase().trim();
    return provinceData.regencies.filter(
      (r) => r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)
    );
  }, [provinceData.regencies, searchQuery]);

  return (
    <div className="w-full bg-white rounded-[16px] sm:rounded-[20px] border border-neu-100 sm:border-neu-50 p-3.5 sm:p-4 flex flex-col h-full max-h-[536px] shadow-sm sm:shadow-none animate-in fade-in duration-150">
      {/* 1. Header: Tombol Kembali Sesuai Figma node #2595:56765 */}
      <div className="pb-1 border-b border-neu-50/60">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-neu-500 hover:text-neu-900 transition-colors cursor-pointer group mb-2.5 py-0.5"
          title="Kembali ke ringkasan provinsi"
        >
          <MoveLeft className="w-4 h-4 text-neu-500 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-medium">Kembali</span>
        </button>

        <h3 className="font-medium text-neu-900 text-xs sm:text-[14px]">
          Daftar Kabupaten/Kota
        </h3>
        <p className="text-neu-600 text-[11px] sm:text-xs mt-0.5">
          {provinceData.kabupatenCount} kabupaten dan {provinceData.kotaCount} kota di Provinsi {provinceData.provinceName}.
        </p>

        {/* 2. Input Search Kabupaten/Kota (Figma node #2595:56688) */}
        <div className="relative mt-2.5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neu-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kabupaten/kota"
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-neu-100 rounded-full text-xs text-neu-900 placeholder:text-neu-400 focus:outline-none focus:ring-1 focus:ring-pr-900 focus:border-pr-900 transition-all"
          />
        </div>
      </div>

      {/* 3. Scrollable List Seluruh Kabupaten/Kota dengan Custom Neu Scrollbar Tipis */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 mt-3 pr-1.5 custom-neu-scrollbar">
        {filteredRegencies.length > 0 ? (
          filteredRegencies.map((item) => (
            <div
              key={item.id}
              className="w-full bg-[#F8F9FA] border border-neu-50 rounded-[14px] p-2.5 sm:p-3 flex items-center justify-between gap-3 hover:border-neu-200 transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* White Icon Box */}
                <div className="w-8 h-8 rounded-[10px] bg-white border border-neu-50 flex items-center justify-center text-neu-700 shrink-0">
                  <Building2 className="w-4 h-4 text-neu-700" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm text-neu-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-neu-600 truncate">
                    {item.type}
                  </p>
                </div>
              </div>

              {/* Tombol Lihat Pill */}
              <button
                type="button"
                onClick={() => onSelectRegency(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pr-50 hover:bg-pr-100 text-pr-900 text-[10px] sm:text-xs font-medium transition-colors shrink-0 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-pr-900" />
                <span>Lihat</span>
              </button>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-xs text-neu-400">
            Kabupaten/kota tidak ditemukan
          </div>
        )}
      </div>
    </div>
  );
}

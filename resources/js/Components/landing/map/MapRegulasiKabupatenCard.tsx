import React, { useState, useMemo } from 'react';
import { Search, Building2, Eye } from 'lucide-react';
import { ProvinceRegencyData, RegencyItem } from './types';

interface MapRegulasiKabupatenCardProps {
  provinceData: ProvinceRegencyData | null;
  onSelectRegency: (regency: RegencyItem) => void;
}

export function MapRegulasiKabupatenCard({
  provinceData,
  onSelectRegency,
}: MapRegulasiKabupatenCardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter kabupaten/kota berdasarkan input pencarian
  const filteredRegencies = useMemo(() => {
    if (!provinceData) return [];
    if (!searchQuery.trim()) return provinceData.regencies;
    const q = searchQuery.toLowerCase().trim();
    return provinceData.regencies.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
    );
  }, [provinceData, searchQuery]);

  if (!provinceData) {
    return (
      <div className="w-full bg-white rounded-[20px] border border-neu-50 p-8 flex flex-col items-center justify-center text-center min-h-[420px]">
        <div className="w-14 h-14 rounded-[16px] bg-neu-50 border border-neu-100 flex items-center justify-center text-neu-400 mb-3">
          <Building2 className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h4 className="font-semibold text-[15px] text-neu-900 mb-1">
          Daftar Kabupaten/Kota
        </h4>
        <p className="text-[12px] text-neu-500 max-w-xs leading-relaxed">
          Pilih provinsi pada peta untuk melihat seluruh daftar kabupaten dan kota di wilayah tersebut.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[20px] border border-neu-50 p-6 sm:p-7 flex flex-col gap-5 ">
      {/* ── 1. Header Card Sesuai Figma node #2642:59158 ── */}
      <div>
        <h3 className="text-[17px] sm:text-[18px] font-semibold text-neu-900 tracking-tight">
          Daftar Kabupaten/Kota
        </h3>
        <p className="text-[12px] text-neu-500 mt-0.5">
          {provinceData.kabupatenCount} kabupaten dan {provinceData.kotaCount} kota di Provinsi {provinceData.provinceName}.
        </p>
      </div>

      {/* ── 2. Input Search Kabupaten Sesuai Figma node #2642:59161 ── */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neu-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kabupaten"
          className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-neu-100 text-[12px] sm:text-[13px] text-neu-900 placeholder:text-neu-400 hover:border-neu-300 focus:outline-none focus:ring-2 focus:ring-neu-100 focus:border-neu-400 transition-all shadow-2xs"
        />
      </div>

      {/* ── 3. Tiga Box Ringkasan Wilayah (Kabupaten, Kota, Total) Sesuai Figma node #2642:59165 ── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-[14px] bg-bg-900 border border-neu-50 flex flex-col gap-[8px]">
          <span className="text-[11px] sm:text-[12px] text-neu-500">Kabupaten</span>
          <span className="text-[16px] sm:text-[18px] font-bold text-neu-900 tabular-nums">
            {provinceData.kabupatenCount}
          </span>
        </div>
        <div className="p-3.5 rounded-[14px] bg-bg-900 border border-neu-50 flex flex-col gap-[8px]">
          <span className="text-[11px] sm:text-[12px] text-neu-500">Kota</span>
          <span className="text-[16px] sm:text-[18px] font-bold text-neu-900 tabular-nums">
            {provinceData.kotaCount}
          </span>
        </div>
        <div className="p-3.5 rounded-[14px] bg-bg-900 border border-neu-50 flex flex-col gap-[8px]">
          <span className="text-[11px] sm:text-[12px] text-neu-500">Total</span>
          <span className="text-[16px] sm:text-[18px] font-bold text-neu-900 tabular-nums">
            {provinceData.totalCount}
          </span>
        </div>
      </div>

      {/* ── 4. List Kabupaten/Kota Scrollable Sesuai Figma node #2642:59175 ── */}
      <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto no-scrollbar">
        {filteredRegencies.length > 0 ? (
          filteredRegencies.map((regency) => (
            <div
              key={regency.id}
              className="flex items-center justify-between p-3 rounded-[12px] bg-bg-900  border border-neu-50 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white border border-neu-100 flex items-center justify-center text-neu-500 shrink-0 shadow-2xs group-hover:text-neu-900 transition-colors">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-medium text-neu-900 truncate">
                    {regency.name}
                  </span>
                  <span className="text-[10px] text-neu-500">
                    {regency.type}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectRegency(regency)}
                className="flex items-center gap-1.5 px-3 py-1 bg-pr-50  text-pr-900  rounded-full text-[11px] font-medium transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Eye className="w-3.5 h-3.5 text-pr-900" />
                <span>Lihat</span>
              </button>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-[12px] text-neu-400">
            Tidak ada kabupaten atau kota dengan nama "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { Building2, Eye, ChevronRight } from 'lucide-react';
import { ProvinceRegencyData, RegencyItem } from './types';

export interface MapKabupatenPreviewCardProps {
  provinceData: ProvinceRegencyData | null;
  onViewAll: () => void;
  onSelectRegency: (regency: RegencyItem) => void;
}

export function MapKabupatenPreviewCard({
  provinceData,
  onViewAll,
  onSelectRegency,
}: MapKabupatenPreviewCardProps) {
  // Tampilkan 1 item cuplikan/preview agar tidak terpotong dan tinggi frame sejajar presisi
  const previewItems = provinceData ? provinceData.regencies.slice(0, 1) : [];

  return (
    <div className="w-full bg-white rounded-[16px] sm:rounded-[20px] border border-neu-100 sm:border-neu-50 p-3.5 sm:p-4 flex flex-col gap-3 shadow-sm sm:shadow-none animate-in fade-in duration-200">
      {/* 1. Header: Judul & Subtitle */}
      <div>
        <h3 className="font-medium text-neu-900 text-xs sm:text-[14px]">
          Daftar Kabupaten/Kota
        </h3>
        <p className="text-neu-600 text-[11px] sm:text-sm mt-0.5">
          {provinceData
            ? `${provinceData.kabupatenCount} kabupaten dan ${provinceData.kotaCount} kota di Provinsi ${provinceData.provinceName}.`
            : 'Pilih provinsi untuk melihat daftar kabupaten dan kota.'}
        </p>
      </div>

      {/* 2. Ringkasan 3 Angka: Kabupaten, Kota, Total (Figma node #2622:43818) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {/* Kabupaten */}
        <div className="bg-bg-900 border border-neu-50 rounded-[14px] p-2.5 flex flex-col justify-center gap-[4px]">
          <span className="text-neu-600 text-[10px] sm:text-[12px] font-normal truncate ">
            Kabupaten
          </span>
          <span className="text-neu-900 text-xs sm:text-md font-medium mt-0.5">
            {provinceData ? provinceData.kabupatenCount : 0}
          </span>
        </div>

        {/* Kota */}
        <div className="bg-bg-900 border border-neu-50 rounded-[14px] p-2.5 flex flex-col justify-center gap-[4px]">
          <span className="text-neu-600 text-[10px] sm:text-[12px] font-normal truncate ">
            Kota
          </span>
          <span className="text-neu-900 text-xs sm:text-md font-medium mt-0.5">
            {provinceData ? provinceData.kotaCount : 0}
          </span>
        </div>

        {/* Total */}
        <div className="bg-bg-900 border border-neu-50 rounded-[14px] p-2.5 flex flex-col justify-center gap-[4px]">
          <span className="text-neu-600 text-[10px] sm:text-[12px] font-normal truncate ">
            Total
          </span>
          <span className="text-neu-900 text-xs sm:text-md font-medium mt-0.5">
            {provinceData ? provinceData.totalCount : 0}
          </span>
        </div>
      </div>

      {/* 3. Link Aksi: Lihat kabupaten lainya */}
      {provinceData ? (
        <button
          type="button"
          onClick={onViewAll}
          className="w-full flex items-center justify-between text-xs text-neu-600 hover:text-pr-900 font-normal transition-colors py-0.5 cursor-pointer"
        >
          <span className="text-sm">Lihat kabupaten lainya</span>
          <ChevronRight className="w-4 h-4 text-neu-500" />
        </button>
      ) : (
        <div className="w-full flex items-center justify-between text-sm text-neu-400 font-normal py-0.5">
          <span className="text-sm">Lihat kabupaten lainya</span>
          <ChevronRight className="w-4 h-4 text-neu-300" />
        </div>
      )}

      {/* 4. Preview 2 List Item Kabupaten/Kota (Figma node #2622:43828 & #2622:43837) */}
      <div className="space-y-2">
        {provinceData && previewItems.length > 0 ? (
          previewItems.map((item) => (
            <div
              key={item.id}
              className="w-full bg-bg-900 border border-neu-50 rounded-[14px] p-2.5 sm:p-3 flex items-center justify-between gap-3  transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* White Icon Box */}
                <div className="w-8 h-8 rounded-[10px] bg-white border border-neu-50 flex items-center justify-center text-neu-700 shrink-0">
                  <Building2 className="w-4 h-4 text-pr-900" />
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pr-50  text-pr-900 text-[10px] sm:text-xs font-medium transition-colors shrink-0 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-pr-900" />
                <span>Lihat</span>
              </button>
            </div>
          ))
        ) : (
          [1].map((idx) => (
            <div
              key={idx}
              className="w-full bg-bg-900 border border-neu-50 rounded-[14px] p-2.5 sm:p-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-[10px] bg-white/70 border border-neu-50 flex items-center justify-center text-neu-300 shrink-0">
                  <Building2 className="w-4 h-4 text-neu-300" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm text-neu-400 truncate">
                    Kabupaten / Kota
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-neu-300 truncate">
                    Wilayah
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neu-100 text-neu-400 text-[10px] sm:text-xs font-medium shrink-0">
                <Eye className="w-3.5 h-3.5 text-neu-400" />
                <span>Lihat</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

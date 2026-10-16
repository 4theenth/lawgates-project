import React from 'react';
import { Scale, ChevronRight } from 'lucide-react';
import { ProvinceDetail } from '../indonesiaMapData';

export interface MapProvinceDetailCardProps {
  activeProvince: ProvinceDetail;
  totalKabupatenKota: number;
  onNavigateAllRegulations: (provinceName: string) => void;
  className?: string;
}

export function MapProvinceDetailCard({
  activeProvince,
  totalKabupatenKota,
  onNavigateAllRegulations,
  className = '',
}: MapProvinceDetailCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-[16px] sm:rounded-[20px] border border-neu-100 sm:border-neu-50 p-3.5 sm:p-4 flex flex-col gap-3 shrink-0 shadow-sm sm:shadow-none animate-in fade-in duration-200 ${className}`}
    >
      {/* Header Row: Icon Timbangan + Nama Provinsi + Jumlah Peraturan + Badge Kabupaten */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-[42px] h-[42px] sm:w-[45px] sm:h-[45px] rounded-[10px] bg-pr-50 flex items-center justify-center text-pr-900 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-xs sm:text-sm text-neu-900 uppercase truncate">
              {activeProvince.name}
            </h4>
            <p className="text-[11px] sm:text-sm text-neu-600 truncate">
              {activeProvince.total.toLocaleString('id-ID')} peraturan
            </p>
          </div>
        </div>

        {/* Badge Kabupaten/Kota */}
        <div className="px-2.5 py-1 rounded-[12px] bg-bg-900 border border-neu-50 text-[11px] font-medium text-pr-900 shrink-0 whitespace-nowrap">
          {totalKabupatenKota} kabupaten/kota
        </div>
      </div>

      {/* Link Lihat Semua Peraturan */}
      <button
        type="button"
        onClick={() => onNavigateAllRegulations(activeProvince.name)}
        className="w-full flex items-center justify-between text-sm text-neu-600 hover:text-pr-900 font-normal transition-colors py-1 cursor-pointer"
      >
        <span>Lihat semua peraturan</span>
        <ChevronRight className="w-4 h-4 text-neu-500" />
      </button>

      {/* 3 Stat Boxes: Total, Berlaku, Tidak Berlaku (Figma node #2622:43798) */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {/* Total */}
        <div className="bg-bg-900 border border-neu-50 rounded-[12px] p-2 sm:p-2.5 flex flex-col justify-center gap-[4px] ">
          <span className="text-neu-700 text-[10px] sm:text-[12px] font-normal truncate">
            Total peraturan
          </span>
          <span className="text-pr-900 text-xs sm:text-md font-semibold mt-0.5">
            {activeProvince.total.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Berlaku */}
        <div className="bg-bg-900 border border-neu-50 rounded-[12px] p-2 sm:p-2.5 flex flex-col justify-center gap-[4px]">
          <span className="text-neu-700 text-[10px] sm:text-[12px] font-normal truncate">
            Berlaku
          </span>
          <span className="text-suc-900 text-xs sm:text-md font-semibold mt-0.5">
            {activeProvince.berlaku.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Tidak Berlaku */}
        <div className="bg-bg-900 border border-neu-50 rounded-[12px] p-2 sm:p-2.5 flex flex-col justify-center gap-[4px] ">
          <span className="text-neu-700 text-[10px] sm:text-[12px] font-normal truncate">
            Tidak berlaku
          </span>
          <span className="text-dan-900 text-xs sm:text-md font-semibold mt-0.5">
            {activeProvince.tidakBerlaku.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MapProvinceDetailCard;

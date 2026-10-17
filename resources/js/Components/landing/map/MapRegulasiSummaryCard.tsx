import React from 'react';
import { Scale, ChevronRight } from 'lucide-react';
import { ProvinceDetail } from '../indonesiaMapData';
import { ProvinceRegencyData } from './types';
import { SearchResultCard, GenericRegulationItem } from '@/Components/search/SearchResultCard';

interface MapRegulasiSummaryCardProps {
  activeProvince: ProvinceDetail | null;
  provinceData: ProvinceRegencyData | null;
  onNavigateAllRegulations: (provinceName: string) => void;
}

export function MapRegulasiSummaryCard({
  activeProvince,
  provinceData,
  onNavigateAllRegulations,
}: MapRegulasiSummaryCardProps) {
  if (!activeProvince) {
    return (
      <div className="w-full bg-white rounded-[20px] border border-neu-50 p-8 flex flex-col items-center justify-center text-center  min-h-[420px]">
        <div className="w-14 h-14 rounded-[16px] bg-neu-50 border border-neu-100 flex items-center justify-center text-neu-400 mb-3">
          <Scale className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h4 className="font-semibold text-[15px] text-neu-900 mb-1">
          Ringkasan Provinsi Belum Dipilih
        </h4>
        <p className="text-[12px] text-neu-500 max-w-sm leading-relaxed">
          Silakan klik salah satu provinsi pada peta di atas untuk melihat ringkasan jumlah peraturan dan status hukum yang berlaku.
        </p>
      </div>
    );
  }

  // Agregasi angka
  const total = activeProvince.total > 0 ? activeProvince.total : 3090;
  const berlaku = activeProvince.berlaku > 0 ? activeProvince.berlaku : 2090;
  const tidakBerlaku = activeProvince.tidakBerlaku > 0 ? activeProvince.tidakBerlaku : 1000;
  const totalKabKot = provinceData?.totalCount || (activeProvince.id === 'bali' ? 9 : 0);

  // Persentase status untuk visual progress bar
  const totalBar = berlaku + tidakBerlaku;
  const berlakuPercent = totalBar > 0 ? Math.round((berlaku / totalBar) * 100) : 67;
  const tidakBerlakuPercent = totalBar > 0 ? 100 - berlakuPercent : 33;

  // Format contoh kartu peraturan yang diambil dari data sampel provinsi atau default fallback
  const samplePerda = (activeProvince as any).samplePerda;
  const sampleRegulationItem: GenericRegulationItem = samplePerda
    ? {
        id: samplePerda.unique_id || 'sample-1',
        unique_id: samplePerda.unique_id,
        judul: samplePerda.tentang || samplePerda.nomor,
        tahun: activeProvince.name,
        instansi: `Pemerintah Daerah ${activeProvince.name}`,
        jenis_peraturan: { id: 7, nama: 'Peraturan Daerah' },
        status_peraturan: {
          id: samplePerda.status === 'Berlaku' ? 1 : 2,
          nama_status: samplePerda.status || 'Berlaku',
        },
      }
    : {
        id: `perda-${activeProvince.id}`,
        judul: `Peraturan Daerah Provinsi ${activeProvince.name} Nomor 1 Tahun 2024 tentang Rencana Pembangunan Daerah`,
        tahun: 2024,
        instansi: `Pemerintah Provinsi ${activeProvince.name}`,
        pemrakarsa: `DPRD Provinsi ${activeProvince.name}`,
        jenis_peraturan: { id: 7, nama: 'Peraturan Daerah' },
        status_peraturan: { id: 1, nama_status: 'Berlaku' },
      };

  return (
    <div className="w-full bg-white rounded-[20px] border border-neu-50 p-6 sm:p-7 flex flex-col gap-5 ">
      {/* ── 1. Header Card Sesuai Figma node #2628:58938 ── */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[17px] sm:text-[18px] font-semibold text-neu-900 tracking-tight">
            Ringkasan Provinsi
          </h3>
          <p className="text-[12px] text-neu-500 mt-0.5">
            Provinsi <span className="font-medium text-neu-800">{activeProvince.name}</span> dipilih sebagai kondisi aktif.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-bg-900 rounded-full border border-neu-50 text-[11px] sm:text-[12px] font-medium text-neu-800 shrink-0">
          <Scale className="w-3.5 h-3.5 text-neu-700" />
          <span>Provinsi dipilih</span>
        </div>
      </div>

      {/* ── 2. Box Hero Provinsi (Scale Icon + Nama + Subtitle + Badge Kab/Kota) ── */}
      <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-[14px] bg-bg-900 border border-neu-50">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] rounded-[12px] bg-bg-900 border border-neu-50 flex items-center justify-center text-neu-800  shrink-0">
            <Scale className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="text-[15px] sm:text-[16px] font-semibold text-neu-900 truncate">
              {activeProvince.name}
            </h4>
            <p className="text-[11px] sm:text-[12px] text-neu-500 mt-0.5 truncate">
              {total.toLocaleString('id-ID')} peraturan • {berlaku.toLocaleString('id-ID')} berlaku • {tidakBerlaku.toLocaleString('id-ID')} tidak berlaku
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <span className="px-3 py-1 bg-white rounded-lg border border-neu-100 text-[11px] sm:text-[12px] font-medium text-neu-800 shadow-2xs">
            {totalKabKot} kabupaten/kota
          </span>
        </div>
      </div>

      {/* ── 3. Tiga Box Statistik (Total, Berlaku, Tidak Berlaku) ── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-[14px] bg-bg-900 border border-neu-50 flex flex-col gap-0.5">
          <span className="text-[11px] sm:text-[12px] text-neu-500">Total peraturan</span>
          <span className="text-[16px] sm:text-[18px] font-bold text-neu-900 tabular-nums">
            {total.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="p-3.5 rounded-[14px] bg-bg-900 border border-neu-50 flex flex-col gap-0.5">
          <span className="text-[11px] sm:text-[12px] text-neu-500">Berlaku</span>
          <span className="text-[16px] sm:text-[18px] font-bold text-suc-900 tabular-nums">
            {berlaku.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="p-3.5 rounded-[14px] bg-bg-900 border border-neu-50 flex flex-col gap-0.5">
          <span className="text-[11px] sm:text-[12px] text-neu-500">Tidak berlaku</span>
          <span className="text-[16px] sm:text-[18px] font-bold text-dan-900 tabular-nums">
            {tidakBerlaku.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* ── 4. Visual Progress Bar Status Berlaku & Tidak Berlaku ── */}
      <div className="flex flex-col gap-3 py-1">
        {/* Bar Berlaku */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] sm:text-[12px]">
            <span className="text-neu-600 font-medium">Berlaku</span>
            <span className="font-semibold text-neu-900 tabular-nums">
              {berlaku.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-suc-50 overflow-hidden">
            <div
              className="h-full rounded-full bg-suc-900 transition-all duration-500 ease-out"
              style={{ width: `${berlakuPercent}%` }}
            />
          </div>
        </div>

        {/* Bar Tidak Berlaku */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] sm:text-[12px]">
            <span className="text-neu-600 font-medium">Tidak berlaku</span>
            <span className="font-semibold text-neu-900 tabular-nums">
              {tidakBerlaku.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-dan-50 overflow-hidden">
            <div
              className="h-full rounded-full bg-dan-900 transition-all duration-500 ease-out"
              style={{ width: `${tidakBerlakuPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── 5. Contoh Kartu Peraturan (Memakai SearchResultCard resmi) ── */}
      <div className="w-full pt-1">
        <SearchResultCard item={sampleRegulationItem} />
      </div>

      {/* ── 6. Footer Link: Lihat Semua Peraturan ── */}
      <button
        type="button"
        onClick={() => onNavigateAllRegulations(activeProvince.name)}
        className="flex items-center justify-between pt-2 border-t border-neu-50 text-[12px] sm:text-[13px] font-medium text-neu-600 hover:text-pr-900 transition-colors group cursor-pointer"
      >
        <span className="text-sm text-neu-600">Lihat semua peraturan di {activeProvince.name}</span>
        <ChevronRight className="w-4 h-4 text-neu-400 group-hover:text-pr-900 group-hover:translate-x-0.5 transition-all" />
      </button>
    </div>
  );
}

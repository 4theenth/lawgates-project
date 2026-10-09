import React from 'react';
import {
  Map as MapIcon,
  Search,
  CircleCheckBig,
  CircleX,
  RefreshCw,
  Gavel,
} from 'lucide-react';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { CountUp } from '@/Components/common/CountUp';
import { HeroCompactMap } from '@/Components/landing/HeroCompactMap';

interface HeroStats {
  berlaku: number;
  tidak_berlaku: number;
  diubah: number;
  dicabut: number;
}

interface RegulasiHeroProps {
  stats?: HeroStats;
  onScrollToSearch?: () => void;
}

export function RegulasiHero({
  stats = {
    berlaku: 3769083,
    tidak_berlaku: 129000,
    diubah: 278000,
    dicabut: 12000,
  },
  onScrollToSearch,
}: RegulasiHeroProps) {
  const handleScroll = () => {
    if (onScrollToSearch) {
      onScrollToSearch();
    } else {
      const target = document.getElementById('sistem-hukum-terbaru');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="w-full">
      {/* ── Main Dark Hero Banner (Figma node #2337:56098) ── */}
      <div className="relative w-full bg-pr-900 rounded-[20px] p-6 sm:p-8 lg:p-10 text-white overflow-hidden shadow-lg border border-pr-800">
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sec-900/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* ── Top Half: Information + Leaflet Interactive Map ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 pb-8 border-b border-white/10">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5">
            {/* Tag Badge: Icon map 18x18, stroke only (no color fill) */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[10px] bg-pr-800 border border-white/10 text-xs font-normal text-white shadow-sm">
              <MapIcon className="w-[18px] h-[18px] text-white shrink-0 stroke-[1.5]" />
              <span className="text-[12px] leading-[18px]">Pangkalan Data Hukum Terpadu</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[28px] font-medium leading-[1.3em] tracking-tight text-white max-w-xl">
              Akses seluruh hierarki peraturan perundang-undangan di Indonesia.
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neu-50 leading-[20px] max-w-lg font-normal">
              LawGates mengintegrasikan UUD, Undang-Undang, Perppu, PP, Permen, dan Perda dalam satu titik akses pencarian tanpa harus menelusuri puluhan portal instansi pemerintah yang terpisah.
            </p>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleScroll}
              className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neu-900 hover:bg-neu-100 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4 text-neu-900" />
              <span>Cari Peraturan</span>
            </button>
          </div>

          {/* Right Column: Interactive Leaflet Map (both maps use Leaflet and allow selecting region) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroCompactMap />
          </div>
        </div>

        {/* ── Bottom Half: 4 Metric Stats Cards (Figma node #2358:57196) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 relative z-10">
          {/* Card 1: Berlaku */}
          <div className="flex flex-col gap-1.5 p-3 sm:p-4 rounded-xl bg-pr-800 border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-[12px] font-medium text-neu-200 tracking-wider">
                HUKUM BERLAKU
              </span>
              <CircleCheckBig className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-medium text-white tracking-tight">
              <CountUp end={stats.berlaku} />
            </div>
          </div>

          {/* Card 2: Tidak Berlaku */}
          <div className="flex flex-col gap-1.5 p-3 sm:p-4 rounded-xl bg-pr-800 border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-[12px] font-medium text-neu-200 tracking-wider">
                HUKUM TIDAK BERLAKU
              </span>
              <CircleX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-medium text-white tracking-tight">
              <CountUp end={stats.tidak_berlaku} />
            </div>
          </div>

          {/* Card 3: Diubah */}
          <div className="flex flex-col gap-1.5 p-3 sm:p-4 rounded-xl bg-pr-800 border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-[12px] font-medium text-neu-200 tracking-wider">
                HUKUM DIUBAH
              </span>
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-medium text-white tracking-tight">
              <CountUp end={stats.diubah} />
            </div>
          </div>

          {/* Card 4: Dicabut */}
          <div className="flex flex-col gap-1.5 p-3 sm:p-4 rounded-xl bg-pr-800 border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-[12px] font-medium text-neu-200 tracking-wider">
                HUKUM DICABUT
              </span>
              <Gavel className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-medium text-white tracking-tight">
              <CountUp end={stats.dicabut} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegulasiHero;

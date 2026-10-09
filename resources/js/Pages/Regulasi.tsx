import React from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout, Section } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { RegulasiHero } from '@/Components/regulasi/RegulasiHero';
import { IndonesiaLegalMap } from '@/Components/landing/IndonesiaLegalMap';
import { RegulasiRecentSection } from '@/Components/regulasi/RegulasiRecentSection';
import { RegulasiHierarchySection } from '@/Components/regulasi/RegulasiHierarchySection';

interface DailyStats {
  total: number;
  berlaku: number;
  tidak_berlaku: number;
  diubah: number;
  dicabut: number;
}

interface HeroStats {
  berlaku: number;
  tidak_berlaku: number;
  diubah: number;
  dicabut: number;
}

interface FilterReferences {
  kategori: { id: string | number; nama: string }[];
  status: { id: string | number; nama: string }[];
  tahun: (string | number)[];
}

interface RegulasiProps {
  categoryCounts?: Record<string, number>;
  dailyStats?: DailyStats;
  heroStats?: HeroStats;
  filterReferences?: FilterReferences;
}

export default function Regulasi({
  categoryCounts,
  dailyStats,
  heroStats,
  filterReferences,
}: RegulasiProps) {
  return (
    <PublicLayout>
      <Head title="Eksplorasi Regulasi & Peraturan - LawGates" />

      {/* Screen background default #F8F9FA tanpa motif plusPattern */}
      <div className="relative z-10 w-full flex flex-col items-center pb-24">
        {/* 1. Header & Hero: Breadcrumb konsisten posisinya dengan Pencarian.tsx */}
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-24">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Regulasi' },
            ]}
            className="mb-4 sm:mb-6 text-xs text-neu-500"
          />
          <RegulasiHero stats={heroStats} />
        </div>

        {/* 2. Peta Hukum Indonesia (Di atas background default #F8F9FA) */}
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
          <IndonesiaLegalMap />
        </div>

        {/* 3. Sistem Hukum Terbaru (Frame warna putih background: #FFF sesuai Figma #2358:57719) */}
        <div className="w-full bg-white mt-14 sm:mt-20 py-12 sm:py-16 border-y border-neu-100 shadow-2xs">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
            <RegulasiRecentSection
              dailyStats={dailyStats}
              filterReferences={filterReferences}
            />
          </div>
        </div>

        {/* 4. Statistik Peraturan (Hierarki Peraturan Indonesia) */}
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
          <RegulasiHierarchySection counts={categoryCounts} />
        </div>
      </div>
    </PublicLayout>
  );
}

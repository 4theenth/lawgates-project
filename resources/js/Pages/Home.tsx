import { Head } from '@inertiajs/react';
import { HeroSection } from '../Components/landing/HeroSection';
import { StatsOverview } from '../Components/landing/StatsOverview';
import { AboutOverview } from '../Components/landing/AboutOverview';
import { RegulationHierarchyGrid } from '../Components/landing/RegulationHierarchyGrid';
import { RecentRegulations } from '../Components/landing/RecentRegulations';
import { PublicLayout } from '../Layouts/PublicLayout';
import { useScrollPosition } from '../hooks/useScrollPosition';

export default function Home() {
  const isScrolled = useScrollPosition(50);

  const handleSearch = (query: string) => {
    console.log('Searching regulation:', query);
  };

  return (
    <PublicLayout>
      <Head title="LawGates - Platform Intelijen Regulasi & Hukum Indonesia" />

      {/* 1. Hero Section (Visual dark glow, title, description, and search filter bar) */}
      <HeroSection isScrolled={isScrolled} onSearch={handleSearch} />

      {/* 2. Ringkasan Status Hukum (4 Kartu Overlapping) */}
      <StatsOverview />

      {/* 3. Section Tentang Kami & 3 Metrik Besar */}
      <AboutOverview />

      {/* 4. Section Statistik Peraturan (8 Kartu Hierarki Regulasi) */}
      <RegulationHierarchyGrid />

      {/* 5. Section Sistem Hukum Terbaru (Featured Highlight & List) */}
      <RecentRegulations />
    </PublicLayout>
  );
}

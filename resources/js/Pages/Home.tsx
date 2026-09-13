import { Head } from '@inertiajs/react';
import { HeroSection } from '../Components/landing/HeroSection';
import { StatsOverview } from '../Components/landing/StatsOverview';
import { AboutOverview } from '../Components/landing/AboutOverview';
import { RegulationHierarchyGrid } from '../Components/landing/RegulationHierarchyGrid';
import { RecentRegulations } from '../Components/landing/RecentRegulations';
import { ServicesOverview } from '../Components/landing/ServicesOverview';
import { PublicLayout, Section } from '../Layouts/PublicLayout';
import { useScrollPosition } from '../hooks/useScrollPosition';

export default function Home() {
  const isScrolled = useScrollPosition(50);

  const handleSearch = (query: string) => {
    console.log('Searching regulation:', query);
  };

  return (
    <PublicLayout>
      <Head title="LawGates - Platform Intelijen Regulasi & Hukum Indonesia" />

      {/* 1. Hero Section — no Section wrapper, starts at the top of the page */}
      <HeroSection isScrolled={isScrolled} onSearch={handleSearch} />

      {/* 2. Ringkasan Status Hukum — overlaps hero bottom, no Section wrapper */}
      <StatsOverview />

      {/* 3. Section Tentang Kami & 3 Metrik Besar (Dark Banner) */}
      <Section>
        <AboutOverview />
      </Section>

      {/* 4. Section Statistik Peraturan (8 Kartu Hierarki Regulasi) */}
      <Section>
        <RegulationHierarchyGrid />
      </Section>

      {/* 5. Section Sistem Hukum Terbaru (Featured Highlight & List) */}
      <Section>
        <RecentRegulations />
      </Section>

      {/* 6. Section Layanan LawGates */}
      <Section>
        <ServicesOverview />
      </Section>
    </PublicLayout>
  );
}

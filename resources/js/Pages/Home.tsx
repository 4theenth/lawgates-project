import { Head, router } from '@inertiajs/react';
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

  const handleSearch = (query: string, filters?: any) => {
    // Siapkan parameter URL dari input user
    const params: Record<string, string> = {};
    if (query) params.keyword = query;
    if (filters?.kategori) params.kategori_id = filters.kategori;
    if (filters?.tahun) params.tahun = filters.tahun;
    if (filters?.status) params.status_id = filters.status;

    // Pindah ke halaman /pencarian beserta query param-nya (Inertia Routing)
    router.get('/pencarian', params);
  };

  return (
    <PublicLayout>
      <Head title="LawGates - Platform Intelijen Regulasi & Hukum Indonesia" />
      <HeroSection isScrolled={isScrolled} onSearch={handleSearch} />
      <StatsOverview />

      {/* 3. Section Tentang Kami & 3 Metrik Besar (Dark Banner) */}
      <Section fullWidth>
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
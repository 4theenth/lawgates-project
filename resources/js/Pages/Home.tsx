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
      <Section fullWidth><AboutOverview /></Section>
      <Section><RegulationHierarchyGrid /></Section>
      <Section><RecentRegulations /></Section>
      <Section><ServicesOverview /></Section>
    </PublicLayout>
  );
}
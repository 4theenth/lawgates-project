import { Head, router } from '@inertiajs/react';
import { HeroSection } from '../Components/landing/HeroSection';
import { StatsOverview } from '../Components/landing/StatsOverview';
import { AboutOverview } from '../Components/landing/AboutOverview';
import { RegulationHierarchyGrid } from '../Components/landing/RegulationHierarchyGrid';
import { RecentRegulations } from '../Components/landing/RecentRegulations';
import { ServicesOverview } from '../Components/landing/ServicesOverview';
import { PublicLayout, Section } from '../Layouts/PublicLayout';
import { useScrollPosition } from '../hooks/useScrollPosition';
import plusPattern from '@/assets/plus.svg';

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

      {/* Fixed Background Pattern (plus.svg) - tidak ikut terscroll */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("${plusPattern}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <HeroSection isScrolled={isScrolled} onSearch={handleSearch} />
        <StatsOverview />

      {/* 3. Section Tentang Kami & 3 Metrik Besar (Dark Banner) */}
      <Section>
        <AboutOverview />
      </Section>

        {/* 4. Section Statistik Peraturan & 5. Section Sistem Hukum Terbaru (White Background Container) */}
        <div className="w-full bg-white mt-[66px] pt-px pb-[66px]">
          <Section>
            <RegulationHierarchyGrid />
          </Section>

          <Section>
            <RecentRegulations />
          </Section>
        </div>

      {/* 6. Section Layanan LawGates */}
      <Section className="mb-8 sm:mb-12">
        <ServicesOverview />
      </Section>
      </div>
    </PublicLayout>
  );
}
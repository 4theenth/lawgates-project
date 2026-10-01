import { SearchFilterBar } from './SearchFilterBar';
import ladyJusticeImg from '@/assets/lady-justice.webp';
import gridSvg from '@/assets/architectural-overlay.webp';

interface HeroSectionProps {
  isScrolled: boolean;
  onSearch?: (query: string, filters?: any) => void;
}

export function HeroSection({ isScrolled, onSearch }: HeroSectionProps) {
  return (
    <section className="relative w-full flex flex-col items-center justify-start pt-[165px] pb-[235px] px-4 sm:px-6 lg:px-8 bg-[#050B14]">
      {/* ── BACKGROUND FILLS (Isolated overflow-hidden to prevent clipping dropdowns) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* ── BACKGROUND FILLS (Z-0) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* 1. Base Linear */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, #050B14 0%, #0B1020 100%)' }}
          />
          
          {/* 2. Yellow Slanted Radial (Miring / Rotated) */}
          <div
            className="absolute origin-center pointer-events-none w-[1600px] h-[350px] md:w-[110vw] md:h-[60vw] top-[110%] left-[100%] md:top-[16%] md:left-[16%] -translate-x-1/2 -translate-y-1/2 rotate-[35deg] md:rotate-[35deg]"
            style={{
              background: 'radial-gradient(ellipse closest-side, rgba(212, 175, 55, 0.55) 0%, rgba(212, 175, 55, 0) 90%)'
            }}
          />

          {/* 3. White Radial */}
          <div
            className="absolute origin-center pointer-events-none w-[1600px] h-[350px] md:w-[80vw] md:h-[80vw] top-[-15%] left-[0%] md:top-[20%] md:left-[82%] -translate-x-1/2 -translate-y-1/2 rotate-[35deg] md:rotate-[0deg]"
            style={{
              background: 'radial-gradient(ellipse closest-side, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 90%)'
            }}
          />
        </div>

        {/* ── IMAGE FILL: Perspective Grid Lines ── */}
        <img
          src={gridSvg}
          alt="Perspective Grid"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-100"
        />

        {/* ── LADY JUSTICE IMAGE (Anchored to bottom so base cut line is hidden behind "Hukum Berlaku" cards) ── */}
        <img
          src={ladyJusticeImg}
          alt="Lady Justice"
          className="
            absolute
            left-0
            bottom-0
            w-[360px]
            sm:w-[440px]
            lg:w-[480px]
            h-[460px]
            sm:h-[520px]
            lg:h-[560px]
            object-contain
            object-bottom
            pointer-events-none
            z-1
            select-none
            opacity-[0.14]
          "
        />
      </div>

      {/* ── HERO CONTENT (Figma: width 709, height 89, gap 7px) ── */}
      <div className="relative z-30 text-center w-full max-w-[850px] mx-auto flex flex-col items-center">
        {/* Main Heading (1 line on desktop and tablet, no wrap to 2nd line) */}
        <h1 className="w-full text-[16px] xs:text-[22px] sm:text-[32px] font-bold text-white leading-[130%] tracking-tight text-center md:whitespace-nowrap">
          Jelajahi Hukum <span className="text-sec-900">Indonesia</span> Dengan Law Gates
        </h1>

        <p className="w-full max-w-[709px] text-neu-100 text-[14px] font-normal leading-[20px] text-center mt-[7px] mb-[27px]">
          Akses ribuan hingga jutaan peraturan dan relasi dari UUD hingga Perda. Analisis, cari, dan pahami hierarki hukum secara interaktif.
        </p>

        {/* Search & Filter Bar Component */}
        <SearchFilterBar isScrolled={isScrolled} onSearch={onSearch} />
      </div>
    </section>
  );
}
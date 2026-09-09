import { SearchFilterBar } from './SearchFilterBar';
import ladyJusticeImg from '@/assets/lady-justice.png';
import gridSvg from '@/assets/architectural-overlay.webp';

interface HeroSectionProps {
  isScrolled: boolean;
  onSearch?: (query: string) => void;
}

export function HeroSection({ isScrolled, onSearch }: HeroSectionProps) {
  return (
    <section className="relative w-full flex flex-col items-center justify-start pt-[165px] pb-[235px] px-4 sm:px-6 lg:px-8 bg-[#050B14] overflow-hidden">
      {/* ── BACKGROUND FILLS (Figma: Rich & Dense Top-Left Gold Glow + Top-Right White Glow + Linear Navy) ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            /* Layer 1: Top-Right Radial White Glow */
            radial-gradient(ellipse 48% 65% at 82% 20%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0) 75%),
            /* Layer 2: Top-Left Dense & Rich Radial Gold Glow (#D4AF37) */
            radial-gradient(ellipse 55% 75% at 16% 16%, rgba(212, 175, 55, 0.80) 0%, rgba(212, 175, 55, 0.55) 30%, rgba(212, 175, 55, 0.22) 60%, rgba(212, 175, 55, 0) 85%),
            /* Layer 3: Warm Ambient Glow around Lady Justice */
            radial-gradient(circle 450px at 10% 40%, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0) 70%),
            /* Layer 4: Linear Gradient Background (Figma: 180deg from #050B14 to #0B1020) */
            linear-gradient(180deg, #050B14 0%, #0B1020 100%)
          `,
        }}
      />

      {/* ── IMAGE FILL: Perspective Grid Lines (SVG Asset) ── */}
      <img
        src={gridSvg}
        alt="Perspective Grid"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-100"
      />

      {/* ── LADY JUSTICE IMAGE (Figma: width 400, height 400, top 174px, opacity 12%) ── */}
      <img
        src={ladyJusticeImg}
        alt="Lady Justice"
        className="absolute left-0 top-[174px] w-[400px] h-[400px] object-contain pointer-events-none z-1 select-none opacity-[0.12]"
      />

      {/* ── HERO CONTENT (Figma: width 709, height 89, gap 7px) ── */}
      <div className="relative z-10 text-center w-full max-w-[709px] mx-auto flex flex-col items-center">
        {/* Main Heading (Figma: Inter Bold 32px, line-height 130%, color #FFFFFF) */}
        <h1 className="w-full max-w-[709px] text-[32px] font-bold text-white leading-[130%] tracking-tight text-center">
          Jelajahi Hukum <span className="text-sec-900">Indonesia</span> Dengan Law Gates
        </h1>

        {/* Description (Figma: Inter Regular 14px, line-height 20px, color #D3D3D3, gap 7px from headline) */}
        <p className="w-full max-w-[709px] text-neu-100 text-[14px] font-normal leading-[20px] text-center mt-[7px] mb-[27px]">
          Akses ribuan hingga jutaan peraturan dan relasi dari UUD hingga Perda. Analisis, cari, dan pahami hierarki hukum secara interaktif.
        </p>

        {/* Search & Filter Bar Component (Figma: top 281px, width 699, height 60) */}
        <SearchFilterBar isScrolled={isScrolled} onSearch={onSearch} />
      </div>
    </section>
  );
}

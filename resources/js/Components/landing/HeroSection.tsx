import { SearchFilterBar } from './SearchFilterBar';

interface HeroSectionProps {
  isScrolled: boolean;
  onSearch?: (query: string) => void;
}

export function HeroSection({ isScrolled, onSearch }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[540px] lg:min-h-[580px] flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#070C18] overflow-hidden">
      {/* Layer 1: Ambient Background Gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.18) 0%, rgba(10, 28, 62, 0.4) 45%, rgba(7, 12, 24, 0.95) 80%),
            radial-gradient(circle at 15% 15%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 85% 20%, rgba(56, 189, 248, 0.06) 0%, transparent 40%),
            linear-gradient(180deg, #050B14 0%, #070C18 100%)
          `,
        }}
      />

      {/* Layer 2: Subtle Architectural Perspective & Topographic Flow Lines (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40"
        viewBox="0 0 1440 580"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gold-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.02" />
            <stop offset="40%" stopColor="#EAB308" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="blue-hero-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Diagonal Perspective lines */}
        <line x1="-100" y1="80" x2="1540" y2="340" stroke="url(#gold-hero-grad)" strokeWidth="1" opacity="0.6" />
        <line x1="-100" y1="200" x2="1540" y2="460" stroke="url(#gold-hero-grad)" strokeWidth="0.8" opacity="0.4" />
        <line x1="-100" y1="320" x2="1540" y2="580" stroke="url(#gold-hero-grad)" strokeWidth="0.6" opacity="0.3" />
        <line x1="-100" y1="0" x2="1540" y2="220" stroke="url(#blue-hero-grad)" strokeWidth="0.8" opacity="0.35" />

        {/* Vertical Architectural Guides */}
        <line x1="200" y1="0" x2="200" y2="580" stroke="url(#gold-hero-grad)" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
        <line x1="720" y1="0" x2="720" y2="580" stroke="url(#gold-hero-grad)" strokeWidth="1" strokeDasharray="3 9" opacity="0.2" />
        <line x1="1240" y1="0" x2="1240" y2="580" stroke="url(#gold-hero-grad)" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />

        {/* Subtle geometric dots */}
        <circle cx="340" cy="180" r="2.5" fill="#EAB308" opacity="0.5" />
        <circle cx="1100" cy="300" r="2.5" fill="#EAB308" opacity="0.5" />
      </svg>

      {/* Hero Content */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white mb-4 leading-[1.2] tracking-tight">
          Jelajahi Hukum <span className="text-[#D4AF37]">Indonesia</span> Dengan Law Gates
        </h1>

        {/* Description */}
        <p className="text-[#94A3B8] text-sm sm:text-base font-normal mb-8 max-w-2xl leading-relaxed">
          Akses ribuan hingga jutaan peraturan dan relasi dari UUD hingga Perda. Analisis, cari, dan pahami hierarki hukum secara interaktif.
        </p>

        {/* Search & Filter Bar Component */}
        <SearchFilterBar isScrolled={isScrolled} onSearch={onSearch} />
      </div>
    </section>
  );
}

import { CountUp } from '../common/CountUp';

interface HierarchyCardItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  count: number;
}

const hierarchyData: HierarchyCardItem[] = [
  {
    id: 'uud',
    badge: 'Tingkat Tertinggi',
    title: 'UUD',
    description: 'Undang-Undang Dasar 1945',
    count: 612,
  },
  {
    id: 'tap-mpr',
    badge: 'Konstitusional',
    title: 'TAP MPR',
    description: 'Ketetapan MPR',
    count: 1200,
  },
  {
    id: 'uu-perpu',
    badge: 'Primer',
    title: 'UU / PERPU',
    description: 'Peraturan Pemerintah Pengganti Undang-Undang',
    count: 2125,
  },
  {
    id: 'pp',
    badge: 'Pelaksana',
    title: 'PP',
    description: 'Peraturan Pemerintah',
    count: 9023,
  },
  {
    id: 'perpres',
    badge: 'Eksekutif',
    title: 'PERPRES',
    description: 'Peraturan Presiden',
    count: 322,
  },
  {
    id: 'perda',
    badge: 'Otonomi Daerah',
    title: 'PERDA',
    description: 'Peraturan Daerah',
    count: 8963,
  },
  {
    id: 'permen-perban',
    badge: 'Sektoral',
    title: 'PERMEN & PERBAN',
    description: 'Peraturan Menteri & Peraturan Badan / Lembaga',
    count: 1245,
  },
  {
    id: 'putusan-mk-ma',
    badge: 'Yurisprudensi',
    title: 'PUTUSAN MK & MA',
    description: 'Putusan Mahkamah Konstitusi & Putusan Mahkamah Agung',
    count: 896,
  },
];

export function RegulationHierarchyGrid() {
  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-[28px] font-bold text-neu-900 tracking-tight">
          Statistik Peraturan
        </h2>
        <p className="text-neu-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Akses ribuan hingga jutaan peraturan dan relasi dari UUD 1945, Undang-Undang, Perppu, PP, Perpres, hingga Perda.
        </p>
      </div>

      {/* 8 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {hierarchyData.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#F7E7BE] hover:bg-[#F2DEA8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#E9D499] cursor-pointer"
          >
            {/* Top Courtroom / Judicial Chamber Header Banner with Badge */}
            <div className="relative w-full h-24 overflow-hidden p-3 flex items-start justify-end">
              {/* Architectural Courtroom Backdrop Simulation */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `
                    linear-gradient(180deg, rgba(14, 23, 41, 0.25) 0%, rgba(20, 15, 10, 0.75) 100%),
                    radial-gradient(circle at 50% 20%, #D4AF37 0%, #78350F 50%, #180C05 100%)
                  `,
                }}
              />

              {/* Courtroom Architectural Perspective Columns Simulation (SVG) */}
              <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" viewBox="0 0 240 100" fill="none" preserveAspectRatio="none">
                <rect x="20" y="15" width="20" height="85" fill="#451A03" opacity="0.8" />
                <rect x="60" y="25" width="25" height="75" fill="#78350F" opacity="0.6" />
                <rect x="155" y="25" width="25" height="75" fill="#78350F" opacity="0.6" />
                <rect x="200" y="15" width="20" height="85" fill="#451A03" opacity="0.8" />
                {/* Court bench / gavel spotlight glow */}
                <ellipse cx="120" cy="85" rx="55" ry="20" fill="#FDE047" opacity="0.3" filter="blur(8px)" />
              </svg>

              {/* Pill Badge at top-right */}
              <span className="relative z-10 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/25 text-white text-[10px] font-semibold tracking-wider backdrop-blur-md shadow-sm">
                {item.badge}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-h-[140px]">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-neu-900 tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-neu-700 font-medium mt-1 leading-snug line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Large Count Indicator */}
              <div className="mt-4 text-2xl sm:text-[28px] font-black text-neu-900 tracking-tight">
                <CountUp end={item.count} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

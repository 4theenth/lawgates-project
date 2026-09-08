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
    count: 612,
  },
  {
    id: 'pp',
    badge: 'Pelaksana',
    title: 'PP',
    description: 'Peraturan Pemerintah',
    count: 612,
  },
  {
    id: 'perpres',
    badge: 'Eksekutif',
    title: 'PERPRES',
    description: 'Peraturan Presiden',
    count: 612,
  },
  {
    id: 'perda',
    badge: 'Otonomi Daerah',
    title: 'PERDA',
    description: 'Peraturan Daerah',
    count: 612,
  },
  {
    id: 'permen-perban',
    badge: 'Sektoral',
    title: 'PERMEN & PERBAN',
    description: 'Peraturan Menteri & Peraturan Badan / Lembaga',
    count: 612,
  },
  {
    id: 'putusan-mk-ma',
    badge: 'Yurisprudensi',
    title: 'PUTUSAN MK & MA',
    description: 'Putusan Mahkamah Konstitusi & Putusan Mahkamah Agung',
    count: 612,
  },
];

export function RegulationHierarchyGrid() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
          Statistik Peraturan
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Akses ribuan hingga jutaan peraturan dan relasi dari UUD 1945, Undang-Undang, Perppu, PP, Perpres, hingga Perda.
        </p>
      </div>

      {/* 8 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {hierarchyData.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#F6E5B8] hover:bg-[#F2DEA8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between border border-[#EDD597] cursor-pointer"
          >
            {/* Top Banner Header with Badge */}
            <div className="relative w-full h-14 bg-gradient-to-r from-[#18233A] via-[#0E1729] to-[#18233A] p-2.5 flex items-center justify-end">
              {/* Subtle background geometric texture */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.4) 0%, transparent 60%)',
                }}
              />
              {/* Pill Badge */}
              <span className="relative z-10 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/20 text-white text-[10px] font-semibold tracking-wider backdrop-blur-sm">
                {item.badge}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-h-[140px]">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-700 font-medium mt-1 leading-snug line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Large Count Indicator */}
              <div className="mt-4 text-2xl sm:text-[28px] font-black text-gray-900 tracking-tight">
                <CountUp end={item.count} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

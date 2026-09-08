import { Calendar, FileText, ChevronRight } from 'lucide-react';

interface RecentItem {
  id: string;
  title: string;
  category: string;
  date: string;
}

const recentList: RecentItem[] = [
  {
    id: '1',
    title: 'Ketetapan Majelis Permusyawaratan Rakyat Nomor IV/MPR/1999 Tahun 2004',
    category: 'TAP MPR',
    date: '12 September 2025',
  },
  {
    id: '2',
    title: 'GARIS-GARIS BESAR HALUAN NEGARA TAHUN 1999 - 2004',
    category: 'Perpres',
    date: '1 Agustus 2026',
  },
  {
    id: '3',
    title: 'Peraturan Pemerintah Nomor 20 Tahun 2025 Tentang Perubahan Atas Peraturan Pemerintah Nomor 35 Tahun 2022',
    category: 'PP',
    date: '5 Mei 2026',
  },
  {
    id: '4',
    title: 'Peraturan Pemerintah Pengganti Undang-undang Nomor 143 Tahun 2024',
    category: 'Perpu',
    date: '5 Februari 2026',
  },
  {
    id: '5',
    title: 'GARIS-GARIS BESAR HALUAN NEGARA TAHUN 1999',
    category: 'Perpres',
    date: '28 Januari 2026',
  },
];

export function RecentRegulations() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
          Sistem Hukum Terbaru
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Daftar Regulasi & Hukum Terbaru
        </p>
      </div>

      {/* Grid: Left Featured Highlight + Right List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big Featured Box (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-md flex flex-col justify-end p-6 sm:p-8 group cursor-pointer border border-gray-800 bg-[#0E1729]">
            {/* Ambient Graphic Backdrop (Without external photo) */}
            <div
              className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                background: `
                  radial-gradient(circle at 75% 30%, rgba(220, 38, 38, 0.4) 0%, transparent 60%),
                  radial-gradient(circle at 25% 70%, rgba(212, 175, 55, 0.25) 0%, transparent 50%),
                  linear-gradient(180deg, rgba(14, 23, 41, 0.4) 0%, rgba(7, 12, 24, 0.95) 100%)
                `,
              }}
            />

            {/* Subtle decorative geometric overlay */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Featured Content on Bottom */}
            <div className="relative z-10">
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-gray-900 text-xs font-bold tracking-wide mb-3 shadow-sm">
                Perpres
              </span>

              {/* Featured Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-3 line-clamp-3 group-hover:text-[#D4AF37] transition-colors">
                Peraturan Presiden Nomor 29 Tahun 2026 Tentang Perubahan Kedua Atas Peraturan Presiden Nomor 107 Tahun 2020
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>10 Agustus 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: List of 5 Recent Items (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Header */}
          <h3 className="text-sm font-bold text-gray-700 tracking-wider mb-4 uppercase">
            Terbaru Lainnya
          </h3>

          {/* List Items */}
          <div className="flex flex-col divide-y divide-gray-100">
            {recentList.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex items-center gap-3.5 group cursor-pointer hover:bg-gray-50/80 px-2 rounded-xl transition-colors"
              >
                {/* Thumbnail Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#18233A] to-[#0A101F] shrink-0 flex items-center justify-center border border-gray-800 shadow-sm group-hover:border-[#D4AF37] transition-colors">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-bold">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-gray-500 font-normal">
                      {item.date}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-[28px] font-bold text-neu-900 tracking-tight">
          Sistem Hukum Terbaru
        </h2>
        <p className="text-neu-500 text-xs sm:text-sm mt-1">
          Daftar Regulasi & Hukum Terbaru
        </p>
      </div>

      {/* Grid: Left Featured Highlight + Right List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big Featured Box (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-md flex flex-col justify-end p-6 sm:p-8 group cursor-pointer border border-pr-800 bg-pr-900">
            {/* Ambient Graphic Backdrop (Without external photo) */}
            <div
              className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                background: `
                  radial-gradient(circle at 75% 30%, color-mix(in srgb, var(--color-dan-900) 40%, transparent) 0%, transparent 60%),
                  radial-gradient(circle at 25% 70%, color-mix(in srgb, var(--color-sec-900) 25%, transparent) 0%, transparent 50%),
                  linear-gradient(180deg, color-mix(in srgb, var(--color-pr-900) 40%, transparent) 0%, color-mix(in srgb, var(--color-bg-900) 95%, transparent) 100%)
                `,
              }}
            />

            {/* Subtle decorative geometric overlay */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(var(--color-sec-900)_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Featured Content on Bottom */}
            <div className="relative z-10">
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-neu-900 text-xs font-bold tracking-wide mb-3 shadow-sm">
                Perpres
              </span>

              {/* Featured Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-3 line-clamp-3 group-hover:text-sec-900 transition-colors">
                Peraturan Presiden Nomor 29 Tahun 2026 Tentang Perubahan Kedua Atas Peraturan Presiden Nomor 107 Tahun 2020
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-neu-400">
                <Calendar className="w-3.5 h-3.5 text-neu-400" />
                <span>10 Agustus 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: List of 5 Recent Items (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Header */}
          <h3 className="text-sm font-bold text-neu-700 tracking-wider mb-4 uppercase">
            Terbaru Lainnya
          </h3>

          {/* List Items */}
          <div className="flex flex-col divide-y divide-neu-100">
            {recentList.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex items-center gap-3.5 group cursor-pointer hover:bg-neu-50/80 px-2 rounded-xl transition-colors"
              >
                {/* Thumbnail Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pr-800 to-pr-900 shrink-0 flex items-center justify-center border border-pr-700 shadow-sm group-hover:border-sec-900 transition-colors">
                  <FileText className="w-5 h-5 text-sec-900" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-neu-900 leading-snug line-clamp-2 group-hover:text-sec-900 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-neu-50 text-neu-700 text-[10px] font-bold">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-neu-500 font-normal">
                      {item.date}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-neu-400 group-hover:text-neu-900 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import recentFeaturedRegulation from '@/assets/recent-featured-regulation.webp';
import recentRegulationThumb from '@/assets/recent-regulation-thumb.webp';

interface RecentItem {
  id: string;
  title: string;
  category: string;
  date: string;
}

const recentList: RecentItem[] = [
  {
    id: '1',
    title:
      'Ketetapan Majelis Permusyawaratan Rakyat Nomor IV/MPR/1999 Tahun 2004',
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
    title:
      'Peraturan Pemerintah Nomor 20 Tahun 2025 Tentang Perubahan Atas Peraturan Pemerintah Nomor 35 Tahun 2022',
    category: 'PP',
    date: '5 Mei 2026',
  },
  {
    id: '4',
    title:
      'Peraturan Pemerintah Pengganti Undang-undang Nomor 143 Tahun 2024',
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
          Pembaruan Hukum Harian
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* =========================
            FEATURED REGULATION
        ========================== */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[380px] rounded-[20px] overflow-hidden border border-pr-800 shadow-md group">

            {/* Main Featured Regulation Image */}
            <img
              src={recentFeaturedRegulation}
              alt="Peraturan Presiden"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105"
            />

            {/* Featured Content */}
            <div
              className="
                absolute
                left-0
                bottom-0
                z-10
                w-full
                p-4 sm:p-5
                flex
                flex-col
                items-start
                gap-2.5
                bg-[rgba(255,252,252,0.20)]
                backdrop-blur-[6px]
              "
            >

              {/* Category */}
              <span
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-2.5
                  py-0.5
                  rounded-[6px]
                  bg-white
                  text-pr-900
                  text-[10px]
                  font-semibold
                  leading-tight
                "
              >
                Perpres
              </span>

              {/* Title */}
              <h3
                className="
                  text-sm
                  sm:text-[15px]
                  font-semibold
                  text-white
                  leading-snug
                  w-full
                  line-clamp-2
                "
              >
                Peraturan Presiden Nomor 29 Tahun 2026 Tentang Perubahan Kedua Atas Peraturan Presiden Nomor 107 Tahun 2020
              </h3>

              {/* Date */}
              <div className="text-[11px] text-white/90 leading-tight">
                10 Agustus 2026
              </div>

            </div>
          </div>
        </div>


        {/* =========================
            RECENT LIST
        ========================== */}
        <div className="lg:col-span-5 flex flex-col lg:h-[380px]">

          {/* Header */}
          <h3 className="text-[15px] font-semibold text-neu-700 leading-tight mb-2 shrink-0">
            Terbaru Lainnya
          </h3>

          {/* List */}
          <div className="flex-1 flex flex-col justify-between">

            {recentList.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  gap-3
                  py-2
                  border-b
                  border-neu-50
                  cursor-pointer
                  group/item
                  transition-colors
                  hover:bg-neu-50/40
                  rounded-lg
                  px-1
                "
              >

                {/* Thumbnail */}
                <img
                  src={recentRegulationThumb}
                  alt=""
                  className="
                    w-[52px]
                    h-[52px]
                    shrink-0
                    rounded-[10px]
                    object-cover
                  "
                />

                {/* Info */}
                <div className="flex-1 min-w-0">

                  <h4 className="text-[13px] sm:text-[14px] font-medium text-neu-900 leading-[18px] sm:leading-[20px] line-clamp-2 group-hover/item:text-pr-700 transition-colors">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="px-1.5 py-0.5 rounded-[4px] bg-neu-50 text-pr-900 text-[10px] font-semibold leading-tight">
                      {item.category}
                    </span>

                    <span className="text-[11px] text-neu-500 font-normal leading-tight">
                      {item.date}
                    </span>

                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
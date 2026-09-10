import frame165 from '@/assets/Frame 165.png';
import frame167 from '@/assets/Frame 167.png';

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

            {/* Main Image - Frame 165 */}
            <img
              src={frame165}
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
                w-[791px]
                max-w-full
                p-[10px_17px]
                flex
                flex-col
                items-start
                gap-[10px]
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
                  px-[8px]
                  py-[2px]
                  rounded-[8px]
                  bg-white
                  text-pr-900
                  text-[8px]
                  font-semibold
                  leading-[12px]
                "
              >
                Perpres
              </span>

              {/* Title */}
              <h3
                className="
                  text-[11px]
                  font-semibold
                  text-white
                  leading-[16px]
                  w-full
                  line-clamp-2
                "
              >
                Peraturan Presiden Nomor 29 Tahun 2026 Tentang Perubahan Kedua Atas Peraturan Presiden Nomor 107 Tahun 2020
              </h3>

              {/* Date */}
              <div className="text-[8px] text-white/80 leading-[12px]">
                10 Agustus 2026
              </div>

            </div>
          </div>
        </div>


        {/* =========================
            RECENT LIST
        ========================== */}
        <div className="lg:col-span-5 flex flex-col">

          {/* Header */}
            <h3 className="text-[14px] font-semibold text-neu-700 leading-[20px] mb-[8px]">
              Terbaru Lainnya
            </h3>

          {/* List */}
          <div className="flex flex-col">

            {recentList.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  gap-[10px]
                  py-[8px]
                  border-b
                  border-neu-50
                  cursor-pointer
                "
              >

                {/* Thumbnail - Frame 167 */}
                <img
                  src={frame167}
                  alt=""
                  className="
                    w-[48px]
                    h-[48px]
                    shrink-0
                    rounded-[10px]
                    object-cover
                  "
                />

                {/* Info */}
                <div className="flex-1 min-w-0">

                  <h4 className="text-[12px] font-medium text-neu-900 leading-[16px] line-clamp-2">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-[6px] mt-[2px]">

                    <span className="px-[5px] py-[1px] rounded-[4px] bg-neu-50 text-pr-900 text-[7px] font-semibold leading-[10px]">
                      {item.category}
                    </span>

                    <span className="text-[10px] text-neu-500 font-normal leading-[11px]">
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
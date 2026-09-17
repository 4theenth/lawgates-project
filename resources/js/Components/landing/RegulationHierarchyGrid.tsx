import { CountUp } from '../common/CountUp';
import hierarchyCardBg from '@/assets/regulation-hierarchy-card.webp';

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
        <h2 className="text-2xl sm:text-[26px] font-bold text-neu-900 tracking-tight">
          Statistik Peraturan
        </h2>

        <p className="text-neu-600 text-md sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Akses ribuan hingga jutaan peraturan dan relasi dari UUD 1945,
          Undang-Undang, Perppu, PP, Perpres, hingga Perda.
        </p>
      </div>

      {/* 8 Cards Grid */}
      <div className="w-full overflow-visible">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-[30px] gap-y-[28px]">

          {hierarchyData.map((item) => (
            <div
              key={item.id}
              className="
                group
                relative
                w-full
                h-[280px]
                p-[5px]
                bg-white
                border
                border-[#E9E9E9]
                rounded-[20px]
                overflow-hidden
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
                cursor-pointer
              "
            >

              {/* FOTO */}
              <div
                className="
                  absolute
                  inset-x-[5px]
                  top-[5px]
                  h-[171px]
                  rounded-[14px]
                  overflow-hidden
                  z-0
                "
              >
                <img
                  src={hierarchyCardBg}
                  alt={item.title}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Badge */}
                <span
                  className="
                    absolute
                    top-[8px]
                    right-[8px]
                    z-10
                    px-[8px]
                    py-[3px]
                    rounded-[10px]
                    bg-white
                    text-pr-900
                    text-[8px]
                    font-semibold
                    leading-[12px]
                    shadow-sm
                  "
                >
                  {item.badge}
                </span>
              </div>

              {/* CARD BODY */}
              <div
                className="
                  absolute
                  inset-x-[5px]
                  top-[171px]
                  bottom-[5px]
                  z-20
                  bg-pr-50
                  rounded-b-[14px]
                  px-[10px]
                  py-[10px]
                  flex
                  flex-col
                  justify-between
                "
              >

                {/* Title + Description */}
                <div className="relative z-30">

                  <h3
                    className="
                      text-[12px]
                      font-semibold
                      text-pr-900
                      leading-[18px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-[2px]
                      text-[9px]
                      font-normal
                      text-neu-600
                      leading-[13px]
                      line-clamp-2
                    "
                  >
                    {item.description}
                  </p>

                </div>

                {/* Count */}
                <div
                  className="
                    relative
                    z-30
                    text-[18px]
                    font-semibold
                    text-pr-900
                    leading-[130%]
                  "
                >
                  <CountUp end={item.count} />
                </div>

              </div>

              {/* CARD NOTCH / TAB SHAPE */}
              <div className="absolute left-[5px] top-[145px] z-10 w-[140px] h-[27px] pointer-events-none">
                <svg
                  width="140"
                  height="27"
                  viewBox="0 0 140 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-pr-50"
                >
                  <path
                    d="M0 27V11C0 4.92487 4.92487 0 11 0H105.167C109.856 0 114.029 2.97146 115.562 7.40178L119.438 18.5982C120.971 23.0285 125.144 26 129.833 26H140V27H0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
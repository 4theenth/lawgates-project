import { CountUp } from '../common/CountUp';
import frame218 from '@/assets/Frame 218.png';
import rectangle1 from '@/assets/Rectangle 1.svg';

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
        <div className="grid grid-cols-4 gap-x-[30px] gap-y-[28px]">

          {hierarchyData.map((item) => (
            <div
              key={item.id}
              className="
                group
                relative
                w-[278px]
                h-[280px]
                p-[4px]
                bg-white
                border
                border-[#E9E9E9]
                rounded-[20px]
                overflow-hidden
                shadow-sm
                cursor-pointer
              "
            >

              {/* FOTO */}
              <div
                className="
                  absolute
                  left-[5px]
                  top-[5px]
                  w-[268px]
                  h-[171px]
                  rounded-[14px]
                  overflow-hidden
                  z-0
                "
              >
                <img
                  src={frame218}
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
                  left-[5px]
                  top-[171px]
                  w-[268px]
                  bottom-[5px]
                  z-20
                  bg-[#EEDFAF]
                  rounded-b-[14px]
                  px-[8px]
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

              {/* RECTANGLE / PAPER SHAPE */}
              <img
                src={rectangle1}
                alt=""
                className="
                  absolute
                  left-[5px]
                  top-[145px]
                  z-10
                  w-[268px]
                  pointer-events-none
                "
              />

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
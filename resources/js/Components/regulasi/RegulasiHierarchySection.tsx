import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Search, Filter, Check } from 'lucide-react';
import { CountUp } from '@/Components/common/CountUp';
import hierarchyCardBg from '@/assets/regulation-hierarchy-card.webp';

interface HierarchyCardItem {
  id: string;
  slug: string;
  badge: string;
  title: string;
  description: string;
  count: number;
}

const defaultHierarchyData: HierarchyCardItem[] = [
  {
    id: 'uud',
    slug: 'uud',
    badge: 'Tingkat Tertinggi',
    title: 'UUD',
    description: 'Undang-Undang Dasar 1945',
    count: 612,
  },
  {
    id: 'tap-mpr',
    slug: 'tap-mpr',
    badge: 'Konstitusional',
    title: 'TAP MPR',
    description: 'Ketetapan Majelis Permusyawaratan Rakyat',
    count: 1200,
  },
  {
    id: 'uu-perpu',
    slug: 'undang-undang',
    badge: 'Primer',
    title: 'UU / PERPU',
    description: 'Peraturan Pemerintah Pengganti Undang-Undang',
    count: 2125,
  },
  {
    id: 'pp',
    slug: 'peraturan-pemerintah',
    badge: 'Pelaksana',
    title: 'PP',
    description: 'Peraturan Pemerintah',
    count: 9023,
  },
  {
    id: 'perpres',
    slug: 'peraturan-presiden',
    badge: 'Eksekutif',
    title: 'PERPRES',
    description: 'Peraturan Presiden',
    count: 322,
  },
  {
    id: 'perda',
    slug: 'peraturan-daerah',
    badge: 'Otonomi Daerah',
    title: 'PERDA',
    description: 'Peraturan Daerah',
    count: 8963,
  },
  {
    id: 'permen-perban',
    slug: 'permen-perban',
    badge: 'Sektoral',
    title: 'PERMEN & PERBAN',
    description: 'Peraturan Menteri & Peraturan Badan / Lembaga',
    count: 1245,
  },
  {
    id: 'putusan-mk-ma',
    slug: 'putusan-mk-ma',
    badge: 'Yurisprudensi',
    title: 'PUTUSAN MK & MA',
    description: 'Putusan Mahkamah Konstitusi & Putusan Mahkamah Agung',
    count: 896,
  },
];

interface RegulasiHierarchySectionProps {
  counts?: Record<string, number>;
  latestDates?: Record<string, string | null>;
}

export function RegulasiHierarchySection({ counts, latestDates }: RegulasiHierarchySectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'terbanyak' | 'paling_sedikit' | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCards = useMemo(() => {
    let list = defaultHierarchyData.map((item, originalIndex) => ({
      ...item,
      displayCount: counts?.[item.slug] ?? counts?.[item.id] ?? item.count,
      latestDate: latestDates?.[item.slug] ?? latestDates?.[item.id] ?? null,
      originalIndex,
    }));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.badge.toLowerCase().includes(query)
      );
    }

    if (sortOrder === 'terbanyak') {
      list.sort((a, b) => b.displayCount - a.displayCount);
    } else if (sortOrder === 'paling_sedikit') {
      list.sort((a, b) => a.displayCount - b.displayCount);
    } else {
      // Default (saat tidak ada di select/pilih): urutkan yang terakhir diperbaharui / ditambahkan
      list.sort((a, b) => {
        const timeA = a.latestDate ? new Date(a.latestDate).getTime() : 0;
        const timeB = b.latestDate ? new Date(b.latestDate).getTime() : 0;
        if (timeA !== timeB) {
          return timeB - timeA;
        }
        return a.originalIndex - b.originalIndex;
      });
    }

    return list;
  }, [searchQuery, sortOrder, counts, latestDates]);

  return (
    <section className="w-full my-12 sm:my-16">
      {/* ── Section Header & Search Input ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-[26px] font-bold text-neu-900 tracking-tight">
            Statistik Peraturan
          </h2>
          <p className="text-xs sm:text-md text-neu-600 mt-1 leading-relaxed">
            Akses ribuan hingga jutaan peraturan dan relasi dari UUD 1945, Undang Undang, Perppu, PP, Permen, Hingga Perda
          </p>
        </div>

        {/* Search Bar & Filter Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kategori hukum indonesia..."
              className="w-full bg-white border border-neu-100 hover:border-neu-300 rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-neu-300 focus:ring-2 focus:ring-neu-100 shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 text-neu-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white border rounded-2xl text-xs font-semibold transition-colors shrink-0 cursor-pointer shadow-2xs focus:outline-none ${
                sortOrder || isFilterOpen
                  ? 'border-neu-300 text-pr-900 bg-pr-50/40'
                  : 'border-neu-100 text-neu-700 hover:bg-neu-50 hover:border-neu-300'
              }`}
            >
              <Filter className={`w-3.5 h-3.5 ${sortOrder ? 'text-pr-900' : 'text-neu-500'}`} />
              <span>Filter</span>
            </button>

            {/* Dropdown Popover Filter Sesuai Screenshot */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-neu-100 rounded-xl shadow-lg p-2 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-100">
                {/* Option 1: Terbanyak */}
                <button
                  type="button"
                  onClick={() => {
                    setSortOrder((curr) => (curr === 'terbanyak' ? null : 'terbanyak'));
                  }}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neu-50 text-left transition-colors cursor-pointer w-full select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                      sortOrder === 'terbanyak'
                        ? 'bg-pr-900 border-pr-900 text-white'
                        : 'border-neu-300 bg-white'
                    }`}
                  >
                    {sortOrder === 'terbanyak' && <Check className="w-3 h-3 text-white stroke-[2.5]" />}
                  </div>
                  <span className="text-xs sm:text-[13px] text-neu-900 font-normal">Terbanyak</span>
                </button>

                {/* Option 2: Paling Sedikit */}
                <button
                  type="button"
                  onClick={() => {
                    setSortOrder((curr) => (curr === 'paling_sedikit' ? null : 'paling_sedikit'));
                  }}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neu-50 text-left transition-colors cursor-pointer w-full select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                      sortOrder === 'paling_sedikit'
                        ? 'bg-pr-900 border-pr-900 text-white'
                        : 'border-neu-300 bg-white'
                    }`}
                  >
                    {sortOrder === 'paling_sedikit' && <Check className="w-3 h-3 text-white stroke-[2.5]" />}
                  </div>
                  <span className="text-xs sm:text-[13px] text-neu-900 font-normal">Paling Sedikit</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 8 Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-[30px] gap-y-[28px]">
        {filteredCards.map((item) => {
          const displayCount = item.displayCount;

          return (
            <Link
              key={item.id}
              href={`/kategori/${item.slug || item.id}`}
              className="group relative w-full h-[280px] p-[5px] bg-white border border-neu-50 rounded-[20px] overflow-hidden shadow-2xs hover:shadow-md hover:border-pr-900/40 transition-all duration-300 block"
            >
              {/* Photo top rim */}
              <div className="absolute inset-x-[5px] top-[5px] h-[140px] rounded-t-[15px] overflow-hidden z-0">
                <img
                  src={hierarchyCardBg}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-[8px] right-[8px] z-10 px-[8px] py-[3px] rounded-[10px] bg-white text-pr-900 text-[9px] font-semibold leading-[12px] shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Body Card */}
              <div className="absolute inset-x-[5px] top-[111px] bottom-[5px] z-20 bg-pr-50 rounded-b-[15px] px-[16px] py-[16px] flex flex-col justify-between">
                <div className="relative z-30">
                  <h3 className="text-[13px] font-semibold text-pr-900 leading-[18px] group-hover:text-pr-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-[3px] text-[10px] font-normal text-neu-600 leading-[14px] line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-30 text-[22px] font-bold text-pr-900 leading-[130%]">
                  <CountUp end={displayCount} />
                </div>
              </div>

              {/* Folder tab SVG Notch */}
              <div className="absolute left-[5px] top-[85px] z-10 w-[140px] sm:w-[155px] h-[27px] pointer-events-none">
                <svg
                  width="140"
                  height="27"
                  viewBox="0 0 140 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-pr-50"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 27V11C0 4.92487 4.92487 0 11 0H105.167C109.856 0 114.029 2.97146 115.562 7.40178L119.438 18.5982C120.971 23.0285 125.144 26 129.833 26H140V27H0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default RegulasiHierarchySection;

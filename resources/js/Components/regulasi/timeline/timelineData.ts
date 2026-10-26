export interface RegulationItem {
  id: string;
  unique_id?: string;
  jenis: string; // e.g. "UU", "Perda", "PP", "Perpres", "Permen"
  nomor: string; // e.g. "UU No. 11 Th 2020"
  judul: string;
  subjek?: string; // e.g. "Perpajakan", "Tata Kelola"
  status: 'berlaku' | 'dicabut';
  tanggal: string; // e.g. "Kamis, 9 Mei 2026"
}

export interface DayGroup {
  tanggal: string; // e.g. "Kamis, 9 Mei 2026"
  regulations: RegulationItem[];
}

export interface WeekTimelineData {
  id: string;
  label: string; // "Minggu 1", "Minggu 2"
  subLabel: string; // "1-7 Mei", "8-14 Mei"
  rangeText: string; // "1 Mei - 7 Mei 2026"
  berlakuCount: number;
  dicabutCount: number;
  days: DayGroup[];
}

export interface MonthTimelineData {
  id: string;
  shortName: string; // "Jan", "Feb", ...
  fullName: string; // "Januari 2026"
  monthIndex: number; // 0..11
  year: number; // 2025 or 2026
  berlakuCount: number;
  dicabutCount: number;
  weeks: WeekTimelineData[];
}

export interface YearPeriodData {
  startYear: number;
  endYear: number;
  label: string; // e.g. "2025 - 2026"
  year1: {
    year: number;
    berlakuCount: number;
    dicabutCount: number;
    months: MonthTimelineData[];
  };
  year2: {
    year: number;
    berlakuCount: number;
    dicabutCount: number;
    months: MonthTimelineData[];
  };
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

const MONTH_FULL_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Helper untuk membuat rincian minggu dummy (Persis Screenshot Figma #2986:46104)
function createWeeksForMonth(year: number, mIdx: number, _berlaku?: number, _dicabut?: number): WeekTimelineData[] {
  const mName = MONTH_NAMES[mIdx];

  // Khusus bulan Mei (atau default template mingguan persis screenshot)
  return [
    {
      id: `${year}-${mIdx + 1}-w1`,
      label: 'Minggu 1',
      subLabel: `1-7 ${mName}`,
      rangeText: `1 ${mName} - 7 ${mName} ${year}`,
      berlakuCount: 4,
      dicabutCount: 8,
      days: [
        {
          tanggal: `Senin, 4 ${mName} ${year}`,
          regulations: [
            {
              id: `${year}-uu-1`,
              jenis: 'UU',
              nomor: `UU No. 1 Tahun ${year}`,
              judul: `Perubahan Ke Empat Undang Undang Dasar 1945`,
              subjek: 'Perpajakan',
              status: 'berlaku',
              tanggal: `Senin, 4 ${mName} ${year}`,
            },
          ],
        },
      ],
    },
    {
      id: `${year}-${mIdx + 1}-w2`,
      label: 'Minggu 2',
      subLabel: `8-14 ${mName}`,
      rangeText: `8 ${mName} - 14 ${mName} ${year}`,
      berlakuCount: 9,
      dicabutCount: 7,
      days: [
        {
          tanggal: `Kamis, 9 ${mName} ${year}`,
          regulations: [
            {
              id: `${year}-uu-2`,
              jenis: 'UU',
              nomor: `UU No. 12 Tahun ${year}`,
              judul: `Perubahan Ke Empat Undang Undang Dasar 1945`,
              subjek: 'Perpajakan',
              status: 'berlaku',
              tanggal: `Kamis, 9 ${mName} ${year}`,
            },
            {
              id: `${year}-perda-1`,
              jenis: 'Perda',
              nomor: `Perda No. 5 Tahun ${year}`,
              judul: `Peraturan Daerah Nomor 5 Tahun ${year} tentang Rencana Tata Ruang Wilayah Daerah Terpadu`,
              subjek: 'Perpajakan',
              status: 'berlaku',
              tanggal: `Kamis, 9 ${mName} ${year}`,
            },
            {
              id: `${year}-pp-1`,
              jenis: 'PP',
              nomor: `PP No. 18 Tahun ${year}`,
              judul: `Peraturan Pemerintah Nomor 18 Tahun ${year} tentang Penyelenggaraan Pelayanan Publik Terpadu`,
              subjek: 'Pelayanan Publik',
              status: 'berlaku',
              tanggal: `Kamis, 9 ${mName} ${year}`,
            },
          ],
        },
        {
          tanggal: `Kamis, 12 ${mName} ${year}`,
          regulations: [
            {
              id: `${year}-permen-1`,
              jenis: 'UU',
              nomor: `UU No. 8 Tahun ${year}`,
              judul: `Perubahan Ke Empat Undang Undang Dasar 1945`,
              subjek: 'Perpajakan',
              status: 'berlaku',
              tanggal: `Kamis, 12 ${mName} ${year}`,
            },
            {
              id: `${year}-permen-rev-1`,
              jenis: 'Permen',
              nomor: `Permen No. 3 Tahun ${year - 3}`,
              judul: `Peraturan Menteri tentang Pengelolaan Sistem Pelaporan Manual Terdahulu`,
              subjek: 'Transformasi Digital',
              status: 'dicabut',
              tanggal: `Kamis, 12 ${mName} ${year}`,
            },
          ],
        },
      ],
    },
    {
      id: `${year}-${mIdx + 1}-w3`,
      label: 'Minggu 3',
      subLabel: `15-22 ${mName}`,
      rangeText: `15 ${mName} - 22 ${mName} ${year}`,
      berlakuCount: 5,
      dicabutCount: 5,
      days: [
        {
          tanggal: `Senin, 18 ${mName} ${year}`,
          regulations: [
            {
              id: `${year}-perpres-1`,
              jenis: 'Perpres',
              nomor: `Perpres No. 19 Tahun ${year}`,
              judul: `Peraturan Presiden Nomor 19 Tahun ${year} tentang Rincian Anggaran Belanja Pemerintah`,
              status: 'berlaku',
              tanggal: `Senin, 18 ${mName} ${year}`,
            },
          ],
        },
      ],
    },
    {
      id: `${year}-${mIdx + 1}-w4`,
      label: 'Minggu 4',
      subLabel: `23 - 29 ${mName}`,
      rangeText: `23 ${mName} - 29 ${mName} ${year}`,
      berlakuCount: 7,
      dicabutCount: 9,
      days: [
        {
          tanggal: `Rabu, 27 ${mName} ${year}`,
          regulations: [
            {
              id: `${year}-uu-3`,
              jenis: 'UU',
              nomor: `UU No. 20 Tahun ${year}`,
              judul: `Undang-Undang Nomor 20 Tahun ${year} tentang Perlindungan Data Konsumen`,
              status: 'berlaku',
              tanggal: `Rabu, 27 ${mName} ${year}`,
            },
          ],
        },
      ],
    },
    {
      id: `${year}-${mIdx + 1}-w5`,
      label: 'Minggu 5',
      subLabel: `30- 31 ${mName}`,
      rangeText: `30 ${mName} - 31 ${mName} ${year}`,
      berlakuCount: 8,
      dicabutCount: 4,
      days: [],
    },
  ];
}

// ── Data Nilai Bulanan Tiap Tahun Dibuat Berbeda Agar Terlihat Jelas Saat di-Swipe ──

// 2025: Menggunakan baseline desain Figma (Mei tinggi berlaku, Agu tinggi dicabut)
const VALUES_2025 = [
  { b: 89, d: 29 }, // Jan
  { b: 40, d: 48 }, // Feb
  { b: 74, d: 34 }, // Mar
  { b: 24, d: 69 }, // Apr
  { b: 90, d: 10 }, // Mei
  { b: 50, d: 60 }, // Jun
  { b: 60, d: 50 }, // Jul
  { b: 10, d: 90 }, // Agu
  { b: 69, d: 24 }, // Sep
  { b: 34, d: 74 }, // Okt
  { b: 48, d: 40 }, // Nov
  { b: 29, d: 89 }, // Des
];

// 2026: Sesuai data aktual hanya sampai bulan 10 (Oktober); Nov (11) dan Des (12) kosong
const VALUES_2026 = [
  { b: 35, d: 18 }, // Jan
  { b: 55, d: 22 }, // Feb
  { b: 42, d: 65 }, // Mar
  { b: 78, d: 30 }, // Apr
  { b: 62, d: 45 }, // Mei
  { b: 85, d: 15 }, // Jun
  { b: 40, d: 70 }, // Jul
  { b: 68, d: 38 }, // Agu
  { b: 52, d: 58 }, // Sep
  { b: 75, d: 25 }, // Okt
  { b: 0, d: 0 },   // Nov (kosong belum ada data)
  { b: 0, d: 0 },   // Des (kosong belum ada data)
];

// 2023: Pola kuartal awal sangat aktif, kuartal akhir dominan pencabutan
const VALUES_2023 = [
  { b: 70, d: 15 }, // Jan
  { b: 82, d: 20 }, // Feb
  { b: 65, d: 40 }, // Mar
  { b: 50, d: 55 }, // Apr
  { b: 38, d: 72 }, // Mei
  { b: 45, d: 60 }, // Jun
  { b: 78, d: 28 }, // Jul
  { b: 85, d: 18 }, // Agu
  { b: 42, d: 68 }, // Sep
  { b: 25, d: 85 }, // Okt
  { b: 35, d: 75 }, // Nov
  { b: 20, d: 90 }, // Des
];

// 2024: Pola bergelombang seimbang
const VALUES_2024 = [
  { b: 48, d: 50 }, // Jan
  { b: 62, d: 35 }, // Feb
  { b: 80, d: 22 }, // Mar
  { b: 58, d: 44 }, // Apr
  { b: 72, d: 30 }, // Mei
  { b: 30, d: 82 }, // Jun
  { b: 45, d: 65 }, // Jul
  { b: 60, d: 40 }, // Agu
  { b: 88, d: 16 }, // Sep
  { b: 54, d: 52 }, // Okt
  { b: 66, d: 38 }, // Nov
  { b: 40, d: 70 }, // Des
];

const months2025: MonthTimelineData[] = VALUES_2025.map((val, idx) => ({
  id: `2025-${idx + 1}`,
  shortName: MONTH_NAMES[idx],
  fullName: `${MONTH_FULL_NAMES[idx]} 2025`,
  monthIndex: idx,
  year: 2025,
  berlakuCount: val.b,
  dicabutCount: val.d,
  weeks: createWeeksForMonth(2025, idx, val.b, val.d),
}));

const months2026: MonthTimelineData[] = VALUES_2026.map((val, idx) => ({
  id: `2026-${idx + 1}`,
  shortName: MONTH_NAMES[idx],
  fullName: `${MONTH_FULL_NAMES[idx]} 2026`,
  monthIndex: idx,
  year: 2026,
  berlakuCount: val.b,
  dicabutCount: val.d,
  weeks: idx >= 10 ? [] : createWeeksForMonth(2026, idx, val.b, val.d),
}));

const months2023: MonthTimelineData[] = VALUES_2023.map((val, idx) => ({
  id: `2023-${idx + 1}`,
  shortName: MONTH_NAMES[idx],
  fullName: `${MONTH_FULL_NAMES[idx]} 2023`,
  monthIndex: idx,
  year: 2023,
  berlakuCount: val.b,
  dicabutCount: val.d,
  weeks: createWeeksForMonth(2023, idx, val.b, val.d),
}));

const months2024: MonthTimelineData[] = VALUES_2024.map((val, idx) => ({
  id: `2024-${idx + 1}`,
  shortName: MONTH_NAMES[idx],
  fullName: `${MONTH_FULL_NAMES[idx]} 2024`,
  monthIndex: idx,
  year: 2024,
  berlakuCount: val.b,
  dicabutCount: val.d,
  weeks: createWeeksForMonth(2024, idx, val.b, val.d),
}));

export const TWO_YEAR_PERIODS: YearPeriodData[] = [
  {
    startYear: 2023,
    endYear: 2024,
    label: '2023 - 2024',
    year1: {
      year: 2023,
      berlakuCount: 635,
      dicabutCount: 606,
      months: months2023,
    },
    year2: {
      year: 2024,
      berlakuCount: 703,
      dicabutCount: 544,
      months: months2024,
    },
  },
  {
    startYear: 2025,
    endYear: 2026,
    label: '2025 - 2026',
    year1: {
      year: 2025,
      berlakuCount: 627,
      dicabutCount: 617,
      months: months2025,
    },
    year2: {
      year: 2026,
      berlakuCount: 592,
      dicabutCount: 386,
      months: months2026,
    },
  },
];

/**
 * Mengambil atau menghasilkan data bulan untuk tahun tertentu secara deterministik
 */
export function getMonthsForYear(year: number): MonthTimelineData[] {
  if (year === 2025) return months2025;
  if (year === 2026) return months2026;
  if (year === 2023) return months2023;
  if (year === 2024) return months2024;

  const values = MONTH_NAMES.map((_, idx) => {
    const seed = (year * 19 + (idx + 1) * 31) % 76;
    const b = Math.min(90, Math.max(16, 20 + seed));
    const d = Math.min(90, Math.max(12, 14 + ((year * 13 + (idx + 1) * 41) % 72)));
    return { b, d };
  });

  return values.map((val, idx) => ({
    id: `${year}-${idx + 1}`,
    shortName: MONTH_NAMES[idx],
    fullName: `${MONTH_FULL_NAMES[idx]} ${year}`,
    monthIndex: idx,
    year,
    berlakuCount: val.b,
    dicabutCount: val.d,
    weeks: createWeeksForMonth(year, idx, val.b, val.d),
  }));
}

/**
 * Menghasilkan periode komparasi 2 tahun dinamis berdasarkan 2 tahun yang dipilih pengguna
 */
export function getOrGenerateTwoYearPeriod(yearA: number, yearB: number): YearPeriodData {
  const y1 = Math.min(yearA, yearB);
  const y2 = Math.max(yearA, yearB);

  // Cek predefined
  const predefined = TWO_YEAR_PERIODS.find((p) => p.startYear === y1 && p.endYear === y2);
  if (predefined) return predefined;

  const m1 = getMonthsForYear(y1);
  const m2 = getMonthsForYear(y2);

  const b1 = m1.reduce((sum, m) => sum + m.berlakuCount, 0);
  const d1 = m1.reduce((sum, m) => sum + m.dicabutCount, 0);

  const b2 = m2.reduce((sum, m) => sum + m.berlakuCount, 0);
  const d2 = m2.reduce((sum, m) => sum + m.dicabutCount, 0);

  return {
    startYear: y1,
    endYear: y2,
    label: y1 === y2 ? `${y1}` : `${y1} - ${y2}`,
    year1: {
      year: y1,
      berlakuCount: b1,
      dicabutCount: d1,
      months: m1,
    },
    year2: {
      year: y2,
      berlakuCount: b2,
      dicabutCount: d2,
      months: m2,
    },
  };
}

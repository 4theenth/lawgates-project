// ─────────────────────────────────────────────
// Tipe
// ─────────────────────────────────────────────

export interface RegulationItem {
  id: string;
  unique_id?: string;
  jenis: string;
  nomor: string;
  judul: string;
  subjek?: string;
  status: 'berlaku' | 'dicabut';
  tanggal: string;
}

export interface DayGroup {
  tanggal: string;
  regulations: RegulationItem[];
}

export interface WeekTimelineData {
  id: string;
  label: string;
  subLabel: string;
  rangeText: string;
  berlakuCount: number;
  dicabutCount: number;
  days: DayGroup[];
}

export interface MonthTimelineData {
  id: string;
  shortName: string;
  fullName: string;
  monthIndex: number;
  year: number;
  /** Jumlah event "terbit" pada bulan ini. */
  berlakuCount: number;
  /** Jumlah event "dicabut" pada bulan ini. */
  dicabutCount: number;
  /**
   * Rincian mingguan. Kosong pada data agregat bulanan; diisi saat pengguna
   * memilih bulan dan `/api/timeline/events` untuk bulan itu sudah dimuat.
   */
  weeks: WeekTimelineData[];
}

export interface YearPeriodData {
  startYear: number;
  endYear: number;
  label: string;
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

/** Agregat bulanan yang diterima dari `/api/timeline/frequency`. */
export interface MonthlyFrequency {
  month: string; // "2025-05"
  monthIndex: number; // 0..11
  terbit: number;
  dicabut: number;
}

/** Event yang diterima dari `/api/timeline/events`. */
export interface TimelineEventRecord {
  id: number;
  regulation_id: number;
  unique_id: string | null;
  event_type: 'terbit' | 'dicabut';
  event_date: string; // "2025-05-09"
  regulation_type: string;
  instansi: string | null;
  subjek: string | null;
  lokasi_daerah: string | null;
}

// ─────────────────────────────────────────────
// Konstanta
// ─────────────────────────────────────────────

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

const MONTH_FULL_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// ─────────────────────────────────────────────
// Pemetaan event → bentuk tampilan
// ─────────────────────────────────────────────

/** "2025-05-09" → "Jumat, 9 Mei 2025" */
export function formatTanggalPanjang(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return `${DAY_NAMES[date.getUTCDay()]}, ${d} ${MONTH_FULL_NAMES[m - 1]} ${y}`;
}

/** Ubah satu event API jadi item yang bisa ditampilkan kartu peraturan. */
export function eventToRegulationItem(event: TimelineEventRecord, index: number): RegulationItem {
  const tahun = event.event_date.slice(0, 4);

  return {
    id: `${event.id}-${index}`,
    unique_id: event.unique_id ?? undefined,
    jenis: event.regulation_type,
    nomor: event.unique_id ?? `Tanpa nomor (${tahun})`,
    judul: event.unique_id ?? `Peraturan ${event.regulation_type} ${tahun}`,
    subjek: event.subjek ?? undefined,
    status: event.event_type === 'terbit' ? 'berlaku' : 'dicabut',
    tanggal: formatTanggalPanjang(event.event_date),
  };
}

/**
 * Kelompokkan event satu bulan menjadi minggu ke-1 sampai ke-n.
 *
 * Minggu tanpa event tetap dikembalikan dengan `days: []` supaya tinggi grafik
 * mingguan konsisten dan pengguna melihat bahwa minggu itu memang kosong, bukan
 * hilang dari daftar.
 */
export function buildWeeksForMonth(
  year: number,
  monthIndex: number,
  events: TimelineEventRecord[]
): WeekTimelineData[] {
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const weekCount = Math.ceil(daysInMonth / 7);
  const mName = MONTH_NAMES[monthIndex];

  const eventsByDay = new Map<number, TimelineEventRecord[]>();
  events
    .filter((e) => {
      const [y, m] = e.event_date.split('-').map(Number);
      return y === year && m === monthIndex + 1;
    })
    .forEach((e) => {
      const day = Number(e.event_date.slice(8, 10));
      const bucket = eventsByDay.get(day) ?? [];
      bucket.push(e);
      eventsByDay.set(day, bucket);
    });

  const weeks: WeekTimelineData[] = [];
  let offset = 0;

  for (let i = 0; i < weekCount; i++) {
    const startDay = i * 7 + 1;
    const endDay = Math.min(startDay + 6, daysInMonth);
    const days: DayGroup[] = [];
    let berlakuCount = 0;
    let dicabutCount = 0;

    for (let day = startDay; day <= endDay; day++) {
      const dayEvents = eventsByDay.get(day);
      if (!dayEvents || dayEvents.length === 0) continue;

      const iso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      dayEvents.forEach((e) => {
        if (e.event_type === 'terbit') berlakuCount++;
        else dicabutCount++;
      });

      days.push({
        tanggal: formatTanggalPanjang(iso),
        regulations: dayEvents.map((e, idx) => eventToRegulationItem(e, offset + idx)),
      });

      offset += dayEvents.length;
    }

    weeks.push({
      id: `${year}-${monthIndex + 1}-w${i + 1}`,
      label: `Minggu ${i + 1}`,
      subLabel: `${startDay}-${endDay} ${mName}`,
      rangeText: `${startDay} ${mName} - ${endDay} ${mName} ${year}`,
      berlakuCount,
      dicabutCount,
      days,
    });
  }

  return weeks;
}

// ─────────────────────────────────────────────
// Pembentukan periode dari respons API
// ─────────────────────────────────────────────

/** Susun 12 bulan dari agregat API; bulan yang tidak dikirim berarti nol. */
function monthsFromFrequency(year: number, frequency: MonthlyFrequency[]): MonthTimelineData[] {
  const byIndex = new Map(frequency.map((f) => [f.monthIndex, f]));

  return MONTH_NAMES.map((_, idx) => {
    const f = byIndex.get(idx);

    return {
      id: `${year}-${idx + 1}`,
      shortName: MONTH_NAMES[idx],
      fullName: `${MONTH_FULL_NAMES[idx]} ${year}`,
      monthIndex: idx,
      year,
      berlakuCount: f?.terbit ?? 0,
      dicabutCount: f?.dicabut ?? 0,
      weeks: [],
    };
  });
}

function sumMonths(months: MonthTimelineData[]) {
  return {
    berlakuCount: months.reduce((s, m) => s + m.berlakuCount, 0),
    dicabutCount: months.reduce((s, m) => s + m.dicabutCount, 0),
  };
}

/** Bangun `YearPeriodData` dari dua set agregat bulanan hasil API. */
export function buildYearPeriod(
  year1: number,
  year2: number,
  freq1: MonthlyFrequency[],
  freq2: MonthlyFrequency[]
): YearPeriodData {
  const m1 = monthsFromFrequency(year1, freq1);
  const m2 = monthsFromFrequency(year2, freq2);
  const s1 = sumMonths(m1);
  const s2 = sumMonths(m2);

  return {
    startYear: year1,
    endYear: year2,
    label: year1 === year2 ? `${year1}` : `${year1} - ${year2}`,
    year1: { year: year1, ...s1, months: m1 },
    year2: { year: year2, ...s2, months: m2 },
  };
}

/** Periode kosong untuk tahun yang belum punya data sama sekali. */
export function getEmptyYearPeriod(year1: number, year2: number): YearPeriodData {
  return buildYearPeriod(year1, year2, [], []);
}

/** Lampirkan rincian mingguan ke bulan yang cocok di dalam periode. */
export function attachWeeksToMonth(
  period: YearPeriodData,
  monthId: string,
  weeks: WeekTimelineData[]
): YearPeriodData {
  const applyTo = (yearBlock: YearPeriodData['year1']) => ({
    ...yearBlock,
    months: yearBlock.months.map((m) => (m.id === monthId ? { ...m, weeks } : m)),
  });

  return {
    ...period,
    year1: applyTo(period.year1),
    year2: applyTo(period.year2),
  };
}

export { MONTH_NAMES, MONTH_FULL_NAMES };

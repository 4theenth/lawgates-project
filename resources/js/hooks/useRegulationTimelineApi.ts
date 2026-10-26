import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  buildYearPeriod,
  getEmptyYearPeriod,
  MonthlyFrequency,
  YearPeriodData,
} from '@/Components/regulasi/timeline/timelineData';

// ─────────────────────────────────────────────
// Kontrak respons API (REG-04)
// ─────────────────────────────────────────────

interface FrequencyResponse {
  months: {
    month: string;
    year: number;
    month_index: number;
    terbit: number;
    dicabut: number;
    total: number;
  }[];
}

export interface TimelineFilters {
  jenis: string[];
  subjek: string[];
  lokasi: string[];
}

interface UseRegulationTimelineResult {
  period: YearPeriodData;
  isLoading: boolean;
  error: string | null;
  /** true kalau kedua tahun dalam periode tidak punya satu event pun. */
  isEmpty: boolean;
}

/**
 * Mengambil agregasi timeline dari `/api/timeline/*` untuk dua tahun sekaligus.
 *
 * Dua tahun dikirim sebagai dua permintaan terpisah, masing-masing selebar satu
 * tahun — jauh di bawah batas lima tahun per segmen, jadi `truncated` tidak
 * pernah menyala dan tidak perlu chunking di sisi klien.
 *
 * Nilai bulanan dan daftar peraturan diambil dari dua endpoint berbeda lalu
 * digabung di sini, supaya komponen tampilan tetap menerima satu bentuk data
 * (`YearPeriodData`) seperti sebelumnya.
 */
export function useRegulationTimeline(
  year1: number,
  year2: number,
  filters: TimelineFilters
): UseRegulationTimelineResult {
  const [frequencyByYear, setFrequencyByYear] = useState<Record<number, MonthlyFrequency[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter dikirim sebagai string supaya efek tidak jalan ulang hanya karena
  // array baru dengan isi yang sama.
  const filtersKey = useMemo(
    () =>
      JSON.stringify({
        jenis: [...filters.jenis].sort(),
        subjek: [...filters.subjek].sort(),
        lokasi: [...filters.lokasi].sort(),
      }),
    [filters.jenis, filters.subjek, filters.lokasi]
  );

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const parsed = JSON.parse(filtersKey) as TimelineFilters;

    const params = (year: number) => ({
      start_date: `${year}-01-01`,
      end_date: `${year}-12-31`,
      ...(parsed.jenis.length > 0 ? { regulation_type: parsed.jenis.join(',') } : {}),
      ...(parsed.subjek.length > 0 ? { subjek: parsed.subjek.join(',') } : {}),
      ...(parsed.lokasi.length > 0 ? { lokasi: parsed.lokasi.join(',') } : {}),
    });

    setIsLoading(true);
    setError(null);

    Promise.all([
      axios.get<FrequencyResponse>('/api/timeline/frequency', {
        params: params(year1),
        signal: controller.signal,
      }),
      axios.get<FrequencyResponse>('/api/timeline/frequency', {
        params: params(year2),
        signal: controller.signal,
      }),
    ])
      .then(([res1, res2]) => {
        if (cancelled) return;

        setFrequencyByYear({
          [year1]: res1.data.months.map((m) => ({
            month: m.month,
            monthIndex: m.month_index - 1,
            terbit: m.terbit,
            dicabut: m.dicabut,
          })),
          [year2]: res2.data.months.map((m) => ({
            month: m.month,
            monthIndex: m.month_index - 1,
            terbit: m.terbit,
            dicabut: m.dicabut,
          })),
        });
        setIsLoading(false);
      })
      .catch((err) => {
        if (cancelled || axios.isCancel(err)) return;
        console.error('Gagal memuat data timeline:', err);
        setError('Gagal memuat data timeline. Coba muat ulang halaman.');
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [year1, year2, filtersKey]);

  const period = useMemo(() => {
    const y1 = frequencyByYear[year1];
    const y2 = frequencyByYear[year2];

    if (!y1 || !y2) {
      return buildYearPeriod(year1, year2, [], []);
    }

    return buildYearPeriod(year1, year2, y1, y2);
  }, [year1, year2, frequencyByYear]);

  const isEmpty = period.year1.berlakuCount === 0
    && period.year1.dicabutCount === 0
    && period.year2.berlakuCount === 0
    && period.year2.dicabutCount === 0;

  return { period, isLoading, error, isEmpty };
}

export { getEmptyYearPeriod };

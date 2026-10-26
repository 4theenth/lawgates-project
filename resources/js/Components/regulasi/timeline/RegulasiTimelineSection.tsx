import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import {
  YearPeriodData,
  MonthTimelineData,
  buildWeeksForMonth,
  TimelineEventRecord,
} from './timelineData';
import { useRegulationTimeline } from '@/hooks/useRegulationTimelineApi';
import { TimelineFilterToolbar } from './TimelineFilterToolbar';
import { TimelineDivergingChart } from './TimelineDivergingChart';
import { TimelineLoadingBar } from './TimelineLoadingBar';
import { TimelineWeeklyAccordion } from './TimelineWeeklyAccordion';
import { TimelineEmptyState } from './TimelineEmptyState';

interface FilterReferences {
  kategori?: { id: string | number; nama: string }[];
  status?: { id: string | number; nama: string }[];
  tahun?: (string | number)[];
}

interface RegulasiTimelineSectionProps {
  filterReferences?: FilterReferences;
  className?: string;
}

/**
 * Rentang default: tahun berjalan dan tahun sebelumnya.
 *
 * Dihitung saat komponen dipasang, bukan saat modul dimuat, supaya nilainya
 * ikut berubah kalau tab dibiarkan terbuka melewati pergantian tahun.
 */
function defaultYearRange(): [number, number] {
  const currentYear = new Date().getFullYear();
  return [currentYear - 1, currentYear];
}

export function RegulasiTimelineSection({
  filterReferences,
  className = '',
}: RegulasiTimelineSectionProps) {
  const [yearRange, setYearRange] = useState<[number, number]>(defaultYearRange);

  const [selectedMonthId, setSelectedMonthId] = useState<string | null>(null);
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null);
  const [activeWeekStatus, setActiveWeekStatus] = useState<'berlaku' | 'dicabut'>('berlaku');

  // Filter seketika (multi-select array, kosong = semua)
  const [selectedJenis, setSelectedJenis] = useState<string[]>([]);
  const [selectedSubjek, setSelectedSubjek] = useState<string[]>([]);
  const [selectedLokasi, setSelectedLokasi] = useState<string[]>([]);

  // Data dari API — angka di grafik berasal langsung dari sini, tidak ada
  // penyesuaian buatan di sisi klien.
  const { period, isLoading, error } = useRegulationTimeline(
    yearRange[0],
    yearRange[1],
    { jenis: selectedJenis, subjek: selectedSubjek, lokasi: selectedLokasi }
  );

  const [weeksByMonthId, setWeeksByMonthId] = useState<Record<string, ReturnType<typeof buildWeeksForMonth>>>({});

  // Rincian peraturan per hari diambil saat bulan dipilih — endpoint agregat
  // bulanan tidak membawa daftar peraturannya.
  useEffect(() => {
    if (!selectedMonthId) return;

    const [yearStr, monthStr] = selectedMonthId.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);
    if (Number.isNaN(year) || Number.isNaN(month)) return;

    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const controller = new AbortController();

    axios
      .get<{ events: TimelineEventRecord[] }>('/api/timeline/events', {
        params: {
          start_date: `${year}-${String(month).padStart(2, '0')}-01`,
          end_date: `${year}-${String(month).padStart(2, '0')}-${lastDay}`,
          ...(selectedJenis.length > 0 ? { regulation_type: selectedJenis.join(',') } : {}),
          ...(selectedSubjek.length > 0 ? { subjek: selectedSubjek.join(',') } : {}),
          ...(selectedLokasi.length > 0 ? { lokasi: selectedLokasi.join(',') } : {}),
        },
        signal: controller.signal,
      })
      .then((res) => {
        const weeks = buildWeeksForMonth(year, month - 1, res.data.events ?? []);
        setWeeksByMonthId((prev) => ({ ...prev, [selectedMonthId]: weeks }));
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error('Gagal memuat rincian peraturan bulan:', err);
      });

    return () => controller.abort();
  }, [selectedMonthId, selectedJenis, selectedSubjek, selectedLokasi]);

  // Bulan terpilih selalu diambil dari periode terbaru supaya angkanya ikut
  // berubah saat filter berganti.
  const selectedMonth = useMemo<MonthTimelineData | null>(() => {
    if (!selectedMonthId) return null;

    const all = [...period.year1.months, ...period.year2.months];
    const found = all.find((m) => m.id === selectedMonthId);
    if (!found) return null;

    const weeks = weeksByMonthId[selectedMonthId];
    return weeks ? { ...found, weeks } : found;
  }, [selectedMonthId, period, weeksByMonthId]);

  const scrollToWeek = (weekId: string, attempts = 5) => {
    setTimeout(() => {
      const el = document.getElementById(`accordion-week-${weekId}`);
      if (el) {
        const headerBtn = el.querySelector('button') || el;
        const rect = headerBtn.getBoundingClientRect();
        const scrollY = window.scrollY ?? window.pageYOffset ?? 0;

        // Posisikan tombol header minggu di sekitar 36% tinggi layar
        // sehingga header dan rincian konten peraturan di bawahnya berada tepat di tengah viewport
        const viewportHeight = window.innerHeight;
        const targetTopInViewport = Math.max(90, Math.round(viewportHeight * 0.36));
        const targetScrollTop = scrollY + rect.top - targetTopInViewport;

        window.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth',
        });
      } else if (attempts > 0) {
        // Coba lagi dengan jeda singkat jika elemen belum selesai me-mount pada render berikutnya
        scrollToWeek(weekId, attempts - 1);
      }
    }, 60);
  };

  const handleSelectMonth = (month: MonthTimelineData) => {
    if (selectedMonthId === month.id) {
      setSelectedMonthId(null);
      setSelectedWeekId(null);
      setActiveWeekStatus('berlaku');
      return;
    }

    setSelectedMonthId(month.id);
    setSelectedWeekId(null);
    setActiveWeekStatus('berlaku');
  };

  const handleDeselectMonth = () => {
    setSelectedMonthId(null);
    setSelectedWeekId(null);
    setActiveWeekStatus('berlaku');
  };

  const handleSelectWeek = (weekId: string, status?: 'berlaku' | 'dicabut') => {
    setSelectedWeekId(weekId);
    if (status) {
      setActiveWeekStatus(status);
    }
    scrollToWeek(weekId);
  };

  const handleToggleWeek = (weekId: string) => {
    setSelectedWeekId((prev) => {
      const next = prev === weekId ? null : weekId;
      if (next) {
        scrollToWeek(next);
      }
      return next;
    });
  };

  const handleYearsCompareChange = (year1: number, year2: number) => {
    setYearRange([year1, year2]);
    setSelectedMonthId(null);
    setSelectedWeekId(null);
    setActiveWeekStatus('berlaku');
  };

  const handlePeriodChangeFromDropdown = (periodLabel: string) => {
    const parsed = periodLabel.split('-').map((s) => parseInt(s.trim(), 10));
    if (parsed.length === 2 && !Number.isNaN(parsed[0]) && !Number.isNaN(parsed[1])) {
      handleYearsCompareChange(parsed[0], parsed[1]);
    }
  };

  const handleResetFilter = () => {
    setYearRange(defaultYearRange());
    setSelectedJenis([]);
    setSelectedSubjek([]);
    setSelectedLokasi([]);
    setSelectedMonthId(null);
    setSelectedWeekId(null);
    setActiveWeekStatus('berlaku');
  };

  return (
    <section className={`w-full flex flex-col space-y-6 ${className}`}>
      {/* ── 1. Section Header ── */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl sm:text-[26px] font-semibold text-neu-900 tracking-tight leading-[1.3]">
          Timeline Peraturan
        </h2>
        <p className="text-sm text-neu-600 leading-relaxed max-w-3xl">
          Pantau rekam jejak penetapan dan penerbitan produk hukum terbaru secara kronologis.
        </p>
      </div>

      {/* ── 2. Filter Toolbar ── */}
      <TimelineFilterToolbar
        periodLabel={period.label}
        startYear={period.startYear}
        endYear={period.endYear}
        selectedJenis={selectedJenis}
        selectedSubjek={selectedSubjek}
        selectedLokasi={selectedLokasi}
        onYearsCompareChange={handleYearsCompareChange}
        onPeriodChange={handlePeriodChangeFromDropdown}
        onJenisChange={(val) => {
          setSelectedJenis(val);
          setSelectedMonthId(null);
          setSelectedWeekId(null);
          setActiveWeekStatus('berlaku');
        }}
        onSubjekChange={(val) => {
          setSelectedSubjek(val);
          setSelectedMonthId(null);
          setSelectedWeekId(null);
          setActiveWeekStatus('berlaku');
        }}
        onLokasiChange={(val) => {
          setSelectedLokasi(val);
          setSelectedMonthId(null);
          setSelectedWeekId(null);
          setActiveWeekStatus('berlaku');
        }}
        onResetFilter={handleResetFilter}
        jenisOptions={filterReferences?.kategori}
      />

      {/* ── 3. Legend ── */}
      <div className="flex items-center px-1">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-suc-900 inline-block" />
            <span className="text-xs sm:text-sm font-medium text-suc-900">Berlaku</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-dan-900 inline-block" />
            <span className="text-xs sm:text-sm font-medium text-dan-900">Dicabut</span>
          </div>
        </div>
      </div>

      {/* ── 4. Card Utama Timeline ── */}
      <div className="w-full bg-white rounded-[20px] border border-neu-50 p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        {/* Indikator Loading Progress Bar Elegan & Terlihat Jelas */}
        <TimelineLoadingBar isLoading={isLoading} />

        {error ? (
          <div className="py-16 text-center text-sm text-dan-900">{error}</div>
        ) : (
          <TimelineDivergingChart
            activePeriod={period}
            isLoading={isLoading}
            selectedMonth={selectedMonth}
            selectedWeekId={selectedWeekId}
            onSelectWeek={handleSelectWeek}
            onSelectMonth={handleSelectMonth}
            onDeselectMonth={handleDeselectMonth}
            onPeriodChange={(p: YearPeriodData) => {
              setYearRange([p.startYear, p.endYear]);
              setSelectedMonthId(null);
              setSelectedWeekId(null);
              setActiveWeekStatus('berlaku');
            }}
          />
        )}
      </div>

      {/* ── 5. Empty State vs Weekly Accordion ── */}
      <div>
        {selectedMonth ? (
          <TimelineWeeklyAccordion
            selectedMonth={selectedMonth}
            selectedWeekId={selectedWeekId}
            activeStatus={activeWeekStatus}
            onStatusChange={setActiveWeekStatus}
            onToggleWeek={handleToggleWeek}
            onDeselectMonth={handleDeselectMonth}
          />
        ) : (
          <TimelineEmptyState />
        )}
      </div>
    </section>
  );
}

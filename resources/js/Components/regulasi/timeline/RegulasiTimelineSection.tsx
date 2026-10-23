import React, { useState, useMemo } from 'react';
import {
  TWO_YEAR_PERIODS,
  YearPeriodData,
  MonthTimelineData,
  getOrGenerateTwoYearPeriod,
} from './timelineData';
import { TimelineFilterToolbar } from './TimelineFilterToolbar';
import { TimelineDivergingChart } from './TimelineDivergingChart';
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

export function RegulasiTimelineSection({
  filterReferences,
  className = '',
}: RegulasiTimelineSectionProps) {
  // Periode aktif 2-tahunan (default 2025 - 2026)
  const [activePeriod, setActivePeriod] = useState<YearPeriodData>(TWO_YEAR_PERIODS[1]);
  const [selectedMonth, setSelectedMonth] = useState<MonthTimelineData | null>(null);
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null);

  // State filter seketika (langsung aktif setiap kali dipilih)
  const [selectedJenis, setSelectedJenis] = useState<string>('Semua Jenis Peraturan');
  const [selectedSubjek, setSelectedSubjek] = useState<string>('Semua Subjek');
  const [selectedLokasi, setSelectedLokasi] = useState<string[]>([]);

  // Hitung data timeline dinamis berdasarkan filter yang aktif
  const displayPeriod = useMemo(() => {
    const isDefaultFilter =
      selectedJenis === 'Semua Jenis Peraturan' &&
      selectedSubjek === 'Semua Subjek' &&
      selectedLokasi.length === 0;

    if (isDefaultFilter) {
      return activePeriod;
    }

    // Hitung faktor penyesuaian jika filter diterapkan
    let factor = 1;
    if (selectedJenis !== 'Semua Jenis Peraturan') {
      factor *= 0.42;
    }
    if (selectedSubjek !== 'Semua Subjek') {
      factor *= 0.55;
    }
    if (selectedLokasi.length > 0) {
      factor *= Math.min(0.8, 0.15 + selectedLokasi.length * 0.12);
    }

    const adjustMonths = (months: MonthTimelineData[]) => {
      return months.map((m) => {
        // Bulan kosong (contoh: Nov & Des 2026) tetap 0
        if (m.berlakuCount === 0 && m.dicabutCount === 0) {
          return m;
        }
        const b = Math.max(1, Math.round(m.berlakuCount * factor));
        const d = Math.max(1, Math.round(m.dicabutCount * factor));
        return {
          ...m,
          berlakuCount: b,
          dicabutCount: d,
        };
      });
    };

    const m1 = adjustMonths(activePeriod.year1.months);
    const m2 = adjustMonths(activePeriod.year2.months);

    const b1 = m1.reduce((sum, m) => sum + m.berlakuCount, 0);
    const d1 = m1.reduce((sum, m) => sum + m.dicabutCount, 0);
    const b2 = m2.reduce((sum, m) => sum + m.berlakuCount, 0);
    const d2 = m2.reduce((sum, m) => sum + m.dicabutCount, 0);

    return {
      ...activePeriod,
      year1: {
        ...activePeriod.year1,
        berlakuCount: b1,
        dicabutCount: d1,
        months: m1,
      },
      year2: {
        ...activePeriod.year2,
        berlakuCount: b2,
        dicabutCount: d2,
        months: m2,
      },
    };
  }, [activePeriod, selectedJenis, selectedSubjek, selectedLokasi]);

  // Toggle selection: jika bulan yang sedang aktif diklik lagi, batalkan pilihan (deselect)
  const handleSelectMonth = (month: MonthTimelineData) => {
    if (selectedMonth?.id === month.id) {
      setSelectedMonth(null);
      setSelectedWeekId(null);
    } else {
      const allMonths = [...displayPeriod.year1.months, ...displayPeriod.year2.months];
      const matched = allMonths.find((m) => m.id === month.id) || month;
      setSelectedMonth(matched);
      setSelectedWeekId(null);
    }
  };

  const handleDeselectMonth = () => {
    setSelectedMonth(null);
    setSelectedWeekId(null);
  };

  const handleToggleWeek = (weekId: string) => {
    setSelectedWeekId((prev) => {
      const next = prev === weekId ? null : weekId;
      if (next) {
        setTimeout(() => {
          const el = document.getElementById(`accordion-week-${weekId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 50);
      }
      return next;
    });
  };

  const handleYearsCompareChange = (year1: number, year2: number) => {
    const period = getOrGenerateTwoYearPeriod(year1, year2);
    setActivePeriod(period);
    setSelectedMonth(null);
    setSelectedWeekId(null);
  };

  const handlePeriodChangeFromDropdown = (periodLabel: string) => {
    const parsed = periodLabel.split('-').map((s) => parseInt(s.trim(), 10));
    if (parsed.length === 2 && !isNaN(parsed[0]) && !isNaN(parsed[1])) {
      handleYearsCompareChange(parsed[0], parsed[1]);
      return;
    }
    const found = TWO_YEAR_PERIODS.find((p) => p.label === periodLabel);
    if (found) {
      setActivePeriod(found);
      setSelectedMonth(null);
      setSelectedWeekId(null);
    }
  };

  // Handler Reset Filter: Mengembalikan ke default 2025-2026, Semua Jenis, Semua Subjek, dan deselect bulan
  const handleResetFilter = () => {
    setActivePeriod(TWO_YEAR_PERIODS[1]); // default 2025 - 2026
    setSelectedJenis('Semua Jenis Peraturan');
    setSelectedSubjek('Semua Subjek');
    setSelectedLokasi([]);
    setSelectedMonth(null);
    setSelectedWeekId(null);
  };

  return (
    <section className={`w-full flex flex-col space-y-6 ${className}`}>
      {/* ── 1. Section Header: Judul & Deskripsi Sesuai Figma #2890:58616 ── */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl sm:text-[26px] font-semibold text-neu-900 tracking-tight leading-[1.3]">
          Timeline Peraturan
        </h2>
        <p className="text-sm text-neu-600 leading-relaxed max-w-3xl">
          Pantau rekam jejak penetapan dan penerbitan produk hukum terbaru secara kronologis.
        </p>
      </div>

      {/* ── 2. Filter Toolbar Kapsul dengan Filter Langsung Aktif & Tombol Reset Filter ── */}
      <TimelineFilterToolbar
        periodLabel={activePeriod.label}
        startYear={activePeriod.startYear}
        endYear={activePeriod.endYear}
        selectedJenis={selectedJenis}
        selectedSubjek={selectedSubjek}
        selectedLokasi={selectedLokasi}
        onYearsCompareChange={handleYearsCompareChange}
        onPeriodChange={handlePeriodChangeFromDropdown}
        onJenisChange={(val) => {
          setSelectedJenis(val);
          setSelectedMonth(null);
          setSelectedWeekId(null);
        }}
        onSubjekChange={(val) => {
          setSelectedSubjek(val);
          setSelectedMonth(null);
          setSelectedWeekId(null);
        }}
        onLokasiChange={(val) => {
          setSelectedLokasi(val);
          setSelectedMonth(null);
          setSelectedWeekId(null);
        }}
        onResetFilter={handleResetFilter}
        jenisOptions={filterReferences?.kategori}
      />

      {/* ── 3. Legend Row Sesuai Figma #2926:47416 ── */}
      <div className="flex items-center px-1">
        <div className="flex items-center gap-6">
          {/* Legend Berlaku (Segitiga Hijau Ke Atas) */}
          <div className="flex items-center gap-2">
            <span className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-suc-900 inline-block" />
            <span className="text-xs sm:text-sm font-medium text-neu-700">Berlaku</span>
          </div>

          {/* Legend Dicabut (Segitiga Merah Ke Bawah) */}
          <div className="flex items-center gap-2">
            <span className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-dan-900 inline-block" />
            <span className="text-xs sm:text-sm font-medium text-neu-700">Dicabut</span>
          </div>
        </div>
      </div>

      {/* ── 4. Card Utama Timeline Sesuai Figma #2891:45516 ── */}
      <div className="w-full bg-white rounded-[20px] border border-neu-50 p-6 sm:p-8 shadow-2xs">
        <TimelineDivergingChart
          activePeriod={displayPeriod}
          selectedMonth={selectedMonth}
          selectedWeekId={selectedWeekId}
          onSelectWeek={handleToggleWeek}
          onSelectMonth={handleSelectMonth}
          onDeselectMonth={handleDeselectMonth}
          onPeriodChange={(period) => {
            setActivePeriod(period);
            setSelectedMonth(null);
            setSelectedWeekId(null);
          }}
        />
      </div>

      {/* ── 5. Bagian Tabel Bawah: Empty State vs Weekly Accordion Sesuai Figma #3021:46181 & #3124:56240 ── */}
      <div>
        {selectedMonth ? (
          /* Tampilan Tabel Mingguan saat bulan telah dipilih */
          <TimelineWeeklyAccordion
            selectedMonth={selectedMonth}
            selectedWeekId={selectedWeekId}
            selectedJenis={selectedJenis}
            selectedSubjek={selectedSubjek}
            selectedLokasi={selectedLokasi}
            onToggleWeek={handleToggleWeek}
            onDeselectMonth={handleDeselectMonth}
          />
        ) : (
          /* Tampilan Garis Putus-putus saat belum ada bulan yang dipilih */
          <TimelineEmptyState />
        )}
      </div>
    </section>
  );
}

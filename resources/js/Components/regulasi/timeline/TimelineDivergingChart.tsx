import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, ArrowLeft } from 'lucide-react';
import { MonthTimelineData, TWO_YEAR_PERIODS, YearPeriodData, getOrGenerateTwoYearPeriod } from './timelineData';
import { TimelineBarColumn, TimelineMonthTooltip } from './TimelineBarColumn';

interface TimelineDivergingChartProps {
  activePeriod?: YearPeriodData;
  selectedMonth: MonthTimelineData | null;
  selectedWeekId?: string | null;
  onSelectWeek?: (weekId: string) => void;
  onSelectMonth: (month: MonthTimelineData) => void;
  onDeselectMonth: () => void;
  onPeriodChange?: (period: YearPeriodData) => void;
  className?: string;
}

export function TimelineDivergingChart({
  activePeriod,
  selectedMonth,
  selectedWeekId,
  onSelectWeek,
  onSelectMonth,
  onDeselectMonth,
  onPeriodChange,
  className = '',
}: TimelineDivergingChartProps) {
  // Periode 2-Tahunan: Gunakan activePeriod langsung jika diberikan
  const [internalPeriodIndex, setInternalPeriodIndex] = useState<number>(1);

  const currentPeriod = activePeriod || TWO_YEAR_PERIODS[internalPeriodIndex] || TWO_YEAR_PERIODS[1];

  // Hover state (default null jika belum ada kursor yang mengarah ke chart)
  const [hoveredMonthId, setHoveredMonthId] = useState<string | null>(null);

  // State minggu aktif & hover di tampilan mingguan
  const [activeWeekIdx, setActiveWeekIdx] = useState<number | null>(null);
  const [hoveredWeekIdx, setHoveredWeekIdx] = useState<number | null>(null);

  // Reset minggu aktif saat berpindah bulan atau pertama masuk ke tampilan mingguan
  useEffect(() => {
    setActiveWeekIdx(null);
    setHoveredWeekIdx(null);
  }, [selectedMonth?.id]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Gesture Swipe & Drag Refs
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const mouseStartXRef = useRef<number | null>(null);
  const hasDraggedRef = useRef<boolean>(false);
  const wheelCooldownRef = useRef<boolean>(false);

  // Apakah periode tahun berurutan (misal 2025 - 2026, 2023 - 2024, 2020 - 2021)
  const isConsecutive = Math.abs(currentPeriod.year2.year - currentPeriod.year1.year) === 1;

  // Status navigasi:
  // - Jika custom non-consecutive: selalu aktif untuk kembali ke default (2025 - 2026)
  // - Jika consecutive: next hanya sampai maksimal 2026, prev sampai tahun 2000
  const canGoNext = !isConsecutive ? true : currentPeriod.year2.year < 2026;
  const canGoPrev = !isConsecutive ? true : currentPeriod.year1.year > 2000;

  const handlePrevPeriod = () => {
    if (!isConsecutive) {
      // Custom non-consecutive: kembali ke default 2025 - 2026
      const defaultPeriod = TWO_YEAR_PERIODS[1];
      setInternalPeriodIndex(1);
      setHoveredMonthId(null);
      if (onPeriodChange) onPeriodChange(defaultPeriod);
      return;
    }

    if (canGoPrev) {
      // Pindah bergeser 1 tahun (contoh: 2022-2023 -> 2021-2022)
      const prevStart = currentPeriod.year1.year - 1;
      const prevEnd = currentPeriod.year2.year - 1;
      const newPeriod = getOrGenerateTwoYearPeriod(prevStart, prevEnd);
      setHoveredMonthId(null);
      if (onPeriodChange) onPeriodChange(newPeriod);
    }
  };

  const handleNextPeriod = () => {
    if (!isConsecutive) {
      // Custom non-consecutive: kembali ke default 2025 - 2026
      const defaultPeriod = TWO_YEAR_PERIODS[1];
      setInternalPeriodIndex(1);
      setHoveredMonthId(null);
      if (onPeriodChange) onPeriodChange(defaultPeriod);
      return;
    }

    if (canGoNext) {
      // Pindah bergeser 1 tahun (contoh: 2022-2023 -> 2023-2024, maks tahun 2026)
      const nextStart = currentPeriod.year1.year + 1;
      const nextEnd = currentPeriod.year2.year + 1;
      if (nextEnd <= 2026) {
        const newPeriod = getOrGenerateTwoYearPeriod(nextStart, nextEnd);
        setHoveredMonthId(null);
        if (onPeriodChange) onPeriodChange(newPeriod);
      }
    }
  };

  // ── Touch Swipe Handlers (Mobile / Tablet) ──
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Pastikan gesekan dominan horizontal dan melewati threshold 40px
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swipe ke kiri -> Next period (maju 1 tahun)
        handleNextPeriod();
      } else {
        // Swipe ke kanan -> Prev period (mundur 1 tahun)
        handlePrevPeriod();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // ── Mouse Drag / Swipe Handlers (Desktop) ──
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isMouseDownRef.current = true;
    mouseStartXRef.current = e.clientX;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || mouseStartXRef.current === null) return;
    if (Math.abs(e.clientX - mouseStartXRef.current) > 8) {
      hasDraggedRef.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMouseDownRef.current && mouseStartXRef.current !== null) {
      const deltaX = e.clientX - mouseStartXRef.current;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          handleNextPeriod();
        } else {
          handlePrevPeriod();
        }
      }
    }
    isMouseDownRef.current = false;
    mouseStartXRef.current = null;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 60);
  };

  // ── Trackpad Horizontal Wheel Handler ──
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelCooldownRef.current) return;
    if (Math.abs(e.deltaX) > 30 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      wheelCooldownRef.current = true;
      if (e.deltaX > 0) {
        handleNextPeriod();
      } else {
        handlePrevPeriod();
      }
      setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 400);
    }
  };

  // Nilai maksimum untuk menghitung proporsi bar (skala 90 sesuai Figma #2891:45516)
  const MAX_BAR_VALUE = 90;
  const BAR_MAX_HEIGHT_PX = 134;
  const BAR_MIN_HEIGHT_PX = 14;

  const calculateTopHeight = (val: number) => {
    if (val <= 0) return 0;
    return Math.max(BAR_MIN_HEIGHT_PX, Math.round((val / MAX_BAR_VALUE) * BAR_MAX_HEIGHT_PX));
  };

  const calculateBottomHeight = (val: number) => {
    if (val <= 0) return 0;
    return Math.max(BAR_MIN_HEIGHT_PX, Math.round((val / MAX_BAR_VALUE) * BAR_MAX_HEIGHT_PX));
  };

  // Proporsi tinggi bar khusus mingguan (Sesuai Persis Figma Node #2986:46104: 64px, 124px, 88px, 117px, 125px)
  const getWeeklyTopBarHeight = (count: number) => {
    if (count === 4) return 64;
    if (count === 5) return 88;
    if (count === 7) return 117;
    if (count === 8) return 125;
    if (count === 9) return 124;
    return Math.max(24, Math.round((count / 9) * 125));
  };

  const getWeeklyBottomBarHeight = (count: number) => {
    if (count === 4) return 64;
    if (count === 5) return 88;
    if (count === 7) return 117;
    if (count === 8) return 125;
    if (count === 9) return 124;
    return Math.max(24, Math.round((count / 9) * 125));
  };

  // Penyesuaian posisi horizontal tooltip agar di bulan tepi kiri (Jan) dan kanan (Des) tidak terpotong
  const getTooltipAlignment = (mIdx: number) => {
    if (mIdx === 0) {
      return {
        wrapper: 'left-0 translate-x-0',
        arrow: 'left-3 sm:left-4',
      };
    }
    if (mIdx === 1) {
      return {
        wrapper: '-left-3 translate-x-0',
        arrow: 'left-5 sm:left-6',
      };
    }
    if (mIdx === 11) {
      return {
        wrapper: 'right-0 translate-x-0',
        arrow: 'right-3 sm:right-4',
      };
    }
    if (mIdx === 10) {
      return {
        wrapper: '-right-3 translate-x-0',
        arrow: 'right-5 sm:right-6',
      };
    }
    return {
      wrapper: 'left-1/2 -translate-x-1/2',
      arrow: 'left-1/2 -translate-x-1/2',
    };
  };

  return (
    <div className={`w-full flex flex-col relative ${className}`}>
      {/* ── Outer Track Container dengan Tombol Navigasi ── */}
      <div className="relative w-full">
        {/* ════════════════════════════════════════════════════════════════
            MODE A: TAMPILAN PER DUA TAHUN
            - Desktop: 2 Tahun Berdampingan (24 Bulan)
            - Mobile: 1 Tahun per View (12 Bulan Jan-Des) Sesuai Figma #3108:69614
            ════════════════════════════════════════════════════════════════ */}
        {!selectedMonth ? (
          <div className="w-full flex flex-col">
            {/* 1. Header Desktop (>= lg: 2 Tahun Berdampingan) */}
            <div className="hidden lg:flex h-[52px] px-8 sm:px-12 items-center">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                {/* Kolom Tahun 1 */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-pr-900 tracking-tight">
                    {currentPeriod.year1.year}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm text-neu-800">
                    <span className="font-normal">
                      {currentPeriod.year1.berlakuCount} Berlaku
                    </span>
                    <span className="text-neu-400">•</span>
                    <span className="font-normal">
                      {currentPeriod.year1.dicabutCount} Dicabut
                    </span>
                  </div>
                </div>

                {/* Kolom Tahun 2 */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-pr-900 tracking-tight">
                    {currentPeriod.year2.year}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm text-neu-800">
                    <span className="font-normal">
                      {currentPeriod.year2.berlakuCount} Berlaku
                    </span>
                    <span className="text-neu-400">•</span>
                    <span className="font-normal">
                      {currentPeriod.year2.dicabutCount} Dicabut
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. Header Mobile (< lg): Tampilan Periode 2 Tahun */}
            <div className="flex lg:hidden px-3 sm:px-4 pt-3 pb-2.5 items-center justify-between border-b border-neu-100">
              <span className="text-base font-bold text-pr-900 tracking-tight">
                {currentPeriod.label}
              </span>

              {/* Tombol Navigasi Periode Tahun Mobile (< dan >) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevPeriod}
                  disabled={!canGoPrev}
                  className={`w-7 h-7 rounded-lg border border-neu-200 bg-white flex items-center justify-center transition-colors shadow-2xs ${
                    !canGoPrev
                      ? 'opacity-30 cursor-not-allowed'
                      : 'text-neu-700 hover:text-pr-900 hover:bg-neutral-50 cursor-pointer active:bg-neutral-100'
                  }`}
                  title="Tahun Sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPeriod}
                  disabled={!canGoNext}
                  className={`w-7 h-7 rounded-lg border border-neu-200 bg-white flex items-center justify-center transition-colors shadow-2xs ${
                    !canGoNext
                      ? 'opacity-30 cursor-not-allowed'
                      : 'text-neu-700 hover:text-pr-900 hover:bg-neutral-50 cursor-pointer active:bg-neutral-100'
                  }`}
                  title="Tahun Berikutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* 2. Scrollable Chart Area (Swipeable / Draggable) */}
            <div
              ref={scrollContainerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
              onMouseLeave={() => {
                setHoveredMonthId(null);
                if (isMouseDownRef.current) {
                  isMouseDownRef.current = false;
                  mouseStartXRef.current = null;
                  setTimeout(() => {
                    hasDraggedRef.current = false;
                  }, 60);
                }
              }}
              className="w-full overflow-x-auto no-scrollbar relative select-none cursor-grab active:cursor-grabbing"
            >
              {/* ══════════════════════════════════════════════════════════════
                  A. TAMPILAN DESKTOP (>= lg): 2 TAHUN SIDE-BY-SIDE (1040px)
                  ══════════════════════════════════════════════════════════════ */}
              <div className="hidden lg:block min-w-[1040px] w-full relative px-8 sm:px-12 pt-2 pb-6">
                {/* ── Garis Putus-putus Pemisah Kedua Tahun di Tengah ── */}
                <div className="absolute top-0 bottom-8 left-1/2 w-[1px] border-r border-dashed border-neu-300 pointer-events-none z-0" />

                {/* ── Baris Nama Bulan Tepat di Bawah Tahun (Jan s/d Des) ── */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-[60px] relative z-10 h-[24px]">
                  {/* Bulan Tahun 1 */}
                  <div className="grid grid-cols-12 gap-0 text-center h-[24px] flex items-center">
                    {currentPeriod.year1.months.map((m) => (
                      <span
                        key={m.id}
                        className="text-[13px] font-normal text-neu-700 block truncate leading-[24px]"
                      >
                        {m.shortName}
                      </span>
                    ))}
                  </div>

                  {/* Bulan Tahun 2 */}
                  <div className="grid grid-cols-12 gap-0 text-center h-[24px] flex items-center">
                    {currentPeriod.year2.months.map((m) => (
                      <span
                        key={m.id}
                        className="text-[13px] font-normal text-neu-700 block truncate leading-[24px]"
                      >
                        {m.shortName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── 3. Sumbu Tengah, Bar Atas & Bar Bawah ── */}
                <div className="relative w-full h-[326px]">
                  {/* GARIS TENGAH HORIZONTAL UTAMA (SELURUS DENGAN BULAT-BULAT & TOMBOL) */}
                  <div className="absolute top-[163px] -translate-y-1/2 left-0 right-0 h-[2px] bg-pr-900 z-10" />

                  {/* TOMBOL KIRI (SEJAJAR PERSIS DENGAN GARIS TENGAH) */}
                  <button
                    type="button"
                    onClick={handlePrevPeriod}
                    disabled={!canGoPrev}
                    title={
                      !isConsecutive
                        ? 'Kembali ke default (2025 - 2026)'
                        : canGoPrev
                        ? 'Lihat 2 tahun sebelumnya'
                        : 'Sudah periode paling awal'
                    }
                    className={`absolute -left-8 sm:-left-10 top-[163px] -translate-y-1/2 z-30 w-9 h-9 rounded-xl border border-neu-200 bg-white shadow-2xs flex items-center justify-center transition-all ${
                      canGoPrev
                        ? 'text-neu-700 hover:text-pr-900 hover:border-neu-400 cursor-pointer active:scale-95'
                        : 'text-neu-300 opacity-30 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                  </button>

                  {/* TOMBOL KANAN (SEJAJAR PERSIS DENGAN GARIS TENGAH, DISABLED PADA 2026) */}
                  <button
                    type="button"
                    onClick={handleNextPeriod}
                    disabled={!canGoNext}
                    title={
                      !isConsecutive
                        ? 'Kembali ke default (2025 - 2026)'
                        : canGoNext
                        ? 'Lihat 2 tahun berikutnya'
                        : 'Periode terakhir (2026) - Tidak ada tahun setelahnya'
                    }
                    className={`absolute -right-8 sm:-right-10 top-[163px] -translate-y-1/2 z-30 w-9 h-9 rounded-xl border border-neu-200 bg-white shadow-2xs flex items-center justify-center transition-all ${
                      canGoNext
                        ? 'text-neu-700 hover:text-pr-900 hover:border-neu-400 cursor-pointer active:scale-95'
                        : 'text-neu-300 opacity-25 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                  </button>

                  {/* GRID 2 TAHUN (24 BULAN) - Jarak tengah rapat wajar sesuai Figma */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-20">
                    {/* TAHUN 1 (12 Bulan) */}
                    <div className="grid grid-cols-12 gap-0">
                      {currentPeriod.year1.months.map((month) => (
                        <TimelineBarColumn
                          key={month.id}
                          topCount={month.berlakuCount}
                          bottomCount={month.dicabutCount}
                          topHeight={calculateTopHeight(month.berlakuCount)}
                          bottomHeight={calculateBottomHeight(month.dicabutCount)}
                          barWidthClass="w-[20px]"
                          isHovered={hoveredMonthId === month.id}
                          onMouseEnter={() => setHoveredMonthId(month.id)}
                          onMouseLeave={() => setHoveredMonthId(null)}
                          onClick={() => {
                            if (!hasDraggedRef.current && (month.berlakuCount > 0 || month.dicabutCount > 0)) {
                              onSelectMonth(month);
                            }
                          }}
                          tooltip={
                            hoveredMonthId === month.id && (month.berlakuCount > 0 || month.dicabutCount > 0) ? (
                              <TimelineMonthTooltip
                                fullName={month.fullName}
                                berlakuCount={month.berlakuCount}
                                dicabutCount={month.dicabutCount}
                                alignment={getTooltipAlignment(month.monthIndex)}
                              />
                            ) : null
                          }
                        />
                      ))}
                    </div>

                    {/* TAHUN 2 (12 Bulan) */}
                    <div className="grid grid-cols-12 gap-0">
                      {currentPeriod.year2.months.map((month) => (
                        <TimelineBarColumn
                          key={month.id}
                          topCount={month.berlakuCount}
                          bottomCount={month.dicabutCount}
                          topHeight={calculateTopHeight(month.berlakuCount)}
                          bottomHeight={calculateBottomHeight(month.dicabutCount)}
                          barWidthClass="w-[20px]"
                          isHovered={hoveredMonthId === month.id}
                          onMouseEnter={() => setHoveredMonthId(month.id)}
                          onMouseLeave={() => setHoveredMonthId(null)}
                          onClick={() => {
                            if (!hasDraggedRef.current && (month.berlakuCount > 0 || month.dicabutCount > 0)) {
                              onSelectMonth(month);
                            }
                          }}
                          tooltip={
                            hoveredMonthId === month.id && (month.berlakuCount > 0 || month.dicabutCount > 0) ? (
                              <TimelineMonthTooltip
                                fullName={month.fullName}
                                berlakuCount={month.berlakuCount}
                                dicabutCount={month.dicabutCount}
                                alignment={getTooltipAlignment(month.monthIndex)}
                              />
                            ) : null
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Text Petunjuk di Kiri Bawah (Sesuai Persis Screenshot Figma) */}
                <div className="mt-4 pt-3 flex items-center text-[12px] text-neu-600">
                  <span>Geser untuk melihat dan klik untuk detail</span>
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════════
                  B. TAMPILAN MOBILE (< lg): 2 TAHUN ATAS-BAWAH (VERTICAL STACK)
                  Menampilkan kedua tahun secara bersamaan dalam satu layar
                  agar pengguna dapat membandingkan secara langsung
                  ══════════════════════════════════════════════════════════════ */}
              <div className="block lg:hidden w-full relative px-2 sm:px-4 pt-3 pb-6 space-y-8">
                {/* ─── BLOK TAHUN 1 (ATAS) ─── */}
                <div className="w-full flex flex-col">
                  {/* Header Sub-Tahun 1 */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neu-100/80">
                    <span className="text-xl font-bold text-pr-900 tracking-tight">
                      {currentPeriod.year1.year}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-neu-700">
                      <span className="font-medium text-suc-900">{currentPeriod.year1.berlakuCount} Berlaku</span>
                      <span className="text-neu-300">•</span>
                      <span className="font-medium text-dan-900">{currentPeriod.year1.dicabutCount} Dicabut</span>
                    </div>
                  </div>

                  {/* Baris Nama Bulan Jan s/d Des Tahun 1 */}
                  <div className="grid grid-cols-12 gap-0 text-center mb-[60px] relative z-10 h-[24px] flex items-center">
                    {currentPeriod.year1.months.map((m) => (
                      <span
                        key={m.id}
                        className="text-[11px] font-normal text-neu-700 block truncate leading-[24px]"
                      >
                        {m.shortName}
                      </span>
                    ))}
                  </div>

                  {/* Sumbu Tengah & Bar Chart Tahun 1 */}
                  <div className="relative w-full h-[326px]">
                    <div className="absolute top-[163px] -translate-y-1/2 left-0 right-0 h-[2px] bg-pr-900 z-10" />

                    <div className="grid grid-cols-12 gap-0 relative z-20">
                      {currentPeriod.year1.months.map((month) => (
                        <TimelineBarColumn
                          key={month.id}
                          topCount={month.berlakuCount}
                          bottomCount={month.dicabutCount}
                          topHeight={calculateTopHeight(month.berlakuCount)}
                          bottomHeight={calculateBottomHeight(month.dicabutCount)}
                          barWidthClass="w-[11px] sm:w-[13px]"
                          isHovered={hoveredMonthId === month.id}
                          onMouseEnter={() => setHoveredMonthId(month.id)}
                          onMouseLeave={() => setHoveredMonthId(null)}
                          onClick={() => {
                            if (!hasDraggedRef.current && (month.berlakuCount > 0 || month.dicabutCount > 0)) {
                              onSelectMonth(month);
                            }
                          }}
                          tooltip={
                            hoveredMonthId === month.id && (month.berlakuCount > 0 || month.dicabutCount > 0) ? (
                              <TimelineMonthTooltip
                                fullName={month.fullName}
                                berlakuCount={month.berlakuCount}
                                dicabutCount={month.dicabutCount}
                                alignment={getTooltipAlignment(month.monthIndex)}
                              />
                            ) : null
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── PEMISAH (DIVIDER) ─── */}
                <div className="w-full border-t border-dashed border-neu-200 my-4" />

                {/* ─── BLOK TAHUN 2 (BAWAH) ─── */}
                <div className="w-full flex flex-col">
                  {/* Header Sub-Tahun 2 */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neu-100/80">
                    <span className="text-xl font-bold text-pr-900 tracking-tight">
                      {currentPeriod.year2.year}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-neu-700">
                      <span className="font-medium text-suc-900">{currentPeriod.year2.berlakuCount} Berlaku</span>
                      <span className="text-neu-300">•</span>
                      <span className="font-medium text-dan-900">{currentPeriod.year2.dicabutCount} Dicabut</span>
                    </div>
                  </div>

                  {/* Baris Nama Bulan Jan s/d Des Tahun 2 */}
                  <div className="grid grid-cols-12 gap-0 text-center mb-[60px] relative z-10 h-[24px] flex items-center">
                    {currentPeriod.year2.months.map((m) => (
                      <span
                        key={m.id}
                        className="text-[11px] font-normal text-neu-700 block truncate leading-[24px]"
                      >
                        {m.shortName}
                      </span>
                    ))}
                  </div>

                  {/* Sumbu Tengah & Bar Chart Tahun 2 */}
                  <div className="relative w-full h-[326px]">
                    <div className="absolute top-[163px] -translate-y-1/2 left-0 right-0 h-[2px] bg-pr-900 z-10" />

                    <div className="grid grid-cols-12 gap-0 relative z-20">
                      {currentPeriod.year2.months.map((month) => (
                        <TimelineBarColumn
                          key={month.id}
                          topCount={month.berlakuCount}
                          bottomCount={month.dicabutCount}
                          topHeight={calculateTopHeight(month.berlakuCount)}
                          bottomHeight={calculateBottomHeight(month.dicabutCount)}
                          barWidthClass="w-[11px] sm:w-[13px]"
                          isHovered={hoveredMonthId === month.id}
                          onMouseEnter={() => setHoveredMonthId(month.id)}
                          onMouseLeave={() => setHoveredMonthId(null)}
                          onClick={() => {
                            if (!hasDraggedRef.current && (month.berlakuCount > 0 || month.dicabutCount > 0)) {
                              onSelectMonth(month);
                            }
                          }}
                          tooltip={
                            hoveredMonthId === month.id && (month.berlakuCount > 0 || month.dicabutCount > 0) ? (
                              <TimelineMonthTooltip
                                fullName={month.fullName}
                                berlakuCount={month.berlakuCount}
                                dicabutCount={month.dicabutCount}
                                alignment={getTooltipAlignment(month.monthIndex)}
                              />
                            ) : null
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Petunjuk Swipe di Bawah */}
                <div className="pt-3 flex items-center justify-between text-[11px] text-neu-600 border-t border-neu-100">
                  <span>Geser layar atau gunakan tombol navigasi di atas untuk berpindah tahun</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ════════════════════════════════════════════════════════════════
             MODE B: RINCIAN MINGGUAN (Sesuai Persis Screenshot Figma #2986:46104)
             Ukuran frame, padding, dan struktur selaras 100% dengan Mode A
             ════════════════════════════════════════════════════════════════ */
          <div className="w-full flex flex-col">
            {/* 1. Header Card Jejak Perubahan Hukum: Responsive untuk mobile & desktop */}
            <div className="min-h-[52px] px-3 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 sm:pb-0 border-b border-neu-100/80 sm:border-b-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {/* Tombol Kembali / Back ke tampilan 2 tahun */}
                <button
                  type="button"
                  onClick={onDeselectMonth}
                  title="Kembali ke tampilan 2 tahun"
                  className="w-8 h-8 rounded-lg border border-neu-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neu-700 hover:text-pr-900 transition-colors shadow-2xs cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2]" />
                </button>

                {/* Judul & Status */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-base font-semibold text-pr-900 tracking-tight leading-tight truncate">
                    Jejak perubahan hukum
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neu-700 font-normal leading-4 mt-0.5">
                    <span className="font-medium text-suc-900">{selectedMonth.berlakuCount} Berlaku</span>
                    <span className="text-neu-300">•</span>
                    <span className="font-medium text-dan-900">{selectedMonth.dicabutCount} Dicabut</span>
                  </div>
                </div>
              </div>

              {/* Blok Kalender Bulan */}
              <button
                type="button"
                onClick={onDeselectMonth}
                title="Klik untuk kembali ke tampilan 2 tahun"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-[6px] bg-pr-50 hover:bg-pr-100 text-pr-900 text-xs sm:text-sm font-normal transition-colors cursor-pointer shadow-2xs self-start sm:self-center shrink-0"
              >
                <CalendarDays className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-pr-900 stroke-[1.8]" />
                <span>1 {selectedMonth.shortName} - {new Date(selectedMonth.year, selectedMonth.monthIndex + 1, 0).getDate()} {selectedMonth.shortName} {selectedMonth.year}</span>
              </button>
            </div>

            {/* 2. Chart Area: 1 Tampilan Penuh (Fit 4-5 Minggu Sekaligus Tanpa Scroll/Potong) */}
            <div
              onMouseLeave={() => setHoveredWeekIdx(null)}
              className="w-full relative select-none"
            >
              <div className="w-full relative px-2 sm:px-8 lg:px-12 pt-3 pb-4">
                {/* Baris Label Minggu: Nama Minggu di atas & Rentang Tanggal di bawah agar rapi */}
                <div className="grid grid-cols-5 gap-1 sm:gap-4 lg:gap-6 text-center mb-[40px] sm:mb-[60px] relative z-10 min-h-[32px] sm:h-[24px] flex items-center">
                  {selectedMonth.weeks.map((week) => (
                    <div key={week.id} className="flex flex-col items-center justify-center min-w-0">
                      <span className="text-[11px] sm:text-[13px] font-medium text-neu-800 block truncate leading-tight">
                        {week.label}
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-neu-500 block truncate leading-tight mt-0.5">
                        {week.subLabel}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 3. Sumbu Tengah & Bar Diverging */}
                <div className="relative w-full h-[326px]">
                  {/* Garis Horizontal Tengah Utama (Navy #0A1C3E) */}
                  <div className="absolute top-[163px] -translate-y-1/2 left-0 right-0 h-[2px] bg-pr-900 z-10" />

                  {/* 5 Kolom Minggu (Fit 100% Layar) */}
                  <div className="grid grid-cols-5 gap-1 sm:gap-4 lg:gap-6 text-center relative z-20">
                    {selectedMonth.weeks.map((week, idx) => (
                      <TimelineBarColumn
                        key={week.id}
                        topCount={week.berlakuCount}
                        bottomCount={week.dicabutCount}
                        topHeight={getWeeklyTopBarHeight(week.berlakuCount)}
                        bottomHeight={getWeeklyBottomBarHeight(week.dicabutCount)}
                        barWidthClass="w-[18px] sm:w-[28px] lg:w-[39px]"
                        isActive={
                          selectedWeekId !== undefined && selectedWeekId !== null
                            ? selectedWeekId === week.id
                            : activeWeekIdx === idx
                        }
                        isHovered={hoveredWeekIdx === idx}
                        onMouseEnter={() => setHoveredWeekIdx(idx)}
                        onMouseLeave={() => setHoveredWeekIdx(null)}
                        onClick={() => {
                          if (onSelectWeek) {
                            onSelectWeek(week.id);
                          } else {
                            setActiveWeekIdx(activeWeekIdx === idx ? null : idx);
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 4. Text Petunjuk di Bawah */}
                <div className="mt-4 pt-3 flex items-center justify-between text-[11px] sm:text-[12px] text-neu-600 border-t border-neu-100">
                  <span>Klik bar minggu untuk melihat rincian peraturan</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

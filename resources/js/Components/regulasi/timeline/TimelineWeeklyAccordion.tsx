import React, { useState } from 'react';
import { ChevronRight, ChevronUp, CalendarDays, Eye } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { MonthTimelineData } from './timelineData';

interface TimelineWeeklyAccordionProps {
  selectedMonth: MonthTimelineData;
  selectedWeekId?: string | null;
  onToggleWeek?: (weekId: string) => void;
  onDeselectMonth?: () => void;
  className?: string;
}

export function TimelineWeeklyAccordion({
  selectedMonth,
  selectedWeekId,
  onToggleWeek,
  className = '',
}: TimelineWeeklyAccordionProps) {
  // Tab status filter: 'berlaku' | 'dicabut' (Default: 'berlaku' sesuai Figma #3003:46020)
  const [activeTab, setActiveTab] = useState<'berlaku' | 'dicabut'>('berlaku');

  // Accordion state: dikontrol oleh selectedWeekId jika disediakan, atau fallback ke state internal
  const [internalExpandedId, setInternalExpandedId] = useState<string | null>(null);

  const activeExpandedId = selectedWeekId !== undefined ? selectedWeekId : internalExpandedId;

  const handleToggle = (weekId: string) => {
    if (onToggleWeek) {
      onToggleWeek(weekId);
    } else {
      setInternalExpandedId((prev) => (prev === weekId ? null : weekId));
    }
  };

  // Calculate total counts for active tab
  const totalBerlaku = selectedMonth.berlakuCount;
  const totalDicabut = selectedMonth.dicabutCount;

  return (
    <div
      className={`w-full bg-white rounded-[20px] border border-neu-50 overflow-hidden shadow-2xs ${className}`}
    >
      {/* ── 1. Header Tab Panel (Sesuai Figma #3003:46020) ── */}
      <div className="h-[49px] border-b border-neu-100 px-4 sm:px-8 flex items-center justify-between bg-white select-none">
        {/* Left: Tab Berlaku & Dicabut */}
        <div className="flex items-center gap-4 sm:gap-8 h-full">
          {/* Tab Berlaku */}
          <button
            type="button"
            onClick={() => setActiveTab('berlaku')}
            className="relative h-full flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            {/* Triangle Green Icon (Figma #3003:46011) */}
            <span className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-suc-900 inline-block shrink-0" />
            <span
              className={`text-xs sm:text-sm transition-colors ${
                activeTab === 'berlaku' ? 'text-neu-900 font-semibold' : 'text-neu-600 hover:text-neu-900 font-normal'
              }`}
            >
              Berlaku
            </span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[26px] text-[11px] sm:text-xs font-medium bg-suc-50 text-suc-900">
              {totalBerlaku}
            </span>

            {/* Active Indicator Underline (Figma #3003:46023) */}
            {activeTab === 'berlaku' && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-pr-900 rounded-[5px]" />
            )}
          </button>

          {/* Tab Dicabut */}
          <button
            type="button"
            onClick={() => setActiveTab('dicabut')}
            className="relative h-full flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            {/* Triangle Red Icon (Figma #3003:46016) */}
            <span className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-dan-900 inline-block shrink-0" />
            <span
              className={`text-xs sm:text-sm transition-colors ${
                activeTab === 'dicabut' ? 'text-neu-900 font-semibold' : 'text-neu-600 hover:text-neu-900 font-normal'
              }`}
            >
              Dicabut
            </span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[26px] text-[11px] sm:text-xs font-medium bg-dan-50 text-dan-900">
              {totalDicabut}
            </span>

            {/* Active Indicator Underline */}
            {activeTab === 'dicabut' && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-pr-900 rounded-[5px]" />
            )}
          </button>
        </div>

        {/* Right: Date Range Text (Hidden on mobile untuk mencegah penumpukan) */}
        <div className="hidden sm:flex items-center text-xs text-neu-600 font-normal">
          <span>1 {selectedMonth.shortName} - {new Date(selectedMonth.year, selectedMonth.monthIndex + 1, 0).getDate()} {selectedMonth.shortName} {selectedMonth.year}</span>
        </div>
      </div>

      {/* ── 2. Weekly Accordion Table List (Sesuai Persis Figma #3021:46181) ── */}
      <div className="w-full flex flex-col divide-y divide-neu-50">
        {selectedMonth.weeks.map((week) => {
          const isExpanded = activeExpandedId === week.id;

          // Filter jenis/subjek/lokasi sudah diterapkan server saat
          // `/api/timeline/events` dipanggil. Yang tersisa di klien hanya tab
          // status, karena satu event hanya bisa "berlaku" atau "dicabut".
          const filteredDays = week.days
            .map((day) => ({
              ...day,
              regulations: day.regulations.filter((r) => r.status === activeTab),
            }))
            .filter((day) => day.regulations.length > 0);

          const weekCount =
            activeTab === 'berlaku' ? week.berlakuCount : week.dicabutCount;

          return (
            <div key={week.id} id={`accordion-week-${week.id}`} className="w-full flex flex-col scroll-mt-6">
              {/* Row Header: Inactive (White) vs Active (Primary/900 #0A1C3E) */}
              {isExpanded ? (
                /* Active / Expanded Header Bar (Sesuai Figma #3010:46352) */
                <button
                  type="button"
                  onClick={() => handleToggle(week.id)}
                  className="w-full min-h-[50px] py-2.5 px-4 sm:px-8 bg-pr-900 text-white flex items-center justify-between cursor-pointer focus:outline-none transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <ChevronUp className="w-5 h-5 text-white stroke-[2.2] shrink-0" />
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                        {week.label}
                      </span>
                      <span className="text-[11px] sm:text-xs font-normal text-white/80 truncate">
                        {week.rangeText}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[12px] text-[11px] sm:text-xs font-medium shrink-0 ml-2 ${
                      activeTab === 'berlaku' ? 'bg-suc-50 text-suc-900' : 'bg-dan-50 text-dan-900'
                    }`}
                  >
                    {weekCount} Peraturan
                  </span>
                </button>
              ) : (
                /* Collapsed / Inactive Row Header (Sesuai Figma #3010:46026) */
                <button
                  type="button"
                  onClick={() => handleToggle(week.id)}
                  className="w-full min-h-[50px] py-2.5 px-4 sm:px-8 bg-white hover:bg-neutral-50/80 flex items-center justify-between cursor-pointer focus:outline-none transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <ChevronRight className="w-5 h-5 text-neu-700 stroke-[2] shrink-0" />
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-neu-900 whitespace-nowrap">
                        {week.label}
                      </span>
                      <span className="text-[11px] sm:text-xs font-normal text-neu-600 truncate">
                        {week.rangeText}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[12px] text-[11px] sm:text-xs font-normal bg-neu-100/70 text-neu-700 shrink-0 ml-2">
                    {weekCount} Peraturan
                  </span>
                </button>
              )}

              {/* ── Expanded Content Box: Tabel Peraturan dengan Left Navy Stripe (Sesuai Figma #3021:46630) ── */}
              {isExpanded && (
                <div className="w-full flex flex-col bg-[#F8F9FA] animate-in fade-in-50 duration-150">
                  {filteredDays.length > 0 ? (
                    filteredDays.map((dayGroup, dIdx) => (
                      <div key={dIdx} className="w-full flex flex-col">
                        {/* A. Baris Tanggal (Figma #3010:46363) */}
                        <div className="h-[36px] w-full bg-[#F8F9FA] border-l-4 border-pr-900 px-3 sm:px-8 flex items-center">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-3.5 h-3.5 text-pr-900 stroke-[1.8]" />
                            <span className="text-xs font-semibold text-neu-900">
                              {dayGroup.tanggal}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-neu-400 inline-block" />
                            <span className="text-xs font-normal text-neu-600">
                              {dayGroup.regulations.length} Peraturan
                            </span>
                          </div>
                        </div>

                        {/* B. Table Column Header (Figma #3021:46413) */}
                        <div className="h-[34px] w-full bg-pr-50/70 border-l-4 border-pr-900 px-3 sm:px-8 flex items-center text-[11px] sm:text-xs font-semibold text-neu-600 select-none">
                          <div className="w-14 sm:w-[120px] shrink-0 uppercase tracking-wider">
                            JENIS
                          </div>
                          <div className="flex-1 min-w-0 pr-3 sm:pr-4 uppercase tracking-wider">
                            JUDUL
                          </div>
                          <div className="hidden sm:block sm:w-[180px] lg:w-[220px] shrink-0 pr-4 uppercase tracking-wider">
                            SUBJEK
                          </div>
                          <div className="w-[72px] sm:w-[120px] shrink-0 text-right sm:text-left uppercase tracking-wider">
                            AKSI
                          </div>
                        </div>

                        {/* C. Table Data Rows (Figma #3021:46148) */}
                        <div className="w-full flex flex-col bg-white">
                          {dayGroup.regulations.map((reg) => (
                            <div
                              key={reg.id}
                              className="min-h-[58px] w-full bg-white border-l-4 border-pr-900 px-3 sm:px-8 py-2.5 flex items-center border-b border-neu-100/70 last:border-b-0 hover:bg-pr-50/25 transition-colors"
                            >
                              {/* Kolom 1: JENIS */}
                              <div className="w-14 sm:w-[120px] shrink-0">
                                <span className="inline-flex items-center justify-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-[7px] sm:rounded-[9px] bg-pr-900 text-white text-[10px] sm:text-xs font-medium shadow-2xs">
                                  {reg.jenis}
                                </span>
                              </div>

                              {/* Kolom 2: JUDUL */}
                              <div className="flex-1 min-w-0 pr-3 sm:pr-4">
                                <span className="text-xs sm:text-sm font-medium text-neu-900 leading-snug line-clamp-2">
                                  {reg.judul}
                                </span>
                                {reg.nomor && (
                                  <span className="text-[11px] text-neu-500 block mt-0.5">
                                    {reg.nomor}
                                  </span>
                                )}
                              </div>

                              {/* Kolom 3: SUBJEK */}
                              <div className="hidden sm:block sm:w-[180px] lg:w-[220px] shrink-0 pr-4">
                                <span className="text-sm font-normal text-neu-800 truncate block">
                                  {reg.subjek || 'Perpajakan'}
                                </span>
                              </div>

                              {/* Kolom 4: AKSI */}
                              <div className="w-[72px] sm:w-[120px] shrink-0 text-right sm:text-left">
                                <Link
                                  href={`/pencarian?q=${encodeURIComponent(reg.nomor || reg.judul)}`}
                                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-[8px] sm:rounded-[10px] bg-pr-50 hover:bg-pr-100 text-pr-900 text-xs font-medium transition-colors shadow-2xs"
                                >
                                  <Eye className="w-3.5 h-3.5 text-pr-900 stroke-[1.8]" />
                                  <span className="hidden sm:inline">Lihat Detail</span>
                                  <span className="sm:hidden text-[11px]">Detail</span>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-[70px] border-l-4 border-pr-900 flex items-center justify-center text-xs text-neu-400 bg-[#F8F9FA]">
                      Tidak ada peraturan dengan status {activeTab} pada minggu ini.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


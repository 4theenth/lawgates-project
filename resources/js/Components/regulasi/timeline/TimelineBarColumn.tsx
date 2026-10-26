import React from 'react';

interface TimelineBarColumnProps {
  topCount: number;
  bottomCount: number;
  topHeight: number;
  bottomHeight: number;
  barWidthClass?: string;
  isActive?: boolean;
  isHovered?: boolean;
  tooltip?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

/**
 * Reusable vertical diverging bar column (batang hijau atas + bulat node + batang merah bawah).
 * Digunakan baik di Tampilan 2 Tahun (Bulanan) maupun Rincian Mingguan.
 */
export function TimelineBarColumn({
  topCount,
  bottomCount,
  topHeight,
  bottomHeight,
  barWidthClass = 'w-[20px]',
  isActive = false,
  isHovered = false,
  tooltip,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
}: TimelineBarColumnProps) {
  const isHighlighted = isActive || isHovered;
  const hasTop = topCount > 0;
  const hasBottom = bottomCount > 0;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`flex flex-col items-center cursor-pointer group relative ${className}`}
    >
      {/* ── Section Atas: Tooltip (jika ada), Angka & Bar Hijau ── */}
      <div className="h-[155px] w-full flex flex-col justify-end items-center pb-1 relative">
        {tooltip}

        {hasTop ? (
          <>
            <span
              className={`text-[12px] mb-1 leading-none ${
                isHighlighted ? 'text-neu-900 font-bold' : 'text-neu-600 font-normal'
              }`}
            >
              {topCount}
            </span>
            <div
              style={{ height: `${topHeight}px` }}
              className={`${barWidthClass} rounded-[4px] transition-all duration-150 ${
                isHighlighted ? 'bg-suc-700' : 'bg-suc-300 group-hover:bg-suc-700'
              }`}
            />
          </>
        ) : (
          <span className="text-[11px] text-neu-300 mb-1 leading-none">-</span>
        )}
      </div>

      {/* ── Section Tengah: Node Lingkaran (Putih berbingkai Navy) ── */}
      <div className="h-[14px] w-full flex items-center justify-center relative my-[1px] z-20">
        <div
          className={`rounded-full transition-all duration-150 ${
            hasTop || hasBottom
              ? `w-3 h-3 border-[2.2px] border-pr-900 bg-white ${
                  isHighlighted ? 'scale-125 ring-2 ring-pr-900/30' : ''
                }`
              : 'w-2 h-2 border-[1.5px] border-neu-300 bg-neutral-100'
          }`}
        />
      </div>

      {/* ── Section Bawah: Bar Merah & Angka ── */}
      <div className="h-[155px] w-full flex flex-col justify-start items-center pt-1 relative">
        {hasBottom ? (
          <>
            <div
              style={{ height: `${bottomHeight}px` }}
              className={`${barWidthClass} rounded-[4px] transition-all duration-150 ${
                isHighlighted ? 'bg-dan-700' : 'bg-dan-300 group-hover:bg-dan-700'
              }`}
            />
            <span
              className={`text-[12px] mt-1 leading-none ${
                isHighlighted ? 'text-neu-900 font-bold' : 'text-neu-600 font-normal'
              }`}
            >
              {bottomCount}
            </span>
          </>
        ) : (
          <span className="text-[11px] text-neu-300 mt-1 leading-none">-</span>
        )}
      </div>
    </div>
  );
}

interface TimelineMonthTooltipProps {
  fullName: string;
  berlakuCount: number;
  dicabutCount: number;
  alignment: { wrapper: string; arrow: string };
}

/**
 * Tooltip popup informasi bulan saat hover pada chart 2 tahunan.
 */
export function TimelineMonthTooltip({
  fullName,
  berlakuCount,
  dicabutCount,
  alignment,
}: TimelineMonthTooltipProps) {
  return (
    <div
      className={`absolute bottom-full mb-1 ${alignment.wrapper} z-[70] bg-pr-900 text-white px-3.5 py-2.5 rounded-[10px] shadow-[0px_4px_16px_rgba(0,0,0,0.22)] border border-white/10 flex flex-col pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100`}
    >
      <span className="text-[13px] font-semibold leading-tight text-white">
        {fullName}
      </span>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-white">
          <span className="w-2 h-2 rounded-full bg-suc-400 inline-block shadow-xs" />
          {berlakuCount} Berlaku
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-white">
          <span className="w-2 h-2 rounded-full bg-dan-400 inline-block shadow-xs" />
          {dicabutCount} Dicabut
        </span>
      </div>
      <span className="text-[11px] text-neu-300 mt-1 font-normal">
        Klik untuk lihat per minggu
      </span>
      {/* Panah Segitiga Menunjuk ke Bar */}
      <div
        className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-pr-900 absolute -bottom-[6px] ${alignment.arrow}`}
      />
    </div>
  );
}

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface StatTrend {
  value: string;
  direction?: 'up' | 'down' | 'neutral';
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  note?: string;
  noteIcon?: React.ReactNode;
  trend?: StatTrend;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface StatGroupItem {
  id?: string;
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  note?: string;
  noteIcon?: React.ReactNode;
  trend?: StatTrend;
  isActive?: boolean;
  onClick?: () => void;
}

export interface StatCardsGroupProps {
  items: StatGroupItem[];
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  note,
  noteIcon,
  trend,
  isActive = false,
  onClick,
  className = '',
}: StatCardProps) {
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      // Sesuai Figma node #2267:37627 (Normal) & #2187:39979 (Saat di-hover / aktif):
      // - Normal: border 1px neu-50 (#E9E9E9), rounded 12px, padding 18px 14px, gap 10px
      // - Hover / Aktif: aksen garis 7px Primary/900 (#0A1C3E) di sisi kiri + shadow-xs halus dengan transisi ultra-smooth
      className={`group relative overflow-hidden bg-white rounded-[12px] border border-neu-50 p-[18px_14px] flex flex-col justify-between gap-[10px] transition-all duration-300 ease-out select-none ${
        isActive ? 'shadow-xs border-pr-900/20' : 'hover:shadow-xs hover:border-neu-100'
      } ${isClickable ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Garis Aksen Sisi Kiri 7px Primary/900 (Figma node #2187:39979) dengan glide in/out halus */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[7px] bg-pr-900 transition-all duration-300 ease-out pointer-events-none ${
          isActive
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0'
        }`}
      />

      {/* Top Row: Title & Top-Right Icon (Height 20px) */}
      <div className="flex items-center justify-between gap-2 h-5">
        <span className="text-[14px] font-medium text-neu-700 leading-[20px] truncate">
          {title}
        </span>
        {icon && (
          <div className="w-5 h-5 flex items-center justify-center text-sec-900 shrink-0">
            {icon}
          </div>
        )}
      </div>

      {/* Middle Row: Main Metric Value (Heading 4 - 24px Bold, Line-height 1.3em sesuai Figma node #2267:37627 & #2187:39979) */}
      <div>
        <span className="text-[24px] font-bold text-neu-900 leading-[1.3] tracking-tight block">
          {value}
        </span>
      </div>

      {/* Bottom Row: Trend atau Sub-note (12px) */}
      <div className="min-h-[18px] flex items-center gap-1 text-[12px]">
        {trend ? (
          <div
            className={`flex items-center gap-1 font-semibold leading-[16px] ${
              trend.direction === 'down' || trend.isPositive === false
                ? 'text-dan-600'
                : trend.direction === 'neutral'
                ? 'text-neu-500'
                : 'text-suc-900'
            }`}
          >
            {trend.icon ?? (
              trend.direction === 'up' || trend.isPositive === true ? (
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              ) : trend.direction === 'down' || trend.isPositive === false ? (
                <ArrowDownRight className="w-4 h-4 shrink-0" />
              ) : null
            )}
            <span>{trend.value}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-neu-500 font-medium leading-[18px]">
            {noteIcon && <span className="text-neu-400 shrink-0">{noteIcon}</span>}
            {note && <span>{note}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export function StatCardsGroup({ items, className = '' }: StatCardsGroupProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[18px] lg:gap-[22px] w-full ${className}`}
    >
      {items.map((item, idx) => (
        <StatCard
          key={item.id || idx}
          title={item.title}
          value={item.value}
          icon={item.icon}
          note={item.note}
          noteIcon={item.noteIcon}
          trend={item.trend}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

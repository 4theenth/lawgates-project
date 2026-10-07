import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  note?: string;
  noteIcon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  isActive?: boolean;
  onClick?: () => void;
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
      // Sesuai Figma node #2258:42561 (Normal) & #2187:39979 (Saat di-hover / aktif):
      // Normal: border 1px neu-50 (#E9E9E9) di semua sisi.
      // Hover / Active: aksen garis 7px Primary/900 (#0A1C3E) di sisi kiri + shadow-xs halus tanpa ada layout jitter/getar.
      className={`group relative overflow-hidden bg-white rounded-[12px] border border-neu-50 p-[18px_14px] flex flex-col justify-between gap-[10px] transition-all duration-200 select-none ${
        isActive ? 'shadow-xs' : 'hover:shadow-xs'
      } ${isClickable ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Garis Aksen Sisi Kiri 7px Primary/900 (Figma node #2187:39979) */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[7px] bg-pr-900 transition-opacity duration-200 pointer-events-none ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Top Row: Title & Top-Right Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[14px] font-medium text-neu-700 leading-tight">
          {title}
        </span>
        {icon && (
          <div className="w-5 h-5 flex items-center justify-center text-[#D4AF37] shrink-0">
            {icon}
          </div>
        )}
      </div>

      {/* Middle Row: Main Metric Value */}
      <div>
        <span className="text-[26px] sm:text-[28px] font-bold text-neu-900 tracking-tight leading-none">
          {value}
        </span>
      </div>

      {/* Bottom Row: Trend or Sub-note */}
      <div className="min-h-[18px] flex items-center gap-1.5 text-[12px]">
        {trend ? (
          <div
            className={`flex items-center gap-1 font-medium ${
              trend.isPositive !== false ? 'text-emerald-600' : 'text-dan-600'
            }`}
          >
            <span className="leading-none">{trend.value}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-neu-500 font-normal leading-tight">
            {noteIcon && <span className="text-neu-400 shrink-0">{noteIcon}</span>}
            {note && <span>{note}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export interface StatGroupItem {
  id?: string;
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  note?: string;
  noteIcon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  isActive?: boolean;
  onClick?: () => void;
}

export interface StatCardsGroupProps {
  items: StatGroupItem[];
  className?: string;
}

export function StatCardsGroup({ items, className = '' }: StatCardsGroupProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] lg:gap-[22px] w-full ${className}`}
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

import React from 'react';
import { FileText, Hourglass, CircleCheckBig, CircleX } from 'lucide-react';
import { KontribusiStats } from './types';

interface KontribusiStatCardProps {
  stats: KontribusiStats;
  className?: string;
}

export function KontribusiStatCard({ stats, className = '' }: KontribusiStatCardProps) {
  const statItems = [
    {
      label: 'Total Usulan',
      value: stats.total,
      icon: FileText,
      iconBg: 'bg-pr-50',
      iconColor: 'text-pr-900',
    },
    {
      label: 'Menunggu Ditinjau',
      value: stats.menunggu,
      icon: Hourglass,
      iconBg: 'bg-sec-50',
      iconColor: 'text-sec-900',
    },
    {
      label: 'Disetujui',
      value: stats.disetujui,
      icon: CircleCheckBig,
      iconBg: 'bg-suc-50',
      iconColor: 'text-suc-900',
    },
    {
      label: 'Ditolak',
      value: stats.ditolak,
      icon: CircleX,
      iconBg: 'bg-dan-50',
      iconColor: 'text-dan-900',
    },
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 w-full ${className}`}>
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="w-full h-[80px] bg-white border border-neu-50 rounded-[10px] px-5 py-4 flex items-center gap-[15px] shadow-2xs transition-shadow hover:shadow-xs"
          >
            {/* Icon Wrapper 45x45 rounded-14px */}
            <div
              className={`w-[45px] h-[45px] rounded-[14px] flex items-center justify-center shrink-0 ${item.iconBg}`}
            >
              <Icon className={`w-5 h-5 ${item.iconColor}`} />
            </div>

            {/* Label & Value */}
            <div className="flex flex-col min-w-0">
              <span className="text-[18px] font-semibold text-neu-900 leading-tight">
                {item.value}
              </span>
              <span className="text-[12px] font-medium text-neu-500 leading-normal truncate">
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KontribusiStatCard;


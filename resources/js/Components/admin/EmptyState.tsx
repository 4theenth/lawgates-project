import React, { ReactNode } from 'react';
import { Scale } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon = <Scale className="w-7 h-7 text-gray-400 stroke-[1.5]" />,
  title = 'Hasil tidak ditemukan untuk kata kunci tersebut',
  description = 'Ups, kata kunci yang kamu cari tidak ada. Coba cek ejaan atau gunakan kata lain.',
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`w-full min-h-[360px] flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#CBD5E1] bg-white p-10 sm:p-12 text-center transition-all ${className}`}
    >
      <div className="w-16 h-16 rounded-[18px] border border-gray-200 bg-white flex items-center justify-center mb-4 shadow-2xs">
        {icon}
      </div>

      {/* Container teks sesuai spesifikasi desain */}
      <div className="flex max-w-[420px] flex-col items-center text-center">
        <h3 className="text-[16px] font-bold text-gray-900 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

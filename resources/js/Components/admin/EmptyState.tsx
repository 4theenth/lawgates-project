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
  icon = <Scale className="w-6 h-6 text-neu-500 stroke-[1.5]" />,
  title = 'Belum ada data hukum',
  description = "Silakan tambahkan data hukum melalui tombol 'Tambah Hukum'",
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`w-full min-h-[380px] flex flex-col items-center justify-center rounded-[14px] border border-dashed border-neu-100 bg-white/70 p-12 text-center transition-all ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl border border-neu-50 bg-gray-50 flex items-center justify-center mb-4 shadow-2xs">
        {icon}
      </div>

      {/* Container teks sesuai spesifikasi Figma (width: 364px, gap: 5px) */}
      <div className="flex w-[364px] max-w-full flex-col items-center gap-[5px] shrink-0">
        <h3 className="text-[15px] font-semibold text-neu-900 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-[13px] text-neu-500 leading-normal">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

import React, { ReactNode } from 'react';
import { Files } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon = <Files className="w-6 h-6 text-neu-400 stroke-[1.5]" />,
  title = 'Belum ada data hukum',
  description = 'Silakan tambahkan data hukum melalui tombol “Tambah Hukum”',
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      // Sesuai Figma node #2258:42594: min-h 271px, border-dashed border-neu-200, rounded-[15px]
      className={`w-full min-h-[271px] flex flex-col items-center justify-center rounded-[15px] border border-dashed border-neu-200 bg-white p-8 text-center transition-all ${className}`}
    >
      {/* Icon container box: 50x50px, rounded-[15px], border border-neu-50 */}
      <div className="w-[50px] h-[50px] rounded-[15px] border border-neu-50 bg-white flex items-center justify-center mb-3 shadow-2xs">
        {icon}
      </div>

      {/* Container teks: Body Medium/Medium (14px, #212121) & Body Small / Regular (12px, #909090) */}
      <div className="flex max-w-[420px] flex-col items-center text-center">
        <h3 className="text-[14px] font-medium text-neu-900 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-[12px] font-normal text-neu-400 mt-1 leading-normal">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

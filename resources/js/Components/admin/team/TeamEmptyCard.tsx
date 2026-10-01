import React, { ReactNode } from 'react';

interface TeamEmptyCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function TeamEmptyCard({
  icon,
  title,
  description,
  className = '',
}: TeamEmptyCardProps) {
  return (
    <div
      className={`w-full min-h-[220px] sm:min-h-[240px] flex flex-col items-center justify-center rounded-[14px] sm:rounded-[16px] border border-dashed border-[#D1D5DB] bg-white py-10 px-6 text-center transition-all ${className}`}
    >
      {/* Container Ikon Persegi Bersudut Melengkung dengan Border Halus */}
      <div className="w-12 h-12 rounded-[14px] border border-[#E5E7EB] bg-white flex items-center justify-center mb-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        {icon}
      </div>

      {/* Teks Judul & Deskripsi Empty State */}
      <div className="flex max-w-[440px] flex-col items-center text-center">
        <h4 className="text-[14px] sm:text-[15px] font-semibold text-neu-800 leading-tight">
          {title}
        </h4>
        {description && (
          <p className="text-[12px] sm:text-[13px] text-neu-500 mt-1.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

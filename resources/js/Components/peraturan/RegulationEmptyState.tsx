import React from 'react';
import { Scale } from 'lucide-react';

export interface RegulationEmptyStateProps {
  title?: string;
  description?: string;
  isSearchNotFound?: boolean;
  className?: string;
}

export function RegulationEmptyState({
  title,
  description,
  isSearchNotFound = false,
  className = '',
}: RegulationEmptyStateProps) {
  const displayTitle =
    title ||
    (isSearchNotFound
      ? 'Hasil tidak ditemukan untuk kata kunci tersebut'
      : 'Mohon maaf, kategori yang kamu cari belum ada.');

  const displayDescription =
    description ||
    (isSearchNotFound
      ? 'Ups, kata kunci yang kamu cari tidak ada. Coba cek ejaan atau gunakan kata lain.'
      : 'Tim admin kami akan segera menambahkannya.');

  return (
    <div
      className={`w-full border border-dashed border-gray-300 rounded-[20px] p-12 sm:p-24 text-center flex flex-col items-center justify-center bg-white shadow-2xs min-h-[380px] sm:min-h-[420px] ${className}`}
    >
      {/* Box Icon Timbangan */}
      <div className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center mb-4 text-gray-400 bg-white shadow-2xs">
        <Scale className="w-7 h-7 stroke-[1.5] text-gray-400" />
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
        {displayTitle}
      </h3>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-gray-500 max-w-sm sm:max-w-md leading-relaxed">
        {displayDescription}
      </p>
    </div>
  );
}

export default RegulationEmptyState;

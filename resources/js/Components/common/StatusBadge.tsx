import React from 'react';

export type RegulationStatus = 'berlaku' | 'tidak_berlaku' | string;

interface StatusBadgeProps {
  status: RegulationStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const isBerlaku = status.toLowerCase() === 'berlaku';

  if (isBerlaku) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EBF7EE] text-[#1E7E34] select-none ${className}`}
      >
        Berlaku
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FDEEEE] text-[#D32F2F] select-none ${className}`}
    >
      Tidak Berlaku
    </span>
  );
}

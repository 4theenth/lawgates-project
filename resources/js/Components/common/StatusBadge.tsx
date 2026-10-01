import React from 'react';
import { Badge } from './Badge';

export type RegulationStatus = 'berlaku' | 'tidak_berlaku' | 'draft' | string;

interface StatusBadgeProps {
  status: RegulationStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const norm = (status || '').toLowerCase();

  if (norm === 'draft') {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full font-medium select-none bg-neu-50 text-neu-900 border border-neu-200 px-3 py-1 text-[12px] leading-normal ${className}`}
      >
        Draft
      </span>
    );
  }

  const isBerlaku = norm === 'berlaku';

  return (
    <Badge
      variant={isBerlaku ? 'success' : 'danger'}
      size="md"
      className={className}
    >
      {isBerlaku ? 'Berlaku' : 'Tidak Berlaku'}
    </Badge>
  );
}

export default StatusBadge;

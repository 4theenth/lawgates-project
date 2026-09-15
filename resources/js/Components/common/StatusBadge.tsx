import React from 'react';
import { Badge } from './Badge';

export type RegulationStatus = 'berlaku' | 'tidak_berlaku' | string;

interface StatusBadgeProps {
  status: RegulationStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const isBerlaku = status.toLowerCase() === 'berlaku';

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

import type { ReactNode } from 'react';

export interface StatCardItem {
  id: string;
  title: string;
  count: number;
  subtitle: string;
  icon: ReactNode;
  valueColor: string;
}

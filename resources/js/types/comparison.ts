import type React from 'react';

export interface ComparisonDocumentMeta {
  id: string;
  standardId: string;
  category: string;
  title: string;
  status: 'Berlaku' | 'Diubah' | 'Tidak berlaku' | string;
  statusVariant?: 'default' | 'success' | 'warning' | 'danger';
  tanggalPenetapan: string;
  tempatPenetapan: string;
  tanggalBerlaku?: string;
  pemrakarsa?: string;
}

export interface ComparisonRow {
  parameter: string | React.ReactNode;
  parameterSub?: string;
  leftValue: string | string[] | React.ReactNode;
  leftDiffType?: 'normal' | 'deleted' | 'modified';
  rightValue: string | string[] | React.ReactNode;
  rightDiffType?: 'normal' | 'added' | 'modified' | 'deleted';
  isChanged?: boolean;
}

export interface ComparisonSection {
  title: string;
  rows: ComparisonRow[];
}

export interface ComparisonRelationBanner {
  isRelationVerified: boolean;
  relationType: string;
  title: string;
  subtitle: string;
  changedCount: number;
  indukId: string;
  pengubahId: string;
}

export interface ComparisonDataset {
  standardIdGroup: string;
  standardIdVerified: boolean;
  relationBanner?: ComparisonRelationBanner;
  acuanAwal: ComparisonDocumentMeta;
  yangDibandingkan: ComparisonDocumentMeta;
  sections: ComparisonSection[];
  totalChangedPasal?: number;
}

export interface ComparisonOption {
  id: string;
  standardId?: string;
  title: string;
  category?: string;
  tahun?: string | number;
  tanggalPenetapan?: string;
  tempatPenetapan?: string;
  tanggalBerlaku?: string;
  status?: string;
  isReady?: boolean;
  relationDescription?: string;
}

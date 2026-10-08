import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/Components/common/Badge';
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  XOctagon,
  Eye,
} from 'lucide-react';

export interface RegulationCardItem {
  id: number | string;
  unique_id: string;
  judul: string;
  nomor?: string;
  tahun: number | string;
  instansi?: string;
  jenis_peraturan?: {
    id?: number;
    nama: string;
    kode?: string;
  };
  status_peraturan?: {
    id?: number;
    nama_status: string;
  };
}

interface RegulationCardProps {
  item: RegulationCardItem;
  className?: string;
  variant?: 'list' | 'grid';
  onClick?: (e: React.MouseEvent) => void;
}

function getRegulationStatusVariant(statusName: string): 'success' | 'danger' | 'warning' | 'neutral' {
  const name = statusName.toLowerCase();
  if (name.includes('tidak berlaku')) return 'danger';
  if (name.includes('dicabut')) return 'neutral';
  if (name.includes('diubah')) return 'warning';
  return 'success';
}

function getRegulationStatusIcon(statusName: string) {
  const variant = getRegulationStatusVariant(statusName);
  switch (variant) {
    case 'success':
      return <CheckCircle className="w-3.5 h-3.5 text-suc-900 shrink-0" />;
    case 'danger':
      return <XCircle className="w-3.5 h-3.5 text-dan-900 shrink-0" />;
    case 'warning':
      return <RefreshCw className="w-3.5 h-3.5 text-sec-900 shrink-0" />;
    case 'neutral':
      return <XOctagon className="w-3.5 h-3.5 text-neu-500 shrink-0" />;
    default:
      return null;
  }
}

export function RegulationCard({
  item,
  className = '',
  variant = 'list',
  onClick,
}: RegulationCardProps) {
  const statusName = item.status_peraturan?.nama_status ?? 'Berlaku';
  const jenisNama = item.jenis_peraturan?.nama ?? 'Peraturan';
  const instansiNama = item.instansi || 'Pemerintah Pusat';

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  if (variant === 'grid') {
    return (
      <Link
        href={`/peraturan/${item.unique_id}`}
        onClick={handleClick}
        className={`group relative bg-white border border-neu-200 hover:border-l-[6px] hover:border-l-pr-900 hover:border-neu-300 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between cursor-pointer ${className}`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant={getRegulationStatusVariant(statusName)}
              className="flex items-center gap-1.5 px-3 py-1 font-semibold rounded-full border border-transparent text-[11px] sm:text-xs"
            >
              {getRegulationStatusIcon(statusName)}
              <span>{statusName}</span>
            </Badge>

            <span className="bg-pr-900 text-white text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full">
              {jenisNama}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-neu-900 group-hover:text-pr-900 transition-colors line-clamp-3 leading-snug mb-3">
            {item.judul}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neu-100 text-xs text-neu-500 mt-2">
          <div className="flex items-center gap-2 font-medium">
            <span>Tahun {item.tahun}</span>
            <span className="w-1 h-1 rounded-full bg-neu-300" />
            <span className="truncate max-w-[130px]">{instansiNama}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-pr-900 font-semibold group-hover:underline">
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/peraturan/${item.unique_id}`}
      onClick={handleClick}
      className={`block bg-white border border-neu-200 rounded-2xl p-5 sm:p-6 hover:border-pr-900 transition-all group cursor-pointer ${className}`}
    >
      <div className="flex flex-wrap gap-2 items-center mb-3 sm:mb-4">
        <Badge
          variant={getRegulationStatusVariant(statusName)}
          className="flex items-center gap-1.5 px-3 py-1 font-semibold rounded-full border border-transparent text-[11px] sm:text-xs"
        >
          {getRegulationStatusIcon(statusName)}
          <span>{statusName}</span>
        </Badge>
        <span className="bg-pr-900 text-white text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full">
          {jenisNama}
        </span>
      </div>

      <h3 className="text-[14px] sm:text-[15px] font-bold text-neu-900 mb-3 sm:mb-4 line-clamp-2 leading-snug group-hover:text-pr-900 transition-colors">
        {item.judul}
      </h3>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neu-50">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] text-neu-500 font-medium">
          <span>Tahun {item.tahun}</span>
          <span className="w-px h-3.5 bg-neu-200"></span>
          <span className="px-2.5 py-0.5 bg-neu-50 text-neu-700 rounded-full group-hover:bg-neu-100 transition-colors text-[11px]">
            {instansiNama}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-neu-50 text-neu-700 text-[12px] font-semibold rounded-full group-hover:bg-pr-900 group-hover:text-white transition-colors">
          <Eye className="w-3.5 h-3.5" />
          <span>Lihat Detail</span>
        </div>
      </div>
    </Link>
  );
}

export default RegulationCard;

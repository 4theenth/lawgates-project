import React from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';
import { PeraturanItem } from '@/types/peraturan';

export interface RegulationCardProps {
  item: PeraturanItem;
  onClick?: () => void;
  className?: string;
}

export function RegulationCard({ item, onClick, className = '' }: RegulationCardProps) {
  const statusName = item.status_peraturan?.nama_status?.toLowerCase() ?? 'berlaku';
  const isBerlaku = statusName.includes('berlaku') && !statusName.includes('tidak');

  const content = (
    <>
      {/* Top Row: Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3.5">
          <span className="bg-[#0B1A3A] text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
            {item.jenis_peraturan?.kode === 'P' ? 'PERDA' : item.jenis_peraturan?.kode || 'UU'}
          </span>

          {isBerlaku ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#16A34A] text-[11px] font-semibold border border-[#DCFCE7]">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Berlaku</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[11px] font-semibold border border-[#FECACA]">
              <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Tidak Berlaku</span>
            </span>
          )}
        </div>

        {/* Judul Dokumen */}
        <h3 className="text-[14px] font-bold text-gray-900 mb-4 line-clamp-3 leading-snug group-hover:text-pr-900 transition-colors">
          {item.judul}
        </h3>
      </div>

      {/* Bottom Row: Metadata & Lihat Detail */}
      <div className="flex items-center justify-between gap-2 pt-3.5 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-2 text-[12px] text-gray-500 font-medium">
          <span>Tahun {item.tahun}</span>
          <span className="w-px h-3.5 bg-gray-200"></span>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">
            {item.instansi ||
              (item.jenis_peraturan?.kode === 'PERDA' ||
                (item.jenis_peraturan?.nama || '').toLowerCase().includes('daerah')
                ? 'Pemerintah Daerah'
                : 'Pemerintah Pusat')}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8EDF5] text-[#0B1A3A] text-[12px] font-semibold rounded-full group-hover:bg-pr-900 group-hover:text-white transition-colors shrink-0">
          <Eye className="w-3.5 h-3.5" />
          <span>Lihat Detail</span>
        </div>
      </div>
    </>
  );

  const containerClasses = `
    group
    relative
    bg-white
    border
    border-gray-200/80
    border-l-[6px]
    border-l-transparent
    hover:border-l-[#0A1C3E]
    hover:border-gray-300
    rounded-2xl
    p-5
    sm:p-6
    shadow-2xs
    hover:shadow-md
    transition-all
    duration-200
    flex
    flex-col
    justify-between
    cursor-pointer
    ${className}
  `;

  if (onClick) {
    return (
      <div onClick={onClick} className={containerClasses}>
        {content}
      </div>
    );
  }

  return (
    <Link href={`/peraturan/${item.unique_id}`} className={containerClasses}>
      {content}
    </Link>
  );
}

export default RegulationCard;

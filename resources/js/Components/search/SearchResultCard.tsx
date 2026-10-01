import React from 'react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';
import { ScraperRegulationItem } from '@/data/dummyRegulations';

interface SearchResultCardProps {
  item: ScraperRegulationItem;
}

export function SearchResultCard({ item }: SearchResultCardProps) {
  const { metadata } = item;
  const isBerlaku = metadata.status?.toLowerCase() === 'berlaku';

  return (
    <div className="bg-white border border-neu-100 rounded-[20px] p-5 sm:p-6 shadow-2xs hover:shadow-md transition-shadow">
      {/* Top Badges: Status Keberlakuan & Kategori */}
      <div className="flex flex-wrap items-center gap-2 mb-3.5">
        {/* Dynamic Status Badge (AC 3) */}
        {isBerlaku ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#16A34A] border border-[#DCFCE7] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            Berlaku
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA] text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            Tidak berlaku
          </span>
        )}

        {/* Category / Type Badge */}
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-pr-900 text-white text-xs font-semibold tracking-wide">
          {metadata.tipe_peraturan || 'Peraturan'}
        </span>
      </div>

      {/* Judul Regulasi */}
      <h3 className="font-sans text-[15px] sm:text-[16px] font-semibold text-neu-900 mb-4 leading-snug line-clamp-2">
        {metadata.judul}
      </h3>

      {/* Bottom Info & Action Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-neu-50 mt-auto">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm">
          <span className="text-neu-600 font-medium">Tahun {metadata.tahun}</span>
          <span className="w-1 h-1 rounded-full bg-neu-300" />
          <span className="px-2.5 py-1 bg-neu-50 text-neu-700 text-xs rounded-full border border-neu-100 font-medium">
            {metadata.pemrakarsa || 'Pemerintah Pusat'}
          </span>
        </div>

        <a
          href={`/peraturan/${metadata.standard_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pr-50 text-pr-900 hover:bg-pr-100 border border-pr-100 rounded-[10px] text-xs sm:text-sm font-semibold transition-colors"
        >
          <Eye className="w-4 h-4 text-pr-900 stroke-[2]" />
          <span>Lihat Detail</span>
        </a>
      </div>
    </div>
  );
}

export default SearchResultCard;

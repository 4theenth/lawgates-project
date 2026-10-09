import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle2, XCircle, RefreshCw, Gavel, Eye, Bookmark } from 'lucide-react';
import type { ScraperRegulationItem } from '@/data/dummyRegulations';

export interface GenericRegulationItem {
  id?: string | number;
  unique_id?: string;
  judul?: string;
  nomor?: string;
  tahun?: string | number;
  pemrakarsa?: string;
  instansi?: string;
  metadata?: {
    standard_id?: string;
    tipe_peraturan?: string;
    nomor?: string;
    judul: string;
    tahun: string | number;
    status: string;
    pemrakarsa?: string;
  };
  jenis_peraturan?: {
    id?: number;
    nama?: string;
    kode?: string;
  };
  status_peraturan?: {
    id?: number;
    nama_status?: string;
  };
  status?: string;
}

interface SearchResultCardProps {
  item: ScraperRegulationItem | GenericRegulationItem;
}

export function SearchResultCard({ item }: SearchResultCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Normalize data across both formats (dummy scraper vs database models)
  const isScraper = 'metadata' in item && Boolean((item as any).metadata);
  const metadata = isScraper ? (item as ScraperRegulationItem).metadata : null;
  const genericItem = !isScraper ? (item as GenericRegulationItem) : null;

  const judul = metadata?.judul || genericItem?.judul || 'Dokumen Peraturan';
  const tahun = metadata?.tahun || genericItem?.tahun || '-';
  const pemrakarsa = metadata?.pemrakarsa || genericItem?.instansi || genericItem?.pemrakarsa || 'Pemerintah Pusat';
  const rawStatus = metadata?.status || genericItem?.status_peraturan?.nama_status || genericItem?.status || 'Berlaku';
  const tipe = metadata?.tipe_peraturan || genericItem?.jenis_peraturan?.nama || 'Peraturan';

  const detailId = metadata?.standard_id || genericItem?.unique_id || String(genericItem?.id || '');
  const detailUrl = detailId ? `/peraturan/${detailId}` : '#';

  const normalizedStatus = rawStatus.toLowerCase();

  const renderStatusBadge = () => {
    if (normalizedStatus.includes('tidak')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA] text-xs font-semibold">
          <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Tidak berlaku</span>
        </span>
      );
    }
    if (normalizedStatus.includes('ubah')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sec-50 text-sec-900 border border-sec-200 text-xs font-semibold">
          <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Diubah</span>
        </span>
      );
    }
    if (normalizedStatus.includes('cabut')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neu-100 text-neu-800 border border-neu-200 text-xs font-semibold">
          <Gavel className="w-3.5 h-3.5 stroke-[2]" />
          <span>Dicabut</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#16A34A] border border-[#DCFCE7] text-xs font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Berlaku</span>
      </span>
    );
  };

  return (
    <div className="bg-white border border-neu-100 rounded-[20px] p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-pr-900/30 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Badges: Status Keberlakuan & Kategori */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5">
          {renderStatusBadge()}

          {/* Category / Type Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-neu-100 text-neu-700 border border-neu-200/50 text-xs font-medium">
            {tipe}
          </span>
        </div>

        {/* Judul Regulasi */}
        <Link
          href={detailUrl}
          className="block font-sans text-[14px] sm:text-[15px] font-semibold text-neu-900 group-hover:text-pr-800 leading-snug line-clamp-2 transition-colors mb-4"
        >
          {judul}
        </Link>
      </div>

      {/* Bottom Info & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-neu-50 mt-auto">
        <div className="flex items-center gap-2.5 text-xs">
          <span className="text-neu-600 font-medium">Tahun {tahun}</span>
          <span className="w-px h-3.5 bg-neu-200" />
          <span className="px-2.5 py-0.5 bg-neu-50 text-neu-700 text-[11px] rounded-full border border-neu-100 font-medium">
            {pemrakarsa}
          </span>

          {/* Bookmark Button: Active is PRIMARY color (text-pr-900 fill-pr-900), not secondary */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsBookmarked(!isBookmarked);
            }}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              isBookmarked ? 'text-pr-900 fill-pr-900 bg-pr-50' : 'text-neu-400 hover:text-neu-700 hover:bg-neu-50'
            }`}
            title={isBookmarked ? 'Hapus penanda' : 'Simpan peraturan'}
            aria-label="Bookmark"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-pr-900 text-pr-900' : ''}`} />
          </button>
        </div>

        <Link
          href={detailUrl}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pr-50 hover:bg-pr-900 text-pr-900 hover:text-white border border-pr-100 rounded-[10px] text-xs font-semibold transition-colors duration-150 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 stroke-[2]" />
          <span>Lihat Detail</span>
        </Link>
      </div>
    </div>
  );
}

export default SearchResultCard;

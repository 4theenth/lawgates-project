import React from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle2, XCircle, RefreshCw, Gavel, Eye } from 'lucide-react';
import { BookmarkButton } from '@/Components/common/BookmarkButton';

export interface ScraperRegulationMetadata {
  standard_id?: string;
  tipe_peraturan?: string;
  nomor?: string;
  judul: string;
  tahun: string | number;
  tempat_penetapan?: string;
  tanggal_penetapan?: string;
  tanggal_pengundangan?: string;
  tanggal_berlaku?: string;
  status: 'Berlaku' | 'Tidak berlaku' | string;
  pemrakarsa?: string;
  instansi?: string;
  sumber_dokumen?: string;
}

export interface ScraperRegulationItem {
  id?: string | number;
  metadata?: ScraperRegulationMetadata;
  relasi?: {
    mencabut?: string[];
    diubah_oleh?: string[];
  };
}

export interface GenericRegulationItem {
  id?: string | number;
  unique_id?: string;
  judul?: string;
  nomor?: string;
  tahun?: string | number;
  pemrakarsa?: string;
  instansi?: string;
  metadata?: ScraperRegulationMetadata;
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
  // Normalize data across both formats (dummy scraper vs database models)
  const isScraper = 'metadata' in item && Boolean((item as any).metadata);
  const metadata = isScraper ? (item as ScraperRegulationItem).metadata : null;
  const genericItem = !isScraper ? (item as GenericRegulationItem) : null;

  const judul = metadata?.judul || genericItem?.judul || 'Dokumen Peraturan';
  const tahun = metadata?.tahun || genericItem?.tahun || '-';
  const pemrakarsa = metadata?.pemrakarsa || genericItem?.instansi || genericItem?.pemrakarsa || 'Pemerintah Pusat';
  const rawStatus = metadata?.status || genericItem?.status_peraturan?.nama_status || genericItem?.status || 'Berlaku';
  const tipe = metadata?.tipe_peraturan || genericItem?.jenis_peraturan?.nama || 'Peraturan';

  // `detailId` untuk URL (halaman detail memang diakses lewat unique_id/slug),
  // sedangkan tombol bookmark butuh primary key, bukan slug.
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
    <div className="bg-white border border-neu-50 rounded-[20px] p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-pr-900/30 transition-all duration-200 flex flex-col justify-between group">
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

          {/* Reusable Bookmark Button */}
          {Boolean(genericItem?.id || (item as any)?.id) && (
            <BookmarkButton
              peraturanId={(genericItem?.id || (item as any)?.id)!}
              variant="icon"
              size="sm"
            />
          )}
        </div>

        <Link
          href={detailUrl}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pr-50 hover:bg-pr-900 text-pr-900 hover:text-white rounded-[10px] text-xs font-semibold transition-colors duration-150 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 stroke-[2]" />
          <span>Lihat Detail</span>
        </Link>
      </div>
    </div>
  );
}

export default SearchResultCard;

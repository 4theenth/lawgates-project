import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  XOctagon,
  Eye,
  Bookmark,
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

function getRegulationStatusStyle(statusName: string) {
  const name = statusName.toLowerCase();
  if (name.includes('tidak')) {
    return {
      bg: 'bg-[#F8E8E8] text-[#B91C1C]',
      icon: <XCircle className="w-3.5 h-3.5 text-[#B91C1C] stroke-[2] shrink-0" />,
      label: 'Tidak Berlaku',
    };
  }
  if (name.includes('ubah')) {
    return {
      bg: 'bg-sec-50 text-sec-900',
      icon: <RefreshCw className="w-3.5 h-3.5 text-sec-900 stroke-[2] shrink-0" />,
      label: 'Diubah',
    };
  }
  if (name.includes('cabut')) {
    return {
      bg: 'bg-neu-100 text-neu-800',
      icon: <XOctagon className="w-3.5 h-3.5 text-neu-800 stroke-[2] shrink-0" />,
      label: 'Dicabut',
    };
  }
  return {
    bg: 'bg-[#E8F2EC] text-[#15803D]',
    icon: <CheckCircle className="w-3.5 h-3.5 text-[#15803D] stroke-[2] shrink-0" />,
    label: 'Berlaku',
  };
}

export function RegulationCard({
  item,
  className = '',
  variant = 'list',
  onClick,
}: RegulationCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const statusName = item.status_peraturan?.nama_status ?? 'Berlaku';
  const jenisNama = item.jenis_peraturan?.nama ?? 'Peraturan';
  const instansiNama = item.instansi || 'Pemerintah Pusat';

  // Kode singkatan jenis peraturan (UU, PP, PERPRES, dll.) sesuai Figma #1684:24674
  const kodeBadge =
    item.jenis_peraturan?.kode ||
    (jenisNama.toLowerCase().includes('undang-undang') || jenisNama.toLowerCase().includes('undang undang')
      ? 'UU'
      : jenisNama.toLowerCase().includes('presiden')
      ? 'PERPRES'
      : jenisNama.toLowerCase().includes('menteri') || jenisNama.toLowerCase().includes('mentri')
      ? 'PERMEN'
      : jenisNama.toLowerCase().includes('pemerintah')
      ? 'PP'
      : jenisNama.toLowerCase().includes('daerah')
      ? 'PERDA'
      : jenisNama);

  const statusStyle = getRegulationStatusStyle(statusName);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link
      href={`/peraturan/${item.unique_id}`}
      onClick={handleClick}
      className={`group relative overflow-hidden bg-white border border-neu-100 rounded-[20px] p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-neu-200 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer ${className}`}
    >
      {/* ── Garis Aksen Sisi Kiri 10px sesuai Figma #1684:24739 (Glide-in halus tanpa menggeser layout) ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[10px] bg-pr-900 opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out pointer-events-none z-10"
      />

      <div>
        {/* ── Row Atas: Kategori dan Status ── */}
        <div className="flex items-center gap-2 mb-4">
          {/* 1. Kategori (Dark Navy Pill, misal "UU") */}
          <span className="inline-flex items-center justify-center bg-pr-900 text-white text-xs font-semibold px-3.5 py-1 rounded-full">
            {kodeBadge}
          </span>

          {/* 2. Status Peraturan (Berlaku / Tidak Berlaku) */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg}`}
          >
            {statusStyle.icon}
            <span>{statusStyle.label}</span>
          </span>
        </div>

        {/* ── Judul Dokumen Peraturan ── */}
        <h3 className="text-[14px] sm:text-[15px] font-medium text-neu-800 group-hover:text-pr-900 transition-colors line-clamp-3 leading-snug mb-5">
          {item.judul}
        </h3>
      </div>

      {/* ── Row Bawah: Tahun, Garis, Instansi, Simpan (Bookmark), dan Tombol Lihat Detail ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-neu-50 text-xs text-neu-500 mt-auto">
        <div className="flex items-center gap-2.5">
          <span className="text-neu-600 text-xs sm:text-sm font-normal">Tahun {item.tahun}</span>
          <span className="w-px h-4 bg-neu-200" />
          <span className="px-3 py-1 bg-neu-100 text-neu-600 rounded-full text-xs font-medium truncate max-w-[150px]">
            {instansiNama}
          </span>

          {/* Icon Simpan (Bookmark) ditaruh di sebelah Pemerintah Pusat */}
          <button
            type="button"
            onClick={handleBookmarkClick}
            className={`p-1 rounded-md transition-colors cursor-pointer ${
              isBookmarked ? 'text-pr-900 fill-pr-900' : 'text-neu-400 hover:text-neu-800'
            }`}
            title={isBookmarked ? 'Hapus penanda' : 'Simpan peraturan'}
            aria-label="Bookmark"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-pr-900 text-pr-900' : 'stroke-[1.75]'
              }`}
            />
          </button>
        </div>

        {/* Tombol Lihat Detail (Tetap lembut #E7E8EC dan text-pr-900 sesuai Figma node #1684:24754) */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E7E8EC] text-pr-900 rounded-[10px] text-xs font-medium transition-colors shrink-0">
          <Eye className="w-4 h-4 stroke-[1.75]" />
          <span>Lihat Detail</span>
        </span>
      </div>
    </Link>
  );
}

export default RegulationCard;

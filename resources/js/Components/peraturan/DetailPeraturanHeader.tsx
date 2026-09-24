import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, ArrowRightLeft, Download, Check } from 'lucide-react';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';

export interface DetailPeraturanHeaderProps {
  breadcrumbItems?: { label: string; href?: string }[];
  jenisPeraturan?: string;
  instansi?: string;
  judul: string;
  statusPeraturan?: string;
  tanggalPenetapan?: string;
  tempatPenetapan?: string;
  onCompare?: () => void;
  onDownload?: () => void;
  downloadHref?: string;
  showCompare?: boolean;
}

export function DetailPeraturanHeader({
  breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Pencarian Hukum', href: '/pencarian' },
    { label: 'Detail Sistem Hukum' },
  ],
  jenisPeraturan = 'UNDANG - UNDANG DASAR',
  instansi = 'Pemerintah Pusat',
  judul,
  statusPeraturan = 'Berlaku',
  tanggalPenetapan = '18 Agustus 2000',
  tempatPenetapan = 'Jakarta',
  onCompare,
  onDownload,
  downloadHref,
  showCompare = true,
}: DetailPeraturanHeaderProps) {
  const isBerlaku =
    !statusPeraturan.toLowerCase().includes('tidak') &&
    !statusPeraturan.toLowerCase().includes('cabut');

  return (
    <div className="space-y-4 mb-8">
      {/* 1. Breadcrumb Navigasi */}
      <Breadcrumb items={breadcrumbItems} className="mb-2" />

      {/* 2. Badge Kategori & Instansi */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 bg-white text-[11px] font-bold text-gray-700 tracking-wider uppercase shadow-2xs">
          {jenisPeraturan}
        </span>
        <span className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5">
          <span className="text-gray-400">•</span>
          {instansi}
        </span>
      </div>

      {/* 3. Judul Dokumen Hukum & Action Buttons Row */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 pt-1">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-gray-900 leading-[1.3] tracking-tight max-w-4xl">
          {judul}
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-start">
          {/* Tombol Bandingkan Sesuai Desain */}
          {onCompare && (
            <button
              type="button"
              onClick={onCompare}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] text-gray-800 text-sm font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4 text-gray-700 stroke-[2]" />
              <span>Bandingkan</span>
            </button>
          )}

          {/* Tombol Download Dokumen Sesuai Desain */}
          {downloadHref ? (
            <Link
              href={downloadHref}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#0E1E38] hover:bg-[#091528] text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-white stroke-[2]" />
              <span>Download Dokumen</span>
            </Link>
          ) : onDownload ? (
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#0E1E38] hover:bg-[#091528] text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-white stroke-[2]" />
              <span>Download Dokumen</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* 4. Badges Status & Tanggal Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isBerlaku
              ? 'bg-[#EBF8F2] text-[#059669] border border-[#059669]/20'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {isBerlaku && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          <span>{statusPeraturan}</span>
        </div>

        {/* Tanggal Penetapan */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700 text-xs font-medium shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>Ditetapkan: {tanggalPenetapan || '-'}</span>
        </div>

        {/* Tempat Penetapan */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700 text-xs font-medium shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span>Tempat Penetapan : {tempatPenetapan || '-'}</span>
        </div>
      </div>
    </div>
  );
}

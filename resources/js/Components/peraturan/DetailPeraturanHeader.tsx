import React from 'react';
import { Calendar, MapPin, SlidersHorizontal, ArrowDownToLine, Check } from 'lucide-react';
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
  showCompare?: boolean;
}

export function DetailPeraturanHeader({
  breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Pencarian Hukum', href: '/pencarian' },
    { label: 'Detail Dokumen Hukum' },
  ],
  jenisPeraturan = 'UNDANG - UNDANG DASAR',
  instansi = 'Pemerintah Pusat',
  judul,
  statusPeraturan = 'Berlaku',
  tanggalPenetapan = '18 Agustus 2000',
  tempatPenetapan = 'Jakarta',
  onCompare,
  onDownload,
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

      {/* 3. Judul Dokumen Hukum */}
      <h1 className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-gray-900 leading-[1.3] tracking-tight">
        {judul}
      </h1>

      {/* 4. Meta Badges & Action Buttons Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Badges Status & Tanggal */}
        <div className="flex flex-wrap items-center gap-2.5">
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
            <span>Tempat Penetapan: {tempatPenetapan || '-'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Tombol Bandingkan */}
          {onCompare && (
            <button
              type="button"
              onClick={onCompare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-600" />
              <span>Bandingkan</span>
            </button>
          )}

          {/* Tombol Download Dokumen */}
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-[#0A1C3E] hover:bg-[#081734] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-white" />
            <span>Download Dokumen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

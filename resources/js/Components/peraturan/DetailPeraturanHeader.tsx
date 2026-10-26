import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, ArrowRightLeft, Download, Check, Copy, CheckCircle2, XCircle } from 'lucide-react';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { BookmarkButton } from '@/Components/common/BookmarkButton';

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
  peraturanId?: string | number;
  onBookmarkToggle?: (isBookmarked: boolean) => void;
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
  showCompare: _showCompare = true,
  peraturanId,
  onBookmarkToggle,
}: DetailPeraturanHeaderProps) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const isBerlaku =
    !statusPeraturan.toLowerCase().includes('tidak') &&
    !statusPeraturan.toLowerCase().includes('cabut');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  return (
    <div className="space-y-4 mb-0">
      {/* 1. Breadcrumb Navigasi */}
      <Breadcrumb items={breadcrumbItems} className="mb-4 sm:mb-6 text-xs text-neu-500" />

      {/* 2. Badge Kategori & Instansi Sesuai Figma node #76:2402 */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="inline-flex items-center px-3.5 py-1 rounded-[15px] bg-pr-50 text-[10px] sm:text-[10px] font-semibold text-pr-900 tracking-wider uppercase">
          {jenisPeraturan}
        </span>
        <span className="text-[12px] sm:text-[12px] text-neu-800 font-normal flex items-center gap-1.5">
          <span className="text-neu-400">•</span>
          {instansi}
        </span>
      </div>

      {/* 3. Judul Dokumen Hukum & Action Buttons Row Sesuai Figma node #97:286 */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 pt-1">
        <h1 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-neu-900 leading-[1.3] tracking-tight flex-1 min-w-0">
          {judul}
        </h1>

        {/* Action Buttons Row: Salin Link, Bandingkan, Download Dokumen */}
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2.5 lg:shrink-0">
          {/* Tombol Salin Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="Salin Tautan Halaman Ini"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-neu-200 bg-white px-3 text-xs font-semibold text-neu-700 transition-all hover:bg-neu-50 sm:w-auto sm:min-w-[125px] sm:px-4 sm:text-sm cursor-pointer"
          >
            {isLinkCopied ? <Check className="w-3.5 h-3.5 text-suc-900" /> : <Copy className="w-3.5 h-3.5 text-neu-500" />}
            <span>{isLinkCopied ? 'Link Tersalin!' : 'Salin Link'}</span>
          </button>

          {/* Tombol Bandingkan */}
          {onCompare && (
            <button
              type="button"
              onClick={onCompare}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-pr-900 bg-white px-3 text-xs font-semibold text-pr-900 transition-all hover:bg-pr-50 sm:w-auto sm:gap-2.5 sm:px-6 sm:text-sm cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-pr-900 stroke-[2]" />
              <span>Bandingkan</span>
            </button>
          )}

          {/* Tombol Download Dokumen (Membuka viewer dokumen atau mengunduh langsung) */}
          {onDownload ? (
            <button
              type="button"
              onClick={onDownload}
              className="col-span-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-pr-900 px-3 text-xs font-semibold text-white transition-all hover:bg-pr-800 sm:col-auto sm:w-auto sm:gap-2.5 sm:px-6 sm:text-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-white stroke-[2]" />
              <span>Download Dokumen</span>
            </button>
          ) : downloadHref ? (
            <Link
              href={downloadHref}
              className="col-span-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-pr-900 px-3 text-xs font-semibold text-white transition-all hover:bg-pr-800 sm:col-auto sm:w-auto sm:gap-2.5 sm:px-6 sm:text-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-white stroke-[2]" />
              <span>Download Dokumen</span>
            </Link>
          ) : null}
        </div>
      </div>

      {/* 4. Badges Status, Penetapan & Tombol Simpan Sejajar Sesuai Figma node #2174:39521 */}
      <div className="flex items-center justify-between gap-2.5 pt-1">
        {/* Sisi Kiri: Status, Tanggal Ditetapkan & Tempat Penetapan (Neu Blok) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium sm:px-3 ${
              isBerlaku
                ? 'bg-suc-100 text-suc-900'
                : 'bg-dan-50 text-dan-900 border border-dan-200'
            }`}
          >
            {isBerlaku ? (
              <CheckCircle2 className="w-4 h-4 text-suc-900 stroke-[2]" />
            ) : (
              <XCircle className="w-4 h-4 text-dan-700 stroke-[2]" />
            )}
            <span>{statusPeraturan}</span>
          </div>

          {/* Tanggal Penetapan - Neu Blok */}
          <div
            aria-label={`Ditetapkan: ${tanggalPenetapan || '-'}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-neu-50 px-2.5 py-1.5 text-xs font-medium text-neu-800 sm:px-3.5"
          >
            <Calendar className="w-4 h-4 text-neu-600" />
            <span className="sm:hidden">{tanggalPenetapan || '-'}</span>
            <span className="hidden sm:inline">Ditetapkan: {tanggalPenetapan || '-'}</span>
          </div>

          {/* Tempat Penetapan - Neu Blok */}
          <div
            aria-label={`Tempat Penetapan: ${tempatPenetapan || '-'}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-neu-50 px-2.5 py-1.5 text-xs font-medium text-neu-800 sm:px-3.5"
          >
            <MapPin className="w-4 h-4 text-neu-600" />
            <span className="sm:hidden">{tempatPenetapan || '-'}</span>
            <span className="hidden sm:inline">Tempat Penetapan: {tempatPenetapan || '-'}</span>
          </div>
        </div>

        {/* Sisi Kanan: Tombol Simpan (Bookmark) Reusable Component - Mode Icon */}
        <div className="shrink-0 self-start sm:self-center">
          <BookmarkButton
            variant="icon"
            shape="circle"
            peraturanId={peraturanId || ''}
            onToggle={onBookmarkToggle}
          />
        </div>
      </div>
    </div>
  );
}

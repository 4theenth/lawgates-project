import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, ArrowRightLeft, Download, Check, Copy, CheckCircle2, XCircle, Eye } from 'lucide-react';
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
  viewerHref?: string;
  showCompare?: boolean;
  peraturanId?: string | number;
  isBookmarked?: boolean;
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
  viewerHref,
  showCompare: _showCompare = true,
  peraturanId,
  isBookmarked,
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
      </div>      {/* 3. Judul Dokumen Hukum & Action Buttons Row Sesuai Figma node #97:286 */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 pt-1">
        <h1 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-neu-900 leading-[1.3] tracking-tight flex-1 min-w-0">
          {judul}
        </h1>

        {/* Action Buttons Row: Salin Link, Bandingkan, Download Dokumen */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start flex-wrap">
          {/* Tombol Salin Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="Salin Tautan Halaman Ini"
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 min-w-[125px] rounded-full bg-white hover:bg-neu-50 text-neu-700 text-xs sm:text-sm font-semibold border border-neu-200 transition-all cursor-pointer"
          >
            {isLinkCopied ? <Check className="w-3.5 h-3.5 text-suc-900" /> : <Copy className="w-3.5 h-3.5 text-neu-500" />}
            <span>{isLinkCopied ? 'Link Tersalin!' : 'Salin Link'}</span>
          </button>

          {/* Tombol Bandingkan */}
          {onCompare && (
            <button
              type="button"
              onClick={onCompare}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-white hover:bg-pr-50 text-pr-900 text-sm font-semibold border border-pr-900 transition-all cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-pr-900 stroke-[2]" />
              <span>Bandingkan</span>
            </button>
          )}

          {/* Tombol Lihat Dokumen (Jika viewerHref tersedia) */}
          {viewerHref && (
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-neu-100 hover:bg-neu-200 text-neu-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-neu-700 stroke-[2]" />
              <span>Lihat Dokumen</span>
            </Link>
          )}

          {/* Tombol Download Dokumen */}
          {onDownload ? (
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-pr-900 hover:bg-pr-800 text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white stroke-[2]" />
              <span>Download Dokumen</span>
            </button>
          ) : downloadHref ? (
            <a
              href={downloadHref}
              download
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-pr-900 hover:bg-pr-800 text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-white stroke-[2]" />
              <span>Download Dokumen</span>
            </a>
          ) : null}
        </div>
      </div>

      {/* 4. Badges Status, Penetapan & Tombol Simpan Sejajar Sesuai Figma node #2174:39521 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        {/* Sisi Kiri: Status, Tanggal Ditetapkan & Tempat Penetapan (Neu Blok) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neu-50 text-neu-800 text-xs font-medium">
            <Calendar className="w-4 h-4 text-neu-600" />
            <span>Ditetapkan: {tanggalPenetapan || '-'}</span>
          </div>

          {/* Tempat Penetapan - Neu Blok */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neu-50 text-neu-800 text-xs font-medium">
            <MapPin className="w-4 h-4 text-neu-600" />
            <span>Tempat Penetapan : {tempatPenetapan || '-'}</span>
          </div>
        </div>

        {/* Sisi Kanan: Tombol Simpan (Bookmark) Reusable Component */}
        <div className="shrink-0 self-start sm:self-auto">
          <BookmarkButton
            variant="pill"
            peraturanId={peraturanId || ''}
            onToggle={onBookmarkToggle}
          />
        </div>
      </div>
    </div>
  );
}

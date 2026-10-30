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

interface HeaderActionButtonProps {
  variant?: 'outline-neutral' | 'outline-primary' | 'solid-primary';
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function HeaderActionButton({
  variant = 'outline-neutral',
  onClick,
  href,
  icon,
  children,
  title,
  className = '',
}: HeaderActionButtonProps) {
  const variantClasses = {
    'outline-neutral':
      'border-neu-200 bg-white text-neu-700 hover:bg-neu-50 hover:text-neu-900',
    'outline-primary':
      'border-pr-900 bg-white text-pr-900 hover:bg-pr-50',
    'solid-primary':
      'border-pr-900 bg-pr-900 text-white hover:bg-pr-800 hover:border-pr-800',
  }[variant];

  const commonClasses = `inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 sm:px-5 text-xs sm:text-sm font-semibold leading-none whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} title={title} className={commonClasses}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} title={title} className={commonClasses}>
      {icon}
      <span>{children}</span>
    </button>
  );
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

  const normalizedStatus = (statusPeraturan || '').toLowerCase();
  const isTidakBerlaku = normalizedStatus.includes('tidak');
  const isCabut = normalizedStatus.includes('cabut');
  const isUbah = normalizedStatus.includes('ubah');

  const getStatusBadgeConfig = () => {
    if (isTidakBerlaku) {
      return {
        containerClass: 'bg-dan-50 text-dan-900 border border-dan-200',
        icon: <XCircle className="w-4 h-4 text-dan-700 stroke-[2]" />,
      };
    }
    if (isCabut) {
      return {
        containerClass: 'bg-neu-100 text-neu-800 border border-neu-200',
        icon: <XCircle className="w-4 h-4 text-neu-700 stroke-[2]" />,
      };
    }
    if (isUbah) {
      return {
        containerClass: 'bg-sec-50 text-sec-900 border border-sec-200',
        icon: <CheckCircle2 className="w-4 h-4 text-sec-900 stroke-[2]" />,
      };
    }
    return {
      containerClass: 'bg-suc-50 text-suc-900 border border-suc-200',
      icon: <CheckCircle2 className="w-4 h-4 text-suc-900 stroke-[2]" />,
    };
  };

  const statusBadgeConfig = getStatusBadgeConfig();

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
        <span className="text-[12px] sm:text-[12px] text-neu-800 font-normal">
          {instansi}
        </span>
      </div>

      {/* 3. Judul Dokumen Hukum & Action Buttons Row Sesuai Figma node #97:286 */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 pt-1">
        <h1 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-neu-900 leading-[1.3] tracking-tight flex-1 min-w-0">
          {judul}
        </h1>

        {/* Action Buttons Row: Salin Link, Bandingkan, Download Dokumen */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:shrink-0">
          {/* Tombol Salin Link */}
          <HeaderActionButton
            variant="outline-neutral"
            onClick={handleCopyLink}
            title="Salin Tautan Halaman Ini"
            icon={
              isLinkCopied ? (
                <Check className="w-4 h-4 text-suc-900 stroke-[2] shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-neu-500 stroke-[2] shrink-0" />
              )
            }
          >
            {isLinkCopied ? 'Link Tersalin!' : 'Salin Link'}
          </HeaderActionButton>

          {/* Tombol Bandingkan */}
          {onCompare && (
            <HeaderActionButton
              variant="outline-primary"
              onClick={onCompare}
              title="Bandingkan Peraturan"
              icon={<ArrowRightLeft className="w-4 h-4 text-pr-900 stroke-[2] shrink-0" />}
            >
              Bandingkan
            </HeaderActionButton>
          )}

          {/* Tombol Download Dokumen (Membuka viewer dokumen atau mengunduh langsung) */}
          {onDownload ? (
            <HeaderActionButton
              variant="solid-primary"
              onClick={onDownload}
              title="Unduh Dokumen Peraturan"
              icon={<Download className="w-4 h-4 text-white stroke-[2] shrink-0" />}
            >
              Download Dokumen
            </HeaderActionButton>
          ) : downloadHref ? (
            <HeaderActionButton
              variant="solid-primary"
              href={downloadHref}
              title="Unduh Dokumen Peraturan"
              icon={<Download className="w-4 h-4 text-white stroke-[2] shrink-0" />}
            >
              Download Dokumen
            </HeaderActionButton>
          ) : null}
        </div>
      </div>

      {/* 4. Badges Status, Penetapan & Tombol Simpan Sejajar Sesuai Figma node #2174:39521 */}
      <div className="flex items-center justify-between gap-2.5 pt-1">
        {/* Sisi Kiri: Status, Tanggal Ditetapkan & Tempat Penetapan (Neu Blok) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium sm:px-3 ${statusBadgeConfig.containerClass}`}
          >
            {statusBadgeConfig.icon}
            <span>{statusPeraturan}</span>
          </div>

          {/* Tanggal Penetapan - Neu Blok */}
          <div
            aria-label={`Ditetapkan: ${tanggalPenetapan || '-'}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-neu-50 border border-neu-200 px-2.5 py-1.5 text-xs font-medium text-neu-800 sm:px-3.5"
          >
            <Calendar className="w-4 h-4 text-neu-600" />
            <span className="sm:hidden">{tanggalPenetapan || '-'}</span>
            <span className="hidden sm:inline">Ditetapkan: {tanggalPenetapan || '-'}</span>
          </div>

          {/* Tempat Penetapan - Neu Blok */}
          <div
            aria-label={`Tempat Penetapan: ${tempatPenetapan || '-'}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-neu-50 border border-neu-200 px-2.5 py-1.5 text-xs font-medium text-neu-800 sm:px-3.5"
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

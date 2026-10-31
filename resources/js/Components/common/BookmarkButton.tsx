import React from 'react';
import { usePage } from '@inertiajs/react';
import { Bookmark } from 'lucide-react';
import { useBookmark } from '@/hooks/useBookmark';

export interface BookmarkButtonProps {
  peraturanId: string | number;
  variant?: 'icon' | 'pill';
  size?: 'sm' | 'md';
  shape?: 'rounded' | 'circle';
  className?: string;
  onToggle?: (isBookmarked: boolean) => void;
  title?: string;
}

/**
 * Reusable Bookmark Button Component
 *
 * Mengenkapsulasi tampilan tombol bookmark (icon & pill) beserta
 * business logic autentikasi, global reactive state via useBookmark,
 * toast notification, dan single source of truth dari auth.bookmarkIds.
 */
export function BookmarkButton({
  peraturanId,
  variant = 'icon',
  size = 'md',
  shape = 'rounded',
  className = '',
  onToggle,
  title,
}: BookmarkButtonProps) {
  const { props } = usePage<any>();

  // Admin tidak memakai fitur bookmark, jadi tombolnya tidak ditampilkan.
  // Ini hanya UX; penolakan sebenarnya ada di middleware role pada route bookmark.
  const isAdmin = ['admin', 'superadmin'].includes(props.auth?.user?.role ?? '');

  const { isBookmarked, isLoading, toggle } = useBookmark(peraturanId);

  if (isAdmin) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggle(e);
    onToggle?.(!isBookmarked);
  };

  const defaultTitle = isBookmarked ? 'Hapus dari bookmark' : 'Simpan peraturan';
  const buttonTitle = title || defaultTitle;

  // 1. Variant: Pill (Digunakan pada Detail Header / Halaman Detail)
  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        title={buttonTitle}
        aria-label={buttonTitle}
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer disabled:opacity-70 ${
          isBookmarked
            ? 'bg-pr-100 text-pr-900 border border-pr-200 font-semibold'
            : 'bg-pr-50 hover:bg-pr-100 text-pr-900'
        } ${className}`}
      >
        <Bookmark
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
            isBookmarked ? 'fill-pr-900 text-pr-900' : 'text-pr-900 stroke-[1.75]'
          }`}
        />
        <span>{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
      </button>
    );
  }

  // 2. Variant: Icon (Digunakan pada Card Regulasi / Hasil Pencarian / Detail Header)
  const iconSizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const paddingClass =
    shape === 'circle'
      ? size === 'sm'
        ? 'p-1.5'
        : 'p-1.5 sm:p-2'
      : size === 'sm'
        ? 'p-1'
        : 'p-1.5';
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  const defaultColorClass =
    shape === 'circle'
      ? isBookmarked
        ? 'bg-pr-100 text-pr-900 border border-pr-200'
        : 'bg-neu-50 hover:bg-neu-100 text-neu-700 hover:text-pr-900 border border-neu-200'
      : isBookmarked
        ? 'text-pr-900 fill-pr-900 bg-pr-50'
        : 'text-neu-400 hover:text-neu-700 hover:bg-neu-50';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      title={buttonTitle}
      aria-label={buttonTitle}
      className={`inline-flex items-center justify-center ${paddingClass} ${shapeClass} transition-colors cursor-pointer disabled:opacity-70 ${defaultColorClass} ${className}`}
    >
      <Bookmark
        className={`${iconSizeClass} ${
          isBookmarked ? 'fill-pr-900 text-pr-900' : 'stroke-[1.75]'
        }`}
      />
    </button>
  );
}

export default BookmarkButton;

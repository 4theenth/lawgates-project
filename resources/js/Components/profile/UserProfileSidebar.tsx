import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  Crown,
  Pencil,
  LayoutDashboard,
  Bookmark,
  PencilLine,
  History,
  Settings,
} from 'lucide-react';
import profileAvatar from '@/assets/profile-avatar.webp';

export type UserMenuKey = 'ringkasan' | 'bookmark' | 'kontribusi' | 'riwayat' | 'pengaturan';

export interface UserProfileSidebarProps {
  activeMenu?: UserMenuKey;
  bookmarkCount?: number;
  collectionCount?: number;
  kontribusiCount?: number;
  className?: string;
}

/**
 * Komponen Sidebar Profil User (Menu Profile)
 * Sesuai Figma node #3165:71396 & #3406:84262
 *
 * Reusable di seluruh halaman profil user:
 * Ringkasan, Bookmark Saya, Kontribusi Saya, Riwayat Pencarian, dan Pengaturan Akun.
 */
export function UserProfileSidebar({
  activeMenu,
  bookmarkCount,
  collectionCount,
  kontribusiCount,
  className = '',
}: UserProfileSidebarProps) {
  const { props } = usePage<any>();
  const auth = props.auth;
  const user = auth?.user;

  const totalBookmarks =
    bookmarkCount ?? auth?.totalBookmarks ?? (user?.bookmarks_count || 0);
  const totalCollections =
    collectionCount ?? auth?.totalCollections ?? (user?.collections_count || 0);
  const totalKontribusi =
    kontribusiCount ?? auth?.totalKontribusi ?? 10;

  const displayName = user?.name || user?.username || 'Yudis Purba';
  const displayEmail = user?.email || 'yudis@gmail.com';
  const profileImg = user?.avatar || profileAvatar;
  const isPremium = user?.role === 'premium' || user?.is_premium;

  const navItems = [
    {
      key: 'ringkasan' as const,
      label: 'Ringkasan',
      href: route('dashboard'),
      icon: LayoutDashboard,
      badge: null,
      disabled: false,
    },
    {
      key: 'bookmark' as const,
      label: 'Bookmark Saya',
      href: route('user.bookmarks'),
      icon: Bookmark,
      badge: totalBookmarks,
      disabled: false,
    },
    {
      key: 'kontribusi' as const,
      label: 'Kontribusi Saya',
      href: route('user.kontribusi'),
      icon: PencilLine,
      badge: totalKontribusi,
      disabled: false,
    },
    {
      key: 'riwayat' as const,
      label: 'Riwayat Pencarian',
      href: '#',
      icon: History,
      badge: null,
      disabled: true, // Dinonaktifkan sementara (tidak bisa diklik)
    },
    {
      key: 'pengaturan' as const,
      label: 'Pengaturan Akun',
      href: route('profile.edit'),
      icon: Settings,
      badge: null,
      disabled: false,
    },
  ];

  return (
    <aside
      className={`w-full lg:w-[307px] shrink-0 bg-white border border-neu-50 rounded-[20px] p-6 shadow-2xs flex flex-col items-center select-none ${className}`}
    >
      {/* ── 1. Avatar User ── */}
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-pr-900 border-2 border-neu-50 shadow-2xs flex items-center justify-center shrink-0 mb-4">
        <img
          src={profileImg}
          alt={displayName}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── 2. Info Nama, Email, & Badge ── */}
      <div className="flex flex-col items-center text-center w-full mb-5">
        <h2 className="font-sans text-[16px] font-medium text-neu-900 leading-snug line-clamp-1">
          {displayName}
        </h2>
        <p className="font-sans text-[12px] text-neu-600 mt-0.5 line-clamp-1">
          {displayEmail}
        </p>

        {/* Badge Tipe Akun */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] bg-pr-50 text-pr-900">
          <Crown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
          <span className="font-sans text-[12px] font-medium leading-none">
            {isPremium ? 'Akun Premium' : 'Akun Standar'}
          </span>
        </div>
      </div>

      {/* ── 3. Stats Counter Box: Bookmark & Koleksi ── */}
      <div className="w-full h-[65px] bg-pr-50 rounded-[10px] flex items-center justify-around px-4 mb-4">
        {/* Kolom 1: Bookmark */}
        <div className="flex flex-col items-center justify-center">
          <span className="font-sans text-[16px] font-semibold text-pr-900 leading-tight">
            {totalBookmarks}
          </span>
          <span className="font-sans text-[11px] font-normal text-neu-600 tracking-wider uppercase mt-0.5">
            BOOKMARK
          </span>
        </div>

        {/* Garis Pemisah Vertikal */}
        <div className="w-px h-10 bg-pr-200" />

        {/* Kolom 2: Koleksi */}
        <div className="flex flex-col items-center justify-center">
          <span className="font-sans text-[16px] font-semibold text-pr-900 leading-tight">
            {totalCollections}
          </span>
          <span className="font-sans text-[11px] font-normal text-neu-600 tracking-wider uppercase mt-0.5">
            KOLEKSI
          </span>
        </div>
      </div>

      {/* ── 4. Tombol Edit Profil ── */}
      <Link
        href={route('profile.edit')}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white font-sans text-[14px] font-medium transition-colors shadow-2xs cursor-pointer mb-5"
      >
        <Pencil className="w-4 h-4 text-white" />
        <span>Edit Profil</span>
      </Link>

      {/* ── 5. Navigasi Menu Profil ── */}
      <nav className="w-full flex flex-col gap-1" aria-label="Menu Profil">
        {navItems.map((item) => {
          const isActive = activeMenu === item.key;
          const Icon = item.icon;

          if (item.disabled) {
            return (
              <div
                key={item.key}
                title="Segera Hadir"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[10px] text-neu-400 opacity-60 cursor-not-allowed select-none"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0 text-neu-400" />
                  <span className="font-sans text-[14px] leading-5">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[10px] transition-colors cursor-pointer ${isActive
                  ? 'bg-pr-50 text-pr-900 font-semibold'
                  : 'text-neu-700 hover:text-neu-900 hover:bg-neu-50/70 font-normal'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 shrink-0 ${isActive
                      ? `text-pr-900 ${item.key === 'bookmark' ? 'fill-pr-900' : ''}`
                      : 'text-neu-600'
                    }`}
                />
                <span className="font-sans text-[14px] leading-5">
                  {item.label}
                </span>
              </div>

              {item.badge !== null && item.badge > 0 && (
                <span
                  className={`px-2.5 py-0.5 rounded-[8px] font-sans text-[12px] ${isActive
                      ? 'bg-white text-pr-900 font-semibold shadow-2xs'
                      : 'bg-pr-50 text-pr-900 font-medium'
                    }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default UserProfileSidebar;

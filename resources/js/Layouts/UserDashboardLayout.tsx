import React from 'react';
import { PublicLayout, PAGE_CONTAINER } from '@/Layouts/PublicLayout';
import { Breadcrumb, type BreadcrumbItem } from '@/Components/common/Breadcrumb';
import {
  UserProfileSidebar,
  type UserMenuKey,
} from '@/Components/profile/UserProfileSidebar';

export interface UserDashboardLayoutProps {
  children: React.ReactNode;
  activeMenu?: UserMenuKey;
  breadcrumbs?: BreadcrumbItem[];
  bookmarkCount?: number;
  collectionCount?: number;
}

/**
 * Layout Khusus Area User Dashboard & Profil
 *
 * Menggabungkan PublicLayout (Navbar & Footer), Breadcrumb navigasi dinamis,
 * serta UserProfileSidebar di kolom kiri secara seragam untuk seluruh
 * halaman profil user (Ringkasan, Bookmark, Riwayat Pencarian, Pengaturan).
 */
export function UserDashboardLayout({
  children,
  activeMenu = 'ringkasan',
  breadcrumbs = [{ label: 'Beranda', href: '/' }, { label: 'Ringkasan' }],
  bookmarkCount,
  collectionCount,
}: UserDashboardLayoutProps) {
  return (
    <PublicLayout>
      <div className={`${PAGE_CONTAINER} pt-[104px] sm:pt-[112px] pb-12 sm:pb-16 min-h-[calc(100vh-200px)]`}>
        {/* ── 1. Breadcrumb Dinamis Sesuai Aksi (y=112px di Figma) ── */}
        <div className="mb-7 sm:mb-[38px]">
          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* ── 2. Grid 2 Kolom: Sidebar Profil Kiri & Konten Utama Kanan ── */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 w-full">
          {/* Kolom Kiri: Sidebar Menu Profil Reusable */}
          <UserProfileSidebar
            activeMenu={activeMenu}
            bookmarkCount={bookmarkCount}
            collectionCount={collectionCount}
          />

          {/* Kolom Kanan: Area Konten Halaman */}
          <main className="flex-1 min-w-0 w-full">{children}</main>
        </div>
      </div>
    </PublicLayout>
  );
}

export default UserDashboardLayout;

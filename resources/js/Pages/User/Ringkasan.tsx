import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { UserDashboardLayout } from '@/Layouts/UserDashboardLayout';
import { PageHeader } from '@/Components/common/PageHeader';
import { BarChart3, Bookmark, Search } from 'lucide-react';
import { PageProps } from '@/types';

interface RingkasanProps extends PageProps {
  totalBookmarks?: number;
}

export default function Ringkasan({
  totalBookmarks = 0,
}: RingkasanProps) {
  const { auth } = usePage<RingkasanProps>().props;
  const user = auth.user;
  const displayName = user?.name || user?.username || 'Pengguna';

  return (
    <UserDashboardLayout
      activeMenu="ringkasan"
      breadcrumbs={[
        { label: 'Beranda', href: '/' },
        { label: 'Ringkasan' },
      ]}
      bookmarkCount={totalBookmarks}
    >
      <Head title="Ringkasan Akun - LawGates" />

      {/* ── 1. Page Header Reusable ── */}
      <PageHeader
        title="Ringkasan"
        description={`Halo ${displayName}, pantau ringkasan aktivitas, koleksi peraturan tersimpan, dan akun Anda di LawGates`}
        size="lg"
      />

      {/* ── 2. Clean Placeholder / Empty State (Awal Sebelum Statistik Lengkap) ── */}
      <div className="w-full bg-white border border-neu-50 rounded-[20px] p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-2xs">
        <div className="w-16 h-16 rounded-full bg-pr-50 border border-neu-100 flex items-center justify-center text-pr-900 mb-4">
          <BarChart3 className="w-8 h-8 stroke-[1.5]" />
        </div>

        <h3 className="font-sans text-[18px] font-semibold text-neu-900 mb-2">
          Statistik Aktivitas Anda
        </h3>

        <p className="font-sans text-[13px] sm:text-[14px] text-neu-500 max-w-lg mb-7 leading-relaxed">
          Statistik penelusuran hukum, ringkasan koleksi bookmark, dan riwayat analisis regulasi akan ditampilkan di sini seiring penggunaan platform.
        </p>

        {/* Quick Actions Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={route('user.bookmarks')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-pr-900 hover:bg-pr-800 text-white font-sans text-xs font-medium transition-colors shadow-2xs cursor-pointer"
          >
            <Bookmark className="w-4 h-4" />
            <span>Buka Bookmark Saya</span>
          </Link>

          <Link
            href="/regulasi"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-pr-50 hover:bg-pr-100 text-pr-900 font-sans text-xs font-medium transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Jelajahi Regulasi</span>
          </Link>
        </div>
      </div>
    </UserDashboardLayout>
  );
}

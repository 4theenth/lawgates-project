import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
import { StatCard } from '@/Components/admin/StatCard';
import { Bookmark, Calendar, CheckCircle2, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { PageProps } from '@/types';

interface RecentBookmarkItem {
  id: number;
  unique_id: string;
  judul: string;
  nomor: string;
  tahun: string;
  jenis: string;
  status: string;
  bookmarked_at: string;
}

interface UserDashboardProps extends PageProps {
  totalBookmarks: number;
  recentBookmarks: RecentBookmarkItem[];
}

function formatJoinDate(dateStr?: string): string {
  if (!dateStr) return '17 Agustus 2026';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return '17 Agustus 2026';
  }
}

export default function UserDashboard({
  totalBookmarks = 0,
  recentBookmarks = [],
}: UserDashboardProps) {
  const { auth } = usePage<UserDashboardProps>().props;
  const user = auth.user;

  const displayName = user.name || user.username || 'Pengguna';

  return (
    <UserLayout>
      <Head title="Dashboard - LawGates" />

      {/* 1. Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
      </div>

      {/* 2. Page Header */}
      <AdminPageHeader
        title={`Selamat datang, ${displayName}`}
        description="Berikut adalah ringkasan akun dan peraturan tersimpan Anda di LawGates"
      />

      {/* 3. Baris Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-7">
        {/* Card 1: Total Bookmark */}
        <StatCard
          title="Peraturan Tersimpan"
          value={String(totalBookmarks)}
          icon={<Bookmark className="w-5 h-5 text-sec-900" />}
          trend={{
            value: totalBookmarks > 0 ? `${totalBookmarks} peraturan aktif` : 'Belum ada simpanan',
            direction: totalBookmarks > 0 ? 'up' : 'neutral',
          }}
        />

        {/* Card 2: Status Akun */}
        <StatCard
          title="Status Akun"
          value={user.email_verified_at ? 'Terverifikasi' : 'Aktif'}
          icon={<CheckCircle2 className="w-5 h-5 text-suc-900" />}
          trend={{
            value: user.role === 'user' ? 'Member Reguler' : (user.role || 'Member'),
            direction: 'neutral',
          }}
        />

        {/* Card 3: Tanggal Bergabung */}
        <StatCard
          title="Bergabung Sejak"
          value={formatJoinDate(user.created_at)}
          icon={<Calendar className="w-5 h-5 text-pr-900" />}
          trend={{
            value: 'LawGates User',
            direction: 'neutral',
          }}
        />
      </div>

      {/* 4. Bagian Bookmark Terbaru */}
      <div className="w-full bg-white border border-neu-50 rounded-[12px] p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-neu-50 mb-5">
          <div>
            <h2 className="font-sans text-[16px] font-semibold text-neu-900">
              Peraturan Tersimpan Terbaru
            </h2>
            <p className="font-sans text-[13px] text-neu-500 mt-0.5">
              Daftar dokumen peraturan yang baru-baru ini Anda tandai
            </p>
          </div>

          {totalBookmarks > 0 && (
            <Link
              href={route('user.bookmarks')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-pr-900 hover:text-pr-800 transition-colors"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {recentBookmarks.length === 0 ? (
          /* Empty State Bersih */
          <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-neu-50 border border-neu-100 flex items-center justify-center text-neu-400 mb-3">
              <Bookmark className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-sans text-[15px] font-semibold text-neu-800 mb-1">
              Belum Ada Peraturan yang Disimpan
            </h3>
            <p className="font-sans text-[13px] text-neu-500 max-w-md mb-5 leading-relaxed">
              Anda dapat menandai dan menyimpan undang-undang atau peraturan saat menjelajah katalog regulasi untuk akses cepat di sini.
            </p>
            <Link
              href="/regulasi"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white text-xs font-medium transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Jelajahi Regulasi Sekarang</span>
            </Link>
          </div>
        ) : (
          /* List Peraturan Tersimpan */
          <div className="divide-y divide-neu-50">
            {recentBookmarks.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neu-50/40 px-2 rounded-lg transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2 py-0.5 rounded-[6px] text-[10px] font-semibold bg-pr-50 text-pr-900 uppercase tracking-wider">
                      {item.jenis}
                    </span>
                    <span className="text-xs text-neu-400">
                      No. {item.nomor} Th. {item.tahun}
                    </span>
                    <span className="text-xs text-neu-400">• Disimpan {item.bookmarked_at}</span>
                  </div>
                  <h4 className="font-sans text-[13px] sm:text-[14px] font-medium text-neu-900 line-clamp-1">
                    {item.judul}
                  </h4>
                </div>

                <div className="shrink-0 flex items-center">
                  <Link
                    href={`/peraturan/${item.unique_id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-neu-100 hover:bg-white text-xs font-medium text-neu-700 hover:text-pr-900 transition-colors shadow-2xs"
                  >
                    <span>Buka Dokumen</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}

import React from 'react';
import { Head, usePoll } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { PageHeader } from '@/Components/common/PageHeader';
import { StatCard } from '@/Components/admin/StatCard';
import { RevenueTrendChart, DayRevenue } from '@/Components/admin/RevenueTrendChart';
import { SubscriptionDonutChart, SubscriptionData } from '@/Components/admin/SubscriptionDonutChart';
import { RecentTransactionsTable, TransactionItem } from '@/Components/admin/RecentTransactionsTable';
import { RecentDocumentsTable, DocumentItem } from '@/Components/admin/RecentDocumentsTable';
import { Banknote, Users, Files, Gavel } from 'lucide-react';

interface DashboardStats {
  totalDokumen: number;
  totalDraft: number;
  totalPremiumUsers: number;
  totalPendapatan: number;
}

interface AdminDashboardProps {
  stats: DashboardStats;
  subscriptionData: SubscriptionData;
  revenueTrend: DayRevenue[];
  recentDocuments: DocumentItem[];
  recentTransactions: TransactionItem[];
}

export default function AdminDashboard({
  stats,
  subscriptionData,
  revenueTrend,
  recentDocuments,
  recentTransactions,
}: AdminDashboardProps) {
  // Muat ulang hanya data dashboard agar perubahan dari halaman lain
  // (tambah/ubah dokumen atau transaksi) langsung terlihat tanpa reload penuh.
  usePoll(15000, {
    only: ['stats', 'subscriptionData', 'revenueTrend', 'recentDocuments', 'recentTransactions'],
  });

  const breadcrumbs = [
    { label: 'Dashboard' },
  ];

  const formatNumber = (value: number) => value.toLocaleString('id-ID');
  const formatRupiah = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;
  const premiumPct =
    subscriptionData.totalUsers > 0
      ? Math.round((subscriptionData.premiumCount / subscriptionData.totalUsers) * 100)
      : 0;

  return (
    <AdminLayout>
      <Head title="Dashboard - Admin" />

      {/* 1. Breadcrumb Navigasi */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 2. Page Header Menggunakan Reusable Component PageHeader */}
      <PageHeader
        title="Selamat datang, Super Admin"
        description="Berikut adalah ringkasan performa bulanan LawGates"
      />

      {/* 3. Baris 1: 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {/* Card 1: Total Pendapatan */}
        <StatCard
          title="Total Pendapatan (Bulan Ini)"
          value={formatRupiah(stats.totalPendapatan)}
          icon={<Banknote className="w-5 h-5 text-sec-900" />}
          trend={{
            value: 'Belum ada data pembayaran',
            direction: 'neutral',
          }}
        />

        {/* Card 2: Total Pengguna Premium */}
        <StatCard
          title="Total Pengguna Premium"
          value={formatNumber(stats.totalPremiumUsers)}
          icon={<Users className="w-5 h-5 text-sec-900" />}
          trend={{
            value: `${premiumPct}% dari total pengguna`,
            direction: 'neutral',
          }}
        />

        {/* Card 3: Total Dokumen */}
        <StatCard
          title="Total Dokumen"
          value={formatNumber(stats.totalDokumen)}
          icon={<Files className="w-5 h-5 text-sec-900" />}
          trend={{
            value: 'Diperbarui otomatis',
            direction: 'neutral',
          }}
        />

        {/* Card 4: Total Draf Dokumen */}
        <StatCard
          title="Total Draf Dokumen"
          value={formatNumber(stats.totalDraft)}
          icon={<Gavel className="w-5 h-5 text-sec-900" />}
          trend={{
            value: 'Perlu ditinjau',
            direction: 'neutral',
          }}
        />
      </div>

      {/* 4. Baris 2: Tren Pendapatan & Komposisi Paket Langganan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-6 items-stretch">
        {/* Kolom Kiri: Tren Pendapatan Bulanan (8 span di lg) */}
        <div className="lg:col-span-8 flex flex-col">
          <RevenueTrendChart data={revenueTrend} className="h-full" />
        </div>

        {/* Kolom Kanan: Komposisi Paket Langganan (4 span di lg) */}
        <div className="lg:col-span-4 flex flex-col">
          <SubscriptionDonutChart data={subscriptionData} className="h-full" />
        </div>
      </div>

      {/* 5. Baris 3: Dua Tabel Berdampingan */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* Tabel 1: Transaksi Terakhir */}
        <RecentTransactionsTable className="h-full" initialData={recentTransactions} />

        {/* Tabel 2: Dokumen Terbaru Diunggah */}
        <RecentDocumentsTable className="h-full" initialData={recentDocuments} />
      </div>
    </AdminLayout>
  );
}
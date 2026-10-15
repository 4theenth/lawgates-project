import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
import { StatCard } from '@/Components/admin/StatCard';
import { RevenueTrendChart } from '@/Components/admin/RevenueTrendChart';
import { SubscriptionDonutChart } from '@/Components/admin/SubscriptionDonutChart';
import { RecentTransactionsTable } from '@/Components/admin/RecentTransactionsTable';
import { RecentDocumentsTable } from '@/Components/admin/RecentDocumentsTable';
import { Banknote, Users, Files, Gavel } from 'lucide-react';

export default function AdminDashboard() {
  const breadcrumbs = [
    { label: 'Dashboard' },
  ];

  return (
    <AdminLayout>
      <Head title="Dashboard - Admin" />

      {/* 1. Breadcrumb Navigasi */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 2. Page Header Menggunakan Reusable Component AdminPageHeader */}
      <AdminPageHeader
        title="Selamat datang, Super Admin"
        description="Berikut adalah ringkasan performa bulanan LawGates"
      />

      {/* 3. Baris 1: 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {/* Card 1: Total Pendapatan */}
        <StatCard
          title="Total Pendapatan (Bulan Ini)"
          value="Rp 100.000.000"
          icon={<Banknote className="w-5 h-5 text-sec-900" />}
          trend={{
            value: '+12% dari bulan lalu',
            direction: 'up',
          }}
        />

        {/* Card 2: Total Pengguna Premium */}
        <StatCard
          title="Total Pengguna Premium"
          value="2380"
          icon={<Users className="w-5 h-5 text-sec-900" />}
          trend={{
            value: '-1% dari bulan lalu',
            direction: 'down',
          }}
        />

        {/* Card 3: Total Dokumen */}
        <StatCard
          title="Total Dokumen"
          value="4,783,938"
          icon={<Files className="w-5 h-5 text-sec-900" />}
          trend={{
            value: '+3% dari bulan lalu',
            direction: 'up',
          }}
        />

        {/* Card 4: Total Draf Dokumen */}
        <StatCard
          title="Total Draf Dokumen"
          value="70"
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
          <RevenueTrendChart className="h-full" />
        </div>

        {/* Kolom Kanan: Komposisi Paket Langganan (4 span di lg) */}
        <div className="lg:col-span-4 flex flex-col">
          <SubscriptionDonutChart className="h-full" />
        </div>
      </div>

      {/* 5. Baris 3: Dua Tabel Berdampingan */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* Tabel 1: Transaksi Terakhir */}
        <RecentTransactionsTable className="h-full" />

        {/* Tabel 2: Dokumen Terbaru Diunggah */}
        <RecentDocumentsTable className="h-full" />
      </div>
    </AdminLayout>
  );
}

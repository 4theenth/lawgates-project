import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { LayoutGrid } from 'lucide-react';

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

      {/* 2. Page Header Sesuai Standar Admin Dokumen Hukum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            Dashboard
          </h1>
          <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            Ringkasan analitik dan statistik dokumen regulasi hukum di Indonesia.
          </p>
        </div>
      </div>

      {/* 3. Konten Dashboard Bersih / Kosong Sesuai Permintaan */}
      <div className="w-full min-h-[420px] flex flex-col items-center justify-center rounded-[16px] border border-dashed border-neu-100 bg-white/70 p-12 text-center shadow-2xs">
        <div className="w-14 h-14 rounded-2xl border border-neu-50 bg-gray-50 flex items-center justify-center mb-4 shadow-2xs text-pr-900">
          <LayoutGrid className="w-7 h-7 stroke-[1.75]" />
        </div>
        <h3 className="text-[15px] font-semibold text-neu-900 leading-snug mb-1">
          Selamat Datang di Panel Admin LawGates
        </h3>
        <p className="text-[13px] text-neu-500 max-w-md leading-relaxed">
          Area ini saat ini dikosongkan terlebih dahulu dan siap untuk penambahan widget metrik, statistik dokumen, serta aktivitas terbaru di masa mendatang.
        </p>
      </div>
    </AdminLayout>
  );
}

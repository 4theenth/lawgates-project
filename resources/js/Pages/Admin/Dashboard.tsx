import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';

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

      {/* 2. Page Header Sesuai Standar Halaman Admin Dokumen Hukum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            Dashboard
          </h1>
          <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            Ringkasan statistik dan pengelolaan regulasi hukum LawGates.
          </p>
        </div>
      </div>

      {/* 3. Konten Dashboard (Sementara Dikosongkan Sesuai Request) */}
      <div className="w-full min-h-[400px] rounded-[16px] border border-neu-50 bg-white p-8 flex flex-col items-center justify-center text-center shadow-[0px_2px_12px_rgba(12,12,13,0.03)]">
        <div className="w-12 h-12 rounded-full bg-neu-50 flex items-center justify-center text-neu-400 mb-3">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </div>
        <h3 className="text-md font-semibold text-neu-800">
          Selamat Datang di Panel Admin LawGates
        </h3>
        <p className="text-sm text-neu-500 max-w-md mt-1">
          Area konten dashboard siap dikembangkan untuk widget ringkasan dan statistik regulasi.
        </p>
      </div>
    </AdminLayout>
  );
}

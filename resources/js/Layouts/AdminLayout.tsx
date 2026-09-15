import React, { PropsWithChildren, useState } from 'react';
import { AdminHeader } from '@/Components/admin/AdminHeader';
import { AdminSidebar } from '@/Components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: PropsWithChildren<AdminLayoutProps>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#FCFEFF] text-neu-900 font-sans antialiased">
      {/* Top Header - height 56px */}
      <AdminHeader
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      {/* Container Sidebar & Main Content */}
      <div className="flex">
        {/* Sidebar Navigasi Kiri - width 223px (expanded) / 64px (collapsed) */}
        <AdminSidebar isCollapsed={isSidebarCollapsed} />

        {/* Konten Halaman (Main Body) */}
        <main
          className={`flex-1 transition-all duration-300 min-h-[calc(100vh-56px)] ${
            isSidebarCollapsed ? 'pl-[64px]' : 'pl-[223px]'
          }`}
        >
          <div className="w-full max-w-[1440px] mx-auto p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

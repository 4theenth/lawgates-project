import React, { PropsWithChildren, useState } from 'react';
import { AdminHeader } from '@/Components/admin/AdminHeader';
import { AdminSidebar } from '@/Components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: PropsWithChildren<AdminLayoutProps>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMobileClose = React.useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#FCFEFF] text-neu-900 font-sans antialiased">
      {/* Top Header - Fixed height 56px, stays in place */}
      <AdminHeader
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      {/* Container Sidebar & Main Content */}
      <div className="flex-1 flex min-h-0 w-full overflow-hidden relative">
        {/* Sidebar Navigasi Kiri (Desktop inline + Mobile slide-over drawer) */}
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={handleMobileClose}
        />

        {/* Konten Halaman (Main Body) - Scroll vertikal, 100% full width di mobile */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden transition-all duration-300 bg-[#FCFEFF]">
          <div className="w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-7 min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

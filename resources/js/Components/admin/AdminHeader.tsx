import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bell, PanelLeft } from 'lucide-react';
import profileImg from '@/assets/image 9.png';

interface AdminHeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export function AdminHeader({
  isSidebarCollapsed,
  onToggleSidebar,
}: AdminHeaderProps) {
  const pageProps = usePage().props as { auth?: { user?: { name?: string; email?: string } } };
  const user = pageProps.auth?.user;

  return (
    <header className="sticky top-0 z-30 h-[56px] w-full border-b border-neu-50 bg-white px-4 sm:px-6 flex items-center justify-between transition-all">
      {/* Kiri: Brand LawGates & Tombol Panel-Left */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <span className="font-sans text-[16px] font-semibold leading-[24px] text-black tracking-tight">
            LawGates
          </span>
        </Link>

        {/* Tombol Toggle Sidebar (Panel Left) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          title={isSidebarCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
          className="p-1 rounded-md text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
        >
          <PanelLeft className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* Kanan: Bell Notifikasi & Profile Avatar */}
      <div className="flex items-center gap-4">
        {/* Ikon Bell Notifikasi (Ukuran persis Figma: 13px x 14.33px) */}
        <button
          type="button"
          title="Notifikasi"
          className="relative p-1.5 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Bell className="w-[13px] h-[14.33px] text-gray-700" />
        </button>

        {/* Profile Avatar (Asset image 9.png) */}
        <div className="flex items-center gap-2">
          <div
            className="w-[32px] h-[32px] rounded-full border border-neu-50 shadow-2xs overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat bg-[#e9e9e9]"
            style={{ backgroundImage: `url("${profileImg}")` }}
            title={user?.name || 'User Profile'}
          />
          {user?.name && (
            <span className="hidden md:inline-block text-[13px] font-medium text-neu-900">
              {user.name}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

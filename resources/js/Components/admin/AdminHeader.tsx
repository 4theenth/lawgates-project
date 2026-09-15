import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bell, PanelLeft } from 'lucide-react';
import profileImg from '@/assets/profile-avatar.webp';

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
    <header className="shrink-0 h-[56px] w-full border-b border-neu-50 bg-white px-4 sm:px-6 flex items-center justify-between z-30 transition-all">
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
        {/* Ikon Bell Notifikasi (Frame rounded square putih tanpa fill warna) */}
        <button
          type="button"
          title="Notifikasi"
          className="relative w-[34px] h-[34px] rounded-[10px] bg-white border border-neu-100 flex items-center justify-center text-neu-800 hover:bg-gray-50 hover:text-black transition-colors cursor-pointer shadow-2xs"
        >
          <Bell className="w-[16px] h-[16px] text-neu-800 stroke-[1.75]" />
        </button>

        {/* Profile Avatar */}
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

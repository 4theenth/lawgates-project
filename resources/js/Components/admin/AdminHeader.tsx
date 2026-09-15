import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Bell, PanelLeft } from 'lucide-react';
import { IconButton } from '@/Components/common/IconButton';

interface AdminHeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export function AdminHeader({
  isSidebarCollapsed,
  onToggleSidebar,
}: AdminHeaderProps) {
  const { auth } = usePage().props as any;
  const user = auth?.user;

  const profileImg =
    user?.avatar || '/build/assets/profile-avatar-CViXEeDd.webp';

  return (
    <header className="h-[56px] min-h-[56px] w-full bg-white border-b border-neu-100 flex items-center justify-between px-6 z-20 shrink-0 select-none">
      {/* Kiri: Brand LawGates & Tombol Panel-Left */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <span className="font-sans text-[16px] font-semibold leading-[24px] text-black tracking-tight">
            LawGates
          </span>
        </Link>

        {/* Tombol Toggle Sidebar (Panel Left) */}
        <IconButton
          icon={<PanelLeft className="w-[18px] h-[18px]" />}
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          title={isSidebarCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
        />
      </div>

      {/* Kanan: Bell Notifikasi & Profile Avatar */}
      <div className="flex items-center gap-4">
        {/* Ikon Bell Notifikasi Reusable */}
        <IconButton
          icon={<Bell className="w-[16px] h-[16px] stroke-[1.75]" />}
          variant="default"
          size="md"
          title="Notifikasi"
        />

        {/* Profile Avatar */}
        <div className="flex items-center gap-2">
          <div
            className="w-[32px] h-[32px] rounded-full border border-neu-50 shadow-2xs overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat bg-neu-50"
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

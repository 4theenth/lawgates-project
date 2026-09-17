import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Bell, PanelLeft, User, LogOut, ChevronDown } from 'lucide-react';
import { IconButton } from '@/Components/common/IconButton';
import Dropdown from '@/Components/common/Dropdown';
import profileAvatar from '@/assets/profile-avatar.webp';

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

  const profileImg = user?.avatar || profileAvatar;

  const displayName = user?.name || user?.username || 'Admin';
  const displayEmail = user?.email || 'admin@lawgates.com';
  const displayRole = user?.role || 'admin';

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
      <div className="flex items-center gap-3">
        {/* Ikon Bell Notifikasi Reusable */}
        <IconButton
          icon={<Bell className="w-[16px] h-[16px] stroke-[1.75]" />}
          variant="default"
          size="md"
          title="Notifikasi"
        />

        {/* Profile Avatar Dropdown */}
        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex items-center gap-1.5 cursor-pointer p-1 rounded-full hover:bg-neu-50 transition-colors">
              <div
                className="w-[32px] h-[32px] rounded-full border border-neu-100 shadow-2xs overflow-hidden bg-cover bg-center bg-no-repeat bg-neu-100 shrink-0"
                style={{ backgroundImage: `url("${profileImg}")` }}
                title={displayName}
              />
              <ChevronDown className="w-3.5 h-3.5 text-neu-500 shrink-0 stroke-[2]" />
            </div>
          </Dropdown.Trigger>

          <Dropdown.Content width="48" contentClasses="p-1 bg-white border border-neu-100 rounded-xl shadow-xl">
            {/* Header User Info */}
            <div className="px-3.5 py-2.5 border-b border-neu-50 select-none">
              <p className="text-[13px] font-semibold text-neu-900 truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-neu-500 truncate">
                {displayEmail}
              </p>
              <div className="mt-1.5 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pr-50 text-pr-900">
                {displayRole}
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Dropdown.Link
                href={route('profile.edit')}
                className="flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-neu-700 hover:text-neu-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-3.5 h-3.5 text-neu-500" />
                <span>Pengaturan Profil</span>
              </Dropdown.Link>

              <Dropdown.Link
                href={route('logout')}
                method="post"
                as="button"
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-dan-800 hover:bg-dan-50 rounded-lg transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-dan-800" />
                <span>Keluar (Log Out)</span>
              </Dropdown.Link>
            </div>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </header>
  );
}

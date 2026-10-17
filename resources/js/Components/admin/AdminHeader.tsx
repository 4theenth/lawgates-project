import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Bell, PanelLeft, User, Lock, Globe, LogOut, ChevronDown } from 'lucide-react';
import { IconButton } from '@/Components/common/IconButton';
import Dropdown from '@/Components/common/Dropdown';
import ApplicationLogo from '@/Components/common/ApplicationLogo';
import profileAvatar from '@/assets/profile-avatar.webp';
import { ChangePasswordModal } from '@/Components/admin/ChangePasswordModal';

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

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const profileImg = user?.avatar || profileAvatar;
  const displayName = user?.name || user?.username || 'Super Admin';
  const displayHandle = user?.username
    ? (user.username.startsWith('@') ? user.username : `@${user.username}`)
    : (user?.email ? `@${user.email.split('@')[0]}` : '@super.admin');
  const displayRole = user?.role === 'superadmin' ? 'Admin' : (user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Admin');

  return (
    <>
      <header className="h-[56px] min-h-[56px] w-full bg-white border-b border-neu-50 flex items-center justify-between px-3.5 sm:px-6 z-20 shrink-0 select-none">
        {/* Kiri: Brand LawGates (Desktop) & Tombol Toggle Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="hidden md:flex items-center">
            <ApplicationLogo className="h-[22px] sm:h-[24px] w-auto text-pr-900" />
          </Link>

          {/* Tombol Toggle Sidebar (Di mobile langsung berada di paling kiri) */}
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

            <Dropdown.Content width="56" contentClasses="p-1.5 bg-white border border-neu-100 rounded-2xl shadow-xl">
              {/* Header User Info */}
              <div className="px-3 py-2.5 border-b border-neu-100 select-none">
                <p className="text-[14px] font-semibold text-neu-900 truncate leading-snug">
                  {displayName}
                </p>
                <p className="text-[12px] text-neu-500 truncate mt-0.5">
                  {displayHandle}
                </p>
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[12px] font-medium bg-[#EBF3FF] text-[#2563EB]">
                  {displayRole}
                </div>
              </div>

              {/* Menu Items berbasis Variabel */}
              <div className="py-1">
                {[
                  {
                    label: 'Profile Saya',
                    icon: User,
                    href: route('profile.edit'),
                  },
                  {
                    label: 'Ganti Kata Sandi',
                    icon: Lock,
                    onClick: () => setIsChangePasswordOpen(true),
                  },
                  {
                    label: 'Kembali ke Beranda',
                    icon: Globe,
                    href: '/',
                  },
                ].map((item) => {
                  const IconComponent = item.icon;
                  const itemClass =
                    'w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-neu-800 hover:text-neu-900 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer';

                  if (item.href) {
                    return (
                      <Dropdown.Link key={item.label} href={item.href} className={itemClass}>
                        <span className="w-4 h-4 flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4 text-neu-500" />
                        </span>
                        <span>{item.label}</span>
                      </Dropdown.Link>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.onClick}
                      className={itemClass}
                    >
                      <span className="w-4 h-4 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 text-neu-500" />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                {/* Divider */}
                <div className="my-1 border-t border-neu-100" />

                {/* 4. Keluar (Menggunakan token warna danger resmi: text-dan-800 & bg-dan-50) */}
                <Dropdown.Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-dan-800 hover:bg-dan-50 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <LogOut className="w-4 h-4 text-dan-800" />
                  </span>
                  <span>Keluar</span>
                </Dropdown.Link>
              </div>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </header>

      {/* Modal Ganti Kata Sandi */}
      <ChangePasswordModal
        show={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </>
  );
}

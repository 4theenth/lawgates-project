import React, { PropsWithChildren, useState, useCallback } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  PanelLeft,
  User as UserIcon,
  Globe,
  LogOut,
  ChevronDown,
  Bell,
} from 'lucide-react';
import { IconButton } from '@/Components/common/IconButton';
import Dropdown from '@/Components/common/Dropdown';
import ApplicationLogo from '@/Components/common/ApplicationLogo';
import { AdminSidebar } from '@/Components/admin/AdminSidebar';
import { USER_SIDEBAR_MENUS } from '@/config/navigation';
import profileAvatar from '@/assets/profile-avatar.webp';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: PropsWithChildren<UserLayoutProps>) {
  const { props } = usePage();
  const auth = (props as any)?.auth;
  const user = auth?.user;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMobileClose = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };

  const profileImg = user?.avatar || profileAvatar;
  const displayName = user?.name || user?.username || 'User LawGates';
  const displayHandle = user?.username
    ? (user.username.startsWith('@') ? user.username : `@${user.username}`)
    : (user?.email ? `@${user.email.split('@')[0]}` : '@user');
  const displayRole = user?.role === 'superadmin' ? 'Super Admin' : (user?.role || 'User');

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#FCFEFF] text-neu-900 font-sans antialiased">
      {/* ─────────────────────────────────────────────────────────────
          Top Header (Fixed height 56px, stays in place)
          ───────────────────────────────────────────────────────────── */}
      <header className="h-[56px] min-h-[56px] w-full bg-white border-b border-neu-50 flex items-center justify-between px-3.5 sm:px-6 z-20 shrink-0 select-none">
        {/* Kiri: Brand LawGates & Toggle Sidebar */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="flex items-center" title="Ke Beranda LawGates">
            <ApplicationLogo className="h-[22px] sm:h-[24px] w-auto text-pr-900" />
          </Link>

          <IconButton
            icon={<PanelLeft className="w-[18px] h-[18px]" />}
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            title={isSidebarCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
          />
        </div>

        {/* Kanan: Notifikasi & Profile Avatar Dropdown */}
        <div className="flex items-center gap-3">
          {/* Bell Notifikasi */}
          <IconButton
            icon={<Bell className="w-[16px] h-[16px] stroke-[1.75]" />}
            variant="default"
            size="md"
            title="Notifikasi"
          />

          {/* Profile Dropdown */}
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
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[11px] font-medium bg-pr-50 text-pr-900 capitalize">
                  {displayRole}
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Dropdown.Link
                  href={route('profile.edit')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-neu-800 hover:text-neu-900 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <UserIcon className="w-4 h-4 text-neu-500" />
                  </span>
                  <span>Profile</span>
                </Dropdown.Link>

                <Dropdown.Link
                  href="/"
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-neu-800 hover:text-neu-900 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-neu-500" />
                  </span>
                  <span>Kembali ke Beranda</span>
                </Dropdown.Link>

                <div className="my-1 border-t border-neu-100" />

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

      {/* ─────────────────────────────────────────────────────────────
          Container Sidebar & Main Content
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex min-h-0 w-full overflow-hidden relative">
        {/* Sidebar Navigasi Kiri (Menggunakan AdminSidebar dengan menu User: Dashboard & Bookmark) */}
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          menus={USER_SIDEBAR_MENUS}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={handleMobileClose}
        />

        {/* Konten Halaman (Main Body) - Scroll vertikal, ukuran 1:1 dengan AdminLayout tanpa gap mx-auto */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden transition-all duration-300 bg-[#FCFEFF]">
          <div className="w-full p-4 sm:p-6 lg:p-7 min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

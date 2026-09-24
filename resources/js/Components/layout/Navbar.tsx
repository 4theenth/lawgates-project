import { useState } from 'react';
import { LogIn, Menu, X, User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { NAVBAR_MENUS, NAVBAR_THEME } from '../../config/navigation';
import type { MenuItem } from '../../types/navigation';
import { PAGE_CONTAINER } from '../../Layouts/PublicLayout';
import Dropdown from '@/Components/common/Dropdown';
import ApplicationLogo from '@/Components/common/ApplicationLogo';
import profileAvatar from '@/assets/profile-avatar.webp';

interface NavbarProps {
  isScrolled: boolean;
  menus?: MenuItem[];
}

export function Navbar({ isScrolled, menus = NAVBAR_MENUS }: NavbarProps) {
  const { url, props } = usePage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const auth = (props as any)?.auth;
  const user = auth?.user;

  const profileImg = user?.avatar || profileAvatar;
  const displayName = user?.name || user?.username || 'User';
  const displayEmail = user?.email || '';
  const displayRole = user?.role || 'user';
  const isAdmin = user && ['admin', 'superadmin'].includes(user.role);

  // Helper untuk menentukan apakah menu sedang aktif berdasarkan URL saat ini
  const isMenuActive = (path: string, isIndex?: boolean) => {
    if (isIndex || path === '/') {
      return url === '/' || url === '';
    }
    if (path === '#' || !path) {
      return false;
    }
    return url === path || (path !== '/' && url.startsWith(`${path}/`));
  };

  const isHome = url === '/';
  const isPill = isScrolled || !isHome;
  const theme = isPill ? NAVBAR_THEME.scrolled : NAVBAR_THEME.default;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 h-[74px] flex items-center justify-center pointer-events-none bg-transparent">
        {/* Floating pill container (transitions width, height, glass background, border, shadow) */}
        <div
          className={`relative flex items-center justify-between mx-auto transition-all duration-500 ease-in-out pointer-events-auto ${isPill
              ? 'h-[59px] w-[calc(100%-24px)] sm:w-[calc(100%-32px)] max-w-[1120px] bg-white/90 sm:bg-white/80 backdrop-blur-[16px] border border-white/60 rounded-full shadow-[0px_4px_24px_-2px_rgba(0,0,0,0.08)] px-4 sm:px-6 lg:px-8'
              : 'h-[74px] w-full max-w-[1202px] px-4 sm:px-6 xl:px-0 bg-transparent border-transparent shadow-none'
            }`}
        >
          {/* Brand Logo - slides inward toward the center menu when container narrows */}
          <Link href="/" className="flex items-center gap-2 z-10 transition-transform duration-500">
            <ApplicationLogo
              className={`h-[26px] w-auto transition-colors duration-300 ${
                !isPill ? 'text-white' : 'text-pr-900'
              }`}
            />
          </Link>

          {/* Desktop Auth Section (Login Button OR User Profile Dropdown) */}
          <div className="hidden md:flex items-center gap-4 z-10 transition-transform duration-500">
            {user ? (
              <Dropdown>
                <Dropdown.Trigger>
                  <button
                    type="button"
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-neu-50/20 transition-colors focus:outline-none"
                    title={displayName}
                  >
                    <div
                      className="w-[34px] h-[34px] rounded-full border border-neu-200/60 shadow-2xs overflow-hidden bg-cover bg-center bg-no-repeat bg-neu-100 shrink-0"
                      style={{ backgroundImage: `url("${profileImg}")` }}
                    />
                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 stroke-[2] ${theme.inactiveItem}`} />
                  </button>
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
                    {isAdmin && (
                      <Dropdown.Link
                        href={route('admin.dashboard')}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-neu-700 hover:text-neu-900 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-neu-500" />
                        <span>Dashboard Admin</span>
                      </Dropdown.Link>
                    )}

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
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-dan-800 hover:bg-dan-50 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-dan-800" />
                      <span>Keluar (Log Out)</span>
                    </Dropdown.Link>
                  </div>
                </Dropdown.Content>
              </Dropdown>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-pr-900 hover:bg-pr-800 border border-pr-800 text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all shadow-sm"
              >
                <span>LOGIN</span>
                <LogIn className="w-3.5 h-3.5 text-white" />
              </Link>
            )}
          </div>

          {/* Mobile Right Section (Avatar + Hamburger) */}
          <div className="flex items-center gap-2 md:hidden z-10">
            {user && (
              <div
                className="w-[30px] h-[30px] rounded-full border border-neu-200/60 shadow-2xs overflow-hidden bg-cover bg-center bg-no-repeat bg-neu-100 shrink-0"
                style={{ backgroundImage: `url("${profileImg}")` }}
                title={displayName}
              />
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 -mr-1 focus:outline-none transition-colors duration-300 ${theme.hamburger}`}
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Center Navigation Menu (Desktop: hidden on mobile)
            Positioned directly in <header> at absolute center of the screen
            Completely isolated from the resizing pill to eliminate any jitter / gemeter during scroll */}
        <nav
          className="hidden md:flex items-center gap-[20px] text-sm font-medium absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto select-none"
        >
          {menus.map((item) => {
            const active = isMenuActive(item.path, item.index);
            const isExternal = item.isExternal || item.path.startsWith('http');

            return isExternal ? (
              <a
                key={item.id}
                href={item.disabled ? '#' : item.path}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                target={item.disabled ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`transition-colors duration-300 relative py-1 ${NAVBAR_THEME.fontSize} ${theme.inactiveItem}`}
              >
                {item.title}
              </a>
            ) : (
              <Link
                key={item.id}
                href={item.disabled ? '#' : item.path}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                className={`transition-colors duration-300 relative py-1 ${NAVBAR_THEME.fontSize} ${active
                    ? theme.activeItem
                    : theme.inactiveItem
                  }`}
              >
                {item.title}
                {active && (
                  <span className={`absolute bottom-0 left-0 w-full ${theme.activeIndicator}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Mobile Sidebar / Drawer (Appears when mobileMenuOpen is true) */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-visibility duration-300 ${mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-[320px] bg-[#0A1C3E] border-l border-pr-700 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Top section: Header & Links */}
          <div className="flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-pr-800">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <ApplicationLogo className="h-[24px] w-auto text-white" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-neu-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5 mt-6">
              {menus.map((item) => {
                const active = isMenuActive(item.path, item.index);
                const isExternal = item.isExternal || item.path.startsWith('http');

                return isExternal ? (
                  <a
                    key={item.id}
                    href={item.disabled ? '#' : item.path}
                    target={item.disabled ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (item.disabled) e.preventDefault();
                      else setMobileMenuOpen(false);
                    }}
                    className="px-3.5 py-3 rounded-xl text-sm font-medium text-neu-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    href={item.disabled ? '#' : item.path}
                    onClick={(e) => {
                      if (item.disabled) e.preventDefault();
                      else setMobileMenuOpen(false);
                    }}
                    className={`px-3.5 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${active
                        ? NAVBAR_THEME.mobileMenu.active
                        : NAVBAR_THEME.mobileMenu.inactive
                      }`}
                  >
                    <span>{item.title}</span>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sec-900" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom section: Full-width Login Button or User Profile Card */}
          <div className="pt-6 border-t border-pr-800">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-1">
                  <div
                    className="w-[40px] h-[40px] rounded-full border border-pr-600 shadow-sm overflow-hidden bg-cover bg-center bg-no-repeat shrink-0"
                    style={{ backgroundImage: `url("${profileImg}")` }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-neu-300 truncate">
                      {displayEmail}
                    </p>
                    <span className="mt-1 inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/10 text-white">
                      {displayRole}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-2">
                  {isAdmin && (
                    <Link
                      href={route('admin.dashboard')}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-neu-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-sec-900" />
                      <span>Dashboard Admin</span>
                    </Link>
                  )}

                  <Link
                    href={route('profile.edit')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-neu-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-neu-300" />
                    <span>Pengaturan Profil</span>
                  </Link>

                  <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Keluar (Log Out)</span>
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-sec-900 hover:bg-sec-800 text-pr-900 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.98]"
              >
                <span>Layanan (Login)</span>
                <LogIn className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

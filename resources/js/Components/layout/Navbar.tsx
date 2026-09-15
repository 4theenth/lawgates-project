import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { NAVBAR_MENUS, NAVBAR_THEME } from '../../config/navigation';
import type { MenuItem } from '../../types/navigation';
import { PAGE_CONTAINER } from '../../Layouts/PublicLayout';

interface NavbarProps {
  isScrolled: boolean;
  menus?: MenuItem[];
}

export function Navbar({ isScrolled, menus = NAVBAR_MENUS }: NavbarProps) {
  const { url } = usePage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper untuk menentukan apakah menu sedang aktif berdasarkan URL saat ini
  const isMenuActive = (path: string, isIndex?: boolean) => {
    if (isIndex || path === '/') {
      return url === '/' || url === '';
    }
    return url === path || url.startsWith(`${path}/`);
  };

  const isHome = url === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-[600ms] ease-in-out ${
          isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'
        }`}
      >
        <div
          className={`flex items-center justify-center transition-all duration-[600ms] ease-in-out ${
            isScrolled
              ? 'bg-[#0A1C3E]/60 backdrop-blur-md border border-white/10 shadow-lg rounded-full h-[60px] w-full max-w-[1000px] px-6 lg:px-8'
              : `h-[74px] w-full max-w-[3000px] rounded-none border-b border-transparent ${
                  isHome ? 'bg-transparent' : 'bg-[#0A1C3E] shadow-sm'
                }`
          }`}
        >
          <div
            className={`w-full h-full flex items-center justify-between mx-auto transition-all duration-[600ms] ease-in-out ${
              isScrolled ? 'max-w-[1000px]' : 'max-w-[1202px] px-4 sm:px-6 xl:px-0'
            }`}
          >
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-['Inter'] text-[18px] font-semibold leading-[28px] text-[#FFFFFF]">
                LawGates
              </span>
            </Link>

          {/* Center Navigation Menu (Desktop: hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-[20px] text-sm font-medium">
            {menus.map((item) => {
              const active = isMenuActive(item.path, item.index);
              const isExternal = item.isExternal || item.path.startsWith('http');

              return isExternal ? (
                <a
                  key={item.id}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 relative py-1 ${NAVBAR_THEME.fontSize} ${NAVBAR_THEME.inactiveItem}`}
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`transition-colors duration-200 relative py-1 ${NAVBAR_THEME.fontSize} ${
                    active
                      ? NAVBAR_THEME.activeItem
                      : NAVBAR_THEME.inactiveItem
                  }`}
                >
                  {item.title}
                  {active && (
                    <span className={`absolute bottom-0 left-0 w-full ${NAVBAR_THEME.activeIndicator}`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-pr-900 hover:bg-pr-800 border border-pr-800 text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all shadow-sm"
            >
              <span>LOGIN</span>
              <LogIn className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 -mr-1 text-white hover:text-sec-900 focus:outline-none transition-colors"
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-6 h-6" />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar / Drawer (Appears when mobileMenuOpen is true) */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-visibility duration-300 ${
          mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-[320px] bg-[#0A1C3E] border-l border-pr-700 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                <span className="font-['Inter'] text-[18px] font-semibold text-white">
                  LawGates
                </span>
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
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-3 rounded-xl text-sm font-medium text-neu-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      active
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

          {/* Bottom section: Full-width Login Button */}
          <div className="pt-6 border-t border-pr-800">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-sec-900 hover:bg-sec-800 text-pr-900 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.98]"
            >
              <span>Layanan (Login)</span>
              <LogIn className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

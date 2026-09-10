import { LogIn } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { NAVBAR_MENUS } from '../../config/navigation';
import type { MenuItem } from '../../types/navigation';
import { PAGE_CONTAINER } from '../../Layouts/PublicLayout';

interface NavbarProps {
  isScrolled: boolean;
  menus?: MenuItem[];
}

export function Navbar({ isScrolled, menus = NAVBAR_MENUS }: NavbarProps) {
  const { url } = usePage();

  // Helper untuk menentukan apakah menu sedang aktif berdasarkan URL saat ini
  const isMenuActive = (path: string, isIndex?: boolean) => {
    if (isIndex || path === '/') {
      return url === '/' || url === '';
    }
    return url === path || url.startsWith(`${path}/`);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[66px] z-50 transition-all duration-300 flex items-center justify-center ${
        isScrolled
          ? 'bg-bg-900/90 backdrop-blur-md border-b border-pr-800/80 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className={`${PAGE_CONTAINER} h-[59px] flex items-center justify-between`}>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-['Inter'] text-[18px] font-semibold leading-[28px] text-[#FFFFFF]">
            LawGates
          </span>
        </Link>

        {/* Center Navigation Menu (Figma: width 301px, gap 20px) */}
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
                className="transition-colors duration-200 relative py-1 text-[14px] text-neu-300 hover:text-white"
              >
                {item.title}
              </a>
            ) : (
              <Link
                key={item.id}
                href={item.path}
                className={`transition-colors duration-200 relative py-1 text-[14px] ${
                  active
                    ? 'text-sec-900 font-semibold'
                    : 'text-neu-300 hover:text-white'
                }`}
              >
                {item.title}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full border-b border-sec-900" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Login Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-pr-900 hover:bg-pr-800 border border-pr-800 text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all shadow-sm"
          >
            <span>LOGIN</span>
            <LogIn className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
}

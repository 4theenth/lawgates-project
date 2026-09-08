import { Search, LogIn } from 'lucide-react';
import type { NavItem } from '../../types/navigation';
import { Link } from '@inertiajs/react';

interface NavbarProps {
  isScrolled: boolean;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: 'Beranda', href: '/', isActive: true },
  { label: 'Regulasi', href: '#' },
  { label: 'Langganan', href: '#' },
  { label: 'Tentang', href: '#' },
];

export function Navbar({ isScrolled, navItems = defaultNavItems }: NavbarProps) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#070C18]/90 backdrop-blur-md border-b border-gray-800/80 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white">
            Law<span className="text-[#D4AF37]">Gates</span>
          </span>
        </Link>

        {/* Center Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors duration-200 relative py-1 ${
                item.isActive
                  ? 'text-[#D4AF37] font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
              {item.isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Right Action: Login Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-[#0A1C3E] hover:bg-[#122852] border border-[#233351] text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all shadow-sm"
          >
            <span>LOGIN</span>
            <LogIn className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
}

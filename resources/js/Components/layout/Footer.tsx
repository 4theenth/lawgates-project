import React from 'react';
import { Link } from '@inertiajs/react';
import { Mail, Phone, ChevronRight } from 'lucide-react';
import endlessClouds from '@/assets/endless-clouds.svg';
import ApplicationLogo from '@/Components/common/ApplicationLogo';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const EXPLORE_MENUS = [
  { title: 'Beranda', href: '/', disabled: false },
  { title: 'Regulasi', href: '#', disabled: true },
  { title: 'Langganan', href: '#', disabled: true },
  { title: 'Tentang', href: '#', disabled: true },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-pr-900 text-white overflow-hidden z-10 select-none">
      {/* Endless Clouds SVG Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] invert"
        style={{
          backgroundImage: `url("${endlessClouds}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '56px 28px',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1202px] mx-auto px-4 sm:px-6 xl:px-0 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Kolom Kiri: Brand & Deskripsi */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center" aria-label="Beranda LawGates">
              <ApplicationLogo className="h-[26px] sm:h-[28px] w-auto text-white" />
            </Link>
            <p className="text-[14px] font-normal leading-[24px] text-white/80 max-w-sm text-justify">
              LawGates adalah platform pangkalan data hukum terpadu yang merangkum seluruh peraturan perundang-undangan di Indonesia ke dalam satu titik akses pencarian tanpa harus menelusuri puluhan portal instansi pemerintah yang terpisah.
            </p>

            {/* Circular Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <div
                aria-label="Email LawGates"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 cursor-default select-none"
              >
                <Mail className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div
                aria-label="Instagram LawGates"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 cursor-default select-none"
              >
                <InstagramIcon className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div
                aria-label="Telepon LawGates"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 cursor-default select-none"
              >
                <Phone className="w-4 h-4 stroke-[1.75]" />
              </div>
            </div>
          </div>

          {/* Kolom Tengah: Jelajahi */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="text-[14px] font-bold text-white tracking-wider uppercase">
              JELAJAHI
            </h4>
            <ul className="space-y-3">
              {EXPLORE_MENUS.map((item) => (
                <li key={item.title}>
                  {item.disabled ? (
                    <span className="inline-flex items-center gap-2 text-[14px] text-white/40 cursor-default select-none">
                      <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                      <span>{item.title}</span>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[14px] text-white font-medium hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-all" />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Kanan: Kontak */}
          <div className="md:col-span-3 lg:col-span-4 space-y-4">
            <h4 className="text-[14px] font-bold text-white tracking-wider uppercase">
              KONTAK
            </h4>
            <ul className="space-y-3.5">
              <li className="inline-flex items-center gap-3 text-[14px] text-white/80 cursor-default select-none">
                <Mail className="w-4 h-4 text-white/60 shrink-0 stroke-[1.75]" />
                <span>lawgates@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/80 cursor-default select-none">
                <InstagramIcon className="w-4 h-4 text-white/60 shrink-0 stroke-[1.75]" />
                <span>@lawgates</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/80 cursor-default select-none">
                <Phone className="w-4 h-4 text-white/60 shrink-0 stroke-[1.75]" />
                <span>081365638</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/60">
          <p>© 2026 LAWGATES. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <span className="text-white/40 cursor-default">
              Syarat & Ketentuan
            </span>
            <span className="text-white/40 cursor-default">
              Kebijakan Privasi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

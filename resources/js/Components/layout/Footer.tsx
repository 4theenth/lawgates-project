import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Mail, Phone, ChevronRight } from 'lucide-react';
import endlessClouds from '@/assets/endless-clouds.svg';
import ApplicationLogo from '@/Components/common/ApplicationLogo';
import { useAuthModal } from '@/hooks/useAuthModal';

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
  { title: 'Beranda', href: '/', disabled: false, requiresAuth: false },
  { title: 'Regulasi', href: '/regulasi', disabled: false, requiresAuth: true },
  { title: 'Langganan', href: '#', disabled: true, requiresAuth: false },
  { title: 'Tentang', href: '#', disabled: true, requiresAuth: false },
];

export function Footer() {
  const { url, props } = usePage();
  const { requireAuth } = useAuthModal();
  const isAuthenticated = Boolean((props as any)?.auth?.user);

  // Bersihkan parameter query dan hash agar pengecekan path URL akurat
  const currentPath = url ? url.split('?')[0].split('#')[0] : '/';

  // Helper untuk menentukan apakah menu jelajahi sedang aktif berdasarkan rute saat ini
  const isMenuActive = (href: string) => {
    if (!href || href === '#') return false;
    if (href === '/') {
      return currentPath === '/' || currentPath === '';
    }
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <footer className="relative w-full min-h-[386px] bg-pr-900 text-white overflow-hidden z-10 select-none">
      {/* Endless Clouds SVG Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-12"
        style={{
          backgroundImage: `url("${endlessClouds}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '56px 28px',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1202px] mx-auto px-4 sm:px-6 xl:px-0 pt-[41px] pb-8 flex flex-col justify-between min-h-[386px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0 min-h-[240px]">
          
          {/* Kolom Kiri: Brand & Deskripsi (Figma width: 354px) */}
          <div className="w-full md:w-[354px] shrink-0 space-y-4">
            <Link href="/" className="inline-flex items-center" aria-label="Beranda LawGates">
              <ApplicationLogo className="h-[26px] sm:h-[28px] w-auto text-white" />
            </Link>
            <p className="text-[14px] font-normal leading-[24px] text-white/80 text-justify">
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

          {/* Kolom Tengah: Jelajahi (Figma width: 98px) */}
          <div className="w-full md:w-[98px] shrink-0 space-y-4">
            <h4 className="text-[14px] font-bold text-white tracking-wider uppercase">
              JELAJAHI
            </h4>
            <ul className="space-y-3">
              {EXPLORE_MENUS.map((item) => {
                if (item.disabled) {
                  return (
                    <li key={item.title}>
                      <span className="inline-flex items-center gap-2 text-[14px] text-white/40 cursor-default select-none">
                        <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                        <span>{item.title}</span>
                      </span>
                    </li>
                  );
                }

                const isActive = isMenuActive(item.href);

                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (!item.requiresAuth || isAuthenticated) {
                          return;
                        }
                        e.preventDefault();
                        requireAuth(() => router.visit(item.href), {
                          redirectUrl: item.href,
                        });
                      }}
                      className={`group inline-flex items-center gap-2 text-[14px] transition-colors ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-white/60 hover:text-white font-normal'
                      }`}
                    >
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-all ${
                          isActive
                            ? 'text-white'
                            : 'text-white/40 group-hover:text-white group-hover:translate-x-0.5'
                        }`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Kolom Kanan: Kontak (Figma width: 168px) */}
          <div className="w-full md:w-[168px] shrink-0 space-y-4">
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

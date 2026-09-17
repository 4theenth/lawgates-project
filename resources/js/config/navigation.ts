import {
  LayoutGrid,
  Gavel,
  FileText,
  Users,
} from 'lucide-react';
import type { MenuItem, SidebarMenuItem } from '../types/navigation';

/**
 * ─────────────────────────────────────────────────────────────
 * KONFIGURASI MENU NAVBAR PUBLIK (Header)
 * ─────────────────────────────────────────────────────────────
 * Tambah, ubah, atau hapus menu publik di sini.
 */
export const NAVBAR_MENUS: MenuItem[] = [
  {
    id: 1,
    title: 'Beranda',
    path: '/',
    index: true,
  },
  {
    id: 2,
    title: 'Regulasi',
    path: '/regulasi',
  },
  {
    id: 3,
    title: 'Langganan',
    path: '/langganan',
  },
  {
    id: 4,
    title: 'Tentang',
    path: '/tentang',
  },
];

/**
 * Tema & Gaya Visual Navbar Publik
 * Mengatur font, warna teks aktif / tidak aktif, dan aksen garis bawah.
 */
export const NAVBAR_THEME = {
  fontSize: 'text-[14px]',
  // Kondisi Normal (Belum di-scroll / Hero gelap)
  default: {
    logo: 'text-white',
    activeItem: 'text-sec-900 font-semibold',
    inactiveItem: 'text-neu-300 hover:text-white',
    activeIndicator: 'border-b border-sec-900',
    hamburger: 'text-white hover:text-sec-900',
  },
  // Kondisi Di-scroll (Background Kaca / Bening)
  scrolled: {
    logo: 'text-neu-900',
    activeItem: 'text-pr-900 font-semibold',
    inactiveItem: 'text-neu-900/80 hover:text-neu-900',
    activeIndicator: 'border-b border-pr-900',
    hamburger: 'text-neu-900 hover:text-pr-900',
  },
  // Fallback kompatibilitas
  activeItem: 'text-sec-900 font-semibold',
  inactiveItem: 'text-neu-300 hover:text-white',
  activeIndicator: 'border-b border-sec-900',
  mobileMenu: {
    active: 'text-sec-900 bg-white/10 font-semibold',
    inactive: 'text-neu-200 hover:text-white hover:bg-white/5',
  },
};

/**
 * ─────────────────────────────────────────────────────────────
 * KONFIGURASI MENU SIDEBAR ADMIN (Panel Dashboard)
 * ─────────────────────────────────────────────────────────────
 * Mengatur seluruh menu utama dan sub-menu admin di satu tempat.
 */
export const ADMIN_SIDEBAR_MENUS: SidebarMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutGrid,
  },
  {
    id: 'kategori-hukum',
    label: 'Kategori Hukum',
    href: '/admin/kategori-hukum',
    icon: Gavel,
  },
  {
    id: 'dokumen-hukum',
    label: 'Dokumen Hukum',
    href: '/admin/dokumen-hukum',
    icon: FileText,
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    subItems: [
      { id: 'user-list', label: 'Users', href: '/admin/users' },
      { id: 'admin-list', label: 'Admin', href: '/admin/users/admin' },
    ],
  },
];

// Alias untuk backwards compatibility jika ada modul yang import SIDEBAR_MENUS
export const SIDEBAR_MENUS = ADMIN_SIDEBAR_MENUS;

/**
 * ─────────────────────────────────────────────────────────────
 * TEMA & GAYA VISUAL SIDEBAR ADMIN (Theming Config)
 * ─────────────────────────────────────────────────────────────
 * Ubah saturasi warna, font, hover, dan indikator di sini
 * tanpa perlu mengubah file komponen AdminSidebar.tsx.
 */
export const SIDEBAR_THEME = {
  // Label Section ("Menu")
  categoryLabel: 'px-[14px] text-[11px] font-medium text-neu-400 tracking-wide',

  // Ukuran font teks item utama
  fontSize: 'text-[14px]',

  // Item Menu Utama: Status AKTIF
  activeItem: {
    container: 'text-pr-900 font-bold bg-gray-50/90 rounded-[10px] border-l-[4px] border-pr-900',
    icon: 'text-pr-900',
    indicator: 'bg-pr-900', // Batang aksen vertikal di tepi kiri
  },

  // Item Menu Utama: Status TIDAK AKTIF (atur warna/saturasi di sini: text-neu-500 / text-neu-800)
  inactiveItem: {
    container: 'text-neu-500 font-normal hover:text-black hover:bg-gray-50',
    icon: 'text-neu-600 group-hover:text-black',
  },

  // Item Menu Dropdown / Accordion (Parent yang memiliki sub-menu)
  dropdownParent: {
    container: 'text-neu-800 font-normal hover:bg-gray-50',
    icon: 'text-neu-600',
    arrow: 'text-neu-400',
  },

  // Sub-Menu di dalam Dropdown
  submenuItem: {
    fontSize: 'text-[12px]',
    active: 'text-pr-900 font-semibold bg-gray-50',
    inactive: 'text-neu-600 hover:text-black hover:bg-gray-50',
  },

  // Format dasar item
  itemBase: 'w-full flex items-center rounded-[10px] py-[7px] px-[12px] transition-all cursor-pointer',
};

import type { MenuItem } from '../types/navigation';

/**
 * Konfigurasi Menu Navigasi Utama (Header / Navbar)
 * Tambah atau ubah item menu di sini untuk langsung muncul di Navbar.
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
 * Konfigurasi Menu Sidebar (Panel Admin / Dashboard)
 * Siap pakai untuk panel dashboard admin dengan dukungan Role-Based Access.
 */
export const SIDEBAR_MENUS: MenuItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'layout-dashboard',
    index: true,
    roles: ['Admin', 'Superadmin'],
  },
  {
    id: 2,
    title: 'Kelola Regulasi',
    path: '/admin/regulasi',
    icon: 'files',
    roles: ['Admin', 'Superadmin', 'Editor'],
  },
  {
    id: 3,
    title: 'Kategori & Hierarki',
    path: '/admin/kategori',
    icon: 'file-sliders',
    roles: ['Admin', 'Superadmin'],
  },
  {
    id: 4,
    title: 'Manajemen Pengguna',
    path: '/admin/users',
    icon: 'users',
    roles: ['Admin', 'Superadmin'],
  },
  {
    id: 5,
    title: 'Laporan & Analitik',
    path: '/admin/reports',
    icon: 'bar-chart',
    roles: ['Admin', 'Superadmin'],
  },
  {
    id: 6,
    title: 'Pengaturan Sistem',
    path: '/admin/settings',
    icon: 'settings',
    roles: ['Superadmin'],
  },
];

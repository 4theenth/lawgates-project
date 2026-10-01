/**
 * ─────────────────────────────────────────────────────────────
 * KONSTANTA & KONFIGURASI MODUL TIM (ADMIN PANEL)
 * ─────────────────────────────────────────────────────────────
 * Seluruh teks, opsi filter, konfigurasi empty state, opsi pagination,
 * dan data dummy didefinisikan secara terpusat di sini.
 */

export type TeamStatusTabId = 'aktif' | 'pending' | 'expired' | 'non_aktif';
export type TeamMemberRole = 'Super Admin' | 'Admin';
export type TeamMemberStatus = 'aktif' | 'pending' | 'expired' | 'non_aktif';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  status: TeamMemberStatus;
  avatar?: string;
}

export interface TeamStatusTab {
  id: TeamStatusTabId;
  label: string;
  activeClass: string;
  dotColor: string;
  badgeClass: string;
}

export const TEAM_STATUS_TABS: TeamStatusTab[] = [
  {
    id: 'aktif',
    label: 'Aktif',
    activeClass: 'bg-suc-50 text-suc-900 border border-suc-200 font-semibold shadow-2xs',
    dotColor: 'bg-suc-900',
    badgeClass: 'bg-suc-50 text-suc-900 border border-suc-200',
  },
  {
    id: 'pending',
    label: 'Pending',
    activeClass: 'bg-sec-50 text-sec-900 border border-sec-200 font-semibold shadow-2xs',
    dotColor: 'bg-sec-900',
    badgeClass: 'bg-sec-50 text-sec-900 border border-sec-200',
  },
  {
    id: 'expired',
    label: 'Expired',
    activeClass: 'bg-neu-50 text-neu-900 border border-neu-200 font-semibold shadow-2xs',
    dotColor: 'bg-neu-900',
    badgeClass: 'bg-neu-100 text-neu-800 border border-neu-200',
  },
  {
    id: 'non_aktif',
    label: 'Non Aktif',
    activeClass: 'bg-dan-50 text-dan-900 border border-dan-200 font-semibold shadow-2xs',
    dotColor: 'bg-dan-900',
    badgeClass: 'bg-dan-50 text-dan-900 border border-dan-200',
  },
];

export const TEAM_ROLES: TeamMemberRole[] = ['Super Admin', 'Admin'];

export const TEAM_PAGE_HEADER = {
  title: 'Daftar Tim Lawgates',
  description: 'Kelola daftar tim lawgates yang akan menggunakan sistem ini',
  inviteButtonText: 'Undang Tim',
} as const;

export const TEAM_TOOLBAR = {
  searchPlaceholder: 'Cari nama user, email...',
  filterButtonText: 'Filter',
} as const;

export const TEAM_ACTIONS = {
  view: 'Lihat',
  edit: 'Edit',
  resendInvite: 'Undang Kembali',
  delete: 'Hapus',
  deactivate: 'Nonaktifkan',
  activate: 'Aktifkan',
} as const;

export const TEAM_SECTIONS = {
  pendingAndExpired: {
    sectionTitle: 'Tim Pending & Expired',
    emptyTitle: 'Belum ada tim yang diundang',
    emptyDescription: 'Saat ini tidak ada undangan yang tertunda atau kedaluwarsa.',
  },
  registered: {
    sectionTitle: 'Tim Terdaftar',
    emptyTitle: 'Belum ada tim terdaftar',
    emptyDescription: 'Saat ini tidak ada anggota tim terdaftar.',
  },
  active: {
    sectionTitle: 'Tim Aktif',
    emptyTitle: 'Belum ada tim',
    emptyDescription: 'Saat ini tidak ada tim yang tersedia.',
  },
  inactive: {
    sectionTitle: 'Tim Tidak Aktif',
    emptyTitle: 'Belum ada tim tidak aktif',
    emptyDescription: 'Saat ini tidak ada tim yang dinonaktifkan.',
  },
} as const;

export const TEAM_PAGINATION_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * ─────────────────────────────────────────────────────────────
 * DUMMY DATA TIM SESUAI FIGMA / SCREENSHOT (EXACT 4 ITEMS PER SECTION)
 * ─────────────────────────────────────────────────────────────
 */
export const DUMMY_PENDING_EXPIRED_MEMBERS: TeamMember[] = [
  {
    id: 'pe-1',
    name: 'Mangadi',
    email: 'Mangadi@gmail.com',
    role: 'Super Admin',
    status: 'pending',
  },
  {
    id: 'pe-2',
    name: 'Kevin',
    email: 'Kevin@gmail.com',
    role: 'Admin',
    status: 'pending',
  },
  {
    id: 'pe-3',
    name: 'Monica',
    email: 'Monica@gmail.com',
    role: 'Admin',
    status: 'expired',
  },
  {
    id: 'pe-4',
    name: 'Yudis Purba',
    email: 'Yudis@gmail.com',
    role: 'Super Admin',
    status: 'pending',
  },
];

export const DUMMY_REGISTERED_MEMBERS: TeamMember[] = [
  {
    id: 'reg-1',
    name: 'Kayika Dewa',
    email: 'Dewa@gmail.com',
    role: 'Super Admin',
    status: 'aktif',
  },
  {
    id: 'reg-2',
    name: 'Danan',
    email: 'Dana@gmail.com',
    role: 'Super Admin',
    status: 'aktif',
  },
  {
    id: 'reg-3',
    name: 'Satria',
    email: 'Satria@gmail.com',
    role: 'Super Admin',
    status: 'aktif',
  },
  {
    id: 'reg-4',
    name: 'Adi Wirata',
    email: 'Adiwirata@gmail.com',
    role: 'Super Admin',
    status: 'non_aktif',
  },
];

export const DUMMY_ACTIVE_MEMBERS = DUMMY_REGISTERED_MEMBERS;

export const DUMMY_INACTIVE_MEMBERS: TeamMember[] = [
  {
    id: 'inact-1',
    name: 'Budi Santoso',
    email: 'Budi@gmail.com',
    role: 'Admin',
    status: 'non_aktif',
  },
  {
    id: 'inact-2',
    name: 'Rian Firmansyah',
    email: 'Rian@gmail.com',
    role: 'Super Admin',
    status: 'non_aktif',
  },
];

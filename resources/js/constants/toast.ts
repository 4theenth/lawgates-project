/**
 * ─────────────────────────────────────────────────────────────
 * KONSTANTA & TEMA NOTIFIKASI TOAST (ADMIN & GLOBAL)
 * ─────────────────────────────────────────────────────────────
 * Konfigurasi tema warna toast dipisahkan ke file ini agar
 * terpusat dan menggunakan semantic token standar LawGates (app.css)
 * tanpa arbitrary hex code.
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'delete';

export interface ToastThemeConfig {
  container: string;
  textColor: string;
  descColor: string;
  iconBadge: string;
  progressTrack: string;
  progressBar: string;
  closeColor: string;
}

export const TOAST_THEMES: Record<ToastType, ToastThemeConfig> = {
  success: {
    container: 'bg-suc-100 border border-suc-200',
    textColor: 'text-suc-900',
    descColor: 'text-suc-800',
    iconBadge: 'bg-suc-700 text-white',
    progressTrack: 'bg-suc-300',
    progressBar: 'bg-suc-900',
    closeColor: 'text-suc-800 hover:text-suc-900',
  },
  delete: {
    container: 'bg-suc-100 border border-suc-200',
    textColor: 'text-suc-900',
    descColor: 'text-suc-800',
    iconBadge: 'bg-suc-700 text-white',
    progressTrack: 'bg-suc-300',
    progressBar: 'bg-suc-900',
    closeColor: 'text-suc-800 hover:text-suc-900',
  },
  error: {
    container: 'bg-dan-50 border border-dan-200',
    textColor: 'text-dan-900',
    descColor: 'text-dan-800',
    iconBadge: 'bg-dan-900 text-white',
    progressTrack: 'bg-dan-200',
    progressBar: 'bg-dan-900',
    closeColor: 'text-dan-800 hover:text-dan-900',
  },
  warning: {
    container: 'bg-sec-50 border border-sec-200',
    textColor: 'text-sec-900',
    descColor: 'text-sec-800',
    iconBadge: 'bg-sec-700 text-white',
    progressTrack: 'bg-sec-200',
    progressBar: 'bg-sec-900',
    closeColor: 'text-sec-800 hover:text-sec-900',
  },
  info: {
    container: 'bg-pr-50 border border-pr-200',
    textColor: 'text-pr-900',
    descColor: 'text-pr-800',
    iconBadge: 'bg-pr-700 text-white',
    progressTrack: 'bg-pr-200',
    progressBar: 'bg-pr-900',
    closeColor: 'text-pr-800 hover:text-pr-900',
  },
};

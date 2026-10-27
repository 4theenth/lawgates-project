import React from 'react';
import { RefreshCw, TriangleAlert } from 'lucide-react';

interface TimelineErrorStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
  className?: string;
}

/**
 * Tampilan gagal-muat khusus blok timeline.
 *
 * Gulungan besar yang menutupi seluruh kartu ("Gagal memuat... coba muat ulang
 * halaman") memaksa pengguna me-reload seluruh halaman padahal hanya data
 * timeline yang bermasalah. Di sini kegagalan dipersempit ke satu kartu dan
 * satu tombol, sehingga filter, grafik, serta bagian lain halaman /regulasi
 * tetap bisa dipakai.
 */
export function TimelineErrorState({
  onRetry,
  isRetrying = false,
  className = '',
}: TimelineErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`py-12 px-4 flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="w-[50px] h-[50px] rounded-[15px] border border-neu-50 bg-white shadow-2xs flex items-center justify-center mb-3">
        <TriangleAlert
          className="w-6 h-6 text-dan-900 stroke-[1.8]"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-1 max-w-[380px]">
        <h4 className="text-sm font-medium text-neu-900">
          Data timeline belum bisa dimuat
        </h4>
        <p className="text-xs text-neu-600 leading-relaxed">
          Koneksi ke layanan data sedang terganggu. Filter dan bagian lain
          halaman ini tetap bisa dipakai.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-neu-50 bg-white px-4 py-2 text-xs font-medium text-neu-900 shadow-2xs transition-colors hover:bg-pr-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pr-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw
          className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        {isRetrying ? 'Memuat ulang…' : 'Muat ulang data ini'}
      </button>
    </div>
  );
}

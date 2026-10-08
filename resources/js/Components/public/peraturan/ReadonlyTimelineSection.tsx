import React, { useEffect, useRef } from 'react';
import { History } from 'lucide-react';
import { Link } from '@inertiajs/react';

export interface ReadonlyTimelineItem {
  id: string;
  kode?: string;
  judul?: string;
  href?: string;
  isCurrent?: boolean;
  isAvailable?: boolean;
  keteranganBadge?: {
    label: string;
    variant?: string;
  };
  statusBadge?: {
    label: string;
    variant?: string;
  };
  currentStatusLabel?: string;
}

interface ReadonlyTimelineSectionProps {
  riwayatPerubahan: ReadonlyTimelineItem[];
  onRelasiClick?: () => void;
}

export function ReadonlyTimelineSection({
  riwayatPerubahan,
  onRelasiClick,
}: ReadonlyTimelineSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentItemRef.current && scrollContainerRef.current) {
      // Hitung posisi agar currentItem berada di tengah container
      const container = scrollContainerRef.current;
      const element = currentItemRef.current;

      const containerHeight = container.clientHeight;
      const elementHeight = element.clientHeight;
      const elementOffset = element.offsetTop;

      const scrollTo = elementOffset - containerHeight / 2 + elementHeight / 2;

      container.scrollTo({
        top: scrollTo,
        behavior: 'auto',
      });
    }
  }, [riwayatPerubahan]);

  return (
    <div className="bg-white rounded-2xl border border-neu-50 p-5 shadow-2xs">
      {/* Header Capsule Sesuai Figma */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-pr-50 text-pr-900">
          <History className="w-4 h-4 stroke-[2.2] text-pr-900" />
          <span className="text-[12px] font-bold tracking-wide uppercase">
            RIWAYAT PERUBAHAN
          </span>
        </div>
      </div>

      {/* Vertical Timeline - Scrollable container responsif */}
      <div
        ref={scrollContainerRef}
        className="relative pl-1 max-h-[460px] overflow-y-auto pr-1.5 custom-scrollbar"
      >
        {riwayatPerubahan.map((item, index) => {
          const isLast = index === riwayatPerubahan.length - 1;

          return (
            <div
              key={item.id}
              ref={item.isCurrent ? currentItemRef : null}
              className="relative flex items-stretch gap-3.5 min-w-0"
            >
              {/* Kolom Node & Garis Vertikal Menyambung */}
              <div className="relative flex flex-col items-center shrink-0 w-4">
                {/* Node Titik */}
                {item.isCurrent ? (
                  <div className="relative z-10 w-4 h-4 rounded-full bg-pr-900 shadow-[0_0_12px_rgba(10,28,62,0.6)] shrink-0 mt-0.5" />
                ) : (
                  <div className="relative z-10 w-4 h-4 rounded-full border-2 border-neu-300 bg-white shrink-0 mt-0.5" />
                )}

                {/* Garis vertikal yang menyambung otomatis ke node berikutnya */}
                {!isLast && (
                  <div className="w-[1.5px] flex-1 bg-neu-200 my-1 min-h-[28px]" />
                )}
              </div>

              {/* Konten Riwayat */}
              <div className={`min-w-0 flex-1 space-y-1.5 ${isLast ? 'pb-2' : 'pb-6'}`}>
                {item.href ? (
                  <Link href={item.href} className="block group">
                    <p className="text-[13px] font-medium text-neu-800 group-hover:text-pr-900 transition-colors leading-snug break-words">
                      {item.judul || item.kode}
                    </p>
                  </Link>
                ) : (
                  <p
                    className={`text-[13px] leading-snug break-words ${
                      item.isCurrent
                        ? 'font-bold text-pr-900'
                        : item.isAvailable === false
                        ? 'font-medium text-neu-500'
                        : 'font-medium text-neu-800'
                    }`}
                  >
                    {item.judul || item.kode}
                  </p>
                )}

                {/* Status & Keterangan Row */}
                <div className="flex items-center gap-2 flex-wrap pt-0.5">
                  {item.isAvailable === false && (
                    <span className="text-dan-900 text-[12px] font-medium leading-none">
                      Dokumen belum tersedia
                    </span>
                  )}
                  {item.keteranganBadge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-[15px] bg-pr-50 text-pr-900 text-[11px] font-medium leading-normal">
                      {item.keteranganBadge.label}
                    </span>
                  )}
                  {item.isCurrent && !item.keteranganBadge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-[15px] bg-pr-50 text-pr-900 text-[11px] font-medium leading-normal">
                      {item.currentStatusLabel || 'Dokumen Saat Ini'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {riwayatPerubahan.length === 0 && (
          <div className="text-center py-6">
            <p className="text-xs text-neu-500 italic">
              Tidak ada catatan relasi hukum.
            </p>
          </div>
        )}
      </div>

      {/* Tombol RELASI */}
      {onRelasiClick && (
        <div className="pt-3 mt-3 border-t border-neu-50">
          <button
            type="button"
            onClick={onRelasiClick}
            className="w-full py-2.5 rounded-full bg-pr-900 hover:bg-pr-800 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-2xs cursor-pointer"
          >
            RELASI
          </button>
        </div>
      )}
    </div>
  );
}

export default ReadonlyTimelineSection;

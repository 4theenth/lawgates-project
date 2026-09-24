import React, { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { TimelineRelationItem } from '../../admin/import/correctionParser';
import { Badge } from '@/Components/common/Badge';
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
      
      const scrollTo = elementOffset - (containerHeight / 2) + (elementHeight / 2);
      
      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [riwayatPerubahan]);

  return (
    <div className="bg-white rounded-[24px] border border-neu-100 p-5 shadow-2xs">
      {/* Header Capsule Relasi Sesuai Permintaan */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9EEF4] text-[#0A192F]">
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.2] text-[#0A192F]" />
          <span className="text-[12px] font-bold tracking-wide uppercase">
            RELASI
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
                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#0A192F] shadow-[0_0_12px_rgba(10,25,47,0.55)] shrink-0 mt-0.5" />
                ) : (
                  <div className="relative z-10 w-4 h-4 rounded-full border-2 border-[#94A3B8] bg-white shrink-0 mt-0.5" />
                )}

                {/* Garis vertikal yang menyambung otomatis ke node berikutnya */}
                {!isLast && (
                  <div className="w-[1.5px] flex-1 bg-[#CBD5E1] my-1 min-h-[28px]" />
                )}
              </div>

              {/* Konten Riwayat */}
              <div className={`min-w-0 flex-1 space-y-1.5 ${isLast ? 'pb-2' : 'pb-6'}`}>
                {item.href ? (
                  <Link href={item.href} className="block group">
                    <p className="text-[13px] font-medium text-gray-800 group-hover:text-blue-700 transition-colors leading-snug break-words">
                      {item.judul || item.kode}
                    </p>
                  </Link>
                ) : (
                  <p
                    className={`text-[13px] leading-snug break-words ${
                      item.isCurrent
                        ? 'font-bold text-[#0A1931]'
                        : item.isAvailable === false
                        ? 'font-medium text-gray-500'
                        : 'font-medium text-gray-800'
                    }`}
                  >
                    {item.judul || item.kode}
                  </p>
                )}

                {/* Status & Keterangan Row */}
                <div className="flex items-center gap-2 flex-wrap pt-0.5">
                  {item.isAvailable === false && (
                    <span className="text-[#DC2626] text-[12px] font-medium leading-none">
                      Dokumen belum tersedia
                    </span>
                  )}
                  {item.keteranganBadge && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#E9EEF4] text-[#1E293B] text-[11px] font-medium leading-normal">
                      {item.keteranganBadge.label}
                    </span>
                  )}
                  {item.isCurrent && !item.keteranganBadge && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#E9EEF4] text-[#1E293B] text-[11px] font-medium leading-normal">
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
            <p className="text-xs text-gray-500 italic">Tidak ada catatan relasi hukum.</p>
          </div>
        )}
      </div>

      {/* Tombol RELASI */}
      {onRelasiClick && (
        <div className="pt-3 mt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onRelasiClick}
            className="w-full py-2.5 rounded-xl bg-[#0A1C3E] hover:bg-[#071530] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-2xs cursor-pointer"
          >
            RELASI
          </button>
        </div>
      )}
    </div>
  );
}

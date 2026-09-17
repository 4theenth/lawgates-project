import React, { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { TimelineRelationItem } from '../../admin/import/correctionParser';
import { Badge } from '@/Components/common/Badge';
import { Link } from '@inertiajs/react';

export interface ReadonlyTimelineItem extends TimelineRelationItem {
  href?: string;
  judul?: string;
}

interface ReadonlyTimelineSectionProps {
  riwayatPerubahan: ReadonlyTimelineItem[];
}

export function ReadonlyTimelineSection({
  riwayatPerubahan,
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
      {/* Header Capsule Riwayat Perubahan Sesuai Desain */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9EEF4] text-[#0A192F]">
          <RotateCcw className="w-4 h-4 stroke-[2.2] text-[#0A192F]" />
          <span className="text-[12px] font-bold tracking-wide uppercase">
            STATUS & RELASI
          </span>
        </div>
      </div>

      {/* Vertical Timeline - Scrollable container responsif */}
      <div 
        ref={scrollContainerRef}
        className="relative pl-1 max-h-[420px] overflow-y-auto pr-1.5 custom-scrollbar"
      >
        {riwayatPerubahan.map((item, index) => {
          const isLast = index === riwayatPerubahan.length - 1;

          const ContentNode = () => (
            <div className={`w-full rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-[13px] font-medium text-neu-800 break-words leading-snug shadow-2xs transition-all ${item.href ? 'hover:border-pr-900 hover:shadow-md cursor-pointer' : ''}`}>
              {item.judul || item.kode}
            </div>
          );

          return (
            <div 
              key={item.id} 
              ref={item.isCurrent ? currentItemRef : null}
              className="relative flex items-stretch gap-4 min-w-0"
            >
              {/* Kolom Node & Garis Vertikal Menyambung */}
              <div className="relative flex flex-col items-center shrink-0 w-5">
                {/* Node Titik */}
                {item.isCurrent ? (
                  <div className="relative z-10 w-5 h-5 rounded-full bg-[#0A192F] shadow-[0_0_14px_rgba(10,25,47,0.65)] shrink-0 mt-3" />
                ) : (
                  <div className="relative z-10 w-5 h-5 rounded-full border-2 border-[#94A3B8] bg-white shrink-0 mt-3" />
                )}

                {/* Garis vertikal yang menyambung otomatis ke node berikutnya */}
                {!isLast && (
                  <div className="w-[2px] flex-1 bg-[#CBD5E1] my-0.5 min-h-[24px]" />
                )}
              </div>

              {/* Konten Riwayat */}
              <div className={`min-w-0 flex-1 space-y-2 ${isLast ? 'pb-2' : 'pb-6'}`}>
                {item.href ? (
                  <Link href={item.href} className="block w-full">
                    <ContentNode />
                  </Link>
                ) : (
                  <ContentNode />
                )}

                {item.isCurrent ? (
                  <div>
                    <Badge variant="primary">
                      {item.currentStatusLabel || 'Dokumen Saat Ini'}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5 items-start">
                    {item.statusBadge && (
                      <Badge
                        variant={
                          item.statusBadge.variant === 'tersedia'
                            ? 'success'
                            : 'danger'
                        }
                      >
                        {item.statusBadge.label}
                      </Badge>
                    )}
                    {item.keteranganBadge && (
                      <Badge
                        variant={
                          item.keteranganBadge.variant === 'diubah' ||
                          item.keteranganBadge.variant === 'mengubah'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {item.keteranganBadge.label}
                      </Badge>
                    )}
                  </div>
                )}
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
    </div>
  );
}

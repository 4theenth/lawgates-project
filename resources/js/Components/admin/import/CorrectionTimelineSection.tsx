import React from 'react';
import { RotateCcw } from 'lucide-react';
import { TimelineRelationItem } from './correctionParser';
import { Badge } from '@/Components/common/Badge';

interface CorrectionTimelineSectionProps {
  riwayatPerubahan: TimelineRelationItem[];
}

export function CorrectionTimelineSection({
  riwayatPerubahan,
}: CorrectionTimelineSectionProps) {
  return (
    <div className="bg-white rounded-[24px] border border-neu-100 p-5 shadow-2xs">
      {/* Header Capsule Riwayat Perubahan Sesuai Desain */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9EEF4] text-[#0A192F]">
          <RotateCcw className="w-4 h-4 stroke-[2.2] text-[#0A192F]" />
          <span className="text-[12px] font-bold tracking-wide uppercase">
            RIWAYAT PERUBAHAN
          </span>
        </div>
      </div>

      {/* Vertical Timeline - Scrollable container responsif */}
      <div className="relative pl-1 space-y-5 max-h-[380px] overflow-y-auto pr-1.5 before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#CBD5E1]">
        {riwayatPerubahan.map((item) => {
          if (item.isCurrent) {
            return (
              <div key={item.id} className="relative flex items-start gap-4 min-w-0">
                {/* Node Titik Hitam Menyala / Glow (Sedang Dikoreksi) */}
                <div className="relative z-10 w-5 h-5 rounded-full bg-[#0A192F] shadow-[0_0_14px_rgba(10,25,47,0.65)] mt-3 shrink-0" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div
                    className="rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px] font-medium text-neu-800 break-all leading-snug"
                    title={item.kode}
                  >
                    {item.kode}
                  </div>
                  <div>
                    <Badge variant="primary">
                      {item.currentStatusLabel || 'Sedang dikoreksi'}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className="relative flex items-start gap-4 min-w-0">
              {/* Node Titik Putih Bergaris Abu */}
              <div className="relative z-10 w-5 h-5 rounded-full border-2 border-[#94A3B8] bg-white mt-3 shrink-0" />

              <div className="min-w-0 flex-1 space-y-2">
                <div
                  className="rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px] font-medium text-neu-800 break-all leading-snug"
                  title={item.kode}
                >
                  {item.kode}
                </div>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

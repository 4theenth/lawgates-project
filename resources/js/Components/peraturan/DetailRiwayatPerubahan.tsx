import React from 'react';
import { RotateCcw } from 'lucide-react';

export interface DetailTimelineItem {
  id: string;
  judul: string;
  tahun?: string | number;
  statusBadge?: string;
  isCurrent?: boolean;
}

export interface DetailRiwayatPerubahanProps {
  riwayat?: DetailTimelineItem[];
  onRelasiClick?: () => void;
}

export function DetailRiwayatPerubahan({
  riwayat = [
    {
      id: 'rev-1',
      judul: 'Perubahan Pertama Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      tahun: 'Tahun 1999',
      statusBadge: 'Diubah',
      isCurrent: false,
    },
    {
      id: 'rev-2',
      judul: 'Perubahan Kedua Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      tahun: 'Tahun 2000',
      statusBadge: 'Diubah',
      isCurrent: true,
    },
    {
      id: 'rev-3',
      judul: 'Perubahan Ketiga Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      tahun: 'Tahun 2001',
      statusBadge: 'Diubah',
      isCurrent: false,
    },
    {
      id: 'rev-4',
      judul: 'Perubahan Ke-empat Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      tahun: 'Tahun 2002',
      isCurrent: false,
    },
  ],
  onRelasiClick,
}: DetailRiwayatPerubahanProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-2xs space-y-5 sticky top-24">
      {/* Header Capsule Riwayat Perubahan */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9EEF4] text-[#0A1C3E]">
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.2] text-[#0A1C3E]" />
          <span className="text-[11px] font-bold tracking-wide uppercase">
            RIWAYAT PERUBAHAN
          </span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 custom-scrollbar">
        {riwayat.map((item, index) => {
          const isLast = index === riwayat.length - 1;

          return (
            <div key={item.id} className="relative flex items-stretch gap-3.5 min-w-0">
              {/* Kolom Node & Garis Vertikal */}
              <div className="relative flex flex-col items-center shrink-0 w-4">
                {/* Node Circle */}
                {item.isCurrent ? (
                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#0A1C3E] shadow-[0_0_12px_rgba(10,28,62,0.6)] shrink-0 mt-1" />
                ) : (
                  <div className="relative z-10 w-4 h-4 rounded-full border-2 border-gray-300 bg-white shrink-0 mt-1" />
                )}

                {/* Garis vertikal penghubung */}
                {!isLast && (
                  <div className="w-[1.5px] flex-1 bg-gray-200 my-0.5 min-h-[30px]" />
                )}
              </div>

              {/* Konten Item */}
              <div className={`min-w-0 flex-1 space-y-1.5 ${isLast ? 'pb-2' : 'pb-5'}`}>
                <p
                  className={`text-[12px] leading-snug ${
                    item.isCurrent
                      ? 'font-bold text-gray-900'
                      : 'font-medium text-gray-700 hover:text-gray-900 transition-colors'
                  }`}
                >
                  {item.judul}
                </p>

                <div className="flex items-center gap-2">
                  {item.tahun && (
                    <span className="text-[11px] text-gray-400 font-medium">
                      {item.tahun}
                    </span>
                  )}
                  {item.statusBadge && (
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-[#EBF2FA] text-pr-900 border border-pr-200">
                      {item.statusBadge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tombol RELASI */}
      <div className="pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onRelasiClick}
          className="w-full py-2.5 rounded-xl bg-[#0A1C3E] hover:bg-[#081734] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-2xs cursor-pointer"
        >
          RELASI
        </button>
      </div>
    </div>
  );
}

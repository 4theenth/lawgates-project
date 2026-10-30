import React, { useState } from 'react';
import { FileClock, ChevronUp, ChevronDown, Check, X } from 'lucide-react';

export interface AuditTrailItem {
  id: number | string;
  title: string;
  timestamp: string;
  status?: 'created' | 'approved' | 'updated' | 'rejected';
}

export interface CorrectionAuditTimelineProps {
  items: AuditTrailItem[];
  historyCount?: number;
}

export const CorrectionAuditTimeline: React.FC<CorrectionAuditTimelineProps> = ({
  items,
  historyCount,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Pastikan urutan jejak audit: yang paling baru berada di paling atas
  const displayItems = [...items].sort((a, b) => {
    const idA = typeof a.id === 'number' ? a.id : parseInt(String(a.id), 10) || 0;
    const idB = typeof b.id === 'number' ? b.id : parseInt(String(b.id), 10) || 0;
    return idB - idA;
  });

  const totalCount = historyCount ?? displayItems.length;

  return (
    <div className="w-full bg-white border border-neu-50 rounded-[15px] p-5 lg:p-6 shadow-2xs">
      {/* Header Jejak Audit */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer select-none pb-3 border-b border-neu-50"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <FileClock className="w-5 h-5 text-neu-900 shrink-0" />
            <h3 className="text-[16px] font-medium text-neu-900">
              Jejak Audit
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-pr-50 text-pr-900 text-[12px] font-normal">
            {totalCount} Riwayat
          </span>
        </div>

        <button
          type="button"
          className="text-neu-500 hover:text-neu-700 p-1 rounded-md transition-colors cursor-pointer"
          title={isOpen ? 'Tutup jejak audit' : 'Buka jejak audit'}
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Timeline Content */}
      {isOpen && (
        <div className="pt-6 pl-2 animate-in fade-in duration-200">
          <div className="flex flex-col">
            {displayItems.map((item, idx) => {
              const isLast = idx === displayItems.length - 1;

              return (
                <div key={item.id} className="flex gap-4">
                  {/* Kolom Node & Garis Vertikal */}
                  <div className="flex flex-col items-center">
                    {/* Bullet Indicator */}
                    <div className="shrink-0 flex items-center justify-center">
                      {item.status === 'updated' ? (
                        <div className="w-[22px] h-[22px] rounded-full bg-suc-50 border border-suc-900 text-suc-900 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : item.status === 'approved' ? (
                        <div className="w-[22px] h-[22px] rounded-full bg-pr-900 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      ) : item.status === 'rejected' ? (
                        <div className="w-[22px] h-[22px] rounded-full bg-dan-50 border border-dan-900 text-dan-900 flex items-center justify-center">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-[22px] h-[22px] rounded-full bg-white border border-[#6C778B] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#6C778B]" />
                        </div>
                      )}
                    </div>

                    {/* Garis vertikal penghubung hanya muncul jika bukan item paling bawah */}
                    {!isLast && (
                      <div className="w-[1.5px] bg-[#D4D4D4] grow my-1 min-h-[34px]" />
                    )}
                  </div>

                  {/* Konten Teks Log */}
                  <div className={`flex flex-col ${isLast ? 'pb-1' : 'pb-6'}`}>
                    <span className="text-[14px] font-medium text-neu-900 leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[12px] font-normal text-neu-500 leading-tight mt-1.5">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectionAuditTimeline;


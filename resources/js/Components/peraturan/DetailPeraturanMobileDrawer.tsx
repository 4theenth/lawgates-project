import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, RotateCcw, X } from 'lucide-react';
import { ReadonlyTableOfContents } from '@/Components/public/peraturan/ReadonlyTableOfContents';
import { ReadonlyTimelineSection, ReadonlyTimelineItem } from '@/Components/public/peraturan/ReadonlyTimelineSection';
import { ChapterItem } from '@/Components/admin/import/correctionParser';

interface DetailPeraturanMobileDrawerProps {
  pembukaanData: any;
  babList: ChapterItem[];
  activeSectionId?: string;
  onSearchChange: (query: string) => void;
  onNavigateToStruktur: (id: string) => void;
  onNavigateToPasal: (id: string) => void;
  onNavigateToPembukaan: () => void;
  onNavigateToSection: (sectionId: string) => void;
  timelineData: ReadonlyTimelineItem[];
  onRelasiClick: () => void;
}

export function DetailPeraturanMobileDrawer({
  pembukaanData,
  babList,
  activeSectionId,
  onSearchChange,
  onNavigateToStruktur,
  onNavigateToPasal,
  onNavigateToPembukaan,
  onNavigateToSection,
  timelineData,
  onRelasiClick,
}: DetailPeraturanMobileDrawerProps) {
  const [mobileDrawer, setMobileDrawer] = useState<'toc' | 'relasi' | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const closingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback((callback?: () => void) => {
    if (isClosing) return;
    setIsClosing(true);
    callback?.();

    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current);
    }
    closingTimeoutRef.current = setTimeout(() => {
      setMobileDrawer(null);
      setIsClosing(false);
      closingTimeoutRef.current = null;
    }, 300);
  }, [isClosing]);

  const handleOpen = useCallback((type: 'toc' | 'relasi') => {
    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current);
      closingTimeoutRef.current = null;
    }
    setIsClosing(false);
    setMobileDrawer(type);
  }, []);

  useEffect(() => {
    return () => {
      if (closingTimeoutRef.current) {
        clearTimeout(closingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileDrawer || isClosing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileDrawer, isClosing, handleClose]);

  return (
    <>
      {/* Mobile Bottom Navigation Bar (Khusus Layar HP) */}
      <div className="lg:hidden fixed bottom-[calc(env(safe-area-inset-bottom)_+_1rem)] left-4 right-4 z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-xl flex items-center justify-between border border-slate-800">
        <button
          type="button"
          onClick={() => handleOpen('toc')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Menu className="w-4 h-4 text-amber-400" />
          <span>Daftar Isi</span>
        </button>

        <button
          type="button"
          onClick={() => handleOpen('relasi')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-sky-400" />
          <span>Status & Relasi</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Drawer Modal */}
      {mobileDrawer && (
        <div
          data-modal-open
          className={`lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex flex-col justify-end ${
            isClosing
              ? 'animate-out fade-out duration-300 fill-mode-forwards pointer-events-none'
              : 'animate-in fade-in duration-200'
          }`}
          onClick={() => handleClose()}
        >
          <div
            className={`relative z-10 bg-white rounded-t-2xl max-h-[80dvh] flex flex-col p-4 pb-[calc(env(safe-area-inset-bottom)_+_1rem)] space-y-3 shadow-2xl border-t border-neu-100 overflow-hidden ${
              isClosing
                ? 'animate-out slide-out-to-bottom duration-300 ease-in fill-mode-forwards pointer-events-none'
                : 'animate-in slide-in-from-bottom duration-300 ease-out'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                {mobileDrawer === 'toc' ? 'DAFTAR ISI' : 'STATUS & RELASI'}
              </h3>
              <button
                type="button"
                onClick={() => handleClose()}
                className="p-1 rounded-lg bg-gray-100 text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {mobileDrawer === 'toc' ? (
              <div className="flex-1 min-h-0 overflow-hidden">
                <ReadonlyTableOfContents
                  className="h-full min-h-0"
                  pembukaanJudul="Pembukaan"
                  pembukaanData={pembukaanData}
                  babList={babList}
                  activeSectionId={activeSectionId}
                  hideHeader
                  onSearchChange={onSearchChange}
                  onNavigateToStruktur={(id) => {
                    handleClose(() => onNavigateToStruktur(id));
                  }}
                  onNavigateToPasal={(id) => {
                    handleClose(() => onNavigateToPasal(id));
                  }}
                  onNavigateToPembukaan={() => {
                    handleClose(() => onNavigateToPembukaan());
                  }}
                  onNavigateToSection={(sectionId) => {
                    handleClose(() => onNavigateToSection(sectionId));
                  }}
                />
              </div>
            ) : (
              <ReadonlyTimelineSection
                riwayatPerubahan={timelineData}
                className="min-h-0"
                onRelasiClick={() => {
                  handleClose(() => onRelasiClick());
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

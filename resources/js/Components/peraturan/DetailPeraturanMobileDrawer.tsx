import React, { useState } from 'react';
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

  return (
    <>
      {/* Mobile Bottom Navigation Bar (Khusus Layar HP) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-xl flex items-center justify-between border border-slate-800">
        <button
          type="button"
          onClick={() => setMobileDrawer('toc')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Menu className="w-4 h-4 text-amber-400" />
          <span>Daftar Isi</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileDrawer('relasi')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-sky-400" />
          <span>Status & Relasi</span>
        </button>
      </div>

      {/* Mobile Bottom Sheet Drawer Modal */}
      {mobileDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto p-4 space-y-3 relative shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-900 uppercase">
                {mobileDrawer === 'toc' ? 'DAFTAR ISI' : 'STATUS & RELASI'}
              </h3>
              <button
                type="button"
                onClick={() => setMobileDrawer(null)}
                className="p-1 rounded-lg bg-gray-100 text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {mobileDrawer === 'toc' ? (
              <ReadonlyTableOfContents
                pembukaanJudul="Pembukaan"
                pembukaanData={pembukaanData}
                babList={babList}
                activeSectionId={activeSectionId}
                onSearchChange={onSearchChange}
                onNavigateToStruktur={(id) => {
                  setMobileDrawer(null);
                  onNavigateToStruktur(id);
                }}
                onNavigateToPasal={(id) => {
                  setMobileDrawer(null);
                  onNavigateToPasal(id);
                }}
                onNavigateToPembukaan={() => {
                  setMobileDrawer(null);
                  onNavigateToPembukaan();
                }}
                onNavigateToSection={(sectionId) => {
                  setMobileDrawer(null);
                  onNavigateToSection(sectionId);
                }}
              />
            ) : (
              <ReadonlyTimelineSection
                riwayatPerubahan={timelineData}
                onRelasiClick={() => {
                  setMobileDrawer(null);
                  onRelasiClick();
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

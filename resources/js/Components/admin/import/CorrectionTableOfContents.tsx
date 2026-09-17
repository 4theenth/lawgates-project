import React from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import { ChapterItem } from './correctionParser';

interface CorrectionTableOfContentsProps {
  pembukaanJudul?: string;
  babList: ChapterItem[];
  onToggleBab: (babId: string) => void;
}

export function CorrectionTableOfContents({
  pembukaanJudul = 'Pembukaan',
  babList,
  onToggleBab,
}: CorrectionTableOfContentsProps) {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full lg:w-[220px] xl:w-[240px] shrink-0 bg-white rounded-[20px] border border-neu-100 p-4 xl:p-5 shadow-2xs">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-neu-50">
        <Menu className="w-5 h-5 text-neu-700" />
        <h3 className="font-sans text-[13px] font-bold text-neu-900 tracking-wide">
          DAFTAR ISI
        </h3>
      </div>

      <nav className="space-y-3">
        {/* Navigasi Pembukaan */}
        <button
          type="button"
          onClick={() => scrollToSection('section-pembukaan')}
          className="w-full text-left py-1 text-[12px] font-medium text-pr-900 hover:text-pr-800 transition-colors flex items-center justify-between cursor-pointer font-sans"
        >
          <span className="truncate">{pembukaanJudul}</span>
          <ChevronRight className="w-4 h-4 text-neu-400 shrink-0 ml-2" />
        </button>

        {/* Navigasi Batang Tubuh / BAB */}
        {babList.filter(bab => bab.judul && bab.judul.trim() !== '' && bab.judul.trim() !== '-').map((bab) => {
          if (bab.isExpanded) {
            return (
              <div key={bab.id} className="space-y-2">
                <button
                  type="button"
                  onClick={() => onToggleBab(bab.id)}
                  className="w-full text-left p-2.5 rounded-[10px] bg-[#E8EEF5] text-pr-900 font-bold text-[12px] leading-tight flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="line-clamp-2">{bab.judul}</span>
                  <ChevronRight className="w-4 h-4 text-pr-900 shrink-0 ml-2 rotate-90 transition-transform" />
                </button>

                {bab.pasalList.filter(p => p.nomor && p.nomor.trim() !== '-' && p.nomor.trim() !== '').length > 0 && (
                  <div className="pl-3 py-1 space-y-1.5 border-l-2 border-pr-900 ml-2">
                    {bab.pasalList.filter(p => p.nomor && p.nomor.trim() !== '-' && p.nomor.trim() !== '').map((pasal) => (
                      <button
                        key={pasal.id}
                        type="button"
                        onClick={() => scrollToSection(`section-${pasal.id}`)}
                        className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                      >
                        {pasal.nomor}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={bab.id}
              type="button"
              onClick={() => onToggleBab(bab.id)}
              className="w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="truncate">{bab.judul}</span>
              <ChevronRight className="w-4 h-4 text-neu-400 shrink-0 ml-2" />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

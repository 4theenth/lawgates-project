import React, { useState } from 'react';
import { Menu, ChevronRight, ChevronDown } from 'lucide-react';
import { ChapterItem } from './correctionParser';

interface CorrectionTableOfContentsProps {
  pembukaanJudul?: string;
  babList: ChapterItem[];
  activeSection?: string;
  onPasalClick?: (babId: string, pasalId: string) => void;
  onPembukaanClick?: () => void;
}

export function CorrectionTableOfContents({
  pembukaanJudul = 'Pembukaan',
  babList,
  activeSection = '',
  onPasalClick,
  onPembukaanClick,
}: CorrectionTableOfContentsProps) {
  const [expandedBabs, setExpandedBabs] = useState<Record<string, boolean>>({});

  const handleToggleBab = (babId: string) => {
    setExpandedBabs(prev => ({
      ...prev,
      [babId]: !prev[babId]
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    const container = document.getElementById('editor-scroll-container');
    if (el && container) {
      // Calculate position relative to container
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scrollTop = container.scrollTop + (elRect.top - containerRect.top) - 20; // 20px padding
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    } else if (el) {
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
          onClick={() => {
            if (onPembukaanClick) {
              onPembukaanClick();
              setTimeout(() => {
                scrollToSection('section-pembukaan');
              }, 100);
            } else {
              scrollToSection('section-pembukaan');
            }
          }}
          className={`w-full text-left py-1 text-[12px] font-medium transition-colors flex items-center justify-between cursor-pointer font-sans ${activeSection === 'section-pembukaan' ? 'text-black font-bold' : 'text-pr-900 hover:text-pr-800'}`}
        >
          <span className="truncate flex items-center gap-2">
            {activeSection === 'section-pembukaan' && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
            <span>{pembukaanJudul}</span>
          </span>
          <ChevronRight className={`w-4 h-4 shrink-0 ml-2 ${activeSection === 'section-pembukaan' ? 'text-black' : 'text-neu-400'}`} />
        </button>

        {/* Navigasi Batang Tubuh / BAB */}
        {babList.filter(bab => bab.judul && bab.judul.trim() !== '' && bab.judul.trim() !== '-').map((bab) => {
          const isExpanded = expandedBabs[bab.id] || false;
          
          let displayJudul = bab.judul;
          const match = displayJudul.match(/^(BAB\s+[IVXLCDM\d]+)/i);
          if (match) {
            displayJudul = match[1];
          }

          if (isExpanded) {
            return (
              <div key={bab.id} className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleToggleBab(bab.id)}
                  className="w-full text-left p-2.5 rounded-[10px] bg-[#E8EEF5] text-pr-900 font-bold text-[12px] leading-tight flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="line-clamp-2"><span>{displayJudul}</span></span>
                  <ChevronRight className="w-4 h-4 text-pr-900 shrink-0 ml-2 rotate-90 transition-transform" />
                </button>

                {bab.pasalList.filter(p => p.nomor && p.nomor.trim() !== '-' && p.nomor.trim() !== '').length > 0 && (
                  <div className="pl-3 py-1 space-y-1.5 border-l-2 border-pr-900 ml-2">
                    {bab.pasalList.filter(p => p.nomor && p.nomor.trim() !== '-' && p.nomor.trim() !== '').map((pasal) => {
                      const isPasalActive = activeSection === `section-${pasal.id}`;
                      return (
                        <button
                          key={pasal.id}
                          type="button"
                          onClick={() => {
                            if (onPasalClick) {
                              onPasalClick(bab.id, pasal.id);
                              setTimeout(() => {
                                scrollToSection(`section-${pasal.id}`);
                              }, 100);
                            } else {
                              scrollToSection(`section-${pasal.id}`);
                            }
                          }}
                          className={`block w-full text-left py-1 text-[12px] transition-colors cursor-pointer flex items-center gap-2 ${isPasalActive ? 'text-black font-bold' : 'font-medium text-neu-700 hover:text-pr-900'}`}
                        >
                          {isPasalActive && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
                          <span>{pasal.nomor}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={bab.id}
              type="button"
              onClick={() => {
                handleToggleBab(bab.id);
                setTimeout(() => {
                  scrollToSection(`section-${bab.id}`);
                }, 100);
              }}
              className="w-full text-left py-1 text-[12px] font-medium text-pr-900 hover:text-pr-800 transition-colors flex items-center justify-between cursor-pointer font-sans"
            >
              <span className="truncate flex items-center gap-2">
                <span>{displayJudul}</span>
              </span>
              <ChevronDown className="w-4 h-4 shrink-0 text-neu-400" />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

import React, { useState } from 'react';
import { Menu, ChevronRight, ChevronDown } from 'lucide-react';

export interface TocChapterItem {
  id: string;
  judul: string;
  isExpanded?: boolean;
  subItems?: { id: string; label: string }[];
}

export interface DetailDaftarIsiProps {
  pembukaanLabel?: string;
  chapters?: TocChapterItem[];
}

export function DetailDaftarIsi({
  pembukaanLabel = 'Pembukaan UUD 1945',
  chapters = [
    {
      id: 'bab-1',
      judul: 'BAB I - Pemerintah Daerah',
      isExpanded: true,
      subItems: [
        { id: 'pasal-1', label: 'Pasal 1 Ayat 1' },
        { id: 'pasal-2', label: 'Pasal 2 Ayat 1' },
      ],
    },
    {
      id: 'bab-2',
      judul: 'BAB II - Wilayah Negara',
      isExpanded: true,
      subItems: [
        { id: 'pasal-3', label: 'Pasal 3 Ayat 1' },
        { id: 'pasal-4', label: 'Pasal 4 Ayat 1' },
        { id: 'pasal-5', label: 'Pasal 5 Ayat 1' },
      ],
    },
    {
      id: 'bab-3',
      judul: 'BAB III - Hak Asasi',
      isExpanded: false,
    },
    {
      id: 'bab-4',
      judul: 'BAB IV - Penduduk',
      isExpanded: false,
    },
    {
      id: 'bab-5',
      judul: 'BAB V - Warga Negara',
      isExpanded: false,
    },
  ],
}: DetailDaftarIsiProps) {
  const [chapterState, setChapterState] = useState<TocChapterItem[]>(chapters);

  const toggleChapter = (chapterId: string) => {
    setChapterState((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, isExpanded: !c.isExpanded } : c))
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-4 xl:p-5 shadow-2xs sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
      {/* Header Daftar Isi */}
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-gray-100">
        <Menu className="w-4 h-4 text-gray-700" />
        <h3 className="text-[12px] font-bold text-gray-900 tracking-wider uppercase">
          DAFTAR ISI
        </h3>
      </div>

      <nav className="space-y-2">
        {/* Navigasi Pembukaan */}
        <button
          type="button"
          onClick={() => scrollToSection('section-pembukaan')}
          className="w-full text-left py-1.5 px-2 rounded-lg text-[12px] font-medium text-gray-700 hover:text-pr-900 hover:bg-gray-50 transition-all flex items-center justify-between cursor-pointer group"
        >
          <span className="truncate">{pembukaanLabel}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-pr-900 shrink-0 ml-2" />
        </button>

        {/* Daftar BAB */}
        {chapterState.map((chapter) => {
          const isExpanded = !!chapter.isExpanded;
          const hasSubItems = chapter.subItems && chapter.subItems.length > 0;

          return (
            <div key={chapter.id} className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  toggleChapter(chapter.id);
                  scrollToSection(`section-${chapter.id}`);
                }}
                className={`w-full text-left py-1.5 px-2 rounded-lg text-[12px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                  isExpanded && hasSubItems
                    ? 'text-pr-900 font-semibold bg-[#EBF2FA]'
                    : 'text-gray-700 hover:text-pr-900 hover:bg-gray-50'
                }`}
              >
                <span className="truncate">{chapter.judul}</span>
                {hasSubItems ? (
                  isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-pr-900 shrink-0 ml-2" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-2" />
                  )
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-2" />
                )}
              </button>

              {/* Sub-items (Pasal-pasal) */}
              {isExpanded && hasSubItems && (
                <div className="pl-3 py-1 space-y-1 ml-2 border-l-2 border-pr-900/30">
                  {chapter.subItems!.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(`section-${item.id}`)}
                      className="block w-full text-left py-1 px-2 text-[11px] font-medium text-gray-600 hover:text-pr-900 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

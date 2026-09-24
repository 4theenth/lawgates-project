import React from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import { ChapterItem, ArticleItem } from '../../admin/import/correctionParser';

interface ReadonlyTableOfContentsProps {
  pembukaanJudul?: string;
  pembukaanData?: {
    menimbang?: string;
    mengingat?: string;
    memutuskan?: string;
    menetapkan?: string;
  };
  babList: ChapterItem[];
  onNavigateToStruktur?: (id: string) => void;
  onNavigateToPasal?: (id: string) => void;
  onNavigateToPembukaan?: () => void;
  onNavigateToSection?: (id: string) => void;
}

function TocPasalNode({ 
  pasal, 
  expandedBabs, 
  toggleLocalBab, 
  onNavigateToPasal 
}: {
  pasal: ArticleItem;
  expandedBabs: Record<string, boolean>;
  toggleLocalBab: (id: string) => void;
  onNavigateToPasal?: (id: string) => void;
}) {
  const hasChildren = pasal.pasalList && pasal.pasalList.length > 0;
  const isExpanded = expandedBabs[pasal.id] || false;

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => {
          if (onNavigateToPasal) onNavigateToPasal(pasal.id);
          if (hasChildren) toggleLocalBab(pasal.id);
        }}
        className="w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors flex items-center justify-between cursor-pointer"
      >
        <span>{pasal.nomor}</span>
        {hasChildren && (
          <ChevronRight className={`w-4 h-4 text-neu-400 shrink-0 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        )}
      </button>
      {hasChildren && isExpanded && (
        <div className="pl-3 space-y-1 border-l border-neu-200">
          {pasal.pasalList!.map((childPasal: ArticleItem) => (
            <button
              key={childPasal.id}
              type="button"
              onClick={() => {
                 if (onNavigateToPasal) onNavigateToPasal(childPasal.id);
              }}
              className="block w-full text-left py-1 text-[12px] font-medium text-neu-500 hover:text-pr-900 transition-colors cursor-pointer"
            >
              {childPasal.nomor}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TocNode({ item, expandedBabs, toggleLocalBab, onNavigateToStruktur, onNavigateToPasal, depth = 0 }: {
  item: ChapterItem;
  expandedBabs: Record<string, boolean>;
  toggleLocalBab: (id: string) => void;
  onNavigateToStruktur?: (id: string) => void;
  onNavigateToPasal?: (id: string) => void;
  depth?: number;
}) {
  const isExpanded = expandedBabs[item.id] || false;
  const marginLeft = depth > 0 ? (depth * 0.5) + 'rem' : '0';
  const hasChildren = (item.children && item.children.length > 0) || (item.pasalList && item.pasalList.length > 0);

  const handleClick = () => {
    if (onNavigateToStruktur) onNavigateToStruktur(item.id);
    if (hasChildren) {
      toggleLocalBab(item.id);
    }
  };

  if (!hasChildren) {
    return (
      <button
        type="button"
        onClick={handleClick}
        style={{ marginLeft }}
        className={`w-full text-left p-2.5 rounded-[10px] ${depth === 0 ? 'bg-[#E8EEF5]' : 'bg-neu-50 border border-neu-100'} text-pr-900 font-bold text-[14px] leading-tight flex items-center justify-between cursor-pointer transition-colors`}
      >
        <span className="line-clamp-2">{item.judul}</span>
      </button>
    );
  }

  if (isExpanded) {
    return (
      <div className="space-y-2" style={{ marginLeft }}>
        <button
          type="button"
          onClick={handleClick}
          className={`w-full text-left p-2.5 rounded-[10px] ${depth === 0 ? 'bg-[#E8EEF5]' : 'bg-neu-50 border border-neu-100'} text-pr-900 font-bold text-[14px] leading-tight flex items-center justify-between cursor-pointer transition-colors`}
        >
          <span className="line-clamp-2">{item.judul}</span>
          <ChevronRight className="w-4 h-4 text-pr-900 shrink-0 ml-2 rotate-90 transition-transform" />
        </button>

        <div className="pl-3 py-1 space-y-2 border-l-2 border-pr-900 ml-2">
            {item.children?.map(child => (
              <TocNode 
                key={child.id}
                item={child}
                expandedBabs={expandedBabs}
                toggleLocalBab={toggleLocalBab}
                onNavigateToStruktur={onNavigateToStruktur}
                onNavigateToPasal={onNavigateToPasal}
                depth={depth + 1}
              />
            ))}
            {item.pasalList.map((pasal) => (
              <TocPasalNode
                key={pasal.id}
                pasal={pasal}
                expandedBabs={expandedBabs}
                toggleLocalBab={toggleLocalBab}
                onNavigateToPasal={onNavigateToPasal}
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ marginLeft }}
      className={`w-full text-left p-2.5 rounded-[10px] ${depth === 0 ? 'bg-[#E8EEF5]' : 'bg-neu-50 border border-neu-100'} text-pr-900 font-bold text-[14px] leading-tight flex items-center justify-between cursor-pointer transition-colors`}
    >
      <span className="line-clamp-2">{item.judul}</span>
      <ChevronRight className="w-4 h-4 text-pr-900 shrink-0 ml-2" />
    </button>
  );
}

export function ReadonlyTableOfContents({
  pembukaanJudul = 'Pembukaan',
  pembukaanData,
  babList,
  onNavigateToStruktur,
  onNavigateToPasal,
  onNavigateToPembukaan,
  onNavigateToSection,
}: ReadonlyTableOfContentsProps) {
  const [expandedBabs, setExpandedBabs] = React.useState<Record<string, boolean>>({});

  const toggleLocalBab = (id: string) => {
    setExpandedBabs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full shrink-0 bg-white rounded-[20px] border border-neu-100 p-4 xl:p-5 shadow-2xs lg:h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-neu-50 shrink-0">
        <Menu className="w-5 h-5 text-neu-700" />
        <h3 className="font-sans text-[14px] font-bold text-neu-900 tracking-wide">
          DAFTAR ISI
        </h3>
      </div>

      <nav className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Navigasi Pembukaan */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => {
              if (onNavigateToPembukaan) onNavigateToPembukaan();
              if (pembukaanData) toggleLocalBab('pembukaan');
            }}
            className="w-full text-left p-2.5 rounded-[10px] bg-[#E8EEF5] text-pr-900 font-bold text-[14px] leading-tight flex items-center justify-between cursor-pointer transition-colors"
          >
            <span className="truncate">{pembukaanJudul}</span>
            {pembukaanData && (
              <ChevronRight className={`w-4 h-4 text-pr-900 shrink-0 ml-2 transition-transform ${expandedBabs['pembukaan'] ? 'rotate-90' : ''}`} />
            )}
          </button>
          
          {pembukaanData && expandedBabs['pembukaan'] && (
            <div className="pl-3 py-1 space-y-1.5 border-l-2 border-pr-900 ml-2">
              {!!pembukaanData.menimbang && (
                <button
                  type="button"
                  onClick={() => { if (onNavigateToSection) onNavigateToSection('section-menimbang'); }}
                  className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                >
                  Menimbang
                </button>
              )}
              {!!pembukaanData.mengingat && (
                <button
                  type="button"
                  onClick={() => { if (onNavigateToSection) onNavigateToSection('section-mengingat'); }}
                  className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                >
                  Mengingat
                </button>
              )}
              {!!pembukaanData.memutuskan && (
                <button
                  type="button"
                  onClick={() => { if (onNavigateToSection) onNavigateToSection('section-memutuskan'); }}
                  className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                >
                  Memutuskan
                </button>
              )}
              {!!pembukaanData.menetapkan && (
                <button
                  type="button"
                  onClick={() => { if (onNavigateToSection) onNavigateToSection('section-menetapkan'); }}
                  className="block w-full text-left py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 transition-colors cursor-pointer"
                >
                  Menetapkan
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigasi Batang Tubuh / BAB */}
        {babList.filter(bab => !bab.judul.toUpperCase().includes('PENJELASAN')).map((bab) => (
          <TocNode 
            key={bab.id}
            item={bab}
            expandedBabs={expandedBabs}
            toggleLocalBab={toggleLocalBab}
            onNavigateToStruktur={onNavigateToStruktur}
            onNavigateToPasal={onNavigateToPasal}
            depth={0}
          />
        ))}
      </nav>
    </div>
  );
}

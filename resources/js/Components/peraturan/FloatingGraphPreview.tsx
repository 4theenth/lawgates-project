import React, { useState, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';
import RegulationGraph from '@/Components/peraturan/RegulationGraph';

export interface FloatingGraphPreviewProps {
  peraturanId: number;
  onClose: () => void;
  onExpand: () => void;
}

export function FloatingGraphPreview({
  peraturanId,
  onClose,
  onExpand,
}: FloatingGraphPreviewProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  return (
    <div
      style={{ width: '480px' }}
      className="absolute bottom-[75px] right-0 z-[9999] bg-white rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] border border-neu-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto origin-bottom-right"
    >
      {/* Header Bar */}
      <div className="px-4 py-3 bg-neu-50/95 backdrop-blur-sm border-b border-neu-200/80 flex items-center justify-between select-none">
        <div className="flex items-center gap-2 text-neu-800">
          <span className="w-2 h-2 rounded-full bg-pr-700 shadow-[0_0_8px_rgba(10,28,62,0.6)]"></span>
          <span className="text-xs font-bold tracking-wider text-pr-900 uppercase">
            PREVIEW PETA RELASI
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onExpand}
            title="Perbesar & Masuk ke Halaman Graph"
            className="p-1.5 hover:bg-neu-200 rounded-lg text-neu-600 hover:text-pr-900 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Tutup Preview"
            className="p-1.5 hover:bg-neu-200 rounded-lg text-neu-400 hover:text-neu-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Graph Content */}
      <div className="h-[400px] relative bg-neu-50/30 overflow-hidden">
        <RegulationGraph
          peraturanId={peraturanId}
          isMini={true}
          onExpand={onExpand}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default FloatingGraphPreview;

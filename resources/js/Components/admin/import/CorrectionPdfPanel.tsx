import React from 'react';
import { ExternalLink, X, FileText, AlertCircle } from 'lucide-react';

export interface CorrectionPdfPanelProps {
  pdfUrl: string | null;
  fileName?: string;
  onClose: () => void;
  isDragging?: boolean;
}

/**
 * Panel Penampil PDF Sumber Asli untuk Komparasi Side-by-Side dengan Hasil OCR
 * Terinspirasi dari layout perbandingan berkas legal intelligence (Pasal.id)
 */
export function CorrectionPdfPanel({
  pdfUrl,
  fileName,
  onClose,
  isDragging = false,
}: CorrectionPdfPanelProps) {
  const handleOpenNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[500px] bg-white rounded-[14px] border border-neu-200 shadow-sm overflow-hidden">
      {/* 1. Header Toolbar Panel PDF */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-neu-50/80 border-b border-neu-200 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-pr-900 text-white text-[11px] font-semibold tracking-wide uppercase shrink-0">
            <FileText className="w-3 h-3 text-sec-400" />
            PDF Sumber
          </span>
          <span
            className="text-[12px] font-medium text-neu-700 truncate max-w-[200px] sm:max-w-[260px]"
            title={fileName || 'Naskah Asli'}
          >
            {fileName || 'Naskah Asli'}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {pdfUrl && (
            <button
              type="button"
              onClick={handleOpenNewTab}
              title="Buka dokumen di tab baru"
              className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-medium text-neu-700 hover:text-pr-900 hover:bg-white rounded-md transition-colors border border-transparent hover:border-neu-200 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buka Tab Baru</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            title="Sembunyikan panel PDF"
            className="p-1 text-neu-500 hover:text-neu-900 hover:bg-white rounded-md transition-colors border border-transparent hover:border-neu-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Viewer Area */}
      <div className="flex-1 w-full bg-[#525659] relative overflow-hidden">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=1`}
            title={`PDF Sumber - ${fileName || 'Dokumen Hukum'}`}
            className="w-full h-full border-none block"
            style={{
              pointerEvents: isDragging ? 'none' : 'auto',
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-neu-50">
            <div className="w-12 h-12 rounded-full bg-neu-200/60 flex items-center justify-center text-neu-600 mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-[14px] font-semibold text-neu-900 mb-1">
              Dokumen PDF Belum Tersedia
            </h4>
            <p className="text-[12px] text-neu-600 max-w-xs leading-relaxed">
              Berkas PDF fisik tidak ditemukan di penyimpanan server atau nama berkas belum terhubung.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CorrectionPdfPanel;

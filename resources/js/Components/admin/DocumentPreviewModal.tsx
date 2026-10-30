import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

export interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id?: number | string;
    title: string;
    category?: string;
    chapter?: string;
    article?: string;
    url?: string;
    pdf_url?: string | null;
    pdfUrl?: string | null;
  };
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  if (!isOpen) return null;

  // URL berkas PDF murni untuk iframe
  const rawPdfUrl =
    document.pdf_url ||
    document.pdfUrl ||
    '/peraturan/undang-undang-11-2020/download?inline=1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-[900px] h-[90vh] bg-white rounded-[16px] shadow-2xl flex flex-col overflow-hidden border border-neu-100 animate-in zoom-in-95 duration-150">
        {/* Header Bersih & Minimalis */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neu-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <span className="text-[14px] font-medium text-neu-900 truncate">
              {document.title}
            </span>
            {document.article && (
              <span className="px-2 py-0.5 rounded-[6px] bg-pr-50 text-pr-900 text-[11px] font-medium shrink-0">
                {document.article}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Tombol Unduh / Buka Tab Baru */}
            <a
              href={rawPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neu-500 hover:text-neu-800 hover:bg-neutral-100 rounded-[8px] transition-colors"
              title="Buka dokumen di tab baru"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Tombol Tutup Silang */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neu-500 hover:text-neu-800 hover:bg-neutral-100 rounded-[8px] transition-colors cursor-pointer"
              title="Tutup Pratinjau"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View File Asli Bersih (PDF Lembaran Negara) */}
        <div className="flex-1 w-full h-full bg-[#525659] relative">
          <iframe
            src={`${rawPdfUrl}#toolbar=1&navpanes=0`}
            title={`Naskah Dokumen - ${document.title}`}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;

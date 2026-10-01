import React from 'react';
import { Scale, Eye, ArrowDownToLine } from 'lucide-react';
import { ComparisonDocumentMeta } from '@/types/comparison';

export interface ComparisonDocumentCardProps {
  document: ComparisonDocumentMeta;
  variant?: 'default' | 'success';
  onViewDetail?: () => void;
  onDownload?: () => void;
}

export function ComparisonDocumentCard({
  document,
  variant = 'default',
  onViewDetail,
  onDownload,
}: ComparisonDocumentCardProps) {
  const isSuccess = variant === 'success' || document.status?.toLowerCase() === 'berlaku';

  return (
    <div className="bg-white rounded-2xl border border-neu-200 p-4 sm:p-6 flex flex-col justify-between space-y-3.5 sm:space-y-4">
      <div>
        {/* Header Ikon & Status Badge */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
              isSuccess
                ? 'bg-suc-50 text-suc-800 border border-suc-200'
                : 'bg-neu-100 text-neu-700 border border-neu-200'
            }`}
          >
            <Scale className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
          </div>

          <div className="flex items-center justify-end">
            <span
              className={`text-xs font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border ${
                isSuccess
                  ? 'bg-suc-50 text-suc-800 border-suc-200'
                  : 'bg-neu-100 text-neu-700 border-neu-200'
              }`}
            >
              {document.status}
            </span>
          </div>
        </div>

        {/* Kategori (UUD - 14px) & Judul */}
        <div>
          <h4 className="text-md font-medium text-neu-900 tracking-tight uppercase">
            {document.category}
          </h4>
          <p className="text-sm font-normal text-neu-600 mt-1 leading-snug">
            {document.title}
          </p>
        </div>

        {/* Kotak Metadata (Tanggal Ditetapkan & Tempat Penetapan) */}
        <div
          className={`mt-3 sm:mt-4 rounded-xl p-3 sm:p-4 grid grid-cols-2 gap-2 sm:gap-4 border ${
            isSuccess ? 'bg-suc-50/60 border-suc-200' : 'bg-neu-50 border-neu-200'
          }`}
        >
          <div>
            <span className="block text-xs font-normal text-neu-500">
              Tanggal Ditetapkan
            </span>
            <span className="block text-xs font-medium text-neu-900 mt-0.5">
              {document.tanggalPenetapan}
            </span>
          </div>
          <div>
            <span className="block text-xs font-normal text-neu-500">
              Tempat Penetapan
            </span>
            <span className="block text-xs font-medium text-neu-900 mt-0.5">
              {document.tempatPenetapan}
            </span>
          </div>
        </div>
      </div>

      {/* Tombol Aksi Bawah */}
      <div className="flex flex-row items-center gap-2 sm:gap-3 pt-2">
        <button
          type="button"
          onClick={onViewDetail}
          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-neu-100 hover:bg-neu-200 border border-neu-200 text-neu-800 text-xs font-medium transition-colors cursor-pointer min-w-0"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neu-600 shrink-0" />
          <span className="truncate">Lihat Detail</span>
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl border border-neu-200 bg-white hover:bg-neu-50 text-neu-800 text-xs font-medium transition-colors cursor-pointer min-w-0"
        >
          <ArrowDownToLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neu-600 shrink-0" />
          <span className="truncate">Download Dokumen</span>
        </button>
      </div>
    </div>
  );
}

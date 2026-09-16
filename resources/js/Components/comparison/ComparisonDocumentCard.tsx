import React from 'react';
import { Scale, Eye, ArrowDownToLine } from 'lucide-react';
import { ComparisonDocumentMeta } from '@/data/dummyComparison';

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
    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
      <div>
        {/* Header Ikon & Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs ${
              isSuccess
                ? 'bg-[#E8F8F0] text-emerald-700 border border-emerald-100'
                : 'bg-[#EDF2F7] text-slate-700 border border-slate-200/60'
            }`}
          >
            <Scale className="w-5 h-5 stroke-[1.75]" />
          </div>

          <div className="flex items-center gap-2">
            {document.standardId && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 font-mono border border-gray-200">
                {document.standardId}
              </span>
            )}
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                isSuccess
                  ? 'bg-[#E8F8F0] text-emerald-700 border-emerald-200'
                  : 'bg-[#EDF2F7] text-slate-700 border-slate-200'
              }`}
            >
              {document.status}
            </span>
          </div>
        </div>

        {/* Kategori & Judul */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 tracking-tight uppercase">
            {document.category}
          </h4>
          <p className="text-sm font-medium text-gray-600 mt-1 leading-snug">
            {document.title}
          </p>
        </div>

        {/* Kotak Metadata (Tanggal Ditetapkan & Tempat Penetapan) */}
        <div
          className={`mt-4 rounded-xl p-4 grid grid-cols-2 gap-4 ${
            isSuccess ? 'bg-[#EBF7F0]' : 'bg-[#EEF1F5]'
          }`}
        >
          <div>
            <span className="block text-[11px] text-gray-500 font-medium">
              Tanggal Ditetapkan
            </span>
            <span className="block text-xs font-bold text-gray-900 mt-0.5">
              {document.tanggalPenetapan}
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-gray-500 font-medium">
              Tempat Penetapan
            </span>
            <span className="block text-xs font-bold text-gray-900 mt-0.5">
              {document.tempatPenetapan}
            </span>
          </div>
        </div>
      </div>

      {/* Tombol Aksi Bawah */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onViewDetail}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#E8EDF3] hover:bg-[#DDE4ED] text-gray-800 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <Eye className="w-4 h-4 text-gray-600" />
          <span>Lihat Detail</span>
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <ArrowDownToLine className="w-4 h-4 text-gray-600" />
          <span>Download Dokumen</span>
        </button>
      </div>
    </div>
  );
}

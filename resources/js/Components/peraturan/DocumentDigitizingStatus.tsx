import React from 'react';
import { router } from '@inertiajs/react';
import { FileClock, Sparkles, ArrowLeft, Network, Info, ExternalLink } from 'lucide-react';

export interface DocumentDigitizingStatusProps {
  peraturan: any;
  onBack?: () => void;
  onViewRelations?: () => void;
  className?: string;
}

export function DocumentDigitizingStatus({
  peraturan,
  onBack,
  onViewRelations,
  className = '',
}: DocumentDigitizingStatusProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      router.visit('/pencarian');
    }
  };

  const handleViewRelations = () => {
    if (onViewRelations) {
      onViewRelations();
    } else {
      const relasiSection = document.getElementById('relation-timeline-section');
      if (relasiSection) {
        relasiSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const relatedList = peraturan?.law_relations || [];

  return (
    <div
      className={`w-full bg-white rounded-[24px] border border-neu-100 p-6 sm:p-10 shadow-xs flex flex-col items-center text-center animate-in fade-in duration-300 ${className}`}
    >
      {/* 1. Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/90 text-amber-800 text-xs font-semibold mb-6">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="tracking-wide">STATUS: DALAM PROSES DIGITALISASI</span>
      </div>

      {/* 2. Central Illustrated Icon Box */}
      <div className="relative mb-5">
        <div className="w-20 h-20 rounded-3xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center shadow-2xs">
          <FileClock className="w-10 h-10 text-amber-600 stroke-[1.75]" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-amber-200 flex items-center justify-center shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </div>

      {/* 3. Headline & Description */}
      <h2 className="text-xl sm:text-2xl font-bold text-pr-900 mb-3 tracking-tight">
        Dokumen Sedang Dalam Proses Digitalisasi
      </h2>
      <p className="text-sm sm:text-[14.5px] text-neu-600 max-w-xl leading-relaxed mb-6">
        Naskah peraturan ini telah terindeks dalam jaringan relasi hukum LawGates, namun batang tubuh dan naskah pasal lengkapnya saat ini masih dalam proses digitalisasi dan kurasi hukum oleh tim kami.
      </p>

      {/* 4. Metadata Ringkasan Naskah Peraturan */}
      <div className="w-full max-w-xl bg-neu-50/80 border border-neu-200/70 rounded-2xl p-4 sm:p-5 mb-8 text-left space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-neu-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-neu-500" />
          <span>Informasi Naskah Peraturan</span>
        </div>
        <h3 className="text-sm sm:text-[15px] font-semibold text-neu-900 leading-snug">
          {peraturan?.judul || 'Dokumen Peraturan'}
        </h3>
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neu-600">
          <span className="px-2.5 py-1 rounded-md bg-white border border-neu-200 font-medium">
            {peraturan?.jenis_peraturan?.nama || 'Undang-Undang'}
          </span>
          {peraturan?.nomor && (
            <span className="px-2.5 py-1 rounded-md bg-white border border-neu-200 font-medium">
              Nomor {peraturan.nomor}
            </span>
          )}
          {peraturan?.tahun && (
            <span className="px-2.5 py-1 rounded-md bg-white border border-neu-200 font-medium">
              Tahun {peraturan.tahun}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
            {peraturan?.status_peraturan?.nama_status || 'Draft'}
          </span>
        </div>
      </div>

      {/* 5. Action Buttons (Kembali & Lihat Peraturan Terkait) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={handleBack}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-neu-300 bg-white hover:bg-neu-50 text-neu-800 font-semibold text-xs sm:text-sm transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-neu-600" />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={handleViewRelations}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-pr-900 hover:bg-pr-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
        >
          <Network className="w-4 h-4 text-white" />
          <span>Lihat Peraturan Terkait</span>
        </button>
      </div>

      {/* 6. Peraturan Terkait yang Terhubung (Jika Ada Relasi) */}
      {relatedList.length > 0 && (
        <div className="w-full max-w-xl mt-8 pt-6 border-t border-neu-100 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neu-700">
              Peraturan Terhubung ({relatedList.length})
            </span>
            <button
              type="button"
              onClick={handleViewRelations}
              className="text-xs font-semibold text-pr-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Buka Peta Relasi <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {relatedList.slice(0, 3).map((rel: any, idx: number) => {
              const target = rel.to_peraturan;
              if (!target) return null;
              const relLabel = rel.relation_type?.nama_relasi || 'Terkait';
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const targetParam = target.unique_id || target.id;
                    if (targetParam) router.visit(`/peraturan/${targetParam}`);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-neu-50/70 hover:bg-neu-100/80 border border-neu-200/60 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 mr-2">
                      {relLabel}
                    </span>
                    <span className="text-xs font-medium text-neu-800 truncate inline-block align-middle max-w-[280px] sm:max-w-[360px]">
                      {target.judul || `Peraturan Nomor ${target.nomor || '-'} Tahun ${target.tahun || '-'}`}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neu-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentDigitizingStatus;

import React from 'react';
import Modal from '@/Components/common/Modal';
import { Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export interface EmbeddingProgressModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  totalPasal: number;
  processedPasal: number;
  statusMessage: string;
  isProcessing: boolean;
  isCompleted: boolean;
  isError: boolean;
  errorMessage?: string;
  onCancel?: () => void;
}

export function EmbeddingProgressModal({
  show,
  onClose,
  title = 'Proses Embedding AI',
  totalPasal,
  processedPasal,
  statusMessage,
  isProcessing,
  isCompleted,
  isError,
  errorMessage,
  onCancel,
}: EmbeddingProgressModalProps) {
  if (!show) return null;

  const percentage = totalPasal > 0 ? Math.min(100, Math.round((processedPasal / totalPasal) * 100)) : 0;

  return (
    <Modal
      show={show}
      onClose={() => {
        if (!isProcessing) {
          onClose();
        }
      }}
      closeable={!isProcessing}
      maxWidth="status"
      panelClassName="rounded-[20px] overflow-hidden shadow-2xl border border-neu-100"
    >
      <div className="p-6 sm:p-7 text-left bg-white">
        {/* Header dengan Icon Status */}
        <div className="flex items-center gap-3.5 mb-5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
              isError
                ? 'bg-dan-50 text-dan-900 border border-dan-100'
                : isCompleted
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
            }`}
          >
            {isError ? (
              <AlertCircle className="w-5 h-5 stroke-[2.2]" />
            ) : isCompleted ? (
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            ) : (
              <Sparkles className="w-5 h-5 stroke-[2.2] animate-pulse" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-bold text-neu-900 tracking-tight leading-snug">
              {isCompleted ? 'Embedding AI Selesai!' : isError ? 'Embedding AI Terkendala' : title}
            </h3>
            <p className="text-[12px] text-neu-500 truncate mt-0.5">
              {isCompleted
                ? 'Seluruh vektor pasal berhasil diintegrasikan ke pencarian semantik.'
                : isError
                ? 'Terjadi kendala saat memproses vektor embedding.'
                : 'Menghasilkan vektor semantik untuk pencarian berbasis makna.'}
            </p>
          </div>
        </div>

        {/* Kotak Progress & Visual Bar */}
        <div className="bg-neu-50/70 border border-neu-100 rounded-2xl p-4.5 mb-5">
          {/* Baris Angka & Persentase */}
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-center gap-2">
              {isProcessing && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
              <span className="text-[12px] font-medium text-neu-600">
                {isCompleted
                  ? `${totalPasal} pasal selesai`
                  : totalPasal > 0
                  ? `${processedPasal} dari ${totalPasal} pasal`
                  : 'Menghitung pasal...'}
              </span>
            </div>
            <span className="text-[18px] font-bold text-neu-900 tabular-nums">
              {percentage}%
            </span>
          </div>

          {/* Bar Indikator Utama */}
          <div className="w-full h-3 bg-neu-200/60 rounded-full overflow-hidden p-0.5 border border-neu-200/50">
            <div
              className={`h-full rounded-full transition-all duration-300 ease-out ${
                isError
                  ? 'bg-dan-900'
                  : isCompleted
                  ? 'bg-emerald-600'
                  : 'bg-emerald-600'
              }`}
              style={{ width: `${Math.max(percentage, isProcessing && percentage === 0 ? 5 : percentage)}%` }}
            />
          </div>

          {/* Status Keterangan Batch Dinamis */}
          <div className="mt-3 flex items-start gap-2">
            {isProcessing && <Loader2 className="w-3.5 h-3.5 text-neu-500 animate-spin shrink-0 mt-0.5" />}
            <p className="text-[11.5px] text-neu-600 leading-relaxed break-words">
              {statusMessage || 'Sedang menyiapkan data...'}
            </p>
          </div>
        </div>

        {/* Pesan Kesalahan jika terjadi error */}
        {isError && errorMessage && (
          <div className="p-3 bg-dan-50/70 border border-dan-100 rounded-xl mb-5 text-[12px] text-dan-900 leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* Tombol Aksi Bawah */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          {isProcessing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-[12px] font-medium text-neu-600 hover:text-neu-900 hover:bg-neu-100 border border-neu-200 transition-colors cursor-pointer"
            >
              Hentikan
            </button>
          )}

          {isCompleted && (
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-pr-900 hover:bg-pr-800 text-white text-[13px] font-semibold transition-all shadow-2xs cursor-pointer active:scale-[0.98]"
            >
              Selesai
            </button>
          )}

          {isError && (
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-neu-800 hover:bg-neu-900 text-white text-[13px] font-medium transition-all cursor-pointer"
            >
              Tutup
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

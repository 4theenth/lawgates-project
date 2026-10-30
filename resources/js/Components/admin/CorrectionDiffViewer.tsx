import React, { useMemo } from 'react';
import { History, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { diffWords, Change } from 'diff';

export interface CorrectionDiffViewerProps {
  currentText: string;
  proposedText: string;
  removedWords?: string;
  addedWords?: string;
  wordChangeCount?: number;
  reason?: string;
  documentUrl?: string;
  onOpenDocumentPreview?: () => void;
}

export const CorrectionDiffViewer: React.FC<CorrectionDiffViewerProps> = ({
  currentText,
  proposedText,
  removedWords,
  addedWords,
  wordChangeCount,
  reason = 'Seharusnya bukan perjanjian sewa, tetapi penjualan beli',
  documentUrl = '/admin/dokumen-hukum',
  onOpenDocumentPreview,
}) => {
  // ─────────────────────────────────────────────
  // Logic Diff Otomatis (Menggunakan diffWords)
  // ─────────────────────────────────────────────
  // Library diff membandingkan kata per kata antara teks saat ini & usulan baru
  const differences = useMemo<Change[]>(() => {
    return diffWords(currentText, proposedText);
  }, [currentText, proposedText]);

  // Hitung otomatis jumlah kata yang diperbaiki jika prop wordChangeCount tidak ditentukan
  const calculatedChangeCount = useMemo(() => {
    if (typeof wordChangeCount === 'number') return wordChangeCount;
    return differences.reduce((acc, part) => {
      if (part.added) {
        const words = part.value.trim().split(/\s+/).filter(Boolean);
        return acc + words.length;
      }
      return acc;
    }, 0);
  }, [differences, wordChangeCount]);

  // Render Kolom Kiri: Teks Saat Ini
  // Menampilkan teks asli, dengan kata yang diusulkan dihapus/keliru diberi warna MERAH & CORET (strikethrough)
  const renderCurrentText = () => {
    // Jika removedWords spesifik diberikan sebagai fallback manual
    if (removedWords && !currentText.includes(removedWords)) {
      return currentText;
    }

    return differences.map((part, index) => {
      // Abaikan kata usulan baru di kolom teks saat ini
      if (part.added) return null;

      // Kata yang dihapus / diganti -> tandai merah tebal dicoret
      if (part.removed) {
        return (
          <span
            key={index}
            className="bg-dan-50 text-dan-900 font-semibold px-1 py-0.5 rounded mx-0.5 line-through"
          >
            {part.value}
          </span>
        );
      }

      // Teks netral yang tidak mengalami perubahan
      return <span key={index}>{part.value}</span>;
    });
  };

  // Render Kolom Kanan: Usulan Perbaikan Pengguna
  // Menampilkan teks usulan, dengan kata baru pengganti diberi warna HIJAU TEBAL
  const renderProposedText = () => {
    return differences.map((part, index) => {
      // Abaikan kata lama yang sudah dihapus di kolom usulan baru
      if (part.removed) return null;

      // Kata baru yang ditambahkan/diusulkan -> tandai hijau tebal
      if (part.added) {
        return (
          <span
            key={index}
            className="bg-suc-50 text-suc-900 font-semibold px-1 py-0.5 rounded mx-0.5"
          >
            {part.value}
          </span>
        );
      }

      // Teks netral yang tidak mengalami perubahan
      return <span key={index}>{part.value}</span>;
    });
  };

  return (
    <>
      {/* 1. Frame Perbandingan Teks (#3516:61491) */}
      <div className="w-full flex flex-col gap-4">
        {/* Header Perbandingan Teks & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-[14px] font-medium text-neu-900">
              Perbandingan Teks
            </h3>
            <span className="px-2.5 py-1 rounded-[10px] bg-pr-50 text-pr-900 text-[12px] font-medium">
              {calculatedChangeCount} Kata Perbaikan
            </span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[12px] font-normal text-neu-900">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-dan-900 shrink-0" />
              <span>Dihapus / keliru</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-suc-900 shrink-0" />
              <span>Usulan baru (koreksi)</span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Diff Panels (Style Tabel Shadcn) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[12px] border border-neu-50 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-neu-50 shadow-2xs">
          {/* Kolom Kiri: Teks Saat Ini (Header Primary / 50 + Icon History) */}
          <div className="flex flex-col bg-white">
            <div className="bg-pr-50 px-4 py-2.5 flex items-center gap-2 border-b border-neu-50 shrink-0">
              <History className="w-4 h-4 text-pr-900 shrink-0" />
              <span className="text-[12px] font-medium text-neu-600 tracking-wide">
                TEKS SAAT INI
              </span>
            </div>
            {/* Responsif: tinggi mengikuti isi teks, max 260px (sesuai Figma #3516:61490), scrollbar di-hide */}
            <div className="p-4 sm:p-5 text-[14px] font-normal leading-relaxed text-neu-900 whitespace-pre-line max-h-[260px] overflow-y-auto no-scrollbar">
              {renderCurrentText()}
            </div>
          </div>

          {/* Kolom Kanan: Usulan Perbaikan Pengguna (Header Success / 50 + Icon History) */}
          <div className="flex flex-col bg-white">
            <div className="bg-suc-50 px-4 py-2.5 flex items-center gap-2 border-b border-neu-50 shrink-0">
              <History className="w-4 h-4 text-suc-700 shrink-0" />
              <span className="text-[12px] font-medium text-suc-700 tracking-wide">
                USULAN PERBAIKAN PENGGUNA
              </span>
            </div>
            {/* Responsif: tinggi mengikuti isi teks, max 260px (sesuai Figma #3516:61490), scrollbar di-hide */}
            <div className="p-4 sm:p-5 text-[14px] font-normal leading-relaxed text-neu-900 whitespace-pre-line max-h-[260px] overflow-y-auto no-scrollbar">
              {renderProposedText()}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Frame Alasan Koreksi Pengguna Terpisah (#3520:61492: Tanpa border bawah/keliling, tanpa shadow) */}
      <div className="w-full bg-white border-l-4 border-suc-900 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-medium text-neu-600 uppercase tracking-wide">
            ALASAN KOREKSI PENGGUNA
          </span>
          <p className="text-[14px] font-normal text-neu-900 leading-relaxed">
            “{reason}”
          </p>
        </div>

        {onOpenDocumentPreview ? (
          <button
            type="button"
            onClick={onOpenDocumentPreview}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 text-white text-[13px] font-medium hover:bg-pr-800 transition-colors shrink-0 shadow-2xs cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Dokumen</span>
          </button>
        ) : (
          <Link
            href={documentUrl}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 text-white text-[13px] font-medium hover:bg-pr-800 transition-colors shrink-0 shadow-2xs"
          >
            <FileText className="w-4 h-4" />
            <span>Lihat Dokumen</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default CorrectionDiffViewer;


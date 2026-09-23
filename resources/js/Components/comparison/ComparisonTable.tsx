import React, { useMemo } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { ComparisonSection, ComparisonRow } from '@/data/dummyComparison';
import { diffWordsWithSpace } from 'diff';

export interface ComparisonTableProps {
  leftTitle: string;
  rightTitle: string;
  sections: ComparisonSection[];
}

export function ComparisonTable({
  leftTitle,
  rightTitle,
  sections,
}: ComparisonTableProps) {
  // Helper render konten cell menggunakan library diff
  const renderCell = (
    row: ComparisonRow,
    isRight: boolean
  ) => {
    const rawVal = isRight ? row.rightValue : row.leftValue;
    if (React.isValidElement(rawVal)) {
      return rawVal;
    }

    const leftStr = Array.isArray(row.leftValue) ? row.leftValue.join("\n") : String(row.leftValue || '');
    const rightStr = Array.isArray(row.rightValue) ? row.rightValue.join("\n") : String(row.rightValue || '');
    const currentStr = isRight ? rightStr : leftStr;

    if (!currentStr || currentStr.trim() === '') {
      return <span className="text-gray-400 text-xs italic">-</span>;
    }

    const diffType = isRight ? row.rightDiffType : row.leftDiffType;
    const isModified = row.leftDiffType === 'modified' || row.rightDiffType === 'modified';

    // 1. Jika baris dimodifikasi (modified): gunakan library diff untuk menandai kata
    if (isModified && leftStr.trim() !== '' && rightStr.trim() !== '') {
      // Hitung diff menggunakan library diff
      const changes = diffWordsWithSpace(leftStr, rightStr);

      if (!isRight) {
        // Kolom KIRI (Dokumen Acuan Awal): teks merah dengan sorotan kata yang diubah/dihapus
        return (
          <div className="text-xs leading-relaxed text-red-600 font-normal whitespace-pre-line">
            {changes.map((part, index) => {
              if (part.added) {
                // Bagian yang hanya ada di kanan tidak ditampilkan di sisi kiri
                return null;
              }
              if (part.removed) {
                // Kata yang dihapus/diubah dari dokumen acuan awal
                return (
                  <span
                    key={index}
                    className="bg-red-100/90 text-red-700 font-semibold px-0.5 rounded"
                  >
                    {part.value}
                  </span>
                );
              }
              // Kata yang tetap sama tapi termasuk dalam pasal yang diubah (merah sesuai desain)
              return <span key={index}>{part.value}</span>;
            })}
          </div>
        );
      } else {
        // Kolom KANAN (Dokumen Yang Dibandingkan): teks hijau dengan sorotan kata yang ditambah
        return (
          <div className="text-xs leading-relaxed text-emerald-600 font-normal whitespace-pre-line">
            {changes.map((part, index) => {
              if (part.removed) {
                // Bagian yang dihapus dari kiri tidak ditampilkan di sisi kanan
                return null;
              }
              if (part.added) {
                // Kata yang baru ditambahkan di dokumen pengubah
                return (
                  <span
                    key={index}
                    className="bg-emerald-100/90 text-emerald-800 font-bold px-0.5 rounded underline decoration-emerald-400"
                  >
                    {part.value}
                  </span>
                );
              }
              // Kata yang tetap sama dalam rumusan baru (hijau sesuai desain)
              return <span key={index}>{part.value}</span>;
            })}
          </div>
        );
      }
    }

    // 2. Jika baris ditambahkan (added) sepenuhnya (misal Pasal 24A)
    if (diffType === 'added') {
      return (
        <div className="text-xs leading-relaxed text-emerald-600 font-normal whitespace-pre-line">
          {currentStr}
        </div>
      );
    }

    // 3. Jika baris dihapus (deleted) sepenuhnya
    if (diffType === 'deleted') {
      return (
        <div className="text-xs leading-relaxed text-red-600 line-through opacity-85 whitespace-pre-line">
          {currentStr}
        </div>
      );
    }

    // 4. Baris normal / tidak berubah
    return (
      <div className="text-xs leading-relaxed text-gray-700 font-normal whitespace-pre-line">
        {currentStr}
      </div>
    );
  };

  return (
    <div className="w-full min-w-0 bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs">
      {/* Mobile Swipe Cue Banner */}
      <div className="flex sm:hidden items-center justify-between px-3.5 py-2.5 bg-gray-50/90 border-b border-gray-200/80 text-[11px] text-gray-500 font-medium">
        <div className="flex items-center gap-1.5">
          <ArrowLeftRight className="w-3.5 h-3.5 text-pr-800 shrink-0" />
          <span>Geser tabel ke samping untuk melihat detail</span>
        </div>
        <span className="text-[10px] font-semibold text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
          Geser &rarr;
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px] sm:min-w-[700px]">
          {/* Header Tabel Dark Navy Sesuai Desain */}
          <thead>
            <tr className="bg-[#0A1C3E] text-white">
              <th className="sticky left-0 bg-[#0A1C3E] z-20 py-3 sm:py-3.5 px-3.5 sm:px-5 text-xs font-semibold w-[140px] sm:w-[22%] tracking-wide border-r border-white/10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.25)]">
                Parameter / Dimensi
              </th>
              <th className="py-3 sm:py-3.5 px-3.5 sm:px-5 text-xs font-semibold w-[39%] tracking-wide">
                {leftTitle}
              </th>
              <th className="py-3 sm:py-3.5 px-3.5 sm:px-5 text-xs font-semibold w-[39%] tracking-wide">
                {rightTitle}
              </th>
            </tr>
          </thead>

          <tbody>
            {sections.map((section, sIdx) => (
              <React.Fragment key={sIdx}>
                {/* Judul Kategori Section Sesuai Desain */}
                <tr className="bg-gray-50/90 border-t border-b border-gray-100">
                  <td
                    colSpan={3}
                    className="py-2.5 px-3.5 sm:px-5 text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase"
                  >
                    {section.title}
                  </td>
                </tr>

                {/* Baris Parameter & Nilai */}
                {section.rows.map((row, rIdx) => {
                  const isSpecialParameter =
                    typeof row.parameter === 'string' &&
                    row.parameter.includes('|');

                  return (
                    <tr
                      key={rIdx}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group"
                    >
                      {/* Kolom Parameter - Sticky di sisi kiri saat di-scroll */}
                      <td className="sticky left-0 bg-white group-hover:bg-gray-50/90 z-10 py-3 sm:py-3.5 px-3.5 sm:px-5 text-xs font-medium text-gray-700 align-top border-r border-gray-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)]">
                        {isSpecialParameter ? (
                          <span>
                            <span className="text-red-500 font-semibold">
                              {(row.parameter as string).split('|')[0].trim()}
                            </span>
                            <span className="mx-1.5 text-gray-400">|</span>
                            <span className="text-emerald-600 font-semibold">
                              {(row.parameter as string).split('|')[1].trim()}
                            </span>
                          </span>
                        ) : row.leftDiffType === 'modified' || row.leftDiffType === 'deleted' ? (
                          <span className="text-red-500 font-semibold">
                            {row.parameter}
                          </span>
                        ) : row.rightDiffType === 'added' ? (
                          <span className="text-emerald-600 font-semibold">
                            {row.parameter}
                          </span>
                        ) : (
                          row.parameter
                        )}
                      </td>

                      {/* Kolom Nilai Dokumen 1 (Acuan Awal) */}
                      <td className="py-3 sm:py-3.5 px-3.5 sm:px-5 align-top">
                        {renderCell(row, false)}
                      </td>

                      {/* Kolom Nilai Dokumen 2 (Yang Mau Dibandingkan) */}
                      <td className="py-3 sm:py-3.5 px-3.5 sm:px-5 align-top">
                        {renderCell(row, true)}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

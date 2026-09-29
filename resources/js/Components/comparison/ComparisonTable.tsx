import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ComparisonSection, ComparisonRow } from '@/types/comparison';
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
  // State accordion untuk tampilan mobile
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  const toggleSection = (idx: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [idx]: !(prev[idx] ?? true),
    }));
  };

  // Hilangkan folder/section "BATANG TUBUH", langsung kelompokkan ke BAB
  const cleanSections = useMemo(() => {
    const list: ComparisonSection[] = [];

    sections.forEach((sec) => {
      const titleUpper = sec.title.toUpperCase().trim();
      if (titleUpper === 'BATANG TUBUH') {
        // Kelompokkan baris berdasarkan BAB jika ada
        const babMap: Record<string, ComparisonRow[]> = {};
        const standaloneRows: ComparisonRow[] = [];

        sec.rows.forEach((r) => {
          const pStr = String(r.parameter || '');
          const match = pStr.match(/^(BAB\s+[IVXLCDM\d]+)/i);
          if (match) {
            const bName = match[1].toUpperCase();
            if (!babMap[bName]) babMap[bName] = [];
            babMap[bName].push(r);
          } else {
            standaloneRows.push(r);
          }
        });

        if (Object.keys(babMap).length > 0) {
          Object.entries(babMap).forEach(([bTitle, bRows]) => {
            list.push({ title: bTitle, rows: bRows });
          });
          if (standaloneRows.length > 0) {
            list.push({ title: 'BAB I', rows: standaloneRows });
          }
        } else {
          list.push({ title: 'BAB I', rows: sec.rows });
        }
      } else {
        list.push(sec);
      }
    });

    return list;
  }, [sections]);

  // Helper render konten cell
  const renderCell = (
    row: ComparisonRow,
    isRight: boolean,
    isBatangTubuh: boolean = false
  ) => {
    const rawVal = isRight ? row.rightValue : row.leftValue;
    if (React.isValidElement(rawVal)) {
      return rawVal;
    }

    const leftStr = Array.isArray(row.leftValue) ? row.leftValue.join("\n") : String(row.leftValue || '');
    const rightStr = Array.isArray(row.rightValue) ? row.rightValue.join("\n") : String(row.rightValue || '');
    const currentStr = isRight ? rightStr : leftStr;

    if (!currentStr || currentStr.trim() === '') {
      return <span className="text-neu-400 text-xs italic">-</span>;
    }

    // 1. Jika di Batang Tubuh: Acuan Awal SELALU MERAH, Yang Dibandingkan SELALU HIJAU
    if (isBatangTubuh) {
      if (!isRight) {
        return (
          <div className="text-sm leading-relaxed text-dan-700 font-normal whitespace-pre-line">
            {currentStr}
          </div>
        );
      } else {
        return (
          <div className="text-sm leading-relaxed text-suc-700 font-normal whitespace-pre-line">
            {currentStr}
          </div>
        );
      }
    }

    // 2. Jika di luar Batang Tubuh (Informasi Hukum, Pembukaan):
    const diffType = isRight ? row.rightDiffType : row.leftDiffType;
    const isModified = row.leftDiffType === 'modified' || row.rightDiffType === 'modified';

    if (isModified && leftStr.trim() !== '' && rightStr.trim() !== '') {
      const changes = diffWordsWithSpace(leftStr, rightStr);

      if (!isRight) {
        return (
          <div className="text-sm leading-relaxed text-dan-700 font-normal whitespace-pre-line">
            {changes.map((part, index) => {
              if (part.added) return null;
              if (part.removed) {
                return (
                  <span
                    key={index}
                    className="bg-dan-100 text-dan-800 font-medium px-0.5 rounded"
                  >
                    {part.value}
                  </span>
                );
              }
              return <span key={index}>{part.value}</span>;
            })}
          </div>
        );
      } else {
        return (
          <div className="text-sm leading-relaxed text-suc-700 font-normal whitespace-pre-line">
            {changes.map((part, index) => {
              if (part.removed) return null;
              if (part.added) {
                return (
                  <span
                    key={index}
                    className="bg-suc-100 text-suc-800 font-medium px-0.5 rounded underline decoration-suc-400"
                  >
                    {part.value}
                  </span>
                );
              }
              return <span key={index}>{part.value}</span>;
            })}
          </div>
        );
      }
    }

    if (diffType === 'added') {
      return (
        <div className="text-sm leading-relaxed text-suc-700 font-normal whitespace-pre-line">
          {currentStr}
        </div>
      );
    }

    if (diffType === 'deleted') {
      return (
        <div className="text-sm leading-relaxed text-dan-700 line-through opacity-85 font-normal whitespace-pre-line">
          {currentStr}
        </div>
      );
    }

    return (
      <div className="text-sm leading-relaxed text-neu-800 font-normal whitespace-pre-line">
        {currentStr}
      </div>
    );
  };

  return (
    <div className="w-full min-w-0">
      {/* ─────────────────────────────────────────────────────────────
          1. TAMPILAN MOBILE & TABLET KECIL (Accordion Cards Sesuai Desain Figma)
          ───────────────────────────────────────────────────────────── */}
      <div className="block md:hidden space-y-4">
        {cleanSections.map((section, sIdx) => {
          const isOpen = openSections[sIdx] ?? true;
          const isInformasi = section.title.toUpperCase().includes('INFORMASI');
          const isPembukaan = section.title.toUpperCase().includes('PEMBUKAAN');
          const isBatangTubuh = !isInformasi && !isPembukaan;

          return (
            <div
              key={sIdx}
              className="bg-white rounded-2xl border border-neu-200 overflow-hidden"
            >
              {/* Accordion Header (10px, medium style, tanpa garis bawah) */}
              <button
                type="button"
                onClick={() => toggleSection(sIdx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-neu-50 transition-colors cursor-pointer select-none"
              >
                <span className="text-xs font-medium text-neu-900 tracking-wider uppercase">
                  {section.title}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-neu-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neu-500 shrink-0" />
                )}
              </button>

              {/* Accordion Content (tanpa border-t di bawah header) */}
              {isOpen && (
                <div className="p-4 sm:p-5 pt-0">
                  {isInformasi ? (
                    /* ── Card Informasi Hukum Sesuai Desain Gambar 2 ── */
                    <div className="space-y-2">
                      {/* Judul Kedua Peraturan (14px, medium, tanpa garis bawah / tanpa garis vertikal) */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-1">
                        <div className="text-md font-medium text-neu-900 leading-snug">
                          {leftTitle}
                        </div>
                        <div className="text-md font-medium text-neu-900 leading-snug">
                          {rightTitle}
                        </div>
                      </div>

                      {/* Baris Parameter dengan Box Netral & Garis Pemisah Antar Baris Saja */}
                      {section.rows.map((row, rIdx) => (
                        <div
                          key={rIdx}
                          className="pt-2 pb-3 border-b border-neu-100 last:border-b-0 last:pb-0 space-y-1.5"
                        >
                          <span className="text-xs font-normal text-neu-500 block">
                            {row.parameter}
                          </span>
                          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                            {/* Nilai Acuan Awal (Kiri) - 12px reguler */}
                            <div>
                              <div className="p-2.5 sm:p-3 bg-neu-50 rounded-xl text-sm font-normal text-neu-800 break-words leading-relaxed min-h-[40px] flex items-center">
                                {renderCell(row, false, false)}
                              </div>
                            </div>
                            {/* Nilai Yang Dibandingkan (Kanan) - 12px reguler */}
                            <div>
                              <div className="p-2.5 sm:p-3 bg-neu-50 rounded-xl text-sm font-normal text-neu-800 break-words leading-relaxed min-h-[40px] flex items-center">
                                {renderCell(row, true, false)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : isPembukaan ? (
                    /* ── Card Pembukaan Sesuai Desain Gambar 3 (Teks Normal, Tanpa Garis Pembatas ke Bawah) ── */
                    <div className="space-y-4 pt-1">
                      {section.rows.map((row, rIdx) => (
                        <div key={rIdx} className="space-y-1.5">
                          {/* Label Klausul (Menimbang, Mengingat, Memutuskan) */}
                          <div className="text-xs font-normal text-neu-500">
                            {row.parameter}
                          </div>

                          {/* Card Acuan Awal (Teks Normal) */}
                          <div className="p-3.5 rounded-xl border border-neu-200 bg-white space-y-1 mb-2">
                            <span className="text-xs font-medium text-neu-900 tracking-wider uppercase block">
                              ACUAN AWAL
                            </span>
                            <div className="text-sm font-normal leading-relaxed text-neu-800 break-words">
                              {renderCell(row, false, false)}
                            </div>
                          </div>

                          {/* Card Dibandingkan (Teks Normal) */}
                          <div className="p-3.5 rounded-xl border border-neu-200 bg-white space-y-1">
                            <span className="text-xs font-medium text-neu-900 tracking-wider uppercase block">
                              DIBANDINGKAN
                            </span>
                            <div className="text-sm font-normal leading-relaxed text-neu-800 break-words">
                              {renderCell(row, true, false)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* ── Card Batang Tubuh (BAB I, BAB II, dll) Sesuai Desain Gambar 4 (Acuan Awal = MERAH, Pembanding = HIJAU) ── */
                    <div className="space-y-4 pt-1">
                      {section.rows.map((row, rIdx) => {
                        const isSpecialParameter =
                          typeof row.parameter === 'string' &&
                          row.parameter.includes('|');

                        return (
                          <div key={rIdx} className="space-y-1.5">
                            {/* Judul Parameter / Pasal */}
                            <div className="text-xs font-medium">
                              {isSpecialParameter ? (
                                <span>
                                  <span className="text-dan-700 font-medium">
                                    {(row.parameter as string).split('|')[0].trim()}
                                  </span>
                                  <span className="mx-1.5 text-neu-400 font-normal">|</span>
                                  <span className="text-suc-700 font-medium">
                                    {(row.parameter as string).split('|')[1].trim()}
                                  </span>
                                </span>
                              ) : (
                                <span className="text-dan-700 font-medium">
                                  {row.parameter}
                                </span>
                              )}
                            </div>

                            {/* Card Acuan Awal (SEMUA TEKS MERAH) */}
                            <div className="p-3.5 rounded-xl border border-neu-200 bg-white space-y-1 mb-2">
                              <span className="text-xs font-medium text-neu-900 tracking-wider uppercase block">
                                ACUAN AWAL
                              </span>
                              <div className="text-sm font-normal leading-relaxed text-dan-700 break-words">
                                {renderCell(row, false, true)}
                              </div>
                            </div>

                            {/* Card Dibandingkan (SEMUA TEKS HIJAU) */}
                            <div className="p-3.5 rounded-xl border border-neu-200 bg-white space-y-1">
                              <span className="text-xs font-medium text-neu-900 tracking-wider uppercase block">
                                DIBANDINGKAN
                              </span>
                              <div className="text-sm font-normal leading-relaxed text-suc-700 break-words">
                                {renderCell(row, true, true)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TAMPILAN DESKTOP & TABLET LEBAR (Tabel Kolom Komparasi)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:block w-full min-w-0 bg-white rounded-2xl border border-neu-200 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Header Tabel Dark Navy */}
            <thead>
              <tr className="bg-pr-900 text-white">
                <th className="sticky left-0 bg-pr-900 z-20 py-3.5 px-4 sm:px-5 text-xs font-medium w-[22%] tracking-wide border-r border-pr-700">
                  Parameter / Dimensi
                </th>
                <th className="py-3.5 px-4 sm:px-5 text-xs font-medium w-[39%] tracking-wide border-r border-pr-700">
                  {leftTitle}
                </th>
                <th className="py-3.5 px-4 sm:px-5 text-xs font-medium w-[39%] tracking-wide">
                  {rightTitle}
                </th>
              </tr>
            </thead>

            <tbody>
              {cleanSections.map((section, sIdx) => {
                const isInformasi = section.title.toUpperCase().includes('INFORMASI');
                const isPembukaan = section.title.toUpperCase().includes('PEMBUKAAN');
                const isBatangTubuh = !isInformasi && !isPembukaan;

                return (
                  <React.Fragment key={sIdx}>
                    {/* Judul Kategori Section (10px medium) */}
                    <tr className="bg-neu-50 border-t border-b border-neu-100">
                      <td
                        colSpan={3}
                        className="py-2.5 px-4 sm:px-5 text-xs font-medium text-neu-900 tracking-wider uppercase"
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
                          className="border-b border-neu-100 hover:bg-neu-50/60 transition-colors group"
                        >
                          {/* Kolom Parameter - Sticky di sisi kiri saat di-scroll */}
                          <td className="sticky left-0 bg-white group-hover:bg-neu-50/80 z-10 py-3.5 px-4 sm:px-5 text-xs font-normal text-neu-700 align-top border-r border-neu-200">
                            {isSpecialParameter ? (
                              <span>
                                <span className="text-dan-700 font-medium">
                                  {(row.parameter as string).split('|')[0].trim()}
                                </span>
                                <span className="mx-1.5 text-neu-400 font-normal">|</span>
                                <span className="text-suc-700 font-medium">
                                  {(row.parameter as string).split('|')[1].trim()}
                                </span>
                              </span>
                            ) : isBatangTubuh ? (
                              <span className="text-dan-700 font-medium">
                                {row.parameter}
                              </span>
                            ) : (
                              <span className="text-neu-700 font-normal">
                                {row.parameter}
                              </span>
                            )}
                          </td>

                          {/* Kolom Nilai Dokumen 1 (Acuan Awal) - Di Batang Tubuh SELALU MERAH */}
                          <td className="py-3.5 px-4 sm:px-5 align-top border-r border-neu-200">
                            {renderCell(row, false, isBatangTubuh)}
                          </td>

                          {/* Kolom Nilai Dokumen 2 (Yang Mau Dibandingkan) - Di Batang Tubuh SELALU HIJAU */}
                          <td className="py-3.5 px-4 sm:px-5 align-top">
                            {renderCell(row, true, isBatangTubuh)}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ComparisonSection } from '@/data/dummyComparison';

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
  const renderCellContent = (
    value: string | string[] | React.ReactNode,
    diffType?: 'normal' | 'deleted' | 'added' | 'modified'
  ) => {
    if (React.isValidElement(value)) {
      return value;
    }

    const textColorClass =
      diffType === 'deleted'
        ? 'text-red-600'
        : diffType === 'added'
        ? 'text-emerald-600'
        : 'text-gray-700';

    if (Array.isArray(value)) {
      return (
        <div className={`space-y-2 text-xs leading-relaxed ${textColorClass}`}>
          {value.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      );
    }

    return (
      <p className={`text-xs leading-relaxed ${textColorClass}`}>
        {value}
      </p>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Header Tabel Dark Navy */}
          <thead>
            <tr className="bg-[#0A1C3E] text-white">
              <th className="py-3.5 px-5 text-xs font-semibold w-[22%] tracking-wide">
                Parameter / Dimensi
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold w-[39%] tracking-wide">
                {leftTitle}
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold w-[39%] tracking-wide">
                {rightTitle}
              </th>
            </tr>
          </thead>

          <tbody>
            {sections.map((section, sIdx) => (
              <React.Fragment key={sIdx}>
                {/* Judul Kategori Section */}
                <tr className="bg-gray-50/90 border-t border-b border-gray-100">
                  <td
                    colSpan={3}
                    className="py-2.5 px-5 text-[11px] font-bold text-gray-900 tracking-wider uppercase"
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
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Kolom Parameter */}
                      <td className="py-3.5 px-5 text-xs font-medium text-gray-700 align-top">
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
                        ) : (
                          row.parameter
                        )}
                      </td>

                      {/* Kolom Nilai Dokumen 1 */}
                      <td className="py-3.5 px-5 align-top">
                        {renderCellContent(row.leftValue, row.leftDiffType)}
                      </td>

                      {/* Kolom Nilai Dokumen 2 */}
                      <td className="py-3.5 px-5 align-top">
                        {renderCellContent(row.rightValue, row.rightDiffType)}
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

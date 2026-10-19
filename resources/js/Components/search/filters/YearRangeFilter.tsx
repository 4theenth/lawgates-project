import React from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface YearRangeFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  tahunLabel: string;
  tahunDari: string;
  setTahunDari: (yr: string) => void;
  tahunSampai: string;
  setTahunSampai: (yr: string) => void;
  availableYears: string[];
  openYearSub: { dari: boolean; sampai: boolean };
  setOpenYearSub: React.Dispatch<React.SetStateAction<{ dari: boolean; sampai: boolean }>>;
}

export const YearRangeFilter: React.FC<YearRangeFilterProps> = ({
  isOpen,
  onToggle,
  tahunLabel,
  tahunDari,
  setTahunDari,
  tahunSampai,
  setTahunSampai,
  availableYears,
  openYearSub,
  setOpenYearSub,
}) => {
  return (
    <div className={`relative ${isOpen ? 'z-40' : 'z-10'}`}>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Tahun
      </label>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
      >
        <span className="truncate">{tahunLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Tahun */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 shadow-2xl z-50">
          {/* Header popup & Reset */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-gray-100 text-xs">
            <span className="text-gray-700 font-semibold">Rentang Tahun</span>
            {(tahunDari || tahunSampai) && (
              <button
                type="button"
                onClick={() => {
                  setTahunDari('');
                  setTahunSampai('');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Kolom Dari */}
            <div className="min-w-0">
              <div className="text-xs text-gray-700 font-medium mb-1">Dari</div>
              <button
                type="button"
                onClick={() =>
                  setOpenYearSub((prev) => ({ ...prev, dari: !prev.dari }))
                }
                className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 cursor-pointer"
              >
                <span className="truncate">{tahunDari || 'Pilih'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                    openYearSub.dari ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openYearSub.dari && (
                <div className="mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-36 overflow-y-auto no-scrollbar">
                  {availableYears.map((yr) => {
                    const isSelected = tahunDari === yr;
                    return (
                      <button
                        key={`dari-${yr}`}
                        type="button"
                        onClick={() => setTahunDari(yr)}
                        className={`w-full px-2.5 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-pr-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{yr}</span>
                        {isSelected && <Check className="w-3 h-3 text-pr-900" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Kolom Sampai */}
            <div className="min-w-0">
              <div className="text-xs text-gray-700 font-medium mb-1">Sampai</div>
              <button
                type="button"
                onClick={() =>
                  setOpenYearSub((prev) => ({ ...prev, sampai: !prev.sampai }))
                }
                className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 cursor-pointer"
              >
                <span className="truncate">{tahunSampai || 'Pilih'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                    openYearSub.sampai ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openYearSub.sampai && (
                <div className="mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-36 overflow-y-auto no-scrollbar">
                  {availableYears.map((yr) => {
                    const isSelected = tahunSampai === yr;
                    return (
                      <button
                        key={`sampai-${yr}`}
                        type="button"
                        onClick={() => setTahunSampai(yr)}
                        className={`w-full px-2.5 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-pr-900 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{yr}</span>
                        {isSelected && <Check className="w-3 h-3 text-pr-900" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

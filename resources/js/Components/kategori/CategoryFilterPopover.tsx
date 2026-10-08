import React, { useState, useRef, useEffect } from 'react';
import { Filter, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { FilterOption } from '@/types/peraturan';

export interface CategoryFilterPopoverProps {
  selectedStatus: string[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<string[]>>;
  tahunDari: string;
  setTahunDari: (yr: string) => void;
  tahunSampai: string;
  setTahunSampai: (yr: string) => void;
  statusOptions: FilterOption[];
  availableYears: string[];
  onApply: () => void;
  onReset: () => void;
  className?: string;
}

export function CategoryFilterPopover({
  selectedStatus,
  setSelectedStatus,
  tahunDari,
  setTahunDari,
  tahunSampai,
  setTahunSampai,
  statusOptions,
  availableYears,
  onApply,
  onReset,
  className = '',
}: CategoryFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'tahun' | 'status' | null>(null);
  const [isResetSpinning, setIsResetSpinning] = useState(false);
  const [openYearSub, setOpenYearSub] = useState<{ dari: boolean; sampai: boolean }>({
    dari: false,
    sampai: false,
  });

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Teks Label Tahun
  let tahunLabel = 'Semua tahun';
  if (tahunDari && tahunSampai) {
    if (tahunDari === tahunSampai) {
      tahunLabel = tahunDari;
    } else {
      tahunLabel = `${tahunDari} - ${tahunSampai}`;
    }
  } else if (tahunDari) {
    tahunLabel = `Dari ${tahunDari}`;
  } else if (tahunSampai) {
    tahunLabel = `Hingga ${tahunSampai}`;
  }

  // Teks Label Status
  let statusLabel = 'Semua status';
  if (
    selectedStatus.length === 0 ||
    (statusOptions.length > 0 && selectedStatus.length === statusOptions.length)
  ) {
    statusLabel = 'Semua status';
  } else if (selectedStatus.length === 1) {
    const found = statusOptions.find((s) => s.value === selectedStatus[0]);
    if (found) statusLabel = found.label;
  } else if (selectedStatus.length > 1) {
    statusLabel = `${selectedStatus.length} Status`;
  }

  const handleResetClick = () => {
    setIsResetSpinning(true);
    setActiveDropdown(null);
    onReset();
  };

  const handleApplyClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    onApply();
  };

  return (
    <div className={`relative ${className}`} ref={filterContainerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 rounded-full text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer shrink-0 shadow-2xs"
        title="Buka Filter"
      >
        <Filter className="w-4 h-4 text-gray-600" />
        <span>Filter</span>
      </button>

      {/* Floating Filter Popover Card */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[320px] sm:w-[350px] bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Filter: Tombol Filter & Reset */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
            <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-700" />
              <span>Filter</span>
            </div>
            <button
              onClick={handleResetClick}
              className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
              title="Reset Filter"
              type="button"
            >
              <RotateCcw
                className={`w-4 h-4 ${isResetSpinning ? 'animate-smooth-spin' : ''}`}
                onAnimationEnd={() => setIsResetSpinning(false)}
              />
            </button>
          </div>

          <div className="space-y-4">
            {/* 1. Filter Tahun */}
            <div className={`relative ${activeDropdown === 'tahun' ? 'z-40' : 'z-20'}`}>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Tahun
              </label>
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))
                }
                className="flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
              >
                <span className="truncate">{tahunLabel}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                    activeDropdown === 'tahun' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Floating Dropdown Tahun */}
              {activeDropdown === 'tahun' && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 shadow-2xl z-50">
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    {/* Sub-dropdown Dari */}
                    <div className="relative">
                      <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Dari
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenYearSub((prev) => ({
                            ...prev,
                            dari: !prev.dari,
                            sampai: false,
                          }))
                        }
                        className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 cursor-pointer"
                      >
                        <span>{tahunDari || 'Pilih'}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                            openYearSub.dari ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {openYearSub.dari && (
                        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl py-1 max-h-36 overflow-y-auto custom-scrollbar z-50">
                          {availableYears.map((yr) => {
                            const isSelected = tahunDari === yr;
                            return (
                              <button
                                key={`dari-${yr}`}
                                type="button"
                                onClick={() => {
                                  setTahunDari(yr);
                                  setOpenYearSub((p) => ({ ...p, dari: false }));
                                }}
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

                    {/* Sub-dropdown Sampai */}
                    <div className="relative">
                      <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                        Sampai
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenYearSub((prev) => ({
                            ...prev,
                            sampai: !prev.sampai,
                            dari: false,
                          }))
                        }
                        className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 cursor-pointer"
                      >
                        <span>{tahunSampai || 'Pilih'}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                            openYearSub.sampai ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {openYearSub.sampai && (
                        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl py-1 max-h-36 overflow-y-auto custom-scrollbar z-50">
                          {availableYears.map((yr) => {
                            const isSelected = tahunSampai === yr;
                            return (
                              <button
                                key={`sampai-${yr}`}
                                type="button"
                                onClick={() => {
                                  setTahunSampai(yr);
                                  setOpenYearSub((p) => ({ ...p, sampai: false }));
                                }}
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

            {/* 2. Filter Status */}
            <div className={`relative ${activeDropdown === 'status' ? 'z-40' : 'z-10'}`}>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))
                }
                className="flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
              >
                <span className="truncate">{statusLabel}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                    activeDropdown === 'status' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Floating Dropdown Status */}
              {activeDropdown === 'status' && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 space-y-2.5 shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                  {statusOptions.map((item) => {
                    const isChecked = selectedStatus.includes(item.value);
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setSelectedStatus((prev) =>
                            prev.includes(item.value)
                              ? prev.filter((v) => v !== item.value)
                              : [...prev, item.value]
                          );
                        }}
                        className="w-full text-left flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-[#0B1A3A] border-[#0B1A3A] text-white'
                              : 'border-gray-300 bg-white group-hover:border-gray-400'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className="text-sm text-gray-700 select-none">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tombol TERAPKAN */}
            <button
              onClick={handleApplyClick}
              type="button"
              className="w-full h-[46px] sm:h-[48px] bg-[#0B1A3A] hover:bg-[#07132B] text-white font-bold text-sm tracking-wider uppercase rounded-full mt-4 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
            >
              TERAPKAN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryFilterPopover;

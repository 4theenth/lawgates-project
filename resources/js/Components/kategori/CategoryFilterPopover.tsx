import React, { useState, useRef, useEffect } from 'react';
import { Filter, RotateCcw, ChevronDown, Check, Search } from 'lucide-react';
import { FilterOption } from '@/types/peraturan';

export interface CategoryFilterPopoverProps {
  selectedStatus: string[];
  setSelectedStatus:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((status: string[]) => void);
  tahunDari: string;
  setTahunDari: (yr: string) => void;
  tahunSampai: string;
  setTahunSampai: (yr: string) => void;
  statusOptions: FilterOption[];
  availableYears: string[];
  onApply: () => void;
  onReset: () => void;
  className?: string;

  // Subjek filter props
  showSubjek?: boolean;
  selectedSubjek?: string[];
  setSelectedSubjek?:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((subjek: string[]) => void);
  subjekOptions?: FilterOption[];

  // Optional Kategori filter props (if needed)
  showKategori?: boolean;
  kategoriOptions?: FilterOption[];
  selectedKategori?: string[];
  setSelectedKategori?:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((kategori: string[]) => void);

  variant?: 'popover' | 'sidebar';
  onClose?: () => void;
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
  showSubjek = true,
  selectedSubjek = [],
  setSelectedSubjek,
  subjekOptions = [],
  showKategori = false,
  kategoriOptions = [],
  selectedKategori = [],
  setSelectedKategori,
  variant = 'popover',
  onClose,
}: CategoryFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    'kategori' | 'tahun' | 'status' | 'subjek' | null
  >(null);
  const [isResetSpinning, setIsResetSpinning] = useState(false);
  const [openYearSub, setOpenYearSub] = useState<{ dari: boolean; sampai: boolean }>({
    dari: false,
    sampai: false,
  });
  const [subjekSearch, setSubjekSearch] = useState('');

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(e.target as Node)
      ) {
        if (variant === 'popover') {
          setIsOpen(false);
        }
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

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

  // Teks Label Subjek
  let subjekLabel = 'Semua subjek';
  if (selectedSubjek.length === 0) {
    subjekLabel = 'Semua subjek';
  } else if (selectedSubjek.length === 1) {
    subjekLabel = selectedSubjek[0];
  } else {
    subjekLabel = `${selectedSubjek.length} Subjek`;
  }

  // Teks Label Kategori (jika ada)
  let kategoriLabel = 'Semua kategori';
  if (selectedKategori.length === 0) {
    kategoriLabel = 'Semua kategori';
  } else if (selectedKategori.length === 1) {
    const found = kategoriOptions.find((k) => k.value === selectedKategori[0]);
    if (found) kategoriLabel = found.label;
  } else {
    kategoriLabel = `${selectedKategori.length} Kategori`;
  }

  const handleResetClick = () => {
    setIsResetSpinning(true);
    setActiveDropdown(null);
    setOpenYearSub({ dari: false, sampai: false });
    setSubjekSearch('');
    onReset();
  };

  const handleApplyClick = () => {
    if (variant === 'popover') {
      setIsOpen(false);
    }
    setActiveDropdown(null);
    onApply();
  };

  const handleToggleStatus = (val: string) => {
    if (selectedStatus.includes(val)) {
      setSelectedStatus(selectedStatus.filter((v) => v !== val));
    } else {
      setSelectedStatus([...selectedStatus, val]);
    }
  };

  const handleToggleSubjek = (val: string) => {
    if (!setSelectedSubjek) return;
    if (selectedSubjek.includes(val)) {
      setSelectedSubjek(selectedSubjek.filter((v) => v !== val));
    } else {
      setSelectedSubjek([...selectedSubjek, val]);
    }
  };

  const handleToggleKategori = (val: string) => {
    if (!setSelectedKategori) return;
    if (selectedKategori.includes(val)) {
      setSelectedKategori(selectedKategori.filter((v) => v !== val));
    } else {
      setSelectedKategori([...selectedKategori, val]);
    }
  };

  // Filter subjek options by search query
  const defaultSubjekList: FilterOption[] =
    subjekOptions.length > 0
      ? subjekOptions
      : [
          { value: 'Otonomi Daerah', label: 'Otonomi Daerah' },
          { value: 'Kepolisian', label: 'Kepolisian' },
          { value: 'Pertanian', label: 'Pertanian' },
          { value: 'Pemerintah Daerah', label: 'Pemerintah Daerah' },
          { value: 'TNI', label: 'TNI' },
          { value: 'Otonomi', label: 'Otonomi' },
        ];

  const filteredSubjekOptions = defaultSubjekList.filter((opt) =>
    opt.label.toLowerCase().includes(subjekSearch.toLowerCase())
  );

  const filterBodyContent = (
    <div className="space-y-4">
      {/* 1. Kategori (opsional jika showKategori true) */}
      {showKategori && (
        <div className={`relative ${activeDropdown === 'kategori' ? 'z-40' : 'z-10'}`}>
          <label className="block text-[11px] font-bold text-neu-500 uppercase tracking-wider mb-1.5">
            Kategori
          </label>
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((prev) => (prev === 'kategori' ? null : 'kategori'))
            }
            className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-200 rounded-xl text-xs sm:text-sm text-neu-700 text-left hover:border-neu-300 focus:outline-none transition-all cursor-pointer"
          >
            <span className="truncate">{kategoriLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                activeDropdown === 'kategori' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {activeDropdown === 'kategori' && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-neu-100 rounded-xl p-3 space-y-2 shadow-xl z-50 max-h-56 overflow-y-auto custom-scrollbar animate-in fade-in duration-100">
              {kategoriOptions.map((item) => {
                const isChecked = selectedKategori.includes(item.value);
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleToggleKategori(item.value)}
                    className="w-full text-left flex items-center gap-2.5 p-1 rounded-md hover:bg-neu-50 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-pr-900 border-pr-900 text-white'
                          : 'border-neu-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span className="text-xs text-neu-700 truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. TAHUN */}
      <div className={`relative ${activeDropdown === 'tahun' ? 'z-40' : 'z-20'}`}>
        <label className="block text-[11px] font-bold text-neu-500 uppercase tracking-wider mb-1.5">
          Tahun
        </label>
        <button
          type="button"
          onClick={() =>
            setActiveDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))
          }
          className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-200 rounded-xl text-xs sm:text-sm text-neu-700 text-left hover:border-neu-300 focus:outline-none transition-all cursor-pointer"
        >
          <span className="truncate">{tahunLabel}</span>
          <ChevronDown
            className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
              activeDropdown === 'tahun' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {activeDropdown === 'tahun' && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-neu-100 rounded-xl p-3 shadow-xl z-50 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neu-100 text-xs">
              <span className="text-neu-700 font-semibold">Rentang Tahun</span>
              {(tahunDari || tahunSampai) && (
                <button
                  type="button"
                  onClick={() => {
                    setTahunDari('');
                    setTahunSampai('');
                  }}
                  className="text-pr-900 hover:underline font-medium cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Sub-dropdown Dari */}
              <div className="relative">
                <span className="block text-[10px] font-bold text-neu-500 uppercase mb-1">
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
                  className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-neu-200 rounded-lg text-xs text-neu-700 cursor-pointer"
                >
                  <span className="truncate">{tahunDari || 'Pilih'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neu-400 shrink-0 transition-transform ${
                      openYearSub.dari ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openYearSub.dari && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-neu-200 rounded-lg shadow-xl py-1 max-h-36 overflow-y-auto custom-scrollbar z-50">
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
                              ? 'bg-pr-50 text-pr-900 font-semibold'
                              : 'text-neu-700 hover:bg-neu-50'
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
                <span className="block text-[10px] font-bold text-neu-500 uppercase mb-1">
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
                  className="flex items-center justify-between w-full h-[36px] px-2.5 bg-white border border-neu-200 rounded-lg text-xs text-neu-700 cursor-pointer"
                >
                  <span className="truncate">{tahunSampai || 'Pilih'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neu-400 shrink-0 transition-transform ${
                      openYearSub.sampai ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openYearSub.sampai && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-neu-200 rounded-lg shadow-xl py-1 max-h-36 overflow-y-auto custom-scrollbar z-50">
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
                              ? 'bg-pr-50 text-pr-900 font-semibold'
                              : 'text-neu-700 hover:bg-neu-50'
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

      {/* 3. STATUS */}
      <div className={`relative ${activeDropdown === 'status' ? 'z-40' : 'z-10'}`}>
        <label className="block text-[11px] font-bold text-neu-500 uppercase tracking-wider mb-1.5">
          Status
        </label>
        <button
          type="button"
          onClick={() =>
            setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))
          }
          className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-200 rounded-xl text-xs sm:text-sm text-neu-700 text-left hover:border-neu-300 focus:outline-none transition-all cursor-pointer"
        >
          <span className="truncate">{statusLabel}</span>
          <ChevronDown
            className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
              activeDropdown === 'status' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {activeDropdown === 'status' && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-neu-100 rounded-xl p-3 space-y-2 shadow-xl z-50 max-h-56 overflow-y-auto custom-scrollbar animate-in fade-in duration-100">
            {statusOptions.map((item) => {
              const isChecked = selectedStatus.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleToggleStatus(item.value)}
                  className="w-full text-left flex items-center gap-2.5 p-1 rounded-md hover:bg-neu-50 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-pr-900 border-pr-900 text-white'
                        : 'border-neu-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span className="text-xs text-neu-700 truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. SUBJEK (Sesuai Screenshot User) */}
      {showSubjek && (
        <div className={`relative ${activeDropdown === 'subjek' ? 'z-40' : 'z-0'}`}>
          <label className="block text-[11px] font-bold text-neu-500 uppercase tracking-wider mb-1.5 underline underline-offset-2">
            Subjek
          </label>
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((prev) => (prev === 'subjek' ? null : 'subjek'))
            }
            className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-200 rounded-xl text-xs sm:text-sm text-neu-700 text-left hover:border-neu-300 focus:outline-none transition-all cursor-pointer"
          >
            <span className="truncate">{subjekLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                activeDropdown === 'subjek' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Floating Dropdown Subjek dengan Search Bar & Checkbox List */}
          {activeDropdown === 'subjek' && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-neu-100 rounded-xl p-3 shadow-xl z-50 animate-in fade-in duration-100">
              {/* Input Cari Subjek */}
              <div className="relative mb-2.5">
                <Search className="w-3.5 h-3.5 text-neu-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={subjekSearch}
                  onChange={(e) => setSubjekSearch(e.target.value)}
                  placeholder="Cari subjek"
                  className="w-full h-8 pl-8 pr-2.5 text-xs bg-white border border-neu-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pr-900"
                />
              </div>

              {/* Checkbox List Subjek dengan Custom Scrollbar */}
              <div className="max-h-44 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                {filteredSubjekOptions.length > 0 ? (
                  filteredSubjekOptions.map((item) => {
                    const isChecked = selectedSubjek.includes(item.value);
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => handleToggleSubjek(item.value)}
                        className="w-full text-left flex items-center gap-2.5 p-1 rounded-md hover:bg-neu-50 transition-colors cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-pr-900 border-pr-900 text-white'
                              : 'border-neu-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className="text-xs text-neu-700 truncate">{item.label}</span>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-[11px] text-neu-400 text-center py-2">
                    Subjek tidak ditemukan
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tombol TERAPKAN */}
      <button
        onClick={handleApplyClick}
        type="button"
        className="w-full h-[44px] bg-pr-900 hover:bg-pr-800 text-white font-bold text-xs tracking-wider uppercase rounded-full mt-4 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
      >
        TERAPKAN
      </button>
    </div>
  );

  // Jika mode SIDEBAR
  if (variant === 'sidebar') {
    return (
      <div ref={filterContainerRef} className={`w-full ${className}`}>
        <div className="bg-white border border-neu-100 rounded-2xl p-5 shadow-2xs">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-neu-100">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-bold text-neu-800 flex items-center gap-2 hover:text-pr-900 transition-colors cursor-pointer group"
              title="Filter"
            >
              <Filter className="w-4 h-4 text-neu-700 group-hover:text-pr-900 transition-colors" />
              <span>Filter</span>
            </button>
            <button
              onClick={handleResetClick}
              className="text-neu-500 hover:text-neu-800 p-1.5 rounded-lg hover:bg-neu-100 active:scale-95 transition-all cursor-pointer"
              title="Reset Filter"
              type="button"
            >
              <RotateCcw
                className={`w-4 h-4 ${isResetSpinning ? 'animate-smooth-spin' : ''}`}
                onAnimationEnd={() => setIsResetSpinning(false)}
              />
            </button>
          </div>

          {filterBodyContent}
        </div>
      </div>
    );
  }

  // Jika mode POPOVER
  return (
    <div className={`relative ${className}`} ref={filterContainerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neu-200 rounded-full text-xs sm:text-sm font-semibold text-neu-700 hover:bg-neu-50 hover:text-neu-900 transition-colors cursor-pointer shrink-0 shadow-2xs"
        title="Buka Filter"
      >
        <Filter className="w-4 h-4 text-neu-600" />
        <span>Filter</span>
      </button>

      {/* Floating Filter Popover Card */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[300px] sm:w-[320px] bg-white border border-neu-100 rounded-2xl p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Filter: Tombol Filter & Reset */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-neu-100">
            <div className="text-sm font-bold text-neu-800 flex items-center gap-2">
              <Filter className="w-4 h-4 text-neu-700" />
              <span>Filter</span>
            </div>
            <button
              onClick={handleResetClick}
              className="text-neu-500 hover:text-neu-800 p-1.5 rounded-lg hover:bg-neu-100 active:scale-95 transition-all cursor-pointer"
              title="Reset Filter"
              type="button"
            >
              <RotateCcw
                className={`w-4 h-4 ${isResetSpinning ? 'animate-smooth-spin' : ''}`}
                onAnimationEnd={() => setIsResetSpinning(false)}
              />
            </button>
          </div>

          {filterBodyContent}
        </div>
      )}
    </div>
  );
}

export default CategoryFilterPopover;

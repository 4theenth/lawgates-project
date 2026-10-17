import React, { useState, useRef, useEffect } from 'react';
import { Filter, RotateCcw, ChevronDown, Check, Search } from 'lucide-react';
import { FilterOption } from '@/types/peraturan';
import { getRegenciesForProvince, extractProvinceName } from '@/Components/landing/map/regencyData';

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

  // Optional Perda Lokasi filter props
  selectedLokasi?: string[];
  setSelectedLokasi?:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((lokasi: string[]) => void);
  lokasiOptions?: FilterOption[];

  variant?: 'popover' | 'sidebar' | 'horizontal';
  isMultiSelect?: boolean;
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
  selectedLokasi = [],
  setSelectedLokasi,
  lokasiOptions = [],
  variant = 'popover',
  isMultiSelect = true,
  onClose,
}: CategoryFilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    'kategori' | 'tahun' | 'status' | 'subjek' | null
  >(null);
  const [isResetSpinning, setIsResetSpinning] = useState(false);
  const [openYearSub, setOpenYearSub] = useState<{ dari: boolean; sampai: boolean }>({
    dari: true,
    sampai: true,
  });
  const [subjekSearch, setSubjekSearch] = useState('');
  const [lokasiSearchQuery, setLokasiSearchQuery] = useState('');
  const [expandedProvinces, setExpandedProvinces] = useState<Record<string, boolean>>({});

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDropdown === 'tahun') {
      setOpenYearSub({ dari: true, sampai: true });
    }
  }, [activeDropdown]);

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

  // Teks Label Tahun (Seragam dengan YearRangeDropdown Landing Page)
  let tahunLabel = 'Semua Tahun';
  if (tahunDari && tahunSampai) {
    const y1 = Number(tahunDari);
    const y2 = Number(tahunSampai);
    if (!isNaN(y1) && !isNaN(y2)) {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      tahunLabel = minY === maxY ? String(minY) : `${minY} - ${maxY}`;
    } else {
      tahunLabel = `${tahunDari} - ${tahunSampai}`;
    }
  } else if (tahunDari) {
    tahunLabel = tahunDari;
  } else if (tahunSampai) {
    tahunLabel = tahunSampai;
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
    setOpenYearSub({ dari: true, sampai: true });
    setSubjekSearch('');
    setLokasiSearchQuery('');
    if (setSelectedLokasi) setSelectedLokasi([]);
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
    if (!isMultiSelect) {
      const next = selectedStatus.includes(val) ? [] : [val];
      setSelectedStatus(next);
      return;
    }
    if (selectedStatus.includes(val)) {
      setSelectedStatus(selectedStatus.filter((v) => v !== val));
    } else {
      setSelectedStatus([...selectedStatus, val]);
    }
  };

  const handleToggleSubjek = (val: string) => {
    if (!setSelectedSubjek) return;
    if (!isMultiSelect) {
      const next = selectedSubjek.includes(val) ? [] : [val];
      setSelectedSubjek(next);
      return;
    }
    if (selectedSubjek.includes(val)) {
      setSelectedSubjek(selectedSubjek.filter((v) => v !== val));
    } else {
      setSelectedSubjek([...selectedSubjek, val]);
    }
  };

  const handleToggleKategori = (val: string) => {
    if (!setSelectedKategori) return;
    if (!isMultiSelect) {
      const next = selectedKategori.includes(val) ? [] : [val];
      setSelectedKategori(next);
      return;
    }
    if (selectedKategori.includes(val)) {
      setSelectedKategori(selectedKategori.filter((v) => v !== val));
    } else {
      setSelectedKategori([...selectedKategori, val]);
    }
  };

  const handleToggleLokasi = (val: string) => {
    if (!setSelectedLokasi) return;
    if (selectedLokasi.includes(val)) {
      setSelectedLokasi(selectedLokasi.filter((v) => v !== val));
    } else {
      setSelectedLokasi([...selectedLokasi, val]);
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

  const baseLokasiList: FilterOption[] =
    lokasiOptions.length > 0
      ? lokasiOptions
      : [
          { value: 'Pemerintah Provinsi Bali', label: 'Pemerintah Provinsi Bali' },
          { value: 'Pemerintah Provinsi Nusa Tenggara Timur', label: 'Pemerintah Provinsi Nusa Tenggara Timur' },
        ];

  const filteredLokasiOptions = baseLokasiList.filter((opt) => {
    const q = lokasiSearchQuery.toLowerCase().trim();
    if (!q) return true;
    if (opt.label.toLowerCase().includes(q)) return true;
    const { key, name } = extractProvinceName(opt.label);
    const regData = getRegenciesForProvince(key, name);
    return regData.regencies.some(
      (r) => r.name.toLowerCase().includes(q) || `${r.type} ${r.name}`.toLowerCase().includes(q)
    );
  });

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
            <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-neu-100 rounded-xl p-3 space-y-2 shadow-xl z-50 max-h-56 overflow-y-auto no-scrollbar animate-in fade-in duration-100">
              {kategoriOptions.map((item) => {
                const isChecked = selectedKategori.includes(item.value);
                const isPerdaItem =
                  item.label.toLowerCase().includes('perda') ||
                  item.label.toLowerCase().includes('peraturan daerah');

                return (
                  <div key={item.value} className="flex flex-col">
                    <button
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

                    {/* Sub-pilihan Daerah jika Perda dipilih */}
                    {isPerdaItem && isChecked && (
                      <div className="pl-4 pr-1 pt-1 pb-2 flex flex-col gap-1.5 border-l-2 border-neu-200 ml-3 my-1">
                        <div className="relative">
                          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-neu-400 pointer-events-none" />
                          <input
                            type="text"
                            value={lokasiSearchQuery}
                            onChange={(e) => setLokasiSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Cari provinsi / kabupaten..."
                            className="w-full pl-6 pr-2 py-1 bg-neu-50 border border-neu-200 rounded-md text-[11px] text-neu-800 outline-none focus:ring-1 focus:ring-pr-900"
                          />
                        </div>
                        <div className="max-h-40 overflow-y-auto space-y-1 no-scrollbar">
                          {filteredLokasiOptions.length === 0 ? (
                            <div className="text-[10px] text-neu-400 text-center py-1">
                              Daerah tidak ditemukan
                            </div>
                          ) : (
                            filteredLokasiOptions.map((lokasi) => {
                              const isLokasiChecked = selectedLokasi.includes(lokasi.value);
                              const { key: provKey, name: provName } = extractProvinceName(lokasi.label);
                              const regData = getRegenciesForProvince(provKey, provName);

                              const q = lokasiSearchQuery.toLowerCase().trim();
                              const hasMatchingRegency = q.length > 0 && regData.regencies.some(
                                (r) => r.name.toLowerCase().includes(q) || `${r.type} ${r.name}`.toLowerCase().includes(q)
                              );
                              const isExpanded = expandedProvinces[lokasi.value] || hasMatchingRegency;
                              const matchingRegencies = q.length > 0
                                ? regData.regencies.filter(
                                    (r) => r.name.toLowerCase().includes(q) || `${r.type} ${r.name}`.toLowerCase().includes(q) || lokasi.label.toLowerCase().includes(q)
                                  )
                                : regData.regencies;

                              const checkedRegCount = regData.regencies.filter((r) =>
                                selectedLokasi.includes(`${r.type} ${r.name}`)
                              ).length;

                              return (
                                <div key={lokasi.value} className="flex flex-col">
                                  <div className="flex items-center justify-between gap-1 p-1 rounded hover:bg-neu-50 transition-colors group">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleToggleLokasi(lokasi.value);
                                        if (onApply) onApply();
                                      }}
                                      className="text-left flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                                    >
                                      <div
                                        className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
                                          isLokasiChecked
                                            ? 'bg-pr-900 border-pr-900 text-white'
                                            : 'border-neu-300 bg-white group-hover:border-neu-400'
                                        }`}
                                      >
                                        {isLokasiChecked && (
                                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                        )}
                                      </div>
                                      <span className="text-[11px] text-neu-700 group-hover:text-neu-900 truncate">
                                        {lokasi.label}
                                      </span>
                                    </button>

                                    {/* Dropdown toggle untuk Kabupaten */}
                                    {regData.regencies.length > 0 && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setExpandedProvinces((prev) => ({
                                            ...prev,
                                            [lokasi.value]: !prev[lokasi.value],
                                          }));
                                        }}
                                        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-neu-500 hover:text-pr-900 hover:bg-neu-100 transition-colors shrink-0"
                                        title="Buka daftar Kabupaten/Kota"
                                      >
                                        {checkedRegCount > 0 ? (
                                          <span className="text-[9px] font-semibold text-pr-900 bg-pr-100 px-1 py-0.2 rounded">
                                            {checkedRegCount} dipilih
                                          </span>
                                        ) : (
                                          <span className="text-[9px] text-neu-400 hidden sm:inline">
                                            {regData.regencies.length} Kab/Kota
                                          </span>
                                        )}
                                        <ChevronDown
                                          className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180 text-pr-900' : ''}`}
                                        />
                                      </button>
                                    )}
                                  </div>

                                  {/* Sub-list Kabupaten/Kota */}
                                  {isExpanded && matchingRegencies.length > 0 && (
                                    <div className="ml-5 pl-2 my-0.5 space-y-0.5 border-l border-neu-200 animate-in fade-in duration-150">
                                      {matchingRegencies.map((reg) => {
                                        const regValue = `${reg.type} ${reg.name}`;
                                        const isRegChecked = selectedLokasi.includes(regValue);
                                        return (
                                          <button
                                            key={reg.id || reg.name}
                                            type="button"
                                            onClick={() => {
                                              handleToggleLokasi(regValue);
                                              if (onApply) onApply();
                                            }}
                                            className="w-full text-left flex items-center gap-2 px-1 py-0.5 rounded hover:bg-neu-50 transition-colors cursor-pointer group"
                                          >
                                            <div
                                              className={`w-3 h-3 rounded-[2.5px] border flex items-center justify-center shrink-0 transition-colors ${
                                                isRegChecked
                                                  ? 'bg-pr-900 border-pr-900 text-white'
                                                  : 'border-neu-300 bg-white group-hover:border-neu-400'
                                              }`}
                                            >
                                              {isRegChecked && (
                                                <Check className="w-2 h-2 text-white stroke-[3]" />
                                              )}
                                            </div>
                                            <span className="text-[10.5px] text-neu-600 group-hover:text-neu-900 truncate">
                                              {reg.type} {reg.name}
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-neu-500 uppercase mb-1">
                  Dari
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setOpenYearSub((prev) => ({
                      ...prev,
                      dari: !prev.dari,
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
                  <div className="mt-1.5 bg-white border border-neu-200 rounded-lg shadow-sm py-1 max-h-36 overflow-y-auto custom-scrollbar">
                    {availableYears.map((yr) => {
                      const isSelected = tahunDari === yr;
                      return (
                        <button
                          key={`dari-${yr}`}
                          type="button"
                          onClick={() => {
                            setTahunDari(yr);
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
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-neu-500 uppercase mb-1">
                  Sampai
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setOpenYearSub((prev) => ({
                      ...prev,
                      sampai: !prev.sampai,
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
                  <div className="mt-1.5 bg-white border border-neu-200 rounded-lg shadow-sm py-1 max-h-36 overflow-y-auto custom-scrollbar">
                    {availableYears.map((yr) => {
                      const isSelected = tahunSampai === yr;
                      return (
                        <button
                          key={`sampai-${yr}`}
                          type="button"
                          onClick={() => {
                            setTahunSampai(yr);
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
          <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-neu-100 rounded-xl p-3 space-y-2 shadow-xl z-50 max-h-56 overflow-y-auto no-scrollbar animate-in fade-in duration-100">
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

  // Jika mode HORIZONTAL (Toolbar untuk Sistem Hukum Terbaru)
  if (variant === 'horizontal') {
    const hasActiveFilter = Boolean(
      (selectedKategori && selectedKategori.length > 0) ||
      (selectedSubjek && selectedSubjek.length > 0) ||
      tahunDari ||
      tahunSampai ||
      (selectedStatus && selectedStatus.length > 0)
    );

    return (
      <div ref={filterContainerRef} className={`flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 ${className}`}>
        {/* 1. Dropdown Kategori (Checkbox Multi-Select + Sub-pilihan Perda) */}
        {showKategori && (
          <div className="relative min-w-[140px] sm:min-w-[150px] flex-1 sm:flex-initial">
            <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
              Kategori
            </label>
            <button
              type="button"
              onClick={() => setActiveDropdown((prev) => (prev === 'kategori' ? null : 'kategori'))}
              className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
            >
              <span className="truncate">{kategoriLabel}</span>
              <ChevronDown
                className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                  activeDropdown === 'kategori' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {activeDropdown === 'kategori' && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-64 bg-white border border-neu-200 rounded-xl shadow-xl p-2.5 z-50 max-h-72 overflow-y-auto no-scrollbar animate-in fade-in duration-100">
                <div className="space-y-1">
                  {kategoriOptions.map((item) => {
                    const isChecked = selectedKategori.includes(item.value);
                    const isPerdaItem =
                      item.label.toLowerCase().includes('perda') ||
                      item.label.toLowerCase().includes('peraturan daerah');

                    return (
                      <div key={item.value} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => {
                            handleToggleKategori(item.value);
                            if (onApply) onApply();
                          }}
                          className="w-full text-left flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-neu-50 transition-colors cursor-pointer group"
                        >
                          <div
                            className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-pr-900 border-pr-900 text-white'
                                : 'border-neu-300 bg-white group-hover:border-neu-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                          <span className="text-xs text-neu-700 group-hover:text-neu-900 truncate">
                            {item.label}
                          </span>
                        </button>

                        {/* Sub-pilihan Daerah jika Perda dipilih */}
                        {isPerdaItem && isChecked && (
                          <div className="pl-5 pr-1 pt-1 pb-2 flex flex-col gap-1.5 border-l-2 border-neu-200 ml-3.5 my-1">
                            <div className="relative">
                              <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-neu-400 pointer-events-none" />
                              <input
                                type="text"
                                value={lokasiSearchQuery}
                                onChange={(e) => setLokasiSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                placeholder="Cari provinsi / kabupaten..."
                                className="w-full pl-6 pr-2 py-1 bg-neu-50 border border-neu-200 rounded-md text-[11px] text-neu-800 outline-none focus:ring-1 focus:ring-pr-900"
                              />
                            </div>
                            <div className="max-h-48 overflow-y-auto space-y-1 no-scrollbar">
                              {filteredLokasiOptions.length === 0 ? (
                                <div className="text-[10px] text-neu-400 text-center py-1">
                                  Daerah tidak ditemukan
                                </div>
                              ) : (
                                filteredLokasiOptions.map((lokasi) => {
                                  const isLokasiChecked = selectedLokasi.includes(lokasi.value);
                                  const { key: provKey, name: provName } = extractProvinceName(lokasi.label);
                                  const regData = getRegenciesForProvince(provKey, provName);

                                  const q = lokasiSearchQuery.toLowerCase().trim();
                                  const hasMatchingRegency = q.length > 0 && regData.regencies.some(
                                    (r) => r.name.toLowerCase().includes(q) || `${r.type} ${r.name}`.toLowerCase().includes(q)
                                  );
                                  const isExpanded = expandedProvinces[lokasi.value] || hasMatchingRegency;
                                  const matchingRegencies = q.length > 0
                                    ? regData.regencies.filter(
                                        (r) => r.name.toLowerCase().includes(q) || `${r.type} ${r.name}`.toLowerCase().includes(q) || lokasi.label.toLowerCase().includes(q)
                                      )
                                    : regData.regencies;

                                  const checkedRegCount = regData.regencies.filter((r) =>
                                    selectedLokasi.includes(`${r.type} ${r.name}`)
                                  ).length;

                                  return (
                                    <div key={lokasi.value} className="flex flex-col">
                                      <div className="flex items-center justify-between gap-1 p-1 rounded hover:bg-neu-100/60 transition-colors group">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            handleToggleLokasi(lokasi.value);
                                            if (onApply) onApply();
                                          }}
                                          className="text-left flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                                        >
                                          <div
                                            className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
                                              isLokasiChecked
                                                ? 'bg-pr-900 border-pr-900 text-white'
                                                : 'border-neu-300 bg-white group-hover:border-neu-400'
                                            }`}
                                          >
                                            {isLokasiChecked && (
                                              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                            )}
                                          </div>
                                          <span className="text-[11px] text-neu-700 group-hover:text-neu-900 truncate">
                                            {lokasi.label}
                                          </span>
                                        </button>

                                        {/* Dropdown toggle untuk Kabupaten */}
                                        {regData.regencies.length > 0 && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              setExpandedProvinces((prev) => ({
                                                ...prev,
                                                [lokasi.value]: !prev[lokasi.value],
                                              }));
                                            }}
                                            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-neu-500 hover:text-pr-900 hover:bg-neu-200/50 transition-colors shrink-0"
                                            title="Buka daftar Kabupaten/Kota"
                                          >
                                            {checkedRegCount > 0 ? (
                                              <span className="text-[9px] font-semibold text-pr-900 bg-pr-100 px-1 py-0.2 rounded">
                                                {checkedRegCount} dipilih
                                              </span>
                                            ) : (
                                              <span className="text-[9px] text-neu-400 hidden sm:inline">
                                                {regData.regencies.length} Kab/Kota
                                              </span>
                                            )}
                                            <ChevronDown
                                              className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180 text-pr-900' : ''}`}
                                            />
                                          </button>
                                        )}
                                      </div>

                                      {/* Sub-list Kabupaten/Kota */}
                                      {isExpanded && matchingRegencies.length > 0 && (
                                        <div className="ml-5 pl-2 my-0.5 space-y-0.5 border-l border-neu-200 animate-in fade-in duration-150">
                                          {matchingRegencies.map((reg) => {
                                            const regValue = `${reg.type} ${reg.name}`;
                                            const isRegChecked = selectedLokasi.includes(regValue);
                                            return (
                                              <button
                                                key={reg.id || reg.name}
                                                type="button"
                                                onClick={() => {
                                                  handleToggleLokasi(regValue);
                                                  if (onApply) onApply();
                                                }}
                                                className="w-full text-left flex items-center gap-2 px-1 py-0.5 rounded hover:bg-neu-100/60 transition-colors cursor-pointer group"
                                              >
                                                <div
                                                  className={`w-3 h-3 rounded-[2.5px] border flex items-center justify-center shrink-0 transition-colors ${
                                                    isRegChecked
                                                      ? 'bg-pr-900 border-pr-900 text-white'
                                                      : 'border-neu-300 bg-white group-hover:border-neu-400'
                                                  }`}
                                                >
                                                  {isRegChecked && (
                                                    <Check className="w-2 h-2 text-white stroke-[3]" />
                                                  )}
                                                </div>
                                                <span className="text-[10.5px] text-neu-600 group-hover:text-neu-900 truncate">
                                                  {reg.type} {reg.name}
                                                </span>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Dropdown Subjek (Search Bar + Checkbox Multi-Select) */}
        {showSubjek && (
          <div className="relative min-w-[140px] sm:min-w-[150px] flex-1 sm:flex-initial">
            <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
              Subjek
            </label>
            <button
              type="button"
              onClick={() => setActiveDropdown((prev) => (prev === 'subjek' ? null : 'subjek'))}
              className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
            >
              <span className="truncate">{subjekLabel}</span>
              <ChevronDown
                className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                  activeDropdown === 'subjek' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {activeDropdown === 'subjek' && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-64 bg-white border border-neu-200 rounded-xl shadow-xl p-2.5 z-50 animate-in fade-in duration-100">
                {/* Input Cari Subjek */}
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 text-neu-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={subjekSearch}
                    onChange={(e) => setSubjekSearch(e.target.value)}
                    placeholder="Cari subjek..."
                    className="w-full h-8 pl-8 pr-2.5 text-xs bg-white border border-neu-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pr-900"
                  />
                </div>

                {/* Checkbox List Subjek */}
                <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                  {filteredSubjekOptions.length > 0 ? (
                    filteredSubjekOptions.map((item) => {
                      const isChecked = selectedSubjek.includes(item.value);
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            handleToggleSubjek(item.value);
                            if (onApply) onApply();
                          }}
                          className="w-full text-left flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-neu-50 transition-colors cursor-pointer group"
                        >
                          <div
                            className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-pr-900 border-pr-900 text-white'
                                : 'border-neu-300 bg-white group-hover:border-neu-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                          </div>
                          <span className="text-xs text-neu-700 group-hover:text-neu-900 truncate">
                            {item.label}
                          </span>
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

        {/* 3. Dropdown Tahun (Rentang Tahun + Opsi Cepat Tahun Standar) */}
        <div className="relative min-w-[130px] sm:min-w-[150px] flex-1 sm:flex-initial">
          <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
            Tahun
          </label>
          <button
            type="button"
            onClick={() => setActiveDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))}
            className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
          >
            <span className="truncate">{tahunLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                activeDropdown === 'tahun' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {activeDropdown === 'tahun' && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-64 bg-white border border-neu-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neu-100 text-xs">
                <span className="text-neu-700 font-semibold">Rentang Tahun</span>
                {(tahunDari || tahunSampai) && (
                  <button
                    type="button"
                    onClick={() => {
                      setTahunDari('');
                      setTahunSampai('');
                      if (onApply) onApply();
                    }}
                    className="text-pr-900 hover:text-pr-800 font-medium transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Sub-dropdown Dari & Sampai (Persis seperti Landing Page) */}
              <div className="grid grid-cols-2 gap-2">
                <div className="min-w-0">
                  <div className="text-[11px] text-neu-500 font-medium mb-1">Dari</div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenYearSub((prev) => ({ ...prev, dari: !prev.dari }))
                    }
                    className="flex items-center justify-between w-full h-[32px] px-2 bg-white border border-neu-200 rounded-lg text-xs text-neu-700 hover:border-neu-300 cursor-pointer"
                  >
                    <span className="truncate">{tahunDari || 'Pilih'}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-neu-400 shrink-0 transition-transform ${
                        openYearSub.dari ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openYearSub.dari && (
                    <div className="mt-1.5 bg-white border border-neu-200 rounded-lg shadow-sm py-1 max-h-36 overflow-y-auto custom-scrollbar">
                      {availableYears.map((yr) => {
                        const isSelected = tahunDari === yr;
                        return (
                          <button
                            key={`dari-${yr}`}
                            type="button"
                            onClick={() => {
                              setTahunDari(yr);
                              if (onApply) onApply();
                            }}
                            className={`w-full px-2 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-pr-50 text-pr-900 font-semibold'
                                : 'text-neu-700 hover:bg-neu-50'
                            }`}
                          >
                            <span>{yr}</span>
                            {isSelected && <Check className="w-3 h-3 text-pr-900 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] text-neu-500 font-medium mb-1">Sampai</div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenYearSub((prev) => ({ ...prev, sampai: !prev.sampai }))
                    }
                    className="flex items-center justify-between w-full h-[32px] px-2 bg-white border border-neu-200 rounded-lg text-xs text-neu-700 hover:border-neu-300 cursor-pointer"
                  >
                    <span className="truncate">{tahunSampai || 'Pilih'}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-neu-400 shrink-0 transition-transform ${
                        openYearSub.sampai ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openYearSub.sampai && (
                    <div className="mt-1.5 bg-white border border-neu-200 rounded-lg shadow-sm py-1 max-h-36 overflow-y-auto custom-scrollbar">
                      {availableYears.map((yr) => {
                        const isSelected = tahunSampai === yr;
                        return (
                          <button
                            key={`sampai-${yr}`}
                            type="button"
                            onClick={() => {
                              setTahunSampai(yr);
                              if (onApply) onApply();
                            }}
                            className={`w-full px-2 py-1 text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-pr-50 text-pr-900 font-semibold'
                                : 'text-neu-700 hover:bg-neu-50'
                            }`}
                          >
                            <span>{yr}</span>
                            {isSelected && <Check className="w-3 h-3 text-pr-900 shrink-0" />}
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

        {/* 4. Dropdown Status */}
        <div className="relative min-w-[130px] sm:min-w-[140px] flex-1 sm:flex-initial">
          <label className="block text-[12px] font-normal text-neu-600 mb-1.5">
            Status
          </label>
          <button
            type="button"
            onClick={() => setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))}
            className="flex items-center justify-between w-full h-[44px] px-3.5 bg-white border border-neu-100 rounded-xl text-xs sm:text-sm text-neu-700 hover:border-neu-300 shadow-2xs transition-all cursor-pointer"
          >
            <span className="truncate">{statusLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-neu-400 shrink-0 transition-transform ${
                activeDropdown === 'status' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {activeDropdown === 'status' && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-48 bg-white border border-neu-200 rounded-xl shadow-xl p-2.5 z-50 max-h-60 overflow-y-auto no-scrollbar animate-in fade-in duration-100">
              <div className="space-y-1">
                {statusOptions.map((st) => {
                  const isChecked = selectedStatus.includes(st.value);
                  return (
                    <button
                      key={st.value}
                      type="button"
                      onClick={() => {
                        handleToggleStatus(st.value);
                        if (onApply) onApply();
                      }}
                      className="w-full text-left flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-neu-50 transition-colors cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-pr-900 border-pr-900 text-white'
                            : 'border-neu-300 bg-white group-hover:border-neu-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                      <span className="text-xs text-neu-700 group-hover:text-neu-900 truncate">
                        {st.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Tombol Reset (muncul jika ada filter aktif) */}
        {hasActiveFilter && (
          <button
            type="button"
            onClick={handleResetClick}
            className="mt-6 p-2.5 rounded-xl border border-neu-200 text-neu-500 hover:text-neu-900 hover:bg-neu-50 transition-colors shadow-2xs cursor-pointer"
            title="Reset semua filter"
          >
            <RotateCcw
              className={`w-4 h-4 ${isResetSpinning ? 'animate-smooth-spin' : ''}`}
              onAnimationEnd={() => setIsResetSpinning(false)}
            />
          </button>
        )}
      </div>
    );
  }

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

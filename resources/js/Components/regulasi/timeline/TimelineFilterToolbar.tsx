import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, RotateCcw, Check } from 'lucide-react';
import { TimelineYearComparePicker } from './TimelineYearComparePicker';
import { FlatLocationPicker } from '@/Components/search/filters/FlatLocationPicker';
import { useFilterReferences } from '@/hooks/useFilterReferences';
import { extractProvinceName, getRegenciesForProvince, PROVINCE_REGENCY_MAP } from '@/Components/landing/map/regencyData';

// ─────────────────────────────────────────────
// Daftar Cadangan 38 Provinsi Lengkap Indonesia
// ─────────────────────────────────────────────
const ALL_38_PROVINCES = [
  'Pemerintah Provinsi Aceh',
  'Pemerintah Provinsi Sumatera Utara',
  'Pemerintah Provinsi Sumatera Barat',
  'Pemerintah Provinsi Riau',
  'Pemerintah Provinsi Kepulauan Riau',
  'Pemerintah Provinsi Jambi',
  'Pemerintah Provinsi Bengkulu',
  'Pemerintah Provinsi Sumatera Selatan',
  'Pemerintah Provinsi Kepulauan Bangka Belitung',
  'Pemerintah Provinsi Lampung',
  'Pemerintah Provinsi Banten',
  'Pemerintah Provinsi DKI Jakarta',
  'Pemerintah Provinsi Jawa Barat',
  'Pemerintah Provinsi Jawa Tengah',
  'Pemerintah Provinsi DI Yogyakarta',
  'Pemerintah Provinsi Jawa Timur',
  'Pemerintah Provinsi Bali',
  'Pemerintah Provinsi Nusa Tenggara Barat',
  'Pemerintah Provinsi Nusa Tenggara Timur',
  'Pemerintah Provinsi Kalimantan Barat',
  'Pemerintah Provinsi Kalimantan Tengah',
  'Pemerintah Provinsi Kalimantan Selatan',
  'Pemerintah Provinsi Kalimantan Timur',
  'Pemerintah Provinsi Kalimantan Utara',
  'Pemerintah Provinsi Sulawesi Utara',
  'Pemerintah Provinsi Gorontalo',
  'Pemerintah Provinsi Sulawesi Tengah',
  'Pemerintah Provinsi Sulawesi Barat',
  'Pemerintah Provinsi Sulawesi Selatan',
  'Pemerintah Provinsi Sulawesi Tenggara',
  'Pemerintah Provinsi Maluku',
  'Pemerintah Provinsi Maluku Utara',
  'Pemerintah Provinsi Papua',
  'Pemerintah Provinsi Papua Barat',
  'Pemerintah Provinsi Papua Selatan',
  'Pemerintah Provinsi Papua Tengah',
  'Pemerintah Provinsi Papua Pegunungan',
  'Pemerintah Provinsi Papua Barat Daya',
];

interface TimelineMultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

function TimelineMultiSelectDropdown({
  label,
  options,
  selectedValues,
  onChange,
  className = '',
}: TimelineMultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayLabel = useMemo(() => {
    if (selectedValues.length === 0) return `Semua ${label}`;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} ${label}`;
  }, [selectedValues, label]);

  // Pindahkan opsi yang sudah dicentang ke paling atas agar mudah di-uncheck
  const sortedOptions = useMemo(() => {
    const checked: string[] = [];
    const unchecked: string[] = [];
    options.forEach((opt) => {
      if (selectedValues.includes(opt)) {
        checked.push(opt);
      } else {
        unchecked.push(opt);
      }
    });
    return [...checked, ...unchecked];
  }, [options, selectedValues]);

  const handleToggle = (opt: string) => {
    if (selectedValues.includes(opt)) {
      onChange(selectedValues.filter((v) => v !== opt));
    } else {
      onChange([...selectedValues, opt]);
    }
  };

  const handleSelectAll = () => {
    onChange([]);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-11 sm:h-12 px-4 rounded-xl border bg-white text-xs sm:text-sm text-neu-800 font-normal flex items-center justify-between transition-all cursor-pointer outline-none focus:outline-none focus:ring-0 ${
          isOpen
            ? 'border-neu-200 shadow-2xs'
            : 'border-neu-100 hover:border-neu-300 shadow-2xs'
        }`}
      >
        <span className="truncate text-left">{displayLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-neu-500 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-pr-900' : ''
          }`}
        />
      </button>

      {/* Popover Menu with custom-thin-scrollbar */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-xl border border-neu-100 shadow-xl py-1.5 px-1 max-h-60 overflow-y-auto custom-thin-scrollbar animate-in fade-in-50 zoom-in-95 duration-100">
          {/* Opsi Semua */}
          <button
            type="button"
            onClick={handleSelectAll}
            className={`w-full px-3 py-2 text-left text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
              selectedValues.length === 0
                ? 'bg-pr-50 text-pr-900 font-semibold'
                : 'text-neu-700 hover:bg-neutral-50 hover:text-neu-900 font-normal'
            }`}
          >
            <span className="truncate">Semua {label}</span>
            {selectedValues.length === 0 && (
              <Check className="w-3.5 h-3.5 text-pr-900 stroke-[2.5] shrink-0 ml-2" />
            )}
          </button>

          {/* List Opsi (Opsi terpilih di atas) */}
          {sortedOptions.map((opt) => {
            const isSelected = selectedValues.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleToggle(opt)}
                className={`w-full px-3 py-2 text-left text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-pr-50 text-pr-900 font-semibold'
                    : 'text-neu-700 hover:bg-neutral-50 hover:text-neu-900 font-normal'
                }`}
              >
                <span className="truncate">{opt}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-pr-900 stroke-[2.5] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export interface TimelineFilterToolbarProps {
  periodLabel: string;
  startYear?: number;
  endYear?: number;
  selectedJenis?: string | string[];
  selectedSubjek?: string | string[];
  selectedLokasi?: string[];
  onPeriodChange?: (period: string) => void;
  onYearsCompareChange?: (year1: number, year2: number) => void;
  onJenisChange?: (jenis: string[]) => void;
  onSubjekChange?: (subjek: string[]) => void;
  onLokasiChange?: (lokasi: string[]) => void;
  onResetFilter?: () => void;
  jenisOptions?: { id: string | number; nama: string }[];
  className?: string;
}

export function TimelineFilterToolbar({
  periodLabel,
  startYear: propStartYear,
  endYear: propEndYear,
  selectedJenis: propSelectedJenis,
  selectedSubjek: propSelectedSubjek,
  selectedLokasi: propSelectedLokasi,
  onPeriodChange,
  onYearsCompareChange,
  onJenisChange,
  onSubjekChange,
  onLokasiChange,
  onResetFilter,
  jenisOptions = [],
  className = '',
}: TimelineFilterToolbarProps) {
  const { allFlatLokasi: refLokasi } = useFilterReferences();

  // Helper normalisasi input string / string[] menjadi array
  const normalizeArray = (val?: string | string[]): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.filter((v) => v !== 'Semua Jenis Peraturan' && v !== 'Semua Subjek');
    }
    if (val === 'Semua Jenis Peraturan' || val === 'Semua Subjek') return [];
    return [val];
  };

  const [selectedJenis, setSelectedJenis] = useState<string[]>(normalizeArray(propSelectedJenis));
  const [selectedSubjek, setSelectedSubjek] = useState<string[]>(normalizeArray(propSelectedSubjek));
  const [selectedLokasi, setSelectedLokasi] = useState<string[]>(propSelectedLokasi || []);

  const [isJenisOpen, setIsJenisOpen] = useState(false);
  const jenisDropdownRef = useRef<HTMLDivElement>(null);

  // Sync state internal jika props luar berubah
  useEffect(() => {
    if (propSelectedJenis !== undefined) setSelectedJenis(normalizeArray(propSelectedJenis));
  }, [propSelectedJenis]);

  useEffect(() => {
    if (propSelectedSubjek !== undefined) setSelectedSubjek(normalizeArray(propSelectedSubjek));
  }, [propSelectedSubjek]);

  useEffect(() => {
    if (propSelectedLokasi !== undefined) setSelectedLokasi(propSelectedLokasi);
  }, [propSelectedLokasi]);

  // Click outside untuk dropdown Jenis Peraturan (termasuk FlatLocationPicker)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (jenisDropdownRef.current && !jenisDropdownRef.current.contains(event.target as Node)) {
        setIsJenisOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ekstrak tahun awal & akhir
  const parsedYears = periodLabel.split('-').map((s) => parseInt(s.trim(), 10));
  const currentStartYear = propStartYear || parsedYears[0] || 2025;
  const currentEndYear = propEndYear || parsedYears[1] || 2026;

  const defaultJenisList = [
    'Undang-Undang (UU)',
    'Peraturan Pemerintah (PP)',
    'Peraturan Presiden (Perpres)',
    'Peraturan Daerah (Perda)',
    'Peraturan Menteri (Permen)',
  ];

  const rawJenisList =
    jenisOptions.length > 0
      ? jenisOptions.map((opt) => opt.nama)
      : defaultJenisList;

  const jenisList = rawJenisList.filter((j) => j !== 'Semua Jenis Peraturan');

  const defaultSubjekList = [
    'Hukum & Peradilan',
    'Ekonomi & Bisnis',
    'Pajak & Keuangan',
    'Tenaga Kerja',
    'Kesehatan',
    'Pendidikan',
    'Lingkungan Hidup',
  ];

  // Daftar lengkap semua provinsi dan kabupaten/kota di Indonesia
  const allFlatLokasi = useMemo(() => {
    const items = new Set<string>();

    if (refLokasi && refLokasi.length > 0) {
      refLokasi.forEach((item) => items.add(item));
    }

    // Tambahkan 38 provinsi
    ALL_38_PROVINCES.forEach((prov) => {
      items.add(prov);
      const { key, name } = extractProvinceName(prov);
      const regData = getRegenciesForProvince(key, name);
      if (regData && regData.regencies) {
        regData.regencies.forEach((r) => {
          items.add(`${r.type} ${r.name}`);
        });
      }
    });

    // Tambahkan juga regencies dari peta
    Object.values(PROVINCE_REGENCY_MAP).forEach((provData) => {
      items.add(`Pemerintah Provinsi ${provData.provinceName}`);
      provData.regencies.forEach((r) => {
        items.add(`${r.type} ${r.name}`);
      });
    });

    return Array.from(items).sort((a, b) => a.localeCompare(b, 'id'));
  }, [refLokasi]);

  // Pindahkan Jenis Peraturan yang sudah dicentang ke paling atas agar mudah di-uncheck
  const sortedJenisList = useMemo(() => {
    const checked: string[] = [];
    const unchecked: string[] = [];
    jenisList.forEach((opt) => {
      if (selectedJenis.includes(opt)) {
        checked.push(opt);
      } else {
        unchecked.push(opt);
      }
    });
    return [...checked, ...unchecked];
  }, [jenisList, selectedJenis]);

  // Handler toggle lokasi
  const handleToggleLokasi = (lokasi: string) => {
    const next = selectedLokasi.includes(lokasi)
      ? selectedLokasi.filter((l) => l !== lokasi)
      : [...selectedLokasi, lokasi];
    setSelectedLokasi(next);
    if (onLokasiChange) onLokasiChange(next);
  };

  const handleRemoveLokasi = (lokasi: string) => {
    const next = selectedLokasi.filter((l) => l !== lokasi);
    setSelectedLokasi(next);
    if (onLokasiChange) onLokasiChange(next);
  };

  // Handler toggle Jenis Peraturan (multi-select)
  const handleToggleJenis = (opt: string) => {
    const isOptPerda =
      opt.toLowerCase().includes('perda') ||
      opt.toLowerCase().includes('peraturan daerah');

    let next: string[];
    if (selectedJenis.includes(opt)) {
      next = selectedJenis.filter((j) => j !== opt);
      if (isOptPerda) {
        setSelectedLokasi([]);
        if (onLokasiChange) onLokasiChange([]);
      }
    } else {
      next = [...selectedJenis, opt];
    }

    setSelectedJenis(next);
    if (onJenisChange) onJenisChange(next);
  };

  // Handler pilih Semua Jenis
  const handleSelectAllJenis = () => {
    setSelectedJenis([]);
    setSelectedLokasi([]);
    if (onJenisChange) onJenisChange([]);
    if (onLokasiChange) onLokasiChange([]);
  };

  // Label tampilan trigger Jenis Peraturan
  const displayJenisLabel = useMemo(() => {
    if (selectedJenis.length === 0) return 'Semua Jenis Peraturan';

    if (selectedJenis.length === 1) {
      const isPerda =
        selectedJenis[0].toLowerCase().includes('perda') ||
        selectedJenis[0].toLowerCase().includes('peraturan daerah');
      if (isPerda) {
        if (selectedLokasi.length === 1) return `Perda - ${selectedLokasi[0]}`;
        if (selectedLokasi.length > 1) return `Perda (${selectedLokasi.length} Daerah)`;
      }
      return selectedJenis[0];
    }

    const hasPerda = selectedJenis.some(
      (j) => j.toLowerCase().includes('perda') || j.toLowerCase().includes('peraturan daerah')
    );
    if (hasPerda && selectedLokasi.length > 0) {
      return `${selectedJenis.length} Jenis Peraturan (${selectedLokasi.length} Daerah)`;
    }

    return `${selectedJenis.length} Jenis Peraturan`;
  }, [selectedJenis, selectedLokasi]);

  // Handler Reset Filter: Mengembalikan ke default (2025-2026, Semua Jenis, Semua Subjek, Lokasi kosong)
  const handleReset = () => {
    setSelectedJenis([]);
    setSelectedSubjek([]);
    setSelectedLokasi([]);
    setIsJenisOpen(false);

    if (onResetFilter) {
      onResetFilter();
    } else {
      if (onYearsCompareChange) onYearsCompareChange(2025, 2026);
      if (onPeriodChange) onPeriodChange('2025 - 2026');
      if (onJenisChange) onJenisChange([]);
      if (onSubjekChange) onSubjekChange([]);
      if (onLokasiChange) onLokasiChange([]);
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-[15px] border border-neu-50 p-3 sm:px-6 sm:py-3.5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 ${className}`}
    >
      {/* ── 3 Input Dropdown: Tahun, Jenis Peraturan (Multi-select + FlatLocationPicker), & Subjek (Multi-select) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 flex-1 min-w-0">
        {/* 1. Pemilih 2 Tahun Komparasi */}
        <TimelineYearComparePicker
          startYear={currentStartYear}
          endYear={currentEndYear}
          onChange={(y1, y2) => {
            const newLabel = y1 === y2 ? `${y1}` : `${y1} - ${y2}`;
            if (onYearsCompareChange) {
              onYearsCompareChange(y1, y2);
            } else if (onPeriodChange) {
              onPeriodChange(newLabel);
            }
          }}
        />

        {/* 2. Dropdown Jenis Peraturan + Multi-select + Peraturan Daerah Search Lokasi */}
        <div ref={jenisDropdownRef} className="relative w-full">
          <button
            type="button"
            onClick={() => setIsJenisOpen((prev) => !prev)}
            className={`w-full h-11 sm:h-12 px-4 rounded-xl border bg-white text-xs sm:text-sm text-neu-800 font-normal flex items-center justify-between transition-all cursor-pointer outline-none focus:outline-none focus:ring-0 ${
              isJenisOpen
                ? 'border-neu-200 shadow-2xs'
                : 'border-neu-100 hover:border-neu-300 shadow-2xs'
            }`}
          >
            <span className="truncate text-left">{displayJenisLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-neu-500 shrink-0 transition-transform duration-200 ${
                isJenisOpen ? 'rotate-180 text-pr-900' : ''
              }`}
            />
          </button>

          {isJenisOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-xl border border-neu-100 shadow-xl py-2 px-1 max-h-[440px] overflow-y-auto custom-thin-scrollbar animate-in fade-in-50 zoom-in-95 duration-100">
              {/* Opsi Semua Jenis Peraturan */}
              <button
                type="button"
                onClick={handleSelectAllJenis}
                className={`w-full px-3 py-2 text-left text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                  selectedJenis.length === 0
                    ? 'bg-pr-50 text-pr-900 font-semibold'
                    : 'text-neu-700 hover:bg-neutral-50 hover:text-neu-900 font-normal'
                }`}
              >
                <span className="truncate">Semua Jenis Peraturan</span>
                {selectedJenis.length === 0 && (
                  <Check className="w-3.5 h-3.5 text-pr-900 stroke-[2.5] shrink-0 ml-2" />
                )}
              </button>

              {/* List Jenis Peraturan (Opsi terpilih di atas) */}
              {sortedJenisList.map((opt) => {
                const isSelected = selectedJenis.includes(opt);
                const isOptPerda =
                  opt.toLowerCase().includes('perda') ||
                  opt.toLowerCase().includes('peraturan daerah');

                return (
                  <div key={opt} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => handleToggleJenis(opt)}
                      className={`w-full px-3 py-2 text-left text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-pr-50 text-pr-900 font-semibold'
                          : 'text-neu-700 hover:bg-neutral-50 hover:text-neu-900 font-normal'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-pr-900 stroke-[2.5] shrink-0 ml-2" />
                      )}
                    </button>

                    {/* Jika Peraturan Daerah dipilih, tampilkan FlatLocationPicker (search + provinsi + kabupaten) */}
                    {isOptPerda && isSelected && (
                      <div className="pt-1 pb-1">
                        <FlatLocationPicker
                          selectedLokasi={selectedLokasi}
                          onToggleLokasi={handleToggleLokasi}
                          onRemoveLokasi={handleRemoveLokasi}
                          allFlatLokasi={allFlatLokasi}
                          variant="light"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Dropdown Subjek (Multi-select) */}
        <TimelineMultiSelectDropdown
          label="Subjek"
          options={defaultSubjekList}
          selectedValues={selectedSubjek}
          onChange={(newVals) => {
            setSelectedSubjek(newVals);
            if (onSubjekChange) onSubjekChange(newVals);
          }}
        />
      </div>

      {/* ── Button Reset Filter: Kembalikan ke default 2025-2026, Semua Jenis, Semua Subjek ── */}
      <button
        type="button"
        onClick={handleReset}
        className="h-11 sm:h-12 px-5 rounded-xl bg-pr-900 hover:bg-pr-800 text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-2xs shrink-0 cursor-pointer"
        title="Reset semua filter ke default"
      >
        <RotateCcw className="w-4 h-4 text-white" />
        <span>Reset Filter</span>
      </button>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/Components/ui/button';
import { Icon } from '@/Components/ui/icon';

interface SearchFilterBarProps {
  isScrolled: boolean;
  onSearch?: (query: string, filters?: { kategori: string; tahun: string; status: string }) => void;
}

interface FilterOption {
  value: string;
  label: string;
}

// ─────────────────────────────────────────────
// Multi-Select Dropdown (Kategori & Status)
// ─────────────────────────────────────────────
interface MultiSelectDropdownProps {
  label: string;
  selectedValues: string[];
  options: FilterOption[];
  placeholder: string;
  onToggleValue: (value: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function MultiSelectDropdown({
  label,
  selectedValues,
  options,
  placeholder,
  onToggleValue,
  onClear,
  isOpen,
  onToggle,
  onClose,
}: MultiSelectDropdownProps) {
  let displayLabel = placeholder;
  if (
    selectedValues.length === 0 ||
    (options.length > 0 && selectedValues.length === options.length)
  ) {
    displayLabel = placeholder;
  } else if (selectedValues.length === 1) {
    const found = options.find((o) => o.value === selectedValues[0]);
    if (found) displayLabel = found.label;
  } else if (selectedValues.length > 1) {
    displayLabel = `${selectedValues.length} ${label}`;
  }

  return (
    <div className={`w-full text-left min-w-0 relative ${isOpen ? 'z-50' : 'z-10'}`}>
      <div className="text-left text-neu-200 text-[12px] font-normal leading-[16px] sm:leading-[18px] mb-1">
        {label}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full h-[36px] sm:h-[37px] px-2.5 sm:px-3.5 bg-white/5 border border-white/10 rounded-[12px] text-neu-200 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer outline-none focus:ring-1 focus:ring-sec-900/60 transition-all"
      >
        <span className="truncate pr-1.5">{displayLabel}</span>
        <Icon
          name="chevron-down"
          className={`w-3.5 h-3.5 text-neu-300 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-sec-900' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-[#07132B] border border-pr-700/90 rounded-[14px] shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl py-2 px-1.5 z-50 max-h-56 overflow-y-auto custom-scrollbar">
          {/* Daftar Opsi dengan Checkbox (Hanya opsi sebenarnya, tidak ada opsi 'Semua') */}
          {options.map((item) => {
            const isChecked = selectedValues.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onToggleValue(item.value)}
                className="w-full px-2.5 py-1.5 text-left text-[12px] flex items-center gap-2.5 rounded-[8px] transition-colors hover:bg-white/10 text-neu-200 hover:text-white group cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? 'bg-[#0F224A] border-sec-400 text-sec-400'
                      : 'border-neu-400/40 bg-white/5 group-hover:border-white/40'
                  }`}
                >
                  {isChecked && <Icon name="check" className="w-3 h-3 text-sec-400 stroke-[3]" />}
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Year Range Dropdown (Dari & Sampai)
// ─────────────────────────────────────────────
interface YearRangeDropdownProps {
  label: string;
  tahunDari: string;
  tahunSampai: string;
  options: string[];
  onChangeDari: (val: string) => void;
  onChangeSampai: (val: string) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function YearRangeDropdown({
  label,
  tahunDari,
  tahunSampai,
  options,
  onChangeDari,
  onChangeSampai,
  onReset,
  isOpen,
  onToggle,
  onClose,
}: YearRangeDropdownProps) {
  const [openSub, setOpenSub] = useState<{ dari: boolean; sampai: boolean }>({
    dari: true,
    sampai: true,
  });

  useEffect(() => {
    if (isOpen) {
      setOpenSub({ dari: true, sampai: true });
    }
  }, [isOpen]);

  let displayLabel = 'Semua Tahun';
  if (tahunDari && tahunSampai) {
    const y1 = Number(tahunDari);
    const y2 = Number(tahunSampai);
    if (!isNaN(y1) && !isNaN(y2)) {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      displayLabel = minY === maxY ? String(minY) : `${minY} - ${maxY}`;
    } else {
      displayLabel = `${tahunDari} - ${tahunSampai}`;
    }
  } else if (tahunDari) {
    displayLabel = tahunDari;
  } else if (tahunSampai) {
    displayLabel = tahunSampai;
  }

  const toggleSub = (type: 'dari' | 'sampai') => {
    setOpenSub((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className={`w-full text-left min-w-0 relative ${isOpen ? 'z-50' : 'z-10'}`}>
      <div className="text-left text-neu-200 text-[12px] font-normal leading-[16px] sm:leading-[18px] mb-1">
        {label}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full h-[36px] sm:h-[37px] px-2.5 sm:px-3.5 bg-white/5 border border-white/10 rounded-[12px] text-neu-200 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer outline-none focus:ring-1 focus:ring-sec-900/60 transition-all"
      >
        <span className="truncate pr-1.5">{displayLabel}</span>
        <Icon
          name="chevron-down"
          className={`w-3.5 h-3.5 text-neu-300 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-sec-900' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-[#07132B] border border-pr-700/90 rounded-[14px] shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-2.5 sm:p-3 z-50">
          {/* Header & Reset Action */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 text-[12px]">
            <span className="text-neu-200 font-semibold text-[12px]">Rentang Tahun</span>
            {(tahunDari || tahunSampai) && (
              <button
                type="button"
                onClick={onReset}
                className="text-sec-400 hover:text-sec-300 text-[12px] font-medium transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* 2 Kolom: Dari & Sampai (Keduanya tampil bersamaan) */}
          <div className="grid grid-cols-2 gap-2">
            {/* Kolom Dari */}
            <div className="min-w-0">
              <div className="text-neu-300 text-[12px] font-medium mb-1">Dari</div>
              <button
                type="button"
                onClick={() => toggleSub('dari')}
                className="flex items-center justify-between w-full h-[32px] px-2 bg-[#0B1A3A] border border-pr-700/80 rounded-[8px] text-white text-[12px] font-normal transition-all hover:border-pr-600 cursor-pointer"
              >
                <span className="truncate">{tahunDari || 'Pilih'}</span>
                <Icon
                  name="chevron-down"
                  className={`w-3 h-3 text-neu-300 shrink-0 transition-transform duration-200 ${
                    openSub.dari ? 'rotate-180 text-sec-400' : ''
                  }`}
                />
              </button>

              {openSub.dari && (
                <div className="mt-1.5 bg-[#050C1D] border border-pr-700/80 rounded-[8px] max-h-36 overflow-y-auto custom-scrollbar py-1">
                  {options.map((yr) => {
                    const isSelected = tahunDari === yr;
                    return (
                      <button
                        key={`dari-${yr}`}
                        type="button"
                        onClick={() => onChangeDari(yr)}
                        className={`w-full px-2 py-1 text-left text-[12px] transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-sec-900/20 text-sec-400 font-semibold'
                            : 'text-neu-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{yr}</span>
                        {isSelected && <Icon name="check" className="w-3 h-3 text-sec-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Kolom Sampai */}
            <div className="min-w-0">
              <div className="text-neu-300 text-[12px] font-medium mb-1">Sampai</div>
              <button
                type="button"
                onClick={() => toggleSub('sampai')}
                className="flex items-center justify-between w-full h-[32px] px-2 bg-[#0B1A3A] border border-pr-700/80 rounded-[8px] text-white text-[12px] font-normal transition-all hover:border-pr-600 cursor-pointer"
              >
                <span className="truncate">{tahunSampai || 'Pilih'}</span>
                <Icon
                  name="chevron-down"
                  className={`w-3 h-3 text-neu-300 shrink-0 transition-transform duration-200 ${
                    openSub.sampai ? 'rotate-180 text-sec-400' : ''
                  }`}
                />
              </button>

              {openSub.sampai && (
                <div className="mt-1.5 bg-[#050C1D] border border-pr-700/80 rounded-[8px] max-h-36 overflow-y-auto custom-scrollbar py-1">
                  {options.map((yr) => {
                    const isSelected = tahunSampai === yr;
                    return (
                      <button
                        key={`sampai-${yr}`}
                        type="button"
                        onClick={() => onChangeSampai(yr)}
                        className={`w-full px-2 py-1 text-left text-[12px] transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-sec-900/20 text-sec-400 font-semibold'
                            : 'text-neu-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{yr}</span>
                        {isSelected && <Icon name="check" className="w-3 h-3 text-sec-400 shrink-0" />}
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
}

// ─────────────────────────────────────────────
// Main Component: SearchFilterBar
// ─────────────────────────────────────────────
export function SearchFilterBar({ isScrolled, onSearch }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Multi-select state
  const [selectedKategori, setSelectedKategori] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // Year range state
  const [tahunDari, setTahunDari] = useState('');
  const [tahunSampai, setTahunSampai] = useState('');

  const [activeDropdown, setActiveDropdown] = useState<'kategori' | 'tahun' | 'status' | null>(null);

  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/referensi-filter')
      .then((res) => res.json())
      .then((data) => {
        setListKategori(data.kategori || []);
        setListStatus(data.status || []);
        setListTahun(data.tahun || []);
      })
      .catch((err) => console.error('Gagal memuat referensi:', err));
  }, []);

  // Tutup dropdown saat user mengklik di luar area filter
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const keyword = searchQuery.trim();
    setErrorMsg('');

    // Susun filter tahun: jika kedua rentang terisi buat '2020-2026', atau jika hanya 1 terisi
    let formattedTahun = '';
    if (tahunDari && tahunSampai) {
      const y1 = Number(tahunDari);
      const y2 = Number(tahunSampai);
      if (!isNaN(y1) && !isNaN(y2)) {
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        formattedTahun = minY === maxY ? String(minY) : `${minY}-${maxY}`;
      } else {
        formattedTahun = `${tahunDari}-${tahunSampai}`;
      }
    } else if (tahunDari) {
      formattedTahun = tahunDari;
    } else if (tahunSampai) {
      formattedTahun = tahunSampai;
    }

    const isAllKategori =
      selectedKategori.length === 0 ||
      (kategoriOptions.length > 0 && selectedKategori.length === kategoriOptions.length);
    const kategoriParam = isAllKategori ? '' : selectedKategori.join(',');

    const isAllStatus =
      selectedStatus.length === 0 ||
      (statusOptions.length > 0 && selectedStatus.length === statusOptions.length);
    const statusParam = isAllStatus ? '' : selectedStatus.join(',');

    if (onSearch) {
      onSearch(keyword, {
        kategori: kategoriParam,
        tahun: formattedTahun,
        status: statusParam,
      });
    }
  };

  const kategoriOptions: FilterOption[] = listKategori.map((k) => ({
    value: String(k.id),
    label: k.nama,
  }));

  const statusOptions: FilterOption[] = listStatus.map((s) => ({
    value: String(s.id),
    label: s.nama,
  }));

  // Fallback tahun agar selalu tersedia opsi tahun lengkap (misal 2026 ke bawah)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    new Set([
      ...listTahun.map(String),
      String(currentYear),
      String(currentYear - 1),
      String(currentYear - 2),
      String(currentYear - 3),
      String(currentYear - 4),
      String(currentYear - 5),
      String(currentYear - 6),
    ])
  ).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="relative w-full max-w-[699px] h-[54px] sm:h-[60px]">
      <div
        ref={filterContainerRef}
        className="absolute top-0 left-0 w-full flex flex-col bg-pr-900 border border-pr-700 rounded-[25px] sm:rounded-[28px] p-2 sm:p-[10px] shadow-2xl backdrop-blur-[40px] z-30 transition-all duration-300 ease-out"
      >
      {/* ── Search Row ── */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center w-full h-[38px] sm:h-[40px] gap-1.5 sm:gap-[8px]"
      >
        {/* Search Input (14px) */}
        <div className="flex items-center flex-1 min-w-0 h-[38px] sm:h-[40px] px-2.5 sm:px-[17px] bg-white/5 border border-white/10 rounded-[25px] backdrop-blur-[14px]">
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="w-4 h-4 sm:w-5 sm:h-5 p-0 mr-1.5 sm:mr-[19px] shrink-0 text-sec-900 hover:bg-transparent hover:text-sec-800 cursor-pointer"
            aria-label="Cari"
          >
            <Icon name="search" className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          </Button>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="Cari peraturan yang ada di Indonesia..."
            className="w-full min-w-0 bg-transparent text-white text-[14px] font-normal outline-none border-none placeholder:text-neu-300 focus:ring-0 leading-[20px]"
          />
        </div>

        {/* Search Button (12px) */}
        <Button
          type="submit"
          className="w-auto sm:w-[105px] h-[38px] sm:h-[40px] min-h-[36px] bg-sec-900 text-neu-900 text-[12px] font-bold rounded-[12px] px-3 sm:px-5 hover:bg-sec-800 transition-colors cursor-pointer shrink-0"
        >
          Search
        </Button>

        {/* Filter Toggle Button (12px) */}
        <Button
          type="button"
          onClick={() => {
            setIsSearchExpanded((prev) => !prev);
            setActiveDropdown(null);
          }}
          className={`flex items-center justify-center gap-1 sm:gap-2 w-auto sm:w-[105px] h-[38px] sm:h-[40px] min-h-[36px] text-[12px] font-bold rounded-[12px] px-2.5 sm:px-5 transition-colors cursor-pointer shrink-0 ${
            isSearchExpanded
              ? 'bg-sec-900 text-neu-900 hover:bg-sec-800'
              : 'bg-neu-50 text-neu-900 hover:bg-white'
          }`}
        >
          <Icon
            name="settings-2"
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSearchExpanded ? 'text-neu-900' : 'text-neu-600'}`}
          />
          Filter
        </Button>
      </form>

      {/* ── Filter Cepat Section (Melebar ke bawah di container yang sama tanpa border pemisah) ── */}
      {isSearchExpanded && (
        <div className="w-full pt-3 sm:pt-3.5 px-0.5 sm:px-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="w-full text-left text-neu-200 text-[12px] font-semibold leading-[16px] tracking-[0.6%] mb-2 sm:mb-[10px]">
            Filter Cepat
          </div>

          {/* Responsive Grid: Mobile 2 rows (Kategori 100%, Tahun & Status 50%), Desktop 3 columns in 1 row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-[16px] w-full">
            {/* Kategori (Multi-select) */}
            <div className="col-span-1">
              <MultiSelectDropdown
                label="Kategori"
                selectedValues={selectedKategori}
                options={kategoriOptions}
                placeholder="Semua kategori"
                onToggleValue={(val) => {
                  setSelectedKategori((prev) =>
                    prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
                  );
                }}
                onClear={() => setSelectedKategori([])}
                isOpen={activeDropdown === 'kategori'}
                onToggle={() =>
                  setActiveDropdown((prev) => (prev === 'kategori' ? null : 'kategori'))
                }
                onClose={() => setActiveDropdown(null)}
              />
            </div>

            {/* Tahun & Status Wrapper (2 cols on mobile, separate columns on desktop) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-[16px] sm:col-span-2">
              {/* Tahun (Range: Dari & Sampai) */}
              <YearRangeDropdown
                label="Tahun"
                tahunDari={tahunDari}
                tahunSampai={tahunSampai}
                options={availableYears}
                onChangeDari={setTahunDari}
                onChangeSampai={setTahunSampai}
                onReset={() => {
                  setTahunDari('');
                  setTahunSampai('');
                }}
                isOpen={activeDropdown === 'tahun'}
                onToggle={() =>
                  setActiveDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))
                }
                onClose={() => setActiveDropdown(null)}
              />

              {/* Status (Multi-select) */}
              <MultiSelectDropdown
                label="Status"
                selectedValues={selectedStatus}
                options={statusOptions}
                placeholder="Semua"
                onToggleValue={(val) => {
                  setSelectedStatus((prev) =>
                    prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
                  );
                }}
                onClear={() => setSelectedStatus([])}
                isOpen={activeDropdown === 'status'}
                onToggle={() =>
                  setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))
                }
                onClose={() => setActiveDropdown(null)}
              />
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="text-left text-red-400 text-xs sm:text-sm font-medium mt-2 px-2">
          {errorMsg}
        </div>
      )}
      </div>
    </div>
  );
}
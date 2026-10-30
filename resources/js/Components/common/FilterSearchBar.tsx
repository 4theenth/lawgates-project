import React, { useMemo } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import Dropdown from '@/Components/common/Dropdown';
import { FlatLocationPicker } from '@/Components/search/filters/FlatLocationPicker';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  /** Elemen opsional di sisi kiri (misal: Status Filter Tabs pada halaman Kontribusi) */
  leftElement?: React.ReactNode;
  /** Nilai kategori terpilih, bisa berupa string tunggal, comma-separated ('1,2'), atau array string */
  selectedCategory?: string | string[];
  onCategoryChange?: (value: string | string[]) => void;
  categoryOptions?: FilterOption[];
  /** Pilihan daerah (Perda) terpilih */
  selectedLokasi?: string[];
  onLokasiChange?: (lokasi: string[]) => void;
  allFlatLokasi?: string[];
  selectedSort?: string;
  onSortChange?: (value: string) => void;
  sortOptions?: FilterOption[];
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

const DEFAULT_SORT_OPTIONS: FilterOption[] = [
  { label: 'Terbaru Tersimpan', value: 'terbaru' },
  { label: 'Terlama Tersimpan', value: 'terlama' },
  { label: 'Judul (A - Z)', value: 'judul_asc' },
  { label: 'Judul (Z - A)', value: 'judul_desc' },
];

const DEFAULT_CATEGORY_OPTIONS: FilterOption[] = [
  { label: 'Semua Jenis', value: 'all' },
  { label: 'Undang-Undang', value: '1' },
  { label: 'UUD', value: '2' },
  { label: 'Peraturan Presiden', value: '3' },
  { label: 'Peraturan Daerah', value: '4' },
  { label: 'Peraturan Pemerintah', value: '5' },
  { label: 'Peraturan Menteri', value: '6' },
];

/**
 * Reusable Filter Search Bar
 * Sesuai Figma node #3142:56403 & #3198:77160
 *
 * Menggabungkan Search Input dengan 2 dropdown filter (Kategori/Jenis & Sorting):
 * - Dropdown terbuka lurus ke bawah langsung dari kolom filternya
 * - Mendukung multi-select pada jenis peraturan
 * - Desain item terpilih: tanpa background (transparan), teks tebal (bold), dan icon checklist
 * - Menggunakan nama kategori lengkap tanpa singkatan
 */
export function FilterSearchBar({
  search,
  onSearchChange,
  placeholder = 'Cari di dalam bookmark...',
  leftElement,
  selectedCategory = 'all',
  onCategoryChange,
  categoryOptions = DEFAULT_CATEGORY_OPTIONS,
  selectedLokasi = [],
  onLokasiChange,
  allFlatLokasi = [],
  selectedSort = 'terbaru',
  onSortChange,
  sortOptions = DEFAULT_SORT_OPTIONS,
  onSubmit,
  className = '',
}: FilterSearchBarProps) {
  // Normalisasi selectedCategory ke array string
  const selectedCategoryList = useMemo(() => {
    if (Array.isArray(selectedCategory)) {
      return selectedCategory.map(String).filter((c) => c !== 'all' && c !== '');
    }
    if (!selectedCategory || selectedCategory === 'all') {
      return [];
    }
    return String(selectedCategory)
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c !== 'all' && c !== '');
  }, [selectedCategory]);

  // Label tampilan pada trigger tombol dropdown Jenis
  const currentCategoryLabel = useMemo(() => {
    if (selectedCategoryList.length === 0) {
      return 'Semua Jenis';
    }
    if (selectedCategoryList.length === 1) {
      const match = categoryOptions.find(
        (opt) =>
          String(opt.value) === String(selectedCategoryList[0]) ||
          opt.label.toLowerCase() === selectedCategoryList[0].toLowerCase()
      );
      const baseName = match ? match.label : selectedCategoryList[0];
      const isPerda =
        baseName.toLowerCase().includes('perda') ||
        baseName.toLowerCase().includes('peraturan daerah');
      if (isPerda && selectedLokasi.length > 0) {
        return `${baseName} (${selectedLokasi.length} Daerah)`;
      }
      return baseName;
    }
    const firstMatch = categoryOptions.find(
      (opt) =>
        String(opt.value) === String(selectedCategoryList[0]) ||
        opt.label.toLowerCase() === selectedCategoryList[0].toLowerCase()
    );
    const firstName = firstMatch ? firstMatch.label : selectedCategoryList[0];
    return `${firstName} (+${selectedCategoryList.length - 1})`;
  }, [selectedCategoryList, categoryOptions, selectedLokasi]);

  // Label tampilan pada trigger tombol dropdown Sort
  const currentSortLabel =
    sortOptions.find((opt) => opt.value === selectedSort)?.label || 'Terbaru Tersimpan';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  // Handler toggle multi-select jenis
  const handleToggleCategory = (e: React.MouseEvent, val: string) => {
    // Stop propagation agar menu tidak langsung tertutup saat multi-select
    e.stopPropagation();

    if (val === 'all') {
      onCategoryChange?.('all');
      return;
    }

    const valStr = String(val);
    let nextList: string[];
    if (selectedCategoryList.includes(valStr)) {
      nextList = selectedCategoryList.filter((item) => item !== valStr);
    } else {
      nextList = [...selectedCategoryList, valStr];
    }

    if (nextList.length === 0) {
      onCategoryChange?.('all');
    } else {
      onCategoryChange?.(nextList.join(','));
    }
  };

  // Pindahkan opsi yang sudah dipilih ke paling atas agar mudah di-uncheck (seperti di timeline)
  const sortedCategoryOptions = useMemo(() => {
    const checked: FilterOption[] = [];
    const unchecked: FilterOption[] = [];
    categoryOptions
      .filter((opt) => opt.value !== 'all')
      .forEach((opt) => {
        const isSelected =
          selectedCategoryList.includes(String(opt.value)) ||
          selectedCategoryList.includes(opt.label);
        if (isSelected) {
          checked.push(opt);
        } else {
          unchecked.push(opt);
        }
      });
    return [...checked, ...unchecked];
  }, [categoryOptions, selectedCategoryList]);

  const isAllSelected = selectedCategoryList.length === 0;

  // ── Render Khusus Toolbar Berisi Left Slot (Figma #3436:59224) ──
  if (leftElement) {
    return (
      <div
        className={`w-full min-h-[56px] bg-white border border-neu-50 rounded-[10px] p-2 sm:px-3.5 sm:py-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs ${className}`}
      >
        {/* Sisi Kiri: Status Tabs / Filter */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 shrink-0">
          {leftElement}
        </div>

        {/* Sisi Kanan: Input Pencarian & Dropdown Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Input Pencarian */}
          <form onSubmit={handleFormSubmit} className="w-full sm:w-[195px]">
            <div className="relative w-full h-[38px] bg-white border border-neu-50 hover:border-neu-200 rounded-[8px] flex items-center px-3 shadow-2xs focus-within:border-neu-200 focus-within:ring-2 focus-within:ring-pr-900/5 transition-all">
              <Search className="w-4 h-4 text-neu-400 shrink-0 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-full pl-2.5 pr-1 bg-transparent font-sans text-[12px] text-neu-900 placeholder:text-neu-400 outline-none focus:outline-none"
                style={{ outline: 'none' }}
              />
            </div>
          </form>

          {/* Dropdown Sort */}
          {onSortChange && (
            <div className="relative w-full sm:w-[177px]">
              <Dropdown>
                <Dropdown.Trigger>
                  <div className="w-full h-[38px] bg-white border border-neu-50 rounded-[8px] px-3 flex items-center justify-between text-left cursor-pointer hover:border-neu-200 shadow-2xs transition-colors">
                    <span className="font-sans text-[13px] text-neu-600 truncate mr-2">
                      {currentSortLabel}
                    </span>
                    <ChevronDown className="w-4 h-4 text-neu-500 shrink-0" />
                  </div>
                </Dropdown.Trigger>

                <Dropdown.Content
                  align="right"
                  width="w-full sm:w-[180px]"
                  contentClasses="p-1.5 bg-white border border-neu-100 rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] max-h-64 overflow-y-auto no-scrollbar"
                >
                  {sortOptions.map((opt) => {
                    const isSelected = selectedSort === opt.value;
                    const defaultSortValue = sortOptions[0]?.value || 'terbaru';
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            onSortChange(defaultSortValue);
                          } else {
                            onSortChange(opt.value);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-sans text-[13px] transition-colors text-left cursor-pointer hover:bg-neutral-50/70 ${
                          isSelected
                            ? 'font-semibold text-neu-900'
                            : 'font-normal text-neu-600 hover:text-neu-900'
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-neu-900 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </Dropdown.Content>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col md:flex-row items-stretch md:items-center gap-2.5 ${className}`}>
      {/* ── 1. Input Pencarian (Figma: width 417px, height 44px, rounded 10px, border-neu-50) ── */}
      <form onSubmit={handleFormSubmit} className="flex-1 min-w-0">
        <div className="relative w-full h-11 bg-white border border-neu-50 hover:border-neu-200 rounded-[10px] flex items-center px-3.5 shadow-2xs focus-within:border-neu-200 focus-within:ring-2 focus-within:ring-pr-900/5 transition-all">
          <Search className="w-5 h-5 text-neu-400 shrink-0 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full pl-3 pr-2 bg-transparent font-sans text-[14px] text-neu-900 placeholder:text-neu-600 focus:outline-none"
          />
        </div>
      </form>

      {/* ── 2. Wrapper 2 Dropdown (Jenis & Sorting) ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
        {/* Dropdown 1: Kategori / Jenis Peraturan (Figma: width 213px, height 44px, rounded 12px) */}
        {onCategoryChange && (
          <div className="relative w-full sm:w-[200px] lg:w-[213px]">
            <Dropdown closeOnScroll={false}>
              <Dropdown.Trigger>
                <div className="w-full h-11 bg-white border border-neu-50 rounded-[12px] px-4 flex items-center justify-between text-left cursor-pointer hover:border-neu-200 shadow-2xs transition-colors">
                  <span className="font-sans text-[14px] text-neu-600 truncate mr-2">
                    {currentCategoryLabel}
                  </span>
                  <ChevronDown className="w-5 h-5 text-neu-500 shrink-0" />
                </div>
              </Dropdown.Trigger>

              <Dropdown.Content
                align="left"
                width="w-full min-w-full sm:w-[213px]"
                contentClasses="p-1.5 bg-white border border-neu-100 rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] max-h-80 overflow-y-auto no-scrollbar"
              >
                {/* Opsi "Semua Jenis" */}
                <button
                  type="button"
                  onClick={(e) => handleToggleCategory(e, 'all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-sans text-[13px] transition-colors text-left cursor-pointer hover:bg-neutral-50/70 ${
                    isAllSelected
                      ? 'font-semibold text-neu-900'
                      : 'font-normal text-neu-600 hover:text-neu-900'
                  }`}
                >
                  <span className="truncate">Semua Jenis</span>
                  {isAllSelected && <Check className="w-4 h-4 text-neu-900 shrink-0 ml-2" />}
                </button>

                {/* List Opsi Kategori / Jenis (Yang dipilih otomatis naik ke atas) */}
                {sortedCategoryOptions.map((opt) => {
                  const isSelected =
                    selectedCategoryList.includes(String(opt.value)) ||
                    selectedCategoryList.includes(opt.label);

                  const isPerdaItem =
                    opt.label.toLowerCase().includes('perda') ||
                    opt.label.toLowerCase().includes('peraturan daerah');

                  return (
                    <div key={opt.value} className="flex flex-col">
                      <button
                        type="button"
                        onClick={(e) => handleToggleCategory(e, String(opt.value))}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-sans text-[13px] transition-colors text-left cursor-pointer hover:bg-neutral-50/70 ${
                          isSelected
                            ? 'font-semibold text-neu-900'
                            : 'font-normal text-neu-600 hover:text-neu-900'
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-neu-900 shrink-0 ml-2" />}
                      </button>

                      {/* Sub-pilihan Daerah jika Perda dipilih (Menggunakan FlatLocationPicker) */}
                      {isPerdaItem && isSelected && onLokasiChange && (
                        <div
                          className="pt-1.5 pb-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FlatLocationPicker
                            selectedLokasi={selectedLokasi}
                            onToggleLokasi={(val) => {
                              const next = selectedLokasi.includes(val)
                                ? selectedLokasi.filter((l) => l !== val)
                                : [...selectedLokasi, val];
                              onLokasiChange(next);
                            }}
                            onRemoveLokasi={(val) => {
                              onLokasiChange(selectedLokasi.filter((l) => l !== val));
                            }}
                            allFlatLokasi={allFlatLokasi}
                            variant="light"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </Dropdown.Content>
            </Dropdown>
          </div>
        )}

        {/* Dropdown 2: Urutan / Sort (Figma: width 213px, height 44px, rounded 12px) */}
        {onSortChange && (
          <div className="relative w-full sm:w-[200px] lg:w-[213px]">
            <Dropdown>
              <Dropdown.Trigger>
                <div className="w-full h-11 bg-white border border-neu-50 rounded-[12px] px-4 flex items-center justify-between text-left cursor-pointer hover:border-neu-200 shadow-2xs transition-colors">
                  <span className="font-sans text-[14px] text-neu-600 truncate mr-2">
                    {currentSortLabel}
                  </span>
                  <ChevronDown className="w-5 h-5 text-neu-500 shrink-0" />
                </div>
              </Dropdown.Trigger>

              <Dropdown.Content
                align="left"
                width="w-full min-w-full sm:w-[213px]"
                contentClasses="p-1.5 bg-white border border-neu-100 rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.08)] max-h-64 overflow-y-auto no-scrollbar"
              >
                {sortOptions.map((opt) => {
                  const isSelected = selectedSort === opt.value;
                  const defaultSortValue = sortOptions[0]?.value || 'terbaru';
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        // Jika opsi yang sama diklik lagi, toggle kembali ke default (Terbaru Tersimpan)
                        if (isSelected) {
                          onSortChange(defaultSortValue);
                        } else {
                          onSortChange(opt.value);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-sans text-[13px] transition-colors text-left cursor-pointer hover:bg-neutral-50/70 ${
                        isSelected
                          ? 'font-semibold text-neu-900'
                          : 'font-normal text-neu-600 hover:text-neu-900'
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-neu-900 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </Dropdown.Content>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSearchBar;

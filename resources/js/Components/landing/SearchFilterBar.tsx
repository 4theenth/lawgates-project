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

interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  placeholder: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function FilterDropdown({
  label,
  value,
  options,
  placeholder,
  onChange,
  isOpen,
  onToggle,
  onClose,
}: FilterDropdownProps) {
  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="flex-1 text-left min-w-0 relative">
      <div className="text-left text-neu-200 text-[11px] sm:text-[12px] font-normal leading-[16px] sm:leading-[18px] mb-1">
        {label}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full h-[36px] sm:h-[37px] px-2.5 sm:px-3.5 bg-white/5 border border-white/10 rounded-[12px] text-neu-200 text-xs sm:text-[13px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer outline-none focus:ring-1 focus:ring-sec-900/60 transition-all"
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
        <div className="absolute top-[calc(100%+4px)] left-0 w-full min-w-[140px] sm:min-w-[170px] bg-[#07132B] border border-pr-700/90 rounded-[14px] shadow-2xl backdrop-blur-2xl py-1 z-50 max-h-48 overflow-y-auto">
          <button
            type="button"
            onClick={() => {
              onChange('');
              onClose();
            }}
            className={`w-full px-3 py-2 text-left text-xs sm:text-[13px] flex items-center justify-between transition-colors ${
              !value
                ? 'bg-sec-900/20 text-sec-400 font-semibold'
                : 'text-neu-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="truncate">{placeholder}</span>
            {!value && <Icon name="check" className="w-3.5 h-3.5 text-sec-400 shrink-0" />}
          </button>

          {options.map((item) => {
            const isSelected = value === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  onChange(item.value);
                  onClose();
                }}
                className={`w-full px-3 py-2 text-left text-xs sm:text-[13px] flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-sec-900/20 text-sec-400 font-semibold'
                    : 'text-neu-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="truncate pr-2">{item.label}</span>
                {isSelected && <Icon name="check" className="w-3.5 h-3.5 text-sec-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SearchFilterBar({ isScrolled, onSearch }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [kategori, setKategori] = useState('');
  const [tahun, setTahun] = useState('');
  const [status, setStatus] = useState('');

  const [activeDropdown, setActiveDropdown] = useState<'kategori' | 'tahun' | 'status' | null>(null);

  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/referensi-filter')
      .then(res => res.json())
      .then(data => {
        setListKategori(data.kategori || []);
        setListStatus(data.status || []);
        setListTahun(data.tahun || []);
      })
      .catch(err => console.error("Gagal memuat referensi:", err));
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
    if (keyword.length === 0) {
      // If the keyword is completely empty, you might want to handle it, or just let it pass
      // In this case, we'll let it pass to allow searching for everything or resetting.
    }
    
    setErrorMsg('');

    if (onSearch) {
      onSearch(keyword, { kategori, tahun, status });
    }
  };

  const kategoriOptions: FilterOption[] = listKategori.map((k) => ({
    value: String(k.id),
    label: k.nama,
  }));

  const tahunOptions: FilterOption[] = listTahun.map((t) => ({
    value: String(t),
    label: String(t),
  }));

  const statusOptions: FilterOption[] = listStatus.map((s) => ({
    value: String(s.id),
    label: s.nama,
  }));

  return (
    <div
      ref={filterContainerRef}
      className={`relative flex flex-col w-full max-w-[699px] rounded-[25px] transition-all duration-300 ${
        isScrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative z-20 flex items-center w-full h-[54px] sm:h-[60px] bg-pr-900 border border-pr-700 rounded-[25px] py-[6px] sm:py-[8px] px-2 sm:px-[10px] shadow-2xl backdrop-blur-[40px]">
        
        {/* Search Row */}
        <form onSubmit={handleSearchSubmit} className="relative z-10 flex items-center w-full h-[38px] sm:h-[40px] gap-1.5 sm:gap-[8px]">
          
          {/* Search Input */}
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
              className="w-full min-w-0 bg-transparent text-white text-xs sm:text-[14px] font-normal outline-none border-none placeholder:text-neu-300 focus:ring-0 leading-[20px]"
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="w-auto sm:w-[105px] h-[38px] sm:h-[40px] min-h-[36px] bg-sec-900 text-neu-900 text-xs sm:text-[14px] font-bold rounded-[12px] px-3 sm:px-5 hover:bg-sec-800 transition-colors cursor-pointer shrink-0"
          >
            Search
          </Button>

          {/* Filter Toggle Button */}
          <Button
            type="button"
            onClick={() => {
              setIsSearchExpanded((prev) => !prev);
              setActiveDropdown(null);
            }}
            className={`flex items-center justify-center gap-1 sm:gap-2 w-auto sm:w-[105px] h-[38px] sm:h-[40px] min-h-[36px] text-xs sm:text-[14px] font-bold rounded-[12px] px-2.5 sm:px-5 transition-colors cursor-pointer shrink-0 ${
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
      </div>

      {/* Filter Cepat Floating Popover */}
      <div 
        className={`absolute top-0 left-0 w-full bg-pr-900 border border-pr-700 rounded-[25px] p-3.5 sm:p-[16px] pt-[62px] sm:pt-[68px] shadow-2xl backdrop-blur-[40px] z-10 transition-all duration-300 ease-out ${
          isSearchExpanded 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible overflow-visible' 
            : 'opacity-0 -translate-y-2 pointer-events-none invisible overflow-hidden max-h-[60px]'
        }`}
      >
        <div className={`transition-opacity duration-300 delay-75 ${isSearchExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full text-left text-neu-200 text-[11px] sm:text-[12px] font-semibold leading-[16px] tracking-[0.6%] mb-2 sm:mb-[10px]">
            Filter Cepat
          </div>

          {/* Responsive Grid: Mobile 2 rows (Kategori 100%, Tahun & Status 50%), Desktop/Tablet 3 columns in 1 row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-[16px] w-full">
            {/* Kategori */}
            <div className="col-span-1">
              <FilterDropdown
                label="Kategori"
                value={kategori}
                options={kategoriOptions}
                placeholder="Semua kategori"
                onChange={setKategori}
                isOpen={activeDropdown === 'kategori'}
                onToggle={() =>
                  setActiveDropdown((prev) => (prev === 'kategori' ? null : 'kategori'))
                }
                onClose={() => setActiveDropdown(null)}
              />
            </div>

            {/* Tahun & Status Wrapper (2 cols on mobile, separate columns on desktop) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-[16px] sm:col-span-2">
              {/* Tahun */}
              <FilterDropdown
                label="Tahun"
                value={tahun}
                options={tahunOptions}
                placeholder="Semua Tahun"
                onChange={setTahun}
                isOpen={activeDropdown === 'tahun'}
                onToggle={() =>
                  setActiveDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))
                }
                onClose={() => setActiveDropdown(null)}
              />

              {/* Status */}
              <FilterDropdown
                label="Status"
                value={status}
                options={statusOptions}
                placeholder="Semua Status"
                onChange={setStatus}
                isOpen={activeDropdown === 'status'}
                onToggle={() =>
                  setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))
                }
                onClose={() => setActiveDropdown(null)}
              />
            </div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div 
          className={`absolute left-4 text-red-400 text-xs sm:text-sm font-medium drop-shadow-md transition-all duration-300 ease-out z-0 ${
            isSearchExpanded ? 'top-[190px] sm:top-[170px]' : 'top-[60px] sm:top-[68px]'
          }`}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Icon } from '@/Components/ui/icon';

interface SearchFilterBarProps {
  isScrolled: boolean;
  onSearch?: (query: string) => void;
}

export function SearchFilterBar({ isScrolled, onSearch }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <div
      className={`relative flex flex-col w-full max-w-[699px] h-[60px] bg-pr-900 border border-pr-700 rounded-[25px] py-[8px] px-[10px] shadow-2xl backdrop-blur-[40px] transition-all duration-300 ${
        isScrolled
          ? 'opacity-0 scale-95 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Search Row (Tinggi tetap 40px di dalam bar 60px) */}
      <form onSubmit={handleSearchSubmit} className="relative z-10 flex items-center w-full h-[40px] gap-[8px]">
        {/* Search Input (Figma: width 447px, height 40px, padding 0 17px, gap 19px) */}
        <div className="flex items-center w-full sm:w-[447px] h-[40px] px-[17px] bg-white/5 border border-white/10 rounded-[25px] backdrop-blur-[14px]">
          {/* Cukup panggil nama icon: name="search" */}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="w-5 h-5 p-0 mr-[19px] shrink-0 text-sec-900 hover:bg-transparent hover:text-sec-800 cursor-pointer"
            aria-label="Cari"
          >
            <Icon name="search" className="w-5 h-5" />
          </Button>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari peraturan yang ada di Indonesia..."
            className="w-full bg-transparent text-white text-[14px] font-normal outline-none border-none placeholder:text-neu-300 focus:ring-0 leading-[20px]"
          />
        </div>

        {/* Search Button (shadcn Button) */}
        <Button
          type="submit"
          className="w-[105px] h-[40px] min-h-[36px] bg-sec-900 text-neu-900 text-[14px] font-bold rounded-[12px] px-5 hover:bg-sec-800 transition-colors cursor-pointer"
        >
          Search
        </Button>

        {/* Filter Button (shadcn Button dengan Icon: name="settings-2") */}
        <Button
          type="button"
          onClick={() => setIsSearchExpanded((prev) => !prev)}
          className={`flex items-center justify-center gap-2 w-[105px] h-[40px] min-h-[36px] text-[14px] font-bold rounded-[12px] px-5 transition-colors cursor-pointer ${
            isSearchExpanded
              ? 'bg-sec-900 text-neu-900 hover:bg-sec-800'
              : 'bg-neu-50 text-neu-900 hover:bg-white'
          }`}
        >
          <Icon
            name="settings-2"
            className={`w-4 h-4 ${isSearchExpanded ? 'text-neu-900' : 'text-neu-600'}`}
          />
          Filter
        </Button>
      </form>

      {/* Filter Cepat Floating Popover (Melayang tanpa mengubah tinggi search bar atau menggeser layout) */}
      {isSearchExpanded && (
  <div className="absolute top-0 left-0 w-full h-[159px] bg-pr-900 border border-pr-700 rounded-[25px] p-[16px] pt-[68px] shadow-2xl backdrop-blur-[40px] z-0">
          {/* Filter Cepat Title */}
          <div className="w-full text-left text-neu-200 text-[12px] font-semibold leading-[16px] tracking-[0.6%] mb-[10px]">
            Filter Cepat
          </div>

          {/* Filter Controls */}
          <div className="flex w-full gap-[12px] sm:gap-[16px] justify-between">
            {/* Kategori */}
            <div className="flex-1 text-left">
              <div className="text-left text-neu-200 text-[12px] font-normal leading-[18px] mb-1">
                Kategori
              </div>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-between w-full h-[37px] px-3 sm:px-[18px] bg-white/5 border border-white/10 rounded-[12px] text-neu-300 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <span className="truncate">Semua kategori</span>
                <Icon name="chevron-down" className="w-4 h-4 text-neu-300 shrink-0 ml-1" />
              </Button>
            </div>

            {/* Tahun */}
            <div className="flex-1 text-left">
              <div className="text-left text-neu-200 text-[12px] font-normal leading-[18px] mb-1">
                Tahun
              </div>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-between w-full h-[37px] px-3 sm:px-[18px] bg-white/5 border border-white/10 rounded-[12px] text-neu-300 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <span className="truncate">2020 - 2026</span>
                <Icon name="chevron-down" className="w-4 h-4 text-neu-300 shrink-0 ml-1" />
              </Button>
            </div>

            {/* Status */}
            <div className="flex-1 text-left">
              <div className="text-left text-neu-200 text-[12px] font-normal leading-[18px] mb-1">
                Status
              </div>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-between w-full h-[37px] px-3 sm:px-[18px] bg-white/5 border border-white/10 rounded-[12px] text-neu-300 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <span className="truncate">Semua</span>
                <Icon name="chevron-down" className="w-4 h-4 text-neu-300 shrink-0 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

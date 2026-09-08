import { useState } from 'react';
import { Search, Settings2, ChevronDown } from 'lucide-react';

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
      className={`flex flex-col w-full max-w-[699px] bg-[#0A1C3E] border border-[#263A5C] rounded-[25px] p-[10px] shadow-2xl backdrop-blur-[40px] transition-all duration-300 ease-out ${isSearchExpanded ? 'h-[149px]' : 'h-[60px]'
        } ${isScrolled
          ? 'opacity-0 scale-95 pointer-events-none'
          : 'opacity-100 scale-100'
        }`}
    >
      {/* Search Row */}
      <form onSubmit={handleSearchSubmit} className="flex items-center w-full h-[40px] gap-[8px]">
        {/* Search Input */}
        <div className="flex items-center flex-1 h-[40px] px-[17px] bg-[#FFFFFF08] border border-[#FFFFFF14] rounded-[25px] backdrop-blur-[14px]">
          <Search className="w-5 h-5 text-[#D4AF37] mr-[19px] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari peraturan yang ada di Indonesia..."
            className="w-full bg-transparent text-white text-[14px] font-normal outline-none border-none placeholder:text-[#94A3B8] focus:ring-0"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center w-[105px] h-[40px] min-h-[36px] bg-sec-900 text-[#0F172A] text-[14px] font-bold rounded-[12px] px-5 transition-colors hover:bg-[#EAB308]"
        >
          Search
        </button>

        {/* Filter Button */}
        <button
          type="button"
          onClick={() => setIsSearchExpanded((prev) => !prev)}
          className={`flex items-center justify-center gap-2 w-[105px] h-[40px] min-h-[36px] text-[14px] font-bold rounded-[12px] px-5 transition-colors ${isSearchExpanded
            ? 'bg-[#D4AF37] text-[#0F172A] hover:bg-[#EAB308]'
            : 'bg-[#E9E9E9] text-[#0F172A] hover:bg-white'
            }`}
        >
          <Settings2
            className={`w-4 h-4 ${isSearchExpanded ? 'text-[#0F172A]' : 'text-[#475569]'
              }`}
          />
          Filter
        </button>
      </form>

      {/* Filter Cepat Expansion Panel */}
      {isSearchExpanded && (
        <div className="w-[679px] h-[79px] mt-[8px] text-left">
          {/* Filter Cepat Title */}
          <div className="w-[679px] h-[16px] text-left text-[#BCBCBC] text-[12px] font-semibold leading-[16px] tracking-[0.6%] mb-[8px]">
            Filter Cepat
          </div>

          {/* Filter Controls */}
          <div className="flex w-[679px] h-[55px] gap-[17px] text-left">
            {/* Kategori */}
            <div className="w-[215px] h-[55px] text-left">
              <div className="w-[215px] h-[18px] text-left text-[#BCBCBC] text-[12px] font-normal leading-[18px]">
                Kategori
              </div>
              <button
                type="button"
                className="flex items-center justify-between w-[215px] h-[37px] px-[21.5px] bg-[#FFFFFF08] border border-[#FFFFFF14] rounded-[12px] text-[#A6A6A6] text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px]"
              >
                <span>Semua kategori</span>
                <ChevronDown className="w-5 h-5 text-[#A6A6A6] shrink-0" />
              </button>
            </div>

            {/* Tahun */}
            <div className="w-[215px] h-[55px] text-left">
              <div className="w-[215px] h-[18px] text-left text-[#BCBCBC] text-[12px] font-normal leading-[18px]">
                Tahun
              </div>
              <button
                type="button"
                className="flex items-center justify-between w-[215px] h-[37px] px-[21.5px] bg-[#FFFFFF08] border border-[#FFFFFF14] rounded-[12px] text-[#A6A6A6] text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px]"
              >
                <span>2020 - 2026</span>
                <ChevronDown className="w-5 h-5 text-[#A6A6A6] shrink-0" />
              </button>
            </div>

            {/* Status */}
            <div className="w-[215px] h-[55px] text-left">
              <div className="w-[215px] h-[18px] text-left text-[#BCBCBC] text-[12px] font-normal leading-[18px]">
                Status
              </div>
              <button
                type="button"
                className="flex items-center justify-between w-[215px] h-[37px] px-[21.5px] bg-[#FFFFFF08] border border-[#FFFFFF14] rounded-[12px] text-[#A6A6A6] text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px]"
              >
                <span>Semua</span>
                <ChevronDown className="w-5 h-5 text-[#A6A6A6] shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

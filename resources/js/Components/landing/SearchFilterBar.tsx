import { useState, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Icon } from '@/Components/ui/icon';

interface SearchFilterBarProps {
  isScrolled: boolean;
  onSearch?: (query: string, filters?: { kategori: string; tahun: string; status: string }) => void;
}

export function SearchFilterBar({ isScrolled, onSearch }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [kategori, setKategori] = useState('');
  const [tahun, setTahun] = useState('');
  const [status, setStatus] = useState('');

  const [listKategori, setListKategori] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [listTahun, setListTahun] = useState<string[]>([]);

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

  return (
    <div
      className={`relative flex flex-col w-full max-w-[699px] h-[60px] rounded-[25px] transition-all duration-300 ${
        isScrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative z-20 flex items-center w-full h-[60px] bg-pr-900 border border-pr-700 rounded-[25px] py-[8px] px-[10px] shadow-2xl backdrop-blur-[40px]">
        
        {/* Search Row */}
        <form onSubmit={handleSearchSubmit} className="relative z-10 flex items-center w-full h-[40px] gap-2 sm:gap-[8px]">
          
          {/* Search Input */}
          <div className="flex items-center flex-1 sm:w-[447px] h-[40px] px-3 sm:px-[17px] bg-white/5 border border-white/10 rounded-[25px] backdrop-blur-[14px]">
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="w-4 h-4 sm:w-5 sm:h-5 p-0 mr-2.5 sm:mr-[19px] shrink-0 text-sec-900 hover:bg-transparent hover:text-sec-800 cursor-pointer"
              aria-label="Cari"
            >
              <Icon name="search" className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Cari peraturan yang ada di Indonesia..."
              className="w-full bg-transparent text-white text-[13px] sm:text-[14px] font-normal outline-none border-none placeholder:text-neu-300 focus:ring-0 leading-[20px]"
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="w-auto sm:w-[105px] h-[40px] min-h-[36px] bg-sec-900 text-neu-900 text-xs sm:text-[14px] font-bold rounded-[12px] px-3.5 sm:px-5 hover:bg-sec-800 transition-colors cursor-pointer"
          >
            Search
          </Button>

          {/* Filter Toggle Button */}
          <Button
            type="button"
            onClick={() => setIsSearchExpanded((prev) => !prev)}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 w-auto sm:w-[105px] h-[40px] min-h-[36px] text-xs sm:text-[14px] font-bold rounded-[12px] px-3 sm:px-5 transition-colors cursor-pointer ${
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
        className={`absolute top-0 left-0 w-full bg-pr-900 border border-pr-700 rounded-[25px] p-[16px] pt-[68px] shadow-2xl backdrop-blur-[40px] z-10 transition-all duration-300 ease-out overflow-hidden ${
          isSearchExpanded 
            ? 'opacity-100 max-h-[170px] translate-y-0 pointer-events-auto' 
            : 'opacity-0 max-h-[60px] -translate-y-2 pointer-events-none'
        }`}
      >
        <div className={`transition-opacity duration-300 delay-100 ${isSearchExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full text-left text-neu-200 text-[12px] font-semibold leading-[16px] tracking-[0.6%] mb-[10px]">
            Filter Cepat
          </div>

          <div className="flex w-full gap-[8px] sm:gap-[16px] justify-between">
            {/* Kategori */}
            <div className="flex-1 text-left min-w-0 relative">
              <div className="text-left text-neu-200 text-[12px] font-normal leading-[18px] mb-1">Kategori</div>
              <select 
                value={kategori} 
                onChange={(e) => setKategori(e.target.value)} 
                className="appearance-none flex items-center justify-between w-full h-[37px] px-2 sm:px-[18px] bg-white/5 border border-white/10 rounded-[12px] text-neu-300 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer outline-none focus:ring-0"
              >
                <option value="" className="bg-pr-900 text-white">Semua kategori</option>
                {listKategori.map(item => (
                  <option key={item.id} value={item.id} className="bg-pr-900 text-white">{item.nama}</option>
                ))}
              </select>
              <Icon name="chevron-down" className="absolute right-3 top-[26px] w-4 h-4 text-neu-300 pointer-events-none" />
            </div>

            {/* Tahun */}
            <div className="flex-1 text-left min-w-0 relative">
              <div className="text-left text-neu-200 text-[12px] font-normal leading-[18px] mb-1">Tahun</div>
              <select 
                value={tahun} 
                onChange={(e) => setTahun(e.target.value)} 
                className="appearance-none flex items-center justify-between w-full h-[37px] px-2 sm:px-[18px] bg-white/5 border border-white/10 rounded-[12px] text-neu-300 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer outline-none focus:ring-0"
              >
                <option value="" className="bg-pr-900 text-white">Semua Tahun</option>
                {listTahun.map(t => (
                  <option key={t} value={t} className="bg-pr-900 text-white">{t}</option>
                ))}
              </select>
              <Icon name="chevron-down" className="absolute right-3 top-[26px] w-4 h-4 text-neu-300 pointer-events-none" />
            </div>

            {/* Status */}
            <div className="flex-1 text-left min-w-0 relative">
              <div className="text-left text-neu-200 text-[12px] font-normal leading-[18px] mb-1">Status</div>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="appearance-none flex items-center justify-between w-full h-[37px] px-2 sm:px-[18px] bg-white/5 border border-white/10 rounded-[12px] text-neu-300 text-[12px] font-normal leading-[18px] text-left backdrop-blur-[14px] hover:bg-white/10 hover:text-white cursor-pointer outline-none focus:ring-0"
              >
                <option value="" className="bg-pr-900 text-white">Semua Status</option>
                {listStatus.map(item => (
                  <option key={item.id} value={item.id} className="bg-pr-900 text-white">{item.nama}</option>
                ))}
              </select>
              <Icon name="chevron-down" className="absolute right-3 top-[26px] w-4 h-4 text-neu-300 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div 
          className={`absolute left-4 text-red-500 text-sm font-medium drop-shadow-md transition-all duration-300 ease-out z-0 ${
            isSearchExpanded ? 'top-[170px]' : 'top-[68px]'
          }`}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
}
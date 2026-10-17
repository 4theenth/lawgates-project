import React, { useRef, useEffect } from 'react';
import { Filter, Check, Search } from 'lucide-react';

interface FilterPopoverProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onSelectAll?: () => void;
  onClearAll?: () => void;
  lokasiDaerahList?: string[];
  selectedLokasi?: string[];
  onChangeLokasi?: (lokasi: string) => void;
  onClearLokasi?: () => void;
  subjekList?: string[];
  selectedSubjek?: string[];
  onChangeSubjek?: (subjek: string) => void;
  onClearSubjek?: () => void;
}

export function FilterPopover({
  isOpen,
  onToggle,
  onClose,
  categories,
  selectedCategories,
  onToggleCategory,
  onSelectAll,
  onClearAll,
  lokasiDaerahList = [],
  selectedLokasi = [],
  onChangeLokasi,
  onClearLokasi,
  subjekList = [],
  selectedSubjek = [],
  onChangeSubjek,
  onClearSubjek,
}: FilterPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [searchLokasi, setSearchLokasi] = React.useState('');
  const [searchSubjek, setSearchSubjek] = React.useState('');

  // Tutup jika klik di luar popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const activeCount = selectedCategories.length + selectedLokasi.length + selectedSubjek.length;
  const hasSelection = activeCount > 0;

  const isPerdaSelected = selectedCategories.some(cat => 
    cat.toLowerCase().includes('perda') || cat.toLowerCase().includes('peraturan daerah')
  );

  const filteredLokasi = lokasiDaerahList
    .filter(lokasi => lokasi.toLowerCase().includes(searchLokasi.toLowerCase()))
    .sort((a, b) => {
      const aSelected = selectedLokasi.includes(a);
      const bSelected = selectedLokasi.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

  const filteredSubjek = subjekList
    .filter(subjek => subjek.toLowerCase().includes(searchSubjek.toLowerCase()))
    .sort((a, b) => {
      const aSelected = selectedSubjek.includes(a);
      const bSelected = selectedSubjek.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

  const isOnlyPerdaSelected = selectedCategories.length > 0 && selectedCategories.every(cat => 
    cat.toLowerCase().includes('perda') || cat.toLowerCase().includes('peraturan daerah')
  );

  return (
    <div className="relative inline-block shrink-0" ref={popoverRef}>
      {/* Tombol Filter Utama dengan Lebar Tetap & Badge Ruang Terproteksi (Zero Layout Shift) */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex items-center justify-center gap-1.5 w-[94px] h-[33px] rounded-[10px] border transition-colors shadow-2xs cursor-pointer text-[12px] font-medium shrink-0 select-none ${
          isOpen || hasSelection
            ? 'border-pr-900 bg-pr-50 text-pr-900 font-semibold'
            : 'border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black'
        }`}
      >
        <Filter className={`w-3.5 h-3.5 shrink-0 ${isOpen || hasSelection ? 'text-pr-900' : 'text-neu-500'}`} />
        <span>Filter</span>
        {/* Ruang badge selalu dipertahankan (invisible saat tidak ada filter) agar search bar tidak pernah goyang atau bergeser */}
        <span
          className={`w-4 h-4 rounded-full bg-pr-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0 transition-opacity ${
            hasSelection ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {activeCount}
        </span>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-neu-100 p-4 z-40 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-3 select-none">
            <span className="text-[12px] font-semibold text-neu-900">
              Kategori
            </span>
            <div className="flex items-center gap-2">
              {onClearAll && selectedCategories.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearAll();
                  }}
                  className="text-[11px] font-medium text-pr-900 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
              {onSelectAll && selectedCategories.length < categories.length && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAll();
                  }}
                  className="text-[11px] font-medium text-neu-500 hover:text-neu-900 cursor-pointer"
                >
                  Pilih semua
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            {categories.map((cat) => {
              const isChecked = selectedCategories.includes(cat);

              return (
                <label
                  key={cat}
                  className="flex items-center gap-2.5 cursor-pointer group select-none text-[12px] text-neu-700 hover:text-neu-900"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleCategory(cat);
                  }}
                >
                  {/* Custom Checkbox sesuai desain Gambar 2 */}
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-pr-900 text-white border border-pr-900'
                        : 'border border-neu-300 bg-white group-hover:border-neu-400'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <span className="leading-none">{cat}</span>
                </label>
              );
            })}
          </div>

          {/* Lokasi Daerah Selection (muncul jika Perda dicentang) */}
          {isPerdaSelected && (
            <>
              <div className="h-px bg-neu-100 w-full my-3" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-neu-900">
                    Daerah / Provinsi
                  </span>
                  {selectedLokasi.length > 0 && onClearLokasi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearLokasi();
                      }}
                      className="text-[11px] font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-neu-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full text-[12px] rounded-lg border border-neu-200 py-1.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-pr-500 focus:border-pr-500 transition-shadow"
                    placeholder="Cari daerah..."
                    value={searchLokasi}
                    onChange={(e) => setSearchLokasi(e.target.value)}
                  />
                </div>
                
                <div className="max-h-36 overflow-y-auto space-y-1 pr-1 custom-thin-scrollbar">
                  {filteredLokasi.length === 0 ? (
                    <div className="text-center py-2 text-[11px] text-neu-500">
                      Daerah tidak ditemukan
                    </div>
                  ) : (
                    filteredLokasi.map(lokasi => {
                      const isChecked = selectedLokasi.includes(lokasi);
                      return (
                        <label
                          key={lokasi}
                          className="flex items-start gap-2.5 cursor-pointer group select-none text-[12px] text-neu-700 hover:text-neu-900 px-1 py-1"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onChangeLokasi) onChangeLokasi(lokasi);
                          }}
                        >
                          <div
                            className={`w-4 h-4 mt-0.5 rounded flex-shrink-0 flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-pr-900 text-white border border-pr-900'
                                : 'border border-neu-300 bg-white group-hover:border-neu-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-[1.4] flex-1 break-words">{lokasi}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}

          {/* Subjek Selection (Sembunyikan jika HANYA Perda yang dicentang) */}
          {!isOnlyPerdaSelected && (
            <>
              <div className="h-px bg-neu-100 w-full my-3" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-neu-900">
                    Subjek
                  </span>
                  {selectedSubjek.length > 0 && onClearSubjek && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearSubjek();
                      }}
                      className="text-[11px] font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-neu-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full text-[12px] rounded-lg border border-neu-200 py-1.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-pr-500 focus:border-pr-500 transition-shadow"
                    placeholder="Cari subjek..."
                    value={searchSubjek}
                    onChange={(e) => setSearchSubjek(e.target.value)}
                  />
                </div>
                
                <div className="max-h-36 overflow-y-auto space-y-1 pr-1 custom-thin-scrollbar">
                  {filteredSubjek.length === 0 ? (
                    <div className="text-center py-2 text-[11px] text-neu-500">
                      Subjek tidak ditemukan
                    </div>
                  ) : (
                    filteredSubjek.map(subjek => {
                      const isChecked = selectedSubjek.includes(subjek);
                      return (
                        <label
                          key={subjek}
                          className="flex items-start gap-2.5 cursor-pointer group select-none text-[12px] text-neu-700 hover:text-neu-900 px-1 py-1"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onChangeSubjek) onChangeSubjek(subjek);
                          }}
                        >
                          <div
                            className={`w-4 h-4 mt-0.5 rounded flex-shrink-0 flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-pr-900 text-white border border-pr-900'
                                : 'border border-neu-300 bg-white group-hover:border-neu-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-[1.4] flex-1 break-words">{subjek}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

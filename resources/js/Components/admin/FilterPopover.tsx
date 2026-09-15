import React, { useRef, useEffect } from 'react';
import { Filter, Check } from 'lucide-react';

interface FilterPopoverProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onSelectAll?: () => void;
  onClearAll?: () => void;
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
}: FilterPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

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

  const activeCount = selectedCategories.length;
  const hasSelection = activeCount > 0;

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Tombol Filter Utama */}
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border transition-colors shadow-2xs cursor-pointer text-[12px] font-medium ${
          isOpen || hasSelection
            ? 'border-pr-900 bg-pr-50 text-pr-900'
            : 'border-neu-50 bg-white text-neu-700 hover:bg-gray-50 hover:text-black'
        }`}
      >
        <Filter className="w-3.5 h-3.5 text-neu-500" />
        <span>Filter</span>
        {hasSelection && (
          <span className="ml-1 w-4 h-4 rounded-full bg-pr-900 text-white text-[10px] flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-neu-100 p-4 z-40 animate-in fade-in zoom-in-95 duration-150">
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
        </div>
      )}
    </div>
  );
}

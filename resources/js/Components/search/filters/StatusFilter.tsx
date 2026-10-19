import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { FilterOption } from '@/types/peraturan';

interface StatusFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  statusLabel: string;
  statusOptions: FilterOption[];
  selectedStatus: string[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<string[]>>;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  isOpen,
  onToggle,
  statusLabel,
  statusOptions,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className={`relative ${isOpen ? 'z-40' : 'z-0'}`}>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Status
      </label>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full h-[46px] px-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
      >
        <span className="truncate">{statusLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Status */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 space-y-2.5 shadow-2xl z-50 max-h-60 overflow-y-auto no-scrollbar">
          {statusOptions.map((item) => {
            const isChecked = selectedStatus.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setSelectedStatus((prev) =>
                    prev.includes(item.value)
                      ? prev.filter((v) => v !== item.value)
                      : [...prev, item.value]
                  );
                }}
                className="w-full text-left flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-[#0B1A3A] border-[#0B1A3A] text-white'
                      : 'border-gray-300 bg-white group-hover:border-gray-400'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <span className="text-sm text-gray-700 select-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

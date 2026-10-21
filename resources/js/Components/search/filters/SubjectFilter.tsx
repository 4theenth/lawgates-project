import React from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { FilterOption } from '@/types/peraturan';

interface SubjectFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedSubjek: string[];
  setSelectedSubjek: React.Dispatch<React.SetStateAction<string[]>>;
  subjekSearchQuery: string;
  setSubjekSearchQuery: (query: string) => void;
  subjekOptions: FilterOption[];
}

export const SubjectFilter: React.FC<SubjectFilterProps> = ({
  isOpen,
  onToggle,
  selectedSubjek,
  setSelectedSubjek,
  subjekSearchQuery,
  setSubjekSearchQuery,
  subjekOptions,
}) => {
  return (
    <div className={`relative ${isOpen ? 'z-40' : 'z-0'}`}>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Subjek
      </label>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center w-full min-h-[46px] py-1.5 px-3.5 bg-white border border-gray-200 rounded-xl text-left hover:border-gray-300 focus:outline-none transition-all cursor-pointer"
      >
        <div className="flex-1 flex flex-wrap gap-1 items-center">
          {selectedSubjek.map((subjek) => (
            <span
              key={subjek}
              className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700 border border-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSubjek((prev) => prev.filter((s) => s !== subjek));
              }}
            >
              <X className="w-3 h-3 shrink-0 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              {subjek}
            </span>
          ))}
          {isOpen ? (
            <input
              type="text"
              value={subjekSearchQuery}
              onChange={(e) => setSubjekSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Cari subjek..."
              className="flex-1 min-w-[100px] bg-transparent border-none p-0 text-xs sm:text-sm text-gray-700 outline-none focus:ring-0 placeholder:text-gray-400"
              autoFocus
            />
          ) : (
            selectedSubjek.length === 0 && (
              <span className="text-xs sm:text-sm text-gray-700">Semua Subjek</span>
            )
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 shrink-0 ml-2 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-200 rounded-xl p-3 shadow-2xl z-50">
          <div className="space-y-2.5 max-h-60 overflow-y-auto no-scrollbar">
            {subjekOptions.length === 0 ? (
              <div className="text-center py-2 text-xs text-gray-400">
                Tidak ada subjek
              </div>
            ) : (
              subjekOptions.map((item) => {
                const isChecked = selectedSubjek.includes(item.value);
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setSelectedSubjek((prev) =>
                        prev.includes(item.value)
                          ? prev.filter((v) => v !== item.value)
                          : [...prev, item.value]
                      );
                    }}
                    className="w-full text-left flex items-start gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-[18px] h-[18px] mt-0.5 rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-sec-900 border-sec-900 text-white'
                          : 'border-gray-300 bg-white group-hover:border-gray-400'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                    <span className="text-sm text-gray-700 leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Ukuran input: 'default' untuk hero search, 'compact' untuk panel sempit seperti daftar isi */
  size?: 'default' | 'compact';
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Cari peraturan yang ada di Indonesia...',
  className = '',
  inputClassName = '',
  size = 'default',
}: SearchInputProps) {
  const isCompact = size === 'compact';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full ${isCompact ? '' : 'flex-1'} ${className}`}
    >
      <div className="relative flex items-center">
        <Search
          className={`absolute text-gray-400 pointer-events-none ${
            isCompact ? 'w-3.5 h-3.5 left-2.5' : 'w-4 h-4 sm:w-5 sm:h-5 left-4 sm:left-5'
          }`}
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-all ${
            isCompact
              ? 'rounded-lg py-1.5 pl-8 pr-8 text-[11px] focus:ring-1 focus:ring-gray-100'
              : 'rounded-full py-3.5 pl-11 sm:pl-12 pr-10 sm:pr-12 text-xs sm:text-sm focus:ring-2 focus:ring-gray-100 shadow-2xs'
          } ${inputClassName}`}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={`absolute rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer ${
              isCompact ? 'right-2 p-0.5' : 'right-4 sm:right-5 p-1'
            }`}
            title="Hapus pencarian"
          >
            <X className={isCompact ? 'w-3 h-3' : 'w-4 h-4'} />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchInput;

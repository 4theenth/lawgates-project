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
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Cari peraturan yang ada di Indonesia...',
  className = '',
  inputClassName = '',
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex-1 ${className}`}>
      <div className="relative flex items-center">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-4 sm:left-5 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white border border-gray-200 hover:border-gray-300 rounded-full py-3.5 pl-11 sm:pl-12 pr-10 sm:pr-12 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 shadow-2xs transition-all ${inputClassName}`}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 sm:right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchInput;

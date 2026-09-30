import React, { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import { KategoriHukum } from '@/services/kategoriService';

interface Option {
  value: string;
  label: string;
}

interface Props {
  kategoris: KategoriHukum[];
  value: string;
  onChange: (value: string) => void;
  detectedKategori?: string | null;
  disabled?: boolean;
}

export const CreatableKategoriSelect: React.FC<Props> = ({
  kategoris,
  value,
  onChange,
  detectedKategori,
  disabled = false,
}) => {
  // Convert kategoris to options
  const options: Option[] = useMemo(() => {
    return kategoris.map((k) => ({
      value: k.nama, // Use nama as value to keep backward compatibility with existing components
      label: k.nama,
    }));
  }, [kategoris]);

  // Find current selected option
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value) || (value ? { value, label: value } : null);
  }, [options, value]);

  const handleChange = (newValue: any) => {
    if (newValue) {
      onChange(newValue.value);
    } else {
      onChange('');
    }
  };

  const handleCreate = (inputValue: string) => {
    onChange(inputValue);
  };

  return (
    <div className="w-full">
      <label className="block font-sans text-[13px] font-medium text-neu-800 mb-1.5 flex items-center gap-2">
        Kategori Hukum
      </label>

      <CreatableSelect
        options={options}
        value={selectedOption}
        onChange={handleChange}
        onCreateOption={handleCreate}
        isDisabled={disabled}
        placeholder="Pilih atau ketik kategori baru..."
        formatCreateLabel={(inputValue) => `+ Tambah kategori "${inputValue}"`}
        noOptionsMessage={() => "Tidak ada kategori ditemukan"}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: '46px',
            borderRadius: '10px',
            borderColor: detectedKategori ? '#17a2b8' : state.isFocused ? '#374151' : '#E5E7EB',
            boxShadow: state.isFocused ? '0 0 0 1px #374151' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            '&:hover': {
              borderColor: state.isFocused ? '#374151' : '#D1D5DB',
            },
            backgroundColor: disabled ? '#F9FAFB' : '#FFFFFF',
            cursor: 'text',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
          }),
          valueContainer: (base) => ({
            ...base,
            padding: '2px 16px',
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: '14px',
            color: '#111827',
            fontWeight: 500,
          }),
          input: (base) => ({
            ...base,
            fontSize: '14px',
            color: '#111827',
            margin: 0,
            padding: 0,
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: '14px',
            color: '#9CA3AF',
          }),
          menu: (base) => ({
            ...base,
            borderRadius: '10px',
            border: '1px solid #F3F4F6',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            zIndex: 30,
            marginTop: '6px',
          }),
          menuList: (base) => ({
            ...base,
            padding: '6px',
          }),
          option: (base, state) => ({
            ...base,
            fontSize: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: state.isSelected 
              ? '#F9FAFB' 
              : state.isFocused 
                ? '#F9FAFB' 
                : 'transparent',
            color: state.isSelected ? '#111827' : '#374151',
            fontWeight: state.isSelected ? 600 : 400,
            cursor: 'pointer',
            '&:active': {
              backgroundColor: '#F3F4F6',
            },
          }),
        }}
      />
    </div>
  );
};

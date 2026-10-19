import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { FilterOption } from '@/types/peraturan';
import { CategoryFilter } from './CategoryFilter';
import { YearRangeFilter } from './YearRangeFilter';
import { StatusFilter } from './StatusFilter';
import { SubjectFilter } from './SubjectFilter';

interface SearchFilterSidebarProps {
  onClose: () => void;
  onReset: () => void;
  isResetSpinning: boolean;
  onAnimationEnd: () => void;
  onApply: () => void;
  activeDropdown: 'kategori' | 'tahun' | 'status' | 'lokasi' | 'subjek' | null;
  setActiveDropdown: React.Dispatch<
    React.SetStateAction<'kategori' | 'tahun' | 'status' | 'lokasi' | 'subjek' | null>
  >;
  // Kategori props
  kategoriLabel: string;
  kategoriOptions: FilterOption[];
  selectedKategori: string[];
  setSelectedKategori: React.Dispatch<React.SetStateAction<string[]>>;
  // Lokasi props (Flat List)
  allFlatLokasi: string[];
  selectedLokasi: string[];
  onToggleLokasi: (lokasi: string) => void;
  onRemoveLokasi: (lokasi: string) => void;
  // Tahun props
  tahunLabel: string;
  tahunDari: string;
  setTahunDari: (yr: string) => void;
  tahunSampai: string;
  setTahunSampai: (yr: string) => void;
  availableYears: string[];
  openYearSub: { dari: boolean; sampai: boolean };
  setOpenYearSub: React.Dispatch<React.SetStateAction<{ dari: boolean; sampai: boolean }>>;
  // Status props
  statusLabel: string;
  statusOptions: FilterOption[];
  selectedStatus: string[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<string[]>>;
  // Subjek props
  selectedSubjek: string[];
  setSelectedSubjek: React.Dispatch<React.SetStateAction<string[]>>;
  subjekSearchQuery: string;
  setSubjekSearchQuery: (query: string) => void;
  subjekOptions: FilterOption[];
}

export const SearchFilterSidebar: React.FC<SearchFilterSidebarProps> = ({
  onClose,
  onReset,
  isResetSpinning,
  onAnimationEnd,
  onApply,
  activeDropdown,
  setActiveDropdown,
  kategoriLabel,
  kategoriOptions,
  selectedKategori,
  setSelectedKategori,
  allFlatLokasi,
  selectedLokasi,
  onToggleLokasi,
  onRemoveLokasi,
  tahunLabel,
  tahunDari,
  setTahunDari,
  tahunSampai,
  setTahunSampai,
  availableYears,
  openYearSub,
  setOpenYearSub,
  statusLabel,
  statusOptions,
  selectedStatus,
  setSelectedStatus,
  selectedSubjek,
  setSelectedSubjek,
  subjekSearchQuery,
  setSubjekSearchQuery,
  subjekOptions,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
      {/* Header Filter: Tombol Filter (toggle hide) & Reset */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-bold text-gray-800 flex items-center gap-2 hover:text-pr-900 transition-colors cursor-pointer group"
          title="Klik untuk menyembunyikan filter"
        >
          <Filter className="w-4 h-4 text-gray-700 group-hover:text-pr-900 transition-colors" />
          <span>Filter</span>
        </button>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
          title="Reset Filter"
          type="button"
        >
          <RotateCcw
            className={`w-4 h-4 ${isResetSpinning ? 'animate-smooth-spin' : ''}`}
            onAnimationEnd={onAnimationEnd}
          />
        </button>
      </div>

      <div className="space-y-4">
        {/* 1. Filter Kategori (Floating Overlay Dropdown + Flat Location Picker) */}
        <CategoryFilter
          isOpen={activeDropdown === 'kategori'}
          onToggle={() =>
            setActiveDropdown((prev) => (prev === 'kategori' ? null : 'kategori'))
          }
          kategoriLabel={kategoriLabel}
          kategoriOptions={kategoriOptions}
          selectedKategori={selectedKategori}
          setSelectedKategori={setSelectedKategori}
          allFlatLokasi={allFlatLokasi}
          selectedLokasi={selectedLokasi}
          onToggleLokasi={onToggleLokasi}
          onRemoveLokasi={onRemoveLokasi}
        />

        {/* 2. Filter Tahun (Floating Overlay Dropdown) */}
        <YearRangeFilter
          isOpen={activeDropdown === 'tahun'}
          onToggle={() =>
            setActiveDropdown((prev) => (prev === 'tahun' ? null : 'tahun'))
          }
          tahunLabel={tahunLabel}
          tahunDari={tahunDari}
          setTahunDari={setTahunDari}
          tahunSampai={tahunSampai}
          setTahunSampai={setTahunSampai}
          availableYears={availableYears}
          openYearSub={openYearSub}
          setOpenYearSub={setOpenYearSub}
        />

        {/* 3. Filter Status (Floating Overlay Dropdown) */}
        <StatusFilter
          isOpen={activeDropdown === 'status'}
          onToggle={() =>
            setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))
          }
          statusLabel={statusLabel}
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {/* 4. Filter Subjek (Floating Overlay Dropdown) */}
        <SubjectFilter
          isOpen={activeDropdown === 'subjek'}
          onToggle={() =>
            setActiveDropdown((prev) => (prev === 'subjek' ? null : 'subjek'))
          }
          selectedSubjek={selectedSubjek}
          setSelectedSubjek={setSelectedSubjek}
          subjekSearchQuery={subjekSearchQuery}
          setSubjekSearchQuery={setSubjekSearchQuery}
          subjekOptions={subjekOptions}
        />

        {/* Tombol TERAPKAN */}
        <button
          onClick={onApply}
          type="button"
          className="w-full h-[46px] sm:h-[48px] bg-[#0B1A3A] hover:bg-[#07132B] text-white font-bold text-sm tracking-wider uppercase rounded-full mt-4 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
        >
          TERAPKAN
        </button>
      </div>
    </div>
  );
};

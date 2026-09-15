import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LegalDocumentCorrectionData } from './correctionParser';

interface CorrectionPembukaanSectionProps {
  pembukaan: LegalDocumentCorrectionData['pembukaan'];
  isOpenPembukaan: boolean;
  isOpenMenimbang: boolean;
  isOpenMengingat: boolean;
  isOpenMemutuskan: boolean;
  onTogglePembukaan: () => void;
  onToggleMenimbang: () => void;
  onToggleMengingat: () => void;
  onToggleMemutuskan: () => void;
  onChangePembukaan: (field: keyof LegalDocumentCorrectionData['pembukaan'], value: string) => void;
}

export function CorrectionPembukaanSection({
  pembukaan,
  isOpenPembukaan,
  isOpenMenimbang,
  isOpenMengingat,
  isOpenMemutuskan,
  onTogglePembukaan,
  onToggleMenimbang,
  onToggleMengingat,
  onToggleMemutuskan,
  onChangePembukaan,
}: CorrectionPembukaanSectionProps) {
  return (
    <div
      id="section-pembukaan"
      className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs space-y-4"
    >
      {/* Header Utama Pembukaan */}
      <button
        type="button"
        onClick={onTogglePembukaan}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <span className="text-[12px] font-bold text-pr-900 tracking-wide uppercase">
          PEMBUKAAN
        </span>
        {isOpenPembukaan ? (
          <ChevronUp className="w-4 h-4 text-neu-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neu-400" />
        )}
      </button>

      {isOpenPembukaan && (
        <div className="space-y-4 pt-1">
          {/* Judul & Sub Judul Pembukaan */}
          <div className="space-y-3">
            <input
              type="text"
              value={pembukaan.judul}
              onChange={(e) => onChangePembukaan('judul', e.target.value)}
              className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] font-semibold text-neu-900 focus:outline-none focus:bg-white focus:border-pr-900"
              placeholder="Judul Pembukaan..."
            />
            {pembukaan.subJudul !== undefined && (
              <textarea
                rows={2}
                value={pembukaan.subJudul}
                onChange={(e) => onChangePembukaan('subJudul', e.target.value)}
                className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-700 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900"
                placeholder="Diktum pembuka / tentang..."
              />
            )}
          </div>

          {/* Sub-accordion: Menimbang */}
          <div className="border-t border-neu-100 pt-3">
            <button
              type="button"
              onClick={onToggleMenimbang}
              className="w-full flex items-center justify-between py-1 cursor-pointer"
            >
              <span className="text-[12px] font-bold text-neu-800">Menimbang</span>
              {isOpenMenimbang ? (
                <ChevronUp className="w-4 h-4 text-neu-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neu-400" />
              )}
            </button>
            {isOpenMenimbang && (
              <div className="mt-2">
                <textarea
                  rows={4}
                  value={pembukaan.menimbang}
                  onChange={(e) => onChangePembukaan('menimbang', e.target.value)}
                  className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900"
                  placeholder="Isi konsiderans menimbang..."
                />
              </div>
            )}
          </div>

          {/* Sub-accordion: Mengingat */}
          <div className="border-t border-neu-100 pt-3">
            <button
              type="button"
              onClick={onToggleMengingat}
              className="w-full flex items-center justify-between py-1 cursor-pointer"
            >
              <span className="text-[12px] font-bold text-neu-800">Mengingat</span>
              {isOpenMengingat ? (
                <ChevronUp className="w-4 h-4 text-neu-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neu-400" />
              )}
            </button>
            {isOpenMengingat && (
              <div className="mt-2">
                <textarea
                  rows={4}
                  value={pembukaan.mengingat}
                  onChange={(e) => onChangePembukaan('mengingat', e.target.value)}
                  className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900"
                  placeholder="Dasar hukum mengingat..."
                />
              </div>
            )}
          </div>

          {/* Sub-accordion: Memutuskan */}
          <div className="border-t border-neu-100 pt-3">
            <button
              type="button"
              onClick={onToggleMemutuskan}
              className="w-full flex items-center justify-between py-1 cursor-pointer"
            >
              <span className="text-[12px] font-bold text-neu-800">Memutuskan / Menetapkan</span>
              {isOpenMemutuskan ? (
                <ChevronUp className="w-4 h-4 text-neu-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-neu-400" />
              )}
            </button>
            {isOpenMemutuskan && (
              <div className="mt-2">
                <textarea
                  rows={3}
                  value={pembukaan.memutuskan}
                  onChange={(e) => onChangePembukaan('memutuskan', e.target.value)}
                  className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900"
                  placeholder="Diktum memutuskan..."
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

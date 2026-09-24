import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LegalDocumentCorrectionData } from '../../admin/import/correctionParser';

interface ReadonlyPembukaanSectionProps {
  pembukaan: LegalDocumentCorrectionData['pembukaan'];
  isOpenPembukaan: boolean;
  isOpenMenimbang: boolean;
  isOpenMengingat: boolean;
  isOpenMemutuskan: boolean;
  isOpenMenetapkan: boolean;
  onTogglePembukaan: () => void;
  onToggleMenimbang: () => void;
  onToggleMengingat: () => void;
  onToggleMemutuskan: () => void;
  onToggleMenetapkan: () => void;
}

export function ReadonlyPembukaanSection({
  pembukaan,
  isOpenPembukaan,
  isOpenMenimbang,
  isOpenMengingat,
  isOpenMemutuskan,
  isOpenMenetapkan,
  onTogglePembukaan,
  onToggleMenimbang,
  onToggleMengingat,
  onToggleMemutuskan,
  onToggleMenetapkan,
}: ReadonlyPembukaanSectionProps) {
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
        <span className="text-[14px] font-bold text-pr-900 tracking-wide uppercase">
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
            {pembukaan.judul && (
              <div className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[14px] font-semibold text-neu-900">
                {pembukaan.judul}
              </div>
            )}
            
            {pembukaan.subJudul && (
              <div className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-100 text-[12px] text-neu-700 leading-relaxed whitespace-pre-line">
                {pembukaan.subJudul}
              </div>
            )}
          </div>

          {/* Sub-accordion: Menimbang */}
          {!!pembukaan.menimbang && (
            <div id="section-menimbang" className="border-t border-neu-100 pt-3">
              <button
                type="button"
                onClick={onToggleMenimbang}
                className="w-full flex items-center justify-between py-1 cursor-pointer"
              >
                <span className="text-[14px] font-bold text-neu-800">Menimbang</span>
                {isOpenMenimbang ? (
                  <ChevronUp className="w-4 h-4 text-neu-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neu-400" />
                )}
              </button>
              {isOpenMenimbang && pembukaan.menimbang && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line">
                    {pembukaan.menimbang}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-accordion: Mengingat */}
          {!!pembukaan.mengingat && (
            <div id="section-mengingat" className="border-t border-neu-100 pt-3">
              <button
                type="button"
                onClick={onToggleMengingat}
                className="w-full flex items-center justify-between py-1 cursor-pointer"
              >
                <span className="text-[14px] font-bold text-neu-800">Mengingat</span>
                {isOpenMengingat ? (
                  <ChevronUp className="w-4 h-4 text-neu-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neu-400" />
                )}
              </button>
              {isOpenMengingat && pembukaan.mengingat && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line">
                    {pembukaan.mengingat}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-accordion: Memutuskan */}
          {!!pembukaan.memutuskan && (
            <div id="section-memutuskan" className="border-t border-neu-100 pt-3">
              <button
                type="button"
                onClick={onToggleMemutuskan}
                className="w-full flex items-center justify-between py-1 cursor-pointer"
              >
                <span className="text-[14px] font-bold text-neu-800">Memutuskan</span>
                {isOpenMemutuskan ? (
                  <ChevronUp className="w-4 h-4 text-neu-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neu-400" />
                )}
              </button>
              {isOpenMemutuskan && pembukaan.memutuskan && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line">
                    {pembukaan.memutuskan}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-accordion: Menetapkan */}
          {!!(pembukaan as any).menetapkan && (
            <div id="section-menetapkan" className="border-t border-neu-100 pt-3">
              <button
                type="button"
                onClick={onToggleMenetapkan}
                className="w-full flex items-center justify-between py-1 cursor-pointer"
              >
                <span className="text-[14px] font-bold text-neu-800">Menetapkan</span>
                {isOpenMenetapkan ? (
                  <ChevronUp className="w-4 h-4 text-neu-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neu-400" />
                )}
              </button>
              {isOpenMenetapkan && (pembukaan as any).menetapkan && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-[#F8FAFC] border-l-4 border-l-amber-500 border border-neu-100 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line">
                    {(pembukaan as any).menetapkan}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

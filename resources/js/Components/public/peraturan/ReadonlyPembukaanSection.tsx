import React from 'react';
import { ChevronDown, ChevronUp, PencilLine } from 'lucide-react';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';
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
  onKoreksi?: (isi: string, label: string) => void;
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
  onKoreksi,
}: ReadonlyPembukaanSectionProps) {
  return (
    <div
      id="section-pembukaan"
      className="bg-white rounded-[20px] border border-neu-50 p-5  space-y-4"
    >
      {/* Header Utama Pembukaan */}
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onTogglePembukaan}
          className="flex items-center gap-2 flex-1 cursor-pointer text-left"
        >
          <span className="w-2 h-2 rounded-full bg-pr-700 shrink-0" />
          <span className="text-[14px] font-bold text-pr-900 tracking-wide uppercase">
            PEMBUKAAN
          </span>
        </button>
        <div className="flex items-center gap-2 shrink-0">
          {onKoreksi && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const isi = [pembukaan.judul, pembukaan.subJudul].filter(Boolean).join('\n\n');
                onKoreksi(isi, 'Pembukaan');
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neu-50 bg-white text-[12px] font-normal text-neu-900 transition-colors cursor-pointer"
              title="Koreksi teks Pembukaan"
            >
              <PencilLine className="w-3.5 h-3.5 text-neu-900" />
              Koreksi
            </button>
          )}
          <button
            type="button"
            onClick={onTogglePembukaan}
            className="p-1 cursor-pointer"
          >
            {isOpenPembukaan ? (
              <ChevronUp className="w-4 h-4 text-neu-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neu-400" />
            )}
          </button>
        </div>
      </div>

      {isOpenPembukaan && (
        <div className="space-y-4 pt-1">
          {/* Judul & Sub Judul Pembukaan */}
          <div className="space-y-3">
            {pembukaan.judul && (
              <div className="w-full p-3 rounded-[8px] bg-bg-900 border border-neu-50 text-[14px] font-semibold text-neu-900">
                {pembukaan.judul}
              </div>
            )}
            
            {pembukaan.subJudul && (
              <div className="w-full p-3 rounded-[8px] bg-bg-900 border border-neu-50 text-[12px] text-neu-700 leading-relaxed whitespace-pre-line text-justify">
                {pembukaan.subJudul}
              </div>
            )}
          </div>

          {/* Sub-accordion: Menimbang */}
          {!!pembukaan.menimbang && (
            <div id="section-menimbang" className="border-t border-neu-50 pt-3">
              <div className="w-full flex items-center justify-between py-1">
                <button
                  type="button"
                  onClick={onToggleMenimbang}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-pr-900 text-white text-xs font-semibold">
                    Menimbang
                  </span>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  {onKoreksi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onKoreksi(cleanOcrText(pembukaan.menimbang), 'Menimbang');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neu-50 bg-white text-[12px] font-normal text-neu-900 transition-colors cursor-pointer"
                      title="Koreksi bagian Menimbang"
                    >
                      <PencilLine className="w-3.5 h-3.5 text-neu-900" />
                      Koreksi
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onToggleMenimbang}
                    className="p-1 cursor-pointer"
                  >
                    {isOpenMenimbang ? (
                      <ChevronUp className="w-4 h-4 text-neu-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neu-400" />
                    )}
                  </button>
                </div>
              </div>
              {isOpenMenimbang && pembukaan.menimbang && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-bg-900 border-l-4 border-l-sec-900 border border-neu-50 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify">
                    {cleanOcrText(pembukaan.menimbang)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-accordion: Mengingat */}
          {!!pembukaan.mengingat && (
            <div id="section-mengingat" className="border-t border-neu-50 pt-3">
              <div className="w-full flex items-center justify-between py-1">
                <button
                  type="button"
                  onClick={onToggleMengingat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-pr-900 text-white text-xs font-semibold">
                    Mengingat
                  </span>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  {onKoreksi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onKoreksi(cleanOcrText(pembukaan.mengingat), 'Mengingat');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neu-50 bg-white text-[12px] font-normal text-neu-900 transition-colors cursor-pointer"
                      title="Koreksi bagian Mengingat"
                    >
                      <PencilLine className="w-3.5 h-3.5 text-neu-900" />
                      Koreksi
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onToggleMengingat}
                    className="p-1 cursor-pointer"
                  >
                    {isOpenMengingat ? (
                      <ChevronUp className="w-4 h-4 text-neu-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neu-400" />
                    )}
                  </button>
                </div>
              </div>
              {isOpenMengingat && pembukaan.mengingat && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-bg-900 border-l-4 border-l-sec-900 border border-neu-50 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify">
                    {cleanOcrText(pembukaan.mengingat)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-accordion: Memutuskan */}
          {!!pembukaan.memutuskan && (
            <div id="section-memutuskan" className="border-t border-neu-50 pt-3">
              <div className="w-full flex items-center justify-between py-1">
                <button
                  type="button"
                  onClick={onToggleMemutuskan}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-pr-900 text-white text-xs font-semibold">
                    Memutuskan
                  </span>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  {onKoreksi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onKoreksi(cleanOcrText(pembukaan.memutuskan), 'Memutuskan');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neu-50 bg-white text-[12px] font-normal text-neu-900 transition-colors cursor-pointer"
                      title="Koreksi bagian Memutuskan"
                    >
                      <PencilLine className="w-3.5 h-3.5 text-neu-900" />
                      Koreksi
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onToggleMemutuskan}
                    className="p-1 cursor-pointer"
                  >
                    {isOpenMemutuskan ? (
                      <ChevronUp className="w-4 h-4 text-neu-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neu-400" />
                    )}
                  </button>
                </div>
              </div>
              {isOpenMemutuskan && pembukaan.memutuskan && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-bg-900 border-l-4 border-l-sec-900 border border-neu-50 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify">
                    {cleanOcrText(pembukaan.memutuskan)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-accordion: Menetapkan */}
          {!!(pembukaan as any).menetapkan && (
            <div id="section-menetapkan" className="border-t border-neu-50 pt-3">
              <div className="w-full flex items-center justify-between py-1">
                <button
                  type="button"
                  onClick={onToggleMenetapkan}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-pr-900 text-white text-xs font-semibold">
                    Menetapkan
                  </span>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  {onKoreksi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onKoreksi((pembukaan as any).menetapkan, 'Menetapkan');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-neu-50 bg-white text-[12px] font-normal text-neu-900 transition-colors cursor-pointer"
                      title="Koreksi bagian Menetapkan"
                    >
                      <PencilLine className="w-3.5 h-3.5 text-neu-900" />
                      Koreksi
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onToggleMenetapkan}
                    className="p-1 cursor-pointer"
                  >
                    {isOpenMenetapkan ? (
                      <ChevronUp className="w-4 h-4 text-neu-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neu-400" />
                    )}
                  </button>
                </div>
              </div>
              {isOpenMenetapkan && (pembukaan as any).menetapkan && (
                <div className="mt-2">
                  <div className="w-full p-3.5 rounded-[8px] bg-bg-900 border-l-4 border-l-sec-900 border border-neu-50 text-[12px] text-neu-800 leading-relaxed whitespace-pre-line text-justify">
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

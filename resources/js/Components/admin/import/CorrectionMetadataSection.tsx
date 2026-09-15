import React, { useRef } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { LegalDocumentCorrectionData } from './correctionParser';

interface CorrectionMetadataSectionProps {
  metadata: LegalDocumentCorrectionData['metadata'];
  onChangeMetadata: (field: keyof LegalDocumentCorrectionData['metadata'], value: string) => void;
}

export function CorrectionMetadataSection({
  metadata,
  onChangeMetadata,
}: CorrectionMetadataSectionProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Helper konversi format teks (e.g. "23-08-1945" atau "18 Agustus 2023") ke "YYYY-MM-DD"
  const getIsoDate = (val?: string) => {
    if (!val) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    const dmy = val.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (dmy) {
      const [, d, m, y] = dmy;
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    const monthMap: Record<string, string> = {
      januari: '01', februari: '02', maret: '03', april: '04',
      mei: '05', juni: '06', juli: '07', agustus: '08',
      september: '09', oktober: '10', november: '11', desember: '12',
    };
    const indMatch = val.match(/^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/);
    if (indMatch) {
      const [, d, mName, y] = indMatch;
      const m = monthMap[mName.toLowerCase()];
      if (m) {
        return `${y}-${m}-${d.padStart(2, '0')}`;
      }
    }
    return '';
  };

  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      onChangeMetadata('tanggalDitetapkan', '');
      return;
    }
    const [y, m, d] = val.split('-');
    if (y && m && d) {
      onChangeMetadata('tanggalDitetapkan', `${d}-${m}-${y}`);
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      try {
        if ('showPicker' in HTMLInputElement.prototype) {
          dateInputRef.current.showPicker();
        } else {
          dateInputRef.current.focus();
        }
      } catch {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs space-y-4">
      {/* 1. Pemrakarsa */}
      <div>
        <label className="block text-[13px] font-normal text-neu-700 mb-2">
          Pemrakarsa
        </label>
        <input
          type="text"
          value={metadata.pemrakarsa || ''}
          onChange={(e) => onChangeMetadata('pemrakarsa', e.target.value)}
          className="w-full px-4 py-2.5 text-[14px] rounded-[14px] border border-neu-200 bg-white text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all"
          placeholder="Pemerintah Pusat"
        />
      </div>

      {/* 2. Tanggal Ditetapkan - Kalender Dropdown Interaktif */}
      <div>
        <label className="block text-[13px] font-normal text-neu-700 mb-2">
          Tanggal Ditetapkan
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={metadata.tanggalDitetapkan || ''}
            onChange={(e) => onChangeMetadata('tanggalDitetapkan', e.target.value)}
            className="w-full px-4 py-2.5 text-[14px] rounded-[14px] border border-neu-200 bg-white text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all pr-12 cursor-pointer"
            placeholder="23-08-1945"
            onClick={openDatePicker}
          />
          <button
            type="button"
            onClick={openDatePicker}
            title="Buka kalender"
            className="absolute right-3 p-1 text-neu-500 hover:text-pr-900 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Calendar className="w-4 h-4 stroke-[2]" />
            <ChevronDown className="w-3.5 h-3.5 text-neu-400 stroke-[2]" />
          </button>
          <input
            ref={dateInputRef}
            type="date"
            value={getIsoDate(metadata.tanggalDitetapkan)}
            onChange={handleNativeDateChange}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* 3. Tempat Penetapan */}
      <div>
        <label className="block text-[13px] font-normal text-neu-700 mb-2">
          Tempat Penetapan
        </label>
        <input
          type="text"
          value={metadata.tempatPenetapan || ''}
          onChange={(e) => onChangeMetadata('tempatPenetapan', e.target.value)}
          className="w-full px-4 py-2.5 text-[14px] rounded-[14px] border border-neu-200 bg-white text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all"
          placeholder="Jakarta"
        />
      </div>
    </div>
  );
}

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { LegalDocumentCorrectionData } from './correctionParser';

interface CorrectionMetadataSectionProps {
  metadata: LegalDocumentCorrectionData['metadata'];
  onChangeMetadata: (field: keyof LegalDocumentCorrectionData['metadata'], value: string) => void;
}

export function CorrectionMetadataSection({
  metadata,
  onChangeMetadata,
}: CorrectionMetadataSectionProps) {
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

      {/* 2. Tanggal Ditetapkan */}
      <div>
        <label className="block text-[13px] font-normal text-neu-700 mb-2">
          Tanggal Ditetapkan
        </label>
        <div className="relative">
          <input
            type="text"
            value={metadata.tanggalDitetapkan || ''}
            onChange={(e) => onChangeMetadata('tanggalDitetapkan', e.target.value)}
            className="w-full px-4 py-2.5 text-[14px] rounded-[14px] border border-neu-200 bg-white text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all pr-10"
            placeholder="23-08-1945"
          />
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neu-400 pointer-events-none stroke-[2]" />
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

import React from 'react';
import { FileText, Tag } from 'lucide-react';
import { AutoResizeTextarea } from './AutoResizeTextarea';

interface CorrectionHeaderSectionProps {
  standarId: string;
  judul: string;
  isOpenStandarId?: boolean;
  isOpenJudul?: boolean;
  onToggleStandarId?: () => void;
  onToggleJudul?: () => void;
  onChangeStandarId: (value: string) => void;
  onChangeJudul: (value: string) => void;
}

export function CorrectionHeaderSection({
  standarId,
  judul,
  onChangeStandarId,
  onChangeJudul,
}: CorrectionHeaderSectionProps) {
  return (
    <div className="bg-white rounded-[20px] border border-neu-100 p-5 shadow-2xs space-y-4">
      {/* Visual Header Summary Banner */}
      <div className="flex items-center justify-between border-b border-neu-100 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pr-200 bg-pr-50 text-[11px] font-bold text-pr-900 tracking-wider uppercase">
            <FileText className="w-3.5 h-3.5" />
            Mode Edit Header Dokumen
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
            Berlaku
          </span>
        </div>
        <span className="text-[11px] text-neu-500 font-medium">
          Standar ID & Judul Peraturan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Standar ID Editor */}
        <div className="md:col-span-1 space-y-1.5">
          <label className="text-[11px] font-bold text-pr-900 tracking-wide uppercase flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-pr-700" />
            <span>STANDAR ID</span>
          </label>
          <input
            type="text"
            value={standarId}
            onChange={(e) => onChangeStandarId(e.target.value)}
            className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-200 text-[12px] font-semibold text-neu-900 focus:outline-none focus:bg-white focus:border-pr-900 transition-all"
            placeholder="e.g. UU_No_6_2023"
          />
        </div>

        {/* Judul Peraturan Editor */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[11px] font-bold text-pr-900 tracking-wide uppercase flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-pr-700" />
            <span>JUDUL PERATURAN</span>
          </label>
          <AutoResizeTextarea
            enableAutoFormat
            rows={2}
            value={judul}
            onChange={(e) => onChangeJudul(e.target.value)}
            className="w-full p-3 rounded-[8px] bg-[#F8FAFC] border border-neu-200 text-[12px] font-bold text-neu-900 leading-relaxed focus:outline-none focus:bg-white focus:border-pr-900 transition-all font-sans"
            placeholder="Masukkan judul peraturan..."
          />
        </div>
      </div>
    </div>
  );
}


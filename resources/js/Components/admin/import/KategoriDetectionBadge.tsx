import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

interface Props {
  detected: string | null;
  isNew: boolean;
}

export const KategoriDetectionBadge: React.FC<Props> = ({ detected, isNew }) => {
  if (!detected) return null;
  
  return (
    <div className={`flex items-start gap-3 p-3.5 mt-4 rounded-xl border ${
      isNew 
        ? 'bg-sky-50 border-sky-200' 
        : 'bg-emerald-50 border-emerald-200'
    } animate-in fade-in duration-200`}>
      <div className="shrink-0 mt-0.5">
        {isNew ? (
          <Info className="w-5 h-5 text-sky-600" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        )}
      </div>
      <div>
        <p className={`font-sans text-[13px] font-medium ${
          isNew ? 'text-sky-900' : 'text-emerald-900'
        }`}>
          {isNew ? 'Kategori Baru Terdeteksi' : 'Kategori Ditemukan'}
        </p>
        <p className={`font-sans text-[12.5px] mt-1 ${
          isNew ? 'text-sky-700' : 'text-emerald-700'
        }`}>
          {isNew ? (
            <>
              Sistem menemukan kategori <strong>"{detected}"</strong> dari file JSON. 
              Kategori ini belum ada di database dan akan otomatis dibuat saat Anda memulai import.
            </>
          ) : (
            <>
              Sistem menemukan kategori <strong>"{detected}"</strong> dari file JSON yang cocok dengan database.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

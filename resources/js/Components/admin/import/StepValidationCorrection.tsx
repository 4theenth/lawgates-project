import React from 'react';
import { Scale, Pencil, Trash2 } from 'lucide-react';
import { IconButton } from '@/Components/common/IconButton';

export interface ValidatedFileItem {
  id: string;
  name: string;
  category?: string;
  title?: string;
  rawFile?: File;
  parsedData?: any;
  correctionData?: any;
}

interface StepValidationCorrectionProps {
  files: ValidatedFileItem[];
  onEditFile: (file: ValidatedFileItem) => void;
  onRemoveFile: (id: string) => void;
}

export function StepValidationCorrection({
  files,
  onEditFile,
  onRemoveFile,
}: StepValidationCorrectionProps) {
  const successCount = files.length;

  return (
    <div className="flex-1 min-w-0 bg-white rounded-[16px] border border-neu-100 p-6 shadow-2xs">
      {/* Header Validasi & Koreksi Data */}
      <div className="mb-5">
        <h3 className="font-sans text-[14px] font-semibold text-neu-900 leading-tight">
          {successCount} File Berhasil di Impor
        </h3>
        <p className="font-sans text-[12px] text-neu-500 mt-1">
          Silahkan periksa data yang sudah berhasil di impor
        </p>
      </div>

      {/* Daftar Berkas Hasil Ekstraksi Sesuai Gambar Figma */}
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3.5 rounded-[10px] bg-neu-50/40 border border-neu-50 hover:bg-neu-50 transition-colors gap-3 w-full min-w-0"
          >
            {/* Sisi Kiri: Ikon Timbangan Hukum & Nama Berkas */}
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neu-700 shrink-0 mt-0.5">
                <Scale className="w-5 h-5 text-neu-700 stroke-[1.75]" />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className="font-sans text-[13px] font-medium text-neu-900 break-words [overflow-wrap:anywhere] leading-snug block"
                  title={file.title || file.name}
                >
                  {file.title || file.name}
                </span>
                {file.title && file.title !== file.name && (
                  <span
                    className="font-sans text-[11px] text-neu-500 break-words [overflow-wrap:anywhere] block mt-0.5"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                )}
              </div>
            </div>

            {/* Sisi Kanan: Tombol Edit (Pensil) & Tombol Hapus (Tong Sampah Merah) */}
            <div className="flex items-center gap-1.5 shrink-0 ml-2 mt-0.5">
              <IconButton
                icon={<Pencil className="w-4 h-4 text-neu-500" />}
                variant="ghost"
                size="sm"
                onClick={() => onEditFile(file)}
                title="Koreksi / Periksa detail data"
              />

              <IconButton
                icon={<Trash2 className="w-4 h-4 text-dan-800" />}
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile(file.id)}
                title="Hapus berkas ini"
                className="hover:bg-dan-50"
              />
            </div>
          </div>
        ))}

        {files.length === 0 && (
          <div className="py-12 text-center text-neu-400 text-[12px]">
            Semua berkas telah dihapus atau belum ada berkas yang berhasil diimpor.
          </div>
        )}
      </div>
    </div>
  );
}

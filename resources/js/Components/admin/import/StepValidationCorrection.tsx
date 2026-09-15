import React from 'react';
import { Scale, Pencil, Trash2 } from 'lucide-react';

export interface ValidatedFileItem {
  id: string;
  name: string;
  category?: string;
  title?: string;
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
    <div className="flex-1 w-full bg-white rounded-[16px] border border-neu-100 p-6 shadow-2xs">
      {/* Header Validasi & Koreksi Data */}
      <div className="mb-5">
        <h3 className="font-sans text-[15px] font-semibold text-neu-900 leading-tight">
          {successCount} File Berhasil di Impor
        </h3>
        <p className="font-sans text-[13px] text-neu-500 mt-1">
          Silahkan periksa data yang sudah berhasil di impor
        </p>
      </div>

      {/* Daftar Berkas Hasil Ekstraksi Sesuai Gambar Figma */}
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3.5 rounded-[10px] bg-[#F8FAFC] border border-neu-50 hover:bg-gray-100/70 transition-colors"
          >
            {/* Sisi Kiri: Ikon Timbangan Hukum & Nama Berkas */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-neu-700">
                <Scale className="w-5 h-5 text-neu-700 stroke-[1.75]" />
              </div>
              <span className="font-sans text-[13px] font-medium text-neu-900">
                {file.name}
              </span>
            </div>

            {/* Sisi Kanan: Tombol Edit (Pensil) & Tombol Hapus (Tong Sampah Merah) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEditFile(file)}
                className="p-1.5 text-neu-400 hover:text-neu-800 transition-colors rounded-lg hover:bg-gray-200/50 cursor-pointer"
                title="Koreksi / Periksa detail data"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="p-1.5 text-[#E53E3E] hover:text-red-700 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                title="Hapus berkas ini"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {files.length === 0 && (
          <div className="py-12 text-center text-neu-400 text-[13px]">
            Semua berkas telah dihapus atau belum ada berkas yang berhasil diimpor.
          </div>
        )}
      </div>
    </div>
  );
}

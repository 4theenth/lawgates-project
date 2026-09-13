import React from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

export type FileExtractionStatus = 'selesai' | 'memproses' | 'gagal';

export interface ProcessedFileItem {
  id: string;
  name: string;
  status: FileExtractionStatus;
  progressPercent: number;
}

interface StepProcessExtractionProps {
  files: ProcessedFileItem[];
  onFinishOrNext?: () => void;
  onCancel?: () => void;
}

export function StepProcessExtraction({
  files,
  onFinishOrNext,
  onCancel,
}: StepProcessExtractionProps) {
  // Hitung statistik progres
  const totalFiles = files.length;
  const completedFiles = files.filter((f) => f.status === 'selesai').length;
  const failedFiles = files.filter((f) => f.status === 'gagal').length;
  const processingFiles = files.filter((f) => f.status === 'memproses').length;

  // Persentase keseluruhan rata-rata
  const overallPercent =
    totalFiles > 0
      ? Math.round(
          files.reduce((acc, f) => acc + f.progressPercent, 0) / totalFiles
        )
      : 0;

  // Parameter Circular Progress SVG
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercent / 100) * circumference;

  return (
    <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Kolom 1 & 2: Detail Proses Berjalan (Card Tengah) */}
      <div className="lg:col-span-2 bg-white rounded-[16px] border border-neu-100 p-6 shadow-2xs">
        <h3 className="font-sans text-[15px] font-semibold text-neu-900 mb-6">
          Detail Proses Berjalan
        </h3>

        <div className="space-y-5">
          {files.map((file) => {
            const isSelesai = file.status === 'selesai';
            const isMemproses = file.status === 'memproses';
            const isGagal = file.status === 'gagal';

            return (
              <div key={file.id} className="space-y-2">
                {/* Baris Informasi File & Status */}
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2.5">
                    {isSelesai && (
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    )}
                    {isMemproses && (
                      <Loader2 className="w-4 h-4 text-pr-900 animate-spin" />
                    )}
                    {isGagal && (
                      <XCircle className="w-4 h-4 text-[#E53E3E]" />
                    )}
                    <span className="font-medium text-neu-900">
                      {file.name}
                    </span>
                  </div>

                  {/* Status Badge Text */}
                  <div>
                    {isSelesai && (
                      <span className="text-[12px] font-medium text-[#2E7D32]">
                        Selesai
                      </span>
                    )}
                    {isMemproses && (
                      <span className="text-[12px] font-medium text-neu-600">
                        Memproses
                      </span>
                    )}
                    {isGagal && (
                      <span className="text-[12px] font-medium text-[#E53E3E]">
                        Gagal
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar Item */}
                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSelesai
                        ? 'bg-[#2E7D32]'
                        : isGagal
                        ? 'bg-[#E53E3E]'
                        : 'bg-pr-900'
                    }`}
                    style={{ width: `${file.progressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kolom 3: Progress Keseluruhan (Card Kanan Sesuai Gambar 5) */}
      <div className="bg-white rounded-[16px] border border-neu-100 p-6 shadow-2xs flex flex-col items-center text-center">
        <h3 className="font-sans text-[14px] font-semibold text-neu-900 mb-6 self-start">
          Progress Keseluruhan
        </h3>

        {/* Circular Gauge Progress SVG */}
        <div className="relative my-2">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#E2E8F0"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress Value Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#0A1C3E"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Text Persentase di Tengah Lingkaran */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-sans text-[26px] font-bold text-neu-900 leading-none">
              {overallPercent}%
            </span>
            <span className="font-sans text-[11px] text-neu-500 font-normal mt-1">
              Proses
            </span>
          </div>
        </div>

        {/* Keterangan Status File Selesai & Gagal */}
        <p className="font-sans text-[12px] text-neu-600 mt-6 leading-relaxed max-w-[220px]">
          {completedFiles} dari {totalFiles} file selesai diproses
          {failedFiles > 0 && ` & ${failedFiles} File gagal`}
        </p>

        {/* Tombol Aksi Transisi */}
        <div className="w-full mt-6 pt-4 border-t border-neu-50 flex flex-col gap-2">
          {processingFiles > 0 ? (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 px-3 text-[12px] font-medium text-neu-600 hover:text-red-600 hover:bg-red-50 rounded-[10px] transition-colors cursor-pointer"
            >
              Batalkan Proses
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinishOrNext}
              className="w-full py-2.5 px-4 text-[13px] font-medium bg-pr-900 text-white hover:bg-pr-800 rounded-[10px] transition-colors shadow-2xs cursor-pointer"
            >
              Lanjutkan ke Validasi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

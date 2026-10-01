import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: number;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Unggah Berkas JSON OCR',
    description: 'Masukkan 1–10 file JSON hasil OCR dan pilih kategori hukum.',
  },
  {
    id: 2,
    title: 'Proses Import & Ekstraksi',
    description: 'Sistem sedang memproses dan mengekstrak data JSON Anda.',
  },
  {
    id: 3,
    title: 'Validasi & Koreksi Data',
    description: 'Periksa hasil ekstraksi. Klik data untuk mengoreksi teks dalam mode spreadsheet.',
  },
  {
    id: 4,
    title: 'Simpan & Publikasi',
    description: 'Konfirmasi dan simpan data yang telah dikoreksi',
  },
];

interface ImportStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ImportStepper({ currentStep, onStepClick }: ImportStepperProps) {
  return (
    <div className="w-full md:w-[300px] lg:w-[320px] shrink-0 bg-white rounded-[16px] border border-neu-100 p-5 shadow-2xs">
      {/* Header Stepper */}
      <div className="flex items-center justify-between pb-4 border-b border-neu-50 mb-5">
        <span className="font-sans text-[12px] font-bold uppercase tracking-wider text-neu-900">
          PROGRES IMPORT DATA
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-neu-700">
          Langkah {currentStep} / 4
        </span>
      </div>

      {/* Daftar Langkah (Vertical Stepper) */}
      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.id} className="relative flex items-start gap-3.5">
              {/* Kolom Nomor & Garis Penghubung */}
              <div className="flex flex-col items-center">
                <div
                  onClick={() => onStepClick && isCompleted && onStepClick(step.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all ${
                    isCompleted
                      ? 'bg-pr-900 text-white cursor-pointer'
                      : isActive
                      ? 'bg-pr-900 text-white ring-4 ring-pr-50'
                      : 'border border-neu-200 bg-white text-neu-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    step.id
                  )}
                </div>

                {!isLast && (
                  <div
                    className={`w-[1.5px] h-12 my-1 transition-colors ${
                      isCompleted ? 'bg-pr-900' : 'bg-neu-100'
                    }`}
                  />
                )}
              </div>

              {/* Konten Teks Langkah */}
              <div className="pt-0.5">
                <h3
                  className={`font-sans text-[13px] font-semibold leading-tight ${
                    isActive
                      ? 'text-neu-900'
                      : isCompleted
                      ? 'text-neu-800'
                      : 'text-neu-500'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-[11px] font-normal leading-[16px] text-neu-500 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

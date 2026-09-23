import React, { useState, useRef } from 'react';
import { UploadCloud, ChevronDown, FileCode2, XCircle, AlertCircle } from 'lucide-react';

export interface UploadedJsonFile {
  id: string;
  name: string;
  sizeKb: number;
  rawFile?: File;
  parsedData?: any;
  error?: string;
}

interface StepUploadJsonProps {
  files: UploadedJsonFile[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryOptions: string[];
  onStartImport: () => void;
  errorMessage?: string | null;
  onClearError?: () => void;
}

export function StepUploadJson({
  files,
  onAddFiles,
  onRemoveFile,
  selectedCategory,
  onCategoryChange,
  categoryOptions,
  onStartImport,
  errorMessage,
  onClearError,
}: StepUploadJsonProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const maxFiles = 10;
  const currentCount = files.length;
  const remainingSlots = maxFiles - currentCount;
  const isFull = currentCount >= maxFiles;
  const hasError = files.some((f) => Boolean(f.error || f.sizeKb > 10 * 1024));
  const isImportDisabled = hasError || files.length === 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onClearError) onClearError();
      const selected = Array.from(e.target.files);
      onAddFiles(selected);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (onClearError) onClearError();
      const dropped = Array.from(e.dataTransfer.files);
      onAddFiles(dropped);
    }
  };

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* Input File Tersembunyi */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* KONDISI 1: Belum Ada File yang Diunggah (Empty Dropzone) */}
      {currentCount === 0 ? (
        <div className="flex flex-col w-full">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full min-h-[380px] rounded-[16px] border-2 border-dashed transition-all flex flex-col items-center justify-center p-12 text-center cursor-pointer bg-white ${
              isDragging
                ? 'border-pr-900 bg-pr-50/40'
                : errorMessage
                ? 'border-dan-800 bg-dan-50/20'
                : 'border-neu-200 hover:border-neu-300'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-gray-50 border border-neu-100 flex items-center justify-center text-neu-600 mb-4 shadow-2xs">
              <UploadCloud className="w-8 h-8 stroke-[1.75]" />
            </div>

            <h3 className="font-sans text-[16px] font-semibold text-neu-900">
              Import file JSON hasil OCR di sini
            </h3>
            <p className="font-sans text-[13px] text-neu-500 mt-1">
              Silahkan Tarik dan lepas file di sini, atau klik untuk mengunggah.
            </p>
            <p className="font-sans text-[12px] text-neu-400 mt-1">
              Mendukung 1 hingga 10 file JSON (Maks. 10 MB/file).
            </p>
          </div>

          {/* Pesan Error Inline (Sesuai AC 3) */}
          {errorMessage && (
            <div className="flex items-center gap-2 mt-3 px-3.5 py-2.5 bg-dan-50 border border-dan-200 rounded-[10px] text-dan-900 text-[13px] animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-dan-800 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}
        </div>
      ) : (
        /* KONDISI 2: Sudah Ada File Terpilih (1-10 File) */
        <div className="space-y-6 w-full min-w-0">
          {/* Dropdown Kategori Hukum */}
          <div className="relative w-full">
            <label className="block font-sans text-[13px] font-medium text-neu-800 mb-1.5">
              Kategori Hukum
            </label>

            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-[10px] border border-neu-200 bg-white hover:border-neu-300 transition-colors text-left shadow-2xs cursor-pointer"
            >
              <span className="text-[14px] text-neu-900 font-medium">
                {selectedCategory}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neu-400 transition-transform ${
                  isCategoryOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Pilihan Kategori */}
            {isCategoryOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-[10px] border border-neu-100 shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onCategoryChange(opt);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-[12px] transition-colors cursor-pointer ${
                      opt === selectedCategory
                        ? 'font-semibold text-pr-900 bg-gray-50'
                        : 'text-neu-700 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pesan Error Inline (Sesuai AC 3) */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3.5 bg-dan-50 border border-dan-200 rounded-[10px] text-dan-900 text-[13px] animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-dan-800 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Kartu Daftar File Terpilih */}
          <div className="bg-white rounded-[16px] border border-neu-100 p-5 shadow-2xs w-full">
            {/* Header Status File */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-[13px] font-semibold text-neu-900">
                File Terpilih ({currentCount}/{maxFiles})
              </span>

              {isFull ? (
                <span className="font-sans text-[12px] font-medium text-suc-900">
                  Siap di import
                </span>
              ) : (
                <div className="text-right">
                  <span className="font-sans text-[12px] font-medium text-dan-800 block">
                    Masih ada {remainingSlots} slot file
                  </span>
                  <span className="font-sans text-[11px] text-neu-400 block">
                    Klik "Tambah File" untuk menambahkan file
                  </span>
                </div>
              )}
            </div>

            {/* List Berkas JSON */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {files.map((file) => {
                const isError = Boolean(file.error || file.sizeKb > 10 * 1024);
                const displaySize =
                  file.sizeKb >= 10 * 1024
                    ? `${Math.round(file.sizeKb / 1024)} MB`
                    : `${file.sizeKb} KB`;

                return (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-3.5 rounded-[12px] bg-neu-50/50 transition-colors ${
                      isError
                        ? 'border border-dan-800'
                        : 'border border-transparent hover:border-neu-100'
                    }`}
                  >
                    {/* Ikon & Nama File */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <FileCode2 className="w-6 h-6 text-pr-900 shrink-0 stroke-[1.75]" />
                      <div className="min-w-0">
                        <h4 className="font-sans text-[13px] font-medium text-neu-900 leading-tight truncate">
                          {file.name}
                        </h4>
                        <div className="font-sans text-[11px] text-neu-500 mt-1 flex items-center gap-2">
                          <span>{displaySize}</span>
                          {isError && (
                            <span className="text-dan-800 font-medium">
                              {file.error || 'Ukuran file melebihi 10MB!'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tombol Hapus File (X Merah) */}
                    <button
                      type="button"
                      onClick={() => onRemoveFile(file.id)}
                      className="text-dan-800 hover:text-dan-900 transition-colors p-1 cursor-pointer shrink-0"
                      title="Hapus file ini"
                    >
                      <XCircle className="w-5 h-5 stroke-[1.75]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tombol Mulai Import di Kanan Bawah */}
          <div className="flex justify-end pt-2 w-full">
            <button
              type="button"
              disabled={isImportDisabled}
              onClick={onStartImport}
              className={`px-6 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors shadow-2xs inline-flex items-center gap-2 ${
                isImportDisabled
                  ? 'bg-pr-500 text-white cursor-not-allowed opacity-90'
                  : 'bg-pr-900 text-white hover:bg-pr-800 cursor-pointer'
              }`}
            >
              <span>Mulai Import</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { CloudDownload, Folder, Database, FileCode2, XCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { CreatableKategoriSelect } from './CreatableKategoriSelect';
import { KategoriDetectionBadge } from './KategoriDetectionBadge';
import { KategoriHukum } from '@/services/kategoriService';
import { MinioCategoryTable, MinioCategory } from './MinioCategoryTable';
import { MinioFileSelectTable, MinioFileItem } from './MinioFileSelectTable';

export interface UploadedJsonFile {
  id: string;
  name: string;
  sizeKb: number;
  rawFile?: File;
  parsedData?: any;
  error?: string;
  isDuplicate?: boolean;
  duplicateMessage?: string;
}

interface StepUploadJsonProps {
  files: UploadedJsonFile[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (id: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryOptions: KategoriHukum[];
  detectedCategory?: string | null;
  isNewCategory?: boolean;
  onStartImport: () => void;
  errorMessage?: string | null;
  onClearError?: () => void;
  onAddMinioFiles?: (files: MinioFileItem[], category: MinioCategory) => void;
}

export function StepUploadJson({
  files,
  onAddFiles,
  onRemoveFile,
  selectedCategory,
  onCategoryChange,
  categoryOptions,
  detectedCategory,
  isNewCategory = false,
  onStartImport,
  errorMessage,
  onClearError,
  onAddMinioFiles,
}: StepUploadJsonProps) {
  const [viewMode, setViewMode] = useState<'dropzone' | 'minio_categories' | 'minio_files'>('dropzone');
  const [selectedMinioCategory, setSelectedMinioCategory] = useState<MinioCategory | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const maxFiles = 10;
  const currentCount = files.length;
  const remainingSlots = maxFiles - currentCount;
  const isFull = currentCount >= maxFiles;
  const hasError = files.some((f) => Boolean(f.error || f.sizeKb > 10 * 1024));
  const hasDuplicate = files.some((f) => Boolean(f.isDuplicate));
  const isImportDisabled = hasError || hasDuplicate || files.length === 0;

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

  const handleConfirmMinioFiles = (selectedFiles: MinioFileItem[]) => {
    if (onAddMinioFiles && selectedMinioCategory) {
      onAddMinioFiles(selectedFiles, selectedMinioCategory);
    }
    setViewMode('dropzone');
  };

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* Input File Tersembunyi untuk File Lokal */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* KONDISI 1: Belum Ada File yang Diunggah (Empty Dropzone / MinIO View) */}
      {currentCount === 0 ? (
        <div className="flex flex-col w-full">
          {viewMode === 'dropzone' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full min-h-[380px] rounded-[16px] border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white ${isDragging
                  ? 'border-pr-900 bg-pr-50/40'
                  : errorMessage
                    ? 'border-dan-800 bg-dan-50/20'
                    : 'border-neu-200 hover:border-neu-300'
                }`}
            >
              {/* Ikon Cloud Download dengan Box Squircle Halus Sesuai Desain Figma */}
              <div className="w-14 h-14 rounded-2xl border border-neu-200 flex items-center justify-center text-neu-700 bg-white mb-4 shadow-2xs">
                <CloudDownload className="w-7 h-7 stroke-[1.75]" />
              </div>

              <h3 className="font-sans text-[16px] font-semibold text-neu-900">
                Import file JSON hasil OCR di sini
              </h3>
              <p className="font-sans text-[12px] text-neu-500 mt-1 max-w-md">
                Tarik dan lepas file dari perangkat Anda, atau impor langsung dari penyimpanan MinIO.
              </p>

              {/* Tombol Aksi: Pilih File Lokal & Pilih dari MinIO */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] bg-pr-900 text-white hover:bg-pr-800 text-[12px] font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  <Folder className="w-4 h-4 stroke-[2]" />
                  <span>Pilih File Lokal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('minio_categories')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] bg-pr-900 text-white hover:bg-pr-800 text-[12px] font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  <Database className="w-4 h-4 stroke-[2]" />
                  <span>Pilih dari MinIO</span>
                </button>
              </div>
            </div>
          )}

          {viewMode === 'minio_categories' && (
            <MinioCategoryTable
              onSelectCategory={(category) => {
                setSelectedMinioCategory(category);
                setViewMode('minio_files');
              }}
              onBack={() => setViewMode('dropzone')}
            />
          )}

          {viewMode === 'minio_files' && selectedMinioCategory && (
            <MinioFileSelectTable
              category={selectedMinioCategory}
              onBack={() => setViewMode('minio_categories')}
              onConfirmFiles={handleConfirmMinioFiles}
              maxFilesAllowed={maxFiles}
            />
          )}

          {/* Pesan Error Inline */}
          {errorMessage && (
            <div className="flex items-center gap-2 mt-3 px-3.5 py-2.5 bg-dan-50 border border-dan-200 rounded-[10px] text-dan-900 text-[12px] animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-dan-800 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}
        </div>
      ) : (
        /* KONDISI 2: Sudah Ada File Terpilih (1-10 File) */
        <div className="space-y-6 w-full min-w-0">
          {/* Dropdown Kategori Hukum Dinamis */}
          <CreatableKategoriSelect
            kategoris={categoryOptions}
            value={selectedCategory}
            onChange={onCategoryChange}
            detectedKategori={detectedCategory}
            disabled={files.length === 0}
          />

          <KategoriDetectionBadge
            detected={detectedCategory || null}
            isNew={isNewCategory}
            isMixed={selectedCategory === 'Campuran'}
          />

          {/* Pesan Error Inline */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3.5 bg-dan-50 border border-dan-200 rounded-[10px] text-dan-900 text-[12px] animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-dan-800 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Kartu Daftar File Terpilih */}
          <div className="bg-white rounded-[16px] border border-neu-100 p-5 shadow-2xs w-full">
            {/* Header Status File */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-[12px] font-semibold text-neu-900">
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

                const fileCat = file.parsedData?.metadata?.tipe_peraturan;

                return (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-3.5 rounded-[12px] transition-colors ${file.isDuplicate
                        ? 'border border-[#FCD34D] bg-[#FFFDF5]'
                        : isError
                          ? 'border border-dan-800 bg-dan-50/20'
                          : 'border border-transparent hover:border-neu-100 bg-neu-50/50'
                      }`}
                  >
                    {/* Ikon & Nama File */}
                    <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-3">
                      <FileCode2
                        className={`w-6 h-6 shrink-0 stroke-[1.75] ${file.isDuplicate ? 'text-[#D97706]' : 'text-pr-900'
                          }`}
                      />
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`font-sans text-[12px] font-medium leading-tight truncate ${file.isDuplicate ? 'text-[#D97706]' : 'text-neu-900'
                            }`}
                          title={file.name}
                        >
                          {file.name}
                        </h4>
                        <div className="font-sans text-[11px] text-neu-500 mt-1 flex items-center gap-2">
                          <span>{displaySize}</span>
  {
    file.isDuplicate && (
      <span className="flex items-center gap-1.5 text-[#D97706] font-normal">
        <AlertTriangle className="w-3.5 h-3.5 stroke-[2] text-[#D97706]" />
        <span>{file.duplicateMessage || 'File sudah terdaftar di database.'}</span>
      </span>
    )
  }
  {
    isError && !file.isDuplicate && (
      <span className="text-dan-800 font-medium">
        {file.error || 'Ukuran file melebihi 10MB!'}
      </span>
    )
  }
                        </div >
                      </div >
                    </div >

    {/* Tombol Hapus File */ }
    < button
  type = "button"
  onClick = {() => onRemoveFile(file.id)
}
className = {`transition-colors p-1 cursor-pointer shrink-0 ${file.isDuplicate
    ? 'text-[#F59E0B] hover:text-[#D97706]'
    : 'text-dan-800 hover:text-dan-900'
  }`}
title = "Hapus file ini"
  >
  <XCircle className="w-5 h-5 stroke-[1.75]" />
                    </button >
                  </div >
                );
              })}
            </div >
          </div >

  {/* Tombol Mulai Import di Kanan Bawah */ }
  < div className = "flex justify-end pt-2 w-full" >
    <button
      type="button"
      disabled={isImportDisabled}
      onClick={onStartImport}
      className={`px-6 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors shadow-2xs inline-flex items-center gap-2 ${isImportDisabled
          ? 'bg-[#64748B] text-white cursor-not-allowed opacity-90'
          : 'bg-pr-900 text-white hover:bg-pr-800 cursor-pointer'
        }`}
    >
      <span>Mulai Import</span>
    </button>
          </div >
        </div >
      )}
    </div >
  );
}

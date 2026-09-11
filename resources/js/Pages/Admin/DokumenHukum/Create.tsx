import React, { useState, useRef, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { ImportStepper } from '@/Components/admin/import/ImportStepper';
import { StepUploadJson, UploadedJsonFile } from '@/Components/admin/import/StepUploadJson';
import {
  StepProcessExtraction,
  ProcessedFileItem,
} from '@/Components/admin/import/StepProcessExtraction';
import {
  StepValidationCorrection,
  ValidatedFileItem,
} from '@/Components/admin/import/StepValidationCorrection';
import { DocumentDetailCorrectionModal } from '@/Components/admin/import/DocumentDetailCorrectionModal';
import { Plus, Database, CheckCircle2 } from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Undang - Undang',
  'Putusan Presiden',
  'Penetapan MPR',
  'Undang - Undang Darurat',
];

// Sample data awal berkas JSON sesuai tangkapan layar Gambar 2
const INITIAL_SAMPLE_FILES: UploadedJsonFile[] = [
  { id: '1', name: 'UU_No_11_2026.JSON', sizeKb: 1200 },
  { id: '2', name: 'UU_No_10_2026.JSON', sizeKb: 1450 },
  { id: '3', name: 'UU_No_12_2026.JSON', sizeKb: 1120 },
  { id: '4', name: 'UU_No_13_2026.JSON', sizeKb: 1120 },
  { id: '5', name: 'UU_No_14_2026.JSON', sizeKb: 1120 },
];

// 4 Berkas yang berhasil diimpor sesuai tangkapan layar Langkah 3
const INITIAL_VALIDATED_FILES: ValidatedFileItem[] = [
  {
    id: '1',
    name: 'UU_No_11_2026.JSON',
    category: 'Undang - Undang',
    title: 'Undang-Undang Nomor 11 Tahun 2026 Tentang Pengelolaan Sistem Hukum Digital Nasional',
  },
  {
    id: '2',
    name: 'UU_No_10_2026.JSON',
    category: 'Undang - Undang',
    title: 'Undang-Undang Nomor 10 Tahun 2026 Tentang Keterbukaan Informasi Regulasi Publik',
  },
  {
    id: '3',
    name: 'UU_No_15_2026.JSON',
    category: 'Undang - Undang',
    title: 'Undang-Undang Nomor 15 Tahun 2026 Tentang Kepastian Hukum Transaksi Elektronik',
  },
  {
    id: '4',
    name: 'UU_No_16_2026.JSON',
    category: 'Undang - Undang',
    title: 'Undang-Undang Nomor 16 Tahun 2026 Tentang Standardisasi Format Dokumen Perundangan',
  },
];

export default function DokumenHukumCreate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Undang - Undang');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedJsonFile[]>(INITIAL_SAMPLE_FILES);

  // State untuk proses ekstraksi Langkah 2
  const [processList, setProcessList] = useState<ProcessedFileItem[]>([]);

  // State untuk berkas tervalidasi pada Langkah 3
  const [validatedFiles, setValidatedFiles] = useState<ValidatedFileItem[]>(INITIAL_VALIDATED_FILES);
  const [editingFile, setEditingFile] = useState<ValidatedFileItem | null>(null);

  // State status publikasi Langkah 4
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  const headerFileInputRef = useRef<HTMLInputElement | null>(null);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Dokumen Hukum', href: '/admin/dokumen-hukum' },
    { label: 'Tambah Data Hukum' },
  ];

  // Handler tambah berkas dari tombol di header atau dropzone
  const handleAddFiles = (newFiles: File[]) => {
    setUploadedFiles((prev) => {
      const remainingSlots = Math.max(0, 10 - prev.length);
      const toAdd = newFiles.slice(0, remainingSlots).map((file, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
        rawFile: file,
      }));
      return [...prev, ...toAdd];
    });
  };

  // Handler hapus berkas unggahan di Langkah 1
  const handleRemoveUploadedFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Handler hapus berkas tervalidasi di Langkah 3
  const handleRemoveValidatedFile = (id: string) => {
    setValidatedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Mulai Proses Impor -> Masuk ke Langkah 2
  const handleStartImport = () => {
    if (uploadedFiles.length === 0) return;

    const initialProcess: ProcessedFileItem[] = uploadedFiles.map((file, idx) => {
      if (idx === 4) {
        return {
          id: file.id,
          name: file.name,
          status: 'memproses',
          progressPercent: 30,
        };
      }
      return {
        id: file.id,
        name: file.name,
        status: 'memproses',
        progressPercent: Math.min(100, (idx + 1) * 20),
      };
    });

    setProcessList(initialProcess);
    setCurrentStep(2);
  };

  // Simulasi progres ekstraksi pada Langkah 2
  useEffect(() => {
    if (currentStep !== 2) return;

    const timer = setTimeout(() => {
      setProcessList((prev) =>
        prev.map((item, idx) => {
          if (idx === 4) {
            return { ...item, status: 'gagal', progressPercent: 100 };
          }
          if (idx < 4) {
            return { ...item, status: 'selesai', progressPercent: 100 };
          }
          return { ...item, status: 'memproses', progressPercent: 75 };
        })
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Handler simpan koreksi data per file
  const handleSaveCorrection = (updated: {
    id: string;
    judul: string;
    kategori: string;
  }) => {
    setValidatedFiles((prev) =>
      prev.map((f) =>
        f.id === updated.id
          ? { ...f, title: updated.judul, category: updated.kategori }
          : f
      )
    );
  };

  // Handler simpan seluruh berkas ke database
  const handleSaveToDatabase = () => {
    setCurrentStep(4);
    setIsSavedSuccess(true);
  };

  return (
    <AdminLayout>
      <Head title="Tambah Data Hukum" />

      {/* Input File Tersembunyi untuk Tombol Header */}
      <input
        ref={headerFileInputRef}
        type="file"
        multiple
        accept=".json,application/json"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleAddFiles(Array.from(e.target.files));
            e.target.value = '';
          }
        }}
      />

      {/* 1. Breadcrumb Navigasi */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 2. Page Header & Action Button Sesuai Spesifikasi Figma */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            Tambah Data Hukum
          </h1>
          <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            Tambahkan data hukum dengan cara impor file JSON dari hasil OCR
          </p>
        </div>

        {/* Action Button Kanan Atas Sesuai Langkah Aktif */}
        {currentStep === 1 && uploadedFiles.length > 0 && (
          <button
            type="button"
            disabled={uploadedFiles.length >= 10}
            onClick={() => headerFileInputRef.current?.click()}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-colors shadow-2xs ${
              uploadedFiles.length >= 10
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-pr-900 text-white hover:bg-pr-800 cursor-pointer'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Tambah File</span>
          </button>
        )}

        {/* Tombol Simpan ke Database pada Langkah 3 Sesuai Gambar Figma */}
        {currentStep === 3 && (
          <button
            type="button"
            onClick={handleSaveToDatabase}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] bg-pr-900 text-white text-[13px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Database className="w-4 h-4" />
            <span>Simpan ke Database</span>
          </button>
        )}
      </div>

      {/* 3. Layout Utama: Stepper di Kiri & Konten Form / Ekstraksi di Kanan */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Stepper Progress 4 Langkah */}
        <ImportStepper
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* KONTEN LANGKAH 1: Unggah Berkas JSON */}
        {currentStep === 1 && (
          <StepUploadJson
            files={uploadedFiles}
            onAddFiles={handleAddFiles}
            onRemoveFile={handleRemoveUploadedFile}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categoryOptions={CATEGORY_OPTIONS}
            onStartImport={handleStartImport}
          />
        )}

        {/* KONTEN LANGKAH 2: Proses Import & Ekstraksi */}
        {currentStep === 2 && (
          <StepProcessExtraction
            files={processList}
            onCancel={() => setCurrentStep(1)}
            onFinishOrNext={() => setCurrentStep(3)}
          />
        )}

        {/* KONTEN LANGKAH 3: Validasi & Koreksi Data (Sesuai Gambar Figma Terbaru) */}
        {currentStep === 3 && (
          <StepValidationCorrection
            files={validatedFiles}
            onEditFile={(file) => setEditingFile(file)}
            onRemoveFile={handleRemoveValidatedFile}
          />
        )}

        {/* KONTEN LANGKAH 4: Simpan & Publikasi */}
        {currentStep === 4 && (
          <div className="flex-1 bg-white rounded-[16px] border border-neu-100 p-10 text-center shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#1E7E34] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>

            <h3 className="font-sans text-[18px] font-semibold text-neu-900 mb-2">
              Data Hukum Berhasil Disimpan & Dipublikasikan!
            </h3>
            <p className="font-sans text-[13px] text-neu-600 max-w-md mx-auto mb-6">
              Seluruh dokumen hasil ekstraksi telah berhasil diverifikasi dan tersimpan rapi ke dalam pangkalan data regulasi LawGates.
            </p>

            <button
              type="button"
              onClick={() => router.visit('/admin/dokumen-hukum')}
              className="px-6 py-2.5 rounded-[10px] bg-pr-900 text-white text-[13px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
            >
              Kembali ke Daftar Dokumen Hukum
            </button>
          </div>
        )}
      </div>

      {/* Modal Detail Koreksi & Preview POV Pengguna */}
      <DocumentDetailCorrectionModal
        show={Boolean(editingFile)}
        fileData={editingFile}
        onClose={() => setEditingFile(null)}
        onSave={handleSaveCorrection}
      />
    </AdminLayout>
  );
}

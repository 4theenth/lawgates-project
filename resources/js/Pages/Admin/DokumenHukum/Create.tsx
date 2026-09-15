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
import {
  CorrectionDetailView,
  LegalDocumentCorrectionData,
} from '@/Components/admin/import/CorrectionDetailView';
import { Plus, CircleCheckBig } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

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
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Undang - Undang');
  // Mulai kosong tanpa data contoh bawaan agar sesuai saat pengguna mengunggah JSON
  const [uploadedFiles, setUploadedFiles] = useState<UploadedJsonFile[]>([]);

  // State untuk proses ekstraksi Langkah 2
  const [processList, setProcessList] = useState<ProcessedFileItem[]>([]);

  // State untuk berkas tervalidasi pada Langkah 3
  const [validatedFiles, setValidatedFiles] = useState<ValidatedFileItem[]>([]);
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
  const handleAddFiles = async (newFiles: File[]) => {
    const remainingSlots = Math.max(0, 10 - uploadedFiles.length);
    const toAdd = newFiles.slice(0, remainingSlots);

    const newItems: UploadedJsonFile[] = await Promise.all(
      toAdd.map(async (file, idx) => {
        let parsedData: any = null;
        try {
          const text = await file.text();
          const cleanText = text.replace(/^\uFEFF/, '').trim();
          parsedData = JSON.parse(cleanText);
        } catch (e) {
          console.warn('File is not JSON, will use fallback data', e);
          toast.error('Berkas bukan format JSON yang valid!', file.name);
        }
        return {
          id: `${Date.now()}-${idx}`,
          name: file.name,
          sizeKb: Math.round(file.size / 1024),
          rawFile: file,
          parsedData,
        };
      })
    );

    setUploadedFiles((prev) => [...prev, ...newItems]);
  };

  // Handler hapus berkas unggahan di Langkah 1
  const handleRemoveUploadedFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Handler hapus berkas tervalidasi di Langkah 3
  const handleRemoveValidatedFile = (id: string) => {
    setValidatedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Mulai Proses Impor -> Masuk ke Langkah 2 (Animasi ekstraksi)
  const handleStartImport = () => {
    if (uploadedFiles.length === 0) return;

    const initialProcess: ProcessedFileItem[] = uploadedFiles.map((file) => ({
      id: file.id,
      name: file.name,
      status: 'memproses',
      progressPercent: 10,
      rawFile: file.rawFile,
      parsedData: file.parsedData,
    }));

    setProcessList(initialProcess);
    setCurrentStep(2);
  };

  // Simulasi progres ekstraksi pada Langkah 2 (Visual animatif otomatis menuju 100% lalu transisi ke Langkah 3)
  useEffect(() => {
    if (currentStep !== 2 || processList.length === 0) return;

    const allFinished = processList.every((f) => f.progressPercent >= 100);
    if (allFinished) {
      // Siapkan berkas tervalidasi dari file yang berhasil diproses
      const validated: ValidatedFileItem[] = processList
        .filter((f) => f.status === 'selesai')
        .map((f, idx) => {
          const meta = f.parsedData?.metadata || f.parsedData || {};
          let title =
            meta.judul ||
            meta.title ||
            meta.nama ||
            f.parsedData?.judul ||
            f.parsedData?.title ||
            f.parsedData?.nama;

          if (!title) {
            if (f.name.toLowerCase().includes('kepolisian')) {
              title =
                'Undang-Undang Republik Indonesia Nomor 2 Tahun 2002 Tentang Kepolisian Negara Republik Indonesia';
            } else if (f.name.toLowerCase().includes('uud')) {
              title = 'Undang - Undang Dasar Perubahan Ke 2 Tahun 1945';
            } else {
              title = f.name.replace(/\.json$/i, '').replace(/_/g, ' ');
            }
          }

          const category =
            meta.tipe_peraturan ||
            meta.kategori ||
            meta.jenis ||
            f.parsedData?.kategori ||
            f.parsedData?.jenis ||
            f.parsedData?.jenis_peraturan ||
            selectedCategory;

          return {
            id: f.id,
            name: f.name,
            category,
            title,
            rawFile: f.rawFile,
            parsedData: f.parsedData,
          };
        });
      setValidatedFiles(validated);

      // Otomatis berpindah ke Langkah 3 (Validasi & Koreksi Data) tanpa tombol manual
      const autoNextTimer = setTimeout(() => {
        setCurrentStep(3);
      }, 700);

      return () => clearTimeout(autoNextTimer);
    }

    // Naikkan persentase secara bertahap
    const timer = setTimeout(() => {
      setProcessList((prev) =>
        prev.map((item) => {
          const next = Math.min(100, item.progressPercent + 30);
          return {
            ...item,
            progressPercent: next,
            status: next >= 100 ? 'selesai' : 'memproses',
          };
        })
      );
    }, 350);

    return () => clearTimeout(timer);
  }, [currentStep, processList, selectedCategory]);

  // Handler simpan seluruh berkas ke database
  const handleSaveToDatabase = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lawgates_admin_documents');
      let currentDocs: any[] = [];
      if (saved) {
        try {
          currentDocs = JSON.parse(saved);
        } catch (e) {
          currentDocs = [];
        }
      }

      // Konversi berkas tervalidasi ke dalam DokumenHukumItem
      const newDocs = validatedFiles.map((file, idx) => {
        const todayStr = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(new Date());

        return {
          id: String(Date.now() + idx),
          kategori: file.category || selectedCategory || 'UU',
          judul: file.title || file.name,
          status: 'berlaku' as const,
          tgl_ditetapkan: file.correctionData?.metadata?.tanggalDitetapkan || todayStr,
        };
      });

      const updated = [...newDocs, ...currentDocs];
      localStorage.setItem('lawgates_admin_documents', JSON.stringify(updated));
    }

    setCurrentStep(4);
    setIsSavedSuccess(true);
    toast.success('Data hukum berhasil disimpan ke database!');
  };

  // JIKA SEDANG MENGOREKSI FILE: Tampilkan Layar Penuh Koreksi Data Hukum (Sesuai Gambar 2)
  if (editingFile) {
    return (
      <AdminLayout>
        <Head title={`Koreksi Data Hukum - ${editingFile.name}`} />

        {/* 1. Breadcrumb Navigasi Koreksi (Sesuai Gambar 1: Dashboard > Dokumen Hukum > Tambah Data Hukum) */}
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/admin/dashboard' },
              { label: 'Dokumen Hukum', href: '/admin/dokumen-hukum' },
              { label: 'Tambah Data Hukum' },
            ]}
          />
        </div>

        <CorrectionDetailView
          mode="koreksi"
          file={editingFile}
          onSave={(updatedCorrection: LegalDocumentCorrectionData) => {
            setValidatedFiles((prev) =>
              prev.map((f) =>
                f.id === editingFile.id
                  ? {
                    ...f,
                    title: updatedCorrection.judul,
                    correctionData: updatedCorrection,
                  }
                  : f
              )
            );
            setEditingFile(null);
            toast.success('Hasil koreksi data berhasil disimpan!');
          }}
          onCancel={() => setEditingFile(null)}
          onBack={() => setEditingFile(null)}
        />
      </AdminLayout>
    );
  }

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

      {/* 2. Page Header Sesuai Spesifikasi Figma */}
      <div className="mb-6">
        <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
          Tambah Data Hukum
        </h1>
        <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
          Tambahkan data hukum dengan cara impor file JSON dari hasil OCR
        </p>
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
          <div className="flex-1 min-w-0 flex flex-col w-full">
            {uploadedFiles.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  disabled={uploadedFiles.length >= 10}
                  onClick={() => headerFileInputRef.current?.click()}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] text-[14px] font-medium transition-colors shadow-2xs ${uploadedFiles.length >= 10
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-pr-900 text-white hover:bg-pr-800 cursor-pointer'
                    }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah File</span>
                </button>
              </div>
            )}
            <StepUploadJson
              files={uploadedFiles}
              onAddFiles={handleAddFiles}
              onRemoveFile={handleRemoveUploadedFile}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryOptions={CATEGORY_OPTIONS}
              onStartImport={handleStartImport}
            />
          </div>
        )}

        {/* KONTEN LANGKAH 2: Proses Import & Ekstraksi */}
        {currentStep === 2 && (
          <StepProcessExtraction
            files={processList}
            onCancel={() => setCurrentStep(1)}
            onFinishOrNext={() => setCurrentStep(3)}
          />
        )}

        {/* KONTEN LANGKAH 3: Validasi & Koreksi Data (Sesuai Gambar Figma Tangkapan Layar 1) */}
        {currentStep === 3 && (
          <div className="flex-1 min-w-0 flex flex-col w-full">
            {/* Tombol Simpan ke Database di Kanan Atas Di Atas Kartu */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleSaveToDatabase}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Simpan ke Database</span>
              </button>
            </div>

            <StepValidationCorrection
              files={validatedFiles}
              onEditFile={(file) => setEditingFile(file)}
              onRemoveFile={handleRemoveValidatedFile}
            />
          </div>
        )}

        {/* KONTEN LANGKAH 4: Simpan & Publikasi */}
        {currentStep === 4 && (
          <div className="flex-1 bg-white rounded-[20px] border border-neu-100 p-12 lg:p-16 text-center shadow-2xs flex flex-col items-center justify-center min-h-[380px]">
            <div className="w-14 h-14 rounded-full bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center mx-auto mb-4">
              <CircleCheckBig className="w-7 h-7 stroke-[2]" />
            </div>

            <h3 className="font-sans text-[16px] font-semibold text-neu-900 mb-2">
              Data Hukum Berhasil Disimpan & Dipublikasikan!
            </h3>
            <p className="font-sans text-[14px] text-neu-600 max-w-lg mx-auto mb-6 leading-relaxed">
              Seluruh dokumen hasil ekstraksi telah berhasil diverifikasi dan tersimpan ke dalam database
            </p>

            <button
              type="button"
              onClick={() => router.visit('/admin/dokumen-hukum')}
              className="px-6 py-2.5 rounded-[8px] bg-pr-900 text-white text-[12px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
            >
              Kembali ke Daftar Hukum
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

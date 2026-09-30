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
import { DraftNameModal } from '@/Components/admin/DraftNameModal';
import { Plus, CircleCheckBig, FileBox } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

import { getAllKategori, KategoriHukum } from '@/services/kategoriService';

// Sample data awal berkas JSON sesuai tangkapan layar Gambar 2
const INITIAL_SAMPLE_FILES: UploadedJsonFile[] = [
  { id: '1', name: 'UU_No_11_2026.JSON', sizeKb: 1200 },
  { id: '2', name: 'UU_No_10_2026.JSON', sizeKb: 1450 },
  { id: '3', name: 'UU_No_12_2026.JSON', sizeKb: 1120 },
  { id: '4', name: 'UU_No_12_2026.JSON', sizeKb: 1120 },
  { id: '5', name: 'UU_No_12_2026.JSON', sizeKb: 1120 },
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

const NAMA_KATEGORI_MAP: Record<string, string> = {
  'UU': 'Undang-Undang',
  'UUDRT': 'Undang-Undang Darurat',
  'PP': 'Peraturan Pemerintah',
  'PERPPU': 'Peraturan Pemerintah Pengganti Undang-Undang',
  'PERPRES': 'Peraturan Presiden',
  'PERMEN': 'Peraturan Menteri',
  'KEPPRES': 'Keputusan Presiden',
  'STAATSBLAD': 'Staatsblad',
  'TAP MPR': 'Ketetapan MPR',
  'TAP MPRS': 'Ketetapan MPRS',
};

export default function DokumenHukumCreate() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [kategoriOptions, setKategoriOptions] = useState<KategoriHukum[]>([]);
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);
  // Mulai kosong tanpa data contoh bawaan agar sesuai saat pengguna mengunggah JSON
  const [uploadedFiles, setUploadedFiles] = useState<UploadedJsonFile[]>([]);

  // Ambil daftar kategori dari server
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const data = await getAllKategori();
        setKategoriOptions(data);
      } catch (error) {
        console.error('Gagal mengambil kategori', error);
      }
    };
    fetchKategori();
  }, []);

  // State untuk proses ekstraksi Langkah 2
  const [processList, setProcessList] = useState<ProcessedFileItem[]>([]);

  // State untuk berkas tervalidasi pada Langkah 3
  const [validatedFiles, setValidatedFiles] = useState<ValidatedFileItem[]>([]);
  const [editingFile, setEditingFile] = useState<ValidatedFileItem | null>(null);

  // State status publikasi Langkah 4
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [savedAsDraft, setSavedAsDraft] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState<number | null>(null);
  const [editingDraftName, setEditingDraftName] = useState<string>('');
  const [inlineError, setInlineError] = useState<string | null>(null);

  const headerFileInputRef = useRef<HTMLInputElement | null>(null);

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Dokumen Hukum', href: '/admin/dokumen-hukum' },
    { label: 'Tambah Data Hukum' },
  ];

  // Muat data draft jika terdapat parameter ?draft_id= di URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const draftId = params.get('draft_id');
    if (!draftId) return;

    fetch(`/admin/dokumen-hukum/draft/${draftId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result?.data) {
          const draft = result.data;
          setEditingDraftId(draft.id);
          setEditingDraftName(draft.nama_draft || '');
          if (Array.isArray(draft.files_data) && draft.files_data.length > 0) {
            const mappedFiles: ValidatedFileItem[] = draft.files_data.map((f: any, idx: number) => ({
              id: f.id || String(idx + 1),
              name: f.name || `dokumen_${idx + 1}.json`,
              category: f.category || 'Undang - Undang',
              title: f.title || f.name || `Dokumen Draft ${idx + 1}`,
              parsedData: f.parsedData,
              correctionData: f.correctionData,
            }));
            setValidatedFiles(mappedFiles);
            setCurrentStep(3);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching draft:', err);
      });
  }, []);

  // Handler tambah berkas dari tombol di header atau dropzone
  const handleAddFiles = async (newFiles: File[]) => {
    setInlineError(null);

    // 1. Validasi Ekstensi File
    for (const file of newFiles) {
      const isJson =
        file.name.toLowerCase().endsWith('.json') ||
        file.type === 'application/json';

      if (!isJson) {
        setInlineError(
          `Berkas "${file.name}" tidak valid. Hanya berkas berformat .json yang diperbolehkan.`
        );
        return;
      }
    }

    const remainingSlots = Math.max(0, 10 - uploadedFiles.length);
    if (remainingSlots <= 0) {
      setInlineError('Maksimal hanya dapat mengunggah 10 berkas sekaligus.');
      return;
    }

    const toAdd = newFiles.slice(0, remainingSlots);
    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB per file

    const newItems: UploadedJsonFile[] = [];
    for (let idx = 0; idx < toAdd.length; idx++) {
      const file = toAdd[idx];
      const sizeKb = Math.round(file.size / 1024);
      const isOversized = file.size > MAX_SIZE;

      let fileError: string | undefined = undefined;
      if (isOversized) {
        fileError = 'Ukuran file melebihi 10MB!';
      }

      let parsedData: any = null;
      // Jangan parse jika file melebihi 10MB untuk menjaga performa
      if (!isOversized) {
        try {
          const text = await file.text();
          const cleanText = text.replace(/^\uFEFF/, '').trim();
          parsedData = JSON.parse(cleanText);

          // Coba deteksi kategori dari file pertama yang valid
          if (idx === 0 && parsedData?.metadata) {
            let detected = 
              parsedData.metadata.tipe_peraturan || 
              parsedData.metadata.kategori || 
              parsedData.metadata.jenis;
            
            if (detected) {
              const upperDet = detected.toUpperCase().trim();
              if (NAMA_KATEGORI_MAP[upperDet]) {
                detected = NAMA_KATEGORI_MAP[upperDet];
              }

              // Update data JSON agar form panjang yang akan disimpan ke backend
              parsedData.metadata.tipe_peraturan = detected;

              setDetectedCategory(detected);
              // Cek apakah kategori yang terdeteksi sudah ada di database (case insensitive)
              const existingCat = kategoriOptions.find(
                (k) => k.nama.toLowerCase() === detected.toLowerCase() || 
                       k.kode.toLowerCase() === detected.toLowerCase()
              );
              setIsNewCategory(!existingCat);
              
              if (existingCat) {
                setSelectedCategory(existingCat.nama);
              } else {
                setSelectedCategory(detected);
              }
            }
          }

        } catch (e) {
          console.warn('File is not JSON', e);
          fileError = 'Format berkas tidak valid (bukan format JSON yang benar).';
        }
      }

      let isDuplicate = false;
      if (parsedData?.metadata?.id_dokumen) {
        try {
          const checkRes = await fetch(`/peraturan/${parsedData.metadata.id_dokumen}`, {
            headers: { Accept: 'application/json' },
          });
          if (checkRes.status === 200) {
            const resJson = await checkRes.json();
            if (resJson.success) {
              const judul = resJson.data.judul || '';
              if (!judul.toLowerCase().includes('menunggu import') && !judul.toLowerCase().includes('menunggu impor')) {
                setInlineError(`Data yang mau diupload ("${parsedData.metadata.judul || file.name}") sudah ada di database.`);
                isDuplicate = true;
              }
            }
          }
        } catch (err) {
          console.error("Gagal mengecek duplikasi", err);
        }
      }

      if (isDuplicate) {
        continue;
      }

      newItems.push({
        id: `${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        sizeKb,
        rawFile: file,
        parsedData,
        error: fileError,
      });
    }

    if (newItems.length > 0) {
      setUploadedFiles((prev) => [...prev, ...newItems]);
    }
  };

  // Handler hapus berkas unggahan di Langkah 1
  const handleRemoveUploadedFile = (id: string) => {
    setUploadedFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      if (!updated.some((f) => Boolean(f.error || f.sizeKb > 10 * 1024))) {
        setInlineError(null);
      }
      return updated;
    });
  };

  // Handler hapus berkas tervalidasi di Langkah 3
  const handleRemoveValidatedFile = (id: string) => {
    setValidatedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Mulai Proses Impor -> Masuk ke Langkah 2 (Animasi ekstraksi)
  const handleStartImport = () => {
    if (uploadedFiles.length === 0) return;

    const hasError = uploadedFiles.some((f) => Boolean(f.error || f.sizeKb > 10 * 1024));
    if (hasError) {
      setInlineError('Harap hapus berkas yang melebihi batas 10MB sebelum melanjutkan import.');
      return;
    }

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

  // Handler simpan sebagai draft ke database
  const handleSaveDraft = async (namaDraft: string) => {
    setIsDraftSaving(true);
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const filesPayload = validatedFiles.map((file) => ({
        name: file.name,
        category: file.category,
        title: file.title,
        parsedData: file.parsedData,
        correctionData: file.correctionData,
      }));

      const response = await fetch('/admin/dokumen-hukum/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
        },
        body: JSON.stringify({
          id: editingDraftId || undefined,
          nama_draft: namaDraft,
          files: filesPayload,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan draft');
      }

      setIsDraftModalOpen(false);
      setSavedAsDraft(true);
      setCurrentStep(4);
      toast.success('Data berhasil disimpan');
    } catch (error: any) {
      console.error(error);
      toast.error('Data gagal disimpan');
    } finally {
      setIsDraftSaving(false);
    }
  };

  // Handler publikasi seluruh berkas ke database
  const handlePublishToDatabase = async () => {
    try {
      const payload = new FormData();
      validatedFiles.forEach((file, index) => {
        // Stringify JSON data since FormData only takes strings/blobs
        const parsedDataStr = typeof file.parsedData === 'object' 
            ? JSON.stringify(file.parsedData)
            : file.parsedData;
        payload.append(`files[${index}][parsedData]`, parsedDataStr);

        if (file.correctionData) {
            payload.append(`files[${index}][correctionData]`, JSON.stringify(file.correctionData));
        }
        
        // Append actual file if available
        if (file.rawFile) {
            payload.append(`files[${index}][rawFile]`, file.rawFile);
        }
      });

      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const response = await fetch('/admin/dokumen-hukum/import', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
        },
        body: payload
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMsg = errorData.message || 'Gagal mempublikasikan data ke database';
        if (errorData.errors && errorData.errors.length > 0) {
          errorMsg += '\nDetail: ' + errorData.errors.join(', ');
        }
        throw new Error(errorMsg);
      }

      setSavedAsDraft(false);
      setCurrentStep(4);
      setIsSavedSuccess(true);
      toast.success('Data hukum berhasil dipublikasikan!');
    } catch (error: any) {
      console.error(error);
      toast.error('Data gagal dipublikasikan');
    }
  };

  // Handler shortcut reset untuk tambah data baru lagi secara cepat
  const handleResetForm = () => {
    setUploadedFiles([]);
    setProcessList([]);
    setValidatedFiles([]);
    setEditingFile(null);
    setIsSavedSuccess(false);
    setSavedAsDraft(false);
    setEditingDraftId(null);
    setEditingDraftName('');
    setInlineError(null);
    setDetectedCategory(null);
    setIsNewCategory(false);
    setSelectedCategory('');
    setCurrentStep(1);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            Tambah Data Hukum
          </h1>
          <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            Tambahkan data hukum dengan cara impor file JSON dari hasil OCR
          </p>
        </div>

        {currentStep === 1 && uploadedFiles.length > 0 && (
          <button
            type="button"
            disabled={uploadedFiles.length >= 10}
            onClick={() => headerFileInputRef.current?.click()}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors shadow-2xs ${
              uploadedFiles.length >= 10
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-pr-900 text-white hover:bg-pr-800 cursor-pointer'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Tambah File</span>
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
          <div className="flex-1 min-w-0 flex flex-col w-full">
            <StepUploadJson
              files={uploadedFiles}
              onAddFiles={handleAddFiles}
              onRemoveFile={handleRemoveUploadedFile}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryOptions={kategoriOptions}
              detectedCategory={detectedCategory}
              isNewCategory={isNewCategory}
              onStartImport={handleStartImport}
              errorMessage={inlineError}
              onClearError={() => setInlineError(null)}
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
            {/* Tombol Simpan & Publish di Kanan Atas Di Atas Kartu */}
            <div className="flex items-center justify-end gap-3 mb-4">
              <button
                type="button"
                onClick={() => setIsDraftModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-2 rounded-[10px] border border-neu-800 text-neu-900 text-[14px] font-medium hover:bg-neu-50 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Simpan</span>
              </button>

              <button
                type="button"
                onClick={handlePublishToDatabase}
                className="inline-flex items-center justify-center px-6 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Publish</span>
              </button>
            </div>

            <StepValidationCorrection
              files={validatedFiles}
              onEditFile={(file) => setEditingFile(file)}
              onRemoveFile={handleRemoveValidatedFile}
            />
          </div>
        )}

        {/* KONTEN LANGKAH 4: Simpan & Publikasi (Sesuai Gambar Figma 4 & 5) */}
        {currentStep === 4 && (
          <div className="flex-1 bg-white rounded-[20px] border border-neu-100 p-12 lg:p-16 text-center shadow-2xs flex flex-col items-center justify-center min-h-[380px]">
            {savedAsDraft ? (
              <>
                <div className="w-14 h-14 rounded-full bg-[#EBF2F7] text-pr-900 flex items-center justify-center mx-auto mb-4">
                  <FileBox className="w-7 h-7 stroke-[1.8]" />
                </div>

                <h3 className="font-sans text-[17px] font-semibold text-neu-900 mb-2">
                  Data Hukum Berhasil Disimpan Dengan Status Draft!
                </h3>
                <p className="font-sans text-[14px] text-neu-600 max-w-lg mx-auto mb-8 leading-relaxed">
                  Seluruh dokumen hasil ekstraksi telah berhasil diverifikasi dan tersimpan ke dalam database
                </p>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-[8px] border border-neu-800 text-neu-900 text-[13px] font-medium hover:bg-neu-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data Baru</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => router.visit('/admin/dokumen-hukum')}
                    className="px-6 py-2.5 rounded-[8px] bg-pr-900 text-white text-[13px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
                  >
                    Kembali ke Daftar Hukum
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center mx-auto mb-4">
                  <CircleCheckBig className="w-7 h-7 stroke-[2]" />
                </div>

                <h3 className="font-sans text-[17px] font-semibold text-neu-900 mb-2">
                  Data Hukum Berhasil Disimpan & Dipublikasikan!
                </h3>
                <p className="font-sans text-[14px] text-neu-600 max-w-lg mx-auto mb-8 leading-relaxed">
                  Seluruh dokumen hasil ekstraksi telah berhasil diverifikasi dan tersimpan ke dalam database
                </p>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-[8px] border border-neu-800 text-neu-900 text-[13px] font-medium hover:bg-neu-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Data Baru</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => router.visit('/admin/dokumen-hukum')}
                    className="px-6 py-2.5 rounded-[8px] bg-pr-900 text-white text-[13px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
                  >
                    Kembali ke Daftar Hukum
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal Input Nama Draft */}
      <DraftNameModal
        show={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        onConfirm={handleSaveDraft}
        isLoading={isDraftSaving}
        initialName={editingDraftName}
      />
    </AdminLayout>
  );
}

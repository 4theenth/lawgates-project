import React, { useState, useEffect } from 'react';
import { ValidatedFileItem } from './StepValidationCorrection';
import {
  LegalDocumentCorrectionData,
  generateInitialCorrectionData,
  formatStandardId,
} from './correctionParser';
import { CorrectionTableOfContents } from './CorrectionTableOfContents';
import { CorrectionHeaderSection } from './CorrectionHeaderSection';
import { CorrectionPembukaanSection } from './CorrectionPembukaanSection';
import { CorrectionBatangTubuhSection } from './CorrectionBatangTubuhSection';
import { CorrectionTimelineSection } from './CorrectionTimelineSection';
import { CorrectionMetadataSection } from './CorrectionMetadataSection';
import { Wand2, FileText } from 'lucide-react';
import { cleanOcrText } from '../../../utils/ocrTextCleaner';

// Re-export types and utilities for backward compatibility
export type {
  ArticleItem,
  ChapterItem,
  TimelineRelationItem,
  LegalDocumentCorrectionData,
} from './correctionParser';
export { generateInitialCorrectionData, formatStandardId };

export interface CorrectionDetailViewProps {
  file: ValidatedFileItem;
  mode?: 'koreksi' | 'edit';
  onSave: (updatedData: LegalDocumentCorrectionData) => void;
  onCancel?: () => void;
  onBack?: () => void;
}

export function CorrectionDetailView({
  file,
  mode = 'koreksi',
  onSave,
  onCancel,
  onBack,
}: CorrectionDetailViewProps) {
  // State data utama hasil parsing berkas JSON
  const [data, setData] = useState<LegalDocumentCorrectionData>(() =>
    generateInitialCorrectionData(file)
  );

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );

    // Observe all sections
    const elements = document.querySelectorAll('[id^="section-"]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [data]);

  // Sinkronisasi otomatis jika berkas berubah atau file baru diunggah
  useEffect(() => {
    if (file.correctionData) {
      setData(file.correctionData);
    } else if (file.parsedData) {
      setData(generateInitialCorrectionData(file));
    } else if (file.rawFile) {
      file.rawFile.text().then((text) => {
        try {
          const cleanText = text.replace(/^\uFEFF/, '').trim();
          const parsed = JSON.parse(cleanText);
          setData(generateInitialCorrectionData({ ...file, parsedData: parsed }));
        } catch (e) {
          console.warn('Gagal membaca JSON dari rawFile', e);
        }
      });
    }
  }, [file]);

  // Accordion card states
  const [isOpenStandarId, setIsOpenStandarId] = useState(true);
  const [isOpenJudul, setIsOpenJudul] = useState(true);
  const [isOpenPembukaan, setIsOpenPembukaan] = useState(true);
  const [isOpenMenimbang, setIsOpenMenimbang] = useState(true);
  const [isOpenMengingat, setIsOpenMengingat] = useState(true);
  const [isOpenMemutuskan, setIsOpenMemutuskan] = useState(true);

  // Toggle bab accordion
  const toggleBab = (babId: string) => {
    setData((prev) => ({
      ...prev,
      babList: prev.babList.map((b) =>
        b.id === babId ? { ...b, isExpanded: !b.isExpanded } : b
      ),
    }));
  };

  // Toggle pasal accordion
  const togglePasal = (babId: string, pasalId: string) => {
    setData((prev) => ({
      ...prev,
      babList: prev.babList.map((b) =>
        b.id === babId
          ? {
              ...b,
              pasalList: b.pasalList.map((p) =>
                p.id === pasalId ? { ...p, isExpanded: !p.isExpanded } : p
              ),
            }
          : b
      ),
    }));
  };

  const forceExpandPasal = (babId: string, pasalId: string) => {
    setData((prev) => ({
      ...prev,
      babList: prev.babList.map((b) =>
        b.id === babId
          ? {
              ...b,
              isExpanded: true,
              pasalList: b.pasalList.map((p) =>
                p.id === pasalId ? { ...p, isExpanded: true } : p
              ),
            }
          : b
      ),
    }));
  };

  const handleMagicWandAll = () => {
    setData((prev) => {
      const newData = { ...prev };
      
      if (newData.judul) newData.judul = cleanOcrText(newData.judul);
      
      if (newData.pembukaan) {
        if (newData.pembukaan.judul) newData.pembukaan.judul = cleanOcrText(newData.pembukaan.judul);
        if (newData.pembukaan.subJudul) newData.pembukaan.subJudul = cleanOcrText(newData.pembukaan.subJudul);
        if (newData.pembukaan.menimbang) newData.pembukaan.menimbang = cleanOcrText(newData.pembukaan.menimbang);
        if (newData.pembukaan.mengingat) newData.pembukaan.mengingat = cleanOcrText(newData.pembukaan.mengingat);
        if (newData.pembukaan.memutuskan) newData.pembukaan.memutuskan = cleanOcrText(newData.pembukaan.memutuskan);
      }
      
      if (newData.babList) {
        newData.babList = newData.babList.map(bab => ({
          ...bab,
          judul: cleanOcrText(bab.judul || ''),
          deskripsi: cleanOcrText(bab.deskripsi || ''),
          pasalList: bab.pasalList.map(pasal => ({
            ...pasal,
            isi: cleanOcrText(pasal.isi || ''),
            penjelasan: cleanOcrText(pasal.penjelasan || '')
          }))
        }));
      }
      
      return newData;
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Navigasi & Aksi (Simpan / Batal) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-semibold text-neu-900 leading-[26px]">
            {mode === 'edit' ? 'Edit Data Hukum' : 'Koreksi Data Hukum'}
          </h1>
          <p className="text-[14px] text-neu-600 mt-1 leading-[20px]">
            {mode === 'edit'
              ? 'Perbarui dan sesuaikan detail dokumen hukum sebelum disimpan'
              : 'Verifikasi dan sesuaikan data hasil ekstraksi JSON sebelum disimpan'}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => {
              if (mode === 'edit' && file.id) {
                window.open(`/peraturan/${file.id}/download?inline=1`, '_blank');
              } else if (file.name || data.judul) {
                window.open(`/admin/dokumen-hukum/preview-pdf-minio?filename=${encodeURIComponent(file.name || '')}&judul=${encodeURIComponent(data.judul || '')}`, '_blank');
              } else {
                alert('Nama file tidak ditemukan untuk pencarian PDF MinIO.');
              }
            }}
            title="Lihat dokumen PDF asli"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-neu-200 bg-white text-pr-900 hover:bg-pr-50 text-[14px] font-medium transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Lihat PDF
          </button>

          <button
            type="button"
            onClick={handleMagicWandAll}
            title="Sesuaikan format seluruh teks (Magic Wand)"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-neu-200 bg-white text-pr-900 hover:bg-pr-50 text-[14px] font-medium transition-colors cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            Sesuaikan Semua
          </button>

          {mode === 'edit' && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-[10px] border border-neu-200 bg-white text-neu-700 hover:bg-neu-50 text-[14px] font-medium transition-colors cursor-pointer"
            >
              Batal
            </button>
          )}
          {mode === 'koreksi' && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 rounded-[10px] border border-neu-200 bg-white text-neu-700 hover:bg-neu-50 text-[14px] font-medium transition-colors cursor-pointer"
            >
              Kembali
            </button>
          )}
          <button
            type="button"
            onClick={() => onSave(data)}
            className="px-6 py-2.5 rounded-[10px] bg-pr-900 text-white hover:bg-pr-800 text-[14px] font-medium transition-colors shadow-2xs cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* 2. Layout 3-Kolom: Daftar Isi (Kiri), Editor Utama (Tengah), Timeline & Metadata (Kanan) */}
      <div className="flex flex-col lg:flex-row items-start gap-5">
        {/* KOLOM KIRI: DAFTAR ISI */}
        <CorrectionTableOfContents
          pembukaanJudul={data.pembukaan?.judul}
          babList={data.babList}
          activeSection={activeSection}
          onPasalClick={forceExpandPasal}
          onPembukaanClick={() => setIsOpenPembukaan(true)}
        />

        {/* KOLOM TENGAH: EDITOR DOKUMEN HUKUM */}
        <div className="flex-1 min-w-0 w-full space-y-4 h-[calc(100vh-140px)] min-h-[500px] overflow-y-auto pr-2 custom-scrollbar" id="editor-scroll-container">
          {/* Standar ID & Judul Peraturan */}
          <CorrectionHeaderSection
            standarId={data.standarId}
            judul={data.judul}
            isOpenStandarId={isOpenStandarId}
            isOpenJudul={isOpenJudul}
            onToggleStandarId={() => setIsOpenStandarId(!isOpenStandarId)}
            onToggleJudul={() => setIsOpenJudul(!isOpenJudul)}
            onChangeStandarId={(val) => setData((prev) => ({ ...prev, standarId: val }))}
            onChangeJudul={(val) => setData((prev) => ({ ...prev, judul: val }))}
          />

          {/* Pembukaan (Menimbang, Mengingat, Memutuskan) */}
          <CorrectionPembukaanSection
            pembukaan={data.pembukaan}
            isOpenPembukaan={isOpenPembukaan}
            isOpenMenimbang={isOpenMenimbang}
            isOpenMengingat={isOpenMengingat}
            isOpenMemutuskan={isOpenMemutuskan}
            onTogglePembukaan={() => setIsOpenPembukaan(!isOpenPembukaan)}
            onToggleMenimbang={() => setIsOpenMenimbang(!isOpenMenimbang)}
            onToggleMengingat={() => setIsOpenMengingat(!isOpenMengingat)}
            onToggleMemutuskan={() => setIsOpenMemutuskan(!isOpenMemutuskan)}
            onChangePembukaan={(field, val) =>
              setData((prev) => ({
                ...prev,
                pembukaan: { ...prev.pembukaan, [field]: val },
              }))
            }
          />

          {/* Batang Tubuh (BAB dan Pasal-Pasal) */}
          <CorrectionBatangTubuhSection
            babList={data.babList}
            onToggleBab={toggleBab}
            onTogglePasal={togglePasal}
            onChangeBabJudul={(babId, val) =>
              setData((prev) => ({
                ...prev,
                babList: prev.babList.map((b) =>
                  b.id === babId ? { ...b, judul: val } : b
                ),
              }))
            }
            onChangeBabDeskripsi={(babId, val) =>
              setData((prev) => ({
                ...prev,
                babList: prev.babList.map((b) =>
                  b.id === babId ? { ...b, deskripsi: val } : b
                ),
              }))
            }
            onChangePasalIsi={(babId, pasalId, val) =>
              setData((prev) => ({
                ...prev,
                babList: prev.babList.map((b) =>
                  b.id === babId
                    ? {
                        ...b,
                        pasalList: b.pasalList.map((p) =>
                          p.id === pasalId ? { ...p, isi: val } : p
                        ),
                      }
                    : b
                ),
              }))
            }
            onChangePasalPenjelasan={(babId, pasalId, val) =>
              setData((prev) => ({
                ...prev,
                babList: prev.babList.map((b) =>
                  b.id === babId
                    ? {
                        ...b,
                        pasalList: b.pasalList.map((p) =>
                          p.id === pasalId ? { ...p, penjelasan: val } : p
                        ),
                      }
                    : b
                ),
              }))
            }
          />
        </div>

        {/* KOLOM KANAN: RIWAYAT PERUBAHAN & METADATA */}
        <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 min-w-0 space-y-4 h-[calc(100vh-140px)] min-h-[500px] overflow-y-auto custom-scrollbar pr-1">
          {/* Card 1: Riwayat Perubahan (Scrollable dengan counter) */}
          <CorrectionTimelineSection
            riwayatPerubahan={data.riwayatPerubahan || []}
            onChangeKode={(id, val) =>
              setData((prev) => ({
                ...prev,
                riwayatPerubahan: prev.riwayatPerubahan.map((r) =>
                  r.id === id ? { ...r, kode: val } : r
                ),
              }))
            }
          />

          {/* Card 2: Metadata (Pemrakarsa & Tanggal Ditetapkan) */}
          <CorrectionMetadataSection
            metadata={data.metadata}
            onChangeMetadata={(field, val) =>
              setData((prev) => ({
                ...prev,
                metadata: { ...prev.metadata, [field]: val },
              }))
            }
          />
      </div>
      </div>
    </div>
  );
}

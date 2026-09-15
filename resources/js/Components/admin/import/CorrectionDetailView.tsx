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
          onToggleBab={toggleBab}
        />

        {/* KOLOM TENGAH: EDITOR DOKUMEN HUKUM */}
        <div className="flex-1 min-w-0 w-full space-y-4">
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
          />
        </div>

        {/* KOLOM KANAN: RIWAYAT PERUBAHAN & METADATA */}
        <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 min-w-0 space-y-4">
          {/* Card 1: Riwayat Perubahan (Scrollable dengan counter) */}
          <CorrectionTimelineSection
            riwayatPerubahan={data.riwayatPerubahan}
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

import React, { useState, useEffect, useRef } from 'react';
import { ValidatedFileItem } from './StepValidationCorrection';
import {
  LegalDocumentCorrectionData,
  generateInitialCorrectionData,
  formatStandardId,
  ChapterItem,
  ArticleItem,
} from './correctionParser';
import { CorrectionTableOfContents } from './CorrectionTableOfContents';
import { CorrectionHeaderSection } from './CorrectionHeaderSection';
import { CorrectionPembukaanSection } from './CorrectionPembukaanSection';
import { CorrectionBatangTubuhSection } from './CorrectionBatangTubuhSection';
import { CorrectionTimelineSection } from './CorrectionTimelineSection';
import { CorrectionMetadataSection } from './CorrectionMetadataSection';
import { CorrectionPdfPanel } from './CorrectionPdfPanel';
import { Wand2, FileText, EyeOff, GripVertical, List, RotateCcw, ChevronLeft, AlignLeft } from 'lucide-react';
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

  // State panel komparasi PDF & Resizable Split Screen (Default: false agar tampilan awal standar)
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'koreksi' | 'metadata'>('koreksi');
  const [splitRatio, setSplitRatio] = useState(45); // Persentase lebar PDF di sisi kiri (default 45%)
  const [isDragging, setIsDragging] = useState(false);
  const [showTocInSplit, setShowTocInSplit] = useState(true);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  // Endpoint URL dokumen PDF sumber
  const pdfUrl =
    mode === 'edit' && file.id
      ? `/peraturan/${file.id}/download?inline=1`
      : file.name || data.judul
        ? `/admin/dokumen-hukum/preview-pdf-minio?filename=${encodeURIComponent(file.name || '')}&judul=${encodeURIComponent(data.judul || '')}&standarId=${encodeURIComponent(data.standarId || '')}&category=${encodeURIComponent(file.category || '')}&folder_path=${encodeURIComponent((file as any).folder_path || '')}`
        : null;

  // Handler interaksi drag pada resizable divider
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const totalWidth = rect.width;
      const newRatio = (offsetX / totalWidth) * 100;
      // Batasi rentang rasio antara 20% dan 75%
      if (newRatio >= 20 && newRatio <= 75) {
        setSplitRatio(newRatio);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

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

  // Toggle bab / bagian / paragraf accordion (Rekursif untuk hierarki bertingkat)
  const toggleBab = (babId: string) => {
    const toggleNodeInTree = (nodes: ChapterItem[], targetId: string): ChapterItem[] => {
      return nodes.map((n) => {
        if (n.id === targetId) {
          return { ...n, isExpanded: !n.isExpanded };
        }
        if (n.children && n.children.length > 0) {
          return { ...n, children: toggleNodeInTree(n.children, targetId) };
        }
        return n;
      });
    };

    setData((prev) => ({
      ...prev,
      babList: toggleNodeInTree(prev.babList, babId),
    }));
  };

  // Toggle pasal accordion (Rekursif untuk pasal utama & sub-pasal)
  const togglePasal = (_babId: string, pasalId: string) => {
    const togglePasalInList = (pasalList: ArticleItem[], targetPasalId: string): { list: ArticleItem[]; updated: boolean } => {
      let updated = false;
      const list = pasalList.map((p) => {
        if (p.id === targetPasalId) {
          updated = true;
          return { ...p, isExpanded: !p.isExpanded };
        }
        if (p.pasalList && p.pasalList.length > 0) {
          const childRes = togglePasalInList(p.pasalList, targetPasalId);
          if (childRes.updated) {
            updated = true;
            return { ...p, pasalList: childRes.list };
          }
        }
        return p;
      });
      return { list, updated };
    };

    const togglePasalInTree = (nodes: ChapterItem[], targetPasalId: string): ChapterItem[] => {
      return nodes.map((n) => {
        const { list: newPasalList, updated } = togglePasalInList(n.pasalList || [], targetPasalId);
        const newChildren = n.children && n.children.length > 0 ? togglePasalInTree(n.children, targetPasalId) : n.children;
        return {
          ...n,
          pasalList: newPasalList,
          children: newChildren,
        };
      });
    };

    setData((prev) => ({
      ...prev,
      babList: togglePasalInTree(prev.babList, pasalId),
    }));
  };

  // Expand target pasal dan seluruh parent (BAB, BAGIAN, PARAGRAF) secara otomatis saat diklik dari Daftar Isi / Relasi
  const forceExpandPasal = (_babId: string, pasalId: string) => {
    const expandPath = (nodes: ChapterItem[], targetPasalId: string): { updatedNodes: ChapterItem[]; found: boolean } => {
      let foundAny = false;

      const updatedNodes = nodes.map((node) => {
        let containsPasal = false;

        const checkArticleList = (pasals: ArticleItem[]): { list: ArticleItem[]; found: boolean } => {
          let foundInList = false;
          const list = pasals.map((p) => {
            if (p.id === targetPasalId) {
              foundInList = true;
              return { ...p, isExpanded: true };
            }
            if (p.pasalList && p.pasalList.length > 0) {
              const res = checkArticleList(p.pasalList);
              if (res.found) {
                foundInList = true;
                return { ...p, isExpanded: true, pasalList: res.list };
              }
            }
            return p;
          });
          return { list, found: foundInList };
        };

        const pasalRes = checkArticleList(node.pasalList || []);
        if (pasalRes.found) {
          containsPasal = true;
        }

        let updatedChildren = node.children;
        if (node.children && node.children.length > 0) {
          const childRes = expandPath(node.children, targetPasalId);
          if (childRes.found) {
            containsPasal = true;
            updatedChildren = childRes.updatedNodes;
          }
        }

        if (containsPasal) {
          foundAny = true;
          return {
            ...node,
            isExpanded: true,
            pasalList: pasalRes.list,
            children: updatedChildren,
          };
        }

        return node;
      });

      return { updatedNodes, found: foundAny };
    };

    setData((prev) => ({
      ...prev,
      babList: expandPath(prev.babList, pasalId).updatedNodes,
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

      const cleanChapterNode = (node: typeof prev.babList[0]): typeof prev.babList[0] => ({
        ...node,
        judul: cleanOcrText(node.judul || ''),
        deskripsi: cleanOcrText(node.deskripsi || ''),
        pasalList: (node.pasalList || []).map((pasal) => ({
          ...pasal,
          isi: cleanOcrText(pasal.isi || ''),
          penjelasan: cleanOcrText(pasal.penjelasan || ''),
        })),
        children: node.children ? node.children.map(cleanChapterNode) : node.children,
      });

      if (newData.babList) {
        newData.babList = newData.babList.map(cleanChapterNode);
      }

      return newData;
    });
  };

  // ── Render Helpers untuk Menghindari Redundansi JSX ────────────────────────────
  const renderTableOfContents = (customClassName?: string) => (
    <CorrectionTableOfContents
      pembukaanJudul={data.pembukaan?.judul}
      babList={data.babList}
      activeSection={activeSection}
      onPasalClick={forceExpandPasal}
      onPembukaanClick={() => setIsOpenPembukaan(true)}
      className={customClassName}
    />
  );

  const renderEditorForm = (isSplitMode: boolean = false) => (
    <div
      className={
        isSplitMode
          ? 'space-y-4'
          : 'flex-1 min-w-0 w-full space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar'
      }
      id={isSplitMode ? undefined : 'editor-scroll-container'}
    >
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
        isSplitMode={isSplitMode}
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
  );

  const renderTimeline = () => (
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
  );

  const renderMetadata = () => (
    <CorrectionMetadataSection
      metadata={data.metadata}
      onChangeMetadata={(field, val) =>
        setData((prev) => ({
          ...prev,
          metadata: { ...prev.metadata, [field]: val },
        }))
      }
    />
  );

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Navigasi & Aksi (Simpan / Batal / Sembunyikan PDF) */}
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
          {/* Tombol Toggle PDF Sumber (Inspirasi Pasal.id) */}
          <button
            type="button"
            onClick={() => setIsPdfOpen(!isPdfOpen)}
            title={isPdfOpen ? 'Sembunyikan panel komparasi PDF' : 'Tampilkan komparasi dokumen PDF asli'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] border text-[14px] font-medium transition-colors cursor-pointer shadow-2xs ${isPdfOpen
                ? 'border-suc-600 bg-suc-900 text-white hover:bg-suc-800'
                : 'border-neu-200 bg-white text-pr-900 hover:bg-pr-50'
              }`}
          >
            {isPdfOpen ? (
              <>
                <EyeOff className="w-4 h-4" />
                Sembunyikan PDF
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Lihat PDF
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleMagicWandAll}
            title="Sesuaikan format seluruh teks (Magic Wand)"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-neu-200 bg-white text-pr-900 hover:bg-pr-50 text-[14px] font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Wand2 className="w-4 h-4" />
            Sesuaikan Semua
          </button>

          {mode === 'edit' && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-[10px] border border-neu-200 bg-white text-neu-700 hover:bg-neu-50 text-[14px] font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Batal
            </button>
          )}
          {mode === 'koreksi' && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 rounded-[10px] border border-neu-200 bg-white text-neu-700 hover:bg-neu-50 text-[14px] font-medium transition-colors cursor-pointer shadow-2xs"
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

      {/* 2. AREA UTAMA: MODE SPLIT (PDF + TABBED EDITOR) ATAU MODE 3-KOLOM LENGKAP */}
      {isPdfOpen ? (
        /* MODE SIDE-BY-SIDE SPLIT DENGAN RESIZABLE DIVIDER & 2-TAB TAMPILAN KANAN */
        <div
          ref={splitContainerRef}
          className="flex items-start w-full relative"
          style={{ userSelect: isDragging ? 'none' : 'auto' }}
        >
          {/* KOLOM KIRI: PANEL PDF ASLI */}
          <div
            style={{ width: `${splitRatio}%` }}
            className="shrink-0 min-w-0 pr-1.5"
          >
            <CorrectionPdfPanel
              pdfUrl={pdfUrl}
              fileName={file.name || (data.judul ? `${data.judul}.pdf` : undefined)}
              onClose={() => setIsPdfOpen(false)}
              isDragging={isDragging}
            />
          </div>

          {/* RESIZABLE DIVIDER */}
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            className={`group relative flex items-center justify-center w-3.5 h-[calc(100vh-140px)] min-h-[500px] cursor-col-resize select-none transition-colors z-20 shrink-0 ${isDragging ? 'bg-pr-500/20' : 'hover:bg-pr-500/10'
              }`}
            title="Tarik ke kiri atau kanan untuk mengatur proporsi lebar PDF dan Form Koreksi"
          >
            <div
              className={`w-1 h-14 rounded-full transition-colors flex items-center justify-center ${isDragging ? 'bg-pr-600' : 'bg-neu-300 group-hover:bg-pr-500'
                }`}
            >
              <GripVertical className="w-2.5 h-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* KOLOM KANAN: DUA TAMPILAN (TAB KOREKSI & TAB METADATA/RIWAYAT) */}
          <div
            style={{ width: `${100 - splitRatio}%` }}
            className="flex-1 min-w-0 pl-1.5 flex flex-col h-[calc(100vh-140px)] min-h-[500px]"
          >
            {/* Header Switcher Tab (Sesuai Gambar 2) */}
            <div className="flex items-center pb-3 border-b border-neu-200 mb-3 shrink-0">
              <div className="inline-flex items-center gap-1.5 bg-neu-100/90 p-1 rounded-[10px] border border-neu-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('koreksi')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'koreksi'
                      ? 'bg-white text-pr-900 shadow-2xs border border-neu-200/80'
                      : 'text-neu-600 hover:text-neu-900 hover:bg-white/50'
                    }`}
                >
                  <FileText className={`w-3.5 h-3.5 ${activeTab === 'koreksi' ? 'text-pr-900' : 'text-neu-600'}`} />
                  <span>Naskah & Koreksi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('metadata')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'metadata'
                      ? 'bg-white text-pr-900 shadow-2xs border border-neu-200/80'
                      : 'text-neu-600 hover:text-neu-900 hover:bg-white/50'
                    }`}
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${activeTab === 'metadata' ? 'text-pr-900' : 'text-neu-600'}`} />
                  <span>Riwayat & Metadata</span>
                  {(data.riwayatPerubahan?.length || 0) > 0 && (
                    <span className="px-1.5 py-0.5 bg-neu-200 text-neu-800 rounded-full text-[11px] font-bold leading-none">
                      {data.riwayatPerubahan.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Area Isi Tab */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {activeTab === 'koreksi' ? (
                <div className="flex items-start gap-3.5 h-full">
                  {/* KOLOM DAFTAR ISI (PUTIH BERSIH, TONE SAMA PERSIS DENGAN MODE TANPA PDF) */}
                  <div
                    className={`shrink-0 bg-white rounded-[16px] border border-neu-200 shadow-2xs flex flex-col overflow-hidden h-full transition-all duration-200 ${showTocInSplit ? 'w-[210px] xl:w-[230px]' : 'w-[44px]'
                      }`}
                  >
                    {showTocInSplit ? (
                      <>
                        {/* Header Kolom: Klik seluruh baris ini untuk menutup Daftar Isi */}
                        <button
                          type="button"
                          onClick={() => setShowTocInSplit(false)}
                          className="w-full flex items-center justify-between p-[14px_16px] border-b border-neu-100 bg-white hover:bg-neu-50/80 transition-colors cursor-pointer select-none text-left group shrink-0"
                          title="Klik kolom untuk menutup Daftar Isi"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <AlignLeft className="w-[18px] h-[18px] text-neu-800 shrink-0 group-hover:text-pr-900 transition-colors" />
                            <h2 className="text-[12px] font-medium text-neu-800 tracking-wide uppercase group-hover:text-pr-900 transition-colors truncate">
                              DAFTAR ISI
                            </h2>
                          </div>
                        </button>

                        {/* List Struktur Dokumen (Background Putih Bersih) */}
                        <div className="flex-1 min-h-0 overflow-hidden p-[10px_14px] bg-white">
                          <CorrectionTableOfContents
                            pembukaanJudul={data.pembukaan?.judul}
                            babList={data.babList}
                            activeSection={activeSection}
                            onPasalClick={forceExpandPasal}
                            onPembukaanClick={() => setIsOpenPembukaan(true)}
                            variant="integrated"
                            hideHeader={true}
                            className="h-full bg-white"
                          />
                        </div>
                      </>
                    ) : (
                      /* State Saat Tertutup: Kolom Ramping Putih Bersih, Klik untuk Membuka */
                      <button
                        type="button"
                        onClick={() => setShowTocInSplit(true)}
                        className="w-full h-full flex flex-col items-center justify-start pt-3.5 pb-4 cursor-pointer select-none bg-white hover:bg-neu-50/80 transition-colors group"
                        title="Klik untuk membuka Daftar Isi"
                      >
                        <div className="p-1 rounded-md text-neu-700 group-hover:text-pr-900 group-hover:scale-110 transition-all">
                          <AlignLeft className="w-[18px] h-[18px]" />
                        </div>
                        <div className="flex flex-col items-center mt-4 select-none text-[11px] font-semibold text-neu-500 group-hover:text-pr-900 transition-colors leading-[16px]">
                          <span>D</span>
                          <span>A</span>
                          <span>F</span>
                          <span>T</span>
                          <span>A</span>
                          <span>R</span>
                          <div className="h-2" />
                          <span>I</span>
                          <span>S</span>
                          <span>I</span>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* KOLOM FORM EDITOR: KARTU-KARTU PUTIH BERSIH DI ATAS KANVAS HALAMAN */}
                  <div
                    className="flex-1 min-w-0 w-full space-y-4 h-full overflow-y-auto pr-1.5 custom-scrollbar"
                    id="editor-scroll-container"
                  >
                    {renderEditorForm(true)}
                  </div>
                </div>
              ) : (
                /* TAB 2: RIWAYAT PERUBAHAN & METADATA DOKUMEN */
                <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
                    {renderTimeline()}
                    {renderMetadata()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* MODE STANDAR (3-KOLOM LENGKAP TANPA PANEL PDF) */
        <div className="flex flex-col lg:flex-row items-start gap-5">
          {/* KOLOM KIRI: DAFTAR ISI */}
          {renderTableOfContents()}

          {/* KOLOM TENGAH: EDITOR DOKUMEN HUKUM */}
          <div className="flex-1 min-w-0 w-full h-[calc(100vh-140px)] min-h-[500px]">
            {renderEditorForm()}
          </div>

          {/* KOLOM KANAN: RIWAYAT PERUBAHAN & METADATA */}
          <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 min-w-0 space-y-4 h-[calc(100vh-140px)] min-h-[500px] overflow-y-auto custom-scrollbar pr-1">
            {renderTimeline()}
            {renderMetadata()}
          </div>
        </div>
      )}
    </div>
  );
}

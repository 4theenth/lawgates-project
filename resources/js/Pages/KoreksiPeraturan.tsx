import React, { useState, useCallback, useMemo } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {
  MoveLeft,
  FileText,
  BadgeCheck,
  ScrollText,
  LockKeyhole,
  PencilLine,
  LockOpen,
  Pencil,
  Eye,
  Send,
  Search,
  Minus,
  Plus,
  X,
  CircleCheck,
} from 'lucide-react';
import { PageProps } from '@/types';
import { useToast } from '@/hooks/useToast';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface PeraturanData {
  id: number;
  unique_id: string;
  judul: string;
  pdf_url: string | null;
  has_pdf: boolean;
  jenis: string;
}

interface SectionData {
  type: 'pembukaan' | 'bab' | 'pasal';
  label: string;
  id: string;
  isi: string;
}

interface KoreksiPeraturanProps {
  peraturan: PeraturanData;
  section: SectionData;
  userEmail?: string | null;
}

type ActiveTab = 'edit' | 'perubahan';

// ─────────────────────────────────────────────
// 1. Top Bar (#3376:60798)
// ─────────────────────────────────────────────

function TopBar({
  peraturan,
  section,
  activeTab,
  onTabChange,
}: {
  peraturan: PeraturanData;
  section: SectionData;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}) {
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      router.visit(`/peraturan/${peraturan.unique_id}`);
    }
  };

  const sectionLabel = section.label || (section.type === 'pembukaan' ? 'Pembukaan' : 'Dokumen');

  return (
    <div className="w-full bg-white border border-neu-50 rounded-[15px] px-[15px] py-[9px] flex items-center justify-between min-h-[60px] shadow-2xs">
      {/* Left: Back Icon + Title & Subtitle */}
      <div className="flex items-center gap-5 min-w-0">
        <button
          type="button"
          onClick={handleBack}
          className="p-1 text-neu-900 hover:text-pr-900 transition-colors rounded-md cursor-pointer shrink-0"
          aria-label="Kembali"
        >
          <MoveLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col min-w-0">
          <span className="text-[14px] font-medium text-neu-900 leading-5 truncate">
            Koreksi {sectionLabel}
          </span>
          <span className="text-[14px] font-normal text-neu-900 leading-5 truncate max-w-[280px] sm:max-w-[650px]">
            {peraturan.judul}
          </span>
        </div>
      </div>

      {/* Right: Tab Toggle (Edit / Perubahan) */}
      <div className="flex items-center gap-[1px] p-[6px] bg-white border border-neu-50 rounded-[10px] shrink-0">
        <button
          type="button"
          onClick={() => onTabChange('edit')}
          className={`flex items-center justify-center gap-[5px] px-4 py-1 rounded-[6px] text-[14px] font-normal transition-colors cursor-pointer ${
            activeTab === 'edit'
              ? 'bg-pr-900 text-white'
              : 'text-neu-700 hover:bg-neu-50'
          }`}
        >
          <Pencil className="w-[18px] h-[18px]" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          onClick={() => onTabChange('perubahan')}
          className={`flex items-center justify-center gap-[5px] px-4 py-1 rounded-[6px] text-[14px] font-normal transition-colors cursor-pointer ${
            activeTab === 'perubahan'
              ? 'bg-pr-900 text-white'
              : 'text-neu-700 hover:bg-neu-50'
          }`}
        >
          <Eye className="w-[18px] h-[18px]" />
          <span>Perubahan</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Helper Component: Highlighted Text
// ─────────────────────────────────────────────

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark
            key={index}
            className="bg-amber-200/90 text-neu-900 rounded-[3px] px-1 py-0.5 font-medium inline-block shadow-2xs"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

// ─────────────────────────────────────────────
// 2. Panel Kiri: PDF Preview (#3384:60808)
// ─────────────────────────────────────────────

function PdfPanel({
  peraturan,
  zoom,
  searchKeyword,
  appliedSearch,
  onZoomIn,
  onZoomOut,
  onSearchChange,
  onApplySearch,
}: {
  peraturan: PeraturanData;
  zoom: number;
  searchKeyword: string;
  appliedSearch: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSearchChange: (val: string) => void;
  onApplySearch: (val: string) => void;
}) {
  const cleanPdfUrl = useMemo(() => {
    if (!peraturan.pdf_url) return null;
    const baseUrl = peraturan.pdf_url.split('#')[0];
    const searchParam = appliedSearch.trim()
      ? `search=${encodeURIComponent(appliedSearch.trim())}&`
      : '';
    return `${baseUrl}#${searchParam}toolbar=0&navpanes=0`;
  }, [peraturan.pdf_url, appliedSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onApplySearch(searchKeyword);
    }
  };

  const handleClearSearch = () => {
    onSearchChange('');
    onApplySearch('');
  };

  return (
    <div className="w-full bg-white border border-neu-50 rounded-[15px] overflow-hidden flex flex-col h-[800px] shadow-2xs">
      {/* Toolbar Header: Height 49px, Background Primary / 50 (#E7E8EC) */}
      <div className="bg-[#E7E8EC] border-b border-[#E9E9E9]/40 px-4 py-2 flex items-center justify-between gap-3 shrink-0 h-[49px]">
        {/* Search Box: Cari kata lalu tekan Enter */}
        <div className="relative w-[280px] max-w-full flex items-center">
          <Search className="w-4 h-4 text-neu-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari kata di PDF (tekan Enter)..."
            className="w-full h-[33px] bg-white rounded-[10px] border border-neu-50 pl-8 pr-8 text-[12px] text-neu-900 placeholder-neu-400 outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-all"
            style={{ outline: 'none' }}
          />
          {searchKeyword && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neu-400 hover:text-neu-700 p-0.5 rounded cursor-pointer transition-colors"
              title="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onZoomOut}
            className="w-7 h-7 bg-white rounded-[8px] flex items-center justify-center text-neu-700 hover:text-pr-900 cursor-pointer shadow-2xs transition-colors"
            title="Perkecil"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[12px] font-medium text-neu-900 select-none min-w-[36px] text-center">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={onZoomIn}
            className="w-7 h-7 bg-white rounded-[8px] flex items-center justify-center text-neu-700 hover:text-pr-900 cursor-pointer shadow-2xs transition-colors"
            title="Perbesar"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* PDF Content Area: Overflow-hidden memotong scrollbar kanan & bawah iframe */}
      <div className="flex-1 w-full bg-white overflow-hidden relative">
        {peraturan.has_pdf && cleanPdfUrl ? (
          <div
            className="w-full h-full overflow-hidden relative bg-white transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            <iframe
              key={cleanPdfUrl}
              src={cleanPdfUrl}
              className="absolute top-0 left-0 w-[calc(100%+32px)] h-[calc(100%+32px)] border-none block bg-white"
              title="Dokumen PDF Sumber"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 min-h-[450px] gap-3 text-neu-400 py-16">
            <FileText className="w-12 h-12 opacity-30" />
            <p className="text-[13px] text-center leading-relaxed text-neu-500 max-w-[320px]">
              Naskah PDF resmi saat ini belum diunggah.<br />
              Silakan gunakan teks peraturan digital di sebelah kanan sebagai acuan koreksi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. Panel Kanan: Mode Edit (#3406:72780)
// ─────────────────────────────────────────────

function EditPanel({
  section,
  suggestedText,
  appliedSearch,
  onSuggestedTextChange,
}: {
  section: SectionData;
  suggestedText: string;
  appliedSearch: string;
  onSuggestedTextChange: (val: string) => void;
}) {
  return (
    <div className="w-full h-[800px] flex flex-col justify-between">
      {/* Card 1: TEKS SAAT INI (Tinggi total ~230px) */}
      <div className="w-full h-[230px] bg-white border border-neu-50 rounded-[15px] p-[14px_15px] flex flex-col justify-between shadow-2xs">
        {/* Header Baris: Icon scroll-text + Label & Badge Hanya Baca */}
        <div className="flex items-center justify-between h-[26px]">
          <div className="flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-neu-700" />
            <span className="text-[12px] font-medium text-neu-700 uppercase tracking-wide">
              TEKS SAAT INI
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neu-50 rounded-[6px]">
            <LockKeyhole className="w-4 h-4 text-neu-900" />
            <span className="text-[12px] font-normal text-neu-900">
              Hanya Baca
            </span>
          </div>
        </div>

        {/* Area Teks Saat Ini: Height 155px (Scrollable without visible scrollbar) */}
        <div
          className="w-full h-[155px] overflow-y-auto rounded-[8px] bg-neu-50/50 p-3.5 text-[14px] font-normal text-neu-900 leading-5 text-justify whitespace-pre-wrap select-text no-scrollbar"
        >
          {section.isi ? (
            <HighlightedText text={section.isi} query={appliedSearch} />
          ) : (
            <span className="text-neu-400 italic">Tidak ada teks naskah tersedia.</span>
          )}
        </div>
      </div>

      {/* Card 2: KOREKSI ANDA (Tinggi total ~550px) */}
      <div className="w-full h-[550px] bg-white border border-neu-50 rounded-[15px] p-4 flex flex-col justify-between shadow-2xs">
        {/* Header Baris: Icon pencil-line + Label & Badge Editor Teks Aktif */}
        <div className="flex items-center justify-between h-[26px]">
          <div className="flex items-center gap-2">
            <PencilLine className="w-5 h-5 text-neu-700" />
            <span className="text-[12px] font-medium text-neu-700 uppercase tracking-wide">
              KOREKSI ANDA
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-suc-50 rounded-[6px]">
            <LockOpen className="w-4 h-4 text-suc-900" />
            <span className="text-[12px] font-normal text-suc-900">
              Editor Teks Aktif
            </span>
          </div>
        </div>

        {/* Textarea Editor: Height 468px (Border neu-50 default, tanpa outline hitam saat aktif/focus) */}
        <textarea
          value={suggestedText}
          onChange={(e) => onSuggestedTextChange(e.target.value)}
          className="w-full h-[468px] rounded-[8px] border border-neu-50 hover:border-neu-200 bg-white p-3.5 text-[14px] font-normal text-neu-900 leading-5 text-justify shadow-xs outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-colors resize-none overflow-y-auto no-scrollbar"
          placeholder="Masukkan koreksi Anda di sini..."
          spellCheck={false}
          style={{ outline: 'none' }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. Panel Kanan: Mode Perubahan (#3406:72677)
// ─────────────────────────────────────────────

function PerubahanPanel({ suggestedText }: { suggestedText: string }) {
  return (
    <div className="w-full h-[800px] bg-white border border-neu-50 rounded-[15px] p-4 flex flex-col justify-between shadow-2xs">
      {/* Header Baris */}
      <div className="flex items-center justify-between h-[26px]">
        <div className="flex items-center gap-2">
          <PencilLine className="w-5 h-5 text-neu-700" />
          <span className="text-[12px] font-medium text-neu-700 uppercase tracking-wide">
            KOREKSI ANDA
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-suc-50 rounded-[6px]">
          <LockOpen className="w-4 h-4 text-suc-900" />
          <span className="text-[12px] font-normal text-suc-900">
            Editor Teks Aktif
          </span>
        </div>
      </div>

      {/* Full-Height Preview Textarea: Tinggi ~718px (Sesuai container 800px) */}
      <textarea
        value={suggestedText}
        readOnly
        className="w-full h-[718px] rounded-[8px] border border-neu-50 bg-white p-3.5 text-[14px] font-normal text-neu-900 leading-5 text-justify shadow-xs outline-none focus:outline-none focus-visible:outline-none select-text cursor-default resize-none overflow-y-auto no-scrollbar"
        placeholder="Belum ada teks koreksi yang dimasukkan."
        style={{ outline: 'none' }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. Footer Bar Sticky (#3393:58066)
// ─────────────────────────────────────────────

function FooterBar({
  reason,
  email,
  isSubmitting,
  submitError,
  onReasonChange,
  onEmailChange,
  onCancel,
  onSubmit,
}: {
  reason: string;
  email: string;
  isSubmitting: boolean;
  submitError: string | null;
  onReasonChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="w-full bg-white border border-neu-50 rounded-[15px] p-[16px_19px] shadow-2xs flex flex-col gap-2.5 transition-all">
      {submitError && (
        <p className="text-[12px] text-dan-700 font-medium px-1">{submitError}</p>
      )}

      {/* Row Layout Sesuai Figma: Kiri width 702px, Kanan width 439px */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-6">
        {/* Kolom Kiri: Alasan Koreksi */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0 max-w-full lg:max-w-[702px]">
          <label className="text-[14px] font-normal text-neu-900">
            Alasan koreksi
          </label>
          <textarea
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="Contoh : Typo pada bab 2"
            className="w-full h-[80px] resize-none rounded-[8px] border border-neu-50 hover:border-neu-200 p-2.5 text-[14px] font-normal text-neu-900 placeholder-[#737373] outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-colors overflow-y-auto no-scrollbar"
            style={{ outline: 'none' }}
          />
        </div>

        {/* Kolom Kanan: Alamat Email + Tombol Batal & Kirim Pesan */}
        <div className="flex flex-col gap-[14px] items-stretch lg:items-end w-full lg:w-[439px] shrink-0">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[14px] font-normal text-neu-900 h-5">
              Alamat Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="email@contoh.com"
              className="w-full h-[38px] rounded-[8px] border border-neu-50 hover:border-neu-200 px-4 py-[9px] text-[14px] font-normal text-neu-900 placeholder-neu-400 outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-colors"
              style={{ outline: 'none' }}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-[8px] bg-[#F5F5F5] text-neu-700 text-[14px] font-normal hover:bg-neu-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 text-white text-[14px] font-normal hover:bg-pr-800 transition-colors cursor-pointer disabled:opacity-60 shadow-2xs"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page (Full Screen Page Layout 1200px)
// ─────────────────────────────────────────────

export default function KoreksiPeraturan({ peraturan, section, userEmail }: KoreksiPeraturanProps) {
  const { toast } = useToast();
  const { flash } = usePage<PageProps<{ flash?: { success?: string; error?: string } }>>().props;
  void flash;

  const [activeTab, setActiveTab] = useState<ActiveTab>('edit');
  const [suggestedText, setSuggestedText] = useState(section.isi || '');
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState(userEmail || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Zoom & Search state untuk PDF Viewer
  const [zoom, setZoom] = useState(100);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const handleZoomIn = useCallback(() => setZoom((prev) => Math.min(prev + 10, 150)), []);
  const handleZoomOut = useCallback(() => setZoom((prev) => Math.max(prev - 10, 50)), []);

  const handleCancel = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      router.visit(`/peraturan/${peraturan.unique_id}`);
    }
  }, [peraturan.unique_id]);

  const handleSubmit = useCallback(() => {
    setSubmitError(null);

    // Validasi client-side
    if (!suggestedText.trim()) {
      setSubmitError('Teks usulan koreksi tidak boleh kosong.');
      return;
    }
    if (suggestedText.trim() === (section.isi || '').trim()) {
      setSubmitError('Teks usulan koreksi masih identik dengan teks asli. Silakan masukkan perbaikan.');
      return;
    }

    setIsSubmitting(true);

    router.post(
      `/peraturan/${peraturan.unique_id}/koreksi`,
      {
        suggested_text: suggestedText,
        original_text: section.isi,
        section_type: section.type,
        section_label: section.label,
        section_id: section.id,
        reason: reason,
        email: email,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setShowSuccessModal(true);
          toast.success(
            'Terima kasih! Saran pembenaran Anda telah dikirim dan sedang menunggu peninjauan admin.'
          );
        },
        onError: (errors) => {
          const firstError = Object.values(errors)[0] as string;
          setSubmitError(firstError || 'Terjadi kesalahan saat mengirim saran koreksi.');
          setIsSubmitting(false);
        },
        onFinish: () => {
          setIsSubmitting(false);
        },
      }
    );
  }, [suggestedText, section, peraturan.unique_id, reason, email]);

  return (
    <>
      <Head title={`Koreksi ${section.label || 'Dokumen'} - ${peraturan.judul} - LawGates`} />

      {/* FULL SCREEN PAGE LAYOUT Sesuai Figma Frame 1440px -> Container 1200px */}
      <main className="min-h-screen w-full bg-[#F8F9FA] text-neu-900 pt-3 sm:pt-4 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* 1. Top Bar (#3376:60798) */}
          <TopBar
            peraturan={peraturan}
            section={section}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* 2. Dua Kolom: Kiri PDF Sumber (586px) vs Kanan Editor (587px) */}
          <div className="w-full flex flex-col gap-2">
            {/* Baris Label Header: PDF Sumber + Badge Salinan Sah */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[28px] items-center w-full">
              <div className="h-[28px] flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-5 h-5 text-neu-900" />
                  <span className="text-[14px] font-normal text-neu-900">PDF Sumber</span>
                </div>
                {peraturan.has_pdf && (
                  <div className="flex items-center gap-[5px] px-2.5 py-1 bg-pr-50 rounded-[10px]">
                    <BadgeCheck className="w-5 h-5 text-pr-900" />
                    <span className="text-[14px] font-normal text-pr-900">Salinan Sah</span>
                  </div>
                )}
              </div>
              {/* Penyeimbang Kolom Kanan agar kedua card di bawahnya sejajar sempurna */}
              <div className="hidden lg:block h-[28px]" />
            </div>

            {/* Baris Cards: Kedua card memiliki tinggi tepat 1002px dan sejajar atas-bawah */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[28px] items-start w-full">
              {/* Kolom Kiri: Card PDF Preview */}
              <PdfPanel
                peraturan={peraturan}
                zoom={zoom}
                searchKeyword={searchKeyword}
                appliedSearch={appliedSearch}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onSearchChange={setSearchKeyword}
                onApplySearch={setAppliedSearch}
              />

              {/* Kolom Kanan: Tab Edit vs Tab Perubahan */}
              {activeTab === 'edit' ? (
                <EditPanel
                  section={section}
                  suggestedText={suggestedText}
                  appliedSearch={appliedSearch}
                  onSuggestedTextChange={setSuggestedText}
                />
              ) : (
                <PerubahanPanel suggestedText={suggestedText} />
              )}
            </div>
          </div>

          {/* 3. Footer Bar Horizontal (#3393:58066) */}
          <FooterBar
            reason={reason}
            email={email}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onReasonChange={setReason}
            onEmailChange={setEmail}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </div>
      </main>

      {/* 4. Modal Sukses Informatif (#USER-03 / AC-3) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[420px] bg-white rounded-[20px] p-6 shadow-xl flex flex-col items-center text-center gap-4 border border-neu-50 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-suc-50 flex items-center justify-center text-suc-900">
              <CircleCheck className="w-8 h-8 text-suc-900" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[18px] font-semibold text-neu-900 leading-snug">
                Saran Koreksi Terkirim
              </h3>
              <p className="text-[13px] font-normal text-neu-600 leading-relaxed px-2">
                Terima kasih! Saran pembenaran Anda telah dikirim dan sedang menunggu peninjauan admin.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                router.visit(`/peraturan/${peraturan.unique_id}`);
              }}
              className="w-full mt-2 py-2.5 rounded-[10px] bg-pr-900 hover:bg-pr-800 text-white text-[13px] font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Kembali ke Naskah Peraturan
            </button>
          </div>
        </div>
      )}
    </>
  );
}

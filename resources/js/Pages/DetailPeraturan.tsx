import React, { useState, useEffect, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout, PAGE_CONTAINER } from '@/Layouts/PublicLayout';
import { DetailPeraturanHeader } from '@/Components/peraturan/DetailPeraturanHeader';
import { ChevronUp, X, AlertTriangle, AlignLeft } from 'lucide-react';
import { ReadonlyTableOfContents } from '@/Components/public/peraturan/ReadonlyTableOfContents';
import { ReadonlyPembukaanSection } from '@/Components/public/peraturan/ReadonlyPembukaanSection';
import { ReadonlyBatangTubuhSection } from '@/Components/public/peraturan/ReadonlyBatangTubuhSection';
import { ReadonlyTimelineSection } from '@/Components/public/peraturan/ReadonlyTimelineSection';
import RegulationGraph from '@/Components/peraturan/RegulationGraph';
import { FloatingGraphPreview } from '@/Components/peraturan/FloatingGraphPreview';
import { DetailPeraturanMobileDrawer } from '@/Components/peraturan/DetailPeraturanMobileDrawer';
import { useRegulationDocumentTree } from '@/hooks/useRegulationDocumentTree';
import { useRegulationTimeline } from '@/hooks/useRegulationTimeline';

// Format tanggal ke format Indonesia
const formatTanggal = (dateString: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export default function DetailPeraturan({ peraturan }: { peraturan: any }) {
  // Scroll to top state
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDaftarIsiOpen, setIsDaftarIsiOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Hook Pengolahan Pohon Dokumen & Navigasi (Bab, Pasal, Scroll)
  const {
    babsState,
    activeSectionId,
    searchQuery,
    setSearchQuery,
    handleToggleBab,
    handleTogglePasal,
    handleNavigateToStruktur,
    handleNavigateToPasal,
    scrollToElement,
  } = useRegulationDocumentTree(peraturan);

  // 2. Hook Pengolahan Timeline Riwayat Perubahan & Relasi
  const { timelineData } = useRegulationTimeline(peraturan);

  // 3. Data Pembukaan Dokumen
  const pembukaanData = useMemo(() => {
    if (!peraturan) {
      return {
        judul: '',
        subJudul: '',
        menimbang: '',
        mengingat: '',
        memutuskan: '',
        menetapkan: '',
      };
    }
    const strukturList = peraturan.struktur_dokumen || [];
    const pembukaanNode = strukturList.find((s: any) => s.tipe_struktur === 'PEMBUKAAN');
    const konsideransNode = strukturList.find((s: any) => s.tipe_struktur === 'KONSIDERANS');
    const dasarHukumNode = strukturList.find((s: any) => s.tipe_struktur === 'DASAR_HUKUM');
    const diktumMemutuskan = strukturList.find((s: any) => s.tipe_struktur === 'DIKTUM' && s.label?.toLowerCase() === 'memutuskan');
    const diktumMenetapkan = strukturList.find((s: any) => s.tipe_struktur === 'DIKTUM' && s.label?.toLowerCase() === 'menetapkan');

    return {
      judul: peraturan.judul || '',
      subJudul: pembukaanNode?.judul_struktur || peraturan.abstrak || '',
      menimbang: konsideransNode?.judul_struktur || '',
      mengingat: dasarHukumNode?.judul_struktur || '',
      memutuskan: diktumMemutuskan?.judul_struktur || '',
      menetapkan: diktumMenetapkan?.judul_struktur || '',
    };
  }, [peraturan]);

  const [isPembukaanOpen, setIsPembukaanOpen] = useState(true);
  const [isMenimbangOpen, setIsMenimbangOpen] = useState(true);
  const [isMengingatOpen, setIsMengingatOpen] = useState(true);
  const [isMemutuskanOpen, setIsMemutuskanOpen] = useState(true);
  const [isMenetapkanOpen, setIsMenetapkanOpen] = useState(true);

  // Format dates & active status
  const tanggalPenetapan = peraturan?.tanggal_penetapan ? formatTanggal(peraturan.tanggal_penetapan) : '-';

  // Graph State
  const [showGraph, setShowGraph] = useState(false);
  const [showFloatingPreview, setShowFloatingPreview] = useState(false);

  const handleRelasi = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowGraph(true);
    } else {
      setShowFloatingPreview(true);
    }
  };

  const canCompare = Boolean(
    peraturan?.law_relations &&
    peraturan.law_relations.some((rel: any) => {
      const name = (rel.relation_type?.nama_relasi || '').toLowerCase();
      return name.includes('ubah') || name.includes('cabut');
    })
  );

  return (
    <PublicLayout>
      <Head title={`${peraturan?.judul || 'Detail Peraturan'} - LawGates`} />

      <div className="w-full min-w-0">
        {/* ── 1. Full-Width White Hero Banner Sesuai Figma node #76:2402 ── */}
        <section className="w-full bg-white border-b border-neu-50 pt-24 sm:pt-28 pb-6 sm:pb-8">
          <div className={PAGE_CONTAINER}>
            <DetailPeraturanHeader
              breadcrumbItems={[
                { label: 'Beranda', href: '/' },
                { label: 'Pencarian Hukum', href: '/pencarian' },
                { label: 'Detail Sistem Hukum' }
              ]}
              jenisPeraturan={peraturan?.jenis_peraturan?.nama || 'UNDANG - UNDANG DASAR'}
              instansi={peraturan?.instansi || peraturan?.entitas || (peraturan?.jenis_peraturan?.kode === 'PERDA' || (peraturan?.jenis_peraturan?.nama || '').toLowerCase().includes('daerah') ? 'Pemerintah Daerah' : 'Pemerintah Pusat')}
              judul={peraturan?.judul}
              statusPeraturan={peraturan?.status_peraturan?.nama_status || 'Berlaku'}
              tanggalPenetapan={tanggalPenetapan}
              tempatPenetapan={peraturan?.tempat_penetapan || 'Jakarta'}
              onCompare={canCompare ? () => router.visit(`/bandingkan?id=${peraturan?.unique_id}`) : undefined}
              downloadHref={`/peraturan/${peraturan?.unique_id}/lihat`}
            />
          </div>
        </section>

        {/* ── 2. Content 3-Kolom Sesuai Figma node #67:2126 ── */}
        <div className={`pt-6 sm:pt-8 pb-12 sm:pb-16 ${PAGE_CONTAINER} min-w-0`}>
          {!showGraph ? (
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-5 w-full min-w-0">

              {/* Kolom Kiri: Daftar Isi (Sticky) */}
              {isDaftarIsiOpen ? (
                <div className="hidden lg:flex w-full lg:w-[258px] shrink-0 lg:sticky lg:top-28 lg:h-[calc(100vh-135px)] flex-col transition-all duration-300">
                  <ReadonlyTableOfContents
                    className="flex-1 min-h-0"
                    onHeaderClick={() => setIsDaftarIsiOpen(false)}
                  pembukaanJudul="Pembukaan"
                  pembukaanData={pembukaanData}
                  babList={babsState}
                  activeSectionId={activeSectionId}
                  onSearchChange={setSearchQuery}
                  onNavigateToStruktur={handleNavigateToStruktur}
                  onNavigateToPasal={handleNavigateToPasal}
                  onNavigateToPembukaan={() => {
                    setIsPembukaanOpen(true);
                    scrollToElement('section-pembukaan');
                  }}
                  onNavigateToSection={(sectionId) => {
                    if (sectionId === 'section-menimbang') setIsMenimbangOpen(true);
                    else if (sectionId === 'section-mengingat') setIsMengingatOpen(true);
                    else if (sectionId === 'section-memutuskan') setIsMemutuskanOpen(true);
                    else if (sectionId === 'section-menetapkan') setIsMenetapkanOpen(true);

                    setIsPembukaanOpen(true);
                    scrollToElement(sectionId);
                  }}
                />
              </div>
              ) : (
                <div className="hidden lg:flex shrink-0 lg:sticky lg:top-28 lg:h-[calc(100vh-135px)] flex-col items-center">
                  <button 
                    onClick={() => setIsDaftarIsiOpen(true)}
                    className="bg-white rounded-[20px] border border-neu-50 p-[14px_18px] shadow-2xs hover:bg-neu-50 transition-colors cursor-pointer"
                    title="Buka Daftar Isi"
                  >
                    <AlignLeft className="w-[18px] h-[18px] text-neu-800" />
                  </button>
                </div>
              )}

              {/* Kolom Tengah: Isi Peraturan (Mengikuti scroll window) */}
              <div
                id="scrollable-content"
                className="flex-1 min-w-0 w-full space-y-4 pb-6 transition-all duration-300"
              >
                {/* Banner Penjelasan jika Peraturan Masih Menunggu Impor */}
                {peraturan?.judul && (peraturan.judul.toLowerCase().includes('menunggu import') || (peraturan.judul.toLowerCase().includes('menunggu') && !peraturan?.has_pasal)) && (
                  <div className="p-4 bg-amber-50/90 border-l-4 border-amber-600 rounded-xl border border-amber-200/90 shadow-2xs flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-amber-950">
                      <h4 className="text-[13px] font-bold">Dokumen Dalam Antrean Impor</h4>
                      <p className="text-[12px] leading-relaxed text-amber-900">
                        Dokumen ini terdeteksi dalam database relasi hukum karena dirujuk oleh peraturan lain, namun naskah lengkapnya belum diunggah oleh Administrator. Naskah lengkap akan otomatis tampil setelah proses pengunggahan selesai.
                      </p>
                    </div>
                  </div>
                )}

                {/* Status Legal Warning Banner jika Peraturan Tidak Berlaku / Dicabut */}
                {(peraturan?.status_peraturan?.nama_status === 'Tidak Berlaku' || (peraturan?.status_peraturan?.nama_status || '').toLowerCase().includes('tidak')) && (
                  <div className="p-4 bg-dan-50/50 border-l-4 border-dan-900 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-dan-900 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-neu-900">
                      <h4 className="text-[12px] font-semibold">Catatan Status Hukum: Peraturan Ini Tidak Berlaku</h4>
                      <p className="text-[12px] leading-relaxed text-dan-900">
                        Dokumen peraturan ini telah dicabut atau dinyatakan tidak berlaku secara hukum. Silakan periksa bagian <span className="font-semibold">Status & Relasi</span> pada panel kanan untuk melihat peraturan pengubah / pengganti terbaru.
                      </p>
                    </div>
                  </div>
                )}

                <ReadonlyPembukaanSection
                  pembukaan={pembukaanData}
                  isOpenPembukaan={isPembukaanOpen}
                  isOpenMenimbang={isMenimbangOpen}
                  isOpenMengingat={isMengingatOpen}
                  isOpenMemutuskan={isMemutuskanOpen}
                  isOpenMenetapkan={isMenetapkanOpen}
                  onTogglePembukaan={() => setIsPembukaanOpen(!isPembukaanOpen)}
                  onToggleMenimbang={() => setIsMenimbangOpen(!isMenimbangOpen)}
                  onToggleMengingat={() => setIsMengingatOpen(!isMengingatOpen)}
                  onToggleMemutuskan={() => setIsMemutuskanOpen(!isMemutuskanOpen)}
                  onToggleMenetapkan={() => setIsMenetapkanOpen(!isMenetapkanOpen)}
                />

                <ReadonlyBatangTubuhSection
                  babList={babsState}
                  onToggleBab={handleToggleBab}
                  onTogglePasal={handleTogglePasal}
                  searchQuery={searchQuery}
                />
              </div>

              {/* Kolom Kanan: Riwayat Perubahan & Metadata dengan Tombol RELASI */}
              <div className="hidden lg:flex w-full lg:w-[258px] shrink-0 min-w-0 space-y-4 lg:sticky lg:top-28 lg:h-[calc(100vh-135px)] flex-col relative">
                <ReadonlyTimelineSection
                  riwayatPerubahan={timelineData}
                  onRelasiClick={handleRelasi}
                  className="flex-1 min-h-0"
                />

                {/* Floating Graph Preview Window (Berada tepat di atas tombol Relasi) */}
                {showFloatingPreview && (
                  <FloatingGraphPreview
                    peraturanId={peraturan?.id}
                    onClose={() => setShowFloatingPreview(false)}
                    onExpand={() => {
                      setShowFloatingPreview(false);
                      setShowGraph(true);
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            /* Layout Graph Inline (Menggantikan 3 Kolom) */
            <div className="w-full mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowGraph(false)}
                  className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  Tutup Peta Relasi & Kembali ke Teks
                </button>
              </div>

              <RegulationGraph
                peraturanId={peraturan?.id}
                onClose={() => setShowGraph(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Bottom Bar & Sheet Modal) */}
      <DetailPeraturanMobileDrawer
        pembukaanData={pembukaanData}
        babList={babsState}
        activeSectionId={activeSectionId}
        onSearchChange={setSearchQuery}
        onNavigateToStruktur={handleNavigateToStruktur}
        onNavigateToPasal={handleNavigateToPasal}
        onNavigateToPembukaan={() => {
          setIsPembukaanOpen(true);
          scrollToElement('section-pembukaan');
        }}
        onNavigateToSection={(sectionId) => {
          if (sectionId === 'section-menimbang') setIsMenimbangOpen(true);
          else if (sectionId === 'section-mengingat') setIsMengingatOpen(true);
          else if (sectionId === 'section-memutuskan') setIsMemutuskanOpen(true);
          else if (sectionId === 'section-menetapkan') setIsMenetapkanOpen(true);

          setIsPembukaanOpen(true);
          scrollToElement(sectionId);
        }}
        timelineData={timelineData}
        onRelasiClick={handleRelasi}
      />

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-4 sm:right-8 p-3 rounded-full bg-pr-900 border border-pr-800 text-white transition-all duration-300 hover:bg-pr-800 hover:scale-105 active:scale-95 z-40 flex items-center justify-center ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </PublicLayout>
  );
}
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { PublicLayout, PAGE_CONTAINER } from '@/Layouts/PublicLayout';
import { DetailPeraturanHeader } from '@/Components/peraturan/DetailPeraturanHeader';
import { X, AlertTriangle, AlignLeft } from 'lucide-react';
import { ReadonlyTableOfContents } from '@/Components/public/peraturan/ReadonlyTableOfContents';
import { ReadonlyPembukaanSection } from '@/Components/public/peraturan/ReadonlyPembukaanSection';
import { ReadonlyBatangTubuhSection } from '@/Components/public/peraturan/ReadonlyBatangTubuhSection';
import { ReadonlyTimelineSection } from '@/Components/public/peraturan/ReadonlyTimelineSection';
import RegulationGraph from '@/Components/peraturan/RegulationGraph';
import { FloatingGraphPreview } from '@/Components/peraturan/FloatingGraphPreview';
import { DetailPeraturanMobileDrawer } from '@/Components/peraturan/DetailPeraturanMobileDrawer';
import { DocumentDigitizingStatus } from '@/Components/peraturan/DocumentDigitizingStatus';
import { useToast } from '@/hooks/useToast';
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

export default function DetailPeraturan({
  peraturan,
}: {
  peraturan: any;
}) {
  const { props } = usePage<any>();
  const { toast } = useToast();
  const [isDaftarIsiOpen, setIsDaftarIsiOpen] = useState(true);

  // Aksi koreksi hanya aktif untuk pengguna publik (role: user/guest).
  // Admin dan Superadmin tidak memiliki tombol usulan koreksi di halaman naskah peraturan,
  // melainkan bertugas meninjau & memoderasi usulan di Panel Admin Antrean Koreksi.
  const isAdmin = useMemo(() => {
    const role = props.auth?.user?.role;
    if (['admin', 'superadmin'].includes(role ?? '')) {
      return true;
    }
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('from') === 'admin_koreksi') {
        return true;
      }
    }
    return false;
  }, [props.auth?.user?.role]);

  const canKoreksi = !isAdmin;

  // Deteksi query param apakah navigasi datang dari panel Admin Antrean Koreksi
  // Contoh: /peraturan/undang-undang-11-2020?from=admin_koreksi&koreksi_id=1
  const customBreadcrumbs = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    const koreksiId = urlParams.get('koreksi_id');

    if (from === 'admin_koreksi') {
      return [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Antrean Koreksi', href: '/admin/antrean-koreksi' },
        ...(koreksiId
          ? [{ label: 'Detail Koreksi', href: `/admin/antrean-koreksi/${koreksiId}` }]
          : []),
        { label: 'Detail Peraturan' },
      ];
    }
    return undefined;
  }, []);

  // Deteksi apakah record peraturan merupakan dokumen placeholder (has_pasal === false atau status draft)
  const isDraft = useMemo(() => {
    const statusName = (peraturan?.status_peraturan?.nama_status || peraturan?.status || '').toLowerCase();
    return statusName.includes('draft');
  }, [peraturan]);

  const isPlaceholder = useMemo(() => {
    if (!peraturan) return false;
    const hasPasal = peraturan.has_pasal ?? (Array.isArray(peraturan.pasal) && peraturan.pasal.length > 0);
    const hasStruktur = Array.isArray(peraturan.struktur_dokumen) && peraturan.struktur_dokumen.length > 0;
    const isMenungguImport = Boolean(peraturan.judul && peraturan.judul.toLowerCase().includes('menunggu import'));
    const isExplicitPlaceholder = Boolean(peraturan.is_placeholder);

    return !hasPasal || isDraft || isMenungguImport || isExplicitPlaceholder || (!hasStruktur && !hasPasal);
  }, [peraturan, isDraft]);

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

  // Navigasi ke halaman Koreksi Peraturan (Hanya untuk pengguna publik/user)
  const handleKoreksi = useCallback((isi: string, label: string, id: string = '', type: 'bab' | 'pasal' | 'pembukaan' = 'pembukaan') => {
    if (isAdmin) {
      toast.info('Sebagai admin/superadmin, Anda dapat meninjau dan memproses usulan koreksi di menu Antrean Koreksi.');
      return;
    }
    const params = new URLSearchParams({
      type,
      label,
      id: id || '',
      isi: isi.substring(0, 3000),
    });
    router.visit(`/peraturan/${peraturan?.unique_id}/koreksi?${params.toString()}`);
  }, [isAdmin, peraturan?.unique_id, toast]);

  // Format dates & active status
  const tanggalPenetapan = peraturan?.tanggal_penetapan ? formatTanggal(peraturan.tanggal_penetapan) : '-';

  // Graph State & History Navigation
  const [showGraph, setShowGraph] = useState(false);
  const [showFloatingPreview, setShowFloatingPreview] = useState(false);
  const showGraphRef = useRef(showGraph);
  showGraphRef.current = showGraph;
  const scrollPosRef = useRef<number>(0);

  const openGraph = useCallback(() => {
    if (typeof window !== 'undefined') {
      scrollPosRef.current = window.scrollY;
      const currentState = window.history.state || {};
      if (!currentState.relationGraph) {
        window.history.pushState({ ...currentState, relationGraph: true }, '');
      }
    }
    setShowFloatingPreview(false);
    setShowGraph(true);
  }, []);

  const closeGraph = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.state?.relationGraph) {
      window.history.back();
    } else {
      setShowGraph(false);
    }
  }, []);

  const handleRelasi = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      openGraph();
    } else {
      setShowFloatingPreview(true);
    }
  };

  // Sinkronisasi tombol navigasi browser (arrow back/forward) agar kembali ke detail dokumen
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (showGraphRef.current && !event.state?.relationGraph) {
        setShowGraph(false);
      } else if (!showGraphRef.current && event.state?.relationGraph) {
        setShowGraph(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Kembalikan posisi scroll pembacaan dokumen setelah grafik ditutup
  const prevShowGraphRef = useRef(showGraph);
  useEffect(() => {
    if (prevShowGraphRef.current && !showGraph && scrollPosRef.current > 0) {
      const savedPos = scrollPosRef.current;
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedPos, behavior: 'instant' });
      });
    }
    prevShowGraphRef.current = showGraph;
  }, [showGraph]);

  // Di mobile, saat peta relasi dibuka, posisikan scroll tepat di awal tampilan graph.
  useEffect(() => {
    if (!showGraph || typeof window === 'undefined' || window.innerWidth >= 1024) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const graphSection = document.getElementById('regulation-graph-section');
      if (!graphSection) return;

      // Posisikan tombol tutup graph tepat di bawah navbar, seperti tampilan
      // awal peta relasi di mobile.
      const headerOffset = 80;
      const offsetPosition =
        graphSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      const target = Math.max(0, offsetPosition);

      // Dari posisi jauh di bawah (mis. footer), lompat langsung agar tidak
      // terlihat diam di footer lalu bergerak perlahan ke atas.
      const isFarBelow = window.pageYOffset > target + window.innerHeight;
      window.scrollTo({ top: target, behavior: isFarBelow ? 'auto' : 'smooth' });
    });

    return () => cancelAnimationFrame(frame);
  }, [showGraph]);

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
              breadcrumbItems={
                customBreadcrumbs || [
                  { label: 'Beranda', href: '/' },
                  { label: 'Pencarian Hukum', href: '/pencarian' },
                  { label: 'Detail Sistem Hukum' }
                ]
              }
              jenisPeraturan={peraturan?.jenis_peraturan?.nama || 'UNDANG - UNDANG DASAR'}
              instansi={peraturan?.instansi || peraturan?.entitas || (peraturan?.jenis_peraturan?.kode === 'PERDA' || (peraturan?.jenis_peraturan?.nama || '').toLowerCase().includes('daerah') ? 'Pemerintah Daerah' : 'Pemerintah Pusat')}
              judul={peraturan?.judul}
              statusPeraturan={isPlaceholder ? (peraturan?.status_peraturan?.nama_status || (isDraft ? 'Draft' : 'Sedang Didigitalisasi')) : (peraturan?.status_peraturan?.nama_status || 'Berlaku')}
              tanggalPenetapan={tanggalPenetapan}
              tempatPenetapan={peraturan?.tempat_penetapan || 'Jakarta'}
              onCompare={canCompare ? () => router.visit(`/bandingkan?id=${peraturan?.unique_id}`) : undefined}
              downloadHref={`/peraturan/${peraturan?.unique_id}/lihat?download=1`}
              peraturanId={peraturan?.id}
            />
          </div>
        </section>

        {/* ── 2. Content 3-Kolom Sesuai Figma node #67:2126 ── */}
        <div className={`pt-6 sm:pt-8 pb-12 sm:pb-16 ${PAGE_CONTAINER} min-w-0`}>
          {!showGraph ? (
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-5 w-full min-w-0">

              {/* Kolom Kiri: Daftar Isi (Sticky) - Hanya jika dokumen memiliki pasal */}
              {!isPlaceholder && (
                isDaftarIsiOpen ? (
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
                )
              )}

              {/* Kolom Tengah: Isi Peraturan (Mengikuti scroll window) */}
              <div
                id="scrollable-content"
                className="flex-1 min-w-0 w-full space-y-4 pb-6 transition-all duration-300"
              >
                {isPlaceholder ? (
                  <DocumentDigitizingStatus
                    peraturan={peraturan}
                    onBack={() => {
                      if (typeof window !== 'undefined' && window.history.length > 1) {
                        window.history.back();
                      } else {
                        router.visit('/pencarian');
                      }
                    }}
                    onViewRelations={openGraph}
                  />
                ) : (
                  <>
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
                      onKoreksi={canKoreksi ? (isi, label) => handleKoreksi(isi, label, '', 'pembukaan') : undefined}
                    />

                    <ReadonlyBatangTubuhSection
                      babList={babsState}
                      onToggleBab={handleToggleBab}
                      onTogglePasal={handleTogglePasal}
                      searchQuery={searchQuery}
                      activeSectionId={activeSectionId}
                      onKoreksi={canKoreksi ? (isi, label, id, type) => handleKoreksi(isi, label, id, type) : undefined}
                    />
                  </>
                )}
              </div>

              {/* Kolom Kanan: Riwayat Perubahan & Metadata dengan Tombol RELASI */}
              <div className="hidden lg:flex w-full lg:w-[258px] shrink-0 min-w-0 space-y-4 lg:sticky lg:top-28 lg:h-[calc(100vh-135px)] flex-col relative">
                <ReadonlyTimelineSection
                  riwayatPerubahan={timelineData}
                  onRelasiClick={handleRelasi}
                  className="flex-1 min-h-0"
                  showScrollToTop
                />

                {/* Floating Graph Preview Window (Berada tepat di atas tombol Relasi) */}
                {showFloatingPreview && (
                  <FloatingGraphPreview
                    peraturanId={peraturan?.id}
                    onClose={() => setShowFloatingPreview(false)}
                    onExpand={() => {
                      openGraph();
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            /* Layout Graph Inline (Menggantikan 3 Kolom) */
            <div
              id="regulation-graph-section"
              className="w-full mt-4 sm:mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative"
            >
              <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4 px-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse shrink-0" />
                  <h2 className="text-xs sm:text-sm font-bold text-pr-900 tracking-tight truncate uppercase">
                    Peta Konstelasi Relasi Hukum
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeGraph}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 shrink-0"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                  <span>
                    <span className="hidden sm:inline">Tutup &amp; </span>Kembali ke Dokumen
                  </span>
                </button>
              </div>

              <RegulationGraph
                peraturanId={peraturan?.id}
                onClose={closeGraph}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Bottom Bar & Sheet Modal) - disembunyikan saat mode peta relasi aktif */}
      {!showGraph && (
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
          isPlaceholder={isPlaceholder}
        />
      )}
    </PublicLayout>
  );
}
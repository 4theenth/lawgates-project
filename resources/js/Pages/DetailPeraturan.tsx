import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout, PAGE_CONTAINER } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ArrowRightLeft, 
  CloudDownload,
  ChevronUp
} from 'lucide-react';
import { ChapterItem, ArticleItem } from '@/Components/admin/import/correctionParser';
import { ReadonlyTableOfContents } from '@/Components/public/peraturan/ReadonlyTableOfContents';
import { ReadonlyPembukaanSection } from '@/Components/public/peraturan/ReadonlyPembukaanSection';
import { ReadonlyBatangTubuhSection } from '@/Components/public/peraturan/ReadonlyBatangTubuhSection';
import { ReadonlyTimelineSection, ReadonlyTimelineItem } from '@/Components/public/peraturan/ReadonlyTimelineSection';

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map Data from Database to UI State
  const initialBabList = useMemo<ChapterItem[]>(() => {
    if (!peraturan) return [];
    const rawStrukturList = peraturan.struktur_dokumen || [];
    const ignoredTipes = ['PEMBUKAAN', 'KONSIDERANS', 'DASAR_HUKUM', 'DIKTUM'];
    const strukturList = rawStrukturList.filter((str: any) => !ignoredTipes.includes(str.tipe_struktur));
    
    const rawPasalList = peraturan.pasal || [];
    
    // First pass: create all ArticleItems and a map for quick lookup
    const pasalMap = new Map<string, any>();
    rawPasalList.forEach((p: any) => {
      pasalMap.set(p.id.toString(), {
        id: p.id.toString(),
        nomor: p.nomor_pasal?.toLowerCase().startsWith('pasal') ? p.nomor_pasal : `Pasal ${p.nomor_pasal}`,
        isi: p.isi_pasal,
        penjelasan: p.penjelasan?.isi_penjelasan,
        isExpanded: true,
        pasalList: [] 
      });
    });

    // Second pass: nest pasals inside parent pasals if they have parent_pasal_id
    const rootPasals: any[] = [];
    rawPasalList.forEach((p: any) => {
      const articleItem = pasalMap.get(p.id.toString())!;
      if (p.parent_pasal_id) {
        const parentArticle = pasalMap.get(p.parent_pasal_id.toString());
        if (parentArticle) {
          parentArticle.pasalList!.push(articleItem);
        } else {
          rootPasals.push(p);
        }
      } else {
        rootPasals.push(p);
      }
    });

    const map = new Map<string, ChapterItem>();
    
    // Third pass: instantiate all ChapterItems
    strukturList.forEach((str: any) => {
      const pasalsInStruktur = rootPasals.filter((p: any) => p.struktur_id === str.id);
      
      let judul = str.label || '';
      let deskripsi = '';
      if (str.judul_struktur) {
        if (!judul) {
          judul = str.judul_struktur;
        } else {
          deskripsi = str.judul_struktur;
        }
      }

      map.set(str.id.toString(), {
        id: str.id.toString(),
        judul: judul || 'BAGIAN',
        deskripsi: deskripsi,
        isExpanded: true,
        children: [],
        pasalList: pasalsInStruktur.map((p: any) => pasalMap.get(p.id.toString())!)
      });
    });

    const rootItems: ChapterItem[] = [];

    // Fourth pass: attach structural children to parents
    strukturList.forEach((str: any) => {
      const item = map.get(str.id.toString());
      if (item) {
        if (str.parent_id) {
          const parent = map.get(str.parent_id.toString());
          if (parent) {
            parent.children!.push(item);
          } else {
            rootItems.push(item);
          }
        } else {
          rootItems.push(item);
        }
      }
    });

    return rootItems;
  }, [peraturan]);

  const [babsState, setBabsState] = useState<ChapterItem[]>([]);
  
  useEffect(() => {
    setBabsState(initialBabList);
  }, [initialBabList]);

  const handleToggleBab = (babId: string) => {
    const toggleNode = (nodes: ChapterItem[], targetId: string): ChapterItem[] => {
      return nodes.map(n => {
        if (n.id === targetId) return { ...n, isExpanded: !n.isExpanded };
        if (n.children && n.children.length > 0) return { ...n, children: toggleNode(n.children, targetId) };
        return n;
      });
    };
    setBabsState(prev => toggleNode(prev, babId));
  };
  
  const handleTogglePasal = (babId: string, pasalId: string) => {
    const togglePasalInList = (pasalList: ArticleItem[], targetPasalId: string): { list: ArticleItem[], updated: boolean } => {
      let updated = false;
      const list = pasalList.map(p => {
        if (p.id === targetPasalId) {
          updated = true;
          return { ...p, isExpanded: !p.isExpanded };
        }
        if (p.pasalList && p.pasalList.length > 0) {
          const childResult = togglePasalInList(p.pasalList, targetPasalId);
          if (childResult.updated) {
            updated = true;
            return { ...p, pasalList: childResult.list };
          }
        }
        return p;
      });
      return { list, updated };
    };

    const togglePasalNode = (nodes: ChapterItem[], targetPasalId: string): ChapterItem[] => {
      return nodes.map(n => {
        const { list: newPasalList, updated } = togglePasalInList(n.pasalList || [], targetPasalId);
        
        if (updated) return { ...n, pasalList: newPasalList };
        if (n.children && n.children.length > 0) return { ...n, children: togglePasalNode(n.children, targetPasalId) };
        return n;
      });
    };
    setBabsState(prev => togglePasalNode(prev, pasalId));
  };

  const scrollToElement = (elementId: string) => {
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (!el) return;

      const container = document.getElementById('scrollable-content');
      if (container && window.innerWidth >= 1024) {
        const headerOffset = 16;
        const elementPosition = el.getBoundingClientRect().top;
        const containerPosition = container.getBoundingClientRect().top;
        const offsetPosition = elementPosition - containerPosition + container.scrollTop - headerOffset;
        container.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        const headerOffset = 120;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigateToStruktur = (strukturId: string) => {
    const expandPath = (nodes: ChapterItem[], targetId: string): { nodes: ChapterItem[], found: boolean } => {
      let foundInList = false;
      const newNodes = nodes.map(n => {
        if (n.id === targetId) {
          foundInList = true;
          return { ...n, isExpanded: true };
        }
        if (n.children && n.children.length > 0) {
          const result = expandPath(n.children, targetId);
          if (result.found) {
            foundInList = true;
            return { ...n, isExpanded: true, children: result.nodes };
          }
          return { ...n, children: result.nodes };
        }
        return n;
      });
      return { nodes: newNodes, found: foundInList };
    };
    setBabsState(prev => expandPath(prev, strukturId).nodes);
    scrollToElement(`struktur-${strukturId}`);
  };

  const handleNavigateToPasal = (pasalId: string) => {
    const expandPasalPath = (pasalList: ArticleItem[], targetId: string): { list: ArticleItem[], found: boolean } => {
      let foundInList = false;
      const newList = pasalList.map(p => {
        if (p.id === targetId) {
          foundInList = true;
          return { ...p, isExpanded: true };
        }
        if (p.pasalList && p.pasalList.length > 0) {
          const result = expandPasalPath(p.pasalList, targetId);
          if (result.found) {
            foundInList = true;
            return { ...p, isExpanded: true, pasalList: result.list };
          }
          return { ...p, pasalList: result.list };
        }
        return p;
      });
      return { list: newList, found: foundInList };
    };

    const expandStrukturPath = (nodes: ChapterItem[], targetId: string): { nodes: ChapterItem[], found: boolean } => {
      let foundInList = false;
      const newNodes = nodes.map(n => {
        const pasalResult = expandPasalPath(n.pasalList || [], targetId);
        if (pasalResult.found) {
          foundInList = true;
          return { ...n, isExpanded: true, pasalList: pasalResult.list };
        }
        if (n.children && n.children.length > 0) {
          const result = expandStrukturPath(n.children, targetId);
          if (result.found) {
            foundInList = true;
            return { ...n, isExpanded: true, children: result.nodes };
          }
          return { ...n, children: result.nodes };
        }
        return n;
      });
      return { nodes: newNodes, found: foundInList };
    };
    
    setBabsState(prev => expandStrukturPath(prev, pasalId).nodes);
    scrollToElement(`section-${pasalId}`);
  };

  // Pembukaan Data
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

  // Timeline State
  const timelineData = useMemo<ReadonlyTimelineItem[]>(() => {
    if (!peraturan) return [];
    const relations = peraturan.law_relations || [];

    const beforeCurrent: ReadonlyTimelineItem[] = [];
    const afterCurrent: ReadonlyTimelineItem[] = [];

    relations.forEach((rel: any, index: number) => {
      const relName = rel.relation_type?.nama_relasi || 'Terkait';
      const isMencabut = relName.toLowerCase().includes('mencabut');
      let variant: 'diubah' | 'mengubah' | 'dicabut' = 'mengubah';

      if (relName.toLowerCase().includes('diubah')) variant = 'diubah';
      else if (isMencabut) variant = 'dicabut';

      const item: ReadonlyTimelineItem = {
        id: `rel-${index}`,
        kode: rel.to_peraturan?.unique_id || '',
        judul: rel.to_peraturan?.judul || rel.to_peraturan?.unique_id || '',
        href: `/peraturan/${rel.to_peraturan?.unique_id || ''}`,
        keteranganBadge: {
          label: relName,
          variant: variant
        },
        statusBadge: {
          label: 'Tahun ' + (rel.to_peraturan?.tahun || '-'),
          variant: 'tersedia'
        },
        isCurrent: false
      };

      // Jika relasinya "Diubah" atau "Dicabut" artinya aturan tersebut mengubah aturan ini, taruh di atas
      if (variant === 'diubah' || variant === 'dicabut') {
        beforeCurrent.push(item);
      } else {
        afterCurrent.push(item);
      }
    });

    const currentItem: ReadonlyTimelineItem = {
      id: 'current',
      kode: peraturan.unique_id || '',
      judul: peraturan.judul,
      isCurrent: true,
    };

    return [...beforeCurrent, currentItem, ...afterCurrent];
  }, [peraturan]);

  // Format dates & active status
  const tanggalPenetapan = peraturan?.tanggal_penetapan ? formatTanggal(peraturan.tanggal_penetapan) : '-';
  const isActive = peraturan?.status_peraturan?.nama_status?.toLowerCase().includes('berlaku') && 
                   !peraturan?.status_peraturan?.nama_status?.toLowerCase().includes('tidak');

  const handleRelasi = () => {
    scrollToElement('section-pembukaan');
  };

  return (
    <PublicLayout>
      <Head title={`${peraturan?.judul || 'Detail Peraturan'} - LawGates`} />

      <div className="w-full min-w-0 overflow-x-hidden">
        <div className={`pt-20 sm:pt-24 pb-8 sm:pb-12 ${PAGE_CONTAINER} text-gray-900 min-w-0`}>
          
          {/* Breadcrumb Navigasi */}
          <div className="mb-4 sm:mb-5">
            <Breadcrumb 
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Pencarian Hukum', href: '/pencarian' },
                { label: 'Detail Dokumen Hukum' }
              ]} 
            />
          </div>

          {/* Header Metadata Sesuai Desain */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            {/* 1. Kategori Peraturan & Instansi */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#E5E7EB] text-gray-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                {peraturan?.jenis_peraturan?.nama || 'UNDANG - UNDANG DASAR'}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium flex items-center gap-1.5">
                <span className="text-gray-400">•</span>
                <span>{peraturan?.entitas || 'Pemerintah Pusat'}</span>
              </span>
            </div>

            {/* 2. Judul Dokumen & Action Buttons (Bandingkan & Download Dokumen) */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-[#111827] leading-tight max-w-4xl tracking-tight">
                {peraturan?.judul}
              </h1>

              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                {/* Tombol Bandingkan */}
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Fitur belum tersedia"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-[#E5E7EB] hover:bg-gray-300 text-gray-800 text-xs sm:text-sm font-semibold rounded-2xl transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                  <span>Bandingkan</span>
                </Link>

                {/* Tombol Download Dokumen */}
                {peraturan?.unique_id ? (
                  <a 
                    href={`/peraturan/${peraturan.unique_id}/download`}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#0A1931] hover:bg-[#071326] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-sm transition-colors cursor-pointer"
                  >
                    <CloudDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    <span>Lihat / Download Dokumen</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert('Dokumen PDF tidak tersedia untuk peraturan ini.')}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-400 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-sm cursor-not-allowed"
                    disabled
                  >
                    <CloudDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    <span>Lihat / Download Dokumen</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3. Badges Metadata: Status, Tanggal Ditetapkan, Tempat Penetapan */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm pt-1">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full font-semibold border ${
                isActive 
                  ? 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#15803D]" />
                <span>{peraturan?.status_peraturan?.nama_status || 'Berlaku'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 bg-[#F3F4F6] text-gray-700 rounded-full font-medium">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                <span>Ditetapkan: {tanggalPenetapan}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 bg-[#F3F4F6] text-gray-700 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                <span>Tempat Penetapan : {peraturan?.tempat_penetapan || '-'}</span>
              </span>
            </div>
          </div>

            {/* Layout 3-Kolom: Sesuai Proporsi Form Koreksi Data (Daftar Isi Kiri, Editor Utama Tengah Panjang, Status Kanan) */}
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-5 w-full min-w-0">
              
              {/* Kolom Kiri: Daftar Isi (Ramping seperti Form Koreksi Data) */}
              <div className="w-full lg:w-[220px] xl:w-[240px] shrink-0 lg:sticky lg:top-28">
                <ReadonlyTableOfContents
                  pembukaanJudul="Pembukaan"
                  pembukaanData={pembukaanData}
                  babList={babsState}
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

              {/* Kolom Tengah: Isi Peraturan (Sticky, Scrollable, Lebih Panjang Sedikit dari Kolom Kiri & Kanan) */}
              <div 
                id="scrollable-content"
                className="flex-1 min-w-0 w-full space-y-4 lg:sticky lg:top-28 lg:h-[calc(100vh-105px)] lg:overflow-y-auto lg:pr-2.5 custom-scrollbar scroll-smooth pb-12"
              >
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
                />
              </div>

              {/* Kolom Kanan: Riwayat Perubahan & Metadata dengan Tombol RELASI */}
              <div className="w-full lg:w-[240px] xl:w-[260px] shrink-0 min-w-0 space-y-4 lg:sticky lg:top-28">
                <ReadonlyTimelineSection 
                  riwayatPerubahan={timelineData} 
                  onRelasiClick={handleRelasi}
                />
              </div>

            </div>
          </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#0A1931] text-white shadow-xl transition-all duration-300 hover:bg-blue-900 hover:scale-110 z-50 flex items-center justify-center ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </PublicLayout>
  );
}
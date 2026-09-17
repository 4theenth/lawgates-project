import { Head, Link } from '@inertiajs/react';
import { PublicLayout, Section } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ArrowRightLeft, 
  CloudDownload,
  ChevronUp
} from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import { ChapterItem, ArticleItem } from '@/Components/admin/import/correctionParser';
import { ReadonlyTableOfContents } from '@/Components/public/peraturan/ReadonlyTableOfContents';
import { ReadonlyPembukaanSection } from '@/Components/public/peraturan/ReadonlyPembukaanSection';
import { ReadonlyBatangTubuhSection } from '@/Components/public/peraturan/ReadonlyBatangTubuhSection';
import { ReadonlyTimelineSection, ReadonlyTimelineItem } from '@/Components/public/peraturan/ReadonlyTimelineSection';

// Format tanggal ke format Indonesia
const formatTanggal = (dateString: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
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

    const unassignedPasals = rootPasals.filter((p: any) => !p.struktur_id);
    
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

    setTimeout(() => {
      const el = document.getElementById(`struktur-${strukturId}`);
      if (el) {
        const headerOffset = 120;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
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

    setTimeout(() => {
      const el = document.getElementById(`section-${pasalId}`);
      if (el) {
        const headerOffset = 120;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  };

  // Pembukaan State
  const pembukaanData = useMemo(() => {
    const strukturList = peraturan.struktur_dokumen || [];
    const pembukaanNode = strukturList.find((s: any) => s.tipe_struktur === 'PEMBUKAAN');
    const konsideransNode = strukturList.find((s: any) => s.tipe_struktur === 'KONSIDERANS');
    const dasarHukumNode = strukturList.find((s: any) => s.tipe_struktur === 'DASAR_HUKUM');
    const diktumMemutuskan = strukturList.find((s: any) => s.tipe_struktur === 'DIKTUM' && s.label?.toLowerCase() === 'memutuskan');
    const diktumMenetapkan = strukturList.find((s: any) => s.tipe_struktur === 'DIKTUM' && s.label?.toLowerCase() === 'menetapkan');

    return {
      judul: peraturan.judul,
      subJudul: pembukaanNode?.judul_struktur || peraturan.abstrak || '',
      menimbang: konsideransNode?.judul_struktur || '', 
      mengingat: dasarHukumNode?.judul_struktur || '',
      memutuskan: diktumMemutuskan?.judul_struktur || '',
      menetapkan: diktumMenetapkan?.judul_struktur || '',
      isExpanded: true
    };
  }, [peraturan]);

  const [isPembukaanOpen, setIsPembukaanOpen] = useState(true);
  const [isMenimbangOpen, setIsMenimbangOpen] = useState(true);
  const [isMengingatOpen, setIsMengingatOpen] = useState(true);
  const [isMemutuskanOpen, setIsMemutuskanOpen] = useState(true);
  const [isMenetapkanOpen, setIsMenetapkanOpen] = useState(true);

  // Timeline State
  const timelineData = useMemo<ReadonlyTimelineItem[]>(() => {
    const relations = peraturan.law_relations || [];
    
    const beforeCurrent: ReadonlyTimelineItem[] = [];
    const afterCurrent: ReadonlyTimelineItem[] = [];

    relations.forEach((rel: any, index: number) => {
      const relName = rel.relation_type?.nama_relasi || 'Terkait';
      const isMencabut = relName.toLowerCase().includes('cabut');
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
        // Jika "Mengubah" atau "Mencabut" taruh di bawah
        afterCurrent.push(item);
      }
    });

    const currentItem: ReadonlyTimelineItem = {
      id: 'current',
      kode: peraturan.unique_id || '',
      judul: peraturan.judul,
      isCurrent: true,
      currentStatusLabel: 'Dokumen Saat Ini'
    };

    return [...beforeCurrent, currentItem, ...afterCurrent];
  }, [peraturan]);

  // Format dates
  const tanggalPenetapan = peraturan.tanggal_penetapan ? formatTanggal(peraturan.tanggal_penetapan) : '-';
  const isActive = peraturan.status_peraturan?.nama_status?.toLowerCase().includes('berlaku') && 
                   !peraturan.status_peraturan?.nama_status?.toLowerCase().includes('tidak');
  
  return (
    <PublicLayout>
      <Head title={`${peraturan.judul} - LawGates`} />
      
      <div className="bg-[#F8F9FA] min-h-screen pb-16">
        <Section fullWidth>
          <div className="pt-28 pb-8 w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 lg:px-8 xl:px-12 text-gray-900">
            
            {/* Breadcrumb Navigasi */}
            <div className="mb-6">
              <Breadcrumb 
                items={[
                  { label: 'Beranda', href: '/' },
                  { label: 'Pencarian Hukum', href: '/pencarian' },
                  { label: 'Detail Dokumen Hukum' }
                ]} 
              />
            </div>

            {/* Header Metadata */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div className="flex gap-3 text-xs font-semibold text-gray-600 uppercase tracking-wider items-center">
                  <span className="bg-gray-200 px-3 py-1 rounded-full">{peraturan.jenis_peraturan?.nama || 'PERATURAN'}</span>
                  <span>•</span>
                  <span>{peraturan.entitas || 'Pemerintah Pusat'}</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-full transition-colors cursor-pointer">
                    <ArrowRightLeft className="w-4 h-4" />
                    Bandingkan
                  </button>
                  {peraturan.file_pdf && (
                    <a 
                      href={`/storage/${peraturan.file_pdf}`} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2 bg-[#0A1931] hover:bg-blue-900 text-white text-sm font-semibold rounded-full shadow-sm transition-colors cursor-pointer"
                    >
                      <CloudDownload className="w-4 h-4" />
                      Download Dokumen
                    </a>
                  )}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight max-w-4xl">
                {peraturan.judul}
              </h1>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold border ${isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  {peraturan.status_peraturan?.nama_status || 'Berlaku'}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full font-medium">
                  <Calendar className="w-4 h-4" />
                  Ditetapkan {tanggalPenetapan}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full font-medium">
                  <MapPin className="w-4 h-4" />
                  Tempat Penetapan : {peraturan.tempat_penetapan || '-'}
                </span>
              </div>
            </div>

            {/* Layout 3-Kolom Menggunakan Komponen Readonly Baru */}
            <div className="flex flex-col lg:flex-row items-start gap-6">
              
              {/* Kolom Kiri: Daftar Isi */}
              <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 lg:sticky lg:top-28">
                <ReadonlyTableOfContents
                  pembukaanJudul="Pembukaan"
                  pembukaanData={pembukaanData}
                  babList={babsState}
                  onNavigateToStruktur={handleNavigateToStruktur}
                  onNavigateToPasal={handleNavigateToPasal}
                  onNavigateToPembukaan={() => {
                    setIsPembukaanOpen(true);
                    setTimeout(() => {
                      const el = document.getElementById('section-pembukaan');
                      if (el) {
                        const headerOffset = 120;
                        const elementPosition = el.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }, 100);
                  }}
                  onNavigateToSection={(sectionId) => {
                    if (sectionId === 'section-menimbang') setIsMenimbangOpen(true);
                    else if (sectionId === 'section-mengingat') setIsMengingatOpen(true);
                    else if (sectionId === 'section-memutuskan') setIsMemutuskanOpen(true);
                    else if (sectionId === 'section-menetapkan') setIsMenetapkanOpen(true);
                    
                    setIsPembukaanOpen(true);
                    
                    setTimeout(() => {
                      const el = document.getElementById(sectionId);
                      if (el) {
                        const headerOffset = 120;
                        const elementPosition = el.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }, 100);
                  }}
                />
              </div>

              {/* Kolom Tengah: Isi Peraturan */}
              <div className="flex-1 min-w-0 w-full space-y-4">
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

              {/* Kolom Kanan: Riwayat Perubahan & Metadata */}
              <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 min-w-0 space-y-4 lg:sticky lg:top-28">
                <ReadonlyTimelineSection riwayatPerubahan={timelineData} />
              </div>

            </div>
          </div>
        </Section>
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
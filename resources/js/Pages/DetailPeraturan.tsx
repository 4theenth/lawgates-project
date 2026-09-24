import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useToast } from '@/hooks/useToast';
import { PublicLayout, PAGE_CONTAINER } from '@/Layouts/PublicLayout';
import { DetailPeraturanHeader } from '@/Components/peraturan/DetailPeraturanHeader';
import { ChevronUp } from 'lucide-react';
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
  const { flash } = usePage<any>().props;
  const { toast } = useToast();

  // Tampilkan toast jika ada flash message dari backend (misal: gagal download)
  useEffect(() => {
    if (flash?.error) {
      toast.error(flash.error);
    }
    if (flash?.success) {
      toast.success(flash.success);
    }
  }, [flash]);

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

      const toPeraturan = rel.to_peraturan;
      const rawJudul = toPeraturan?.judul || '';
      const isWaitingImport = rawJudul.toLowerCase().includes('menunggu import');
      const hasUniqueId = Boolean(toPeraturan?.unique_id);

      // Dokumen belum ada / belum ditambahkan ke database jika to_peraturan null, atau menunggu import, atau tidak ada unique_id
      const isAvailable = Boolean(toPeraturan && !isWaitingImport && hasUniqueId);

      // Bersihkan teks "Menunggu import dokumen: xxx" agar menjadi judul peraturan yang rapi sesuai desain
      let displayJudul = rawJudul || rel.to_peraturan_id || 'Peraturan Terkait';
      if (isWaitingImport) {
        const rawName = rawJudul.replace(/^menunggu import dokumen:\s*/i, '').trim();
        const formatted = rawName
          .replace(/^undang-undang-(\d+)-(\d+)/i, 'Undang-Undang Nomor $1 Tahun $2')
          .replace(/^undang-(\d+)-(\d+)/i, 'Undang-Undang Nomor $1 Tahun $2')
          .replace(/^uu-(\d+)-(\d+)/i, 'Undang-Undang Nomor $1 Tahun $2')
          .replace(/^perpu-(\d+)-(\d+)/i, 'Peraturan Pemerintah Pengganti Undang-Undang Nomor $1 Tahun $2')
          .replace(/^pp-(\d+)-(\d+)/i, 'Peraturan Pemerintah Nomor $1 Tahun $2');

        if (formatted !== rawName) {
          displayJudul = formatted;
        } else {
          displayJudul = rawName
            .split(/[-_]/)
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        }
      }

      const item: ReadonlyTimelineItem = {
        id: `rel-${index}`,
        kode: toPeraturan?.unique_id || '',
        judul: displayJudul,
        href: isAvailable ? `/peraturan/${toPeraturan?.unique_id}` : undefined,
        isAvailable: isAvailable,
        keteranganBadge: {
          label: relName,
          variant: variant
        },
        statusBadge: {
          label: 'Tahun ' + (toPeraturan?.tahun || '-'),
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
      isAvailable: true,
      keteranganBadge: {
        label: peraturan.status_peraturan?.nama_status || 'Diubah',
        variant: 'diubah'
      }
    };

    return [...beforeCurrent, currentItem, ...afterCurrent];
  }, [peraturan]);

  // Format dates & active status
  const tanggalPenetapan = peraturan?.tanggal_penetapan ? formatTanggal(peraturan.tanggal_penetapan) : '-';

  // Handler download dokumen di background tanpa reload / tab baru
  const handleDownload = () => {
    if (!peraturan?.unique_id) return;
    const link = document.createElement('a');
    link.href = `/peraturan/${peraturan.unique_id}/download`;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRelasi = () => {
    scrollToElement('section-pembukaan');
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

      <div className="w-full min-w-0 overflow-x-hidden">
        <div className={`pt-20 sm:pt-24 pb-8 sm:pb-12 ${PAGE_CONTAINER} text-gray-900 min-w-0`}>
          
          {/* Header Metadata Sesuai Desain Reusable */}
          <DetailPeraturanHeader
            breadcrumbItems={[
              { label: 'Beranda', href: '/' },
              { label: 'Pencarian Hukum', href: '/pencarian' },
              { label: 'Detail Sistem Hukum' }
            ]}
            jenisPeraturan={peraturan?.jenis_peraturan?.nama || 'UNDANG - UNDANG DASAR'}
            instansi={peraturan?.entitas || 'Pemerintah Pusat'}
            judul={peraturan?.judul}
            statusPeraturan={peraturan?.status_peraturan?.nama_status || 'Berlaku'}
            tanggalPenetapan={tanggalPenetapan}
            tempatPenetapan={peraturan?.tempat_penetapan || 'Jakarta'}
            onCompare={canCompare ? () => router.visit(`/bandingkan?id=${peraturan?.unique_id}`) : undefined}
            downloadHref={`/peraturan/${peraturan?.unique_id}/lihat`}
          />

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
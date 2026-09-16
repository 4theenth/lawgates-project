import { Head, Link } from '@inertiajs/react';
import { PublicLayout, Section } from '@/Layouts/PublicLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ArrowRightLeft, 
  CloudDownload,
  List,
  BookOpen,
  History,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Download
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

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
  // Main Panel Toggle States
  const [isDaftarIsiOpen, setIsDaftarIsiOpen] = useState(true);
  const [isIsiPeraturanOpen, setIsIsiPeraturanOpen] = useState(true);
  const [isRiwayatOpen, setIsRiwayatOpen] = useState(true);

  // Scroll to top state
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Daftar Isi Accordion State
  const [expandedStruktur, setExpandedStruktur] = useState<number[]>([]);

  const toggleStruktur = (id: number) => {
    setExpandedStruktur(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Group pasals by struktur_id
  const strukturList = peraturan.struktur_dokumen || [];
  const pasalList = peraturan.pasal || [];
  
  const contentData = strukturList.map((str: any) => ({
    ...str,
    pasals: pasalList.filter((p: any) => p.struktur_id === str.id)
  }));
  const unassignedPasals = pasalList.filter((p: any) => !p.struktur_id);

  // Format dates
  const tanggalPenetapan = peraturan.tanggal_penetapan ? formatTanggal(peraturan.tanggal_penetapan) : '-';
  const isActive = peraturan.status_peraturan?.nama_status?.toLowerCase().includes('berlaku') && 
                   !peraturan.status_peraturan?.nama_status?.toLowerCase().includes('tidak');
  
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <PublicLayout>
      <Head title={`${peraturan.judul} - LawGates`} />
      
      <div className="bg-[#F8F9FA] min-h-screen pb-16">
        <Section>
          <div className="pt-28 pb-8 w-full max-w-7xl mx-auto px-4 text-gray-900">
            
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
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-full transition-colors">
                    <ArrowRightLeft className="w-4 h-4" />
                    Bandingkan
                  </button>
                  {peraturan.file_pdf && (
                    <a 
                      href={`/storage/${peraturan.file_pdf}`} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2 bg-[#0A1931] hover:bg-blue-900 text-white text-sm font-semibold rounded-full shadow-sm transition-colors"
                    >
                      <CloudDownload className="w-4 h-4" />
                      Download Dokumen
                    </a>
                  )}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">
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

            {/* Grid 3 Kolom Sesuai Desain */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Kolom Kiri: Daftar Isi (3 Span) */}
              <div className="lg:col-span-3">
                <div className="sticky top-28 bg-white lg:bg-transparent rounded-2xl lg:rounded-none p-5 lg:p-0 shadow-sm lg:shadow-none border border-gray-100 lg:border-none">
                  <div 
                    className="flex items-center justify-between gap-2 text-gray-800 font-bold mb-6 cursor-pointer"
                    onClick={() => setIsDaftarIsiOpen(!isDaftarIsiOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <List className="w-5 h-5 text-gray-500" />
                      <h3 className="uppercase tracking-wide">DAFTAR ISI</h3>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      {isDaftarIsiOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isDaftarIsiOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="space-y-1 overflow-y-auto max-h-[65vh] pr-2 scrollbar-thin">
                        {contentData.length > 0 ? (
                          contentData.map((str: any, idx: number) => {
                            const isExpanded = expandedStruktur.includes(str.id);
                            const hasChildren = str.pasals && str.pasals.length > 0;
                            
                            let displayTitle = str.label || '';
                            if (str.judul_struktur) {
                              const labelLower = (str.label || '').toLowerCase().trim();
                              const isPreamble = ['pembukaan', 'menimbang', 'mengingat', 'memutuskan', 'menetapkan'].includes(labelLower);
                              
                              if (!str.label) {
                                displayTitle = str.judul_struktur;
                              } else if (!isPreamble && str.judul_struktur.length <= 100) {
                                displayTitle = `${str.label} - ${str.judul_struktur}`;
                              }
                            }
                            
                            return (
                              <div key={str.id} className="text-sm mb-1">
                                <button 
                                  onClick={(e) => {
                                    if (hasChildren) {
                                      toggleStruktur(str.id);
                                    } else {
                                      scrollToSection(e, `struktur-${str.id}`);
                                    }
                                  }}
                                  className={`flex items-center justify-between w-full px-3 py-2.5 text-left transition-all ${
                                    isExpanded 
                                      ? 'bg-white shadow-sm border border-gray-100 rounded-md font-semibold text-gray-800' 
                                      : 'text-gray-700 hover:bg-gray-100 rounded-md font-medium'
                                  }`}
                                >
                                  <span className="line-clamp-2">{displayTitle}</span>
                                  {hasChildren && (
                                    isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500 shrink-0 ml-2" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                                  )}
                                </button>
                                
                                {/* Children (Pasal) */}
                                {isExpanded && hasChildren && (
                                  <div className="pl-4 py-1 border-l border-gray-200 ml-4 space-y-1 mt-1">
                                    {str.pasals.map((pasal: any) => (
                                      <a 
                                        href={`#pasal-${pasal.id}`} 
                                        onClick={(e) => scrollToSection(e, `pasal-${pasal.id}`)}
                                        key={pasal.id} 
                                        className="block w-full text-left px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded text-xs transition-colors"
                                      >
                                        Pasal {pasal.nomor_pasal}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-sm text-gray-500 px-3">Tidak ada daftar isi</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Tengah: Isi Peraturan (6 Span) */}
              <div className="lg:col-span-6">
                <div 
                  className="flex items-center justify-between gap-2 text-gray-800 font-bold mb-6 cursor-pointer bg-white lg:bg-transparent rounded-xl lg:rounded-none p-4 lg:p-0 shadow-sm lg:shadow-none border border-gray-100 lg:border-none"
                  onClick={() => setIsIsiPeraturanOpen(!isIsiPeraturanOpen)}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gray-500" />
                    <h3 className="uppercase tracking-wide">Isi Peraturan</h3>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    {isIsiPeraturanOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isIsiPeraturanOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-6 pb-4">
                      {/* Abstrak / Pembukaan */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 font-bold text-gray-800 mb-4 uppercase text-sm">
                          <div className="w-2 h-2 bg-[#0A1931] rounded-full"></div>
                          PEMBUKAAN
                        </div>
                        <div className="border-l-4 border-[#0A1931] pl-4 py-1 bg-gray-50/50 rounded-r-lg text-sm text-gray-700 leading-relaxed">
                          <p className="font-bold text-gray-900 mb-2">{peraturan.judul}</p>
                          <p>{peraturan.abstrak || 'Tidak ada abstrak atau pembukaan yang tersedia untuk dokumen ini.'}</p>
                        </div>
                      </div>

                      {/* Render Struktur dan Pasal yang Dikelompokkan */}
                      {contentData.map((str: any) => (
                        <div id={`struktur-${str.id}`} key={`content-str-${str.id}`} className="space-y-4">
                          <div className="flex items-center gap-2 font-bold text-gray-800 mt-6 mb-2 uppercase text-sm border-b pb-2">
                            {str.label} {str.judul_struktur ? `- ${str.judul_struktur}` : ''}
                          </div>
                          
                          {str.pasals && str.pasals.map((pasal: any) => (
                            <div id={`pasal-${pasal.id}`} key={`content-pasal-${pasal.id}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                              <div className="inline-block px-4 py-1.5 bg-[#0A1931] text-white text-xs font-bold rounded-md mb-4 shadow-sm">
                                Pasal {pasal.nomor_pasal}
                              </div>
                              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-1">
                                {pasal.isi_pasal}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                      {/* Render Pasal yang tidak memiliki struktur_id (jika ada) */}
                      {unassignedPasals.length > 0 && (
                        <div className="space-y-4 pt-4">
                          {unassignedPasals.map((pasal: any) => (
                            <div id={`pasal-${pasal.id}`} key={`content-pasal-${pasal.id}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                              <div className="inline-block px-4 py-1.5 bg-[#0A1931] text-white text-xs font-bold rounded-md mb-4 shadow-sm">
                                Pasal {pasal.nomor_pasal}
                              </div>
                              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-1">
                                {pasal.isi_pasal}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Fallback Jika Kosong */}
                      {contentData.length === 0 && unassignedPasals.length === 0 && (
                        <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">
                          Belum ada data isi peraturan.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Riwayat Perubahan (3 Span) */}
              <div className="lg:col-span-3">
                <div className="sticky top-28">
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <div 
                      className="flex items-center justify-between gap-2 text-gray-800 font-bold mb-6 cursor-pointer"
                      onClick={() => setIsRiwayatOpen(!isRiwayatOpen)}
                    >
                      <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-gray-500" />
                        <h3 className="uppercase tracking-wide text-sm">Status & Relasi</h3>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        {isRiwayatOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isRiwayatOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        {peraturan.law_relations && peraturan.law_relations.length > 0 ? (
                          <div className="space-y-4 mb-4 overflow-y-auto max-h-[65vh] pr-2 scrollbar-thin">
                            {peraturan.law_relations.map((rel: any, index: number) => {
                              const relName = rel.relation_type?.nama_relasi || 'Terkait';
                              // Berikan warna badge berdasarkan tipe relasi
                              const isMencabut = relName.toLowerCase().includes('cabut');
                              const isUbah = relName.toLowerCase().includes('ubah');
                              const badgeClass = isMencabut 
                                ? 'bg-red-100 text-red-700' 
                                : isUbah ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700';

                              return (
                                <Link 
                                  key={index} 
                                  href={`/peraturan/${rel.to_peraturan?.unique_id || ''}`}
                                  className="block p-4 border border-gray-100 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group bg-gray-50/50 hover:bg-blue-50/30"
                                >
                                  <div className="flex flex-col items-start gap-2 mb-2">
                                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${badgeClass}`}>
                                      {relName}
                                    </span>
                                  </div>
                                  <p className="text-xs leading-snug font-semibold text-gray-800 group-hover:text-blue-900 transition-colors">
                                    {rel.to_peraturan?.judul}
                                  </p>
                                  <div className="mt-3 flex items-center gap-2 text-[10px] font-medium text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    Tahun {rel.to_peraturan?.tahun || '-'}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-xs text-gray-500 italic">Tidak ada catatan relasi hukum.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
import React, { useEffect, useRef, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { DetailPeraturanHeader } from '@/Components/peraturan/DetailPeraturanHeader';
import { useToast } from '@/hooks/useToast';
import { FileQuestion } from 'lucide-react';

interface DokumenViewerProps {
  peraturan: any;
  pdfUrl?: string | null;
  hasPdf?: boolean;
}

const formatTanggal = (dateString?: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export default function DokumenViewer({ peraturan, pdfUrl, hasPdf }: DokumenViewerProps) {
  const { toast } = useToast();
  const hasAutoDownloaded = useRef(false);

  const triggerDownload = useCallback((showError = false) => {
    if (!hasPdf || !pdfUrl) {
      if (showError) {
        toast.error('Dokumen PDF saat ini belum tersedia');
      }
      return;
    }
    const link = document.createElement('a');
    link.href = `/peraturan/${peraturan.unique_id}/download`;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [hasPdf, pdfUrl, peraturan?.unique_id, toast]);

  const handleDownload = () => {
    triggerDownload(true);
  };

  // Unduh otomatis sekali ketika pengguna datang dari tombol "Download Dokumen" pada detail peraturan
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldDownload = params.get('download') === '1' || params.has('download');

    if (shouldDownload && hasPdf && !hasAutoDownloaded.current) {
      hasAutoDownloaded.current = true;
      // Delay kecil agar viewer PDF dapat merender iframe terlebih dahulu secara mulus
      const timer = setTimeout(() => {
        triggerDownload(false);
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hasPdf, triggerDownload]);

  return (
    <PublicLayout>
      <Head title={`Dokumen ${peraturan.judul} - LawGates`} />

      <div className="w-full min-w-0 overflow-x-hidden">
        <div className="pt-24 pb-12 sm:pb-16 w-full max-w-[1240px] mx-auto px-4 sm:px-6 text-gray-900 min-w-0">
          {/* Header Metadata Sesuai Desain Tangkapan Layar */}
          <DetailPeraturanHeader
            breadcrumbItems={[
              { label: 'Beranda', href: '/' },
              { label: 'Pencarian Hukum', href: '/pencarian' },
              { label: 'Detail Sistem Hukum', href: `/peraturan/${peraturan.unique_id}` },
              { label: 'Dokumen' },
            ]}
            jenisPeraturan={peraturan.jenis_peraturan?.nama || 'UNDANG - UNDANG DASAR'}
            instansi={peraturan.instansi || peraturan.entitas || (peraturan.jenis_peraturan?.kode === 'PERDA' || (peraturan.jenis_peraturan?.nama || '').toLowerCase().includes('daerah') ? 'Pemerintah Daerah' : 'Pemerintah Pusat')}
            judul={peraturan.judul}
            statusPeraturan={peraturan.status_peraturan?.nama_status || 'Berlaku'}
            tanggalPenetapan={formatTanggal(peraturan.tanggal_penetapan)}
            tempatPenetapan={peraturan.tempat_penetapan || 'Jakarta'}
            onDownload={handleDownload}
            downloadHref={`/peraturan/${peraturan.unique_id}/download`}
            peraturanId={peraturan?.id || peraturan?.unique_id}
          />

          {/* Layar PDF Viewer: Jika dokumen ada tampilkan PDF, jika belum ada tampilkan pesan belum tersedia */}
          <div className="w-full mt-6 sm:mt-8 bg-[#525659] rounded-2xl sm:rounded-3xl shadow-md border border-gray-200 overflow-hidden relative h-[85vh] min-h-[750px] max-h-[1200px] flex items-center justify-center">
            {hasPdf && pdfUrl ? (
              <div className="w-full h-full overflow-hidden relative">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0`}
                  className="w-[calc(100%+18px)] h-full border-none block"
                  title={`Dokumen PDF ${peraturan.judul}`}
                />
              </div>
            ) : (
              <div className="text-center p-8 max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 m-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                  <FileQuestion className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Dokumen PDF saat ini belum tersedia</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Berkas PDF untuk dokumen ini belum dapat ditampilkan. Silakan periksa bagian teks isi peraturan pada halaman detail.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

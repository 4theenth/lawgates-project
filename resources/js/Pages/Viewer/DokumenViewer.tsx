import React from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '@/Layouts/PublicLayout';
import { DetailPeraturanHeader } from '@/Components/peraturan/DetailPeraturanHeader';
import { DocumentDigitizingStatus } from '@/Components/peraturan/DocumentDigitizingStatus';
import { useToast } from '@/hooks/useToast';

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

  const handleDownload = () => {
    if (!hasPdf || !pdfUrl) {
      toast.error('Dokumen naskah PDF sedang dalam proses digitalisasi dan belum dapat diunduh');
      return;
    }
    window.location.href = `/peraturan/${peraturan.unique_id}/download`;
  };

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
            statusPeraturan={peraturan.status_peraturan?.nama_status || 'Sedang Didigitalisasi'}
            tanggalPenetapan={formatTanggal(peraturan.tanggal_penetapan)}
            tempatPenetapan={peraturan.tempat_penetapan || 'Jakarta'}
            onDownload={handleDownload}
            downloadHref={hasPdf && pdfUrl ? `/peraturan/${peraturan.unique_id}/download` : undefined}
          />

          {/* Layar PDF Viewer: Jika dokumen ada tampilkan PDF, jika belum ada tampilkan komponen status digitalisasi */}
          <div className={`w-full mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl overflow-hidden relative flex items-center justify-center ${hasPdf && pdfUrl ? 'bg-[#525659] border border-gray-200 shadow-md h-[85vh] min-h-[750px] max-h-[1200px]' : 'bg-transparent'}`}>
            {hasPdf && pdfUrl ? (
              <div className="w-full h-full overflow-hidden relative">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0`}
                  className="w-[calc(100%+18px)] h-full border-none block"
                  title={`Dokumen PDF ${peraturan.judul}`}
                />
              </div>
            ) : (
              <div className="w-full max-w-2xl py-4 sm:py-6">
                <DocumentDigitizingStatus
                  peraturan={peraturan}
                  onBack={() => {
                    if (typeof window !== 'undefined' && window.history.length > 1) {
                      window.history.back();
                    } else {
                      router.visit(`/peraturan/${peraturan.unique_id}`);
                    }
                  }}
                  onViewRelations={() => {
                    router.visit(`/peraturan/${peraturan.unique_id}`);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

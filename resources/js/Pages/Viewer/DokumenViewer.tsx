import React, { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { PublicLayout, PAGE_CONTAINER } from '@/Layouts/PublicLayout';
import { DetailPeraturanHeader } from '@/Components/peraturan/DetailPeraturanHeader';
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
  const { flash } = usePage<any>().props;
  const { toast } = useToast();

  useEffect(() => {
    if (flash?.error) {
      toast.error(flash.error);
    }
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (hasPdf === false) {
      toast.error('Dokumen PDF belum tersedia di penyimpanan MinIO.');
    }
  }, [flash, hasPdf]);

  // Handler download langsung di halaman yang sama tanpa redirect / tab baru
  const handleDownload = () => {
    if (!hasPdf || !pdfUrl) {
      toast.error('Dokumen PDF belum tersedia di penyimpanan MinIO.');
      return;
    }
    const link = document.createElement('a');
    link.href = `/peraturan/${peraturan.unique_id}/download`;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PublicLayout>
      <Head title={`Dokumen ${peraturan.judul} - LawGates`} />

      <div className="w-full min-w-0 overflow-x-hidden">
        <div className={`pt-20 sm:pt-24 pb-12 sm:pb-16 ${PAGE_CONTAINER} text-gray-900 min-w-0`}>
          {/* Header Metadata Sesuai Desain Tangkapan Layar */}
          <DetailPeraturanHeader
            breadcrumbItems={[
              { label: 'Beranda', href: '/' },
              { label: 'Pencarian Hukum', href: '/pencarian' },
              { label: 'Detail Sistem Hukum' },
            ]}
            jenisPeraturan={peraturan.jenis_peraturan?.nama || 'UNDANG - UNDANG DASAR'}
            instansi={peraturan.instansi || peraturan.entitas || 'Pemerintah Pusat'}
            judul={peraturan.judul}
            statusPeraturan={peraturan.status_peraturan?.nama_status || 'Berlaku'}
            tanggalPenetapan={formatTanggal(peraturan.tanggal_penetapan)}
            tempatPenetapan={peraturan.tempat_penetapan || 'Jakarta'}
            onDownload={handleDownload}
          />

          {/* Layar PDF Viewer: Jika dokumen ada tampilkan PDF, jika belum ada biarkan abu-abu saja */}
          <div className="w-full mt-6 sm:mt-8 bg-[#525659] rounded-2xl sm:rounded-3xl shadow-md border border-gray-200 overflow-hidden relative h-[85vh] min-h-[750px] max-h-[1200px]">
            {hasPdf && pdfUrl && (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                className="w-full h-full border-none block"
                title={`Dokumen PDF ${peraturan.judul}`}
              />
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

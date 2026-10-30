import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import {
  CorrectionDetailView,
  LegalDocumentCorrectionData,
  formatStandardId,
} from '@/Components/admin/import/CorrectionDetailView';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { useToast } from '@/hooks/useToast';

interface DokumenInfo {
  id: string;
  judul: string;
  kategori: string;
  tgl_ditetapkan?: string | null;
  status?: string | null;
  instansi?: string | null;
}

interface EditProps {
  uniqueId: string;
  correctionData: LegalDocumentCorrectionData;
  dokumen: DokumenInfo;
}

export default function DokumenHukumEdit({ uniqueId, correctionData, dokumen }: EditProps) {
  const { toast } = useToast();

  // Menandai apakah pengguna sudah menyimpan perubahan pada sesi edit ini.
  // Dipakai agar kita tidak menampilkan konfirmasi saat data belum berubah.
  const [isDirty, setIsDirty] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const listUrl = '/admin/dokumen-hukum';

  // Objek `file` dimemoize agar referensinya stabil antar render.
  // Tanpa ini, CorrectionDetailView akan menganggap berkas berubah setiap
  // render dan menimpa seluruh editan pengguna dengan data awal.
  const correctionFile = useMemo(
    () => ({
      id: dokumen.id,
      name: `${dokumen.kategori}_${dokumen.id}.json`,
      category: dokumen.kategori,
      title: dokumen.judul,
      correctionData,
      parsedData: {
        metadata: {
          standard_id: formatStandardId(`${dokumen.kategori} ${dokumen.judul}`),
          judul: dokumen.judul,
          pemrakarsa: dokumen.instansi || 'Pemerintah Pusat',
          tanggal_penetapan: dokumen.tgl_ditetapkan || '',
          tempat_penetapan: 'Jakarta',
        },
      },
    }),
    [dokumen, correctionData]
  );

  // Keluar dari layar edit tanpa menyimpan
  const leaveWithoutSaving = () => {
    setIsConfirmOpen(false);
    router.visit(listUrl);
  };

  // Dipanggil saat tombol Batal / Kembali / breadcrumb ditekan
  const handleExitRequest = () => {
    if (isDirty) {
      setIsConfirmOpen(true);
      return;
    }
    leaveWithoutSaving();
  };

  const handleSave = async (updatedCorrection: LegalDocumentCorrectionData) => {
    try {
      const response = await fetch(`/admin/dokumen-hukum/${uniqueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN':
            (document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
        body: JSON.stringify(updatedCorrection),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || 'Gagal menyimpan data');
      }

      setIsDirty(false);
      toast.success('Data hukum berhasil diperbarui');
      router.visit(listUrl);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Gagal menyimpan data hukum');
    }
  };

  return (
    <AdminLayout>
      <Head title={`Edit Data Hukum - ${dokumen.judul}`} />

      {/* Breadcrumb Navigasi Edit */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/admin/dashboard' },
            { label: 'Dokumen Hukum', onClick: handleExitRequest },
            { label: 'Edit Data Hukum' },
          ]}
        />
      </div>

      <CorrectionDetailView
        mode="edit"
        file={correctionFile}
        onSave={handleSave}
        onCancel={handleExitRequest}
        onBack={handleExitRequest}
        onDirty={setIsDirty}
      />

      {/* Konfirmasi sebelum meninggalkan halaman dengan perubahan belum disimpan */}
      <DeleteConfirmModal
        show={isConfirmOpen}
        title="Buang perubahan?"
        description="Perubahan yang belum disimpan akan hilang jika kamu keluar dari halaman ini."
        confirmText="Ya, Buang Perubahan"
        cancelText="Tetap di Sini"
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={leaveWithoutSaving}
      />
    </AdminLayout>
  );
}

import React from 'react';
import Modal from '@/Components/common/Modal';
import { StatusBadge } from '@/Components/common';
import { X } from 'lucide-react';
import { DokumenHukumItem } from './DocumentTable';

interface DocumentPreviewModalProps {
  show: boolean;
  documentData?: DokumenHukumItem | null;
  onClose: () => void;
}

/**
 * Tinjauan ringkas dokumen hukum (read-only).
 *
 * Sengaja tidak memakai `DocumentModal`: komponen itu adalah form tambah/edit
 * admin dengan state dan `onSave`. Mencampur mode baca ke sana akan membuat
 * satu komponen memegang dua tanggung jawab.
 *
 * Data diambil langsung dari baris tabel (sudah dikirim `DokumenHukumController::index`),
 * jadi tidak ada request tambahan saat modal dibuka.
 */
export function DocumentPreviewModal({
  show,
  documentData,
  onClose,
}: DocumentPreviewModalProps) {
  if (!documentData) return null;

  const details: Array<{ label: string; value: string }> = [
    { label: 'Jenis Peraturan', value: documentData.kategori || '-' },
    { label: 'Nomor', value: documentData.nomor || '-' },
    { label: 'Tahun', value: documentData.tahun ? String(documentData.tahun) : '-' },
    { label: 'Instansi', value: documentData.instansi || '-' },
    { label: 'Subjek', value: documentData.subjek || '-' },
    { label: 'Tanggal Ditetapkan', value: documentData.tgl_ditetapkan || '-' },
  ];

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="lg"
      backdropStyle={{ backgroundColor: 'rgba(55, 55, 55, 0.60)' }}
      panelClassName="overflow-visible rounded-[16px] bg-white border border-neu-100 shadow-2xl"
    >
      <div className="p-6 bg-white rounded-[16px] text-left">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-sans text-[18px] font-semibold text-neu-900 leading-tight">
              Tinjauan Ringkas
            </h2>
            <p className="font-sans text-[14px] font-normal text-neu-600 mt-1 line-clamp-3">
              {documentData.judul}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tinjauan ringkas"
            className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-lg text-neu-500 hover:bg-neu-50 hover:text-neu-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status */}
        <div className="mt-5 flex items-center gap-2.5">
          <span className="font-sans text-[12px] font-medium text-neu-500">
            Status Hukum
          </span>
          <StatusBadge status={documentData.status} />
        </div>

        {/* Rincian */}
        <dl className="mt-4 border-t border-neu-100">
          {details.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-6 py-2.5 border-b border-neu-100 last:border-b-0"
            >
              <dt className="font-sans text-[12px] font-normal text-neu-500 shrink-0">
                {label}
              </dt>
              <dd className="font-sans text-[13px] font-medium text-neu-900 text-right break-words">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Aksi */}
        <div className="flex items-center justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-neu-700 hover:bg-gray-50 rounded-[10px] border border-neu-200 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DocumentPreviewModal;

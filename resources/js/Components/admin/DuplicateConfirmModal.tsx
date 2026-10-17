import React from 'react';
import Modal from '@/Components/common/Modal';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { router } from '@inertiajs/react';

interface DuplicateConfirmModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  documentTitle?: string;
  existingId?: string;
}

export function DuplicateConfirmModal({
  show,
  onClose,
  title = 'Duplikasi Dokumen Terdeteksi',
  message = 'Dokumen ini sudah terdaftar di sistem. Anda tidak dapat membuat data ganda dengan judul atau identitas yang sama.',
  documentTitle,
  existingId,
}: DuplicateConfirmModalProps) {
  if (!show) return null;

  const handleViewExisting = () => {
    onClose();
    if (existingId) {
      router.visit(`/admin/dokumen-hukum?search=${encodeURIComponent(existingId)}`);
    } else if (documentTitle) {
      router.visit(`/admin/dokumen-hukum?search=${encodeURIComponent(documentTitle)}`);
    } else {
      router.visit('/admin/dokumen-hukum');
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="status"
      panelClassName="rounded-[16px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.12)] border border-amber-200"
    >
      <div className="p-6 sm:p-7 text-left bg-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-neu-900 tracking-tight">
              {title}
            </h3>
            <span className="text-[11px] font-semibold tracking-wider text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Status 409 Conflict
            </span>
          </div>
        </div>

        <p className="text-[13px] text-neu-600 mb-4 leading-relaxed">
          {message}
        </p>

        {documentTitle && (
          <div className="bg-neu-50 rounded-[10px] p-3 border border-neu-100 mb-6">
            <span className="text-[11px] font-medium text-neu-400 block mb-1">
              Judul Terdeteksi:
            </span>
            <p className="text-[13px] font-semibold text-neu-800 line-clamp-2">
              “{documentTitle}”
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-neu-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-neu-800 bg-white border border-neu-200 hover:bg-neu-50 rounded-[10px] transition-colors cursor-pointer shadow-2xs"
          >
            Tutup & Sesuaikan
          </button>

          {(existingId || documentTitle) && (
            <button
              type="button"
              onClick={handleViewExisting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium bg-pr-900 hover:bg-pr-800 text-white rounded-[10px] transition-colors shadow-2xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Dokumen di Sistem</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

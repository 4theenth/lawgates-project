import React from 'react';
import Modal from '@/Components/common/Modal';
import { Trash2 } from 'lucide-react';
import { DokumenHukumItem } from './DocumentTable';

interface DeleteConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentData?: DokumenHukumItem | null;
}

export function DeleteConfirmModal({
  show,
  onClose,
  onConfirm,
  documentData,
}: DeleteConfirmModalProps) {
  if (!documentData) return null;

  return (
    <Modal show={show} onClose={onClose} maxWidth="md">
      <div className="p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6" />
        </div>

        <h3 className="text-[16px] font-semibold text-neu-900 mb-2">
          Hapus Dokumen Hukum?
        </h3>

        <p className="text-[13px] text-neu-600 mb-6">
          Apakah Anda yakin ingin menghapus{' '}
          <span className="font-semibold text-neu-800">
            "{documentData.judul}"
          </span>
          ? Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-neu-700 hover:bg-gray-100 rounded-[10px] transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-[13px] font-medium bg-[#E53E3E] text-white hover:bg-red-700 rounded-[10px] transition-colors shadow-2xs cursor-pointer"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
}

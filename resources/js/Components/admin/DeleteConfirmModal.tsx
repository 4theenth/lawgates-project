import React from 'react';
import Modal from '@/Components/common/Modal';
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
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="status"
      panelClassName="rounded-[16px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.12)] border border-neu-100"
    >
      <div className="p-6 sm:p-7 text-left bg-white">
        <h3 className="text-[18px] font-bold text-neu-900 tracking-tight mb-2">
          Hapus Data Hukum?
        </h3>

        <p className="text-[14px] text-neu-600 mb-8 leading-relaxed">
          “{documentData.judul}”
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-[14px] font-medium text-neu-800 bg-white border border-neu-200 hover:bg-neu-50 rounded-[10px] transition-colors cursor-pointer shadow-2xs"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 text-[14px] font-medium bg-dan-900 hover:bg-dan-800 text-white rounded-[10px] transition-colors shadow-2xs cursor-pointer"
          >
            Hapus Permanen
          </button>
        </div>
      </div>
    </Modal>
  );
}

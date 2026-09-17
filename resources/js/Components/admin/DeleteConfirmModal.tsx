import React from 'react';
import Modal from '@/Components/common/Modal';
import { DokumenHukumItem } from './DocumentTable';

interface DeleteConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  documentData?: { judul?: string; nama?: string; kategori?: string; [key: string]: any } | null;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteConfirmModal({
  show,
  onClose,
  onConfirm,
  title = 'Hapus Data Hukum?',
  itemName,
  documentData,
  confirmText = 'Hapus Permanen',
  cancelText = 'Batal',
}: DeleteConfirmModalProps) {
  const displayItemName = itemName || documentData?.judul || documentData?.nama || documentData?.kategori || '';

  if (!show) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="status"
      panelClassName="rounded-[16px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.12)] border border-neu-100"
    >
      <div className="p-6 sm:p-7 text-left bg-white">
        <h3 className="text-[18px] font-bold text-neu-900 tracking-tight mb-2">
          {title}
        </h3>

        {displayItemName && (
          <p className="text-[14px] text-neu-600 mb-8 leading-relaxed">
            “{displayItemName}”
          </p>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-[14px] font-medium text-neu-800 bg-white border border-neu-200 hover:bg-neu-50 rounded-[10px] transition-colors cursor-pointer shadow-2xs"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 text-[14px] font-medium bg-dan-900 hover:bg-dan-800 text-white rounded-[10px] transition-colors shadow-2xs cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

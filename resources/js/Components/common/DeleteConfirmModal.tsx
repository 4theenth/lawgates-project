import React from 'react';
import Modal from '@/Components/common/Modal';
import { Loader2 } from 'lucide-react';

export interface DeleteConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  description?: string;
  documentData?: { judul?: string; nama?: string; kategori?: string } | null;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

/**
 * Komponen Universal Modal Konfirmasi Hapus
 * Sesuai Figma node #3190:74314 & #3198:78611
 *
 * Digunakan secara universal di Admin Panel maupun User Profile/Bookmark:
 * - Hapus Dokumen Hukum
 * - Hapus Anggota Tim
 * - Hapus Folder Bookmark
 * - Hapus Bookmark Tunggal & Hapus Peraturan Sekaligus (Bulk Delete)
 */
export function DeleteConfirmModal({
  show,
  onClose,
  onConfirm,
  title = 'Hapus Data Hukum?',
  itemName,
  description,
  documentData,
  confirmText = 'Hapus Permanen',
  cancelText = 'Batal',
  isLoading = false,
}: DeleteConfirmModalProps) {
  const displayItemName = itemName || documentData?.judul || documentData?.nama || documentData?.kategori || '';

  if (!show) return null;

  return (
    <Modal
      show={show}
      onClose={isLoading ? () => {} : onClose}
      maxWidth="status"
      backdropStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.40)' }}
      panelClassName="w-full max-w-[454px] rounded-[20px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.12)] border border-neu-50"
    >
      <div className="p-5 sm:p-[20px_29px] text-left bg-white">
        {/* Title Modal */}
        <h3 className="font-sans text-[16px] sm:text-[18px] font-semibold text-neu-900 tracking-tight mb-1">
          {title}
        </h3>

        {/* Deskripsi / Nama Item */}
        {description ? (
          <p className="font-sans text-[14px] text-neu-600 mb-[27px] leading-relaxed">
            {description}
          </p>
        ) : displayItemName ? (
          <p className="font-sans text-[14px] text-neu-600 mb-[27px] leading-relaxed">
            “{displayItemName}”
          </p>
        ) : (
          <div className="mb-[27px]" />
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-[18px]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2 font-sans text-[14px] font-medium text-neu-900 bg-white border border-neu-100 hover:bg-neu-50 rounded-[8px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 font-sans text-[14px] font-medium bg-dan-900 hover:bg-dan-800 text-white rounded-[8px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menghapus...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;

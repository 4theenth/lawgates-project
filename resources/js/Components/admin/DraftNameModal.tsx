import React, { useState, useEffect } from 'react';
import Modal from '@/Components/common/Modal';

interface DraftNameModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (namaDraft: string) => void;
  isLoading?: boolean;
  initialName?: string;
}

export function DraftNameModal({
  show,
  onClose,
  onConfirm,
  isLoading = false,
  initialName = '',
}: DraftNameModalProps) {
  const [draftName, setDraftName] = useState(initialName);

  useEffect(() => {
    if (show) {
      setDraftName(initialName || '');
    }
  }, [show, initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftName.trim() || isLoading) return;
    onConfirm(draftName.trim());
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="sm"
      backdropStyle={{ backgroundColor: 'rgba(55, 55, 55, 0.60)' }}
      panelClassName="overflow-visible rounded-[16px] bg-white border border-neu-100 shadow-2xl"
    >
      <div className="p-6 bg-white rounded-[16px] text-left">
        <h2 className="font-sans text-[18px] font-semibold text-neu-900 leading-tight">
          Nama Draft
        </h2>
        <p className="font-sans text-[13px] font-normal text-neu-600 mt-1">
          Buat nama draft sesuai regulasi yang dibuat
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label className="block font-sans text-[13px] font-medium text-neu-800 mb-2">
              Nama Draft
            </label>
            <input
              type="text"
              required
              autoFocus
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Contoh: UU No 10 - 20"
              className="w-full px-3.5 py-2.5 text-[13px] rounded-[10px] border border-neu-200 bg-white placeholder:text-neu-400 text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-colors shadow-2xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-[13px] font-medium text-neu-700 hover:bg-neu-50 rounded-[10px] border border-neu-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!draftName.trim() || isLoading}
              className="px-5 py-2 text-[13px] font-medium bg-pr-900 text-white hover:bg-pr-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] transition-colors shadow-2xs cursor-pointer"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

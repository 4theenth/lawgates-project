import React, { useState, useEffect } from 'react';
import Modal from '@/Components/common/Modal';
import { FolderPlus, Loader2, Pencil } from 'lucide-react';

export interface CreateCollectionModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (name: string, collectionId?: number | string) => void;
  initialName?: string;
  collectionId?: number | string;
  isLoading?: boolean;
}

/**
 * Modal Buat / Ubah Nama Folder Koleksi
 * Sesuai Figma node #3173:71454 & #3181:72860
 *
 * Dimensi lebar 258px, padding 11px 17px, backdrop #21212166 (rgba(33, 33, 33, 0.40)),
 * rounded 15px, input tinggi 38px, tombol "Simpan" full-width.
 */
export function CreateCollectionModal({
  show,
  onClose,
  onSubmit,
  initialName = '',
  collectionId,
  isLoading = false,
}: CreateCollectionModalProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(collectionId);

  useEffect(() => {
    setName(initialName);
    setError(null);
  }, [initialName, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Nama folder tidak boleh kosong.');
      return;
    }
    if (trimmed.length > 50) {
      setError('Nama folder maksimal 50 karakter.');
      return;
    }
    setError(null);
    onSubmit(trimmed, collectionId);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      backdropStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.40)' }}
      panelClassName="w-[258px] sm:w-[258px] rounded-[15px] p-[11px_17px] bg-white border border-neu-50 shadow-[0px_4px_24px_rgba(0,0,0,0.12)] overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[20px]">
        {/* Input Nama Folder (Figma node #3181:72861 & #3181:72863) */}
        <div className="flex flex-col gap-[5px]">
          <label className="font-sans text-[12px] font-normal text-neu-900 select-none">
            Nama Folder <span className="text-[#B91C1C]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Masukan nama folder"
            maxLength={50}
            autoFocus
            className="w-full h-[38px] px-3 rounded-[10px] bg-white border border-neu-100 hover:border-neu-200 font-sans text-[12px] text-neu-900 placeholder:text-neu-500 focus:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-all shadow-2xs"
          />
          {error && (
            <p className="font-sans text-[11px] text-dan-900 mt-0.5">{error}</p>
          )}
        </div>

        {/* Tombol Simpan (Figma node #3181:72868) */}
        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="w-full h-[38px] rounded-[8px] bg-pr-900 hover:bg-pr-800 text-[#FAFAFA] font-sans text-[14px] font-medium transition-colors shadow-2xs cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              {isEdit ? (
                <Pencil className="w-4 h-4" />
              ) : (
                <FolderPlus className="w-4 h-4" />
              )}
              <span>{isEdit ? 'Simpan Perubahan' : 'Simpan'}</span>
            </>
          )}
        </button>
      </form>
    </Modal>
  );
}

export default CreateCollectionModal;

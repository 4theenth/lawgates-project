import React, { useState } from 'react';
import Modal from '@/Components/common/Modal';
import { AlertTriangle, ExternalLink, RefreshCw, Pencil, Check, X } from 'lucide-react';
import { router } from '@inertiajs/react';

interface DuplicateConfirmModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  documentTitle?: string;
  existingId?: string;
  /** Menampilkan tombol timpa. Nonaktif bila pemanggil tidak mendukungnya. */
  onOverwrite?: () => void;
  isOverwriting?: boolean;
  /** Callback saat admin memilih langsung masuk ke mode koreksi/edit naskah */
  onEdit?: () => void;
  /** Callback untuk memperbarui judul / standar ID secara langsung dari modal */
  onSaveNewTitle?: (newTitle: string) => void | Promise<void>;
}

export function DuplicateConfirmModal({
  show,
  onClose,
  title = 'Dokumen Ini Sudah Ada',
  message = 'Dokumen berjudul ini sudah ada di database sistem (duplikasi terdeteksi). Anda dapat menyesuaikan judul/standar ID atau menimpa dokumen lama.',
  documentTitle,
  existingId,
  onOverwrite,
  isOverwriting = false,
  onEdit,
  onSaveNewTitle,
}: DuplicateConfirmModalProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [customTitle, setCustomTitle] = useState(documentTitle || '');
  const [isSavingTitle, setIsSavingTitle] = useState(false);

  if (!show) return null;

  const handleViewExisting = () => {
    onClose();
    if (existingId) {
      window.open(`/peraturan/${encodeURIComponent(existingId)}`, '_blank');
    } else if (documentTitle) {
      router.visit(`/admin/dokumen-hukum?search=${encodeURIComponent(documentTitle)}`);
    } else {
      router.visit('/admin/dokumen-hukum');
    }
  };

  const handleConfirmSaveTitle = async () => {
    if (!customTitle.trim()) return;
    if (onSaveNewTitle) {
      setIsSavingTitle(true);
      try {
        await onSaveNewTitle(customTitle.trim());
        setIsEditingTitle(false);
        onClose();
      } catch (err) {
        console.error('Gagal memperbarui judul dokumen:', err);
      } finally {
        setIsSavingTitle(false);
      }
    } else if (onEdit) {
      onEdit();
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="2xl"
      backdropStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.40)' }}
      panelClassName="!max-w-[720px] w-full rounded-[20px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.12)] border border-neu-100"
    >
      <div className="p-6 sm:p-7 text-left bg-white font-sans">
        {/* Header Modal */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
            <AlertTriangle className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-[16px] sm:text-[17px] font-bold text-neu-900 tracking-tight">
              {title}
            </h3>
          </div>
        </div>

        <p className="text-[13px] text-neu-600 mb-4 leading-relaxed">
          {message?.replace(/^Dokumen\s+'/, "Dokumen berjudul '") || message}
        </p>

        {/* Dua kolom: kiri informasi judul, kanan peringatan penimpaan */}
        <div className={`grid grid-cols-1 ${onOverwrite ? 'sm:grid-cols-2' : ''} gap-3 mb-5`}>
          {/* Box Judul Terdeteksi & Fitur Edit Judul/Identitas */}
          {(documentTitle || customTitle) && (
            <div className="bg-neu-50/70 rounded-[12px] p-3.5 border border-neu-100">
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <span className="text-[11px] font-medium text-neu-500">
                  Judul Terdeteksi:
                </span>
                {!isEditingTitle && (onSaveNewTitle || onEdit) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomTitle(documentTitle || '');
                      setIsEditingTitle(true);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-pr-900 hover:text-pr-800 bg-white hover:bg-pr-50 border border-neu-200 px-2 py-0.5 rounded-[6px] transition-colors cursor-pointer shadow-2xs"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Ubah Judul</span>
                  </button>
                )}
              </div>

              {isEditingTitle ? (
                <div className="space-y-2 mt-2">
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Ketik judul/nama baru agar tidak duplikat..."
                    className="w-full px-3 py-2 text-[12px] rounded-[8px] border border-neu-100 bg-white text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 hover:border-neu-200 transition-all"
                    autoFocus
                  />
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomTitle(documentTitle || '');
                        setIsEditingTitle(false);
                      }}
                      className="p-1.5 text-neu-500 hover:text-neu-800 bg-white border border-neu-200 rounded-[6px] cursor-pointer"
                      title="Batal ubah"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmSaveTitle}
                      disabled={isSavingTitle || !customTitle.trim()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-pr-900 hover:bg-pr-800 rounded-[6px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                    >
                      <Check className="w-3 h-3" />
                      <span>{isSavingTitle ? 'Menyimpan...' : 'Terapkan'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[13px] font-semibold text-neu-900 line-clamp-3 leading-snug">
                  “{customTitle || documentTitle}”
                </p>
              )}
            </div>
          )}

          {/* Warning Alert: Bersih tanpa emdash */}
          {onOverwrite && (
            <div className="bg-dan-50 border border-dan-100 rounded-[12px] p-3.5">
              <p className="text-[12px] text-dan-900 leading-relaxed">
                <strong>Menimpa akan mengganti seluruh isi dokumen.</strong> Seluruh pasal, struktur,
                dan penjelasan lama akan diganti dengan isi berkas ini. Versi lama disimpan
                di riwayat perubahan, tetapi pastikan berkas ini memang versi terbaru.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons: sekunder di kiri, aksi utama di kanan */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isOverwriting}
              className="px-4 py-2 text-[13px] font-medium text-neu-800 bg-white border border-neu-100 hover:bg-neu-50 rounded-[10px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tutup
            </button>

            {(existingId || documentTitle) && (
              <button
                type="button"
                onClick={handleViewExisting}
                disabled={isOverwriting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-pr-900 bg-white border border-neu-200 hover:bg-pr-50 rounded-[10px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Lihat Dokumen</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                disabled={isOverwriting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-pr-900 bg-pr-50 hover:bg-pr-100 border border-pr-100 rounded-[10px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit di Koreksi</span>
              </button>
            )}

            {onOverwrite && (
              <button
                type="button"
                onClick={onOverwrite}
                disabled={isOverwriting}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold bg-dan-900 hover:bg-dan-800 text-white rounded-[10px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isOverwriting ? 'animate-spin' : ''}`} />
                <span>{isOverwriting ? 'Menimpa…' : 'Timpa Dokumen'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DuplicateConfirmModal;

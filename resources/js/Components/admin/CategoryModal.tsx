import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { CategoryItem } from './CategoryTable';
import { X, Gavel } from 'lucide-react';

interface CategoryModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: { id?: string; nama: string; deskripsi: string; kode?: string }) => void;
  categoryData?: CategoryItem | null;
  isLoading?: boolean;
}

export function CategoryModal({
  show,
  onClose,
  onSave,
  categoryData,
  isLoading = false,
}: CategoryModalProps) {
  const isEditing = Boolean(categoryData);

  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  useEffect(() => {
    if (categoryData) {
      setNama(categoryData.kategori || '');
      setDeskripsi(categoryData.deskripsi || '');
    } else {
      setNama('');
      setDeskripsi('');
    }
  }, [categoryData, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return;

    onSave({
      id: categoryData?.id,
      nama: nama.trim(),
      deskripsi: deskripsi.trim(),
      kode: categoryData?.kode,
    });
  };

  return (
    <Transition show={show}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop Overlay */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 transition-opacity"
            style={{ backgroundColor: 'rgba(55, 55, 55, 0.60)' }}
            aria-hidden="true"
          />
        </TransitionChild>

        {/* Slide-Over Drawer Container (Sisi Kanan) */}
        <div className="fixed inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-full sm:max-w-[460px] md:max-w-[490px] h-full bg-white shadow-2xl flex flex-col justify-between">
                  <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    {/* Header Drawer */}
                    <div className="px-6 py-5 border-b border-neu-100 flex items-center justify-between shrink-0 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-neu-50 border border-neu-100 flex items-center justify-center shrink-0">
                          <Gavel className="w-5 h-5 text-neu-500 stroke-[1.5]" />
                        </div>
                        <div>
                          <h2 className="text-[15px] font-bold text-neu-900 leading-tight">
                            {isEditing ? 'Edit Kategori Hukum' : 'Tambah Kategori Hukum'}
                          </h2>
                          <p className="text-[12px] text-neu-500 mt-0.5 leading-normal">
                            Edit kategori hukum yang akan digunakan saat menambahkan data hukum nantinya
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-neu-400 hover:text-neu-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0 ml-2"
                        title="Tutup"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form Fields Body */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-white">
                      <div>
                        <label className="block text-[13px] font-medium text-neu-800 mb-1.5">
                          Nama Kategori <span className="text-dan-800">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          placeholder="Contoh: Undang Undang"
                          className="w-full px-3.5 py-2.5 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 placeholder-neu-400 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-neu-800 mb-1.5">
                          Deskripsi
                        </label>
                        <textarea
                          rows={5}
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          placeholder="Deskripsi singkat tentang kategori yang akan dibuat (opsional)"
                          className="w-full px-3.5 py-2.5 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 placeholder-neu-400 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all resize-none shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Footer Drawer */}
                    <div className="px-6 py-4 border-t border-neu-100 flex items-center justify-end gap-3 bg-white shrink-0">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 text-[13px] font-medium text-neu-800 bg-white border border-neu-200 hover:bg-neu-50 rounded-[10px] transition-colors cursor-pointer shadow-2xs"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || !nama.trim()}
                        className="px-5 py-2 text-[13px] font-medium bg-pr-900 hover:bg-pr-800 text-white rounded-[10px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Menyimpan...' : 'Simpan Kategori'}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

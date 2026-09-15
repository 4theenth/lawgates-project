import React, { useState, useEffect } from 'react';
import Modal from '@/Components/common/Modal';
import { DokumenHukumItem } from './DocumentTable';
import { X } from 'lucide-react';

interface DocumentModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (doc: Omit<DokumenHukumItem, 'id'> & { id?: string }) => void;
  documentData?: DokumenHukumItem | null;
  categories: string[];
}

export function DocumentModal({
  show,
  onClose,
  onSave,
  documentData,
  categories,
}: DocumentModalProps) {
  const isEditing = Boolean(documentData);

  const [kategori, setKategori] = useState(categories[0] || 'UU');
  const [judul, setJudul] = useState('');
  const [status, setStatus] = useState<'berlaku' | 'tidak_berlaku'>('berlaku');
  const [tglDitetapkan, setTglDitetapkan] = useState('');

  useEffect(() => {
    if (documentData) {
      setKategori(documentData.kategori);
      setJudul(documentData.judul);
      setStatus(documentData.status);
      setTglDitetapkan(documentData.tgl_ditetapkan);
    } else {
      setKategori(categories[0] || 'Peraturan Presiden');
      setJudul('');
      setStatus('berlaku');
      setTglDitetapkan('18 Agustus 2023');
    }
  }, [documentData, show, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim()) return;

    onSave({
      id: documentData?.id,
      kategori,
      judul,
      status,
      tgl_ditetapkan: tglDitetapkan || '01 Januari 2024',
    });
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="lg">
      <div className="p-6">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-neu-100">
          <h2 className="text-[16px] font-semibold text-neu-900">
            {isEditing ? 'Edit Data Dokumen Hukum' : 'Tambah Dokumen Hukum Baru'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-neu-400 hover:text-neu-700 transition-colors p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Isi */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Kategori */}
          <div>
            <label className="block text-[13px] font-medium text-neu-700 mb-1">
              Kategori Hukum
            </label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Judul */}
          <div>
            <label className="block text-[13px] font-medium text-neu-700 mb-1">
              Judul Dokumen
            </label>
            <textarea
              rows={3}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Peraturan Presiden Nomor 29 Tahun 2026 Tentang..."
              className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 placeholder:text-neu-400"
              required
            />
          </div>

          {/* Status Hukum */}
          <div>
            <label className="block text-[13px] font-medium text-neu-700 mb-1">
              Status Hukum
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[13px] text-neu-700 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="berlaku"
                  checked={status === 'berlaku'}
                  onChange={() => setStatus('berlaku')}
                  className="text-pr-900 focus:ring-pr-900"
                />
                <span>Berlaku</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] text-neu-700 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="tidak_berlaku"
                  checked={status === 'tidak_berlaku'}
                  onChange={() => setStatus('tidak_berlaku')}
                  className="text-pr-900 focus:ring-pr-900"
                />
                <span>Tidak Berlaku</span>
              </label>
            </div>
          </div>

          {/* Tanggal Ditetapkan */}
          <div>
            <label className="block text-[13px] font-medium text-neu-700 mb-1">
              Tanggal Ditetapkan
            </label>
            <input
              type="text"
              value={tglDitetapkan}
              onChange={(e) => setTglDitetapkan(e.target.value)}
              placeholder="Contoh: 18 Agustus 2023"
              className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 placeholder:text-neu-400"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neu-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-neu-700 hover:bg-gray-100 rounded-[10px] transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-[13px] font-medium bg-pr-900 text-white hover:bg-pr-800 rounded-[10px] transition-colors shadow-2xs cursor-pointer"
            >
              {isEditing ? 'Simpan Perubahan' : 'Tambah Hukum'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

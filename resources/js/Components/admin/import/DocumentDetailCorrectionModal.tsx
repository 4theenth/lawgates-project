import React, { useState, useEffect } from 'react';
import Modal from '@/Components/common/Modal';
import { StatusBadge } from '@/Components/common/StatusBadge';
import { ValidatedFileItem } from './StepValidationCorrection';
import { Scale, Eye, Edit3, X, Calendar, FileText, Check } from 'lucide-react';

interface DocumentDetailCorrectionModalProps {
  show: boolean;
  fileData?: ValidatedFileItem | null;
  onClose: () => void;
  onSave: (updatedData: {
    id: string;
    judul: string;
    kategori: string;
    nomor: string;
    tahun: string;
    tglDitetapkan: string;
    status: 'berlaku' | 'tidak_berlaku';
    ringkasan: string;
  }) => void;
}

export function DocumentDetailCorrectionModal({
  show,
  fileData,
  onClose,
  onSave,
}: DocumentDetailCorrectionModalProps) {
  // Tab mode: 'form' (Koreksi Data) vs 'preview' (POV Pengguna)
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  // Form states
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Undang - Undang');
  const [nomor, setNomor] = useState('11');
  const [tahun, setTahun] = useState('2026');
  const [tglDitetapkan, setTglDitetapkan] = useState('18 Agustus 2026');
  const [status, setStatus] = useState<'berlaku' | 'tidak_berlaku'>('berlaku');
  const [ringkasan, setRingkasan] = useState(
    'Undang-Undang ini mengatur tentang kepatuhan regulasi digital, perlindungan data, dan transparansi sistem peradilan hukum nasional.'
  );

  useEffect(() => {
    if (fileData) {
      setJudul(
        fileData.title ||
          `Undang-Undang Nomor 11 Tahun 2026 Tentang Pengelolaan Sistem Hukum Digital Nasional`
      );
      setKategori(fileData.category || 'Undang - Undang');
      setActiveTab('form');
    }
  }, [fileData, show]);

  if (!fileData) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: fileData.id,
      judul,
      kategori,
      nomor,
      tahun,
      tglDitetapkan,
      status,
      ringkasan,
    });
    onClose();
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="2xl"
      backdropStyle={{ backgroundColor: 'rgba(55, 55, 55, 0.60)' }}
      panelClassName="overflow-visible rounded-2xl bg-white border border-neu-100 shadow-2xl"
    >
      <div className="p-6 bg-white rounded-2xl text-left">
        {/* Header Modal & Navigasi Tab (Form vs POV User) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neu-100 gap-3">
          <div>
            <span className="text-[11px] font-semibold text-neu-400 uppercase tracking-wider block">
              Koreksi & Validasi Hasil Ekstraksi OCR
            </span>
            <h2 className="text-[17px] font-semibold text-neu-900 leading-tight">
              {fileData.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Tab: Form Koreksi vs Preview POV User */}
            <div className="inline-flex rounded-lg border border-neu-200 bg-gray-50 p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-white text-neu-900 shadow-2xs font-semibold'
                    : 'text-neu-600 hover:text-black'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Form Koreksi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-white text-pr-900 shadow-2xs font-semibold'
                    : 'text-neu-600 hover:text-black'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-pr-900" />
                <span>POV Pengguna</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neu-400 hover:text-neu-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* KONTEN TAB 1: Form Koreksi Data Lengkap */}
        {activeTab === 'form' && (
          <form onSubmit={handleSave} className="mt-5 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-neu-700 mb-1">
                  Kategori Hukum
                </label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900"
                >
                  <option value="Undang - Undang">Undang - Undang</option>
                  <option value="Putusan Presiden">Putusan Presiden</option>
                  <option value="Penetapan MPR">Penetapan MPR</option>
                  <option value="Undang - Undang Darurat">Undang - Undang Darurat</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-neu-700 mb-1">
                  Status Keberlakuan
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'berlaku' | 'tidak_berlaku')}
                  className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900"
                >
                  <option value="berlaku">Berlaku</option>
                  <option value="tidak_berlaku">Tidak Berlaku</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-neu-700 mb-1">
                  Nomor Peraturan
                </label>
                <input
                  type="text"
                  value={nomor}
                  onChange={(e) => setNomor(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900"
                  placeholder="Contoh: 11"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-neu-700 mb-1">
                  Tahun Peraturan
                </label>
                <input
                  type="text"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900"
                  placeholder="Contoh: 2026"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-neu-700 mb-1">
                Judul Resmi Dokumen
              </label>
              <textarea
                rows={2}
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-neu-700 mb-1">
                Tanggal Ditetapkan
              </label>
              <input
                type="text"
                value={tglDitetapkan}
                onChange={(e) => setTglDitetapkan(e.target.value)}
                className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900"
                placeholder="Contoh: 18 Agustus 2026"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-neu-700 mb-1">
                Ringkasan / Batang Tubuh Hasil Ekstraksi OCR
              </label>
              <textarea
                rows={3}
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                className="w-full px-3 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 font-mono text-[12px]"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neu-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] font-medium text-neu-700 hover:bg-gray-100 rounded-[10px] transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-[13px] font-medium bg-pr-900 text-white hover:bg-pr-800 rounded-[10px] transition-colors shadow-2xs inline-flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Koreksi</span>
              </button>
            </div>
          </form>
        )}

        {/* KONTEN TAB 2: Preview POV Pengguna (User View Mode) */}
        {activeTab === 'preview' && (
          <div className="mt-5 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            {/* Banner Dokumen POV User */}
            <div className="p-5 rounded-xl border border-neu-100 bg-[#F8FAFC] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neu-100 flex items-center justify-center text-neu-800 shadow-2xs">
                    <Scale className="w-5 h-5 text-pr-900" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-pr-900 uppercase tracking-wider">
                      {kategori}
                    </span>
                    <h3 className="text-[15px] font-semibold text-neu-900 leading-snug mt-0.5">
                      {judul}
                    </h3>
                  </div>
                </div>

                <StatusBadge status={status} />
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-neu-600 pt-2 border-t border-neu-100">
                <div className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neu-400" />
                  <span>Ditetapkan: {tglDitetapkan}</span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-neu-400" />
                  <span>Nomor {nomor} Tahun {tahun}</span>
                </div>
              </div>
            </div>

            {/* Preview Isi Dokumen / Pasal */}
            <div className="p-5 rounded-xl border border-neu-100 bg-white">
              <h4 className="text-[13px] font-semibold text-neu-900 mb-2">
                Abstrak & Ringkasan Peraturan
              </h4>
              <p className="text-[13px] text-neu-700 leading-relaxed">
                {ringkasan}
              </p>

              <div className="mt-4 pt-4 border-t border-neu-50 text-[12px] text-neu-500 italic">
                * Tampilan di atas adalah representasi visual dokumen hukum sebagaimana akan dilihat oleh pengguna publik di portal LawGates.
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="px-4 py-2 text-[13px] font-medium bg-pr-900 text-white rounded-[10px] hover:bg-pr-800 transition-colors"
              >
                Kembali ke Form Koreksi
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Gavel, FileText } from 'lucide-react';
import type { KoreksiItem } from '@/Pages/Admin/AntreanKoreksi/Index';

export type KoreksiActionType = 'setujui' | 'tolak';

export interface KoreksiActionModalProps {
  isOpen: boolean;
  type: KoreksiActionType;
  item: KoreksiItem | null;
  onClose: () => void;
  onConfirm: (message: string) => void;
}

const ACTION_CONFIG = {
  setujui: {
    iconBg: 'bg-suc-50',
    iconColor: 'text-suc-900',
    title: 'Setujui Usulan Koreksi',
    description:
      'Berikan ucapan terima kasih kepada pengguna yang telah membantu mengkoreksi data LawGates',
    pillsLabel: 'PILIH UCAPAN CEPAT:',
    pillsRows: [
      ['Terima kasih', 'Terima kasih atas kontribusi anda'],
      ['Koreksimu sangat tepat, terima kasih ya!', 'Mantap, makasi ya!'],
    ],
    fieldLabel: 'Ucapan Terima Kasih',
    placeholder: 'Contoh: Terima kasih atas koreksi yang telah diberikan...',
    confirmText: 'Setujui & Terapkan',
  },
  tolak: {
    iconBg: 'bg-dan-50',
    iconColor: 'text-dan-900',
    title: 'Tolak Usulan Koreksi',
    description:
      'Alasan penolakan wajib diisi dan akan dikirimkan langsung ke notifikasi akun pengusul.',
    pillsLabel: 'PILIH ALASAN CEPAT:',
    pillsRows: [
      ['Bukan kesalahan teks', 'Koreksi tidak akurat'],
      ['Alasan kurang jelas', 'Tidak relevan'],
    ],
    fieldLabel: 'Alasan Penolakan',
    placeholder:
      'Contoh: Redaksi sudah sesuai dengan naskah resmi Lembaran Nergara 14...',
    confirmText: 'Tolak Usulan',
  },
};

export const KoreksiActionModal: React.FC<KoreksiActionModalProps> = ({
  isOpen,
  type,
  item,
  onClose,
  onConfirm,
}) => {
  const [message, setMessage] = useState('');

  // Reset pesan setiap modal dibuka atau ganti item/type
  useEffect(() => {
    if (isOpen) {
      setMessage('');
    }
  }, [isOpen, type, item]);

  if (!isOpen || !item) return null;

  const config = ACTION_CONFIG[type];

  const handleSelectPill = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-[440px] bg-white rounded-[20px] p-6 shadow-xl flex flex-col gap-4 animate-in zoom-in-95 duration-150 border border-neu-50">
        {/* Header Modal */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Icon Gavel */}
            <div
              className={`w-11 h-11 rounded-full ${config.iconBg} flex items-center justify-center shrink-0`}
            >
              <Gavel className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[16px] font-medium text-neu-900 leading-tight">
                {config.title}
              </h3>
              <p className="text-[12px] font-normal text-neu-600 leading-relaxed mt-1">
                {config.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neu-400 hover:text-neu-600 p-1 rounded-md cursor-pointer shrink-0 transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dokumen Banner (Border Neutral / 50 & Regular Font) */}
        <div className="w-full min-h-[49px] bg-neutral-100 rounded-[10px] px-4 py-3 flex items-center gap-3 text-neu-900 border border-neu-50">
          <FileText className="w-5 h-5 text-neu-700 shrink-0" />
          <div className="flex items-center gap-2 text-[14px] font-normal text-neu-900 overflow-hidden">
            <span className="truncate">{item.judul_peraturan}</span>
            <span className="shrink-0">•</span>
            <span className="shrink-0">{item.bagian}</span>
          </div>
        </div>

        {/* Pilih Cepat (Pill Buttons) */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-medium text-neu-900 uppercase tracking-wide">
            {config.pillsLabel}
          </span>
          <div className="flex flex-col gap-2">
            {config.pillsRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap items-center gap-2">
                {row.map((text) => {
                  const isSelected = message === text;
                  return (
                    <button
                      key={text}
                      type="button"
                      onClick={() => handleSelectPill(text)}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-normal transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-pr-900 text-white border-pr-900'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neu-900 border-neu-50'
                      }`}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Textarea Form */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[13px]">
            <label className="font-normal text-neu-900">
              {config.fieldLabel} <span className="text-dan-900">*</span>
            </label>
            <span className="text-[12px] font-normal text-neu-500">
              {message.length}/500 karakter
            </span>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
            maxLength={500}
            placeholder={config.placeholder}
            className="w-full h-[120px] rounded-[8px] border border-neu-50 hover:border-neu-200 p-3 text-[13px] font-normal text-neu-900 placeholder:text-neu-400 outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-all resize-none no-scrollbar"
            style={{ outline: 'none' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-[8px] bg-white border border-neu-100 hover:bg-neutral-50 text-neu-900 text-[13px] font-medium transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-[8px] bg-pr-900 text-white hover:bg-pr-800 text-[13px] font-medium transition-colors cursor-pointer shadow-2xs"
          >
            {config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KoreksiActionModal;


import React, { useState, useEffect, useRef } from 'react';
import Modal from '@/Components/common/Modal';
import { StatusBadge } from '@/Components/common';
import { ChevronDown, Check } from 'lucide-react';
import { DokumenHukumItem } from './DocumentTable';

interface EditStatusModalProps {
  show: boolean;
  documentData?: DokumenHukumItem | null;
  onClose: () => void;
  onSave: (docId: string, newStatus: 'berlaku' | 'tidak_berlaku') => void;
}

export function EditStatusModal({
  show,
  documentData,
  onClose,
  onSave,
}: EditStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<'berlaku' | 'tidak_berlaku'>('berlaku');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (documentData) {
      setSelectedStatus(documentData.status);
    }
    setIsDropdownOpen(false);
  }, [documentData, show]);

  // Klik di luar dropdown select untuk menutupnya
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!documentData) return null;

  const handleSave = () => {
    onSave(documentData.id, selectedStatus);
    onClose();
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      maxWidth="status"
      backdropStyle={{ backgroundColor: 'rgba(55, 55, 55, 0.60)' }}
      panelClassName="overflow-visible rounded-[16px] bg-white border border-neu-100 shadow-2xl"
    >
      {/* Box Form Modal Putih Bersih (Solid #FFFFFF) */}
      <div className="p-6 bg-white rounded-[16px] text-left">
        {/* Judul Modal */}
        <h2 className="font-sans text-[18px] font-semibold text-neu-900 leading-tight">
          Ubah Status Hukum
        </h2>

        {/* Subtitle: Judul Dokumen */}
        <p className="font-sans text-[14px] font-normal text-neu-600 mt-1 line-clamp-2">
          &ldquo;{documentData.judul}&rdquo;
        </p>

        {/* Form Field Status */}
        <div className="mt-5" ref={dropdownRef}>
          <label className="block font-sans text-[13px] font-medium text-neu-800 mb-2">
            Status Hukum
          </label>

          {/* Trigger Dropdown Select Box */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[10px] border border-neu-200 bg-white hover:border-neu-300 transition-colors cursor-pointer text-left shadow-2xs"
            >
              <div>
                <StatusBadge status={selectedStatus} />
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neu-400 transition-transform duration-150 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Menu Pilihan Status Dropdown (Sesuai Gambar Figma) */}
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-[10px] border border-neu-100 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {/* Opsi Berlaku */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStatus('berlaku');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-left"
                >
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[12px] font-medium bg-[#EBF7EE] text-[#1E7E34]">
                    Berlaku
                  </span>
                  {selectedStatus === 'berlaku' && (
                    <Check className="w-4 h-4 text-pr-900 stroke-[2.5]" />
                  )}
                </button>

                {/* Opsi Tidak Berlaku */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStatus('tidak_berlaku');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-left"
                >
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[12px] font-medium bg-[#FDEEEE] text-[#D32F2F]">
                    Tidak Berlaku
                  </span>
                  {selectedStatus === 'tidak_berlaku' && (
                    <Check className="w-4 h-4 text-pr-900 stroke-[2.5]" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Bawah */}
        <div className="flex items-center justify-end gap-2.5 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-neu-700 hover:bg-gray-50 rounded-[10px] border border-neu-200 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-[13px] font-medium bg-pr-900 text-white hover:bg-pr-800 rounded-[10px] transition-colors shadow-2xs cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </Modal>
  );
}

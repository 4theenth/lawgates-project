import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, ArrowUpDown, Pencil, CheckCircle2, Trash2 } from 'lucide-react';
import { StatusBadge } from '@/Components/common';

export interface DokumenHukumItem {
  id: string;
  kategori: string;
  judul: string;
  status: 'berlaku' | 'tidak_berlaku';
  tgl_ditetapkan: string;
}

interface DocumentTableProps {
  documents: DokumenHukumItem[];
  onEdit?: (doc: DokumenHukumItem) => void;
  onToggleStatus?: (doc: DokumenHukumItem) => void;
  onDelete?: (doc: DokumenHukumItem) => void;
}

export function DocumentTable({
  documents,
  onEdit,
  onToggleStatus,
  onDelete,
}: DocumentTableProps) {
  // State id dokumen yang menu aksinya sedang terbuka
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  // Tutup popup aksi jika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActiveActionId(null);
      }
    }

    if (activeActionId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeActionId]);

  return (
    <div className="w-full bg-white rounded-xl border border-neu-100 shadow-2xs overflow-visible transition-all duration-200">
      <div className="overflow-x-auto sm:overflow-visible">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#f0f1f3] border-b border-neu-100 text-[11px] font-semibold text-neu-600 uppercase tracking-wider select-none">
              <th className="py-3 px-5 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer hover:text-neu-900">
                  <span>Kategori</span>
                  <ArrowUpDown className="w-3 h-3 text-neu-400" />
                </div>
              </th>
              <th className="py-3 px-5 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer hover:text-neu-900">
                  <span>Judul</span>
                  <ArrowUpDown className="w-3 h-3 text-neu-400" />
                </div>
              </th>
              <th className="py-3 px-5 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer hover:text-neu-900">
                  <span>Status Hukum</span>
                  <ArrowUpDown className="w-3 h-3 text-neu-400" />
                </div>
              </th>
              <th className="py-3 px-5 whitespace-nowrap">
                <div className="inline-flex items-center gap-1 cursor-pointer hover:text-neu-900">
                  <span>Tgl Ditetapkan</span>
                  <ArrowUpDown className="w-3 h-3 text-neu-400" />
                </div>
              </th>
              <th className="py-3 px-5 text-right whitespace-nowrap">
                <span>Aksi</span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-neu-50 text-[13px] text-neu-800">
            {documents.map((doc, index) => {
              const isActionOpen = activeActionId === doc.id;
              // Buka ke atas jika baris berada di bagian bawah tabel agar tidak terpotong
              const isNearBottom = index >= documents.length - 2 && documents.length >= 3;

              return (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Kategori */}
                  <td className="py-3.5 px-5 font-normal text-neu-700 whitespace-nowrap">
                    {doc.kategori}
                  </td>

                  {/* Judul */}
                  <td className="py-3.5 px-5 font-normal text-neu-900 max-w-md">
                    <span className="line-clamp-1" title={doc.judul}>
                      {doc.judul}
                    </span>
                  </td>

                  {/* Status Hukum (Pill Badge Menggunakan Komponen Reusable Common) */}
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <StatusBadge status={doc.status} />
                  </td>

                  {/* Tgl Ditetapkan */}
                  <td className="py-3.5 px-5 text-neu-600 whitespace-nowrap">
                    {doc.tgl_ditetapkan}
                  </td>

                  {/* Aksi Button (Tiga Titik) & Overlay Menu */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveActionId(isActionOpen ? null : doc.id)
                      }
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-neu-600 hover:text-black transition-colors cursor-pointer"
                      aria-label="Aksi dokumen"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Popover Aksi (Nimpa / Overlay Sesuai Gambar 3) */}
                    {isActionOpen && (
                      <div
                        ref={actionMenuRef}
                        className={`absolute right-5 ${
                          isNearBottom ? 'bottom-10' : 'top-11'
                        } z-30 w-36 bg-white rounded-xl shadow-xl border border-neu-100 py-1.5 text-left animate-in fade-in zoom-in-95 duration-150`}
                      >
                        <div className="px-3 py-1 text-[11px] font-semibold text-neu-400 uppercase tracking-wider">
                          Aksi
                        </div>

                        {/* Edit Data */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onEdit) onEdit(doc);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-neu-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5 text-neu-500" />
                          <span>Edit Data</span>
                        </button>

                        {/* Edit Status */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onToggleStatus) onToggleStatus(doc);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-neu-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-neu-500" />
                          <span>Edit Status</span>
                        </button>

                        {/* Hapus */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveActionId(null);
                            if (onDelete) onDelete(doc);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-[#E53E3E] hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-[#E53E3E]" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

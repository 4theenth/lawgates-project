import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Bookmark,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  FolderInput,
  Trash2,
  ExternalLink,
  Check,
} from 'lucide-react';
import Dropdown from '@/Components/common/Dropdown';

export interface BookmarkCollectionTag {
  id: number | string;
  name: string;
}

export interface BookmarkCardItem {
  id: number | string;
  unique_id: string;
  judul: string;
  nomor?: string;
  tahun: number | string;
  jenis: string;
  status: string;
  bookmarked_at?: string;
  collections?: BookmarkCollectionTag[];
}

export interface BookmarkCardProps {
  item: BookmarkCardItem;
  isManaging?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: number | string) => void;
  onRemoveBookmark?: (id: number | string, judul: string) => void;
  onManageCollections?: (item: BookmarkCardItem) => void;
  allCollections?: BookmarkCollectionTag[];
  onToggleCollection?: (bookmarkId: number | string, collectionId: number | string) => void;
  className?: string;
}

/**
 * Komponen Kartu Bookmark Regulasi
 * Sesuai Figma node #3148:56584 & #3198:77152
 *
 * Menampilkan tag jenis, status berlaku, tag koleksi, waktu simpan,
 * menu aksi tiga titik (Pilih Folder - Figma #3198:77105), serta Checkbox saat mode "Kelola" aktif.
 */
export function BookmarkCard({
  item,
  isManaging = false,
  isSelected = false,
  onToggleSelect,
  onRemoveBookmark,
  onManageCollections,
  allCollections = [],
  onToggleCollection,
  className = '',
}: BookmarkCardProps) {
  const isBerlaku =
    !item.status.toLowerCase().includes('tidak') &&
    !item.status.toLowerCase().includes('cabut');

  const handleCardClick = (e: React.MouseEvent) => {
    if (isManaging) {
      e.preventDefault();
      onToggleSelect?.(item.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white border rounded-[12px] p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-colors flex flex-col justify-between select-none ${
        isManaging ? 'cursor-pointer' : ''
      } ${
        isSelected
          ? 'border-pr-900'
          : 'border-neu-50 hover:border-neu-200'
      } ${className}`}
    >
      <div>
        {/* ── 1. Row Atas: Tag Jenis Peraturan & Aksi Bookmark / Checkbox ── */}
        <div className="flex items-center justify-between gap-2 mb-3 min-h-[26px]">
          {/* Badge Jenis Peraturan (Figma: bg Primary/50 text-pr-900 rounded 5px) */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[5px] bg-pr-50 text-pr-900 font-sans text-[11px] sm:text-[12px] font-normal truncate max-w-[170px]">
            {item.jenis || 'Undang Undang'}
          </span>

          {/* Action: Checkbox (saat mode kelola) ATAU Ikon Bookmark & Opsi */}
          <div className="flex items-center gap-1 shrink-0 h-[26px]" onClick={(e) => e.stopPropagation()}>
            {isManaging ? (
              <div className="flex items-center justify-end w-6 h-6">
                <button
                  type="button"
                  onClick={() => onToggleSelect?.(item.id)}
                  aria-label={`Pilih ${item.judul}`}
                  className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-pr-900 border-pr-900 text-white shadow-2xs'
                      : 'bg-white border-neu-300 hover:border-neu-400'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              </div>
            ) : (
              <>
                {/* Indikator Bookmark Aktif */}
                <button
                  type="button"
                  onClick={() => onRemoveBookmark?.(item.id, item.judul)}
                  title="Hapus dari Bookmark"
                  className="p-1 text-pr-900 hover:text-dan-800 transition-colors cursor-pointer rounded-md hover:bg-dan-50"
                >
                  <Bookmark className="w-4 h-4 fill-pr-900 text-pr-900" />
                </button>

                {/* Menu Titik Tiga: Pilih Folder (Figma node #3198:77105) */}
                <Dropdown>
                  <Dropdown.Trigger>
                    <button
                      type="button"
                      aria-label="Pilih Folder"
                      className="p-1 rounded-md text-neu-500 hover:text-neu-900 hover:bg-neu-50 transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </Dropdown.Trigger>

                  <Dropdown.Content
                    align="right"
                    width="w-[145px]"
                    contentClasses="py-2.5 px-3 bg-white border border-neu-50 rounded-[10px] shadow-[0px_1px_6.4px_0px_rgba(0,0,0,0.11)]"
                  >
                    <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
                      {/* Header: Pilih Folder */}
                      <span className="font-sans text-[12px] font-medium text-neu-900 pb-2 leading-none select-none">
                        Pilih Folder
                      </span>
                      <div className="w-full border-b border-neu-50 mb-2" />

                      {/* Daftar Checkbox Folder Koleksi */}
                      {(!allCollections || allCollections.length === 0) ? (
                        <span className="font-sans text-[11px] text-neu-400 py-1 select-none">
                          Belum ada folder
                        </span>
                      ) : (
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar">
                          {allCollections.map((col) => {
                            const isAssigned = item.collections?.some(
                              (c) => String(c.id) === String(col.id)
                            );
                            return (
                              <div
                                key={col.id}
                                onClick={() => onToggleCollection?.(item.id, col.id)}
                                className="flex items-center gap-2 py-0.5 cursor-pointer hover:opacity-80 transition-opacity select-none group/item min-w-0"
                              >
                                {/* Checkbox 14x14px (Figma #3198:77113) */}
                                <div
                                  className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                                    isAssigned
                                      ? 'bg-pr-900 border-pr-900 text-white'
                                      : 'bg-white border-neu-200 group-hover/item:border-neu-400'
                                  }`}
                                >
                                  {isAssigned && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span
                                  className="font-sans text-[12px] font-normal text-neu-800 truncate leading-tight min-w-0 flex-1"
                                  title={col.name}
                                >
                                  {col.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </Dropdown.Content>
                </Dropdown>
              </>
            )}
          </div>
        </div>

        {/* ── 2. Judul Peraturan (Link ke Halaman Detail) ── */}
        {isManaging ? (
          <div
            className="block font-sans text-[12px] sm:text-[13px] font-medium leading-[19px] text-neu-900 group-hover:text-pr-900 transition-colors line-clamp-3 mb-3 select-none"
            title={item.judul}
          >
            {item.judul}
          </div>
        ) : (
          <Link
            href={`/peraturan/${item.unique_id}`}
            className="block font-sans text-[12px] sm:text-[13px] font-medium leading-[19px] text-neu-900 group-hover:text-pr-900 transition-colors line-clamp-3 mb-3"
            title={item.judul}
          >
            {item.judul}
          </Link>
        )}
      </div>

      <div>
        {/* ── 3. Status Peraturan (Berlaku / Tidak Berlaku) ── */}
        <div className="mb-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] font-sans text-[11px] font-normal ${
              isBerlaku
                ? 'bg-suc-50 text-suc-900'
                : 'bg-dan-50 text-dan-900'
            }`}
          >
            {isBerlaku ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-suc-900 shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-dan-900 shrink-0" />
            )}
            <span>{item.status || (isBerlaku ? 'Berlaku' : 'Tidak Berlaku')}</span>
          </span>
        </div>

        {/* ── 4. Tag Koleksi / Folder yang Terhubung ── */}
        {item.collections && item.collections.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3 min-w-0 max-w-full">
            {item.collections.map((col) => (
              <span
                key={col.id}
                title={col.name}
                className="inline-block max-w-full truncate px-2 py-0.5 rounded-[8px] bg-neu-50 text-neu-900 font-sans text-[10px] font-normal leading-tight"
              >
                {col.name}
              </span>
            ))}
          </div>
        )}

        {/* ── 5. Row Bawah: Waktu Simpan (Figma: tanpa border pemisah) ── */}
        <div className="mt-2 flex items-center gap-1.5 font-sans text-[10px] text-neu-600 select-none">
          <Clock className="w-3.5 h-3.5 text-neu-500 shrink-0" />
          <span>Disimpan {item.bookmarked_at || 'Baru saja'}</span>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;

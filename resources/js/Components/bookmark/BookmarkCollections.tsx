import React from 'react';
import { Folders, Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { ActionMenu } from '@/Components/common/ActionMenu';

export interface BookmarkCollectionItem {
  id: number | string;
  name: string;
  total_bookmarks?: number;
  bookmarks_count?: number;
}

export interface BookmarkCollectionsProps {
  collections: BookmarkCollectionItem[];
  activeCollectionId: number | string | 'all';
  totalAllBookmarks: number;
  onSelectCollection: (id: number | string | 'all') => void;
  onCreateFolder: () => void;
  onRenameFolder?: (collection: BookmarkCollectionItem) => void;
  onDeleteFolder?: (collection: BookmarkCollectionItem) => void;
  className?: string;
}

/**
 * Komponen Sidebar Folder Koleksi Bookmark
 * Sesuai Figma node #3146:56405
 *
 * Menampilkan daftar folder koleksi dengan icon Folders, counter badge, aksi titik tiga,
 * tombol "+ Buat Folder Baru", dan keterangan tanpa garis pemisah.
 */
export function BookmarkCollections({
  collections = [],
  activeCollectionId = 'all',
  totalAllBookmarks = 0,
  onSelectCollection,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  className = '',
}: BookmarkCollectionsProps) {
  // Total koleksi dihitung bersama "Semua Bookmark"
  const totalCollections = collections.length + 1;

  return (
    <div
      className={`w-full lg:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r border-neu-50 p-5 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* ── 1. Header Koleksi (Tanpa garis bawah) ── */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-sans text-[16px] font-semibold text-pr-900 leading-snug">
            Koleksi
          </h3>
          <span className="font-sans text-[13px] font-normal text-neu-600">
            {totalCollections} Koleksi
          </span>
        </div>

        {/* ── 2. Daftar Folder Koleksi (Batas tepat 10 folder, scroll tetap aktif tapi scrollbar disembunyikan) ── */}
        <div className="flex flex-col gap-1.5 max-h-[494px] overflow-y-auto no-scrollbar">
          {/* Folder Default: "Semua Bookmark" */}
          {(() => {
            const isAllActive = String(activeCollectionId) === 'all' || !activeCollectionId;
            return (
              <div
                onClick={() => onSelectCollection('all')}
                className={`w-full h-11 shrink-0 px-3 rounded-[12px] flex items-center justify-between transition-colors cursor-pointer select-none ${isAllActive
                    ? 'bg-pr-50 text-pr-900 font-semibold'
                    : 'text-neu-600 hover:text-neu-900 hover:bg-pr-50/50 font-normal'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <Folders
                    className={`w-[18px] h-[18px] shrink-0 ${isAllActive ? 'text-pr-900' : 'text-neu-500'
                      }`}
                  />
                  <span className="font-sans text-[13px] truncate leading-none">
                    Semua Bookmark
                  </span>
                </div>

                <div
                  className="flex items-center shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    className={`px-2.5 py-0.5 rounded-[12px] font-sans text-[11px] min-w-[28px] text-center ${isAllActive
                        ? 'bg-white text-pr-900 font-semibold shadow-2xs'
                        : 'bg-pr-50 text-pr-900 font-medium'
                      }`}
                  >
                    {totalAllBookmarks}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* List Folder Kustom User */}
          {collections.map((item) => {
            const isActive = String(activeCollectionId) === String(item.id);
            const count = item.total_bookmarks ?? item.bookmarks_count ?? 0;

            return (
              <div
                key={item.id}
                onClick={() => onSelectCollection(item.id)}
                className={`group w-full h-11 shrink-0 px-3 rounded-[12px] flex items-center justify-between transition-colors cursor-pointer select-none ${isActive
                    ? 'bg-pr-50 text-pr-900 font-semibold'
                    : 'text-neu-600 hover:text-neu-900 hover:bg-pr-50/50 font-normal'
                  }`}
              >
                {/* Kiri: Icon Folders & Nama */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <Folders
                    className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-pr-900' : 'text-neu-500'
                      }`}
                  />
                  <span className="font-sans text-[13px] truncate leading-none" title={item.name}>
                    {item.name}
                  </span>
                </div>

                {/* Kanan: Badge Counter & Menu Titik Tiga */}
                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    className={`px-2.5 py-0.5 rounded-[12px] font-sans text-[11px] min-w-[28px] text-center ${isActive
                        ? 'bg-white text-pr-900 font-semibold shadow-2xs'
                        : 'bg-pr-50 text-pr-900 font-medium'
                      }`}
                  >
                    {count}
                  </span>

                  {/* Dropdown Aksi Folder Titik Tiga (Figma node #3190:74296) */}
                  {(onRenameFolder || onDeleteFolder) && (
                    <ActionMenu
                      trigger={
                        <button
                          type="button"
                          aria-label={`Opsi folder ${item.name}`}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-neu-400 hover:text-neu-800 transition-colors cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      }
                      title="Aksi"
                      items={[
                        ...(onRenameFolder
                          ? [
                            {
                              label: 'Ganti Nama',
                              icon: Pencil,
                              onClick: () => onRenameFolder(item),
                            },
                          ]
                          : []),
                        ...(onDeleteFolder
                          ? [
                            {
                              label: 'Hapus Folder',
                              icon: Trash2,
                              variant: 'danger' as const,
                              onClick: () => onDeleteFolder(item),
                            },
                          ]
                          : []),
                      ]}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 3. Tombol "+ Buat Folder Baru" & Keterangan (Tanpa garis pemisah) ── */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onCreateFolder}
            className="w-full bg-pr-900 hover:bg-pr-800 text-white rounded-[10px] h-11 px-4 font-sans text-[14px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Folder Baru</span>
          </button>

          <p className="font-sans text-[12px] text-neu-500 leading-[18px] mt-3 select-none px-1">
            Satu bookmark dapat disimpan di beberapa koleksi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCollections;

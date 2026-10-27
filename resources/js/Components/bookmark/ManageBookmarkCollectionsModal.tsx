import React, { useState, useEffect, useMemo } from 'react';
import Modal from '@/Components/common/Modal';
import {
  Folders,
  FolderDot,
  Save,
  X,
  Check,
  Search,
  Plus,
  Loader2,
  Bookmark,
} from 'lucide-react';
import { BookmarkCollectionItem } from './BookmarkCollections';
import { BookmarkCardItem } from './BookmarkCard';

export interface ManageBookmarkCollectionsModalProps {
  show: boolean;
  onClose: () => void;
  /** Untuk single bookmark */
  item?: BookmarkCardItem | null;
  /** Untuk bulk mode (banyak bookmark terpilih) */
  selectedBookmarkIds?: (number | string)[];
  /** Array lengkap objek bookmark yang terpilih (opsional, untuk hitung status "Semua sudah ada", dll) */
  selectedBookmarks?: BookmarkCardItem[];
  collections: BookmarkCollectionItem[];
  onSave: (
    bookmarkIds: (number | string)[],
    selectedCollectionIds: (number | string)[]
  ) => void;
  onUnbookmark?: () => void;
  onCreateFolder?: (name: string) => Promise<any> | void;
  isLoading?: boolean;
  isLoadingCollections?: boolean;
  /** Jika true, dirender langsung tanpa Modal portal global (cocok untuk inline overlay container card) */
  inline?: boolean;
}

/**
 * Komponen Modal "Tambah Ke Koleksi"
 * Sesuai Figma node #3214:79985 & screenshot referensi
 */
export function ManageBookmarkCollectionsModal({
  show,
  onClose,
  item,
  selectedBookmarkIds = [],
  selectedBookmarks = [],
  collections = [],
  onSave,
  onUnbookmark,
  onCreateFolder,
  isLoading = false,
  isLoadingCollections = false,
  inline = false,
}: ManageBookmarkCollectionsModalProps) {
  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
  const [search, setSearch] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingInline, setIsCreatingInline] = useState(false);

  const targetBookmarks = useMemo(() => {
    if (item) return [item];
    return selectedBookmarks;
  }, [item, selectedBookmarks]);

  const targetBookmarkIds = useMemo(() => {
    if (item) return [item.id];
    if (selectedBookmarkIds.length > 0) return selectedBookmarkIds;
    return selectedBookmarks.map((b) => b.id);
  }, [item, selectedBookmarkIds, selectedBookmarks]);

  // Inisialisasi koleksi terpilih HANYA saat modal pertama kali dibuka atau item id berganti
  useEffect(() => {
    if (show) {
      if (item && item.collections) {
        setSelectedIds(item.collections.map((c) => c.id));
      } else if (selectedBookmarks && selectedBookmarks.length > 0) {
        const initialCollectionIds = new Set<number | string>();
        selectedBookmarks.forEach((b) => {
          b.collections?.forEach((c) => initialCollectionIds.add(c.id));
        });
        setSelectedIds(Array.from(initialCollectionIds));
      } else {
        setSelectedIds([]);
      }
      setSearch('');
      setNewFolderName('');
    }
  }, [show, item?.id]);

  const filteredCollections = useMemo(() => {
    if (!search.trim()) return collections;
    const q = search.toLowerCase();
    return collections.filter((c) => c.name.toLowerCase().includes(q));
  }, [collections, search]);

  if (inline && !show) return null;

  const toggleCollection = (id: number | string) => {
    setSelectedIds((prev) => {
      const exists = prev.some((item) => String(item) === String(id));
      if (exists) {
        return prev.filter((item) => String(item) !== String(id));
      } else {
        return [...prev, id];
      }
    });
  };

  const handleCreateFolderInline = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newFolderName.trim();
    if (!trimmed) return;

    try {
      setIsCreatingInline(true);
      if (onCreateFolder) {
        const created = await onCreateFolder(trimmed);
        if (created && created.id) {
          setSelectedIds((prev) => [...prev, created.id]);
        }
      }
      setNewFolderName('');
    } finally {
      setIsCreatingInline(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(targetBookmarkIds, selectedIds);
  };

  const totalSelectedCount = selectedIds.length;

  const content = (
    <form onSubmit={handleSave} className="flex flex-col bg-white max-h-[85vh] sm:max-h-none">
      {/* ── 1. Header Modal (Figma & Screenshot) ── */}
      <div className="flex items-start justify-between p-5 pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Folders className="w-5 h-5 text-neu-900 stroke-[1.75]" />
            <h3 className="font-sans text-[16px] font-semibold text-neu-900 leading-tight">
              Tambah Ke Koleksi
            </h3>
          </div>
          <p className="font-sans text-[12px] text-neu-500 leading-normal">
            Satu peraturan dapat disimpan di beberapa koleksi.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup modal"
          className="p-1 rounded-md text-neu-400 hover:text-neu-700 hover:bg-neu-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-neu-900" />
        </button>
      </div>

      {/* ── 2. Section "Tersimpan" (Tanpa garis pemisah di bawahnya) ── */}
      <div className="px-5 mb-2.5">
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <Folders className="w-5 h-5 text-neu-900 stroke-[1.75]" />
            <span className="font-sans text-[13px] font-semibold text-neu-900">
              Tersimpan
            </span>
          </div>
          {onUnbookmark ? (
            <button
              type="button"
              onClick={onUnbookmark}
              title="Batal simpan / Hapus dari bookmark"
              aria-label="Batal simpan dari bookmark"
              className="p-1 rounded-md text-pr-900 hover:text-dan-600 hover:bg-dan-50 transition-colors cursor-pointer group/unbookmark"
            >
              <Bookmark className="w-4 h-4 fill-pr-900 text-pr-900 group-hover/unbookmark:text-dan-600 group-hover/unbookmark:fill-dan-600 transition-colors" />
            </button>
          ) : (
            <Bookmark className="w-4 h-4 fill-pr-900 text-pr-900" />
          )}
        </div>
      </div>

      {/* ── 3. Search Bar Koleksi ── */}
      <div className="px-5 mb-3">
        <div className="relative w-full h-[38px] rounded-[10px] bg-white border border-neu-100 hover:border-neu-200 flex items-center px-3 gap-2 shadow-2xs focus-within:border-neu-200 focus-within:ring-2 focus-within:ring-pr-900/5 transition-all">
          <Search className="w-4 h-4 text-neu-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari koleksi yang ingin disimpan"
            className="w-full h-full bg-transparent font-sans text-[12px] text-neu-900 placeholder:text-neu-400 focus:outline-none"
          />
        </div>
      </div>

      {/* ── 4. Label & List Koleksi ── */}
      <div className="px-5 pb-2">
        <div className="font-sans text-[12px] font-medium text-neu-900 mb-2">
          Koleksi
        </div>

        <div className="min-h-[160px] max-h-[220px] overflow-y-auto space-y-2 pr-1 no-scrollbar">
          {isLoadingCollections ? (
            <div className="flex items-center justify-center py-6 gap-2 text-neu-400">
              <Loader2 className="w-4 h-4 animate-spin text-pr-900" />
              <span className="font-sans text-[12px] text-neu-500">Memuat folder koleksi...</span>
            </div>
          ) : filteredCollections.length === 0 ? (
            <p className="text-center py-6 font-sans text-[12px] text-neu-400">
              {collections.length === 0
                ? 'Belum ada folder koleksi. Buat folder baru di bawah.'
                : 'Folder koleksi tidak ditemukan.'}
            </p>
          ) : (
            filteredCollections.map((col) => {
              const isChecked = selectedIds.some((selectedId) => String(selectedId) === String(col.id));
              const count = col.total_bookmarks ?? col.bookmarks_count ?? (col as any).bookmark_count ?? 0;

              // Hitung status indikator peraturan di koleksi ini
              const existingCount = targetBookmarks.filter((b) =>
                b.collections?.some((c) => String(c.id) === String(col.id))
              ).length;
              const totalTargets = targetBookmarks.length;

              let statusDot = 'bg-neu-400';
              let statusText = 'Belum ada';
              let statusTextColor = 'text-neu-500';

              if (totalTargets > 0) {
                if (existingCount === totalTargets) {
                  statusDot = 'bg-[#16A34A]';
                  statusText = 'Semua sudah ada';
                  statusTextColor = 'text-[#16A34A]';
                } else if (existingCount > 0) {
                  statusDot = 'bg-[#D97706]';
                  statusText = `${existingCount} dari ${totalTargets} sudah ada`;
                  statusTextColor = 'text-[#D97706]';
                }
              }

              return (
                <div
                  key={col.id}
                  onClick={() => toggleCollection(col.id)}
                  className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-neu-50 cursor-pointer select-none group transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {/* Checkbox */}
                    <div
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                        isChecked
                          ? 'bg-pr-900 border-pr-900 text-white'
                          : 'bg-white border-neu-300 group-hover:border-neu-400'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <Folders className="w-4 h-4 text-neu-700 stroke-[1.75] shrink-0" />

                    <span className="font-sans text-[13px] font-normal text-neu-900 truncate" title={col.name}>
                      {col.name}
                    </span>

                    <span className="px-2 py-0.5 rounded-full bg-neu-100 text-neu-700 font-sans text-[11px] font-normal shrink-0">
                      {count}
                    </span>
                  </div>

                  {/* Status Indicator di Kanan */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot}`} />
                    <span className={`font-sans text-[11px] font-normal ${statusTextColor}`}>
                      {statusText}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── 5. Quick Inline Tambah Folder ── */}
      <div className="px-5 py-3 border-t border-pr-50 flex items-center gap-2">
        <div className="flex-1 h-[38px] px-3 rounded-[8px] bg-white border border-neu-100 hover:border-neu-200 flex items-center gap-2 focus-within:border-neu-200 focus-within:ring-2 focus-within:ring-pr-900/5 transition-all">
          <FolderDot className="w-4 h-4 text-neu-400 shrink-0 stroke-[1.75]" />
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                handleCreateFolderInline();
              }
            }}
            placeholder="Buat folder baru"
            maxLength={50}
            className="w-full h-full bg-transparent font-sans text-[12px] text-neu-900 placeholder:text-neu-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateFolderInline}
          disabled={isCreatingInline || !newFolderName.trim()}
          className="h-[38px] px-4 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white font-sans text-[12px] font-medium transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5 shrink-0 shadow-2xs"
        >
          {isCreatingInline ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
          <span>Tambah</span>
        </button>
      </div>

      {/* ── 6. Footer Aksi Simpan (Figma & Screenshot - bg-pr-50 & border-pr-50) ── */}
      <div className="p-5 pt-3.5 pb-7 sm:pb-5 bg-pr-50 border-t border-pr-50 flex flex-col gap-3">
        <div className="flex items-center gap-2 font-sans text-[12px] text-neu-900">
          <Folders className="w-4 h-4 text-neu-900 stroke-[1.75] shrink-0" />
          <span>
            <strong>{totalSelectedCount} Koleksi</strong> akan diperbarui
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading || targetBookmarkIds.length === 0}
          className="w-full h-[40px] rounded-[10px] bg-pr-900 hover:bg-pr-800 text-white font-sans text-[13px] font-medium transition-colors shadow-2xs cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan ke Koleksi</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  if (inline) {
    return (
      <div
        className="relative z-10 m-auto w-full max-w-[420px] sm:max-w-[430px] rounded-[20px] bg-white border border-neu-50 shadow-[0px_10px_30px_rgba(0,0,0,0.15)] overflow-hidden text-left"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {content}
      </div>
    );
  }

  return (
    <Modal
      show={show}
      maxWidth="collection"
      onClose={onClose}
      bottomSheetMobile={true}
      backdropStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.40)' }}
      panelClassName="w-full sm:max-w-[430px] rounded-t-[30px] rounded-b-none sm:rounded-[20px] bg-white border-t sm:border border-neu-50 shadow-[0px_-10px_30px_rgba(0,0,0,0.15)] sm:shadow-[0px_10px_30px_rgba(0,0,0,0.15)] overflow-hidden text-left"
    >
      {content}
    </Modal>
  );
}

export default ManageBookmarkCollectionsModal;

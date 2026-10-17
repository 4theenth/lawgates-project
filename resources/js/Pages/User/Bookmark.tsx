import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
import { Pagination } from '@/Components/common/Pagination';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { useToast } from '@/hooks/useToast';
import {
  Bookmark as BookmarkIcon,
  Search,
  ExternalLink,
  Trash2,
  Calendar,
  FileText,
} from 'lucide-react';
import { PageProps } from '@/types';

interface BookmarkItem {
  id: number;
  unique_id: string;
  judul: string;
  nomor: string;
  tahun: string;
  tempat_penetapan?: string;
  tanggal_penetapan?: string;
  jenis: string;
  status: string;
  bookmarked_at: string;
}

interface PaginationData {
  data: BookmarkItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  links: any[];
}

interface BookmarkPageProps extends PageProps {
  bookmarks: PaginationData;
  filters: {
    q?: string;
  };
}

export default function UserBookmark({
  bookmarks,
  filters,
}: BookmarkPageProps) {
  const { toast } = useToast();
  const [search, setSearch] = useState(filters.q || '');
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | string | null>(null);
  const [selectedDeleteTitle, setSelectedDeleteTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(
      route('user.bookmarks'),
      { q: search },
      { preserveState: true, replace: true }
    );
  };

  const handleConfirmDelete = () => {
    if (!selectedDeleteId) return;

    setIsDeleting(true);
    router.delete(route('bookmarks.destroy', selectedDeleteId), {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeleting(false);
        setSelectedDeleteId(null);
      },
      onError: () => {
        setIsDeleting(false);
        toast.error('Gagal menghapus peraturan dari bookmark.');
      },
    });
  };

  return (
    <UserLayout>
      <Head title="Bookmark Peraturan - LawGates" />

      {/* 1. Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: route('dashboard') },
            { label: 'Bookmark' },
          ]}
        />
      </div>

      {/* 2. Page Header */}
      <AdminPageHeader
        title="Bookmark Peraturan"
        description="Kelola dan akses kembali seluruh peraturan hukum yang telah Anda simpan"
      />

      {/* 3. Bar Pencarian Bookmark */}
      <div className="w-full bg-white border border-neu-50 rounded-[12px] p-4 sm:p-5 shadow-2xs mb-6">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari dalam daftar peraturan tersimpan..."
              className="w-full h-10 pl-10 pr-4 py-2.5 rounded-[10px] bg-neu-50/50 border border-neu-100 font-sans text-[13px] text-neu-900 placeholder:text-neu-400 focus:outline-none focus:border-pr-900 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-neu-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            className="h-10 px-5 rounded-[10px] bg-pr-900 hover:bg-pr-800 text-white text-xs font-medium transition-colors shadow-2xs cursor-pointer shrink-0"
          >
            Cari Bookmark
          </button>
        </form>
      </div>

      {/* 4. Daftar Bookmark */}
      {bookmarks.data.length === 0 ? (
        /* Empty State */
        <div className="w-full bg-white border border-neu-50 rounded-[12px] p-12 sm:p-16 flex flex-col items-center justify-center text-center shadow-2xs">
          <div className="w-14 h-14 rounded-full bg-neu-50 border border-neu-100 flex items-center justify-center text-neu-400 mb-3">
            <BookmarkIcon className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="font-sans text-[16px] font-semibold text-neu-900 mb-1">
            {filters.q ? 'Peraturan Tidak Ditemukan' : 'Belum Ada Bookmark'}
          </h3>
          <p className="font-sans text-[13px] text-neu-500 max-w-md mb-6 leading-relaxed">
            {filters.q
              ? `Tidak ada peraturan tersimpan yang cocok dengan kata kunci "${filters.q}". Coba kata kunci lain.`
              : 'Anda belum menandai peraturan apapun. Temukan peraturan yang Anda butuhkan dan klik ikon simpan (bookmark).'}
          </p>
          <Link
            href="/regulasi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-white text-xs font-medium transition-colors shadow-2xs"
          >
            <FileText className="w-4 h-4" />
            <span>Mulai Jelajah Regulasi</span>
          </Link>
        </div>
      ) : (
        /* Grid Kartu Bookmark */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {bookmarks.data.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-neu-50 hover:border-neu-200 rounded-[12px] p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Badges & Meta */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider bg-pr-50 text-pr-900">
                      {item.jenis}
                    </span>

                    <span className="text-[11px] text-neu-400">
                      Disimpan {item.bookmarked_at}
                    </span>
                  </div>

                  {/* Judul Peraturan */}
                  <Link
                    href={`/peraturan/${item.unique_id}`}
                    className="block font-sans text-[14px] sm:text-[15px] font-semibold text-neu-900 hover:text-pr-900 leading-snug line-clamp-2 transition-colors mb-2"
                  >
                    {item.judul}
                  </Link>

                  {/* Nomor & Tahun */}
                  <p className="font-sans text-[12px] text-neu-600 mb-4">
                    Nomor {item.nomor} Tahun {item.tahun}
                  </p>
                </div>

                {/* Footer Kartu: Tanggal Penetapan & Aksi */}
                <div className="pt-3.5 border-t border-neu-50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-neu-500">
                    <Calendar className="w-3.5 h-3.5 text-neu-400" />
                    <span>{item.tanggal_penetapan || `Tahun ${item.tahun}`}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Tombol Hapus Bookmark */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDeleteId(item.id);
                        setSelectedDeleteTitle(item.judul);
                      }}
                      className="p-1.5 text-neu-400 hover:text-dan-900 hover:bg-dan-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus dari bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Tombol Buka Dokumen */}
                    <Link
                      href={`/peraturan/${item.unique_id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-pr-50 hover:bg-pr-100 text-pr-900 text-xs font-medium transition-colors"
                    >
                      <span>Lihat</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {bookmarks.last_page > 1 && (
            <div className="pt-4 flex justify-center">
              <Pagination
                currentPage={bookmarks.current_page}
                lastPage={bookmarks.last_page}
                onPageChange={(page) => {
                  router.get(
                    route('user.bookmarks'),
                    { q: search, page },
                    { preserveState: true }
                  );
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Modal Konfirmasi Hapus Bookmark */}
      <DeleteConfirmModal
        show={Boolean(selectedDeleteId)}
        onClose={() => setSelectedDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus dari Bookmark?"
        itemName={selectedDeleteTitle}
        confirmText="Hapus"
        isLoading={isDeleting}
      />
    </UserLayout>
  );
}

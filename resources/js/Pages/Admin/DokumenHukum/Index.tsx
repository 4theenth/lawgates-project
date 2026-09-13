import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { StatusTabs } from '@/Components/admin/StatusTabs';
import { EmptyState } from '@/Components/admin/EmptyState';
import { Pagination } from '@/Components/admin/Pagination';
import { DocumentTable, DokumenHukumItem } from '@/Components/admin/DocumentTable';
import { FilterPopover } from '@/Components/admin/FilterPopover';
import { DocumentModal } from '@/Components/admin/DocumentModal';
import { EditStatusModal } from '@/Components/admin/EditStatusModal';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { Plus, Search, RotateCcw } from 'lucide-react';

const INITIAL_DOCUMENTS: DokumenHukumItem[] = [
  {
    id: '1',
    kategori: 'Peraturan Presiden',
    judul: 'Peraturan Presiden Nomor 29 Tahun 2026',
    status: 'berlaku',
    tgl_ditetapkan: '18 Agustus 2023',
  },
  {
    id: '2',
    kategori: 'UU',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '3',
    kategori: 'Peraturan Presiden',
    judul: 'Peraturan Presiden Nomor 29 Tahun 2026',
    status: 'berlaku',
    tgl_ditetapkan: '18 Agustus 2023',
  },
  {
    id: '4',
    kategori: 'UUD',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '5',
    kategori: 'Peraturan Mentri',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '6',
    kategori: 'Putusan MK',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '7',
    kategori: 'Peraturan Daerah',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '8',
    kategori: 'UU',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '9',
    kategori: 'UU',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '10',
    kategori: 'UU',
    judul: 'Undang-undang Nomor 4 Tahun 2026 Tentang Undang-undang Republik Indonesia',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '02 Januari 2001',
  },
  {
    id: '11',
    kategori: 'Peraturan Presiden',
    judul: 'Peraturan Presiden Nomor 12 Tahun 2024 Tentang Transformasi Digital Hukum',
    status: 'berlaku',
    tgl_ditetapkan: '12 Maret 2024',
  },
  {
    id: '12',
    kategori: 'UU',
    judul: 'Undang-undang Nomor 1 Tahun 2024 Tentang Informasi dan Transaksi Elektronik',
    status: 'berlaku',
    tgl_ditetapkan: '04 Januari 2024',
  },
  {
    id: '13',
    kategori: 'Undang Undang Darurat',
    judul: 'Undang-undang Darurat Nomor 12 Tahun 1951 Tentang Senjata Api dan Bahan Peledak',
    status: 'berlaku',
    tgl_ditetapkan: '04 September 1951',
  },
  {
    id: '14',
    kategori: 'Peraturan Mentri',
    judul: 'Peraturan Menteri Hukum dan HAM Nomor 25 Tahun 2023 Tentang Tata Naskah Dinas',
    status: 'berlaku',
    tgl_ditetapkan: '15 November 2023',
  },
  {
    id: '15',
    kategori: 'Putusan MK',
    judul: 'Putusan MK Nomor 91/PUU-XVIII/2020 Mengenai Uji Formil Undang-Undang Cipta Kerja',
    status: 'tidak_berlaku',
    tgl_ditetapkan: '25 November 2021',
  },
  {
    id: '16',
    kategori: 'Peraturan Daerah',
    judul: 'Peraturan Daerah Provinsi DKI Jakarta Nomor 2 Tahun 2024 Tentang Tata Ruang',
    status: 'berlaku',
    tgl_ditetapkan: '19 Februari 2024',
  },
  {
    id: '17',
    kategori: 'UUD',
    judul: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 Pasca Amandemen Keempat',
    status: 'berlaku',
    tgl_ditetapkan: '10 Agustus 2002',
  },
  {
    id: '18',
    kategori: 'UU',
    judul: 'Undang-undang Nomor 27 Tahun 2022 Tentang Pelindungan Data Pribadi',
    status: 'berlaku',
    tgl_ditetapkan: '17 Oktober 2022',
  },
  {
    id: '19',
    kategori: 'Peraturan Presiden',
    judul: 'Peraturan Presiden Nomor 39 Tahun 2019 Tentang Satu Data Indonesia',
    status: 'berlaku',
    tgl_ditetapkan: '12 Juni 2019',
  },
  {
    id: '20',
    kategori: 'Putusan MK',
    judul: 'Putusan Mahkamah Konstitusi Nomor 13/PUU-XXII/2024',
    status: 'berlaku',
    tgl_ditetapkan: '20 Maret 2024',
  },
  {
    id: '21',
    kategori: 'Peraturan Mentri',
    judul: 'Peraturan Menteri Komunikasi dan Informatika Nomor 5 Tahun 2020',
    status: 'berlaku',
    tgl_ditetapkan: '24 November 2020',
  },
  {
    id: '22',
    kategori: 'UU',
    judul: 'Undang-undang Nomor 13 Tahun 2022 Tentang Pembentukan Peraturan Perundang-undangan',
    status: 'berlaku',
    tgl_ditetapkan: '16 Juni 2022',
  },
];

const ALL_CATEGORIES = [
  'Peraturan Presiden',
  'Peraturan Mentri',
  'Putusan MK',
  'Undang Undang Darurat',
  'UUD',
  'UU',
  'Peraturan Daerah',
];

export default function DokumenHukumIndex() {
  // Data dokumen utama
  const [documents, setDocuments] = useState<DokumenHukumItem[]>(INITIAL_DOCUMENTS);

  // Filter & Search states
  const [activeTab, setActiveTab] = useState<'all' | 'berlaku' | 'tidak_berlaku'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Peraturan Presiden',
    'Peraturan Mentri',
    'Putusan MK',
    'UUD',
    'UU',
    'Peraturan Daerah',
  ]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination states responsif
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // In-place Modal Overlay states (Nimpa bukan buka halaman baru)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<DokumenHukumItem | null>(null);
  const [editingStatusDoc, setEditingStatusDoc] = useState<DokumenHukumItem | null>(null);
  const [deletingDoc, setDeletingDoc] = useState<DokumenHukumItem | null>(null);

  const statusOptions = [
    { id: 'berlaku' as const, label: 'Belaku' },
    { id: 'tidak_berlaku' as const, label: 'Tidak Berlaku' },
  ];

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Dokumen Hukum' },
  ];

  // Handler toggle tab status (Klik tab aktif mematikan filter tab menjadi 'all')
  const handleTabChange = (tab: 'berlaku' | 'tidak_berlaku') => {
    setActiveTab((prev) => (prev === tab ? 'all' : tab));
  };

  // Handler toggle kategori checkbox pada popover filter
  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handler buka modal ubah status dokumen
  const handleOpenEditStatus = (doc: DokumenHukumItem) => {
    setEditingStatusDoc(doc);
  };

  // Handler simpan status dari EditStatusModal
  const handleSaveStatus = (docId: string, newStatus: 'berlaku' | 'tidak_berlaku') => {
    setDocuments((prev) =>
      prev.map((item) =>
        item.id === docId
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  // Handler simpan tambah / edit dokumen
  const handleSaveDocument = (data: Omit<DokumenHukumItem, 'id'> & { id?: string }) => {
    if (data.id) {
      // Mode Edit
      setDocuments((prev) =>
        prev.map((item) => (item.id === data.id ? ({ ...item, ...data } as DokumenHukumItem) : item))
      );
    } else {
      // Mode Tambah Baru
      const newDoc: DokumenHukumItem = {
        id: String(Date.now()),
        kategori: data.kategori,
        judul: data.judul,
        status: data.status,
        tgl_ditetapkan: data.tgl_ditetapkan,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    }
  };

  // Handler hapus dokumen
  const handleConfirmDelete = () => {
    if (!deletingDoc) return;
    setDocuments((prev) => prev.filter((item) => item.id !== deletingDoc.id));
    setDeletingDoc(null);
  };

  // Reset ke data awal atau kosongkan untuk menguji tampilan empty state
  const handleResetData = () => {
    setDocuments(INITIAL_DOCUMENTS);
    setActiveTab('all');
    setSearchQuery('');
    setSelectedCategories([
      'Peraturan Presiden',
      'Peraturan Mentri',
      'Putusan MK',
      'UUD',
      'UU',
      'Peraturan Daerah',
    ]);
  };

  const handleClearAllData = () => {
    setDocuments([]);
  };

  // Filter logika data
  const filteredDocuments = documents.filter((doc) => {
    // 1. Filter Tab Status
    if (activeTab !== 'all' && doc.status !== activeTab) {
      return false;
    }

    // 2. Filter Kategori dari Popover
    if (!selectedCategories.includes(doc.kategori)) {
      return false;
    }

    // 3. Filter Search Input
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchJudul = doc.judul.toLowerCase().includes(q);
      const matchKategori = doc.kategori.toLowerCase().includes(q);
      if (!matchJudul && !matchKategori) {
        return false;
      }
    }

    return true;
  });

  // Perhitungan total halaman secara dinamis & responsif sesuai data yang difilter
  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / pageSize));

  // Otomatis reset ke halaman 1 jika filter menyebabkan currentPage melebihi totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Irisan dokumen yang ditampilkan sesuai halaman aktif dan ukuran pageSize
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + pageSize);

  const hasData = filteredDocuments.length > 0;

  return (
    <AdminLayout>
      <Head title="Daftar Dokumen Hukum" />

      {/* 1. Breadcrumb Navigasi */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* 2. Page Header & Action Button Sesuai Spesifikasi Figma */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            Daftar Dokumen Hukum
          </h1>
          <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            Kelola daftar peraturan, putusan, dan impor dokumen hukum hasil OCR.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol Cepat Reset Data (Untuk Pengujian Status Kosong vs Ada Data) */}
          {documents.length === 0 ? (
            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-neu-700 bg-white border border-neu-100 rounded-[10px] hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
              title="Kembalikan data contoh"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neu-500" />
              <span>Reset Data Contoh</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClearAllData}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-normal text-neu-500 hover:text-red-600 hover:bg-red-50 rounded-[10px] transition-colors cursor-pointer"
              title="Kosongkan data untuk tes Empty State"
            >
              <span>Uji Empty State</span>
            </button>
          )}

          {/* Tombol Tambah Hukum (Membuka Alur Tambah Data / Impor JSON OCR) */}
          <Link
            href="/admin/dokumen-hukum/tambah"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[13px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Hukum</span>
          </Link>
        </div>
      </div>

      {/* 3. Toolbar: Status Filter Tabs & Search / Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tab Belaku / Tidak Berlaku */}
        <StatusTabs
          tabs={statusOptions}
          activeTab={activeTab}
          onChange={handleTabChange}
        />

        {/* Search Input & Tombol Popover Filter */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neu-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kategori, judul..."
              className="w-full sm:w-64 pl-9 pr-3 py-1.5 text-[13px] rounded-[10px] border border-neu-50 bg-white placeholder-neu-400 text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all shadow-2xs"
            />
          </div>

          {/* Popover Filter Kategori (Nimpa Sesuai Gambar 2) */}
          <FilterPopover
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
            onClose={() => setIsFilterOpen(false)}
            categories={ALL_CATEGORIES}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
          />
        </div>
      </div>

      {/* 4. Area Data: Tabel Dokumen jika ada data, atau Empty State jika kosong */}
      <div className="mb-6">
        {hasData ? (
          <DocumentTable
            documents={paginatedDocuments}
            onEdit={(doc) => setEditingDoc(doc)}
            onToggleStatus={handleOpenEditStatus}
            onDelete={(doc) => setDeletingDoc(doc)}
          />
        ) : (
          <EmptyState
            title="Belum ada data hukum"
            description="Silakan tambahkan data hukum melalui tombol 'Tambah Hukum' atau sesuaikan filter pencarian Anda."
          />
        )}
      </div>

      {/* 5. Pagination Bawah (Responsif dan dinamis sesuai jumlah data hasil filter) */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      {/* ── MODAL OVERLAYS (Nimpa In-Place tanpa reload / pindah halaman) ── */}
      {/* Modal Tambah Dokumen */}
      <DocumentModal
        show={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveDocument}
        categories={ALL_CATEGORIES}
      />

      {/* Modal Edit Dokumen */}
      <DocumentModal
        show={Boolean(editingDoc)}
        documentData={editingDoc}
        onClose={() => setEditingDoc(null)}
        onSave={handleSaveDocument}
        categories={ALL_CATEGORIES}
      />

      {/* Modal Ubah Status Hukum (Sesuai Gambar dengan backdrop rgba(55,55,55,0.60)) */}
      <EditStatusModal
        show={Boolean(editingStatusDoc)}
        documentData={editingStatusDoc}
        onClose={() => setEditingStatusDoc(null)}
        onSave={handleSaveStatus}
      />

      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmModal
        show={Boolean(deletingDoc)}
        documentData={deletingDoc}
        onClose={() => setDeletingDoc(null)}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}

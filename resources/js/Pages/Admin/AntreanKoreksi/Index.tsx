import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { PageHeader } from '@/Components/common/PageHeader';
import { StatCard } from '@/Components/admin/StatCard';
import { Pagination } from '@/Components/admin/Pagination';
import { KoreksiActionModal } from '@/Components/admin/KoreksiActionModal';
import {
  FileText,
  Hourglass,
  CircleCheckBig,
  CircleCheck,
  CircleX,
  Search,
  X,
  MoreVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Trash,
  Trash2,
  Check,
  Megaphone,
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';

export type KoreksiStatus = 'belum_ditinjau' | 'disetujui' | 'ditolak';
export type FilterTab = 'semua' | 'belum_ditinjau' | 'disetujui' | 'ditolak';
export type SortColumn = 'waktu' | 'pengguna' | 'dokumen' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface KoreksiItem {
  id: number;
  tanggal: string;
  waktu_lalu: string;
  created_at_timestamp: number;
  user_name: string;
  user_email: string;
  jenis_peraturan: string;
  judul_peraturan: string;
  bagian: string;
  status: KoreksiStatus;
  teks_asli?: string;
  usulan_text: string;
  alasan?: string;
  admin_message?: string | null;
}

interface AntreanKoreksiStats {
  total: number;
  belum_ditinjau: number;
  disetujui: number;
  ditolak: number;
}

interface AntreanKoreksiIndexProps {
  stats: AntreanKoreksiStats;
  koreksiList: KoreksiItem[];
}

export default function AntreanKoreksiIndex({
  stats: initialStats,
  koreksiList: initialList = [],
}: AntreanKoreksiIndexProps) {
  const { toast } = useToast();

  // ─────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────
  const [items, setItems] = useState<KoreksiItem[]>(initialList);
  const [activeTab, setActiveTab] = useState<FilterTab>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Popover Action Menu State
  const [actionMenuState, setActionMenuState] = useState<{
    id: number;
    item: KoreksiItem;
    top: number;
    left: number;
  } | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  // Modals
  const [viewingItem, setViewingItem] = useState<KoreksiItem | null>(null);
  const [approvingItem, setApprovingItem] = useState<KoreksiItem | null>(null);
  const [approvalMessage, setApprovalMessage] = useState('');
  const [rejectingItem, setRejectingItem] = useState<KoreksiItem | null>(null);
  const [rejectionMessage, setRejectionMessage] = useState('');
  const [deletingItem, setDeletingItem] = useState<KoreksiItem | null>(null);

  // ─────────────────────────────────────────────
  // Computed Stats
  // ─────────────────────────────────────────────
  const stats = useMemo(() => {
    const belum = items.filter((i) => i.status === 'belum_ditinjau').length;
    const setuju = items.filter((i) => i.status === 'disetujui').length;
    const tolak = items.filter((i) => i.status === 'ditolak').length;
    return {
      total: items.length || initialStats.total,
      belum_ditinjau: belum || initialStats.belum_ditinjau,
      disetujui: setuju || initialStats.disetujui,
      ditolak: tolak || initialStats.ditolak,
    };
  }, [items, initialStats]);

  // ─────────────────────────────────────────────
  // Close Action Popover on Outside Click & Scroll
  // ─────────────────────────────────────────────
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActionMenuState(null);
      }
    }
    function handleScrollOrResize() {
      setActionMenuState(null);
    }

    if (actionMenuState) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [actionMenuState]);

  // ─────────────────────────────────────────────
  // Filtering & Sorting Data
  // ─────────────────────────────────────────────
  const filteredData = useMemo(() => {
    let result = [...items];

    // Filter Status Tab
    if (activeTab !== 'semua') {
      result = result.filter((item) => item.status === activeTab);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        return (
          item.user_name.toLowerCase().includes(q) ||
          item.user_email.toLowerCase().includes(q) ||
          item.judul_peraturan.toLowerCase().includes(q) ||
          item.bagian.toLowerCase().includes(q) ||
          item.usulan_text.toLowerCase().includes(q)
        );
      });
    }

    // Sorting
    if (sortColumn) {
      result.sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        if (sortColumn === 'waktu') {
          valA = a.created_at_timestamp;
          valB = b.created_at_timestamp;
        } else if (sortColumn === 'pengguna') {
          valA = a.user_name.toLowerCase();
          valB = b.user_name.toLowerCase();
        } else if (sortColumn === 'dokumen') {
          valA = a.judul_peraturan.toLowerCase();
          valB = b.judul_peraturan.toLowerCase();
        } else if (sortColumn === 'status') {
          valA = a.status;
          valB = b.status;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [items, activeTab, searchQuery, sortColumn, sortDirection]);

  // Paginated Data
  const totalPages = Math.max(Math.ceil(filteredData.length / pageSize), 1);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // ─────────────────────────────────────────────
  // Event Handlers
  // ─────────────────────────────────────────────
  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setActionMenuState(null);
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn !== column) {
      // Logic 1: Klik pertama -> Ascending
      setSortColumn(column);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      // Logic 2: Klik kedua -> Descending
      setSortDirection('desc');
    } else {
      // Logic 3: Klik ketiga -> Balik kaya awal (reset ke urutan default)
      setSortColumn(null);
      setSortDirection('asc');
    }
  };

  const handleOpenAction = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: KoreksiItem
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    // Estimasi tinggi popover: status belum_ditinjau ada 4 menu (~190px), selain itu 2 menu (~120px)
    const estimatedHeight = item.status === 'belum_ditinjau' ? 195 : 125;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldOpenUpwards = spaceBelow < estimatedHeight + 15 && spaceAbove > spaceBelow;

    let computedTop = shouldOpenUpwards
      ? rect.top - estimatedHeight - 6
      : rect.bottom + 6;

    // Boundary check agar tidak pernah keluar atau terpotong di viewport bawah/atas
    if (computedTop + estimatedHeight > window.innerHeight - 12) {
      computedTop = window.innerHeight - estimatedHeight - 12;
    }
    if (computedTop < 12) {
      computedTop = 12;
    }

    setActionMenuState({
      id: item.id,
      item,
      top: computedTop,
      left: Math.max(12, Math.min(window.innerWidth - 155, rect.right - 142)),
    });
  };

  // Buka Modal Setujui
  const handleOpenApprove = (item: KoreksiItem) => {
    setActionMenuState(null);
    setApprovingItem(item);
    setApprovalMessage('');
  };

  // Konfirmasi Setujui & Terapkan
  const handleConfirmApprove = (customMessage?: string) => {
    if (!approvingItem) return;
    const finalMsg =
      (typeof customMessage === 'string' ? customMessage : approvalMessage).trim() ||
      'Terima kasih atas kontribusi anda.';
    setItems((prev) =>
      prev.map((i) =>
        i.id === approvingItem.id
          ? {
              ...i,
              status: 'disetujui',
              admin_message: finalMsg,
            }
          : i
      )
    );
    if (viewingItem && viewingItem.id === approvingItem.id) {
      setViewingItem((prev) =>
        prev ? { ...prev, status: 'disetujui', admin_message: finalMsg } : null
      );
    }
    toast.success(
      `Usulan koreksi untuk "${approvingItem.judul_peraturan}" berhasil disetujui & diterapkan!`
    );
    setApprovingItem(null);
    setApprovalMessage('');
  };

  // Buka Modal Tolak
  const handleOpenReject = (item: KoreksiItem) => {
    setActionMenuState(null);
    setRejectingItem(item);
    setRejectionMessage('');
  };

  // Konfirmasi Tolak
  const handleConfirmReject = (customMessage?: string) => {
    if (!rejectingItem) return;
    const finalMsg =
      (typeof customMessage === 'string' ? customMessage : rejectionMessage).trim() ||
      'Usulan koreksi belum dapat disetujui saat ini.';
    setItems((prev) =>
      prev.map((i) =>
        i.id === rejectingItem.id
          ? {
              ...i,
              status: 'ditolak',
              admin_message: finalMsg,
            }
          : i
      )
    );
    if (viewingItem && viewingItem.id === rejectingItem.id) {
      setViewingItem((prev) =>
        prev ? { ...prev, status: 'ditolak', admin_message: finalMsg } : null
      );
    }
    toast.error(`Usulan koreksi ditolak.`);
    setRejectingItem(null);
    setRejectionMessage('');
  };

  // Konfirmasi Hapus
  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    setItems((prev) => prev.filter((i) => i.id !== deletingItem.id));
    toast.success('Usulan koreksi berhasil dihapus dari antrean.');
    setDeletingItem(null);
    setActionMenuState(null);
  };

  // Render Sort Icon
  const renderSortIcon = (col: SortColumn) => {
    if (sortColumn === col) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-pr-900 shrink-0" />
      );
    }
    return (
      <ArrowUpDown className="w-3.5 h-3.5 text-neu-400 group-hover:text-neu-600 transition-colors shrink-0" />
    );
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Antrean Koreksi' },
  ];

  return (
    <AdminLayout>
      <Head title="Antrean Koreksi - Admin" />

      {/* ── 1. Breadcrumb Navigasi (#3448:61377) ── */}
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* ── 2. Page Header (#3448:61378) ── */}
      <PageHeader
        title="Antrean Koreksi"
        description="Tinjau usulan perbaikan teks dokumen hukum dari pengguna dan praktisi hukum"
      />

      {/* ── 3. Baris Stat Cards 4 Kolom (#3448:61490 & #3476:63190) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {/* Card 1: Total Koreksi */}
        <StatCard
          title="Total Koreksi"
          value={stats.total.toLocaleString('id-ID')}
          icon={<FileText className="w-5 h-5 text-sec-900" />}
          note="Total koreksi yang ada"
        />

        {/* Card 2: Belum Ditinjau */}
        <StatCard
          title="Belum Ditinjau"
          value={stats.belum_ditinjau.toLocaleString('id-ID')}
          icon={<Hourglass className="w-5 h-5 text-sec-900" />}
          note="Total koreksi yang belum direview"
        />

        {/* Card 3: Disetujui */}
        <StatCard
          title="Disetujui"
          value={stats.disetujui.toLocaleString('id-ID')}
          icon={<CircleCheckBig className="w-5 h-5 text-sec-900" />}
          note="Total koreksi yang disetujui"
        />

        {/* Card 4: Ditolak */}
        <StatCard
          title="Ditolak"
          value={stats.ditolak.toLocaleString('id-ID')}
          icon={<CircleX className="w-5 h-5 text-sec-900" />}
          note="Total koreksi yang ditolak"
        />
      </div>

      {/* ── 4. Toolbar: Segmented Toggle Filter (#3476:62297) & Search Box ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        {/* Toggle Segmented Tabs Sesuai Figma node #3476:62297 */}
        <div className="bg-white border border-neu-50 rounded-[10px] p-[5px_8px] flex items-center gap-2 shadow-2xs overflow-x-auto no-scrollbar">
          {[
            { key: 'semua' as const, label: 'Semua' },
            { key: 'belum_ditinjau' as const, label: 'Belum Ditinjau' },
            { key: 'disetujui' as const, label: 'Disetujui' },
            { key: 'ditolak' as const, label: 'Ditolak' },
          ].map((tab, idx) => {
            const isActive = activeTab === tab.key;
            return (
              <React.Fragment key={tab.key}>
                {idx > 0 && <div className="w-[1px] h-5 bg-neu-100 shrink-0" />}
                <button
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  className={`px-3 py-1.5 text-[12px] whitespace-nowrap transition-all cursor-pointer rounded-[6px] ${
                    isActive
                      ? 'bg-pr-900 text-white font-medium shadow-2xs'
                      : 'text-neu-900 font-normal hover:text-pr-900'
                  }`}
                >
                  {tab.label}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Search Box (#3476:63172) */}
        <div className="relative w-full sm:w-[260px] md:w-[300px]">
          <Search className="w-4 h-4 text-neu-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari pengguna, dokumen..."
            className="w-full h-[38px] bg-white rounded-[10px] border border-neu-50 hover:border-neu-200 pl-9 pr-8 text-[12px] text-neu-900 placeholder:text-neu-400 outline-none focus:outline-none focus-visible:outline-none focus:border-neu-200 focus:ring-2 focus:ring-pr-900/5 transition-all"
            style={{ outline: 'none' }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neu-400 hover:text-neu-700 p-0.5 rounded cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── 5. Main Table (#3476:63112) ── */}
      <div className="w-full bg-white rounded-[15px] border border-neu-50 shadow-2xs overflow-hidden mb-6">
        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[760px] border-collapse text-left">
            {/* Header (#3476:63113) */}
            <thead>
              <tr className="bg-[#E9E9E9] border-b border-neu-100 text-[11px] font-medium text-neutral-900 tracking-wider">
                <th
                  onClick={() => handleSort('waktu')}
                  className="py-3 px-5 cursor-pointer hover:bg-neutral-200/50 transition-colors select-none"
                  style={{ width: '22%' }}
                >
                  <div className="inline-flex items-center gap-1.5 group">
                    <span className={sortColumn === 'waktu' ? 'font-bold text-pr-900' : ''}>
                      WAKTU DILAPORKAN
                    </span>
                    {renderSortIcon('waktu')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('pengguna')}
                  className="py-3 px-4 cursor-pointer hover:bg-neutral-200/50 transition-colors select-none"
                  style={{ width: '25%' }}
                >
                  <div className="inline-flex items-center gap-1.5 group">
                    <span className={sortColumn === 'pengguna' ? 'font-bold text-pr-900' : ''}>
                      PENGGUNA
                    </span>
                    {renderSortIcon('pengguna')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('dokumen')}
                  className="py-3 px-4 cursor-pointer hover:bg-neutral-200/50 transition-colors select-none"
                  style={{ width: '30%' }}
                >
                  <div className="inline-flex items-center gap-1.5 group">
                    <span className={sortColumn === 'dokumen' ? 'font-bold text-pr-900' : ''}>
                      DOKUMEN TERKAIT
                    </span>
                    {renderSortIcon('dokumen')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('status')}
                  className="py-3 px-4 cursor-pointer hover:bg-neutral-200/50 transition-colors select-none text-center sm:text-left"
                  style={{ width: '15%' }}
                >
                  <div className="inline-flex items-center gap-1.5 group">
                    <span className={sortColumn === 'status' ? 'font-bold text-pr-900' : ''}>
                      STATUS HUKUM
                    </span>
                    {renderSortIcon('status')}
                  </div>
                </th>

                <th className="py-3 px-4 text-center" style={{ width: '8%' }}>
                  AKSI
                </th>
              </tr>
            </thead>

            {/* Body Rows */}
            <tbody className="divide-y divide-neu-50 text-[14px]">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => {
                  const isDitolak = item.status === 'ditolak';
                  const isDisetujui = item.status === 'disetujui';
                  const isBelumDitinjau = item.status === 'belum_ditinjau';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-neutral-50/70 transition-colors group"
                    >
                      {/* Waktu Dilaporkan */}
                      <td className="py-3.5 px-5">
                        <div className="font-normal text-neu-900 leading-snug">
                          {item.tanggal}
                        </div>
                        <div className="text-[12px] font-normal text-neu-500">
                          {item.waktu_lalu}
                        </div>
                      </td>

                      {/* Pengguna */}
                      <td className="py-3.5 px-4">
                        <div className="font-normal text-neu-900 leading-snug">
                          {item.user_name}
                        </div>
                        <div className="text-[12px] font-normal text-neu-500">
                          {item.user_email}
                        </div>
                      </td>

                      {/* Dokumen Terkait */}
                      <td className="py-3.5 px-4">
                        <div className="font-normal text-neu-900 leading-snug line-clamp-1">
                          {item.judul_peraturan}
                        </div>
                        <div className="text-[12px] font-normal text-neu-500">
                          {item.bagian}
                        </div>
                      </td>

                      {/* Status Hukum Badge */}
                      <td className="py-3.5 px-4">
                        {isDisetujui && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[12px] bg-suc-50 text-suc-900 text-[12px] font-normal">
                            Disetujui
                          </span>
                        )}
                        {isBelumDitinjau && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[12px] bg-sec-50 text-sec-900 text-[12px] font-normal">
                            Belum Ditinjau
                          </span>
                        )}
                        {isDitolak && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[12px] bg-dan-50 text-dan-900 text-[12px] font-normal">
                            Ditolak
                          </span>
                        )}
                      </td>

                      {/* Aksi */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => handleOpenAction(e, item)}
                          className="p-1 text-neu-700 hover:text-neu-900 transition-colors cursor-pointer rounded-md"
                          title="Menu Aksi"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neu-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 opacity-40" />
                      <p className="text-[14px] font-medium text-neu-900">
                        Tidak ada usulan koreksi yang sesuai
                      </p>
                      <p className="text-[12px] text-neu-400">
                        Coba ubah kata kunci pencarian atau tab filter di atas
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 6. Pagination Sesuai Figma (#3476:63177) ── */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={[10, 15, 20, 50, 100]}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      )}

      {/* ── 7. Floating Action Popover (#3476:63533 & #3495:61059) ── */}
      {actionMenuState && (
        <div
          ref={actionMenuRef}
          style={{
            position: 'fixed',
            top: actionMenuState.top,
            left: actionMenuState.left,
            zIndex: 9999,
          }}
          className="w-[140px] bg-white border border-neu-100 rounded-[12px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100 select-none"
        >
          {/* Header Aksi */}
          <div className="px-3.5 py-2 text-[14px] font-medium text-neu-900 border-b border-neu-100">
            Aksi
          </div>

          <div className="flex flex-col py-1">
            {/* Opsi Lihat: Navigasi ke halaman detail atau buka modal */}
            <Link
              href={`/admin/antrean-koreksi/${actionMenuState.item.id}`}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[14px] font-normal text-neu-900 hover:bg-neutral-50 transition-colors cursor-pointer text-left"
            >
              <Eye className="w-4 h-4 text-neu-700 shrink-0" />
              <span>Lihat</span>
            </Link>

            {/* Opsi Khusus Belum Ditinjau: Tanpa warna (hanya ikon & teks netral) */}
            {actionMenuState.item.status === 'belum_ditinjau' && (
              <>
                <button
                  type="button"
                  onClick={() => handleOpenApprove(actionMenuState.item)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[14px] font-normal text-neu-900 hover:bg-neutral-50 transition-colors cursor-pointer text-left"
                >
                  <CircleCheck className="w-4 h-4 text-neu-700 shrink-0" />
                  <span>Setujui</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenReject(actionMenuState.item)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[14px] font-normal text-neu-900 hover:bg-neutral-50 transition-colors cursor-pointer text-left"
                >
                  <CircleX className="w-4 h-4 text-neu-700 shrink-0" />
                  <span>Tolak</span>
                </button>
              </>
            )}
          </div>

          <div className="border-t border-neu-100" />

          {/* Opsi Hapus: Icon / trash-2 dan teks dikasih warna Danger/900 */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setDeletingItem(actionMenuState.item);
                setActionMenuState(null);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[14px] font-normal text-dan-900 hover:bg-dan-50/50 transition-colors cursor-pointer text-left"
            >
              <Trash2 className="w-4 h-4 text-dan-900 shrink-0" />
              <span>Hapus</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 8. Modal Detail Usulan Koreksi ("Lihat") ── */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[620px] max-h-[90vh] bg-white rounded-[15px] border border-neu-50 p-6 shadow-xl flex flex-col gap-5 overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-neu-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-pr-50 flex items-center justify-center text-pr-900">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-neu-900">
                    Detail Usulan Koreksi
                  </h3>
                  <p className="text-[12px] text-neu-500">
                    ID #{viewingItem.id} • Dilaporkan {viewingItem.tanggal}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingItem(null)}
                className="text-neu-400 hover:text-neu-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Meta Info Pengusul & Dokumen */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-50/70 rounded-[10px] text-[13px]">
              <div>
                <span className="text-[11px] font-medium text-neu-500 uppercase tracking-wider block">
                  Pengusul
                </span>
                <span className="font-medium text-neu-900 block">
                  {viewingItem.user_name}
                </span>
                <span className="text-neu-500 text-[12px] block">
                  {viewingItem.user_email}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-neu-500 uppercase tracking-wider block">
                  Dokumen Terkait
                </span>
                <span className="font-medium text-neu-900 block line-clamp-1">
                  {viewingItem.judul_peraturan}
                </span>
                <span className="text-neu-500 text-[12px] block">
                  {viewingItem.bagian}
                </span>
              </div>
            </div>

            {/* Teks Asli (Jika ada) */}
            {viewingItem.teks_asli && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-neu-700 uppercase tracking-wider">
                  Naskah Asli Dokumen
                </label>
                <div className="p-3 bg-neutral-50 rounded-[8px] border border-neu-50 text-[13px] text-neu-700 leading-relaxed max-h-[140px] overflow-y-auto no-scrollbar">
                  {viewingItem.teks_asli}
                </div>
              </div>
            )}

            {/* Teks Usulan */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-neu-700 uppercase tracking-wider">
                Usulan Perbaikan Pengguna
              </label>
              <div className="p-3 bg-suc-50/30 rounded-[8px] border border-suc-100 text-[13px] text-neu-900 leading-relaxed font-medium max-h-[140px] overflow-y-auto no-scrollbar">
                “{viewingItem.usulan_text}”
              </div>
            </div>

            {/* Alasan Koreksi */}
            {viewingItem.alasan && (
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-medium text-neu-700 uppercase tracking-wider">
                  Alasan Koreksi
                </label>
                <p className="text-[13px] text-neu-600 bg-neutral-50/50 p-2.5 rounded-[8px]">
                  {viewingItem.alasan}
                </p>
              </div>
            )}

            {/* Pesan Admin / Status */}
            {viewingItem.admin_message && (
              <div
                className={`p-3 rounded-[8px] text-[13px] ${
                  viewingItem.status === 'ditolak'
                    ? 'bg-dan-50 text-dan-900 border-l-4 border-dan-900'
                    : 'bg-suc-50 text-suc-900 border-l-4 border-suc-900'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider block mb-0.5">
                  Catatan Admin
                </span>
                {viewingItem.admin_message}
              </div>
            )}

            {/* Footer Modal */}
            <div className="flex items-center justify-between pt-3 border-t border-neu-50">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-neu-500">Status Saat Ini:</span>
                <span
                  className={`text-[12px] font-medium px-2 py-0.5 rounded-[8px] ${
                    viewingItem.status === 'disetujui'
                      ? 'bg-suc-50 text-suc-900'
                      : viewingItem.status === 'ditolak'
                      ? 'bg-dan-50 text-dan-900'
                      : 'bg-sec-50 text-sec-900'
                  }`}
                >
                  {viewingItem.status === 'disetujui'
                    ? 'Disetujui'
                    : viewingItem.status === 'ditolak'
                    ? 'Ditolak'
                    : 'Belum Ditinjau'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {viewingItem.status === 'belum_ditinjau' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleOpenReject(viewingItem)}
                      className="px-3.5 py-1.5 rounded-[8px] bg-dan-50 text-dan-900 text-[13px] font-medium hover:bg-dan-100 transition-colors cursor-pointer"
                    >
                      Tolak
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenApprove(viewingItem)}
                      className="px-3.5 py-1.5 rounded-[8px] bg-suc-900 text-white text-[13px] font-medium hover:bg-suc-800 transition-colors cursor-pointer shadow-2xs"
                    >
                      Setujui
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setViewingItem(null)}
                  className="px-4 py-1.5 rounded-[8px] bg-neutral-100 text-neu-700 text-[13px] font-normal hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 9. Modal Konfirmasi Setujui Usulan Koreksi (#3492:60533) ── */}
      <KoreksiActionModal
        isOpen={!!approvingItem}
        type="setujui"
        item={approvingItem}
        onClose={() => setApprovingItem(null)}
        onConfirm={handleConfirmApprove}
      />

      {/* ── 10. Modal Konfirmasi Tolak Usulan Koreksi (#3482:64088) ── */}
      <KoreksiActionModal
        isOpen={!!rejectingItem}
        type="tolak"
        item={rejectingItem}
        onClose={() => setRejectingItem(null)}
        onConfirm={handleConfirmReject}
      />

      {/* ── 11. Modal Konfirmasi Hapus Usulan ── */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[420px] bg-white rounded-[15px] border border-neu-50 p-6 shadow-xl flex flex-col gap-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dan-50 flex items-center justify-center text-dan-900">
                  <Trash2 className="w-5 h-5 text-dan-900" />
                </div>
                <h3 className="text-[16px] font-semibold text-neu-900">
                  Hapus Usulan Koreksi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="text-neu-400 hover:text-neu-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[14px] font-normal text-neu-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus usulan koreksi untuk dokumen{' '}
              <span className="font-semibold text-neu-900">
                "{deletingItem.judul_peraturan}"
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-[8px] bg-neutral-100 text-neu-700 text-[13px] font-normal hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-[8px] bg-dan-900 text-white text-[13px] font-medium hover:bg-dan-800 transition-colors cursor-pointer shadow-2xs"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AlertTriangle, Users } from 'lucide-react';
import { TeamHeader } from '@/Components/admin/team/TeamHeader';
import { TeamToolbar } from '@/Components/admin/team/TeamToolbar';
import { TeamSection } from '@/Components/admin/team/TeamSection';
import { TeamEmptyCard } from '@/Components/admin/team/TeamEmptyCard';
import { TeamTable, TeamSortColumn, SortDirection } from '@/Components/admin/team/TeamTable';
import { TeamModal, TeamModalMode } from '@/Components/admin/team/TeamModal';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { useToast } from '@/hooks/useToast';
import {
  TeamMember,
  TeamMemberRole,
  TeamMemberStatus,
  TeamStatusTabId,
  TEAM_SECTIONS,
  DUMMY_PENDING_EXPIRED_MEMBERS,
  DUMMY_REGISTERED_MEMBERS,
} from '@/constants/team';

interface TimPageProps {
  filters?: {
    tab?: TeamStatusTabId | 'all';
    search?: string;
  };
}

export default function Tim({ filters }: TimPageProps) {
  const { toast } = useToast();

  // ── Data State (Dummy Dataset sesuai screenshot) ─────────────
  // Section 1: 4 item tepat (Mangadi, Kevin, Monica, Yudis Purba)
  const [pendingList, setPendingList] = useState<TeamMember[]>(
    DUMMY_PENDING_EXPIRED_MEMBERS
  );

  // Section 2: 4 item tepat (Kayika Dewa, Danan, Satria, Adi Wirata)
  // Menyatukan status Aktif dan Non Aktif menjadi "Tim Terdaftar"
  const [registeredList, setRegisteredList] = useState<TeamMember[]>(
    DUMMY_REGISTERED_MEMBERS
  );

  // ── Modal States (Tambah Tim / Edit Tim / Lihat Tim & Delete) ─
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<TeamModalMode>('create');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);

  // ── Filter States ─────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<TeamStatusTabId | 'all'>(
    filters?.tab || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');
  const [selectedRoles, setSelectedRoles] = useState<TeamMemberRole[]>([]);

  // ── Sorting States ────────────────────────────────────────────
  const [sortPendingCol, setSortPendingCol] = useState<TeamSortColumn | null>(null);
  const [sortPendingDir, setSortPendingDir] = useState<SortDirection>('asc');

  const [sortRegisteredCol, setSortRegisteredCol] = useState<TeamSortColumn | null>(null);
  const [sortRegisteredDir, setSortRegisteredDir] = useState<SortDirection>('asc');

  // ── Pagination States ─────────────────────────────────────────
  const [pagePending, setPagePending] = useState(1);
  const [pageSizePending, setPageSizePending] = useState(10);

  const [pageRegistered, setPageRegistered] = useState(1);
  const [pageSizeRegistered, setPageSizeRegistered] = useState(10);

  // ── Sort Logic Helper ─────────────────────────────────────────
  const applySort = (
    list: TeamMember[],
    col: TeamSortColumn | null,
    dir: SortDirection
  ) => {
    if (!col) return list;
    return [...list].sort((a, b) => {
      const valA = (a[col] || '').toString().toLowerCase();
      const valB = (b[col] || '').toString().toLowerCase();
      if (valA < valB) return dir === 'asc' ? -1 : 1;
      if (valA > valB) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // ── Filter Logic untuk Section 1: Tim Pending & Expired ──────
  const filteredPending = useMemo(() => {
    let list = pendingList;

    if (activeTab === 'pending') {
      list = list.filter((m) => m.status === 'pending');
    } else if (activeTab === 'expired') {
      list = list.filter((m) => m.status === 'expired');
    } else {
      list = list.filter((m) => m.status === 'pending' || m.status === 'expired');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      );
    }

    if (selectedRoles.length > 0) {
      list = list.filter((m) => selectedRoles.includes(m.role));
    }

    return applySort(list, sortPendingCol, sortPendingDir);
  }, [pendingList, activeTab, searchQuery, selectedRoles, sortPendingCol, sortPendingDir]);

  // ── Filter Logic untuk Section 2: Tim Terdaftar (Aktif & Non Aktif) ──
  const filteredRegistered = useMemo(() => {
    let list = registeredList;

    if (activeTab === 'aktif') {
      list = list.filter((m) => m.status === 'aktif');
    } else if (activeTab === 'non_aktif') {
      list = list.filter((m) => m.status === 'non_aktif');
    } else {
      list = list.filter((m) => m.status === 'aktif' || m.status === 'non_aktif');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      );
    }

    if (selectedRoles.length > 0) {
      list = list.filter((m) => selectedRoles.includes(m.role));
    }

    return applySort(list, sortRegisteredCol, sortRegisteredDir);
  }, [registeredList, activeTab, searchQuery, selectedRoles, sortRegisteredCol, sortRegisteredDir]);

  // ── Dynamic Pagination Calculations ──────────────────────────
  const totalPagesPending = Math.max(1, Math.ceil(filteredPending.length / pageSizePending));
  const totalPagesRegistered = Math.max(1, Math.ceil(filteredRegistered.length / pageSizeRegistered));

  const paginatedPending = useMemo(() => {
    const start = (pagePending - 1) * pageSizePending;
    return filteredPending.slice(start, start + pageSizePending);
  }, [filteredPending, pagePending, pageSizePending]);

  const paginatedRegistered = useMemo(() => {
    const start = (pageRegistered - 1) * pageSizeRegistered;
    return filteredRegistered.slice(start, start + pageSizeRegistered);
  }, [filteredRegistered, pageRegistered, pageSizeRegistered]);

  // ── Section Visibility Logic Sesuai Permintaan User ───────────
  // 1. Saat tidak ada tab yang di-select (activeTab === 'all'), tampilkan 2 TABEL SAJA:
  //    - Tim Pending & Expired
  //    - Tim Terdaftar (Aktif & Non Aktif disatukan)
  // 2. Saat tab spesifik di-select (misal: 'aktif' atau 'non_aktif'), HANYA tampilkan tabel yang sesuai
  const showPendingSection = activeTab === 'all' || activeTab === 'pending' || activeTab === 'expired';
  const showRegisteredSection = activeTab === 'all' || activeTab === 'aktif' || activeTab === 'non_aktif';

  // ── Event Handlers ────────────────────────────────────────────
  const handleTabChange = (tab: TeamStatusTabId) => {
    const nextTab = activeTab === tab ? 'all' : tab;
    setActiveTab(nextTab);
    setPagePending(1);
    setPageRegistered(1);
  };

  const handleToggleRole = (role: TeamMemberRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    setPagePending(1);
    setPageRegistered(1);
  };

  const handleSortPending = (col: TeamSortColumn) => {
    if (sortPendingCol === col) {
      if (sortPendingDir === 'asc') setSortPendingDir('desc');
      else {
        setSortPendingCol(null);
        setSortPendingDir('asc');
      }
    } else {
      setSortPendingCol(col);
      setSortPendingDir('asc');
    }
  };

  const handleSortRegistered = (col: TeamSortColumn) => {
    if (sortRegisteredCol === col) {
      if (sortRegisteredDir === 'asc') setSortRegisteredDir('desc');
      else {
        setSortRegisteredCol(null);
        setSortRegisteredDir('asc');
      }
    } else {
      setSortRegisteredCol(col);
      setSortRegisteredDir('asc');
    }
  };

  // ── Modal Actions: Tambah Tim, Edit Tim, & Lihat Tim ─────────
  const handleOpenInvite = () => {
    setEditingMember(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenView = (member: TeamMember) => {
    setEditingMember(member);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleSaveMember = (data: {
    id?: string;
    name: string;
    email: string;
    role: TeamMemberRole;
    status: TeamMemberStatus;
  }) => {
    try {
      if (!data.name.trim() || !data.email.trim()) {
        toast.error('Data gagal disimpan / dihapus', 'Nama dan email tim wajib diisi.');
        return;
      }

      if (data.id) {
        // Mode Edit Tim (termasuk ubah status Aktif / Non Aktif)
        const updateMember = (prev: TeamMember[]) =>
          prev.map((m) =>
            m.id === data.id
              ? {
                  ...m,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  status: data.status,
                }
              : m
          );

        setPendingList(updateMember);
        setRegisteredList(updateMember);

        setIsModalOpen(false);
        setEditingMember(null);
        toast.success('Data berhasil disimpan');
      } else {
        // Mode Tambah Tim (Undang Tim baru dengan status pending)
        const newMember: TeamMember = {
          id: `team-${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role,
          status: 'pending',
        };

        setPendingList((prev) => [newMember, ...prev]);
        setIsModalOpen(false);
        setEditingMember(null);
        toast.success('Data berhasil disimpan');
      }
    } catch {
      toast.error('Data gagal disimpan / dihapus');
    }
  };

  // Hapus anggota tim (hanya bisa bila status bukan 'aktif')
  const handleConfirmDelete = () => {
    if (!deletingMember) return;

    if (deletingMember.status === 'aktif') {
      toast.error('Data gagal disimpan / dihapus', 'Anggota tim dengan status aktif tidak dapat dihapus.');
      setDeletingMember(null);
      return;
    }

    setPendingList((prev) => prev.filter((m) => m.id !== deletingMember.id));
    setRegisteredList((prev) => prev.filter((m) => m.id !== deletingMember.id));

    toast.deleted('Data berhasil dihapus');
    setDeletingMember(null);
  };

  const handleResendInvite = (member: TeamMember) => {
    toast.success(`Undangan berhasil dikirim kembali ke ${member.email}!`);
  };

  return (
    <AdminLayout>
      <Head title="Daftar Tim Lawgates - Admin" />

      {/* 1. Header Halaman */}
      <TeamHeader onInviteClick={handleOpenInvite} />

      {/* 2. Toolbar (Tab Filter Status, Search Input, & Popover Filter Role) */}
      <TeamToolbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={(e) => {
          setSearchQuery(e.target.value);
          setPagePending(1);
          setPageRegistered(1);
        }}
        onSearchClear={() => setSearchQuery('')}
        selectedRoles={selectedRoles}
        onToggleRole={handleToggleRole}
      />

      {/* 3. Konten Utama: Ditampilkan Sesuai Tab Filter */}
      <div className="flex flex-col gap-8 pb-10">
        {/* Section 1: Tim Pending & Expired (Hanya tampil saat tab 'all', 'pending', atau 'expired') */}
        {showPendingSection && (
          <TeamSection
            title={
              activeTab === 'pending'
                ? 'Tim Pending'
                : activeTab === 'expired'
                ? 'Tim Expired'
                : TEAM_SECTIONS.pendingAndExpired.sectionTitle
            }
            currentPage={pagePending}
            totalPages={totalPagesPending}
            pageSize={pageSizePending}
            onPageChange={(page) => setPagePending(page)}
            onPageSizeChange={(size) => {
              setPageSizePending(size);
              setPagePending(1);
            }}
          >
            {filteredPending.length > 0 ? (
              <TeamTable
                members={paginatedPending}
                sortColumn={sortPendingCol}
                sortDirection={sortPendingDir}
                onSort={handleSortPending}
                onDelete={(m) => setDeletingMember(m)}
                onResendInvite={handleResendInvite}
                onView={handleOpenView}
                onEdit={handleOpenEdit}
              />
            ) : (
              <TeamEmptyCard
                icon={
                  <AlertTriangle className="w-5 h-5 text-neu-400 stroke-[1.5]" />
                }
                title={TEAM_SECTIONS.pendingAndExpired.emptyTitle}
                description={TEAM_SECTIONS.pendingAndExpired.emptyDescription}
              />
            )}
          </TeamSection>
        )}

        {/* Section 2: Tim Terdaftar (Aktif & Non Aktif Disatukan) */}
        {showRegisteredSection && (
          <TeamSection
            title={TEAM_SECTIONS.registered.sectionTitle}
            currentPage={pageRegistered}
            totalPages={totalPagesRegistered}
            pageSize={pageSizeRegistered}
            onPageChange={(page) => setPageRegistered(page)}
            onPageSizeChange={(size) => {
              setPageSizeRegistered(size);
              setPageRegistered(1);
            }}
          >
            {filteredRegistered.length > 0 ? (
              <TeamTable
                members={paginatedRegistered}
                sortColumn={sortRegisteredCol}
                sortDirection={sortRegisteredDir}
                onSort={handleSortRegistered}
                onView={handleOpenView}
                onEdit={handleOpenEdit}
                onDelete={(m) => setDeletingMember(m)}
              />
            ) : (
              <TeamEmptyCard
                icon={
                  <Users className="w-5 h-5 text-neu-400 stroke-[1.5]" />
                }
                title={TEAM_SECTIONS.registered.emptyTitle}
                description={TEAM_SECTIONS.registered.emptyDescription}
              />
            )}
          </TeamSection>
        )}
      </div>

      {/* Drawer Modal Tambah Tim, Edit Tim, & Data Tim Sesuai Gambar 1 - 4 */}
      <TeamModal
        show={isModalOpen}
        mode={modalMode}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        memberData={editingMember}
      />

      {/* Modal Konfirmasi Hapus Anggota Tim */}
      <DeleteConfirmModal
        show={Boolean(deletingMember)}
        title="Hapus Anggota Tim?"
        itemName={deletingMember ? `${deletingMember.name} (${deletingMember.email})` : ''}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}

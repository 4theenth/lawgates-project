import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  RotateCcw,
  Eye,
  Pencil,
} from 'lucide-react';
import profileAvatar from '@/assets/profile-avatar.webp';
import {
  TeamMember,
  TeamMemberStatus,
  TEAM_STATUS_TABS,
  TEAM_ACTIONS,
} from '@/constants/team';

export type TeamSortColumn = 'name' | 'email' | 'role' | 'status';
export type SortDirection = 'asc' | 'desc';

interface TeamTableProps {
  members: TeamMember[];
  onView?: (member: TeamMember) => void;
  onEdit?: (member: TeamMember) => void;
  onDelete?: (member: TeamMember) => void;
  onResendInvite?: (member: TeamMember) => void;
  sortColumn?: TeamSortColumn | null;
  sortDirection?: SortDirection;
  onSort?: (column: TeamSortColumn) => void;
}

export function TeamTable({
  members,
  onView,
  onEdit,
  onDelete,
  onResendInvite,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
}: TeamTableProps) {
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
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

  const renderSortIcon = (column: TeamSortColumn) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="w-3 h-3 text-pr-900" />
      ) : (
        <ArrowDown className="w-3 h-3 text-pr-900" />
      );
    }
    return (
      <ArrowUpDown className="w-3 h-3 text-neu-400 group-hover:text-neu-600 transition-colors" />
    );
  };

  const getStatusBadge = (status: TeamMemberStatus) => {
    const tabConfig = TEAM_STATUS_TABS.find((t) => t.id === status);
    const badgeClass =
      tabConfig?.badgeClass || 'bg-neu-100 text-neu-800 border border-neu-200';
    const label = tabConfig?.label || status;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${badgeClass}`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl border border-neu-100 shadow-2xs overflow-visible transition-all duration-200">
      <div className="overflow-x-auto sm:overflow-visible">
        <table className="w-full min-w-[620px] text-left border-collapse">
          {/* Table Header Sesuai Desain Figma */}
          <thead>
            <tr className="bg-[#F1F5F9]/80 border-b border-neu-100 text-[11px] font-semibold text-neu-600 uppercase tracking-wider select-none">
              {/* Kolom NAME */}
              <th className="py-3 px-5 whitespace-nowrap">
                <div
                  onClick={() => onSort?.('name')}
                  className="group inline-flex items-center gap-1 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'name' ? 'text-pr-900 font-bold' : ''}>
                    Name
                  </span>
                  {renderSortIcon('name')}
                </div>
              </th>

              {/* Kolom EMAIL */}
              <th className="py-3 px-5 whitespace-nowrap">
                <div
                  onClick={() => onSort?.('email')}
                  className="group inline-flex items-center gap-1 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'email' ? 'text-pr-900 font-bold' : ''}>
                    Email
                  </span>
                  {renderSortIcon('email')}
                </div>
              </th>

              {/* Kolom ROLE */}
              <th className="py-3 px-5 whitespace-nowrap">
                <div
                  onClick={() => onSort?.('role')}
                  className="group inline-flex items-center gap-1 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'role' ? 'text-pr-900 font-bold' : ''}>
                    Role
                  </span>
                  {renderSortIcon('role')}
                </div>
              </th>

              {/* Kolom STATUS */}
              <th className="py-3 px-5 whitespace-nowrap">
                <div
                  onClick={() => onSort?.('status')}
                  className="group inline-flex items-center gap-1 cursor-pointer hover:text-neu-900 transition-colors"
                >
                  <span className={sortColumn === 'status' ? 'text-pr-900 font-bold' : ''}>
                    Status
                  </span>
                  {renderSortIcon('status')}
                </div>
              </th>

              {/* Kolom AKSI */}
              <th className="py-3 px-5 text-right whitespace-nowrap">
                <span>Aksi</span>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-neu-50 text-[12px] text-neu-800">
            {members.map((member, index) => {
              const isActionOpen = activeActionId === member.id;
              const isNearBottom = index >= members.length - 2 && members.length >= 3;

              // Rule khusus: Hapus hanya bisa bila status bukan aktif (non_aktif, pending, expired)
              const canDelete = member.status !== 'aktif';

              // Untuk status Pending, desain memperlihatkan ikon sampah merah langsung
              const isDirectDelete = member.status === 'pending';

              return (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Kolom 1: Avatar & Nama */}
                  <td className="py-3.5 px-5 font-normal text-neu-900 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-neu-100 overflow-hidden bg-cover bg-center bg-no-repeat bg-neu-100 shrink-0 shadow-2xs">
                        <img
                          src={member.avatar || profileAvatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-neu-900 text-[13px]">
                        {member.name}
                      </span>
                    </div>
                  </td>

                  {/* Kolom 2: Email */}
                  <td className="py-3.5 px-5 font-normal text-neu-600 whitespace-nowrap text-[13px]">
                    {member.email}
                  </td>

                  {/* Kolom 3: Role */}
                  <td className="py-3.5 px-5 font-normal text-neu-600 whitespace-nowrap text-[13px]">
                    {member.role}
                  </td>

                  {/* Kolom 4: Status Badge */}
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    {getStatusBadge(member.status)}
                  </td>

                  {/* Kolom 5: Aksi */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap relative">
                    {isDirectDelete ? (
                      /* Tombol Hapus Langsung untuk status Pending */
                      <button
                        type="button"
                        onClick={() => onDelete?.(member)}
                        className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus undangan"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.75]" />
                      </button>
                    ) : (
                      /* Tombol Menu Titik Tiga untuk Expired, Aktif, & Non Aktif */
                      <div className="inline-block relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveActionId(isActionOpen ? null : member.id)
                          }
                          className="inline-flex items-center justify-center p-1.5 rounded-lg text-neu-500 hover:text-neu-900 hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Menu aksi"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Popover Aksi Sesuai Gambar 3 & 4 */}
                        {isActionOpen && (
                          <div
                            ref={actionMenuRef}
                            className={`absolute right-0 ${
                              isNearBottom ? 'bottom-8' : 'top-8'
                            } z-40 w-36 bg-white rounded-xl shadow-xl border border-neu-100 py-1.5 text-left animate-in fade-in zoom-in-95 duration-150`}
                          >
                            <div className="px-3.5 py-1 text-[11px] font-semibold text-neu-400 uppercase tracking-wider">
                              Aksi
                            </div>

                            {member.status === 'expired' ? (
                              /* Aksi khusus Expired: Undang Kembali & Hapus */
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveActionId(null);
                                    onResendInvite?.(member);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-neu-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <RotateCcw className="w-3.5 h-3.5 text-neu-500" />
                                  <span>{TEAM_ACTIONS.resendInvite}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveActionId(null);
                                    onDelete?.(member);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                  <span>{TEAM_ACTIONS.delete}</span>
                                </button>
                              </>
                            ) : (
                              /* Aksi Aktif & Non Aktif: Lihat, Edit, dan Hapus (bila non-aktif) */
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveActionId(null);
                                    onView?.(member);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-neu-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-neu-500" />
                                  <span>{TEAM_ACTIONS.view}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveActionId(null);
                                    onEdit?.(member);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-neu-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-neu-500" />
                                  <span>{TEAM_ACTIONS.edit}</span>
                                </button>

                                {/* Tombol Hapus: DISABLED jika status Aktif, AKTIF jika Non Aktif sesuai instruksi */}
                                {canDelete ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveActionId(null);
                                      onDelete?.(member);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                    <span>{TEAM_ACTIONS.delete}</span>
                                  </button>
                                ) : (
                                  <div
                                    className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] text-neu-400 opacity-40 cursor-not-allowed select-none"
                                    title="Hanya tim non aktif yang dapat dihapus"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-neu-400" />
                                    <span>{TEAM_ACTIONS.delete}</span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
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

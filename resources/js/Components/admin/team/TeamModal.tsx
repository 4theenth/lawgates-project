import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { X, UserPlus, UserCog, User, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { TeamMember, TeamMemberRole, TeamMemberStatus, TEAM_ROLES } from '@/constants/team';

export type TeamModalMode = 'create' | 'edit' | 'view';

interface TeamModalProps {
  show: boolean;
  onClose: () => void;
  onSave?: (data: {
    id?: string;
    name: string;
    email: string;
    role: TeamMemberRole;
    status: TeamMemberStatus;
  }) => void;
  memberData?: TeamMember | null;
  mode?: TeamModalMode;
  isLoading?: boolean;
}

export function TeamModal({
  show,
  onClose,
  onSave,
  memberData,
  mode = 'create',
  isLoading = false,
}: TeamModalProps) {
  const isViewOnly = mode === 'view';
  const isEditing = mode === 'edit';
  const isCreating = mode === 'create';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMemberRole>('Admin');
  const [status, setStatus] = useState<TeamMemberStatus>('aktif');

  // Dropdown states
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    }

    if (isRoleOpen || isStatusOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isRoleOpen, isStatusOpen]);

  // Populate data when opening modal
  useEffect(() => {
    if (memberData) {
      setName(memberData.name || '');
      setEmail(memberData.email || '');
      setRole(memberData.role || 'Admin');
      setStatus(memberData.status || 'aktif');
    } else {
      setName('');
      setEmail('');
      setRole('Admin');
      setStatus('aktif');
    }
    setIsRoleOpen(false);
    setIsStatusOpen(false);
  }, [memberData, show, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewOnly) return;
    if (!name.trim() || !email.trim()) return;

    onSave?.({
      id: memberData?.id,
      name: name.trim(),
      email: email.trim(),
      role,
      status,
    });
  };

  return (
    <Transition show={show}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop Overlay */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 transition-opacity"
            style={{ backgroundColor: 'rgba(55, 55, 55, 0.60)' }}
            aria-hidden="true"
          />
        </TransitionChild>

        {/* Slide-Over Drawer Container (Sisi Kanan) Sesuai Gambar 1 - 4 */}
        <div className="fixed inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-full sm:max-w-[460px] md:max-w-[490px] h-full bg-white shadow-2xl flex flex-col justify-between">
                  <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    {/* Header Drawer */}
                    <div className="px-6 py-5 border-b border-neu-100 flex items-center justify-between shrink-0 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-neu-50 border border-neu-100 flex items-center justify-center shrink-0">
                          {isViewOnly ? (
                            <User className="w-5 h-5 text-neu-600 stroke-[1.5]" />
                          ) : isEditing ? (
                            <UserCog className="w-5 h-5 text-neu-600 stroke-[1.5]" />
                          ) : (
                            <UserPlus className="w-5 h-5 text-neu-600 stroke-[1.5]" />
                          )}
                        </div>
                        <div>
                          <h2 className="text-[16px] font-bold text-neu-900 leading-tight">
                            {isViewOnly ? 'Data Tim' : isEditing ? 'Edit Tim' : 'Tambah Tim'}
                          </h2>
                          <p className="text-[12px] text-neu-500 mt-0.5 leading-normal">
                            {isViewOnly
                              ? 'Data anggota tim'
                              : isEditing
                              ? 'Edit anggota tim'
                              : 'Tambah tim baru'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-neu-400 hover:text-neu-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0 ml-2"
                        title="Tutup"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form Fields Body */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-white">
                      {/* Field 1: Nama */}
                      <div>
                        <label className="block text-[13px] font-medium text-neu-800 mb-1.5">
                          Nama <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required={!isViewOnly}
                          disabled={isViewOnly}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Masukkan nama tim"
                          className={`w-full px-3.5 py-2.5 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 placeholder-neu-400 focus:outline-none transition-all shadow-2xs ${
                            isViewOnly
                              ? 'cursor-default'
                              : 'focus:border-pr-900 focus:ring-1 focus:ring-pr-900'
                          }`}
                        />
                      </div>

                      {/* Field 2: Email */}
                      <div>
                        <label className="block text-[13px] font-medium text-neu-800 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required={!isViewOnly}
                          disabled={isViewOnly}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Masukkan email tim"
                          className={`w-full px-3.5 py-2.5 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 placeholder-neu-400 focus:outline-none transition-all shadow-2xs ${
                            isViewOnly
                              ? 'cursor-default'
                              : 'focus:border-pr-900 focus:ring-1 focus:ring-pr-900'
                          }`}
                        />
                      </div>

                      {/* Field 3: Role */}
                      <div className="relative" ref={roleRef}>
                        <label className="block text-[13px] font-medium text-neu-800 mb-1.5">
                          Role <span className="text-red-500">*</span>
                        </label>
                        {isViewOnly ? (
                          <div className="w-full px-3.5 py-2.5 text-[13px] rounded-[10px] border border-neu-200 bg-white text-neu-900 shadow-2xs cursor-default">
                            {role}
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setIsRoleOpen(!isRoleOpen);
                                setIsStatusOpen(false);
                              }}
                              className="w-full px-3.5 py-2.5 text-[13px] rounded-[10px] border border-neu-200 bg-white flex items-center justify-between text-neu-900 hover:border-neu-300 transition-colors shadow-2xs cursor-pointer text-left"
                            >
                              <span>{role}</span>
                              {isRoleOpen ? (
                                <ChevronUp className="w-4 h-4 text-neu-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-neu-500" />
                              )}
                            </button>

                            {/* Menu Pilihan Role */}
                            {isRoleOpen && (
                              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-[10px] border border-neu-200 shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                                {TEAM_ROLES.map((r) => (
                                  <button
                                    key={r}
                                    type="button"
                                    onClick={() => {
                                      setRole(r);
                                      setIsRoleOpen(false);
                                    }}
                                    className={`w-full text-left px-3.5 py-2 text-[13px] transition-colors cursor-pointer ${
                                      r === role
                                        ? 'bg-gray-50 text-neu-900 font-medium'
                                        : 'text-neu-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    {r}
                                  </button>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Field 4: Status (Tampil saat Edit Tim & Data Tim View) */}
                      {(isEditing || isViewOnly) && (
                        <div className="relative" ref={statusRef}>
                          <label className="block text-[13px] font-medium text-neu-800 mb-1.5">
                            Status
                          </label>
                          {isViewOnly ? (
                            <div className="w-full px-3.5 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white shadow-2xs cursor-default">
                              {status === 'aktif' ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-suc-50 text-suc-900 border border-suc-200">
                                  Aktif
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-dan-50 text-dan-900 border border-dan-200">
                                  Non Aktif
                                </span>
                              )}
                            </div>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsStatusOpen(!isStatusOpen);
                                  setIsRoleOpen(false);
                                }}
                                className="w-full px-3.5 py-2 text-[13px] rounded-[10px] border border-neu-200 bg-white flex items-center justify-between text-neu-900 hover:border-neu-300 transition-colors shadow-2xs cursor-pointer text-left"
                              >
                                <div>
                                  {status === 'aktif' ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-suc-50 text-suc-900 border border-suc-200">
                                      Aktif
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-dan-50 text-dan-900 border border-dan-200">
                                      Non Aktif
                                    </span>
                                  )}
                                </div>
                                {isStatusOpen ? (
                                  <ChevronUp className="w-4 h-4 text-neu-500" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-neu-500" />
                                )}
                              </button>

                              {/* Menu Pilihan Status dengan badge pill */}
                              {isStatusOpen && (
                                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-[10px] border border-neu-200 shadow-xl p-2 z-30 space-y-1 animate-in fade-in zoom-in-95 duration-100">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStatus('aktif');
                                      setIsStatusOpen(false);
                                    }}
                                    className="w-full text-left p-1.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                                  >
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-suc-50 text-suc-900 border border-suc-200">
                                      Aktif
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStatus('non_aktif');
                                      setIsStatusOpen(false);
                                    }}
                                    className="w-full text-left p-1.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                                  >
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-dan-50 text-dan-900 border border-dan-200">
                                      Non Aktif
                                    </span>
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Drawer: Hanya tampil saat Tambah Tim & Edit Tim (Sesuai Gambar 1 & Gambar 2) */}
                    {!isViewOnly && (
                      <div className="px-6 py-4 border-t border-neu-100 flex items-center justify-end gap-3 bg-white shrink-0">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-5 py-2 text-[13px] font-medium text-neu-800 bg-white border border-neu-200 hover:bg-neu-50 rounded-[10px] transition-colors cursor-pointer shadow-2xs"
                        >
                          Batal
                        </button>

                        {isEditing ? (
                          /* Tombol Simpan untuk Edit Tim (Sesuai Gambar 1) */
                          <button
                            type="submit"
                            disabled={isLoading || !name.trim() || !email.trim()}
                            className="px-6 py-2 text-[13px] font-medium bg-[#1E293B] hover:bg-[#0F172A] text-white rounded-[10px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span>{isLoading ? 'Menyimpan...' : 'Simpan'}</span>
                          </button>
                        ) : (
                          /* Tombol Kirim Undangan untuk Tambah Tim */
                          <button
                            type="submit"
                            disabled={isLoading || !name.trim() || !email.trim()}
                            className="inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium bg-[#1E293B] hover:bg-[#0F172A] text-white rounded-[10px] transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="w-3.5 h-3.5 -rotate-12" />
                            <span>{isLoading ? 'Menyimpan...' : 'Kirim Undangan'}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

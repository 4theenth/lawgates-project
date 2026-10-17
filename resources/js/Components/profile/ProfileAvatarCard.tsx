import React, { useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { Calendar, Mail, Camera, Trash2, Loader2 } from 'lucide-react';
import { User } from '@/types';
import { useToast } from '@/hooks/useToast';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import profileAvatar from '@/assets/profile-avatar.webp';
import adminAvatar from '@/assets/admin-avatar.png';

interface ProfileAvatarCardProps {
  user: User;
  className?: string;
  defaultAvatar?: string;
}

function formatJoinDate(dateStr?: string): string {
  if (!dateStr) return '17 Agustus 2020';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return '17 Agustus 2020';
  }
}

function formatUpdatedDate(dateStr?: string): string {
  if (!dateStr) {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  }
  try {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '17/08/2026';
  }
}

export function ProfileAvatarCard({
  user,
  className = '',
  defaultAvatar,
}: ProfileAvatarCardProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [showDeleteAvatarModal, setShowDeleteAvatarModal] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
      toast.error('Format foto harus berupa JPG, PNG, atau WEBP.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran foto profil maksimal 2MB.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setIsUploadingAvatar(true);
    router.post(route('profile.avatar.update'), formData, {
      preserveScroll: true,
      onSuccess: () => {
        setIsUploadingAvatar(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
      onError: () => {
        setIsUploadingAvatar(false);
        toast.error('Gagal mengunggah foto profil.');
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
    });
  };

  const handleConfirmDeleteAvatar = () => {
    if (!user.avatar) {
      setShowDeleteAvatarModal(false);
      return;
    }

    setIsDeletingAvatar(true);
    router.delete(route('profile.avatar.delete'), {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeletingAvatar(false);
        setShowDeleteAvatarModal(false);
      },
      onError: () => {
        setIsDeletingAvatar(false);
        toast.error('Gagal menghapus foto profil.');
      },
    });
  };

  const fallbackAvatar =
    defaultAvatar ||
    (user.role === 'admin' || user.role === 'superadmin' ? adminAvatar : profileAvatar);
  const displayAvatar = user.avatar || fallbackAvatar;
  const displayName =
    user.name && user.name.toLowerCase() !== 'superadmin'
      ? user.name
      : user.username?.toLowerCase() === 'superadmin'
        ? 'Super Admin'
        : (user.username || 'User LawGates');

  const displayRole = user.role === 'superadmin' ? 'super admin' : (user.role || 'user');
  const isEmailVerified = Boolean(user.email_verified_at);

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept="image/jpeg,image/png,image/jpg,image/webp"
        className="hidden"
      />

      <div
        className={`w-full md:w-[480px] lg:w-[500px] xl:w-[520px] min-h-[307px] bg-white border border-neu-50 rounded-[12px] p-5 lg:p-6 shadow-2xs shrink-0 flex flex-col justify-between ${className}`}
      >
        {/* Bagian Atas: Avatar + User Info (Node #2406:41356) */}
        <div className="flex items-start gap-[16px] pb-[40px] border-b border-neu-50">
          {/* Group Avatar 80x80px (#2403:41324) */}
          <div className="relative w-20 h-20 shrink-0">
            <div className="w-20 h-20 rounded-full border border-neu-50 overflow-hidden bg-white flex items-center justify-center">
              {isUploadingAvatar ? (
                <Loader2 className="w-6 h-6 text-pr-900 animate-spin" />
              ) : (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Tombol Kamera di Bawah Kanan Avatar 28x28px (#2403:41323) */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white border border-neu-50 flex items-center justify-center text-neu-700 hover:text-pr-900 hover:bg-neu-50 transition-colors cursor-pointer"
              title="Pilih Foto Baru"
            >
              <Camera className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Data User Info (#2406:41355 & #2415:41558) */}
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            {/* Nama: 18px Medium (#2403:41325 & #2415:41560) */}
            <h2 className="font-sans text-[18px] font-medium leading-[28px] text-neu-900 tracking-tight truncate">
              {displayName}
            </h2>

            {/* Badge Role & Bergabung Sejak (#2406:41335 & #2415:41562) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-[13px] mt-1">
              {/* Badge Role (#2406:41330 & #2415:41563) */}
              <span className="inline-flex items-center px-3 py-1 rounded-[12px] bg-pr-50 text-pr-900 font-sans text-[12px] font-normal leading-[18px] whitespace-nowrap shrink-0">
                {displayRole}
              </span>

              {/* Tanggal Bergabung (#2406:41334 & #2415:41565) */}
              <div className="flex items-center gap-1 font-sans text-[12px] font-normal leading-[18px] text-neu-600 whitespace-nowrap shrink-0">
                <Calendar className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[1.5]" />
                <span>
                  Bergabung sejak {formatJoinDate(user.created_at)}
                </span>
              </div>
            </div>

            {/* Tombol Ubah Foto Profile & Hapus (#2406:41354 & #2415:41568) */}
            <div className="flex items-center gap-3 mt-3.5">
              {/* Tombol Ubah Foto Profile (#2406:41337 & #2415:41569) */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-[8px] bg-white border border-neu-100 hover:bg-neu-50 text-neu-900 font-sans text-[12px] font-medium leading-[16px] transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                {isUploadingAvatar ? 'Mengunggah...' : 'Ubah Foto Profile'}
              </button>

              {/* Tombol Hapus Foto (#2406:41348 & #2415:41570) */}
              <button
                type="button"
                onClick={() => setShowDeleteAvatarModal(true)}
                disabled={isUploadingAvatar}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-[8px] bg-dan-900 hover:bg-dan-800 text-white font-sans text-[12px] font-medium leading-[16px] transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                <Trash2 className="w-3 h-3 text-white stroke-[2]" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bagian Bawah: Box Info Terakhir Diperbarui & Verifikasi Email */}
        <div className="pt-4 space-y-2">
          {/* Terakhir Diperbarui */}
          <div className="h-10 px-3 rounded-[10px] bg-white border border-neu-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-sans text-[12px] font-medium leading-[18px] text-neu-900">
              <Calendar className="w-[18px] h-[18px] text-sec-900 shrink-0 stroke-[1.5]" />
              <span>Terakhir Diperbarui</span>
            </div>
            <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-700">
              {formatUpdatedDate(user.updated_at)}
            </span>
          </div>

          {/* Verifikasi Email */}
          <div className="h-10 px-3 rounded-[10px] bg-white border border-neu-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-sans text-[12px] font-medium leading-[18px] text-neu-900">
              <Mail className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[1.5]" />
              <span>Verifikasi Email</span>
            </div>
            <span
              className={`font-sans text-[12px] font-medium leading-[18px] ${
                isEmailVerified ? 'text-suc-900' : 'text-dan-900'
              }`}
            >
              {isEmailVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus Foto Profile */}
      <DeleteConfirmModal
        show={showDeleteAvatarModal}
        onClose={() => setShowDeleteAvatarModal(false)}
        onConfirm={handleConfirmDeleteAvatar}
        title="Hapus Foto Profile?"
        itemName="Foto profil akun Anda akan dihapus dan dikembalikan ke avatar default."
        confirmText="Hapus Foto"
        isLoading={isDeletingAvatar}
      />
    </>
  );
}

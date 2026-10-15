import React, { useState, useRef, FormEventHandler } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
import { DeleteConfirmModal } from '@/Components/admin/DeleteConfirmModal';
import { useToast } from '@/hooks/useToast';
import profileAvatar from '@/assets/profile-avatar.webp';
import { PageProps } from '@/types';
import {
  Calendar,
  Mail,
  Camera,
  Trash2,
  Save,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  Check,
  X,
} from 'lucide-react';

interface ProfileProps extends PageProps {
  mustVerifyEmail?: boolean;
  status?: string;
}

// ─────────────────────────────────────────────
// Formatters
// ─────────────────────────────────────────────

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

export default function AdminProfile({
  mustVerifyEmail: _mustVerifyEmail,
  status: _status,
}: ProfileProps) {
  const { auth } = usePage<ProfileProps>().props;
  const user = auth.user;
  const { toast } = useToast();

  // Tab State: default ke 'info' (Informasi Pribadi) sesuai instruksi user
  const [activeTab, setActiveTab] = useState<'info' | 'password'>('info');

  // Avatar Upload & Delete State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [showDeleteAvatarModal, setShowDeleteAvatarModal] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ─────────────────────────────────────────────
  // Form 1: Informasi Pribadi (Node #2406:41357)
  // ─────────────────────────────────────────────
  const {
    data: infoData,
    setData: setInfoData,
    patch: patchInfo,
    processing: infoProcessing,
    errors: infoErrors,
    clearErrors: clearInfoErrors,
  } = useForm({
    name: user.name || user.username || 'superadmin',
    email: user.email || 'superadmiin@gmail.com',
    phone: user.phone || '081262534',
  });

  const handleInfoSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    patchInfo(route('profile.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Informasi profil berhasil diperbarui');
      },
      onError: () => {
        toast.error('Gagal memperbarui profil. Silakan periksa formulir.');
      },
    });
  };

  // ─────────────────────────────────────────────
  // Form 2: Reset Password (Node #2415:41543)
  // ─────────────────────────────────────────────
  const {
    data: passwordData,
    setData: setPasswordData,
    put: putPassword,
    processing: passwordProcessing,
    errors: passwordErrors,
    reset: resetPassword,
    setError: setPasswordError,
    clearErrors: clearPasswordErrors,
  } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  // Validasi Ketentuan Kata Sandi
  const hasCapital = /[A-Z]/.test(passwordData.password);
  const hasMinLength = passwordData.password.length >= 8;
  const hasNumberOrSymbol =
    /[0-9]/.test(passwordData.password) || /[^a-zA-Z0-9]/.test(passwordData.password);

  const handlePasswordSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    let hasClientError = false;
    if (!passwordData.current_password) {
      setPasswordError('current_password', 'Password saat ini wajib diisi.');
      hasClientError = true;
    }
    if (!passwordData.password) {
      setPasswordError('password', 'Password baru wajib diisi.');
      hasClientError = true;
    } else if (!hasMinLength || !hasCapital || !hasNumberOrSymbol) {
      setPasswordError('password', 'Password belum memenuhi ketentuan kata sandi.');
      hasClientError = true;
    }
    if (!passwordData.password_confirmation) {
      setPasswordError('password_confirmation', 'Konfirmasi password wajib diisi.');
      hasClientError = true;
    } else if (passwordData.password !== passwordData.password_confirmation) {
      setPasswordError('password_confirmation', 'Konfirmasi password tidak cocok.');
      hasClientError = true;
    }

    if (hasClientError) return;

    putPassword(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        resetPassword();
        clearPasswordErrors();
        toast.success('Kata sandi berhasil diperbarui');
      },
      onError: (errs) => {
        if (errs.current_password) {
          setPasswordError('current_password', 'Password saat ini tidak cocok.');
        }
        toast.error('Gagal memperbarui kata sandi.');
      },
    });
  };

  // ─────────────────────────────────────────────
  // Avatar Handlers
  // ─────────────────────────────────────────────
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
        toast.success('Foto profil berhasil diperbarui');
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
      toast.success('Foto profil berhasil direset');
      return;
    }

    setIsDeletingAvatar(true);
    router.delete(route('profile.avatar.delete'), {
      preserveScroll: true,
      onSuccess: () => {
        setIsDeletingAvatar(false);
        setShowDeleteAvatarModal(false);
        toast.success('Foto profil berhasil dihapus');
      },
      onError: () => {
        setIsDeletingAvatar(false);
        toast.error('Gagal menghapus foto profil.');
      },
    });
  };

  const displayAvatar = user.avatar || profileAvatar;
  const displayName =
    user.name && user.name.toLowerCase() !== 'superadmin'
      ? user.name
      : user.username?.toLowerCase() === 'superadmin'
        ? 'Super Admin'
        : (user.username || 'Super Admin');
  const displayRole = user.role === 'superadmin' ? 'super admin' : (user.role || 'super admin');
  const isEmailVerified = Boolean(user.email_verified_at);

  return (
    <AdminLayout>
      <Head title="Profile Saya - Admin LawGates" />

      {/* Hidden file input untuk ubah foto profile */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept="image/jpeg,image/png,image/jpg,image/webp"
        className="hidden"
      />

      {/* 1. Breadcrumb Navigasi Sesuai Standar Panel Admin */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: route('admin.dashboard') },
            { label: 'Edit Profile' },
          ]}
        />
      </div>

      {/* 2. Page Header Menggunakan Reusable Component AdminPageHeader */}
      <AdminPageHeader
        title="Profile Saya"
        description="Kelola informasi akun anda"
      />

      {/* 3. Container 2 Card Sejajar Desktop */}
      <div className="flex flex-col md:flex-row items-start gap-5 lg:gap-6 w-full max-w-[1240px]">
          {/* ──────────────────────────────────────────────────────────
              KIRI: Profile Summary Card (Figma Node #2400:41314)
              Lebar diperbesar agar badge role & tanggal bergabung sebaris tanpa terpotong
              ────────────────────────────────────────────────────────── */}
          <div className="w-full md:w-[480px] lg:w-[500px] xl:w-[520px] min-h-[307px] bg-white border border-neu-50 rounded-[12px] p-5 lg:p-6 shadow-2xs shrink-0 flex flex-col justify-between">
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

            {/* Bagian Bawah: Box Info (Node #2415:41486: gap 8px) */}
            <div className="pt-4 space-y-2">
              {/* Row 1: Terakhir Diperbarui (#2406:41434 & #2415:41572 - height 40px, rounded 10px, border Neutral/50) */}
              <div className="h-10 px-3 rounded-[10px] bg-white border border-neu-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-sans text-[12px] font-medium leading-[18px] text-neu-900">
                  <Calendar className="w-[18px] h-[18px] text-sec-900 shrink-0 stroke-[1.5]" />
                  <span>Terakhir Diperbarui</span>
                </div>
                <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-700">
                  {formatUpdatedDate(user.updated_at)}
                </span>
              </div>

              {/* Row 2: Verifikasi Email (#2415:41478 & #2415:41578 - height 40px, rounded 10px, border Neutral/50) */}
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

          {/* ──────────────────────────────────────────────────────────
              KANAN: Tab Forms Card (Figma Node #2406:41357 & #2415:41584)
              Dimensions: 681px x 307px
              ────────────────────────────────────────────────────────── */}
          <div className="w-full md:flex-1 md:max-w-[681px] min-w-0 min-h-[307px] bg-white border border-neu-50 rounded-[12px] p-5 lg:p-6 shadow-2xs flex flex-col justify-between">
            {/* Tab Navigation Header (Node #2415:41542 & #2415:41585) */}
            <div className="border-b border-neu-50 mb-4">
              <div className="flex items-center gap-6">
                {/* Tab 1: Informasi Pribadi (#2406:41386 & #2415:41587) */}
                <button
                  type="button"
                  onClick={() => setActiveTab('info')}
                  className={`w-[114px] text-left transition-colors relative pb-3 cursor-pointer font-sans text-[14px] leading-[20px] ${
                    activeTab === 'info'
                      ? 'font-medium text-neu-900'
                      : 'font-normal text-neu-600 hover:text-neu-900'
                  }`}
                >
                  Informasi Pribadi
                  {activeTab === 'info' && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-pr-900 rounded-full" />
                  )}
                </button>

                {/* Tab 2: Reset Password (#2415:41536 & #2415:41588) */}
                <button
                  type="button"
                  onClick={() => setActiveTab('password')}
                  className={`w-[114px] text-left transition-colors relative pb-3 cursor-pointer font-sans text-[14px] leading-[20px] ${
                    activeTab === 'password'
                      ? 'font-medium text-neu-900'
                      : 'font-normal text-neu-600 hover:text-neu-900'
                  }`}
                >
                  Reset Password
                  {activeTab === 'password' && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-pr-900 rounded-full" />
                  )}
                </button>
              </div>
            </div>

            {/* TAB 1: INFORMASI PRIBADI (Figma Node #2406:41357) */}
            {activeTab === 'info' && (
              <form onSubmit={handleInfoSubmit} className="space-y-4">
                {/* Row 1: Nama & Email (#2415:41497: width 631px, gap 13px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
                  {/* Field 1: Nama * (#2415:41493 - width 309px) */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      Nama <span className="text-dan-900 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={infoData.name}
                      onChange={(e) => {
                        setInfoData('name', e.target.value);
                        if (infoErrors.name) clearInfoErrors('name');
                      }}
                      placeholder="superadmin"
                      className={`w-full h-10 px-4 py-2.5 rounded-[10px] bg-white border ${
                        infoErrors.name
                          ? 'border-dan-900 focus:border-dan-900'
                          : 'border-neu-100 focus:border-pr-900'
                      } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                        infoErrors.name ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
                      } transition-all`}
                    />
                    {infoErrors.name && (
                      <p className="text-[11px] text-dan-900 -mt-1">{infoErrors.name}</p>
                    )}
                  </div>

                  {/* Field 2: Email (#2429:53226 - width 309px) */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={infoData.email}
                      onChange={(e) => {
                        setInfoData('email', e.target.value);
                        if (infoErrors.email) clearInfoErrors('email');
                      }}
                      placeholder="superadmiin@gmail.com"
                      className={`w-full h-10 px-4 py-2.5 rounded-[10px] bg-white border ${
                        infoErrors.email
                          ? 'border-dan-900 focus:border-dan-900'
                          : 'border-neu-100 focus:border-pr-900'
                      } font-sans text-[12px] font-normal leading-[18px] text-neu-600 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                        infoErrors.email ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
                      } transition-all`}
                    />
                    {infoErrors.email && (
                      <p className="text-[11px] text-dan-900 -mt-1">{infoErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Role & No Hp / WhatsApp (#2415:41498: gap 13px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
                  {/* Field 3: Role (#2429:53231 - width 309px) */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      Role
                    </label>
                    <div className="w-full h-10 px-3 rounded-[10px] bg-white border border-neu-100 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-[10px] bg-pr-50 text-pr-900 font-sans text-[12px] font-normal leading-[18px] whitespace-nowrap">
                        {displayRole}
                      </span>
                    </div>
                  </div>

                  {/* Field 4: No Hp / WhatsApp * (#2415:41503 - width 309px) */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      No Hp / WhatsApp <span className="text-dan-900 font-semibold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={infoData.phone}
                      onChange={(e) => {
                        setInfoData('phone', e.target.value);
                        if (infoErrors.phone) clearInfoErrors('phone');
                      }}
                      placeholder="081262534"
                      className={`w-full h-10 px-4 py-2.5 rounded-[10px] bg-white border ${
                        infoErrors.phone
                          ? 'border-dan-900 focus:border-dan-900'
                          : 'border-neu-100 focus:border-pr-900'
                      } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                        infoErrors.phone ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
                      } transition-all`}
                    />
                    {infoErrors.phone && (
                      <p className="text-[11px] text-dan-900 -mt-1">{infoErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Tombol Simpan Perubahan (#2415:41512 & #2415:41521) */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={infoProcessing}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-[#FAFAFA] font-sans text-[14px] font-medium leading-[20px] transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {infoProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#FAFAFA]" />
                    ) : (
                      <Save className="w-4 h-4 text-[#FAFAFA] stroke-[2]" />
                    )}
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: RESET PASSWORD (Figma Node #2415:41543) */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {/* Row 1: Password Saat Ini & Password Baru (#2415:41595: gap 13px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
                  {/* Field 1: Password Saat Ini * (#2415:41596 - width 309px) */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      Password Saat Ini <span className="text-dan-900 font-semibold">*</span>
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        required
                        value={passwordData.current_password}
                        onChange={(e) => {
                          setPasswordData('current_password', e.target.value);
                          if (passwordErrors.current_password)
                            clearPasswordErrors('current_password');
                        }}
                        placeholder="Masukan password saat ini"
                        className={`w-full h-10 pl-4 pr-10 py-2.5 rounded-[10px] bg-white border ${
                          passwordErrors.current_password
                            ? 'border-dan-900 focus:border-dan-900'
                            : 'border-neu-100 focus:border-pr-900'
                        } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                          passwordErrors.current_password
                            ? 'focus:ring-dan-900'
                            : 'focus:ring-pr-900'
                        } transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neu-600 hover:text-neu-900 cursor-pointer"
                        title={showCurrentPassword ? 'Sembunyikan' : 'Tampilkan'}
                      >
                        {showCurrentPassword ? (
                          <Eye className="w-[18px] h-[18px] stroke-[1.5]" />
                        ) : (
                          <EyeOff className="w-[18px] h-[18px] stroke-[1.5]" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.current_password && (
                      <p className="text-[11px] text-dan-900 -mt-1">
                        {passwordErrors.current_password}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Password Baru * (#2415:41600 - width 309px) */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      Password Baru <span className="text-dan-900 font-semibold">*</span>
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={passwordData.password}
                        onChange={(e) => {
                          setPasswordData('password', e.target.value);
                          if (passwordErrors.password) clearPasswordErrors('password');
                        }}
                        placeholder="Masukan password baru"
                        className={`w-full h-10 pl-4 pr-10 py-2.5 rounded-[10px] bg-white border ${
                          passwordErrors.password
                            ? 'border-dan-900 focus:border-dan-900'
                            : 'border-neu-100 focus:border-pr-900'
                        } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                          passwordErrors.password ? 'focus:ring-dan-900' : 'focus:ring-pr-900'
                        } transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neu-600 hover:text-neu-900 cursor-pointer"
                        title={showNewPassword ? 'Sembunyikan' : 'Tampilkan'}
                      >
                        {showNewPassword ? (
                          <Eye className="w-[18px] h-[18px] stroke-[1.5]" />
                        ) : (
                          <EyeOff className="w-[18px] h-[18px] stroke-[1.5]" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.password && (
                      <p className="text-[11px] text-dan-900 -mt-1">{passwordErrors.password}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Konfirmasi Password * (#2415:41604: width 309px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[13px] w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      Konfirmasi Password <span className="text-dan-900 font-semibold">*</span>
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={passwordData.password_confirmation}
                        onChange={(e) => {
                          setPasswordData('password_confirmation', e.target.value);
                          if (passwordErrors.password_confirmation)
                            clearPasswordErrors('password_confirmation');
                        }}
                        placeholder="Konfirmasi password"
                        className={`w-full h-10 pl-4 pr-10 py-2.5 rounded-[10px] bg-white border ${
                          passwordErrors.password_confirmation
                            ? 'border-dan-900 focus:border-dan-900'
                            : 'border-neu-100 focus:border-pr-900'
                        } font-sans text-[12px] font-normal leading-[18px] text-neu-900 placeholder:text-neu-600 focus:outline-none focus:ring-1 ${
                          passwordErrors.password_confirmation
                            ? 'focus:ring-dan-900'
                            : 'focus:ring-pr-900'
                        } transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neu-600 hover:text-neu-900 cursor-pointer"
                        title={showConfirmPassword ? 'Sembunyikan' : 'Tampilkan'}
                      >
                        {showConfirmPassword ? (
                          <Eye className="w-[18px] h-[18px] stroke-[1.5]" />
                        ) : (
                          <EyeOff className="w-[18px] h-[18px] stroke-[1.5]" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.password_confirmation && (
                      <p className="text-[11px] text-dan-900 -mt-1">
                        {passwordErrors.password_confirmation}
                      </p>
                    )}
                  </div>
                  {/* Kolom kosong agar lebar kolom Konfirmasi Password tetap 1:1 persis 309px dengan baris atasnya */}
                  <div className="hidden sm:block" />
                </div>

                {/* Row 3: Ketentuan Kata Sandi (Kiri) & Tombol Simpan Kata Sandi (Kanan) (#2415:41613) */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
                  {/* Ketentuan Kata Sandi (Node #2415:41719 - width 220px) */}
                  <div className="w-full sm:w-[220px] flex flex-col gap-1">
                    <p className="font-sans text-[12px] font-normal leading-[18px] text-neu-900">
                      Ketentuan Kata Sandi:
                    </p>
                    <div className="flex flex-col gap-1">
                      {/* 1. Menggunakan huruf Kapital (#2415:41724) */}
                      <div className="flex items-center gap-2">
                        {hasCapital ? (
                          <Check className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[2]" />
                        ) : (
                          <X className="w-[18px] h-[18px] text-neu-500 shrink-0 stroke-[1.75]" />
                        )}
                        <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-600">
                          Menggunakan huruf Kapital
                        </span>
                      </div>

                      {/* 2. Minimal 8 karakter (#2415:41727) */}
                      <div className="flex items-center gap-2">
                        {hasMinLength ? (
                          <Check className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[2]" />
                        ) : (
                          <X className="w-[18px] h-[18px] text-neu-500 shrink-0 stroke-[1.75]" />
                        )}
                        <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-600">
                          Minimal 8 karakter
                        </span>
                      </div>

                      {/* 3. Menggunakana angka atau simbol (#2415:41730) */}
                      <div className="flex items-center gap-2">
                        {hasNumberOrSymbol ? (
                          <Check className="w-[18px] h-[18px] text-suc-900 shrink-0 stroke-[2]" />
                        ) : (
                          <X className="w-[18px] h-[18px] text-neu-500 shrink-0 stroke-[1.75]" />
                        )}
                        <span className="font-sans text-[12px] font-normal leading-[18px] text-neu-600">
                          Menggunakana angka atau simbol
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Simpan Kata Sandi (#2415:41619) */}
                  <div>
                    <button
                      type="submit"
                      disabled={passwordProcessing}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] bg-pr-900 hover:bg-pr-800 text-[#FAFAFA] font-sans text-[14px] font-medium leading-[20px] transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {passwordProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#FAFAFA]" />
                      ) : (
                        <KeyRound className="w-4 h-4 text-[#FAFAFA] stroke-[2]" />
                      )}
                      <span>Simpan Kata Sandi</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
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
    </AdminLayout>
  );
}

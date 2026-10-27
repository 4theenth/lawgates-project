import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { UserDashboardLayout } from '@/Layouts/UserDashboardLayout';
import { PageProps } from '@/types';
import { PageHeader } from '@/Components/common/PageHeader';
import { ProfileAvatarCard, ProfileFormCard } from '@/Components/profile';

interface ProfileEditProps extends PageProps {
  mustVerifyEmail?: boolean;
  status?: string;
}

export default function ProfileEdit({
  mustVerifyEmail: _mustVerifyEmail,
  status: _status,
}: ProfileEditProps) {
  const { auth } = usePage<ProfileEditProps>().props;
  const user = auth.user;
  const isAdmin = ['admin', 'superadmin'].includes(user?.role || '');

  // Konten Form Profil (Avatar Card + Form Card Tab)
  const content = (
    <>
      <Head title="Pengaturan Akun - LawGates" />

      {/* Header Halaman Reusable */}
      <PageHeader
        title="Pengaturan Akun"
        description="Kelola informasi profil, email, dan kata sandi akun Anda"
        size="lg"
      />

      {/* Container 2 Card Form Profil Atas-Bawah (Avatar & Ringkasan di atas, Form di bawah) */}
      <div className="flex flex-col gap-5 lg:gap-6 w-full">
        {/* ATAS: Profile Summary Card (Avatar & Ringkasan Akun) */}
        <ProfileAvatarCard user={user} className="w-full" />

        {/* BAWAH: Tab Forms Card (Informasi Pribadi & Reset Password) */}
        <ProfileFormCard user={user} className="w-full" />
      </div>
    </>
  );

  // Jika akun admin, tampilkan dengan UserLayout sidebar admin
  if (isAdmin) {
    return (
      <UserLayout>
        <div className="w-full max-w-[1240px]">
          {content}
        </div>
      </UserLayout>
    );
  }

  // Jika akun pengguna reguler, tampilkan dengan UserDashboardLayout sesuai desain user
  return (
    <UserDashboardLayout
      activeMenu="pengaturan"
      breadcrumbs={[
        { label: 'Beranda', href: '/' },
        { label: 'Ringkasan', href: route('dashboard') },
        { label: 'Pengaturan Akun' },
      ]}
    >
      {content}
    </UserDashboardLayout>
  );
}

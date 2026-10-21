import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
import { ProfileAvatarCard, ProfileFormCard } from '@/Components/profile';
import { PageProps } from '@/types';

interface ProfileProps extends PageProps {
  mustVerifyEmail?: boolean;
  status?: string;
}

export default function AdminProfile({
  mustVerifyEmail: _mustVerifyEmail,
  status: _status,
}: ProfileProps) {
  const { auth } = usePage<ProfileProps>().props;
  const user = auth.user;

  return (
    <AdminLayout>
      <Head title="Profile Saya - Admin LawGates" />

      {/* 1. Breadcrumb Navigasi: Dashboard > Profile Setting */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: route('admin.dashboard') },
            { label: 'Profile Setting' },
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
        {/* KIRI: Profile Summary Card */}
        <ProfileAvatarCard user={user} />

        {/* KANAN: Tab Forms Card (Informasi Pribadi & Reset Password) */}
        <ProfileFormCard user={user} />
      </div>
    </AdminLayout>
  );
}

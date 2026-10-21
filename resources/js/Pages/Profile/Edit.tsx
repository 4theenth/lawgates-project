import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { PageProps } from '@/types';
import { Breadcrumb } from '@/Components/common/Breadcrumb';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
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

  return (
    <UserLayout>
      <Head title="Profile Saya - LawGates" />

      {/* 1. Breadcrumb Navigasi: Dashboard > Profile Setting */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: route('dashboard') },
            { label: 'Profile Setting' },
          ]}
        />
      </div>

      {/* 2. Page Header */}
      <AdminPageHeader
        title="Profile Saya"
        description="Kelola informasi akun anda"
      />

      {/* 3. Container 2 Card Sejajar Desktop (1:1 dengan Admin Profile) */}
      <div className="flex flex-col md:flex-row items-start gap-5 lg:gap-6 w-full max-w-[1240px]">
        {/* KIRI: Profile Summary Card */}
        <ProfileAvatarCard user={user} />

        {/* KANAN: Tab Forms Card (Informasi Pribadi & Reset Password) */}
        <ProfileFormCard user={user} />
      </div>
    </UserLayout>
  );
}

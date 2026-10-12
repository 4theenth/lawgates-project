import React from 'react';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
import { AdminPageHeader } from '@/Components/admin/AdminPageHeader';
import { Send } from 'lucide-react';
import { TEAM_PAGE_HEADER } from '@/constants/team';

interface TeamHeaderProps {
  breadcrumbs?: { label: string; href?: string }[];
  onInviteClick?: () => void;
}

const DEFAULT_BREADCRUMBS = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Tim' },
];

export function TeamHeader({
  breadcrumbs = DEFAULT_BREADCRUMBS,
  onInviteClick,
}: TeamHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* 1. Breadcrumbs */}
      <Breadcrumb items={breadcrumbs} />

      {/* 2. Page Title, Subtitle, & Action Button Menggunakan AdminPageHeader */}
      <AdminPageHeader
        title={TEAM_PAGE_HEADER.title}
        description={TEAM_PAGE_HEADER.description}
        className="mb-0"
        action={{
          label: TEAM_PAGE_HEADER.inviteButtonText,
          icon: <Send className="w-3.5 h-3.5 -rotate-12" />,
          onClick: onInviteClick,
        }}
      />
    </div>
  );
}

import React from 'react';
import { Breadcrumb } from '@/Components/admin/Breadcrumb';
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

      {/* 2. Page Title, Subtitle, & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
            {TEAM_PAGE_HEADER.title}
          </h1>
          <p className="font-sans text-[13px] sm:text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
            {TEAM_PAGE_HEADER.description}
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onInviteClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-[#1E293B] hover:bg-[#0F172A] text-white text-[13px] sm:text-[14px] font-medium transition-colors shadow-2xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 -rotate-12" />
            <span>{TEAM_PAGE_HEADER.inviteButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

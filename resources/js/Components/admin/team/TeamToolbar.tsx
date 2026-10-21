import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  TEAM_STATUS_TABS,
  TeamStatusTabId,
  TeamMemberRole,
  TEAM_TOOLBAR,
} from '@/constants/team';
import { TeamFilterPopover } from '@/Components/admin/team/TeamFilterPopover';
import { StatusTabs } from '@/Components/admin/StatusTabs';

interface TeamToolbarProps {
  activeTab: TeamStatusTabId | 'all' | null;
  onTabChange: (tab: TeamStatusTabId) => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear?: () => void;
  selectedRoles: TeamMemberRole[];
  onToggleRole: (role: TeamMemberRole) => void;
}

export function TeamToolbar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onSearchClear,
  selectedRoles,
  onToggleRole,
}: TeamToolbarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* 1. Status Filter Pills (Aktif | Pending | Expired | Non Aktif) */}
      <StatusTabs<TeamStatusTabId>
        tabs={TEAM_STATUS_TABS}
        activeTab={activeTab || undefined}
        onChange={onTabChange}
      />

      {/* 2. Search Input & Filter Button */}
      <div className="flex items-center gap-2.5">
        {/* Search Input Bar */}
        <div className="relative w-full sm:w-64 md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neu-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={TEAM_TOOLBAR.searchPlaceholder}
            className="w-full pl-8.5 pr-8 py-1.5 text-[12px] rounded-[10px] border border-neu-100 bg-white placeholder-neu-400 text-neu-900 focus:outline-none focus:border-pr-900 focus:ring-1 focus:ring-pr-900 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onSearchClear}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neu-400 hover:text-neu-700 p-0.5 cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Popover Filter Role Terintegrasi */}
        <TeamFilterPopover
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
          onClose={() => setIsFilterOpen(false)}
          selectedRoles={selectedRoles}
          onToggleRole={onToggleRole}
        />
      </div>
    </div>
  );
}

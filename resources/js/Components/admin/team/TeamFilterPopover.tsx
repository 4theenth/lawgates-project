import React, { useRef, useEffect } from 'react';
import { Filter, Check } from 'lucide-react';
import { TEAM_ROLES, TeamMemberRole, TEAM_TOOLBAR } from '@/constants/team';

interface TeamFilterPopoverProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  selectedRoles: TeamMemberRole[];
  onToggleRole: (role: TeamMemberRole) => void;
  className?: string;
}

export function TeamFilterPopover({
  isOpen,
  onToggle,
  onClose,
  selectedRoles,
  onToggleRole,
  className = '',
}: TeamFilterPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const hasSelection = selectedRoles.length > 0;

  return (
    <div className={`relative inline-block shrink-0 ${className}`} ref={popoverRef}>
      {/* Tombol Filter Utama */}
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex items-center justify-center gap-1.5 h-[33px] px-3.5 rounded-[10px] border transition-colors shadow-2xs cursor-pointer text-[12px] font-medium shrink-0 select-none ${
          isOpen || hasSelection
            ? 'border-pr-900 bg-pr-50 text-pr-900 font-semibold'
            : 'border-neu-100 bg-white text-neu-700 hover:bg-gray-50 hover:text-neu-900'
        }`}
      >
        <Filter className="w-3.5 h-3.5 text-neu-500" />
        <span>{TEAM_TOOLBAR.filterButtonText}</span>
        {hasSelection && (
          <span className="w-1.5 h-1.5 rounded-full bg-pr-900 ml-0.5" />
        )}
      </button>

      {/* Popover Filter Role sesuai Gambar 2 */}
      {isOpen && (
        <div className="absolute right-0 top-10 z-40 w-44 bg-white rounded-xl shadow-xl border border-neu-100 py-2 text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-1 text-[11px] font-semibold text-neu-400 uppercase tracking-wider">
            Role
          </div>
          <div className="mt-1 space-y-0.5">
            {TEAM_ROLES.map((role) => {
              const isSelected = selectedRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => onToggleRole(role)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-[12px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-pr-50/70 text-pr-900 font-medium'
                      : 'text-neu-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{role}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-pr-900 stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

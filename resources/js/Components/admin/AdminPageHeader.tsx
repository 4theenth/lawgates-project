import React from 'react';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
  };
}

export function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="font-sans text-[20px] font-semibold leading-[26px] text-neu-900 tracking-tight">
          {title}
        </h1>
        <p className="font-sans text-[14px] font-normal leading-[20px] text-neu-600 mt-1">
          {description}
        </p>
      </div>

      {action && (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {action.href ? (
            <Link
              href={action.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
            >
              {action.icon || <Plus className="w-4 h-4" />}
              <span>{action.label}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer"
            >
              {action.icon || <Plus className="w-4 h-4" />}
              <span>{action.label}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

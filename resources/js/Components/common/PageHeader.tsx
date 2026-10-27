import React from 'react';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export interface PageHeaderAction {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  size?: 'default' | 'lg';
  action?: PageHeaderAction;
}

/**
 * Universal Page Header Component
 *
 * Digunakan secara konsisten di seluruh halaman Admin maupun User Dashboard.
 * Menghilangkan duplikasi komponen header antar halaman.
 */
export function PageHeader({
  title,
  description,
  className = 'mb-6',
  size = 'default',
  action,
}: PageHeaderProps) {
  const isLarge = size === 'lg';

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      <div>
        <h1
          className={`font-sans font-semibold tracking-tight text-neu-900 ${
            isLarge ? 'text-[22px] sm:text-[24px] leading-tight font-bold' : 'text-[20px] leading-[26px]'
          }`}
        >
          {title}
        </h1>
        {description && (
          <p className="font-sans text-[13px] sm:text-[14px] font-normal leading-[20px] text-neu-500 mt-1">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {action.href ? (
            <Link
              href={action.href}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer ${
                action.className || ''
              }`}
            >
              {action.icon || <Plus className="w-4 h-4" />}
              <span>{action.label}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer ${
                action.className || ''
              }`}
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

export default PageHeader;

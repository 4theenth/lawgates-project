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
  action?: PageHeaderAction | React.ReactNode;
  actions?: React.ReactNode;
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
  actions,
}: PageHeaderProps) {
  const isLarge = size === 'lg';

  const renderActionContent = () => {
    if (actions) {
      return (
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {actions}
        </div>
      );
    }

    if (React.isValidElement(action)) {
      return (
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {action}
        </div>
      );
    }

    if (action && typeof action === 'object' && 'label' in action) {
      const pageAction = action as PageHeaderAction;
      return (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {pageAction.href ? (
            <Link
              href={pageAction.href}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer ${
                pageAction.className || ''
              }`}
            >
              {pageAction.icon || <Plus className="w-4 h-4" />}
              <span>{pageAction.label}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={pageAction.onClick}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] bg-pr-900 text-white text-[14px] font-medium hover:bg-pr-800 transition-colors shadow-2xs cursor-pointer ${
                pageAction.className || ''
              }`}
            >
              {pageAction.icon || <Plus className="w-4 h-4" />}
              <span>{pageAction.label}</span>
            </button>
          )}
        </div>
      );
    }

    return null;
  };

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

      {renderActionContent()}
    </div>
  );
}

export default PageHeader;

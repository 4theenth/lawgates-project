import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center font-sans text-[12px] leading-[18px] font-medium tracking-normal text-neu-500 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 sm:gap-x-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 mx-0.5 sm:mx-1 text-neu-400 shrink-0" />
              )}
              {item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="text-neu-500 hover:text-pr-900 transition-colors duration-150 cursor-pointer"
                >
                  {item.label}
                </button>
              ) : isLast || !item.href ? (
                <span className={isLast ? 'text-neu-900 font-medium' : 'text-neu-500'}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-neu-500 hover:text-pr-900 transition-colors duration-150"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

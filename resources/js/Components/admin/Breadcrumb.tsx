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
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-gray-500 font-medium ${className}`}>
      <ol className="inline-flex items-center space-x-1 sm:space-x-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400 shrink-0" />
              )}
              {item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="text-gray-500 hover:text-pr-900 transition-colors duration-150 cursor-pointer"
                >
                  {item.label}
                </button>
              ) : isLast || !item.href ? (
                <span className={`${isLast ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-pr-900 transition-colors duration-150"
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

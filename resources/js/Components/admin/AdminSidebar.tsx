import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutGrid,
  Gavel,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
  subItems?: { id: string; label: string; href: string }[];
}

interface AdminSidebarProps {
  isCollapsed: boolean;
}

export function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
  const { url } = usePage();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    users: false,
  });

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutGrid,
    },
    {
      id: 'jenis-hukum',
      label: 'Jenis Hukum',
      href: '/admin/jenis-hukum',
      icon: Gavel,
    },
    {
      id: 'dokumen-hukum',
      label: 'Dokumen Hukum',
      href: '/admin/dokumen-hukum',
      icon: FileText,
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      subItems: [
        { id: 'user-list', label: 'Users', href: '/admin/users' },
        { id: 'admin-list', label: 'Admin', href: '/admin/users/admin' },
      ],
    },
  ];

  const isItemActive = (itemHref?: string) => {
    if (!itemHref) return false;
    return url === itemHref || url.startsWith(`${itemHref}/`);
  };

  return (
    <aside
      className={`fixed top-[56px] left-0 bottom-0 z-20 bg-white border-r border-neu-50 transition-all duration-300 flex flex-col pt-[13px] px-[11px] pb-6 gap-[9px] ${
        isCollapsed ? 'w-[64px]' : 'w-[223px]'
      }`}
    >
      {/* Label Kategori 'Menu' */}
      {!isCollapsed && (
        <p className="px-[14px] text-[11px] font-medium text-neu-400 tracking-wide">
          Menu
        </p>
      )}

      {/* List Menu Navigasi */}
      <nav className="flex flex-col gap-[9px] w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const hasSub = !!item.subItems?.length;
          const isActive = isItemActive(item.href);
          const isSubOpen = openSubmenus[item.id];

          if (hasSub) {
            return (
              <div key={item.id} className="w-full">
                <button
                  type="button"
                  onClick={() => toggleSubmenu(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-[10px] py-[7px] px-[14px] text-[14px] font-normal transition-colors cursor-pointer text-neu-800 hover:bg-gray-50 ${
                    isCollapsed ? 'justify-center px-0' : 'justify-between'
                  }`}
                >
                  <div className="flex items-center gap-[12px]">
                    <Icon className="w-[18px] h-[18px] text-neu-600 shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <span className="text-neu-400">
                      {isSubOpen ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </span>
                  )}
                </button>

                {/* Submenu Accordion */}
                {!isCollapsed && isSubOpen && item.subItems && (
                  <div className="ml-[26px] mt-1 space-y-1 pl-2 border-l border-neu-50">
                    {item.subItems.map((sub) => {
                      const isSubActive = url === sub.href;
                      return (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          className={`block py-[6px] px-[10px] rounded-[8px] text-[13px] transition-colors ${
                            isSubActive
                              ? 'text-pr-900 font-semibold bg-gray-50'
                              : 'text-neu-600 hover:text-black hover:bg-gray-50'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href || '#'}
              title={isCollapsed ? item.label : undefined}
              className={`relative flex items-center rounded-[10px] py-[7px] px-[14px] text-[14px] transition-all group ${
                isCollapsed ? 'justify-center px-0' : 'justify-start gap-[12px]'
              } ${
                isActive
                  ? 'text-pr-900 font-semibold bg-gray-50/90'
                  : 'text-neu-800 font-normal hover:text-black hover:bg-gray-50'
              }`}
            >
              {/* Indikator Menu Aktif Sisi Kiri (Aksen bracket / bar sisi kiri sesuai Figma) */}
              {isActive && (
                <span className="absolute left-0 top-[6px] bottom-[6px] w-[3.5px] bg-pr-900 rounded-r-full" />
              )}

              <Icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                  isActive ? 'text-pr-900' : 'text-neu-600 group-hover:text-black'
                }`}
              />

              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

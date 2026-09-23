import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ADMIN_SIDEBAR_MENUS, SIDEBAR_THEME } from '@/config/navigation';
import type { SidebarMenuItem } from '@/types/navigation';

interface AdminSidebarProps {
  isCollapsed: boolean;
  menus?: SidebarMenuItem[];
}

export function AdminSidebar({ isCollapsed, menus = ADMIN_SIDEBAR_MENUS }: AdminSidebarProps) {
  const { url } = usePage();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { users: false };
    menus.forEach((m) => {
      if (m.subItems?.some((sub) => url === sub.href || (sub.href !== '#' && url.startsWith(`${sub.href}`)))) {
        initial[m.id] = true;
      }
    });
    return initial;
  });

  // Auto-expand submenu if current page is a child route
  React.useEffect(() => {
    menus.forEach((m) => {
      if (m.subItems?.some((sub) => url === sub.href || (sub.href !== '#' && url.startsWith(`${sub.href}`)))) {
        setOpenSubmenus((prev) => ({ ...prev, [m.id]: true }));
      }
    });
  }, [url, menus]);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isItemActive = (itemHref?: string) => {
    if (!itemHref) return false;
    const cleanUrl = url.split('?')[0];
    return cleanUrl === itemHref || cleanUrl.startsWith(`${itemHref}/`);
  };

  return (
    <aside
      className={`shrink-0 h-full bg-white border-r border-neu-50 transition-all duration-300 flex flex-col pt-[13px] px-[10px] pb-6 gap-[9px] overflow-y-auto ${
        isCollapsed ? 'w-[64px]' : 'w-[195px]'
      }`}
    >
      {/* Label Kategori 'Menu' (Pertahankan area kosong saat collapse agar icon tidak berpindah posisi vertikal) */}
      <div className="h-[18px] flex items-center">
        <p className={`${SIDEBAR_THEME.categoryLabel} ${isCollapsed ? 'invisible' : 'visible'}`}>
          Menu
        </p>
      </div>

      {/* List Menu Navigasi */}
      <nav className="flex flex-col gap-[9px] w-full">
        {menus.map((item) => {
          const Icon = item.icon;
          const hasSub = !!item.subItems?.length;
          const isActive = isItemActive(item.href);
          const isChildActive = hasSub && item.subItems?.some((sub) => url === sub.href || (sub.href !== '#' && url.startsWith(sub.href)));
          const isSubOpen = openSubmenus[item.id] ?? isChildActive;

          if (hasSub) {
            return (
              <div key={item.id} className="relative w-full">
                <button
                  type="button"
                  onClick={() => toggleSubmenu(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`relative ${SIDEBAR_THEME.itemBase} ${
                    isChildActive
                      ? SIDEBAR_THEME.activeItem.container
                      : SIDEBAR_THEME.dropdownParent.container
                  } ${isCollapsed ? 'justify-center px-0' : 'justify-between'}`}
                >
                  <div className="flex items-center gap-[12px]">
                    <Icon
                      className={`w-[18px] h-[18px] shrink-0 ${
                        isChildActive ? SIDEBAR_THEME.activeItem.icon : SIDEBAR_THEME.dropdownParent.icon
                      }`}
                    />
                    {!isCollapsed && (
                      <span className={`text-[12px] ${isChildActive ? 'font-bold text-pr-900' : 'font-normal'}`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <span className={isChildActive ? 'text-pr-900' : SIDEBAR_THEME.dropdownParent.arrow}>
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
                  <div className="ml-[20px] mt-1 space-y-1 pl-3 border-l border-neu-200">
                    {item.subItems.map((sub) => {
                      const isSubActive = url === sub.href;

                      if (sub.disabled) {
                        return (
                          <span
                            key={sub.id}
                            className="block py-[4px] px-[8px] rounded-[6px] text-[12px] text-neu-400 select-none cursor-default"
                          >
                            {sub.label}
                          </span>
                        );
                      }

                      return (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          className={`block py-[4px] px-[8px] rounded-[6px] ${SIDEBAR_THEME.submenuItem.fontSize} transition-colors ${
                            isSubActive
                              ? SIDEBAR_THEME.submenuItem.active
                              : SIDEBAR_THEME.submenuItem.inactive
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

          if (item.disabled) {
            return (
              <span
                key={item.id}
                title="Fitur belum tersedia"
                className={`relative ${SIDEBAR_THEME.itemBase} group text-neu-400 opacity-50 cursor-not-allowed select-none ${isCollapsed ? 'justify-center px-0' : 'justify-start gap-[12px]'
                  }`}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!isCollapsed && (
                  <span className="text-[12px] font-normal">
                    {item.label}
                  </span>
                )}
              </span>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href || '#'}
              title={isCollapsed ? item.label : undefined}
              className={`relative ${SIDEBAR_THEME.itemBase} group ${isCollapsed ? 'justify-center px-0' : 'justify-start gap-[12px]'
                } ${isActive
                  ? SIDEBAR_THEME.activeItem.container
                  : SIDEBAR_THEME.inactiveItem.container
                }`}
            >
              {/* Indikator Menu Aktif Sisi Kiri (Aksen bracket / bar sisi kiri sesuai Figma) */}
              {/* {isActive && (
                <span className={`absolute left-0 top-[6px] bottom-[6px] w-[3.5px] rounded-r-full ${SIDEBAR_THEME.activeItem.indicator}`} />
              )} */}

              <Icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors ${isActive
                  ? SIDEBAR_THEME.activeItem.icon
                  : SIDEBAR_THEME.inactiveItem.icon
                  }`}
              />

              {!isCollapsed && (
                <span className={`text-[12px] ${isActive ? 'font-bold text-neu-900' : 'font-normal'}`}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

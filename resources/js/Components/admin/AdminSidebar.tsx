import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { ADMIN_SIDEBAR_MENUS, SIDEBAR_THEME } from '@/config/navigation';
import type { SidebarMenuItem } from '@/types/navigation';
import ApplicationLogo from '@/Components/common/ApplicationLogo';

interface AdminSidebarProps {
  isCollapsed: boolean;
  menus?: SidebarMenuItem[];
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({
  isCollapsed,
  menus = ADMIN_SIDEBAR_MENUS,
  isMobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
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

  // Auto-expand submenu jika halaman aktif adalah child route
  useEffect(() => {
    menus.forEach((m) => {
      if (m.subItems?.some((sub) => url === sub.href || (sub.href !== '#' && url.startsWith(`${sub.href}`)))) {
        setOpenSubmenus((prev) => ({ ...prev, [m.id]: true }));
      }
    });
  }, [url, menus]);

  // Tutup mobile drawer HANYA ketika berpindah route (bukan saat toggle dibuka)
  const previousUrlRef = React.useRef(url);
  useEffect(() => {
    if (previousUrlRef.current !== url) {
      previousUrlRef.current = url;
      onMobileClose?.();
    }
  }, [url, onMobileClose]);

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

  // Helper untuk merender list item navigasi
  const renderNavList = (collapsed: boolean, isMobile: boolean) => {
    return menus.map((item) => {
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
              title={collapsed ? item.label : undefined}
              className={`relative ${SIDEBAR_THEME.itemBase} ${
                isChildActive
                  ? SIDEBAR_THEME.activeItem.container
                  : SIDEBAR_THEME.dropdownParent.container
              } ${collapsed ? 'justify-center px-0' : 'justify-between'}`}
            >
              <div className="flex items-center gap-[12px]">
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isChildActive ? SIDEBAR_THEME.activeItem.icon : SIDEBAR_THEME.dropdownParent.icon
                  }`}
                />
                {!collapsed && (
                  <span className={`text-[12px] ${isChildActive ? 'font-bold text-pr-900' : 'font-normal'}`}>
                    {item.label}
                  </span>
                )}
              </div>
              {!collapsed && (
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
            {!collapsed && isSubOpen && item.subItems && (
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
                      onClick={() => isMobile && onMobileClose?.()}
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
            className={`relative ${SIDEBAR_THEME.itemBase} group text-neu-400 opacity-50 cursor-not-allowed select-none ${
              collapsed ? 'justify-center px-0' : 'justify-start gap-[12px]'
            }`}
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && (
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
          onClick={() => isMobile && onMobileClose?.()}
          title={collapsed ? item.label : undefined}
          className={`relative ${SIDEBAR_THEME.itemBase} group ${
            collapsed ? 'justify-center px-0' : 'justify-start gap-[12px]'
          } ${
            isActive
              ? SIDEBAR_THEME.activeItem.container
              : SIDEBAR_THEME.inactiveItem.container
          }`}
        >
          <Icon
            className={`w-[18px] h-[18px] shrink-0 transition-colors ${
              isActive
                ? SIDEBAR_THEME.activeItem.icon
                : SIDEBAR_THEME.inactiveItem.icon
            }`}
          />

          {!collapsed && (
            <span className={`text-[12px] ${isActive ? 'font-bold text-neu-900' : 'font-normal'}`}>
              {item.label}
            </span>
          )}
        </Link>
      );
    });
  };

  return (
    <>
      {/* ── 1. MOBILE BACKDROP & DRAWER OVERLAY (Sesuai Referensi Iswara) ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer Sidebar Mobile Slide-in dari Kiri */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[275px] max-w-[85vw] bg-white shadow-2xl md:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
        }`}
      >
        {/* Header Drawer Mobile (Logo LawGates + Tombol Tutup X) */}
        <div className="h-[56px] px-4 border-b border-neu-100 flex items-center justify-between shrink-0 bg-white">
          <Link href="/" className="flex items-center" onClick={onMobileClose}>
            <ApplicationLogo className="h-[24px] w-auto text-pr-900" />
          </Link>
          <button
            type="button"
            onClick={onMobileClose}
            className="p-1.5 text-neu-400 hover:text-neu-800 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            title="Tutup Menu"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Menu Items Mobile */}
        <div className="flex-1 overflow-y-auto pt-[14px] px-[12px] pb-6 flex flex-col gap-[9px]">
          <div className="h-[18px] flex items-center px-1">
            <p className={SIDEBAR_THEME.categoryLabel}>Menu</p>
          </div>

          <nav className="flex flex-col gap-[9px] w-full">
            {renderNavList(false, true)}
          </nav>
        </div>
      </aside>

      {/* ── 2. DESKTOP SIDEBAR (Hanya tampil di layar >= md) ── */}
      <aside
        className={`hidden md:flex shrink-0 h-full bg-white border-r border-neu-50 transition-all duration-300 ease-in-out flex-col pt-[13px] px-[10px] pb-6 gap-[9px] overflow-y-auto ${
          isCollapsed
            ? 'w-0 -translate-x-full overflow-hidden !p-0 !border-r-0 opacity-0 pointer-events-none'
            : 'w-[195px] opacity-100'
        }`}
      >
        {/* Label Kategori 'Menu' */}
        <div className="h-[18px] flex items-center">
          <p className={`${SIDEBAR_THEME.categoryLabel} ${isCollapsed ? 'invisible' : 'visible'}`}>
            Menu
          </p>
        </div>

        {/* List Menu Navigasi Desktop */}
        <nav className="flex flex-col gap-[9px] w-full">
          {renderNavList(isCollapsed, false)}
        </nav>
      </aside>
    </>
  );
}

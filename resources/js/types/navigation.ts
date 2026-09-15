import type { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  roles?: string[];
}

export interface SidebarMenuItem {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
  roles?: string[];
  subItems?: SubMenuItem[];
}

export interface MenuItem {
  id: number | string;
  title: string;
  path: string;
  icon?: string;
  index?: boolean;
  roles?: string[];
  isExternal?: boolean;
  subItems?: SubMenuItem[];
}

// Alias for backwards compatibility
export interface NavItem {
  id?: number | string;
  label?: string;
  title?: string;
  href?: string;
  path?: string;
  isActive?: boolean;
  icon?: string;
  roles?: string[];
}

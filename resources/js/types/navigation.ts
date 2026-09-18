import type { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  roles?: string[];
  disabled?: boolean;
}

export interface SidebarMenuItem {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
  roles?: string[];
  subItems?: SubMenuItem[];
  disabled?: boolean;
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
  disabled?: boolean;
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

export interface MenuItem {
  id: number | string;
  title: string;
  path: string;
  icon?: string;
  index?: boolean;
  roles?: string[];
  isExternal?: boolean;
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

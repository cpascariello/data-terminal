import type { ReactNode } from "react";

export interface MegaDropdownFeatured {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href?: string;
}

export interface MegaDropdownConfig {
  heading?: string;
  description?: string;
  links?: NavItem[];
  featured?: MegaDropdownFeatured[];
}

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: NavItem[];
  mega?: MegaDropdownConfig;
  disabled?: boolean;
}

export function isItemActive(item: NavItem, activeId: string): boolean {
  if (item.id === activeId) return true;
  if (item.children?.some((child) => child.id === activeId)) return true;
  return item.mega?.links?.some((link) => link.id === activeId) ?? false;
}

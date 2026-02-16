import type { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: NavItem[];
  disabled?: boolean;
}

export function isItemActive(item: NavItem, activeId: string): boolean {
  if (item.id === activeId) return true;
  return item.children?.some((child) => child.id === activeId) ?? false;
}

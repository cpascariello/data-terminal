# Navigation Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build two independent navigation molecules — a horizontal Navbar with dropdown menus and a vertical collapsible Sidebar — plus a showcase tab.

**Architecture:** Two self-contained client components (`Navbar`, `Sidebar`) sharing a `NavItem` type exported from a types file. Both follow the uncontrolled-default/controlled-override pattern used by existing form components. The Navigation tab gets real demos replacing the placeholder.

**Tech Stack:** React, TypeScript, Tailwind CSS 4, Lucide icons, cn() utility

---

### Task 1: Create shared NavItem type

**Files:**
- Create: `src/types/nav.ts`

**Step 1: Create the type file**

```ts
import type { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: NavItem[];
  disabled?: boolean;
}
```

**Step 2: Commit**

```bash
git add src/types/nav.ts
git commit -m "feat: add shared NavItem type for navigation components"
```

---

### Task 2: Build the Navbar component

**Files:**
- Create: `src/molecules/navbar.tsx`
- Modify: `src/molecules/index.ts` (add export)

**Step 1: Create navbar.tsx**

The Navbar is a `"use client"` molecule. Key behaviors:
- Renders a sticky horizontal bar with logo slot (left), nav items (center-left), actions slot (right)
- Top-level items with `children` show dropdown menus
- Dropdowns open on hover (150ms enter delay, 100ms leave delay) and toggle on click
- Dropdowns close on outside click and Escape
- Active item tracked internally with optional controlled override
- `onNavigate` fires with the clicked item's `id`
- Uses `font-display` uppercase tracking like existing tab bar and buttons

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import type { NavItem } from "@/types/nav";

interface NavbarProps {
  items: NavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onNavigate?: (id: string) => void;
  logo?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function Navbar({
  items,
  activeId: controlledActiveId,
  defaultActiveId = "",
  onNavigate,
  logo,
  actions,
  className,
}: NavbarProps) {
  const isControlled = controlledActiveId !== undefined;
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId);
  const activeId = isControlled ? controlledActiveId : internalActiveId;

  function handleNavigate(id: string) {
    if (!isControlled) setInternalActiveId(id);
    onNavigate?.(id);
  }

  // Check if an item or any of its children is active
  function isItemActive(item: NavItem): boolean {
    if (item.id === activeId) return true;
    return item.children?.some((child) => child.id === activeId) ?? false;
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border",
        "bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo slot */}
        {logo && <div className="shrink-0">{logo}</div>}

        {/* Nav items */}
        <div className="flex flex-1 items-center gap-1">
          {items.map((item) => (
            <NavbarItem
              key={item.id}
              item={item}
              isActive={isItemActive(item)}
              activeId={activeId}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Actions slot */}
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </nav>
  );
}

// --- NavbarItem: top-level item, may have dropdown ---

interface NavbarItemProps {
  item: NavItem;
  isActive: boolean;
  activeId: string;
  onNavigate: (id: string) => void;
}

function NavbarItem({ item, isActive, activeId, onNavigate }: NavbarItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Close on outside click and Escape
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleMouseEnter = useCallback(() => {
    if (!hasChildren) return;
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setOpen(true), 150);
  }, [hasChildren]);

  const handleMouseLeave = useCallback(() => {
    if (!hasChildren) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => setOpen(false), 100);
  }, [hasChildren]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else {
      if (!item.disabled) handleItemNavigate(item);
    }
  }

  function handleItemNavigate(navItem: NavItem) {
    onNavigate(navItem.id);
    setOpen(false);
  }

  const Tag = item.href && !hasChildren ? "a" : "button";
  const tagProps = Tag === "a" ? { href: item.href } : { type: "button" as const };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tag
        {...tagProps}
        onClick={handleClick}
        disabled={item.disabled}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-2 font-display text-xs tracking-widest uppercase",
          "transition-colors duration-150",
          "border-b-2 -mb-[1px]",
          isActive
            ? "border-accent text-accent"
            : "border-transparent text-foreground/50 hover:text-foreground/80",
          item.disabled && "pointer-events-none opacity-40",
        )}
        style={
          isActive
            ? { textShadow: "0 0 8px var(--accent-glow-line)" }
            : undefined
        }
      >
        {item.label}
        {hasChildren && (
          <ChevronDown
            size={14}
            className={cn(
              "text-foreground/30 transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        )}
      </Tag>

      {/* Dropdown panel */}
      {hasChildren && open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-[1px] min-w-[200px]",
            "border border-border bg-card shadow-lg",
          )}
        >
          {item.children!.map((child) => {
            const ChildTag = child.href ? "a" : "button";
            const childTagProps = ChildTag === "a"
              ? { href: child.href }
              : { type: "button" as const };

            return (
              <ChildTag
                key={child.id}
                {...childTagProps}
                onClick={() => !child.disabled && handleItemNavigate(child)}
                disabled={child.disabled}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5",
                  "font-display text-sm transition-colors",
                  child.id === activeId
                    ? "bg-accent/10 text-accent"
                    : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
                  child.disabled && "pointer-events-none opacity-40",
                )}
              >
                {child.icon && <span className="shrink-0">{child.icon}</span>}
                {child.label}
              </ChildTag>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Add export to barrel**

Add to `src/molecules/index.ts` in alphabetical order:

```ts
export { Navbar } from "./navbar";
```

**Step 3: Verify build**

Run: `pnpm typecheck`
Expected: no errors

**Step 4: Commit**

```bash
git add src/molecules/navbar.tsx src/molecules/index.ts
git commit -m "feat: add Navbar component with dropdown menus"
```

---

### Task 3: Build the Sidebar component

**Files:**
- Create: `src/molecules/sidebar.tsx`
- Modify: `src/molecules/index.ts` (add export)

**Step 1: Create sidebar.tsx**

The Sidebar is a `"use client"` molecule. Key behaviors:
- Renders a vertical nav panel with header, nav items, and collapse toggle
- Expanded state (~240px): shows logo, icon + label for items, indented children
- Collapsed state (~56px): icon rail with tooltips, parent items show flyout on hover
- Collapse toggle chevron button at the bottom
- Groups expand/collapse on click (expanded mode) or show flyout (collapsed mode)
- Uncontrolled by default for both active item and collapsed state

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import type { NavItem } from "@/types/nav";

interface SidebarProps {
  items: NavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onNavigate?: (id: string) => void;
  header?: {
    logo: ReactNode;
    collapsedLogo: ReactNode;
  };
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

export function Sidebar({
  items,
  activeId: controlledActiveId,
  defaultActiveId = "",
  onNavigate,
  header,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
}: SidebarProps) {
  // Active state
  const isActiveControlled = controlledActiveId !== undefined;
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId);
  const activeId = isActiveControlled ? controlledActiveId : internalActiveId;

  // Collapsed state
  const isCollapsedControlled = controlledCollapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = isCollapsedControlled ? controlledCollapsed : internalCollapsed;

  // Track which groups are expanded
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  function handleNavigate(id: string) {
    if (!isActiveControlled) setInternalActiveId(id);
    onNavigate?.(id);
  }

  function toggleCollapsed() {
    const next = !isCollapsed;
    if (!isCollapsedControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  function toggleGroup(groupId: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }

  function isItemActive(item: NavItem): boolean {
    if (item.id === activeId) return true;
    return item.children?.some((child) => child.id === activeId) ?? false;
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-card",
        "transition-[width] duration-200 ease-in-out",
        isCollapsed ? "w-14" : "w-60",
        className,
      )}
    >
      {/* Header */}
      {header && (
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-border px-3",
            isCollapsed && "justify-center",
          )}
        >
          {isCollapsed ? header.collapsedLogo : header.logo}
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            isActive={isItemActive(item)}
            activeId={activeId}
            isGroupOpen={openGroups.has(item.id)}
            onNavigate={handleNavigate}
            onToggleGroup={toggleGroup}
          />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="shrink-0 border-t border-border p-2">
        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            "flex w-full items-center justify-center p-2",
            "text-foreground/40 transition-colors hover:text-foreground/70",
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}

// --- SidebarItem: handles both collapsed and expanded states ---

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
  isActive: boolean;
  activeId: string;
  isGroupOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleGroup: (id: string) => void;
}

function SidebarItem({
  item,
  isCollapsed,
  isActive,
  activeId,
  isGroupOpen,
  onNavigate,
  onToggleGroup,
}: SidebarItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const [showFlyout, setShowFlyout] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseEnter = useCallback(() => {
    if (!isCollapsed) return;
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    if (hasChildren) {
      setShowFlyout(true);
    } else {
      setShowTooltip(true);
    }
  }, [isCollapsed, hasChildren]);

  const handleMouseLeave = useCallback(() => {
    if (!isCollapsed) return;
    leaveTimeoutRef.current = setTimeout(() => {
      setShowFlyout(false);
      setShowTooltip(false);
    }, 100);
  }, [isCollapsed]);

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (item.disabled) return;
    if (hasChildren && !isCollapsed) {
      onToggleGroup(item.id);
    } else if (!hasChildren) {
      onNavigate(item.id);
    }
  }

  const Tag = item.href && !hasChildren ? "a" : "button";
  const tagProps = Tag === "a" ? { href: item.href } : { type: "button" as const };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main item button/link */}
      <Tag
        {...tagProps}
        onClick={handleClick}
        disabled={item.disabled}
        className={cn(
          "flex w-full items-center gap-3 px-3 py-2.5 transition-colors duration-150",
          "font-display text-sm",
          isCollapsed && "justify-center px-0",
          isActive
            ? "bg-accent/10 text-accent"
            : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground/90",
          item.disabled && "pointer-events-none opacity-40",
        )}
      >
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate text-left">{item.label}</span>
            {hasChildren && (
              <ChevronDown
                size={14}
                className={cn(
                  "shrink-0 text-foreground/30 transition-transform duration-150",
                  isGroupOpen && "rotate-180",
                )}
              />
            )}
          </>
        )}
      </Tag>

      {/* Expanded: indented children */}
      {hasChildren && !isCollapsed && isGroupOpen && (
        <div className="ml-4 border-l border-border/50 pl-2">
          {item.children!.map((child) => {
            const ChildTag = child.href ? "a" : "button";
            const childTagProps = ChildTag === "a"
              ? { href: child.href }
              : { type: "button" as const };

            return (
              <ChildTag
                key={child.id}
                {...childTagProps}
                onClick={() => !child.disabled && onNavigate(child.id)}
                disabled={child.disabled}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left",
                  "font-display text-xs transition-colors duration-150",
                  child.id === activeId
                    ? "text-accent"
                    : "text-foreground/50 hover:text-foreground/80",
                  child.disabled && "pointer-events-none opacity-40",
                )}
              >
                {child.icon && <span className="shrink-0">{child.icon}</span>}
                <span className="truncate">{child.label}</span>
              </ChildTag>
            );
          })}
        </div>
      )}

      {/* Collapsed: tooltip for leaf items */}
      {isCollapsed && !hasChildren && showTooltip && (
        <div
          className={cn(
            "absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2",
            "whitespace-nowrap border border-border bg-card px-3 py-1.5 shadow-lg",
            "font-display text-xs text-foreground/80",
          )}
        >
          {item.label}
        </div>
      )}

      {/* Collapsed: flyout for parent items */}
      {isCollapsed && hasChildren && showFlyout && (
        <div
          className={cn(
            "absolute left-full top-0 z-50 ml-1 min-w-[180px]",
            "border border-border bg-card shadow-lg",
          )}
        >
          <div className="px-3 py-2 font-display text-[10px] uppercase tracking-wider text-foreground/40">
            {item.label}
          </div>
          {item.children!.map((child) => {
            const ChildTag = child.href ? "a" : "button";
            const childTagProps = ChildTag === "a"
              ? { href: child.href }
              : { type: "button" as const };

            return (
              <ChildTag
                key={child.id}
                {...childTagProps}
                onClick={() => {
                  if (!child.disabled) {
                    onNavigate(child.id);
                    setShowFlyout(false);
                  }
                }}
                disabled={child.disabled}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left",
                  "font-display text-sm transition-colors",
                  child.id === activeId
                    ? "bg-accent/10 text-accent"
                    : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
                  child.disabled && "pointer-events-none opacity-40",
                )}
              >
                {child.icon && <span className="shrink-0">{child.icon}</span>}
                {child.label}
              </ChildTag>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Add export to barrel**

Add to `src/molecules/index.ts` in alphabetical order:

```ts
export { Sidebar } from "./sidebar";
```

**Step 3: Verify build**

Run: `pnpm typecheck`
Expected: no errors

**Step 4: Commit**

```bash
git add src/molecules/sidebar.tsx src/molecules/index.ts
git commit -m "feat: add Sidebar component with collapsible icon rail"
```

---

### Task 4: Build the Navigation tab showcase

**Files:**
- Modify: `src/app/tabs/navigation.tsx`

**Step 1: Replace the placeholder with demos**

Replace the entire file. The tab showcases both Navbar and Sidebar with sample data. Both demos are wrapped in bordered containers. The sidebar demo shows two sidebars (expanded and collapsed) side by side in fixed-height containers.

Icons used from lucide-react: `LayoutDashboard`, `Monitor`, `Activity`, `FileText`, `Settings`, `Database`, `Cpu`, `Shield`, `Terminal`.

```tsx
"use client";

import { GlowLine } from "@/atoms";
import { Navbar, Section, SectionHeading, Sidebar } from "@/molecules";
import {
  LayoutDashboard,
  Monitor,
  Activity,
  FileText,
  Settings,
  Database,
  Cpu,
  Shield,
  Terminal,
} from "lucide-react";
import type { NavItem } from "@/types/nav";

const NAVBAR_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard" },
  {
    id: "systems",
    label: "Systems",
    children: [
      { id: "sys-compute", label: "Compute", icon: <Cpu size={14} /> },
      { id: "sys-database", label: "Database", icon: <Database size={14} /> },
      { id: "sys-network", label: "Network", icon: <Shield size={14} /> },
    ],
  },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

const SIDEBAR_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: <Monitor size={18} />,
    children: [
      { id: "mon-metrics", label: "Metrics", icon: <Activity size={14} /> },
      { id: "mon-logs", label: "Logs", icon: <FileText size={14} /> },
      { id: "mon-alerts", label: "Alerts", icon: <Shield size={14} /> },
    ],
  },
  { id: "terminal", label: "Terminal", icon: <Terminal size={18} /> },
  { id: "config", label: "Config", icon: <Settings size={18} /> },
];

export function NavigationTab() {
  return (
    <>
      {/* Navbar demo */}
      <Section spacing="lg">
        <SectionHeading subtitle="Horizontal navigation with dropdown menus.">
          Navbar
        </SectionHeading>

        <div className="mt-12 overflow-hidden border border-border">
          <Navbar
            items={NAVBAR_ITEMS}
            defaultActiveId="dashboard"
            logo={
              <span className="font-display text-sm tracking-wider text-accent">
                SYSTEM_CTRL
              </span>
            }
            actions={
              <span className="font-display text-[10px] tracking-wider text-foreground/30">
                v2.4.1
              </span>
            }
          />
        </div>
      </Section>

      <GlowLine />

      {/* Sidebar demo */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Vertical navigation with collapsible icon rail.">
          Sidebar
        </SectionHeading>

        <div className="mt-12 flex gap-8">
          {/* Expanded sidebar */}
          <div className="h-[420px] overflow-hidden border border-border">
            <Sidebar
              items={SIDEBAR_ITEMS}
              defaultActiveId="overview"
              header={{
                logo: (
                  <span className="font-display text-sm tracking-wider text-accent">
                    DATA_TERM
                  </span>
                ),
                collapsedLogo: (
                  <span className="font-display text-xs text-accent">DT</span>
                ),
              }}
            />
          </div>

          {/* Collapsed sidebar */}
          <div className="h-[420px] overflow-hidden border border-border">
            <Sidebar
              items={SIDEBAR_ITEMS}
              defaultActiveId="overview"
              defaultCollapsed
              header={{
                logo: (
                  <span className="font-display text-sm tracking-wider text-accent">
                    DATA_TERM
                  </span>
                ),
                collapsedLogo: (
                  <span className="font-display text-xs text-accent">DT</span>
                ),
              }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
```

**Step 2: Verify build**

Run: `pnpm typecheck`
Expected: no errors

**Step 3: Visual check**

Run: `pnpm dev`
Navigate to `http://localhost:3000#navigation`
Verify:
- Navbar renders with items, hover dropdown works for "Systems"
- Both sidebars render (one expanded, one collapsed)
- Expanded sidebar shows group expand/collapse for "Monitoring"
- Collapsed sidebar shows tooltips and flyouts on hover
- Active items highlight with accent color
- All 5 themes work correctly

**Step 4: Commit**

```bash
git add src/app/tabs/navigation.tsx
git commit -m "feat: add navigation tab with Navbar and Sidebar demos"
```

---

### Task 5: Update docs and exports

**Files:**
- Modify: `docs/ARCHITECTURE.md` (add Navigation pattern)
- Modify: `docs/DESIGN-SYSTEM.md` (add Navbar and Sidebar API reference)
- Modify: `CLAUDE.md` (update component inventory)
- Modify: `docs/BACKLOG.md` (move navigation to Completed)

**Step 1: Update ARCHITECTURE.md**

Add a new pattern section after "Buttons":

```markdown
### Navigation
**Context:** Horizontal and vertical navigation components with two-level hierarchy.
**Approach:** Two independent molecules sharing a `NavItem` type from `src/types/nav.ts`. `Navbar` renders a sticky horizontal bar with hover/click dropdowns. `Sidebar` renders a vertical panel that collapses to an icon rail with tooltips and flyouts. Both use uncontrolled-default/controlled-override state for active item tracking. Dropdowns/flyouts use hover with delayed enter/leave timers plus click toggle and Escape/outside-click dismiss.
**Key files:** `src/molecules/navbar.tsx`, `src/molecules/sidebar.tsx`, `src/types/nav.ts`
**Notes:** `NavItem.icon` is required for Sidebar (collapsed rail), optional for Navbar. Sidebar collapse state is independently controllable via `collapsed`/`onCollapsedChange`.
```

**Step 2: Update DESIGN-SYSTEM.md**

Add Navbar and Sidebar entries to the Molecules section.

**Step 3: Update CLAUDE.md**

Add to Component Inventory under Molecules:
- `Navbar` entry
- `Sidebar` entry

Add `src/types/nav.ts` to Key Directories or a note about shared types.

**Step 4: Update BACKLOG.md**

Move "Navigation components" from open items to the Completed section.

**Step 5: Commit**

```bash
git add docs/ARCHITECTURE.md docs/DESIGN-SYSTEM.md CLAUDE.md docs/BACKLOG.md
git commit -m "docs: add navigation components to architecture, design system, and inventory"
```

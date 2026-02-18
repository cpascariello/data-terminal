"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@dt/lib/cn";
import { isItemActive, type NavItem } from "@dt/types/nav";

export interface SidebarProps {
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

function SidebarItem({
  item,
  activeId,
  collapsed,
  openGroups,
  onToggleGroup,
  onNavigate,
}: {
  item: NavItem;
  activeId: string;
  collapsed: boolean;
  openGroups: Set<string>;
  onToggleGroup: (id: string) => void;
  onNavigate: (id: string) => void;
}) {
  if (collapsed) {
    return (
      <CollapsedItem
        item={item}
        activeId={activeId}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <ExpandedItem
      item={item}
      activeId={activeId}
      openGroups={openGroups}
      onToggleGroup={onToggleGroup}
      onNavigate={onNavigate}
    />
  );
}

function ExpandedItem({
  item,
  activeId,
  openGroups,
  onToggleGroup,
  onNavigate,
}: {
  item: NavItem;
  activeId: string;
  openGroups: Set<string>;
  onToggleGroup: (id: string) => void;
  onNavigate: (id: string) => void;
}) {
  const hasChildren = (item.children?.length ?? 0) > 0;
  const isActive = item.id === activeId;
  const isParentActive = isItemActive(item, activeId);
  const isGroupOpen = openGroups.has(item.id);

  const itemClasses = cn(
    "flex w-full items-center gap-3 px-3 py-2 font-display text-sm",
    "transition-colors duration-150",
    isActive || (isParentActive && !hasChildren)
      ? "bg-accent/10 text-accent"
      : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
    item.disabled && "pointer-events-none opacity-40",
  );

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => onToggleGroup(item.id)}
          disabled={item.disabled}
          aria-expanded={isGroupOpen}
          className={cn(itemClasses, "justify-between")}
        >
          <span className="flex items-center gap-3">
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </span>
          <ChevronDown
            size={14}
            className={cn(
              "text-foreground/30 transition-transform duration-150",
              isGroupOpen && "rotate-180",
            )}
          />
        </button>
        {isGroupOpen && (
          <div className="ml-4 border-l border-border/50 pl-2">
            {item.children?.map((child) => (
              <ExpandedLeafItem
                key={child.id}
                item={child}
                isActive={child.id === activeId}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        className={itemClasses}
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          onNavigate(item.id);
        }}
        aria-disabled={item.disabled}
      >
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.id)}
      disabled={item.disabled}
      className={itemClasses}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span>{item.label}</span>
    </button>
  );
}

function ExpandedLeafItem({
  item,
  isActive,
  onNavigate,
}: {
  item: NavItem;
  isActive: boolean;
  onNavigate: (id: string) => void;
}) {
  const classes = cn(
    "flex w-full items-center gap-3 px-3 py-1.5 font-display text-sm",
    "transition-colors duration-150",
    isActive
      ? "text-accent"
      : "text-foreground/50 hover:text-foreground/80",
    item.disabled && "pointer-events-none opacity-40",
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={classes}
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          onNavigate(item.id);
        }}
        aria-disabled={item.disabled}
      >
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.id)}
      disabled={item.disabled}
      className={classes}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span>{item.label}</span>
    </button>
  );
}

function collapsedIconClasses(isActive: boolean, disabled?: boolean) {
  return cn(
    "flex w-full items-center justify-center px-0 py-2",
    "font-display text-sm transition-colors duration-150",
    isActive
      ? "bg-accent/10 text-accent"
      : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
    disabled && "pointer-events-none opacity-40",
  );
}

function CollapsedItem({
  item,
  activeId,
  onNavigate,
}: {
  item: NavItem;
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const hasChildren = (item.children?.length ?? 0) > 0;
  const isActive = item.id === activeId;
  const isParentActive = isItemActive(item, activeId);
  const highlighted = isActive || isParentActive;

  const handleEnter = useCallback(() => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => setHovered(false), 100);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {hasChildren ? (
        <CollapsedParentContent
          item={item}
          highlighted={highlighted}
          activeId={activeId}
          hovered={hovered}
          onNavigate={onNavigate}
        />
      ) : (
        <CollapsedLeafContent
          item={item}
          highlighted={highlighted}
          hovered={hovered}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

function CollapsedParentContent({
  item,
  highlighted,
  activeId,
  hovered,
  onNavigate,
}: {
  item: NavItem;
  highlighted: boolean;
  activeId: string;
  hovered: boolean;
  onNavigate: (id: string) => void;
}) {
  return (
    <>
      <button
        type="button"
        className={collapsedIconClasses(highlighted, item.disabled)}
        aria-label={item.label}
        aria-haspopup="menu"
        disabled={item.disabled}
      >
        {item.icon ?? <span className="size-4" />}
      </button>
      {hovered && (
        <div
          className={cn(
            "absolute left-full top-0 z-50 ml-1 min-w-[180px]",
            "border border-border bg-card shadow-lg",
          )}
        >
          <div className="px-3 py-2 font-display text-xs text-foreground/40">
            {item.label}
          </div>
          {item.children?.map((child) => (
            <FlyoutChildItem
              key={child.id}
              item={child}
              isActive={child.id === activeId}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </>
  );
}

function CollapsedLeafContent({
  item,
  highlighted,
  hovered,
  onNavigate,
}: {
  item: NavItem;
  highlighted: boolean;
  hovered: boolean;
  onNavigate: (id: string) => void;
}) {
  const classes = collapsedIconClasses(highlighted, item.disabled);

  return (
    <>
      {item.href ? (
        <a
          href={item.href}
          className={classes}
          onClick={(e) => {
            if (item.disabled) {
              e.preventDefault();
              return;
            }
            onNavigate(item.id);
          }}
          aria-disabled={item.disabled}
        >
          {item.icon ?? <span className="size-4" />}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onNavigate(item.id)}
          disabled={item.disabled}
          className={classes}
        >
          {item.icon ?? <span className="size-4" />}
        </button>
      )}
      {hovered && (
        <div
          className={cn(
            "absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2",
            "whitespace-nowrap border border-border bg-card px-2 py-1",
            "font-display text-xs text-foreground/70 shadow-lg",
          )}
        >
          {item.label}
        </div>
      )}
    </>
  );
}

function FlyoutChildItem({
  item,
  isActive,
  onNavigate,
}: {
  item: NavItem;
  isActive: boolean;
  onNavigate: (id: string) => void;
}) {
  const classes = cn(
    "flex w-full items-center gap-2 px-3 py-1.5 font-display text-sm",
    "transition-colors duration-150",
    isActive
      ? "text-accent"
      : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
    item.disabled && "pointer-events-none opacity-40",
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={classes}
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          onNavigate(item.id);
        }}
        aria-disabled={item.disabled}
      >
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.id)}
      disabled={item.disabled}
      className={classes}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span>{item.label}</span>
    </button>
  );
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
  const isActiveControlled = controlledActiveId !== undefined;
  const [internalActiveId, setInternalActiveId] =
    useState(defaultActiveId);
  const activeId = isActiveControlled
    ? controlledActiveId
    : internalActiveId;

  const isCollapsedControlled = controlledCollapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] =
    useState(defaultCollapsed);
  const collapsed = isCollapsedControlled
    ? controlledCollapsed
    : internalCollapsed;

  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  function handleNavigate(id: string) {
    if (!isActiveControlled) setInternalActiveId(id);
    onNavigate?.(id);
  }

  function handleToggleGroup(id: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleToggleCollapsed() {
    const next = !collapsed;
    if (!isCollapsedControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  return (
    <nav
      aria-label="Sidebar navigation"
      className={cn(
        "flex h-full flex-col border-r border-border bg-card",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "w-14" : "w-60",
        className,
      )}
    >
      {header && (
        <div className="border-b border-border p-3">
          {collapsed ? header.collapsedLogo : header.logo}
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            activeId={activeId}
            collapsed={collapsed}
            openGroups={openGroups}
            onToggleGroup={handleToggleGroup}
            onNavigate={handleNavigate}
          />
        ))}
      </div>

      <div className="border-t border-border p-2">
        <button
          type="button"
          onClick={handleToggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex w-full items-center justify-center py-1.5",
            "text-foreground/40 transition-colors duration-150",
            "hover:text-foreground/70",
          )}
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>
    </nav>
  );
}

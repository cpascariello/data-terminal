"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { isItemActive, type NavItem } from "@/types/nav";

interface NavbarProps {
  items: NavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onNavigate?: (id: string) => void;
  logo?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const HOVER_ENTER_DELAY = 150;
const HOVER_LEAVE_DELAY = 100;

function NavbarDropdownItem({
  item,
  isActive,
  onSelect,
}: {
  item: NavItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  const classes = cn(
    "flex w-full items-center gap-2 px-4 py-2.5 text-left",
    "font-display text-xs transition-colors",
    isActive
      ? "bg-accent/10 text-accent"
      : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
    item.disabled && "pointer-events-none opacity-40",
  );

  const content = (
    <>
      {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
      {item.label}
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={classes}
        onClick={onSelect}
        aria-disabled={item.disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onSelect}
      disabled={item.disabled}
    >
      {content}
    </button>
  );
}

function NavbarTrigger({
  item,
  hasChildren,
  active,
  open,
  onTopLevelClick,
  onNavigate,
}: {
  item: NavItem;
  hasChildren: boolean;
  active: boolean;
  open: boolean;
  onTopLevelClick: () => void;
  onNavigate: (id: string) => void;
}) {
  const activeStyles = active
    ? "text-accent border-b-2 border-accent"
    : "text-foreground/60 border-b-2 border-transparent";

  const activeGlow = active
    ? { textShadow: "0 0 8px var(--accent-glow-line)" }
    : undefined;

  const classes = cn(
    "flex items-center gap-1 px-3 py-2",
    "font-display text-xs uppercase tracking-widest",
    "transition-colors hover:text-foreground",
    activeStyles,
    item.disabled && "pointer-events-none opacity-40",
  );

  const content = (
    <>
      {item.icon && <span className="size-4">{item.icon}</span>}
      {item.label}
      {hasChildren && (
        <ChevronDown
          size={14}
          className={cn(
            "text-foreground/30 transition-transform",
            open && "rotate-180",
          )}
        />
      )}
    </>
  );

  if (item.href && !hasChildren) {
    return (
      <a
        href={item.href}
        className={classes}
        style={activeGlow}
        onClick={() => onNavigate(item.id)}
        aria-disabled={item.disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      style={activeGlow}
      onClick={onTopLevelClick}
      disabled={item.disabled}
      aria-expanded={hasChildren ? open : undefined}
    >
      {content}
    </button>
  );
}

interface NavbarItemProps {
  item: NavItem;
  activeId: string;
  onNavigate: (id: string) => void;
}

function NavbarItem({ item, activeId, onNavigate }: NavbarItemProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const hasChildren = item.children && item.children.length > 0;
  const active = isItemActive(item, activeId);

  const clearTimeouts = useCallback(() => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!hasChildren) return;
    clearTimeouts();
    enterTimeoutRef.current = setTimeout(
      () => setOpen(true),
      HOVER_ENTER_DELAY,
    );
  }, [hasChildren, clearTimeouts]);

  const handleMouseLeave = useCallback(() => {
    if (!hasChildren) return;
    clearTimeouts();
    leaveTimeoutRef.current = setTimeout(
      () => setOpen(false),
      HOVER_LEAVE_DELAY,
    );
  }, [hasChildren, clearTimeouts]);

  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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

  function handleTopLevelClick() {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else {
      onNavigate(item.id);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavbarTrigger
        item={item}
        hasChildren={!!hasChildren}
        active={active}
        open={open}
        onTopLevelClick={handleTopLevelClick}
        onNavigate={onNavigate}
      />

      {hasChildren && open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-0.5 min-w-48",
            "border border-border bg-card shadow-lg",
          )}
        >
          {item.children!.map((child) => (
            <NavbarDropdownItem
              key={child.id}
              item={child}
              isActive={child.id === activeId}
              onSelect={() => {
                onNavigate(child.id);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
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

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 w-full",
        "border-b border-border bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="flex items-center px-4">
        {logo && <div className="mr-4 shrink-0">{logo}</div>}

        <div className="flex items-center gap-1">
          {items.map((item) => (
            <NavbarItem
              key={item.id}
              item={item}
              activeId={activeId}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {actions && <div className="ml-auto shrink-0">{actions}</div>}
      </div>
    </nav>
  );
}

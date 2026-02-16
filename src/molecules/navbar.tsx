"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useDismiss } from "@/hooks/use-dismiss";
import {
  isItemActive,
  type MegaDropdownConfig,
  type MegaDropdownFeatured,
  type NavItem,
} from "@/types/nav";

export interface NavbarProps {
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

function handleDropdownKeyDown(e: React.KeyboardEvent) {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const items = e.currentTarget.querySelectorAll<HTMLElement>(
      '[role="menuitem"]',
    );
    if (!items.length) return;
    const currentIndex = Array.from(items).findIndex(
      (el) => el === document.activeElement,
    );
    const nextIndex =
      e.key === "ArrowDown"
        ? Math.min(currentIndex + 1, items.length - 1)
        : Math.max(currentIndex - 1, 0);
    items[nextIndex]?.focus();
  }
}

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
        role="menuitem"
        className={classes}
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          onSelect();
        }}
        aria-disabled={item.disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      className={classes}
      onClick={onSelect}
      disabled={item.disabled}
    >
      {content}
    </button>
  );
}

function NavbarMegaLink({
  item,
  isActive,
  onSelect,
}: {
  item: NavItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  const classes = cn(
    "flex items-center gap-2 py-1.5 font-display text-xs uppercase tracking-wider transition-colors",
    isActive
      ? "text-accent"
      : "text-foreground/50 hover:text-foreground",
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
        onClick={(e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          onSelect();
        }}
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

function NavbarMegaFeatured({
  item,
}: {
  item: MegaDropdownFeatured;
}) {
  const content = (
    <div className="group/featured overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden bg-foreground/[0.03]">
        <img
          src={item.image}
          alt={item.title}
          className="size-full object-cover transition-transform duration-500 group-hover/featured:scale-105"
        />
      </div>
      <div className="mt-3">
        <p className="font-display text-xs uppercase tracking-wider text-foreground">
          {item.title}
        </p>
        {item.subtitle && (
          <p className="mt-1 text-xs text-foreground/40">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} aria-label={item.title}>
        {content}
      </a>
    );
  }

  return content;
}

function NavbarMegaDropdown({
  mega,
  activeId,
  onNavigate,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  mega: MegaDropdownConfig;
  activeId: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const hasFeatured = mega.featured && mega.featured.length > 0;
  const hasLinks = mega.links && mega.links.length > 0;

  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 w-full",
        "border-b border-border bg-background shadow-lg",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          "flex",
          hasFeatured ? "flex-row" : "flex-col",
        )}
      >
        {/* Left column: heading + links or description */}
        <div
          className={cn(
            "shrink-0 px-8 py-8",
            hasFeatured
              ? "w-64 border-r border-border bg-foreground/[0.02]"
              : "w-full",
          )}
        >
          {mega.heading && (
            <p className="mb-4 font-display text-[10px] uppercase tracking-widest text-foreground/30">
              {mega.heading}
            </p>
          )}
          {mega.description && (
            <p className="mb-4 text-sm leading-relaxed text-foreground/60">
              {mega.description}
            </p>
          )}
          {hasLinks && (
            <div className="flex flex-col gap-0.5">
              {mega.links!.map((link) => (
                <NavbarMegaLink
                  key={link.id}
                  item={link}
                  isActive={link.id === activeId}
                  onSelect={() => {
                    onNavigate(link.id);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right area: featured items */}
        {hasFeatured && (
          <div className="flex-1 px-8 py-8">
            <div
              className={cn(
                "grid gap-8",
                mega.featured!.length === 1
                  ? "grid-cols-1 max-w-sm"
                  : "grid-cols-2",
              )}
            >
              {mega.featured!.map((feat) => (
                <NavbarMegaFeatured key={feat.id} item={feat} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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
      aria-haspopup={hasChildren ? "menu" : undefined}
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
  const hasMega = !!item.mega;
  const hasChildren = hasMega || (item.children && item.children.length > 0);
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

  const handleClose = useCallback(() => setOpen(false), []);
  useDismiss(containerRef, handleClose, open);

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
      className={hasMega ? "static" : "relative"}
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
        hasMega ? (
          <NavbarMegaDropdown
            mega={item.mega!}
            activeId={activeId}
            onNavigate={onNavigate}
            onClose={() => setOpen(false)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ) : (
          <div
            role="menu"
            className={cn(
              "absolute left-0 top-full z-50 mt-0.5 min-w-48",
              "border border-border bg-card shadow-lg",
            )}
            onKeyDown={handleDropdownKeyDown}
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
        )
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
      aria-label="Main navigation"
      className={cn(
        "relative sticky top-0 z-40 w-full",
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

"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@dt/lib/cn";
import { useDismiss } from "@dt/hooks/use-dismiss";
import type { ReactNode } from "react";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string | undefined;
  width?: number | undefined;
  /** Slot for custom header content. When provided, replaces the default title bar. */
  header?: ReactNode | undefined;
  /** Slot for overlay effects (e.g. scanline) */
  overlay?: ReactNode | undefined;
  /** Wraps the panel element (e.g. CornerNotch) */
  wrapper?: ((panel: ReactNode) => ReactNode) | undefined;
  /** Sticky footer slot (e.g. wizard footer) */
  footer?: ReactNode | undefined;
  children: ReactNode;
  className?: string | undefined;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function useFocusTrap(
  panelRef: React.RefObject<HTMLDivElement | null>,
  active: boolean,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !panel) return;

      const els = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (els.length === 0) return;

      const firstEl = els[0]!;
      const lastEl = els[els.length - 1]!;

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [active, panelRef]);
}

export function Drawer({
  open,
  onClose,
  title,
  width = 460,
  header,
  overlay,
  wrapper,
  footer,
  children,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useFocusTrap(panelRef, open);
  useDismiss(panelRef, onClose, open);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const defaultHeader = (
    <div className="flex items-center border-b border-border">
      {title && (
        <span className="flex-1 px-4 py-2 font-display text-xs tracking-widest text-foreground/50">
          {title}
        </span>
      )}
      <button
        onClick={onClose}
        className={cn(
          "shrink-0 px-4 py-2",
          "text-foreground/30 transition-colors",
          "hover:text-foreground/60",
          !title && "ml-auto",
        )}
        aria-label="Close drawer"
      >
        <X size={14} />
      </button>
    </div>
  );

  const panel = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "border-l border-border bg-foreground/[0.02]",
        "shadow-[0_0_30px_-5px_var(--accent-hover-shadow)]",
        className,
      )}
    >
      {header !== undefined ? (
        <div className="flex items-center">
          <div className="flex-1">{header}</div>
          <button
            onClick={onClose}
            className={cn(
              "shrink-0 border-b border-border px-4 py-2",
              "text-foreground/30 transition-colors",
              "hover:text-foreground/60",
            )}
            aria-label="Close drawer"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        defaultHeader
      )}

      <div className="flex-1 overflow-y-auto p-6">{children}</div>

      {footer && (
        <div className="border-t border-border p-4">{footer}</div>
      )}

      {overlay}
    </div>
  );

  const wrappedPanel = wrapper ? wrapper(panel) : panel;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[45]",
        "bg-black/40 backdrop-blur-sm",
        "transition-opacity duration-300 ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        ref={panelRef}
        className={cn(
          "absolute right-0 top-0 h-full",
          "transition-transform duration-300 ease-out",
          visible ? "translate-x-0" : "translate-x-full",
        )}
        style={{ width: `${width}px` }}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Drawer"}
      >
        {wrappedPanel}
      </div>
    </div>
  );
}

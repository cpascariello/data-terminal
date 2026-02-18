"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@dt/lib/cn";
import { useDismiss } from "@dt/hooks/use-dismiss";
import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string | undefined;
  size?: "sm" | "md" | "lg";
  /** Slot for custom header content. When provided, replaces the default title bar. */
  header?: ReactNode | undefined;
  /** Slot for overlay effects (e.g. scanline) */
  overlay?: ReactNode | undefined;
  /** Wraps the panel element (e.g. CornerNotch) */
  wrapper?: ((panel: ReactNode) => ReactNode) | undefined;
  children: ReactNode;
  className?: string | undefined;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-3xl",
} as const;

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

export function Modal({
  open,
  onClose,
  title,
  size = "md",
  header,
  overlay,
  wrapper,
  children,
  className,
}: ModalProps) {
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

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
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
        aria-label="Close dialog"
      >
        <X size={14} />
      </button>
    </div>
  );

  const panel = (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden",
        "border border-border bg-foreground/[0.02]",
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
            aria-label="Close dialog"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        defaultHeader
      )}

      <div className="flex-1 p-6">{children}</div>

      {overlay}
    </div>
  );

  const wrappedPanel = wrapper ? wrapper(panel) : panel;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/60 backdrop-blur-sm",
        "transition-opacity duration-150 ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        ref={panelRef}
        className={cn(
          "w-full transition-all duration-150 ease-out",
          sizeClasses[size],
          visible
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
      >
        {wrappedPanel}
      </div>
    </div>,
    document.body,
  );
}

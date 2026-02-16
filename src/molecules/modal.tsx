"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";
import { CornerNotch } from "@/atoms/corner-notch";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
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
  children,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useFocusTrap(panelRef, open);

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

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleEscape]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  if (!open) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/60 backdrop-blur-sm",
        "transition-opacity duration-150 ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={title ?? "Dialog"}
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
      >
        <CornerNotch>
          <div
            className={cn(
              "group relative flex flex-col overflow-hidden",
              "border border-border bg-foreground/[0.02]",
              "shadow-[0_0_30px_-5px_var(--accent-hover-shadow)]",
              className,
            )}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <TerminalTopBar tag={title} dotsPosition="right" />
              </div>
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

            <div className="flex-1 p-6">{children}</div>

            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                "opacity-0 transition-opacity group-hover:opacity-100",
              )}
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, var(--accent-scan) 50%, transparent 100%)",
                animation: "terminal-scan 1.5s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </div>
        </CornerNotch>
      </div>
    </div>,
    document.body,
  );
}

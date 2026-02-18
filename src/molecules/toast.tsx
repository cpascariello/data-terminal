"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@dt/lib/cn";
import { useToast } from "@dt/providers/toast-provider";
import type { Toast } from "@dt/providers/toast-provider";
import { X } from "lucide-react";
import {
  variantStyles,
  variantIcons,
  variantIconColor,
} from "@dt/lib/feedback-variants";
import { HoverScanline } from "@dt/atoms/hover-scanline";

const variantProgressColor: Record<Toast["variant"], string> = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-accent",
};

export interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [exiting, setExiting] = useState(false);
  const [entered, setEntered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const Icon = variantIcons[toast.variant];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setExiting(true);
    }, toast.duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.duration]);

  function handleTransitionEnd() {
    if (exiting) onDismiss(toast.id);
  }

  function handleDismiss() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setExiting(true);
  }

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-80 items-start gap-2.5",
        "overflow-hidden border border-border border-l-4 p-3",
        "transition-all duration-300 ease-out",
        variantStyles[toast.variant],
        entered && !exiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0",
      )}
      role={toast.variant === "error" || toast.variant === "warning" ? "alert" : "status"}
      onTransitionEnd={handleTransitionEnd}
    >
      <Icon
        size={16}
        className={cn("mt-0.5 shrink-0", variantIconColor[toast.variant])}
      />
      <p className="flex-1 font-display text-sm text-foreground/80">
        {toast.message}
      </p>
      <button
        onClick={handleDismiss}
        className={cn(
          "shrink-0 text-foreground/30",
          "transition-colors hover:text-foreground/60",
        )}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>

      <HoverScanline intensity="subtle" />

      {/* Progress bar countdown */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-0.5 origin-left",
          variantProgressColor[toast.variant],
        )}
        style={{
          animation: entered
            ? `toast-progress ${toast.duration}ms linear forwards`
            : "none",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50",
        "flex flex-col items-end justify-end gap-3 p-6",
      )}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.toReversed().map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={removeToast}
        />
      ))}
    </div>,
    document.body,
  );
}

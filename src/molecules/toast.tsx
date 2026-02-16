"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useToast } from "@/providers/toast-provider";
import type { Toast } from "@/providers/toast-provider";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from "lucide-react";

type ToastVariant = Toast["variant"];

const variantStyles: Record<ToastVariant, string> = {
  success: "border-l-success bg-success/5",
  warning: "border-l-warning bg-warning/5",
  error: "border-l-error bg-error/5",
  info: "border-l-accent bg-accent/5",
};

const variantIcons: Record<ToastVariant, typeof Info> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const variantIconColor: Record<ToastVariant, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-accent",
};

const variantProgressColor: Record<ToastVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-accent",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
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
      role="status"
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

      {/* Scanline hover effect */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "opacity-0 transition-opacity group-hover:opacity-100",
        )}
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--accent-scan-subtle) 50%, transparent 100%)",
          animation: "terminal-scan 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

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

      {/* Inline keyframes for the progress bar */}
      <style>{`
        @keyframes toast-progress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
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

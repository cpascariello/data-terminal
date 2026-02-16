"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import type { ReactNode } from "react";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  success: "border-l-success bg-success/5",
  warning: "border-l-warning bg-warning/5",
  error: "border-l-error bg-error/5",
  info: "border-l-accent bg-accent/5",
};

const variantIcons: Record<AlertVariant, typeof Info> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const variantIconColor: Record<AlertVariant, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-accent",
};

export function Alert({
  children,
  variant = "info",
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  const Icon = variantIcons[variant];

  if (dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    onDismiss?.();
  }

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 overflow-hidden",
        "border border-border border-l-4 p-4",
        variantStyles[variant],
        className,
      )}
      role="alert"
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", variantIconColor[variant])} />
      <div className="flex-1 font-display text-sm text-foreground/80">
        {children}
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 text-foreground/30 transition-colors hover:text-foreground/60"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--accent-scan-subtle) 50%, transparent 100%)",
          animation: "terminal-scan 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import {
  variantStyles,
  variantIcons,
  variantIconColor,
} from "@/lib/feedback-variants";
import type { FeedbackVariant } from "@/lib/feedback-variants";
import { HoverScanline } from "@/atoms/hover-scanline";
import type { ReactNode } from "react";

export interface AlertProps {
  children: ReactNode;
  variant?: FeedbackVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

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
      <HoverScanline intensity="subtle" />
    </div>
  );
}

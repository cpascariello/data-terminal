import { cn } from "@dt/lib/cn";
import type { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  error: "border-error/40 bg-error/10 text-error",
  info: "border-accent/40 bg-accent/10 text-accent",
  neutral: "border-muted-foreground/40 bg-muted/30 text-muted-foreground",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5",
        "font-display text-[10px] uppercase tracking-widest",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

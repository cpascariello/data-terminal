import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CaptionProps {
  children: ReactNode;
  className?: string;
}

export function Caption({ children, className }: CaptionProps) {
  return (
    <span
      className={cn(
        "font-display text-xs uppercase tracking-wide text-foreground/50",
        className,
      )}
    >
      {children}
    </span>
  );
}

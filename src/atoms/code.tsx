import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CodeProps {
  children: ReactNode;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  return (
    <code
      className={cn(
        "rounded-sm border border-border bg-foreground/[0.06] px-1.5 py-0.5",
        "font-mono text-sm text-accent",
        className,
      )}
    >
      {children}
    </code>
  );
}

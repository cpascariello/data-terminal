import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  intense?: boolean;
}

export function GlowBorder({
  children,
  className,
  intense = false,
}: GlowBorderProps) {
  return (
    <div
      className={cn(
        intense ? "terminal-glow-border-intense" : "terminal-glow-border",
        className,
      )}
    >
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@dt/lib/cn";

interface CornerNotchProps {
  children: ReactNode;
  className?: string;
  size?: number;
}

export function CornerNotch({
  children,
  className,
  size = 16,
}: CornerNotchProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        clipPath: `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)`,
      }}
    >
      {children}
    </div>
  );
}

import { cn } from "@dt/lib/cn";
import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  /** Slot for header content (e.g. title bar, terminal top bar) */
  header?: ReactNode | undefined;
  /** Slot for overlay effects (e.g. scanline, shimmer) */
  overlay?: ReactNode | undefined;
  /** Wraps the entire card element (e.g. CornerNotch) */
  wrapper?: ((card: ReactNode) => ReactNode) | undefined;
  /** Enables hover glow and border animation. Use for clickable/selectable cards only. */
  interactive?: boolean | undefined;
  className?: string | undefined;
}

export function Card({
  children,
  header,
  overlay,
  wrapper,
  interactive = false,
  className,
}: CardProps) {
  const card = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "border border-border bg-foreground/[0.02]",
        interactive &&
          "transition-all hover:border-border-hover hover:shadow-[0_0_30px_-5px_var(--accent-hover-shadow)]",
        className,
      )}
    >
      {header}

      <div className="flex flex-1 flex-col">{children}</div>

      {overlay}
    </div>
  );

  if (wrapper) {
    return wrapper(card);
  }

  return card;
}

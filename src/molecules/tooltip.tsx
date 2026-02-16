"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode, ReactElement } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: [
    "left-1/2 -translate-x-1/2 top-full",
    "border-l-transparent border-r-transparent border-b-transparent",
    "border-t-[var(--background)]",
  ].join(" "),
  bottom: [
    "left-1/2 -translate-x-1/2 bottom-full",
    "border-l-transparent border-r-transparent border-t-transparent",
    "border-b-[var(--background)]",
  ].join(" "),
  left: [
    "top-1/2 -translate-y-1/2 left-full",
    "border-t-transparent border-b-transparent border-r-transparent",
    "border-l-[var(--background)]",
  ].join(" "),
  right: [
    "top-1/2 -translate-y-1/2 right-full",
    "border-t-transparent border-b-transparent border-l-transparent",
    "border-r-[var(--background)]",
  ].join(" "),
};

const transitionOrigin: Record<TooltipPosition, string> = {
  top: "translate-y-1 opacity-0",
  bottom: "-translate-y-1 opacity-0",
  left: "translate-x-1 opacity-0",
  right: "-translate-x-1 opacity-0",
};

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 200,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(
    (withDelay: boolean) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (withDelay && delay > 0) {
        timeoutRef.current = setTimeout(() => setVisible(true), delay);
      } else {
        setVisible(true);
      }
    },
    [delay],
  );

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => show(true)}
      onMouseLeave={hide}
      onFocus={() => show(false)}
      onBlur={hide}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 w-max max-w-xs",
          "border border-accent/30 bg-[var(--background)]",
          "px-2.5 py-1.5",
          "font-display text-[10px] uppercase tracking-widest",
          "text-foreground/80",
          "shadow-[0_0_8px_-2px_var(--accent-glow)]",
          "transition-all duration-150 ease-out",
          positionStyles[position],
          visible
            ? "translate-0 opacity-100"
            : transitionOrigin[position],
          className,
        )}
      >
        {content}
        <span
          className={cn(
            "absolute block h-0 w-0 border-[5px]",
            arrowStyles[position],
          )}
          aria-hidden="true"
        />
      </span>
    </span>
  );
}

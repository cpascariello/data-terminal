"use client";

import { useEffect, useState } from "react";
import { cn } from "@dt/lib/cn";
import { useScrollProgress } from "@dt/hooks/use-scroll-progress";
import { supportsScrollTimeline } from "@dt/lib/supports-scroll-timeline";

interface ScrollProgressBarProps {
  target?: React.RefObject<HTMLElement | null>;
  position?: "inline" | "fixed";
  showLabel?: boolean;
  glow?: boolean;
  className?: string;
}

export function ScrollProgressBar({
  target,
  position = "inline",
  showLabel = false,
  glow = true,
  className,
}: ScrollProgressBarProps) {
  const [cssSupported, setCssSupported] = useState(false);

  useEffect(() => {
    setCssSupported(supportsScrollTimeline());
  }, []);

  const useCssPath = cssSupported && !target;
  const jsProgress = useScrollProgress(
    target ? { target, enabled: !useCssPath } : { enabled: !useCssPath },
  );

  const percent = Math.round(
    useCssPath ? 0 : jsProgress * 100,
  );
  const isFixed = position === "fixed";
  const barHeight = isFixed ? "h-[3px]" : "h-[2px]";

  return (
    <div
      className={cn(
        "relative w-full",
        isFixed && "fixed top-0 left-0 right-0 z-50",
        className,
      )}
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuenow={useCssPath ? undefined : percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn("w-full overflow-hidden", barHeight)}>
        <div
          className={cn(
            "h-full origin-left bg-accent/60",
            useCssPath
              ? "scroll-progress"
              : "transition-transform duration-100",
          )}
          style={{
            ...(useCssPath
              ? undefined
              : { transform: `scaleX(${jsProgress})` }),
            ...(glow
              ? {
                  boxShadow:
                    "0 0 8px var(--accent-glow), 0 0 2px var(--accent-glow)",
                }
              : undefined),
          }}
        />
      </div>

      {showLabel && !useCssPath && percent > 0 && (
        <span
          className="absolute top-full right-0 mt-1 font-mono text-[10px] text-accent"
          aria-hidden="true"
        >
          {percent}%
        </span>
      )}
    </div>
  );
}

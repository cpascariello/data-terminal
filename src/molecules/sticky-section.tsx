"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import type { ReactNode } from "react";

export interface StickySectionProps {
  steps: number;
  stepHeight?: string;
  children: (state: {
    progress: number;
    activeStep: number;
  }) => ReactNode;
  className?: string;
}

export function StickySection({
  steps,
  stepHeight = "100vh",
  children,
  className,
}: StickySectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress({ target: outerRef });
  const safeSteps = Math.max(steps, 1);
  const activeStep = Math.min(
    Math.floor(progress * safeSteps),
    safeSteps - 1,
  );

  return (
    <div
      ref={outerRef}
      style={{ height: `calc(${steps} * ${stepHeight})` }}
      className={cn(className)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {children({ progress, activeStep })}
      </div>
    </div>
  );
}

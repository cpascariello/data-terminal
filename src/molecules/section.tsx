import { cn } from "@/lib/cn";
import { DotGrid } from "@/atoms/dot-grid";
import { ScanlineOverlay } from "@/atoms/scanline-overlay";
import type { ReactNode } from "react";

type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  dotGrid?: boolean;
  scanlines?: boolean;
  glow?: boolean;
  glowIntense?: boolean;
  id?: string;
}

const spacingStyles: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16 lg:py-20",
  lg: "py-16 md:py-24 lg:py-32",
  xl: "py-24 md:py-32 lg:py-40",
};

export function Section({
  children,
  className,
  spacing = "lg",
  dotGrid = false,
  scanlines = false,
  glow = false,
  glowIntense = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-background text-foreground",
        spacingStyles[spacing],
        glow && "terminal-glow-border",
        glowIntense && "terminal-glow-border-intense",
        className,
      )}
    >
      {dotGrid && <DotGrid />}
      {scanlines && <ScanlineOverlay />}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

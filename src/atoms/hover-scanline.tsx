import { cn } from "@dt/lib/cn";

interface HoverScanlineProps {
  intensity?: "normal" | "subtle";
  speed?: number;
  className?: string;
}

export function HoverScanline({
  intensity = "normal",
  speed = 2,
  className,
}: HoverScanlineProps) {
  const scanVar =
    intensity === "subtle" ? "--accent-scan-subtle" : "--accent-scan";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100",
        className,
      )}
      style={{
        background: `linear-gradient(180deg, transparent 0%, var(${scanVar}) 50%, transparent 100%)`,
        animation: `terminal-scan ${speed}s ease-in-out infinite`,
      }}
      aria-hidden="true"
    />
  );
}

import { cn } from "@dt/lib/cn";

interface ScanlineOverlayProps {
  className?: string;
}

export function ScanlineOverlay({ className }: ScanlineOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 terminal-scanlines",
        className,
      )}
      aria-hidden="true"
    />
  );
}

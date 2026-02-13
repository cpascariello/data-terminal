import { cn } from "@/lib/cn";

interface DotGridProps {
  className?: string;
}

export function DotGrid({ className }: DotGridProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 terminal-grid", className)}
      aria-hidden="true"
    />
  );
}

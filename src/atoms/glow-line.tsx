import { cn } from "@dt/lib/cn";

interface GlowLineProps {
  className?: string;
}

export function GlowLine({ className }: GlowLineProps) {
  return (
    <div
      className={cn("h-px w-full bg-accent/20", className)}
      style={{
        boxShadow: "0 0 8px var(--accent-glow-line)",
      }}
      role="separator"
    />
  );
}

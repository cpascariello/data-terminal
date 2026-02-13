import { cn } from "@/lib/cn";

interface StatusDotProps {
  className?: string;
  speed?: number;
  color?: string;
}

export function StatusDot({
  className,
  speed = 2,
  color = "bg-accent",
}: StatusDotProps) {
  return (
    <span
      className={cn("size-2 rounded-full", color, className)}
      style={{ animation: `terminal-blink ${speed}s ease-in-out infinite` }}
    />
  );
}

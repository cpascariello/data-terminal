import { cn } from "@/lib/cn";

type StatusDotVariant = "success" | "warning" | "error" | "info" | "neutral";

export interface StatusDotProps {
  className?: string;
  speed?: number;
  variant?: StatusDotVariant;
}

const variantBg: Record<StatusDotVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-accent",
  neutral: "bg-foreground/40",
};

export function StatusDot({
  className,
  speed = 2,
  variant = "info",
}: StatusDotProps) {
  return (
    <span
      className={cn("size-2 rounded-full", variantBg[variant], className)}
      style={{ animation: `terminal-blink ${speed}s ease-in-out infinite` }}
      aria-hidden="true"
    />
  );
}

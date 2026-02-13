import { cn } from "@/lib/cn";

type GradientVariant = "main" | "accent";

interface TextGradientProps {
  children: React.ReactNode;
  variant?: GradientVariant;
  className?: string;
}

export function TextGradient({
  children,
  variant = "main",
  className,
}: TextGradientProps) {
  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{ backgroundImage: `var(--gradient-${variant})` }}
    >
      {children}
    </span>
  );
}

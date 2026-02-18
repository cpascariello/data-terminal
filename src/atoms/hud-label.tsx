import { cn } from "@dt/lib/cn";

interface HudLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function HudLabel({ children, className }: HudLabelProps) {
  return (
    <span
      className={cn(
        "font-display text-[10px] tracking-widest text-accent/60",
        className,
      )}
    >
      {children}
    </span>
  );
}

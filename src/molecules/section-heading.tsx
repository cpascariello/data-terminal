import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  cursor?: boolean;
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  cursor = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(className)}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {children}
        {cursor && <BlinkingCursor variant="line" />}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-lg text-foreground/50">{subtitle}</p>
      )}
    </div>
  );
}

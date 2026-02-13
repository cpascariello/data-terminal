import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  cursor?: boolean;
  as?: HeadingLevel;
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  cursor = true,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(className)}>
      <Tag className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {children}
        {cursor && <BlinkingCursor variant="line" />}
      </Tag>
      {subtitle && (
        <p className="mt-4 max-w-lg text-foreground/50">{subtitle}</p>
      )}
    </div>
  );
}

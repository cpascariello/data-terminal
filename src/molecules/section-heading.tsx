import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";
import { Heading } from "@/atoms/heading";
import type { ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

const levelMap: Record<HeadingLevel, 1 | 2 | 3 | 4> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
};

export interface SectionHeadingProps {
  children: ReactNode;
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
      <Heading level={levelMap[Tag]} className="text-3xl md:text-4xl">
        {children}
        {cursor && <BlinkingCursor variant="line" />}
      </Heading>
      {subtitle && (
        <p className="mt-4 max-w-lg text-foreground/50">{subtitle}</p>
      )}
    </div>
  );
}

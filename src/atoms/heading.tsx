import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
}

const levelStyles: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight md:text-5xl",
  2: "text-3xl font-bold tracking-tight md:text-4xl",
  3: "text-2xl font-semibold tracking-tight md:text-3xl",
  4: "text-xl font-semibold md:text-2xl",
};

export function Heading({ level, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={cn("font-heading text-foreground", levelStyles[level], className)}>
      {children}
    </Tag>
  );
}

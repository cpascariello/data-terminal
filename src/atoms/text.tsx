import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type TextVariant = "body" | "large" | "small" | "muted";
type TextElement = "p" | "span";

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  as?: TextElement;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  body: "text-base text-foreground/80",
  large: "text-lg text-foreground/80",
  small: "text-sm text-foreground/60",
  muted: "text-base text-muted-foreground",
};

export function Text({
  children,
  variant = "body",
  as: Tag = "p",
  className,
}: TextProps) {
  return (
    <Tag className={cn("font-sans", variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}

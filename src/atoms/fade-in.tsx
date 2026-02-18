"use client";

import { cn } from "@dt/lib/cn";
import { useInView } from "@dt/hooks/use-in-view";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionClasses = {
  up: (d: number) => `translateY(${d}px)`,
  down: (d: number) => `translateY(${-d}px)`,
  left: (d: number) => `translateX(${d}px)`,
  right: (d: number) => `translateX(${-d}px)`,
  none: () => "none",
} satisfies Record<Direction, (d: number) => string>;

function buildFadeStyle(
  hidden: boolean,
  transform: string,
  duration: number,
  delay: number,
): React.CSSProperties {
  const style: React.CSSProperties = {
    opacity: hidden ? 0 : 1,
    transform: hidden ? transform : "none",
    transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
  };
  if (delay > 0) {
    style.transitionDelay = `${delay}s`;
  }
  return style;
}

export function FadeIn({
  children,
  className,
  direction = "up",
  distance = 20,
  delay = 0,
  duration = 0.6,
  once = true,
}: FadeInProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once });

  const hidden = !isInView;
  const transform = directionClasses[direction](distance);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={buildFadeStyle(hidden, transform, duration, delay)}
    >
      {children}
    </div>
  );
}

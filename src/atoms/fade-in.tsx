"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

function getHiddenTransform(
  direction: FadeInProps["direction"],
  distance: number,
): string {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(${-distance}px)`;
    case "left":
      return `translateX(${distance}px)`;
    case "right":
      return `translateX(${-distance}px)`;
    default:
      return "none";
  }
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
  const transform = getHiddenTransform(direction, distance);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? transform : "none",
        transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
        ...(delay > 0 && { transitionDelay: `${delay}s` }),
      }}
    >
      {children}
    </div>
  );
}

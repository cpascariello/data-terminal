"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";

interface TypewriterTextProps {
  children: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({
  children,
  speed = 50,
  delay = 0,
  onComplete,
  className,
}: TypewriterTextProps) {
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCharCount(children.length);
      setStarted(true);
      onComplete?.();
      return;
    }

    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay, children.length, onComplete]);

  useEffect(() => {
    if (!started || charCount >= children.length) return;

    const timer = setTimeout(() => {
      setCharCount((c) => {
        const next = c + 1;
        if (next >= children.length) onComplete?.();
        return next;
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [started, charCount, children.length, speed, onComplete]);

  if (!started) {
    return (
      <span className={cn("text-foreground", className)}>
        <BlinkingCursor variant="block" />
      </span>
    );
  }

  return (
    <span className={cn("text-foreground", className)}>
      {children.slice(0, charCount)}
      <BlinkingCursor variant="block" />
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface TextFlickerProps {
  children: string;
  className?: string;
}

export function TextFlicker({ children, className }: TextFlickerProps) {
  const [flickering, setFlickering] = useState<Set<number>>(new Set());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const nonSpaceIndices = [...children].reduce<number[]>(
      (acc, char, i) => {
        if (char !== " ") acc.push(i);
        return acc;
      },
      [],
    );

    if (nonSpaceIndices.length === 0) return;

    let active = true;

    function scheduleFlicker() {
      if (!active) return;
      const delay = 400 + Math.random() * 800;

      setTimeout(() => {
        if (!active) return;

        const count = Math.random() > 0.4 ? 2 : 1;
        const picks = new Set<number>();
        const pool = [...nonSpaceIndices];

        for (let i = 0; i < count && pool.length > 0; i++) {
          const idx = Math.floor(Math.random() * pool.length);
          picks.add(pool[idx]!);
          pool.splice(idx, 1);
        }

        setFlickering(picks);

        setTimeout(() => {
          if (!active) return;
          setFlickering(new Set());
        }, 50 + Math.random() * 50);

        scheduleFlicker();
      }, delay);
    }

    scheduleFlicker();
    return () => {
      active = false;
    };
  }, [children]);

  return (
    <span className={cn("text-accent", className)}>
      {[...children].map((char, i) => (
        <span
          key={i}
          className={flickering.has(i) ? "opacity-0" : undefined}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

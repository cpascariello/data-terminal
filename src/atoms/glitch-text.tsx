"use client";

import { useEffect, useState } from "react";
import { cn } from "@dt/lib/cn";

const GLITCH_CHARS = "$%#@&!0";

interface GlitchTextProps {
  children: string;
  className?: string;
}

interface GlitchState {
  index: number;
  char: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  const [glitching, setGlitching] = useState<GlitchState[]>([]);

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

    function scheduleGlitch() {
      if (!active) return;
      const delay = 800 + Math.random() * 1200;

      setTimeout(() => {
        if (!active) return;

        const count = 1 + Math.floor(Math.random() * 3);
        const pool = [...nonSpaceIndices];
        const picks: GlitchState[] = [];

        for (let i = 0; i < count && pool.length > 0; i++) {
          const idx = Math.floor(Math.random() * pool.length);
          const charIdx = pool[idx]!;
          pool.splice(idx, 1);
          picks.push({
            index: charIdx,
            char: GLITCH_CHARS[
              Math.floor(Math.random() * GLITCH_CHARS.length)
            ]!,
          });
        }

        setGlitching(picks);

        setTimeout(() => {
          if (!active) return;
          setGlitching([]);
        }, 60 + Math.random() * 40);

        scheduleGlitch();
      }, delay);
    }

    scheduleGlitch();
    return () => {
      active = false;
    };
  }, [children]);

  const glitchMap = new Map(glitching.map((g) => [g.index, g.char]));

  return (
    <span className={cn("text-foreground", className)} aria-label={children}>
      {[...children].map((char, i) => {
        const replacement = glitchMap.get(i);
        if (replacement) {
          return (
            <span
              key={i}
              className="inline-block text-accent"
              style={{ transform: "translateX(-2px)" }}
            >
              {replacement}
            </span>
          );
        }
        return char;
      })}
    </span>
  );
}

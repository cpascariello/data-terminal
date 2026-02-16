"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const HEX_CHARS = "0123456789ABCDEF";
const ROWS = 20;

interface DataStreamProps {
  columns?: number;
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speedDurations: Record<DataStreamProps["speed"] & string, number> = {
  slow: 12,
  normal: 8,
  fast: 4,
};

function randomHexColumn(rows: number): string {
  return Array.from(
    { length: rows },
    () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]!,
  ).join("\n");
}

export function DataStream({
  columns = 3,
  speed = "normal",
  className,
}: DataStreamProps) {
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const duration = speedDurations[speed];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const intervals: ReturnType<typeof setInterval>[] = [];

    function startIntervals() {
      colRefs.current.forEach((el) => {
        if (!el) return;
        el.textContent = randomHexColumn(ROWS);
        const interval = setInterval(() => {
          el.textContent = randomHexColumn(ROWS);
        }, duration * 1000);
        intervals.push(interval);
      });
    }

    startIntervals();

    function handleVisibility() {
      if (document.hidden) {
        intervals.forEach(clearInterval);
        intervals.length = 0;
      } else {
        startIntervals();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      intervals.forEach(clearInterval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [columns, duration]);

  return (
    <div
      className={cn(
        "pointer-events-none flex gap-4 overflow-hidden font-mono text-[10px] leading-tight text-foreground/15",
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: columns }, (_, i) => (
        <div
          key={i}
          className="whitespace-pre"
          style={{
            animation: `data-stream-scroll ${duration + i * 1.5}s linear infinite`,
          }}
          ref={(el) => {
            colRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}

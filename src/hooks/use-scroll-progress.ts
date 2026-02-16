"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollProgressOptions {
  target?: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

export function useScrollProgress(
  options: UseScrollProgressOptions = {},
): number {
  const { target, enabled = true } = options;
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);
  const lastProgress = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    function onChange(e: MediaQueryListEvent) {
      setReducedMotion(e.matches);
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (reducedMotion) {
      setProgress(1);
      return;
    }

    function update() {
      let next: number;

      if (target?.current) {
        const rect = target.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const total = viewportHeight + rect.height;
        const traversed = viewportHeight - rect.top;
        next = Math.min(Math.max(traversed / total, 0), 1);
      } else {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        next = scrollable > 0
          ? Math.min(window.scrollY / scrollable, 1)
          : 1;
      }

      if (Math.abs(next - lastProgress.current) > 0.005) {
        lastProgress.current = next;
        setProgress(next);
      }
    }

    function onScroll() {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        update();
        rafId.current = 0;
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [target, enabled, reducedMotion]);

  return progress;
}

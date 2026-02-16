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

  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setProgress(1);
      return;
    }

    function update() {
      if (target?.current) {
        const rect = target.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const total = viewportHeight + rect.height;
        const traversed = viewportHeight - rect.top;
        setProgress(Math.min(Math.max(traversed / total, 0), 1));
      } else {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 1);
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
  }, [target, enabled]);

  return progress;
}

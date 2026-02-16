"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
  from?: number;
  to: number;
  /** Duration in milliseconds (default: 2000) */
  duration?: number;
  decimals?: number;
  /** Only start when true (default: true) */
  enabled?: boolean;
}

export function useCountUp({
  from = 0,
  to,
  duration = 2000,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions): string {
  const [value, setValue] = useState(from);
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
      setValue(to);
      return;
    }

    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, enabled, reducedMotion]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}

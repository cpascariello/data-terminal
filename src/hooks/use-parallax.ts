"use client";

import { useEffect, useRef, useState } from "react";

interface UseParallaxOptions {
  /** Parallax speed factor (default: 0.5). 1 = no movement, 0 = full displacement. */
  speed?: number;
  /** Displacement axis (default: "vertical") */
  direction?: "vertical" | "horizontal";
}

const STATIC_STYLE: React.CSSProperties = {};

export function useParallax<T extends HTMLElement = HTMLElement>(
  options: UseParallaxOptions = {},
): { ref: React.RefObject<T | null>; style: React.CSSProperties } {
  const { speed = 0.5, direction = "vertical" } = options;
  const ref = useRef<T>(null);
  const rafId = useRef(0);
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
    if (reducedMotion) {
      if (ref.current) {
        ref.current.style.transform = "";
      }
      return;
    }

    function update() {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (elementCenter - viewportCenter) * (1 - speed);

      const translate =
        direction === "horizontal"
          ? `translateX(${offset}px)`
          : `translateY(${offset}px)`;
      element.style.transform = translate;
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
  }, [speed, direction, reducedMotion]);

  return { ref, style: STATIC_STYLE };
}

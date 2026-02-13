"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Trigger only once (default: true) */
  once?: boolean;
  /** IntersectionObserver rootMargin (default: "-64px") */
  margin?: string;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { once = true, margin = "-64px" } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin: margin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, margin]);

  return { ref, isInView };
}

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TerminalTabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

export function TerminalTabs({
  tabs,
  defaultIndex = 0,
  className,
}: TerminalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [glitching, setGlitching] = useState(false);

  function switchTab(index: number) {
    if (index === activeIndex) return;
    setGlitching(true);
    setActiveIndex(index);
  }

  useEffect(() => {
    if (!glitching) return;
    const timer = setTimeout(() => setGlitching(false), 150);
    return () => clearTimeout(timer);
  }, [glitching]);

  return (
    <div className={cn("border border-border", className)}>
      <div className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => switchTab(i)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 font-display text-[11px] tracking-wider transition-colors",
              i === activeIndex
                ? "border-b-2 border-accent bg-foreground/[0.04] text-foreground"
                : "text-foreground/40 hover:text-foreground/60",
            )}
          >
            <span className="flex gap-0.5">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  i === activeIndex ? "bg-accent/60" : "bg-foreground/10",
                )}
              />
            </span>
            {tab.label}
          </button>
        ))}
      </div>
      <div className={cn("p-4", glitching && "animate-glitch-in")}>
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}

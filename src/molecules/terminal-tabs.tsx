"use client";

import { useState, useEffect, useId } from "react";
import { cn } from "@dt/lib/cn";
import type { ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

export interface TerminalTabsProps {
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
  const baseId = useId();

  function switchTab(index: number) {
    if (index === activeIndex) return;
    setGlitching(true);
    setActiveIndex(index);
  }

  function handleTabKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const nextIndex =
        e.key === "ArrowRight"
          ? (activeIndex + 1) % tabs.length
          : (activeIndex - 1 + tabs.length) % tabs.length;
      switchTab(nextIndex);
      const tabEl = document.getElementById(`${baseId}-tab-${nextIndex}`);
      tabEl?.focus();
    }
  }

  useEffect(() => {
    if (!glitching) return;
    const timer = setTimeout(() => setGlitching(false), 150);
    return () => clearTimeout(timer);
  }, [glitching]);

  const activeTabId = `${baseId}-tab-${activeIndex}`;
  const activePanelId = `${baseId}-panel-${activeIndex}`;

  return (
    <div className={cn("border border-border", className)}>
      <div className="flex border-b border-border" role="tablist">
        {tabs.map((tab, i) => {
          const tabId = `${baseId}-tab-${i}`;
          const panelId = `${baseId}-panel-${i}`;

          return (
            <button
              key={tab.label}
              id={tabId}
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls={panelId}
              tabIndex={i === activeIndex ? 0 : -1}
              onClick={() => switchTab(i)}
              onKeyDown={handleTabKeyDown}
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
          );
        })}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={activeTabId}
        id={activePanelId}
        className={cn("p-4", glitching && "animate-glitch-in")}
      >
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}

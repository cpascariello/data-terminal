"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import {
  DataDisplayTab,
  EffectsTab,
  FeedbackTab,
  FormsTab,
  FoundationsTab,
  NavigationTab,
} from "./tabs";

const TABS = [
  { id: "foundations", label: "Foundations", component: FoundationsTab },
  { id: "data-display", label: "Data Display", component: DataDisplayTab },
  { id: "forms", label: "Forms", component: FormsTab },
  { id: "feedback", label: "Feedback", component: FeedbackTab },
  { id: "navigation", label: "Navigation", component: NavigationTab },
  { id: "effects", label: "Effects", component: EffectsTab },
] as const;

function getInitialTab(): string {
  if (typeof window === "undefined") return TABS[0].id;
  const hash = window.location.hash.slice(1);
  return TABS.some((t) => t.id === hash) ? hash : TABS[0].id;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.slice(1);
      if (TABS.some((t) => t.id === hash)) {
        setActiveTab(hash);
      }
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function selectTab(id: string) {
    setActiveTab(id);
    window.location.hash = id;
    window.scrollTo({ top: 0 });
  }

  const ActiveComponent =
    TABS.find((t) => t.id === activeTab)?.component ?? FoundationsTab;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <span className="font-display text-sm tracking-wider text-accent">
            DATA_TERMINAL
          </span>
          <ThemeSwitcher />
        </div>

        {/* Tab bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="-mb-px flex gap-6 overflow-x-auto"
            aria-label="Component categories"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => selectTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-1 pb-3 font-display text-xs tracking-widest transition-colors ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground/40 hover:text-foreground/60"
                }`}
                style={
                  activeTab === tab.id
                    ? {
                        textShadow:
                          "0 0 8px var(--accent-glow-line)",
                      }
                    : undefined
                }
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <ActiveComponent />
    </main>
  );
}

"use client";

import { useTheme } from "@/hooks/use-theme";
import { THEMES } from "@/providers/theme-provider";
import { cn } from "@/lib/cn";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Theme selector">
      <span className="font-display text-[10px] tracking-widest text-foreground/40">
        THEME:
      </span>
      {THEMES.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
          aria-label={`Switch to ${t} theme`}
          className={cn(
            "font-display text-xs tracking-wider px-3 py-1 border transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            theme === t
              ? "border-accent text-accent bg-accent/10"
              : "border-border text-foreground/50 hover:text-foreground hover:border-foreground/30",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

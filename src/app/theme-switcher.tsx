"use client";

import { useTheme } from "@/hooks/use-theme";
import { THEMES } from "@/providers/theme-provider";
import { cn } from "@/lib/cn";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="font-display text-[10px] tracking-widest text-foreground/40">
        THEME:
      </span>
      {THEMES.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={cn(
            "font-display text-xs tracking-wider px-3 py-1 border transition-colors",
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

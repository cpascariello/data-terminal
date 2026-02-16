# New Components and Micro Animations — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 5 atoms, 4 molecules, and 4 micro animations to the Data Terminal design system.

**Architecture:** All new components follow established patterns: atoms are pure primitives, molecules compose atoms, CSS animations live in `animations.css`, utility classes in `utilities.css`. Components use `cn()` for className merging, theme tokens via CSS custom properties, and respect `prefers-reduced-motion`. No new dependencies.

**Tech Stack:** React, TypeScript, Tailwind CSS 4, Lucide icons (already installed)

**Parallel Execution Strategy:** Work is structured into 4 streams. Streams 2 and 3 contain independent tasks that can run as parallel agents.

---

## Stream 1: CSS Foundation

Must complete before all other streams.

### Task 1: Add keyframes and utility classes

**Files:**
- Modify: `src/theme/animations.css`
- Modify: `src/theme/utilities.css`

**Step 1: Add keyframes to `animations.css`**

Add before the `@media (prefers-reduced-motion)` block:

```css
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glitch-in {
  0% {
    clip-path: inset(0 0 100% 0);
    text-shadow: -2px 0 oklch(0.6 0.2 15), 2px 0 oklch(0.6 0.2 200);
  }
  30% {
    clip-path: inset(0 0 0 0);
    text-shadow: 2px 0 oklch(0.6 0.2 15), -2px 0 oklch(0.6 0.2 200);
  }
  60% {
    clip-path: inset(0 0 0 0);
    text-shadow: -1px 0 oklch(0.6 0.2 15), 1px 0 oklch(0.6 0.2 200);
  }
  100% {
    clip-path: inset(0 0 0 0);
    text-shadow: none;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

@keyframes data-stream-scroll {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes progress-sweep {
  0% { left: -30%; }
  100% { left: 100%; }
}
```

**Step 2: Add utility classes to `utilities.css`**

Add inside `@layer utilities`:

```css
  .animate-reveal {
    animation: reveal-up 0.4s ease-out both;
  }

  .animate-glitch-in {
    animation: glitch-in 0.15s ease-out both;
  }

  .pulse-ring {
    position: relative;
  }

  .pulse-ring::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid var(--accent);
    animation: pulse-ring 1.5s ease-out infinite;
    pointer-events: none;
  }
```

**Step 3: Verify**

Run: `pnpm build`

**Step 4: Commit**

```bash
git add src/theme/animations.css src/theme/utilities.css
git commit -m "feat: add reveal-up, glitch-in, pulse-ring, data-stream, progress-sweep animations"
```

---

## Stream 2: Atoms

All atoms are independent. **Run as parallel agents after Stream 1.**

### Task 2A: TypewriterText

**Files:**
- Create: `src/atoms/typewriter-text.tsx`

**Implementation:**

```tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";

interface TypewriterTextProps {
  children: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({
  children,
  speed = 50,
  delay = 0,
  onComplete,
  className,
}: TypewriterTextProps) {
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCharCount(children.length);
      setStarted(true);
      onComplete?.();
      return;
    }

    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay, children.length, onComplete]);

  useEffect(() => {
    if (!started || charCount >= children.length) return;

    const timer = setTimeout(() => {
      setCharCount((c) => {
        const next = c + 1;
        if (next >= children.length) onComplete?.();
        return next;
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [started, charCount, children.length, speed, onComplete]);

  if (!started) {
    return (
      <span className={cn("text-foreground", className)}>
        <BlinkingCursor variant="block" />
      </span>
    );
  }

  return (
    <span className={cn("text-foreground", className)}>
      {children.slice(0, charCount)}
      <BlinkingCursor variant="block" />
    </span>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 2B: GlitchText

**Files:**
- Create: `src/atoms/glitch-text.tsx`

**Implementation:**

Follow the TextFlicker pattern but instead of opacity changes, swap characters to random symbols and add a slight translateX offset.

```tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const GLITCH_CHARS = "$%#@&!0";

interface GlitchTextProps {
  children: string;
  className?: string;
}

interface GlitchState {
  index: number;
  char: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  const [glitching, setGlitching] = useState<GlitchState[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const nonSpaceIndices = [...children].reduce<number[]>(
      (acc, char, i) => {
        if (char !== " ") acc.push(i);
        return acc;
      },
      [],
    );

    if (nonSpaceIndices.length === 0) return;

    let active = true;

    function scheduleGlitch() {
      if (!active) return;
      const delay = 800 + Math.random() * 1200;

      setTimeout(() => {
        if (!active) return;

        const count = 1 + Math.floor(Math.random() * 3);
        const pool = [...nonSpaceIndices];
        const picks: GlitchState[] = [];

        for (let i = 0; i < count && pool.length > 0; i++) {
          const idx = Math.floor(Math.random() * pool.length);
          const charIdx = pool[idx]!;
          pool.splice(idx, 1);
          picks.push({
            index: charIdx,
            char: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!,
          });
        }

        setGlitching(picks);

        setTimeout(() => {
          if (!active) return;
          setGlitching([]);
        }, 60 + Math.random() * 40);

        scheduleGlitch();
      }, delay);
    }

    scheduleGlitch();
    return () => { active = false; };
  }, [children]);

  const glitchMap = new Map(glitching.map((g) => [g.index, g.char]));
  const isGlitching = glitchMap.size > 0;

  return (
    <span className={cn("text-foreground", className)}>
      {[...children].map((char, i) => {
        const replacement = glitchMap.get(i);
        if (replacement) {
          return (
            <span
              key={i}
              className="text-accent"
              style={{ display: "inline-block", transform: "translateX(-2px)" }}
            >
              {replacement}
            </span>
          );
        }
        return <span key={i}>{char}</span>;
      })}
    </span>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 2C: ProgressBar

**Files:**
- Create: `src/atoms/progress-bar.tsx`

**Implementation:**

```tsx
import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value?: number;
  indeterminate?: boolean;
  className?: string;
}

export function ProgressBar({
  value = 0,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "relative h-4 w-full overflow-hidden border border-border font-display text-[10px]",
        className,
      )}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {indeterminate ? (
        <div
          className="absolute inset-y-0 w-[30%] bg-accent/60"
          style={{ animation: "progress-sweep 1.5s ease-in-out infinite" }}
        />
      ) : (
        <div
          className="h-full bg-accent/60 transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
        />
      )}
      <div
        className="absolute inset-0 flex items-center justify-center text-foreground/60"
        style={{ mixBlendMode: "difference" }}
      >
        {indeterminate ? "LOADING" : `${Math.round(clamped)}%`}
      </div>
    </div>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 2D: Badge

**Files:**
- Create: `src/atoms/badge.tsx`

**Implementation:**

```tsx
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  error: "border-error/40 bg-error/10 text-error",
  info: "border-accent/40 bg-accent/10 text-accent",
  neutral: "border-muted-foreground/40 bg-muted/30 text-muted-foreground",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5",
        "font-display text-[10px] uppercase tracking-widest",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 2E: DataStream

**Files:**
- Create: `src/atoms/data-stream.tsx`

**Implementation:**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const HEX_CHARS = "0123456789ABCDEF";
const ROWS = 20;

interface DataStreamProps {
  columns?: number;
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speedDurations = { slow: 12, normal: 8, fast: 4 };

function randomHexColumn(rows: number): string {
  return Array.from(
    { length: rows },
    () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
  ).join("\n");
}

export function DataStream({
  columns = 3,
  speed = "normal",
  className,
}: DataStreamProps) {
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const duration = speedDurations[speed];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const intervals: ReturnType<typeof setInterval>[] = [];

    colRefs.current.forEach((el) => {
      if (!el) return;
      el.textContent = randomHexColumn(ROWS);
      const interval = setInterval(() => {
        el.textContent = randomHexColumn(ROWS);
      }, duration * 1000);
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [columns, duration]);

  return (
    <div
      className={cn(
        "pointer-events-none flex gap-4 overflow-hidden font-mono text-[10px] leading-tight text-foreground/15",
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: columns }, (_, i) => (
        <div
          key={i}
          className="whitespace-pre"
          style={{
            animation: `data-stream-scroll ${duration + i * 1.5}s linear infinite`,
          }}
          ref={(el) => { colRefs.current[i] = el; }}
        />
      ))}
    </div>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 2F: Update atom barrel exports

**Files:**
- Modify: `src/atoms/index.ts`

Add after existing exports:

```ts
export { Badge } from "./badge";
export { DataStream } from "./data-stream";
export { GlitchText } from "./glitch-text";
export { ProgressBar } from "./progress-bar";
export { TypewriterText } from "./typewriter-text";
```

**Verify:** `pnpm typecheck`

**Commit:**

```bash
git add src/atoms/ src/theme/
git commit -m "feat: add TypewriterText, GlitchText, ProgressBar, Badge, DataStream atoms and CSS animations"
```

---

## Stream 3: Molecules

All molecules are independent. **Run as parallel agents after Stream 2.**

### Task 3A: Alert

**Files:**
- Create: `src/molecules/alert.tsx`

**Implementation:**

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import type { ReactNode } from "react";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  success: "border-l-success bg-success/5",
  warning: "border-l-warning bg-warning/5",
  error: "border-l-error bg-error/5",
  info: "border-l-accent bg-accent/5",
};

const variantIcons: Record<AlertVariant, typeof Info> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const variantIconColor: Record<AlertVariant, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-accent",
};

export function Alert({
  children,
  variant = "info",
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  const Icon = variantIcons[variant];

  if (dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    onDismiss?.();
  }

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 overflow-hidden",
        "border border-border border-l-4 p-4",
        variantStyles[variant],
        className,
      )}
      role="alert"
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", variantIconColor[variant])} />
      <div className="flex-1 font-display text-sm text-foreground/80">
        {children}
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 text-foreground/30 transition-colors hover:text-foreground/60"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--accent-scan-subtle) 50%, transparent 100%)",
          animation: "terminal-scan 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 3B: TerminalTabs

**Files:**
- Create: `src/molecules/terminal-tabs.tsx`

**Implementation:**

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={contentRef}
        className={cn("p-4", glitching && "animate-glitch-in")}
      >
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 3C: DataTable

**Files:**
- Create: `src/molecules/data-table.tsx`

**Implementation:**

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, ReactNode>[];
  className?: string;
}

type SortDir = "asc" | "desc" | null;

export function DataTable({ columns, rows, className }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  }

  const sortedRows = [...rows];
  if (sortKey && sortDir) {
    sortedRows.sort((a, b) => {
      const aVal = String(a[sortKey] ?? "");
      const bVal = String(b[sortKey] ?? "");
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }

  function sortIndicator(key: string) {
    if (sortKey !== key || !sortDir) return " --";
    return sortDir === "asc" ? " \u25B2" : " \u25BC";
  }

  return (
    <div className={cn("overflow-x-auto border border-border", className)}>
      <table className="w-full font-display text-sm">
        <thead>
          <tr className="border-b border-border bg-foreground/[0.02]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-2 text-left text-[10px] uppercase tracking-[0.2em] text-foreground/40",
                  col.sortable && "cursor-pointer select-none hover:text-foreground/60",
                )}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                {col.label}
                {col.sortable && (
                  <span className="text-accent/60">{sortIndicator(col.key)}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <tr
              key={i}
              className="group relative border-b border-border/50 transition-colors hover:bg-foreground/[0.02]"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-foreground/70">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 3D: CommandInput

**Files:**
- Create: `src/molecules/command-input.tsx`

**Implementation:**

```tsx
"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";

interface CommandInputProps {
  prefix?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
}

export function CommandInput({
  prefix = ">",
  placeholder = "type a command...",
  onSubmit,
  className,
}: CommandInputProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim()) {
      onSubmit?.(value.trim());
      setValue("");
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-border bg-foreground/[0.02] px-4 py-3",
        "cursor-text transition-colors hover:border-border-hover",
        focused && "border-border-hover",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <span className="font-display text-sm text-accent">{prefix}</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={!focused ? placeholder : undefined}
          className={cn(
            "w-full bg-transparent font-display text-sm text-accent outline-none",
            "placeholder:text-foreground/20",
          )}
          style={{ caretColor: "transparent" }}
        />
        {focused && (
          <span className="pointer-events-none absolute top-0" style={{ left: `${value.length}ch` }}>
            <BlinkingCursor variant="line" />
          </span>
        )}
      </div>
    </div>
  );
}
```

**Verify:** `pnpm typecheck`

---

### Task 3E: Update molecule barrel exports

**Files:**
- Modify: `src/molecules/index.ts`

Add after existing exports:

```ts
export { Alert } from "./alert";
export { CommandInput } from "./command-input";
export { DataTable } from "./data-table";
export { TerminalTabs } from "./terminal-tabs";
```

**Verify:** `pnpm typecheck`

**Commit:**

```bash
git add src/molecules/
git commit -m "feat: add Alert, TerminalTabs, DataTable, CommandInput molecules"
```

---

## Stream 4: Showcase Page

Depends on all previous streams.

### Task 4: Update showcase page

**Files:**
- Modify: `src/app/page.tsx`

Add showcase sections for all new components. Add the new atom imports to the existing import block, and new molecule imports. Add sections in this order:

1. **New atoms** — Add cards for TypewriterText, GlitchText, ProgressBar, Badge, DataStream in the existing atoms grid
2. **New molecules** — Add sections after existing molecules for Alert, TerminalTabs, DataTable, CommandInput

**Verify:**

```bash
pnpm typecheck && pnpm build
```

**Commit:**

```bash
git add src/app/page.tsx
git commit -m "feat: add showcase sections for all new components"
```

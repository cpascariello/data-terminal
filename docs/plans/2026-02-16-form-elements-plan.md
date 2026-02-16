# Form Elements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 7 terminal-themed form components (Checkbox, RadioGroup, Toggle, Select, MultiSelect, SearchInput, Textarea) to the Data Terminal design system.

**Architecture:** Each component is a molecule in `src/molecules/`. Uncontrolled state by default, optional `value`/`onChange` for controlled usage. Native HTML elements where possible for accessibility. Optional `label` prop renders `HudLabel`. All styled via CSS custom property tokens.

**Tech Stack:** React 19, TypeScript 5.9, Tailwind CSS 4, lucide-react icons, Next.js 16

---

## Conventions Reference

- Every component uses `"use client"` directive (stateful)
- Import `cn` from `@/lib/cn`
- Import atoms from `@/atoms/specific-atom` (not barrel)
- Import types with `import type`
- Props interface named `{Component}Props`
- Accept `className?: string` on root wrapper
- Use design tokens: `border-border`, `border-border-hover`, `bg-foreground/[0.02]`, `text-accent`, `font-display text-sm`
- Focus pattern: `focused && "border-border-hover"`
- Disabled pattern: `disabled && "pointer-events-none opacity-40"`
- Hover scan effect via inline style `background: linear-gradient(...)` with `var(--accent-scan-subtle)`

---

### Task 1: Create feature branch

**Step 1: Create branch**

```bash
git checkout -b feature/form-elements
```

**Step 2: Verify**

```bash
git branch --show-current
```

Expected: `feature/form-elements`

---

### Task 2: Checkbox component

**Files:**
- Create: `src/molecules/checkbox.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";
import { Check } from "lucide-react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Checkbox({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  children,
  className,
}: CheckboxProps) {
  const id = useId();
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <HudLabel>{label}</HudLabel>}
      <label
        htmlFor={id}
        className={cn(
          "group flex cursor-pointer items-center gap-3",
          disabled && "pointer-events-none opacity-40",
        )}
      >
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="peer sr-only"
          />
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center border transition-colors",
              "border-border bg-foreground/[0.02]",
              "peer-focus-visible:border-border-hover peer-focus-visible:shadow-[0_0_8px_var(--accent-glow)]",
              checked
                ? "border-accent bg-accent/20"
                : "group-hover:border-border-hover",
            )}
          >
            {checked && <Check size={14} className="text-accent" strokeWidth={3} />}
          </div>
        </div>
        {children && (
          <span className="font-display text-sm text-foreground/70">{children}</span>
        )}
      </label>
    </div>
  );
}
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/checkbox.tsx
git commit -m "feat: add Checkbox form component"
```

---

### Task 3: RadioGroup component

**Files:**
- Create: `src/molecules/radio-group.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export function RadioGroup({
  label,
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  disabled = false,
  name,
  className,
}: RadioGroupProps) {
  const groupId = useId();
  const groupName = name ?? groupId;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;

  function handleChange(optionValue: string) {
    if (!isControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
  }

  return (
    <fieldset className={cn("space-y-2", className)}>
      {label && (
        <legend className="mb-1">
          <HudLabel>{label}</HudLabel>
        </legend>
      )}
      <div className="space-y-2">
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isSelected = selected === option.value;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "group flex cursor-pointer items-center gap-3",
                disabled && "pointer-events-none opacity-40",
              )}
            >
              <div className="relative">
                <input
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleChange(option.value)}
                  disabled={disabled}
                  className="peer sr-only"
                />
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                    "border-border bg-foreground/[0.02]",
                    "peer-focus-visible:border-border-hover peer-focus-visible:shadow-[0_0_8px_var(--accent-glow)]",
                    isSelected
                      ? "border-accent"
                      : "group-hover:border-border-hover",
                  )}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent-glow)]" />
                  )}
                </div>
              </div>
              <span className="font-display text-sm text-foreground/70">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/radio-group.tsx
git commit -m "feat: add RadioGroup form component"
```

---

### Task 4: Toggle component

**Files:**
- Create: `src/molecules/toggle.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";

interface ToggleProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Toggle({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  children,
  className,
}: ToggleProps) {
  const id = useId();
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  function handleChange() {
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <HudLabel>{label}</HudLabel>}
      <label
        htmlFor={id}
        className={cn(
          "group inline-flex cursor-pointer items-center gap-3",
          disabled && "pointer-events-none opacity-40",
        )}
      >
        <button
          id={id}
          role="switch"
          type="button"
          aria-checked={checked}
          onClick={handleChange}
          disabled={disabled}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
            "focus-visible:outline-none focus-visible:border-border-hover focus-visible:shadow-[0_0_8px_var(--accent-glow)]",
            checked
              ? "border-accent bg-accent/20"
              : "border-border bg-foreground/[0.02] group-hover:border-border-hover",
          )}
        >
          <span
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full transition-transform",
              checked
                ? "translate-x-5.5 bg-accent shadow-[0_0_8px_var(--accent-glow)]"
                : "translate-x-0.5 bg-foreground/30",
            )}
          />
        </button>
        {children && (
          <span className="font-display text-sm text-foreground/70">{children}</span>
        )}
      </label>
    </div>
  );
}
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/toggle.tsx
git commit -m "feat: add Toggle form component"
```

---

### Task 5: Select component

**Files:**
- Create: `src/molecules/select.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "select...",
  disabled = false,
  className,
}: SelectProps) {
  const id = useId();
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === selected);

  function handleSelect(optionValue: string) {
    if (!isControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      {label && <HudLabel>{label}</HudLabel>}
      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => !disabled && setOpen((prev) => !prev)}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between gap-2 border px-4 py-3",
            "bg-foreground/[0.02] transition-colors",
            "hover:border-border-hover",
            open ? "border-border-hover" : "border-border",
            disabled && "pointer-events-none opacity-40",
          )}
        >
          <span className={cn(
            "font-display text-sm",
            selectedOption ? "text-accent" : "text-foreground/20",
          )}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            size={16}
            className={cn(
              "text-foreground/30 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full border border-border bg-card shadow-lg",
              "max-h-60 overflow-y-auto",
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "flex w-full items-center px-4 py-2.5 text-left font-display text-sm transition-colors",
                  option.value === selected
                    ? "bg-accent/10 text-accent"
                    : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/select.tsx
git commit -m "feat: add Select dropdown component"
```

---

### Task 6: MultiSelect component

**Files:**
- Create: `src/molecules/multi-select.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";
import { Badge } from "@/atoms/badge";
import { ChevronDown, Check } from "lucide-react";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  label,
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = "select...",
  disabled = false,
  className,
}: MultiSelectProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleToggle(optionValue: string) {
    const next = selected.includes(optionValue)
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue];
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selectedLabels = options.filter((o) => selected.includes(o.value));

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      {label && <HudLabel>{label}</HudLabel>}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen((prev) => !prev)}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between gap-2 border px-4 py-3",
            "bg-foreground/[0.02] transition-colors",
            "hover:border-border-hover",
            open ? "border-border-hover" : "border-border",
            disabled && "pointer-events-none opacity-40",
          )}
        >
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((opt) => (
                <Badge key={opt.value} variant="info">{opt.label}</Badge>
              ))
            ) : (
              <span className="font-display text-sm text-foreground/20">
                {placeholder}
              </span>
            )}
          </div>
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 text-foreground/30 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full border border-border bg-card shadow-lg",
              "max-h-60 overflow-y-auto",
            )}
          >
            {options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggle(option.value)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left font-display text-sm transition-colors",
                    isSelected
                      ? "bg-accent/10 text-accent"
                      : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
                      isSelected ? "border-accent bg-accent/20" : "border-border",
                    )}
                  >
                    {isSelected && <Check size={12} className="text-accent" strokeWidth={3} />}
                  </div>
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/multi-select.tsx
git commit -m "feat: add MultiSelect dropdown component"
```

---

### Task 7: SearchInput component

**Files:**
- Create: `src/molecules/search-input.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";
import { BlinkingCursor } from "@/atoms/blinking-cursor";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({
  label,
  placeholder = "search...",
  value: controlledValue,
  defaultValue = "",
  onSearch,
  onChange,
  debounceMs = 300,
  className,
}: SearchInputProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = isControlled ? controlledValue : internalValue;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);

    if (onSearch) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onSearch(next), debounceMs);
    }
  }

  function handleClear() {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onSearch?.("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <HudLabel>{label}</HudLabel>}
      <div
        className={cn(
          "flex items-center gap-2 border border-border bg-foreground/[0.02] px-4 py-3",
          "cursor-text transition-colors hover:border-border-hover",
          focused && "border-border-hover",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <Search size={16} className="shrink-0 text-accent/60" />
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={current}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={!focused ? placeholder : undefined}
            className={cn(
              "w-full bg-transparent font-display text-sm text-accent outline-none",
              "placeholder:text-foreground/20",
            )}
            style={{ caretColor: "transparent" }}
          />
          {focused && (
            <span
              className="pointer-events-none absolute top-0"
              style={{ left: `${current.length}ch` }}
            >
              <BlinkingCursor variant="line" />
            </span>
          )}
        </div>
        {current.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 text-foreground/30 transition-colors hover:text-foreground/60"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/search-input.tsx
git commit -m "feat: add SearchInput component"
```

---

### Task 8: Textarea component

**Files:**
- Create: `src/molecules/textarea.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  rows?: number;
  maxRows?: number;
  autoResize?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Textarea({
  label,
  placeholder = "enter text...",
  value: controlledValue,
  defaultValue = "",
  onChange,
  rows = 4,
  maxRows = 12,
  autoResize = false,
  disabled = false,
  className,
}: TextareaProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = isControlled ? controlledValue : internalValue;
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);

    if (autoResize && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20;
      const maxHeight = lineHeight * maxRows;
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <HudLabel>{label}</HudLabel>}
      <div
        className={cn(
          "border border-border bg-foreground/[0.02] px-4 py-3",
          "cursor-text transition-colors hover:border-border-hover",
          focused && "border-border-hover",
          disabled && "pointer-events-none opacity-40",
        )}
        onClick={() => textareaRef.current?.focus()}
      >
        <textarea
          ref={textareaRef}
          value={current}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={cn(
            "w-full resize-none bg-transparent font-display text-sm text-accent outline-none",
            "placeholder:text-foreground/20",
          )}
        />
      </div>
    </div>
  );
}
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/textarea.tsx
git commit -m "feat: add Textarea form component"
```

---

### Task 9: Update barrel export

**Files:**
- Modify: `src/molecules/index.ts`

**Step 1: Add exports for all 7 new components**

Add these lines to `src/molecules/index.ts` in alphabetical order among the existing exports:

```ts
export { Checkbox } from "./checkbox";
// ... existing exports ...
export { MultiSelect } from "./multi-select";
// ... existing exports ...
export { RadioGroup } from "./radio-group";
export { SearchInput } from "./search-input";
// ... existing exports ...
export { Select } from "./select";
// ... existing exports ...
export { Textarea } from "./textarea";
export { Toggle } from "./toggle";
```

Full file should be:

```ts
export { Alert } from "./alert";
export { Checkbox } from "./checkbox";
export { CommandInput } from "./command-input";
export { DataTable } from "./data-table";
export { MultiSelect } from "./multi-select";
export { ProcessCard } from "./process-card";
export { RadioGroup } from "./radio-group";
export { SearchInput } from "./search-input";
export { Section } from "./section";
export { SectionHeading } from "./section-heading";
export { Select } from "./select";
export { StatCard } from "./stat-card";
export { TerminalCard } from "./terminal-card";
export { TerminalPrompt } from "./terminal-prompt";
export { TerminalTabs } from "./terminal-tabs";
export { TerminalWindow } from "./terminal-window";
export { Textarea } from "./textarea";
export { Toggle } from "./toggle";
```

**Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/molecules/index.ts
git commit -m "feat: export all form components from barrel"
```

---

### Task 10: Add showcase section to page.tsx

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add imports**

Add to the imports from `@/molecules`:

```ts
import {
  Alert,
  Checkbox,
  CommandInput,
  DataTable,
  MultiSelect,
  ProcessCard,
  RadioGroup,
  SearchInput,
  Section,
  SectionHeading,
  Select,
  StatCard,
  TerminalCard,
  TerminalPrompt,
  TerminalTabs,
  TerminalWindow,
  Textarea,
  Toggle,
} from "@/molecules";
```

**Step 2: Add Form Elements showcase section**

Insert this section between the existing "Command Input" section (`id="input"`) and the "CTA Terminal Prompt" section (`id="cta"`):

```tsx
<GlowLine />

{/* Form Elements */}
<Section spacing="lg" dotGrid id="forms">
  <SectionHeading subtitle="Terminal-themed form controls and inputs.">
    Form Elements
  </SectionHeading>

  <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {/* Checkbox */}
    <div className="space-y-3 border border-border p-6">
      <HudLabel>CHECKBOX</HudLabel>
      <div className="space-y-2 pt-2">
        <Checkbox defaultChecked>Enable auto-sync</Checkbox>
        <Checkbox>Verbose logging</Checkbox>
        <Checkbox disabled>Root access (restricted)</Checkbox>
      </div>
    </div>

    {/* RadioGroup */}
    <div className="space-y-3 border border-border p-6">
      <RadioGroup
        label="DEPLOY_TARGET"
        defaultValue="edge"
        options={[
          { value: "edge", label: "Edge nodes" },
          { value: "cloud", label: "Cloud cluster" },
          { value: "hybrid", label: "Hybrid mesh" },
        ]}
      />
    </div>

    {/* Toggle */}
    <div className="space-y-3 border border-border p-6">
      <HudLabel>TOGGLE</HudLabel>
      <div className="space-y-3 pt-2">
        <Toggle defaultChecked>Dark mode</Toggle>
        <Toggle>Notifications</Toggle>
        <Toggle disabled>Maintenance mode</Toggle>
      </div>
    </div>

    {/* Select */}
    <div className="space-y-3 border border-border p-6">
      <Select
        label="REGION"
        placeholder="select region..."
        options={[
          { value: "us-east", label: "US East" },
          { value: "us-west", label: "US West" },
          { value: "eu-central", label: "EU Central" },
          { value: "ap-south", label: "AP South" },
        ]}
      />
    </div>

    {/* MultiSelect */}
    <div className="space-y-3 border border-border p-6">
      <MultiSelect
        label="SERVICES"
        placeholder="select services..."
        options={[
          { value: "compute", label: "Compute" },
          { value: "storage", label: "Storage" },
          { value: "network", label: "Network" },
          { value: "security", label: "Security" },
        ]}
      />
    </div>

    {/* SearchInput */}
    <div className="space-y-3 border border-border p-6">
      <SearchInput label="SEARCH" placeholder="search processes..." />
    </div>
  </div>

  {/* Textarea - full width */}
  <div className="mt-8 max-w-xl border border-border p-6">
    <Textarea
      label="LOG_OUTPUT"
      placeholder="enter log query..."
      rows={4}
      autoResize
    />
  </div>
</Section>
```

**Step 3: Typecheck and build**

Run: `pnpm typecheck && pnpm build`
Expected: No errors

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Form Elements showcase section"
```

---

### Task 11: Update CLAUDE.md component inventory

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Add new components to inventory**

Add to the Molecules section in alphabetical order:

```
- `Checkbox` — styled checkbox with accent glow, optional label via HudLabel, controlled/uncontrolled
- `MultiSelect` — dropdown with checkboxes for multiple selection, Badge chips for selected items
- `RadioGroup` — vertical radio group with accent dot indicator, fieldset with legend label
- `SearchInput` — search input with icon prefix, clear button, optional debounced onSearch
- `Select` — custom dropdown with chevron, positioned panel, outside-click/Escape to close
- `Textarea` — multi-line terminal-styled input, optional auto-resize with maxRows
- `Toggle` — sliding switch with accent glow, accessible via button role="switch"
```

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update component inventory with form elements"
```

---

### Task 12: Update ARCHITECTURE.md

**Files:**
- Modify: `docs/ARCHITECTURE.md`

**Step 1: Add form elements pattern**

Add to the Patterns section:

```markdown
### Form Component Pattern
**Context:** Form controls need consistent styling, accessibility, and state management.
**Approach:** Each form component is uncontrolled by default (internal `useState`) with optional `value`/`onChange` for controlled usage. Native HTML elements (`<input>`, `<button role="switch">`, `<textarea>`, `<fieldset>`) provide keyboard and screen reader support for free. All accept an optional `label` prop that renders `HudLabel` above the control. Dropdowns (Select, MultiSelect) use `useEffect` for outside-click and Escape-key dismissal.
**Key files:** `src/molecules/checkbox.tsx`, `src/molecules/radio-group.tsx`, `src/molecules/toggle.tsx`, `src/molecules/select.tsx`, `src/molecules/multi-select.tsx`, `src/molecules/search-input.tsx`, `src/molecules/textarea.tsx`
**Notes:** The controlled/uncontrolled pattern checks `controlledValue !== undefined` to decide mode. Never default `value` to a string — leave it `undefined` for uncontrolled mode.
```

**Step 2: Commit**

```bash
git add docs/ARCHITECTURE.md
git commit -m "docs: add form component pattern to architecture"
```

---

### Task 13: Final verification

**Step 1: Typecheck**

Run: `pnpm typecheck`
Expected: No errors

**Step 2: Build**

Run: `pnpm build`
Expected: Clean build, no warnings

**Step 3: Visual check**

Run: `pnpm dev`
Verify: Navigate to form elements section, check all components render correctly, test interactions (check/uncheck, select options, type in search, clear search, toggle switches, type in textarea).

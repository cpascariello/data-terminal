"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@dt/lib/cn";
import { HudLabel } from "@dt/atoms/hud-label";
import { BlinkingCursor } from "@dt/atoms/blinking-cursor";
import { Search, X } from "lucide-react";

export interface SearchInputProps {
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
  const id = useId();
  const labelId = `${id}-label`;
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
      {label && <HudLabel><span id={labelId}>{label}</span></HudLabel>}
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
            aria-labelledby={label ? labelId : undefined}
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

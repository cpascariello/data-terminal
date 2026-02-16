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

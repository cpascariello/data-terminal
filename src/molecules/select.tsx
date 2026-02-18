"use client";

import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@dt/lib/cn";
import { HudLabel } from "@dt/atoms/hud-label";
import { useDismiss } from "@dt/hooks/use-dismiss";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
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
  const labelId = `${id}-label`;
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

  const handleClose = useCallback(() => setOpen(false), []);
  useDismiss(containerRef, handleClose, open);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const buttons =
        containerRef.current?.querySelectorAll<HTMLElement>(
          '[role="option"]',
        );
      if (!buttons?.length) return;
      const currentIndex = Array.from(buttons).findIndex(
        (b) => b === document.activeElement,
      );
      const nextIndex =
        e.key === "ArrowDown"
          ? Math.min(currentIndex + 1, buttons.length - 1)
          : Math.max(currentIndex - 1, 0);
      buttons[nextIndex]?.focus();
    }
  }

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      {label && (
        <HudLabel>
          <span id={labelId}>{label}</span>
        </HudLabel>
      )}
      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => !disabled && setOpen((prev) => !prev)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? labelId : undefined}
          className={cn(
            "flex w-full items-center justify-between gap-2 border px-4 py-3",
            "bg-foreground/[0.02] transition-colors",
            "hover:border-border-hover",
            open ? "border-border-hover" : "border-border",
            disabled && "pointer-events-none opacity-40",
          )}
        >
          <span
            className={cn(
              "font-display text-sm",
              selectedOption ? "text-accent" : "text-foreground/20",
            )}
          >
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
            role="listbox"
            onKeyDown={handleKeyDown}
            className={cn(
              "absolute z-50 mt-1 w-full border border-border bg-card shadow-lg",
              "max-h-60 overflow-y-auto",
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === selected}
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

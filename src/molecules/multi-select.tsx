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

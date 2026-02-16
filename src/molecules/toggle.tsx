"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";

export interface ToggleProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
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
          "group flex cursor-pointer items-center gap-3",
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

"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { cn } from "@dt/lib/cn";
import { HudLabel } from "@dt/atoms/hud-label";
import { Check } from "lucide-react";

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
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

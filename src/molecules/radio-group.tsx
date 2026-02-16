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

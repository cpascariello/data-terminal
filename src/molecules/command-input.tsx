"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";

export interface CommandInputProps {
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
          aria-label="Command input"
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

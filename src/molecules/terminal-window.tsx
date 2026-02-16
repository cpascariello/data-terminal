import { cn } from "@/lib/cn";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";
import type { ReactNode } from "react";

export interface TerminalWindowProps {
  label?: string;
  command: string;
  output?: string[];
  children?: ReactNode;
  className?: string;
}

export function TerminalWindow({
  label,
  command,
  output = [],
  children,
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "h-full border border-border bg-foreground/[0.02]",
        className,
      )}
    >
      <TerminalTopBar label={label} dotsPosition="left" />

      <div className="p-4 font-display text-sm">
        <div className="text-accent">$ {command}</div>
        {output.map((line, i) => (
          <div key={`output-${i}`} className="mt-1 text-foreground/40">
            &gt; {line}
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}

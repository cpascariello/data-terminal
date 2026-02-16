import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";

export interface TerminalPromptProps {
  command: string;
  className?: string;
}

export function TerminalPrompt({ command, className }: TerminalPromptProps) {
  return (
    <div className={cn("overflow-hidden border border-border", className)}>
      <TerminalTopBar
        label="terminal"
        dotsPosition="left"
        className="bg-foreground/[0.02]"
      />
      <div className="px-5 py-4 font-display text-sm text-accent sm:text-base">
        $ {command}
        <BlinkingCursor variant="line" className="align-text-bottom" />
      </div>
    </div>
  );
}

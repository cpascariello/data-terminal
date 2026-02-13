import { cn } from "@/lib/cn";
import { BlinkingCursor } from "@/atoms/blinking-cursor";

interface TerminalPromptProps {
  command: string;
  className?: string;
}

export function TerminalPrompt({ command, className }: TerminalPromptProps) {
  return (
    <div className={cn("overflow-hidden border border-border", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-foreground/[0.02] px-4 py-2">
        <span className="size-2 rounded-full bg-foreground/10" />
        <span className="size-2 rounded-full bg-foreground/10" />
        <span className="size-2 rounded-full bg-accent/40" />
        <span className="ml-2 font-display text-[10px] tracking-widest text-foreground/30">
          terminal
        </span>
      </div>
      <div className="px-5 py-4 font-display text-sm text-accent sm:text-base">
        $ {command}
        <BlinkingCursor variant="line" className="align-text-bottom" />
      </div>
    </div>
  );
}

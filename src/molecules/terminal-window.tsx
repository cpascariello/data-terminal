import { cn } from "@/lib/cn";

interface TerminalWindowProps {
  label?: string;
  command: string;
  output?: string[];
  children?: React.ReactNode;
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
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="size-2 rounded-full bg-foreground/10" />
        <span className="size-2 rounded-full bg-foreground/10" />
        <span className="size-2 rounded-full bg-accent/40" />
        {label && (
          <span className="ml-2 font-display text-[10px] tracking-widest text-foreground/30">
            {label}
          </span>
        )}
      </div>

      <div className="p-4 font-display text-sm">
        <div className="text-accent">$ {command}</div>
        {output.map((line, i) => (
          <div key={i} className="mt-1 text-foreground/40">
            &gt; {line}
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}

import { cn } from "@/lib/cn";
import { CornerNotch } from "@/atoms/corner-notch";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";

interface TerminalCardProps {
  children: React.ReactNode;
  className?: string;
  tag?: string;
  label?: string;
  notch?: boolean;
  scanline?: boolean;
}

export function TerminalCard({
  children,
  className,
  tag,
  label,
  notch = true,
  scanline = true,
}: TerminalCardProps) {
  const card = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "border border-border bg-foreground/[0.02]",
        "transition-all hover:border-border-hover hover:shadow-[0_0_30px_-5px_var(--accent-hover-shadow)]",
        className,
      )}
    >
      <TerminalTopBar tag={tag} label={label} dotsPosition="right" />

      <div className="flex flex-1 flex-col">{children}</div>

      {scanline && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, var(--accent-scan) 50%, transparent 100%)",
            animation: "terminal-scan 1.5s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (notch) {
    return <CornerNotch>{card}</CornerNotch>;
  }

  return card;
}

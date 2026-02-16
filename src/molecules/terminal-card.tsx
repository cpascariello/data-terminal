import { cn } from "@/lib/cn";
import { CornerNotch } from "@/atoms/corner-notch";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";
import { HoverScanline } from "@/atoms/hover-scanline";
import type { ReactNode } from "react";

interface TerminalCardProps {
  children: ReactNode;
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

      {scanline && <HoverScanline speed={1.5} />}
    </div>
  );

  if (notch) {
    return <CornerNotch>{card}</CornerNotch>;
  }

  return card;
}

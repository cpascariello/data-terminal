import { CornerNotch } from "@dt/atoms/corner-notch";
import { TerminalTopBar } from "@dt/atoms/terminal-top-bar";
import { HoverScanline } from "@dt/atoms/hover-scanline";
import { Card } from "@dt/molecules/card";
import type { ReactNode } from "react";

interface TerminalCardProps {
  children: ReactNode;
  className?: string;
  tag?: string;
  label?: string;
  notch?: boolean;
  scanline?: boolean;
  /** Enables hover glow and border animation. Also enables scanline by default. */
  interactive?: boolean;
}

export function TerminalCard({
  children,
  className,
  tag,
  label,
  notch = true,
  scanline,
  interactive = false,
}: TerminalCardProps) {
  const showScanline = scanline ?? interactive;

  return (
    <Card
      className={className}
      interactive={interactive}
      header={<TerminalTopBar tag={tag} label={label} dotsPosition="right" />}
      overlay={showScanline ? <HoverScanline speed={1.5} /> : undefined}
      wrapper={notch ? (card) => <CornerNotch>{card}</CornerNotch> : undefined}
    >
      {children}
    </Card>
  );
}

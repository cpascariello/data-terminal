import { CornerNotch } from "@/atoms/corner-notch";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";
import { HoverScanline } from "@/atoms/hover-scanline";
import { Card } from "@/molecules/card";
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
  return (
    <Card
      className={className}
      header={<TerminalTopBar tag={tag} label={label} dotsPosition="right" />}
      overlay={scanline ? <HoverScanline speed={1.5} /> : undefined}
      wrapper={notch ? (card) => <CornerNotch>{card}</CornerNotch> : undefined}
    >
      {children}
    </Card>
  );
}

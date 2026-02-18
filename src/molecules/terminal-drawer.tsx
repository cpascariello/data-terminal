import { TerminalTopBar } from "@dt/atoms/terminal-top-bar";
import { CornerNotch } from "@dt/atoms/corner-notch";
import { HoverScanline } from "@dt/atoms/hover-scanline";
import { Drawer } from "@dt/molecules/drawer";
import type { ReactNode } from "react";

interface TerminalDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string | undefined;
  tag?: string | undefined;
  width?: number | undefined;
  footer?: ReactNode | undefined;
  children: ReactNode;
  className?: string | undefined;
}

export function TerminalDrawer({
  open,
  onClose,
  title,
  tag,
  width,
  footer,
  children,
  className,
}: TerminalDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      width={width}
      footer={footer}
      className={className}
      header={<TerminalTopBar tag={tag ?? title} dotsPosition="right" />}
      overlay={<HoverScanline speed={1.5} />}
      wrapper={(panel) => <CornerNotch>{panel}</CornerNotch>}
    >
      {children}
    </Drawer>
  );
}

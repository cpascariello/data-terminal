import { TerminalTopBar } from "@dt/atoms/terminal-top-bar";
import { CornerNotch } from "@dt/atoms/corner-notch";
import { HoverScanline } from "@dt/atoms/hover-scanline";
import { Modal } from "@dt/molecules/modal";
import type { ReactNode } from "react";

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

export function TerminalModal({
  open,
  onClose,
  title,
  size = "md",
  children,
  className,
}: TerminalModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size={size}
      className={className}
      header={<TerminalTopBar tag={title} dotsPosition="right" />}
      overlay={<HoverScanline speed={1.5} />}
      wrapper={(panel) => <CornerNotch>{panel}</CornerNotch>}
    >
      {children}
    </Modal>
  );
}

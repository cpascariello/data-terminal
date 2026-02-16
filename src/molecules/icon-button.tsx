import { cn } from "@/lib/cn";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  "aria-label": string;
  className?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary: [
    "bg-accent text-accent-foreground border-transparent",
    "hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--accent-glow-intense)]",
  ].join(" "),
  secondary: [
    "bg-transparent text-foreground border-border",
    "hover:border-border-hover hover:shadow-[0_0_20px_-4px_var(--accent-hover-shadow)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground/70 border-transparent",
    "hover:bg-foreground/[0.06] hover:text-foreground",
  ].join(" "),
  danger: [
    "bg-error/10 text-error border-error/30",
    "hover:bg-error/20",
  ].join(" "),
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border",
        "transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}

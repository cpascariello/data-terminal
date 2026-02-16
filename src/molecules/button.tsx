import { cn } from "@/lib/cn";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
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
  link: [
    "bg-transparent text-accent border-transparent px-0 py-0",
    "hover:underline",
  ].join(" "),
  danger: [
    "bg-error/10 text-error border-error/30",
    "hover:bg-error/20",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    className,
    children,
    as: Tag = "button",
    ...rest
  } = props;

  const isLink = variant === "link";

  const classes = cn(
    "inline-flex items-center justify-center border font-display uppercase tracking-wider",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantStyles[variant],
    !isLink && sizeStyles[size],
    className,
  );

  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (Tag === "a") {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

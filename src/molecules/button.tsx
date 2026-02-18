import { forwardRef } from "react";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  Ref,
} from "react";
import { cn } from "@dt/lib/cn";
import {
  sharedVariantStyles,
  sharedBaseClasses,
} from "@dt/lib/button-variants";

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
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, string> = {
  ...sharedVariantStyles,
  link: [
    "bg-transparent text-accent border-transparent px-0 py-0",
    "hover:underline",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
) {
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
    sharedBaseClasses,
    "font-display uppercase tracking-wider",
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
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={classes}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

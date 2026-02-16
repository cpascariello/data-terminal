import { forwardRef } from "react";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import {
  sharedVariantStyles,
  sharedBaseClasses,
} from "@/lib/button-variants";

type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  "aria-label": string;
  className?: string;
}

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, variant = "ghost", size = "md", className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          sharedBaseClasses,
          sharedVariantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);

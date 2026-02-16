export type SharedButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export const sharedVariantStyles: Record<SharedButtonVariant, string> = {
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

export const sharedBaseClasses = [
  "inline-flex items-center justify-center border",
  "transition-all duration-150",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "active:scale-[0.98]",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

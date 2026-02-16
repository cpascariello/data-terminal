import type { LucideIcon } from "lucide-react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export type FeedbackVariant = "success" | "warning" | "error" | "info";

export const variantStyles: Record<FeedbackVariant, string> = {
  success: "border-l-success bg-success/5",
  warning: "border-l-warning bg-warning/5",
  error: "border-l-error bg-error/5",
  info: "border-l-accent bg-accent/5",
};

export const variantIcons: Record<FeedbackVariant, LucideIcon> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

export const variantIconColor: Record<FeedbackVariant, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-accent",
};

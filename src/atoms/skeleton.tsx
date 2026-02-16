import { cn } from "@/lib/cn";

interface SkeletonProps {
  variant?: "text" | "heading" | "circle" | "card";
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

const variantStyles = {
  text: "h-4 w-full rounded-sm",
  heading: "h-6 w-3/4 rounded-sm",
  circle: "h-10 w-10 rounded-full",
  card: "h-32 w-full rounded-sm",
} as const;

const lineWidths = [
  "100%", "92%", "85%", "78%", "71%", "64%", "60%",
] as const;

function getLineWidth(index: number): string {
  if (index >= lineWidths.length) return "60%";
  return lineWidths[index] ?? "60%";
}

function formatSize(value: string | number): string {
  return typeof value === "number" ? `${value}px` : value;
}

const scanStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, transparent 0%,"
    + " var(--accent-scan-subtle) 50%,"
    + " transparent 100%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-scan 1.5s ease-in-out infinite",
};

const keyframes = [
  "@keyframes skeleton-scan {",
  "  0% { background-position: 200% 0; }",
  "  100% { background-position: -200% 0; }",
  "}",
].join("\n");

export function Skeleton({
  variant = "text",
  width,
  height,
  lines = 1,
  className,
}: SkeletonProps) {
  const showMultipleLines = variant === "text" && lines > 1;

  const overrides: React.CSSProperties = {
    ...(width !== undefined && { width: formatSize(width) }),
    ...(height !== undefined && { height: formatSize(height) }),
  };

  if (showMultipleLines) {
    return (
      <div
        className={cn("flex flex-col gap-2", className)}
        role="status"
        aria-label="Loading"
      >
        <style dangerouslySetInnerHTML={{ __html: keyframes }} />
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn("bg-foreground/[0.06]", variantStyles.text)}
            style={{
              ...scanStyle,
              ...overrides,
              width: width
                ? formatSize(width)
                : getLineWidth(i),
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-foreground/[0.06]",
        variantStyles[variant],
        className,
      )}
      style={{ ...scanStyle, ...overrides }}
      role="status"
      aria-label="Loading"
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
}

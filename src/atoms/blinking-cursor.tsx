import { cn } from "@/lib/cn";

type CursorVariant = "block" | "line" | "underscore";

interface BlinkingCursorProps {
  className?: string;
  variant?: CursorVariant;
}

export function BlinkingCursor({
  className,
  variant = "block",
}: BlinkingCursorProps) {
  const chars = { block: "▋", underscore: "_" } as const;

  if (variant === "line") {
    return (
      <span
        className={cn("ml-1 inline-block w-[3px] bg-accent", className)}
        style={{
          height: "0.8em",
          animation: "terminal-blink 1s step-end infinite",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={cn("font-display text-accent", className)}
      style={{ animation: "terminal-blink 1s step-end infinite" }}
      aria-hidden="true"
    >
      {chars[variant]}
    </span>
  );
}

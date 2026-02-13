import { cn } from "@/lib/cn";

interface BlinkingCursorProps {
  className?: string;
  variant?: "block" | "line" | "underscore";
}

export function BlinkingCursor({
  className,
  variant = "block",
}: BlinkingCursorProps) {
  const chars = { block: "▋", line: "|", underscore: "_" };

  if (variant === "line") {
    return (
      <span
        className={cn("ml-1 inline-block w-[3px] bg-accent", className)}
        style={{
          height: "0.8em",
          animation: "terminal-blink 1s step-end infinite",
        }}
      />
    );
  }

  return (
    <span
      className={cn("font-display text-accent", className)}
      style={{ animation: "terminal-blink 1s step-end infinite" }}
    >
      {chars[variant]}
    </span>
  );
}

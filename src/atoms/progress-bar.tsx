import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value?: number;
  indeterminate?: boolean;
  className?: string;
}

export function ProgressBar({
  value = 0,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "relative h-4 w-full overflow-hidden border border-border font-display text-[10px]",
        className,
      )}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {indeterminate ? (
        <div
          className="absolute inset-y-0 w-[30%] bg-accent/60"
          style={{ animation: "progress-sweep 1.5s ease-in-out infinite" }}
        />
      ) : (
        <div
          className="h-full bg-accent/60 transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
        />
      )}
      <div
        className="absolute inset-0 flex items-center justify-center text-foreground/60"
        style={{ mixBlendMode: "difference" }}
      >
        {indeterminate ? "LOADING" : `${Math.round(clamped)}%`}
      </div>
    </div>
  );
}

import { cn } from "@/lib/cn";
import { HudLabel } from "@/atoms/hud-label";
import type { ReactNode } from "react";

interface ProcessCardProps {
  pid: string;
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export function ProcessCard({
  pid,
  title,
  description,
  icon,
  className,
}: ProcessCardProps) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden",
        "border-l-[3px] border-accent/30 bg-foreground/[0.02] p-5",
        "transition-all hover:border-accent hover:bg-foreground/[0.04]",
        className,
      )}
    >
      <HudLabel>
        PID:{pid} {"// "}{title}
      </HudLabel>
      {icon && (
        <div className="mt-3 flex size-8 items-center justify-center text-accent/60">
          {icon}
        </div>
      )}
      <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/50">
        {description}
      </p>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--accent-scan-subtle) 50%, transparent 100%)",
          animation: "terminal-scan 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";

interface StatCardProps {
  to: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function StatCard({
  to,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: StatCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ margin: "-48px" });
  const value = useCountUp({ to, decimals, enabled: isInView });

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      <span
        className="font-display text-4xl font-bold text-accent md:text-5xl"
        style={{
          textShadow: "0 0 30px var(--accent-glow-line)",
        }}
      >
        {prefix}{value}{suffix}
      </span>
      <span className="font-display text-[10px] tracking-[0.2em] text-foreground/40">
        {label}
      </span>
    </div>
  );
}

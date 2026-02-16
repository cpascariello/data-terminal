import { cn } from "@/lib/cn";
import { ServiceTag } from "@/atoms/service-tag";

interface TerminalTopBarProps {
  /** Service tag shown on the left (e.g. "SVC:COMPUTE") */
  tag?: string | undefined;
  /** Text label shown next to dots */
  label?: string | undefined;
  /** Position of window dots relative to tag/label */
  dotsPosition?: "left" | "right";
  className?: string;
}

export function TerminalTopBar({
  tag,
  label,
  dotsPosition = "right",
  className,
}: TerminalTopBarProps) {
  const dots = (
    <div className={cn("flex gap-1", dotsPosition === "right" && "ml-auto")}>
      <span className="size-2 rounded-full bg-foreground/10" />
      <span className="size-2 rounded-full bg-foreground/10" />
      <span className="size-2 rounded-full bg-accent/40" />
    </div>
  );

  return (
    <div
      className={cn(
        "flex items-center gap-2 border-b border-border px-4 py-2",
        className,
      )}
    >
      {dotsPosition === "left" && dots}
      {tag && <ServiceTag tag={tag} />}
      {label && (
        <span
          className={cn(
            "font-display text-[10px] tracking-widest text-foreground/30",
            dotsPosition === "left" && "ml-2",
          )}
        >
          {label}
        </span>
      )}
      {dotsPosition === "right" && dots}
    </div>
  );
}

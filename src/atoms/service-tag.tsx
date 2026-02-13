import { cn } from "@/lib/cn";

interface ServiceTagProps {
  tag: string;
  className?: string;
}

export function ServiceTag({ tag, className }: ServiceTagProps) {
  return (
    <span
      className={cn(
        "font-display text-[10px] tracking-widest text-accent/50",
        className,
      )}
    >
      [{tag}]
    </span>
  );
}

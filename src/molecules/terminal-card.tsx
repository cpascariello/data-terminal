import { cn } from "@/lib/cn";
import { CornerNotch } from "@/atoms/corner-notch";
import { ServiceTag } from "@/atoms/service-tag";

interface TerminalCardProps {
  children: React.ReactNode;
  className?: string;
  tag?: string;
  label?: string;
  notch?: boolean;
  scanline?: boolean;
}

export function TerminalCard({
  children,
  className,
  tag,
  label,
  notch = true,
  scanline = true,
}: TerminalCardProps) {
  const card = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "border border-border bg-foreground/[0.02]",
        "transition-all hover:border-border-hover hover:shadow-[0_0_30px_-5px_oklch(from_var(--accent)_l_c_h_/_10%)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        {tag && <ServiceTag tag={tag} />}
        {label && (
          <span className="font-display text-[10px] tracking-widest text-foreground/30">
            {label}
          </span>
        )}
        <div className="ml-auto flex gap-1">
          <span className="size-1.5 rounded-full bg-foreground/10" />
          <span className="size-1.5 rounded-full bg-foreground/10" />
          <span className="size-1.5 rounded-full bg-accent/40" />
        </div>
      </div>

      <div className="flex flex-1 flex-col">{children}</div>

      {scanline && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, oklch(from var(--accent) l c h / 4%) 50%, transparent 100%)",
            animation: "terminal-scan 1.5s ease-in-out infinite",
          }}
          aria-hidden
        />
      )}
    </div>
  );

  if (notch) {
    return <CornerNotch>{card}</CornerNotch>;
  }

  return card;
}

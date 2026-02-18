import { Fragment } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@dt/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string | undefined;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  backHref?: string | undefined;
  separator?: string;
  className?: string;
}

export function Breadcrumbs({
  items,
  backHref,
  separator = "/",
  className,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2", className)}
    >
      {backHref && (
        <a
          href={backHref}
          aria-label="Go back"
          className="text-accent/70 transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
        </a>
      )}
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && (
                <li aria-hidden className="text-xs text-foreground/20">
                  {separator}
                </li>
              )}
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      "font-display text-xs uppercase tracking-widest",
                      isLast
                        ? "text-foreground/70"
                        : "text-foreground/40",
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="font-display text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground/60"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface AccordionItem {
  id: string;
  title: string;
  children: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  single?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  items,
  single = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(defaultOpen),
  );

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(single ? [] : prev);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [single],
  );

  return (
    <div className={cn("border border-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        return (
          <AccordionEntry
            key={item.id}
            item={item}
            isOpen={isOpen}
            onToggle={toggle}
            isLast={index === items.length - 1}
          />
        );
      })}
    </div>
  );
}

function AccordionEntry({
  item,
  isOpen,
  onToggle,
  isLast,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "group/item relative bg-foreground/[0.02]",
        !isLast && "border-b border-border",
        isOpen && "border-l-2 border-l-accent",
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3",
          "text-left font-display text-xs uppercase tracking-widest",
          "text-foreground transition-colors",
          "hover:bg-foreground/[0.04]",
        )}
        aria-expanded={isOpen}
      >
        {item.title}
        <ChevronDown
          size={14}
          className={cn(
            "shrink-0 text-accent/60 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 font-sans text-sm text-foreground/80">
            {item.children}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover/item:opacity-100"
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

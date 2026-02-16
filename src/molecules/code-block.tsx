"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { TerminalTopBar } from "@/atoms/terminal-top-bar";
import { getHighlighter } from "@/lib/highlighter";
import { CopyButton } from "@/molecules/copy-button";

export interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;
    getHighlighter()
      .then((highlighter) => {
        if (cancelled) return;
        const loadedLangs = highlighter.getLoadedLanguages();
        const lang = loadedLangs.includes(language) ? language : "text";
        const result = highlighter.codeToHtml(code, {
          lang,
          theme: "terminal",
        });
        setHtml(result);
      })
      .catch((error: unknown) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Shiki highlighting failed:", error);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-border bg-card",
        className,
      )}
    >
      <TerminalTopBar label={language} dotsPosition="right" />

      <div className="absolute right-2 top-9 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton text={code} />
      </div>

      {html ? (
        <div
          className={cn(
            "overflow-x-auto font-mono text-sm",
            "[&_.shiki]:!bg-transparent [&_.shiki]:p-4",
            "[&_.shiki_code]:block [&_.shiki_code]:w-fit [&_.shiki_code]:min-w-full",
            showLineNumbers && "code-line-numbers",
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 font-mono text-sm text-foreground/80">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

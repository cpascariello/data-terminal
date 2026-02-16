import { createHighlighter, type Highlighter } from "shiki";
import { createCssVariablesTheme } from "shiki/core";

const theme = createCssVariablesTheme({
  name: "terminal",
  variablePrefix: "--shiki-",
  fontStyle: true,
});

let instance: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!instance) {
    instance = createHighlighter({
      themes: [theme],
      langs: [
        "typescript",
        "javascript",
        "css",
        "html",
        "bash",
        "json",
        "tsx",
        "jsx",
      ],
    });
  }
  return instance;
}

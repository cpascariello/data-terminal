"use client";

import { type ReactNode } from "react";

export const THEMES = ["dark", "light", "contrast", "warm", "cool"] as const;
export type Theme = (typeof THEMES)[number];

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

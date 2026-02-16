import { describe, it, expect } from "vitest";
import {
  variantStyles,
  variantIcons,
  variantIconColor,
  type FeedbackVariant,
} from "@/lib/feedback-variants";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

const allVariants: FeedbackVariant[] = [
  "success",
  "warning",
  "error",
  "info",
];

describe("feedback-variants", () => {
  it("all variant maps have the same keys", () => {
    const styleKeys = Object.keys(variantStyles).sort();
    const iconKeys = Object.keys(variantIcons).sort();
    const colorKeys = Object.keys(variantIconColor).sort();

    expect(styleKeys).toEqual(allVariants.toSorted());
    expect(iconKeys).toEqual(allVariants.toSorted());
    expect(colorKeys).toEqual(allVariants.toSorted());
  });

  it("every variant style is a non-empty string", () => {
    for (const variant of allVariants) {
      expect(variantStyles[variant]).toBeTruthy();
      expect(variantStyles[variant].length).toBeGreaterThan(0);
    }
  });

  it("maps correct icons to each variant", () => {
    expect(variantIcons.success).toBe(CheckCircle);
    expect(variantIcons.warning).toBe(AlertTriangle);
    expect(variantIcons.error).toBe(XCircle);
    expect(variantIcons.info).toBe(Info);
  });

  it("every variant icon color references a text- class", () => {
    for (const variant of allVariants) {
      expect(variantIconColor[variant]).toMatch(/^text-/);
    }
  });

  it("variant styles include border and background classes", () => {
    for (const variant of allVariants) {
      expect(variantStyles[variant]).toMatch(/border-l-/);
      expect(variantStyles[variant]).toMatch(/bg-/);
    }
  });
});

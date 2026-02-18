import { describe, it, expect } from "vitest";
import {
  sharedVariantStyles,
  sharedBaseClasses,
  type SharedButtonVariant,
} from "@dt/lib/button-variants";

const allVariants: SharedButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
  "danger",
];

describe("button-variants", () => {
  it("sharedVariantStyles has all expected variants", () => {
    const keys = Object.keys(sharedVariantStyles).sort();
    expect(keys).toEqual(allVariants.toSorted());
  });

  it("every variant style is a non-empty string", () => {
    for (const variant of allVariants) {
      expect(sharedVariantStyles[variant]).toBeTruthy();
      expect(sharedVariantStyles[variant].length).toBeGreaterThan(0);
    }
  });

  it("every variant includes hover styles", () => {
    for (const variant of allVariants) {
      expect(sharedVariantStyles[variant]).toMatch(/hover:/);
    }
  });

  it("sharedBaseClasses includes layout classes", () => {
    expect(sharedBaseClasses).toContain("inline-flex");
    expect(sharedBaseClasses).toContain("items-center");
    expect(sharedBaseClasses).toContain("justify-center");
  });

  it("sharedBaseClasses includes transition", () => {
    expect(sharedBaseClasses).toContain("transition-all");
  });

  it("sharedBaseClasses includes focus-visible ring", () => {
    expect(sharedBaseClasses).toContain("focus-visible:ring-2");
  });

  it("sharedBaseClasses includes active scale", () => {
    expect(sharedBaseClasses).toContain("active:scale-[0.98]");
  });

  it("sharedBaseClasses includes disabled styles", () => {
    expect(sharedBaseClasses).toContain("disabled:cursor-not-allowed");
    expect(sharedBaseClasses).toContain("disabled:opacity-50");
  });
});

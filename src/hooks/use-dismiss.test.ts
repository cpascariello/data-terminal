import { describe, it, expect } from "vitest";
import { useDismiss } from "@dt/hooks/use-dismiss";

describe("useDismiss", () => {
  it("exports a function", () => {
    expect(typeof useDismiss).toBe("function");
  });

  it("accepts three parameters (ref, onDismiss, enabled)", () => {
    expect(useDismiss.length).toBe(2);
  });
});

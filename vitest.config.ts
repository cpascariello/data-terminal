import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@dt": resolve(import.meta.dirname, "src"),
    },
  },
});

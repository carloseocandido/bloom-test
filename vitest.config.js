import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "c8",
      reporter: ["text", "html"],
    },
  },
});
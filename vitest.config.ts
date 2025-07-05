import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    env: {
      NODE_ENV: "test",
    },
    globalSetup: ["./src/test-utils/global-setup.ts"],
    setupFiles: ["./src/test-utils/test-setup.ts"],
    sequence: {
      concurrent: false,
    },
  },
});

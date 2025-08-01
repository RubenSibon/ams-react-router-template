import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: ["app/root.tsx", "app/routes.ts"],
      include: ["app/**"],
      reportsDirectory: "test/coverage",
    },
    environment: "jsdom",
    exclude: [
      ...configDefaults.exclude,
      ".react-router/**",
      "**/build/**",
      "react-router.config.ts",
    ],
    setupFiles: ["test/vitest-setup.ts"],
  },
});

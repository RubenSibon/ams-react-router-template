import { reactRouter } from "@react-router/dev/vite";
import { realpathSync } from "fs";
import { resolve } from "path";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Safari 14.0 has a destructuring bug esbuild now refuses to target
// (esbuild >=0.28 compat table); bump to 14.1 where it's fixed.
const target = ["es2020", "edge88", "firefox78", "chrome87", "safari14.1"];

// When @amsterdam/design-system-assets is pnpm-linked to a local path outside
// the project root, Vite's fs restriction blocks the woff2 files referenced by
// the font CSS. Resolving the real path and adding it to fs.allow fixes this.
const assetsPackageDir = realpathSync(resolve("./node_modules/@amsterdam/design-system-assets"));

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  build: { target },
  optimizeDeps: { esbuildOptions: { target } },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), assetsPackageDir],
    },
  },
});

import { cleanup } from "@testing-library/react";
import { createRequire } from "module";
import { afterEach, vi } from "vitest";

// When ADS packages are pnpm-linked to a local monorepo that has React 18 in
// its own node_modules, their pre-compiled CJS bundles call require('react')
// and Node resolves it to React 18 (closest node_modules wins). Patch
// Module._resolveFilename before test imports run so those calls are
// redirected to this project's React 19 instead.
const _require = createRequire(import.meta.url);
const Module = _require("module") as {
  _resolveFilename: typeof _require.resolve
};
const cwd = process.cwd();
const reactPaths: Record<string, string> = {
  "react": _require.resolve("react", { paths: [cwd] }),
  "react-dom": _require.resolve("react-dom", { paths: [cwd] }),
  "react/jsx-runtime": _require.resolve("react/jsx-runtime", { paths: [cwd] }),
  "react/jsx-dev-runtime": _require.resolve("react/jsx-dev-runtime", {
    paths: [cwd],
  }),
};
const _originalResolve = Module._resolveFilename;
Module._resolveFilename = function (
  request: string,
  parent: { filename?: string } | null,
  ...args: unknown[]
) {
  const redirect = reactPaths[request];
  if (redirect && parent?.filename?.includes("Amsterdam/ADS/design-system")) {
    return redirect;
  }
  return _originalResolve.call(this, request, parent, ...args);
};

// TODO: currently needed for testing the menu in Header.tsx. Remove if not needed.
Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockImplementation((query: string) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  })),
  writable: true,
});

afterEach(() => {
  // See: https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
  cleanup();
});

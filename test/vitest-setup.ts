import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

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

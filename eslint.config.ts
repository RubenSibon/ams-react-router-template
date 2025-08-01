import eslint from "@eslint/js";
import eslintJson from "@eslint/json";
import eslintMarkdown from "@eslint/markdown";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import eslintReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

import eslintRules from "./eslint.rules";

// We use the `TypeScript config(...)` function to create a TypeScript ESLint configuration
// See: https://typescript-eslint.io/packages/typescript-eslint/#config
export default tseslint.config(
  // Global
  {
    name: "global",
    ignores: [
      // Project
      ".husky/",
      "node_modules/",
      "test/coverage/",

      // React Router
      ".react-router/",
      "build/",
    ],
  },

  // JavaScript, TypeScript and TSX files
  {
    name: "js-ts-tsx",
    ...eslint.configs.recommended, // ESLint recommended config (not a plugin).
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@stylistic": stylistic, // Stylistic instead of Prettier for code formatting.
      "react": eslintReact,
    },
    extends: [
      tseslint.configs.recommendedTypeCheckedOnly,
      eslintReact.configs.flat.recommended,
      eslintReact.configs.flat["jsx-runtime"],
      perfectionist.configs["recommended-natural"],
      stylistic.configs.recommended,
    ],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintRules.eslintRules,
      ...eslintRules.reactRules,
      ...eslintRules.perfectionistRules,
      ...eslintRules.stylisticRules,
    },
  },

  // JSON
  {
    name: "json",
    ...eslintJson.configs.recommended, // Spreading the recommended config seems to work better.
    files: ["**/*.json"],
    language: "json/json",
  },

  // Markdown
  {
    name: "markdown",
    plugins: {
      markdown: eslintMarkdown,
    },
    extends: [eslintMarkdown.configs.recommended],
    files: ["**/*.md"],
    language: "markdown/gfm", // GitHub Flavored Markdown is a strict superset of CommonMark.
    rules: {
      ...eslintRules.markdownRules,
    },
  },
);

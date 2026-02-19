import eslint from "@eslint/js";
import eslintJson from "@eslint/json";
import eslintMarkdown from "@eslint/markdown";
import stylistic from "@stylistic/eslint-plugin";
import eslintJestDom from "eslint-plugin-jest-dom";
import perfectionist from "eslint-plugin-perfectionist";
import * as eslintReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

import eslintRules from "./eslint.rules";

export default defineConfig([

  // Global
  {
    name: "global",
    ignores: [
      // Project
      ".husky/",
      "node_modules/",
      "test/coverage/",
      "public/mockServiceWorker.js",

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
      "@stylistic": stylistic, // Stylistic instead of Prettier for code formatting.
      "@typescript-eslint": tseslint.plugin,
      "react": eslintReact,
      perfectionist,
    },
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx,test.ts,test.tsx}"],
    extends: [
      tseslint.configs.recommendedTypeCheckedOnly,
      eslintJestDom.configs["flat/recommended"],
      stylistic.configs.recommended,
    ],
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
      ...eslintRules.tsRules,
      ...eslintRules.reactRules,
      ...eslintRules.perfectionistReactRules,
      ...eslintRules.stylisticRules,
    },
  },

  // JSON
  {
    name: "json",
    files: ["**/*.json"],
    ...eslintJson.configs.recommended, // Spreading the recommended config, as oppposed to plugin, gives no error.
    language: "json/json",
    ignores: ["package-lock.json"],
  },

  // Markdown
  {
    name: "markdown",
    language: "markdown/gfm", // GitHub Flavored Markdown is a strict superset of CommonMark.
    plugins: {
      markdown: eslintMarkdown,
    },
    files: ["**/*.md"],
    extends: [eslintMarkdown.configs.recommended],
    rules: {
      ...eslintRules.markdownRules,
    },
  },

]);

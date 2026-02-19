import eslint from "@eslint/js";
import { type Linter } from "eslint";

/**
 * General JavaScript rules
 */

export const jsRules: Linter.RulesRecord = {
  ...eslint.configs.recommended.rules,
  "@typescript-eslint/no-unsafe-assignment": ["warn"],
  "@typescript-eslint/only-throw-error": ["off"],
  "no-duplicate-imports": ["error", { includeExports: true }],
  "no-extra-semi": ["error"],
  "no-unused-vars": ["error"],
};

/**
 * TypeScript rules on top of JavaScript rules
 */

export const tsRules: Linter.RulesRecord = {
  ...jsRules,
  "@typescript-eslint/no-unsafe-assignment": ["warn"],
  "@typescript-eslint/only-throw-error": ["off"],
};

/**
 * React rules
 */

export const reactRules: Linter.RulesRecord = {
  "react/jsx-sort-props": "off",
  "react/prefer-read-only-props": "warn",
  "react/react-in-jsx-scope": "off",
};

/**
 * Markdown rules
 */

export const markdownRules: Linter.RulesRecord = {
  "markdown/no-bare-urls": ["error"],
  "markdown/no-duplicate-headings": ["error"],
  "markdown/no-html": ["error"],
};

/**
 * Perfectionist
 */

const perfectionistCommonRules = {
  partition: {
    partitionByComment: true,
    partitionByNewLine: true,
  },
};

export const perfectionistRules: Linter.RulesRecord = {
  "perfectionist/sort-enums": [
    "error",
    {
      ...perfectionistCommonRules.partition,
    },
  ],
  "perfectionist/sort-exports": ["error"],
  "perfectionist/sort-imports": [
    "error", {
      groups: [
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "ts-equals-import",
        "unknown",
      ],
    },
  ],
  "perfectionist/sort-interfaces": ["warn"],
  "perfectionist/sort-intersection-types": [
    "error",
    {
      ...perfectionistCommonRules.partition,
    },
  ],
  "perfectionist/sort-maps": ["warn"],
  "perfectionist/sort-modules": ["off"],
  "perfectionist/sort-named-exports": [
    "error",
    {
      ...perfectionistCommonRules.partition,
    },
  ],
  "perfectionist/sort-named-imports": [
    "error",
    {
      ...perfectionistCommonRules.partition,
    },
  ],
  "perfectionist/sort-object-types": ["warn"],
  "perfectionist/sort-objects": ["off"],
  "perfectionist/sort-union-types": ["error"],
};

/**
 * Perfectionist React rules
 */

export const perfectionistReactRules: Linter.RulesRecord = {
  ...perfectionistRules,
  "perfectionist/sort-imports": [
    "error", {
      customGroups: [
        {
          groupName: "react",
          elementNamePattern: ["^react$", "^react-.+"],
        },
      ],
      groups: [
        "react",
        "type-import",
        ["value-builtin", "value-external"],
        "type-internal",
        "value-internal",
        ["type-parent", "type-sibling", "type-index"],
        ["value-parent", "value-sibling", "value-index"],
        "ts-equals-import",
        "unknown",
      ],
    },
  ],
  "perfectionist/sort-jsx-props": [
    "error",
    {
      customGroups: [
        { groupName: "id", elementNamePattern: "^id$" },
        { groupName: "key", elementNamePattern: "^key$" },
        { groupName: "methods", elementNamePattern: "^on[A-Z].*$" },
        { groupName: "name", elementNamePattern: "^name$" },
        { groupName: "ref", elementNamePattern: "^ref$" },
        { groupName: "title", elementNamePattern: "^title$" },
      ],
      groups: ["key", "ref", "id", "name", "title", "unknown", "methods"],
      partitionByNewLine: perfectionistCommonRules.partition.partitionByNewLine,
    },
  ],
};

/**
 * Stylistic rules
 */

export const stylisticRules: Linter.RulesRecord = {
  "@stylistic/array-bracket-newline": [
    "error",
    {
      multiline: true,
    },
  ],
  "@stylistic/arrow-parens": [
    "error",
    "as-needed",
  ],
  "@stylistic/brace-style": [
    "error",
    "1tbs",
    {
      allowSingleLine: true,
    },
  ],
  "@stylistic/comma-dangle": [
    "error",
    "always-multiline",
  ],
  "@stylistic/indent": [
    "error",
    2,
  ],
  "@stylistic/max-len": [
    "error",
    {
      code: 120,
      ignoreStrings: true,
    },
  ],
  "@stylistic/no-multiple-empty-lines": [
    "error",
    {
      max: 1,
      maxEOF: 1,
    },
  ],
  "@stylistic/quotes": [
    "error",
    "double",
    {
      avoidEscape: true,
    },
  ],
  "@stylistic/semi": [
    "error",
    "always",
  ],
};

export default {
  jsRules,
  markdownRules,
  perfectionistReactRules,
  perfectionistRules,
  reactRules,
  stylisticRules,
  tsRules,
};

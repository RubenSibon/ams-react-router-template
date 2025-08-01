import eslint from "@eslint/js";
import { type Linter } from "eslint";

/**
 * General JavaScript rules
 */

export const eslintRules: Linter.RulesRecord = {
  ...eslint.configs.recommended.rules,
  "no-duplicate-imports": ["error", { includeExports: true }],
  "no-extra-semi": ["error"],
  "no-unused-vars": ["error"],
};

/**
 * React rules
 */

export const reactRules: Linter.RulesRecord = {
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
  "perfectionist/sort-imports": ["error"],
  "perfectionist/sort-interfaces": ["warn"],
  "perfectionist/sort-intersection-types": [
    "error",
    {
      ...perfectionistCommonRules.partition,
    },
  ],
  "perfectionist/sort-jsx-props": [
    "error",
    {
      customGroups: {
        id: "^id$",
        key: "^key$",
        methods: "^on[A-Z].*$",
        name: "^name$",
        ref: "^ref$",
        title: "^title$",
      },
      groups: ["key", "ref", "id", "name", "title", "unknown", "methods"],
      partitionByNewLine: perfectionistCommonRules.partition.partitionByNewLine,
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
 * Stylistic rules
 */

export const stylisticRules: Linter.RulesRecord = {
  "@stylistic/array-bracket-newline": ["error", { multiline: true }],
  "@stylistic/arrow-parens": ["error", "as-needed"],
  "@stylistic/max-len": ["error", { code: 120, ignoreStrings: true }],
  "@stylistic/comma-dangle": ["error", "always-multiline"],
  "@stylistic/indent": ["error", 2],
  "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
  "@stylistic/semi": ["error", "always"],
  "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
};

export default {
  eslintRules,
  markdownRules,
  perfectionistRules,
  reactRules,
  stylisticRules,
};

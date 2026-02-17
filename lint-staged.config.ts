export default {
  "*.{js,mjs,cjs,ts,mts,cts,tsx,json,md}": "eslint . --fix",
  "*.{css}": "stylelint --fix",
  "*.{js,ts,tsx}": "vitest related --run",
};

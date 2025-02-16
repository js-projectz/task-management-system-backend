import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] }, // Supports JS/TS/TSX files
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
  },
  pluginJs.configs.recommended, 
  ...tseslint.configs.recommended, 
];

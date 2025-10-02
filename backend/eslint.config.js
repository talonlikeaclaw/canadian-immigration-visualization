import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // Node.js globals (require, process, etc.)
      },
    },
    rules: {
      semi: "error",
      quotes: ["error", "single"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]);

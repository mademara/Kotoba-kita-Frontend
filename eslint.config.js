// eslint.config.js — ESLint flat config (ESLint v9+)
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      // globals dari package "globals" — ini yang bikin ESLint tau
      // JSX elements (React, StrictMode, dll) bukan unused vars
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",  // tidak perlu di React 17+
      "react/jsx-uses-react": "error",    // tandai React sebagai "used" di JSX
      "react/jsx-uses-vars": "error",     // tandai semua JSX components sebagai "used"
      "react/prop-types": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Unused vars — warn saja, jangan error
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Gaya kode
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  // Matikan semua rules Prettier yang konflik dengan ESLint
  // Harus di posisi paling akhir
  prettierConfig,
];

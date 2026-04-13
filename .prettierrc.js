// eslint.config.js — ESLint flat config (ESLint v9+)
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

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
      globals: {
        // browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
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
      "react/prop-types": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Unused vars — warn saja, jangan error, konsisten dengan F401 yg diabaikan
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

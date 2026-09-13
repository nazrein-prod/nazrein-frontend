import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import turboPlugin from "eslint-plugin-turbo";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * Shared ESLint configuration for the Next.js apps in this monorepo.
 *
 * `eslint-config-next` ships native flat config as of Next 16, so the React,
 * React Hooks and @next/next plugins no longer need assembling by hand — the
 * two imports below cover what this file used to wire up manually.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Must come after the configs above so it can switch off their stylistic
  // rules; Prettier owns formatting in this repo.
  eslintConfigPrettier,

  {
    plugins: { turbo: turboPlugin },
    rules: { "turbo/no-undeclared-env-vars": "warn" },
  },

  // Downgrades everything to a warning so a lint failure never blocks a build.
  { plugins: { onlyWarn } },

  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

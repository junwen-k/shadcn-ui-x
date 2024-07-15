import { join } from "path"
import { fixupConfigRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import turbo from "eslint-config-turbo"
import prettier from "eslint-plugin-prettier/recommended"
import tailwind from "eslint-plugin-tailwindcss"
import globals from "globals"
import ts from "typescript-eslint"

const compat = new FlatCompat()

export default ts.config(
  ...fixupConfigRules(compat.config(turbo)),
  {
    files: ["**/*.{js?(x),ts?(x)}"],
    extends: [js.configs.recommended, ...ts.configs.recommended],
  },
  {
    files: ["apps/storybook/**/*"],
    extends: [...tailwind.configs["flat/recommended"]],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"],
        config: join(process.cwd(), "./tailwind.config.js"),
      },
    },
  },
  prettier
)

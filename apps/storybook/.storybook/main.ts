import { dirname, join } from "path"
import type { StorybookConfig } from "@storybook/react-vite"
import remarkGfm from "remark-gfm"
import { mergeConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: getAbsolutePath(
    "@storybook/react-vite"
  ) as StorybookConfig["framework"],
  docs: {},
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [
        tsconfigPaths({
          loose: true,
        }),
      ],
    }),
}

export default config

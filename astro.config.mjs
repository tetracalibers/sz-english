// @ts-check

import { defineConfig } from "astro/config"
import { resolve } from "node:path"
import svelte from "@astrojs/svelte"
const __dirname = new URL(".", import.meta.url).pathname

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    vite: {
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
          "~": __dirname
        }
      }
    },
    site: "https://tetracalibers.github.io",
    base: "/sz-english",
    integrations: [svelte()]
  }
)

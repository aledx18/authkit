import tailwindcss from "@tailwindcss/vite";
// @ts-check

import node from "@astrojs/node";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: { plugins: [tailwindcss()] },
  adapter: node({
    mode: "standalone",
  }),
});

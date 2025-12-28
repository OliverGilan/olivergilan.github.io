import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://olivergilan.com",
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [mdx(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});

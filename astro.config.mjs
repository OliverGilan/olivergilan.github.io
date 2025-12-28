import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://olivergilan.com",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [mdx(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});

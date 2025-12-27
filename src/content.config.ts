import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/posts" }),
});

export const collections = { blog };

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import slugify from "slugify";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string().optional().nullable(),
      date_published: z.date().optional(),
      date_edited: z.date().optional(),
      description: z.string().optional(),
      thumbnail: z.string().optional().nullable(),
      tags: z.array(
        z.enum(["Technical", "Lore", "Playlists", "Photos"])
      ).min(1).max(1),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug ?? slugify(data.title, { lower: true, strict: true }),
    })),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/books" }),
  schema: z
    .object({
      title: z.string(),
      author: z.string(),
      slug: z.string().optional().nullable(),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug ?? slugify(data.title, { lower: true, strict: true }),
    })),
});

const essays = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/essays" }),
  schema: z.object({
    title: z.string(),
    href: z.string(),
    author: z.string().optional(),
  }),
});

const blogs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    href: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, books, essays, blogs };

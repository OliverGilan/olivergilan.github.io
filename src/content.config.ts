import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import slugify from "slugify";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/posts" }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string().optional().nullable(),
      date_published: z.date().optional(),
      date_edited: z.date().optional(),
      description: z.string().optional(),
      thumbnail: z.string().optional().nullable(),
      tags: z.array(z.string()).default([]),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug ?? slugify(data.title, { lower: true, strict: true }),
    })),
});

const curated = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/curated" }),
  schema: z
    .object({
      title: z.string(),
      href: z.string(),
      slug: z.string().optional().nullable(),
      description: z.string().optional(),
      tags: z.array(z.string()).default([]),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug ?? slugify(data.title, { lower: true, strict: true }),
    })),
});

export const collections = { blog, curated };

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    description: z.string().nullable().optional(),
    thumbnail: z.string().nullable().optional(),
  }),
});

const stream = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    description: z.string().nullable().optional(),
  }),
});

const blogroll = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    link: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  }),
});

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().nullable().optional(),
    genre: z.string().nullable().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog,
  stream,
  blogroll,
  books,
};

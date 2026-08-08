import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Shared schema for both collections.
const entrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
});

// Short, frequent notes.
const worklogs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/worklogs' }),
  schema: entrySchema,
});

// Long-form writing.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: entrySchema,
});

export const collections = { worklogs, posts };

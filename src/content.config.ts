import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
			// Ediciones del diario. La portada se genera sola en dev/build:
			// `edition` solo hace falta para forzar el número (por defecto, orden
			// por fecha) y `stats` añade hasta 4 datos reales del mes a la portada.
			edition: z.number().int().positive().optional(),
			stats: z
				.array(
					z.object({
						label: z.string(),
						value: z.string(),
						note: z.string().optional(),
					}),
				)
				.max(4)
				.optional(),
		}),
});

export const collections = { blog };

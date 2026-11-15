// @ts-check

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { generateCovers } from './scripts/blueprint/generate.mjs';

/**
 * Genera las portadas blueprint del diario al arrancar `astro dev` y `astro build`.
 * @returns {import('astro').AstroIntegration}
 */
function blueprintCovers() {
	return {
		name: 'blueprint-covers',
		hooks: {
			'astro:config:setup': async ({ logger }) => {
				await generateCovers({ soft: true, logger });
			},
		},
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://gines.me',
	markdown: {
		processor: unified({
			remarkRehype: {
				footnoteLabel: 'Notas',
				footnoteBackLabel: 'Volver al texto',
			},
		}),
	},
	integrations: [
		blueprintCovers(),
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/blog/tag/'),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			fallbacks: ['sans-serif'],
			weights: [400, 500, 600, 700, 800],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'Roboto',
			cssVariable: '--font-roboto',
			fallbacks: ['sans-serif'],
			weights: [400, 500, 700],
			styles: ['normal', 'italic'],
		},
	],
});

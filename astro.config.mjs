// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://gines.me',
	integrations: [
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

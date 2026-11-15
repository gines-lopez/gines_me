import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

// Portadas blueprint generadas automáticamente por scripts/blueprint/generate.mjs
// (src/assets/diario/<slug>.png). Si un post define su propio `heroImage`, manda ese.
const covers = import.meta.glob<{ default: ImageMetadata }>('../assets/diario/*.png', {
	eager: true,
});

export function getCover(post: CollectionEntry<'blog'>): ImageMetadata | undefined {
	return post.data.heroImage ?? covers[`../assets/diario/${post.id}.png`]?.default;
}

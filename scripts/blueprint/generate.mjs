#!/usr/bin/env node
// Genera automáticamente la portada "blueprint" de cada edición publicada del diario.
//
// Se ejecuta solo: la integración de `astro.config.mjs` lo llama al arrancar
// `astro dev` y `astro build` (también en GitHub Actions). No hace falta tocar nada.
//
// - Número de edición: orden por `pubDate` entre los posts publicados
//   (se puede forzar con `edition` en el frontmatter).
// - Datos del mes: opcionales, con `stats` en el frontmatter.
// - Salida: src/assets/diario/<slug>.png (ignorado por git). El sitio la encuentra
//   por el nombre del post (src/lib/cover.ts); no se escribe nada en los .md.
// - Solo regenera lo que ha cambiado (manifest con hash de los datos + plantilla).
// - Si Chrome no está disponible, avisa y sigue: el build nunca falla por una portada.
//
// Uso manual (opcional):
//   npm run blueprint              → regenera todo lo que haya cambiado
//   npm run blueprint -- --force   → regenera todas
//   npm run blueprint -- --demo ruta.png

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	unlinkSync,
	writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import sharp from 'sharp';
import { blueprintHtml } from './template.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const blogDir = path.join(root, 'src/content/blog');
const outDir = path.join(root, 'src/assets/diario');
const manifestFile = path.join(outDir, 'manifest.json');
const templateSource = readFileSync(path.join(here, 'template.mjs'), 'utf8');
const fonts = {
	inter: pathToFileURL(path.join(here, 'fonts/inter-latin.woff2')).href,
	roboto: pathToFileURL(path.join(here, 'fonts/roboto-latin.woff2')).href,
};

const consoleLogger = { info: console.log, warn: console.warn };

function findChrome() {
	if (process.env.CHROME_PATH) {
		if (existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
		throw new Error(`CHROME_PATH no existe: ${process.env.CHROME_PATH}`);
	}
	const found = [
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/google-chrome-stable',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser',
	].find((p) => existsSync(p));
	if (!found) throw new Error('no encuentro Chrome (puedes indicarlo con CHROME_PATH)');
	return found;
}

async function render(data, outFile) {
	const tmp = mkdtempSync(path.join(tmpdir(), 'blueprint-'));
	try {
		const htmlFile = path.join(tmp, 'index.html');
		const rawPng = path.join(tmp, 'raw.png');
		writeFileSync(htmlFile, blueprintHtml({ ...data, fonts }));
		execFileSync(
			findChrome(),
			[
				'--headless=new',
				'--disable-gpu',
				'--hide-scrollbars',
				'--allow-file-access-from-files',
				'--force-device-scale-factor=1',
				'--window-size=1600,900',
				// En CI (Ubuntu) el sandbox de Chrome puede no estar disponible;
				// solo renderizamos HTML local generado por nosotros.
				...(process.env.CI ? ['--no-sandbox'] : []),
				`--screenshot=${rawPng}`,
				pathToFileURL(htmlFile).href,
			],
			{ stdio: 'ignore', timeout: 60_000 },
		);
		if (!existsSync(rawPng)) throw new Error('Chrome no generó la captura');
		const info = await sharp(rawPng)
			.png({ palette: true, quality: 90, compressionLevel: 9 })
			.toFile(outFile);
		return info.size;
	} finally {
		rmSync(tmp, { recursive: true, force: true });
	}
}

/** Lee los posts publicados y les asigna número de edición por fecha. */
function readEditions() {
	const posts = readdirSync(blogDir)
		.filter((f) => /\.mdx?$/.test(f))
		.map((file) => {
			const { frontmatter: fm } = parseFrontmatter(readFileSync(path.join(blogDir, file), 'utf8'));
			return { slug: file.replace(/\.mdx?$/, '').toLowerCase(), fm };
		})
		.filter(({ fm }) => !fm.draft)
		.sort((a, b) => new Date(a.fm.pubDate) - new Date(b.fm.pubDate) || a.slug.localeCompare(b.slug));

	return posts.map(({ slug, fm }, i) => ({
		slug,
		data: {
			edition: fm.edition ?? i + 1,
			title: fm.title,
			date: new Date(fm.pubDate),
			stats: fm.stats ?? [],
		},
	}));
}

/**
 * Genera las portadas que falten o hayan cambiado.
 * @param {{ force?: boolean, soft?: boolean, logger?: {info: Function, warn: Function} }} [opts]
 */
export async function generateCovers({ force = false, soft = true, logger = consoleLogger } = {}) {
	mkdirSync(outDir, { recursive: true });
	let manifest = {};
	try {
		manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
	} catch {}

	const editions = readEditions();
	const next = {};
	let generated = 0;

	for (const { slug, data } of editions) {
		const outFile = path.join(outDir, `${slug}.png`);
		const hash = createHash('sha1')
			.update(JSON.stringify(data) + templateSource)
			.digest('hex');

		if (!force && manifest[slug] === hash && existsSync(outFile)) {
			next[slug] = hash;
			continue;
		}
		try {
			const size = await render(data, outFile);
			next[slug] = hash;
			generated++;
			logger.info(`Portada Nº ${data.edition} → src/assets/diario/${slug}.png (${Math.round(size / 1024)} KB)`);
		} catch (err) {
			const hasOld = existsSync(outFile);
			const msg = `No se pudo generar la portada de «${slug}»: ${err.message}. ${
				hasOld ? 'Se mantiene la portada anterior.' : 'El post se publicará sin portada.'
			}`;
			if (!soft) throw new Error(msg);
			logger.warn(msg);
			// Conserva la portada anterior (sin hash, para reintentarlo en el próximo build)
			if (hasOld) next[slug] = manifest[slug] === hash ? '' : (manifest[slug] ?? '');
		}
	}

	// Limpia portadas de posts que ya no existen o han vuelto a borrador
	for (const file of readdirSync(outDir)) {
		const slug = file.replace(/\.png$/, '');
		if (file.endsWith('.png') && !(slug in next)) unlinkSync(path.join(outDir, file));
	}
	writeFileSync(manifestFile, `${JSON.stringify(next, null, '\t')}\n`);

	return { total: editions.length, generated };
}

// --- Uso desde la línea de comandos ---
const isCli = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isCli) {
	const args = process.argv.slice(2);
	try {
		if (args[0] === '--demo') {
			const out = path.resolve(args[1] ?? 'blueprint-demo.png');
			const size = await render(
				{ edition: 1, title: 'Noviembre’26 - Ejemplo de edición', date: new Date('2026-11-30'), stats: [] },
				out,
			);
			console.log(`✓ Demo → ${out} (${Math.round(size / 1024)} KB)`);
		} else {
			const { total, generated } = await generateCovers({ force: args.includes('--force'), soft: false });
			console.log(`✓ ${total} ediciones publicadas, ${generated} portadas generadas.`);
		}
	} catch (err) {
		console.error(`✗ ${err.message}`);
		process.exit(1);
	}
}

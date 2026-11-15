// Plantilla HTML de la portada "blueprint" de cada edición del diario.
// Se renderiza a 1600×900 (16:9, igual que las tarjetas del blog).

const esc = (s = '') =>
	String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const pad = (n) => String(n).padStart(2, '0');

/**
 * @param {object} d
 * @param {number} d.edition
 * @param {string} d.title
 * @param {Date} d.date
 * @param {{label: string, value: string, note?: string}[]} [d.stats]
 * @param {{inter: string, roboto: string}} d.fonts  URLs file:// de las fuentes
 */
export function blueprintHtml({ edition, title, date, stats = [], fonts }) {
	const month = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric', timeZone: 'UTC' });
	const monthCap = month.charAt(0).toUpperCase() + month.slice(1);
	const fecha = date.toLocaleDateString('es-ES', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		timeZone: 'UTC',
	});

	const statsHtml = stats
		.map(
			(s) => `
			<div class="stat">
				<div class="stat__value">${esc(s.value)}</div>
				<div class="stat__label">${esc(s.label)}</div>
				${s.note ? `<div class="stat__note">${esc(s.note)}</div>` : ''}
			</div>`,
		)
		.join('');

	return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; font-weight: 100 900; src: url("${fonts.inter}") format("woff2"); }
@font-face { font-family: Roboto; font-weight: 100 900; src: url("${fonts.roboto}") format("woff2"); }
:root { --paper: #F5F2EA; --ink: #1D3557; --ink-soft: rgba(29,53,87,.62); }
* { box-sizing: border-box; }
html, body { margin: 0; width: 1600px; height: 900px; overflow: hidden; }
body {
	background-color: var(--paper);
	background-image:
		linear-gradient(rgba(29,53,87,.13) 1px, transparent 1px),
		linear-gradient(90deg, rgba(29,53,87,.13) 1px, transparent 1px),
		linear-gradient(rgba(29,53,87,.05) 1px, transparent 1px),
		linear-gradient(90deg, rgba(29,53,87,.05) 1px, transparent 1px);
	background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
	background-position: 50px 50px;
	color: var(--ink);
	font-family: Inter, sans-serif;
	position: relative;
}
/* Marco doble de plano */
.frame { position: absolute; inset: 40px; border: 4px solid var(--ink); }
.frame::after { content: ""; position: absolute; inset: 10px; border: 1.5px solid var(--ink); }
/* Marcas de registro en las esquinas */
.reg { position: absolute; width: 36px; height: 36px; }
.reg::before, .reg::after { content: ""; position: absolute; background: var(--ink); }
.reg::before { left: 17px; top: 0; width: 2px; height: 36px; }
.reg::after { top: 17px; left: 0; height: 2px; width: 36px; }
.reg--tl { left: -20px; top: -20px; } .reg--tr { right: -20px; top: -20px; }
.reg--bl { left: -20px; bottom: -20px; } .reg--br { right: -20px; bottom: -20px; }

.content { position: absolute; inset: 56px; padding: 40px 60px 0; display: flex; flex-direction: column; }
.top { display: flex; justify-content: space-between; font-weight: 700; font-size: 22px; letter-spacing: .14em; text-transform: uppercase; }
.top span:last-child { letter-spacing: .04em; text-transform: none; }

.main { display: flex; align-items: flex-end; gap: 56px; margin-top: auto; }
.main--solo { margin-bottom: auto; padding-bottom: 20px; }
.edition { font-weight: 800; font-size: 190px; line-height: .8; letter-spacing: -.05em; white-space: nowrap; flex: none; }
.edition small { display: block; font-size: 20px; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 22px; font-weight: 700; }
.heading { padding-bottom: 6px; min-width: 0; }
.month { font-weight: 700; font-size: 30px; letter-spacing: .02em; color: var(--ink-soft); margin-bottom: 10px; }
.title {
	font-weight: 800; font-size: 60px; line-height: 1.05; letter-spacing: -.025em;
	display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.stats { display: grid; margin-bottom: 0; grid-template-columns: repeat(${Math.max(stats.length, 1)}, 1fr); gap: 0; margin: 48px 0 0; border-top: 2px solid var(--ink); }
.stat { padding: 22px 28px 26px 0; position: relative; }
.stat + .stat { padding-left: 28px; border-left: 1.5px dashed var(--ink-soft); }
.stat__value { font-weight: 800; font-size: 64px; line-height: 1; letter-spacing: -.03em; }
.stat__label { font-weight: 700; font-size: 24px; margin-top: 10px; }
.stat__note { font-family: Roboto, sans-serif; font-size: 21px; color: var(--ink-soft); margin-top: 4px; }

/* Cajetín de plano */
.cajetin { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; border-top: 2px solid var(--ink); margin: ${stats.length ? '0' : '48px'} -60px 0; }
.cajetin div { padding: 14px 24px 18px; border-left: 1.5px solid var(--ink); }
.cajetin div:first-child { border-left: none; }
.cajetin small { display: block; font-size: 15px; font-weight: 700; letter-spacing: .14em; color: var(--ink-soft); margin-bottom: 4px; }
.cajetin span { font-size: 24px; font-weight: 700; }
</style></head>
<body>
	<div class="frame"><i class="reg reg--tl"></i><i class="reg reg--tr"></i><i class="reg reg--bl"></i><i class="reg reg--br"></i></div>
	<div class="content">
		<div class="top"><span>El diario · Building in public</span><span>gines.me</span></div>
		<div class="main${stats.length ? '' : ' main--solo'}">
			<div class="edition"><small>Edición</small>Nº ${pad(edition)}</div>
			<div class="heading">
				<div class="month">${esc(monthCap)}</div>
				<div class="title">${esc(title)}</div>
			</div>
		</div>
		${stats.length ? `<div class="stats">${statsHtml}</div>` : ''}
		<div class="cajetin">
			<div><small>PROYECTO</small><span>Docente que emprende</span></div>
			<div><small>EDICIÓN</small><span>Nº ${pad(edition)}</span></div>
			<div><small>FECHA</small><span>${fecha}</span></div>
			<div><small>AUTOR</small><span>Ginés López</span></div>
		</div>
	</div>
</body></html>`;
}

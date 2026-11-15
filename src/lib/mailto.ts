import { CONTACT_EMAIL } from '../consts';

/** Construye un enlace mailto con asunto y cuerpo prellenados. */
export function mailto(subject: string, body?: string): string {
	const params = [`subject=${encodeURIComponent(subject)}`];
	if (body) params.push(`body=${encodeURIComponent(body)}`);
	return `mailto:${CONTACT_EMAIL}?${params.join('&')}`;
}

/** Correo para pedir una formación, ponencia o asesoría. */
export const formacionMailto = mailto(
	'Formación para [nombre del centro]',
	`Hola, Ginés:

Te escribo desde [centro o institución].

Tema que nos interesa: IA en el aula / Emprender siendo docente
Formato: ponencia / formación en centro / asesoría
Fechas aproximadas:
Número de docentes:
Algo más que deba saber:

Gracias.`,
);

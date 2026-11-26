import { CONTACT_EMAIL } from '../consts';

/** Construye un enlace mailto con asunto y cuerpo prellenados. */
export function mailto(subject: string, body?: string): string {
	const params = [`subject=${encodeURIComponent(subject)}`];
	if (body) params.push(`body=${encodeURIComponent(body)}`);
	return `mailto:${CONTACT_EMAIL}?${params.join('&')}`;
}

import { HIBIKI_HOST } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 7
	}
};

export const load = (async ({ params }) => {
	const resp = await fetch(`${HIBIKI_HOST}/manga/${params.id}`);
	return await resp.json();
}) satisfies PageServerLoad;

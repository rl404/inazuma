import type { RequestHandler } from './$types';
import { HIBIKI_HOST } from '$env/static/private';
import type { MagazineResponseData } from './[id]/+server';

export type MagazinesResponse = {
	status: number;
	message: string;
	data: MagazineResponseData[];
};

export const GET = (async ({ url }) => {
	const queries = ['name', 'page', 'limit']
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');

	const resp = await fetch(`${HIBIKI_HOST}/magazines?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;

import type { RequestHandler } from './$types';
import { HIBIKI_HOST } from '$env/static/private';
import type { mangaResponseData } from './[id]/+server';

export type mangasResponse = {
	status: number;
	message: string;
	data: mangaResponseData[];
};

export const GET = (async ({ url }) => {
	const queries = ['mode', 'title', 'type', 'start_date', 'end_date', 'sort', 'page', 'limit']
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');

	const resp = await fetch(`${HIBIKI_HOST}/manga?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;

import type { RequestHandler } from './$types';
import { HIBIKI_HOST } from '$env/static/private';

export type authorsResponse = {
	status: number;
	message: string;
	data: authorResponseData;
};

type authorResponseData = {
	id: number;
	first_name: string;
	last_name: string;
};

export const GET = (async ({ url }) => {
	const queries = ['name', 'page', 'limit']
		.map((q) => `${q}=${url.searchParams.get(q) ?? ''}`)
		.join('&');

	const resp = await fetch(`${HIBIKI_HOST}/authors?${queries}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;

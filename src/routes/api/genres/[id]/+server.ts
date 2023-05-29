import type { RequestHandler } from './$types';
import { HIBIKI_HOST } from '$env/static/private';

type genreResponse = {
	status: number;
	message: string;
	data: genreResponseData;
};

export type genreResponseData = {
	id: number;
	name: string;
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${HIBIKI_HOST}/genres/${params.id}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;

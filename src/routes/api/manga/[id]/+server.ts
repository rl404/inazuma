import type { RequestHandler } from './$types';
import { HIBIKI_HOST } from '$env/static/private';

export type mangaResponse = {
	status: number;
	message: string;
	data: mangaResponseData;
};

export type mangaResponseData = {
	id: number;
	title: string;
	alternative_titles: {
		synonyms: string[];
		english: string;
		japanese: string;
	};
	picture: string;
	start_date: date;
	end_date: date;
	synopsis: string;
	background: string;
	nsfw: boolean;
	type: string;
	status: string;
	chapter: number;
	volume: number;
	mean: number;
	rank: number;
	popularity: number;
	member: number;
	voter: number;
	genres: {
		id: number;
		name: string;
	}[];
	pictures: string[];
	related: {
		id: number;
		title: string;
		relation: string;
		picture: string;
	}[];
	authors: {
		id: number;
		name: string;
		role: string;
	}[];
	serialization: {
		id: number;
		name: string;
	}[];
	updated_at: Date;
};

type date = {
	year: number;
	month: number;
	day: number;
};

export const GET = (async ({ params }) => {
	const resp = await fetch(`${HIBIKI_HOST}/manga/${params.id}`);
	const data = await resp.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'max-age=86400, s-maxage=86400, stale-while-revalidate=86400'
		},
		status: resp.status
	});
}) satisfies RequestHandler;

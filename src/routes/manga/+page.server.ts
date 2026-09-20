import { env } from '$env/dynamic/private';
import { handleAPIResponse } from '$lib/utils';
import type { GenresResponse } from '../api/genres/+server';
import type { MagazinesResponse } from '../api/magazines/+server';
import type { PageServerLoad } from './$types';

export type MangaSearchResponse = {
	magazines: MagazinesResponse;
	genres: GenresResponse;
};

export const config = {
	isr: {
		expiration: 60 * 60 * 24 * 7
	}
};

export const load = (async () => {
	const [magazineResp, genreResp] = await Promise.all([
		await fetch(`${env.HIBIKI_HOST}/magazines?limit=-1`),
		await fetch(`${env.HIBIKI_HOST}/genres?limit=-1`)
	]);
	return {
		magazines: await handleAPIResponse(magazineResp),
		genres: await handleAPIResponse(genreResp)
	};
}) satisfies PageServerLoad;

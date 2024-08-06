<script lang="ts">
	import Head from '$lib/components/commons/Head.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import { toURL } from '$lib/utils';
	import { NSFW } from '$lib/utils/theme';
	import type { MangaResponse } from '../../../api/manga/[id]/+server';
	import Content1 from './Content1.svelte';
	import Content2 from './Content2.svelte';
	import Cover from './Cover.svelte';

	export let data: MangaResponse;

	$: manga = data.data;

	let nsfw: boolean = false;

	NSFW.subscribe((v) => (nsfw = v));
</script>

<Head title={manga.title} description={manga.synopsis} image={manga.picture} />

<svelte:head>
	<link
		rel="canonical"
		href={`https://inazuma.rl404.com/manga/${manga.id}/${toURL(manga.title)}`}
	/>
</svelte:head>

<PortraitPage>
	<Cover {manga} {nsfw} />
</PortraitPage>

<PortraitPage>
	<Content1 {manga} {nsfw} />
</PortraitPage>

<PortraitPage>
	<Content2 {manga} />
</PortraitPage>

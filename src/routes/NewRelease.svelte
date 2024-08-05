<script lang="ts">
	import Loading from '$lib/components/commons/Loading.svelte';
	import MangaGrid from '$lib/components/layouts/MangaGrid.svelte';
	import { getAxiosError } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { MangaResponseData } from './api/manga/[id]/+server';

	const today = new Date().toISOString().slice(0, 10);

	let data: MangaResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/manga?end_date=${today}&nsfw=false&sort=-start_date&limit=20`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<div class="col-span-5 flex items-center justify-between">
	<div class="font-bold lg:text-xl">New Release</div>
	<a href="/manga?end_date={today}&nsfw=false&sort=-start_date" class="more-button">More</a>
</div>

{#if loading}
	<div class="col-span-5 flex items-center justify-center">
		<Loading class="size-6" />
	</div>
{:else if error !== ''}
	<div class="col-span-5 text-center text-red-500">
		{error}
	</div>
{:else}
	{#each data as manga}
		<MangaGrid data={manga} />
	{/each}
{/if}

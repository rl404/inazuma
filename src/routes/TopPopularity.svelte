<script lang="ts">
	import { onMount } from 'svelte';
	import type { mangaResponseData } from './api/manga/[id]/+server';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import MangaGrid from '$lib/components/layouts/MangaGrid.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: mangaResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/manga?sort=-member&limit=5`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<div class="grid grid-cols-5 gap-1">
	<div class="col-span-5 flex items-center justify-between">
		<div class="md:text-lg lg:text-xl">Most Popular</div>
		<a href="/manga?sort=-member" class="text-xs md:text-sm lg:text-base text-neutral-400">more</a>
	</div>
	{#if loading}
		<div class="col-span-5">
			<SpinnerIcon class="w-6 h-6 animate-spin text-neutral-200 fill-black mx-auto" />
		</div>
	{:else if error !== ''}
		<div class="col-span-5 text-center text-red-500">
			{error}
		</div>
	{:else}
		{#each data as manga}
			<MangaGrid data={manga} class="border-2 border-black" />
		{/each}
	{/if}
</div>

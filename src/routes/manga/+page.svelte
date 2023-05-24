<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import type { mangaResponseData } from '../api/manga/[id]/+server';
	import { getAxiosError } from '$lib/utils';
	import MangaGrid from '$lib/components/layouts/MangaGrid.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';

	let data: mangaResponseData[] = [];
	let newData: mangaResponseData[] = [];
	let title: string = '';
	let sort: string = '-member';
	let page: number = 1;
	let limit: number = 30;
	let hasMore: boolean = true;
	let loading: boolean = false;
	let error: string = '';
	let listArea: HTMLElement;

	$: data = [...data, ...newData];

	onMount(() => {
		fetchData();
	});

	const fetchData = () => {
		loading = true;
		error = '';

		axios
			.get(`/api/manga?title=${title}&sort=${sort}&page=${page}&limit=${limit}`)
			.then((resp) => {
				newData = resp.data.data;
				if (newData.length > 0) {
					hasMore = true;
				} else {
					hasMore = false;
				}
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const loadMore = () => {
		page++;
		fetchData();
	};

	const onSearch = () => {
		data = [];
		newData = [];
		page = 1;
		fetchData();
	};
</script>

<Head title="Manga List" />

<div class="grid gap-5">
	<PortraitPage>
		<div class="p-5 grid grid-cols-12 gap-1">
			<div class="col-span-12 text-xs">0. Manga List</div>
			<div class="col-span-12 flex gap-1">
				<InputText
					placeholder="anime title..."
					bind:value={title}
					on:enter={onSearch}
					class="grow"
				/>
				<div>
					<IconButton title="search" on:click={onSearch}>
						<SearchIcon class="w-4 h-4" />
					</IconButton>
				</div>
			</div>
			<div class="col-span-12 grid grid-cols-5 gap-1" bind:this={listArea}>
				{#each data as manga}
					<MangaGrid data={manga} class="border-2 border-black" />
				{/each}

				{#if !loading && data.length === 0 && error === ''}
					<div class="col-span-5 text-center">no results</div>
				{/if}
				{#if error !== ''}
					<div class="col-span-5 text-center text-red-500">{error}</div>
				{/if}
				{#if loading}
					<div class="col-span-5">
						<SpinnerIcon class="w-4 h-4 animate-spin text-neutral-200 fill-black " />
					</div>
				{/if}
				<InfiniteScroll {hasMore} threshold={100} on:loadMore={loadMore} />
			</div>
		</div>
	</PortraitPage>
</div>

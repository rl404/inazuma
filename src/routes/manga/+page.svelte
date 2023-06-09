<script lang="ts">
	import { getAxiosError, groupArr, toDate } from '$lib/utils';
	import MangaGrid from '$lib/components/layouts/MangaGrid.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import Head from '$lib/components/Head.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { page as appPage } from '$app/stores';
	import type { mangaResponseData } from '../api/manga/[id]/+server';
	import SortButton from './SortButton.svelte';
	import FilterButton from './FilterButton.svelte';

	let data: mangaResponseData[] = [];
	let newData: mangaResponseData[] = [];
	let newPageData: mangaResponseData[][] = [];
	let title: string = '';
	let type: string = '';
	let status: string = '';
	let startDate: Date | null;
	let endDate: Date | null;
	let authorID: string = '';
	let magazineID: string = '';
	let genreID: string = '';
	let nsfw: string = '';
	let sort: string = '-mean';
	let page: number = 1;
	let limit: number = 25;
	let total: number = 0;
	let hasMore: boolean = true;
	let loading: boolean = false;
	let error: string = '';

	$: data = [...data, ...newData];
	$: newPageData = groupArr(data, limit);

	onMount(() => {
		const params = $appPage.url.searchParams;

		title = params.get('title') || '';
		type = params.get('type') || '';
		status = params.get('status') || '';
		startDate = toDate(params.get('start_date'));
		endDate = toDate(params.get('end_date'));
		authorID = params.get('author_id') || '';
		magazineID = params.get('magazine_id') || '';
		genreID = params.get('genre_id') || '';
		nsfw = params.get('nsfw') || '';
		sort = params.get('sort') || '-mean';

		fetchData();
	});

	const fetchData = () => {
		loading = true;
		error = '';

		const queries = Object.entries({
			title: title,
			type: type,
			status: status,
			start_date: !startDate ? '' : startDate.toISOString().slice(0, 10),
			end_date: !endDate ? '' : endDate.toISOString().slice(0, 10),
			author_id: authorID,
			magazine_id: magazineID,
			genre_id: genreID,
			nsfw: nsfw,
			sort: sort,
			page: page,
			limit: limit
		})
			.map((v) => `${v[0]}=${v[1] ?? ''}`)
			.join('&');

		axios
			.get(`/api/manga?${queries}`)
			.then((resp) => {
				newData = resp.data.data;
				total = resp.data.meta.total;
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
		newPageData = [];
		page = 1;
		fetchData();
	};
</script>

<Head title="Manga List" />

<div class="grid gap-5">
	<PortraitPage>
		<div class="p-5 grid grid-cols-12 gap-1">
			<div class="col-span-12 text-xs md:text-sm lg:text-base">
				0. Manga List ({total.toLocaleString()})
			</div>
			<div class="col-span-12 flex gap-1">
				<InputText
					placeholder="anime title..."
					bind:value={title}
					on:enter={onSearch}
					class="grow md:text-lg lg:text-xl"
					inputClass="bg-gradient-to-r from-white to-red-200 dark:from-neutral-800 dark:to-red-900"
				/>
				<div class="flex items-center gap-1">
					<IconButton title="search" on:click={onSearch}>
						<SearchIcon class="w-4 h-4 md:w-5 md:h-5" />
					</IconButton>
					<SortButton bind:value={sort} on:sort={onSearch} />
					<FilterButton
						bind:type
						bind:status
						bind:startDate
						bind:endDate
						bind:authorID
						bind:magazineID
						bind:genreID
						on:submit={onSearch}
					/>
				</div>
			</div>
			<div class="col-span-12 grid grid-cols-5 gap-1">
				{#each data.slice(0, limit) as manga}
					<MangaGrid data={manga} class="border-2 border-black" />
				{/each}

				{#if !loading && data.length === 0 && error === ''}
					<div class="col-span-5 text-center">no results</div>
				{/if}
			</div>
		</div>
	</PortraitPage>

	{#each newPageData.slice(1) as newPage}
		<PortraitPage>
			<div class="p-5 grid grid-cols-5 gap-1">
				{#each newPage as manga}
					<MangaGrid data={manga} class="border-2 border-black" />
				{/each}
			</div>
		</PortraitPage>
	{/each}

	{#if error !== ''}
		<div class="text-center text-red-500">asd{error}</div>
	{/if}
	{#if loading}
		<SpinnerIcon class="w-5 h-5 animate-spin text-neutral-200 fill-black mx-auto" />
	{/if}

	<InfiniteScroll {hasMore} threshold={100} window={true} on:loadMore={loadMore} />
</div>

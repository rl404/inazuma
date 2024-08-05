<script lang="ts">
	import { goto } from '$app/navigation';
	import { page as appPage } from '$app/stores';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import InfiniteScroll from '$lib/components/commons/InfiniteScroll.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import MangaGrid from '$lib/components/layouts/MangaGrid.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import { getAxiosError, groupArr, toDate } from '$lib/utils';
	import axios from 'axios';
	import type { MangaResponseData } from '../api/manga/[id]/+server';
	import type { MangaSearchResponse } from './+page.server';
	import FilterButton from './FilterButton.svelte';
	import SortButton from './SortButton.svelte';

	export let data: MangaSearchResponse;

	let mangaData: MangaResponseData[] = [];
	let newData: MangaResponseData[] = [];
	let newPageData: MangaResponseData[][] = [];
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

	$: mangaData = [...mangaData, ...newData];
	$: newPageData = groupArr(mangaData, limit);
	$: $appPage && onURLChange();

	const onURLChange = () => {
		mangaData = [];
		newData = [];
		newPageData = [];

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
	};

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
		page = 1;

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
			sort: sort
		})
			.map((v) => `${v[0]}=${v[1] ?? ''}`)
			.join('&');

		goto(`?${queries}`);
	};
</script>

<Head title="Manga List" />

<PortraitPage>
	<div class="grid grid-cols-5 gap-1">
		<div class="col-span-5">
			0. Manga List ({total.toLocaleString()})
		</div>
		<div class="col-span-5 flex gap-1">
			<TextInput
				placeholder="anime title..."
				class="grow lg:text-xl"
				inputClass="bg-gradient-to-r from-white to-red-200"
				bind:value={title}
				on:enter={onSearch}
				on:reset={onSearch}
			/>
			<IconButton title="search" on:click={onSearch}>
				<SearchIcon class="size-4 lg:size-5" />
			</IconButton>
			<SortButton bind:value={sort} on:sort={onSearch} />
			<FilterButton
				magazines={data.magazines.data}
				genres={data.genres.data}
				bind:type
				bind:status
				bind:startDate
				bind:endDate
				bind:authorID
				bind:magazineID
				bind:genreID
				bind:nsfw
				on:submit={onSearch}
			/>
		</div>
		{#each mangaData.slice(0, limit) as manga}
			<MangaGrid data={manga} />
		{/each}
		{#if !loading && mangaData.length === 0 && error === ''}
			<div class="col-span-5 text-center">no results</div>
		{/if}
	</div>
</PortraitPage>

{#each newPageData.slice(1) as newPage}
	<PortraitPage>
		<div class="grid grid-cols-5 gap-1">
			{#each newPage as manga}
				<MangaGrid data={manga} />
			{/each}
		</div>
	</PortraitPage>
{/each}

{#if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{/if}

{#if loading}
	<Loading class="size-5" />
{/if}

<InfiniteScroll {hasMore} on:loadMore={loadMore} />

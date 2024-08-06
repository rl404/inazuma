<script lang="ts">
	import { goto } from '$app/navigation';
	import { page as appPage } from '$app/stores';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import InfiniteScroll from '$lib/components/commons/InfiniteScroll.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import { getAxiosError, groupArr } from '$lib/utils';
	import axios from 'axios';
	import type { MagazineResponseData } from '../api/magazines/[id]/+server';

	let data: MagazineResponseData[] = [];
	let newData: MagazineResponseData[] = [];
	let newPageData: MagazineResponseData[][] = [];
	let name: string = '';
	let page: number = 1;
	let limit: number = 55;
	let total: number = 0;
	let hasMore: boolean = true;
	let loading: boolean = false;
	let error: string = '';

	$: data = [...data, ...newData];
	$: newPageData = groupArr(data, limit);
	$: $appPage && onURLChange();

	const onURLChange = () => {
		data = [];
		newData = [];
		newPageData = [];

		const params = $appPage.url.searchParams;
		name = params.get('name') || '';
		fetchData();
	};

	const fetchData = () => {
		loading = true;
		error = '';

		const queries = Object.entries({
			name: name,
			page: page,
			limit: limit
		})
			.map((v) => `${v[0]}=${v[1] ?? ''}`)
			.join('&');

		axios
			.get(`/api/magazines?${queries}`)
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
		goto(`?name=${name}`);
	};
</script>

<Head title="Magazine List" />

<svelte:head>
	<link rel="canonical" href={`https://inazuma.rl404.com/magazines`} />
</svelte:head>

<PortraitPage>
	<div class="grid grid-cols-5 gap-1">
		<div class="col-span-5">
			0. Magazine List ({total.toLocaleString()})
		</div>
		<div class="col-span-5 flex gap-1">
			<TextInput
				placeholder="magazine name..."
				class="grow lg:text-xl"
				inputClass="bg-gradient-to-r from-white to-green-200"
				bind:value={name}
				on:enter={onSearch}
				on:reset={onSearch}
			/>
			<IconButton title="search" on:click={onSearch}>
				<SearchIcon class="size-4 lg:size-5" />
			</IconButton>
		</div>
		{#each data.slice(0, limit) as magazine}
			<a
				href="/manga?magazine_id={magazine.id}"
				title={magazine.name}
				class="flex aspect-video items-center justify-center border-2 border-black bg-gradient-to-r from-white to-green-50 p-1 text-center lg:p-2"
			>
				<span class="line-clamp-2 text-sm lg:text-base">
					{magazine.name}
				</span>
			</a>
		{/each}
		{#if !loading && data.length === 0 && error === ''}
			<div class="col-span-5 text-center">no results</div>
		{/if}
	</div>
</PortraitPage>

{#each newPageData.slice(1) as newPage}
	<PortraitPage>
		<div class="grid grid-cols-5 gap-1">
			{#each newPage as magazine}
				<a
					href="/manga?magazine_id={magazine.id}"
					title={magazine.name}
					class="flex aspect-video items-center justify-center border-2 border-black bg-gradient-to-r from-white to-green-50 p-1 text-center lg:p-2"
				>
					<span class="line-clamp-2 text-sm lg:text-base">
						{magazine.name}
					</span>
				</a>
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

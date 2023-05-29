<script lang="ts">
	import { page as appPage } from '$app/stores';
	import Head from '$lib/components/Head.svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import PortraitPage from '$lib/components/pages/PortraitPage.svelte';
	import { getAxiosError, groupArr } from '$lib/utils';
	import axios from 'axios';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { onMount } from 'svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import type { authorResponseData } from '../api/authors/[id]/+server';

	let data: authorResponseData[] = [];
	let newData: authorResponseData[] = [];
	let newPageData: authorResponseData[][] = [];
	let name: string = '';
	let page: number = 1;
	let limit: number = 55;
	let total: number = 0;
	let hasMore: boolean = true;
	let loading: boolean = false;
	let error: string = '';

	$: data = [...data, ...newData];
	$: newPageData = groupArr(data, limit);

	onMount(() => {
		const params = $appPage.url.searchParams;
		name = params.get('name') || '';
		fetchData();
	});

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
			.get(`/api/authors?${queries}`)
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

<Head title="Author List" />

<div class="grid gap-5">
	<PortraitPage>
		<div class="p-5 grid grid-cols-12 gap-1">
			<div class="col-span-12 text-xs md:text-sm lg:text-base">
				0. Author List ({total.toLocaleString()})
			</div>
			<div class="col-span-12 flex gap-1">
				<InputText
					placeholder="author name..."
					bind:value={name}
					on:enter={onSearch}
					class="grow md:text-lg lg:text-xl"
					inputClass="bg-gradient-to-r from-white to-blue-200 dark:from-neutral-800 dark:to-blue-900"
				/>
				<div class="flex items-center gap-1">
					<IconButton title="search" on:click={onSearch}>
						<SearchIcon class="w-4 h-4 md:w-5 md:h-5" />
					</IconButton>
				</div>
			</div>
			<div class="col-span-12 grid grid-cols-5 gap-1">
				{#each data.slice(0, limit) as author}
					<a
						class="border-2 border-black p-1 aspect-video flex items-center justify-center bg-gradient-to-r from-white to-blue-50 dark:from-neutral-800 dark:to-blue-950"
						href="/manga?author_id={author.id}"
						title="{author.first_name} {author.last_name}"
					>
						<div class="text-center line-clamp-2 md:text-lg lg:text-xl">
							{author.first_name}
							{author.last_name}
						</div>
					</a>
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
				{#each newPage as author}
					<a
						class="border-2 border-black p-1 aspect-video flex items-center justify-center bg-gradient-to-r from-white to-blue-50 dark:from-neutral-800 dark:to-blue-950"
						href="/manga?author_id={author.id}"
						title="{author.first_name} {author.last_name}"
					>
						<div class="text-center line-clamp-2 md:text-lg lg:text-xl">
							{author.first_name}
							{author.last_name}
						</div>
					</a>
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

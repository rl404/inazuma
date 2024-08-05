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
	import { formatAuthor, getAxiosError, groupArr } from '$lib/utils';
	import axios from 'axios';
	import type { AuthorResponseData } from '../api/authors/[id]/+server';

	let data: AuthorResponseData[] = [];
	let newData: AuthorResponseData[] = [];
	let newPageData: AuthorResponseData[][] = [];
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
		page = 1;
		goto(`?name=${name}`);
	};
</script>

<Head title="Author List" />

<PortraitPage>
	<div class="grid grid-cols-5 gap-1">
		<div class="col-span-5">
			0. Author List ({total.toLocaleString()})
		</div>
		<div class="col-span-5 flex gap-1">
			<TextInput
				placeholder="author name..."
				class="grow lg:text-xl"
				inputClass="bg-gradient-to-r from-white to-blue-200"
				bind:value={name}
				on:enter={onSearch}
				on:reset={onSearch}
			/>
			<IconButton title="search" on:click={onSearch}>
				<SearchIcon class="size-4 lg:size-5" />
			</IconButton>
		</div>
		{#each data.slice(0, limit) as author}
			<a
				href="/manga?author_id={author.id}"
				title={formatAuthor(author.first_name, author.last_name)}
				class="flex aspect-video items-center justify-center border-2 border-black bg-gradient-to-r from-white to-blue-50 p-1 text-center lg:p-2"
			>
				<span class="line-clamp-2 text-sm lg:text-base">
					{formatAuthor(author.first_name, author.last_name)}
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
			{#each newPage as author}
				<a
					href="/manga?author_id={author.id}"
					title={formatAuthor(author.first_name, author.last_name)}
					class="flex aspect-video items-center justify-center border-2 border-black bg-gradient-to-r from-white to-blue-50 p-1 text-center lg:p-2"
				>
					<span class="line-clamp-2 text-sm lg:text-base">
						{formatAuthor(author.first_name, author.last_name)}
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

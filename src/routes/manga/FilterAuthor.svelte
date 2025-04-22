<script lang="ts">
	import { clickAway, formatAuthor, getAxiosError } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { AuthorResponseData } from '../api/authors/[id]/+server';

	export let valueID: string;
	export let valueName: string;

	let open: boolean = false;
	let data: AuthorResponseData[] = [];
	let loading: boolean = false;

	var delayTimer: number;
	const onInput = () => {
		valueID = '';
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			if (valueName === '' || valueName.length < 3) return;
			onSearch();
		}, 500);
	};

	const onSearch = () => {
		open = false;
		loading = true;

		axios
			.get(`/api/authors?name=${valueName}&limit=-1`)
			.then((resp) => ((data = resp.data.data), (open = true)))
			.catch((err) => console.log(getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const onSelect = (id: number, name: string) => {
		open = false;
		valueID = id.toString();
		valueName = name;
	};

	const onClickAway = () => (open = false);

	onMount(() => {
		if (valueID === '') return;

		loading = true;

		axios
			.get(`/api/authors/${valueID}`)
			.then(
				(resp) => (valueName = formatAuthor(resp.data.data.first_name, resp.data.data.last_name))
			)
			.catch((err) => console.log(getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<div class="relative grid">
	<div>Author</div>
	<input
		type="text"
		placeholder="name"
		disabled={loading}
		class="w-full border border-black bg-white px-1 focus:outline-none disabled:bg-neutral-200"
		bind:value={valueName}
		on:input={onInput}
	/>
	{#if open && data.length > 0}
		<div
			class="absolute top-full mt-1 flex max-h-36 w-full flex-col gap-1 overflow-y-scroll border border-black bg-white"
			use:clickAway
			on:clickAway={onClickAway}
		>
			{#each data as author}
				<button
					title={formatAuthor(author.first_name, author.last_name)}
					class="w-full px-1 text-left text-xs break-all hover:bg-neutral-200"
					on:click={() => onSelect(author.id, formatAuthor(author.first_name, author.last_name))}
				>
					<span class="line-clamp-1">
						{formatAuthor(author.first_name, author.last_name)}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

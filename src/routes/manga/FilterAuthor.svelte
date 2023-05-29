<script lang="ts">
	import axios from 'axios';
	import { clickAway, formatAuthor, getAxiosError } from '$lib/utils';
	import type { authorResponseData } from '../api/authors/[id]/+server';
	import { onMount } from 'svelte';

	export let valueID: string;
	export let valueName: string;

	let open: boolean = false;
	let data: authorResponseData[] = [];
	let loading: boolean = false;
	let error: string = '';

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
		error = '';

		axios
			.get(`/api/authors?name=${valueName}&limit=-1`)
			.then((resp) => ((data = resp.data.data), (open = true)))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const onSelect = (id: number, name: string) => {
		open = false;
		valueID = id.toString();
		valueName = name;
	};

	const onClickAway = () => {
		open = false;
	};

	onMount(() => {
		if (valueID === '') return;

		loading = true;
		error = '';

		axios
			.get(`/api/authors/${valueID}`)
			.then(
				(resp) => (valueName = formatAuthor(resp.data.data.first_name, resp.data.data.last_name))
			)
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<div class="grid relative">
	<div class="text-neutral-400">Author</div>
	<input
		type="text"
		bind:value={valueName}
		on:input={onInput}
		disabled={loading}
		placeholder="name"
		class="w-full px-1 bg-white dark:bg-neutral-600 focus:outline-none disabled:bg-neutral-400 dark:disabled:bg-neutral-800"
	/>
	{#if open && data.length > 0}
		<div
			class="absolute w-full top-full bg-neutral-200 dark:bg-neutral-600 border border-neutral-400 max-h-36 overflow-y-scroll overflow-x-hidden"
			use:clickAway
			on:clickAway={onClickAway}
		>
			{#each data as author}
				<div
					class="px-1 text-sm hover:bg-neutral-400 hover:cursor-pointer"
					on:click={() => onSelect(author.id, formatAuthor(author.first_name, author.last_name))}
				>
					{formatAuthor(author.first_name, author.last_name)}
				</div>
			{/each}
		</div>
	{/if}
</div>

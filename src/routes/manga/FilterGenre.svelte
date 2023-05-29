<script lang="ts">
	import axios from 'axios';
	import { clickAway, getAxiosError } from '$lib/utils';
	import type { genreResponseData } from '../api/genres/[id]/+server';
	import { onMount } from 'svelte';

	export let valueID: string;
	export let valueName: string;

	let open: boolean = false;
	let data: genreResponseData[] = [];
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
			.get(`/api/genres?name=${valueName}&limit=-1`)
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
			.get(`/api/genres/${valueID}`)
			.then((resp) => (valueName = resp.data.data.name))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<div class="grid relative">
	<div class="text-neutral-400">genre</div>
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
			{#each data as genre}
				<div
					class="px-1 text-sm hover:bg-neutral-400 hover:cursor-pointer"
					on:click={() => onSelect(genre.id, genre.name)}
				>
					{genre.name}
				</div>
			{/each}
		</div>
	{/if}
</div>

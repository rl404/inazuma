<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import FilterIcon from '$lib/components/icons/FilterIcon.svelte';
	import { clickAway } from '$lib/utils';
	import type { GenreResponseData } from '../api/genres/[id]/+server';
	import type { MagazineResponseData } from '../api/magazines/[id]/+server';
	import FilterAuthor from './FilterAuthor.svelte';
	import FilterDate from './FilterDate.svelte';
	import FilterGenre from './FilterGenre.svelte';
	import FilterMagazine from './FilterMagazine.svelte';
	import FilterNsfw from './FilterNsfw.svelte';
	import FilterStatus from './FilterStatus.svelte';
	import FilterType from './FilterType.svelte';

	export let magazines: MagazineResponseData[];
	export let genres: GenreResponseData[];
	export let type: string;
	export let status: string;
	export let startDate: Date | null;
	export let endDate: Date | null;
	export let authorID: string;
	export let magazineID: string;
	export let genreID: string;
	export let nsfw: string;
	export let onSubmit: () => void;

	let authorName: string = '';
	let show: boolean = false;

	const onToggle = () => (show = !show);

	const onHide = () => (show = false);

	const onClick = () => {
		onHide();
		onSubmit();
	};

	const onReset = () => {
		type = '';
		status = '';
		startDate = null;
		endDate = null;
		authorID = '';
		authorName = '';
		magazineID = '';
		genreID = '';
	};
</script>

<div class="relative" use:clickAway on:clickAway={onHide}>
	<IconButton title="filter" on:click={onToggle}>
		<FilterIcon class="size-4 lg:size-5" />
	</IconButton>
	{#if show}
		<div
			class="absolute top-full right-0 z-10 mt-1 grid w-md grid-cols-6 gap-2 border-2 border-black bg-gradient-to-t from-red-200 to-white p-2 text-xs lg:text-base"
		>
			<div class="col-span-2">
				<FilterType bind:value={type} />
			</div>
			<div class="col-span-2">
				<FilterStatus bind:value={status} />
			</div>
			<div class="col-span-2">
				<FilterNsfw bind:value={nsfw} />
			</div>
			<div class="col-span-3">
				<FilterDate label="Start Date" bind:value={startDate} />
			</div>
			<div class="col-span-3">
				<FilterDate label="End Date" bind:value={endDate} />
			</div>
			<div class="col-span-2">
				<FilterAuthor bind:valueID={authorID} bind:valueName={authorName} />
			</div>
			<div class="col-span-2">
				<FilterMagazine bind:value={magazineID} {magazines} />
			</div>
			<div class="col-span-2">
				<FilterGenre bind:value={genreID} {genres} />
			</div>
			<Border class="col-span-6" />
			<button
				class="col-span-3 border border-black bg-white hover:bg-neutral-200"
				on:click={onReset}>Reset</button
			>
			<button
				class="col-span-3 border border-black bg-white hover:bg-neutral-200"
				on:click={onClick}>Submit</button
			>
		</div>
	{/if}
</div>

<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import FilterIcon from '$lib/components/icons/FilterIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	import FilterType from './FilterType.svelte';
	import FilterDate from './FilterDate.svelte';
	import FilterStatus from './FilterStatus.svelte';
	import FilterAuthor from './FilterAuthor.svelte';
	import Border from '$lib/components/Border.svelte';
	import FilterMagazine from './FilterMagazine.svelte';
	import FilterGenre from './FilterGenre.svelte';

	const dispatch = createEventDispatcher<{ submit: never }>();

	export let type: string;
	export let status: string;
	export let startDate: Date | null;
	export let endDate: Date | null;
	export let authorID: string;
	export let magazineID: string;
	export let genreID: string;

	let authorName: string = '';
	let magazineName: string = '';
	let genreName: string = '';

	let show: boolean = false;

	const onToggle = () => {
		show = !show;
	};

	const onHide = () => {
		show = false;
	};

	const onSubmit = () => {
		onHide();
		dispatch('submit');
	};

	const onReset = () => {
		type = '';
		status = '';
		startDate = null;
		endDate = null;
		authorID = '';
		authorName = '';
		magazineID = '';
		magazineName = '';
		genreID = '';
		genreName = '';
	};
</script>

<div class="relative">
	<IconButton title="filter" on:click={onToggle}>
		<FilterIcon class="w-4 h-4 md:w-5 md:h-5" />
	</IconButton>
	{#if show}
		<div
			class="absolute z-10 top-full right-0 mt-1 w-md p-1 border-2 border-black grid grid-cols-6 gap-2 bg-gradient-to-t from-red-200 to-white dark:from-red-900 dark:to-black text-xs md:text-sm lg:text-base"
		>
			<div class="col-span-3"><FilterType bind:value={type} /></div>
			<div class="col-span-3"><FilterStatus bind:value={status} /></div>
			<div class="col-span-3"><FilterDate bind:value={startDate} label="Start Date" /></div>
			<div class="col-span-3"><FilterDate bind:value={endDate} label="End Date" /></div>
			<div class="col-span-2">
				<FilterAuthor bind:valueID={authorID} bind:valueName={authorName} />
			</div>
			<div class="col-span-2">
				<FilterMagazine bind:valueID={magazineID} bind:valueName={magazineName} />
			</div>
			<div class="col-span-2">
				<FilterGenre bind:valueID={genreID} bind:valueName={genreName} />
			</div>
			<Border class="col-span-6" />
			<button
				on:click={onReset}
				class="col-span-3 bg-white dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-400"
				>Reset</button
			>
			<button
				on:click={onSubmit}
				class="col-span-3 bg-white dark:bg-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-400"
				>Submit</button
			>
		</div>
	{/if}
</div>

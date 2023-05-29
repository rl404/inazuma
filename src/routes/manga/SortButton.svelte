<script lang="ts">
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import SortIcon from '$lib/components/icons/SortIcon.svelte';
	import { clickAway } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ sort: never }>();

	export let value: string;

	const sorts = [
		{ label: 'Title ASC', value: 'title' },
		{ label: 'Title DESC', value: '-title' },
		{ label: 'Score ASC', value: 'mean' },
		{ label: 'Score DESC', value: '-mean' },
		{ label: 'Rank ASC', value: 'rank' },
		{ label: 'Rank DESC', value: '-rank' },
		{ label: 'Popularity ASC', value: 'popularity' },
		{ label: 'Popularity DESC', value: '-popularity' },
		{ label: 'Member ASC', value: 'member' },
		{ label: 'Member DESC', value: '-member' },
		{ label: 'Favorite ASC', value: 'favorite' },
		{ label: 'Favorite DESC', value: '-favorite' },
		{ label: 'Start Date ASC', value: 'start_date' },
		{ label: 'Start Date DESC', value: '-start_date' }
	];

	let show: boolean = false;

	const onToggle = () => {
		show = !show;
	};

	const onHide = () => {
		show = false;
	};

	const onSort = () => {
		onHide();
		dispatch('sort');
	};
</script>

<div class="relative" use:clickAway on:clickAway={onHide}>
	<IconButton title="sort" on:click={onToggle}>
		<SortIcon class="w-4 h-4 md:w-5 md:h-5" />
	</IconButton>
	{#if show}
		<div
			class="absolute z-10 top-full right-0 mt-1 w-36 md:w-40 lg:w-48 p-1 border-2 border-black grid gap-1 bg-gradient-to-t from-red-200 to-white dark:from-red-900 dark:to-black"
		>
			{#each sorts as sort}
				<label class="text-xs md:text-sm lg:text-base">
					<input type="radio" bind:group={value} value={sort.value} on:change={onSort} />
					{sort.label}
				</label>
			{/each}
		</div>
	{/if}
</div>

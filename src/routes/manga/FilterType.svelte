<script lang="ts">
	import { mangaTypes } from '$lib/utils/const';

	export let value: string;

	const types = [
		'MANGA',
		'NOVEL',
		'ONE_SHOT',
		'DOUJINSHI',
		'MANHWA',
		'MANHUA',
		'OEL',
		'LIGHT_NOVEL'
	];
</script>

<div class="grid">
	<div class="text-neutral-400">Type</div>
	<select bind:value class="p-1 w-full bg-white dark:bg-neutral-600">
		<option value="">All</option>
		{#each types as type}
			<option value={type}>{mangaTypes(type)}</option>
		{/each}
	</select>
</div>

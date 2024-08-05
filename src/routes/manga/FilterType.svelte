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
	<div>Type</div>
	<select bind:value class="w-full border border-black bg-white p-1">
		<option value="">All</option>
		{#each types as type}
			<option value={type}>{mangaTypes(type)}</option>
		{/each}
	</select>
</div>

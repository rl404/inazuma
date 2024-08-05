<script lang="ts">
	import type { GenreResponseData } from '../api/genres/[id]/+server';

	export let value: string;
	export let genres: GenreResponseData[];
</script>

<div class="grid">
	<div>Genre</div>
	<select bind:value class="w-full border border-black bg-white p-1">
		<option value="">All</option>
		{#each genres as genre}
			<option value={genre.id.toString()}>{genre.name}</option>
		{/each}
	</select>
</div>

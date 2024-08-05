<script lang="ts">
	import type { MagazineResponseData } from '../api/magazines/[id]/+server';

	export let value: string;
	export let magazines: MagazineResponseData[];
</script>

<div class="grid">
	<div>Magazine</div>
	<select bind:value class="w-full border border-black bg-white p-1">
		<option value="">All</option>
		{#each magazines as magazine}
			<option value={magazine.id.toString()}>{magazine.name}</option>
		{/each}
	</select>
</div>

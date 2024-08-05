<script lang="ts">
	import { mangaStatuses } from '$lib/utils/const';

	export let value: string;

	const statuses = ['FINISHED', 'RELEASING', 'NOT_YET', 'HIATUS', 'DISCONTINUED'];
</script>

<div class="grid">
	<div>Status</div>
	<select bind:value class="w-full border border-black bg-white p-1">
		<option value="">All</option>
		{#each statuses as status}
			<option value={status}>{mangaStatuses(status)}</option>
		{/each}
	</select>
</div>

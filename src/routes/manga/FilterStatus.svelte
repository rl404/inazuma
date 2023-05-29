<script lang="ts">
	import { mangaStatuses } from '$lib/utils/const';

	export let value: string;

	const statuses = ['FINISHED', 'RELEASING', 'NOT_YET', 'HIATUS', 'DISCONTINUED'];
</script>

<div class="grid">
	<div class="text-neutral-400">Status</div>
	<select bind:value class="p-1 w-full bg-white dark:bg-neutral-600">
		<option value="">All</option>
		{#each statuses as status}
			<option value={status}>{mangaStatuses(status)}</option>
		{/each}
	</select>
</div>

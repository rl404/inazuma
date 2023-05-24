<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let data: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/magazines?limit=1`)
			.then((resp) => (data = resp.data.meta.total))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<a
	class="relative block w-full h-full bg-gradient-to-t from-neutral-200 to-white"
	href="/magazines"
>
	{#if loading}
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<SpinnerIcon class="w-4 h-4 animate-spin text-neutral-200 fill-black " />
		</div>
	{:else if error !== ''}
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-xs">
			{error}
		</div>
	{:else}
		<div class="grid gap-1 text-center">
			<div class="text-xs text-neutral-400">Magazine</div>
			<div class="text-lg font-bold">{data.toLocaleString()}</div>
		</div>
	{/if}
</a>

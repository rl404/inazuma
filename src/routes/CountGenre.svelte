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
			.get(`/api/genres?limit=1`)
			.then((resp) => (data = resp.data.meta.total))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<a
	class="relative block w-full h-full bg-gradient-to-t from-orange-200 to-white dark:from-orange-900 dark:to-black"
	href="/genres"
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
			<div class="text-xs md:text-sm lg:text-base text-neutral-400">Genre</div>
			<div class="text-lg md:text-xl lg:text-2xl font-bold">{data.toLocaleString()}</div>
		</div>
	{/if}
</a>

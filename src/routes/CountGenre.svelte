<script lang="ts">
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let data: number = 0;
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		axios
			.get(`/api/genres?limit=0`)
			.then((resp) => (data = resp.data.meta.total))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

<a href="/genres" class="block h-full w-full bg-gradient-to-t from-orange-200 to-white">
	{#if loading}
		<div class="flex h-full w-full items-center justify-center">
			<Loading class="size-4" />
		</div>
	{:else if error !== ''}
		<div class="flex h-full w-full items-center justify-center text-xs text-red-500">
			{error}
		</div>
	{:else}
		<div class="flex h-full w-full items-center justify-center text-center">
			<div class="grid">
				<div class="subtitle text-xs lg:text-base">Genre</div>
				<div class="text-lg font-bold lg:text-2xl">{data.toLocaleString()}</div>
			</div>
		</div>
	{/if}
</a>

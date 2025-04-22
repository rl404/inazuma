<script lang="ts">
	import Image from '$lib/components/commons/Image.svelte';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import { twMerge } from 'tailwind-merge';
	import type { MangaResponseData } from '../../../api/manga/[id]/+server';

	export let manga: MangaResponseData;
	export let nsfw: boolean;

	$: pictures = [manga.picture, ...manga.pictures];
	let i: number = 0;

	const prev = () => {
		if (i === 0) {
			i = pictures.length - 1;
		} else {
			i--;
		}
	};

	const next = () => {
		if (i === pictures.length - 1) {
			i = 0;
		} else {
			i++;
		}
	};
</script>

<div class="group relative w-full border-2 border-black">
	<Image
		src={pictures[i]}
		alt={manga.title}
		class={twMerge('h-full w-full object-cover', manga.nsfw && !nsfw && 'group-hover:blur-0 blur')}
	/>

	{#if manga.nsfw && !nsfw}
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:hidden"
		>
			<div class="border border-black bg-white px-3 py-1 text-xs lg:text-sm">NSFW</div>
		</div>
	{/if}

	{#if pictures.length > 1}
		<button
			title="previous picture"
			class="absolute bottom-1 left-1 rounded-full border border-black bg-white p-1 hover:bg-red-200"
			on:click={prev}
		>
			<ChevronLeftIcon class="size-3 lg:size-5" />
		</button>
		<button
			title="next picture"
			class="absolute right-1 bottom-1 rounded-full border border-black bg-white p-1 hover:bg-red-200"
			on:click={next}
		>
			<ChevronRightIcon class="size-3 lg:size-5" />
		</button>
	{/if}
</div>

<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import type { mangaResponseData } from '../../../api/manga/[id]/+server';

	export let manga: mangaResponseData;
	export { className as class };
	let className: string;

	let pictures: string[] = [manga.picture, ...manga.pictures];
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

<div class="relative overflow-hidden {className}">
	<Image
		src={pictures[i]}
		alt={manga.title}
		class="w-full h-full object-cover grayscale {manga.nsfw && 'blur'}"
	/>

	{#if manga.nsfw}
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45">
			<div class="bg-white px-4 py-1 border-2 border-black font-bold">NSFW</div>
		</div>
	{/if}

	{#if pictures.length > 1}
		<button
			on:click={prev}
			class="absolute bottom-1 left-1 bg-white border border-black hover:opacity-70 rounded-full p-1"
			title="previous picture"
		>
			<ChevronLeftIcon class="w-4 h-4" />
		</button>

		<button
			on:click={next}
			class="absolute bottom-1 right-1 bg-white border border-black hover:opacity-70 rounded-full p-1"
			title="next picture"
		>
			<ChevronRightIcon class="w-4 h-4" />
		</button>
	{/if}
</div>

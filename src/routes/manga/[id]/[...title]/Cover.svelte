<script lang="ts">
	import { PUBLIC_MAL_HOST } from '$env/static/public';
	import Image from '$lib/components/commons/Image.svelte';
	import { toURL } from '$lib/utils';
	import { twMerge } from 'tailwind-merge';
	import type { MangaResponseData } from '../../../api/manga/[id]/+server';

	export let manga: MangaResponseData;
	export let nsfw: boolean;
</script>

<div class="group h-full w-full">
	<Image
		src={manga.picture}
		alt={manga.title}
		class={twMerge(
			'h-full w-full border-2 border-black object-cover',
			manga.nsfw && !nsfw && 'group-hover:blur-0 blur'
		)}
	/>

	<div class="absolute right-4 bottom-4 w-3/4 p-4 text-right">
		<a
			href="{PUBLIC_MAL_HOST}/manga/{manga.id}/{toURL(manga.title)}"
			target="_blank"
			rel="noreferral"
			class="text-shadow text-xl font-bold shadow-white lg:text-3xl"
		>
			{manga.title}
		</a>
	</div>

	<div class="absolute top-4 right-4 grid w-1/2 p-4 text-right">
		{#each manga.authors as author}
			<a
				title={author.role}
				href="/manga?author_id={author.id}"
				class="text-shadow font-bold shadow-white lg:text-lg"
			>
				{author.name}
			</a>
		{/each}
	</div>

	<div class="absolute top-4 left-4 grid w-1/2 p-4">
		{#each manga.serialization as magazine}
			<a
				href="/manga?magazine_id={magazine.id}"
				class="text-shadow font-bold shadow-white lg:text-lg"
			>
				{magazine.name}
			</a>
		{/each}
	</div>

	{#if manga.nsfw && !nsfw}
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:hidden"
		>
			<div class="border border-black bg-white px-3 py-1 lg:text-3xl">NSFW</div>
		</div>
	{/if}
</div>
